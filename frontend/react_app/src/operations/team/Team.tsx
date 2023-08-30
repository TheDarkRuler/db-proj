import { useRef, useState } from 'react';
import background from '../../img/lottatoreBackg.jpg';
import { Delete } from '../../common/Delete';
import GoBack from '../../common/GoBack';
import { client } from '../../common/Getter';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { countries } from 'unique-names-generator';
import { useLocation } from 'react-router-dom';

export default function Team() {

    const username = useLocation().state.username;

    function AddTeam() {
        const buttonEl = useRef(null);
        const toast = useRef<Toast>(null);
        const [selectedTeamName, setSelectedTeamName] = useState("");
        const [selectedCEO, setSelectedCEO] = useState("");
        const [selectedCountrie, setSelectedCountrie] = useState("");
        const renderListStati = countries.map((item) => 
            <option value={item}>{item}</option>
        );

        const accept = () => {
            if (selectedTeamName === "" || selectedCEO === "" || selectedCountrie === "") {
                toast.current?.show({ severity: 'error', summary: 'Confirmed', detail: 'Dati non sufficienti', life: 3000 });
            } else {
                client.get(`/team/aggiungi/:${selectedTeamName}/:${selectedCEO}/:${selectedCountrie}`);
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
            <div className='addTeam'>
                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-users"></i>
                    </span>
                    <InputText onChange={e => setSelectedTeamName(e.target.value)} placeholder="Nome Team" />
                </div>
                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-user"></i>
                    </span>
                    <InputText onChange={e => setSelectedCEO(e.target.value)} placeholder="Nome Responsabile" />
                </div>
                <div className="p-inputgroup">
                    <select className="DropDownFirst" onChange={ e => setSelectedCountrie(e.target.value) }>
                        <option selected={true} disabled hidden value="default">
                            --Paese di origine--
                        </option>
                        {renderListStati}
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

    return (
        <div className='Team'>
            <div className='backgroundTeam' style={{backgroundImage: `url(${background})`, 
                backgroundSize: 'cover',
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: '100vh',
                width: '100vw',
            }}>  
                <div className="vl"></div>
                <h1 className='optionsText1'>
                    Aggiungi Team ↴
                </h1>
                <h2 className='optionsText2'>
                    Rimuovi Team ↴
                </h2> 
                <>{Delete('team/', 'team/rimuovi/', 'teamDropDown')}</>
                <AddTeam />
                <>{GoBack(username)}</>
            </div>
        </div>
    );
}