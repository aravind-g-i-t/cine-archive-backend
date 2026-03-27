import * as movieService from "../services/movieService.js";


export const searchMovies = async (req, res) => {
  const { q, page = 1 } = req.query;

  if (!q || q.trim() === "") {
    return res.status(400).json({ error: "Search query is required" });
  }

  try {
    const result = await movieService.searchMovies(q, parseInt(page));
    console.log(result);

    return res.status(200).json(result);
  } catch (error) {
    console.log(error.message);

    if (
      error.message === "Movie not found!" ||
      error.message === "No movies found"
    ) {
      return res.status(404).json({ error: error.message });
    }
    if (
      error.message === "Too many results.") {
      return res.status(404).json({ error: error.message });
    }

    console.error("Search error:", error.message);
    return res.status(500).json({ error: "Failed to fetch movies" });
  }
};

export const getFavourites = (req, res) => {
  const { sessionId } = req.query;

  if (!sessionId) {
    return res.status(400).json({ error: "Session ID is required" });
  }

  try {
    const favourites = movieService.getFavourites(sessionId);
    return res.status(200).json({ favourites });
  } catch (error) {
    console.error("Get favourites error:", error.message);
    return res.status(500).json({ error: "Failed to get favourites" });
  }
};

export const addFavourite = (req, res) => {
  const { sessionId, movie } = req.body;

  if (!sessionId) {
    return res.status(400).json({ error: "Session ID is required" });
  }

  if (!movie || !movie.imdbID) {
    return res.status(400).json({ error: "Valid movie data is required" });
  }

  try {
    const updated = movieService.addFavourite(sessionId, movie);
    return res.status(201).json({ favourites: updated });
  } catch (error) {
    if (error.message === "Movie is already in favourites") {
      return res.status(409).json({ error: error.message });
    }

    console.error("Add favourite error:", error.message);
    return res.status(500).json({ error: "Failed to add favourite" });
  }
};


export const removeFavourite = (req, res) => {
  const { imdbID } = req.params;
  const { sessionId } = req.query;

  if (!sessionId) {
    return res.status(400).json({ error: "Session ID is required" });
  }

  if (!imdbID) {
    return res.status(400).json({ error: "IMDB ID is required" });
  }

  try {
    const updated = movieService.removeFavourite(sessionId, imdbID);
    return res.status(200).json({ favourites: updated });
  } catch (error) {
    if (error.message === "Movie not found in favourites") {
      return res.status(404).json({ error: error.message });
    }

    console.error("Remove favourite error:", error.message);
    return res.status(500).json({ error: "Failed to remove favourite" });
  }
};

export const getMovieDetails = async (req, res) => {
  const { imdbID } = req.query;
  if (!imdbID) return res.status(400).json({ error: "IMDB ID is required" });
  try {
    const movie = await movieService.getMovieDetails(imdbID);
    return res.status(200).json(movie);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};