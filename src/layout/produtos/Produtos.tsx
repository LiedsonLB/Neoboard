import React, { useState, useEffect } from 'react';
import "./Produtos.css";
import { IoSearch, IoPerson, IoCamera, IoBasket, IoCart, IoLogoDropbox, IoCube } from 'react-icons/io5';
import ProductDoughnut from '../../components/charts/ProductDoughtnout';
import ProductColumnChart from '../../components/charts/ProductColumnChart.tsx';

const Produtos = () => {
  const [showModal, setShowModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectionSession, setSelectionSession] = useState<'info' | 'charts'>('info');

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleModalClose = () => {
    setShowModal(!showModal);
  };

  const toggleInfoModal = () => {
    setShowInfoModal(!showInfoModal);
  };

  const generateQRCode = (url: string) => {
    const qrCodeSize = 300; // Tamanho do código QR
    const qrCodeData = encodeURIComponent(url);
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${qrCodeData}&size=${qrCodeSize}x${qrCodeSize}`;

    // Abre uma nova janela com o código QR
    const newWindow = window.open(qrCodeUrl, '_blank');
    if (!newWindow) {
      alert('Não foi possível abrir a janela do código QR. Verifique se as pop-ups estão bloqueadas.');
    }
  };

  return (
    <>
      {showModal && <div className="Modal-Add">
          <div className='container-Add-Product'>
            <div id="header-modal">
              <h4 className="modal-title">Adicionar Produto: </h4>
              <button type="button" className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <div id="Add-Item-Product">

              <div className='img-prod-up'>
                <div className='img-input-container'>
                  <img src="" className='img-prod-add' />
                  <input type="file" id='img-input' />
                  <i className='icon-prod-prof'><IoCube /></i>
                  <div className='icon-text-cam'>
                    <i className='icon-cam'><IoCamera /></i>
                    <p>Adicionar foto</p>
                  </div>
                </div>
              </div>

              <div className='input-item input-single'>
                <span>
                  <label htmlFor="name-item">Nome do Produto:</label>
                  <input type="text" name='name-item' className='full-item' />
                </span>
              </div>

              <div className='input-item input-mult'>
                <span>
                  <label htmlFor="name-item">Tipo do Produto:</label>
                  <input type="text" name='name-item' className='full-item' />
                </span>
                <span>
                  <label htmlFor="name-item">Valor Unitário (R$):</label>
                  <input type="text" name='name-item' className='full-item' />
                </span>
              </div>

              <button id='add-staff-Btn'>Enviar</button>
            </div>
          </div>
        </div>}

        {showInfoModal &&(
        // Modal de exibição de informações do funcionário
        <div className="Modal-Add">
          <div className="container-Detail-Stsaff">
            <div id="header-modal">
              <h4 className="modal-title">Informações do Funcionário</h4>
              <button type="button" className="close-btn" onClick={() => setShowInfoModal(false)}>&times;</button>
            </div>
            <div id='infouser-popup'>
              <div id='userInfo-popup'>
                <div className='userStfSocialMidia'>
                  <a href=""><i className="fa-solid fa-envelope"></i></a>
                  <a href=""><i className="fa-brands fa-github"></i></a>
                  <a href=""><i className="fa-brands fa-linkedin"></i></a>
                </div>
              </div>

              <div id='select-session-staff'>
                <div id='select-session-staff-btnContainer'>
                  <button className={selectionSession === 'info' ? 'select-session selected' : 'select-session'} onClick={() => setSelectionSession('info')}>Perfil</button>
                  <button className={selectionSession === 'charts' ? 'select-session selected' : 'select-session'} onClick={() => setSelectionSession('charts')}>Desempenho</button>
                </div>

                {(selectionSession === 'info' || selectionSession === 'charts') && (
                  <>
                    {selectionSession === 'charts' && (
                      <div id='infouser-charts'>
                        <div id='container-StaffColumnChart'>
                          <ProductColumnChart />
                        </div>

                        <p className="text-history">Histórico de vendas: </p>
                        <section id='container-table-stf'>
                          <table id='table-stf'>
                            <thead className='head-list-stf'>
                              <tr>
                                <td>Produto</td>
                                <td>Região</td>
                                <td>Quantidade</td>
                                <td>Data</td>
                                <td>Pagamento</td>
                              </tr>
                            </thead>
                            <tbody className='body-list-stf'>
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
                                  <h3 data-toggle="tooltip" title="Cartão(debito)">Cartão(debito)</h3>
                                </td>
                              </tr>
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
                                  <h3 data-toggle="tooltip" title="Cartão(debito)">Cartão(debito)</h3>
                                </td>
                              </tr>
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
                                  <h3 data-toggle="tooltip" title="Cartão(debito)">Cartão(debito)</h3>
                                </td>
                              </tr>
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
                                  <h3 data-toggle="tooltip" title="Cartão(debito)">Cartão(debito)</h3>
                                </td>
                              </tr>
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
                                  <h3 data-toggle="tooltip" title="Cartão(debito)">Cartão(debito)</h3>
                                </td>
                              </tr>
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
                                  <h3 data-toggle="tooltip" title="Cartão(debito)">Cartão(debito)</h3>
                                </td>
                              </tr>
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
                                  <h3 data-toggle="tooltip" title="Cartão(debito)">Cartão(debito)</h3>
                                </td>
                              </tr>
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
                                  <h3 data-toggle="tooltip" title="Cartão(debito)">Cartão(debito)</h3>
                                </td>
                              </tr>
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
                                  <h3 data-toggle="tooltip" title="Cartão(debito)">Cartão(debito)</h3>
                                </td>
                              </tr>
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
                                  <h3 data-toggle="tooltip" title="Cartão(debito)">Cartão(debito)</h3>
                                </td>
                              </tr>
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
                                  <h3 data-toggle="tooltip" title="Cartão(debito)">Cartão(debito)</h3>
                                </td>
                              </tr>
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
                                  <h3 data-toggle="tooltip" title="Cartão(debito)">Cartão(debito)</h3>
                                </td>
                              </tr>
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
                                  <h3 data-toggle="tooltip" title="Cartão(debito)">Cartão(debito)</h3>
                                </td>
                              </tr>
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
                                  <h3 data-toggle="tooltip" title="Cartão(debito)">Cartão(debito)</h3>
                                </td>
                              </tr>
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
                                  <h3 data-toggle="tooltip" title="Cartão(debito)">Cartão(debito)</h3>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </section>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div id='product-container'>
        <div id='product-inside'>
          <header id="prod-header">
            <h1>Produtos</h1>
            <p>Confira os produtos que mais venderam</p>
          </header>

          <main id='product-main'>
            <article id='prod-card'>
              <p id='text-prod-mes'>Produto do Mês</p>
              <div id='prod-main'>
                <div id='container-prod-img'>
                  <figure className='container-list-img'>
                    <img src="./img/picole.jpg" alt="picole_flocos" />
                  </figure>
                  <div id='prod-desc'>
                    <h1>Picolé sem cobertura</h1>
                    <p>Faturamento: <span>250K</span></p>
                    <p>Unidades vendidas: <span>51K</span></p>
                  </div>
                </div>
                <div id='card-prod-desc'>
                  <ProductDoughnut />
                </div>
              </div>
            </article>

            <section id='search-prod'>
              <div id='search-bar'>
                <input type="search" id="search-product" placeholder='Pesquisar produto' aria-label="Buscar" />
                <i id='search-icon'><IoSearch id='icon-prod' /></i>
              </div>
              <button id='add-product' onClick={toggleModalClose}>
                + Produto
              </button>
            </section>

            <p id='result-product'>Resultados (6)</p>
            <section id='products-list'>
              <article className='prod-card'>
                <figure className='container-list-img'>
                  <img src="./img/Picole_sem_cobertura.jpeg" alt="picole_sem_cobertura" />
                </figure>
                <p>Picolé sem cobertura</p>
                <p className='prod-name'>R$ 0.65</p>
                <button onClick={() => toggleInfoModal(produto)}>Ver produto</button>
              </article>

              <article className='prod-card'>
                <figure className='container-list-img'>
                  <img src="/img/Picole_com_cobertura.jpeg" alt="picole_com_cobertura" />
                </figure>
                <p>Picolé de cobertura</p>
                <p className='prod-name'>R$ 2.00</p>
                <button>Ver produto</button>
              </article>

              <article className='prod-card'>
                <figure className='container-list-img'>
                  <img src="/img/Acaí_200ml.jpeg" alt="_" />
                </figure>
                <p>Açaí de 200ml</p>
                <p className='prod-name'>R$ 6.00</p>
                <button>Ver produto</button>
              </article>

              <article className='prod-card'>
                <figure className='container-list-img'>
                  <img src="/img/Sorvete_1L.jpeg" alt="Sorvete 1L" />
                </figure>
                <p>Sorvete de 1L</p>
                <p className='prod-name'>R$ 12.00</p>
                <button>Ver produto</button>
              </article>

              <article className='prod-card'>
                <figure className='container-list-img'>
                  <img src="/img/Sorvete_1.5L.jpeg" alt="Sorvete 1.5L" />
                </figure>
                <p>Sorvete de 1.5L</p>
                <p className='prod-name'>R$ 15.00</p>
                <button>Ver produto</button>
              </article>

              <article className='prod-card'>
                <figure className='container-list-img'>
                  <img src="img/Sorvete_2L.jpeg" alt="Sorvete de 2L" />
                </figure>
                <p>Sorvete de 2L</p>
                <p className='prod-name'>R$ 18.00</p>
                <button>Ver produto</button>
              </article>

            </section>
          </main>
        </div>
      </div>
    </>
  );
}

export default Produtos;