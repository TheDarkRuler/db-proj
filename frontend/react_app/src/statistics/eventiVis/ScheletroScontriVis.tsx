import { useState } from "react";
import { GetElements } from "../../common/Getter";
import { InputNumber } from "primereact/inputnumber";
import { Checkbox } from "primereact/checkbox";

function ScheletroScontriVis(numScontro: number) {

    const [selectedDiscipline, setSelectedDiscipline] = useState(null);
    const [selectedCategoria, setSelectedCategoria] = useState(null);
    const [selectedPrimoPart, setSelectedPrimoPart] = useState(null);
    const [selectedSecondoPart, setSelectedSecondoPart] = useState(null);
    const [selectedPareggio, setSelectedPareggio] = useState(false);
    const [selectedVincitore, setSelectedVincitore] = useState(null);
    const [selectedPagamento, setSelectedPagamento] = useState(null);
    const [isScontroSaved, setScontroSaved] = useState(false);

    const pareggioChecked = () => {
        setSelectedPareggio(true);
        setSelectedVincitore("default");
    }
    const categoriaChanged = (e: string) => {
        setSelectedCategoria(e);
        setSelectedPrimoPart(null);
        setSelectedSecondoPart(null);
    }

    return (
        <div hidden={isScontroSaved} className='addScontro'>
            <div className="p-inputgroupScontri">
                <InputNumber contentEditable={false} disabled={true} placeholder={"numScontro: " + numScontro.toString()} />
            </div>
            <div className="p-inputgroupScontri">
                <select value={selectedDiscipline} className="DropDownFirst" onChange={e => setSelectedDiscipline(e.target.value)}>
                    <option selected={selectedDiscipline === null} disabled hidden value="default">
                        --Disciplina--
                    </option>
                </select>
            </div>
            <div className="p-inputgroupScontri">
                <select value={selectedCategoria} className="DropDownFirst" onChange={(e) => categoriaChanged(e.target.value)}>
                    <option selected={selectedCategoria === null} disabled hidden value="default">
                        --Categoria--
                    </option>
                </select>
            </div>
            <div className="p-inputgroupScontri">
                <select value={selectedPrimoPart} disabled={selectedCategoria == null || selectedDiscipline == null} className="DropDownFirst"
                    onChange={e => setSelectedPrimoPart(e.target.value)}>
                    <option selected={selectedPrimoPart === null} disabled hidden value="default">
                        --Primo Partecipante--
                    </option>
                </select>
            </div>
            <div className="p-inputgroupScontri">
                <select value={selectedSecondoPart} disabled={selectedCategoria == null || selectedDiscipline == null}
                    className="DropDownFirst" onChange={e => setSelectedSecondoPart(e.target.value)}>
                    <option selected={selectedSecondoPart === null} disabled hidden value="default">
                        --Secondo Partecipante--
                    </option>
                </select>
            </div>
            <div className="p-inputgroupScontri">
                <div className="checkBox">
                    <Checkbox disabled={selectedPrimoPart === null || selectedSecondoPart === null} checked={selectedPareggio}
                        onChange={() => selectedPareggio ? setSelectedPareggio(false) : pareggioChecked()} />
                    <label className="ml-2">Pareggio</label>
                </div>
            </div>
            <div className="p-inputgroupScontri">
                <select value={selectedVincitore} defaultValue={"default"}
                    disabled={selectedPrimoPart === null || selectedSecondoPart === null || selectedPareggio}
                    className="DropDownFirst" onChange={e => setSelectedVincitore(e.target.value)}>
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
                <InputNumber onChange={e => setSelectedPagamento(e.value)} placeholder={"Pagamento Extra"} />
                <span className="p-inputgroup-addon">
                    <i className="pi pi-euro"></i>
                </span>
            </div>
        </div>

    );
}

export { ScheletroScontriVis };