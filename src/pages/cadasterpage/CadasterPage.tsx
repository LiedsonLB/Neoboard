import React from 'react'
import './CadasterPage.css'

const CadasterPage = () => {
  return (
    <>
      <div className="background-color-sign"></div>
    <div className="container-sign">
        <div className="left-sign">
            <h2 className="title-sign">Então você é novo aqui?</h2>
            <p className="subtitle-sign">Preencha os campos corretamente</p>
            <div className="singup-field-sign">
                <form>
                    <div className="input-field-sign">
                        <label>Nome de Usuário:</label>
                        <input type="text" name="user" placeholder="seu nome" className="user"/>
                    </div>
                    <div className="input-field-sign">
                        <label>Email:</label>
                        <input type="email" name="email" placeholder="example@gmail.com" className="email"/>
                    </div>
                    <div className="input-field-sign">
                        <label>Senha:</label>
                        <input type="password" name="senha" placeholder="senha" className="password"/>
                    </div>
                    <button type="submit" className="singup-btn">Cadastrar</button>
                </form>
            </div>
        </div>
        <div className="right-sign">
            <img src="img/cadasterImg.png" alt="img-singup" className="right-image"/>
            <div className="container-logo-sign">
                <img src="img/icon_neoboard.png" alt="Neoboard-logo" className="logo-sign"/>
                <p className="logo-name">NeoBoard</p>
            </div>
        </div>
    </div>
    </>
  )
}

export default CadasterPage