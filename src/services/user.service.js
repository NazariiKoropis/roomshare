import { database } from './../firebase/firebase';

import { get, ref, child, update } from 'firebase/database';


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

export const getUserDisplayNameById = async (id) => {
    try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, `users/${id}`));

        if (snapshot.exists()) {
            return snapshot.val().displayName;
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
            return 'user';
        }
    } catch (error) {
        console.log('Error fetch data role by id', error);
        return 'user';
    }
}

export const getUserContactsById = async (id) => {
    try {
        const dbRef = ref(database)
        const snapshot = await get(child(dbRef, `users/${id}/contacts`));

        if (snapshot.exists())
            return snapshot.val();
        else
            return {}

    } catch (error) {
        console.log("Error fetching users contact data: ", error)
        return {}
    }
}

export const setUserNewData = async (id, data) => {
    try {
        const dbRef = ref(database, `users/${id}`);

        await update(dbRef, {
            photoUrl: data.photoUrl,
            contacts: {
                phone: data.phone,
                whatsapp: data.whatsapp
            }
        });

        return true;
    } catch (error) {
        console.error("Error updating user data: ", error);
        return false;
    }
}