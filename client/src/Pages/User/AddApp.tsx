import { useState } from "react";
import SimpleButton from "../../Components/Button/SimpleButton";
import UserHeader from "../../Components/Navigation/UserHeader";
import InputField from "../../Components/Input/InputField";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACK_URL } from "../../App";
import { useAuth } from "../../Hooks/useAuth";
import LineEndpoint from "../../Components/Endpoint/LineEndpoint";
import IconButton from "../../Components/Button/IconButton";
import AddAppSection from "../../Components/Section/AddAppSection";
import "./AddApp.css"

function AddApp () {

    const navigate = useNavigate()
    const { currentUser } = useAuth()

    const [appCode, setAppCode] = useState<string>("")
    const [newAppName, setNewAppName] = useState<string>("")
    const [newAppUrl, setNewAppUrl] = useState<string>("")
    const [newAppInterval, setNewAppInterval] = useState<number>(0)

    const [endpointsUrls, setEndpointsUrls] = useState<string[]>([""])
    const [endpointsMethods, setEndpointsMethods] = useState<string[]>(["GET"])
    const [numberOfEndpoints, setNumberOfEndPoints] = useState<number>(1)

    const doAddApp = async () => {
        // TODO validate code format
        const response = await axios.post(BACK_URL + "/join_app", {"user_id": currentUser?.id, "join_code": appCode} );
        console.log(response.data)
    }

    const doCreateApp = async () => {
        const response = await axios.post(BACK_URL + "/add_app", {"name": newAppName, "interval": newAppInterval, "url": newAppUrl, "user_id": currentUser?.id, "endpoint_urls": endpointsUrls, "endpoint_methods": endpointsMethods} );
        console.log(response.data)
        console.log(endpointsMethods)
        navigate("/")
    }

    const updateEndpointsUrls = (newValue : string, index : number) => {
        setEndpointsUrls(
            endpointsUrls.slice(0, index)
                .concat(newValue)
                .concat(endpointsUrls.slice(index + 1)
            )
        )
    }
    const updateEndpointsMethods = (newValue : string, index : number) => {
        setEndpointsMethods(
            endpointsMethods.slice(0, index)
                .concat(newValue)
                .concat(endpointsMethods.slice(index + 1)
            )
        )
    }

    const removeEndpoint = (index : number) => {
        if (numberOfEndpoints > 0) {
            setEndpointsUrls(
                endpointsUrls.slice(0, index)
                    .concat(endpointsUrls.slice(index + 1)
                )
            )
            setEndpointsMethods(
                endpointsMethods.slice(0, index)
                    .concat(endpointsMethods.slice(index + 1)
                )
            )
            // TODO check 0
            setNumberOfEndPoints(numberOfEndpoints-1)
        }
    }

    return (
        <div className="add-app">
            <UserHeader pageName={"Add an application"} />
            <div className="page-content">

                <AddAppSection title={"Add an existing app"} label={"You can join an already existing app just by entering the apps code."} className="join-app-section">
                    <div className="row">
                        <InputField value={appCode} 
                                    setValue={ (newValue) => setAppCode(newValue) } 
                                    placeholder={"Enter app code"} 
                                    className={"horizontal"} 
                                    type={"text"} 
                                    label={"App code:"}
                        />
                        <IconButton text={"Join app"} onClick={ () => doAddApp() } className={"bg-primary c-surface"} icon={"link-slash-alt"} />
                    </div>
                </AddAppSection>

                <AddAppSection title={"Create a new app"} label={"You can register a new application to the platform"} className={"create-app-section"}>
                    <div className="row">
                        <InputField value={newAppName} 
                                    setValue={ (newValue) => setNewAppName(newValue) } 
                                    placeholder={"Enter an app name"} 
                                    className={"horizontal c-light"} 
                                    type={"text"} 
                                    label={"Application name:"} 
                        />
                        <InputField value={newAppInterval} 
                                    setValue={ (newValue) => setNewAppInterval(newValue) } 
                                    placeholder={"Enter app code"} 
                                    className={"interval horizontal c-light"} 
                                    type={"number"} 
                                    label={"Interval for testing:"} 
                        />
                    </div>
                    <InputField value={newAppUrl} 
                                setValue={ (newValue) => setNewAppUrl(newValue) } 
                                placeholder={"Enter an url"} 
                                className={"horizontal c-light"} 
                                type={"text"} 
                                label={"Application url:"} 
                    />
                    

                    <h3 className="sub-title c-dark">Endpoints</h3>

                    {/* TODO header */}
                    <div className="line-endpoint labels">
                        <div className="left-side">
                            <p className="endpoint-id c-light">Id</p>
                            <p className="input-label c-light">URL</p>
                            <p className="error-box c-light"></p>
                        </div>
                        <div className="right-side">
                            <p className="select c-light">Method</p>
                        </div>
                    </div>

                    {[...Array(numberOfEndpoints)].map((_, index) => (
                        <LineEndpoint key={index}
                            id={index}
                            url={endpointsUrls[index]}
                            setUrl={ (newUrl) => updateEndpointsUrls(newUrl, index)}
                            method={endpointsMethods[index]}
                            setMethod={ (newMethod) => updateEndpointsMethods(newMethod, index)} 
                            remove={ () => removeEndpoint(index) } />
                    ))}
                    <div className="right-side">
                        <IconButton text={"Add endpoint"} onClick={ () => {
                            setNumberOfEndPoints(numberOfEndpoints + 1)
                            setEndpointsUrls(endpointsUrls.concat(""))
                            setEndpointsMethods(endpointsMethods.concat("GET"))
                        }} className={"c-light b-light b-md add-endpoint"} icon={""} />
                        <IconButton text={"Create app"} 
                                    onClick={ () => doCreateApp() } 
                                    className={"bg-primary c-surface"} 
                                    icon={"plus"} 
                        />
                    </div>
                </AddAppSection>

            </div>
        </div>
    )
}

export default AddApp;