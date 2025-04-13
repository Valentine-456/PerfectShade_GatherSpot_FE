import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppRoutes } from "./types/AppRoutes";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import Home from "./pages/Home/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.LOGIN} element={<Login />} />
        <Route path={AppRoutes.REGISTER} element={<Register />} />
        <Route path={AppRoutes.HOME} element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
