import {  LayoutDashboard, ListOrdered, LogOut, ShoppingBag, Store, Utensils, X } from "lucide-react"
import { NavLink } from "react-router-dom"
import { useCart } from "../../context/useCart"
import { useAuth } from "../../context/useAuth"
const Sidebar = ({open,CloseSidebar}) => {
  const {logout} = useAuth();
  const {totalItems} = useCart();
  const userLinks = [
    {id:"dashboard",to:"/",label:"Dashboard",icon:LayoutDashboard},
    {id:"outlets",to:"/outlets",label:"Outlets",icon:Store},
    {id:"items",to:"/menu",label:"Menu Items",icon:Utensils},
    {id:"cart",to:"/cart",label:`Cart Items ${totalItems}`,icon:ShoppingBag},
    {id:"orders",to:"/orders",label:"Orders",icon:ListOrdered},
    {id:"logout", logout,label:"logout",icon:LogOut}
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
                  ({id,to,label,icon:Icon,logout})=>(
                    <NavLink 
                    key={id}
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