import { fetchWrapper } from "./fetchApi";

export const move = () => {
  return fetchWrapper({endpoint: "move", METHOD: "POST"});
};

export const getRover = () => {
  return fetchWrapper({ endpoint: "rover", METHOD: "GET"});
};

export const postRover = () => {
  return fetchWrapper({ endpoint: "rover", METHOD: "POST" })
}

export const moveLeft = () => {
  return fetchWrapper({ endpoint: "direction/L", METHOD: "POST"})
}

export const moveRight = () => {
  return fetchWrapper({ endpoint: "direction/R", METHOD: "POST"})
}

