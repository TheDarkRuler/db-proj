import React, { useEffect, useState } from 'react';
import background from '../../img/lottatoreBackg.jpg';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { GetElements, client } from '../../common/Getter';
import './EventiVis.css';
import { useLocation } from 'react-router-dom';
import GoBackStats from '../commonStat/GoBackStats';
import ScontriVis from './ScontriVis';

export default function EventoVis() {

    function AddEvento() {
        const [scontriXEvento, setScontriXEvento] = useState(null);
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
        const [selectedTimeStart, setSelectedTimeStart] = useState(null);
        const [selectedTimeEnd, setSelectedTimeEnd] = useState(null);

        /*const renderListEventi = GetElements("/eventi").map((item) =>
            <option value={item}>{`Evento N°: ${item}`}</option>
        );*/

        const listEventi = GetElements('/eventi');

        const renderListEventi = listEventi.map((item) =>
            <option value={item}>{`Evento N°: ${item}`}</option>
        );

        const insertMemberData = async (id: string) => {
            let temp: any;

            await client.get(`/eventi/:${id}`).then((x) => {
                setScontriXEvento(x.data);
            });
            setSelectedCountrie(temp.luogo);
            setSelectedStadiumName(temp.nomeStadio);
            setSelectedRentPrice(temp.costoNoleggio);
            setSelectedStaffPrice(temp.spesaStaff);
            setSelectedFirstSponsor(temp.sponsor.sponsor1);
            setSelectedSecondSponsor(temp.sponsor.sponsor2);
            setSelectedThirdSponsor(temp.sponsor.sponsor3);
            setSelectedStandardPrice(temp.costoBigliettiStandard);
            setSelectedStandardNumber(temp.bigliettiStandardVenduti);
            setSelectedPremiumPrice(temp.costoBigliettiPremium);
            setSelectedPremiumNumber(temp.bigliettiPremiumVenduti);
            setSelectedTimeStart(temp.oraInizio);
            setSelectedTimeEnd(temp.oraFine);
            setDate(temp.dataEvento);
        }

        const insertTime = (time: number) => {
            if (time !== null) {
                let temp = time.toString()
                var output = [temp.slice(0, 2), ':', temp.slice(2)].join('');
                return [output.slice(0, 5), ':', output.slice(5)].join('');
            }
        }

        return (
            <>
                <div className='VisEvento'>
                    <div className="p-inputgroup">
                        <select className="DropDownEvento" onChange={e => insertMemberData(e.target.value)}>
                            <option selected={true} disabled hidden value="default">
                                --Evento da visualizzare--
                            </option>
                            {renderListEventi}
                        </select>
                    </div>
                    <div className='card p-fluid flex flex-wrap'>
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                            <InputText disabled placeholder={selectedStadiumName} />
                        </div>
                        <div className="p-inputgroup">
                            <InputText disabled placeholder={selectedCountrie} />
                        </div>
                        <div className="p-inputgroup flex-1">
                            <InputNumber disabled placeholder={selectedRentPrice} />
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-euro"></i>
                            </span>
                        </div>
                        <div className="p-inputgroup flex-1">
                            <InputNumber disabled placeholder={selectedStaffPrice} />
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-euro"></i>
                            </span>
                        </div>
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-calendar"></i>
                            </span>
                            <Calendar value={date} disabled placeholder={date} />
                        </div>
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-clock"></i>
                            </span>
                            <InputText value={insertTime(selectedTimeStart)} disabled
                                placeholder={insertTime(selectedTimeStart)} />
                        </div>
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-clock"></i>
                            </span>
                            <InputText value={insertTime(selectedTimeEnd)} disabled
                                placeholder={insertTime(selectedTimeEnd)} />
                        </div>
                        <div className="p-inputgroup">
                            <InputText disabled placeholder={selectedFirstSponsor} />
                        </div>
                        <div className="p-inputgroup">
                            <InputText disabled placeholder={selectedSecondSponsor} />
                        </div>
                        <div className="p-inputgroup">
                            <InputText disabled placeholder={selectedThirdSponsor} />
                        </div>
                        <div className="p-inputgroup">
                            <InputNumber disabled placeholder={selectedStandardNumber} />
                        </div>
                        <div className="p-inputgroup">
                            <InputNumber disabled placeholder={selectedStandardPrice} />
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-euro"></i>
                            </span>
                        </div>
                        <div className="p-inputgroup">
                            <InputNumber disabled placeholder={selectedPremiumNumber} />
                        </div>
                        <div className="p-inputgroup">
                            <InputNumber disabled placeholder={selectedPremiumPrice} />
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-euro"></i>
                            </span>
                        </div>
                    </div>
                </div>
                <>{ScontriVis(scontriXEvento)}</>
            </>
        );

    }

    return (
        <div className='EventoView'>
            <div className='backgroundLottatore' style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundRepeat: "repeat-y",
                backgroundPosition: "center",
                height: '120vh',
                width: '99vw',
            }}>
                <div className="vlEventoView"></div>
                <h1 className='optionsText1'>
                    Aggiungi Evento ↴
                </h1>
                <h2 className='optionsText2'>
                    Aggiungi Scontri ↴
                </h2>
                <AddEvento />
                <>{GoBackStats(useLocation())}</>
            </div>
        </div>
    );
}
