import './App.css';
import Navbar from "./Components/Navbar"
import Home from "./Components/Home"
import About from "./Components/About"
import Signup from "./Components/Signup"
import Login from "./Components/Login"
import Cart from "./Components/Cart"
import {Routes,Route} from "react-router-dom";
import ConfirmP from './Components/ConfirmP';
import UpdateData from './Components/UpdateData';
function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/confirmPassword" element={<ConfirmP/>} />
      <Route path="/updateUser" element={<UpdateData/>} />
      </Routes>
    </div>
  );
}

export default App;
