export const ListUser = async () => {
    const response = await fetch('https://rimac-front-end-challenge.netlify.app/api/user.json'); 
    if (!response.ok) {
        throw new Error('Error al cargar los datos');
    }
    const data = await response.json();
    return data;
}

export const ListPlanes = async () => {
    const response = await fetch('https://rimac-front-end-challenge.netlify.app/api/plans.json'); 
    if (!response.ok) {
        throw new Error('Error al cargar los datos');
    }
    const data = await response.json();
    return data;
}
