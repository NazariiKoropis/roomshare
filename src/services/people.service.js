import { database } from './../firebase/firebase';
import { get, ref, child, orderByChild, equalTo, query, push, set, update, remove } from 'firebase/database';

export const getPeopleCards = async () => {
    try {
        const dbRef = ref(database);

        const resumesSnapshot = await get(child(dbRef, 'resumes'));

        if (!resumesSnapshot.exists()) return [];

        const resumesData = resumesSnapshot.val();

        const peopleCards = await Promise.all(

            Object.entries(resumesData).map(async ([id, resume]) => {
                const userId = resume.userID;

                let userData = {};

                if (userId) {
                    const userSnapshot = await get(child(dbRef, `users/${userId}`));
                    if (userSnapshot.exists()) {
                        userData = userSnapshot.val();
                    }
                }

                return {
                    id,
                    title: resume.title,
                    desc: resume.desc,
                    city: resume.city,
                    budget: resume.budget,
                    status: resume.status,
                    slug: resume.slug,
                    createdAt: resume.createdAt,
                    displayName: userData.displayName,
                    birthDate: userData.birthDate,
                    gender: userData.gender,
                    photoUrl: userData.photoUrl,
                };
            })
        );

        return peopleCards;

    } catch (error) {
        console.error("Error fetching people cards with user data:", error);
        return [];
    }
}

export const getAllCities = async () => {
    try {
        const dbRef = ref(database, 'resumes');
        const snapshot = await get(dbRef);

        if (!snapshot.exists()) return [];

        const data = snapshot.val();
        const citySet = new Set();

        for (const key in data) {
            const city = data[key]?.city;
            if (city) {
                citySet.add(city);
            }
        }

        return Array.from(citySet).sort();
    } catch (error) {
        console.log("Error fetching data from server: ", error);
        return [];
    }
}


export const getPeopleCardById = async (id) => {
    try {
        const dbRef = ref(database);

        const resumeSnapshot = await get(child(dbRef, `resumes/${id}`));

        if (!resumeSnapshot.exists()) return null;

        const resume = resumeSnapshot.val();
        const userId = resume.userID;

        let userData = {};


        if (userId) {
            const userSnapshot = await get(child(dbRef, `users/${userId}`));
            if (userSnapshot.exists()) {
                userData = userSnapshot.val();
            }
        }


        return {
            id,
            ...resume,
            displayName: userData.displayName,
            birthDate: userData.birthDate,
            gender: userData.gender,
            photoUrl: userData.photoUrl,
        };

    } catch (error) {
        console.error(`Error fetching resume ${id}:`, error);
        return null;
    }
}

export const getResumeByUserId = async (userId) => {
    try {
        const dbRef = ref(database, 'resumes');
        const q = query(dbRef, orderByChild('userID'), equalTo(userId));
        const snapshot = await get(q);

        if (snapshot.exists()) {
            const resumesData = snapshot.val();
            const resumeId = Object.keys(resumesData)[0];
            return { id: resumeId, ...resumesData[resumeId] };
        }
        return null;
    } catch (error) {
        console.error("Помилка при пошуку анкети користувача:", error);
        return null;
    }
}

export const createResume = async (resumeData) => {
    try {
        const dbRef = ref(database, 'resumes');
        const newResumeRef = push(dbRef);
        await set(newResumeRef, resumeData);
        return true;
    } catch (error) {
        console.error("Помилка при створенні анкети:", error);
        return false;
    }
}


export const updateResume = async (resumeId, updatedData) => {
    try {
        const dbRef = ref(database, `resumes/${resumeId}`);
        await update(dbRef, updatedData);
        return true;
    } catch (error) {
        console.error("Помилка при оновленні анкети:", error);
        return false;
    }
}


export const deleteResume = async (resumeId) => {
    try {
        const dbRef = ref(database, `resumes/${resumeId}`);
        await remove(dbRef);
        return true;
    } catch (error) {
        console.error("Помилка при видаленні анкети:", error);
        return false;
    }
}