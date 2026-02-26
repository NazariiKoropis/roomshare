import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth"

import { ref, set } from 'firebase/database'
import { auth, database } from './../firebase/firebase'

// Обробник помилок
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

// login
export const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        return { user: userCredential.user, error: null }
    } catch (error) {
        return { user: null, error: mapAuthCodeToMessage(error.code) }
    }
}

// reg
export const register = async (userData) => {
    try {

        const userCredential = await createUserWithEmailAndPassword(
            auth,
            userData.email,
            userData.password
        )
        const user = userCredential.user;

        const generatedPhotoUrl = `https://ui-avatars.com/api/?name=${userData.firstName}+${userData.lastName}&background=random`

        await updateProfile(user, {
            displayName: userData.displayName,
            photoURL: generatedPhotoUrl
        })


        const userDbRef = ref(database, `users/${user.uid}`)

        await set(userDbRef, {
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            displayName: userData.displayName,
            photoUrl: generatedPhotoUrl,
            role: 'user',
            gender: userData.gender,
            birthDate: new Date(userData.date).getTime(),
            contacts: {
                phone: userData.phone,
                whatsapp: userData.whatsapp,
            },
            registeredAt: Date.now()
        })

        return { user, error: null }
    } catch (error) {
        console.error('Signup Error:', error)
        return { user: null, error: mapAuthCodeToMessage(error.code) }
    }
}


export const logoutUser = async () => {
    try {
        await signOut(auth)
        return { success: true, error: null }
    } catch (error) {
        return { success: false, error: mapAuthCodeToMessage(error.code) }
    }
}