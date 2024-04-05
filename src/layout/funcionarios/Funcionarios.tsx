import React, { useState } from 'react'
import "./Funcionarios.css";
import { IoSearch, IoCaretDownSharp, IoPin } from 'react-icons/io5';
import StaffDoughnout from '../../components/charts/StaffDoughnout';

const Funcionarios = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModalClose = () => {
    setShowModal(!showModal);
  };
  return (
    <div id='staff-container'>
      <div id='staff-inside'>
      <header id='staff-header'>
        <h1>Funcionários</h1>
        <p>Funcionários do mês com mais...</p>
      </header>

      <main id='staff-main'>
        <section id='featured-staff'>
          <article className='staff-card'>
            <header>
              <h2>Vendas</h2>
            </header>
            <figure className='staff-info'>
            <img src="./img/PedroLucas.jpeg" alt="stf-img" />
              <figcaption className='staff-desc'>
                <h2>Pedro Lucas</h2>
                <p>Vendas: 15</p>
              </figcaption>
            </figure>
            <div className='staff-chart'>
              <StaffDoughnout />
            </div>
          </article>

          <article className='staff-card'>
            <header>
              <h2>Faturamento</h2>
            </header>
            <figure className='staff-info'>
            <img src="./img/Laesse.jpeg" alt="stf-img" />
              <figcaption className='staff-desc'>
                <h2>Laesse</h2>
                <p>Faturamento: 5.6K</p>
              </figcaption>
            </figure>
            <div className='staff-chart'>
              <StaffDoughnout />
            </div>
          </article>
        </section>

        <section id='search-staff'>
          <div id='search-bar'>
            <input type="search" id="search-stf" placeholder='Pesquisar funcionario' aria-label="Buscar" />
            <i id='search-icon'><IoSearch id='icon-staff' /></i>
          </div>
          <div className='search-btns'>
            <button id='filter-staff'>
              <p>Filtrar</p>
              <IoCaretDownSharp />
            </button>
            <button id='add-staff' onClick={toggleModalClose}>
              + Funcionário
            </button>
          </div>
        </section>

        <p id='result-staff'>Resultados (4)</p>
        <section id='staff-list'>
          <article className='stf-card'>
            <figure className='staff-img'>
            <img src="./img/PedroLucas.jpeg" alt="stf-img" />
            </figure>
            <p className='staff-nick'>Pedro Lucas</p>
            <span>
              <i className='staff-pin'><IoPin /></i>
              <p>Piripiri/Barras</p>
            </span>

            <div className='stf-desc'>
              <span>
                <p className='stf-gain'>Vendas</p>
                <p>0</p>
              </span>

              <span>
                <p className='stf-gain'>Faturamento</p>
                <p>10.5k</p>
              </span>
            </div>

            <button>Ver detalhes</button>
          </article>

          <article className='stf-card'>
            <figure className='staff-img'>
            <img src="./img/Laesse.jpeg" alt="stf-img" />
            </figure>
            <p className='staff-nick'>Laesse</p>
            <span>
              <i className='staff-pin'><IoPin /></i>
              <p>Pedro II</p>
            </span>

            <div className='stf-desc'>
              <span>
                <p className='stf-gain'>Vendas</p>
                <p>0</p>
              </span>

              <span>
                <p className='stf-gain'>Faturamento</p>
                <p>10.5k</p>
              </span>
            </div>

            <button>Ver detalhes</button>
          </article>

          <article className='stf-card'>
            <figure className='staff-img'>
              <img src="./img/Romário.jpeg" alt="stf-img" />
            </figure>
            <p className='staff-nick'>Romário</p>
            <span>
              <i className='staff-pin'><IoPin /></i>
              <p>Cap. De Campos</p>
            </span>

            <div className='stf-desc'>
              <span>
                <p className='stf-gain'>Vendas</p>
                <p>0</p>
              </span>

              <span>
                <p className='stf-gain'>Faturamento</p>
                <p>10.5k</p>
              </span>
            </div>

            <button>Ver detalhes</button>
          </article>

          <article className='stf-card'>
            <figure className='staff-img'>
            <img src="./img/Welignton.jpeg" alt="stf-img" />
            </figure>
            <p className='staff-nick'>Welignton</p>
            <span>
              <i className='staff-pin'><IoPin /></i>
              <p>Batalha</p>
            </span>

            <div className='stf-desc'>
              <span>
                <p className='stf-gain'>Vendas</p>
                <p>0</p>
              </span>

              <span>
                <p className='stf-gain'>Faturamento</p>
                <p>10.5k</p>
              </span>
            </div>

            <button>Ver detalhes</button>
          </article>

        </section>
      </main>
      </div>
    </div>
  )
}

export default Funcionarios