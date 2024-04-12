import React, { useState } from 'react';
import { IoCloudDownloadOutline, IoDocumentOutline, IoSearch, IoCaretDownSharp, IoAddCircleOutline } from 'react-icons/io5';
import { read, utils } from 'xlsx';
import Papa from 'papaparse';
import './Relatorio.css';
import LoadingComponent from '../../components/loading/LoadingComponent';

const Relatorio: React.FC = () => {
  const [outputData, setOutputData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const dateNow = new Date();
  const day = dateNow.getDate();
  const month = dateNow.getMonth() + 1;
  const year = dateNow.getFullYear();

  const displayData = (data: any) => {
    setOutputData(data);
    setLoading(false); // Hide loading indicator once data processing is complete
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLoading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        if (data instanceof ArrayBuffer) {
          const dataArray = new Uint8Array(data);
          if (file.name.endsWith('.xlsx')) {
            handleXLSXFile(dataArray);
          } else if (file.name.endsWith('.csv') || file.name.endsWith('.txt')) {
            handleCSVFile(dataArray);
          } else {
            alert('Formato de arquivo não suportado.');
            setLoading(false); // Ocultar indicador de carregamento se o formato do arquivo não for suportado
          }
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleXLSXFile = (data: Uint8Array) => {
    const workbook = read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = utils.sheet_to_json(sheet, { header: 1 });
    displayData(jsonData);
  };

  const handleCSVFile = (data: Uint8Array) => {
    const text = new TextDecoder().decode(data);
    Papa.parse(text, {
      delimiter: ";",
      header: true,
      dynamicTyping: true,
      complete: function (results: any) {
        displayData(results.data);
      }
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

  return (
    <div id='report-container'>
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
            <a href="./planilhaVazia/neoboardPlanilha.xlsx" download={`Relatorio_de_vendas_${day}-${month}-${year}`} id="receiveFile"><i className="fa-solid fa-file-csv"></i> Receber Planilha</a>
            <div>
              <button className='rep-btn' id='cancelFile' disabled={outputData.length === 0 || loading} onClick={cancelFile}>Cancelar</button>
              <button className='rep-btn' id='uploadButton' disabled={outputData.length === 0 || loading}>
                Enviar <i className="fa-solid fa-share"></i>
              </button>
            </div>
          </div>
        </section>
      </main>

      <div id="output">
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
                    <h3>{cell}</h3>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section id='exp-form'>
        <header>
          <h1>Informe suas despesas</h1>
        </header>

        <section id='search-expense'>
          <div id='search-bar'>
            <input type="search" id="search-exp" placeholder='Pesquisar despesa' aria-label="Buscar" />
            <i id='search-icon'><IoSearch id='icon-exp' /></i>
          </div>

          <button id='filter-expense'>
            <p>Tipo</p>
            <IoCaretDownSharp />
          </button>
        </section>

        <p id='result-expense'>Resultados (3)</p>

        <section id='exp-cards'>
          <button className='exp-card'>
            <i><IoAddCircleOutline /></i>
            <p>Adicionar despesa</p>
          </button>

          <button className='exp-card'>
            <span className="fa-stack1">
              <i className="fas fa-square"></i>
              <i className="fas fa-circle"></i>
              <i className="fas fa-dollar-sign"></i>
            </span>
            <p>Aluguel Ponto</p>
            <p className='exp-desc'>Aluguel do dia 20 no ponto de Piripiri</p>
          </button>

          <button className='exp-card'>
            <span className="fa-stack2">
              <i className="fas fa-square"></i>
              <i className="fas fa-circle"></i>
              <i className="fas fa-dollar-sign"></i>
            </span>
            <p>Aluguel Ponto</p>
            <p className='exp-desc'>Aluguel do dia 21 no ponto de Piripiri</p>
          </button>

          <button className='exp-card'>
            <span className="fa-stack3">
              <i className="fas fa-square"></i>
              <i className="fas fa-circle"></i>
              <i className="fas fa-dollar-sign"></i>
            </span>
            <p>Aluguel Ponto</p>
            <p className='exp-desc'>Aluguel do dia 22 no ponto de Piripiri</p>
          </button>

          <button className='exp-card'>
            <span className="fa-stack4">
              <i className="fas fa-square"></i>
              <i className="fas fa-circle"></i>
              <i className="fas fa-dollar-sign"></i>
            </span>
            <p>Aluguel Ponto</p>
            <p className='exp-desc'>Aluguel do dia 23 no ponto de Piripiri</p>
          </button>
          
        </section>

      </section>

    </div>
  );
}

export default Relatorio;
