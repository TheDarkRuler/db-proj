import { useState } from "react";
import { GetElements, client } from "../../common/Getter";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import background from '../../img/statisticsBack.jpg';
import "./VisLottatori.css"
import { useLocation } from "react-router-dom";
import GoBackStats from "../commonStat/GoBackStats";

export default function VisLottatori() {

    function Edit() {
        const [date, setDate] = useState(null);
        const [selectedDiscipline, setSelectedDiscipline] = useState(null);
        const [selectedTeam, setSelectedTeam] = useState(null);
        const [selectedName, setSelectedName] = useState("");
        const [selectedSurame, setSelectedSurname] = useState("");
        const [selectedPeso, setSelectedPeso] = useState("");
        const [selectedVittorie, setSelectedVittorie] = useState(null);
        const [selectedSconfitte, setSelectedSconfitte] = useState(null);
        const [selectedPareggi, setSelectedPareggi] = useState(null);
        const lottatoriComplete = GetElements(`/lottatore/complete`);
        const renderListLottatori = GetElements("/lottatore").map((item) => 
            <option value={item}>{item}</option>
        );


        const insertMemberData = (cf: string) => {
            let temp = [];
            lottatoriComplete.forEach( x => {temp.push(JSON.parse(x))});
            temp.forEach(x => {
                if (x.codiceFiscale === cf) {
                    setDate(x.dataNascita);
                    setSelectedDiscipline(x.arteMarziale);
                    setSelectedName(x.nome);
                    setSelectedSurname(x.cognome);
                    setSelectedPeso(x.peso);
                    setSelectedTeam(x.team);
                    client.get(`/record/:${x.codiceFiscale}`).then((response) => {
                        let temp = JSON.parse(response.data);
                        setSelectedPareggi(temp.pareggi);
                        setSelectedSconfitte(temp.sconfitte);
                        setSelectedVittorie(temp.vittorie);
                    });
                }}
            )
        }

        return (
            <>
                <div className='viewMember'>
                    <div className="p-inputgroup">
                        <select className="DropDownFirst" onChange={ e => insertMemberData(e.target.value) }>
                            <option selected={true} disabled hidden value="default">
                                --Membro da visualizzare--
                            </option>
                            {renderListLottatori}
                        </select>
                    </div>
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <InputText disabled placeholder={selectedName} />
                    </div>
                    <div className="p-inputgroup">
                        <InputText disabled placeholder={selectedSurame} />
                    </div>
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-calendar"></i>
                        </span>
                        <Calendar disabled value={date} placeholder={date}/>
                    </div>
                    <div className="p-inputgroup flex-1">
                        <InputNumber disabled placeholder={selectedPeso} />
                        <span className="p-inputgroup-addon">Kg</span>
                    </div>
                    <div className="p-inputgroup">
                        <InputText disabled placeholder={selectedDiscipline} />
                    </div>
                    <div className="p-inputgroup">
                        <InputText disabled placeholder={selectedTeam} />
                    </div>
                </div>
                <div className="viewLottRecord">
                    <div className="p-inputgroup flex-1">
                        <InputNumber disabled placeholder={selectedVittorie} />
                    </div>
                    <div className="p-inputgroup flex-1">
                        <InputNumber disabled placeholder={selectedSconfitte} />
                    </div>
                    <div className="p-inputgroup flex-1">
                        <InputNumber disabled placeholder={selectedPareggi} />
                    </div>
                </div>
            </>
        ); 
    }

    return (
        <div className="VisLottatori">
            <div className='backgroundLottatore' style={{backgroundImage: `url(${background})`, 
                backgroundSize: 'cover',
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: '100vh',
                width: '100vw',
                }}>
                <h1 className='textViewLott'>
                    Seleziona un membro da visualizzare ↴
                </h1>
                <h1 className='textViewLottRecord'>
                    Record ↴
                </h1>
                <Edit/>
                <>{GoBackStats(useLocation())}</>
            </div>
        </div>
    );
}