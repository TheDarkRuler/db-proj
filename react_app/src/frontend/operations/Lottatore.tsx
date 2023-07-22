import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Lottatore.css';
import background from '../img/lottatoreBackg.jpg';

export default function Lottatore() {

    function GoBack() {

        let navigate = useNavigate(); 
        const routeChange = () =>{ 
          let path = `/Operations`;
          navigate(path, {replace: true});
        }
        
        return (
            <div className='buttonLottatore' onClick={routeChange}>
                <span> 
                    Indietro  
                </span>
            </div>
        );
    }

    return(
        <div className='Lottatore'>
            <div className='backgroundLottatore' style={{backgroundImage: `url(${background})`, 
                backgroundSize: 'cover',
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: '100vh',
                width: '100vw',
                }}>  
                <GoBack />
            </div>
        </div>
    );
}