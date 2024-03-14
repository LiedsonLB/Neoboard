import React, { useEffect, useState } from 'react'
import { IoGridOutline, IoBasketOutline, IoLocationOutline, IoPeopleOutline, IoBarChartOutline, IoDocumentTextOutline, IoHelpOutline, IoPaperPlaneOutline, IoLogOutOutline } from 'react-icons/io5';
import { signOut } from 'firebase/auth'
import { auth } from '../../services/firebase'
import '../aside/Aside.css'

const Aside = ( {user} ) => {
    const [photo, setPhoto] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (user) {
            setName(user.displayName ?? "");
            setEmail(user.email ?? "");
            setPhoto(user.photoURL ?? "img/no_profile.png");
        }
    }, [user])

  return (
    <aside id="container-home">
        <header>
            <img src="img/icon_neoboard.png" alt='titulo NeoBoard' />
            <span id="title-home">
                <h2>NeoBoard</h2>
            </span>
        </header>

        <div className='user-acount' style={{display: "flex", gap:"10px"}} data-toggle="tooltip" title="liedson.b9@gmail.com" onClick={() => signOut(auth)}>
            <img id='acount-photo' src={photo} alt="photoUser" />
            <div id='acount-info'>
                <h4 id='acount-userName'>{name}</h4>
                <p id='acount-email'>{email}</p>
            </div>
        </div>
        <div id="description">
            <p>Informe-se sobre:</p>
        </div>
        <nav id="navigation-home">
            <ul>
                <li>
                    <a href='#'>
                        <span className="icon"><IoGridOutline /></span>
                        <span className="title-home">
                            <h4>DashBoard</h4>
                        </span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span className="icon"><IoBasketOutline /></span>
                        <span className="title-home">
                            <h4>Produtos</h4>
                        </span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span className="icon"><IoLocationOutline /></span>
                        <span className="title-home">
                            <h4>Regiões</h4>
                        </span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span className="icon"><IoPeopleOutline /></span>
                        <span className="title-home">
                            <h4>Funcionários</h4>
                        </span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span className="icon"><IoBarChartOutline /></span>
                        <span className="title-home">
                            <h4>Financeiro</h4>
                        </span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span className="icon"><IoDocumentTextOutline /></span>
                        <span className="title-home">
                            <h4>Enviar Relatório</h4>
                        </span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span className="icon"><IoPaperPlaneOutline/></span>
                        <span className="title-home">
                            <h4>Fale conosco</h4>
                        </span>
                    </a>
                </li>
                <li id='logoutBtn'>
                    <a href="" onClick={() => { signOut(auth) }}>
                        <span className="icon"><IoLogOutOutline /></span>
                        <span className="title-home">
                            <h4>Logout</h4>
                        </span>
                    </a>
                </li>
            </ul>
        </nav>
    </aside>
  )
}

export default Aside