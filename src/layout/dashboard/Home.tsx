import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "./Home.css"
import Loading from '../../components/loading/Loading.tsx';
import LineChart from '../../components/charts/LineChart.tsx';
import DoughnutChart from '../../components/charts/DoughtnoutChart.tsx';
import PaymentMethodsChart from '../../components/charts/PolarChart.tsx';
import { FaChartLine, FaChartPie, FaDollarSign } from 'react-icons/fa';
import { useSpring, animated } from 'react-spring';
import ColumnChart from '../../components/charts/ColumnChart.tsx';
import Calendar from '../../components/calendar/Calendar.tsx';
import LoadingComponent from '../../components/loading/LoadingComponent.tsx';

interface Produto {
    img: string | undefined;
    id: number;
    nome: string;
    imagem: string;
    vendido: number;
}

interface Event {
    date: Date;
    description: string;
}

const Home = ({ user }: { user?: { displayName?: string } }) => {
    const [dataPeriod, setDataPeriod] = useState("Mensal");
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:4000/produtos');
                setProdutos(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
                setLoading(false);
            }

            try {
                const eventsResponse = await axios.get('http://localhost:4000/eventos');
                setEvents(eventsResponse.data);
            } catch (error) {
                console.error('Erro ao buscar dados dos eventos:', error);
            }
        }

        fetchData();
    }, []);

    const dataCards = {
        faturamento: 1000,
        despesas: 2000,
        lucro: 100000,
    }

    const AnimatedNumber = ({ value }: { value: number }) => {
        const props = useSpring({ value, from: { value: 0 }, reset: true });

        return <animated.span>{props.value.interpolate((val: number) => Math.floor(val))}</animated.span>;
    };

    const handlePeriodClick = (period: string) => {
        setDataPeriod(period);
        updateCharts(period);
    };

    const updateCharts = (period: string) => {
        console.log(`Atualizando gráficos para o período: ${period}`);
    };

    useEffect(() => {
        updateCharts(dataPeriod);
    }, [dataPeriod]);

    return (
        <main id="main-page">
            <section id="container-main">
                <header id="title-main">
                    <span>
                        <h1>Análise do Mês</h1>
                    </span>
                </header>
                <article id="container-present">
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
                                    <p>Fique por dentro dos dados e estatísticas de sua empresa.</p>
                                </div>
                            </div>
                        </div>
                        <figure id="present-img">
                            <img src="img/homeImg.png" alt="present-img" />
                        </figure>
                    </div>
                </article>

                <section id="periods">
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
                </section>

                <section id="cards-finance">       
                    <div className="card-des">
                        <div className="card-obj">
                            <div className="user-men">
                                <FaChartLine size={100} style={{ color: '#5B7FFF' }} />
                            </div>
                            <div className="men-info">                              
                            <span><p>Faturamento {dataPeriod}</p></span>
                                <h1>
                                    R$ <AnimatedNumber value={dataCards.faturamento} />
                                </h1>
                                <span className="icon"> 0% </span>
                            </div>
                        </div>
                    </div>

                    <div className="card-des">
                        <div className="card-obj">
                            <div className="user-men">
                                <FaChartPie size={100} style={{ color: '#5B7FFF' }} />
                            </div>
                            <div className="men-info">
                                <span><p>Despesa {dataPeriod}</p></span>
                                <h1>
                                    R$ <AnimatedNumber value={dataCards.despesas} />
                                </h1>
                                <span className="icon"> 0% </span>
                            </div>
                        </div>
                    </div>

                    <div className="card-des">
                        <div className="card-obj">
                            <div className="user-men">
                                <FaDollarSign size={100} style={{ color: '#5B7FFF' }} />
                            </div>
                            <div className="men-info">
                                <span><p>Lucro {dataPeriod}</p></span>
                                <h1>
                                    R$ <AnimatedNumber value={dataCards.lucro} />
                                </h1>
                                <span className="icon">0% </span>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="collect-charts">
                    <header>
                        <h3>Arrecadação {dataPeriod}:</h3>
                    </header>
                    <div id="charts-main">
                        <div id="column-chart">
                            <LineChart />
                        </div>
                        <div id="pie-chart">
                            <DoughnutChart />
                        </div>
                    </div>
                </section>

                <section id="ranking-container">
                    <header>
                        <h1>Ranking {dataPeriod}</h1>
                    </header>
                    <div id="ranking-types">
                        <div className="ranking">
                            <p className="ranking-title">Produtos Vendidos</p>
                            {loading ? (
                                <LoadingComponent />
                            ) : produtos.length === 0 ? (
                                <p style={{ color: 'red', textAlign: 'center' }}>Erro ao carregar os produtos. Por favor, tente novamente mais tarde.</p>
                            ) : (
                                <ul>
                                    {produtos.map(produto => (
                                        <li key={produto.id}>
                                            <img className="img-product" src={produto.img} alt={produto.nome} />
                                            <div className="product-name">
                                                <p>{produto.nome}: {produto.vendido}%</p>
                                                <div className="scale-container">
                                                    <div className="product-scale">
                                                        <div className="scale" style={{ width: `${produto.vendido}%` }}>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}

                        </div>
                        <div className="ranking">
                            <p className="ranking-title">Arrecadação Regional</p>
                            {loading ? (
                                <LoadingComponent />
                            ) : produtos.length === 0 ? (
                                <p style={{ color: 'red', textAlign: 'center' }}>Erro ao carregar os produtos. Por favor, tente novamente mais tarde.</p>
                            ) : (
                                <ul>
                                    {produtos.map(produto => (
                                        <li key={produto.id}>
                                            <img className="img-product" src={produto.img} alt={produto.nome} />
                                            <div className="product-name">
                                                <p>{produto.nome}: {produto.vendido}%</p>
                                                <div className="scale-container">
                                                    <div className="product-scale">
                                                        <div className="scale" style={{ width: `${produto.vendido}%` }}>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="ranking">
                            <p className="ranking-title">Funcionários</p>
                            {loading ? (
                                <LoadingComponent />
                            ) : produtos.length === 0 ? (
                                <p style={{ color: 'red', textAlign: 'center' }}>Erro ao carregar os produtos. Por favor, tente novamente mais tarde.</p>
                            ) : (
                                <ul>
                                    {produtos.map(produto => (
                                        <li key={produto.id}>
                                            <img className="img-product" src={produto.img} alt={produto.nome} />
                                            <div className="product-name">
                                                <p>{produto.nome}: {produto.vendido}%</p>
                                                <div className="scale-container">
                                                    <div className="product-scale">
                                                        <div className="scale" style={{ width: `${produto.vendido}%` }}>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
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
                            <div id='chart-payment'>
                                <PaymentMethodsChart />
                            </div>
                        </div>
                    </div>
                </section>

                <section id="expenses">
                    <h1>De olho nas despesas</h1>
                    <div id="expenses-data">
                        <div id="expense-chart">
                            <ColumnChart />
                        </div>
                        <div id="expense-calendar">
                            <Calendar events={events} />
                            <div id="calendar-description">
                                <p>Clique na data e veja a despesa que você tem naquele dia</p>
                            </div>
                        </div>
                    </div>
                </section>
            </section>

            <footer id="footer">
                <hr />
                <p>Todos os direitos reservados a &copy;Neoboard 2024</p>
            </footer>
        </main>
    );
};

export default Home;