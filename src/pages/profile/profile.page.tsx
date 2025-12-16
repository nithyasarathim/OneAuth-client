import { useNavigate } from "react-router-dom";
import api from "../utils/axios";

const ProfilePage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/session/logout");
      navigate("/auth/login", { replace: true });
    } catch (err) {
      navigate("/auth/login", { replace: true });
    }
  };

  return (
    <div>
      <header className="flex justify-between items-center px-4 py-3 border-b">
        <h1 className="text-lg font-semibold">Profile</h1>

        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </header>
      <main className="p-4">
        <div>Hello world!</div>
      </main>
    </div>
  );
};

export default ProfilePage;
