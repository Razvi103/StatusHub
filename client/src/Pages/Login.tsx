import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from "../Auth.js";
import AuthCard from "../Components/Card/AuthCard.js";


function LoginPage() {
    const navigate = useNavigate()

    // const { setCurrentUser } = useAuth()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const doLogin = async (event : React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        await doSignInWithEmailAndPassword(email, password)
        navigate("/")
    }

    const onGoogleSignIn = (event : React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        doSignInWithGoogle().catch(err => {
            console.log("error")
            console.log(err);
        })
    }

    return (
        <AuthCard title="Login">
            <input value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
            <input value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={(e : React.MouseEvent<HTMLButtonElement>) => doLogin(e)}>Login</button>
            <button onClick={(e : React.MouseEvent<HTMLButtonElement>) => onGoogleSignIn(e)}>Google Sign In</button>
        </AuthCard>

    )
}

export default LoginPage;