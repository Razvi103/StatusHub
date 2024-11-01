import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { auth } from "../Firebase";
import { onAuthStateChanged, User as FirebaseUser} from "firebase/auth";
import { Props } from "../Types/Props";
import axios from "axios";
import { BACK_URL } from "../App";

const AuthContext = React.createContext<AuthContextInterface>({} as AuthContextInterface);

export function useAuth() {
    return useContext(AuthContext);
}

interface AuthContextInterface {
    currentUser : User | null,
    setCurrentUser : (newUser : User) => void,
    userLoggedIn : boolean,
    loading : boolean
}

interface User {
    name : string,
    email : string,
    username : string,
    id : number
}

export function AuthProvider ({ children } : Props) {
    const [email, setEmail]               = useState<string>("")
    const [currentUser, setCurrentUser]   = useState<User | null>(null);
    const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
    const [loading, setLoading]           = useState<boolean>(true);

    const setUser = async (email : string) => {
        const response = await axios.get(BACK_URL + "/user", {
            params: {
              email: email
            }
        });
        setCurrentUser(response.data)
        console.log("SET_USER " + response.data.name)
        return response.data;
    }

    useEffect( () => {
        console.log("USE_EFFECT 1")
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    }, [])

    useEffect( () => {
        console.log("USE_EFFECT 2")
        if (email != "")
            setUser(email)
    }, [userLoggedIn])

    async function initializeUser(user : any) {
        console.log("INITIALIZE USER")
        if (user) {
            setEmail(user.email)
            setUserLoggedIn(true);
        }
        else {
            setCurrentUser(null);
            setUserLoggedIn(false);
        }
        setLoading(false);
    }

    const value = {
        currentUser,
        userLoggedIn,
        loading,
        setCurrentUser
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}