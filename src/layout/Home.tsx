import React from "react";
import "../layout/Home.css";

const Home = ({ user }) => {
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
                <h2>
                  Olá, <span id="user-name">{user?.displayName}</span>
                </h2>
              </div>
              <div id="msgs-card">
                <div id="msg-wlcm">
                  <p>Bem-vindo(a)! Tenha um excelente dia!</p>
                </div>
                <div id="msg-descrip">
                  <p>
                    Fique por dentro dos dados e estatísticas de sua empresa
                  </p>
                </div>
              </div>
              <div id="new-btn">
                <button className="btn-nov">
                  <strong>Novidades</strong>
                </button>
              </div>
            </div>
            <div id="present-img">
              <img src="img/homeImg.png" alt="present-img" />
            </div>
          </div>
        </div>

        <div id="periods">
          <button className="sem-btn">Semanal</button>
          <button className="men-btn">Mensal</button>
          <button className="Anual-btn">Anual</button>
        </div>

        <div id="cards-finance">
          <div className="card-des">
            <div className="card-obj">
              <div className="user-men">
                <img src="img/no_profile.png" alt="profile" />
              </div>
              <div className="men-info">
                <p>Faturamento Mensal</p>
                <h1>R$ 230K</h1>
                <span className="icon red"> 12.06% </span>
              </div>
            </div>
          </div>

          <div className="card-des">
            <div className="card-obj">
              <div className="user-men">
                <img src="img/no_profile.png" alt="profile" />
              </div>
              <div className="men-info">
                <p>Despesa Mensal</p>
                <h1>R$ 150K</h1>
                <span className="icon green"> 16.00% </span>
              </div>
            </div>
          </div>

          <div className="card-des">
            <div className="card-obj">
              <div className="user-men">
                <img src="img/no_profile.png" alt="profile" />
              </div>
              <div className="men-info">
                <p>Lucro Mensal</p>
                <h1>R$ 54K</h1>
                <span className="icon red">25.06% </span>
              </div>
            </div>
          </div>
        </div>

        <div id="collect-charts">
          <span>
            <h3>Arrecadação Mensal:</h3>
          </span>
          <div id="charts-main">
            <div id="column-chart"></div>
            <div id="pie-chart"></div>
          </div>
        </div>
      </div>

      <section id="ranking-container">
        <h1>Ranking Mensal</h1>
        <div id="ranking-types">
          <div className="ranking">
            <p className="ranking-title">Produtos Vendidos</p>
            <ul>
              <li>
                <img
                  className="img-product"
                  src="img/product.png"
                  alt="product"
                />
                <div className="product-name">
                  <p>Picolé de Flocos: 50%</p>
                  <div className="scale-container">
                    <div className="product-scale">
                      <div className="scale"></div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <img
                  className="img-product"
                  src="img/product.png"
                  alt="product"
                />
                <div className="product-name">
                  <p>Picolé de Flocos: 20%</p>
                  <div className="product-scale">
                    <div className="scale"></div>
                  </div>
                </div>
              </li>
              <li>
                <img
                  className="img-product"
                  src="img/product.png"
                  alt="product"
                />
                <div className="product-name">
                  <p>Picolé de Flocos: 80%</p>
                  <div className="product-scale">
                    <div className="scale"></div>
                  </div>
                </div>
              </li>
              <li>
                <img
                  className="img-product"
                  src="img/product.png"
                  alt="product"
                />
                <div className="product-name">
                  <p>Picolé de Flocos: 90%</p>
                  <div className="product-scale">
                    <div className="scale"></div>
                  </div>
                </div>
              </li>
              <li>
                <img
                  className="img-product"
                  src="img/product.png"
                  alt="product"
                />
                <div className="product-name">
                  <p>Picolé de Flocos: 10%</p>
                  <div className="product-scale">
                    <div className="scale"></div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="ranking">
            <p className="ranking-title">Arrecadação Regional</p>
            <ul>
              <li>
                <img
                  className="img-product"
                  src="img/product.png"
                  alt="product"
                />
                <div className="product-name">
                  <p>Picolé de Flocos: 50%</p>
                  <div className="scale-container">
                    <div className="product-scale">
                      <div className="scale"></div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <img
                  className="img-product"
                  src="img/product.png"
                  alt="product"
                />
                <div className="product-name">
                  <p>Picolé de Flocos: 50%</p>
                  <div className="product-scale">
                    <div className="scale"></div>
                  </div>
                </div>
              </li>
              <li>
                <img
                  className="img-product"
                  src="img/product.png"
                  alt="product"
                />
                <div className="product-name">
                  <p>Picolé de Flocos: 50%</p>
                  <div className="product-scale">
                    <div className="scale"></div>
                  </div>
                </div>
              </li>
              <li>
                <img
                  className="img-product"
                  src="img/product.png"
                  alt="product"
                />
                <div className="product-name">
                  <p>Picolé de Flocos: 50%</p>
                  <div className="product-scale">
                    <div className="scale"></div>
                  </div>
                </div>
              </li>
              <li>
                <img
                  className="img-product"
                  src="img/product.png"
                  alt="product"
                />
                <div className="product-name">
                  <p>Picolé de Flocos: 50%</p>
                  <div className="product-scale">
                    <div className="scale"></div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="ranking">
            <p className="ranking-title">Funcionários</p>
            <ul>
              <li>
                <img
                  className="img-product"
                  src="img/product.png"
                  alt="product"
                />
                <div className="product-name">
                  <p>Picolé de Flocos: 50%</p>
                  <div className="scale-container">
                    <div className="product-scale">
                      <div className="scale"></div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <img
                  className="img-product"
                  src="img/product.png"
                  alt="product"
                />
                <div className="product-name">
                  <p>Picolé de Flocos: 50%</p>
                  <div className="product-scale">
                    <div className="scale"></div>
                  </div>
                </div>
              </li>
              <li>
                <img
                  className="img-product"
                  src="img/product.png"
                  alt="product"
                />
                <div className="product-name">
                  <p>Picolé de Flocos: 50%</p>
                  <div className="product-scale">
                    <div className="scale"></div>
                  </div>
                </div>
              </li>
              <li>
                <img
                  className="img-product"
                  src="img/product.png"
                  alt="product"
                />
                <div className="product-name">
                  <p>Picolé de Flocos: 50%</p>
                  <div className="product-scale">
                    <div className="scale"></div>
                  </div>
                </div>
              </li>
              <li>
                <img
                  className="img-product"
                  src="img/product.png"
                  alt="product"
                />
                <div className="product-name">
                  <p>Picolé de Flocos: 50%</p>
                  <div className="product-scale">
                    <div className="scale"></div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="payments">
        <h1>Formas de pagamento</h1>
        <div id="payments-forms">
          <ul>
            <li>
              <div className="pay-type">
                <h4>Dinheiro</h4>
              </div>
            </li>

            <li>
              <div className="pay-type">
                <h4>Pix</h4>
              </div>
            </li>

            <li>
              <div className="pay-type">
                <h4>Cartão (Crédito)</h4>
              </div>
            </li>

            <li>
              <div className="pay-type">
                <h4>Cartão (Débito)</h4>
              </div>
            </li>

            <li>
              <div className="pay-type">
                <h4>Boleto</h4>
              </div>
            </li>

            <li>
              <div className="pay-type">
                <h4>Cheque</h4>
              </div>
            </li>

            <li>
              <div className="pay-type">
                <h4>Transferência</h4>
              </div>
            </li>

            <li>
              <div className="pay-type">
                <h4>Em Dívida</h4>
              </div>
            </li>
          </ul>
          <div id="payments-chart"></div>
        </div>
      </section>
    </main>
  );
};

export default Home;
