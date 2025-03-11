import { BrowserRouter, Routes, Route } from "react-router";
import {Navbar} from './components/Navbar/Navbar'
import { Footer } from "./components/Footer/Footer";
import { Home } from "./pages/Home/Home";
import { AboutUs } from "./pages/AboutUs/AboutUs";
import { SignIn } from "./pages/SignIn/SignIn";
import { SignUp } from "./pages/SignUp/SignUp";

function App() {

  return (
    <>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<Home/>} />
        <Route path='/aboutus' element={<AboutUs/>} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/signup' element={<SignUp/>} />
      </Routes>
      <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
