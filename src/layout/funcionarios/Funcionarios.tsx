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
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Funcionario | null>(null);
  const [filteredFuncionarios, setFilteredFuncionarios] = useState<Funcionario[]>([]);

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
        setFilteredFuncionarios(funcionariosData);

        const funcionariosDestaqueAleatorios = funcionariosData.sort(() => 0.5 - Math.random()).slice(0, 2);
        setFuncionariosDestaque(funcionariosDestaqueAleatorios);
      } catch (error) {
        console.error('Erro ao buscar funcionários:', error);
      }
    };

    fetchFuncionarios();
  }, []);

  useEffect(() => {
    const filtered = funcionarios.filter(funcionario =>
      funcionario.Nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFuncionarios(filtered);
  }, [funcionarios, searchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleModalClose = () => {
    setShowModal(!showModal);
  };

  const toggleInfoModal = (funcionario: Funcionario) => {
    setSelectedUser(funcionario);
    setShowInfoModal(true);
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
              <IoCaretDownSharp onClick={() => setFilteredFuncionarios(funcionarios)} />
            </button>
            <button id='add-staff' onClick={toggleModalClose}>
              + Funcionário
            </button>
          </div>
          </section>

          <p id='result-staff'>Resultados ({filteredFuncionarios.length})</p>

          <section id='staff-list'>
            {filteredFuncionarios.map(funcionario => (
              <article className='stf-card' key={funcionario.ID_funcionario}>
                <figure className='staff-img'>
                  <img src={funcionario.img_funcionario} alt="stf-img" />
                </figure>
                <p className='staff-nick'>{funcionario.Nome}</p>
                <span>
                  <p><i className="fas fa-thumbtack"></i> {funcionario.endereco}</p>
                </span>
                <div className='stf-desc'>
                  <span>
                    <p className='stf-gain'>Vendas</p>
                    <p>{funcionario.vendas}</p>
                  </span>
                  <span>
                    <p className='stf-gain'>Faturamento</p>
                    <p>{funcionario.faturamento}</p>
                  </span>
                </div>
                <button onClick={() => toggleInfoModal(funcionario)}>Ver detalhes</button>
              </article>
            ))}
          </section>
        </main>
      </div>

      {showModal && (
        <div>ola mundo</div>
      )}

      {showInfoModal && selectedUser && (
        // Modal de exibição de informações do funcionário
        <div className="Modal-Add">
          <div className="container-Add">
          <div id="header-modal">
            <h4 className="modal-title">Informações do Funcionário</h4>
            <button type="button" className="close-btn" onClick={() => setShowInfoModal(false)}>&times;</button>
          </div>
            <img src={selectedUser.img_funcionario} alt="user-avatar" />
            <p>Nome: {selectedUser.Nome}</p>
            <p>Usuário: {selectedUser.usuario}</p>
            <p>Endereço: {selectedUser.endereco}</p>
            <p>Vendas: {selectedUser.vendas}</p>
            <p>Faturamento: {selectedUser.faturamento}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Funcionarios;