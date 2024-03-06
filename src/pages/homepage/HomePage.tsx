import { signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth } from '../../services/firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../../components/loading/Loading.tsx';
import { IoGridOutline, IoBasketOutline, IoLocationOutline, IoPeopleOutline, IoBarChartOutline, IoDocumentTextOutline, IoLogOutOutline } from 'react-icons/io5';

const HomePage = () => {
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    document.title = `NeoBoard | ${user?.displayName || "Home"}, bem vindo!!`;
  }, [user]);

  useEffect(() => {
    if (user) {
      setName(user.displayName ?? "");
      setEmail(user.email ?? "");
      setPhoto(user.photoURL ?? "img/no_profile.png");
    }
  }, [user])

  if (loading) return <Loading />;

  return (
    <>
          <div id="home-screen">
        <aside id="container-home">
            <header>
                <img src="img/icon_neoboard.png"/>
                <span className="title">
                    <h2>NeoBoard</h2>
                </span>
            </header>
            <div id="description">
                <p>Informe-se sobre:</p>
            </div>
            <nav id="navigation-home">
                <ul>
                    <li>
                        <a href="#">
                            <span className="icon"><IoGridOutline /></span>
                            <span className="title">
                                <h2>DashBoard</h2>
                                </span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span className="icon"><IoBasketOutline /></span>
                            <span className="title">
                                <h2>Produtos</h2>
                            </span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span className="icon"><IoLocationOutline /></span>
                            <span className="title">
                                <h2>Regiões</h2>
                            </span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span className="icon"><IoPeopleOutline /></span>
                            <span className="title">
                                <h2>Funcionários</h2>
                            </span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span className="icon"><IoBarChartOutline /></span>
                            <span className="title">
                                <h2>Financeiro</h2>
                            </span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span className="icon"><IoDocumentTextOutline /></span>
                            <span className="title">
                                <h2>Enviar Relatório</h2>
                            </span>
                        </a>
                    </li>

                    <div id="logout-home">
                        <li>
                            <a href="#">
                                <span className="icon"><IoLogOutOutline /></span>
                                <span className="title">
                                    <h2>Logout</h2>
                                </span>
                            </a>
                        </li>
                    </div>
                </ul>
            </nav>
        </aside>
    </div>
    </>
  )
}

export default HomePage