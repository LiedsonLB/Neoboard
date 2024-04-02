import React from 'react';
import "./Produtos.css";
import { IoSearch } from 'react-icons/io5';
import DoughnutChart from '../../components/charts/DoughtnoutChart';
import ProductDoughnut from '../../components/charts/ProductDoughtnout';

const Produtos = () => {
  return (
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
            <button id='add-product'>
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
                <img src="./img/picole.jpg" alt="picole_flocos" />
              </figure>
              <p>Picolé de cobertura</p>
              <p className='prod-name'>R$ 2.00</p>
              <button>Ver produto</button>
            </article>

            <article className='prod-card'>
              <figure className='icecream-img'>
                <img src="./img/picole.jpg" alt="picole_flocos" />
              </figure>
              <p>Açaí de 200ml</p>
              <p className='prod-name'>R$ 6.00</p>
              <button>Ver produto</button>
            </article>

            <article className='prod-card'>
              <figure className='icecream-img'>
                <img src="./img/picole.jpg" alt="picole_flocos" />
              </figure>
              <p>Sorvete de 1L</p>
              <p className='prod-name'>R$ 12.00</p>
              <button>Ver produto</button>
            </article>

            <article className='prod-card'>
              <figure className='icecream-img'>
                <img src="./img/picole.jpg" alt="picole_flocos" />
              </figure>
              <p>Sorvete de 1.5L</p>
              <p className='prod-name'>R$ 15.00</p>
              <button>Ver produto</button>
            </article>

            <article className='prod-card'>
              <figure className='icecream-img'>
                <img src="./img/picole.jpg" alt="picole_flocos" />
              </figure>
              <p>Sorvete de 2L</p>
              <p className='prod-name'>R$ 18.00</p>
              <button>Ver produto</button>
            </article>

          </section>
        </main>
      </div>
    </div>
  );
}

export default Produtos;
