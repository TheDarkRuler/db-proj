import { useNavigate } from "react-router-dom";

export default function GoBackStats(temp: any) {

    const utente = temp.state.utente;
    const username = temp.state.username;

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/Statistics`;
        navigate(path, {state: {utente: utente, username: username}, replace: true });
    }

    return (
        <div className='buttonIndietro' onClick={routeChange}>
            <span>
                Indietro
            </span>
        </div>
    );
}