import { useAuth } from "../../Hooks/useAuth";
import MenuItem from "./MenuItem";
import "./Menu.css"

function Menu() {
    
    const { userLoggedIn } = useAuth()
    
    return (
        <div className="menu">
            <div className="logo">
                <img src="/assets/logos/full-logo.png"/>
            </div>
            <div className="divider bg-background"></div>
            <div className="links">
                <MenuItem name={"Overview"}     to={"/"}            icon={"home"}></MenuItem>
                <MenuItem name={"Add app"}      to={"/add-app"}     icon={"apps-add"}></MenuItem>
                {/* <MenuItem name={"Report bug"}   to={"/report-bug"}  icon={"bug"}></MenuItem> */}
            </div>
        </div>
    )
}

export default Menu;