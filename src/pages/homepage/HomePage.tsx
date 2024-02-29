import { signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth } from '../../services/firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../../components/loading/Loading.tsx';

const HomePage = () => {
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    document.title = `NeoBoard | ${user?.displayName?.split(" ")[0] || "Home"}`;
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
      <h1 style={{ textAlign: 'center' }}>Home Page Teste</h1>
      <div style={{ backgroundColor: 'var(--primary-color)', color: 'var(--white-color)', paddingBlock: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
        Dados do usuário: <br />
        <img src={photo} alt="" style={{ width: '100px', height: '100px', borderRadius: '100px' }} />
        <p>Nome: <span>{name}</span></p>
        <p>email: <span>{email}</span></p>
        <button style={{ marginTop: '10px', cursor: 'pointer', padding: '0.5rem 1rem', background:'var(--secondy-color)', border: 'none', color: 'var(--white-color)' }} onClick={() => signOut(auth)}>Logout</button>
      </div>
    </>
  )
}

export default HomePage