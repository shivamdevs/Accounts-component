"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
require("./override.css");
var _indexModule = _interopRequireDefault(require("./index.module.css"));
var _react = _interopRequireWildcard(require("react"));
var _appdata = require("./appdata");
var _auth = require("react-firebase-hooks/auth");
var _reactRouterDom = require("react-router-dom");
var _firebase = require("./firebase");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function Accounts({
    onUserChange = null
}) {
    return /*#__PURE__*/_react.default.createElement("div", {
        className: _indexModule.default.fixbox,
        style: {
            backgroundImage: `url(${(0, _appdata.__accounts_get_cover_art)()})`
        }
    }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
        className: _indexModule.default.fixblock,
        to: "/accounts/hidden-signin",
        replace: true
    }), /*#__PURE__*/_react.default.createElement("div", {
        className: _indexModule.default.row
    }, /*#__PURE__*/_react.default.createElement("div", {
        className: `${_indexModule.default.container} ${_indexModule.default.proxy}`
    }), /*#__PURE__*/_react.default.createElement("div", {
        className: _indexModule.default.container
    }, /*#__PURE__*/_react.default.createElement("div", {
        className: _indexModule.default.authbox
    }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Routes, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
        path: "/hidden-signin",
        element: /*#__PURE__*/_react.default.createElement(Signin, null)
    }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
        path: "/hidden-signup",
        element: /*#__PURE__*/_react.default.createElement(Signup, null)
    }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
        path: "/hidden-recover",
        element: /*#__PURE__*/_react.default.createElement(Recover, null)
    }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
        path: "/redirect",
        element: /*#__PURE__*/_react.default.createElement(Redirect, {
            onUserChange: onUserChange
        })
    }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
        path: "/profile",
        element: /*#__PURE__*/_react.default.createElement(Profile, null)
    }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
        path: "/provider",
        element: /*#__PURE__*/_react.default.createElement(Provider, null)
    }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
        exact: true,
        path: "/",
        element: /*#__PURE__*/_react.default.createElement(_reactRouterDom.Navigate, {
            to: "/accounts/provider",
            replace: true
        })
    })), /*#__PURE__*/_react.default.createElement("div", {
        className: _indexModule.default.footer
    }, /*#__PURE__*/_react.default.createElement("a", {
        href: "https://myoasis.tech",
        target: "_blank",
        className: _indexModule.default.foot,
        rel: "noreferrer"
    }, "\xA9 Oasis.tech"), "\u2022", /*#__PURE__*/_react.default.createElement("a", {
        href: "https://myoasis.tech/policies",
        target: "_blank",
        rel: "noreferrer",
        className: _indexModule.default.foot
    }, "Privacy"), "\u2022", /*#__PURE__*/_react.default.createElement("a", {
        href: "https://myoasis.tech/policies/terms",
        target: "_blank",
        rel: "noreferrer",
        className: _indexModule.default.foot
    }, "Terms"), "\u2022", /*#__PURE__*/_react.default.createElement("a", {
        href: "https://myoasis.tech/policies/cookies",
        target: "_blank",
        rel: "noreferrer",
        className: _indexModule.default.foot
    }, "Cookies"))))));
}
var _default = Accounts;
exports.default = _default;
function Redirect({
    onUserChange = null
}) {
    const [user, loading] = (0, _auth.useAuthState)(_firebase.__accounts_firebase_auth);
    const navigate = (0, _reactRouterDom.useNavigate)();
    (0, _react.useEffect)(() => {
        if (!loading) {
            if (user) {
                if (onUserChange) {
                    onUserChange(user);
                } else {
                    navigate("/", {
                        replace: true
                    });
                }
            } else {
                navigate("/accounts/provider", {
                    replace: true
                });
            }
        }
    }, [navigate, onUserChange, user, loading]);
}
function Signin() {
    (0, _appdata.__accounts_set_title)("Sign in");
    const [disabled, setDisabled] = (0, _react.useState)(false);
    const [email, setEmail] = (0, _react.useState)("");
    const [emailError, setEmailError] = (0, _react.useState)("");
    const [pass, setPass] = (0, _react.useState)("");
    const [passError, setPassError] = (0, _react.useState)("");
    const [user] = (0, _auth.useAuthState)(_firebase.__accounts_firebase_auth);
    const navigate = (0, _reactRouterDom.useNavigate)();
    (0, _react.useEffect)(() => {
        user && (async () => {
            const status = await (0, _firebase.__accounts_firebase_check_update_status)(user);
            if (status.type === "success") {
                if (status.message) {
                    navigate("/accounts/redirect", {
                        replace: true
                    });
                } else {
                    navigate("/accounts/profile", {
                        replace: true
                    });
                }
            }
        })();
    }, [navigate, user]);
    const doSubmit = async e => {
        e.preventDefault();
        setDisabled(true);
        setEmailError("");
        setPassError("");
        const data = await (0, _firebase.__accounts_firebase_signin_with_email)(email, pass);
        if (data.type !== "success") {
            if (data.for === "email") {
                setEmailError(data.message) && e.target[0].focus();
            } else if (data.for === "password") {
                setPassError(data.message) && e.target[1].focus();
            } else if (data.for === "push") {
                console.error(data.message);
            } else {
                console.log(data);
            }
            return setDisabled(false);
        }
    };
    return /*#__PURE__*/_react.default.createElement("form", {
        className: _indexModule.default.login,
        onSubmit: doSubmit
    }, /*#__PURE__*/_react.default.createElement("div", {
        className: _indexModule.default.title
    }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
        className: _indexModule.default.titleArrow,
        to: "/accounts/provider",
        replace: true
    }, /*#__PURE__*/_react.default.createElement("i", {
        className: "far fa-arrow-left-long"
    })), /*#__PURE__*/_react.default.createElement("span", null, "Sign in")), /*#__PURE__*/_react.default.createElement("div", {
        className: _indexModule.default.group
    }, /*#__PURE__*/_react.default.createElement("label", {
        htmlFor: "user-email",
        className: _indexModule.default.label
    }, "Email address"), /*#__PURE__*/_react.default.createElement("input", {
        type: "email",
        autoComplete: "email",
        autoFocus: true,
        disabled: disabled,
        name: "email",
        className: _indexModule.default.input,
        id: "user-email",
        required: true,
        onChange: ({
            target
        }) => setEmail(target.value)
    }), /*#__PURE__*/_react.default.createElement("div", {
        className: _indexModule.default.error
    }, emailError)), /*#__PURE__*/_react.default.createElement("div", {
        className: _indexModule.default.group
    }, /*#__PURE__*/_react.default.createElement("label", {
        htmlFor: "user-password",
        className: _indexModule.default.label
    }, "Password"), /*#__PURE__*/_react.default.createElement("input", {
        type: "password",
        autoComplete: "current-password",
        disabled: disabled,
        name: "password",
        className: _indexModule.default.input,
        id: "user-password",
        required: true,
        onChange: ({
            target
        }) => setPass(target.value)
    }), /*#__PURE__*/_react.default.createElement("div", {
        className: _indexModule.default.error
    }, passError)), /*#__PURE__*/_react.default.createElement("div", {
        className: _indexModule.default.group
    }, /*#__PURE__*/_react.default.createElement("button", {
        className: `${_indexModule.default.button} ${_indexModule.default.action}`,
        type: "submit",
        disabled: disabled
    }, /*#__PURE__*/_react.default.createElement(SpinnerButton, {
        spin: disabled,
        text: "Log in",
        color: "#92d4ff"
    }))), /*#__PURE__*/_react.default.createElement("div", {
        className: _indexModule.default.splitter
    }, "or don't have an account?"), /*#__PURE__*/_react.default.createElement("div", {
        className: _indexModule.default.options
    }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
        to: "/accounts/hidden-signup",
        replace: true,
        className: _indexModule.default.link
    }, "Create Account"), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
        to: "/accounts/hidden-recover",
        replace: true,
        className: _indexModule.default.link
    }, "Forgot password?")));
}
function Signup() {
    (0, _appdata.__accounts_set_title)("Sign up");
    const [disabled, setDisabled] = (0, _react.useState)(false);
    const [name, setName] = (0, _react.useState)("");
    const [nameError, setNameError] = (0, _react.useState)("");
    const [email, setEmail] = (0, _react.useState)("");
    const [emailError, setEmailError] = (0, _react.useState)("");
    const [pass, setPass] = (0, _react.useState)("");
    const [passError, setPassError] = (0, _react.useState)("");
    const [user] = (0, _auth.useAuthState)(_firebase.__accounts_firebase_auth);
    const navigate = (0, _reactRouterDom.useNavigate)();
    (0, _react.useEffect)(() => {
        user && navigate("/accounts/profile", {
            replace: true
        });
    }, [navigate, user]);
    const doSubmit = async e => {
        e.preventDefault();
        if (!name) return e.target[0].focus();
        setDisabled(true);
        setNameError("");
        setEmailError("");
        setPassError("");
        const data = await (0, _firebase.__accounts_firebase_signup_with_email)(name, email, pass);
        if (data.type !== "success") {
            if (data.for === "name") {
                setNameError(data.message) && e.target[0].focus();
            } else if (data.for === "email") {
                setEmailError(data.message) && e.target[1].focus();
            } else if (data.for === "password") {
                setPassError(data.message) && e.target[2].focus();
            } else if (data.for === "push") {
                console.error(data.message);
            } else {
                console.log(data);
            }
            return setDisabled(false);
        }
    };
    return /*#__PURE__*/_react.default.createElement("form", {
        className: _indexModule.default.login,
        onSubmit: doSubmit
    }, /*#__PURE__*/_react.default.createElement("div", {
        className: _indexModule.default.title
    }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
        className: _indexModule.default.titleArrow,
        to: "/accounts/hidden-signin",
        replace: true
    }, /*#__PURE__*/_react.default.createElement("i", {
        className: "far fa-arrow-left-long"
    })), /*#__PURE__*/_react.default.createElement("span", null, "Sign up")), /*#__PURE__*/_react.default.createElement("div", {
        className: _indexModule.default.group
    }, /*#__PURE__*/_react.default.createElement("label", {
        htmlFor: "user-name",
        className: _indexModule.default.label
    }, "Full name"), /*#__PURE__*/_react.default.createElement("input", {
        type: "name",
        autoComplete: "name",
        autoFocus: true,
        disabled: disabled,
        name: "name",
        className: _indexModule.default.input,
        id: "user-name",
        required: true,
        onChange: ({
            target
        }) => setName(target.value.trim())
    }), /*#__PURE__*/_react.default.createElement("div", {
        className: _indexModule.default.error
    }, nameError)), /*#__PURE__*/_react.default.createElement("div", {
        className: _indexModule.default.group
    }, /*#__PURE__*/_react.default.createElement("label", {
        htmlFor: "user-email",
        className: _indexModule.default.label
    }, "Email address"), /*#__PURE__*/_react.default.createElement("input", {
        type: "email",
        autoComplete: "email",
        disabled: disabled,
        name: "email",
        className: _indexModule.default.input,
        id: "user-email",
        required: true,
        onChange: ({
            target
        }) => setEmail(target.value)
    }), /*#__PURE__*/_react.default.createElement("div", {
        className: _indexModule.default.error
    }, emailError)), /*#__PURE__*/_react.default.createElement("div", {
        className: _indexModule.default.group
    }, /*#__PURE__*/_react.default.createElement("label", {
        htmlFor: "user-password",
        className: _indexModule.default.label
    }, "Password"), /*#__PURE__*/_react.default.createElement("input", {
        type: "password",
        autoComplete: "new-password",
        disabled: disabled,
        name: "password",
        className: _indexModule.default.input,
        id: "user-password",
        required: true,
        onChange: ({
            target
        }) => setPass(target.value)
    }), /*#__PURE__*/_react.default.createElement("div", {
        className: _indexModule.default.error
    }, passError)), /*#__PURE__*/_react.default.createElement("div", {
        className: _indexModule.default.group
    }, /*#__PURE__*/_react.default.createElement("button", {
        className: `${_indexModule.default.button} ${_indexModule.default.action}`,
        type: "submit",
        disabled: disabled
    }, /*#__PURE__*/_react.default.createElement(SpinnerButton, {
        spin: disabled,
        text: "Sign up",
        color: "#92d4ff"
    }))), /*#__PURE__*/_react.default.createElement("div", {
        className: _indexModule.default.splitter
    }, "Already have an Account?"), /*#__PURE__*/_react.default.createElement("div", {
        className: _indexModule.default.options
    }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
        to: "/accounts/hidden-signin",
        replace: true,
        className: _indexModule.default.link
    }, "Login instead")));
}
function Recover() {
    (0, _appdata.__accounts_set_title)("Recover");
    const [disabled, setDisabled] = (0, _react.useState)(false);
    const doSubmit = e => {
        e.preventDefault();
        setDisabled(true);
    };
    return /*#__PURE__*/_react.default.createElement("form", {
        className: _indexModule.default.login,
        onSubmit: doSubmit
    }, /*#__PURE__*/_react.default.createElement("div", {
        className: _indexModule.default.title
    }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
        className: _indexModule.default.titleArrow,
        to: "/accounts/hidden-signin",
        replace: true
    }, /*#__PURE__*/_react.default.createElement("i", {
        className: "far fa-arrow-left-long"
    })), /*#__PURE__*/_react.default.createElement("span", null, "Recover Password")), /*#__PURE__*/_react.default.createElement("div", {
        className: _indexModule.default.group
    }, /*#__PURE__*/_react.default.createElement("label", {
        htmlFor: "user-email",
        className: _indexModule.default.label
    }, "Email address"), /*#__PURE__*/_react.default.createElement("input", {
        type: "email",
        autoComplete: "email",
        autoFocus: true,
        disabled: disabled,
        name: "email",
        className: _indexModule.default.input,
        id: "user-email",
        required: true
    }), /*#__PURE__*/_react.default.createElement("div", {
        className: _indexModule.default.error
    })), /*#__PURE__*/_react.default.createElement("div", {
        className: _indexModule.default.group
    }, /*#__PURE__*/_react.default.createElement("button", {
        className: `${_indexModule.default.button} ${_indexModule.default.action}`,
        type: "submit",
        disabled: disabled
    }, /*#__PURE__*/_react.default.createElement(SpinnerButton, {
        spin: disabled,
        text: "Send password reset link",
        color: "#92d4ff"
    }))), /*#__PURE__*/_react.default.createElement("div", {
        className: _indexModule.default.splitter
    }, "or remembered password?"), /*#__PURE__*/_react.default.createElement("div", {
        className: _indexModule.default.options
    }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
        to: "/accounts/hidden-signin",
        replace: true,
        className: _indexModule.default.link
    }, "Back to login")));
}
function Provider() {
    (0, _appdata.__accounts_set_title)("Provider");
    const [googleAuth, setGoogleAuth] = (0, _react.useState)(false);
    const [facebookAuth, setFacebookAuth] = (0, _react.useState)(false);
    const [popError, setPopError] = (0, _react.useState)('');
    const [user] = (0, _auth.useAuthState)(_firebase.__accounts_firebase_auth);
    const navigate = (0, _reactRouterDom.useNavigate)();
    (0, _react.useEffect)(() => {
        user && (async () => {
            const status = await (0, _firebase.__accounts_firebase_check_update_status)(user);
            if (status.type === "success") {
                if (status.message) {
                    navigate("/accounts/redirect", {
                        replace: true
                    });
                } else {
                    navigate("/accounts/profile", {
                        replace: true
                    });
                }
            }
        })();
    }, [navigate, user]);
    const doGoogle = async () => {
        setGoogleAuth(true);
        setPopError('');
        const data = await (0, _firebase.__accounts_firebase_signin_with_google)();
        if (data.type !== "success") {
            if (data.for === "popup") {
                setPopError(data.message);
            } else if (data.for === "push") {
                console.error(data.message);
            } else {
                console.log(data);
            }
            return setGoogleAuth(false);
        }
    };
    const doFacebook = async () => {
        setFacebookAuth(true);
        setPopError('');
        const data = await (0, _firebase.__accounts_firebase_signin_with_facebook)();
        if (data.type !== "success") {
            if (data.for === "popup") {
                setPopError(data.message);
            } else if (data.for === "push") {
                console.error(data.message);
            } else {
                console.log(data);
            }
            return setFacebookAuth(false);
        }
    };
    return /*#__PURE__*/_react.default.createElement("div", {
        className: _indexModule.default.login
    }, /*#__PURE__*/_react.default.createElement("div", {
        className: _indexModule.default.title
    }, "Connect with"), /*#__PURE__*/_react.default.createElement("div", {
        className: _indexModule.default.group
    }, /*#__PURE__*/_react.default.createElement("button", {
        className: `${_indexModule.default.button} ${_indexModule.default.coop}`,
        type: "button",
        onClick: doGoogle,
        disabled: googleAuth
    }, /*#__PURE__*/_react.default.createElement("img", {
        src: _appdata.__accounts_asset_path + "auth_google.svg",
        alt: ""
    }), /*#__PURE__*/_react.default.createElement(SpinnerButton, {
        spin: googleAuth,
        text: "Google",
        color: "#92d4ff"
    }))), /*#__PURE__*/_react.default.createElement("div", {
        className: _indexModule.default.group
    }, /*#__PURE__*/_react.default.createElement("button", {
        className: `${_indexModule.default.button} ${_indexModule.default.coop}`,
        type: "button",
        onClick: doFacebook,
        disabled: facebookAuth
    }, /*#__PURE__*/_react.default.createElement("img", {
        src: _appdata.__accounts_asset_path + "auth_facebook.svg",
        alt: ""
    }), /*#__PURE__*/_react.default.createElement(SpinnerButton, {
        spin: facebookAuth,
        text: "Facebook",
        color: "#92d4ff"
    }))), /*#__PURE__*/_react.default.createElement("div", {
        className: _indexModule.default.error
    }, /*#__PURE__*/_react.default.createElement("center", null, popError)));
}
function Profile() {
    (0, _appdata.__accounts_set_title)("Profile");
    const [disabled, setDisabled] = (0, _react.useState)(false);
    const [name, setName] = (0, _react.useState)("");
    const [nameError, setNameError] = (0, _react.useState)("");
    const [photo, setPhoto] = (0, _react.useState)("");
    const [photoErr, setPhotoErr] = (0, _react.useState)("");
    const [progress, setProgress] = (0, _react.useState)(null);
    const [user] = (0, _auth.useAuthState)(_firebase.__accounts_firebase_auth);
    const navigate = (0, _reactRouterDom.useNavigate)();
    const doSubmit = async e => {
        e.preventDefault();
        setDisabled(true);
        setPhotoErr("");
        setNameError("");
        const data = await (0, _firebase.__accounts_firebase_profile_update)(user, name || user.displayName, photo || user.photoURL);
        if (data.type !== "success") {
            if (data.for === "name") {
                setNameError(data.message) && e.target[2].focus();
            } else if (data.for === "push") {
                console.error(data.message);
            } else {
                console.log(data);
            }
            return setDisabled(false);
        }
        navigate("/accounts/redirect", {
            replace: true
        });
    };
    const setPhotoFile = async file => {
        setPhotoErr("");
        if (!["image/jfif", "image/pjpeg", "image/jpeg", "image/pjp", "image/jpg", "image/png"].includes(file.type)) return setPhotoErr("Invalid photo type");
        setDisabled(true);
        setPhoto(URL.createObjectURL(file));
        const type = (() => {
            const splits = file.name.split(".");
            return splits[splits.length - 1];
        })();
        (0, _firebase.__accounts_firebase_upload_profile_photo)(file, type, user, setProgress, url => {
            setPhoto(null);
            setPhoto(url);
            setDisabled(false);
            setProgress(null);
        }, err => setPhotoErr(String(err)));
    };
    return /*#__PURE__*/_react.default.createElement("form", {
        className: _indexModule.default.login,
        onSubmit: doSubmit
    }, /*#__PURE__*/_react.default.createElement("div", {
        className: _indexModule.default.title
    }, /*#__PURE__*/_react.default.createElement("span", null, "Profile")), user && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        className: `${_indexModule.default.group} ${_indexModule.default.groupPhoto}`
    }, (photo !== null || user.photoURL !== null) && /*#__PURE__*/_react.default.createElement("img", {
        src: photo || user.photoURL,
        alt: ""
    }), /*#__PURE__*/_react.default.createElement("input", {
        type: "hidden",
        name: "photo",
        disabled: disabled,
        id: "user-photo",
        defaultValue: user.photoURL,
        onChange: ({
            target
        }) => setPhoto(target.value)
    }), progress !== null && /*#__PURE__*/_react.default.createElement("div", {
        className: _indexModule.default.progress
    }, progress, "%")), /*#__PURE__*/_react.default.createElement("div", {
        className: _indexModule.default.groupFlow
    }, /*#__PURE__*/_react.default.createElement("label", {
        className: _indexModule.default.link,
        htmlFor: "user-input",
        type: "submit",
        disabled: disabled
    }, /*#__PURE__*/_react.default.createElement(SpinnerButton, {
        text: "Upload",
        spin: disabled,
        color: "#92d4ff"
    })), /*#__PURE__*/_react.default.createElement("input", {
        type: "file",
        disabled: disabled,
        style: {
            display: "none"
        },
        id: "user-input",
        accept: "image/jpeg, image/jpg, image/png",
        onChange: ({
            target
        }) => {
            var _target$files;
            return ((_target$files = target.files) === null || _target$files === void 0 ? void 0 : _target$files.length) && setPhotoFile(target.files[0]);
        }
    }), /*#__PURE__*/_react.default.createElement("div", {
        className: _indexModule.default.link,
        type: "submit",
        onClick: () => !disabled && setPhoto(_appdata.__accounts_asset_path + "user-no-image.svg")
    }, /*#__PURE__*/_react.default.createElement(SpinnerButton, {
        text: "Remove",
        spin: disabled,
        color: "#92d4ff"
    }))), /*#__PURE__*/_react.default.createElement("div", {
        className: _indexModule.default.error
    }, photoErr), /*#__PURE__*/_react.default.createElement("div", {
        className: _indexModule.default.group
    }, /*#__PURE__*/_react.default.createElement("label", {
        htmlFor: "user-name",
        className: _indexModule.default.label
    }, "Full name"), /*#__PURE__*/_react.default.createElement("input", {
        type: "text",
        autoComplete: "name",
        autoFocus: true,
        disabled: disabled,
        name: "name",
        className: _indexModule.default.input,
        id: "user-name",
        required: true,
        defaultValue: user.displayName,
        onChange: ({
            target
        }) => setName(target.value.trim())
    }), /*#__PURE__*/_react.default.createElement("div", {
        className: _indexModule.default.error
    }, nameError)), /*#__PURE__*/_react.default.createElement("div", {
        className: _indexModule.default.group
    }, /*#__PURE__*/_react.default.createElement("button", {
        className: `${_indexModule.default.button} ${_indexModule.default.action}`,
        type: "submit",
        disabled: disabled
    }, /*#__PURE__*/_react.default.createElement(SpinnerButton, {
        spin: disabled,
        text: "Save and Continue",
        color: "#92d4ff"
    })))));
}
function SpinnerButton({
    spin = false,
    color = "#fff",
    width = 10,
    children,
    text
}) {
    return /*#__PURE__*/_react.default.createElement("div", {
        className: _indexModule.default.spinner
    }, spin && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        xmlnsXlink: "http://www.w3.org/1999/xlink",
        className: _indexModule.default.svg,
        width: "1em",
        height: "1em",
        viewBox: "0 0 100 100",
        preserveAspectRatio: "xMidYMid"
    }, /*#__PURE__*/_react.default.createElement("circle", {
        cx: "50",
        cy: "50",
        r: "40",
        stroke: "#46dff0",
        strokeWidth: "0",
        fill: "none"
    }), /*#__PURE__*/_react.default.createElement("circle", {
        cx: "50",
        cy: "50",
        r: "40",
        stroke: color,
        strokeWidth: width,
        strokeLinecap: "round",
        fill: "none"
    }, /*#__PURE__*/_react.default.createElement("animateTransform", {
        attributeName: "transform",
        type: "rotate",
        repeatCount: "indefinite",
        dur: "1.6s",
        values: "0 50 50;180 50 50;720 50 50",
        keyTimes: "0;0.5;1"
    }), /*#__PURE__*/_react.default.createElement("animate", {
        attributeName: "stroke-dasharray",
        repeatCount: "indefinite",
        dur: "1.6s",
        values: "25.132741228718345 226.1946710584651;201.06192982974676 50.26548245743669;25.132741228718345 226.1946710584651",
        keyTimes: "0;0.5;1"
    })))), !spin && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children !== null && children !== void 0 ? children : text));
}