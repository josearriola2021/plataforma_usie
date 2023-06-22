import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FooterLayout } from "../layouts";
import { PrincipalView, ProductosInfoView, ProfileView } from "../pages";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/profile/:user" element={<ProfileView />} />
                <Route element={<FooterLayout/>}>
                    <Route path="/" element={<PrincipalView />} />
                    <Route path="/:nombre/:id" element={<ProductosInfoView />} />
                </Route>
            </Routes>
        </BrowserRouter>
      );
}
 
export default Router;
