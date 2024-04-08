import React, { useState, useEffect } from 'react';
import '../loginpage/Loginpage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// @ts-ignore
import { auth, provider } from '../../services/firebase';
import { signInWithPopup, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import Popup from '../../components/popup/Popup';

const LoginPage = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [mensagem, setMensagem] = useState('');
    const [alert, setAlert] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        document.title = `NeoBoard | Logue Agora`;
    }, []);

    const handleLogin = async (e: any) => {
        e.preventDefault();
        if (!email || !password) {
            setAlert('alert');
            setTitle('Atenção');
            setMensagem('Por favor, preencha todos os campos.');
            hideMessageAfterTimeout();
            return;
        }
        try {
            /*await axios.post('http://localhost:4000/v2/login', { email, password });*/
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error: any) {
            setAlert('warning');
            setTitle('Erro');
            setMensagem('Erro ao fazer login: ' + error.message);
            console.error('Erro ao fazer login:', error.message);
            hideMessageAfterTimeout();
        }
    };

    const hideMessageAfterTimeout = () => {
        setTimeout(() => {
            setMensagem('');
        }, 3000);
    };

    const handleResetSenha = async () => {
        if (!email) {
            /*await axios.post('http://localhost:4000/v2/resetSenha', { email });*/
            setAlert('alert');
            setTitle('Atenção');
            setMensagem('Por favor, preencha o campo de e-mail.');
            hideMessageAfterTimeout();
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            setAlert('sucess');
            setTitle('Redefinição Enviada');
            setMensagem('Um e-mail de redefinição de senha foi enviado para o seu e-mail.');
            hideMessageAfterTimeout();
        } catch (error : any) {
            setAlert('warning');
            setTitle('Erro');
            setMensagem('Erro ao redefinir a senha. Verifique o e-mail fornecido.');
            console.error('Erro ao resetar a senha:', error.message);
            hideMessageAfterTimeout();
        }
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
                setAlert('warning');
                setTitle('Erro');
                setMensagem('Erro ao autenticar: ' + error.message);
                console.error('Erro ao autenticar:', error);
            });

    };

    function handleCadaster() {
        navigate("/cadaster");
    }

    return (
        <>
            {mensagem && <Popup type={alert} title={title} text={mensagem} />}
            <div className="background-color"></div>
            <main className="container">
                <section className="left">
                    <header className="container-logo">
                        <img src="img/icon_neoboard.png" alt="NeoBoard logo" className="logo" />
                        <p className="logo-name">NeoBoard</p>
                    </header>
                    <figure id='container-img'>
                        <img src="img/loginImg.png" alt="img login" className="left-image" />
                    </figure>
                </section>

                <section className="right">
                    <header id="login-header">
                        <h2 className="title">Seja Bem-Vindo Novamente</h2>
                        <p className="subtitle">Preencha corretamente os campos</p>
                    </header>
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
                                        placeholder="password487@"
                                        className="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                                        id='see-password-login'
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
                        <span id='link-resetPassword' onClick={handleResetSenha} style={{ width: 'fit-content', margin: '1.5rem auto' }}>Esqueci minha senha</span>
                    </div>
                </section>
            </main>
        </>
    )
}

export default LoginPage;