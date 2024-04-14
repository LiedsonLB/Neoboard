import React, { useState } from 'react'
import "./Regioes.css";
import { IoSearch, IoPerson, IoCamera, IoEarth, IoEarthOutline, IoPlanet, IoPlanetOutline, IoGlobe, IoMap, IoEarthSharp, IoHomeOutline } from 'react-icons/io5';
import RegionDoughnout from '../../components/charts/RegionDoughnout';

const Regioes = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModalClose = () => {
    setShowModal(!showModal);
  };

  return (
    <>
<<<<<<< HEAD
      {showModal && <div id="Modal-Add-Btn">
        <div id="container-Add-Btn">
          <div id="header-modal">
            <h4 className="modal-title">Adicionar Região</h4>
            <button type="button" id="close-btn" onClick={toggleModalClose}>&times;</button>
          </div>

          <div id="Add-Item">
            <div className='input-item input-single'>
              <span>
                <label htmlFor="name-item">Nome do funcionário:</label>
                <input type="text" name='name-item' className='full-item' />
              </span>
            </div>

            <div className='input-item input-mult'>
              <span>
                <label htmlFor="name-item">Data de nascimento:</label>
                <input type="text" name='name-item' className='full-item' />
              </span>
              <span>
                <label htmlFor="name-item">Local de atuação:</label>
                <input type="text" name='name-item' className='full-item' />
              </span>
            </div>

            <div className='input-item input-single'>
              <span>
                <label htmlFor="name-item">Email:</label>
                <input type="text" name='name-item' className='full-item' />
              </span>
            </div>

            <div className='input-item input-mult'>
              <span>
                <label htmlFor="name-item">Endereço:</label>
                <input type="text" name='name-item' className='full-item' />
              </span>
              <span>
                <label htmlFor="name-item">Telefone:</label>
                <input type="text" name='name-item' className='full-item' />
              </span>
            </div>

            <div className='input-item input-mult'>
              <span>
                <label htmlFor="name-item">CPF:</label>
                <input type="text" name='name-item' className='full-item' />
              </span>
              <span>
                <label htmlFor="name-item">Formação Acadêmica:</label>
                <input type="text" name='name-item' className='full-item' />
              </span>
            </div>

            <div className='input-item input-mult'>
              <span>
                <label htmlFor="name-item">Linkedin:</label>
                <input type="text" name='name-item' className='full-item' />
              </span>
              <span>
                <label htmlFor="name-item">Github:</label>
                <input type="text" name='name-item' className='full-item' />
              </span>
            </div>

=======
      {showModal && (
        <div className='Modal-Add'>
          <div className='container-Add-Region'>
            <div id="header-modal">
              <h4 className="modal-title">Adicionar Região</h4>
              <button type="button" className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <div id="Add-Item-Region">
              <div className='img-region-up'>
                <div className='img-input-container'>
                  <img src="" className='img-region-add' />
                  <input type="file" id='img-input' />
                  <i className='icon-reg-prof'><IoHomeOutline /></i>
                  <div className='icon-text-cam'>
                    <i className='icon-cam'><IoCamera /></i>
                    <p>Adicionar foto</p>
                  </div>
                </div>
              </div>

              <div className='input-item input-mult'>
                <span>
                  <label htmlFor="name-item">Nome da Região:</label>
                  <input type="text" name='name-item' className='full-item' />
                </span>
                <span>
                  <label htmlFor="name-item">Quantidade de Clientes:</label>
                  <input type="text" name='name-item' className='full-item' />
                </span>
              </div>

              <div className='input-item input-single'>
                <span>
                  <label htmlFor="name-item">Vendedor Responsável:</label>
                  <input type="text" name='name-item' className='full-item' />
                </span>
              </div>

              <button id='add-Region-Btn'>Enviar</button>
            </div>
>>>>>>> e2a3915df79f63e77759249d7756bb0b0fa35776
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
                        <button className="edit">Ver</button>
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
                        <button className="edit">Ver</button>
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
                        <button className="edit">Ver</button>
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