import React, { useState, useEffect } from 'react';
// Import necessary React hooks and components

import axios from 'axios';
// Import axios for making HTTP requests

import { useSelector, useDispatch } from 'react-redux';
// Import hooks for accessing and dispatching Redux state

import Api from '../api';
// Import the Api component

import { fetchMovies } from '../../redux/Initial';
// Import the fetchMovies async thunk

const Index = () => {
    const dispatch = useDispatch();
    // Initialize the dispatch function

    const output = useSelector((state) => state.movies.output);
    // Select the output state from the Redux store

    const status = useSelector((state) => state.movies.status);
    // Select the status state from the Redux store

    const error = useSelector((state) => state.movies.error);
    // Select the error state from the Redux store

    const [sr, setSr] = useState("bollywood");
    // Initialize the search keyword state

    // const [type, setType] = useState(" ");
    const [value, setValue] = useState('');
    // Initialize the value state for the search input

    const [id, setId] = useState("");
    // Initialize the ID state

    const [hidden, setHidden] = useState(true);
    // Initialize the hidden state for the API response message

    const [m, setM] = useState('');
    // Initialize the message state for the API response

    const Search = (e) => {
        e.preventDefault();
        // Prevent the default form submission behavior

        setSr(value);
        // Update the search keyword state

        dispatch(fetchMovies({ sr: value }));
        // Dispatch the fetchMovies action with the search keyword
    }

    const imdb = (i) => async () => {
        setId(i);
        // Set the ID state

        try {
            const response = await axios.post('https://movies-blocks-backend.vercel.app/list', {
                id: i
            });
            // Send a POST request to the backend with the movie ID

            setM(response.data.message);
            // Set the message state with the response message

            setHidden(false);
            // Set the hidden state to false to show the message

            setTimeout(() => setHidden(true), 3000);
            // Hide the message after 3 seconds

        } catch (error) {
            // Handle any errors that occur during the request
        }
    }

    useEffect(() => {
        dispatch(fetchMovies({ sr }));
        // Fetch movies when the search keyword or dispatch function changes
    }, [sr, dispatch]);

    useEffect(() => {
        console.log("id>>>", id);
        // Log the ID whenever it changes
    }, [id]);

    return (
        <>
            <form className="max-w-md mt-16 mx-auto" onSubmit={Search}>
                {/* Form for searching movies */}

                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" id="default-search" value={value} onChange={(e) => { setValue(e.target.value) }} className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Movies,Series..." required />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Movies - Blocks</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                            "Discover a vast collection of movies across genres, with detailed information and the latest updates. Explore, search, and enjoy the ultimate movie experience on our website!"
                        </p>
                    </div>
                    <section className="text-gray-600 body-font">
                        <div className="container px-5 py-24 mx-auto">
                            <Api hidden={hidden} m={m} />
                            {/* Display the API response message */}
                            
                            <div className="flex flex-wrap -m-4">
                                {status === 'loading' && <p>Loading...</p>}
                                {/* Display loading message when the status is loading */}
                                
                                {status === 'failed' && <p>Error: {error}</p>}
                                {/* Display error message when the status is failed */}
                                
                                {output.length > 0 ? output.map((d) => (
                                    <div key={d.imdbID} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                                        <a className="block relative h-48 rounded overflow-hidden">
                                            <img
                                                alt="ecommerce"
                                                className="object-cover object-center w-full h-full block"
                                                src={d.Poster !== 'N/A' ? d.Poster : 'https://static.vecteezy.com/system/resources/previews/000/362/681/original/vector-website-error-404-page-not-found.jpg'}
                                            />
                                        </a>
                                        <div className="mt-4">
                                            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{d.Type}</h3>
                                            <h2 className="text-gray-900 title-font text-lg font-medium">{d.Title}</h2>
                                            <p className="mt-1">{d.Year}</p>
                                            <button onClick={imdb(d.imdbID)} type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Add to List</button>
                                        </div>
                                    </div>
                                )) : <h3 className='flex mx-auto '>No Data Found</h3>}
                                {/* Display the movie cards or a message if no data is found */}
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </>
    );
};

export default Index;
// Export the Index component as the default export
