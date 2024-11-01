import { useState } from "react";
import { NavLink } from "react-router-dom";
import { doCreateUserWithEmailAndPassword } from "../../Auth";
import AuthCard from "../../Components/Card/AuthCard";
import SimpleButton from "../../Components/Button/SimpleButton";

function SignUpPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false)

    const doSignUp = async (event : React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (!isRegistering) {
            setIsRegistering(true)
            await doCreateUserWithEmailAndPassword(email, password)
        }
    }

    return (
        <AuthCard title="Sign up">
            <input value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
            <input value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
            <SimpleButton text="Sign up" onClick={(e: React.MouseEvent<HTMLButtonElement>) => doSignUp(e)} className={"button"} />
        </AuthCard>
    )
}

export default SignUpPage;