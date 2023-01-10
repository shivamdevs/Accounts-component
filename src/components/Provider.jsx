import { Link, useLocation } from 'react-router-dom';
import { auth, logout, signInWithFacebook, signInWithGoogle } from '../firebase';
import css from './styles/userauth.module.css';
import LogoGoogle from './images/auth_google.svg';
import LogoFacebook from './images/auth_facebook.svg';
import { useEffect, useState } from 'react';
import { setTitle } from '../appdata';
import classNames from 'classnames';
import SpinnerButton from './assets/SpinnerButton';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-hot-toast';

function Provider() {
    const [user] = useAuthState(auth);
    const location = useLocation();

    useEffect(() => {
        console.log(user);
    }, [user]);

    setTitle("Select method");

    const [googleAuth, setGoogleAuth] = useState(false);
    const [facebookAuth, setFacebookAuth] = useState(false);

    const doGoogle = async () => {
        setGoogleAuth(true);
        const data = await signInWithGoogle();
        if (data.type !== "success") {
            if (data.for === "popup") {
                toast.error(data.message);
            } else {
                console.log(data);
            }
            return setGoogleAuth(false);
        }
    };

    const doFacebook = async () => {
        setFacebookAuth(true);
        const data = await signInWithFacebook();
        if (data.type !== "success") {
            if (data.for === "popup") {
                toast.error(data.message);
            } else {
                console.log(data);
            }
            return setFacebookAuth(false);
        }
    };

    return (
        <div className={css.login}>
            <div className={css.title} onClick={() => logout()}>Connect with</div>
            <div className={css.group}>
                <button className={classNames(css.button, css.coop)} type="button" onClick={doGoogle} disabled={googleAuth}>
                    <img src={LogoGoogle} alt="" />
                    <SpinnerButton
                        spin={googleAuth}
                        text="Google"
                        color="#92d4ff"
                    />
                </button>
            </div>
            <div className={css.group}>
                <button className={classNames(css.button, css.coop)} type="button" onClick={doFacebook} disabled={facebookAuth}>
                    <img src={LogoFacebook} alt="" />
                    <SpinnerButton
                        spin={facebookAuth}
                        text="Facebook"
                        color="#92d4ff"
                    />
                </button>
            </div>
            <div className={css.splitter}>or connect with</div>
            <div className={css.group}>
                <Link className={classNames(css.button, css.coop)} to={"/signin" + location.search}>
                    <i className="fas fa-envelope"></i>
                    <span>Email Address</span>
                </Link>
            </div>
        </div>
    )
};

export default Provider;