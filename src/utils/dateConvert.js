
export const DateConvertor = (date) => {
    return new Date(date).toLocaleDateString('uk-UA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })
}



