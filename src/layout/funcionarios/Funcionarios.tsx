import React, { useState, useEffect } from 'react';
import "./Funcionarios.css";
import { IoSearch, IoCaretDownSharp, IoCamera } from 'react-icons/io5';
import StaffDoughnout from '../../components/charts/StaffDoughnout';
import StaffColumnChart from '../../components/charts/StaffColumnChart.tsx';
import axios from 'axios';

interface Funcionario {
  ID_funcionario: number;
  img_funcionario: string;
  nome: string;
  email: string;
  endereco: string;
  vendas: number;
  faturamento: string;
  gender: string;
  age: number;
  date: string
}

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
          nome: `${result.name.first} ${result.name.last}`,
          email: result.email,
          endereco: `${result.location.city}, ${result.location.country}`,
          vendas: Math.floor(Math.random() * 20000),
          faturamento: `${Math.floor(Math.random() * 999)}k`,
          gender: result.gender,
          age: result.dob.age,
          date: formatDate(result.dob.date),
        }));
        setFuncionarios(funcionariosData);
        setFilteredFuncionarios(funcionariosData);

        const funcionariosDestaqueVendas = funcionariosData.sort(() => 2.5 - Math.random()).slice(0, 1);
        const funcionariosDestaqueFaturamento = funcionariosData.sort(() => 6.5 - Math.random()).slice(0, 1);
        setFuncionariosDestaqueVendas(funcionariosDestaqueVendas);
        setFuncionariosDestaqueFaturamento(funcionariosDestaqueFaturamento);
      } catch (error) {
        console.error('Erro ao buscar funcionários:', error);
      }
    };

    fetchFuncionarios();
  }, []);

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
  };

  const adicionarFuncionario = async () => {
    try {
      const nomeElement = document.getElementById('nome-item') as HTMLInputElement;
      const dataNascimentoElement = document.getElementById('data-nascimento-item') as HTMLInputElement;
      const localAtuacaoElement = document.getElementById('local-atuacao-item') as HTMLInputElement;
      const emailElement = document.getElementById('email-item') as HTMLInputElement;
      const enderecoElement = document.getElementById('endereco-item') as HTMLInputElement;
      const telefoneElement = document.getElementById('telefone-item') as HTMLInputElement;
      const cpfElement = document.getElementById('cpf-item') as HTMLInputElement;
      const formacaoAcademicaElement = document.getElementById('formacao-academica-item') as HTMLInputElement;
      const linkedinElement = document.getElementById('linkedin-item') as HTMLInputElement;
      const githubElement = document.getElementById('github-item') as HTMLInputElement;

      if (
        nomeElement && dataNascimentoElement && localAtuacaoElement && emailElement &&
        enderecoElement && telefoneElement && cpfElement && formacaoAcademicaElement &&
        linkedinElement && githubElement
      ) {
        const nome = nomeElement.value;
        const dataNascimento = dataNascimentoElement.value;
        const localAtuacao = localAtuacaoElement.value;
        const email = emailElement.value;
        const endereco = enderecoElement.value;
        const telefone = telefoneElement.value;
        const cpf = cpfElement.value;
        const formacaoAcademica = formacaoAcademicaElement.value;
        const linkedin = linkedinElement.value;
        const github = githubElement.value;

        if (
          nome && dataNascimento && localAtuacao && email && endereco &&
          telefone && cpf && formacaoAcademica && linkedin && github
        ) {
          const novoFuncionario = {
            nome,
            dataNascimento,
            localAtuacao,
            email,
            endereco,
            telefone,
            cpf,
            formacaoAcademica,
            linkedin,
            github,
            imagemUrl: selectedImage ? selectedImage : './img/no_profile.png',
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
                  <img src={funcionario.img_funcionario} alt="stf-img" />
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
                  <img src={funcionario.img_funcionario} alt="stf-img" />
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
              <button id='add-staff' onClick={() => {toggleModalClose(); adicionarFuncionario()}}>
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
                <button onClick={() => toggleInfoModal(funcionario)}>Ver detalhes</button>
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

            <div className="Add-Item-container">
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
                <img src={selectedUser.img_funcionario} alt="user-avatar" />
                <h2 className='nameUserStf'>{selectedUser.nome}</h2>
                <p className='emailUserStf'>{selectedUser.email}</p>
                <div className='userStfSocialMidia'>
                  <a href=""><i className="fa-solid fa-envelope"></i></a>
                  <a href=""><i className="fa-brands fa-github"></i></a>
                  <a href=""><i className="fa-brands fa-linkedin"></i></a>
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
                        <p>"Sou uma profissional dedicada e com mais de 5 anos de experiência na área, atuo remotamente pois moro em outro estado"</p>
                        </div>
                        <div id="userStfTextInfo">
                          <p>idade: <span>{selectedUser.age} anos</span></p>
                          <p>CPF: <span>{selectedUser.vendas}</span></p>
                          <p>Endereço: <span>{selectedUser.endereco}</span></p>
                          <p>Gênero: <span>{selectedUser.gender}</span></p>
                          <p>Contratação: <span>{selectedUser.date}</span></p>
                          <p>Acadêmico: <span>Bacharelado Ciência da Computação</span></p>
                          <p>Telefone: <span>+55869976543</span></p>
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