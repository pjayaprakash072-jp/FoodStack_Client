import { Routes ,Route,Navigate} from "react-router-dom"
import Dashboard from "../pages/Dashboard/Dashboard.jsx"
import { useAuth } from './../context/useAuth';
import DashboardLayout from './../components/Layout/DashboardLayout';
import Login from "../pages/Auth/Login.jsx";
import Register from "../pages/Auth/Register.jsx";
import OutletList from "../pages/Outlet/OutletList.jsx";
import OutletDetails from "../pages/Outlet/OutletDetails.jsx";
import Menu from "../pages/Menu/Menu.jsx";
import NotFound from "../pages/NotFound/NotFound.jsx";
import Cart from "../pages/Cart/Cart.jsx";
import Profile from "../pages/Profile/Profile.jsx";
import Addresses from "../pages/Address/Addresses.jsx";
import AddAddress from "../pages/Address/AddAddress.jsx";


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
        <Route path="/outlet/:id" element={<DashboardLayout><OutletDetails/></DashboardLayout>}/>
        <Route path="/menu/:outletId" element={<DashboardLayout><Menu/></DashboardLayout>}/>\
        <Route path="/cart" element = {<DashboardLayout><Cart/></DashboardLayout>}/>
        <Route path="/profile" element={<Private><Profile/></Private>}/>
        <Route path="/profile/addresses" element={<Private><Addresses/></Private>}/>
        <Route path="/profile/addaddress" element={<DashboardLayout><AddAddress/></DashboardLayout>}/>
        <Route path="*" element={<DashboardLayout><NotFound/></DashboardLayout>}/>
    </Routes>
  )
}

export default AppRoutes