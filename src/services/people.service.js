import { database } from './../firebase/firebase';
import { get, ref, child } from 'firebase/database';

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
        const snapshot = await get(dbRef)

    } catch (error) {
        console.log("Error fetching data from server: ", error)
    }
}