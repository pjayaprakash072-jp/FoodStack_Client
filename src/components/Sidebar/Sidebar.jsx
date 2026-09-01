import { X } from "lucide-react"
const Sidebar = ({open,CloseSidebar}) => {
  return ( // controling with css 
    <>
        <div className={`side-bar-overlay ${open ? "visible":"invisible"}`} onClick={CloseSidebar}/>  
        <div className={`side-bar ${open ? "translate-x-0" : "-translate-x-full"}`}>
            <div className="side-heading">
                <img src="/FS1.svg" alt="FS" width="25px" height="25px"/>
                <h1>Sidebar</h1>
                <button className="button primary" onClick={CloseSidebar}><X size={19}/></button>
            </div>
        </div>
    </>
  )
}

export default Sidebar