import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div>
      <h1>404 - Página Não Encontrada</h1>
      <p>A página que você está procurando pode ter sido removida, renomeada ou está temporariamente indisponível.</p>
      <p>Por favor, verifique o URL novamente ou retorne à página inicial.</p>
      <Link to='/' style={{color: 'var(--primary-color)', marginTop:'5px'}}>Voltar para Home</Link>
    </div>
  )
}

export default ErrorPage