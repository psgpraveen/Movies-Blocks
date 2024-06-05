import React, { useState } from 'react';
// Import necessary dependencies

import axios from 'axios';
// Import axios for making HTTP requests

import Api from '../api';
// Import Api component

import Home from '../Home/Index'
// Import Home component

import { Link } from "react-router-dom";
// Import Link from react-router-dom for navigation

const Index = () => {
  const [nam, setNam] = useState('');
  // State for name input

  const [em, setEm] = useState('');
  // State for email input

  const [pass, setPass] = useState('');
  // State for password input

  const [hidden, setHidden] = useState(true);
  // State for toggling visibility of messages

  const [m, setM] = useState('');
  // State for storing messages

  const [use, setUse] = useState("");
  // State for storing user data

  const send = async (e) => {
    e.preventDefault();
    // Prevent default form submission behavior

    if (!em.length > 0) {
      setM('Please Enter Your Email.');
      setHidden(false);
      setTimeout(() => setHidden(true), 3000);
      // Display error if email is not provided
    } else if (!pass.length > 0) {
      setM('Please Enter Your Password.');
      setHidden(false);
      setTimeout(() => setHidden(true), 3000);
      // Display error if password is not provided
    } else {
      try {
        const response = await axios.post('https://movies-blocks-backend.vercel.app/signin', {
          email: em,
          password: pass,
        });
        // Make a POST request to sign in the user

        setM(response.data.message);
        if (response.data.success) {
          setEm('');
          setNam('');
          setPass('');
          setUse(response.data.user)
          // Clear input fields and set user data if sign-in is successful
        }

        setHidden(false);
        setTimeout(() => setHidden(true), 3000);
        // Display success message
      } catch (error) {
        console.error('Error:', error);
        setM('An error occurred. Please try again.');
        setHidden(false);
        setTimeout(() => setHidden(true), 3000);
        // Display error message if sign-in fails
      }
    }
  };

  return (
    <>
      {use ? <Home/> :
      // Render Home component if user is signed in, otherwise render sign-in form
      <>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
            <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
              <h1 className="title-font font-medium text-3xl text-gray-900">Movies - Block</h1>
              <p className="leading-relaxed mt-4">
                "Discover a vast collection of movies across genres, with detailed information and the latest updates.
                Explore, search, and enjoy the ultimate movie experience on our website!"
              </p>
            </div>
            <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
              <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign in</h2>
              <form onSubmit={send}>
                <div className="relative mb-4">
                  <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                  <input
                    type="email"
                    required
                    value={em}
                    onChange={(e) => setEm(e.target.value)}
                    id="email"
                    name="email"
                    className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  {/* Email input field */}
                </div>

                <div className="relative mb-4">
                  <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                  <input
                    type="password"
                    required
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    id="password"
                    name="password"
                    className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  {/* Password input field */}
                </div>
                <button
                  type="submit"
                  className="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"
                >
                  Sign in
                  {/* Sign in button */}
                </button>
              </form>
              <Link to='/Movies-Blocks/signup' className="text-xs text-gray-500 mt-3 mx-auto mt-4">Sign up</Link>
              {/* Link to Sign up page */}
            </div>
          </div>
        </section>
        <div>
          <Api hidden={hidden} m={m} />
          {/* Display Api component for showing messages */}
        </div>
      </>}
    </>
  );
};

export default Index;
// Export the Index component as the default export
