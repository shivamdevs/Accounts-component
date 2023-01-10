import { Navigate, Route, Routes, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
// import { auth } from "./firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
import css from './components/styles/userauth.module.css';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Recover from './components/Recover';
import { getCoverArt } from './appdata';
import classNames from 'classnames';
import Provider from './components/Provider';
import { Toaster } from 'react-hot-toast';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import { useEffect } from 'react';

function App() {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const paths = [
            "/auth-confirm",
            "/redirect"
        ];
        if (!loading && user) {
            if (!paths.includes(location.pathname)) navigate("/redirect" + location.search);
        }
        if (error) console.error(error);
    }, [error, loading, location, navigate, user]);
    return (
        <div className={css.fixbox} style={{ backgroundImage: `url(/assets/images/coverarts/o-${getCoverArt()}.jpg)` }}>
            <Toaster position="bottom-left" />
            <div className={css.row}>
                <div className={classNames([css.container, css.proxy])}></div>
                <div className={css.container}>
                    <div className={css.authbox}>
                        <Routes>
                            <Route path="/signin" element={<Signin />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/recover" element={<Recover />} />
                            <Route path="/provider" element={<Provider />} />
                            <Route  path="/redirect" element={<Redirect />} />
                            <Route exact path="/" element={<Navigate to={"/provider" + location.search} replace />} />
                        </Routes>
                        <div className={css.footer}>
                            <a href="https://myoasis.tech" target="_blank" className={css.foot} rel="noreferrer">© Oasis.tech</a>
                            •
                            <a href="https://myoasis.tech/policies" target="_blank" rel="noreferrer" className={css.foot}>Privacy</a>
                            •
                            <a href="https://myoasis.tech/policies/terms" target="_blank" rel="noreferrer" className={css.foot}>Terms</a>
                            •
                            <a href="https://myoasis.tech/policies/cookies" target="_blank" rel="noreferrer" className={css.foot}>Cookies</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;

function Redirect() {
    const [search] = useSearchParams();
    window.location.replace(search?.get('return') || "https://myoasis.tech");
}