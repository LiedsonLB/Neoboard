import React, { useState, useEffect, useRef } from 'react';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
// @ts-ignore
import { storage } from '../../services/firebase.js';
import "./Funcionarios.css";
import { IoSearch, IoCamera, IoTrash, IoCreate } from 'react-icons/io5';
import StaffDoughnout from '../../components/charts/StaffDoughnout.tsx';
import StaffColumnChart from '../../components/charts/StaffColumnChart.tsx';
import axios from 'axios';
import Funcionario from '../../models/Funcionario.tsx';
import Popup from '../../components/popup/Popup.tsx';

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
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [editandoFuncionario, setEditandoFuncionario] = useState<Funcionario | null>(null);
  const [modalEditOpen, setModalEditOpen] = useState(false);

  const [mensagem, setMensagem] = useState('');
  const [popupType, setPopupType] = useState('');
  const [popupTitle, setPopupTitle] = useState('');

  const nomeRef = useRef<HTMLInputElement>(null);
  const dataNascimentoRef = useRef<HTMLInputElement>(null);
  const localAtuacaoRef = useRef<HTMLInputElement>(null);
  const dataContratoRef = useRef<HTMLInputElement>(null);
  const generoRef = useRef<HTMLSelectElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const cargoRef = useRef<HTMLInputElement>(null);
  const telefoneRef = useRef<HTMLInputElement>(null);
  const cpfRef = useRef<HTMLInputElement>(null);
  const formacaoAcademicaRef = useRef<HTMLInputElement>(null);
  const linkedinRef = useRef<HTMLInputElement>(null);
  const githubRef = useRef<HTMLInputElement>(null);
  const descricaoRef = useRef<HTMLTextAreaElement>(null);

  const formatDateBr = (dateString: string | undefined) => {
    if (!dateString) return 'Não informado';

    const date = new Date(dateString);
    const day = date.getDate() + 1;
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const monthNames = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    const monthName = monthNames[month - 1];

    return `${day < 10 ? '0' + day : day} de ${monthName} de ${year}`;
  };

  const uploadImageToStorage = async (image: File): Promise<string> => {
    try {
      const storageRef = ref(storage, `staffs/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      const snapshot = await uploadTask;
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      throw error;
    }
  };

  const hidePopupAfterTimeout = () => {
    setTimeout(() => {
      setMensagem('');
    }, 4500);
  };

  const fetchFuncionarios = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/v3/funcionarios?userId=${localStorage.getItem('userID')}`);
      const data = response.data;

      console.log("essa função repete infinitamente")

      const funcionariosOrdenadosPorVendas = [...data].sort((a: Funcionario, b: Funcionario) => b.numVendas - a.numVendas);
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
      const nome = nomeRef.current?.value;
      const dataNascimento = dataNascimentoRef.current?.value;
      const localAtuacao = localAtuacaoRef.current?.value;
      const cargo = cargoRef.current?.value || 'Não informado';
      const email = emailRef.current?.value || 'Não informado';
      const telefone = telefoneRef.current?.value;
      const cpf = cpfRef.current?.value;
      const linkedin = linkedinRef.current?.value || 'Não informado';
      const github = githubRef.current?.value || 'Não informado';
      const genero = generoRef.current?.value || 'Não informado';
      const descricao = descricaoRef.current?.value || 'Não informado';
      const dataContratacao = dataContratoRef.current?.value || 'Não informado';


      let picture = '/img/no_productImg.jpeg';
      if (selectedImage) {
        // Fazer upload da imagem para o Firebase Storage
        const downloadURL = await uploadImageToStorage(selectedImage);
        // Definir a URL da imagem obtida
        picture = downloadURL;
      }

      if (nome && dataNascimento && localAtuacao && cpf) {
        const novoFuncionario: Funcionario = {
          picture,
          nameImg: selectedImage ? selectedImage.name : '/img/no_profile.png',
          nome,
          email,
          genero,
          localAtuacao,
          cpf,
          dataNascimento,
          dataContratacao,
          telefone,
          linkedin,
          github,
          descricao,
          cargo,
          usuarioId: localStorage.getItem('userID') || '',
          numVendas: 2490,
          faturamento: 67,
        };

        await axios.post('http://localhost:4000/v3/funcionarios', novoFuncionario);
        console.log('Funcionário adicionado com sucesso!');
        setShowModal(false);

        // Limpar os campos do formulário e redefinir o estado do modal
        if (dataNascimentoRef.current) dataNascimentoRef.current.value = '';
        if (localAtuacaoRef.current) localAtuacaoRef.current.value = '';
        if (dataContratoRef.current) dataContratoRef.current.value = '';
        if (generoRef.current) generoRef.current.value = '';
        if (emailRef.current) emailRef.current.value = '';
        if (cargoRef.current) cargoRef.current.value = '';
        if (telefoneRef.current) telefoneRef.current.value = '';
        if (cpfRef.current) cpfRef.current.value = '';
        if (formacaoAcademicaRef.current) formacaoAcademicaRef.current.value = '';
        if (linkedinRef.current) linkedinRef.current.value = '';
        if (githubRef.current) githubRef.current.value = '';
        if (descricaoRef.current) descricaoRef.current.value = '';

        setSelectedImage(null);

        // Atualizar a lista de funcionarios após adição
        fetchFuncionarios();

        // Exibir uma mensagem de sucesso
        setPopupType('sucess');
        setPopupTitle('funcionário adicionado');
        setMensagem('Sucesso ao adicionar o funcionário');
        hidePopupAfterTimeout();
      } else {
        console.error('Erro ao adicionar funcionário: Algum campo não foi preenchido.');
        setPopupType('warning');
        setPopupTitle('Erro');
        setMensagem("Erro ao adicionar funcionário: Algum campo não foi preenchido.");
        hidePopupAfterTimeout();
      }
    } catch (error) {
      console.error('Erro ao adicionar funcionário:', error);
      setPopupType('warning');
      setPopupTitle('Erro');
      setMensagem(`Erro ao editar o funcionário ${error}`);
      hidePopupAfterTimeout();
    }
  };

  useEffect(() => {
    fetchFuncionarios();
  }, [localStorage.getItem('userID')]);

  const handleDelete = (funcionario: Funcionario) => async () => {
    try {
      // Obtenha a URL da imagem associada ao funcionario
      const imagemURL = funcionario.nameImg;

      // Verifica se a imagem existe antes de tentar excluí-la
      if (imagemURL) {
        try {
          await getDownloadURL(ref(storage, `staffs/${imagemURL}`));
        } catch (error) {
          console.log('A imagem já foi excluída do Firebase Storage.');
          funcionario.nameImg = ''; // Limpa o nome da imagem para evitar tentativas futuras de exclusão
        }
      }

      // Faz a requisição DELETE para a rota da API para excluir o funcionário
      await axios.delete(`http://localhost:4000/v3/funcionarios/${funcionario.id}`);
      console.log('Funcionário excluído com sucesso!');

      // Atualiza a lista de funcionários após a exclusão
      const updatedFuncionarios = funcionarios.filter(f => f.id !== funcionario.id);
      setFuncionarios(updatedFuncionarios);
      setFilteredFuncionarios(updatedFuncionarios);

      // Atualiza funcionariosDestaqueVendas e funcionariosDestaqueFaturamento
      const funcionariosOrdenadosPorVendas = [...updatedFuncionarios].sort((a: Funcionario, b: Funcionario) => b.numVendas - a.numVendas);
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

  const fecharModalEdicao = () => {
    setEditandoFuncionario(null);
    setModalEditOpen(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    if (file) {
      setSelectedImage(file);
      reader.readAsDataURL(file);
    }
  };

  const calcularIdade = (dataNascimento: string | undefined): string => {
    if (!dataNascimento) return 'Não informado';

    const hoje = new Date();
    const dataNasc = new Date(dataNascimento);
    let idade = hoje.getFullYear() - dataNasc.getFullYear();
    const mesAtual = hoje.getMonth() + 1;
    const mesNasc = dataNasc.getMonth() + 1;

    if (mesAtual < mesNasc || (mesAtual === mesNasc && hoje.getDate() < dataNasc.getDate())) {
      idade--;
    }

    return idade.toString();
  };

  const atualizarFuncionario = async (funcionarioEditado: Funcionario) => {
    try {
      // Obtenha os dados do funcionario existente
      const funcionarioExistente = await axios.get(`http://localhost:4000/v3/funcionarios/${funcionarioEditado.id}`);

      // Faça o envio dos novos dados do funcionario para a rota de edição
      await axios.put(`http://localhost:4000/v3/funcionarios/edit/${funcionarioEditado.id}`, {
        ...funcionarioEditado,
        funcionarioExistente: funcionarioExistente.data // Envie o objeto funcionarioExistente junto com os novos dados
      });

      // Feche o modal de edição após a conclusão
      fecharModalEdicao();

      // Atualize a lista de funcionarios após a edição
      fetchFuncionarios();
      // Exibir uma mensagem de sucesso
      setPopupType('sucess');
      setPopupTitle('funcionario editado');
      setMensagem('Sucesso ao editar o funcionario');
      hidePopupAfterTimeout();
    } catch (error) {
      console.error('Erro ao editar funcionario:', error);
      setPopupType('warning');
      setPopupTitle('Erro');
      setMensagem('Erro ao editar o funcionario');
      hidePopupAfterTimeout();
    }
  };

  const handleFilterChange = (e, funcionarios) => {
    const selectedValue = e.target.value;
    console.log('cliquei em: ' + selectedValue);
    if (selectedValue.startsWith('genero')) {
      const selectedGender = selectedValue.split('-')[1];
      // Filtrar os funcionários por gênero
      const filteredFuncionarios = funcionarios.filter(funcionario => funcionario.genero === selectedGender);
      setFilteredFuncionarios(filteredFuncionarios);
    } else if (selectedValue.startsWith('cargo')) {
      const selectedRole = selectedValue.split('-')[1];
      // Filtrar os funcionários por cargo
      const filteredFuncionarios = funcionarios.filter(funcionario => funcionario.cargo === selectedRole);
      setFilteredFuncionarios(filteredFuncionarios);
    } else {
      // Ordenar os funcionários de acordo com a opção selecionada
      let sortedFuncionarios;
      switch (selectedValue) {
        case 'mais-vendas':
          sortedFuncionarios = [...funcionarios].sort((a, b) => b.numVendas - a.numVendas);
          break;
        case 'mais-faturados':
          sortedFuncionarios = [...funcionarios].sort((a, b) => b.faturamento - a.faturamento);
          break;
        case 'alfabetica':
          sortedFuncionarios = [...funcionarios].sort((a, b) => a.nome.localeCompare(b.nome));
          break;
        default:
          sortedFuncionarios = funcionarios;
      }
      setFilteredFuncionarios(sortedFuncionarios);
    }
  };

  // Estado para armazenar os cargos únicos
  const [uniqueRoles, setUniqueRoles] = useState<string[]>([]);

  // UseEffect para extrair cargos únicos dos funcionários
  useEffect(() => {
    const roles = funcionarios.map(funcionario => funcionario.cargo);
    const uniqueRoles = [...new Set(roles)];
    setUniqueRoles(uniqueRoles);
  }, [funcionarios]);

  // Estado para armazenar os gêneros únicos
  const [uniqueGenders, setUniqueGenders] = useState<string[]>([]);

  // UseEffect para extrair gêneros únicos dos funcionários
  useEffect(() => {
    const genders = funcionarios.map(funcionario => funcionario.genero);
    const uniqueGenders = [...new Set(genders)];
    setUniqueGenders(uniqueGenders);
  }, [funcionarios]);

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
              <article className='staff-card' key={funcionario.id}>
                <header>
                  <h2>Vendas</h2>
                </header>
                <figure className='staff-info'>
                  <img src={funcionario.picture} alt="stf-img" />
                  <figcaption className='staff-desc'>
                    <h2>{funcionario.nome}</h2>
                    <p>Vendas: <span>{funcionario.numVendas}</span></p>
                    <p>Faturamento: <span>{funcionario.faturamento}</span></p>
                  </figcaption>
                </figure>
                <div className='staff-chart'>
                  <StaffDoughnout />
                </div>
              </article>
            ))}

            {funcionariosDestaqueFaturamento.map(funcionario => (
              <article className='staff-card' key={funcionario.id}>
                <header>
                  <h2>Faturamento</h2>
                </header>
                <figure className='staff-info'>
                  <img src={funcionario.picture} alt="stf-img" />
                  <figcaption className='staff-desc'>
                    <h2>{funcionario.nome}</h2>
                    <p>Vendas: <span>{funcionario.numVendas}</span></p>
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
              <select id='filter-staff' onChange={(e) => handleFilterChange(e, funcionarios)}>
                <option value="" disabled>Ver por:</option>
                <option value="todos" selected>Todos</option>
                <optgroup label="Ordenar por">
                  <option value="mais-vendas">Mais Vendas</option>
                  <option value="mais-faturados">Faturamento</option>
                  <option value="alfabetica">Ordem Alfabética</option>
                </optgroup>
                <optgroup label="Filtrar por Gênero">
                  {uniqueGenders.map((gender, index) => (
                    <option key={index} value={`genero-${gender}`}>{gender}</option>
                  ))}
                </optgroup>
                <optgroup label="Filtrar por Cargo">
                  {uniqueRoles.map((role, index) => (
                    <option key={index} value={`cargo-${role}`}>{role}</option>
                  ))}
                </optgroup>
              </select>

              <button id='add-staff' onClick={toggleModalClose}>
                + Funcionário
              </button>
            </div>
          </section>

          <p id='result-staff'>Resultados ({filteredFuncionarios.length})</p>

          <section id='staff-list'>
            {filteredFuncionarios.map(funcionario => (
              <article className='stf-card' key={funcionario.id}>
                <figure className='staff-img'>
                  <img src={funcionario.picture} alt="stf-img" />
                </figure>
                <p className='staff-nick'>{funcionario.nome}</p>
                <span>
                  <p><i className="fas fa-thumbtack"></i> {funcionario.cargo}</p>
                </span>
                <div className='stf-desc'>
                  <span>
                    <p className='stf-gain'>Vendas</p>
                    <p>{funcionario.numVendas}</p>
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

      {modalEditOpen && editandoFuncionario && (
        <div className="Modal-Add">
          <div className='container-Add'>
            <div id="header-modal">
              <h4 className="modal-title">Editar Funcionario: {editandoFuncionario?.nome}</h4>
              <button type="button" className="close-btn" onClick={fecharModalEdicao}>&times;</button>
            </div>

            <div className="Add-Item-container">
              <div className='input-item input-single'>
                <span>
                  <label htmlFor="name-item">Nome do Funcionario:</label>
                  <input type="text" id='name-item' name='name-item' className='full-item' value={editandoFuncionario.nome} onChange={(e) => setEditandoFuncionario({ ...editandoFuncionario, nome: e.target.value })} />
                </span>
              </div>

              <div className='input-item input-mult'>
                <span>
                  <label htmlFor="localAtuacao-item">Local de atuação:</label>
                  <input type="text" id='localAtuacao-item' name='localAtuacao-item' className='full-item' value={editandoFuncionario.localAtuacao} onChange={(e) => setEditandoFuncionario({ ...editandoFuncionario, localAtuacao: e.target.value })} />
                </span>
              </div>

              <div className='input-item input-single'>
                <span>
                  <label htmlFor="descricao-item">Descrição:</label>
                  <textarea
                    id='descricao-item'
                    name="descricao"
                    className="desc-prod"
                    value={editandoFuncionario.descricao}
                    onChange={(e) => setEditandoFuncionario({ ...editandoFuncionario, descricao: e.target.value })}
                  />
                </span>
              </div>

              <button id='edit-product-Btn' onClick={() => atualizarFuncionario(editandoFuncionario)}>Salvar Alterações</button>
            </div>
          </div>
        </div>
      )}

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
                    <img src={URL.createObjectURL(selectedImage)} className='img-staff-add' alt="Selected Region" />
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
                  <input type="text" name='name-item' className='full-item' id='name-item' ref={nomeRef} />
                </span>
              </div>

              <div className='input-item input-mult'>
                <span>
                  <label htmlFor="data-nascimento-item">Data de nascimento:</label>
                  <input type="date" name='data-nascimento-item' className='full-item' id='data-nascimento-item' ref={dataNascimentoRef} />
                </span>
                <span>
                  <label htmlFor="local-atuacao-item">Local de atuação:</label>
                  <input type="text" name='local-atuacao-item' className='full-item' id='local-atuacao-item' ref={localAtuacaoRef} />
                </span>
              </div>

              <div className="input-item input-mult">
                <span>
                  <label htmlFor="data-contrato-item">Data de Contratação:</label>
                  <input type="date" name="data-contrato-item" className="full-item" id="data-contrato-item" ref={dataContratoRef} />
                </span>
                <span>
                  <label htmlFor="genero-item">Gênero:</label>
                  <select name="genero-item" className="select-gender" id="genero-item" ref={generoRef}>
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                    <option value="outro">Outro</option>
                    <option value="prefiro-nao-dizer">Prefiro não dizer</option>
                  </select>
                </span>
              </div>

              <div className='input-item input-single'>
                <span>
                  <label htmlFor="email-item">Email:</label>
                  <input type="text" name='email-item' className='full-item' id='email-item' ref={emailRef} />
                </span>
              </div>

              <div className='input-item input-mult'>
                <span>
                  <label htmlFor="cargo-item">Cargo:</label>
                  <input type="text" name='cargo-item' className='full-item' id='cargo-item' ref={cargoRef} />
                </span>
                <span>
                  <label htmlFor="telefone-item">Telefone:</label>
                  <input type="text" name='telefone-item' className='full-item' id='telefone-item' ref={telefoneRef} />
                </span>
              </div>

              <div className='input-item input-mult'>
                <span>
                  <label htmlFor="cpf-item">CPF:</label>
                  <input type="text" name='cpf-item' className='full-item' id='cpf-item' ref={cpfRef} />
                </span>
                <span>
                  <label htmlFor="formacao-academica-item">Formação Acadêmica:</label>
                  <input type="text" name='formacao-academica-item' className='full-item' id='formacao-academica-item' ref={formacaoAcademicaRef} />
                </span>
              </div>

              <div className='input-item input-mult'>
                <span>
                  <label htmlFor="linkedin-item">Linkedin:</label>
                  <input type="text" name='linkedin-item' className='full-item' id='linkedin-item' ref={linkedinRef} />
                </span>
                <span>
                  <label htmlFor="github-item">Github:</label>
                  <input type="text" name='github-item' className='full-item' id='github-item' ref={githubRef} />
                </span>
              </div>

              <div className="input-item input-single">
                <span>
                  <label htmlFor="description-item">Sobre o funcionário:</label>
                  <textarea
                    name="description-item"
                    className="desc-staff"
                    id="description-item"
                    ref={descricaoRef}
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
                  <a href={selectedUser.email === 'Não informado' ? '#' : `mailto:${selectedUser.email}`} style={{ color: selectedUser.email === 'Não informado' ? 'grey' : 'var(--purple-color)', pointerEvents: selectedUser.email === 'Não informado' ? 'none' : 'auto' }}><i className="fa-solid fa-envelope"></i></a>
                  <a href={selectedUser.github} style={{ color: selectedUser.github === 'Não informado' ? 'grey' : 'var(--black-color)', pointerEvents: selectedUser.github === 'Não informado' ? 'none' : 'auto' }}><i className="fa-brands fa-github"></i></a>
                  <a href={selectedUser.linkedin} style={{ color: selectedUser.linkedin === 'Não informado' ? 'grey' : 'var(--secondy-color)', pointerEvents: selectedUser.linkedin === 'Não informado' ? 'none' : 'auto' }}><i className="fa-brands fa-linkedin"></i></a>
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
                          <p>Data de Nascimento: <span>{formatDateBr(selectedUser.dataNascimento)}</span></p>
                          <p>idade: <span>{calcularIdade(selectedUser.dataNascimento)} anos</span></p>
                          <p>CPF: <span>{selectedUser.cpf}</span></p>
                          <p>Gênero: <span>{selectedUser.genero}</span></p>
                          <p>Cargo: <span>{selectedUser.cargo}</span></p>
                          <p>Contratação: <span>{formatDateBr(selectedUser.dataContratacao)}</span></p>
                          <p>Telefone: <span>{selectedUser.telefone}</span></p>
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
      {mensagem && <Popup type={popupType} title={popupTitle} text={mensagem} />}
    </div>
  );
};

export default Funcionarios;