import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the API key for the OMDB API
const apiKey = '3953fd3e';

var Sr1 = 'bollywood';
// Define the default search keyword

var type1 = "";
// Define the default type (can be empty or one of the valid types)

var year1 = " ";
// Define the default year (can be empty)

const validTypes = ['movie', 'series', 'episode'];
// Define the valid types for the OMDB API

var d = () => {
    // Return the type query parameter if the type is valid, otherwise return an empty string
    return validTypes.includes(type1) ? `&type=${type1}` : '';
}

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async ({ sr, type, year }) => {
    // Async thunk to fetch movies from the OMDB API

    if (sr !== undefined) {
        // Update the search keyword if provided
        Sr1 = sr
    } 
    if (type !== undefined) {
        // Update the type if provided
        type1 = type
    } 
    if (year !== undefined) {
        // Update the year if provided
        year1 = year
    } 
   
    // Construct URLs for multiple pages of search results
    const urls = [
        `https://www.omdbapi.com/?s=${Sr1}&plot=full&apikey=${apiKey}${d()}&y=${year1}`,
        `https://www.omdbapi.com/?s=${Sr1}&plot=full&apikey=${apiKey}&page=2${d()}&y=${year1}`,
        `https://www.omdbapi.com/?s=${Sr1}&plot=full&apikey=${apiKey}&page=3${d()}&y=${year1}`,
        `https://www.omdbapi.com/?s=${Sr1}&plot=full&apikey=${apiKey}&page=4${d()}&y=${year1}`
    ];

    // Fetch data from all URLs and parse as JSON
    const fetches = urls.map(url => fetch(url).then(res => res.json()));
    const results = await Promise.all(fetches);

    // Return a flat array of search results
    return results.flatMap(result => result.Search || []);
});

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        output: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                // Update the state to loading when the fetchMovies action is pending
                state.status = 'loading';
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                // Update the state to succeeded and store the fetched data when the fetchMovies action is fulfilled
                state.status = 'succeeded';
                state.output = action.payload;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                // Update the state to failed and store the error message when the fetchMovies action is rejected
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default moviesSlice.reducer;
// Export the reducer for the movies slice
