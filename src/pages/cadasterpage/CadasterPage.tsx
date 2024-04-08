import React, { useEffect, useState } from 'react';
import axios from 'axios';
// @ts-ignore
import { auth } from '../../services/firebase';
import './CadasterPage.css';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import Popup from '../../components/popup/Popup';

const CadasterPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);
    const [mensagem, setMensagem] = useState('');
    const [alert, setAlert] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        document.title = `NeoBoard | Cadastre-se`;
    }, []);

    const handlecadaster = async (e: any) => {

        if (!username || !email || !password) {
            setAlert('alert');
            setTitle('Atenção');
            setMensagem('Por favor, preencha todos os campos.');
            hideMessageAfterTimeout();
            return;
        }
        try {
            /*
            const response = await axios.post('http://localhost:4000/v2/cadastro', {
                email: email,
                password: password,
                username: username
            });
            console.log('Resposta do cadastro:', response.data);
            */
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            if (user) {
                await updateProfile(user, {
                    displayName: username,
                });
            } else {
                console.error('Usuário não encontrado após criação.');
            }
            navigate("/home");
        } catch (error: any) {
            setAlert('warning');
            setTitle('Erro');
            setMensagem('Erro ao cadastrar: ' + error.message);
            console.error("Erro ao cadastrar:", error.message);
            hideMessageAfterTimeout();
        }
    };

    const hideMessageAfterTimeout = () => {
        setTimeout(() => {
            setMensagem('');
        }, 3000);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            {mensagem && <Popup type={alert} title={title} text={mensagem} />}
            <div className="background-color-sign"></div>
            <main className="container-sign">
                <section className="left-sign">
                    <header id="singup-header">
                        <h2 className="title-sign">Então você é novo aqui?</h2>
                        <p className="subtitle-sign">Preencha corretamente os campos</p>
                    </header>
                    <div className="singup-field">
                        <div id='form'>
                            <div className="input-field-sign">
                                <label>Nome de Usuário:</label>
                                <input
                                    type="text"
                                    name="user"
                                    placeholder="seu nome"
                                    className="user"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="input-field-sign">
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
                            <div className="input-field-sign">
                                <label>Senha:</label>
                                <div className='password-container'>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="senha"
                                        placeholder="password48@37"
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
                            <button className="singup-btn" onClick={handlecadaster}>
                                Cadastrar
                            </button>
                        </div>
                    </div>
                </section>

                <section className="right-sign">
                    <header className="container-logo-sign">
                        <figure>
                            <img src="img/icon_neoboard.png" alt="Neoboard-logo" className="logo-sign" />
                        </figure>
                        <p className="logo-name">NeoBoard</p>
                    </header>
                    <figure id="container-img-cadaster">
                        <img src="img/cadasterImg.png" alt="img-singup" className="right-image" />
                    </figure>

                </section>
            </main>
        </>
    );
};

export default CadasterPage;