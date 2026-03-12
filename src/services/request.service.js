import { database } from './../firebase/firebase';
import { get, ref, push, set, query, orderByChild, equalTo, update, remove } from 'firebase/database';

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

export const getRequestsByField = async (field, userId) => {
    try {
        const dbRef = ref(database, 'requests');
        const q = query(dbRef, orderByChild(field), equalTo(userId));
        const snapshot = await get(q);

        if (!snapshot.exists()) return [];

        const data = snapshot.val();

        return Object.entries(data)
            .map(([id, req]) => ({ id, ...req }))
            .sort((a, b) => b.createdAt - a.createdAt);
    } catch (error) {
        console.error(`Помилка при отриманні заявок (${field}):`, error);
        return [];
    }
}

export const updateRequestStatus = async (requestId, newStatus) => {
    try {
        const dbRef = ref(database, `requests/${requestId}`);
        await update(dbRef, { status: newStatus });
        return true;
    } catch (error) {
        console.error("Помилка при оновленні статусу:", error);
        return false;
    }
}


export const deleteRequest = async (requestId) => {
    try {
        const dbRef = ref(database, `requests/${requestId}`);
        await remove(dbRef);
        return true;
    } catch (error) {
        console.error("Помилка при скасуванні заявки:", error);
        return false;
    }
}