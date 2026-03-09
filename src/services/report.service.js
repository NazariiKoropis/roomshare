import { database } from './../firebase/firebase';

import { get, ref, child, push, set } from 'firebase/database';

export const createReport = async (data) => {
    try {

        const dbRef = ref(database, "reports");
        const newReportRef = push(dbRef);

        await set(newReportRef, {
            ...data
        })
        return newReportRef.key

    } catch (error) {
        console.log("Error creating report! ", error)
    }
}