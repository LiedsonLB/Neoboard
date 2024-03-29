import React from 'react';
import emailjs from 'emailjs-com';
import "./FAQ.css";
import { IoChevronForwardOutline, IoLogoWhatsapp, IoLogoLinkedin, IoMail } from 'react-icons/io5';

const FAQ = () => {

  function sendEmail(e: any) {
    e.preventDefault();

    const templateParams = {
      user_name: e.target.user_name.value,
      user_email: e.target.user_email.value,
      message: e.target.message.value,
      subject: 'Neoboard Client Message'
    };

    emailjs.send('service_2fh7kiu', 'template_1dwajhz', templateParams, 'ytmT8nY7U6e4AGqet')
      .then((result) => {
        console.log(result.text);
        // lógica para mostrar um popup de sucesso
      }, (error) => {
        console.log(error.text);
        // lógica para mostrar um popup de erro
      });
    e.target.reset();
  }

  return (
    <main id='faq-container'>
      <div id='faq-inside'>
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
                <a href="mailto:liedson.b9@gmail.com">Escrever Email<IoChevronForwardOutline /></a>
              </div>

              <form onSubmit={sendEmail} className='social-card'>
                <span className='icon-faq-zap'><IoLogoWhatsapp /></span>
                <span><p className='faq-contacts'>Whatsapp</p></span>
                <span><p>+5586998635571</p></span>
                <a href="https://wa.me/86998635571">Conversar no Whatsapp<IoChevronForwardOutline /></a>
              </form>

              <div className='social-card'>
                <span className='icon-faq-linkedin'><IoLogoLinkedin /></span>
                <span><p className='faq-contacts'>Linkedin</p></span>
                <span><p>in/neoboard</p></span>
                <a href="https://www.linkedin.com/in/liedsonlb/">Contato no Linkedin<IoChevronForwardOutline /></a>
              </div>
            </div>
          </section>

          <section id='faq-right'>
            <header>
              <h2>Descreva seu interesse</h2>
            </header>
            <div id='faq-field'>
              <form onSubmit={sendEmail}>
                <div className="input-faq">
                  <label>Nome:</label>
                  <input
                    type="text"
                    name="user_name"
                    placeholder="Seu nome"
                    className="data-faq"
                  />
                </div>
                <div className="input-faq">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="user_email"
                    placeholder="Seu email favorito"
                    className="data-faq"
                  />
                </div>
                <div className="input-faq-msg">
                  <label>Mensagem:</label>
                  <div className='faq-msg'>
                    <textarea
                      name="message"
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
      </div>
    </main>
  )
}

export default FAQ;