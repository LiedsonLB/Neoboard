import React, { useState } from 'react';
import "./Produtos.css";
import { IoSearch } from 'react-icons/io5';
import ProductDoughnut from '../../components/charts/ProductDoughtnout';

const Produtos = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModalClose = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      {showModal && <div id="Modal-Add-Btn">
        <div id="container-Add-Btn">
          <div id="header-modal">
            <h4 className="modal-title">Adicionar Produto</h4>
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

          </div>
          <hr />
        </div>
      </div >}

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
                  <figure className='icecream-img'>
                    <img src="./img/picole.jpg" alt="picole_flocos" />
                  </figure>
                  <div id='prod-desc'>
                    <h1>Picolé</h1>
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

            <p id='result-product'>Resultados (3)</p>
            <section id='products-list'>
              <article className='prod-card'>
                <figure className='icecream-img'>
                  <img src="./img/picole.jpg" alt="picole_flocos" />
                </figure>
                <p>Picolé de flocos de 20ml</p>
                <p className='prod-name'>R$ 2.50</p>
                <button>Ver produto</button>
              </article>

              <article className='prod-card'>
                <figure className='icecream-img'>
                  <img src="./img/picole.jpg" alt="picole_flocos" />
                </figure>
                <p>Picolé de banana de 20ml</p>
                <p className='prod-name'>R$ 2.50</p>
                <button>Ver produto</button>
              </article>

              <article className='prod-card'>
                <figure className='icecream-img'>
                  <img src="./img/picole.jpg" alt="picole_flocos" />
                </figure>
                <p>Picolé de chiclete de 20ml</p>
                <p className='prod-name'>R$ 2.50</p>
                <button>Ver produto</button>
              </article>

              <article className='prod-card'>
                <figure className='icecream-img'>
                  <img src="./img/picole.jpg" alt="picole_flocos" />
                </figure>
                <p>Picolé de bacalhau de 20ml</p>
                <p className='prod-name'>R$ 2.50</p>
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