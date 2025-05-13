import { Routes, Route } from "react-router-dom";
import { AppRoutes } from "./types/AppRoutes";

import PublicRoute from "./security/PublicRoute";
import ProtectedRoute from "./security/ProtectedRoute";

import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Profile from "./pages/Profile/Profile";
import EventDetails from "./pages/EventDetails/EventDetails";
import CreateEvent from "./pages/EventPages/CreateEvent";
import UpdateEvent from "./pages/EventPages/UpdateEvent";

export default function App() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path={AppRoutes.LOGIN} element={<Login />} />
        <Route path={AppRoutes.REGISTER} element={<Register />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path={AppRoutes.HOME} element={<Home />} />
        <Route path={AppRoutes.PROFILE} element={<Profile />} />
        <Route path={AppRoutes.EVENT_DETAILS} element={<EventDetails />} />
        <Route path={AppRoutes.EVENT_CREATE} element={<CreateEvent />} />
        <Route path={AppRoutes.EVENT_UPDATE} element={<UpdateEvent />} />
      </Route>

      <Route path={AppRoutes.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
}