import React, { useState, useEffect } from 'react';
import "./Funcionarios.css";
import { IoSearch, IoCaretDownSharp } from 'react-icons/io5';
import StaffDoughnout from '../../components/charts/StaffDoughnout';

interface Funcionario {
  ID_funcionario: number;
  img_funcionario: string;
  Nome: string;
  usuario: string;
  endereco: string;
  vendas: number;
  faturamento: string;
}

const Funcionarios = () => {
  const [showModal, setShowModal] = useState(false);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [funcionariosDestaque, setFuncionariosDestaque] = useState<Funcionario[]>([]);

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=100');
        if (!response.ok) {
          throw new Error('Erro ao buscar funcionários');
        }
        const data = await response.json();
        const results = data.results;
        const funcionariosData: Funcionario[] = results.map((result: any, index: number) => ({
          ID_funcionario: index + 1,
          img_funcionario: result.picture.large,
          Nome: `${result.name.first} ${result.name.last}`,
          usuario: result.login.username,
          endereco: `${result.location.city}, ${result.location.country}`,
          vendas: Math.floor(Math.random() * 20000),
          faturamento: `${Math.floor(Math.random() * 999)}k`,
        }));
        setFuncionarios(funcionariosData);

        const funcionariosDestaqueAleatorios = funcionariosData.sort(() => 0.5 - Math.random()).slice(0, 2);
        setFuncionariosDestaque(funcionariosDestaqueAleatorios);
      } catch (error) {
        console.error('Erro ao buscar funcionários:', error);
      }
    };

    fetchFuncionarios();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredFuncionarios = funcionarios.filter(funcionario =>
    funcionario.Nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            {funcionariosDestaque.map(funcionario => (
              <article className='staff-card' key={funcionario.ID_funcionario}>
                <header>
                  <h2>Vendas</h2>
                </header>
                <figure className='staff-info'>
                  <img src={funcionario.img_funcionario} alt="stf-img" />
                  <figcaption className='staff-desc'>
                    <h2>{funcionario.Nome}</h2>
                    <p>Vendas: <span>{funcionario.vendas}</span></p>
                    <p>Faturamento: <span>{funcionario.faturamento}</span></p>
                  </figcaption>
                </figure>
                <div className='staff-chart'>
                  <StaffDoughnout />
                </div>
              </article>
            ))}
          </section>

          <section id='search-staff'>
            <div id='search-bar'>
              <input type="search" id="search-stf" placeholder='Pesquisar funcionario' aria-label="Buscar" value={searchTerm} onChange={handleSearch}/>
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

export default Funcionarios;
