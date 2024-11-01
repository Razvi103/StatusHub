import { useNavigate, useParams } from "react-router-dom";
import UserHeader from "../../Components/Navigation/UserHeader";
import axios from "axios";
import { BACK_URL } from "../../App";
import { useEffect, useState } from "react";
import InfoCard from "../../Components/Card/InfoCard";
import LineChart from "../../Components/Chart/LineChart";
import BugList from "../../Components/Card/BugList";
import EndpointList, { Endpoint } from "../../Components/Card/EndpointList";
import "./AppDashboard.css"
import PieChart from "../../Components/Chart/PieChart";
import IconButton from "../../Components/Button/IconButton";

interface Bugs {
    reported_date : string,
    description : string,
    endpoint_id : number,
    is_solved : boolean
}

interface User {
    id : number,
    name : string,
    email : string,
    username : string,
    phone_number : string | null
}

interface AppData {
    id : number,
    name : string,
    url : string,
    interval : number,
    status : string,
    join_code : string,
    endpoints : Endpoint[],
    bugs : Bugs[],
    users : User[],
    total_stable : number,
    total_unstable : number,
    total_down : number
}

function AppDashboard () {
    const { appId } = useParams();
    const navigate = useNavigate();

    const [app, setApp] = useState<AppData | null>()

    useEffect( () => {
        setData()
    }, [])

    const setData = async () => {
        setApp(await getApp());
    }

    const getApp = async () => {
        const response = await axios.get(BACK_URL + "/app", {params: {app_id: appId}});
        console.log(response.data);
        return response.data;
    }

    return (
        <div className="app-dashboard">
            <UserHeader pageName={app?.name ? app.name : "Invalid app"} />
            <div className="page-content ">

                <div className="top-bar">
                    <div className="left-items">
                        <h2>Dashboard</h2>
                        {/* TODO make url clickable */}
                        <p className="label c-primary">{app?.url}</p>
                    </div>
                    <div className="top-row">
                        <IconButton text={"Report bug"} onClick={ () => navigate("/report-bug")} className={"bug b-error c-error bg-surface"} icon={"bugs"}></IconButton>
                        <div className="right-items bg-surface sh-light">
                            <h3>Join code: <span className="c-primary">{app?.join_code}</span></h3>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <InfoCard 
                        title={"application status"} 
                        text={app?.status ? app.status : "unknown"} 
                        icon={"info"} 
                        className={"bg-secondary c-surface"} 
                    />
                    <InfoCard 
                        title={"no. of endpoint"} 
                        text={app?.endpoints.length ? app.endpoints.length.toString() : "0" } 
                        icon={"transformation-block"} 
                        className={"bg-tertiary c-surface"} 
                    />
                    <InfoCard 
                        title={"no. of unsolved bugs"} 
                        text={app?.bugs.filter( bug => !bug.is_solved ).length ? app?.bugs.filter( bug => !bug.is_solved ).length.toString() : "0" } 
                        icon={"bugs"} 
                        className={"bg-error c-surface"} 
                    />
                    <InfoCard 
                        title={"no. of users on project"} 
                        text={app?.users.length ? app.users.length.toString() : "0"} 
                        icon={"users"} 
                        className={"bg-warning c-surface"} 
                    />
                </div>

                <div className="dashboard-content bg-surface">
                    <LineChart appId={app?.id ? app.id : 1} />
                    <BugList bugs={app?.bugs ? app.bugs : []}/>
                    <EndpointList endpoints={app?.endpoints ? app.endpoints : []}/>
                    <PieChart appId={app?.id ? app.id : 1} />
                </div>
            </div>
        </div>
    )
}

export default AppDashboard;