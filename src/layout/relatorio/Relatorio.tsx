import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoCloudDownloadOutline } from 'react-icons/io5';
import { read, utils } from 'xlsx';
import Papa from 'papaparse';
import './Relatorio.css';
import LoadingComponent from '../../components/loading/LoadingComponent.tsx';
import Popup from '../../components/popup/Popup.tsx';

interface Venda {
  Data: string;
  Funcionário: string;
  Produto: string;
  'Qtd. Comprada': number;
  Comprador: string;
  Região: string;
  'Forma de pagamento': string;
}

interface Produto {
  id: number;
  nome: string;
}

interface Funcionario {
  id: number;
  nome: string;
}

interface Regiao {
  id: number;
  nome: string;
}

const Relatorio: React.FC = () => {
  const [outputData, setOutputData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [popupType, setPopupType] = useState('');
  const [popupTitle, setPopupTitle] = useState('');
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [regioes, setRegioes] = useState<Regiao[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [editedData, setEditedData] = useState<any[][]>([]);
  const [invalidCells, setInvalidCells] = useState<{ [key: string]: boolean }>({});

  const dateNow = new Date();
  const day = dateNow.getDate();
  const month = dateNow.getMonth() + 1;
  const year = dateNow.getFullYear();

  useEffect(() => {
    fetchData();
  }, [localStorage.getItem('userID')]);

  const fetchData = async () => {
    try {
      const [produtosResponse, regionsResponse, staffsResponse] = await Promise.all([
        axios.get<Produto[]>(`http://localhost:4000/v3/produtos?userId=${localStorage.getItem('userID')}`),
        axios.get<Regiao[]>(`http://localhost:4000/v3/regioes?userId=${localStorage.getItem('userID')}`),
        axios.get<Funcionario[]>(`http://localhost:4000/v3/funcionarios?userId=${localStorage.getItem('userID')}`)
      ]);
      setProdutos(produtosResponse.data);
      setRegioes(regionsResponse.data);
      setFuncionarios(staffsResponse.data);

    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      setLoading(false);
    }
  };

  const displayData = (data: any) => {
    setOutputData(data);
    setLoading(false);
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLoading(true);
      try {
        const data = await readFile(file);
        if (Array.isArray(data)) {
          displayData(data);
        } else if (typeof data === 'object') {
          const dataArray = Object.values(data);
          displayData(dataArray);
        } else {
          throw new Error('Formato de dados inválido');
        }
      } catch (error) {
        console.error('Erro ao processar o arquivo:', error);
        setPopupType('warning');
        setPopupTitle('Erro');
        setMensagem('Erro ao processar o arquivo');
        setLoading(false);
        hidePopupAfterTimeout();
      }
    }
  };

  const readFile = async (file: File): Promise<any> => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = (e) => {
        const data = e.target?.result;
        if (data instanceof ArrayBuffer) {
          const dataArray = new Uint8Array(data);
          if (file.name.endsWith('.xlsx')) {
            resolve(handleXLSXFile(dataArray));
          } else if (file.name.endsWith('.csv') || file.name.endsWith('.txt')) {
            resolve(handleCSVFile(dataArray));
          } else {
            reject(new Error('Formato de arquivo não suportado.'));
          }
        }
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const handleXLSXFile = (data: Uint8Array) => {
    const workbook = read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = utils.sheet_to_json(sheet, { header: 1 });

    const headerRow = jsonData[0] as string[];
    const dateColumnIndex = headerRow.indexOf('Data');

    if (dateColumnIndex !== -1) {
      const formattedData = jsonData.map((row: any, rowIndex: number) => {
        if (rowIndex === 0) return row;
        return row.map((cell: any, cellIndex: number) => {
          if (cellIndex === dateColumnIndex) {
            if (typeof cell === 'number') {
              const serialDate = cell;
              const millisecondsSince1900 = (serialDate - 1 - 2) * 24 * 60 * 60 * 1000;
              const date = new Date(1900, 0, 1 + Math.floor(serialDate) - 2, 0, 0, 0, millisecondsSince1900 % 1000);
              const day = date.getDate().toString().padStart(2, '0');
              const month = (date.getMonth() + 1).toString().padStart(2, '0');
              const year = date.getFullYear();
              return `${day}/${month}/${year}`;
            } else {
              const parsedDate = new Date(cell);
              if (!isNaN(parsedDate.getTime())) {
                const day = parsedDate.getDate().toString().padStart(2, '0');
                const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
                const year = parsedDate.getFullYear();
                return `${day}/${month}/${year}`;
              } else {
                return cell;
              }
            }
          }
          return cell;
        });
      });
      return formattedData;
    }
    return jsonData;
  };

  const handleCSVFile = (data: Uint8Array) => {
    const text = new TextDecoder().decode(data);
    return new Promise((resolve, reject) => {
      Papa.parse(text, {
        delimiter: ";",
        header: true,
        dynamicTyping: true,
        complete: function (results: any) {
          resolve(results.data);
        },
        error: function (error: any) {
          reject(error);
        }
      });
    });
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileChange({ target: { files } } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const cancelFile = () => {
    setOutputData([]);
    const fileInput = document.getElementById("fileElem") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  const enviarRelatorioVendas = async () => {
    try {
      const filteredOutputData = outputData.slice(1).filter((row) => row.some(cell => cell !== null && cell !== ''));

      const newInvalidCells: { [key: string]: boolean } = {};
      const vendas = filteredOutputData.map((row: any, rowIndex: number) => {
        const funcionario = row[1].trim();
        const produto = row[2].trim();
        const regiao = row[5].trim();

        if (!funcionarios.some(f => f.nome === funcionario)) {
          newInvalidCells[`${rowIndex}-1`] = true;
        }
        if (!produtos.some(p => p.nome === produto)) {
          newInvalidCells[`${rowIndex}-2`] = true;
        }
        if (!regioes.some(r => r.nome === regiao)) {
          newInvalidCells[`${rowIndex}-5`] = true;
        }

        return {
          Data: row[0],
          Funcionário: funcionario,
          Produto: produto,
          'Qtd. Comprada': row[3],
          Comprador: row[4],
          Região: regiao,
          'Forma de pagamento': row[6],
        };
      });

      setInvalidCells(newInvalidCells);

      if (Object.keys(newInvalidCells).length === 0) {
        setVendas(vendas);
        console.log('Celulas Invalidas: ', invalidCells)
        console.log('Dados das vendas a serem enviados:', vendas);
        console.log('Vendas Totais: ', vendas)

      } else {
        console.log('Existem dados inválidos, por favor corrija-os antes de enviar.');
        setPopupType('warning');
        setPopupTitle('Campos Inválidos:');
        setMensagem('O relatório apresenta dados inexistentes');
        hidePopupAfterTimeout();
      }

      console.log(filteredOutputData)

    } catch (error) {
      console.error('Erro ao enviar dados para a API:', error);
      setPopupType('warning');
      setPopupTitle('Relatório Incompatível:');
      setMensagem('Use algum dos modelos para baixar');
      hidePopupAfterTimeout();
    }
  };

  const handleFormatChange = (event: any) => {
    const selectedFormat = event.target.value;
    let downloadUrl = '';

    if (selectedFormat === 'csv') {
      downloadUrl = './planilhaVazia/neoboardPlanilha.csv';
    } else if (selectedFormat === 'xlsx') {
      downloadUrl = './planilhaVazia/neoboardPlanilha.xlsx';
    } else if (selectedFormat === 'txt') {
      downloadUrl = './planilhaVazia/neoboardPlanilha.txt';
    }

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `Relatorio_de_vendas_${day}-${month}-${year}.${selectedFormat}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const hidePopupAfterTimeout = () => {
    setTimeout(() => {
      setMensagem('');
    }, 4000);
  };

  const [showValidOptions, setShowValidOptions] = useState<{ [key: string]: boolean }>({});
  const [validOptions, setValidOptions] = useState<{ [key: string]: string[] }>({});

  const changeComponentStorage = (componentName: string) => {
    sessionStorage.setItem('currentComponent', componentName);
    window.location.reload();
  };

  return (
    <div id='report-container'>
      {mensagem && <Popup type={popupType} title={popupTitle} text={mensagem} />}
      <header id='report-header'>
        <h1>Enviar Relatório</h1>
      </header>

      <main id='report-main'>
        <section id='report-right'>
          <div id="drop-area"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragOver}
            onDragLeave={handleDragOver}>

            {loading && (
              <div id="container-file_loading">
                <LoadingComponent />
              </div>
            )}

            <input type="file" id="fileElem" multiple accept=".xlsx,.csv,.txt" onChange={handleFileChange} />
            {!loading && (
              <label className="buttonSendFile" htmlFor="fileElem">
                <i id='report-icon'><IoCloudDownloadOutline /></i>
                <p>Clique para escolher um arquivo.</p>
              </label>
            )}
          </div>

          <hr id='report-line' />

          <div id='report-btns'>
            <select id="format-select" onChange={handleFormatChange} defaultValue="">
              <option disabled value="">Baixe o Modelo:</option>
              <option className='selection-options' value="xlsx">Excel (.xlsx)</option>
              <option className='selection-options' disabled value="csv">CSV (.csv)- Em breve</option>
              <option className='selection-options' disabled value="txt">Texto (.txt)- Em breve</option>
            </select>

            <div>
              <button className='rep-btn' id='cancelFile' disabled={outputData.length === 0 || loading} onClick={cancelFile}>Cancelar</button>
              <button
                className='rep-btn'
                id='uploadButton'
                disabled={outputData.length === 0 || loading}
                onClick={enviarRelatorioVendas}
              >
                Enviar <i className="fa-solid fa-share"></i>
              </button>
            </div>
          </div>
        </section>
      </main>

      <div id="output">
        {outputData.length <= 0 &&
          <tr>
            {vendas.map((header: any, index: number) => (
              <td key={index}>
                <h3>{header}</h3>
              </td>
            ))}
          </tr>
        }
        <table style={{ height: '100% !important' }}>
          <thead>
            {outputData.length > 0 &&
              <tr>
                {outputData[0].map((header: any, index: number) => (
                  <td key={index}>
                    <h3>{header}</h3>
                  </td>
                ))}
              </tr>
            }
          </thead>
          <tbody>
            {outputData.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell: any, cellIndex: number) => {
                  const cellKey = `${rowIndex}-${cellIndex}`;
                  const isInvalid = invalidCells[cellKey];
                  const showOptions = showValidOptions[cellKey];

                  let options: string[] = [];
                  if (cellIndex === 1) {
                    options = funcionarios.map(f => f.nome);
                  } else if (cellIndex === 2) {
                    options = produtos.map(p => p.nome);
                  } else if (cellIndex === 5) {
                    options = regioes.map(r => r.nome);
                  }

                  return (
                    <td key={cellIndex} style={{ position: 'relative' }}>
                      <input
                        className={`output-input-fild ${isInvalid ? 'invalid' : ''}`}
                        type="search"
                        value={editedData[rowIndex]?.[cellIndex] ?? cell}
                        style={{ width: "100%" }}
                        onFocus={() => {
                          if (isInvalid) {
                            setValidOptions({ ...validOptions, [cellKey]: options });
                            setShowValidOptions({ ...showValidOptions, [cellKey]: true });
                          }
                        }}
                        onChange={(e) => {
                          const newData = [...editedData];
                          if (!newData[rowIndex]) newData[rowIndex] = [];
                          newData[rowIndex][cellIndex] = e.target.value;
                          setEditedData(newData);
                          if (isInvalid) {
                            setValidOptions({ ...validOptions, [cellKey]: options });
                            setShowValidOptions({ ...showValidOptions, [cellKey]: true });
                          }
                        }}
                        onBlur={() => {
                          setTimeout(() => {
                            setShowValidOptions({ ...showValidOptions, [cellKey]: false });
                          }, 200);
                        }}
                      />
                      {isInvalid && showOptions && (
                        <ul className="valid-options-list">
                          {validOptions[cellKey]?.map(option => (
                            <li key={option} onMouseDown={() => {
                              const newData = [...editedData];
                              if (!newData[rowIndex]) newData[rowIndex] = [];
                              newData[rowIndex][cellIndex] = option;
                              setEditedData(newData);
                              setShowValidOptions({ ...showValidOptions, [cellKey]: false });
                            }}>
                              {option}
                            </li>
                          ))}
                          <li
                            style={{ backgroundColor: 'var(--primary-color)', color: 'var(--white-color)' }}
                            onMouseDown={() => {
                              if (cellIndex === 1) {
                                changeComponentStorage('Funcionarios');
                              } else if (cellIndex === 2) {
                                changeComponentStorage('Produtos');
                              } else if (cellIndex === 5) {
                                changeComponentStorage('Regioes');
                              }
                            }}
                          >
                            Criar Opção
                          </li>
                        </ul>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Relatorio;