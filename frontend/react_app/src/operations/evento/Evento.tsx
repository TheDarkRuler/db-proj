import React, { useRef, useState } from 'react';
import background from '../../img/lottatoreBackg.jpg';
import { InputText } from 'primereact/inputtext';
import { Calendar, CalendarChangeEvent } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { GetElements, client } from '../../common/Getter';
import { Button } from 'primereact/button';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import GoBack from '../../common/GoBack';
import { countries } from 'unique-names-generator';
import './Evento.css';
import AddScontri from './Scontri';
import { useLocation } from 'react-router-dom';


var selectedScontroI: string = "";
var selectedScontroII: string = "";
var selectedScontroIII: string = "";
var selectedScontroIV: string = "";
var selectedScontroV: string = "";

const ScontroI = (ScontroRicevuto: string) => {
    selectedScontroI = ScontroRicevuto;
    console.log(ScontroRicevuto);
}
const ScontroII = (ScontroRicevuto: string) => {
    selectedScontroII = ScontroRicevuto;
}
const ScontroIII = (ScontroRicevuto: string) => {
    selectedScontroIII = ScontroRicevuto;
}
const ScontroIV = (ScontroRicevuto: string) => {
    if (selectedScontroIII !== "") {
        selectedScontroIV = ScontroRicevuto; 
    }
}
const ScontroV = (ScontroRicevuto: string) => {
    if (selectedScontroIV !== "") {
        selectedScontroV = ScontroRicevuto;
    }
}

export default function Evento() {

    const fromPath = useLocation().state.fromPath;

    function AddEvento() {
        const toast = useRef<Toast>(null);
        const buttonEl = useRef(null);
        const [date, setDate] = useState(null);
        const [selectedCountrie, setSelectedCountrie] = useState(null);
        const [selectedStadiumName, setSelectedStadiumName] = useState("");
        const [selectedRentPrice, setSelectedRentPrice] = useState("");
        const [selectedStaffPrice, setSelectedStaffPrice] = useState("");
        const [selectedFirstSponsor, setSelectedFirstSponsor] = useState(null);
        const [selectedSecondSponsor, setSelectedSecondSponsor] = useState(null);
        const [selectedThirdSponsor, setSelectedThirdSponsor] = useState(null);
        const [selectedStandardPrice, setSelectedStandardPrice] = useState("");
        const [selectedStandardNumber, setSelectedStandardNumber] = useState("");
        const [selectedPremiumPrice, setSelectedPremiumPrice] = useState("");
        const [selectedPremiumNumber, setSelectedPremiumNumber] = useState("");
        const [selectedSecondVis, setSelectedSecondVis] = useState(true);
        const [selectedThirdVis, setSelectedThirdVis] = useState(true);    
        const [selectedTimeStart, setSelectedTimeStart] = useState(null);
        const [selectedTimeEnd, setSelectedTimeEnd] = useState(null);

        const accept = () => {
            console.log(selectedTimeStart);
            if (selectedStadiumName === "" || selectedCountrie === null || selectedRentPrice === "" || selectedStaffPrice === "" || 
                    selectedTimeStart === null || selectedTimeEnd === null || date === null || 
                    selectedStandardPrice === "" || selectedPremiumPrice === "" || selectedPremiumNumber === "" || 
                    selectedStandardNumber === "" || selectedScontroI === "" || selectedScontroII === "") {
                toast.current?.show({ severity: 'error', summary: 'Confermato', detail: 'Dati non sufficienti', life: 3000 });
            } else {
                const temp = {
                    stadio: selectedStadiumName,
                    countrie: selectedCountrie,
                    rent: selectedRentPrice,
                    staff: selectedStaffPrice,
                    start: new Date(selectedTimeStart).getHours() + ":" + new Date(selectedTimeStart).getMinutes(),
                    end: new Date(selectedTimeEnd).getHours() + ":" + new Date(selectedTimeEnd).getMinutes(),
                    date: date,
                    firstSpo: selectedFirstSponsor === "default"? null: selectedFirstSponsor,
                    secondSpo: selectedSecondSponsor === "default"? null: selectedSecondSponsor,
                    thirdSpo: selectedThirdSponsor === "default"? null: selectedThirdSponsor,
                    standNum: selectedStandardNumber,
                    standPrice: selectedStandardPrice,
                    premNum: selectedPremiumNumber,
                    premPrice: selectedPremiumPrice
                };
                console.log(temp);
                if (selectedScontroIII === "" && selectedScontroIV === "" && selectedScontroV === "") {
                    client.get(`/evento/aggiungi/:${JSON.stringify(temp)}${selectedScontroI}${selectedScontroII}`);
                } else if (selectedScontroIV === "" && selectedScontroV === "") {
                    client.get(`/evento/aggiungi/:${JSON.stringify(temp)}${selectedScontroI}${selectedScontroII}${selectedScontroIII}`);
                } else if (selectedScontroV === "") {
                    client.get(`/evento/aggiungi/:${JSON.stringify(temp)}${selectedScontroI}${selectedScontroII}${selectedScontroIII}
                        ${selectedScontroIV}`);
                } else {
                    client.get(`/evento/aggiungi/:${JSON.stringify(temp)}${selectedScontroI}${selectedScontroII}${selectedScontroIII}
                        ${selectedScontroIV}${selectedScontroV}`);
                }

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

        const renderListStati = countries.map((item) => 
            <option value={item}>{item}</option>
        );
        const renderListSponsor = GetElements("/sponsor").map((item) => 
            <option disabled={item === selectedFirstSponsor || 
                            item === selectedSecondSponsor ||
                            item === selectedThirdSponsor } value={item}>{item}</option>
        );

        return (
            <>
                <div className='addEvento'>
                    <div className='card p-fluid flex flex-wrap'>
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                            <InputText onChange={e => setSelectedStadiumName(e.target.value)} placeholder="Nome Stadio" />
                        </div>
                        <div className="p-inputgroup">
                            <select className="DropDownFirst" onChange={ e => setSelectedCountrie(e.target.value) }>
                                <option selected={true} disabled hidden value="default">
                                    --Luogo--
                                </option>
                                {renderListStati}
                            </select>
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-map"></i>
                            </span>
                        </div>
                        <div className="p-inputgroup flex-1">
                            <InputNumber onChange={e => setSelectedRentPrice(e.value === null? "" : e.value.toString())} 
                                placeholder="Costo Noleggio" />
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-euro"></i>
                            </span>
                        </div>
                        <div className="p-inputgroup flex-1">
                            <InputNumber onChange={e => setSelectedStaffPrice(e.value === null? "" : e.value.toString())} 
                                placeholder="Spesa Staff" />
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-euro"></i>
                            </span>
                        </div>
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-calendar"></i>
                            </span>
                            <Calendar value={date} onChange={(e) => setDate(e.value)} placeholder='Data'/>
                        </div>
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-clock"></i>
                            </span>
                            <Calendar value={selectedTimeStart} onChange={(e: CalendarChangeEvent) => setSelectedTimeStart(e.value)} 
                                placeholder='Ora Inizio' timeOnly/>
                        </div>
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-clock"></i>
                            </span>
                            <Calendar value={selectedTimeEnd} onChange={(e) => setSelectedTimeEnd(e.value)} 
                                placeholder='Ora Fine' timeOnly/>
                        </div>
                        <div className="p-inputgroup">
                            <select value={selectedFirstSponsor} className="DropDownSponsor" 
                                    onChange={ e => setSelectedFirstSponsor(e.target.value) }>
                                <option selected={true} disabled hidden value="default">
                                    --Sponsor #1--
                                </option>
                                {renderListSponsor}
                            </select>
                            <button className='cancelButton' onClick={() => setSelectedFirstSponsor("default")} >×</ button>
                            <Button onClick={() => setSelectedSecondVis(false)} icon="pi pi-plus" severity="success" />
                        </div>
                        <div className="p-inputgroup">
                            <select hidden={selectedSecondVis} value={selectedSecondSponsor} className="DropDownSponsor" 
                                    onChange={ e => setSelectedSecondSponsor(e.target.value) }>
                                <option selected={true} disabled hidden value="default">
                                    --Sponsor #2--
                                </option>
                                {renderListSponsor}
                            </select>
                            <button  className="cancelButton" hidden={selectedSecondVis} 
                                onClick={() => setSelectedSecondSponsor("default")} >×</button>
                            <button className='secondSponsorPlus' hidden={selectedSecondVis} 
                                onClick={() => setSelectedThirdVis(false)}>+</button>
                            <button className='secondSponsorMinus' hidden={selectedSecondVis} 
                                onClick={() => {setSelectedSecondVis(true); setSelectedSecondSponsor("default");}} >-</button>
                        </div>
                        <div className="p-inputgroup">
                            <select hidden={selectedThirdVis} value={selectedThirdSponsor} className="DropDownSponsor" 
                                    onChange={ e => setSelectedThirdSponsor(e.target.value) }>
                                <option selected={true} disabled hidden value="default">
                                    --Sponsor #3--
                                </option>
                                {renderListSponsor}
                            </select>
                            <button className="cancelButton" hidden={selectedThirdVis} 
                                onClick={() => setSelectedThirdSponsor("default")} >×</button>
                            <Button visible={!selectedThirdVis} 
                                onClick={() => {setSelectedThirdVis(true); setSelectedThirdSponsor("default");}} 
                                icon="pi pi-minus" severity="warning" />
                        </div>
                        <div className="p-inputgroup">
                            <InputNumber onChange={e => setSelectedStandardNumber(e.value === null? "" : e.value.toString())} 
                                placeholder="Biglietti Standard Venduti" />
                        </div>
                        <div className="p-inputgroup">
                            <InputNumber onChange={e => setSelectedStandardPrice(e.value === null? "" : e.value.toString())} 
                                placeholder="Costo Biglietto Standard" />
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-euro"></i>
                            </span>
                        </div>
                        <div className="p-inputgroup">
                            <InputNumber onChange={e => setSelectedPremiumNumber(e.value === null? "" : e.value.toString())} 
                                placeholder="Biglietti Premium Venduti" />
                        </div>
                        <div className="p-inputgroup">
                            <InputNumber onChange={e => setSelectedPremiumPrice(e.value === null? "" : e.value.toString())} 
                                placeholder="Costo Biglietto Premium" />
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-euro"></i>
                            </span>
                        </div>
                    </div>
                </div>
                <Toast ref={toast} />
                <ConfirmPopup />
                <div>
                    <button ref={buttonEl} onClick={confirm} className='buttonAddEvento'>Add</button>
                </div>
            </>
        ); 

    }

    return(
        <div className='Evento'>
            <div className='backgroundLottatore' style={{backgroundImage: `url(${background})`, 
                backgroundSize: 'cover',
                backgroundRepeat: "repeat-y",
                backgroundPosition: "center",
                height: '120vh',
                width: '99vw',
                }}>  
                <div className="vlEvento"></div>
                <h1 className='optionsText1'>
                    Aggiungi Evento ↴
                </h1>
                <h2 className='optionsText2'>
                    Aggiungi Scontri ↴
                </h2> 
                <AddEvento />
                <AddScontri />
                <>{GoBack(fromPath)} </>
            </div>
        </div>
    );
}

export { ScontroI, ScontroII, ScontroIII, ScontroIV, ScontroV, selectedScontroIII, selectedScontroIV};
