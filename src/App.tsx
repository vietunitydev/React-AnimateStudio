import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/user/Home.tsx';
import Login from "@/pages/auth/Login.tsx";
import {AuthProvider} from "@/contexts/AuthContext.tsx";
import HomeLayout from "@/components/layout/HomeLayout.tsx";


const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<HomeLayout><Home /></HomeLayout>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;