import React from 'react'
import '../popup/Popup.css'

const Popup = () => {
  return (
    <div id='popup'>
      <div className='separation-popup'></div>
      <div id="text-popup">
        <h3 className='title-popup warning'>Alerta</h3>
        <p className='mensagem-popup'>Erro ao fazer login</p>
      </div>
      <span id='closePopup'>&times;</span>
    </div>
  )
}

export default Popup