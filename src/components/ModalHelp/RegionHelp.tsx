import React from 'react';

const RegionHelp: React.FC<{ toggleModalClose: () => void }> = ({ toggleModalClose }) => {
    return (
        <div className='Help-Info'>
            <div className='Help-Text'>
                <div id='Neo-Text'>
                    <h1>Bem-vindo à página de <span>Regiões</span> !</h1>
                    <img className='NeoScale2' src="img\Neo\NeoRun.png" alt="Neo-Sit" />
                    <p>Esta página é onde você pode gerenciar e visualizar todos as regiões disponíveis em <span className='span-right'>sua</span> empresa.
                    </p>
                </div>
                <ul>
                    <li>
                        <h4>Produto Principal:</h4>
                        <img className='help-imgs' src="img\helpRegion\CardRegion.png" alt="Região do mes" />
                        <p>Na seção destacada Região do Mês, você encontrará informações sobre a região com mais vendas do mês com faturamento e número de unidades vendidas.</p>
                    </li>

                    <li>
                        <h4>Adicionar uma Nova Região:</h4>
                        <img className='help-imgs' src="img\helpRegion\addRegion.png" alt="adicionar Região" />
                        <img className='help-imgs' src="img\helpRegion\modalRegion.png" alt="adicionar Região" />
                        <p>Para adicionar uma nova região, clique no botão "+ Região" localizado no centro da tela à direita
                            e preencha os campos corretamente.</p>
                    </li>

                    <li>
                        <h4>Editar uma Região Existente:</h4>
                        <img className='help-imgs' src="img\helpRegion\tabelaAdd.png" alt="produto Região" />
                        <img className='help-imgs' src="img\helpRegion\editarTabela.png" alt="editar Região" />  
                        <p> Para editar uma região, clique no botão de editar no canto direito da linha na tabela da
                            região desejada.Isso um modal de edição onde você pode fazer as alterações necessárias
                            nos detalhes do produto, como nome, categoria, valor e descrição.</p>
                    </li>

                    <li>
                        <h4>Filtrar e Pesquisar Regiões:</h4>
                        <img className='help-imgs' src="img/helpRegion/TabelaFiltro.png" alt="Região filtrada" />
                        <img className='help-imgs' src="img\helpRegion\tabelaPedro.png" alt="Região filtrada" />
                        <p>Você pode filtrar as regiões por categoria usando o menu suspenso de
                            filtragem localizado acima da tabela de regiões. </p>
                        <img className='help-imgs' src="img\helpRegion\TabelaFiltragem.png" alt="filtragem Região" />
                        <p> Além disso, você pode pesquisar produtos
                            específicos digitando o nome do produto na barra de pesquisa. </p>
                    </li>

                    <li>
                        <h4>Visualizar Detalhes da Região:</h4>
                        <img className='help-imgs' src="img\helpRegion\EscolherRegião.png" alt="detalhes Região" />
                        <p>Para visualizar mais detalhes de um produto, como sua descrição
                            completa e outras informações relevantes, clique no linha da
                            tebela da região desejada. </p>
                        <img className='help-imgs' src="img\helpRegion\TabelaIndividual.png" alt="pagina do Região" />
                        <p>Isso o levará a uma página separada com detalhes mais abrangentes
                            sobre a região selecionada.</p>
                    </li>
                </ul>
                <button onClick={toggleModalClose} className='help-btn'>Entendi</button>
            </div>

            <figure className='Neo-Left'>
            <img className='NeoScale2' src="img\Neo\NeoRun.png" alt="Neo-Sit" />
            </figure>
        </div>
    );
};

export default RegionHelp;
