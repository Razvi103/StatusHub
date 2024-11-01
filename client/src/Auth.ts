import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updatePassword } from "firebase/auth";
import { auth, googleProvider } from "./Firebase";

export const doCreateUserWithEmailAndPassword = async (email : string, password : string) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

export const doSignInWithEmailAndPassword = async (email : string, password : string) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const doSignInWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    // result.user
    return result;
}

export const doSignOut = () => {
    return auth.signOut();
}

export const doPasswordReset = (email: string) => {
    return sendPasswordResetEmail(auth, email);
}

export const doPasswordChange = (password : string) => {
    if (auth.currentUser) {
        return updatePassword(auth.currentUser, password);
    }
}

export const doSendEmailVerification = () => {
    if (auth.currentUser) {
        return sendEmailVerification(auth.currentUser, {
            url: `${window.location.origin}/home`
        })
    }
}