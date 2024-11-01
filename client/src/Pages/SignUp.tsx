import { useState } from "react";
import { doCreateUserWithEmailAndPassword } from "../Auth";
import AuthCard from "../Components/Card/AuthCard";
import SimpleButton from "../Components/Button/SimpleButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACK_URL } from "../App";


function SignUpPage() {
    const navigate = useNavigate()

    const [name, setName] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const createUser = async () => {
        const response = await axios.post(BACK_URL + "/add_user", {"name": name, "username": username, "email": email});
        console.log(response.data);
        return response.data;
    }

    const doSignUp = async (event : React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (password == confirmPassword) {
            await doCreateUserWithEmailAndPassword(email, password)
            await createUser()
        }
        else {
            setErrorMessage("Passwords don't match")
        }
    }

    return (
        <AuthCard title="Sign up">
            <input value={name} placeholder="Enter a name..." onChange={(e) => setName(e.target.value)}/>
            <input value={username} placeholder="Enter a username..." onChange={(e) => setUsername(e.target.value)}/>
            <input value={email} placeholder="Enter email..." onChange={(e) => setEmail(e.target.value)}/>
            <input value={password} placeholder="Enter password..." onChange={(e) => setPassword(e.target.value)}/>
            <input value={confirmPassword} placeholder="Confirm password..." onChange={(e) => setConfirmPassword(e.target.value)}/>
            {errorMessage}
            <SimpleButton text="Sign up" onClick={(e: React.MouseEvent<HTMLButtonElement>) => doSignUp(e)} className={"button"} />
        </AuthCard>
    )
}

export default SignUpPage;