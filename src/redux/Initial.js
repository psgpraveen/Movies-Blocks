import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const apiKey = '3953fd3e';
var Sr1 = 'bollywood'
var type1 = ""
var year1 = " ";
const validTypes = ['movie', 'series', 'episode'];
var d =()=>{
    return validTypes.includes(type1) ? `&type=${type1}` : '';
}

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async ({ sr, type ,year }) => {
    
    if (sr !== undefined) {
        Sr1 = sr
    } 
    if (type !== undefined) {
        type1 = type
    } 
    if (year !== undefined) {
        year1 = year
    } 
   
    // const defaulttype = type !== undefined ? type1 : '';
    const urls = [
        `https://www.omdbapi.com/?s=${Sr1}&plot=full&apikey=${apiKey}${d()}&y=${year1}`,
        `https://www.omdbapi.com/?s=${Sr1}&plot=full&apikey=${apiKey}&page=2${d()}&y=${year1}`,
        `https://www.omdbapi.com/?s=${Sr1}&plot=full&apikey=${apiKey}&page=3${d()}&y=${year1}`,
        `https://www.omdbapi.com/?s=${Sr1}&plot=full&apikey=${apiKey}&page=4${d()}&y=${year1}`
    ];

    const fetches = urls.map(url => fetch(url).then(res => res.json()));
    const results = await Promise.all(fetches);
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
                state.status = 'loading';
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.output = action.payload;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default moviesSlice.reducer;
