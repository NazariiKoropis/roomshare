const imagesRoom = import.meta.glob('/src/assets/images/rooms/*.{png,jpg,jpeg,svg}', { eager: true })
const imagesPeople = import.meta.glob('/src/assets/images/people/*.{png,jpg,jpeg,svg}', { eager: true })

const findImage = (imageCollection, imageName) => {
    if (!imageName) return null

    for (const path in imageCollection) {

        const fileNameWithExt = path.split('/').pop()
        const exactFileName = fileNameWithExt.split('.')[0]

        if (fileNameWithExt === imageName || exactFileName === imageName) {
            return imageCollection[path].default
        }
    }

    return null
}

export const getPeopleImage = (imageName) => findImage(imagesPeople, imageName)
export const getRoomImage = (imageName) => findImage(imagesRoom, imageName)