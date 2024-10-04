// api/api.js

import axios from 'axios';

// Create an instance of Axios with the base URL
const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3', // Replace with your API base URL
  params: {
api_key: process.env.TMDB_API_KEY, // Use your API key here
  },
});

// Function to get movies based on the provided query
export const getMovies = (query) => {
  return api.get(`/movie/${query}`);
};

// Search function
export const searchMovies = (query) => {
  // console.log(query)
  return api.get('/search/movie', {
    params: { query },
  });
};
//TV SHOWS
export const getTVShows = (query) => {
  return api.get(`/tv/${query}`);
};

export const getMovieDetails = (id) => {
  return api.get(`/movie/${id}`);
};

// Function to get TV show details by ID
export const getTVShowDetails = (id) => {
  return api.get(`/tv/${id}`);
};
export default api;
