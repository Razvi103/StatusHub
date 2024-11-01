import SimpleButton from "../Components/Button/SimpleButton";
import SearchBar from "../Components/Input/SearchBar";
import { useState } from "react";
import "./Home.css"

function Home () {
    const [inputString, setInputString] = useState<string>("")

    function doSearch(inputString: string): void {
        console.log("do search: " + inputString)
    }

    return (
        <div className="home-page">
            <div className="row">
                <SearchBar value={inputString} setValue={ (newValue : string) => setInputString(newValue)} placeholder={"Search for an application"} className={""} type={"text"} label={"Label"} icon={""} required={true} />
                <SimpleButton text={"Search"} onClick={() => doSearch(inputString)} className={""}></SimpleButton>
            </div>
        </div>
    )
}

export default Home;