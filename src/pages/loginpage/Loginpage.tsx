import React from 'react'
import '../loginpage/Loginpage.css'

const LoginPage = () => {
  return (
    <>
    <div id="background"></div>
    <div id='screen'>
      <div id='left'>
        <div id='logo'>
          <img src='./img/icon_neoboard.png' alt="" />
          <p>NeoBoard</p>
        </div>
        <img src="./img/loginImg.png" alt="" />
      </div>
      <div id='right'>
        <h1>Seja Bem Vindo Novamente</h1>
        <p>Preencha corretamente os campos</p>
        <form>
          <div>
            <label>Nome:</label>
            <input type="email" name="" id="" />
          </div>
          <div>
            <label>Nome:</label>
            <input type="email" name="" id="" />
          </div>
          <button type="submit">Logar</button>
        </form>
      </div>
    </div>
    </>
  )
}

export default LoginPage