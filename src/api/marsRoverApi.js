import { fetchWrapper } from "./fetchApi";

export const move = (selectedRovers) => {
  return fetchWrapper({endpoint: `move/${selectedRovers.join(",")}`, method: "POST"});
};

export const getRover = () => {
  return fetchWrapper({ endpoint: "rover", method: "GET"});
};

export const postRover = () => {
  return fetchWrapper({ endpoint: "rover", method: "POST" })
}

export const deleteRovers = () => {
  return fetchWrapper({endpoint: "delete/rovers", method: "POST" })
}

export const moveLeft = (selectedRovers) => {
  return fetchWrapper({ endpoint: `direction/L/${selectedRovers.join(",")}`, method: "POST"})
}

export const moveRight = (selectedRovers) => {
  return fetchWrapper({ endpoint: `direction/R/${selectedRovers.join(",")}`, method: "POST"})
}

export const getObstacles = () => {
  return fetchWrapper({ endpoint: "obstacles", method: "GET"})
}

