import React from 'react';

const FinancialHelp: React.FC<{ toggleModalClose: () => void }> = ({ toggleModalClose }) => {
    return (
        <div className='Help-Info'>
            <div className='Help-Text'>
                <div id='Neo-Text'>
                    <h1>Bem-vindo à página <span>Financeiro</span> !</h1>
                    <img className='NeoScale2' src="img\Neo\NeoPC.png" alt="Neo-Sit" />
                    <p>A seção Financeiro oferece uma visão detalhada das finanças da <span className='span-right'>sua</span> empresa, permitindo o monitoramento e gerenciamento das despesas.
                    </p>
                </div>
                <ul>
                    <li>
                        <h4>Seção de Dívidas:</h4>
                        <img className='help-imgs' src="./img/helpFinancial/CardFinance.png" alt="dividas" />
                        <p>Os <span className='span-right'>cartões</span> exibem informações sobre as dívidas dos clientes, 
                            incluindo o total de dívidas e as dívidas pendentes.</p>
                        <p>A <span className='span-right'>tabela</span> exibe as dívidas registradas, incluindo detalhes como cliente,
                         data da compra e valor,
                         com botões de edição e exclusão para gerenciamento. </p>
                    </li>

                    <li>
                        <h4>Grafico de Dívidas:</h4>
                        <img className='help-imgs' src="./img/helpFinancial/ChartFinance.png" alt="grafico" />
                        <p>Os gráficos fornecem uma representação visual das dívidas da empresa,
                         ajudando a identificar padrões e tendências. </p>
                    </li>

                    <li>
                        <h4>Ranking de Dívidas:</h4>
                        <img className='help-imgs' src="./img/helpFinancial/RankingFinance.png" alt="ranking" />
                        <p>Gráficos de dívidas por quantidade devida e por período inadimplente.</p>
                    </li>
                    
                    <li>
                        <h4>Seção de Despesas:</h4>
                        <img className='help-imgs' src="./img/helpFinancial/DespesaFinance.png" alt="despesas" />
                        <p>O filtro permite selecionar uma categoria específica de despesas 
                            para visualização, facilitando o acompanhamento dos gastos.</p>
                        <p>Há um botão apra adicionar que redireciona para um formulário que permite incrementar novas despesas ao sistema, fornecendo campos
                            para inserir o nome, tipo, descrição e valor da despesa. </p>   
                    </li>
                    
                </ul>
                <button onClick={toggleModalClose} className='help-btn'>Entendi</button>
            </div>

            <figure className='Neo-Left'>
                <img src="img\Neo\NeoPC.png" alt="Neo-Sit" />
            </figure>
        </div>
    );
};

export default FinancialHelp;
