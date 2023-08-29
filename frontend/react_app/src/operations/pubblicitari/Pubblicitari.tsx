import { useLocation } from "react-router-dom";
import GoBack from "../../common/GoBack";
import background from '../../img/lottatoreBackg.jpg';
import { Delete } from "../../common/Delete";
import "./Pubblicitari.css";
import { InputText } from "primereact/inputtext";
import { useRef, useState } from "react";
import { GetElements, client } from "../../common/Getter";
import { Toast } from "primereact/toast";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { Button } from "primereact/button";

export default function Pubblicitari() {

    const fromPath = useLocation().state.fromPath;

    const AddPubblicitario = () => {
        const toast = useRef<Toast>(null);
        const buttonEl = useRef(null);
        const users = [];
        GetElements("/utenti").forEach(x => {
          const user = JSON.parse(x);
          users.push(user.username);
        });

        const [selectedUsername, setSelectedUsername] = useState(null);
        const [selectedPassword, setSelectedPassword] = useState(null);

        const accept = () => {
            if (selectedUsername !== null || selectedPassword !== null) {
                if (!users.includes(selectedUsername)) {
                    client.get(`/pubblicitari/aggiungi/:${selectedUsername}/:${selectedPassword}`);
                    setInterval(() => window.location.reload(), 1000);
                } else {
                    toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Utente già presente', life: 3000 });
                }
            } else {
                toast.current?.show({ severity: 'error', summary: 'Errore', detail: 'Dati inseriti insufficienti', life: 3000 });
            }
        };

        const reject = () => {
            toast.current?.show({ severity: 'error', summary: 'Rifiutato', detail: 'Hai Rifiutato', life: 3000 });
        }

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
            <div className='addPubbl'>
                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-user"></i>
                    </span>
                    <InputText onChange={e => setSelectedUsername(e.target.value)} placeholder="Username" />
                </div>
                <div className="p-inputgroup flex-1">
                    <InputText onChange={e => setSelectedPassword(e.target.value)} placeholder="Password" />
                </div>
                <Toast ref={toast} />
                <ConfirmPopup />
                <div>
                    <Button ref={buttonEl} onClick={confirm} severity="secondary" className='MyButtonAdd' label="Add"/>
                </div>
            </div>
        );
    };

    return (
        <div className='Sponsor'>
            <div className='backgroundTeam' style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: '100vh',
                width: '100vw',
            }}>
                <div className="vl"></div>
                <h1 className='optionsTextPubblicitario1'>
                    Aggiungi Pubblicitario ↴
                </h1>
                <h2 className='optionsTextPubblicitario2'>
                    Rimuovi Pubblicitario ↴
                </h2>
                <>{Delete('pubblicitari/', 'pubblicitari/rimuovi/', 'pubblicitariDropDown')}</>
                <AddPubblicitario />
                <>{GoBack(fromPath)} </>
            </div>
        </div>
    );
}