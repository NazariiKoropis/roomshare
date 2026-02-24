import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth"

import { ref, set, get, child } from 'firebase/database'
import { auth, database } from './../firebase/firebase'

//errors
const mapAuthCodeToMessage = (errorCode) => {
    switch (errorCode) {
        case 'auth/email-already-in-use':
            return 'Цей email вже використовується.'
        case 'auth/invalid-email':
            return 'Некоректний формат email.'
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
            return 'Невірний email або пароль.'
        case 'auth/weak-password':
            return 'Пароль занадто слабкий (мінімум 6 символів).'
        case 'auth/too-many-requests':
            return 'Забагато спроб. Спробуйте пізніше.'
        default:
            console.error('Unhandled Auth Error:', errorCode)
            return 'Сталася помилка. Спробуйте ще раз.'
    }
}

//login
export const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        return { user: userCredential.user, error: null }
    } catch (error) {
        return { user: null, error: mapAuthCodeToMessage(error.code) }
    }
}


// Logout
export const logoutUser = async () => {
    try {
        await signOut(auth)
        return { success: true, error: null }
    } catch (error) {
        return { success: false, error: mapAuthCodeToMessage(error.code) }
    }
}
