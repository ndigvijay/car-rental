import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cars from './pages/Cars';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import "./index.css";
import AdminLogin from './pages/admin';
import CreateCars from './pages/car-create';
import UpdateCar from './pages/update-car';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import DeleteCar from './pages/DeleteCar';
import Rent from "./pages/Rent";

const App = () => {

  return ( 
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/about-us' element={<AboutUs />}/>
        <Route path='/contact-us' element={<ContactUs />}/>
        <Route path='/cars' element={<Cars />}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup />}/>
        <Route path='/admin' element={<AdminLogin/>} />
        <Route path='/rent' element={<Rent />} />
        <Route path='/createcar' element={<CreateCars/>} />
        <Route path='/updateCar' element={<UpdateCar/>} />
        <Route path='/deletecar' element={<DeleteCar/>} />
      </Routes>
    </Router>
  );
}   
 
export default App;
