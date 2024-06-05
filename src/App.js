import './App.css'; 
// Import the CSS file for styling the App component

import Public from './Components/PublicList/Index';
// Import the Public component from the specified path

import Log from './Components/Login/Index'; 
// Import the Log (Login) component from the specified path

import Signup from './Components/Signup/Index';
// Import the Signup component from the specified path

import { BrowserRouter as Router, Routes, Route, } from "react-router-dom"; 
// Import necessary components from react-router-dom for routing

function App() {
  return (
    <Router> 
      {/* // Wrap the application in a Router to enable routing */}
      
      <Routes> 
        {/* // Define the routes for the application */}
        
        <Route path='/Movies-Blocks' element={<Log />} /> 
        {/* // Route for the login page */}
        
        <Route path='/Movies-Blocks/signup' element={<Signup />} /> 
        {/* // Route for the signup page */}
        
        <Route path='/Movies-Blocks/list' element={<Public />} /> 
        {/* // Route for the public list page */}
        
      </Routes>
    </Router>
  );
}

export default App; 
// Export the App component as the default export
