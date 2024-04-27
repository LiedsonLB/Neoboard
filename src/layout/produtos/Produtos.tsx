import React, { useEffect, useState } from 'react';
import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";
import "./Produtos.css";
import { IoSearch, IoCamera, IoTrash, IoCreate } from 'react-icons/io5';
import ProductDoughnut from '../../components/charts/ProductDoughtnout';
import ProductColumnChart from '../../components/charts/ProductColumnChart.tsx';
import axios from 'axios';
// @ts-ignore
import { storage } from '../../services/firebase';

const Produtos = () => {
  const [showModal, setShowModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [filtroPesquisa, setFiltroPesquisa] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [valorFormatado, setValorFormatado] = useState<string>('');
  const [valorAcumulado, setValorAcumulado] = useState('');
  const [categorias, setCategorias] = useState<string[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [produtoParaEditar, setProdutoParaEditar] = useState<any>(null);

  const toggleModalClose = () => {
    setShowModal(!showModal);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    if (file) {
      setSelectedImage(file);
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToStorage = async (image: File): Promise<string> => {
    try {
      const storageRef = ref(storage, `products/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      const snapshot = await uploadTask;

      // Após o upload ser concluído, obtenha o URL de download da imagem
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      throw error;
    }
  };

  // Função para gerar um ID único
  const generateUniqueRandomId = (): number => {

    const existingIds = produtos.map((produto: any) => parseInt(produto.id, 10));

    const generateRandomId = (): number => Math.floor(Math.random() * 100000000);

    let randomId = generateRandomId();

    // Verifica se o ID gerado já existe na lista de IDs existentes
    while (existingIds.includes(randomId)) {
      randomId = generateRandomId();
    }

    return randomId;
  };

  const fetchProdutos = async () => {
    try {
      const response = await axios.get('http://localhost:4000/v2/produtos');
      setProdutos(response.data);
      console.log(response.data)
      const categoriasUnicas = new Set(response.data.map((produto: any) => produto.categoria));
      // Se tá rodando não mecha
      const categoriasUnicasArray: string[] = Array.from(categoriasUnicas);
      setCategorias(categoriasUnicasArray);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const handleDelete = (produto: any) => async () => {
    try {
      // Obtenha a URL da imagem associada ao produto
      const imagemURL = produto.picture;

      // Faz a requisição DELETE para a rota da API para excluir o produto
      await axios.delete(`http://localhost:4000/v2/produtos/${produto.id}`);
      console.log('Produto excluído com sucesso!');

      // Excluir a imagem do Storage
      if (imagemURL) {
        const imagemRef = ref(storage, `products/${imagemURL}`);
        await deleteObject(imagemRef);
        console.log('Imagem excluída do Storage com sucesso!');
      }

      // Atualiza a lista de produtos após a exclusão
      const updatedProdutos = produtos.filter(p => p.id !== produto.id);
      setProdutos(updatedProdutos);
      setFiltroPesquisa(''); // Limpar o filtro de pesquisa após a exclusão
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const adicionarProduto = async () => {
    try {
      const nomeElement = document.getElementById('name-item') as HTMLInputElement;
      const categoriaElement = document.getElementById('categoria-item') as HTMLInputElement;
      const valorElement = document.getElementById('valor-item') as HTMLInputElement;
      const descricaoElement = document.getElementById('descricao-item') as HTMLTextAreaElement;

      if (nomeElement && categoriaElement && valorElement && descricaoElement) {
        const nome = nomeElement.value;
        const categoria = categoriaElement.value;
        const valor = valorElement.value;
        const descricao = descricaoElement.value;

        if (nome && categoria && valor && descricao) {
          // Verifica se a imagem foi selecionada
          let picture = './img/no_productImg.jpeg';
          if (selectedImage) {
            // Faz o upload da imagem para o Firebase Storage
            const downloadURL = await uploadImageToStorage(selectedImage);
            // Define a URL da imagem obtida
            picture = downloadURL;
          }

          // Gera um ID aleatório para o novo produto
          const id = generateUniqueRandomId().toString();

          // Cria o novo produto com a URL da imagem obtida
          const novoProduto = {
            id,
            nome,
            categoria,
            preco: valor,
            descricao,
            picture,
          };

          console.log(novoProduto)

          nomeElement.value = '';
          categoriaElement.value = '';
          valorElement.value = '';
          descricaoElement.value = '';
          setSelectedImage(null);
          setShowModal(false);
          setValorAcumulado('');
          setValorFormatado('');

          await axios.post('http://localhost:4000/v2/produtos', novoProduto);
          fetchProdutos();
        }
      } else {
        console.error('Erro ao adicionar produto: Algum campo não foi preenchido.');
      }
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
    }
  };

  const produtosFiltrados = produtos.filter((produto: any) =>
    produto.nome.toLowerCase().includes(filtroPesquisa.toLowerCase()) &&
    (categoriaSelecionada ? produto.categoria === categoriaSelecionada : true)
  );

  const handleFiltroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltroPesquisa(e.target.value);
  };

  const handleShowInfoModal = (produto: any) => {
    setSelectedProduct(produto);
    setShowInfoModal(true);
  };

  const handleEdit = (produto: any) => {
    // Define os dados do produto selecionado para edição
    setProdutoParaEditar(produto);
    // Abre o modal de edição
    setShowEditModal(true);
  };

  const handleEditProduct = async () => {
    try {
      // Faça o envio dos novos dados do produto para a rota de edição
      await axios.put(`http://localhost:4000/v2/produtos/${produtoParaEditar.id}`, produtoParaEditar);
      fetchProdutos(); // Atualize a lista de produtos após a edição
      setShowEditModal(false); // Feche o modal de edição após a conclusão
    } catch (error) {
      console.error('Erro ao editar produto:', error);
    }
  };

  return (
    <>
      {showEditModal && (
        <div className="Modal-Add">
          <div className='container-Add'>
            <div id="header-modal">
              <h4 className="modal-title">Editar Produto: {produtoParaEditar.nome}</h4>
              <button type="button" className="close-btn" onClick={() => setShowEditModal(false)}>&times;</button>
            </div>

            <div className="Add-Item-container">

              <div className='input-item input-single'>
                <span>
                  <label htmlFor="name-item">Nome do Produto:</label>
                  <input type="text" id='name-item' name='name-item' className='full-item' value={produtoParaEditar.nome} onChange={(e) => setProdutoParaEditar({ ...produtoParaEditar, nome: e.target.value })} />
                </span>
              </div>

              <div className='input-item input-mult'>
                <span>
                  <label htmlFor="categoria-item">Categoria:</label>
                  <input type="text" id='categoria-item' name='categoria-item' className='full-item' value={produtoParaEditar.categoria} onChange={(e) => setProdutoParaEditar({ ...produtoParaEditar, categoria: e.target.value })} />
                </span>

                <span>
                  <label htmlFor="valor-item">Valor Unitário (R$):</label>
                  <input type="text" id='valor-item' name='valor-item' className='full-item' value={produtoParaEditar.preco} onChange={(e) => setProdutoParaEditar({ ...produtoParaEditar, preco: e.target.value })} />
                </span>
              </div>

              <div className='input-item input-single'>
                <span>
                  <label htmlFor="descricao-item">Descrição:</label>
                  <textarea
                    id='descricao-item'
                    name="descricao"
                    className="desc-prod"
                    value={produtoParaEditar.descricao}
                    onChange={(e) => setProdutoParaEditar({ ...produtoParaEditar, descricao: e.target.value })}
                  />
                </span>
              </div>

              <button id='edit-product-Btn' onClick={handleEditProduct}>Salvar Alterações</button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="Modal-Add">
          <div className='container-Add'>
            <div id="header-modal">
              <h4 className="modal-title">Adicionar Produto: </h4>
              <button type="button" className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
            </div>

            <div className="Add-Item-container">
              <div className='img-prod-up'>
                <div className='img-input-container'>
                  <input type="file" id='img-input' onChange={handleImageChange} />
                  {selectedImage ? (
                    <img src={URL.createObjectURL(selectedImage)} className='img-region-add' alt="Selected Region" />
                  ) : (
                    <img src="./img/no_productImg.jpeg" className='img-prod-add' alt="Default Region" />
                  )}
                  <div className='icon-text-cam'>
                    <i className='icon-cam'><IoCamera /></i>
                    <p>Adicionar foto</p>
                  </div>
                </div>
              </div>
              <div className='input-item input-single'>
                <span>
                  <label htmlFor="name-item">Nome do Produto:</label>
                  <input type="text" id='name-item' name='name-item' className='full-item' />
                </span>
              </div>

              <div className='input-item input-mult'>
                <span>
                  <label htmlFor="categoria-item">Categoria:</label>
                  <input type="text" id='categoria-item' name='categoria-item' className='full-item' />
                </span>

                <span>
                  <label htmlFor="valor-item">Valor Unitário (R$):</label>
                  <input type="text" id='valor-item' name='valor-item' className='full-item' />
                </span>
              </div>

              <div className='input-item input-single'>
                <span>
                  <label htmlFor="descricao-item">Descrição:</label>
                  <textarea
                    id='descricao-item'
                    name="descricao"
                    className="desc-prod"
                  />
                </span>
              </div>

              <button id='add-staff-Btn' onClick={() => { adicionarProduto(); setShowModal(false) }}>Enviar</button>
            </div>
          </div>
        </div>
      )}

      {showInfoModal && (
        <div className="Modal-Add">
          <div className="container-Detail-Product">

            <div id="header-modal">
              <h4 className="modal-title">Informações do Produto</h4>
              <button type="button" className="close-btn" onClick={() => setShowInfoModal(false)}>&times;</button>
            </div>

            <div id='Product-Info-Container'>
              <div id='infoprod-popup'>
                <div id='prodInfo-popup'>
                  <img src={selectedProduct.picture} alt="product-avatar" />
                  <h2 className='nameUserProd'>{selectedProduct.nome}</h2>
                  <div id="ProdTextInfo">
                    <p><span>Categoria:</span> {selectedProduct.categoria}</p>
                    <p><span>Valor:</span> R$ {selectedProduct.preco}</p>
                    <p><span>Descrição:</span> {selectedProduct.descricao}</p>
                    <div className='userStfSocialMidia' style={{gap: '2rem'}}>
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
      )}

      <div id='product-container'>
        <div id='product-inside'>
          <header id="prod-header">
            <h1>Produtos</h1>
            <p>Confira os produtos que mais venderam</p>
          </header>

          <main id='product-main'>
            <article id='product-card'>
              <p id='text-prod-mes'>Produto do Mês</p>
              <div id='prod-main'>
                <div id='container-prod-img'>
                  <figure className='container-list-img'>
                    <img src="/img/Sorvete_1L.jpeg" alt="picole_flocos" />
                  </figure>
                  <div id='prod-desc'>
                    <h1>Sorvete de 1L</h1>
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
                <input type="search" id="search-product" placeholder='Pesquisar produto' aria-label="Buscar" onChange={handleFiltroChange} />
                <i id='search-icon'><IoSearch id='icon-prod' /></i>
              </div>

              <div className='filter-container-btns'>
                <select id="filter-expense" value={categoriaSelecionada} onChange={(e) => setCategoriaSelecionada(e.target.value)}>
                  <option value="">Todos</option>
                  {categorias.map((categoria, index) => (
                    <option key={index} value={categoria}>{categoria}</option>
                  ))}
                </select>

                <button id='add-product' onClick={toggleModalClose}>
                  + Produto
                </button>
              </div>
            </section>

            <p id='result-product'>Resultados ({produtosFiltrados.length})</p>
            <section id='products-list'>

              {produtosFiltrados.map((produto: any) => (
                <article key={produto.id} className='prod-card'>
                  <figure className='container-list-img'>
                    <img src={produto.picture} alt={produto.nome} />
                  </figure>
                  <p>{produto.nome}</p>
                  <p className='prod-name'>R$ {produto.preco}</p>
                  <button className='see-prod-btn' onClick={() => { setShowInfoModal(true); setSelectedProduct(produto) }}>Ver produto</button>
                  <div className='manager-btn'>
                    <div>
                      <button className='edit-item item-mng' onClick={() => handleEdit(produto)}><IoCreate id='edit-pen' /></button>
                    </div>
                    <div>
                      <button className='delete-item item-mng' onClick={handleDelete(produto)}><IoTrash id='edit-trash' /></button>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          </main>
        </div>
      </div >
    </>
  );
}

export default Produtos;