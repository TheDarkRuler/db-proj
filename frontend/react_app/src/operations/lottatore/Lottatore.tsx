import React, { useRef, useState } from 'react';
import './Lottatore.css';
import background from '../../img/lottatoreBackg.jpg';
import { Delete } from '../common/Delete';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { GetElements, client } from '../common/Getter';
import { Button } from 'primereact/button';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import GoBack from '../common/GoBack';

export default function Lottatore() {

    function AddMember() {
        const buttonEl = useRef(null);
        const toast = useRef<Toast>(null);
        const [date, setDate] = useState(null);
        const [selectedDiscipline, setSelectedDiscipline] = useState(null);
        const [selectedTeam, setSelectedTeam] = useState(null);
        const [selectedName, setSelectedName] = useState("");
        const [selectedSurame, setSelectedSurname] = useState("");
        const [selectedCF, setSelectedCF] = useState("");
        const [selectedPeso, setSelectedPeso] = useState("");
        const renderListDisipline = GetElements("/disciplina").map((item) => 
            <option value={item}>{item}</option>
        );
        const renderListTeam = GetElements("/team").map((item) => 
            <option value={item}>{item}</option>
        );
        const lottatori = GetElements("/lottatore");

        const accept = () => {
            if (selectedCF === "" || selectedDiscipline === "" || selectedName === "" || selectedPeso === "" || 
                    selectedSurame === "" || selectedTeam === "" || date === "") {
                toast.current?.show({ severity: 'error', summary: 'Confermato', detail: 'Dati non sufficienti', life: 3000 });
            } else if (lottatori.includes(selectedCF)) {
                toast.current?.show({ severity: 'error', summary: 'Confermato', detail: 'Lottatore già presente', life: 3000 });
            } else {
                client.get(`/lottatore/aggiungi/:${selectedName}/:${selectedSurame}/:${selectedCF}
                    /:${date}/:${selectedPeso}/:${selectedTeam}/:${selectedDiscipline}`);
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
            <div className='addMember'>
                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-user"></i>
                    </span>
                    <InputText onChange={e => setSelectedName(e.target.value)} placeholder="Nome" />
                </div>
                <div className="p-inputgroup">
                    <InputText onChange={e => setSelectedSurname(e.target.value)} placeholder="Cognome" />
                </div>
                <div className="p-inputgroup">
                    <InputText onChange={e => setSelectedCF(e.target.value)} placeholder="CF" />
                </div>
                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-calendar"></i>
                    </span>
                    <Calendar value={date} onChange={(e) => setDate(e.value)} placeholder='Data di Nascita'/>
                </div>
                <div className="p-inputgroup flex-1">
                    <InputNumber onChange={e => setSelectedPeso(e.value === null? "" : e.value.toString())} placeholder="Peso" />
                    <span className="p-inputgroup-addon">Kg</span>
                </div>
                <div className="p-inputgroup">
                    <select className="DropDownFirst" onChange={ e => setSelectedDiscipline(e.target.value) }>
                        <option selected={true} disabled hidden value="default">
                            --Arte Marziale--
                        </option>
                        {renderListDisipline}
                    </select>
                </div>
                <div className="p-inputgroup">
                    <select className="DropDownSecond" onChange={ e => setSelectedTeam(e.target.value) }>
                        <option selected={true} disabled hidden value="default">
                            --Team-- (opzionale)
                        </option>
                        {renderListTeam}
                    </select>
                </div>
                <Toast ref={toast} />
                <ConfirmPopup />
                <div>
                    <Button ref={buttonEl} onClick={confirm} severity="secondary" className='buttonAdd' label="Add"/>
                </div>
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
                <div className="vl"></div>
                <h1 className='optionsText1'>
                    Aggiungi Lottatore ↴
                </h1>
                <h2 className='optionsText2'>
                    Rimuovi Lottatore ↴
                </h2> 
                <>{Delete('lottatore/', 'lottatore/rimuovi/', 'lottatori')}</>
                <AddMember />
                <GoBack />
            </div>
        </div>
    );
}
