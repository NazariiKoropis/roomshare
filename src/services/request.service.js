import { database } from './../firebase/firebase';
import { ref, push, set } from 'firebase/database';

export const createRequest = async (data) => {
    try {
        const dbRef = ref(database, "requests");
        const newRequestRef = push(dbRef);

        await set(newRequestRef, {
            ...data
        });

        return newRequestRef.key;
    } catch (error) {
        console.error("Error creating request! ", error);
    }
}