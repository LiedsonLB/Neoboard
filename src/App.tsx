import React, { useEffect } from "react";
// @ts-ignore
import { auth } from "./services/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import LoginPage from "./pages/loginpage/Loginpage.tsx";
import Loading from "./components/loading/Loading.tsx";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage/HomePage.tsx";
import CadasterPage from "./pages/cadasterpage/CadasterPage.tsx";
import ErrorPage from "./pages/errorpage/Errorpage.tsx";
import Produto from "./layout/InfoPages/Produto.tsx";
import axios from "axios";

const App = () => {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    const updateUserUID = async () => {
      try {
        if (user) {
          const response = await axios.get(`http://localhost:4000/v3/users/${user.email}`);
          if (response.data && response.data.id) {
            localStorage.setItem('userID', response.data.id);
          } else {
            console.log(response.data)
            console.log(response.data.id)
            console.error('User not found');
            localStorage.setItem('userID', 'User not found');

          }
        } else {
          localStorage.setItem('userID', 'nao tem ID');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    updateUserUID();
  }, [localStorage.getItem('userID')]);

  // Remove o userID se não houver usuário
  if (!user) {
    localStorage.removeItem('userID');
  }

  if (loading) return <Loading />;

  return (
    <Routes>
      {user ? (
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/product/:id" element={<Produto />} />
          <Route path="/*" element={<ErrorPage />} />
        </>
      ) : (
        <>
          <Route path="/" element={<LoginPage />} />
          <Route path="/*" element={<LoginPage />} />
          <Route path="/cadaster" element={<CadasterPage />} />
        </>
      )}
    </Routes>
  );
};

export default App;
