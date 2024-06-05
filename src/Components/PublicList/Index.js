// Importing necessary modules and components
import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../Footer/Index";

// Creating functional component 'Index'
const Index = () => {
  // Using state hook to manage 'listdata' state
  const [listdata, setListdata] = useState([]);

  // Declaring an asynchronous function 'data' to fetch data from API
  let data = async () => {
    try {
      // Making GET request to fetch data from API endpoint
      const response = await axios.get(
        "https://movies-blocks-backend.vercel.app/getlist"
      );
      // Updating 'listdata' state with fetched data
      setListdata(response.data);
      // Logging fetched data to console
      console.log(response.data);
    } catch (error) {
      // Logging error if request fails
      console.log(error);
    }
  };

  // useEffect hook to execute 'data' function only once on component mount
  useEffect(() => {
    data();
  }, []);

  // Returning JSX
  return (
    <>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a
            href="/Movies-Blocks/"
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-green-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">Movies - Block</span>
          </a>
          <a
            href="/"
            className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
          >
            Sign Out
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </header>
      <div>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <h1 className="sm:text-3xl text-2xl font-medium flex text-center title-font mx-auto mb-4 text-gray-900">
              PublicList
            </h1>
            <div className="flex flex-wrap -m-4">
              {/* Conditional rendering of list data */}
              {listdata.length > 0
                ? listdata.map((datalisted, index1) => (
                    <div key={index1} className="p-4 md:w-1/3">
                      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                        <img
                          className="lg:h-48 md:h-36 w-full object-cover object-center"
                          src={
                            // Checking if 'Poster' is available, if not, displaying a default image
                            datalisted.Poster !== 'N/A'? datalisted.Poster: 'https://static.vecteezy.com/system/resources/previews/000/362/681/original/vector-website-error-404-page-not-found.jpg'
                          }
                          alt="blog"
                        />
                        <div className="p-6">
                          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                            {datalisted.Type}
                          </h2>
                          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                            {datalisted.Title}
                          </h1>
                          <p className="leading-relaxed mb-3">
                            {datalisted.Year}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                : "No data "} {/* Displaying message if there's no data */}
            </div>
          </div>
        </section>
      </div>
      {/* Including Footer component */}
      <Footer />
    </>
  );
};

// Exporting Index component
export default Index;
