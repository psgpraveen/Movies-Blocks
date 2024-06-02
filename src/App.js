import './App.css';
import Public from './Components/PublicList/Index'
import Log from './Components/Login/Index'
import Signup from './Components/Signup/Index'
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes >
        <Route path='/Movies-Blocks' element={<Log />} />
        <Route path='/Movies-Blocks/signup' element={<Signup />} />
        <Route path='/Movies-Blocks/list' element={<Public />} />
      </Routes>
    </Router>
    
  );
}

export default App;
