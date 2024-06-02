import React, { useState } from 'react';
import axios from 'axios';
import Api from '../api';
import Home from '../Home/Index'
import { Link } from "react-router-dom";

const Index = () => {
  const [nam, setNam] = useState('');
  const [em, setEm] = useState('');
  const [pass, setPass] = useState('');
  const [hidden, setHidden] = useState(true);
  const [m, setM] = useState('');
const [use,setUse] = useState("");
  const send = async (e) => {
    e.preventDefault();

    if (!em.length > 0) {
      setM('Please Enter Your Email.');
      setHidden(false);
      setTimeout(() => setHidden(true), 3000);
    } else if (!pass.length > 0) {
      setM('Please Enter Your Password.');
      setHidden(false);
      setTimeout(() => setHidden(true), 3000);
    } else {
      try {
        const response = await axios.post('https://movies-blocks-backend.vercel.app/signin', {
          email: em,
          password: pass,
        });

        setM(response.data.message);
        if (response.data.success) {
          setEm('');
          setNam('');
          setPass('');
          setUse(response.data.user)

        }

        setHidden(false);
        setTimeout(() => setHidden(true), 3000);
      } catch (error) {
        console.error('Error:', error);
        setM('An error occurred. Please try again.');
        setHidden(false);
        setTimeout(() => setHidden(true), 3000);
      }
    }
  };

  return (
    <>
      {use ? <Home/> :<><section className="text-gray-600 body-font">
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
              </div>
              <button
                type="submit"
                className="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"
              >
                Sign in
              </button>
            </form>
            <Link to='/Movies-Blocks/signup' className="text-xs text-gray-500 mt-3 mx-auto mt-4">Sign up</Link>
          </div>
        </div>
      </section>
      <div>
        <Api hidden={hidden} m={m} />
      </div></>}
    </>
  );
};

export default Index;
