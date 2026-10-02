import { Menu, LogOut, UserCircle, ShoppingBag } from "lucide-react";
// import SearchBar from "../Common/SearchBar";
import { useAuth } from "../../context/useAuth";
import { NavLink } from "react-router-dom";
import { useCart } from "../../context/useCart";

  const userLinks = [
    {to:"/",label:"Dashboard"},
    {to:"/outlets",label:"Outlets"},
    {to:"/menu",label:"Menu Items"},
    {to:"/orders",label:"Orders"}
  ]
const Navbar = ({ openSidebar }) => {
  const { token, logout } = useAuth();
  const { totalItems } = useCart();

  return (
    <div className="navbar">
        <div className="navbar-t">
          <div className="navbar-t-l">
            {token ? (
              <button className="button primary" onClick={openSidebar}>
                <Menu size={19} />
              </button>
            ) : (
              <NavLink to="/">
                <img src="/FS13.svg" />
              </NavLink>
            )}
          </div>
          <div className="navbar-search">{/* <SearchBar /> */}<h1>FoodStack</h1></div>

          <div className="navbar-t-r">
            <NavLink to="/menu" className="md-only">Items</NavLink>
            <NavLink to="/outlets" className="md-only">Outlets</NavLink>
            <NavLink to="/cart" className="cart-link">
              <ShoppingBag size={19} /> <span className="md-only">Cart</span>
              {totalItems > 0 && <b>{totalItems}</b>}
            </NavLink>
            {token ? (
              <>
                <button className="navbar-right-button">
                  <NavLink to="/profile">
                    <UserCircle size={30} />
                  </NavLink>
                </button>
                <div className="md-only">
                  <button className="button primary " onClick={logout}>
                    <LogOut size={19} />
                  </button>
                </div>
              </>
            ) : (
              <>
                <NavLink to="/login">
                  <button className=" button">Login</button>
                </NavLink>
                <NavLink to="/register">
                  <button className=" button">Register</button>
                </NavLink>
              </>
            )}
          </div>
        </div>
      <div className=" navbar-b links">
        {
          userLinks.map(
            ({to,label})=>(
              <NavLink
              to={to}
              >
                <span>{label}</span>
              </NavLink>
            )
          )
        }
      </div>
    </div>
  );
};

export default Navbar;
