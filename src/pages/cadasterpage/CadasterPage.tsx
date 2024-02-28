import React from 'react'
import { Link } from 'react-router-dom'

const CadasterPage = () => {
  return (
    <>
      <h2>Cadaster Page</h2>
      <p>Voltar Para o Login: <Link to={"/"}>Login</Link></p>
    </>
  )
}

export default CadasterPage