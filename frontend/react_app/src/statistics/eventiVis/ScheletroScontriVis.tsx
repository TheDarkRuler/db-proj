import { InputNumber } from "primereact/inputnumber";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";

function ScheletroScontriVis(numScontro: number, scontriXEvento: any) {

    return (
        <div className='addScontro'>
            <div className="p-inputgroupScontri">
                <InputNumber contentEditable={false} disabled={true} placeholder={"numScontro: " + numScontro.toString()} />
            </div>
            <div className="p-inputgroup">
                <InputText disabled placeholder={scontriXEvento?.disciplina} />
            </div>
            <div className="p-inputgroup">
                <InputText disabled placeholder={scontriXEvento?.categoria} />
            </div>
            <div className="p-inputgroup">
                <InputText disabled placeholder={scontriXEvento?.primoPartecipante} />
            </div>
            <div className="p-inputgroup">
                <InputText disabled placeholder={scontriXEvento?.secondoPartecipante} />
            </div>
            <div className="p-inputgroupScontri">
                <div className="checkBox">
                    <Checkbox disabled checked={scontriXEvento?.pareggio} />
                    <label className="ml-2">Pareggio</label>
                </div>
            </div>
            <div className="p-inputgroup">
                <InputText disabled placeholder={scontriXEvento?.vincitore} />
            </div>
            <div className="p-inputgroup flex-1">
                <InputNumber disabled placeholder={scontriXEvento?.pagamentoExtra} />
                <span className="p-inputgroup-addon">
                    <i className="pi pi-euro"></i>
                </span>
            </div>
        </div>

    );
}

export { ScheletroScontriVis };