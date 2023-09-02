import React, { useRef, useState } from 'react';
import './App.css';
import background from './img/mma-background.jpg';
import { useNavigate } from "react-router-dom";
import "reflect-metadata";
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { GetElements, client } from './common/Getter';
import { Password } from 'primereact/password';

const LogIn = () => {

  const toast = useRef<Toast>(null);
  const users = [];
  GetElements("/utenti").forEach(x => users.push(JSON.parse(x)));

  const [selectedUsername, setSelectedUsername] = useState(null);
  const [selectedPassword, setSelectedPassword] = useState(null);

  let navigate = useNavigate();
  const routeChange = (tipo: string) => {
    let path: string;
    tipo === "Utente"? path = "Statistics": path = `Menu/${tipo}`;
    navigate(path, { state: {utente: (path === "Statistics"), username: selectedUsername}, replace: true });
  };

  const confirm = () => {
    let temp = false;
    users.forEach(x => {
      if (x.username === selectedUsername) {
        if (x.passw === selectedPassword) {
          routeChange(x.tipo);
          temp = true;
        };
      };
    }); 
    if (temp === false) {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Username o Password errati', life: 3000 });
    } 
  };

  return (
    <div className='logIn'>
      <div className="p-inputgroup">
        <span className="p-inputgroup-addon">
          <i className="pi pi-user"></i>
        </span>
        <InputText onChange={e => setSelectedUsername(e.target.value)} placeholder="Username" />
      </div>
      <div className="p-inputgroup flex-1">
        <Password onChange={e => setSelectedPassword(e.target.value)} placeholder="Password" toggleMask feedback={false} />
      </div>
      <Toast ref={toast} />
      <div onClick={confirm} className='MyButtonLogIn'>
        <span> Log in </span>
      </div>
    </div>
  );
}

const SignIn = () => {

  const toast = useRef<Toast>(null);
  const users = [];
  GetElements("/utenti").forEach(x => {
    const user = JSON.parse(x);
    users.push(user.username);
  });

  const [selectedUsername, setSelectedUsername] = useState(null);
  const [selectedPassword, setSelectedPassword] = useState(null);
  const [selectedConfirmPassword, setSelectedConfirmPassword] = useState(null);

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `Statistics`;
    navigate(path, { state: {utente: true, username: selectedUsername}, replace: true });
  };

  const confirm = () => {
    if (!users.includes(selectedUsername)) {
      client.get(`/utenti/insert/:${selectedUsername}/:${selectedPassword}`);
      routeChange()
    } else {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Utente già presente', life: 3000 });
    }
  }

  const sendError = () => {
    toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Dati non corretti o non sufficienti', life: 3000 });
  }

  return (
    <div className='signIn'>
      <div className="p-inputgroup">
        <span className="p-inputgroup-addon">
          <i className="pi pi-user"></i>
        </span>
        <InputText onChange={e => setSelectedUsername(e.target.value)} placeholder="Username" />
      </div>
      <div className="p-inputgroup flex-1">
        <Password onChange={e => setSelectedPassword(e.target.value)} placeholder="Password" toggleMask />
      </div>
      <div className="p-inputgroup flex-1">
        <Password onChange={e => setSelectedConfirmPassword(e.target.value)} placeholder="Conferma Password" 
          feedback={false} toggleMask />
      </div>
      <Toast ref={toast} />
      <div onClick={selectedPassword === selectedConfirmPassword && selectedPassword !== null && selectedUsername !== null? 
                    confirm : sendError} className='MyButtonSignIn'>
        <span> Sign in </span>
      </div>
    </div>
  );
}

function App() {

  return (

    <div className="App">
      <div style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: '100vh',
        width: '100vw',
      }}>
        <SignIn />
        <LogIn />
      </div>
    </div>
  );
}

export default App;
