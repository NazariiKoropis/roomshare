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

export const getAllCities = async () => {
    try {
        const dbRef = ref(database, 'rooms');
        const snapshot = await get(dbRef)

        if (!snapshot.exists()) return []

        const data = snapshot.val()
        const citySet = new Set();

        for (const key in data) {
            const city = data[key]?.location?.city;
            if (city) {
                citySet.add(city);
            }
        }
        return Array.from(citySet).sort();

    } catch (error) {
        console.error('Error fetching cities from database:', error)
        return []
    }
}

export const getAllAmenities = async () => {
    try {
        const dbRef = ref(database, 'rooms');
        const snapshot = await get(dbRef)

        if (!snapshot.exists()) return []

        const data = snapshot.val()
        const amenitiesSet = new Set();

        for (const key in data) {
            const amenities = data[key]?.amenities;

            if (amenities && Array.isArray(amenities)) {
                for (const amenity of amenities) {
                    amenitiesSet.add(amenity);
                }
            }
        }

        return Array.from(amenitiesSet).sort();

    } catch (error) {

        console.error('Error fetching amenities from database:', error)
        return []
    }
}