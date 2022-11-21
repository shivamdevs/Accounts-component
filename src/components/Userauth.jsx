import classNames from 'classnames';
import { useState } from 'react';
import SpinnerButton from './assets/SpinnerButton';
import css from './styles/userauth.module.css';

import Google from './images/google_auth.svg';
import { Link, Route, Routes } from 'react-router-dom';

import { getCoverArt, setTitle } from '../appdata';

function Userauth(props) {
    return (
        <div className={css.fixbox} style={{backgroundImage: `url(/assets/images/coverarts/o-${getCoverArt()}.jpg)`}}>
            <div className={css.row}>
                <div className={classNames([css.container, css.proxy])}></div>
                <div className={css.container}>
                    <div className={css.authbox}>
                        <Routes>
                            <Route path="/" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/recover" element={<Recover />} />
                        </Routes>
                        <div className={css.footer}>
                            <a href="https://github.com/shivamdevs" target="_blank" className={css.foot} rel="noreferrer">© Shivam Devs 2022</a>
                            •
                            <Link to="/policies" className={css.foot}>Privacy</Link>
                            •
                            <Link to="/policies/terms" className={css.foot}>Terms</Link>
                            •
                            <Link to="/policies/cookies" className={css.foot}>Cookies</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Userauth;

function Login(props) {
    setTitle("Log in", "Users");

    const [disabled , setDisabled] = useState(false);

    const doSubmit = (e) => {
        e.preventDefault();
        setDisabled(true);

    };
    return (
        <form className={css.login} onSubmit={doSubmit}>
            <div className={css.title}>Log in</div>
            <div className={css.group}>
                <label htmlFor="user-email" className={css.label}>Email address</label>
                <input type="email" autoComplete='email' autoFocus disabled={disabled} name="email" className={css.input} id="user-email" required />
                <div className={css.error}></div>
            </div>
            <div className={css.group}>
                <label htmlFor="user-password" className={css.label}>Password</label>
                <input type="password" autoComplete='current-password' disabled={disabled} name="password" className={css.input} id="user-password" required />
                <div className={css.error}></div>
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
            <div className={css.splitter}>or log in with</div>
            <div className={css.group}>
                <button className={classNames(css.button, css.coop)} type="button" disabled={disabled}>
                    <img src={Google} alt="" />
                    <SpinnerButton
                        spin={disabled}
                        text="Google"
                        color="#92d4ff"
                    />
                </button>
            </div>
            <div className={css.splitter}>or having problem?</div>
            <div className={css.options}>
                <Link to="/auth/register" className={css.link}>Create Account</Link>
                <Link to="/auth/recover" className={css.link}>Forgot password?</Link>
            </div>
        </form>
    );
}

function Register(props) {
    setTitle("Sign up", "Users");

    const [disabled , setDisabled] = useState(false);

    const doSubmit = (e) => {
        e.preventDefault();
        setDisabled(true);

    };
    return (
        <form className={css.login} onSubmit={doSubmit}>
            <div className={css.title}>Sign up</div>
            <div className={css.group}>
                <label htmlFor="user-name" className={css.label}>Full name</label>
                <input type="name" autoComplete='name' autoFocus disabled={disabled} name="name" className={css.input} id="user-name" required />
                <div className={css.error}></div>
            </div>
            <div className={css.group}>
                <label htmlFor="user-email" className={css.label}>Email address</label>
                <input type="email" autoComplete='email' disabled={disabled} name="email" className={css.input} id="user-email" required />
                <div className={css.error}></div>
            </div>
            <div className={css.group}>
                <label htmlFor="user-password" className={css.label}>Password</label>
                <input type="password" autoComplete='current-password' disabled={disabled} name="password" className={css.input} id="user-password" required />
                <div className={css.error}></div>
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
            <div className={css.splitter}>or sign up with</div>
            <div className={css.group}>
                <button className={classNames(css.button, css.coop)} type="button" disabled={disabled}>
                    <img src={Google} alt="" />
                    <SpinnerButton
                        spin={disabled}
                        text="Google"
                        color="#92d4ff"
                    />
                </button>
            </div>
            <div className={css.splitter}>Already have an Account?</div>
            <div className={css.options}>
                <Link to="/auth" className={css.link}>Login instead</Link>
            </div>
        </form>
    );
}

function Recover(props) {
    setTitle("Recover password", "Users");

    const [disabled , setDisabled] = useState(false);

    const doSubmit = (e) => {
        e.preventDefault();
        setDisabled(true);

    };
    return (
        <form className={css.login} onSubmit={doSubmit}>
            <div className={css.title}>Recover Password</div>
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