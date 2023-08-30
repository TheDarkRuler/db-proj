import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import { GetElements, client } from "../../common/Getter";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import background from '../../img/lottatoreBackg.jpg';
import "./EditLottatore.css"
import GoBack from "../../common/GoBack";
import { useLocation } from "react-router-dom";

export default function EditLottatore() {

    const username = useLocation().state.username;

    function Edit() {
        const buttonEl = useRef(null);
        const toast = useRef<Toast>(null);
        const [date, setDate] = useState(null);
        const [selectedDiscipline, setSelectedDiscipline] = useState(null);
        const [selectedTeam, setSelectedTeam] = useState(null);
        const [selectedName, setSelectedName] = useState("");
        const [selectedSurame, setSelectedSurname] = useState("");
        const [selectedCF, setSelectedCF] = useState("");
        const [selectedPeso, setSelectedPeso] = useState("");
        const [lottScelto, setLottScelto] = useState(true);
        const [selectedVittorie, setSelectedVittorie] = useState(null);
        const [selectedSconfitte, setSelectedSconfitte] = useState(null);
        const [selectedPareggi, setSelectedPareggi] = useState(null);
        const lottatoriComplete = GetElements(`/lottatore/complete`);
        const renderListDisipline = GetElements("/disciplina").map((item) => 
            <option value={item}>{item}</option>
        );
        const renderListTeam = GetElements("/team").map((item) => 
            <option value={item}>{item}</option>
        );
        const renderListLottatori = GetElements("/lottatore").map((item) => 
            <option value={item}>{item}</option>
        );

        const accept = () => {
            if (selectedCF === "" || selectedDiscipline === "" || selectedName === "" || selectedPeso === "" || 
                    selectedSurame === "" || selectedTeam === "" || date === "" || selectedPareggi === null ||
                    selectedSconfitte === null || selectedVittorie === null) {
                toast.current?.show({ severity: 'error', summary: 'Confermato', detail: 'Dati non sufficienti', life: 3000 });
            } else {
                const tempRecord = {
                    vittorie: selectedVittorie,
                    sconfitte: selectedSconfitte,
                    pareggi: selectedPareggi
                };
                const tempLottatore = {
                    nome: selectedName,
                    cognome: selectedSurame,
                    cf: selectedCF,
                    date: date,
                    peso: selectedPeso,
                    team: selectedTeam,
                    disciplina: selectedDiscipline
                };
                client.get(`/lottatore/modifica/:${JSON.stringify(tempLottatore)}/:${JSON.stringify(tempRecord)}`);
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
                message: 'Sicuro di voler modificare questo Record?',
                icon: 'pi pi-info-circle',
                acceptClassName: 'p-button-danger',
                accept,
                reject
            });
        };

        const insertMemberData = (cf: string) => {
            let temp = [];
            lottatoriComplete.forEach( x => {temp.push(JSON.parse(x))});
            temp.forEach(x => {
                if (x.codiceFiscale === cf) {
                    setSelectedCF(x.codiceFiscale);
                    setLottScelto(false);
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
                <div className='editMember'>
                    <div className="p-inputgroup">
                        <select className="DropDownFirst" onChange={ e => insertMemberData(e.target.value) }>
                            <option selected={true} disabled hidden value="default">
                                --Membro da modificare--
                            </option>
                            {renderListLottatori}
                        </select>
                    </div>
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <InputText disabled={lottScelto} onChange={e => setSelectedName(e.target.value)} placeholder={selectedName} />
                    </div>
                    <div className="p-inputgroup">
                        <InputText disabled={lottScelto} onChange={e => setSelectedSurname(e.target.value)} placeholder={selectedSurame} />
                    </div>
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-calendar"></i>
                        </span>
                        <Calendar disabled={lottScelto} value={date} onChange={(e) => setDate(e.value)} placeholder={date}/>
                    </div>
                    <div className="p-inputgroup flex-1">
                        <InputNumber disabled={lottScelto} onChange={e => setSelectedPeso(e.value === null? "" : e.value.toString())} 
                            placeholder={selectedPeso} />
                        <span className="p-inputgroup-addon">Kg</span>
                    </div>
                    <div className="p-inputgroup">
                        <select disabled={lottScelto} value={selectedDiscipline} className="DropDownFirst" placeholder={selectedDiscipline} 
                            onChange={ e => setSelectedDiscipline(e.target.value) }>
                            <option selected={true} disabled hidden value="default">
                            </option>
                            {renderListDisipline}
                        </select>
                    </div>
                    <div className="p-inputgroup">
                        <select disabled={lottScelto} value={selectedTeam} className="DropDownSecond" placeholder={selectedTeam} 
                            onChange={ e => setSelectedTeam(e.target.value) }>
                            <option selected={true} disabled hidden value="default">
                            </option>
                            {renderListTeam}
                        </select>
                    </div>
                    <Toast ref={toast} />
                    <ConfirmPopup />
                    <div>
                        <Button ref={buttonEl} onClick={confirm} severity="secondary" className='buttonAddEdit' label="Edit"/>
                    </div>
                </div>
                <div className="editRecord">
                    <div className="p-inputgroup flex-1">
                        <InputNumber disabled={lottScelto} onChange={e => setSelectedVittorie(e.value === null? "" : e.value.toString())} 
                            placeholder={selectedVittorie} />
                    </div>
                    <div className="p-inputgroup flex-1">
                        <InputNumber disabled={lottScelto} onChange={e => setSelectedSconfitte(e.value === null? "" : e.value.toString())} 
                            placeholder={selectedSconfitte} />
                    </div>
                    <div className="p-inputgroup flex-1">
                        <InputNumber disabled={lottScelto} onChange={e => setSelectedPareggi(e.value === null? "" : e.value.toString())} 
                            placeholder={selectedPareggi} />
                    </div>
                </div>
            </>
        ); 
    }

    return (
        <div className="EditLottatore">
            <div className='backgroundLottatore' style={{backgroundImage: `url(${background})`, 
                backgroundSize: 'cover',
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: '100vh',
                width: '100vw',
                }}>
                <h1 className='textEdit'>
                    Seleziona un membro da modificare ↴
                </h1>
                <h1 className='textEditRecord'>
                    Record ↴
                </h1>
                <Edit/>
                <>{GoBack(username)}</>
            </div>
        </div>
    );
}