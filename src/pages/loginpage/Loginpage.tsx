import React, { useState, useEffect } from 'react';
import '../loginpage/Loginpage.css';
import InitialPage from '../initialpage/InitialPage.tsx';
import { Link, useNavigate } from 'react-router-dom';
import { auth, provider } from '../../services/firebase';
import { signInWithPopup } from 'firebase/auth';

const LoginPage = () => {
    const [showInitialPage, setShowInitialPage] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowInitialPage(false);
        }, 2000);

        return () => clearTimeout(timeout);
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
    };

    const handleSignin = () => {
        signInWithPopup(auth, provider).then((result) => {
        // Tratar o resultado após a autenticação com sucesso
        const user = result.user;
        console.log('Usuário autenticado:', user);
        })
        .catch((error) => {
        // Tratar erros durante a autenticação
        console.error('Erro ao autenticar:', error);
        });
    };

    function handleCadaster() {
        navigate("/cadaster");
    }

    return (
        <>
            {showInitialPage && <InitialPage />}
        </>
    );
};

export default LoginPage;
