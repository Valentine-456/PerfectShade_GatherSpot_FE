import { Routes, Route } from "react-router-dom";
import { AppRoutes } from "./types/AppRoutes";
import InviteUsers   from "./pages/EventPages/InviteUsers";
import Notifications from "./pages/Profile/Notifications";
import PublicRoute from "./security/PublicRoute";
import ProtectedRoute from "./security/ProtectedRoute";

import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Profile from "./pages/Profile/Profile";
import CreateEvent from "./pages/EventPages/CreateEvent";
import UpdateEvent from "./pages/EventPages/UpdateEvent";
import ViewEvent from "./pages/EventPages/ViewEvent";
import MapPage from "./pages/Map/MapPage";
import Friends from "./pages/Friends/Friends";
import UserProfile from "./pages/Profile/UserProfile";
import EventSuccess from "./pages/EventPages/EventSuccess";

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
        <Route path={AppRoutes.EVENT_CREATE} element={<CreateEvent />} />
        <Route path={AppRoutes.EVENT_UPDATE} element={<UpdateEvent />} />
        <Route path={AppRoutes.EVENT_VIEW} element={<ViewEvent />} />
        <Route path="/events/:id/invite" element={<InviteUsers />} />
        <Route path="/notifications"      element={<Notifications />} />
        <Route path={AppRoutes.MAP} element={<MapPage />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="/event-success/:id" element={<EventSuccess />} />
      </Route>

      <Route path={AppRoutes.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
}
