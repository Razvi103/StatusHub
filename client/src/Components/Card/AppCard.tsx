import { useNavigate } from "react-router-dom";
import "./AppCard.css"

export interface AppInterface {
    id : number,
    name : string,
    url : string,
    interval : number,
    status : string
};

function AppCard( {id, name, url, interval, status} : AppInterface) {

    const navigate = useNavigate()

    return (
        <div onClick={ () => navigate("/app/" + id)}className={"app-card bg-surface " + status}>
            <p className="top label">Queried at: <span className="c-primary">{interval}</span> seconds</p>
            <div className="bottom">
                <h3 className="name c-dark">{name}</h3>
                <p className="url c-primary">{url}</p>
                <div className="right">
                    <h4 className={"status " + status}>STATUS: <span>{status}</span></h4>
                </div>
            </div>
        </div>
    )

}

export default AppCard;