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
    const [activeItem, setActiveItem] = useState<string>(sessionStorage.getItem('activeItem') || 'Dashboard');

    useEffect(() => {
        if (user) {
            setName(user.displayName ?? "");
            setEmail(user.email ?? "");
            setPhoto(user.photoURL ?? "img/no_profile.png");
        }
    }, [user]);

    useEffect(() => {
        sessionStorage.setItem('activeItem', activeItem);
    }, [activeItem]);

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

                    <img className='neo-logout' src="/img/Neo/NeoSusto.png" alt="neo_logout" />

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
                            <li
                                className={activeItem === 'Dashboard' ? 'active-aside' : ''}
                                onClick={() => { changeComponent('Dashboard'); setSidebarOpen(false); setActiveItem('Dashboard') }}>
                                <span className="icon"><IoGridOutline /></span>
                                <span className="title-home">
                                    <p>DashBoard</p>
                                </span>
                            </li>
                            <li
                                className={activeItem === 'Produtos' ? 'active-aside' : ''}
                                onClick={() => { changeComponent('Produtos'); setSidebarOpen(false); setActiveItem('Produtos') }}>
                                <span className="icon"><IoBasketOutline /></span>
                                <span className="title-home">
                                    <p>Produtos</p>
                                </span>
                            </li>
                            <li
                                className={activeItem === 'Regioes' ? 'active-aside' : ''}
                                onClick={() => { changeComponent('Regioes'); setSidebarOpen(false); setActiveItem('Regioes') }}>
                                <span className="icon"><IoLocationOutline /></span>
                                <span className="title-home">
                                    <p>Regiões</p>
                                </span>
                            </li>
                            <li
                                className={activeItem === 'Funcionarios' ? 'active-aside' : ''}
                                onClick={() => { changeComponent('Funcionarios'); setSidebarOpen(false); setActiveItem('Funcionarios') }}>
                                <span className="icon"><IoPeopleOutline /></span>
                                <span className="title-home">
                                    <p>Funcionários</p>
                                </span>
                            </li>
                            <li
                                className={activeItem === 'Financeiro' ? 'active-aside' : ''}
                                onClick={() => { changeComponent('Financeiro'); setSidebarOpen(false); setActiveItem('Financeiro') }}>
                                <span className="icon"><IoBarChartOutline /></span>
                                <span className="title-home">
                                    <p>Financeiro</p>
                                </span>
                            </li>
                            <li
                                className={activeItem === 'Relatorio' ? 'active-aside' : ''}
                                onClick={() => { changeComponent('Relatorio'); setSidebarOpen(false); setActiveItem('Relatorio') }}>
                                <span className="icon"><IoDocumentTextOutline /></span>
                                <span className="title-home">
                                    <p>Enviar Relatório</p>
                                </span>
                            </li>
                            <li
                                className={activeItem === 'FAQ' ? 'active-aside' : ''}
                                onClick={() => { changeComponent('FAQ'); setSidebarOpen(false); setActiveItem('FAQ') }}>
                                <span className="icon"><IoPaperPlaneOutline /></span>
                                <span className="title-home">
                                    <p>Fale Conosco</p>
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