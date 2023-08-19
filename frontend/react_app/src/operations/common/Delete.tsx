import React, { useRef, useState } from 'react';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import { GetElements } from './Getter';
import "../team/Team.css"
import "../sponsor/Sponsor.css"
import "../lottatore/Lottatore.css"

export function Delete(locationGet: string, locationDelete: string, dropDownName: string) {

    const client = axios.create({
        baseURL: "http://localhost:3030" 
    });

    const [selectedOption, setSelectedOption] = useState('');

    const renderList = GetElements(`${locationGet}`).map((item) => 
        <option value={item}>{item}</option>
    );

    function refreshPage() {
        window.location.reload();
    }
        
    const toast = useRef<Toast>(null);
    const buttonEl = useRef(null);

    const accept = () => {
        if (selectedOption !== "") {
            client.get(`${locationDelete}:${selectedOption}`);
            setInterval(() => refreshPage(), 1000);
            toast.current?.show({ severity: 'info', summary: 'Confermato', detail: 'Hai Accettato', life: 3000 });
        } else {
            toast.current?.show({ severity: 'error', summary: 'Confermato', detail: 'Nessun Elemento Selezionato', life: 3000 });
        }
    };

    const reject = () => {
        toast.current?.show({ severity: 'warn', summary: 'Rifiutato', detail: 'Hai Rifiutato', life: 3000 });
    };

    const confirm = (event: { currentTarget: any; }) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Sicuro di voler eliminare questo Record?',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept,
            reject
        });
    };

    return (
        <>
            <select className={dropDownName} onChange={ e => setSelectedOption(e.target.value) }>
                <option selected={true} disabled hidden value="default">
                   --Select--
                </option>
                {renderList}
            </select>
            <Toast ref={toast} />
            <ConfirmPopup />
            <div className="card flex justify-content-center">
                <Button ref={buttonEl} onClick={confirm} severity="secondary" className='buttonDelete' label="Remove"/>
            </div>
        </>
    );
}