import React from 'react';
import '../initialpage/InitialPage.css';

const InitialPage = () => {

    return (
        <div className="apresentacao">
            <div className="apresentacao-conteudo">
                <img id="logo_apresention" src='./img/icon_neoboard.png' alt="Logo da empresa"/>
                <br/>
                <h2 id="text-apresent">NeoBoard</h2>
            </div>
        </div>
    );
}

export default InitialPage;