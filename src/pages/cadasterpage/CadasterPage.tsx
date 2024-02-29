import React from 'react'

const CadasterPage = () => {
  return (
    <>
      <div className="background-color"></div>
    <div className="container">
        <div className="left">
            <h2 className="title">Então você é novo aqui?</h2>
            <p className="subtitle">Preencha os campos corretamente</p>
            <div className="singup-field">
                <form>
                    <div className="input-field">
                        <label>Nome de Usuário:</label>
                        <input type="text" name="user" placeholder="SeuNome" className="user"/>
                    </div>
                    <div className="input-field">
                        <label>Email:</label>
                        <input type="email" name="email" placeholder="example@gmail.com" className="email"/>
                    </div>
                    <div className="input-field">
                        <label>Senha:</label>
                        <input type="password" name="senha" placeholder="senha" className="password"/>
                    </div>
                    <button type="submit" className="singup-btn">Cadastrar</button>
                </form>
            </div>
        </div>
        <div className="right">
            <img src="img/cadasterImg.png" alt="img-singup" className="right-image"/>
            <div className="container-logo">
                <img src="img/icon_neoboard.png" alt="Neoboard-logo" className="logo"/>
                <p className="logo-name">NeoBoard</p>
            </div>
        </div>
    </div>
    </>
  )
}

export default CadasterPage