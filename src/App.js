import './App.css';
import Public from './Components/PublicList/Index'
import Log from './Components/Login/Index'
import Signup from './Components/Signup/Index'
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes >
        <Route path='/' element={<Log />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/list' element={<Public />} />
      </Routes>
    </Router>
    
  );
}

export default App;
