import { Menu } from "lucide-react"
const Navbar = ({onMenu}) => {
  return (
    <div className="nav-bar">

        <button className="button primary" onClick={onMenu}><Menu size={18}/></button>
    </div>
  )
}

export default Navbar