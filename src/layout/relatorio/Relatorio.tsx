import React, { useState } from 'react';
import { IoCloudDownloadOutline } from 'react-icons/io5';
import { read, utils } from 'xlsx'; 
import Papa from 'papaparse';
import './Relatorio.css';

const Relatorio: React.FC = () => {
  const [outputData, setOutputData] = useState<any[]>([]);

  const displayData = (data: any) => {
    setOutputData(data);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
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

  return (
    <div id='report-container'>
      <header id='report-header'>
        <h1>Enviar Relatório</h1>
      </header>

      <main id='report-main'>
        <section id='report-right'>
          <header>
            <div id='file-header'>
              <label className="desc-text" htmlFor="title-file">Titulo:</label>
              <input type="text" id='title-file'/>
            </div>

            <div id='file-desc'>
              <label className="desc-desc" htmlFor="desc-file">Descrição:</label>
              <input type="text" id='desc-file'/>
            </div>
          </header>

          <div id="drop-area"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragOver}
            onDragLeave={handleDragOver}>
            <input type="file" id="fileElem" multiple accept=".xlsx,.csv,.txt" onChange={handleFileChange} />
            <label className="button" htmlFor="fileElem">
              <i id='report-icon'><IoCloudDownloadOutline /></i>
              <p>Clique para escolher um arquivo.</p>
            </label>
          </div>
          
          <hr id='report-line' />
          
          <div id='report-btns'>
            <button className='rep-btn' id='cancel-btn'>Cancelar</button>
            <button className='rep-btn' id='add-rep-btn'>Enviar</button>
          </div>
        </section>
      </main>

      <h3>Dados do Arquivo:</h3>
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
    </div>
  );
}

export default Relatorio;
