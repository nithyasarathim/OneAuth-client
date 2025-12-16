import { Routes, Route } from "react-router-dom";

import RegisterPage from "./pages/auth/register/register.page.tsx";
import GuestRoute from "./pages/globalComponents/GuestRoute.tsx";
import LoginPage from "./pages/auth/login/login.page.tsx";
import ProfilePage from "./pages/profile/profile.page.tsx";
import ProtectedRoute from "./pages/globalComponents/ProtectedRoute.tsx";

const App = () => {
  return (
    <Routes>
      <Route
        path="/auth/register"
        element={
          <GuestRoute>
            <RegisterPage />
          </GuestRoute>
        }
      />
      <Route
        path="/auth/login"
        element={
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        }
      />
      <Route
        path="/"
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
