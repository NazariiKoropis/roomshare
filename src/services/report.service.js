import { database } from './../firebase/firebase';

import { get, ref, update, push, set } from 'firebase/database';

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

export const getAllReports = async () => {
    try {
        const dbRef = ref(database, 'reports');
        const snapshot = await get(dbRef);

        if (!snapshot.exists()) return [];

        const data = snapshot.val();
        return Object.entries(data)
            .map(([id, report]) => ({ id, ...report }))
            .sort((a, b) => b.createdAt - a.createdAt);
    } catch (error) {
        console.error('Помилка при отриманні скарг:', error);
        return [];
    }
}

export const updateReportStatus = async (reportId, newStatus) => {
    try {
        const dbRef = ref(database, `reports/${reportId}`);
        await update(dbRef, { status: newStatus });
        return true;
    } catch (error) {
        console.error("Помилка при оновленні статусу скарги:", error);
        return false;
    }
}