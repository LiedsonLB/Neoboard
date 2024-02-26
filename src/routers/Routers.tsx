import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "../pages/loginpage/Loginpage.tsx"
import ErrorPage from "../pages/errorpage/Errorpage.tsx"
import HomePage from "../pages/homepage/HomePage.tsx"
import CadasterPage from "../pages/cadasterpage/CadasterPage.tsx"

function Routers() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage/>} />
                <Route path="/cadaster" element={<CadasterPage/>} />
                <Route path="/home" element={<HomePage/>} />
                <Route path="*" element={<ErrorPage/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Routers