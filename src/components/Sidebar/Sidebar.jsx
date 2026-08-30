import { X } from "lucide-react"
const Sidebar = ({open,CloseSidebar}) => {
  return ( // controling with css 
    <>
        <div className={`side-bar-overlay ${open ? "visible":"invisible"}`} onClick={CloseSidebar}/>  
        <div className={`side-bar ${open ? "translate-x-0" : "-translate-x-full"}`}>
            <div className="side-heading">
                <button className="button primary" onClick={CloseSidebar}><X size={18}/></button>
                <h1>Sidebar</h1>
            </div>
        </div>
    </>
  )
}

export default Sidebar