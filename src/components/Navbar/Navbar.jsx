import { Menu, LogOut, UserCircle, ShoppingBag } from "lucide-react";
// import SearchBar from "../Common/SearchBar";
import { useAuth } from "../../context/useAuth";
import { NavLink } from "react-router-dom";
import { useCart } from "../../context/useCart";
import { useEffect, useState } from "react";
import Modal from "../Common/Modal";
import Login from "../../pages/Auth/Login";
import Register from "../../pages/Auth/Register";
import useOpenModal from './../../context/useOpenModal';

  const userLinks = [
    {to:"/",label:"Dashboard"},
    {to:"/outlets",label:"Outlets"},
    {to:"/menu",label:"Menu Items"},
    {to:"/cart",label:"Cart"},
    // {to:"/orders",label:"Orders"}
  ]
const Navbar = ({ openSidebar }) => {
  const { token, logout } = useAuth();
  const { totalItems } = useCart();
  const {openLogin,openRegister,setOpenLogin,setOpenRegister,loginPage,registerPage} = useOpenModal();
  const [dark,setDark] = useState(
    ()=>{
      return localStorage.getItem("theme") === "dark";
    }
  );
  useEffect(
    ()=>{
      document.documentElement.classList.toggle("dark",dark);
      localStorage.setItem("theme" , dark? "dark":"light")
    },[dark]
  )

  return (
    <header className="navbar">
      <div className="navbar-body">
          <div className="navbar-start">
            {token ? (
              <button className="button primary" onClick={openSidebar}>
                <Menu size={19} />
              </button>
            ) : (
              <NavLink to="/">
                <img src="/FS1.png" className="navbar-logo" />
              </NavLink>
            )}
            <strong className="navbar-title">FoodStack</strong>
          </div>

          <div className="navbar-links">
            <button 
            onClick={()=>setDark(!dark)}
            className="button">{dark? "☀️":"🌙"}</button>
            {
              userLinks.map(
                ({to,label})=>(
                  <NavLink
                  key={to}
                  to={to}
                  className={({isActive})=> `navbar-link ${label === 'Cart' ? "cart-link": isActive? "navbar-link-active":""}`}
                  >
                    <span>{label}</span>
                    {label ==='Cart'? <><ShoppingBag size={19} />{totalItems > 0 && <b>{totalItems}</b>}</>:""}
                  </NavLink>
                )
              )
            }
          </div>
          <div className="navbar-actions">
            {token ? (
              <>
                <button className="navbar-right-button">
                  <NavLink to="/profile">
                    <UserCircle size={30} />
                  </NavLink>
                </button>
                  <button type="button" className="btn btn-logout " onClick={logout}>
                    <LogOut size={19} />
                    <span>logout</span>
                  </button>
              </>
            ) : (
              <>
                  <button className="btn btn-login" onClick={loginPage}>Login</button>
                  <button className="btn btn-reg" onClick={registerPage}>Register</button>
              </>
            )}
          </div>
      <div className="md:hidden">
        {
          userLinks.map(
            ({to,label})=>(
              <NavLink
              key={to}
              to={to}
              >
                <span>{label}</span>
              </NavLink>
            )
          )
        }
      </div>
      </div>
      <Modal open={openLogin} close={()=>setOpenLogin(false)} title="Login">
        <Login openReg = {registerPage}/>
      </Modal>
      <Modal open={openRegister} close={()=>setOpenRegister(false)} title="Register">
        <Register openLog={loginPage}/>
      </Modal>
    </header>
  );
};

export default Navbar;
