import { Link, useNavigate } from "react-router-dom";
import SimpleButton from "../Button/SimpleButton";
import "./TopMenu.css"

function TopMenu() {
    const navigate = useNavigate();
    
    return (
        <div className="top-menu">
            <div className="row">
                <Link to={"/"}>
                    <div className="logo">
                        <img src="assets/logos/full-logo.png" alt="logo"/>
                    </div>
                </Link>
                <div className="row">
                    <SimpleButton text="SignUp" onClick={() => navigate("/signup")} className={"bg-surface c-primary"} />
                    <SimpleButton text="Login" onClick={() => navigate("/login")} className={"bg-primary c-surface"} />
                </div>
            </div>
        </div>
    )
}

export default TopMenu;