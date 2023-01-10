import classNames from "classnames";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { setTitle } from "../appdata";
import { registerWithEmail } from "../firebase";
import SpinnerButton from "./assets/SpinnerButton";
import css from './styles/userauth.module.css';

function Signup(props) {
    setTitle("Sign up", "Users");
    const location = useLocation();

    const [disabled, setDisabled] = useState(false);
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [pass, setPass] = useState("");
    const [passError, setPassError] = useState("");

    const doSubmit = async (e) => {
        e.preventDefault();
        if (!name) return e.target[0].focus();
        setDisabled(true);
        setNameError("");
        setEmailError("");
        setPassError("");
        const data = await registerWithEmail(name, email, pass);
        if (data.type !== "success") {
            if (data.for === "name") {
                setNameError(data.message) && e.target[0].focus();
            } else if (data.for === "email") {
                setEmailError(data.message) && e.target[1].focus();
            } else if (data.for === "password") {
                setPassError(data.message) && e.target[2].focus();
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
                <span>Sign up</span>
            </div>
            <div className={css.group}>
                <label htmlFor="user-name" className={css.label}>Full name</label>
                <input type="name" autoComplete='name' autoFocus disabled={disabled} name="name" className={css.input} id="user-name" required onChange={({ target }) => setName(target.value.trim())} />
                <div className={css.error}>{nameError}</div>
            </div>
            <div className={css.group}>
                <label htmlFor="user-email" className={css.label}>Email address</label>
                <input type="email" autoComplete='email' disabled={disabled} name="email" className={css.input} id="user-email" required onChange={({ target }) => setEmail(target.value)} />
                <div className={css.error}>{emailError}</div>
            </div>
            <div className={css.group}>
                <label htmlFor="user-password" className={css.label}>Password</label>
                <input type="password" autoComplete='new-password' disabled={disabled} name="password" className={css.input} id="user-password" required onChange={({ target }) => setPass(target.value)} />
                <div className={css.error}>{passError}</div>
            </div>
            <div className={css.group}>
                <button className={classNames(css.button, css.action)} type="submit" disabled={disabled}>
                    <SpinnerButton
                        spin={disabled}
                        text="Sign up"
                        color="#92d4ff"
                    />
                </button>
            </div>
            <div className={css.splitter}>Already have an Account?</div>
            <div className={css.options}>
                <Link to={"/signin" + location.search} className={css.link}>Login instead</Link>
            </div>
        </form>
    );
}

export default Signup;