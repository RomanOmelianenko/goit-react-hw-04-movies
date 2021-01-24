import axios from 'axios';

const baseUrl = 'https://api.themoviedb.org/3';
const apiKey = '42c38b0bf9e2b0fb9f77d6f57a4b68ca';

const fetchMoviesTranding = () => {
    return axios
        .get(`${baseUrl}/trending/movie/day?api_key=${apiKey}`)
        .then(response => response.data.results)
};

// const fetchMoviesTranding = () => {
//   return fetch(`${baseUrl}/trending/movie/day?api_key=${apiKey}`)
//     .then(response => response.json())
//     .then(data => data.results);
// };

const fetchMoviesWithQuery = searchQuery => {
    return axios
        .get(`${baseUrl}/search/movie?query=${searchQuery}&api_key=${apiKey}`)
        .then(response => response.data.results);
};

const fetchMoviesDetails = movieId => {
    return axios
        .get(`${baseUrl}/movie/${movieId}?api_key=${apiKey}`)
        .then(response => response.data);
};

const fetchMoviesCast = movieId => {
    return axios
        .get(`${baseUrl}/movie/${movieId}/credits?api_key=${apiKey}`)
        .then(response => response.data.cast)
};

const fetchMoviesReviews = movieId => {
    return axios
        .get(`${baseUrl}/movie/${movieId}/reviews?api_key=${apiKey}`)
        .then(response => response.data.results)
};

const fetchMovies = {
    fetchMoviesTranding,
    fetchMoviesWithQuery,
    fetchMoviesDetails,
    fetchMoviesCast,
    fetchMoviesReviews
};

export default fetchMovies;