import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FooterLayout } from "../layouts";
import { PrincipalView, ProductosInfoView, ProfileView, SesionView } from "../pages";
import ProtectedRoute from "../utils/ProtectedRoute.js"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SesionView />} />
                    <Route path="/profile/:user" element={<ProfileView />} />
                    <Route element={<FooterLayout/>}>
                        <Route element={<ProtectedRoute canActivate={true} />} >
                            <Route path="/USIE" element={<PrincipalView />} />
                        </Route>
                        <Route path="/:USIE/:nombre/:id" element={<ProductosInfoView />} />
                    </Route>
            </Routes>
        </BrowserRouter>
      );
}
 
export default Router;
