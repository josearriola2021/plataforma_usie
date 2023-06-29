import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FooterLayout } from "../layouts";
import { PrincipalView, ProductosInfoView, ProfileView, SesionView } from "../pages";
import ProtectedRoute from "../utils/ProtectedRoute.js"
import { useState, useContext } from "react";
import { AuthContext } from '../context/AuthContext';
import { useLocalStorage } from "react-use";

const Router = () => {

    const { userAuth } = useContext(AuthContext);
    // const [user, setUser] = useState(false);


    const [user, setUser] = useLocalStorage("userAuth");

    // if (userAuth != "Iniciar Sesión") {
    //     setUser(true);
    // } else {
    //     console.log(user);
    // } 

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SesionView />} />
                    <Route path="/profile/:user" element={<ProfileView />} />
                    <Route element={<FooterLayout/>}>
                        <Route element={<ProtectedRoute canActivate={user} />} >
                            <Route path="/USIE" element={<PrincipalView />} />
                        </Route>
                        <Route path="/:USIE/:nombre/:id" element={<ProductosInfoView />} />
                    </Route>
            </Routes>
        </BrowserRouter>
      );
}
 
export default Router;
