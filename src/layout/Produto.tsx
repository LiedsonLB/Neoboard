import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductColumnChart from '../components/charts/ProductColumnChart';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const Produto = () => {
    const { id } = useParams(); // Obtém o ID do produto da URL
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProdutoById = async () => {
            try {
                console.log(id)
                const response = await axios.get(`http://localhost:4000/v2/produtos/${id}`);
                setSelectedProduct(response.data); // Define os detalhes do produto recuperado do servidor
                console.log(selectedProduct.picture)
            } catch (error) {
                console.error('Erro ao buscar detalhes do produto:', error);
                // Lógica para lidar com erros ao buscar os detalhes do produto
            }
        };

        fetchProdutoById(); // Chama a função para buscar os detalhes do produto quando o componente é montado
    }, [id]); // Inclui o ID como uma dependência para que a busca seja atualizada quando o ID na URL mudar

    if (!selectedProduct) {
        return <div>Carregando...</div>; // Exibe uma mensagem de carregamento enquanto os detalhes do produto estão sendo buscados
    }

    return (
        <div className="" style={{ padding: '2rem', height: '100vh' }}>
            <div className="" style={{ height: '100%' }}>

                <div id="header-modal">
                    <button type="button" className="close-btn" onClick={() => navigate('/')}>&#10094;</button>
                    <h4 className="modal-title" style={{
                        width: '100%',
                        textAlign: 'center',
                        fontSize: '1.5rem'
                    }}>Informações do Produto</h4>
            </div>

            <div id='Product-Info-Container' style={{ height: '100%', overflowX: 'inherit'}}>
                <div id='infoprod-popup'>
                    <div id='prodInfo-popup'>
                        <img src={selectedProduct.picture} alt="product-avatar" />
                        <h2 className='nameUserProd'>{selectedProduct.nome}</h2>
                        <div id="ProdTextInfo">
                            <p><span>Categoria:</span> {selectedProduct.categoria}</p>
                            <p><span>Valor:</span> R$ {selectedProduct.preco}</p>
                            <p><span>Descrição:</span> {selectedProduct.descricao}</p>
                            <div className='userStfSocialMidia' style={{ gap: '2rem' }}>
                                <p><span>Código:</span> {selectedProduct.id}</p> <a href=""><i className="fa-solid fa-share-nodes"></i></a>
                            </div>
                        </div>
                    </div>
                </div>

                <div id='infoprod-charts'>
                    <div id='container-ProductColumnChart'>
                        <ProductColumnChart />
                    </div>

                    <p className="text-history">Histórico de vendas: </p>
                    <section id='container-table-prod'>
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
        </div >
        </div >
    )
}

export default Produto