import { Routes, Route } from "react-router-dom";

import RegisterPage from "./pages/auth/register/register.page";
import GuestRoute from "./pages/globalComponents/GuestRoute";
import LoginPage from "./pages/auth/login/login.page";
import ProfilePage from "./pages/profile/profile.page";
import ProtectedRoute from "./pages/globalComponents/ProtectedRoute";
import SingleSignOn from "./pages/singleSignOn/sso.page";

const App = () => {
  return (
    <Routes>
      <Route
        path="/auth/register/*"
        element={
          <GuestRoute>
            <RegisterPage />
          </GuestRoute>
        }
      />

      <Route
        path="/auth/login/*"
        element={
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        }
      />

      <Route
        path="/sso"
        element={
          <ProtectedRoute>
            <SingleSignOn />
          </ProtectedRoute>
        }
      />

      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
