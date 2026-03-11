import { database } from './../firebase/firebase';

import { get, ref, orderByChild, equalTo, query, push, set, update, remove } from 'firebase/database';

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

export const getRoomById = async (id) => {
    try {
        const dbRef = ref(database, `rooms/${id}`)
        const snapshot = await get(dbRef)

        if (!snapshot.exists()) return {}

        return snapshot.val()

    } catch (error) {
        console.log("Error fetching data from server", error)
        return
    }
}

export const getRoomByUserId = async (userId) => {
    try {
        const dbRef = ref(database, 'rooms');

        const q = query(dbRef, orderByChild('userID'), equalTo(userId));
        const snapshot = await get(q);

        if (snapshot.exists()) {
            const roomsData = snapshot.val();
            const roomId = Object.keys(roomsData)[0];

            return { id: roomId, ...roomsData[roomId] };
        }

        return null;
    } catch (error) {
        console.error("Помилка при пошуку кімнати користувача:", error);
        return null;
    }
}

export const createRoom = async (roomData) => {
    try {
        const dbRef = ref(database, 'rooms');
        const newRoomRef = push(dbRef);

        await set(newRoomRef, roomData);
        return true;
    } catch (error) {
        console.error("Помилка при створенні кімнати:", error);
        return false;
    }
}

export const updateRoom = async (roomId, updatedData) => {
    try {
        const dbRef = ref(database, `rooms/${roomId}`);
        await update(dbRef, updatedData);
        return true;
    } catch (error) {
        console.error("Помилка при оновленні кімнати:", error);
        return false;
    }
}

export const deleteRoom = async (roomId) => {
    try {
        const dbRef = ref(database, `rooms/${roomId}`);
        await remove(dbRef);
        return true;
    } catch (error) {
        console.error("Помилка при видаленні кімнати:", error);
        return false;
    }
}