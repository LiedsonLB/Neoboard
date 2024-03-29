import React, { useEffect, useState } from 'react';
// @ts-ignore
import { auth } from '../../services/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import './CadasterPage.css';
import { useNavigate } from 'react-router-dom';

const CadasterPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        document.title = `NeoBoard | Cadastre-se`;
    }, []);

    function handlecadaster(e: any) {
        e.preventDefault();
        signUp(email, password, username);
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const signUp = async (email: string, password: string, username: string) => {

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (user) {
                await updateProfile(user, {
                    displayName: username,
                });

                navigate("/home");
            } else {
                console.error("Usuário não encontrado após criação.");
            }
        } catch (error: any) {
            console.error("Erro ao cadastrar:", error.message);
        }
    };

    return (
        <>
            <div className="background-color-sign"></div>
            <main className="container-sign">
                <section className="left-sign">
                    <header id="singup-header">
                        <h2 className="title-sign">Então você é novo aqui?</h2>
                        <p className="subtitle-sign">Preencha corretamente os campos</p>
                    </header>
                    <div className="singup-field">
                        <form>
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
                            <button type="submit" className="singup-btn" onClick={handlecadaster}>
                                Cadastrar
                            </button>
                        </form>
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