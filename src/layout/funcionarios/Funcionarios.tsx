import React from 'react'
import "./Funcionarios.css";
import StaffDoughnout from '../../components/charts/StaffDoughnout';
import { IoSearch } from 'react-icons/io5';

const Funcionarios = () => {
  return (
    <div id='staff-container'>
      <header id='staff-header'>
        <h1>Funcionários</h1>
        <p>Funcionários do mês com maior...</p>
      </header>

      <main id='staff-main'>
        <section id='featured-staff'>
          <article className='staff-card'>
            <header>
              <h2>Venda</h2>
            </header>
            <figure className='staff-info'>
              <img src="/img/PedroLucas.jpeg" alt="" />
              <figcaption className='staff-desc'>
                <h2>Pedro Lucas</h2>
                <p>Vendas:50 </p>
              </figcaption>
            </figure>
            <div className='staff-chart' >
              <StaffDoughnout/>
            </div>
          </article>

          <article className='staff-card'>
            <header>
              <h2>Faturamento</h2>
            </header>
            <figure className='staff-info'>
              <img src="/img/no_profile.png" alt="" />
              <figcaption className='staff-desc'>
                <h2>Laesse</h2>
                <p>Faturamento: 5.6K </p><br/>
              </figcaption>
            </figure>
            <div className='staff-chart' >
              <StaffDoughnout/>
            </div>
          </article>

        </section>
        <section id='search-staff'>
        <div id='search-bar'>
              <input type="search" id="search-staff" placeholder='Pesquisar funcionário' aria-label="Buscar" />
              <i id='search-icon'><IoSearch id='icon-staff' /></i>
            </div>
            <button id='add-staff'>
              + Funcionário
            </button>
          </section>

        <section id='staff-list'>

        </section>
      </main>

    </div>
  )
}

export default Funcionarios