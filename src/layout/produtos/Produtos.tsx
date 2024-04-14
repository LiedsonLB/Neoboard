import React, { useState } from 'react';
import "./Produtos.css";
import { IoSearch, IoPerson, IoCamera, IoBasket, IoCart, IoLogoDropbox, IoCube } from 'react-icons/io5';
import ProductDoughnut from '../../components/charts/ProductDoughtnout';

const Produtos = () => {
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
            <h4 className="modal-title">Adicionar Produto</h4>
            <button type="button" id="close-btn" onClick={toggleModalClose}>&times;</button>
          </div>

          <div id="Add-Item">
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

          </div>
          <hr />
        </div>
      </div >}
=======
      {showModal && <div className="Modal-Add">
          <div className='container-Add-Product'>
            <div id="header-modal">
              <h4 className="modal-title">Adicionar Produto: </h4>
              <button type="button" className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <div id="Add-Item-Product">
>>>>>>> e2a3915df79f63e77759249d7756bb0b0fa35776

              <div className='img-prod-up'>
                <div className='img-input-container'>
                  <img src="" className='img-prod-add' />
                  <input type="file" id='img-input' />
                  <i className='icon-prod-prof'><IoCube /></i>
                  <div className='icon-text-cam'>
                    <i className='icon-cam'><IoCamera /></i>
                    <p>Adicionar foto</p>
                  </div>
                </div>
              </div>

              <div className='input-item input-single'>
                <span>
                  <label htmlFor="name-item">Nome do Produto:</label>
                  <input type="text" name='name-item' className='full-item' />
                </span>
              </div>

              <div className='input-item input-mult'>
                <span>
                  <label htmlFor="name-item">Tipo do Produto:</label>
                  <input type="text" name='name-item' className='full-item' />
                </span>
                <span>
                  <label htmlFor="name-item">Valor Unitário (R$):</label>
                  <input type="text" name='name-item' className='full-item' />
                </span>
              </div>

              <button id='add-staff-Btn'>Enviar</button>
            </div>
          </div>
        </div>}

      <div id='product-container'>
        <div id='product-inside'>
          <header id="prod-header">
            <h1>Produtos</h1>
            <p>Confira os produtos que mais venderam</p>
          </header>

          <main id='product-main'>
            <article id='prod-card'>
              <p id='text-prod-mes'>Produto do Mês</p>
              <div id='prod-main'>
                <div id='container-prod-img'>
                  <figure className='container-list-img'>
                    <img src="./img/picole.jpg" alt="picole_flocos" />
                  </figure>
                  <div id='prod-desc'>
                    <h1>Picolé sem cobertura</h1>
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
                <input type="search" id="search-product" placeholder='Pesquisar produto' aria-label="Buscar" />
                <i id='search-icon'><IoSearch id='icon-prod' /></i>
              </div>
              <button id='add-product' onClick={toggleModalClose}>
                + Produto
              </button>
            </section>

            <p id='result-product'>Resultados (6)</p>
            <section id='products-list'>
              <article className='prod-card'>
                <figure className='container-list-img'>
                  <img src="./img/Picole_sem_cobertura.jpeg" alt="picole_sem_cobertura" />
                </figure>
                <p>Picolé sem cobertura</p>
                <p className='prod-name'>R$ 0.65</p>
                <button>Ver produto</button>
              </article>

              <article className='prod-card'>
                <figure className='container-list-img'>
                  <img src="/img/Picole_com_cobertura.jpeg" alt="picole_com_cobertura" />
                </figure>
                <p>Picolé de cobertura</p>
                <p className='prod-name'>R$ 2.00</p>
                <button>Ver produto</button>
              </article>

              <article className='prod-card'>
                <figure className='container-list-img'>
                  <img src="/img/Acaí_200ml.jpeg" alt="_" />
                </figure>
                <p>Açaí de 200ml</p>
                <p className='prod-name'>R$ 6.00</p>
                <button>Ver produto</button>
              </article>

<<<<<<< HEAD
            <article className='prod-card'>
              <figure className='icecream-img'>
                <img src="./img/picole.jpg" alt="picole_flocos" />
              </figure>
              <p>Sorvete de 2L</p>
              <p className='prod-name'>R$ 18.00</p>
              <button>Ver produto</button>
            </article>
=======
              <article className='prod-card'>
                <figure className='container-list-img'>
                  <img src="/img/Sorvete_1L.jpeg" alt="Sorvete 1L" />
                </figure>
                <p>Sorvete de 1L</p>
                <p className='prod-name'>R$ 12.00</p>
                <button>Ver produto</button>
              </article>
>>>>>>> e2a3915df79f63e77759249d7756bb0b0fa35776

              <article className='prod-card'>
                <figure className='container-list-img'>
                  <img src="/img/Sorvete_1.5L.jpeg" alt="Sorvete 1.5L" />
                </figure>
                <p>Sorvete de 1.5L</p>
                <p className='prod-name'>R$ 15.00</p>
                <button>Ver produto</button>
              </article>

              <article className='prod-card'>
                <figure className='container-list-img'>
                  <img src="img/Sorvete_2L.jpeg" alt="Sorvete de 2L" />
                </figure>
                <p>Sorvete de 2L</p>
                <p className='prod-name'>R$ 18.00</p>
                <button>Ver produto</button>
              </article>

            </section>
          </main>
        </div>
      </div>
    </>
  );
}

export default Produtos;