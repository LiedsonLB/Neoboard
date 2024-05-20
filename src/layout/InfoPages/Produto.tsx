import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductColumnChart from '../../components/charts/ProductColumnChart.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/loading/Loading.tsx';
import Produto from '../../models/Produto.tsx';

const ProdutoInfo = () => {
    const { id } = useParams();
    const [selectedProduct, setSelectedProduct] = useState<Produto | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProdutoById = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/v3/produtos/${id}`);
                setSelectedProduct(response.data);
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

                <div id='Product-Info-Container' style={{ minHeight: '100vh', overflowX: 'inherit', paddingInline: '1rem' }}>
                    <div id='infoprod-popup' style={{ height: 'auto' }}>
                        <div id='prodInfo-popup'>
                            <img src={selectedProduct.picture} alt="product-avatar" />
                            <h2 className='nameUserProd'>{selectedProduct.nome}</h2>
                            <div id="ProdTextInfo">
                                <p><span>Categoria:</span> {selectedProduct.categoria}</p>
                                <p><span>Valor:</span> R$ {selectedProduct.precoAtual.toFixed(2)}</p>
                                <p><span>Descrição:</span> {selectedProduct.descricao}</p>
                                <div className='userStfSocialMidia' style={{ gap: '2rem' }}>
                                    <p><span>Código:</span> {selectedProduct.id}</p> <a href={"/product/" + selectedProduct.id}><i className="fa-solid fa-share-nodes"></i></a>
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

                <div id='container-more-products'>
                    ola mundo
                </div>
            </div >
        </div >
    )
}

export default ProdutoInfo