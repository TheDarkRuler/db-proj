import { useNavigate } from "react-router-dom";
import "./Common.css"

export default function GoBack(fromPath: string) {

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = `/Operations`;
        navigate(path, {state:{fromPath: fromPath}, replace: true});
    }
    
    return (
        <div className='buttonIndietro' onClick={routeChange}>
            <span> 
                Indietro  
            </span>
        </div>
    );
}