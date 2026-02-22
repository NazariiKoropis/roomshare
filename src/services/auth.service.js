import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth"

import { ref, set, get, child } from 'firebase/database'
import { auth, database } from './../firebase/firebase'



