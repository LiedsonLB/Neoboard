import React from 'react'
import "./Regioes.css";
import { IoChevronForwardOutline, IoLogoWhatsapp, IoLogoLinkedin, IoMail, IoSearch, IoSearchCircle, IoSearchCircleOutline, IoSearchSharp } from 'react-icons/io5';

const Regioes = () => {
  return (
    <div id='region-container'>
      <div id='region-inside'>
        <header id="region-header">
          <h1>Regiões</h1>
          <p>Confira as regiões que mais venderam</p>
        </header>

        <main id='region-main'>

          <article id='region-card'>
            <div id='card-region-desc'>
              <p>Região do Mês</p>
            </div>
            <div id='reg-main'>
              <div id='container-region-img'>
                <figure className='city-img'>
                  <img src="./img/Catedral_de_Piripiri.jpg" alt="minha_prefeita" />
                </figure>
                <div id='region-desc'>
                  <h1>Piripiri</h1>
                  <p>Faturamento:</p>
                  <p>Unidades vendidas:</p>
                </div>
              </div>

              <div id='region-chart'>
                <img src="./img/mr-fresh-mr-fresh-multiverse.gif" alt="img-test" />
              </div>

            </div>
          </article>

          <section id='search-region'>
            <div id='search-bar-region'>
              <input type="search" id="search-region" placeholder='Pesquisar região' aria-label="Buscar" />
              <i id='search-icon-region'><IoSearch id='icon-region' /></i>
            </div>

            <button id='add-region'>
              + Região
            </button>
          </section>

          <section style={{ width: "90%", margin: "0 auto" }}>
            <p id='result-reg'>Resultados (3)</p>
            <table>
              <thead>
                <tr>
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

  )
}

export default Regioes