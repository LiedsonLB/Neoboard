import React, { useEffect, useState } from 'react';
import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";
import "./Produtos.css";
import { IoSearch, IoCamera, IoTrash, IoCreate } from 'react-icons/io5';
import ProductDoughnut from '../../components/charts/ProductDoughtnout';
import axios from 'axios';
// @ts-ignore
import { storage } from '../../services/firebase';
import Popup from '../../components/popup/Popup.tsx';
import { useNavigate } from 'react-router-dom';
import Produto from '../../models/Produto.tsx';

const Produtos = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [filtroPesquisa, setFiltroPesquisa] = useState('');
  const [categorias, setCategorias] = useState<string[]>([]);
  const [editandoProduto, setEditandoProduto] = useState<Produto | null>(null);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [popupType, setPopupType] = useState('');
  const [popupTitle, setPopupTitle] = useState('');
  const navigate = useNavigate();

  const hidePopupAfterTimeout = () => {
    setTimeout(() => {
      setMensagem('');
    }, 4500);
  };

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

  // Função para adicionar um produto
  const adicionarProduto = async () => {
    try {
      // Obter os elementos dos campos do formulário
      const nomeElement = document.getElementById('name-item') as HTMLInputElement;
      const categoriaElement = document.getElementById('categoria-item') as HTMLInputElement;
      const valorElement = document.getElementById('valor-item') as HTMLInputElement;
      const descricaoElement = document.getElementById('descricao-item') as HTMLTextAreaElement;

      // Verificar se os campos de nome e preço estão preenchidos
      if (nomeElement && valorElement && nomeElement.value && valorElement.value) {
        // Obter os valores dos campos
        const nome = nomeElement.value;
        const valor = valorElement.value;
        // Definir valores padrão para descrição e categoria caso não sejam preenchidos
        const descricao = descricaoElement.value || 'sem descrição';
        const categoria = categoriaElement.value || 'sem categoria';

        // Verificar se uma imagem foi selecionada
        let picture = './img/no_productImg.jpeg';
        if (selectedImage) {
          // Fazer upload da imagem para o Firebase Storage
          const downloadURL = await uploadImageToStorage(selectedImage);
          // Definir a URL da imagem obtida
          picture = downloadURL;
        }

        // Criar o novo produto
        const novoProduto: Produto = {
          nome,
          categoria,
          precoAtual: parseFloat(valor),
          descricao,
          picture,
          NameImg: selectedImage ? selectedImage.name : '',
          usuarioId: 1,
        };

        // Enviar a requisição para adicionar o novo produto
        await axios.post('http://localhost:4000/v3/produtos', novoProduto);

        // Limpar os campos do formulário e redefinir o estado do modal
        nomeElement.value = '';
        valorElement.value = '';
        descricaoElement.value = '';
        setSelectedImage(null);

        // Atualizar a lista de produtos após adição
        fetchProdutos();

        // Exibir uma mensagem de sucesso
        setPopupType('success');
        setPopupTitle('Produto adicionado');
        setMensagem('Sucesso ao adicionar o produto');
        hidePopupAfterTimeout();
      } else {
        console.error('Erro ao adicionar produto: Nome e Preço são campos obrigatórios.');
        setPopupType('warning');
        setPopupTitle('Erro');
        setMensagem('Nome e Preço são campos obrigatórios');
        hidePopupAfterTimeout();
      }
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      setPopupType('warning');
      setPopupTitle('Erro ao adicionar o produto');
      setMensagem('Ocorreu um erro ao adicionar o produto. Por favor, tente novamente.');
      hidePopupAfterTimeout();
    }
  };

  const handleDelete = (produto: Produto) => async () => {
    try {
      // Obtenha a URL da imagem associada ao produto
      const imagemURL = produto.NameImg;

      // Excluir a imagem do Storage
      if (imagemURL) {
        const imagemRef = ref(storage, `products/${imagemURL}`);
        await deleteObject(imagemRef);
      }

      // Faz a requisição DELETE para a rota da API para excluir o produto
      await axios.delete(`http://localhost:4000/v3/produtos/${produto.id}`);

      // Atualiza a lista de produtos após a exclusão
      fetchProdutos();

      // Exibir uma mensagem de sucesso
      setPopupType('success');
      setPopupTitle('Produto Excluído');
      setMensagem('Sucesso ao excluir o produto');
      hidePopupAfterTimeout();
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      setPopupType('warning');
      setPopupTitle('Erro');
      setMensagem('Erro ao excluir o produto');
      hidePopupAfterTimeout();
    }
  };

  const fetchProdutos = async () => {
    try {
      const response = await axios.get('http://localhost:4000/v3/produtos');
      setProdutos(response.data);
      const categoriasUnicas = new Set(response.data.map((produto: Produto) => produto.categoria));
      // se esta rodando não mexa
      const categoriasUnicasArray: string[] = Array.from(categoriasUnicas);
      setCategorias(categoriasUnicasArray);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      setPopupType('warning');
      setPopupTitle('Erro');
      setMensagem('Erro ao procurar produtos');
      hidePopupAfterTimeout();
    }
  };

  const handleFiltroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltroPesquisa(e.target.value);
  };

  const handleEdit = (produto: Produto) => {
    abrirModalEdicao(produto)
  };

  const uploadImageToStorage = async (image: File): Promise<string> => {
    try {
      const storageRef = ref(storage, `products/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      const snapshot = await uploadTask;
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const produtosFiltrados = produtos.filter((produto: Produto) =>
    produto.nome.toLowerCase().includes(filtroPesquisa.toLowerCase()) &&
    (categoriaSelecionada ? produto.categoria === categoriaSelecionada : true)
  );

  const abrirModalEdicao = (produto: Produto) => {
    if (produto) {
      setEditandoProduto(produto);
      setModalEditOpen(true);
    }
  };

  const fecharModalEdicao = () => {
    setEditandoProduto(null);
    setModalEditOpen(false);
  };

  const atualizarProduto = async (produtoEditado: Produto) => {
    try {
      // Obtenha os dados do produto existente
      const produtoExistente = await axios.get(`http://localhost:4000/v3/produtos/${produtoEditado.id}`);

      // Faça o envio dos novos dados do produto para a rota de edição
      await axios.put(`http://localhost:4000/v3/produtos/${produtoEditado.id}`, {
        ...produtoEditado,
        produtoExistente: produtoExistente.data // Envie o objeto produtoExistente junto com os novos dados
      });
      // Feche o modal de edição após a conclusão
      fecharModalEdicao();

      // Atualize a lista de produtos após a edição
      fetchProdutos();

      // Exibir uma mensagem de sucesso
      setPopupType('sucess');
      setPopupTitle('Produto editado');
      setMensagem('Sucesso ao editar o produto');
      hidePopupAfterTimeout();
    } catch (error) {
      console.error('Erro ao editar produto:', error);
      setPopupType('warning');
      setPopupTitle('Erro');
      setMensagem('Erro ao editar o produto');
      hidePopupAfterTimeout();
    }
  };

  return (
    <>
      {mensagem && <Popup type={popupType} title={popupTitle} text={mensagem} />}
      {modalEditOpen && editandoProduto && (
        <div className="Modal-Add">
          <div className='container-Add'>
            <div id="header-modal">
              <h4 className="modal-title">Editar Produto: {editandoProduto?.nome}</h4>
              <button type="button" className="close-btn" onClick={fecharModalEdicao}>&times;</button>
            </div>

            <div className="Add-Item-container">
              <div className='input-item input-single'>
                <span>
                  <label htmlFor="name-item">Nome do Produto:</label>
                  <input type="text" id='name-item' name='name-item' className='full-item' value={editandoProduto.nome} onChange={(e) => setEditandoProduto({ ...editandoProduto, nome: e.target.value })} />
                </span>
              </div>

              <div className='input-item input-mult'>
                <span>
                  <label htmlFor="categoria-item">Categoria:</label>
                  <input type="text" id='categoria-item' name='categoria-item' className='full-item' value={editandoProduto.categoria} onChange={(e) => setEditandoProduto({ ...editandoProduto, categoria: e.target.value })} />
                </span>

                <span>
                  <label htmlFor="valor-item">Valor Unitário (R$):</label>
                  <input type="text" id='valor-item' name='valor-item' className='full-item' value={editandoProduto.precoAtual} onChange={(e) => setEditandoProduto({ ...editandoProduto, precoAtual: parseFloat(e.target.value) || 0 })} />
                </span>
              </div>

              <div className='input-item input-single'>
                <span>
                  <label htmlFor="descricao-item">Descrição:</label>
                  <textarea
                    id='descricao-item'
                    name="descricao"
                    className="desc-prod"
                    value={editandoProduto.descricao}
                    onChange={(e) => setEditandoProduto({ ...editandoProduto, descricao: e.target.value })}
                  />
                </span>
              </div>

              <button id='edit-product-Btn' onClick={() => atualizarProduto(editandoProduto)}>Salvar Alterações</button>
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

              {produtosFiltrados.map((produto: Produto) => (
                <article key={produto.id} className='prod-card'>
                  <figure className='container-list-img'>
                    <img src={produto.picture} alt={produto.nome} />
                  </figure>
                  <p className='name-product'>{produto.nome}</p>
                  <p className='prod-name'>R$ {produto.precoAtual}</p>
                  <button className='see-prod-btn' onClick={() => navigate(`/product/${produto.id}`, { state: { user: produto } })}>Ver produto</button>
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