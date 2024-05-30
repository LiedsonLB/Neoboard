import React, { useState, useEffect } from 'react';
import "./Regioes.css";
import { IoSearch, IoCamera } from 'react-icons/io5';
import { FaCheckSquare, FaPen, FaTrash } from "react-icons/fa";
import RegionDoughnout from '../../components/charts/RegionDoughnout.tsx';
import RegionColumnChart from '../../components/charts/RegionColumnChart.tsx';
import axios from 'axios';


import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";
// @ts-ignore
import { storage } from '../../services/firebase';
import Popup from '../../components/popup/Popup.tsx';
import Regiao from '../../models/Regiao.tsx';
import Loading from '../../components/loading/Loading.tsx';

const Regioes = () => {
  const [showModal, setShowModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [regioes, setRegioes] = useState<Regiao[]>([]);
  const [filtroPesquisa, setFiltroPesquisa] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<any>(null);
  const [categorias, setCategorias] = useState<string[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [regiaoParaEditar, setRegiaoParaEditar] = useState<any>({});
  const [regiaoParaAdicionar, setRegiaoParaAdicionar] = useState<any>({});
  const [regiaoDelete, setRegiaoDelete] = useState<Regiao>();
  const [regiaoMaisVendido, setRegiaoMaisVendido] = useState<Regiao>();

  //popup
  const [mensagem, setMensagem] = useState('');
  const [popupType, setPopupType] = useState('');
  const [popupTitle, setPopupTitle] = useState('');

  const userId = localStorage.getItem('userID');
  const [loadingRegioes, setLoadingRegioes] = useState(true);

  const toggleModalClose = () => {
    setShowModal(!showModal);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setSelectedImage(file);

      // Verifica se o tipo de arquivo é uma imagem
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.onload = () => {
          // Atualiza a URL da imagem para ser exibida no componente
          setSelectedImageUrl(reader.result as string);
        };

        reader.readAsDataURL(file);
      } else {
        // Se o tipo de arquivo não for uma imagem, exibe uma mensagem de erro
        console.error('O arquivo selecionado não é uma imagem.');
      }
    }
  };

  const uploadImageToStorage = async (image: File): Promise<string> => {
    try {
      const storageRef = ref(storage, `regions/${image.name}`);
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

  const fetchRegioes = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/v3/regioes?userId=${localStorage.getItem('userID')}`);
      setRegioes(response.data);

      console.log("loop infinito em regiões");

      const categoriasUnicas = new Set(response.data.map((regiao: any) => regiao.cidade));
      const categoriasUnicasArray: string[] = Array.from(categoriasUnicas);
      setCategorias(categoriasUnicasArray);

      // Atualiza o estado do produto mais vendido
      const regiaoMaisVendido = encontrarRegiaoMaisVendido(response.data);
      setRegiaoMaisVendido(regiaoMaisVendido);

    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    } finally {
      setLoadingRegioes(false); // Indicando que os produtos terminaram de ser carregados
    }
  };


  // Função para encontrar o produto mais vendido
  const encontrarRegiaoMaisVendido = (regioes: Regiao[]) => {
    let regiaoMaisVendido = regioes[0];

    // Percorre todas as regiões para encontrar o produto com mais vendas
    regioes.forEach(regiao => {
      if (regiao.numVendas > regiaoMaisVendido.numVendas) {
        regiaoMaisVendido = regiao;
      }
    });

    return regiaoMaisVendido; // Retorna o produto mais vendido encontrado
  };

  useEffect(() => {
    fetchRegioes();
  }, [localStorage.getItem('userID')]);

  const hidePopupAfterTimeout = () => {
    setTimeout(() => {
      setMensagem('');
    }, 4500);
  };

  const adicionarRegiao = async () => {
    try {
      // Verificar se uma imagem foi selecionada
      let picture = '/img/no_regionImg.jpeg';

      if (selectedImage) {
        // Fazer upload da imagem para o Firebase Storage
        const downloadURL = await uploadImageToStorage(selectedImage);
        // Definir a URL da imagem obtida
        picture = downloadURL;
      }

      // Envie os dados da nova região para a rota de adição na API
      await axios.post('http://localhost:4000/v3/regioes', {
        ...regiaoParaAdicionar,
        picture: picture, // Adiciona a URL da imagem aos dados da região
        nameImg: selectedImage ? selectedImage.name : '',
        faturamento: 0,
        numVendas: 0,
        usuarioId: userId,
        clientes: 0,
        endereco: regiaoParaAdicionar.endereco  || 'Não informado',
        descricao: regiaoParaAdicionar.descricao  || 'Não informado',
        responsavel: regiaoParaAdicionar.responsavel  || 'Não informado',
        cidade: regiaoParaAdicionar.cidade  || 'Não informado',
      });

      // Exibir uma mensagem de sucesso
      setPopupType('sucess');
      setPopupTitle('Produto adicionado');
      setMensagem('Sucesso ao adicionar o produto');
      hidePopupAfterTimeout();

      fetchRegioes(); // Atualize a lista de regiões após a adição
      // Limpe os campos do formulário após adicionar com sucesso
      setRegiaoParaAdicionar({
        picture,
        nome: '',
        cidade: '',
        endereco: '',
        responsavel: '',
        descricao: ''
      });

      setSelectedImage(null);

    } catch (error) {
      console.error('Erro ao adicionar região:', error);
    }
  };

  const handleEditRegion = async () => {
    try {
      // Faz o envio dos dados editados da região para a rota de PUT
      console.log(regiaoParaEditar)
      await axios.put(`http://localhost:4000/v3/regioes/${regiaoParaEditar.id}`, regiaoParaEditar);
      fetchRegioes();
      setShowEditModal(false);
    } catch (error) {
      console.error('Erro ao editar região:', error);
    }
  };

  const handleDelete = (regiao: any) => async () => {
    try {
      // Faz a requisição DELETE para a rota da API para excluir o regiao
      await axios.delete(`http://localhost:4000/v3/regioes/${regiao.id}`);
      console.log('regiao excluído com sucesso!');
      //fecha o modal
      setShowDeleteModal(!showDeleteModal);
      // Atualiza a lista de regiaos após a exclusão
      const updatedregiaos = regioes.filter(r => r.id !== regiao.id);
      setRegioes(updatedregiaos);
      setFiltroPesquisa(''); // Limpar o filtro de pesquisa após a exclusão
    } catch (error) {
      console.error('Erro ao excluir regiao:', error);
    }
  };

  const handleFiltroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltroPesquisa(e.target.value);
  };

  const handleShowInfoModal = (regiao: any) => {
    setSelectedRegion(regiao);
    setShowInfoModal(true);
  };

  const openDeleteModal = (regiao: Regiao) => {
    setRegiaoDelete(regiao);
    toggleModalDelete();
  };

  const toggleModalDelete = () => {
    setShowDeleteModal(!showDeleteModal);
    if (regiaoDelete) {
      setRegiaoDelete(regiaoDelete);
    }
  };

  const handleEdit = (regiao: any) => {
    // Define os dados do regiao selecionado para edição
    console.log(regiao);
    setRegiaoParaEditar((prevRegiaoParaEditar: any) => ({ ...prevRegiaoParaEditar, ...regiao }));
    // Abre o modal de edição
    setShowEditModal(true);
  };

  if (loadingRegioes) return <Loading />;

  return (
    <>
      {mensagem && <Popup type={popupType} title={popupTitle} text={mensagem} />}
      {showEditModal && (
        <div className="Modal-Add">
          <div className='container-Add'>
            <div id="header-modal">
              <h4 className="modal-title">Editar Região: {regiaoParaEditar.nome}</h4>
              <button type="button" className="close-btn" onClick={() => setShowEditModal(false)}>&times;</button>
            </div>

            <div className="Add-Item-container">
              <div className='input-item input-mult'>
                <span>
                  <label htmlFor="name-item">Nome da Região:</label>
                  <input type="text" name='name-item' className='full-item'
                    value={regiaoParaEditar.nome}
                    onChange={(e) => setRegiaoParaEditar({ ...regiaoParaEditar, nome: e.target.value })} />
                </span>
                <span>
                  <label htmlFor="name-item">Cidade:</label>
                  <input type="text" name='name-item' className='full-item'
                    value={regiaoParaEditar.cidade}
                    onChange={(e) => { setRegiaoParaEditar({ ...regiaoParaEditar, cidade: e.target.value }); console.log(regiaoParaEditar) }} />
                </span>
              </div>

              <div className='input-item input-single'>
                <span>
                  <label htmlFor="name-item">Endereço:</label>
                  <input type="text" name='name-item' className='full-item'
                    value={regiaoParaEditar.endereco}
                    onChange={(e) => setRegiaoParaEditar({ ...regiaoParaEditar, endereco: e.target.value })} />
                </span>
              </div>

              <div className='input-item input-single'>
                <span>
                  <label htmlFor="name-item">Vendedor Responsável:</label>
                  <input type="text" name='name-item' className='full-item'
                    value={regiaoParaEditar.responsavel}
                    onChange={(e) => setRegiaoParaEditar({ ...regiaoParaEditar, responsavel: e.target.value })} />
                </span>
              </div>

              <div className='input-item input-single'>
                <span>
                  <label htmlFor="name-item">Descrição:</label>
                  <textarea
                    name="message"
                    className="desc-prod"
                    value={regiaoParaEditar.descricao}
                    onChange={(e) => setRegiaoParaEditar({ ...regiaoParaEditar, descricao: e.target.value })}
                  />
                </span>
              </div>

              <button id='edit-Region-Btn' onClick={() => handleEditRegion()}>Salvar Alterações</button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className='Modal-Add'>
          <div className='container-Add'>
            <div id="header-modal">
              <h4 className="modal-title">Adicionar Região</h4>
              <button type="button" className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
            </div>

            <div className='img-region-up'>
              <div className='img-input-container'>
                <input type="file" id='img-input' onChange={handleImageChange} />
                {selectedImage ? (
                  <img src={URL.createObjectURL(selectedImage)} className='img-region-add' alt="Selected Region" />
                ) : (
                  <img src="./img/no_regionImg.jpeg" className='img-region-add' alt="Default Region" />
                )}
                <div className='icon-text-cam'>
                  <i className='icon-cam'><IoCamera /></i>
                  <p>Adicionar foto</p>
                </div>
              </div>
            </div>

            <div className="Add-Item-container">
              <div className='input-item input-mult'>
                <span>
                  <label htmlFor="name-item">Nome da Região:</label>
                  <input type="text" name='name-item' className='full-item' value={regiaoParaAdicionar.nome} onChange={(e) => setRegiaoParaAdicionar({ ...regiaoParaAdicionar, nome: e.target.value })} />
                </span>
                <span>
                  <label htmlFor="name-item">Cidade:</label>
                  <input type="text" name='name-item' className='full-item' value={regiaoParaAdicionar.cidade} onChange={(e) => setRegiaoParaAdicionar({ ...regiaoParaAdicionar, cidade: e.target.value })} />
                </span>
              </div>

              <div className='input-item input-single'>
                <span>
                  <label htmlFor="name-item">Endereço:</label>
                  <input type="text" name='name-item' className='full-item' value={regiaoParaAdicionar.endereco} onChange={(e) => setRegiaoParaAdicionar({ ...regiaoParaAdicionar, endereco: e.target.value })} />
                </span>
              </div>

              <div className='input-item input-single'>
                <span>
                  <label htmlFor="name-item">Vendedor Responsável:</label>
                  <input type="text" name='name-item' className='full-item' value={regiaoParaAdicionar.responsavel} onChange={(e) => setRegiaoParaAdicionar({ ...regiaoParaAdicionar, responsavel: e.target.value })} />
                </span>
              </div>

              <div className='input-item input-single'>
                <span>
                  <label htmlFor="name-item">Descrição:</label>
                  <textarea
                    name="message"
                    className="desc-prod"
                    value={regiaoParaAdicionar.descricao}
                    onChange={(e) => setRegiaoParaAdicionar({ ...regiaoParaAdicionar, descricao: e.target.value })}
                  />
                </span>
              </div>

              <button id='add-Region-Btn' onClick={() => { adicionarRegiao(); setShowModal(false); }}>
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}

      {showInfoModal && (
        <div className="Modal-Add">
          <div className="container-Detail-Product">
            <div id="header-modal">
              <h4 className="modal-title">Informações da Região</h4>
              <button type="button" className="close-btn" onClick={() => setShowInfoModal(false)}>&times;</button>
            </div>

            <div id='Product-Info-Container'>
              <div id='infoprod-popup'>
                <div id='prodInfo-popup'>
                  <img src={selectedRegion.picture} alt="region-avatar" />
                  <h2 className='nameUserProd'> {selectedRegion.nome}</h2>
                  <div id="ProdTextInfo">
                    <p><span>Endereço:</span> {selectedRegion.endereco}</p>
                    <p><span>Cidade:</span> {selectedRegion.cidade}</p>
                    <p><span>Total de clientes:</span> {selectedRegion.clientes}</p>
                    <p><span>Descrição:</span> {selectedRegion.descricao}</p>
                  </div>
                </div>
              </div>

              <div id='infoprod-charts'>
                <div id='container-ProductColumnChart'>
                  <RegionColumnChart />
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
                          <h3 data-toggle="tooltip" title="Cartão(debito)">Cartão(debito)</h3>
                        </td>
                      </tr>

                    </tbody>
                  </table>
                </section>
              </div>

            </div>
          </div>
        </div>
      )}

      {showDeleteModal && <div className='modal-logout'>
        {regioes.map((regiao) => (
          <div className='container-logout'>
            <div className="header-logout">
              <button type="button" className="close-btn" onClick={toggleModalDelete}>&times;</button>
            </div>

            <h2 className='txt-logout'>Você tem certeza que quer excluir esta região?</h2>

            <hr className='modal-line' style={{ width: '80%', height: '3px', background: '#000', color: '#000' }} />

            <div className='options-logout'>
              <button className="logout-yes" onClick={handleDelete(regiaoDelete)}>Sim</button>
              <button className="logout-no" onClick={toggleModalDelete}>Não</button>
            </div>
          </div>
        ))}
      </div>}


      <div id='region-container'>
        <div id='region-inside'>
          <header id="region-header">
            <h1>Regiões</h1>
            <p>Confira as regiões que mais venderam</p>
          </header>

          <main id='region-main'>
            <article id='region-card'>
              {regiaoMaisVendido ? (
                <>
                  <p id='text-region-mes'>Região do Mês</p>
                  <div id='reg-main'>
                    <div id='container-region-img'>
                      <figure className='city-img'>
                        <img src={regiaoMaisVendido.picture} alt="piripiri" />
                      </figure>
                      <div id='region-desc'>
                        <h1>{regiaoMaisVendido.nome}</h1>
                        <p>Faturamento: <span>{regiaoMaisVendido.faturamento}</span></p>
                        <p>Vendas: <span>{regiaoMaisVendido.numVendas}</span></p>
                      </div>
                    </div>

                    <div id='region-chart'>
                      <RegionDoughnout />
                    </div>
                  </div>
                </>
              ) : (
                <p id='text-region-mes'>Nenhuma região disponível</p>
              )}
            </article>

            <section id='search-container-region'>
              <div id='search-bar-region'>
                <input type="search" id="search-region" placeholder='Pesquisar região' aria-label="Buscar" onChange={handleFiltroChange} />
                <i id='search-icon-region'><IoSearch id='icon-region' /></i>
              </div>

              <div className='filter-container-btns'>
                <select id="filter-expense" value={categoriaSelecionada} onChange={(e) => setCategoriaSelecionada(e.target.value)}>
                  <option value="">Todos</option>
                  <optgroup label='Filtar por cidade:'>
                    {categorias.map((categoria, index) => (
                      <option key={index} value={categoria}>{categoria}</option>
                    ))}
                  </optgroup>
                </select>

                <button id='add-product' onClick={toggleModalClose}>
                  + Região
                </button>
              </div>
            </section>

            <p id='result-reg'>Resultados ({regioes.length})</p>
            <section id='container-table-regions'>
              <table>
                <thead className='theadTableRegions'>
                  <tr>
                    <td>Foto</td>
                    <td>Nome </td>
                    <td>Cidade</td>
                    <td>Vendas</td>
                    <td>Faturamento</td>
                    <td className='table-space'></td>
                  </tr>
                </thead>
                <tbody className='tBodyTableRegions'>

                  {regioes
                    .filter((regiao) => regiao.nome && regiao.nome.toLowerCase().includes(filtroPesquisa.toLowerCase()))
                    .filter((regiao) => categoriaSelecionada ? regiao.cidade === categoriaSelecionada : true) // Filtrar por categoria selecionada
                    .map((regiao, index) => (
                      <tr key={index} className="region-row">
                        <td onClick={() => handleShowInfoModal(regiao)}>
                          <div className="region-pic">
                            <img src={regiao.picture} alt={regiao.nome} />
                          </div>
                        </td>
                        <td onClick={() => handleShowInfoModal(regiao)}><p>{regiao.nome}</p></td>
                        <td onClick={() => handleShowInfoModal(regiao)}><p>{regiao.cidade}</p>
                        </td>
                        <td onClick={() => handleShowInfoModal(regiao)}><p>{regiao.numVendas}</p></td>
                        <td onClick={() => handleShowInfoModal(regiao)}><p>{regiao.faturamento}</p></td>
                        <td className='table-btns'>
                          <button className="edit" onClick={() => handleEdit(regiao)}><FaPen /></button>
                          <button className="delete" onClick={() => openDeleteModal(regiao)}><FaTrash /></button>
                        </td>
                      </tr>
                    ))}

                </tbody>
              </table>
            </section>

          </main>
        </div>
      </div>
    </>
  )
}

export default Regioes