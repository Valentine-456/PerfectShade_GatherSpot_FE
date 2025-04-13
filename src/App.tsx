import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppRoutes } from "./types/AppRoutes";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.LOGIN} element={<Login />} />
        <Route path={AppRoutes.REGISTER} element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
