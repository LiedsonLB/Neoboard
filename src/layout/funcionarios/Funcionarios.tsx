import React from 'react'
import "./Funcionarios.css";

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
                <p>Vendas: <span>50</span></p>
              </figcaption>
            </figure>
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
          </article>

        </section>
        <section id='search-staff'>
        <p>Pesquisar funcionário</p>
        <div id='search-'>
              
            </div>
        </section>

        <section id='staff-list'>

        </section>
      </main>

    </div>
  )
}

export default Funcionarios