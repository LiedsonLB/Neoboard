import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoCloudDownloadOutline } from 'react-icons/io5';
import { read, utils } from 'xlsx';
import Papa from 'papaparse';
import './Relatorio.css';
import LoadingComponent from '../../components/loading/LoadingComponent';
import Popup from '../../components/popup/Popup';

const Relatorio: React.FC = () => {
  const [outputData, setOutputData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [popupType, setPopupType] = useState('');
  const [popupTitle, setPopupTitle] = useState('');
  const [vendas, setvendas] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);

  const dateNow = new Date();
  const day = dateNow.getDate();
  const month = dateNow.getMonth() + 1;
  const year = dateNow.getFullYear();

  const displayData = (data: any) => {
    setOutputData(data);
    setLoading(false);
  };

  const fetchVendas = async () => {
    try {
      const response = await axios.get('http://localhost:4000/v2/vendas');
      setvendas(response.data);
      console.log(response.data)
      //const categoriasUnicas = new Set(response.data.map((produto: any) => produto.categoria));
    } catch (error) {
      console.error('Erro ao buscar vendas:', error);
    }
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
          // Se os dados são um objeto, convertemos para array de valores
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
      // converte as datas para strings
      const formattedData = jsonData.map((row: any, rowIndex: number) => {
        if (rowIndex === 0) return row;
        return row.map((cell: any, cellIndex: number) => {
          if (cellIndex === dateColumnIndex) {
            if (typeof cell === 'number') {
              // caso a celula seja um número de série do excel ele converte para uma data (Liedson)
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
      // formata todos os dados com data convertida
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

  // Função para enviar os dados para a API
  const enviarRelatorioVendas = async () => {
    try {
      const vendas = outputData.slice(1).map((row: any) => ({
        Data: row[0], // Suponho que a data esteja na primeira coluna
        Funcionário: row[1], // Suponho que o funcionário esteja na segunda coluna
        Produto: row[2], // Suponho que o produto esteja na terceira coluna
        'Valor do produto': row[3], // Suponho que o valor do produto esteja na quarta coluna
        'Qtd. Comprada': row[4], // Suponho que a quantidade comprada esteja na quinta coluna
        Comprador: row[5], // Suponho que o comprador esteja na sexta coluna
        Região: row[6], // Suponho que a região esteja na sétima coluna
        'Forma de pagamento': row[7], // Suponho que a forma de pagamento esteja na oitava coluna
      }));

      console.log('Dados a serem enviados:', vendas);

      const response = await axios.post('http://localhost:4000/v2/vendas', vendas);

      if (response.status === 201) {
        setPopupType('sucess');
        setPopupTitle('Sucesso');
        setMensagem('Dados enviados com sucesso!');
        setOutputData([]);
      } else {
        throw new Error('Erro ao enviar dados para a API');
      }
    } catch (error) {
      console.error('Erro ao enviar dados para a API:', error);
      setPopupType('warning');
      setPopupTitle('Erro');
      setMensagem('Erro ao enviar dados para a API');
    }
    hidePopupAfterTimeout();
  };

  const handleFormatChange = (event: any) => {
    const selectedFormat = event.target.value;

    // URL do modelo para download
    let downloadUrl = '';

    if (selectedFormat === 'csv') {
      downloadUrl = './planilhaVazia/neoboardPlanilha.csv';
    } else if (selectedFormat === 'xlsx') {
      downloadUrl = './planilhaVazia/neoboardPlanilha.xlsx';
    } else if (selectedFormat === 'txt') {
      downloadUrl = './planilhaVazia/neoboardPlanilha.txt';
    }

    // Criando um link temporário para download
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

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await axios.get('http://localhost:4000/v2/funcionarios');
        const data = response.data;
        setFuncionarios(data);
      } catch (error) {
        console.error('Erro ao buscar funcionários:', error);
      }
    };
    fetchFuncionarios();
  }, []);

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
              <option disabled value="">Baixe o Modelo</option>
              <option className='selection-options' value="csv">CSV (.csv)</option>
              <option className='selection-options' value="xlsx">Excel (.xlsx)</option>
              <option className='selection-options' value="txt">Texto (.txt)</option>
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
            <h3>{vendas}</h3>
          </td>
        ))}
      </tr>
        }
        <table>
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
                {row.map((cell: any, cellIndex: number) => (
                    <td key={cellIndex}>
                      <input type="text" value={cell} style={{ width: "100%" }} />
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Relatorio;