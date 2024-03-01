import React, { useState, useEffect } from 'react';
import '../loginpage/Loginpage.css';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../../services/firebase';
import { signInWithPopup } from 'firebase/auth';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        document.title = `NeoBoard | Logue Agora`;
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSignin = () => {
        signInWithPopup(auth, provider).then((result) => {
            const user = result.user;
            console.log('Usuário autenticado:', user);
        })
            .catch((error) => {
                console.error('Erro ao autenticar:', error);
            });
    };

    function handleCadaster() {
        navigate("/cadaster");
    }

    return (
        <>
            <div className="background-color"></div>
            <div className="container">
                <div className="left">
                    <div className="container-logo">
                        <img src="img/icon_neoboard.png" alt="NeoBoard logo" className="logo" />
                        <p className="logo-name">NeoBoard</p>
                    </div>
                    <div id='container-img'>
                        <img src="img/loginImg.png" alt="img login" className="left-image" />
                    </div>
                </div>
                <div className="right">
                    <h2 className="title">Seja Bem-Vindo Novamente</h2>
                    <p className="subtitle">Preencha corretamente os campos</p>
                    <div className="login-field">
                        <form>
                            <div className="input-field">
                                <label>Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="example@gmail.com"
                                    className="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="input-field">
                                <label>Senha:</label>
                                <div className='password-container'>
                                    <input
                                            type={showPassword ? "text" : "password"}
                                            name="senha"
                                            placeholder="senha"
                                            className="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                                        id='see-password-cadaster'
                                        onClick={togglePasswordVisibility}
                                    />
                                </div>
                            </div>
                            <button type="submit" className="login-btn" onClick={handleLogin}>
                                Logar
                            </button>
                        </form>
                        <div className="container-line">
                            <hr id="line" />
                            <p className="singup-text">
                                Ainda não tem conta? <span id='link-cadaster' onClick={handleCadaster}>Cadastre-se</span>
                            </p>
                        </div>
                        <button className="login-google" onClick={handleSignin}>Login com o Google</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage