import { BrowserRouter, Routes, Route } from "react-router";
import { Navbar } from "./components/Navbar/Navbar";
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
import { AddAccount } from "./pages/Services/AddAccount";
import { GoogleTokenProvider } from "./context/GoogleTokenContext";

function App() {
    return (
        <>
            <AuthProvider>
                <GoogleTokenProvider>
                    <BrowserRouter>
                        <Navbar />
                        <Routes>
                            <Route index element={<Home />} />
                            <Route path="/aboutus" element={<AboutUs />} />
                            <Route element={<AnonymousRoute />}>
                                <Route path="/signin" element={<SignIn />} />
                                <Route path="/signup" element={<SignUp />} />
                            </Route>
                            <Route element={<PrivateRoute />}>
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/workflow" element={<Workflow />} />
                                <Route path="/services" element={<Services />} />
                                <Route path="/services/addAccount" element={<AddAccount />} />
                            </Route>
                        </Routes>
                        <Footer />
                    </BrowserRouter>
                </GoogleTokenProvider>
            </AuthProvider>
        </>
    );
}

export default App;
