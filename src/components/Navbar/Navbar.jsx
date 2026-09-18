import { Menu, LogOut, UserCircle, ShoppingBag } from "lucide-react";
// import SearchBar from "../Common/SearchBar";
import { useAuth } from "../../context/useAuth";
import { NavLink } from "react-router-dom";
import { useCart } from "../../context/useCart";

const Navbar = ({ openSidebar }) => {
  const { token, logout } = useAuth();
  const {totalItems} = useCart();

  return (
    <div className="nav-bar">
      <div className="nav-bar-left">
        {token ? (
          <button className="button primary" onClick={openSidebar}>
            <Menu size={19} />
          </button>
        ) : (
          <NavLink to="/">
            <img 
            src="/FS1.svg" 
            />
          </NavLink>
        )}
      </div>
      <div className="nav-bar-search">
        {/* <SearchBar /> */} <h1>FoodStack</h1>
      </div>

      <div className="nav-bar-right">
        <NavLink to="/outlets">Outlets</NavLink>
        <NavLink to="/cart" className="cart-link">
        <ShoppingBag size={19}/> Cart 
        {
          totalItems >0 && <b>{totalItems}</b>
        }
        </NavLink>
        {token ? (
          <>
            <button className="nav-bar-right-button">
              
              <UserCircle size={30}/>
            </button>
            <button className="button primary" 
            onClick={logout}>
              <LogOut size={19} />
            </button>
          </>
        ) : (
          <>
          <NavLink to="/log">
            <button className=" button">Login</button>
          </NavLink>
          <NavLink to="/register">
            <button className=" button">Register</button>
          </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
