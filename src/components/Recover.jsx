import classNames from "classnames";
import { useState } from "react";
import { Link } from "react-router-dom";
import { setTitle } from "../appdata";
import SpinnerButton from "./assets/SpinnerButton";
import css from './styles/userauth.module.css';

function Recover(props) {
    setTitle("Recover password", "Users");

    const [disabled, setDisabled] = useState(false);

    const doSubmit = (e) => {
        e.preventDefault();
        setDisabled(true);

    };
    return (
        <form className={css.login} onSubmit={doSubmit}>
            <div className={css.title}>
                <Link className={css.titleArrow} to={-1}><i className="far fa-arrow-left-long"></i></Link>
                <span>Recover Password</span>
            </div>
            <div className={css.group}>
                <label htmlFor="user-email" className={css.label}>Email address</label>
                <input type="email" autoComplete='email' autoFocus disabled={disabled} name="email" className={css.input} id="user-email" required />
                <div className={css.error}></div>
            </div>
            <div className={css.group}>
                <button className={classNames(css.button, css.action)} type="submit" disabled={disabled}>
                    <SpinnerButton
                        spin={disabled}
                        text="Send password reset link"
                        color="#92d4ff"
                    />
                </button>
            </div>
            <div className={css.splitter}>or remembered password?</div>
            <div className={css.options}>
                <Link to="/auth" className={css.link}>Back to login</Link>
            </div>
        </form>
    );
}

export default Recover;