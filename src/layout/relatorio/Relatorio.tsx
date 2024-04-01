import React from 'react'
import "./Relatorio.css";
import { IoDocumentOutline } from 'react-icons/io5';

const Relatorio: React.FC = () => {
  // Função para lidar com arquivos selecionados ou arrastados
  const handleFiles = (files: FileList) => {
    // Aqui você pode processar os arquivos
    console.log(files);
  };

  // Função chamada quando arquivos são selecionados usando o input
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      handleFiles(event.target.files);
    }
  };

  // Função para lidar com o drop
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  // Prevenir o comportamento padrão para eventos drag over
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
        <section>
          <div className="linha-do-tempo">
            <div className="evento">
              <div className="ponto" id='first-dot'></div>
              <div className="data">2021</div>
            </div>
            <div className="evento">
              <div className="ponto"></div>
              <div className="data">2022</div>
            </div>
            <div className="evento">
              <div className="ponto"></div>
              <div className="data">2023</div>
            </div>
            <div className="evento">
              <div className="ponto"></div>
              <div className="data">2024</div>
            </div>
          </div>
        </section>

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


            <input type="file" id="fileElem" multiple accept="image/*" onChange={handleChange} />
            <label className="button" htmlFor="fileElem">
              <i id='report-icon'><IoDocumentOutline /></i>
              <p>Clique para escolher um arquivo ou arraste aqui.</p>
            </label>
          </div>
          
          <hr id='report-line' />
          
          <div id='report-btns'>
          <button className='rep-btn' id='cancel-btn'>Cancelar</button>
          <button className='rep-btn' id='add-rep-btn'>Enviar</button>
          </div>

        </section>
      </main >
    </div>
  )
}

export default Relatorio