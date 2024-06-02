import React, { useState, useEffect, useRef } from "react";
import {
  IoAddCircleOutline,
  IoCamera,
  IoCashOutline,
  IoCreate,
  IoPerson,
  IoSearch,
  IoTrash,
} from "react-icons/io5";
import "../financeiro/Financeiro.css";
import FinancialDoughnut from "../../components/charts/FinancialDoughnut.tsx";
import axios from "axios";
import FinancialColumnChart from "../../components/charts/FinancialColumnChart.tsx";
import FinancialLineChart from "../../components/charts/FinancialLineChart.tsx";
import { FaCalendar, FaCalendarDay, FaCheckSquare, FaPen, FaTrash } from "react-icons/fa";
import Popup from "../../components/popup/Popup.tsx";
import Despesa from "../../models/Despesa.tsx";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Financeiro = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [categorias, setCategorias] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [editandoDespesa, setEditandoDespesa] = useState<Despesa | null>(null);
  const [despesaDelete, setDespesaDelete] = useState<Despesa>();
  const [filtroPesquisa, setFiltroPesquisa] = useState('');

  const [mensagem, setMensagem] = useState('');
  const [popupType, setPopupType] = useState('');
  const [popupTitle, setPopupTitle] = useState('');

  const paymentData = [
    { tipo: "Dinheiro", cor: "#2ecc71", porcentagem: 90 },
    { tipo: "Pix", cor: "#3498db", porcentagem: 70 },
    { tipo: "Cartão (Crédito)", cor: "red", porcentagem: 30 },
    { tipo: "Boleto", cor: "orange", porcentagem: 5 },
    { tipo: "Cheque", cor: "purple", porcentagem: 10 },
    { tipo: "Transferência", cor: "#1abc9c", porcentagem: 0 },
    { tipo: "Em Dívida", cor: "var(--black-color)", porcentagem: 30 },
  ];

  const validOptions = [
    "Salario",
    "Aluguel",
    "Fornecedor",
    "Imposto",
    "Manutencao"
  ];

  const expenseIcons: { [key: string]: string } = {
    Salario: "fas fa-dollar-sign",
    Aluguel: "fas fa-building",
    Fornecedor: "fas fa-truck",
    Imposto: "fas fa-money-bill-alt",
    Manutencao: "fas fa-tools",
    Default: "fas fa-ellipsis-h",
  };

  const expenseColors: { [key: string]: string } = {
    Salario: "#388E3C",
    Aluguel: "#1B2947",
    Fornecedor: "#C62828",
    Imposto: "#FFC107",
    Manutencao: "#5B7FFF",
    Default: "#808080",
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Paga':
        return 'status-paga';
      case 'Pendente':
        return 'status-pendente';
      case 'Atrasada':
        return 'status-atrasada';
      default:
        return 'status-paga';
    }
  };

  const nomeRef = useRef<HTMLInputElement>(null);
  const dataRef = useRef<HTMLInputElement>(null);
  const tipoRef = useRef<HTMLInputElement>(null);
  const valorRef = useRef<HTMLInputElement>(null);
  const descricaoRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    fetchDespesas()
  }, [localStorage.getItem('userID')]);

  const hidePopupAfterTimeout = () => {
    setTimeout(() => {
      setMensagem('');
    }, 4500);
  };

  const fetchDespesas = async () => {
    try {
      const response = await axios.get("http://localhost:4000/v3/despesas");
      setDespesas(response.data);
    } catch (error) {
      console.error("Erro ao buscar despesas:", error);
    }
  };

  const toLocalISOString = (date) => {
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - (offset * 60 * 1000));
    return localDate.toISOString().split('T')[0];
  };

  const adicionarDespesa = async () => {
    try {
      const userId = localStorage.getItem('userID');

      // Obter os valores dos campos
      const nome = nomeRef.current?.value;
      const tipo = tipoRef.current?.value || 'Outros';
      const valor = parseFloat(valorRef.current?.value || '0');
      const descricao = descricaoRef.current?.value || 'Sem Descrição';

      // Validar os campos (por exemplo, verificar se estão preenchidos)
      if (!nome || !valor) {
        console.error('Por favor, preencha todos os campos.');
        // Exibir uma mensagem de sucesso
        setPopupType('warning');
        setPopupTitle('Campos Vazios');
        setMensagem('Preenncha todos os campos de nome e valor');
        hidePopupAfterTimeout();
        return;
      }

      // Definir o status com base na data
      const hoje = toLocalISOString(new Date());
      let status = '';

      if (!toLocalISOString(selectedDate) || toLocalISOString(selectedDate) === hoje) {
        status = 'Paga';
      } else if (toLocalISOString(selectedDate) < hoje) {
        status = 'Atrasada';
      } else {
        status = 'Pendente';
      }

      // Criar a nova despesa
      const novaDespesa: Despesa = {
        nome,
        data: toLocalISOString(selectedDate),
        tipo,
        valor,
        descricao,
        status,
        usuarioId: userId || '',
      };

      // Enviar a requisição para adicionar a nova despesa
      await axios.post('http://localhost:4000/v3/despesas', novaDespesa);

      // Atualizar a lista de despesas após adição
      fetchDespesas();

      // Limpar os campos do formulário e redefinir o estado do modal
      nomeRef.current!.value = '';
      tipoRef.current!.value = '';
      valorRef.current!.value = '';
      descricaoRef.current!.value = '';
      setSelectedDate(new Date())

      // Exibir uma mensagem de sucesso
      setPopupType('sucess');
      setPopupTitle('Produto adicionado');
      setMensagem('Sucesso ao adicionar o produto');
      hidePopupAfterTimeout();

    } catch (error) {
      console.error("Erro ao adicionar despesa:", error);
    }
  };

  const atualizarDespesa = async (despesaEditada: Despesa) => {
    try {
      console.log('ID do funcionário:', despesaEditada.id);

      const despesaExistente = await axios.put(`http://localhost:4000/v3/despesas/${despesaEditada.id}`, {
        ...despesaEditada,
        // certifique-se de passar os dados corretos para a API de edição
      });

      console.log('Resposta da API:', despesaExistente.data); // Verifique a resposta da API

      // Feche o modal de edição após a conclusão
      fecharModalEdicao();

      // Atualize a lista de despesas após a edição
      fetchDespesas();

      // Exibir uma mensagem de sucesso
      setPopupType('sucess');
      setPopupTitle('Funcionário editado');
      setMensagem('Sucesso ao editar o despesa');
      hidePopupAfterTimeout();
    } catch (error) {
      console.error('Erro ao editar despesa', error);
      setPopupType('warning');
      setPopupTitle('Erro');
      setMensagem(`Erro ao editar o despesa: ${error.message}`);
      hidePopupAfterTimeout();
    }
  };


  const handleDelete = (despesa: Despesa) => async () => {
    try {
      await axios.delete(`http://localhost:4000/v3/despesas/${despesa.id}`);
      console.log("Despesa excluída com sucesso!");
      setDespesas(despesas.filter((d) => d.id !== despesa.id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Erro ao excluir despesa:", error);
    }
  };

  const handleOptionSelect = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const despesasFiltradas = despesas.filter((expense: Despesa) =>
    expense.nome.toLowerCase().includes(filtroPesquisa.toLowerCase()) &&
    (categoriaSelecionada ? expense.tipo === categoriaSelecionada : true)
  );

  const openDeleteModal = (expense) => {
    setDespesaDelete(expense);
    setShowDeleteModal(true);
  };

  const toggleModalDelete = () => {
    setShowDeleteModal(!showDeleteModal);
    if (despesaDelete) {
      setDespesaDelete(despesaDelete);
    }
  };

  const abrirModalEdicao = (expense: Despesa) => {
    if (expense) {
      setEditandoDespesa(expense);
      setModalEditOpen(true);
    }
  };

  const handleFiltroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltroPesquisa(e.target.value);
  };

  const handleEdit = (expense: Despesa) => {
    // Define os dados do despesa selecionado para edição
    abrirModalEdicao(expense);
    //setDespesaParaEditar(despesa);
  };

  // Dentro do componente Produtos, adicione um estado para controlar a validade do preço
  const [precoValido, setPrecoValido] = useState(true);

  // Adicione uma função para validar o preço com base no regex
  const validarPreco = (valor: string) => {
    const regex = /^-?\d+(\.\d{1,2})?$/;
    return regex.test(valor);
  };

  const formatDate = (dateString) => {
    const dateParts = dateString.split('-');
    return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
  };

  // Adicione um manipulador de eventos para o campo de preço
  const handlePrecoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    if (validarPreco(valor)) {
      setPrecoValido(true);
    } else {
      setPrecoValido(false);
    }
  };

  const fecharModalEdicao = () => {
    setEditandoDespesa(null);
    setModalEditOpen(false);
  };

  const [typeSugetions, setTypeSugetions] = useState(false)

  return (
    <>
      {mensagem && <Popup type={popupType} title={popupTitle} text={mensagem} />}
      {showModal && (
        <div className="Modal-Add">
          <div className="container-Add" style={{ height: 'auto', maxHeight: '90%' }}>
            <div id="header-modal">
              <h4 className="modal-title">Adicionar Despesa</h4>
              <button
                type="button"
                className="close-btn"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
            </div>

            <div className="Add-Item-container">
              <div className="input-item input-single">
                <span>
                  <label htmlFor="name-item">Nome:</label>
                  <input
                    type="text"
                    name="name-item"
                    className="full-item"
                    id="name-item"
                    ref={nomeRef}
                  />
                </span>
              </div>

              <div className="input-item input-mult">
                <span>
                  <label htmlFor="data-nascimento-item">
                    Data da despesa:
                  </label>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="dd/MM/yyyy"
                    ref={dataRef}
                  />
                </span>
                <span style={{ position: 'relative' }}>
                  <label htmlFor="local-atuacao-item">Tipo:</label>
                  <input
                    style={{ position: 'relative' }}
                    type="text"
                    name="local-atuacao-item"
                    className="full-item"
                    id="local-atuacao-item"
                    ref={tipoRef}
                    onFocus={() => {
                      setTypeSugetions(true)
                    }}
                    onBlur={() => {
                      setTypeSugetions(false)
                    }}
                  />
                  {validOptions.length > 0 && typeSugetions && (
                    <ul className="valid-options-list" style={{ top: '70px', width: '100%' }}>
                      {validOptions.map(option => (
                        <li
                          key={option}
                          onMouseDown={() => {
                            tipoRef.current!.value = option;
                            setTypeSugetions(false)
                          }}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  )}
                </span>

                <span>
                  <label htmlFor="email-item">Valor:</label>
                  <input
                    type="text"
                    name="email-item"
                    className={`full-item ${precoValido ? '' : 'invalid'}`}
                    id="email-item"
                    onChange={(e) => { handlePrecoChange(e) }}
                    ref={valorRef}
                  />
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
                    ref={descricaoRef}
                  />
                </span>
              </div>

              <button id="add-staff-Btn" onClick={() => { adicionarDespesa(); setShowModal(false) }}>
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}

      {modalEditOpen && editandoDespesa && (
        <div className="Modal-Add">
          <div className="container-Add" style={{ height: 'auto', maxHeight: '90%' }}>
            <div id="header-modal">
              <h4 className="modal-title">Editar Despesa: {editandoDespesa?.nome}</h4>
              <button
                type="button"
                className="close-btn"
                onClick={() => setModalEditOpen(false)}
              >
                &times;
              </button>
            </div>

            <div className="Add-Item-container">
              <div className="input-item input-single">
                <span>
                  <label htmlFor="name-item">Nome:</label>
                  <input
                    type="text"
                    name="name-item"
                    className="full-item"
                    id="name-item"
                    value={editandoDespesa.nome}
                    onChange={(e) => setEditandoDespesa({ ...editandoDespesa, nome: e.target.value })}
                  />
                </span>
              </div>

              <div className="input-item input-mult">
                <span>
                  <label htmlFor="data-despesa-item">Data da despesa:</label>
                  <DatePicker
                    selected={selectedDate}
                    value={editandoDespesa.data}
                    onChange={date => setEditandoDespesa({ ...editandoDespesa, data: date })}
                    dateFormat="dd/MM/yyyy"
                  />
                </span>
                <span style={{ position: 'relative' }}>
                  <label htmlFor="tipo-despesa-item">Tipo:</label>
                  <input
                    type="text"
                    name="tipo-despesa-item"
                    className="full-item"
                    id="tipo-despesa-item"
                    value={editandoDespesa.tipo}
                    onChange={(e) => setEditandoDespesa({ ...editandoDespesa, tipo: e.target.value })}
                    onFocus={() => setTypeSugetions(true)}
                    onBlur={() => setTypeSugetions(false)}
                  />
                  {validOptions.length > 0 && typeSugetions && (
                    <ul className="valid-options-list" style={{ top: '70px', width: '100%' }}>
                      {validOptions.map(option => (
                        <li
                          key={option}
                          onMouseDown={() => {
                            setEditandoDespesa(prev => ({ ...prev, tipo: option }));
                            setTypeSugetions(false);
                          }}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  )}
                </span>

                <span>
                  <label htmlFor="valor-item">Valor:</label>
                  <input
                    type="text"
                    name="valor-item"
                    className={`full-item ${precoValido ? '' : 'invalid'}`}
                    id="valor-item"
                    value={editandoDespesa.valor.toString()}
                    onChange={(e) => {
                      const valorNum = parseFloat(e.target.value);
                      if (!isNaN(valorNum) && valorNum >= 0) {
                        setEditandoDespesa({ ...editandoDespesa, valor: valorNum });
                        setPrecoValido(true);
                      } else {
                        setPrecoValido(false);
                      }
                    }}
                  />
                </span>
              </div>

              <div className="input-item input-single">
                <span>
                  <label htmlFor="descricao-item">Descrição:</label>
                  <textarea
                    name="descricao-item"
                    className="desc-prod"
                    id="descricao-item"
                    value={editandoDespesa.descricao}
                    onChange={(e) => setEditandoDespesa({ ...editandoDespesa, descricao: e.target.value })}
                  />
                </span>
              </div>

              <button id="add-staff-Btn" onClick={() => atualizarDespesa(editandoDespesa)}>
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && despesaDelete &&
        <div className='modal-logout-stf'>
          <div className='container-logout'>
            <div className="header-logout">
              <button type="button" className="close-btn" onClick={toggleModalDelete}>&times;</button>
            </div>

            <h2 className='txt-logout'>Você tem certeza que quer excluir esta despesa?</h2>

            <hr className='modal-line' style={{ width: '80%', height: '3px', background: '#000', color: '#000' }} />

            <div className='options-logout'>
              <button className="logout-yes" onClick={handleDelete(despesaDelete)}>Sim</button>
              <button className="logout-no" onClick={toggleModalDelete}>Não</button>
            </div>
          </div>
        </div>}


      <div id="financial-container">
        <header id="financial-header">
          <h1>Financeiro</h1>
        </header>

        <main id="financial-main">
          <section className="debts-container">
            <div className="debts-left">
              <div className="debts-card">
                <article className="dbt-card-container">
                  <circle className="dbt-circ circ1">
                    <IoPerson className="debt-icon" />
                  </circle>
                  <div className="dbt-card card-1">
                    <h2>340K</h2>
                    <p>
                      <strong>Dívidas</strong> de clientes
                    </p>
                  </div>
                </article>

                <article className="dbt-card-container">
                  <circle className="dbt-circ circ2">
                    <IoCashOutline className="debt-icon" />
                  </circle>
                  <div className="dbt-card card-2">
                    <h2>R$500K</h2>
                    <p>
                      em <strong>Dívidas</strong> pendentes
                    </p>
                  </div>
                </article>
              </div>

              <div className="selection-container-debt">
                <select
                  id="filter-expense"
                  value={categoriaSelecionada}
                  onChange={(e) => setCategoriaSelecionada(e.target.value)}
                >
                  <option value="">Todos</option>
                  {categorias.map((categoria, index) => (
                    <option key={index} value={categoria}>
                      {categoria}
                    </option>
                  ))}
                </select>
              </div>

              <section id="container-table-debts">
                <table id="table-prod" className="table-debts">
                  <thead className="head-list-fin" style={{ backgroundColor: 'var(--primary-color)' }}>
                    <tr style={{ paddingBlock: ".5rem" }}>
                      <td>Cliente</td>
                      <td>Data da Compra</td>
                      <td>Valor</td>
                      <td className="action-space">Ações</td>
                    </tr>
                  </thead>
                  <tbody className="body-list-prod debt" style={{ gap: '5px' }}>
                    <tr>
                      <td>
                        <h3 data-toggle="tooltip" title="Picolé sem cobertura">
                          Mario
                        </h3>
                      </td>
                      <td>
                        <h3 data-toggle="tooltip" title="07/04/2024">
                          07/04/2024
                        </h3>
                      </td>
                      <td>
                        <h3 data-toggle="tooltip" title="Cartão(debito)">
                          10K
                        </h3>
                      </td>
                      <td
                        className="action-btns"
                        style={{ display: "flex", gap: "5px" }}
                      >
                        <button
                          className="edit"
                          style={{
                            padding: ".6rem .8rem",
                            height: "2.5rem",
                            width: "2.5rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          onClick={() => handleEdit()}
                        >
                          <FaCheckSquare />
                        </button>
                        <button
                          className="delete"
                          style={{
                            padding: ".6rem .8rem",
                            height: "2.5rem",
                            width: "2.5rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          onClick={handleDelete()}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
            </div>

            <div className="debts-right">
              <div className="debt-chart">
                <FinancialDoughnut />
              </div>
              <div className="debt-forms">
                <div className="ranking">
                  <p className="debt-title">Nomes no SPC</p>
                  <ul>
                    {paymentData.map((payment, index) => (
                      <li key={index} style={{ width: "300px", background: "none" }}>
                        <div className="product-name">
                          <p style={{ color: "var(--black-color)" }}>{payment.tipo}</p>
                          <div
                            className="scale-container"
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <div className="product-scale">
                              <div
                                className="scale"
                                style={{ width: `${payment.porcentagem}%`, background: payment.cor }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="debt-ranking">
            <header className="debt-ranking-header">
              <h1>
                Olipíadas financeiras: Competindo pelo Ouro na categoria dívida.
              </h1>
            </header>
            <div className="columns-debt">
              <div className="column-dbt">
                <h3>Maiores dívidas do mês</h3>
                <FinancialColumnChart />
              </div>
              <div className="column-dbt">
                <h3>Maiores períodos dívidas do mês</h3>
                <FinancialColumnChart />
              </div>
            </div>
          </section>

          <section id="expense-types">
            <div className="dbt-forms">
              <div className="ranking">
                <ul
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                  }}
                >
                  <li style={{ width: "300px", background: "none" }}>
                    <div className="product-name">
                      <p style={{ color: "var(--black-color)" }}>Dinheiro</p>
                      <div
                        className="scale-container"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div className="product-scale">
                          <div
                            className="scale"
                            style={{ width: `50%`, background: "#2ecc71" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li style={{ width: "300px", background: "none" }}>
                    <div className="product-name">
                      <p style={{ color: "var(--black-color)" }}>Pix</p>
                      <div
                        className="scale-container"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div className="product-scale">
                          <div
                            className="scale"
                            style={{ width: `50%`, background: "#3498db" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li style={{ width: "300px", background: "none" }}>
                    <div className="product-name">
                      <p style={{ color: "var(--black-color)" }}>
                        Cartão (Crédito)
                      </p>
                      <div
                        className="scale-container"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div className="product-scale">
                          <div
                            className="scale"
                            style={{ width: `30%`, background: "red" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li style={{ width: "300px", background: "none" }}>
                    <div className="product-name">
                      <p style={{ color: "var(--black-color)" }}>Boleto</p>
                      <div
                        className="scale-container"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div className="product-scale">
                          <div
                            className="scale"
                            style={{ width: `20%`, background: "orange" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li style={{ width: "300px", background: "none" }}>
                    <div className="product-name">
                      <p style={{ color: "var(--black-color)" }}>Cheque</p>
                      <div
                        className="scale-container"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div className="product-scale">
                          <div
                            className="scale"
                            style={{ width: `10%`, background: "purple" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li
                    style={{
                      width: "300px",
                      background: "none",
                      justifyContent: "space-between",
                    }}
                  >
                    <div className="product-name">
                      <p style={{ color: "var(--black-color)" }}>
                        Transferência
                      </p>
                      <div className="scale-container">
                        <div className="product-scale">
                          <div
                            className="scale"
                            style={{ width: `30%`, background: "#1abc9c" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li style={{ width: "300px", background: "none" }}>
                    <div className="product-name">
                      <p style={{ color: "var(--black-color)" }}>Em Dívida</p>
                      <div
                        className="scale-container"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div className="product-scale">
                          <div
                            className="scale"
                            style={{
                              width: `20%`,
                              background: "var(--black-color)",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="expense-line">
              <div className="chart-line-exp">
                <FinancialLineChart />
              </div>
            </div>
          </section>

          <section id="exp-form">
            <header>
              <h1>Informe suas despesas</h1>
            </header>

            <section id="search-expense">
              <div id="search-bar">
                <input
                  type="search"
                  id="search-exp"
                  placeholder="Pesquisar despesa"
                  aria-label="Buscar"
                  value={filtroPesquisa}
                  onChange={handleFiltroChange}
                />
                <i id="search-icon">
                  <IoSearch id="icon-exp" />
                </i>
              </div>

              <div className='filter-container-btns'>
                <button id='add-product'
                  onClick={() => {
                    setShowModal(true);
                  }}>
                  + Despesa
                </button>
                <select
                  id="filter-expense"
                  value={selectedOption}
                  onChange={handleOptionSelect}
                >
                  <option value="">Todos</option>
                  <option value="opcao1">Salário</option>
                  <option value="opcao2">Aluguel</option>
                  <option value="opcao3">Fornecedor</option>
                  <option value="opcao4">Imposto</option>
                  <option value="opcao5">Manutenção</option>
                </select>
              </div>
            </section>

            <p id="result-expense">Resultados ({despesas.length})</p>

            <section id="exp-cards">
              {despesas.length === 0 ? (
                <p style={{ textAlign: 'center', paddingBlock: '1rem' }}>Não há despesas.</p>
              ) : (
                despesas
                  .filter((expense) => expense.nome && expense.nome.toLowerCase().includes(filtroPesquisa.toLowerCase()))
                  .filter(
                    (expense) =>
                      selectedOption === "" || expense.tipo === selectedOption
                  )
                  .filter((expense) => categoriaSelecionada ? expense.nome === categoriaSelecionada : true)
                    .map((expense, index) => {
                    const icon = expenseIcons[expense.tipo] || expenseIcons.Default;
                    const color = expenseColors[expense.tipo] || expenseColors.Default;
                    return (
                      <button key={index} className="exp-card">
                        <button className="edit-expense-btn" onClick={() => handleEdit(expense)}><FaPen /></button>
                        <span className="fa-stack">
                          <div className="stack-container">
                            <i
                              className="fas fa-square icon"
                              style={{ color }}
                            ></i>
                            <i className="fas fa-circle"></i>
                            <i
                              className={icon}
                              style={{ color }}
                            ></i>
                          </div>
                        </span>
                        <p>{expense.nome}</p>
                        <p className="exp-desc">{expense.descricao}</p>
                        <p className="exp-desc" style={{ color: 'var(--primary-color)' }}><FaCalendarDay /> {formatDate(expense.data)}</p>
                        <p className={`exp-desc payment-status ${getStatusClass(expense.status)}`}>{expense.status}</p>
                        <p className="exp-desc" style={{ fontWeight: 'bold' }}>R$ {expense.valor.toFixed(2)}</p>
                        <div className="manager-btn">
                          {expense.status !== "Paga" && (
                            <div>
                              <button className="payment-item-mng">
                                <FaCheckSquare id="edit-pen" style={{ color: 'var(--white-color)' }} /> <p>Efetuado</p>
                              </button>
                            </div>
                          )}
                          <div>
                            <button
                              className="delete-item item-mng"
                              onClick={() => openDeleteModal(expense)}
                            >
                              <IoTrash id="edit-trash" />
                            </button>
                          </div>
                        </div>
                      </button>
                    );
                  })
              )}
            </section>
          </section>
        </main>
      </div>
    </>
  );
};

export default Financeiro;
