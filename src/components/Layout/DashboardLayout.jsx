import { useState } from "react"
import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar"

const DashboardLayout = () => {
    const[open,setOpen]=useState(false);// open is just a state like it is used to set state(open/close) for sidebar.
  return (
    <div>
        <Navbar openSidebar={() => setOpen(true)}/>
        <Sidebar open={open} CloseSidebar={()=>setOpen(false)}/>
    </div>
  )
}

export default DashboardLayout