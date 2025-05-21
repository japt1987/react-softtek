/* Servicio del Usuario */
export const GetListUser = async () => {
    const response = await fetch('https://rimac-front-end-challenge.netlify.app/api/user.json'); 
    if (!response.ok) {
        throw new Error('Error al cargar los datos');
    }
    const data = await response.json();
    return data;
}

/* Servicio de la lista de Planes */
export const GetListPlans = async () => {
    const response = await fetch('https://rimac-front-end-challenge.netlify.app/api/plans.json'); 
    if (!response.ok) {
        throw new Error('Error al cargar los datos');
    }
    const data = await response.json();
    return data;
}
