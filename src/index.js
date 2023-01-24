import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Accounts from './Accounts/Accounts';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/accounts/*" element={<Accounts onUserChange={() => {}} />} />
                <Route exat path="/" element={<>
                    <Link to="/accounts">Accounts</Link>
                    <Link to="/accounts/profile">Profile</Link>
                </>} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);