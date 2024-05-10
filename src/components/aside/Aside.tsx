import React, { useEffect, useState } from 'react'
import { IoGridOutline, IoBasketOutline, IoLocationOutline, IoPeopleOutline, IoBarChartOutline, IoDocumentTextOutline, IoPaperPlaneOutline, IoLogOutOutline, IoMenuOutline, IoCloseOutline } from 'react-icons/io5';
import { signOut } from 'firebase/auth'
// @ts-ignore
import { auth } from '../../services/firebase'
import '../aside/Aside.css'
import { FaArrowLeft, FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Props {
    user: any | null;
    changeComponent: (component: string) => void;
}

const Aside = ({ user, changeComponent }: Props) => {
    const [photo, setPhoto] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);

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

    const toggleModalOpen = () => {
        setShowModal(true);
        const helpElement = document.getElementById('Neo-Help');
        if (helpElement) {
            helpElement.style.display = 'none';
        }
    };

    const toggleModalClose = () => {
        setShowModal(false);
        const neoElement = document.getElementById('Neo-Help');
        if (neoElement && neoElement.style.display === 'none') {
            neoElement.style.display = 'block';
            neoElement.style.animation = 'none';
        }
    };


    return (
        <>
            {showModal && <div className='modal-logout'>
                <div className='container-logout'>
                    <div className="header-logout">
                        <button type="button" className="close-btn" onClick={toggleModalClose}>&times;</button>
                    </div>

                    <img className='neo-logout' src="/img/NeoSad.png" alt="neo_logout" />

                    <h2 className='txt-logout'>Você tem certeza que quer sair?</h2>


                    <div className='options-logout'>
                        <button className="logout-yes" onClick={() => signOut(auth)}>Sim</button>
                        <button className="logout-no" onClick={toggleModalClose}>Não</button>
                    </div>
                </div>
            </div>}

            <main id='aside-container'>
                <div id='togle-btn'>
                    <button id="toggleSidebarBtn" onClick={toggleSidebar}>
                        {sidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
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
                        <button className='logout-user' onClick={toggleModalOpen}><IoLogOutOutline /></button>
                    </div>
                    <div id="description">
                        <p>Informe-se sobre:</p>
                    </div>
                    <nav id="navigation-home">
                        <ul>
                            <li onClick={() => { changeComponent('Dashboard'); setSidebarOpen(false) }}>
                                <span className="icon"><IoGridOutline /></span>
                                <span className="title-home">
                                    <h4>DashBoard</h4>
                                </span>
                            </li>
                            <li onClick={() => { changeComponent('Produtos'); setSidebarOpen(false) }}>
                                <span className="icon"><IoBasketOutline /></span>
                                <span className="title-home">
                                    <h4>Produtos</h4>
                                </span>
                            </li>
                            <li onClick={() => { changeComponent('Regioes'); setSidebarOpen(false) }}>
                                <span className="icon"><IoLocationOutline /></span>
                                <span className="title-home">
                                    <h4>Regiões</h4>
                                </span>
                            </li>
                            <li onClick={() => { changeComponent('Funcionarios'); setSidebarOpen(false) }}>
                                <span className="icon"><IoPeopleOutline /></span>
                                <span className="title-home">
                                    <h4>Funcionários</h4>
                                </span>
                            </li>
                            <li onClick={() => { changeComponent('Financeiro'); setSidebarOpen(false) }}>
                                <span className="icon"><IoBarChartOutline /></span>
                                <span className="title-home">
                                    <h4>Financeiro</h4>
                                </span>
                            </li>
                            <li onClick={() => { changeComponent('Relatorio'); setSidebarOpen(false) }}>
                                <span className="icon"><IoDocumentTextOutline /></span>
                                <span className="title-home">
                                    <h4>Enviar Relatório</h4>
                                </span>
                            </li>
                            <li onClick={() => { changeComponent('FAQ'); setSidebarOpen(false) }}>
                                <span className="icon"><IoPaperPlaneOutline /></span>
                                <span className="title-home">
                                    <h4>Fale Conosco</h4>
                                </span>
                            </li >
                        </ul>
                    </nav>
                </aside>
            </main>
        </>
    )
}

export default Aside