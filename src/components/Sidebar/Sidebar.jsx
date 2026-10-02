import {  LayoutDashboard, ListOrdered, LogOut, ShoppingBag, Store, Utensils, X } from "lucide-react"
import { NavLink } from "react-router-dom"
import { useCart } from "../../context/useCart"
import { useAuth } from "../../context/useAuth"
const Sidebar = ({open,CloseSidebar}) => {
  const {logout} = useAuth();
  const {totalItems} = useCart();
  const userLinks = [
    {to:"/",label:"Dashboard",icon:LayoutDashboard},
    {to:"/outlets",label:"Outlets",icon:Store},
    {to:"/menu",label:"Menu Items",icon:Utensils},
    {to:"/cart",label:`Cart Items ${totalItems}`,icon:ShoppingBag},
    {to:"/orders",label:"Orders",icon:ListOrdered},
    {logout,label:"logout",icon:LogOut}
  ]
  return ( // controling with css 
    <>
        <div className={`side-bar-overlay ${open ? "visible":"invisible"}`} onClick={CloseSidebar}/>  
        <div className={`side-bar ${open ? "translate-x-0" : "translate-x-full md:-translate-x-full "}`}>
            <div className="side-heading">
                <img src="/FS13.svg" alt="FS" width="25px" height="25px"/>
                <h1>Sidebar</h1>
                <button className="button primary" onClick={CloseSidebar}><X size={19}/></button>
            </div>
            <nav>
              {
                userLinks.map(
                  ({to,label,icon:Icon,logout})=>(
                    <NavLink 
                    key={to}
                    to={to}
                    className = {({isActive})=> isActive ?"nav-link active":"nav-link"}
                    onClick={logout ? ()=>{logout();CloseSidebar();} : CloseSidebar}
                    >
                      <Icon size={19}/>
                      <span>{label}</span>
                    </NavLink>
                  )
                )
              }
            </nav>
        </div>
    </>
  )
}

export default Sidebar