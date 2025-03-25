export const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };
    return date.toLocaleString('es-ES', options);
}
export const getCurrentDate = () => {
    const date = new Date();
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
    return date.toLocaleString('es-ES', options);
}