import { useState } from "react";
import InputField from "../Input/InputField";
import "./LineEndpoint.css"

export interface EndpointProps {
    id : number,
    url : string,
    setUrl : (newUrl : string) => void,
    method : string,
    setMethod : (newMethod : string) => void,
    remove : () => void
};

function LineEndpoint( { id, url, method, setUrl, setMethod, remove } : EndpointProps) {

    const [errorMessage, setErrorMessage] = useState(false)

    const isValidUrl = (url: string): boolean => {
        const urlPattern: RegExp = /^(ftp|http|https):\/\/[^ "]+(\.[^ "]+)+$/;
        return urlPattern.test(url);
    }

    return (
        <div className="line-endpoint">
            <div className="left-side">
                <p className="endpoint-id c-light">{id}</p>

                <InputField label={""} value={url} setValue={ (newValue) => {
                    if (!isValidUrl(newValue))
                        setErrorMessage(true)
                    else
                        setErrorMessage(false)
                    setUrl(newValue)
                }} type={"text"} placeholder={"Enter a URL"} className={"horizontal"} />

                {errorMessage ? <p className="error-box c-error">Invalid URL</p> : <p className="error-box"></p>}
            </div>
            
            <div className="right-side">

                <select value={method} onChange={(val) => setMethod(val.target.value)}>
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                </select>

                <div className="remove" onClick={() => remove()}>
                    <i className="fi fi-rr-minus"></i>
                </div>
            </div>
        </div>
    )

}

export default LineEndpoint;