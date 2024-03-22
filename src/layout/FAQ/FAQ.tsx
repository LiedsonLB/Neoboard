import React from 'react'
import "./FAQ.css"
import {IoChevronForwardOutline, IoLogoWhatsapp, IoLogoLinkedin, IoMail } from 'react-icons/io5';

const FAQ = () => {
  return (  
    <main id='faq-container'>
      <header id='faq-header'>
        <span>
        <h1>Entre em contato conosco</h1>
        </span>
      </header>

      <div id='faq-sections'>
        <section id='faq-left'>
          <header>
            <h2>Fale conosco</h2>
          </header>
          <div id='faq-cards'>
            <div className='social-card'>
              <span className='icon-faq-email'><IoMail /></span>
              <span><p className='faq-contacts'>Email</p></span>
              <span><p>neoboard@neo.com</p></span>
              <a href="mailto:liedson.b9@gmail.com">escrever email <IoChevronForwardOutline /></a>
            </div>

            <div className='social-card'>
              <span className='icon-faq-zap'><IoLogoWhatsapp /></span>
              <span><p className='faq-contacts'>Whatsapp</p></span>
              <span><p>+5586998635571</p></span>
              <a href="https://wa.me/86998635571">conversar no Whatsapp <IoChevronForwardOutline /></a>
            </div>

            <div className='social-card'>
              <span className='icon-faq-linkedin'><IoLogoLinkedin /></span>
              <span><p className='faq-contacts'>Linkedin</p></span>
              <span><p>in/neoboard</p></span>
              <a href="https://www.linkedin.com/in/liedsonlb/">contato no linkedin &gt;</a>
            </div>
          </div>
        </section>

        <section id='faq-right'>
          <header>
            <h2>Descreva seu interesse</h2>
          </header>
          <div id='faq-field'>
            <form>
              <div className="input-faq">
                <label>Nome:</label>
                <input
                  type="text"
                  name="user"
                  placeholder="Seu nome"
                  className="data-faq"
                />
              </div>
              <div className="input-faq">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Seu email favorito"
                  className="data-faq"
                />
              </div>
              <div className="input-faq-msg">
                <label>Mensagem:</label>
                <div className='faq-msg'>
                  <input
                    type={"text"}
                    name="msg"
                    placeholder="Envie sua mensagem..."
                    className="msg-faq"
                  />
                </div>
              </div>
              <button type="submit" className="faq-btn">
                Enviar
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  )
}

export default FAQ