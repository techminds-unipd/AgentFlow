import { BrowserRouter, Routes, Route } from "react-router";
import {Navbar} from './components/Navbar/Navbar'
import { Footer } from "./components/Footer/Footer";
import { Home } from "./pages/Home/Home";
import { AboutUs } from "./pages/AboutUs/AboutUs";
import { SignIn } from "./pages/SignIn/SignIn";
import { SignUp } from "./pages/SignUp/SignUp";
import { Services } from "./pages/Services/Services";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Workflow } from "./pages/Workflow/Workflow";
import { AuthProvider } from "./context/AuthContext";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { AnonymousRoute } from "./components/AnonymousRoute/AnonymousRoute";

function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Home/>} />
          <Route path='/aboutus' element={<AboutUs/>} />
          <Route element={<AnonymousRoute />}>
            <Route path='/signin' element={<SignIn/>} />
          </Route>
          <Route element={<AnonymousRoute />}>
            <Route path='/signup' element={<SignUp/>} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path='/dashboard' element={<Dashboard/>} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path='/workflow' element={<Workflow/>} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path='/services' element={<Services/>} />
          </Route>
        </Routes>
        <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
