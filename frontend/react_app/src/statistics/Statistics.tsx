import React, { useState } from 'react';
import './Statistics.css'
import { useLocation, useNavigate } from 'react-router-dom';
import background from '../img/operationsBack.jpg';
import { client } from '../common/Getter';

export default function Operations() {

    const [tipo, getTipo] = useState("Utente");
    const temp = useLocation().state;
    const username = temp.username;
    const isUtente = temp.utente;
    if (isUtente !== true){
        client.get(`/utenti/getTipo/:${username}`).then((response) => {
            getTipo(response.data)
        });
    }

    function ClassificheVis() {

        let navigate = useNavigate();
        const routeChange = () => {
            let path = `/Statistics/visClassifiche`;
            navigate(path, { state: { utente: isUtente, username: username }, replace: true });
        }

        return (
            <div className='buttonOpp' onClick={routeChange}>
                <span>
                    Visualizza le classifiche
                </span>
            </div>
        );
    }

    function LottatoriVis() {

        let navigate = useNavigate();
        const routeChange = () => {
            let path = `/Statistics/visLottatori`;
            navigate(path, { state: { utente: isUtente, username: username }, replace: true });
        }

        return (
            <div className='buttonOpp' onClick={routeChange}>
                <span>
                    Visualizza lottatori
                </span>
            </div>
        );
    }

    function NewsVis() {

        let navigate = useNavigate();
        const routeChange = () => {
            let path = `/Statistics/visNews`;
            navigate(path, { state: { utente: isUtente, username: username }, replace: true });
        }

        return (
            <div className='buttonOpp' onClick={routeChange}>
                <span>
                    Visualizza news
                </span>
            </div>
        );
    }


    function EventiVis() {

        let navigate = useNavigate();
        const routeChange = () => {
            let path = `/Statistics/visEventi`;
            navigate(path, { state: { utente: isUtente, username: username }, replace: true });
        }

        return (
            <div className='buttonOpp' onClick={routeChange}>
                <span>
                    Visualizza eventi passati
                </span>
            </div>
        );
    }

    function Back() {
        const textButton = isUtente ? "Log out" : "Ritorna al menu";
        let navigate = useNavigate();
        const routeChange = () => {
            let path = isUtente ? "../" : `../Menu/${tipo}`;
            navigate(path, { state: { username: username }, replace: true });
        }

        return (
            <div className={isUtente ? "buttonUtente" : "buttonOthers"} onClick={routeChange}>
                <span>
                    {textButton}
                </span>
            </div>
        );
    }

    return (
        <div className="Statistics">

            <div className='background' style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: '100vh',
                width: '100vw',
            }}>
                <p className='text'>
                    Seleziona un operazione tra le seguenti:
                </p>
                <div className='gruppoStats'>
                    <ClassificheVis />
                    <LottatoriVis />
                    <NewsVis />
                    <EventiVis />
                </div>
                <Back />
            </div>
        </div>
    );
}