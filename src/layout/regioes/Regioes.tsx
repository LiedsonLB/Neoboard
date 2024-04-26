import React, { useState, useEffect } from 'react';
import "./Regioes.css";
import { IoSearch, IoCamera } from 'react-icons/io5';
import RegionDoughnout from '../../components/charts/RegionDoughnout';
import RegionColumnChart from '../../components/charts/RegionColumnChart.tsx';
import axios from 'axios';

const Regioes = () => {
  const [showModal, setShowModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [regioes, setRegioes] = useState<any[]>([]); // Alterado para armazenar as regiões
  const [filtroPesquisa, setFiltroPesquisa] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<any>(null); // Estado para armazenar a região selecionada
  const [categorias, setCategorias] = useState<string[]>([]); // Definindo o estado categorias como uma lista de strings

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

  const fetchRegioes = async () => {
    try {
      const response = await axios.get('http://localhost:4000/v2/regioes');
      setRegioes(response.data);
      console.log(response.data)
      const categoriasUnicas = new Set(response.data.map((regiao: any) => regiao.cidade));
      const categoriasUnicasArray: string[] = Array.from(categoriasUnicas);
      setCategorias(categoriasUnicasArray);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  useEffect(() => {
    fetchRegioes();
  }, []);

  const filtrarPorCategoria = (categoria: string) => {
    setCategoriaSelecionada(categoria);
  };

  const handleFiltroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltroPesquisa(e.target.value);
  };

  const handleShowInfoModal = (regiao: any) => {
    setSelectedRegion(regiao);
    setShowInfoModal(true);
  };

  return (
    <>
      {showModal && (
        <div className='Modal-Add'>
          <div className='container-Add'>
            <div id="header-modal">
              <h4 className="modal-title">Adicionar Região</h4>
              <button type="button" className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
            </div>

            <div className='img-region-up'>
              <div className='img-input-container'>
                <input type="file" id='img-input' onChange={handleImageChange} />
                {selectedImage ? (
                  <img src={selectedImage} className='img-region-add' alt="Selected Region" />
                ) : (
                  <img src="./img/no_regionImg.jpeg" className='img-region-add' alt="Default Region" />
                )}
                <div className='icon-text-cam'>
                  <i className='icon-cam'><IoCamera /></i>
                  <p>Adicionar foto</p>
                </div>
              </div>
            </div>

            <div className="Add-Item-container">
              <div className='input-item input-mult'>
                <span>
                  <label htmlFor="name-item">Nome da Região:</label>
                  <input type="text" name='name-item' className='full-item' />
                </span>
                <span>
                  <label htmlFor="name-item">Cidade:</label>
                  <input type="text" name='name-item' className='full-item' />
                </span>
              </div>

              <div className='input-item input-single'>
                <span>
                  <label htmlFor="name-item">Endereço:</label>
                  <input type="text" name='name-item' className='full-item' />
                </span>
              </div>

              <div className='input-item input-single'>
                <span>
                  <label htmlFor="name-item">Vendedor Responsável:</label>
                  <input type="text" name='name-item' className='full-item' />
                </span>
              </div>

              <div className='input-item input-single'>
                <span>
                  <label htmlFor="name-item">Descrição:</label>
                  <textarea
                    name="message"
                    className="desc-prod"
                  />
                </span>
              </div>

              <button id='add-Region-Btn'>Enviar</button>
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
                  <img src={selectedRegion.picture} alt="region-avatar" />
                  <h2 className='nameUserProd'> {selectedRegion.nome}</h2>
                  <div id="ProdTextInfo">
                    <p><span>Endereço:</span> {selectedRegion.endereco}</p>
                    <p><span>Cidade:</span> {selectedRegion.cidade}</p>
                    <p><span>Total de clientes:</span> {selectedRegion.clientes}</p>
                    <p><span>Descrição:</span> {selectedRegion.descricao}</p>
                  </div>
                </div>
              </div>

              <div id='infoprod-charts'>
                <div id='container-ProductColumnChart'>
                  <RegionColumnChart />
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
                          <h3 data-toggle="tooltip" title="Cartão(debito)">Cartão(debito)</h3>
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

      <div id='region-container'>
        <div id='region-inside'>
          <header id="region-header">
            <h1>Regiões</h1>
            <p>Confira as regiões que mais venderam</p>
          </header>

          <main id='region-main'>
            <article id='region-card'>
              <p id='text-region-mes'>Região do Mês</p>
              <div id='reg-main'>
                <div id='container-region-img'>
                  <figure className='city-img'>
                    <img src="./img/Piripiri-Igreja-Matriz.png" alt="piripiri" />
                  </figure>
                  <div id='region-desc'>
                    <h1>Piripiri</h1>
                    <p>Faturamento: <span>250K</span></p>
                    <p>Unidades vendidas: <span>51K</span></p>
                  </div>
                </div>

                <div id='region-chart'>
                  <RegionDoughnout />
                </div>
              </div>
            </article>

            <section id='search-container-region'>
              <div id='search-bar-region'>
                <input type="search" id="search-region" placeholder='Pesquisar região' aria-label="Buscar" />
                <i id='search-icon-region'><IoSearch id='icon-region' /></i>
              </div>

              <div className='filter-container-btns'>
                <select id="filter-expense" value={categoriaSelecionada} onChange={(e) => setCategoriaSelecionada(e.target.value)}>
                  <option value="">Todos</option>
                  {categorias.map((categoria, index) => (
                    <option key={index} value={categoria}>{categoria}</option>
                  ))}
                </select>

                <button id='add-product' onClick={toggleModalClose}>
                  + Região
                </button>
              </div>
            </section>

            <p id='result-reg'>Resultados ({regioes.length})</p>
            <section id='container-table-regions'>
              <table>
                <thead className='theadTableRegions'>
                  <tr>
                    <td>região</td>
                    <td>nome</td>
                    <td>vendido</td>
                    <td>faturamento</td>
                    <td className='table-space'></td>
                  </tr>
                </thead>
                <tbody className='tBodyTableRegions'>

                  {regioes
                    .filter((regiao) =>
                      regiao.nome.toLowerCase().includes(filtroPesquisa.toLowerCase())
                    )
                    .map((regiao, index) => (
                      <tr key={index} className="region-row" onClick={() => handleShowInfoModal(regiao)}>
                        <td>
                          <div className="region-pic">
                            <img src={regiao.picture} alt={regiao.nome} />
                          </div>
                        </td>
                        <td>{regiao.nome}</td>
                        <td>{regiao.vendas}</td>
                        <td>{regiao.faturamento}</td>
                        <td className='table-btns'>
                          <button className="edit" onClick={() => handleShowInfoModal(regiao)}>Editar</button>
                          <button className="delete" onClick={() => handleShowInfoModal(regiao)}>Excluir</button>
                        </td>
                      </tr>
                    ))}

                </tbody>
              </table>
            </section>

          </main>
        </div>
      </div>
    </>
  )
}

export default Regioes