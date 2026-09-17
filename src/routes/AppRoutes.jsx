import { Routes ,Route,Navigate} from "react-router-dom"
import Dashboard from "../pages/Dashboard/Dashboard.jsx"
import { useAuth } from './../context/useAuth';
import DashboardLayout from './../components/Layout/DashboardLayout';
import Login from "../pages/Auth/Login.jsx";
import Register from "../pages/Auth/Register.jsx";
import OutletList from "../pages/Outlet/OutletList.jsx";


function Private({children}){
    const {isAuthenticated} = useAuth();
    return isAuthenticated? (
                            <DashboardLayout>
                                {children}
                            </DashboardLayout>
                    ):(
                                <Navigate  to ="/login"/>
                    )
    }
const AppRoutes = () => {
  return (
    <Routes>
        {/* <Route path="/" element={<Navigate to = "/dashboard" replace/>}/> */}
        <Route path="/" element={<DashboardLayout><Dashboard/></DashboardLayout>}/>
        <Route path="/login" element={<DashboardLayout><Login/></DashboardLayout>}/>
        <Route path="/register" element={<DashboardLayout><Register/></DashboardLayout>}/>
        <Route path="/Dashboard" element = {<Private><Dashboard/></Private>}/>
        <Route path="/outlets" element={<DashboardLayout><OutletList/></DashboardLayout>}/>

    </Routes>
  )
}

export default AppRoutes