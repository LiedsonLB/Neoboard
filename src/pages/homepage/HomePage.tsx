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
    const initialAnimate = sessionStorage.getItem('animateNeoHelp') !== 'false';
    const [animateNeoHelp, setAnimateNeoHelp] = useState(initialAnimate);

    const [user, loading] = useAuthState(auth);

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
        // Aqui você pode ajustar quando a animação deve ser executada
        const isAnimationPaused = sessionStorage.getItem('animateNeoHelp') === 'false';
        setAnimateNeoHelp(!isAnimationPaused);
    }, []);

    useEffect(() => {
        // Atualiza o sessionStorage quando animateNeoHelp muda
        sessionStorage.setItem('animateNeoHelp', animateNeoHelp.toString());
    }, [animateNeoHelp]);

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
        sessionStorage.setItem('animateNeoHelp', 'false');

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
                <div id='Neo-Help' onClick={toggleModalOpen} style={{ animation: animateNeoHelp ? 'scaleInSolid 1s ease-in-out infinite alternate' : 'none' }}>
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