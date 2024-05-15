import React, { useState, useEffect } from 'react';
import "./Regioes.css";
import { IoSearch, IoCamera } from 'react-icons/io5';
import RegionDoughnout from '../../components/charts/RegionDoughnout.tsx';
import RegionColumnChart from '../../components/charts/RegionColumnChart.tsx';
import axios from 'axios';


import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";
// @ts-ignore
import { storage } from '../../services/firebase';
import Popup from '../../components/popup/Popup.tsx';

const Regioes = () => {
  const [showModal, setShowModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [regioes, setRegioes] = useState<any[]>([]);
  const [filtroPesquisa, setFiltroPesquisa] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<any>(null);
  const [categorias, setCategorias] = useState<string[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [regiaoParaEditar, setRegiaoParaEditar] = useState<any>({});
  const [regiaoParaAdicionar, setRegiaoParaAdicionar] = useState<any>({});

  //popup
  const [mensagem, setMensagem] = useState('');
  const [popupType, setPopupType] = useState('');
  const [popupTitle, setPopupTitle] = useState('');

  const userId = localStorage.getItem('userID');

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
      const response = await axios.get(`http://localhost:4000/v3/regioes?categoria=${categoriaSelecionada}`);
      setRegioes(response.data);
      const categoriasUnicas = new Set(response.data.map((regiao: any) => regiao.cidade));
      const categoriasUnicasArray: string[] = Array.from(categoriasUnicas);
      setCategorias(categoriasUnicasArray);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  useEffect(() => {
    fetchRegioes();
  }, []);

  // Função para gerar um ID único
  const generateUniqueRandomId = (): number => {

    const existingIds = regioes.map((regiao: any) => parseInt(regiao.id, 10));

    const generateRandomId = (): number => Math.floor(Math.random() * 100000000);

    let randomId = generateRandomId();

    // Verifica se o ID gerado já existe na lista de IDs existentes
    while (existingIds.includes(randomId)) {
      randomId = generateRandomId();
    }

    return randomId;
  };

  const adicionarRegiao = async () => {
    try {

      // Verificar se uma imagem foi selecionada
      let picture = './img/no_productImg.jpeg';

      if (selectedImage) {
        // Fazer upload da imagem para o Firebase Storage
        const downloadURL = await uploadImageToStorage(selectedImage);
        // Definir a URL da imagem obtida
        picture = downloadURL;
      }
  
      // Envie os dados da nova região para a rota de adição na API
      await axios.post('http://localhost:4000/v3/regioes', regiaoParaAdicionar);
      fetchRegioes(); // Atualize a lista de regiões após a adição
      setShowModal(false); // Feche o modal de adição após a conclusão
      // Limpe os campos do formulário após adicionar com sucesso
      setRegiaoParaAdicionar({
        picture,
        nome: '',
        cidade: '',
        endereco: '',
        responsavel: '',
        descricao: '',
        usuarioId: userId,
      });
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

  const handleEdit = (regiao: any) => {
    // Define os dados do regiao selecionado para edição
    console.log(regiao);
    setRegiaoParaEditar((prevRegiaoParaEditar: any) => ({ ...prevRegiaoParaEditar, ...regiao }));
    // Abre o modal de edição
    setShowEditModal(true);
  };  

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

              <button id='add-Region-Btn' onClick={adicionarRegiao}>Enviar</button>
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

      <div id='region-container'>
        <div id='region-inside'>
          <header id="region-header">
            <h1>Regiões</h1>
            <p>Confira as regiões que mais venderam</p>
          </header>

          <main id='region-main'>
            <article id='region-card'>
              <p id='text-region-mes'>Região do Mês</p>
              <div id='reg-main'>
                <div id='container-region-img'>
                  <figure className='city-img'>
                    <img src="./img/Piripiri-Igreja-Matriz.png" alt="piripiri" />
                  </figure>
                  <div id='region-desc'>
                    <h1>Piripiri</h1>
                    <p>Faturamento: <span>250K</span></p>
                    <p>Unidades vendidas: <span>51K</span></p>
                  </div>
                </div>

                <div id='region-chart'>
                  <RegionDoughnout />
                </div>
              </div>
            </article>

            <section id='search-container-region'>
              <div id='search-bar-region'>
                <input type="search" id="search-region" placeholder='Pesquisar região' aria-label="Buscar" onChange={handleFiltroChange} />
                <i id='search-icon-region'><IoSearch id='icon-region' /></i>
              </div>

              <div className='filter-container-btns'>
                <select id="filter-expense" value={categoriaSelecionada} onChange={(e) => setCategoriaSelecionada(e.target.value)}>
                  <option value="">Todos</option>
                  {categorias.map((categoria, index) => (
                    <option key={index} value={categoria}>{categoria}</option>
                  ))}
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
                    <td>região</td>
                    <td>nome</td>
                    <td>vendido</td>
                    <td>faturamento</td>
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
                        <td onClick={() => handleShowInfoModal(regiao)}>{regiao.nome}</td>
                        <td onClick={() => handleShowInfoModal(regiao)}>{regiao.vendas}</td>
                        <td onClick={() => handleShowInfoModal(regiao)}>{regiao.faturamento}</td>
                        <td className='table-btns'>
                          <button className="edit" onClick={() => handleEdit(regiao)}>Editar</button>
                          <button className="delete" onClick={handleDelete(regiao)}>Excluir</button>
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