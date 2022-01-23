import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/navBar";
import Home from "./pages/home";
import SignIn from "./pages/signIn";
import Logout from "./components/logout";
import MyItems from "./pages/myItems";
import Sell from "./pages/sell";
import './App.css';
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-image-gallery/styles/css/image-gallery.css'



function App() {
    return (
        <div>
            <ToastContainer/>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<SignIn/>}/>
                <Route path="/sell" element={<Sell/>}/>
                <Route path="/my-items" element={<MyItems/>}/>
                <Route path="/logout" element={<Logout/>}/>
            </Routes>
        </div>
    );
}

export default App;
