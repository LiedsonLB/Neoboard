import React from 'react'
import '../loginpage/Loginpage.css'

const LoginPage = () => {
  return (
    <div class="container">
        <div class="left">
            <div class="background"></div>
            <img src="img/neoboard_logo.png" alt="NeoBoard logo" class="logo">
            <img src="img/loginImg.png" alt="img login" class="left-image">
        </div>
        <div class="right">
            <h2 class="title">Seja Bem-Vindo Novamente</h2>
            <h3 class="subtitle">Preencha os campos corretamente</h3>
            <form>
                <div class="input-field">
                    <label for="email">Email:</label>
                    <input type="email" name="email" placeholder="example@gmail.com" class="email">
                </div>
                <div class="input-field">
                    <label for="senha">Senha:</label>
                    <input type="password" name="senha" placeholder="senha" class="password">
                </div>
                <button type="submit" class="login-btn">Logar</button>
            </form>
            <p class="singup-text">Ainda não tem conta? <a href="#">Cadastre-se</a></p>
            <button class="login-google">Login com o Google</button>
        </div>
    </div>
  )
}

export default LoginPage