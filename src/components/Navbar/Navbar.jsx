import { Menu } from "lucide-react"
import SearchBar from "../Common/SearchBar"
const Navbar = ({openSidebar}) => {
  return (
    <div className="nav-bar">

        <button className="button primary" onClick={openSidebar}><Menu size={19}/></button>
        <SearchBar/>
        <div className="nav-bar-auth">
          <button className="button primary">Login</button>
          <button className="button secondary">Register</button>
        </div>
    </div>
  )
}

export default Navbar