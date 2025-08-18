import { useAuth } from "../../utils/useAuth";

function LogoutButton() {
  const { logout } = useAuth();

  return (
    <button
      onClick={logout}
      className="bg-red-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-700 transition"
    >
      Sair
    </button>
  );
}

export default LogoutButton;
