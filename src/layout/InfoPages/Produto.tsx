import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { IoArrowUpSharp, IoArrowDownSharp } from 'react-icons/io5';
import ProductColumnChart from '../../components/charts/ProductColumnChart.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/loading/Loading.tsx';
import Produto from '../../models/Produto.tsx';

const ProdutoInfo = () => {
    const { id } = useParams();
    const [selectedProduct, setSelectedProduct] = useState<Produto | null>(null);
    const [variacoes, setVariacoes] = useState<any[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProdutoById = async () => {
            try {
                const produtoResponse = await axios.get(`http://localhost:4000/v3/produtos/${id}`);
                setSelectedProduct(produtoResponse.data);

                const variacoesResponse = await axios.get(`http://localhost:4000/v3/variacoes/${id}`);
                setVariacoes(variacoesResponse.data);
            } catch (error) {
                console.error('Erro ao buscar detalhes do produto:', error);
                navigate("/produto_nao_encontrado")
            }
        };
        fetchProdutoById();
    }, [id]);

    console.log(selectedProduct);

    if (!selectedProduct) {
        return <Loading />;
    }

    // Função para formatar a data no formato brasileiro
    const formatarDataBR = (data: string) => {
        return format(new Date(data), "dd/MM/yyyy"); // Formato "dd/MM/yyyy"
    };

    // Função para determinar o ícone e a cor com base na variação
    const getIconAndColor = (variacao: number) => {
        if (variacao > 0) {
            return { icon: <IoArrowUpSharp />, color: 'green' }; // Variação positiva (verde)
        } else if (variacao < 0) {
            return { icon: <IoArrowDownSharp />, color: 'red' }; // Variação negativa (vermelha)
        } else {
            return { icon: null, color: 'inherit' }; // Sem variação (cor padrão)
        }
    };

    return (
        <div className="" style={{ minHeight: '100vh' }}>
            <div className="" style={{ height: '100%' }}>

                <div id="header-modal" style={{ background: 'var(--primary-color)', color: 'var(--white-color)', padding: '.2rem 2rem', position: 'sticky', top: '0', zIndex: '10' }}>
                    <button type="button" className="close-btn" style={{ background: 'transparent' }} onClick={() => navigate('/')}>&#10094;</button>
                    <h4 className="modal-title" style={{
                        width: '100%',
                        textAlign: 'center',
                        color: 'var(--white-color)',
                    }}>Informações do Produto</h4>
                </div>

                <div id='Product-Info-Container' style={{ minHeight: '100vh', overflowX: 'inherit', paddingInline: '1rem', paddingBlock: '3rem' }}>
                    <div id='infoprod-popup' style={{ height: 'auto' }}>
                        <div id='prodInfo-popup'>
                            <img src={selectedProduct.picture} alt="product-avatar" />
                            <h2 className='nameUserProd'>{selectedProduct.nome}</h2>
                            <div id="ProdTextInfo">
                                <p><span>Categoria:</span> {selectedProduct.categoria}</p>
                                <p><span>Valor:</span> R$ {selectedProduct.precoAtual.toFixed(2)}</p>
                                <p><span>Descrição:</span> {selectedProduct.descricao}</p>
                                <div className='userStfSocialMidia' style={{ gap: '2rem' }}>
                                    <p><span>Código:</span> {selectedProduct.id}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id='infoprod-charts' style={{ height: 'auto' }}>
                        <div id='container-ProductColumnChart'>
                            <ProductColumnChart />
                        </div>

                        <p className="text-history">Histórico de vendas: </p>
                        <section id='container-table-prod' style={{ minHeight: '12rem' }}>
                            <table id='table-prod'>
                                <thead className='head-list-prod'>
                                    <tr>
                                        <td>Produto</td>
                                        <td>Região</td>
                                        <td>Quantidade</td>
                                        <td>Data</td>
                                        <td>Pagamento</td>
                                    </tr>
                                </thead>
                                <tbody className='body-list-prod'>
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
                                            <h3 data-toggle="tooltip" title="Cartão(debito)">Cartão (debito)</h3>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                    </div>

                </div>

                <div id="container-variation-price">
                    <header>
                        <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Registro de variações de preço</h3>
                    </header>
                    <section id="container-table-infoProduct">
                        <table id="table-prod" className="table-infoProduct">
                            <thead className="head-list-fin" style={{ backgroundColor: 'var(--secondy-color)' }}>
                                <tr style={{ backgroundColor: 'var(--secondy-color) !important' }}>
                                    <td>Data</td>
                                    <td>Preço Antigo</td>
                                    <td>Preço Novo</td>
                                    <td>Variação</td>
                                </tr>
                            </thead>
                            <tbody className="body-list-prod debt" style={{ gap: '0px !importat' }}>
                                {variacoes.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} style={{ textAlign: 'center', fontSize: '16px', marginBlock: '.5rem' }}>Não há variações de preço registradas para este produto.</td>
                                    </tr>
                                ) : (
                                    variacoes.map((variacao, index) => (
                                        <tr key={index} style={{ fontWeight: 'bold' }}>
                                            <td>{formatarDataBR(variacao.data)}</td>
                                            <td>R$ {variacao.preco.toFixed(2)}</td>
                                            <td>R$ {(variacao.preco + variacao.variacao).toFixed(2)}</td>
                                            <td style={{ color: getIconAndColor(variacao.variacao).color }}>
                                                {getIconAndColor(variacao.variacao).icon} {variacao.variacao.toFixed(2)}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </section>
                </div>

                <div id='container-more-products'>

                </div>
            </div >
        </div >
    )
}

export default ProdutoInfo