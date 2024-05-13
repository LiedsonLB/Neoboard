import React from 'react';

const ReportHelp: React.FC<{ toggleModalClose: () => void }> = ({ toggleModalClose }) => {
    return (
        <div className='Help-Info'>
            <div className='Help-Text'>
                <div id='Neo-Text'>
                    <h1>Olá, eu sou o <span>Neo </span>!</h1>
                    <img src="./img/NeoL.png" alt="Neo-Sit" />
                    <p>Serei o seu guia do NeoBoard, sempre que precisar de mim, clique em meu ícone na lateral <span className='span-right'>direita </span>.
                        Atualmente você está na seção principal do NeoBoard, aqui vai um breve resumo de cada trecho desta página.</p>
                </div>
                <ul>
                    <li>
                        <h4>Selecione o Período:</h4>
                        <img className='help-imgs' src="./img/periodsimg.png" alt="periodo" />
                        <p>Os dados da página podem ser selecionados de acordo com o período que você desejar.</p>
                    </li>

                    <li>
                        <h4>Cartões Financeiros:</h4>
                        <img className='help-imgs' src="./img/cardsfatura.png" alt="faturamento" />
                        <p>Números importantes, como o faturamento, despesas e lucro.</p>
                    </li>

                    <li>
                        <h4>Gráficos de Arrecadação:</h4>
                        <img className='help-imgs' src="./img/arrecada.png" alt="arrecadação" />
                        <p>Explore os gráficos de arrecadação para entender melhor a distribuição da sua receita. Os gráficos de linha e de rosca oferecem um panorama sobre padrões e tendências de arrecadação.</p>
                    </li>

                    <li>
                        <h4>Ranking de Desempenho:</h4>
                        <img className='help-imgs' src="./img/rankingimg.png" alt="ranking" />
                        <p>Descubra quais produtos estão se destacando em vendas, a arrecadação por região e o desempenho dos funcionários.. </p>
                    </li>

                    <li>
                        <h4>Dados de Pagamento e Despesas:</h4>
                        <img className='help-imgs' src="./img/pagamentosimg.png" alt="pagamento" />
                        <p>Veja as formas de pagamento utilizadas pelos clientes, juntamente com um gráfico que ilustra a distribuição dessas formas. </p>
                    </li>

                    <li>
                        <h4>Dados de Pagamento e Despesas:</h4>
                        <img className='help-imgs' src="./img/Despesasimg.png" alt="despesas" />
                        <p>Analise de forma geral as suas despesas com um gráfico de coluna, além disso o NeoBoard oferece um calendário para registrar as despesas de determinado dia. </p>
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

export default ReportHelp;
