

const store = {};


export const getStore = (sessionId) => {
  return store[sessionId] || [];
};


export const saveToStore = (sessionId, favourites) => {
  store[sessionId] = favourites;
};


export const deleteFromStore = (sessionId, updatedFavourites) => {
  store[sessionId] = updatedFavourites;
};


export const clearSession = (sessionId) => {
  delete store[sessionId];
};


export const logStore = () => {
  console.log("Current store state:", JSON.stringify(store, null, 2));
};