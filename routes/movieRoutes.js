import express from 'express'
import { addFavourite, getFavourites, getMovieDetails, removeFavourite, searchMovies } from '../controllers/movieController.js';
const movieRouter= express.Router()

movieRouter.get("/search", searchMovies);

movieRouter.get("/favorites", getFavourites);

movieRouter.post("/favorites", addFavourite);

movieRouter.delete("/favorites/:imdbID", removeFavourite);

movieRouter.get("/details", getMovieDetails);

export default movieRouter;