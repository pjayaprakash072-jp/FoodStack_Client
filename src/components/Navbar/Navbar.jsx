import { Menu, LogOut, UserCircle } from "lucide-react";
import SearchBar from "../Common/SearchBar";
import { useAuth } from "../../context/useAuth";

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
          src="/FS.svg" 
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
            <button className="nav-bar-right-button button primary">Login</button>
            <button className="nav-bar-right-button button secondary">Register</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
