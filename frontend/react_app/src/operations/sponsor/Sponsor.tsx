import { useRef, useState } from 'react';
import background from '../../img/lottatoreBackg.jpg';
import { Delete } from '../../common/Delete';
import GoBack from '../../common/GoBack';
import { client } from '../../common/Getter';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { useLocation } from 'react-router-dom';

export default function Sponsor() {

    const username = useLocation().state.username;

    function AddSponsor() {
        const buttonEl = useRef(null);
        const toast = useRef<Toast>(null);
        const [selectedNome, setSelectedNome] = useState("");
        const [selectedPagamento, setSelectedPagamento] = useState("");

        const accept = () => {
            if (selectedNome === "" || selectedPagamento === "" ) {
                toast.current?.show({ severity: 'error', summary: 'Confirmed', detail: 'Dati non sufficienti', life: 3000 });
            } else {
                client.get(`/sponsor/aggiungi/:${selectedNome}/:${selectedPagamento}`);
                setInterval(() => window.location.reload(), 1000);
                toast.current?.show({ severity: 'info', summary: 'Confermato', detail: 'Hai Accettato', life: 3000 });
            }
        };

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
            <div className='addSponsor'>
                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-user"></i>
                    </span>
                    <InputText onChange={e => setSelectedNome(e.target.value)} placeholder="Nome Sponsor" />
                </div>
                <div className="p-inputgroup flex-1">
                    <InputNumber onChange={e => setSelectedPagamento(e.value === null? "" : e.value.toString())} 
                    placeholder="Pagamento Ricevuto" />
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-euro"></i>
                    </span>
                </div>
                <Toast ref={toast} />
                <ConfirmPopup />
                <div>
                    <Button ref={buttonEl} onClick={confirm} severity="secondary" className='buttonAdd' label="Add"/>
                </div>
            </div>
        ); 

    }

    return (
        <div className='Sponsor'>
            <div className='backgroundTeam' style={{backgroundImage: `url(${background})`, 
                backgroundSize: 'cover',
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: '100vh',
                width: '100vw',
            }}>  
                <div className="vl"></div>
                <h1 className='optionsText1'>
                    Aggiungi Sponsor ↴
                </h1>
                <h2 className='optionsText2'>
                    Rimuovi Sponsor ↴
                </h2> 
                <>{Delete('sponsor/', 'sponsor/rimuovi/', 'sponsorDropDown')}</>
                <AddSponsor />
                <>{GoBack(username)}</>
            </div>
        </div>
    );

}