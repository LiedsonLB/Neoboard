import React, { useState } from 'react'
import "./Regioes.css";
import { IoSearch, IoPerson, IoCamera, IoEarth, IoEarthOutline, IoPlanet, IoPlanetOutline, IoGlobe, IoMap, IoEarthSharp, IoHomeOutline } from 'react-icons/io5';
import RegionDoughnout from '../../components/charts/RegionDoughnout';
import RegionColumnChart from '../../components/charts/RegionColumnChart.tsx';

const Regioes = () => {
  const [showModal, setShowModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
        // Modal de exibição de informações do funcionário
        <div className="Modal-Add">
          <div className="container-Detail-Product">
            <div id="header-modal">
              <h4 className="modal-title">Informações do Produto</h4>
              <button type="button" className="close-btn" onClick={() => setShowInfoModal(false)}>&times;</button>
            </div>

            <div id='Product-Info-Container'>
              <div id='infoprod-popup'>
                <div id='prodInfo-popup'>
                  <img src='/img/no_regionImg.jpeg' alt="region-avatar" />
                  <h2 className='nameUserProd'> Piripiri</h2>
                  <div id="ProdTextInfo">
                    <p><span>Endereço:</span> Rua das Oliveiras, Bairro saci perere</p>
                    <p><span>Cidade:</span> Piripiri</p>
                    <p><span>Total de clientes:</span> 20K</p>
                    <p><span>Descrição:</span> Cidade muito bala </p>
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

              <button id='add-region' onClick={toggleModalClose}>
                + Região
              </button>
            </section>

            <p id='result-reg'>Resultados (3)</p>
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
                  <tr>
                    <td>
                      <div className="region-pic">
                        <img src="./img/Piripiri-Igreja-Matriz.png" alt="piripiri" />
                      </div>
                    </td>
                    <td>
                      <div className="price">
                        <h3>piripiri</h3>
                      </div>
                    </td>
                    <td>
                      <div className="sold">
                        <h3>1587</h3>
                      </div>
                    </td>
                    <td>
                      <h3>R$10000K</h3>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                        <button className="edit" onClick={() => setShowInfoModal(true)}>Ver</button>
                      </div>
                    </td>
                  </tr>

                  <tr className='row-white'>
                    <td>
                      <div className="region-pic">
                        <img src="./img/Pdois.jpg" alt="piripiri" />
                      </div>
                    </td>
                    <td><h3>Pedro II</h3></td>
                    <td><h3>8300</h3></td>
                    <td><h3>R$30000K</h3></td>
                    <td>
                      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                        <button className="edit" onClick={() => setShowInfoModal(true)}>Ver</button>
                      </div></td>
                  </tr>

                  <tr>
                    <td>
                      <div className="table-regions">
                        <div className="region-pic">
                          <img src="./img/no_regionImg.jpeg" alt="sem_regiao" />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="price">
                        <h3>Capitão de Campos</h3>
                      </div>
                    </td>
                    <td>
                      <div className="sold">
                        <h3>1587</h3>
                      </div>
                    </td>
                    <td>
                      <h3>R$50000K</h3>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                        <button className="edit" onClick={() => setShowInfoModal(true)}>Ver</button>
                      </div>
                    </td>
                  </tr>
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