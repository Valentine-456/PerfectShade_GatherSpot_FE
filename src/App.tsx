import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppRoutes } from "./types/AppRoutes";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.LOGIN} element={<Login />} />
        <Route path={AppRoutes.REGISTER} element={<Register />} />
        <Route path={AppRoutes.HOME} element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
