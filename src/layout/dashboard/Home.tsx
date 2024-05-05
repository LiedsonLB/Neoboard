import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Home.css";
import LineChart from '../../components/charts/LineChart.tsx';
import PaymentMethodsChart from '../../components/charts/PolarChart.tsx';
import { FaChartLine, FaChartPie, FaDollarSign } from 'react-icons/fa';
import { useSpring, animated } from 'react-spring';
import ColumnChart from '../../components/charts/ColumnChart.tsx';
import Calendar from '../../components/calendar/Calendar.tsx';
import LoadingComponent from '../../components/loading/LoadingComponent.tsx';
import DoughnutChart from '../../components/charts/DoughtnoutChart.tsx';

interface Product {
    img: string | undefined;
    id: number;
    nome: string;
    picture: string;
    vendido: number;
}

interface Region {
    img: string | undefined;
    id: number;
    nome: string;
    picture: string;
    vendido: number;
}

interface Staff {
    img: string | undefined;
    id: number;
    nome: string;
    picture: string;
    vendido: number;
}

interface Event {
    date: Date;
    description: string;
}

const Home = ({ user }: { user?: { displayName?: string } }) => {
    const [dataPeriod, setDataPeriod] = useState("Mensal");
    const [produtos, setProdutos] = useState<Product[]>([]);
    const [regions, setRegions] = useState<Region[]>([]);
    const [staffs, setStaffs] = useState<Staff[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [produtosResponse, regionsResponse, staffsResponse] = await Promise.all([
                    axios.get('http://localhost:4000/v3/produtos'),
                    axios.get('http://localhost:4000/v3/regioes'),
                    axios.get('http://localhost:4000/v3/funcionarios')
                    //axios.get('http://localhost:4000/eventos')
                ]);
                setProdutos(produtosResponse.data.slice(0, 5));
                setRegions(regionsResponse.data.slice(0, 5));
                setStaffs(staffsResponse.data.slice(0, 5));
                //setEvents(eventsResponse.data);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const dataCards = {
        faturamento: 0,
        despesas: 0,
        lucro: 0,
    };

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

    const toggleModalOpen = () => {
        setShowModal(true);
        const helpElement = document.getElementById('Neo-Help');
        if (helpElement) {
            helpElement.style.display = 'none';
        }
    };

    const toggleModalClose = () => {
        setShowModal(false);
        const neoElement = document.getElementById('Neo-Help');
        if (neoElement && neoElement.style.display === 'none') {
            neoElement.style.display = 'block';
            neoElement.style.animation = 'none';
        }
    };

    return (
        <>
            {showModal && <div className="Modal-Help">
                <div className='container-Help'>
                    <div className="header-Help">
                        <h4 className="help-title">Dicas do Neo: </h4>
                        <button type="button" className="close-btn" onClick={toggleModalClose}>&times;</button>
                    </div>

                    <div className='Help-Info'>
                        <div className='Help-Text'>
                            <div id='Neo-Text'>
                                <h1>Olá, eu sou o <span>Neo </span>!</h1>
                                <img src="./img/NeoL.png" alt="Neo-Sit" />
                                <p>Serei o seu guia do NeoBoard, sempre que precisar de mim, clique em meu ícone na lateral <span className='span-right'>direita </span>.
                                    Atualmente você está na seção principal do NeoBoard, aqui vai um breve resumo de cada trecho desta página.</p>
                            </div>
                            <ul>
                                <li>
                                    <h4>Selecione o Período:</h4>
                                    <img className='help-imgs' src="./img/periodsimg.png" alt="periodo" />
                                    <p>Os dados da página podem ser selecionados de acordo com o período que você desejar.</p>
                                </li>

                                <li>
                                    <h4>Cartões Financeiros:</h4>
                                    <img className='help-imgs' src="./img/cardsfatura.png" alt="faturamento" />
                                    <p>Números importantes, como o faturamento, despesas e lucro.</p>
                                </li>

                                <li>
                                    <h4>Gráficos de Arrecadação:</h4>
                                    <img className='help-imgs' src="./img/arrecada.png" alt="arrecadação" />
                                    <p>Explore os gráficos de arrecadação para entender melhor a distribuição da sua receita. Os gráficos de linha e de rosca oferecem um panorama sobre padrões e tendências de arrecadação.</p>
                                </li>

                                <li>
                                    <h4>Ranking de Desempenho:</h4>
                                    <img className='help-imgs' src="./img/rankingimg.png" alt="ranking" />
                                    <p>Descubra quais produtos estão se destacando em vendas, a arrecadação por região e o desempenho dos funcionários.. </p>
                                </li>

                                <li>
                                    <h4>Dados de Pagamento e Despesas:</h4>
                                    <img className='help-imgs' src="./img/pagamentosimg.png" alt="pagamento" />
                                    <p>Veja as formas de pagamento utilizadas pelos clientes, juntamente com um gráfico que ilustra a distribuição dessas formas. </p>
                                </li>

                                <li>
                                    <h4>Dados de Pagamento e Despesas:</h4>
                                    <img className='help-imgs' src="./img/Despesasimg.png" alt="despesas" />
                                    <p>Analise de forma geral as suas despesas com um gráfico de coluna, além disso o NeoBoard oferece um calendário para registrar as despesas de determinado dia. </p>
                                </li>
                            </ul>
                            <button onClick={toggleModalClose} className='help-btn'>Entendi</button>
                        </div>

                        <figure className='Neo-Left'>
                            <img src="./img/NeoL.png" alt="Neo-Sit" />
                        </figure>
                    </div>
                </div>
            </div>}

            <div id='Neo-Help' onClick={toggleModalOpen}>
                <img src="/img/NeoHead.png" alt="neo_head" />
            </div>

            <div id="main-page">
                <section id="container-main">
                    <header id="title-main">
                        <span>
                            <h1>Análise {dataPeriod}</h1>
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
                                <img src="./img/NeoL.png" alt="present-img" />
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
                                    <p style={{ color: 'var(--primary-color)', textAlign: 'center', textDecoration: 'underline' }}>Nenhum produto encontrado</p>
                                ) : (
                                    <ul>
                                        {produtos.map(produto => (
                                            <li key={produto.id}>
                                                <div className="ranking-img">
                                                    <img src={produto.picture} alt={produto.nome} />
                                                </div>
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
                                ) : regions.length === 0 ? (
                                    <p style={{ color: 'var(--primary-color)', textAlign: 'center', textDecoration: 'underline'}}>Nenhuma região encontrada</p>
                                ) : (
                                    <ul>
                                        {regions.map(region => (
                                            <li key={region.id}>
                                                <div className="ranking-img">
                                                    <img src={region.picture} alt={region.nome} />
                                                </div>
                                                <div className="product-name">
                                                    <p>{region.nome}: {region.vendido}%</p>
                                                    <div className="scale-container">
                                                        <div className="product-scale">
                                                            <div className="scale" style={{ width: `${region.vendido}%` }}>
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
                                ) : staffs.length === 0 ? (
                                    <p style={{ color: 'var(--primary-color)', textAlign: 'center', textDecoration: 'underline' }}>Nenhum funcionário encontrado</p>
                                ) : (
                                    <ul>
                                        {staffs.map(staff => (
                                            <li key={staff.id}>
                                                <div className="ranking-img">
                                                    <img src={staff.picture} alt={staff.nome} />
                                                </div>
                                                <div className="product-name">
                                                    <p>{staff.nome}: {staff.vendido}%</p>
                                                    <div className="scale-container">
                                                        <div className="product-scale">
                                                            <div className="scale" style={{ width: `${staff.vendido}%` }}>
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

                <footer>
                    <div id="container-footer">
                        <p><a href=" ">Termos de Uso</a> | <a href=" ">Política de Privacidade</a> | <a href=" ">Central de Ajuda</a></p>
                        <p>Entre em contato: <a href="mailto:liedson.b9@gmail.com">neoboard@neo.com</a></p>
                        <hr id="lineFooter" />
                        <div id="autoria">
                            <p>&copy; 2024 NeoBoard. Todos os direitos reservados.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default Home;