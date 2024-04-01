import React, { useState } from 'react'
import "./Regioes.css";
import { IoSearch } from 'react-icons/io5';
import RegionDoughnout from '../../components/charts/RegionDoughnout';

const Regioes = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModalClose = () => {
      setShowModal(!showModal);
  };

  return (
    <>
      {showModal && <div id="Modal-Add-imovel">
        <div id="container-Add-imovel">
          <div id="header-modal">
            <h4 className="modal-title">Adicionar Região</h4>
            <button type="button" id="close-btn" onClick={toggleModalClose}>&times;</button>
        </div>
        <hr/>
      </div>
    </div >}

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
                    <img src="./img/Catedral_de_Piripiri.jpg" alt="minha_prefeita" />
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

            <section id='search-region'>
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
                <thead>
                  <tr>
                    <td>img</td>
                    <td>nome</td>
                    <td>preço</td>
                    <td>vendido</td>
                    <td>faturamento</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <img src="./img/Catedral_de_Piripiri.jpg" alt="" style={{ width: '50px', height: '50px', borderRadius: '10px' }} />
                    </td>
                    <td>
                      <div className="table-regions">
                        <div className="name-table">
                          <h3>Picolé de Uva</h3>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="price">
                        <h3>R$2.50</h3>
                      </div>
                    </td>
                    <td>
                      <div className="sold">
                        <h3>1587</h3>
                      </div>
                    </td>
                    <td>
                      <h5 className="status comprado">R$50000K</h5>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                        <button className="edit">Ver</button>
                      </div>
                    </td>
                  </tr>

                  <tr className='row-white'>
                    <td>
                      <img src="./img/no_regionImg.jpeg" alt="" style={{ width: '60px', height: '60px', borderRadius: '10px' }} />
                    </td>
                    <td><h3>Sorvete de Banana</h3></td>
                    <td><h3>R$ 3.50</h3></td>
                    <td><h3>8300</h3></td>
                    <td><h5 className="status negociacao">R$30000K</h5></td>
                    <td>
                      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                        <button className="edit">Ver</button>
                      </div></td>
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