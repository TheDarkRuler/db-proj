import React from 'react';
import './Operations.css'
import { useLocation, useNavigate } from 'react-router-dom';
import background from '../img/operationsBack.jpg';

export default function Operations() {

    const username = useLocation().state.username;

    function LottatoreButton() {

        let navigate = useNavigate();
        const routeChange = () => {
            let path = `/Operations/Lottatore`;
            navigate(path, { state: {username: username}, replace: true});
        }

        return (
            <div className='buttonLott' onClick={routeChange}>
                <span>
                    Aggiungi/Rimuovi Lottatore
                </span>
            </div>
        );
    }

    function TeamButton() {

        let navigate = useNavigate();
        const routeChange = () => {
            let path = `/Operations/Team`;
            navigate(path, { state: {username: username}, replace: true});
        }

        return (
            <div className='buttonTeam' onClick={routeChange}>
                <span>
                    Aggiungi/Rimuovi Team
                </span>
            </div>
        );
    }

    function SponsorButton() {

        let navigate = useNavigate();
        const routeChange = () => {
            let path = `/Operations/Sponsor`;
            navigate(path, { state: {username: username}, replace: true});
        }

        return (
            <div className='buttonSponsor' onClick={routeChange}>
                <span>
                    Aggiungi/Rimuovi Sponsor
                </span>
            </div>
        );
    }

    function Evento() {

        let navigate = useNavigate();
        const routeChange = () => {
            let path = `/Operations/Evento`;
            navigate(path, { state: {username: username}, replace: true});
        }

        return (
            <div className='buttonEventi' onClick={routeChange}>
                <span>
                    Registra Evento
                </span>
            </div>
        );
    }

    function ModificaLottatore() {

        let navigate = useNavigate();
        const routeChange = () => {
            let path = `/Operations/LottatoreEdit`;
            navigate(path, { state: {username: username}, replace: true});
        }

        return (
            <div className='buttonEditLot' onClick={routeChange}>
                <span>
                    Modifica dati Lottatore
                </span>
            </div>
        );
    }

    function NewsControl() {

        let navigate = useNavigate();
        const routeChange = () => {
            let path = `/Operations/NewsControl`;
            navigate(path, { state: {username: username}, replace: true});
        }

        return (
            <div className='buttonNews' onClick={routeChange}>
                <span>
                    Gestisci News
                </span>
            </div>
        );
    }

    
    function Pubblicitari() {

        let navigate = useNavigate();
        const routeChange = () => {
            let path = `/Operations/Pubblicitari`;
            navigate(path, { state: {username: username}, replace: true});
        }

        return (
            <div className='buttonPubbl' onClick={routeChange}>
                <span>
                    Aggiungi/Rimuovi Pubblicitari
                </span>
            </div>
        );
    }

    function BackToMenu() {

        let navigate = useNavigate();
        const routeChange = () => {
            let path = "../Menu/Amministratore";
            navigate(path, { state: { username: username, utente: false}, replace: true });
        }

        return (
            <div className='button' onClick={routeChange}>
                <span>
                    Ritorna al menu iniziale
                </span>
            </div>
        );
    }

    return (
        <div className="Operations">

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
                <LottatoreButton />
                <TeamButton />
                <SponsorButton />
                <Evento />
                <ModificaLottatore />
                <NewsControl />
                <Pubblicitari />
                <BackToMenu />
            </div>
        </div>
    );
}