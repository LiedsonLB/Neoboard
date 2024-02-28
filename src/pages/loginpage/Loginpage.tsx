import React from 'react'
import '../loginpage/Loginpage.css'

const LoginPage = () => {
  return (
    <div className="container">
        <div className="left">
            <div className="background"></div>
            <img src="neoboardCopia\public\img/readme_img/neoboard_logo.png" alt="NeoBoard logo" className="logo"/>
            <img src="img/loginImg.png" alt="img login" className="left-image"/>
        </div>
        <div className="right">
            <h2 className="title">Seja Bem-Vindo Novamente</h2>
            <h3 className="subtitle">Preencha os campos corretamente</h3>
            <form>
                <div className="input-field">
                    <label>Email:</label>
                    <input type="email" name="email" placeholder="example@gmail.com" className="email"/>
                </div>
                <div className="input-field">
                    <label>Senha:</label>
                    <input type="password" name="senha" placeholder="senha" className="password"/>
                </div>
                <button type="submit" className="login-btn">Logar</button>
            </form>
            <p className="singup-text">Ainda não tem conta? <a href="#">Cadastre-se</a></p>
            <button className="login-google">Login com o Google</button>
        </div>
    </div>
  )
}

export default LoginPage