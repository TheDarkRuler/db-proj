import { useNavigate } from "react-router-dom";
import "./Common.css"

export default function GoBack() {

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = `/Operations`;
        navigate(path, {replace: true});
    }
    
    return (
        <div className='buttonIndietro' onClick={routeChange}>
            <span> 
                Indietro  
            </span>
        </div>
    );
}