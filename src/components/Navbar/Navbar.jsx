import { Menu } from "lucide-react"
const Navbar = ({openSidebar}) => {
  return (
    <div className="nav-bar">

        <button className="button primary" onClick={openSidebar}><Menu size={18}/></button>
    </div>
  )
}

export default Navbar