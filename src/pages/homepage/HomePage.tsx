import '../homepage/HomePage.css'
import React, { useEffect, useState } from 'react'
import { auth } from '../../services/firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../../components/loading/Loading.tsx';
import Aside from '../../components/aside/Aside.tsx';
import Home from '../../layout/Home.tsx';

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
            <div id="homepage">
                <Aside user={user} />
                <div id="home-screen">
                    <Home user={user} />
                </div>
            </div>
        </>
    )
}

export default HomePage
