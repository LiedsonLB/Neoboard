import React, { useState, useEffect } from 'react';
import { IoAddCircleOutline, IoCash, IoCashOutline, IoCreate, IoPerson, IoSearch, IoTrash } from 'react-icons/io5';
import '../financeiro/Financeiro.css';
import FinancialDoughnut from '../../components/charts/FinancialDoughnut';
import axios from 'axios';
import FinancialColumnChart from '../../components/charts/FinancialColumnChart';
import FinancialLineChart from '../../components/charts/FinancialLineChart';

interface Despesa {
  nome: string;
  tipo: string;
  descricao: string;
  valor: number;
}

interface Product {
  img: string | undefined;
  id: number;
  nome: string;
  picture: string;
  vendido: number;
}

const Financeiro = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [loading, setLoading] = useState(true);
  const [produtos, setProdutos] = useState<Product[]>([]);

  const expenseIcons: { [key: string]: string } = {
    "Salario": "fas fa-dollar-sign",
    "Aluguel": "fas fa-building",
    "Fornecedor": "fas fa-truck",
    "Imposto": "fas fa-money-bill-alt",
    "Manutencao": "fas fa-tools"
  };

  const expenseColors: { [key: string]: string } = {
    "Salario": "#388E3C",
    "Aluguel": "#1B2947",
    "Fornecedor": "#C62828",
    "Imposto": "#FFC107",
    "Manutencao": "#5B7FFF"
  }

  useEffect(() => {
    const fetchDespesas = async () => {
      try {
        const response = await axios.get('http://localhost:4000/v2/despesas');
        setDespesas(response.data);
      } catch (error) {
        console.error('Erro ao buscar despesas:', error);
      }
    };

    fetchDespesas();
  }, []);

  const handleDelete = (despesa: any) => async () => {
    try {
      // Faz a requisição DELETE para a rota da API para excluir o despesas
      await axios.delete(`http://localhost:4000/v2/despesas/${despesa.nome}`);
      console.log('despesa excluído com sucesso!');
      // Atualiza a lista de despesas após a exclusão
      const updatedDespesas = despesas.filter(d => d.nome !== despesa.nome);
      setDespesas(updatedDespesas);
      //setFiltroPesquisa(''); // Limpar o filtro de pesquisa após a exclusão
    } catch (error) {
      console.error('Erro ao excluir despesa:', error);
    }
  };

  const handleOptionSelect = (event: any) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [produtosResponse, regionsResponse, staffsResponse] = await Promise.all([
          axios.get('http://localhost:4000/v2/produtos'),
          axios.get('http://localhost:4000/v2/regioes'),
          axios.get('http://localhost:4000/v2/funcionarios')
          //axios.get('http://localhost:4000/eventos')
        ]);
        setProdutos(produtosResponse.data.slice(0, 5));
        //setEvents(eventsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div id='financial-container'>
        <header id='financial-header'>
          <h1>Financeiro</h1>
        </header>

        <main id='financial-main'>
          <section className='debts-container'>
            <div className='debts-left'>
              <div className='debts-card'>
                <article className='dbt-card-container'>
                  <circle className='dbt-circ circ1'><IoPerson className='debt-icon' /></circle>
                  <div className='dbt-card card-1'>
                    <h1>340K</h1>
                    <p><strong>Dívidas</strong> de clientes</p>
                  </div>
                </article>

                <article className='dbt-card-container'>
                  <circle className='dbt-circ circ2'><IoCashOutline className='debt-icon' /></circle>
                  <div className='dbt-card card-2'>
                    <h1>500K</h1>
                    <p>em <strong>Dívidas</strong> pendentes</p>
                  </div>
                </article>
              </div>

              <section id='container-table-prod'>
                <table id='table-prod'>
                  <thead className='head-list-prod'>
                    <tr>
                      <td>Cliente</td>
                      <td>Produto</td>
                      <td>Quantidade</td>
                      <td>Vencimento</td>
                      <td>Devido</td>
                    </tr>
                  </thead>
                  <tbody className='body-list-prod'>
                    <tr>
                      <td>
                        <h3 data-toggle="tooltip" title="Picolé sem cobertura">Kaiji</h3>
                      </td>
                      <td>
                        <h3 data-toggle="tooltip" title="Piripiri">Sorvete de Batata</h3>
                      </td>
                      <td>
                        <h3 data-toggle="tooltip" title="5">5</h3>
                      </td>
                      <td>
                        <h3 data-toggle="tooltip" title="07/04/2024">07/04/2024</h3>
                      </td>
                      <td>
                        <h3 data-toggle="tooltip" title="Cartão(debito)">10K</h3>
                      </td>
                    </tr>

                  </tbody>
                </table>
              </section>
            </div>

            <div className='debts-right'>
              <div className='debt-chart'>
                <FinancialDoughnut />
              </div>
              <div className='debt-forms'>
                <div className="ranking">
                  <p className="debt-title">Nomes no SPC</p>
                  <ul>
                    <li style={{ width: '300px', background: 'none' }}>
                      <div className="product-name">
                        <p style={{ color: 'black' }}>Dinheiro</p>
                        <div className="scale-container" style={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                          <div className="product-scale">
                            <div className="scale" style={{ width: `50%`, background: '#2ecc71' }}>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li style={{ width: '300px', background: 'none' }}>
                      <div className="product-name">
                        <p style={{ color: 'black' }}>Pix</p>
                        <div className="scale-container" style={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                          <div className="product-scale">
                            <div className="scale" style={{ width: `50%`, background: '#3498db' }}>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li style={{ width: '300px', background: 'none' }}>
                      <div className="product-name">
                        <p style={{ color: 'black' }}>Cartão (Crédito)</p>
                        <div className="scale-container" style={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                          <div className="product-scale">
                            <div className="scale" style={{ width: `50%`, background: 'red' }}>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li style={{ width: '300px', background: 'none' }}>
                      <div className="product-name">
                        <p style={{ color: 'black' }}>Boleto</p>
                        <div className="scale-container" style={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                          <div className="product-scale">
                            <div className="scale" style={{ width: `50%`, background: 'orange' }}>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li style={{ width: '300px', background: 'none' }}>
                      <div className="product-name">
                        <p style={{ color: 'black' }}>Cheque</p>
                        <div className="scale-container" style={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                          <div className="product-scale">
                            <div className="scale" style={{ width: `50%`, background: 'purple' }}>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li style={{ width: '300px', background: 'none', justifyContent: "space-between" }}>
                      <div className="product-name">
                        <p style={{ color: 'black' }}>Transferência</p>
                        <div className="scale-container">
                          <div className="product-scale">
                            <div className="scale" style={{ width: `50%`, background: '#1abc9c' }}>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li style={{ width: '300px', background: 'none' }}>
                      <div className="product-name">
                        <p style={{ color: 'black' }}>Em Dívida</p>
                        <div className="scale-container" style={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                          <div className="product-scale">
                            <div className="scale" style={{ width: `50%`, background: 'black' }}>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className='debt-ranking'>
            <header className='debt-ranking-header'>
              <h1>Olipíadas financeiras: Competindo pelo Ouro na categoria dívida.</h1>
            </header>
            <div className='columns-debt'>
              <div className='column-dbt'>
                <h3>Maiores dívidas do mês</h3>
                <FinancialColumnChart />
              </div>
              <div className='column-dbt'>
                <h3>Maiores períodos dívidas do mês</h3>
                <FinancialColumnChart />
              </div>
            </div>
          </section>

          <section id='expense-types'>
            <div className='dbt-forms'>
              <div className="ranking">
                <ul style={{display:'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto'}}>
                  <li style={{ width: '300px', background: 'none' }}>
                    <div className="product-name">
                      <p style={{ color: 'black' }}>Dinheiro</p>
                      <div className="scale-container" style={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                        <div className="product-scale">
                          <div className="scale" style={{ width: `50%`, background: '#2ecc71' }}>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li style={{ width: '300px', background: 'none' }}>
                    <div className="product-name">
                      <p style={{ color: 'black' }}>Pix</p>
                      <div className="scale-container" style={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                        <div className="product-scale">
                          <div className="scale" style={{ width: `50%`, background: '#3498db' }}>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li style={{ width: '300px', background: 'none' }}>
                    <div className="product-name">
                      <p style={{ color: 'black' }}>Cartão (Crédito)</p>
                      <div className="scale-container" style={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                        <div className="product-scale">
                          <div className="scale" style={{ width: `30%`, background: 'red' }}>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li style={{ width: '300px', background: 'none' }}>
                    <div className="product-name">
                      <p style={{ color: 'black' }}>Boleto</p>
                      <div className="scale-container" style={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                        <div className="product-scale">
                          <div className="scale" style={{ width: `20%`, background: 'orange' }}>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li style={{ width: '300px', background: 'none' }}>
                    <div className="product-name">
                      <p style={{ color: 'black' }}>Cheque</p>
                      <div className="scale-container" style={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                        <div className="product-scale">
                          <div className="scale" style={{ width: `10%`, background: 'purple' }}>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li style={{ width: '300px', background: 'none', justifyContent: "space-between" }}>
                    <div className="product-name">
                      <p style={{ color: 'black' }}>Transferência</p>
                      <div className="scale-container">
                        <div className="product-scale">
                          <div className="scale" style={{ width: `30%`, background: '#1abc9c' }}>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li style={{ width: '300px', background: 'none' }}>
                    <div className="product-name">
                      <p style={{ color: 'black' }}>Em Dívida</p>
                      <div className="scale-container" style={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                        <div className="product-scale">
                          <div className="scale" style={{ width: `20%`, background: 'black' }}>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className='expense-line'>
              <div className='chart-line-exp'>
               <FinancialLineChart />
              </div>
            </div>
          </section>

          <section id='exp-form'>
            <header>
              <h1>Informe suas despesas</h1>
            </header>

            <section id='search-expense'>
              <div id='search-bar'>
                <input type="search" id="search-exp" placeholder='Pesquisar despesa' aria-label="Buscar" />
                <i id='search-icon'><IoSearch id='icon-exp' /></i>
              </div>

              <select id="filter-expense" value={selectedOption} onChange={handleOptionSelect}>
                <option value="">Todos</option>
                <option value="opcao1">Salário</option>
                <option value="opcao2">Aluguel</option>
                <option value="opcao3">Fornecedor</option>
                <option value="opcao4">Imposto</option>
                <option value="opcao5">Manutenção</option>
              </select>
            </section>

            <p id='result-expense'>Resultados ({despesas.length})</p>

            <section id='exp-cards'>
              <button className='exp-card' id='add-exp-card'>
                <i><IoAddCircleOutline /></i>
                <p>Adicionar despesa</p>
              </button>

              {despesas
                .filter(expense => selectedOption === '' || expense.tipo === selectedOption)
                .map((expense, index) => (
                  <button key={index} className='exp-card'>
                    <span className="fa-stack">
                      <div className='stack-container'>
                        <i className="fas fa-square" style={{ color: expenseColors[expense.tipo] }}></i>
                        <i className="fas fa-circle"></i>
                        <i className={expenseIcons[expense.tipo]} style={{ color: expenseColors[expense.tipo] }}></i>
                      </div>
                    </span>
                    <p>{expense.nome}</p>
                    <p className='exp-desc'>{expense.descricao}</p>
                    <p className='exp-desc'>R$ {expense.valor}</p>
                    <div className='manager-btn'>
                      <div>
                        <button className='edit-item item-mng'><IoCreate id='edit-pen' /></button>
                      </div>
                      <div>
                        <button className='delete-item item-mng' onClick={handleDelete(expense)}><IoTrash id='edit-trash' /></button>
                      </div>
                    </div>
                  </button>
                ))}

            </section>

          </section>
        </main>
      </div>
    </>
  )
}

export default Financeiro