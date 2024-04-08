import React from 'react'

const ProdutoPage = () => {
    return (
        <div id='productpage-container'>
            <header id='productpage-header'>
                <h1>Produto</h1>
            </header>

            <main id='productpage-main'>
                <section id='prodpage-left'>
                    <img src="" alt="" />
                    <h1>Picolé de Flocos</h1>
                    <p>Categoria: <span>Picolé</span></p>
                    <p>Valor: <strong>R$ 2,50</strong></p>
                    <span><p>Descrição: Picolé delicioso de flocos da marca Kibom, um picolé bom para o verão.</p></span>
                </section>

                <section id='prodpage-right'>
                    <div id='prodpage-chart'>

                    </div>

                    <table>
                        <thead>
                            <tr>
                                <td>região</td>
                                <td>nome</td>
                                <td>vendido</td>
                                <td>faturamento</td>
                                <td className='table-space'></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="region-pic">
                                        <img src="./img/Piripiri-Igreja-Matriz.png" alt="piripiri" />
                                    </div>
                                </td>
                                <td>
                                    <div className="price">
                                        <h3>piripiri</h3>
                                    </div>
                                </td>
                                <td>
                                    <div className="sold">
                                        <h3>1587</h3>
                                    </div>
                                </td>
                                <td>
                                    <h5 className="status comprado">R$10000K</h5>
                                </td>
                                <td>
                                    <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                                        <button className="edit">Ver</button>
                                    </div>
                                </td>
                            </tr>

                            <tr className='row-white'>
                                <td>
                                    <div className="region-pic">
                                        <img src="./img/Pdois.jpg" alt="piripiri" />
                                    </div>
                                </td>
                                <td><h3>Pedro II</h3></td>
                                <td><h3>8300</h3></td>
                                <td><h5 className="status negociacao">R$30000K</h5></td>
                                <td>
                                    <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                                        <button className="edit">Ver</button>
                                    </div></td>
                            </tr>

                            <tr>
                                <td>
                                    <div className="table-regions">
                                        <div className="region-pic">
                                            <img src="./img/no_regionImg.jpeg" alt="sem_regiao" />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="price">
                                        <h3>Capitão de Campos</h3>
                                    </div>
                                </td>
                                <td>
                                    <div className="sold">
                                        <h3>1587</h3>
                                    </div>
                                </td>
                                <td>
                                    <h5 className="status venda">R$50000K</h5>
                                </td>
                                <td>
                                    <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                                        <button className="edit">Ver</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </section>

            </main>


        </div>
    )
}

export default ProdutoPage