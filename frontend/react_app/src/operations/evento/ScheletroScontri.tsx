import { useRef, useState } from "react";
import { GetElements } from "../common/Getter";
import { Toast } from "primereact/toast";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { ScontroI, ScontroII, ScontroIII, ScontroIV, ScontroV, selectedScontroIII, selectedScontroIV } from "./Evento";
import { InputNumber } from "primereact/inputnumber";
import { Checkbox } from "primereact/checkbox";

function ScheletroScontri(numScontro: number) {
    
    const buttonEl = useRef(null);
    const toast = useRef<Toast>(null);
    const [selectedDiscipline, setSelectedDiscipline] = useState(null);
    const [selectedCategoria, setSelectedCategoria] = useState(null);
    const [selectedPrimoPart, setSelectedPrimoPart] = useState(null);
    const [selectedSecondoPart, setSelectedSecondoPart] = useState(null);
    const [selectedPareggio, setSelectedPareggio] = useState(false);
    const [selectedVincitore, setSelectedVincitore] = useState(null);
    const [selectedPagamento, setSelectedPagamento] = useState(null);
    const [isScontroSaved, setScontroSaved] = useState(false);

    const disciplineList = GetElements('/disciplina');
    const categorieList =  GetElements('/categoria');
    const lottatoriComplete = GetElements('/lottatore/complete');

    const renderListDisciplina = disciplineList.map((item) => 
        <option value={item}>{item}</option>
    );
    const renderListCategoria = categorieList.map((item) => 
        <option value={item}>{item}</option>
    );
    const renderListLottComp = () => {
        let temp = [];
        lottatoriComplete.forEach( x => {temp.push(JSON.parse(x))});
        return temp.filter(x => x.categoria === selectedCategoria).map((item) => 
            <option disabled={item.codiceFiscale === selectedPrimoPart || item.codiceFiscale === selectedSecondoPart} 
            value={item.codiceFiscale}>{item.codiceFiscale}</option>
        );
    }
    const pareggioChecked = () => {
        setSelectedPareggio(true);
        setSelectedVincitore("default");
    }
    const categoriaChanged = (e: string) => {
        setSelectedCategoria(e);
        setSelectedPrimoPart(null);
        setSelectedSecondoPart(null);
    }

    const accept = () => {
        if (selectedDiscipline === null || selectedCategoria === null || selectedPrimoPart === null || selectedSecondoPart === null ||
            selectedPareggio? selectedPareggio === false: selectedVincitore === null || selectedPagamento === null) {
            toast.current?.show({ severity: 'error', summary: 'Confermato', detail: 'Dati non sufficienti', life: 3000 });
        } else {
            const temp = {
                numScontro: (numScontro - 1).toString(),
                disciplina: selectedDiscipline,
                categoria: selectedCategoria,
                primoPart: selectedPrimoPart,
                secondoPart: selectedSecondoPart,
                pareggio: selectedPareggio,
                vincitore: (selectedVincitore === "default")? null: selectedVincitore,
                perdente: selectedPareggio? null: (selectedPrimoPart === selectedVincitore)? selectedSecondoPart: selectedPrimoPart,
                pagamento: selectedPagamento
            }
            switch(numScontro) {
                case (1): 
                    ScontroI(`/:${JSON.stringify(temp)}`);
                    setScontroSaved(true);
                    break;
                case (2):
                    ScontroII(`/:${JSON.stringify(temp)}`);
                    setScontroSaved(true);
                    break;
                case (3):
                    ScontroIII(`/:${JSON.stringify(temp)}`);
                    setScontroSaved(true);
                    break;
                case (4):
                    if (selectedScontroIII !== "") {
                        ScontroIV(`/:${JSON.stringify(temp)}`);
                        setScontroSaved(true);
                    } else {
                        toast.current?.show({ severity: 'error', summary: 'Rifiutato', 
                            detail: 'Inserisci Prima Gli Scontri Precedenti', life: 3000 });
                    }
                    break;
                case (5):
                    if (selectedScontroIV !== "") {
                        ScontroV(`/:${JSON.stringify(temp)}`);
                        setScontroSaved(true);
                    } else {
                        toast.current?.show({ severity: 'error', summary: 'Rifiutato', 
                            detail: 'Inserisci Prima Gli Scontri Precedenti', life: 3000 });
                    }
                    break;
            }
            toast.current?.show({ severity: 'info', summary: 'Confermato', detail: 'Hai Accettato', life: 3000 });
        }
    };

    const reject = () => {
        toast.current?.show({ severity: 'warn', summary: 'Rifiutato', detail: 'Hai Rifiutato', life: 3000 });
    };

    const confirm = (event: { currentTarget: any; }) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Sicuro di voler aggiungere questo Scontro all\'Evento?',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept,
            reject
        });
    };

    const resetScontro = () => {
        setScontroSaved(false);
        switch(numScontro) {
            case 1: ScontroI(""); break;
            case 2: ScontroII(""); break;
            case 3: ScontroIII(""); break;
            case 4: ScontroIV(""); break;
            case 5: ScontroV(""); break;
        };
    }

    return (
        <>
            <div hidden={isScontroSaved} className='addScontro'>
                <div className="p-inputgroupScontri">
                    <InputNumber contentEditable={false} disabled={true} placeholder={"numScontro: " + numScontro.toString()}/>
                </div>
                <div className="p-inputgroupScontri">
                    <select value={selectedDiscipline} className="DropDownFirst" onChange={ e => setSelectedDiscipline(e.target.value) }>
                        <option selected={selectedDiscipline === null} disabled hidden value="default">
                            --Disciplina--
                        </option>
                        {renderListDisciplina}
                    </select>
                </div>
                <div className="p-inputgroupScontri">
                    <select value={selectedCategoria} className="DropDownFirst" onChange={ (e) => categoriaChanged(e.target.value) }>
                        <option selected={selectedCategoria === null} disabled hidden value="default">
                            --Categoria--
                        </option>
                        {renderListCategoria}
                    </select>
                </div>
                <div className="p-inputgroupScontri">
                    <select value={selectedPrimoPart} disabled={selectedCategoria==null || selectedDiscipline==null} className="DropDownFirst" 
                            onChange={ e => setSelectedPrimoPart(e.target.value) }>
                        <option selected={selectedPrimoPart === null} disabled hidden value="default">
                            --Primo Partecipante--
                        </option>
                        {renderListLottComp()}
                    </select>
                </div>
                <div className="p-inputgroupScontri">
                    <select value={selectedSecondoPart} disabled={selectedCategoria==null || selectedDiscipline==null} 
                        className="DropDownFirst" onChange={ e => setSelectedSecondoPart(e.target.value) }>
                        <option selected={selectedSecondoPart === null} disabled hidden value="default">
                            --Secondo Partecipante--
                        </option>
                        {renderListLottComp()}
                    </select>
                </div>
                <div className="p-inputgroupScontri">
                    <div className="checkBox">
                        <Checkbox disabled={selectedPrimoPart===null || selectedSecondoPart===null} checked={selectedPareggio} 
                            onChange={() => selectedPareggio? setSelectedPareggio(false): pareggioChecked()} />
                        <label className="ml-2">Pareggio</label>
                    </div>
                </div>
                <div className="p-inputgroupScontri">
                    <select value={selectedVincitore} defaultValue={"default"} 
                        disabled={selectedPrimoPart===null || selectedSecondoPart===null || selectedPareggio} 
                        className="DropDownFirst" onChange={ e => setSelectedVincitore(e.target.value) }>
                        <option selected={selectedVincitore === "default"} disabled hidden value="default">
                            --Vincitore--
                        </option>
                        <option value={selectedPrimoPart}>
                            {selectedPrimoPart}
                        </option>
                        <option value={selectedSecondoPart}>
                            {selectedSecondoPart}
                        </option>
                    </select>
                </div>
                <div className="p-inputgroup flex-1">
                    <InputNumber onChange={e => setSelectedPagamento(e.value)} placeholder={"Pagamento Extra"}/>
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-euro"></i>
                    </span>
                </div>
            </div>
            <Toast ref={toast} />
            <ConfirmPopup />
            <div hidden={isScontroSaved}>
                <button ref={buttonEl} onClick={confirm} className='buttonAddScontro'>Add</button>
            </div>
            <div  hidden={!isScontroSaved}>
                <p>Sontro salvato con successo!</p>
                <button onClick={() => resetScontro()} className="buttonRemoveScontro">rimuovi</button>
            </div>
        </>

    );
}

export { ScheletroScontri };