import React from 'react'
import "./Produtos.css";
import { IoChevronForwardOutline, IoLogoWhatsapp, IoLogoLinkedin, IoMail, IoSearch, IoSearchCircle, IoSearchCircleOutline, IoSearchSharp } from 'react-icons/io5';
import { FaDivide } from 'react-icons/fa';
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
        <article id='prod-main'>
          <div id='container-prod-img'>
            <figure className='icecream-img'>
              <img src="./img/picole.jpg" alt="picole_flocos" />
            </figure>
            <div id='prod-desc'>
              <h1>Picolé</h1>
              <p>Faturamento: <span>250K</span></p>
              <p>Unidades vendidas: <span>10K</span></p>
            </div>
          </div>

          <div id='card-prod-desc'>
            <ProductDoughnut />
          </div>

          <p className='tittle-prod'>Produto do Mês</p>
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
            <p>Picolé de flocos de 20ml</p>
            <p className='prod-name'>R$ 2.50</p>
            <button>Ver produto</button>
          </article>

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
            <p>Picolé de flocos de 20ml</p>
            <p className='prod-name'>R$ 2.50</p>
            <button>Ver produto</button>
          </article>

        </section>
      </main>
      </div>
    </div>
  )
}

export default Produtos