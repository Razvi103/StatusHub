import { useEffect, useState } from "react";
import UserHeader from "../../Components/Navigation/UserHeader";
import AppCard, { AppInterface } from "../../Components/Card/AppCard";
import axios from "axios";
import { BACK_URL } from "../../App";
import { useAuth } from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import IconButton from "../../Components/Button/IconButton";
import "./AppList.css"

function AppList() {

    const navigate = useNavigate()
    const { currentUser } = useAuth()

    const [apps, setApps] = useState<AppInterface[]>([])
    
    useEffect( () => {
        setData()
    }, [])

    useEffect( () => {
        setData()
    }, [currentUser])

    const getApps = async () => {
        const response = await axios.get(BACK_URL + "/apps", {params: {user_id: currentUser?.id}});
        console.log(response.data);
        return response.data;
    }

    const setData = async () => {
        setApps(await getApps());
    }

    return (
        <div className="app-list">
            <UserHeader pageName={"Overview"} />
            <div className="page-content">
                <div className="top-bar">
                    <div className="left-items">
                        <h2>Your apps</h2>
                        <p className="label">All of the apps you work on will appear on this page.</p>
                    </div>
                    <div className="right-items bg-surface sh-light">
                        <h3>Total: <span className="c-primary">{apps.length}</span></h3>
                    </div>
                </div>
                <div className="grid">
                    {apps.map( (app) => {
                        return (
                            <AppCard key={app.id} name={app.name} url={app.url} interval={app.interval} status={app.status} id={app.id}></AppCard>
                        )
                    })}
                    <IconButton text={"ADD"} onClick={ () => navigate("/add-app") } className={"add-app c-primary"} icon={"plus"}></IconButton>
                </div>
            </div>
        </div>
    )

}

export default AppList;