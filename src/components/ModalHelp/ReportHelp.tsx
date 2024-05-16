                                                                         import React from 'react';

const ReportHelp: React.FC<{ toggleModalClose: () => void }> = ({ toggleModalClose }) => {
    return (
        <div className='Help-Info'>
            <div className='Help-Text'>
                <div id='Neo-Text'>
                <h1>Bem-vindo à página <span>Relatório</span> !</h1>
                    <img src="img\Neo\NeoPresents.png" alt="Neo-Sit" />
                    <p>A página Relatório permite aos usuários
                        carregar arquivos de relatório de vendas, revisar e editar os dados conforme necessário
                         e, em seguida, enviar o <span className='span-right'>relatório</span> para processamento adicional. </p>
                </div>
                <ul>
                    <li>
                        <h4>Carregar um arquivo de relatório:</h4>
                        <img className='help-imgs' src="./img/helpReport/AddReport.png" alt="enviar relatorio" />
                        <p> Clique no botão "Clique para escolher um arquivo" ou arraste e solte o arquivo
                            de relatório de vendas na área designada. Os formatos de arquivo suportados são
                            .xlsx (Excel), .csv (CSV) e .txt (texto). Você pode baixar um <span className='span-right'>modelo</span> de relatório 
                            no formato .csv, .xlsx ou .txt clicando na opção correspondente no menu suspenso.
                            Isso fornece a estrutura básica do relatório para você preencher com seus próprios dados.</p>
                    </li>

                    <li>
                        <h4>Visualizar e editar dados:</h4>
                        <img className='help-imgs' src="./img/helpReport/TabelaReport.png" alt="editar tabela" />
                        <p>Depois de carregar o arquivo, você verá uma tabela exibindo os dados do relatório.
                            Você pode revisar os dados e fazer edições conforme necessário diretamente na tabela.
                            As células são editáveis e você pode modificar os valores conforme desejado. </p>
                    </li>               
                    
                </ul>
                <button onClick={toggleModalClose} className='help-btn'>Entendi</button>
            </div>

            <figure className='Neo-Left'>
            <img src="img\Neo\NeoPresents.png" alt="Neo-Sit" />
            </figure>
        </div>
    );
};

export default ReportHelp;
