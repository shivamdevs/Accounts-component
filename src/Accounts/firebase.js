import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    FacebookAuthProvider,
    updateProfile,
    sendEmailVerification,
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
    updateDoc,
    doc,
} from "firebase/firestore";
import {
    getDownloadURL,
    getStorage, ref, uploadBytesResumable
} from 'firebase/storage';
import { __accounts_asset_path } from "./appdata";
const firebaseConfig = {
    apiKey: "AIzaSyAuT7owM2lF6JqmWUionKIM1vQ2pOHgzRM",
    authDomain: "my-oasis-tech.firebaseapp.com",
    projectId: "my-oasis-tech",
    storageBucket: "my-oasis-tech.appspot.com",
    messagingSenderId: "180046491267",
    appId: "1:180046491267:web:f184a60c760b8c0eb375b6",
    measurementId: "G-WJZGXF8F3L"
};
const app = initializeApp(firebaseConfig);
const __accounts_firebase_auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();
function formatAuth(err) {
    const result = { type: "error", for: "", message: "" };
    const error = String(err);
    console.log(error);
    if (error.includes('auth/popup-closed-by-user')) {
        return (result.for = "popup") && (result.message = "Popup was closed by user, try again") && result;
    } else if (error.includes('auth/email-already-in-use')) {
        return (result.for = "email") && (result.message = "This email is already registered") && result;
    } else if (error.includes('auth/weak-password')) {
        return (result.for = "password") && (result.message = "This password is too weak") && result;
    } else if (error.includes('auth/user-not-found')) {
        return (result.for = "email") && (result.message = "This email address does not exists") && result;
    } else if (error.includes('auth/wrong-password')) {
        return (result.for = "password") && (result.message = "This password is incorrect") && result;
    } else if (error.includes('auth/network-request-failed')) {
        return (result.for = "push") && (result.message = "Network request failed, check your internet connection") && result;
    } else if (error.includes('')) {
        return (result.for = "") && (result.message = "") && result;
    } else if (error.includes('')) {
        return (result.for = "") && (result.message = "") && result;
    }
    return result;
}
const googleProvider = new GoogleAuthProvider();
const __accounts_firebase_signin_with_google = async () => {
    try {
        const res = await signInWithPopup(__accounts_firebase_auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
                profile: user.photoURL || (__accounts_asset_path + "user-no-image.svg"),
                created: Date.now(),
                updated: Date.now(),
            });
        }
        return { type: "success" };
    } catch (err) {
        return formatAuth(err);
    }
};
const facebookProvider = new FacebookAuthProvider();
const __accounts_firebase_signin_with_facebook = async () => {
    try {
        const res = await signInWithPopup(__accounts_firebase_auth, facebookProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "facebook",
                email: user.email,
                profile: user.photoURL || (__accounts_asset_path + "user-no-image.svg"),
                created: Date.now(),
                updated: Date.now(),
            });
        }
        return { type: "success" };
    } catch (err) {
        return formatAuth(err);
    }
};
const __accounts_firebase_signin_with_email = async (email, password) => {
    try {
        await signInWithEmailAndPassword(__accounts_firebase_auth, email, password);
        return { type: "success" };
    } catch (err) {
        return formatAuth(err);
    }
};
const __accounts_firebase_signup_with_email = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(__accounts_firebase_auth, email, password);
        const user = res.user;
        await updateProfile(user, { displayName: name });
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
            profile: (__accounts_asset_path + "user-no-image.svg"),
            created: Date.now(),
            updated: Date.now(),
        });
        return { type: "success" };
    } catch (err) {
        return formatAuth(err);
    }
};
const __accounts_firebase_send_password_reset = async (email) => {
    try {
        await sendPasswordResetEmail(__accounts_firebase_auth, email);
        return { type: "success" };
    } catch (err) {
        return formatAuth(err);
    }
};
const __accounts_firebase_send_verification_email = async (user) => {
    try {
        const link = await sendEmailVerification(user);
        console.log(link);
    } catch (err) {
        return formatAuth(err);
    }
};
const __accounts_firebase_logout = () => {
    signOut(__accounts_firebase_auth);
};
const __accounts_firebase_profile_update = async (user, name, photo) => {
    try {
        await updateProfile(user, { displayName: name, photoURL: photo });
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        for (const data of docs.docs) {
            await updateDoc(doc(db, "users", data.id), {
                name: name,
                profile: photo,
                updated: Date.now(),
            });
        }
        return { type: "success" };
    } catch (err) {
        return formatAuth(err);
    }
};
const __accounts_firebase_upload_profile_photo = async (file, type, user, progress, callback, fallback) => {
    try {
        const storageRef = ref(storage, `profile-photo/${user.uid}.${type}`);
        const uploadTask = uploadBytesResumable(storageRef, file, {
            contentType: file.type,
        });
        uploadTask.on("state_changed", (snapshot) => {
            progress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        }, (err) => fallback(err), () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                callback(downloadURL);
            }, (err) => fallback(err));
        });
    } catch (err) {
        fallback(err);
    }
}
export {
    __accounts_firebase_auth,
    __accounts_firebase_logout,
    __accounts_firebase_profile_update,
    __accounts_firebase_signin_with_email,
    __accounts_firebase_signup_with_email,
    __accounts_firebase_signin_with_google,
    __accounts_firebase_send_password_reset,
    __accounts_firebase_signin_with_facebook,
    __accounts_firebase_upload_profile_photo,
    __accounts_firebase_send_verification_email,
};