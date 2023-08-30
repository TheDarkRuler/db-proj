import { useLocation, useNavigate } from 'react-router-dom';
import background from '../img/lottatoreBackg.jpg';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from "primereact/inputtextarea";
import { useRef, useState } from 'react';
import "./News.css";
import { Toast } from 'primereact/toast';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Button } from 'primereact/button';
import { client } from '../common/Getter';

export default function News() {

    const username = useLocation().state.username;

    const AddNews = () => {

        const [selectedArgomento, setSelectedArgomento] = useState(null);
        const [selectedDescrizione, setSelectedDescrizione] = useState(null);
        const toast = useRef<Toast>(null);

        const accept = () => {
            if (selectedArgomento !== null && selectedDescrizione !== null) {
                client.get(`news/aggiungi/:${selectedArgomento}/:${selectedDescrizione}/:${username}`);
                setInterval(() => window.location.reload(), 1000);
            } else {
                toast.current?.show({ severity: 'error', summary: 'Rifiutato', detail: 'Dati inseriti non sufficienti', life: 3000 });
            }
        }

        const reject = () => {
            toast.current?.show({ severity: 'warn', summary: 'Rifiutato', detail: 'Hai Rifiutato', life: 3000 });
        };

        const confirm = (event: { currentTarget: any; }) => {
            confirmPopup({
                target: event.currentTarget,
                message: 'Sicuro di voler aggiungere questo Record?',
                icon: 'pi pi-info-circle',
                acceptClassName: 'p-button-danger',
                accept,
                reject
            });
        };


        return (
            <div className='NewsContent'>
                <div className="p-inputgroup">
                    <InputText onChange={e => setSelectedArgomento(e.target.value)} placeholder="Argomento" />
                </div>
                <div className="card flex justify-content-center">
                    <span className="p-float-label">
                        <InputTextarea id="description" value={selectedDescrizione} 
                            onChange={(e) => setSelectedDescrizione(e.target.value)} rows={10} cols={70} />
                        <label htmlFor="description">Descrizione</label>
                    </span>
                </div>
                <Toast ref={toast} />
                <ConfirmPopup />
                <div>
                    <Button onClick={confirm} severity="secondary" className='buttonAdd' label="Add"/>
                </div>
            </div>
        );
    }

    const GoBack = () => {

        let navigate = useNavigate();
        const routeChange = () => {
            let path = `/Menu/Pubblicitario`;
            navigate(path, { state: { username: username }, replace: true });
        }

        return (
            <div className='buttonIndietro' onClick={routeChange}>
                <span>
                    Indietro
                </span>
            </div>
        );
    };

    return (
        <div>
            <div className='backgroundLottatore' style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: '100vh',
                width: '100vw',
            }}>
                <AddNews />
                <GoBack />
            </div>
        </div>
    );
}