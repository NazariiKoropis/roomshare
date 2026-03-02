import { database } from './../firebase/firebase';

import { get, ref } from 'firebase/database';

export const getPeopleCards = async () => {
    try {
        const dbRef = ref(database, 'resumes');
        const snapshot = await get(dbRef)

        if (!snapshot.exists()) return null


    }
    catch (error) {
        console.log("Error fething peoplecard from database", error)
    }
}