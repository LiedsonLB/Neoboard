import React, { useEffect, useState } from 'react';
import "./Produtos.css";
import { IoSearch, IoCamera, IoPencil, IoTrash, IoPencilSharp, IoCreate, IoMagnetOutline } from 'react-icons/io5';
import ProductDoughnut from '../../components/charts/ProductDoughtnout';
import ProductColumnChart from '../../components/charts/ProductColumnChart.tsx';
import axios from 'axios';

const Produtos = () => {
  const [showModal, setShowModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showNeoModal, setShowNeoModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [filtroPesquisa, setFiltroPesquisa] = useState('');

  const toggleModalClose = () => {
    setShowModal(!showModal);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setSelectedImage(result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const fetchProdutos = async () => {
    try {
      const response = await axios.get('http://localhost:4000/v3/produtos');
      setProdutos(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const adicionarProduto = async () => {
    try {
      const nomeElement = document.getElementById('name-item') as HTMLInputElement;
      const categoriaElement = document.getElementById('categoria-item') as HTMLInputElement;
      const valorElement = document.getElementById('valor-item') as HTMLInputElement;
      const descricaoElement = document.getElementById('descricao-item') as HTMLTextAreaElement;

      if (nomeElement && categoriaElement && valorElement && descricaoElement) {
        const nome = nomeElement.value;
        const categoria = categoriaElement.value;
        const valor = valorElement.value;
        const descricao = descricaoElement.value;

        if (nome && categoria && valor && descricao) {
          const novoProduto = {
            nome,
            categoria,
            preco: valor, // Renomear para 'preco' conforme a estrutura dos produtos
            descricao,
            imagem: selectedImage ? selectedImage : './img/no_productImg.jpeg', // Renomear para 'imagem' conforme a estrutura dos produtos
          };

          // Limpar os campos de entrada após adicionar o produto
          nomeElement.value = '';
          categoriaElement.value = '';
          valorElement.value = '';
          descricaoElement.value = '';

          await axios.post('http://localhost:4000/v3/produtos', novoProduto);
          fetchProdutos(); // Atualizar a lista de produtos após adicionar um novo
          setShowModal(false); // Fechar o modal de adicionar produto
        } else {
          console.error('Erro ao adicionar produto: Algum campo não foi preenchido.');
        }
      } else {
        console.error('Erro ao adicionar produto: Elemento não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
    }
  };

  const filtrarPorCategoria = (categoria: string) => {
    setCategoriaSelecionada(categoria);
  };

  const produtosFiltrados = produtos.filter((produto: any) =>
    produto.nome.toLowerCase().includes(filtroPesquisa.toLowerCase()) &&
    (categoriaSelecionada ? produto.categoria === categoriaSelecionada : true)
  );

  const handleFiltroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltroPesquisa(e.target.value);
  };

  const toggleNeoModalOpen = () => {
    setShowNeoModal(true);
    const helpElement = document.getElementById('Neo-Help');
    if (helpElement) {
      helpElement.style.display = 'none';
    }
  };

  const toggleNeoModalClose = () => {
    setShowNeoModal(false);
    const neoElement = document.getElementById('Neo-Help');
    if (neoElement && neoElement.style.display === 'none') {
      neoElement.style.display = 'block';
      neoElement.style.animation = 'none';
    }
  };

  return (
    <>
      {showNeoModal && <div className="Modal-Help">
        <div className='container-Help'>
          <div className="header-Help">
            <h4 className="help-title">Dicas do Neo: </h4>
            <button type="button" className="close-btn" onClick={toggleNeoModalClose}>&times;</button>
          </div>

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
              <button onClick={toggleNeoModalClose} className='help-btn'>Entendi</button>
            </div>

            <figure className='Neo-Left'>
              <img src="./img/NeoL.png" alt="Neo-Sit" />
            </figure>
          </div>
        </div>
      </div>}

      {showModal && (
        <div className="Modal-Add">
          <div className='container-Add'>
            <div id="header-modal">
              <h4 className="modal-title">Adicionar Produto: </h4>
              <button type="button" className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
            </div>

            <div className="Add-Item-container">
              <div className='img-prod-up'>
                <div className='img-input-container'>
                  <input type="file" id='img-input' onChange={handleImageChange} />
                  {selectedImage ? (
                    <img src={selectedImage} className='img-region-add' alt="Selected Region" />
                  ) : (
                    <img src="./img/no_productImg.jpeg" className='img-prod-add' alt="Default Region" />
                  )}
                  <div className='icon-text-cam'>
                    <i className='icon-cam'><IoCamera /></i>
                    <p>Adicionar foto</p>
                  </div>
                </div>
              </div>
              <div className='input-item input-single'>
                <span>
                  <label htmlFor="name-item">Nome do Produto:</label>
                  <input type="text" id='name-item' name='name-item' className='full-item' />
                </span>
              </div>

              <div className='input-item input-mult'>
                <span>
                  <label htmlFor="categoria-item">Categoria:</label>
                  <input type="text" id='categoria-item' name='categoria-item' className='full-item' />
                </span>

                <span>
                  <label htmlFor="valor-item">Valor Unitário (R$):</label>
                  <input type="text" id='valor-item' name='valor-item' className='full-item' />
                </span>
              </div>

              <div className='input-item input-single'>
                <span>
                  <label htmlFor="descricao-item">Descrição:</label>
                  <textarea
                    id='descricao-item'
                    name="descricao"
                    className="desc-prod"
                  />
                </span>
              </div>

              <button id='add-staff-Btn' onClick={adicionarProduto}>Enviar</button>
            </div>
          </div>
        </div>
      )}

      {showInfoModal && (
        <div className="Modal-Add">
          <div className="container-Detail-Product">
            <div id="header-modal">
              <h4 className="modal-title">Informações do Produto</h4>
              <button type="button" className="close-btn" onClick={() => setShowInfoModal(false)}>&times;</button>
            </div>

            <div id='Product-Info-Container'>
              <div id='infoprod-popup'>
                <div id='prodInfo-popup'>
                  <img src='/img/no_productImg.jpeg' alt="product-avatar" />
                  <h2 className='nameUserProd'> Picolé de Flocos</h2>
                  <div id="ProdTextInfo">
                    <p><span>Categoria:</span> Picolé</p>
                    <p><span>Valor:</span> R$ 2,50</p>
                    <p><span>Descrição:</span> Picolé muito bala mesmo </p>
                  </div>
                </div>
              </div>

              <div id='infoprod-charts'>
                <div id='container-ProductColumnChart'>
                  <ProductColumnChart />
                </div>

                <p className="text-history">Histórico de vendas: </p>
                <section id='container-table-prod'>
                  <table id='table-prod'>
                    <thead className='head-list-prod'>
                      <tr>
                        <td>Produto</td>
                        <td>Região</td>
                        <td>Quantidade</td>
                        <td>Data</td>
                        <td>Pagamento</td>
                      </tr>
                    </thead>
                    <tbody className='body-list-prod'>
                      <tr>
                        <td>
                          <h3 data-toggle="tooltip" title="Picolé sem cobertura">Picolé sem cobertura</h3>
                        </td>
                        <td>
                          <h3 data-toggle="tooltip" title="Piripiri">Piripiri</h3>
                        </td>
                        <td>
                          <h3 data-toggle="tooltip" title="5">5</h3>
                        </td>
                        <td>
                          <h3 data-toggle="tooltip" title="07/04/2024">07/04/2024</h3>
                        </td>
                        <td>
                          <h3 data-toggle="tooltip" title="Cartão(debito)">Cartão (debito)</h3>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </section>
              </div>

            </div>
          </div>
        </div>
      )}

      <div id='Neo-Help' onClick={toggleNeoModalOpen}>
        <img src="/img/NeoHead.png" alt="neo_head" />
      </div>

      <div id='product-container'>
        <div id='product-inside'>
          <header id="prod-header">
            <h1>Produtos</h1>
            <p>Confira os produtos que mais venderam</p>
          </header>

          <main id='product-main'>
            <article id='product-card'>
              <p id='text-prod-mes'>Produto do Mês</p>
              <div id='prod-main'>
                <div id='container-prod-img'>
                  <figure className='container-list-img'>
                    <img src="/img/Sorvete_1L.jpeg" alt="picole_flocos" />
                  </figure>
                  <div id='prod-desc'>
                    <h1>Sorvete de 1L</h1>
                    <p>Faturamento: <span>250K</span></p>
                    <p>Unidades vendidas: <span>51K</span></p>
                  </div>
                </div>
                <div id='card-prod-desc'>
                  <ProductDoughnut />
                </div>
              </div>
            </article>

            <section id='search-prod'>
              <div id='search-bar'>
                <input type="search" id="search-product" placeholder='Pesquisar produto' aria-label="Buscar" onChange={handleFiltroChange} />
                <i id='search-icon'><IoSearch id='icon-prod' /></i>
              </div>
              <button id='add-product' onClick={toggleModalClose}>
                + Produto
              </button>
            </section>

            <p id='result-product'>Resultados ({produtosFiltrados.length})</p>
            <section id='products-list'>

              {produtosFiltrados.map((produto: any) => (
                <article key={produto.id} className='prod-card'>
                  <figure className='container-list-img'>
                    <img src={produto.imagem} alt={produto.nome} />
                  </figure>
                  <p>{produto.nome}</p>
                  <p className='prod-name'>R$ {produto.preco}</p>
                  <button className='see-prod-btn' onClick={() => setShowInfoModal(true)}>Ver produto</button>
                  <div className='manager-btn'>
                    <div>
                      <button className='edit-item item-mng'><IoCreate id='edit-pen' /></button>
                    </div>
                    <div>
                      <button className='delete-item item-mng'><IoTrash id='edit-trash' /></button>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          </main>
        </div>
      </div>
    </>
  );
}

export default Produtos;