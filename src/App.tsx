import { Routes, Route } from "react-router-dom";

import RegisterPage from "./pages/auth/register/register.page.tsx";
import LoginPage from "./pages/auth/login/login.page.tsx";

const App = () => {
  return (
    <Routes>
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/" element={
        <div>
          I'm home
        </div>
      }
      />
    </Routes>
  );
};

export default App;
