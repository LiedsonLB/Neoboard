import React from 'react'
import '../initialpage/InitialPage.css'

const InitialPage = () => {

    function typeWriter() {
        const titulo = document.getElementById("text-apresent");
        const logo = document.getElementById("logo");

        if (titulo && logo) {
            const textoArray = titulo.innerHTML.split("");
            titulo.innerHTML = "";
            textoArray.forEach((letra, i) => {
                setTimeout(() => {
                    titulo.innerHTML += letra;
                    if (i === textoArray.length - 1) {
                        titulo.style.transform = "scale(1.1)";
                        logo.style.boxShadow = "0 0 50px rgba(255, 255, 255, 0.8)";
                    }
                }, 110 * i);
            });
        }
    }

    typeWriter();
    
    return (
    <div className="apresentacao">
        <div className="apresentacao-conteudo">
            <img id="logo_apresention" src='./img/icon_neoboard.png' alt="Logo da empresa"/>
            <br/>
            <h2 id="text-apresent">NeoBoard</h2>
        </div>
    </div>
  )
}

export default InitialPage