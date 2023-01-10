import classNames from "classnames";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { setTitle } from "../appdata";
import { signInWithEmail } from "../firebase";
import SpinnerButton from "./assets/SpinnerButton";
import css from './styles/userauth.module.css';

function Signin(props) {
    setTitle("Sign in", "Users");
    const location = useLocation();

    const [disabled, setDisabled] = useState(false);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [pass, setPass] = useState("");
    const [passError, setPassError] = useState("");

    const doSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setEmailError("");
        setPassError("");
        const data = await signInWithEmail(email, pass);
        if (data.type !== "success") {
            if (data.for === "email") {
                setEmailError(data.message) && e.target[0].focus();
            } else if (data.for === "password") {
                setPassError(data.message) && e.target[1].focus();
            } else {
                console.log(data);
            }
            return setDisabled(false);
        }
    };
    return (
        <form className={css.login} onSubmit={doSubmit}>
            <div className={css.title}>
                <Link className={css.titleArrow} to={-1}><i className="far fa-arrow-left-long"></i></Link>
                <span>Sign in</span>
            </div>
            <div className={css.group}>
                <label htmlFor="user-email" className={css.label}>Email address</label>
                <input type="email" autoComplete='email' autoFocus disabled={disabled} name="email" className={css.input} id="user-email" required onChange={({target}) => setEmail(target.value)} />
                <div className={css.error}>{emailError}</div>
            </div>
            <div className={css.group}>
                <label htmlFor="user-password" className={css.label}>Password</label>
                <input type="password" autoComplete='current-password' disabled={disabled} name="password" className={css.input} id="user-password" required onChange={({target}) => setPass(target.value)} />
                <div className={css.error}>{passError}</div>
            </div>
            <div className={css.group}>
                <button className={classNames(css.button, css.action)} type="submit" disabled={disabled}>
                    <SpinnerButton
                        spin={disabled}
                        text="Log in"
                        color="#92d4ff"
                    />
                </button>
            </div>
            <div className={css.splitter}>or don't have an account?</div>
            <div className={css.options}>
                <Link to={"/signup" + location.search} className={css.link}>Create Account</Link>
                <Link to={"/recover" + location.search} className={css.link}>Forgot password?</Link>
            </div>
        </form>
    );
}

export default Signin;