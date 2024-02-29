import React from "react";
import { auth } from "./services/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import LoginPage from "./pages/loginpage/Loginpage.tsx";
import Loading from "./components/loading/Loading.tsx";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage/HomePage.tsx";
import CadasterPage from "./pages/cadasterpage/CadasterPage.tsx";

const App = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <Loading />;

  return (
    <Routes>
      {user ? (
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<HomePage />} />
        </>
      ) : (
        <>
          <Route path="/" element={<LoginPage />} />
          <Route path="/cadaster" element={<CadasterPage />} />
          <Route path="/*" element={<LoginPage />} />
        </>
      )}
    </Routes>
  );
};

export default App;
