import React, { useEffect, useState } from 'react';
// Import necessary hooks and libraries

import { useSelector, useDispatch } from 'react-redux';
// Import hooks from react-redux for state management

import { Link } from "react-router-dom";
// Import Link from react-router-dom for navigation

import { fetchMovies } from '../../redux/Initial';
// Import the fetchMovies action from the redux slice

const Index = () => {
  // Define the Index component

  const dispatch = useDispatch();
  // Initialize the dispatch function for dispatching actions

  const [type, setType] = useState("");
  // State for the type of content (movie, series, episode)

  const [yea, setYea] = useState("");
  // State for the year filter

  const year = async (e) => {
    // Function to handle year input changes
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
    // Function to handle search type changes
    setType(t);
    dispatch(fetchMovies({ type: t }));
  };

  useEffect(() => {
    // Effect to fetch movies when the type changes
    if (type) {
      dispatch(fetchMovies({ type }));
    }
  }, [type, dispatch]);

  return (
    <header className="text-gray-600 body-font">
      {/* Header section with text-gray-600 and body-font classes */}

      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        {/* Container with padding and responsive flex layout */}
        
        <a href='/' className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          {/* Anchor tag for the logo */}
          
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-green-500 rounded-full" viewBox="0 0 24 24">
            {/* SVG for the logo icon */}
            
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            {/* SVG path data */}
          </svg>
          <span className="ml-3 text-xl">Movies - Blocks</span>
          {/* Logo text */}
        </a>
        
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          {/* Navigation section with responsive flex layout */}
          
          <span onClick={Search('')} className="mr-5 hover:text-gray-900 cursor-pointer">All</span>
          {/* Span for All content filter */}
          
          <span onClick={Search('movie')} className="mr-5 hover:text-gray-900 cursor-pointer">Movies</span>
          {/* Span for Movies filter */}
          
          <span onClick={Search('series')} className="mr-5 hover:text-gray-900 cursor-pointer">Series</span>
          {/* Span for Series filter */}
          
          <span onClick={Search('episode')} className="mr-5 hover:text-gray-900 cursor-pointer">Episode</span>
          {/* Span for Episode filter */}
          
          <label htmlFor="Year"></label>
          {/* Label for the Year input (empty) */}
          
          <input type="number" onChange={year} value={yea} className="border-2 border-orange-600 rounded-md focus:outline-none" placeholder="Year" id="Year" name="Year" min="1900" max="2024"></input>
          {/* Input for the Year filter */}
        </nav>
        
        <Link to="/Movies-Blocks/List" type="button" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2 me-2 dark:focus:ring-yellow-900">Public List</Link>
        {/* Link to the Public List page */}
        
        <a href='/Movies-Blocks' className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Sign Out
          {/* Anchor tag for the Sign Out button */}
          
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
            {/* SVG for the Sign Out icon */}
            
            <path d="M5 12h14M12 5l7 7-7 7"></path>
            {/* SVG path data */}
          </svg>
        </a>
      </div>
    </header>
  );
}

export default Index;
// Export the Index component as the default export
