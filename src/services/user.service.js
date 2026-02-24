import { database } from './../firebase/firebase';

import { get, ref, child } from 'firebase/database';


export const getUserById = async (id) => {
    try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, `users/${id}`));

        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            return null
        }

    } catch (error) {
        console.log('Error fetch data user by id', error)
    }
}

export const getUserRoleById = async (id) => {
    try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, `users/${id}/role`));

        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            return 'user'
        }

    } catch (error) {
        console.log('Error fetch data role by id', error)
    }
}

