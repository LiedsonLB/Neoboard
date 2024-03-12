import React, { useEffect, useState } from 'react'
import "../layout/Home.css"
import LineChart from '../components/charts/LineChart.tsx';
import DoughnutChart from '../components/charts/DoughtnoutChart.tsx';
import PaymentMethodsChart from '../components/charts/PolarChart.tsx';
import { FaChartLine, FaChartPie, FaDollarSign } from 'react-icons/fa';

const Home = ({ user }: { user?: { displayName?: string } }) => {
    const [dataPeriod, setDataPeriod] = useState("Mensal");

    const handlePeriodClick = (period) => {
        setDataPeriod(period);
        // Aqui você pode adicionar lógica adicional para atualizar os gráficos com base no período selecionado
        // Por exemplo, chamar uma função que busca dados correspondentes ao novo período.
        updateCharts(period);
    };

    const updateCharts = (period) => {
        // Lógica para atualizar os gráficos com base no novo período
        console.log(`Atualizando gráficos para o período: ${period}`);
    };

    const dataCards = {
        faturamento: 0,
        despesas: 0,
        lucro: 0,
    }


    // useEffect para chamar a função updateCharts quando o componente é montado
    useEffect(() => {
        updateCharts(dataPeriod);
    }, [dataPeriod]); // O array vazio assegura que o useEffect seja executado apenas uma vez no montante do componente

    return (
        <main id="main-page">
            <div id="container-main">
                <div id="title-main">
                    <span>
                        <h1>Análise do Mês</h1>
                    </span>
                </div>
                <div id="container-present">
                    <div id="card-presents">
                        <div id="card-text">
                            <div id="user-welc">
                                <h2>Olá, <span id="user-name">{user?.displayName}</span></h2>
                            </div>
                            <div id="msgs-card">
                                <div id="msg-wlcm">
                                    <p>Bem-vindo(a)! Tenha um excelente dia!</p>
                                </div>
                                <div id="msg-descrip">
                                    <p>Fique por dentro dos dados e estatísticas de sua empresa</p>
                                </div>
                            </div>
                        </div>
                        <div id="present-img">
                            <img src="img/homeImg.png" alt="present-img" />
                        </div>
                    </div>
                </div>

                <div id="periods">
                    <button
                        className={`periods-btn ${dataPeriod === 'Semanal' ? 'active' : ''}`}
                        onClick={() => handlePeriodClick('Semanal')}
                    >
                        Semanal
                    </button>
                    <button
                        className={`periods-btn ${dataPeriod === 'Mensal' ? 'active' : ''}`}
                        onClick={() => handlePeriodClick('Mensal')}
                    >
                        Mensal
                    </button>
                    <button
                        className={`periods-btn ${dataPeriod === 'Anual' ? 'active' : ''}`}
                        onClick={() => handlePeriodClick('Anual')}
                    >
                        Anual
                    </button>
                </div>

                <div id="cards-finance">
                    <div className="card-des">
                        <div className="card-obj">
                            <div className="user-men">
                                <FaChartLine size={100} style={{ color: '#5B7FFF'}}/>
                            </div>
                            <div className="men-info">
                                <p>Faturamento {dataPeriod}</p>
                                <h1>R$ <span>{dataCards.faturamento}</span></h1>
                                <span className="icon"> 0% </span>
                            </div>
                        </div>
                    </div>

                    <div className="card-des">
                        <div className="card-obj">
                            <div className="user-men">
                                <FaChartPie size={100} style={{ color: '#5B7FFF'}}/>
                            </div>
                            <div className="men-info">
                                <p>Despesa {dataPeriod}</p>
                                <h1>R$ <span>{dataCards.despesas}</span></h1>
                                <span className="icon"> 0% </span>
                            </div>
                        </div>
                    </div>

                    <div className="card-des">
                        <div className="card-obj">
                            <div className="user-men">
                                <FaDollarSign  size={100} style={{ color: '#5B7FFF'}}/>
                            </div>
                            <div className="men-info">
                                <p>Lucro {dataPeriod}</p>
                                <h1>R$ {dataCards.lucro}</h1>
                                <span className="icon">0% </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="collect-charts">
                    <span>
                        <h3>Arrecadação {dataPeriod}:</h3>
                    </span>
                    <div id="charts-main">
                        <div id="column-chart">
                            <LineChart />
                        </div>
                        <div id="pie-chart">
                            <DoughnutChart />
                        </div>
                    </div>
                </div>

                <section id="ranking-container">
                    <h1>Ranking {dataPeriod}</h1>
                    <div id="ranking-types">
                        <div className="ranking">
                            <p className="ranking-title">Produtos Vendidos</p>
                            <ul>
                                <li><img className="img-product" src="img/product.png" alt="product" />
                                    <div className="product-name">
                                        <p>Picole de Flocos: 50%</p>
                                        <div className="scale-container">
                                            <div className="product-scale">
                                                <div className="scale">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="ranking">
                            <p className="ranking-title">Arrecadação Regional</p>
                            <ul>
                                <li><img className="img-product" src="img/product.png" alt="product" />
                                    <div className="product-name">
                                        <p>Picole de Flocos: 50%</p>
                                        <div className="scale-container">
                                            <div className="product-scale">
                                                <div className="scale">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="ranking">
                            <p className="ranking-title">Funcionários</p>
                            <ul>
                                <li><img className="img-product" src="img/product.png" alt="product" />
                                    <div className="product-name">
                                        <p>Picole de Flocos: 50%</p>
                                        <div className="scale-container">
                                            <div className="product-scale">
                                                <div className="scale">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section id="payments">
                    <h1>Dados de pagamento {dataPeriod}</h1>
                    <div id="payments-forms">
                        <ul>
                            <h6>Formas disponíveis:</h6>
                            <li>
                                <div className="pay-type">
                                    <p>Dinheiro</p>
                                </div>
                            </li>

                            <li>
                                <div className="pay-type">
                                    <p>Pix</p>
                                </div>
                            </li>

                            <li>
                                <div className="pay-type">
                                    <p>Cartão (Crédito)</p>
                                </div>
                            </li>

                            <li>
                                <div className="pay-type">
                                    <p>Cartão (Débito)</p>
                                </div>
                            </li>

                            <li>
                                <div className="pay-type">
                                    <p>Boleto</p>
                                </div>
                            </li>

                            <li>
                                <div className="pay-type">
                                    <p>Cheque</p>
                                </div>
                            </li>

                            <li>
                                <div className="pay-type">
                                    <p>Transferência</p>
                                </div>
                            </li>

                            <li>
                                <div className="pay-type">
                                    <p>Em Dívida</p>
                                </div>
                            </li>
                        </ul>
                        <div id="payments-chart">
                            <PaymentMethodsChart />
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Home;
