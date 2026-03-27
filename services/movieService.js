import axios from "axios";
import { getStore, saveToStore, deleteFromStore } from "../store/favouriteStore.js";
import dotenv from "dotenv"
dotenv.config()

const OMDB_BASE_URL = process.env.OMDB_BASE_URL;
const OMDB_API_KEY = process.env.OMDB_API_KEY;

export const searchMovies = async (query, page = 1) => {
  if (!query || query.trim() === "") {
    throw new Error("Search query is required");
  }

  const response = await axios.get(OMDB_BASE_URL, {
    params: {
      apikey: OMDB_API_KEY,
      s: query.trim(),
      type: "movie",
      page,
    },
  });

  const data = response.data;

  if (data.Response === "False") {
    throw new Error(data.Error || "No movies found");
  }

  return {
    movies: data.Search,
    totalResults: parseInt(data.totalResults),
    currentPage: page,
    totalPages: Math.ceil(parseInt(data.totalResults) / 10),
  };
};


export const getFavourites = (sessionId) => {
  if (!sessionId) {
    throw new Error("Session ID is required");
  }

  return getStore(sessionId);
};


export const addFavourite = (sessionId, movie) => {
  if (!sessionId) {
    throw new Error("Session ID is required");
  }

  if (!movie || !movie.imdbID) {
    throw new Error("Valid movie data is required");
  }

  const favourites = getStore(sessionId);

  const alreadyExists = favourites.some((f) => f.imdbID === movie.imdbID);
  if (alreadyExists) {
    throw new Error("Movie is already in favourites");
  }

  const movieToStore = {
    imdbID: movie.imdbID,
    Title: movie.Title,
    Year: movie.Year,
    Poster: movie.Poster,
    addedAt: new Date().toISOString(),
  };

  const updated = [...favourites, movieToStore];
  saveToStore(sessionId, updated);

  return updated;
};


export const removeFavourite = (sessionId, imdbID) => {
  if (!sessionId) {
    throw new Error("Session ID is required");
  }

  if (!imdbID) {
    throw new Error("IMDB ID is required");
  }

  const favourites = getStore(sessionId);

  const exists = favourites.some((f) => f.imdbID === imdbID);
  if (!exists) {
    throw new Error("Movie not found in favourites");
  }

  const updated = favourites.filter((f) => f.imdbID !== imdbID);
  deleteFromStore(sessionId, updated);

  return updated;
};

export const getMovieDetails = async (imdbID) => {
  const response = await axios.get(OMDB_BASE_URL, {
    params: { apikey: OMDB_API_KEY, i: imdbID, plot: "full" },
  });
  if (response.data.Response === "False") {
    throw new Error(response.data.Error);
  }
  return response.data;
};