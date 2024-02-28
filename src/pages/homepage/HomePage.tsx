import { signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth } from '../../services/firebase'
import { useAuthState } from 'react-firebase-hooks/auth';

const HomePage = () => {
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      setName(user.displayName ?? "");
      setEmail(user.email ?? "");
      setPhoto(user.photoURL ?? "");
    }
  }, [user])

  return (
    <>
      <h1>Home Page Teste</h1>
      <div>
        Dados do usuário: <br />
        <img src={photo} alt="" style={{width: '100px', height: '100px', borderRadius: '100px'}}/>
        <p>Nome: <span>{name}</span></p>
        <p>email: <span>{email}</span></p>
      </div>
      <button onClick={() => signOut(auth)}>Logout</button>
    </>
  )
}

export default HomePage