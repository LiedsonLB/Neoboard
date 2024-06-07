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
    porcentagem?: string;
}

interface Region {
    img: string | undefined;
    id: number;
    nome: string;
    picture: string;
    vendido: number;
    porcentagem?: string;
}

interface Staff {
    img: string | undefined;
    id: number;
    nome: string;
    picture: string;
    vendido: number;
    porcentagem?: string;
}

interface Event {
    date: Date;
    description: string;
}

interface Venda {
    Data: string;
    funcionarioId: number;
    produtoid: number;
    quantidadeProdutos: number;
    valor: number;
    comprador: string;
    regiaoId: number;
    formaPagamento: string;
    usuarioId: string;
}

const Home = ({ user }: { user?: { displayName?: string } }) => {
    const [dataPeriod, setDataPeriod] = useState("Mensal");
    const [produtos, setProdutos] = useState<Product[]>([]);
    const [regions, setRegions] = useState<Region[]>([]);
    const [staffs, setStaffs] = useState<Staff[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [events, setEvents] = useState<Event[]>([]);
    const [vendas, setVendas] = useState<Venda[]>([]);
    const [vendasAgrupadasGrafico, setVendasAgrupadasGrafico] = useState<Venda[]>([]);
    const [dataCards, setDataCards] = useState({ faturamento: 0, despesas: 0, lucro: 0 });

    const fetchData = async () => {
        setLoading(true);
        try {
            const [produtosResponse, regionsResponse, staffsResponse, vendasResponse] = await Promise.all([
                axios.get(`http://localhost:4000/v3/produtos?userId=${localStorage.getItem('userID')}`),
                axios.get(`http://localhost:4000/v3/regioes?userId=${localStorage.getItem('userID')}`),
                axios.get(`http://localhost:4000/v3/funcionarios?userId=${localStorage.getItem('userID')}`),
                axios.get(`http://localhost:4000/v3/relatorio?period=${dataPeriod}`)
            ]);
    
            setProdutos(produtosResponse.data.slice(0, 5));
            setRegions(regionsResponse.data.slice(0, 5));
            setStaffs(staffsResponse.data.slice(0, 5));

            const totalFaturamento = vendasResponse.data.reduce((acc: number, venda: Venda) => acc + venda.valor, 0);
            console.log(totalFaturamento);

            setDataCards(prevDataCards => ({ ...prevDataCards, faturamento: totalFaturamento }));

            const produtosComPorcentagens = calcularPorcentagensProdutos(vendasResponse.data, produtosResponse.data);
            setProdutos(produtosComPorcentagens);

            const regioesComPorcentagens = calcularPorcentagensRegioes(vendasResponse.data, regionsResponse.data);
            setRegions(regioesComPorcentagens);

            const funcionariosComPorcentagens = calcularPorcentagensFuncionarios(vendasResponse.data, staffsResponse.data);
            setStaffs(funcionariosComPorcentagens);
    
            // Processar os dados de vendas para agrupar por data e somar os valores
            const vendasData = vendasResponse.data;
            const vendasAgrupadas = vendasData.reduce((acc: any, venda: any) => {
                const data = venda.Data;
                if (!acc[data]) {
                    acc[data] = venda;
                } else {
                    acc[data].valor += venda.valor;
                }
                return acc;
            }, {});
    
            // Convertendo o objeto de volta para um array
            const vendasAgrupadasArray: Venda[] = Object.values(vendasAgrupadas);
    
            setVendas(vendasAgrupadasArray);
    
            const response = await axios.get(`http://localhost:4000/v3/despesas/period?period=${dataPeriod}`);
            const despesas = response.data;
    
            console.log(`Despesas por ${dataPeriod}: `, despesas)
    
            // Filtra despesas com pendentes e atrasadas
            const despesasPendentesAtrasadas = despesas.filter(despesa => despesa.status === 'Pendente' || despesa.status === 'Atrasada');
    
            // Calcula o total das despesas pendentes e atrasadas
            const totalDespesas = despesasPendentesAtrasadas.reduce((acc, despesa) => acc + despesa.valor, 0);
    
            console.log("Despesas pendentes e atrasadas:", despesasPendentesAtrasadas);
            console.log("Total das despesas pendentes e atrasadas:", totalDespesas);
    
            setDataCards(prevDataCards => ({ ...prevDataCards, despesas: totalDespesas }));
    
            setDataCards(prevDataCards => ({ ...prevDataCards, faturamento: totalFaturamento }));
    
            // Calcular o lucro (faturamento - despesas)
            const lucro = totalFaturamento - totalDespesas;
            setDataCards(prevDataCards => ({ ...prevDataCards, lucro }));
    
            // Atualizar o estado de vendas agrupadas para o gráfico
            setVendasAgrupadasGrafico(vendasAgrupadasArray);
    
            setLoading(false);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            setLoading(false);
        }
    };    

    useEffect(() => {
        fetchData();
    }, [dataPeriod, localStorage.getItem('userID')]);

    useEffect(() => {
        console.log("Atualizado vendas:", vendas);
    }, [vendas]);

    const calcularPorcentagensProdutos = (vendas: Venda[], produtos: Product[]) => {
        const totalFaturamento = vendas.reduce((acc, venda) => acc + venda.valor, 0);

        const produtosComPorcentagens = produtos.map(produto => {
            const totalVendidoProduto = vendas
                .filter(venda => venda.produtoid === produto.id)
                .reduce((acc, venda) => acc + venda.valor, 0);
            const porcentagem = totalFaturamento ? (totalVendidoProduto / totalFaturamento) * 100 : 0;
            return { ...produto, porcentagem: porcentagem.toFixed(1) };
        });

        // Ordenar os produtos do maior para o menor em porcentagem
        return produtosComPorcentagens.sort((a, b) => parseFloat(b.porcentagem!) - parseFloat(a.porcentagem!));
    };

    const calcularPorcentagensRegioes = (vendas: Venda[], regioes: Region[]) => {
        const totalFaturamento = vendas.reduce((acc, venda) => acc + venda.valor, 0);

        const regioesComPorcentagens = regioes.map(regiao => {
            const totalVendidoRegiao = vendas
                .filter(venda => venda.regiaoId === regiao.id)
                .reduce((acc, venda) => acc + venda.valor, 0);
            const porcentagem = totalFaturamento ? (totalVendidoRegiao / totalFaturamento) * 100 : 0;
            return { ...regiao, porcentagem: porcentagem.toFixed(1) };
        });

        // Ordenar as regiões do maior para o menor em porcentagem
        return regioesComPorcentagens.sort((a, b) => parseFloat(b.porcentagem!) - parseFloat(a.porcentagem!));
    };

    const calcularPorcentagensFuncionarios = (vendas: Venda[], funcionarios: Staff[]) => {
        const totalFaturamento = vendas.reduce((acc, venda) => acc + venda.valor, 0);

        const funcionariosComPorcentagens = funcionarios.map(funcionario => {
            const totalVendidoFuncionario = vendas
                .filter(venda => venda.funcionarioId === funcionario.id)
                .reduce((acc, venda) => acc + venda.valor, 0);
            const porcentagem = totalFaturamento ? (totalVendidoFuncionario / totalFaturamento) * 100 : 0;
            return { ...funcionario, porcentagem: porcentagem.toFixed(1) };
        });

        // Ordenar os funcionários do maior para o menor em porcentagem
        return funcionariosComPorcentagens.sort((a, b) => parseFloat(b.porcentagem!) - parseFloat(a.porcentagem!));
    };

    const AnimatedNumber = ({ value }: { value: number }) => {
        const props = useSpring({ value, from: { value: 0 }, reset: true });

        return <animated.span>{props.value.interpolate((val: number) => Math.floor(val))}</animated.span>;
    };

    const handlePeriodClick = (period: string) => {
        setDataPeriod(period);
    };

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
                                <LineChart vendas={vendasAgrupadasGrafico} />
                            </div>
                            <div id="pie-chart">
                                <DoughnutChart />
                            </div>
                        </div>
                    </section>

                    <section id="ranking-container">
                        <header>
                            <h1>Ranking {dataPeriod} Faturamento</h1>
                        </header>
                        <div id="ranking-types">
                            <div className="ranking">
                                <p className="ranking-title">Produtos</p>
                                {loading ? (
                                    <LoadingComponent />
                                ) : produtos.length === 0 ? (
                                    <p style={{ color: 'var(--primary-color)', textAlign: 'center', textDecoration: 'underline', marginBottom: '1rem' }}>Nenhum produto encontrado</p>
                                ) : (
                                    <ul>
                                        {produtos.map(produto => (
                                            <li key={produto.id}>
                                                <div className="ranking-img">
                                                    <img src={produto.picture} alt={produto.nome} />
                                                </div>
                                                <div className="product-name">
                                                    <p>{produto.nome}: {produto.porcentagem}%</p>
                                                    <div className="scale-container">
                                                        <div className="product-scale">
                                                            <div className="scale" style={{ width: `${produto.porcentagem}%` }}>
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
                                <p className="ranking-title">Regiões</p>
                                {loading ? (
                                    <LoadingComponent />
                                ) : regions.length === 0 ? (
                                    <p style={{ color: 'var(--primary-color)', textAlign: 'center', textDecoration: 'underline', marginBottom: '1rem' }}>Nenhuma região encontrada</p>
                                ) : (
                                    <ul>
                                        {regions.map(region => (
                                            <li key={region.id}>
                                                <div className="ranking-img">
                                                    <img src={region.picture} alt={region.nome} />
                                                </div>
                                                <div className="product-name">
                                                    <p>{region.nome}: {region.porcentagem}%</p>
                                                    <div className="scale-container">
                                                        <div className="product-scale">
                                                            <div className="scale" style={{ width: `${region.porcentagem}%` }}></div>
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
                                    <p style={{ color: 'var(--primary-color)', textAlign: 'center', textDecoration: 'underline', marginBottom: '1rem' }}>Nenhum funcionário encontrado</p>
                                ) : (
                                    <ul>
                                        {staffs.map(staff => (
                                            <li key={staff.id}>
                                                <div className="ranking-img">
                                                    <img src={staff.picture} alt={staff.nome} />
                                                </div>
                                                <div className="product-name">
                                                    <p>{staff.nome}: {staff.porcentagem}%</p>
                                                    <div className="scale-container">
                                                        <div className="product-scale">
                                                            <div className="scale" style={{ width: `${staff.porcentagem}%` }}></div>
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
                                    <PaymentMethodsChart salesData={vendas} />
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
                                    {/* <p>Clique na data e veja a despesa que você tem naquele dia</p> */}
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            </div>
        </>
    );
};

export default Home;