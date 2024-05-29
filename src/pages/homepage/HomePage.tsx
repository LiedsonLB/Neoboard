import '../homepage/HomePage.css'
import React, { useEffect, useState } from 'react'
// @ts-ignore
import { auth } from '../../services/firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../../components/loading/Loading.tsx';
import Aside from '../../components/aside/Aside.tsx';
import Home from '../../layout/dashboard/Home.tsx';
import Produtos from '../../layout/produtos/Produtos.tsx';
import Regioes from '../../layout/regioes/Regioes.tsx';
import Financeiro from '../../layout/financeiro/Financeiro.tsx';
import Relatorio from '../../layout/relatorio/Relatorio.tsx';
import Funcionarios from '../../layout/funcionarios/Funcionarios.tsx';
import FAQ from '../../layout/FAQ/FAQ.tsx';
import axios from 'axios';
import HomeHelp from '../../components/ModalHelp/HomeHelp.tsx';
import ProductHelp from '../../components/ModalHelp/ProductHelp.tsx';
import RegionHelp from '../../components/ModalHelp/RegionHelp.tsx';
import StaffHelp from '../../components/ModalHelp/StaffHelp.tsx';
import FinancialHelp from '../../components/ModalHelp/FinancialHelp.tsx';
import ReportHelp from '../../components/ModalHelp/ReportHelp.tsx';
import FaqHelp from '../../components/ModalHelp/FaqHelp.tsx';

const HomePage = () => {
    const savedComponent = sessionStorage.getItem('currentComponent');
    const [photo, setPhoto] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [currentComponent, setCurrentComponent] = useState<string>(savedComponent || 'Dashboard');
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState<React.ReactNode>(null);
    const [position, setPosition] = useState({ x: null, y: null });
    const [dragging, setDragging] = useState(false);
    const [mouseMoved, setMouseMoved] = useState(false);
    const [isClick, setIsClick] = useState(true); // Flag to differentiate click and drag
    const clickThreshold = 5; // Distance in pixels to consider as drag

    const [user, loading] = useAuthState(auth);
    const uid = user?.uid;
    const initialAnimate = localStorage.getItem(`${uid}_animateNeoHelp`) !== 'false';
    const [animateNeoHelp, setAnimateNeoHelp] = useState(initialAnimate);

    useEffect(() => {
        document.title = `${user?.displayName + " | NeoBoard" || "Home"}, bem vindo!!`;
    }, [user]);

    useEffect(() => {
        if (user) {
            setName(user.displayName ?? "");
            setEmail(user.email ?? "");
            setPhoto(user.photoURL ?? "img/no_profile.png");
        }
    }, [user]);

    useEffect(() => {
        if (savedComponent !== null) {
            setCurrentComponent(savedComponent);
        } else {
            setCurrentComponent('Dashboard'); // Define o valor padrão como 'Dashboard'
        }
    }, []);

    useEffect(() => {
        // Obtém o elemento Neo-Help
        const helpElement = document.getElementById('Neo-Help');
        // Verifica se o elemento existe e se as posições não são null
        if (helpElement && position.x === null && position.y === null) {
            // Obtém o estilo computado da Neo-Help
            const computedStyle = window.getComputedStyle(helpElement);
            // Obtém as posições left e top do estilo computado
            const initialX = parseFloat(computedStyle.getPropertyValue('left')) || 0;
            const initialY = parseFloat(computedStyle.getPropertyValue('top')) || 0;
            // Define as posições iniciais
            setPosition({ x: initialX, y: initialY });
        }
    }, [position]);
    

    useEffect(() => {
        if (uid) {
            const isAnimationPaused = localStorage.getItem(`${uid}_animateNeoHelp`) === 'false';
            setAnimateNeoHelp(!isAnimationPaused);
        }
    }, [uid]);


    useEffect(() => {
        if (uid) {
            localStorage.setItem(`${uid}_animateNeoHelp`, animateNeoHelp.toString());
        }
    }, [animateNeoHelp, uid]);

    useEffect(() => {
        if (dragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [dragging]); // Adiciona/Remove os listeners baseado no estado de 'dragging'

    const changeComponentStorage = (componentName: string) => {
        sessionStorage.setItem('currentComponent', componentName);
        setCurrentComponent(componentName); // Defina o estado com o novo valor
    };

    const toggleModalOpen = () => {
        let content: React.ReactNode = null;

        switch (currentComponent) {
            case 'Dashboard':
                content = <HomeHelp toggleModalClose={toggleModalClose} />;
                break;
            case 'Produtos':
                content = <ProductHelp toggleModalClose={toggleModalClose} />;
                break;
            case 'Regioes':
                content = <RegionHelp toggleModalClose={toggleModalClose} />;
                break;
            case 'Funcionarios':
                content = <StaffHelp toggleModalClose={toggleModalClose} />;
                break;
            case 'Financeiro':
                content = <FinancialHelp toggleModalClose={toggleModalClose} />;
                break;
            case 'Relatorio':
                content = <ReportHelp toggleModalClose={toggleModalClose} />;
                break;
            case 'FAQ':
                content = <FaqHelp toggleModalClose={toggleModalClose} />;
                break;
            default:
                content = <HomeHelp toggleModalClose={toggleModalClose} />;
        }

        setModalContent(content);
        setShowModal(true);

        setAnimateNeoHelp(false);
        if (uid) {
            localStorage.setItem(`${uid}_animateNeoHelp`, 'false');
        }

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

    const handleMouseDown = (event) => {
        event.preventDefault();
        setIsClick(true); // Set as a click initially
        const { clientX, clientY } = event;
        setDragging(true);
        setPosition({
            ...position,
            startX: clientX - position.x,
            startY: clientY - position.y,
            mouseX: clientX,
            mouseY: clientY
        });
    };
    
    const handleMouseMove = (event) => {
        event.preventDefault();
        if (dragging) {
            const { clientX, clientY } = event;
            const deltaX = clientX - position.mouseX;
            const deltaY = clientY - position.mouseY;
            if (Math.abs(deltaX) > clickThreshold || Math.abs(deltaY) > clickThreshold) {
                setIsClick(false); // Set as a drag if moved significantly
            }
            setPosition({
                ...position,
                x: clientX - position.startX,
                y: clientY - position.startY,
                mouseX: clientX,
                mouseY: clientY
            });
            setMouseMoved(true);
        }
    };
    
    const handleMouseUp = () => {
        setDragging(false);
        // Se não houve movimento significativo do mouse, não abre o modal
        if (isClick) {
            toggleModalOpen();
        }
        // Reseta a flag de movimento do mouse
        setMouseMoved(false);
    };

    const renderComponent = () => {
        switch (currentComponent) {
            case 'Dashboard':
                return <Home user={{ displayName: user ? user.displayName || undefined : undefined }} />;
            case 'Produtos':
                return <Produtos />;
            case 'Regioes':
                return <Regioes />;
            case 'Funcionarios':
                return <Funcionarios />;
            case 'Financeiro':
                return <Financeiro />;
            case 'Relatorio':
                return <Relatorio />;
            case 'FAQ':
                return <FAQ />;
            default:
                return <Home user={{ displayName: user ? user.displayName || undefined : undefined }} />;
        }
    };

    if (loading) return <Loading />;

    return (
        <>
            <div id="homepage">
                <Aside user={user} changeComponent={(component: string) => changeComponentStorage(component)} />
                <div id="home-screen">
                    <div
                        id='Neo-Help'
                        style={{
                            left: `${position.x}px`,
                            top: `${position.y}px`,
                            animation: animateNeoHelp ? 'scaleInSolid 1s ease-in-out infinite alternate' : 'none',
                            position: 'fixed', // Certifique-se de que é 'fixed' ou 'absolute'
                            cursor: dragging ? 'grabbing' : 'grab'
                        }}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                    >
                        <img src="/img/NeoHead.png" alt="neo_head" />
                    </div>

                    {renderComponent()}
                </div>
                {showModal && (
                    <div className="Modal-Help">
                        <div className='container-Help'>
                            <div className="header-Help">
                                <h4 className="help-title">Dicas do Neo: </h4>
                                <button type="button" className="close-btn" onClick={toggleModalClose}>&times;</button>
                            </div>
                            {modalContent}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default HomePage;