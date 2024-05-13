import React from 'react';

const RegionHelp: React.FC<{ toggleModalClose: () => void }> = ({ toggleModalClose }) => {
    return (
        <div className='Help-Info'>
            <div className='Help-Text'>
                <div id='Neo-Text'>
                    <h1>Olá, eu sou o <span>Neo </span>!</h1>
                    <img src="./img/NeoL.png" alt="Neo-Sit" />
                    <p>Serei o seu guia do NeoBoard, sempre que precisar de mim, clique em meu ícone na lateral <span className='span-right'>direita </span>.
                        Atualmente você está na seção Regiões, aqui vai um breve resumo de cada trecho desta página.</p>
                </div>
                <ul>
                    <li>
                        <h4>Card da Região do Mês</h4>
                        <img className='help-imgs' src="./img/CardRegiaomaisvendida.png" alt="periodo" />
                        <p>Este card serve para mostrar qual das regiões cadastradas no site teve 
                            o maior faturamento no último mês e além de identificar 
                            essa região é mostrado a foto da região e seu faturamento </p>
                    </li>

                    <li>
                        <h4>Barra de Pesquisa</h4>
                        <img className='help-imgs' src="./img/Barradepesquisa.png" alt="periodo" />
                        <p>Esta barra de pesquisa serve par ao usuário conseguir pesquisar um região 
                            específica através do nome</p>
                    </li>

                    <li>
                        <h4> Filtragem</h4>
                        <img className='help-imgs' src="./img/cardsfatura.png" alt="faturamento" />
                        <p>O usuário pode filtrar as regiões sem ser por meio do nome da região e 
                            sim usando uma característica específia da região </p>
                    </li>

                    <li>
                        <h4>Adicionar Região:</h4>
                        <img className='help-imgs' src="./img/arrecada.png" alt="arrecadação" />
                        <p>Este botão é usado para adicionar uma região específica e ele abre uma 
                            mini aba com dados a serem preenchidos de acordo com a sua necessidade. </p>
                    </li>

                    <li>
                        <h4>Lista de Regiões:</h4>
                        <img className='help-imgs' src="./img/rankingimg.png" alt="ranking" />
                        <p>Aqui é o local onde ficarão todas as regiões que forem cadastradas por você através do botão de adicionar região </p>
                    </li>
                </ul>
                <button onClick={toggleModalClose} className='help-btn'>Entendi</button>
            </div>

            <figure className='Neo-Left'>
                <img src="./img/NeoL.png" alt="Neo-Sit" />
            </figure>
        </div>
    );
};

export default RegionHelp;
