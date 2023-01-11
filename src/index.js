import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Accounts from './components/Accounts/Accounts';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/accounts/*" element={<Accounts />} />
                <Route exat path="/" element={<Navigate to="/accounts" />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);