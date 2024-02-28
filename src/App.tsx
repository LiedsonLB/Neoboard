import React, { useEffect, useState } from "react";
import { auth } from "./services/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import LoginPage from "./pages/loginpage/Loginpage.tsx";
import Loading from "./components/loading/Loading.tsx";
import Routers from "./routers/Routers.tsx";
import HomePage from "./pages/homepage/HomePage.tsx";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  if (loading) return <Loading />;

  if (!user) return <LoginPage />;

  return (
    <HomePage/>
  );
};

export default App;
