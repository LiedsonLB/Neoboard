import React from 'react';

const FaqHelp: React.FC<{ toggleModalClose: () => void }> = ({ toggleModalClose }) => {
    return (
        <div className='Help-Info'>
        <div className='Help-Text'>
                <div id='Neo-Text'>
                <h1>Bem-vindo à página <span> Fale Conosco</span> !</h1>
                    <img src="img\Neo\NeoSpeak.png" alt="Neo-Sit" />
                    <p>Aqui estão algumas informações úteis para ajudá-lo a entrar em contato conosco.</p>
                </div>
                <ul>
                    <li>
                        <h4>Formas de Contato:</h4>
                        <img className='help-imgs' src="./img/helpFaq/formasContato.png" alt="fale conosco" />
                        <p>Esta seção oferece várias maneiras de entrar em contato conosco, seja por e-mail,
                             WhatsApp ou LinkedIn. Você pode clicar nos links fornecidos ou nos botões 
                            correspondentes para iniciar uma conversa ou enviar uma mensagem. Se preferir, 
                            também pode enviar um e-mail diretamente para o endereço fornecido. </p>
                    </li>     

                    <li>
                        <h4>Descreva seu interesse:</h4>
                        <img className='help-imgs' src="./img/helpFaq/enviarMSG.png" alt="fale conosco" />
                        <p>Se você preferir enviar sua mensagem diretamente pelo nosso site, preencha o 
                            formulário na seção "Descreva seu interesse". Insira seu nome, seu email e 
                            escreva sua mensagem no campo fornecido. </p>
                    </li>       
                    
                </ul>
                <button onClick={toggleModalClose} className='help-btn'>Entendi</button>
            </div>

            <figure className='Neo-Left'>
            <img src="img\Neo\NeoSpeak.png" alt="Neo-Sit" />
            </figure>
    </div>
    );
};

export default FaqHelp;
