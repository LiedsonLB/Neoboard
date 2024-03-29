import React, { useState, useEffect } from 'react';
import '../loginpage/Loginpage.css';
import { useNavigate } from 'react-router-dom';
// @ts-ignore
import { auth, provider } from '../../services/firebase';
import { signInWithPopup, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

const LoginPage = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [mensagem, setMensagem] = useState('');
    const [alert, setAlert] = useState(false);

    useEffect(() => {
        document.title = `NeoBoard | Logue Agora`;
    }, []);

    const handleLogin = async (e: any) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
    
            console.log('Login bem-sucedido!');
        } catch (error: any) {
            console.error('Erro ao fazer login:', error.message);
        }
    };

    const handleResetSenha = () => {
        sendPasswordResetEmail(auth, email)
          .then(() => {
            setAlert(true);
            setMensagem('Um e-mail de redefinição de senha foi enviado para o seu e-mail.');
          })
          .catch((error: any) => {
            setAlert(false);
            setMensagem('Preencha o seu Email corretamente');
            console.log('error ao preencher email: ', error)
          });
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
                        <span id='link-cadaster' onClick={handleResetSenha} style={{width: 'fit-content', margin: '1.5rem auto'}}>Esqueci minha senha</span>
                        {mensagem && <p 
                            style={{
                                padding: '.5rem',
                                textAlign: "center",
                                color: alert ? '#74ff74' : '#ff5151'
                            }}
                        >{mensagem}</p>}
                    </div>
                </section>
            </main>
        </>
    )
}

export default LoginPage