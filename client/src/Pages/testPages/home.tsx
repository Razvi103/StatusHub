import { useNavigate } from "react-router-dom";
import { doSignOut } from "../../Auth";
import { useAuth } from "../../Hooks/useAuth";

function HomePage () {
    const navigate = useNavigate()
    const { currentUser } = useAuth()

    return (
        <>
            <div>Home</div>
            <div>User: {currentUser?.displayName ? currentUser.displayName : currentUser?.email}</div>
            <button onClick={() => doSignOut().then(() => navigate("/"))}>SignOut</button>
        </>
    )

}

export default HomePage;