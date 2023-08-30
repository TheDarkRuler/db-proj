import React, { useRef } from 'react';
import './Menu.css';
import background from '../img/mma-background.jpg';
import { useLocation, useNavigate } from "react-router-dom";
import "reflect-metadata";
import { Toast } from 'primereact/toast';

function OperationButton() {

    const toast = useRef<Toast>(null);
    const temp = useLocation();
    const pathName = temp.pathname;
    const username = temp.state.username;
    const location = pathName === "/Menu/Amministratore"? "Operations": "News";

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `../../${location}`;
        navigate(path, {state: {username: username}, replace: true});
    }

    return (
        <>
            <Toast ref={toast} />
            <div className='MyMenuButton' onClick={routeChange}>
                <span>
                    {location}
                </span>
            </div>
        </>
    );
}

function StatisticsButton() {

    const username = useLocation().state.username

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `../../Statistics`;
        navigate(path, {state: {utente: false, username: username}, replace: true});
    }

    return (
        <div className='MyMenuButton' onClick={routeChange}>
            <span>
                Visualizza Statistiche
            </span>
        </div>
    );
}

function LogOut() {

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `../..`;
        navigate(path, { replace: true});
    }

    return (
        <div className='LogOutButton' onClick={routeChange}>
            <span>
                Log out
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
                <LogOut />
                <OperationButton />
                <StatisticsButton />
            </div>
        </div>
    );
}

export default Menu;
