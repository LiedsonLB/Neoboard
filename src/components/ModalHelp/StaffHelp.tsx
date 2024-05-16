import React from 'react';

const StaffHelp: React.FC<{ toggleModalClose: () => void }> = ({ toggleModalClose }) => {
    return (
        <div className='Help-Info'>
            <div className='Help-Text'>
                <div id='Neo-Text'>
                    <h1>Bem-vindo à página de <span>Funcionários</span> !</h1>
                    <img src="img\Neo\NeoSit.png" alt="Neo-Sit" />
                    <p>Esta página é onde você pode gerenciar e visualizar todos os funcionários 
                        disponíveis em <span className='span-right'>sua</span> empresa.
                    </p>
                </div>
                <ul>
                    <li>
                        <h4>Funcionários Principais:</h4>
                        <img className='help-imgs' src="./img/helpProduct/produtoCard.png" alt="Funcionário do mes" />
                        <p>Na seção destacada Funcionário do Mês, você encontrará informações sobre 
                            o funcionário com mais vendas e com mais faturamento.</p>
                    </li>

                    <li>
                        <h4>Adicionar um Novo Funcionário:</h4>
                        <img className='help-imgs' src="./img/helpProduct/AddProduto.png" alt="adicionar Funcionário" />
                        <img className='help-imgs' src="./img/helpProduct/ModalProduto.png" alt="adicionar Funcionário" />
                        <p>Para adicionar um novo funcionário, clique no botão "+ Funcionário" 
                            e preencha os campos corretamente.</p>
                    </li>

                    <li>
                        <h4>Editar um Funcionário Existente:</h4>
                        <img className='help-imgs' src="./img/helpProduct/produtoEditar.png" alt="editar Funcionário" />
                        <img className='help-imgs' src="./img/helpProduct/ProdutoEditado.png" alt="Funcionário editado" />
                        <p> Para editar um funcionário, clique no ícone de lápis do cartão do
                            funcionário desejado. Isso abre um modal de edição onde você pode
                            fazer as alterações necessárias nos detalhes do funcionário, como
                            nome, idade, formação, formas de contatos, etc.</p>
                    </li>

                    <li>
                        <h4>Filtrar e Pesquisar Funcionários:</h4>
                        <img className='help-imgs' src="./img/helpProduct/ProdutoFiltrado.png" alt="Funcionário filtrado" />
                        <img className='help-imgs' src="./img/helpProduct/ProdutoFiltradoResultado.png" alt="Funcionário filtrado" />
                        <p>Você pode filtrar os funcionário por categoria usando o menu suspenso de
                            filtragem localizado acima da lista de funcionário. </p>
                        <img className='help-imgs' src="./img/helpProduct/FiltragemProduto.png" alt="filtragem Funcionário" />
                        <p> Além disso, você pode pesquisar funcionário
                            específicos digitando o nome do funcionário na barra de pesquisa. </p>
                    </li>

                    <li>
                        <h4>Visualizar Detalhes do Funcionário:</h4>
                        <img className='help-imgs' src="./img/helpProduct/verDetalhes.png" alt="detalhes Funcionário" />
                        <p>Para visualizar mais detalhes de um funcionário, como sua descrição
                            completa e outras informações relevantes, clique no botão
                            "Ver detalhes" no cartão do funcionário desejado. </p>
                        <img className='help-imgs' src="./img/helpProduct/paginaProduto.png" alt="pagina do Funcionário" />
                        <p>Isso o levará a uma página separada com detalhes mais abrangentes
                            sobre o funcionário selecionado.</p>
                    </li>
                </ul>
                <button onClick={toggleModalClose} className='help-btn'>Entendi</button>
            </div>

            <figure className='Neo-Left'>
            <img src="img\Neo\NeoSit.png" alt="Neo-Sit" />
            </figure>
        </div>
    );
};

export default StaffHelp;
