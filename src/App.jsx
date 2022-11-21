import { Route, Routes, useNavigate } from 'react-router-dom';
import Homepage from './components/Homepage';
import Userauth from './components/Userauth';
import Workspace from './components/Workspace';

import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from 'react';

function App() {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) {
            return;
        }
        if (user) {
            navigate("/space");
        }
        if (error) {
            console.log(error);
        }
    }, [error, loading, navigate, user]);
    return (
        <Routes>
            <Route path="/auth/*" element={<Userauth />} />
            <Route path="/space" element={<Workspace />} />
            <Route exact path="/" element={<Homepage />} />
        </Routes>
    );
}

export default App;
