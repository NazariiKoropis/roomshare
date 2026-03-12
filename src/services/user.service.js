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
        console.log('Помилка отримання даних користувача за id', error)
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
        console.log('Помилка отримання даних користувача за id', error)
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
        console.log('Помилка отримання ролі користувача за id', error);
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
        console.log('Помилка отримання контактних даних користувача:', error)
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
        console.error('Помилка оновлення даних користувача:', error);
        return false;
    }
}