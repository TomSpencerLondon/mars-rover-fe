import { fetchWrapper } from './fetchApi';

export const move = (selectedRovers) => fetchWrapper({ endpoint: `move/${selectedRovers.join(',')}`, method: 'POST' });

export const getRover = () => fetchWrapper({ endpoint: 'rover', method: 'GET' });

export const postRover = () => fetchWrapper({ endpoint: 'rover', method: 'POST' });

export const deleteRovers = () => fetchWrapper({ endpoint: 'delete/rovers', method: 'POST' });

export const moveLeft = (selectedRovers) => fetchWrapper({ endpoint: `direction/L/${selectedRovers.join(',')}`, method: 'POST' });

export const moveRight = (selectedRovers) => fetchWrapper({ endpoint: `direction/R/${selectedRovers.join(',')}`, method: 'POST' });

export const getObstacles = () => fetchWrapper({ endpoint: 'obstacles', method: 'GET' });
