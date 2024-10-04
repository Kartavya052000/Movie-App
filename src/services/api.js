// api/api.js

import axios from 'axios';

// Create an instance of Axios with the base URL
const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3', // Replace with your API base URL
  params: {
api_key: 'd2c0cc48d579bee692ae0cd094a514b7', // Use your API key here
  },
});

// Function to get movies based on the provided query
export const getMovies = (query) => {
  return api.get(`/movie/${query}`);
};

// Search function
export const search = (query, type) => {
  const endpoint = type === 'multi' ? '/search/multi' : '/search/movie';
  return api.get(endpoint, {
    params: { query },
  });
};
//TV SHOWS
export const getTVShows = (category) => {
  // TMDB API supports specific endpoints for categories, e.g., airing_today, popular, etc.
  return api.get(`/tv/${category}`);
};
export const getDetails = (id,type) => {
  if(type=='movie'){
    return api.get(`/movie/${id}`);

  }else{
    return api.get(`/tv/${id}`);
  }
};

export default api;
