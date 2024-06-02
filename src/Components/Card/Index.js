import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Api from '../api';
import { fetchMovies } from '../../redux/Initial';

const Index = () => {
    const dispatch = useDispatch();
    const output = useSelector((state) => state.movies.output);
    const status = useSelector((state) => state.movies.status);
    const error = useSelector((state) => state.movies.error);
    const [sr, setSr] = useState("bollywood");

    const [type, setType] = useState(" ");
    const [value, setValue] = useState('');
    const [id, setId] = useState("");
    const [hidden, setHidden] = useState(true);
    const [m, setM] = useState('');

    const Search = (e) => {
        e.preventDefault();
        setSr(value);
        dispatch(fetchMovies({ sr: value }));
    }
    const imdb = (i) => async () => {
        setId(i)
        try {
            const response = await axios.post('http://localhost:5000/list', {
                id: i
            });
            setM(response.data.message);
            setHidden(false);
            setTimeout(() => setHidden(true), 3000);

        } catch (error) {

        }
    }
    useEffect(() => {
        dispatch(fetchMovies({ sr, type }));
    }, [sr, dispatch]);
    useEffect(() => {
        console.log("id>>>", id);
    }, [id])

    return (
        <>
            <form className="max-w-md mt-16 mx-auto" onSubmit={Search}>
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
                            <div className="flex flex-wrap -m-4">
                                {status === 'loading' && <p>Loading...</p>}
                                {status === 'failed' && <p>Error: {error}</p>}
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
                                            <button onClick={imdb(d)} type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Add to List</button>
                                        </div>
                                    </div>

                                )) : <h3 className='flex mx-auto '>No Data Found</h3>}
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </>
    );
};

export default Index;
