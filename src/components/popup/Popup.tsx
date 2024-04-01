import React, { useState } from 'react';
import '../popup/Popup.css';

interface PopupInfo {
  type: string | null;
  title: string | null;
  text: string | null;
}

const Popup = ({ type, title, text }: PopupInfo) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return isOpen ? (
    <div id='popup' className={type ? type : ''}>
      <div className='separation-popup'></div>
      <div id="text-popup">
        <h3 className={`title-popup ${type ? type : ''}`}>{title}</h3>
        <p className='mensagem-popup'>{text}</p>
      </div>
      <span id='closePopup' onClick={handleClose}>&times;</span>
    </div>
  ) : null;
}

export default Popup;