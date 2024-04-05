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
    <>
    {showModal && <div id="Modal-Add-Btn">
    <div id="container-Add-Btn">
      <div id="header-modal">
        <h4 className="modal-title">Adicionar Funcionário</h4>
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
    </div>
    <hr />
  </div >}

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
    </>
  )
}

export default Funcionarios