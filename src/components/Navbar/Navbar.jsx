import { Menu } from "lucide-react"
import SearchBar from "../Common/SearchBar"
import { useAuth } from "../../context/useAuth"
const Navbar = ({openSidebar}) => {
  const {token,logout} = useAuth();
  console.log(token)
  return (
    <div className="nav-bar">

        <button className="button primary" onClick={openSidebar}><Menu size={19}/></button>
        <SearchBar/>
        <div className="nav-bar-auth">
          {
            token ? (
              <button className="button primary" onClick={logout}>Lougout</button>
            ):(
              <>
                <button className="button primary">Login</button>
                <button className="button secondary">Register</button>
              </>
            )
          }
        </div>
    </div>
  )
}

export default Navbar