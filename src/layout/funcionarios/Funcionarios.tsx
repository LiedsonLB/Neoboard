import React, { useState, useEffect } from 'react';
import "./Funcionarios.css";
import { IoSearch, IoCaretDownSharp, IoCamera, IoTrash, IoCreate } from 'react-icons/io5';
import StaffDoughnout from '../../components/charts/StaffDoughnout.tsx';
import StaffColumnChart from '../../components/charts/StaffColumnChart.tsx';
import axios from 'axios';
import Funcionario from '../../models/Funcionario.tsx';

const Funcionarios = () => {
  const [showModal, setShowModal] = useState(false);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [funcionariosDestaqueVendas, setFuncionariosDestaqueVendas] = useState<Funcionario[]>([]);
  const [funcionariosDestaqueFaturamento, setFuncionariosDestaqueFaturamento] = useState<Funcionario[]>([]);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Funcionario | null>(null);
  const [filteredFuncionarios, setFilteredFuncionarios] = useState<Funcionario[]>([]);
  const [selectionSession, setSelectionSession] = useState<'info' | 'charts'>('info');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const[userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    setUserId(localStorage.getItem('userID'))
    console.log(userId)

    const fetchUserID = () => {
      if (userId) {
        // Se o ID do usuário existir na localStorage, buscar os funcionários
        fetchFuncionarios();
      } else {
        console.error('ID do usuário não encontrado na localStorage.');
      }
    };
  
    fetchUserID();
  }, []);

  const formatDateBr = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const monthNames = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    const monthName = monthNames[month - 1];

    return `em ${day < 10 ? '0' + day : day} de ${monthName} de ${year}`;
  };

  const fetchFuncionarios = async () => {

    try {
      const response = await axios.get(`http://localhost:4000/v3/funcionarios?userId=${userId}`);
      const data = response.data;
      const funcionariosOrdenadosPorVendas = [...data].sort((a: Funcionario, b: Funcionario) => b.vendas - a.vendas);
      const funcionarioDestaqueVendas = funcionariosOrdenadosPorVendas.slice(0, 1);
      const funcionariosOrdenadosPorFaturamento = [...data].sort((a: Funcionario, b: Funcionario) => b.faturamento - a.faturamento);
      const funcionarioDestaqueFaturamento = funcionariosOrdenadosPorFaturamento.slice(0, 1);
      setFuncionarios(data);
      setFilteredFuncionarios(data);
      setFuncionariosDestaqueVendas(funcionarioDestaqueVendas);
      setFuncionariosDestaqueFaturamento(funcionarioDestaqueFaturamento);
    } catch (error) {
      console.error('Erro ao buscar funcionários:', error);
    }
  };

  const adicionarFuncionario = async () => {
    try {
      let nomeElement = document.getElementById('nome-item') as HTMLInputElement;
      let dataNascimentoElement = document.getElementById('data-nascimento-item') as HTMLInputElement;
      let localAtuacaoElement = document.getElementById('local-atuacao-item') as HTMLInputElement;
      let emailElement = document.getElementById('email-item') as HTMLInputElement;
      let enderecoElement = document.getElementById('endereco-item') as HTMLInputElement;
      let telefoneElement = document.getElementById('telefone-item') as HTMLInputElement;
      let cpfElement = document.getElementById('cpf-item') as HTMLInputElement;
      let formacaoAcademicaElement = document.getElementById('formacao-academica-item') as HTMLInputElement;
      let linkedinElement = document.getElementById('linkedin-item') as HTMLInputElement;
      let githubElement = document.getElementById('github-item') as HTMLInputElement;

      if (
        nomeElement && dataNascimentoElement && localAtuacaoElement && emailElement &&
        enderecoElement && telefoneElement && cpfElement && formacaoAcademicaElement &&
        linkedinElement && githubElement
      ) {
        let nome = nomeElement.value;
        let dataNascimento = dataNascimentoElement.value;
        let localAtuacao = localAtuacaoElement.value;
        let email = emailElement.value;
        let endereco = enderecoElement.value;
        let telefone = telefoneElement.value;
        let cpf = cpfElement.value;
        let formacaoAcademica = formacaoAcademicaElement.value;
        let linkedin = linkedinElement.value;
        let github = githubElement.value;

        if (
          nome && dataNascimento && localAtuacao && email && endereco &&
          telefone && cpf && formacaoAcademica && linkedin && github
        ) {
          const novoFuncionario = {
            imagemUrl: selectedImage ? selectedImage : './img/no_profile.png',
            nome,
            email,
            //descricao, 
            endereco,
            localAtuacao,
            //genero,
            cpf,
            //dataContratacao,
            dataNascimento,
            telefone,
            formacaoAcademica,
            linkedin,
            github,
            usuarioId: userId
          };

          await axios.post('http://localhost:4000/v3/funcionarios', novoFuncionario);
          console.log('Funcionário adicionado com sucesso!');
          setShowModal(false);
        } else {
          console.error('Erro ao adicionar funcionário: Algum campo não foi preenchido.');
        }
      } else {
        console.error('Erro ao adicionar funcionário: Elemento não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao adicionar funcionário:', error);
    }
  };

  const handleDelete = (funcionario: Funcionario) => async () => {
    try {
      // Faz a requisição DELETE para a rota da API para excluir o funcionário
      await axios.delete(`http://localhost:4000/v3/funcionarios/${funcionario.id}`);
      console.log('Funcionário excluído com sucesso!');

      // Atualiza a lista de funcionários após a exclusão
      const updatedFuncionarios = funcionarios.filter(f => f.id !== funcionario.id);
      setFuncionarios(updatedFuncionarios);
      setFilteredFuncionarios(updatedFuncionarios);

      // Atualiza funcionariosDestaqueVendas e funcionariosDestaqueFaturamento
      const funcionariosOrdenadosPorVendas = [...updatedFuncionarios].sort((a: Funcionario, b: Funcionario) => b.vendas - a.vendas);
      const funcionarioDestaqueVendas = funcionariosOrdenadosPorVendas.slice(0, 1);
      setFuncionariosDestaqueVendas(funcionarioDestaqueVendas);

      const funcionariosOrdenadosPorFaturamento = [...updatedFuncionarios].sort((a: Funcionario, b: Funcionario) => b.faturamento - a.faturamento);
      const funcionarioDestaqueFaturamento = funcionariosOrdenadosPorFaturamento.slice(0, 1);
      setFuncionariosDestaqueFaturamento(funcionarioDestaqueFaturamento);
    } catch (error) {
      console.error('Erro ao excluir funcionário:', error);
    }
  };

  useEffect(() => {
    const filtered = funcionarios.filter(funcionario =>
      funcionario.nome.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      console.log(result)
      setSelectedImage(result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
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
            {funcionariosDestaqueVendas.map(funcionario => (
              <article className='staff-card' key={funcionario.ID_funcionario}>
                <header>
                  <h2>Vendas</h2>
                </header>
                <figure className='staff-info'>
                  <img src={funcionario.picture} alt="stf-img" />
                  <figcaption className='staff-desc'>
                    <h2>{funcionario.nome}</h2>
                    <p>Vendas: <span>{funcionario.vendas}</span></p>
                    <p>Faturamento: <span>{funcionario.faturamento}</span></p>
                  </figcaption>
                </figure>
                <div className='staff-chart'>
                  <StaffDoughnout />
                </div>
              </article>
            ))}

            {funcionariosDestaqueFaturamento.map(funcionario => (
              <article className='staff-card' key={funcionario.ID_funcionario}>
                <header>
                  <h2>Faturamento</h2>
                </header>
                <figure className='staff-info'>
                  <img src={funcionario.picture} alt="stf-img" />
                  <figcaption className='staff-desc'>
                    <h2>{funcionario.nome}</h2>
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
              <input type="search" id="search-stf" placeholder='Pesquisar funcionario' aria-label="Buscar" value={searchTerm} onChange={handleSearch} />
              <i id='search-icon'><IoSearch id='icon-staff' /></i>
            </div>
            <div className='search-btns'>
              <button id='filter-staff'>
                <p>Classificar</p>
                <IoCaretDownSharp onClick={() => setFilteredFuncionarios(funcionarios)} />
              </button>
              <button id='add-staff' onClick={() => { toggleModalClose(); adicionarFuncionario() }}>
                + Funcionário
              </button>
            </div>
          </section>

          <p id='result-staff'>Resultados ({filteredFuncionarios.length})</p>

          <section id='staff-list'>
            {filteredFuncionarios.map(funcionario => (
              <article className='stf-card' key={funcionario.ID_funcionario}>
                <figure className='staff-img'>
                  <img src={funcionario.picture} alt="stf-img" />
                </figure>
                <p className='staff-nick'>{funcionario.nome}</p>
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
                <button className='see-stf-btn' onClick={() => toggleInfoModal(funcionario)}>Ver detalhes</button>
                <div className='manager-btn'>
                  <button className='edit-item item-mng'><IoCreate id='edit-pen' /></button>
                  <button className='delete-item item-mng' onClick={handleDelete(funcionario)}><IoTrash id='edit-trash' /></button>
                </div>
              </article>
            ))}
          </section>
        </main>
      </div>

      {showModal && (
        <div className='Modal-Add'>
          <div className='container-Add'>
            <div id="header-modal">
              <h4 className="modal-title">Adicionar Funcionário</h4>
              <button type="button" className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
            </div>

            <div className="Add-Item-container">
              <div className='img-stf-up'>
                <div className='img-input-container'>
                  <input type="file" id='img-input' onChange={handleImageChange} />
                  {selectedImage ? (
                    <img src={selectedImage} className='img-staff-add' alt="Selected Region" />
                  ) : (
                    <img src="./img/no_profile.png" className='img-staff-add' alt="Default Region" />
                  )}
                  <div className='icon-text-cam'>
                    <i className='icon-cam'><IoCamera /></i>
                    <p>Adicionar foto</p>
                  </div>
                </div>
              </div>
              <div className='input-item input-single'>
                <span>
                  <label htmlFor="name-item">Nome do funcionário:</label>
                  <input type="text" name='name-item' className='full-item' id='name-item'/>
                </span>
              </div>

              <div className='input-item input-mult'>
                <span>
                  <label htmlFor="data-nascimento-item">Data de nascimento:</label>
                  <input type="text" name='data-nascimento-item' className='full-item' id='data-nascimento-item'/>
                </span>
                <span>
                  <label htmlFor="local-atuacao-item">Local de atuação:</label>
                  <input type="text" name='local-atuacao-item' className='full-item' id='local-atuacao-item'/>
                </span>
              </div>

              <div className="input-item input-mult">
                <span>
                  <label htmlFor="data-contrato-item">
                    Data de Contratação:
                  </label>
                  <input
                    type="text"
                    name="data-contrato-item"
                    className="full-item"
                    id="data-contrato-item"
                  />
                </span>
                <span>
                  <label htmlFor="genero-item">Genero:</label>
                  <input
                    type="text"
                    name="genero-item"
                    className="full-item"
                    id="genero-item"
                  />
                </span>
              </div>

              <div className='input-item input-single'>
                <span>
                  <label htmlFor="email-item">Email:</label>
                  <input type="text" name='email-item' className='full-item' id='email-item'/>
                </span>
              </div>

              <div className='input-item input-mult'>
                <span>
                  <label htmlFor="endereco-item">Endereço:</label>
                  <input type="text" name='endereco-item' className='full-item' id='endereco-item'/>
                </span>
                <span>
                  <label htmlFor="telefone-item">Telefone:</label>
                  <input type="text" name='telefone-item' className='full-item' id='telefone-item'/>
                </span>
              </div>

              <div className='input-item input-mult'>
                <span>
                  <label htmlFor="cpf-item">CPF:</label>
                  <input type="text" name='cpf-item' className='full-item' id='cpf-item'/>
                </span>
                <span>
                  <label htmlFor="formacao-academica-item">Formação Acadêmica:</label>
                  <input type="text" name='formacao-academica-item' className='full-item' id='formacao-academica-item'/>
                </span>
              </div>

              <div className='input-item input-mult'>
                <span>
                  <label htmlFor="linkedin-item">Linkedin:</label>
                  <input type="text" name='linkedin-item' className='full-item' id='linkedin-item'/>
                </span>
                <span>
                  <label htmlFor="github-item">Github:</label>
                  <input type="text" name='github-item' className='full-item' id='github-item'/>
                </span>
              </div>

              <div className="input-item input-single">
                <span>
                  <label htmlFor="description-item">Descrição:</label>
                  <textarea
                    type="text"
                    name="description-item"
                    className="desc-staff"
                    id="description-item"
                  />
                </span>
              </div>

              <button id='add-staff-Btn' onClick={adicionarFuncionario}>Enviar</button>
            </div>
          </div>
        </div>
      )}

      {showInfoModal && selectedUser && (
        // Modal de exibição de informações do funcionário
        <div className="Modal-Add">
          <div className="container-Detail-Staff">
            <div id="header-modal">
              <h4 className="modal-title">Informações do Funcionário</h4>
              <button type="button" className="close-btn" onClick={() => setShowInfoModal(false)}>&times;</button>
            </div>
            <div id='infouser-popup'>
              <div id='userInfo-popup'>
                <img src={selectedUser.picture} alt="user-avatar" />
                <h2 className='nameUserStf'>{selectedUser.nome}</h2>
                <p className='emailUserStf'>{selectedUser.email}</p>
                <div className='userStfSocialMidia'>
                  <a href={`mailto:${selectedUser.email}`} style={{ color: 'var(--purple-color)' }}><i className="fa-solid fa-envelope"></i></a>
                  <a href={selectedUser.github} style={{ color: 'var(--black-color)' }}><i className="fa-brands fa-github"></i></a>
                  <a href={selectedUser.linkedin} style={{ color: 'var(--secondy-color)' }}><i className="fa-brands fa-linkedin"></i></a>
                </div>
              </div>

              <div id='select-session-staff'>
                <div id='select-session-staff-btnContainer'>
                  <button className={selectionSession === 'info' ? 'select-session selected' : 'select-session'} onClick={() => setSelectionSession('info')}>Perfil</button>
                  <button className={selectionSession === 'charts' ? 'select-session selected' : 'select-session'} onClick={() => setSelectionSession('charts')}>Desempenho</button>
                </div>

                {(selectionSession === 'info' || selectionSession === 'charts') && (
                  <>
                    {selectionSession === 'info' && (
                      <div id='infouser-description'>
                        <div id='about-container'>
                          <h3>Sobre {selectedUser.nome.split(' ')[0]}</h3>
                          <hr />
                        </div>
                        <div id='aboutMe-description'>
                          <p>{selectedUser.descricao}</p>
                        </div>
                        <div id="userStfTextInfo">
                          <p>idade: <span>{selectedUser.age} anos</span></p>
                          <p>CPF: <span>{selectedUser.cpf}</span></p>
                          <p>Endereço: <span>{selectedUser.endereco}</span></p>
                          <p>Gênero: <span>{selectedUser.genero}</span></p>
                          <p>Cargo: <span>{selectedUser.cargo}</span></p>
                          <p>Contratação: <span>{formatDateBr(selectedUser.dataContratacao)}</span></p>
                          <p>Acadêmico: <span>{selectedUser.formacaoAcademica}</span></p>
                          <p>Telefone: <span>{selectedUser.phone}</span></p>
                        </div>
                      </div>
                    )}

                    {selectionSession === 'charts' && (
                      <div id='infouser-charts'>
                        <div id='container-StaffColumnChart'>
                          <StaffColumnChart />
                        </div>

                        <p className="text-history">Histórico de vendas: </p>
                        <section id='container-table-stf'>
                          <table id='table-stf'>
                            <thead className='head-list-stf'>
                              <tr>
                                <td>Produto</td>
                                <td>Região</td>
                                <td>Quantidade</td>
                                <td>Data</td>
                                <td>Pagamento</td>
                              </tr>
                            </thead>
                            <tbody className='body-list-stf'>
                              <tr>
                                <td>
                                  <h3 data-toggle="tooltip" title="Picolé sem cobertura">Picolé sem cobertura</h3>
                                </td>
                                <td>
                                  <h3 data-toggle="tooltip" title="Piripiri">Piripiri</h3>
                                </td>
                                <td>
                                  <h3 data-toggle="tooltip" title="5">5</h3>
                                </td>
                                <td>
                                  <h3 data-toggle="tooltip" title="07/04/2024">07/04/2024</h3>
                                </td>
                                <td>
                                  <h3 data-toggle="tooltip" title="Cartão(debito)">Cartão(debito)</h3>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </section>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Funcionarios;