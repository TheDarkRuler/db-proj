import React from 'react';
import './Operations.css'
import { useNavigate } from 'react-router-dom';
import background from '../img/operationsBack.jpg';

function LottatoreButton() {

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
      let path = `/Operations/Lottatore`;
      navigate(path, {replace: true});
    }
    
    return (
        <div className='button' onClick={routeChange}>
            <span> 
                Aggiungi/Rimuovi Lottatore  
            </span>
        </div>
    );
}

function TeamButton() {

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = `/`;
        navigate(path, {replace: true});
    }
    
    return (
        <div className='button' onClick={routeChange}>
            <span> 
                Aggiungi/Rimuovi Team  
            </span>
        </div>
    );
}

function SponsorButton() {

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = `/`;
        navigate(path, {replace: true});
    }
    
    return (
        <div className='button' onClick={routeChange}>
            <span> 
                Aggiungi/Rimuovi Sponsor  
            </span>
        </div>
    );
}

function Evento() {

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = `/`;
        navigate(path, {replace: true});
    }
    
    return (
        <div className='button' onClick={routeChange}>
            <span> 
                Registra Evento  
            </span>
        </div>
    );
}

function ModificaLottatore() {

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = `/`;
        navigate(path, {replace: true});
    }
    
    return (
        <div className='button' onClick={routeChange}>
            <span> 
                Modifica dati Lottatore  
            </span>
        </div>
    );
}

function BackToMenu() {

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = `/`;
        navigate(path, {replace: true});
    }
    
    return (
        <div className='button' onClick={routeChange}>
            <span> 
                Ritorna al menu iniziale
            </span>
        </div>
    );
}
  
export default function Operations() {

    return(
        <div className="Operations">

            <div className='background' style={{backgroundImage: `url(${background})`, 
                backgroundSize: 'cover',
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: '100vh',
                width: '100vw',
                }}>   
                <p className='text'>
                    Seleziona un operazione tra le seguenti:
                </p> 
                <LottatoreButton />
                <TeamButton />
                <SponsorButton />
                <Evento />
                <ModificaLottatore />
                <BackToMenu />
            </div>
        </div>
    );
}