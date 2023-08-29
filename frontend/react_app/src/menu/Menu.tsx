import React, { useRef } from 'react';
import './Menu.css';
import background from '../img/mma-background.jpg';
import { useLocation, useNavigate } from "react-router-dom";
import "reflect-metadata";
import { Toast } from 'primereact/toast';

function OperationButton() {

    const toast = useRef<Toast>(null);
    const pathName = useLocation().pathname;

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `../../Operations`;
        navigate(path, {state:{fromPath: pathName}, replace: true});
    }

    const sendError = () => {
        toast.current?.show({ severity: 'error', summary: 'Error', 
            detail: 'Non hai i permessi necessari per effettuare modifiche', life: 3000 });
    }

    return (
        <>
            <Toast ref={toast} />
            <div className='MyMenuButton' onClick={useLocation().pathname === "/Menu/Amministratore" ? routeChange: sendError}>
                <span>
                    Operazioni Amministratore
                </span>
            </div>
        </>
    );
}

function StatisticsButton() {

    const pathName = useLocation().pathname;

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `../../Statistics`;
        navigate(path, {state:{fromPath: pathName}, replace: true});
    }

    return (
        <div className='MyMenuButton' onClick={routeChange}>
            <span>
                Visualizza Statistiche
            </span>
        </div>
    );
}

function Menu() {

    return (

        <div className="Menu">
            <div style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: '100vh',
                width: '100vw',
            }}>
                <OperationButton />
                <StatisticsButton />
            </div>
        </div>
    );
}

export default Menu;
