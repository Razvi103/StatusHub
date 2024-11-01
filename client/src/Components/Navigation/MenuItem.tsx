import { NavLink } from "react-router-dom";
import "./MenuItem.css"

interface MenuItemProps {
    name: string,
    to: string,
    icon: string
};

function MenuItem( {name, to, icon } : MenuItemProps) {

    return (
        <NavLink to={to} className="menu-item c-light">
            <i className={"fi fi-rr-" + icon}></i>
            <p className="text">{name}</p>
        </NavLink>
    )

}

export default MenuItem;