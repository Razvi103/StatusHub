import { useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth.js";
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from "../../Auth.js";

function LoginPage() {
    const { userLoggedIn } = useAuth()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSigningIn, setIsSigningIn] = useState(false);

    const doLogin = async (event : React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        console.log("login")
        if(!isSigningIn) {
            setIsSigningIn(true)
            await doSignInWithEmailAndPassword(email, password)
        }
    }

    const onGoogleSignIn = (event : React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if(!isSigningIn) {
            setIsSigningIn(true)
            doSignInWithGoogle().catch(err => {
                setIsSigningIn(false)
            })
        }
    }

    return (
        <>
            {userLoggedIn && ( <Navigate to={"/home"} replace={true} /> )}
            <div>LoginPage</div>

            <input value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
            <input value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={(e : React.MouseEvent<HTMLButtonElement>) => doLogin(e)}>Login</button>
            <button onClick={(e : React.MouseEvent<HTMLButtonElement>) => onGoogleSignIn(e)}>Google Sign In</button>
        </>

    )
}

export default LoginPage;