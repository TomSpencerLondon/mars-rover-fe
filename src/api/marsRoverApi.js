import { fetchWrapper } from "./fetchApi";

export const move = () => {
  return fetchWrapper({endpoint: "move", method: "POST"});
};

export const getRover = () => {
  return fetchWrapper({ endpoint: "rover", method: "GET"});
};

export const postRover = () => {
  return fetchWrapper({ endpoint: "rover", method: "POST" })
}

export const moveLeft = () => {
  return fetchWrapper({ endpoint: "direction/L", method: "POST"})
}

export const moveRight = () => {
  return fetchWrapper({ endpoint: "direction/R", method: "POST"})
}

