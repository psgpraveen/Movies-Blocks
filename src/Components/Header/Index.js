import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";

import { fetchMovies } from '../../redux/Initial';

const Index = () => {

  const dispatch = useDispatch();
  const [type, setType] = useState("");
  const [yea, setYea] = useState("")

  const year = async (e) => {
    let yearValue = e.target.value;
    if (yearValue <= 2024) {
      setYea(yearValue);
      console.log(yearValue);
      dispatch(fetchMovies({ year: yearValue }));
    } else {
      setYea("");
      console.log("");
    }
  };
  const Search = (t) => () => {
    setType(t);
    dispatch(fetchMovies({ type: t }));
  }

  useEffect(() => {
    if (type) {
      dispatch(fetchMovies({ type }));
    }
  }, [type, dispatch]);



  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a href='/' className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-green-500 rounded-full" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">Movies - Blocks</span>
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <span onClick={Search('')} className="mr-5 hover:text-gray-900 cursor-pointer">All</span>
          <span onClick={Search('movie')} className="mr-5 hover:text-gray-900 cursor-pointer">Movies</span>
          <span onClick={Search('series')} className="mr-5 hover:text-gray-900 cursor-pointer">Series</span>
          <span onClick={Search('episode')} className="mr-5 hover:text-gray-900 cursor-pointer">Episode</span>
          <label for="Year"></label>
          <input type="number" onChange={year} value={yea} className="border-2 border-orange-600	 rounded-md  focus:outline-none " placeholder="  Year" id="Year" name="Year" min="1900" max="2024"></input>
        </nav>
        <Link to="/Movies-Blocks/List" type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2 me-2  dark:focus:ring-yellow-900">Public List</Link>
        <a href='/Movies-Blocks' className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Sign Out
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </header>
  );
}

export default Index;
