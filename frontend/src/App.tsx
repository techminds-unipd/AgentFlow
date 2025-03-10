import { BrowserRouter, Routes, Route } from "react-router";
import {Navbar} from './components/Navbar/Navbar'
import { Footer } from "./components/Footer/Footer";
import { Home } from "./pages/Home/Home";
import { AboutUs } from "./pages/AboutUs/AboutUs";

function App() {

  return (
    <>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<Home/>} />
        <Route path='/aboutus' element={<AboutUs/>} />
      </Routes>
      <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
