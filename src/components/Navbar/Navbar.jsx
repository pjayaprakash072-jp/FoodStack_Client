import { Menu, LogOut, UserCircle } from "lucide-react";
import SearchBar from "../Common/SearchBar";
import { useAuth } from "../../context/useAuth";
import { NavLink } from "react-router-dom";

const Navbar = ({ openSidebar }) => {
  const { token, logout } = useAuth();

  return (
    <div className="nav-bar">
      <div className="nav-bar-left">
        {token ? (
          <button className="button primary" onClick={openSidebar}>
            <Menu size={19} />
          </button>
        ) : (
          <img 
          src="/FS1.svg" 
          />
        )}
      </div>
      <div className="nav-bar-search">
        <SearchBar />
      </div>

      <div className="nav-bar-right">
        {token ? (
          <>
            <button className="nav-bar-right-button">
              
              <UserCircle size={22} />
            </button>
            <button className="nav-bar-right-button button primary" 
            onClick={logout}>
              <LogOut size={19} />
            </button>
          </>
        ) : (
          <>
          <NavLink to="/login">
            <button className="nav-bar-right-button button primary">Login</button>
          </NavLink>
          <NavLink to="/register">
            <button className="nav-bar-right-button button secondary">Register</button>
          </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
