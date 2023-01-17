"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
require("./override.css");
var _AccountsModule = _interopRequireDefault(require("./Accounts.module.css"));
var _react = _interopRequireWildcard(require("react"));
var _appdata = require("./appdata");
var _auth = require("react-firebase-hooks/auth");
var _reactRouterDom = require("react-router-dom");
var _firebase = require("./firebase");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function Accounts({
    onUserChange = null
}) {
    const [user] = (0, _auth.useAuthState)(_firebase.auth);
    (0, _react.useEffect)(() => {
        if (user) onUserChange && onUserChange(user);
    }, [onUserChange, user]);
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: _AccountsModule.default.fixbox,
        style: {
            backgroundImage: `url(${(0, _appdata.getCoverArt)()})`
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: _AccountsModule.default.row,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                className: `${_AccountsModule.default.container} ${_AccountsModule.default.proxy}`
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                className: _AccountsModule.default.container,
                children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                    className: _AccountsModule.default.authbox,
                    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactRouterDom.Routes, {
                        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
                            path: "/signin",
                            element: /*#__PURE__*/(0, _jsxRuntime.jsx)(Signin, {})
                        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
                            path: "/signup",
                            element: /*#__PURE__*/(0, _jsxRuntime.jsx)(Signup, {})
                        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
                            path: "/recover",
                            element: /*#__PURE__*/(0, _jsxRuntime.jsx)(Recover, {})
                        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
                            path: "/provider",
                            element: /*#__PURE__*/(0, _jsxRuntime.jsx)(Provider, {})
                        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
                            exact: true,
                            path: "/",
                            element: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Navigate, {
                                to: "/accounts/provider",
                                replace: true
                            })
                        })]
                    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                        className: _AccountsModule.default.footer,
                        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
                            href: "https://myoasis.tech",
                            target: "_blank",
                            className: _AccountsModule.default.foot,
                            rel: "noreferrer",
                            children: "\xA9 Oasis.tech"
                        }), "\u2022", /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
                            href: "https://myoasis.tech/policies",
                            target: "_blank",
                            rel: "noreferrer",
                            className: _AccountsModule.default.foot,
                            children: "Privacy"
                        }), "\u2022", /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
                            href: "https://myoasis.tech/policies/terms",
                            target: "_blank",
                            rel: "noreferrer",
                            className: _AccountsModule.default.foot,
                            children: "Terms"
                        }), "\u2022", /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
                            href: "https://myoasis.tech/policies/cookies",
                            target: "_blank",
                            rel: "noreferrer",
                            className: _AccountsModule.default.foot,
                            children: "Cookies"
                        })]
                    })]
                })
            })]
        })
    });
}
var _default = Accounts;
exports.default = _default;
function Signin() {
    (0, _appdata.setTitle)("Sign in");
    const [disabled, setDisabled] = (0, _react.useState)(false);
    const [email, setEmail] = (0, _react.useState)("");
    const [emailError, setEmailError] = (0, _react.useState)("");
    const [pass, setPass] = (0, _react.useState)("");
    const [passError, setPassError] = (0, _react.useState)("");
    const doSubmit = async e => {
        e.preventDefault();
        setDisabled(true);
        setEmailError("");
        setPassError("");
        const data = await (0, _firebase.signInWithEmail)(email, pass);
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
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("form", {
        className: _AccountsModule.default.login,
        onSubmit: doSubmit,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: _AccountsModule.default.title,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Link, {
                className: _AccountsModule.default.titleArrow,
                to: -1,
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)("i", {
                    className: "far fa-arrow-left-long"
                })
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                children: "Sign in"
            })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: _AccountsModule.default.group,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
                htmlFor: "user-email",
                className: _AccountsModule.default.label,
                children: "Email address"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
                type: "email",
                autoComplete: "email",
                autoFocus: true,
                disabled: disabled,
                name: "email",
                className: _AccountsModule.default.input,
                id: "user-email",
                required: true,
                onChange: ({
                    target
                }) => setEmail(target.value)
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                className: _AccountsModule.default.error,
                children: emailError
            })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: _AccountsModule.default.group,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
                htmlFor: "user-password",
                className: _AccountsModule.default.label,
                children: "Password"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
                type: "password",
                autoComplete: "current-password",
                disabled: disabled,
                name: "password",
                className: _AccountsModule.default.input,
                id: "user-password",
                required: true,
                onChange: ({
                    target
                }) => setPass(target.value)
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                className: _AccountsModule.default.error,
                children: passError
            })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: _AccountsModule.default.group,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
                className: `${_AccountsModule.default.button} ${_AccountsModule.default.action}`,
                type: "submit",
                disabled: disabled,
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(SpinnerButton, {
                    spin: disabled,
                    text: "Log in",
                    color: "#92d4ff"
                })
            })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: _AccountsModule.default.splitter,
            children: "or don't have an account?"
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: _AccountsModule.default.options,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Link, {
                to: "/accounts/signup",
                className: _AccountsModule.default.link,
                children: "Create Account"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Link, {
                to: "/accounts/recover",
                className: _AccountsModule.default.link,
                children: "Forgot password?"
            })]
        })]
    });
}
function Signup() {
    (0, _appdata.setTitle)("Sign up");
    const [disabled, setDisabled] = (0, _react.useState)(false);
    const [name, setName] = (0, _react.useState)("");
    const [nameError, setNameError] = (0, _react.useState)("");
    const [email, setEmail] = (0, _react.useState)("");
    const [emailError, setEmailError] = (0, _react.useState)("");
    const [pass, setPass] = (0, _react.useState)("");
    const [passError, setPassError] = (0, _react.useState)("");
    const doSubmit = async e => {
        e.preventDefault();
        if (!name) return e.target[0].focus();
        setDisabled(true);
        setNameError("");
        setEmailError("");
        setPassError("");
        const data = await (0, _firebase.registerWithEmail)(name, email, pass);
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
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("form", {
        className: _AccountsModule.default.login,
        onSubmit: doSubmit,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: _AccountsModule.default.title,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Link, {
                className: _AccountsModule.default.titleArrow,
                to: -1,
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)("i", {
                    className: "far fa-arrow-left-long"
                })
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                children: "Sign up"
            })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: _AccountsModule.default.group,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
                htmlFor: "user-name",
                className: _AccountsModule.default.label,
                children: "Full name"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
                type: "name",
                autoComplete: "name",
                autoFocus: true,
                disabled: disabled,
                name: "name",
                className: _AccountsModule.default.input,
                id: "user-name",
                required: true,
                onChange: ({
                    target
                }) => setName(target.value.trim())
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                className: _AccountsModule.default.error,
                children: nameError
            })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: _AccountsModule.default.group,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
                htmlFor: "user-email",
                className: _AccountsModule.default.label,
                children: "Email address"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
                type: "email",
                autoComplete: "email",
                disabled: disabled,
                name: "email",
                className: _AccountsModule.default.input,
                id: "user-email",
                required: true,
                onChange: ({
                    target
                }) => setEmail(target.value)
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                className: _AccountsModule.default.error,
                children: emailError
            })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: _AccountsModule.default.group,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
                htmlFor: "user-password",
                className: _AccountsModule.default.label,
                children: "Password"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
                type: "password",
                autoComplete: "new-password",
                disabled: disabled,
                name: "password",
                className: _AccountsModule.default.input,
                id: "user-password",
                required: true,
                onChange: ({
                    target
                }) => setPass(target.value)
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                className: _AccountsModule.default.error,
                children: passError
            })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: _AccountsModule.default.group,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
                className: `${_AccountsModule.default.button} ${_AccountsModule.default.action}`,
                type: "submit",
                disabled: disabled,
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(SpinnerButton, {
                    spin: disabled,
                    text: "Sign up",
                    color: "#92d4ff"
                })
            })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: _AccountsModule.default.splitter,
            children: "Already have an Account?"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: _AccountsModule.default.options,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Link, {
                to: "/accounts/signin",
                className: _AccountsModule.default.link,
                children: "Login instead"
            })
        })]
    });
}
function Recover() {
    (0, _appdata.setTitle)("Recover");
    const [disabled, setDisabled] = (0, _react.useState)(false);
    const doSubmit = e => {
        e.preventDefault();
        setDisabled(true);
    };
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("form", {
        className: _AccountsModule.default.login,
        onSubmit: doSubmit,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: _AccountsModule.default.title,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Link, {
                className: _AccountsModule.default.titleArrow,
                to: -1,
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)("i", {
                    className: "far fa-arrow-left-long"
                })
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                children: "Recover Password"
            })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: _AccountsModule.default.group,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
                htmlFor: "user-email",
                className: _AccountsModule.default.label,
                children: "Email address"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
                type: "email",
                autoComplete: "email",
                autoFocus: true,
                disabled: disabled,
                name: "email",
                className: _AccountsModule.default.input,
                id: "user-email",
                required: true
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                className: _AccountsModule.default.error
            })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: _AccountsModule.default.group,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
                className: `${_AccountsModule.default.button} ${_AccountsModule.default.action}`,
                type: "submit",
                disabled: disabled,
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(SpinnerButton, {
                    spin: disabled,
                    text: "Send password reset link",
                    color: "#92d4ff"
                })
            })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: _AccountsModule.default.splitter,
            children: "or remembered password?"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: _AccountsModule.default.options,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Link, {
                to: "/accounts/signin",
                className: _AccountsModule.default.link,
                children: "Back to login"
            })
        })]
    });
}
function Provider() {
    (0, _appdata.setTitle)("Provider");
    const [googleAuth, setGoogleAuth] = (0, _react.useState)(false);
    const [facebookAuth, setFacebookAuth] = (0, _react.useState)(false);
    const [popError, setPopError] = (0, _react.useState)('');
    const doGoogle = async () => {
        setGoogleAuth(true);
        setPopError('');
        const data = await (0, _firebase.signInWithGoogle)();
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
        const data = await (0, _firebase.signInWithFacebook)();
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
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: _AccountsModule.default.login,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: _AccountsModule.default.title,
            children: "Connect with"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: _AccountsModule.default.group,
            children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
                className: `${_AccountsModule.default.button} ${_AccountsModule.default.coop}`,
                type: "button",
                onClick: doGoogle,
                disabled: googleAuth,
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
                    src: _appdata.AssetPath + "auth_google.svg",
                    alt: ""
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)(SpinnerButton, {
                    spin: googleAuth,
                    text: "Google",
                    color: "#92d4ff"
                })]
            })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: _AccountsModule.default.group,
            children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
                className: `${_AccountsModule.default.button} ${_AccountsModule.default.coop}`,
                type: "button",
                onClick: doFacebook,
                disabled: facebookAuth,
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
                    src: _appdata.AssetPath + "auth_facebook.svg",
                    alt: ""
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)(SpinnerButton, {
                    spin: facebookAuth,
                    text: "Facebook",
                    color: "#92d4ff"
                })]
            })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: _AccountsModule.default.error,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)("center", {
                children: popError
            })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: _AccountsModule.default.splitter,
            children: "or connect with"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: _AccountsModule.default.group,
            children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactRouterDom.Link, {
                className: `${_AccountsModule.default.button} ${_AccountsModule.default.coop}`,
                to: "/accounts/signin",
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("i", {
                    className: "fas fa-envelope"
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                    children: "Email Address"
                })]
            })
        })]
    });
}
function SpinnerButton({
    spin = false,
    color = "#fff",
    width = 10,
    children,
    text
}) {
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: _AccountsModule.default.spinner,
        children: [spin && /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
            children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                xmlnsXlink: "http://www.w3.org/1999/xlink",
                className: _AccountsModule.default.svg,
                width: "1em",
                height: "1em",
                viewBox: "0 0 100 100",
                preserveAspectRatio: "xMidYMid",
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
                    cx: "50",
                    cy: "50",
                    r: "40",
                    stroke: "#46dff0",
                    strokeWidth: "0",
                    fill: "none"
                }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("circle", {
                    cx: "50",
                    cy: "50",
                    r: "40",
                    stroke: color,
                    strokeWidth: width,
                    strokeLinecap: "round",
                    fill: "none",
                    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("animateTransform", {
                        attributeName: "transform",
                        type: "rotate",
                        repeatCount: "indefinite",
                        dur: "1.6s",
                        values: "0 50 50;180 50 50;720 50 50",
                        keyTimes: "0;0.5;1"
                    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("animate", {
                        attributeName: "stroke-dasharray",
                        repeatCount: "indefinite",
                        dur: "1.6s",
                        values: "25.132741228718345 226.1946710584651;201.06192982974676 50.26548245743669;25.132741228718345 226.1946710584651",
                        keyTimes: "0;0.5;1"
                    })]
                })]
            })
        }), !spin && /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
            children: children !== null && children !== void 0 ? children : text
        })]
    });
}