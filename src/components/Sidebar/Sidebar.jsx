import { X } from "lucide-react"
const Sidebar = ({onClose}) => {
  return (
    <div>
        <div className="side-bar">
            <div className="side-heading">
                <button className="button primary" onClick={onClose}><X size={18}/></button>
                <h1>Sidebar</h1>
            </div>
        </div>
    </div>
  )
}

export default Sidebar