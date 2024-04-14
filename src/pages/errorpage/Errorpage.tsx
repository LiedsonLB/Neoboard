import React from 'react'
import { Link } from 'react-router-dom'
import '../errorpage/Errorpage.css'

const ErrorPage = () => {
  return (
    <div id="screen-error">
      <div id="container-error">
        <div id="img-error">
          <img src="/img/avatarHomeSkills.png" alt="" />
        </div>
        <div id="text-error">
          <h1>ERROR <span>404</span>:<br className='br-error' /> Página não encontrada</h1>
          <p>Nosso programador Neo dormiu no teclado, e a página fugiu! Enquanto o café faz efeito, explore outras partes do nosso universo digital na página inicial. Agradecemos pela paciência!</p>
          <Link to='/' style={{ color: 'var(--secondy-color)', marginTop: '5px' }}>Voltar para Home</Link>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage