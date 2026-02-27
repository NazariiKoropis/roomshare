import { database } from './../firebase/firebase';

import { get, ref } from 'firebase/database';


export const getRoomCards = async () => {
    try {
        const dbRef = ref(database, 'rooms');
        const snapshot = await get(dbRef)

        if (!snapshot.exists()) return null

        const data = snapshot.val()

        const finalData = Object.entries(data).map(([id, room]) => ({
            id,
            title: room.title,
            desc: room.desc,
            price: room.price,
            slug: room.slug,
            amenities: room.amenities,
            location: room.location
        }))

        return finalData
    } catch (error) {
        console.log("Error fetching rooms data for cards", error)
    }
}