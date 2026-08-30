import { useState } from "react"
import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar"

const DashboardLayout = () => {
    const[open,setOpen]=useState(false)
  return (
    <div>
        <Navbar onMenu={() => setOpen(true)}/>
        { open && <Sidebar onClose={()=>setOpen(false)}/>}
    </div>
  )
}

export default DashboardLayout