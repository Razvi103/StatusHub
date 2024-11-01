import { useState } from "react";
import { useAuth } from "../../Hooks/useAuth";
import { doSignOut } from "../../Auth";
import { useNavigate } from "react-router-dom";
import "./UserHeader.css"

interface UserHeaderProps {
    pageName : string
}

function UserHeader( { pageName } : UserHeaderProps) {

    const {currentUser} = useAuth()
    const [displayDropdown, setDisplayDropdown] = useState(false)
    const navigate = useNavigate()

    return (
        <div className='user-header bg-surface'>
            <h1>{pageName}</h1>
            <div className="profile" onClick={() => setDisplayDropdown(!displayDropdown)}>
                { currentUser?.name.startsWith("Adrian") ?
                    <img src={"../assets/images/adrian.jpg"}/> :
                    <i className="fi fi-rr-circle-user"></i>
                }
                <div className="column">
                    <h4>{currentUser?.name ? currentUser.name : currentUser?.email?.charAt(0).toUpperCase().concat(currentUser?.email?.slice(1).split(".")[0])}</h4>
                    <label>Developer</label>
                </div>
                <div className="dropdown bg-surface sh-dark" style={{"display": displayDropdown? "block" : "none"}}>
                    <div className="dropdown-item">Account page</div>
                    <div className="dropdown-item" onClick={() => doSignOut().then(() => navigate("/"))}>Logout</div>
                </div>
            </div>
        </div>
    );
};

export default UserHeader;