import React, { useState } from 'react';
import "./Produtos.css";
import { IoSearch, IoPerson, IoCamera } from 'react-icons/io5';
import ProductDoughnut from '../../components/charts/ProductDoughtnout';

const Produtos = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModalClose = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      {showModal && <div className="Modal-Add">
        <div className='Modal-Add'>
          <div className='container-Add-Staff'>
            <div id="header-modal">
              <h4 className="modal-title">Adicionar Funcionário</h4>
              <button type="button" className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <div id="Add-Item">

              <div className='img-stf-up'>
                <img src="" className='w-100 h-100' />
                <input type="file" id='img-input' />
                <i className='icon-prof'><IoPerson /></i>
                <div className='icon-text-cam'>
                  <i className='icon-cam'><IoCamera /></i>
                  <p>Adicionar foto</p>
                </div>
              </div>

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
              <button id='add-staff-Btn'>Enviar</button>
            </div>
          </div>
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
                <figure className='icecream-img'>
                  <img src="./img/picole.jpg" alt="picole_flocos" />
                </figure>
                <p>Picolé sem cobertura</p>
                <p className='prod-name'>R$ 0.65</p>
                <button>Ver produto</button>
              </article>

              <article className='prod-card'>
                <figure className='icecream-img'>
                  <img src="https://www.sloopsorvetes.com.br//img/produtos/sorvete_flocos_1.5%20L.png" alt="picole_flocos" />
                </figure>
                <p>Picolé de cobertura</p>
                <p className='prod-name'>R$ 2.00</p>
                <button>Ver produto</button>
              </article>

              <article className='prod-card'>
                <figure className='icecream-img'>
                  <img src="https://apoioentrega.vteximg.com.br/arquivos/ids/510299/7899975800769-Lacta-Sorvete-3-Chocolates-Lacta-Pote-15L---product.category----1-.jpg?v=637994719498870000" alt="picole_flocos" />
                </figure>
                <p>Açaí de 200ml</p>
                <p className='prod-name'>R$ 6.00</p>
                <button>Ver produto</button>
              </article>

              <article className='prod-card'>
                <figure className='icecream-img'>
                  <img src="https://lh6.googleusercontent.com/proxy/Gk0Iuu0-N79cbMqeeKRCwtKxxYLwiJQY0JQy5_rUmCVHKM72ivnC4yqpk9UGvYNh5I8R2LUjTFAEq5CG9ZRejrt18A8o-MUlw_p7iYg8IYN5uuGvyt8" alt="picole_flocos" />
                </figure>
                <p>Sorvete de 1L</p>
                <p className='prod-name'>R$ 12.00</p>
                <button>Ver produto</button>
              </article>

              <article className='prod-card'>
                <figure className='icecream-img'>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz6JTkc63Tn7_qUuzE63TfIek-7TIzxsqnkZj1wE7x2A&s./img/picole.jpg" alt="picole_flocos" />
                </figure>
                <p>Sorvete de 1.5L</p>
                <p className='prod-name'>R$ 15.00</p>
                <button>Ver produto</button>
              </article>

              <article className='prod-card'>
                <figure className='icecream-img'>
                  <img src="https://lh4.googleusercontent.com/proxy/PDadvtSUcbHF7D20GKNV986ow12UiW1jEofiRNKpp1ZGdBadkvDov0nKRbV5m2J785oi3_xqm5CAwVJq9m_xYaK4YErIV2tTuV9po-C71frF0wMHxWk" alt="picole_flocos" />
                </figure>
                <p>Picolé de flocos de 20ml</p>
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
