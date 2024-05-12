/* eslint-disable react/prop-types */
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useDispatch } from "react-redux";

function LogoutBtn({ className = "" }) {
  let dispatch = useDispatch();
  let handleLogout = () => {
    authService.logout().then(dispatch(logout()));
  };
  return (
    <button className={`${className}`} onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutBtn;
