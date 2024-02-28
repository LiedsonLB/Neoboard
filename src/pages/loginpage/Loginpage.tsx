import React, { useState } from 'react'
import '../loginpage/Loginpage.css'
import InitialPage from '../initialpage/InitialPage';

const LoginPage = () => {
    const [apresention, setApresention] = useState("")



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
                    <p className="subtitle">Preencha os campos corretamente</p>
                    <div className="login-field">
                        <form>
                            <div className="input-field">
                                <label>Email:</label>
                                <input type="email" name="email" placeholder="example@gmail.com" className="email" />
                            </div>
                            <div className="input-field">
                                <label>Senha:</label>
                                <input type="password" name="senha" placeholder="senha" className="password" />
                            </div>
                            <button type="submit" className="login-btn" onClick={handleLogin}>
                                Logar
                            </button>
                        </form>
                        <div className="container-line">
                            <hr id="line" />
                            <p className="singup-text">
                                Ainda não tem conta? <a onClick={handleCadaster}>Cadastre-se</a>
                            </p>
                        </div>
                        <button className="login-google">Login com o Google</button>
                    </div>
                </div>
            </div>
        </>
  )
}

export default LoginPage