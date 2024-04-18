import React, { useEffect, useState } from 'react'
import { IoGridOutline, IoBasketOutline, IoLocationOutline, IoPeopleOutline, IoBarChartOutline, IoDocumentTextOutline, IoPaperPlaneOutline, IoLogOutOutline, IoMenuOutline, IoCloseOutline } from 'react-icons/io5';
import { signOut } from 'firebase/auth'
// @ts-ignore
import { auth } from '../../services/firebase'
import '../aside/Aside.css'

interface Props {
    user: any | null;
    changeComponent: (component: string) => void;
}

const Aside = ({ user, changeComponent }: Props) => {
    const [photo, setPhoto] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.displayName ?? "");
            setEmail(user.email ?? "");
            setPhoto(user.photoURL ?? "img/no_profile.png");
        }
    }, [user]);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <main id='aside-container'>
            <div id='togle-btn'>
                <button id="toggleSidebarBtn" onClick={toggleSidebar}>
                    {sidebarOpen ? <IoCloseOutline /> : <IoMenuOutline />}
                </button>
            </div>
            <aside id="aside-home" className={sidebarOpen ? '' : 'closed'}>
                <header id='logo-aside'>
                    <img src="img/icon_neoboard.png" alt='titulo NeoBoard' />
                    <span id="title-home">
                        <h2>NeoBoard</h2>
                    </span>
                </header>

                <div className='user-acount' style={{ display: "flex" }} data-toggle="tooltip" title={email}>
                    <img id='acount-photo' src={photo} alt="photoUser" />
                    <div id='acount-info'>
                        <h4 id='acount-userName'>{name}</h4>
                        <p id='acount-email'>{email}</p>
                    </div>
                    <button className='logout-user' onClick={() => signOut(auth)}><IoLogOutOutline /></button>
                </div>
                <div id="description">
                    <p>Informe-se sobre:</p>
                </div>
                <nav id="navigation-home">
                    <ul>
                        <li onClick={() => {changeComponent('Dashboard'); setSidebarOpen(false)}}>
                            <span className="icon"><IoGridOutline /></span>
                            <span className="title-home">
                                <h4>DashBoard</h4>
                            </span>
                        </li>
                        <li onClick={() => {changeComponent('Produtos'); setSidebarOpen(false)}}>
                            <span className="icon"><IoBasketOutline /></span>
                            <span className="title-home">
                                <h4>Produtos</h4>
                            </span>
                        </li>
                        <li onClick={() => {changeComponent('Regioes'); setSidebarOpen(false)}}>
                            <span className="icon"><IoLocationOutline /></span>
                            <span className="title-home">
                                <h4>Regiões</h4>
                            </span>
                        </li>
                        <li onClick={() => {changeComponent('Funcionarios'); setSidebarOpen(false)}}>
                            <span className="icon"><IoPeopleOutline /></span>
                            <span className="title-home">
                                <h4>Funcionários</h4>
                            </span>
                        </li>
                        <li onClick={() => {changeComponent('Financeiro'); setSidebarOpen(false)}}>
                            <span className="icon"><IoBarChartOutline /></span>
                            <span className="title-home">
                                <h4>Financeiro</h4>
                            </span>
                        </li>
                        <li onClick={() => {changeComponent('Relatorio'); setSidebarOpen(false)}}>
                            <span className="icon"><IoDocumentTextOutline /></span>
                            <span className="title-home">
                                <h4>Enviar Relatório</h4>
                            </span>
                        </li>
                        <li onClick={() => {changeComponent('FAQ'); setSidebarOpen(false)}}>
                            <span className="icon"><IoPaperPlaneOutline /></span>
                            <span className="title-home">
                                <h4>Fale conosco</h4>
                            </span>
                        </li >
                    </ul>
                </nav>
            </aside>
        </main>
    )
}

export default Aside