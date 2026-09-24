import { Routes ,Route,Navigate, Outlet} from "react-router-dom"
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
import Checkout from "../pages/Checkout/Checkout.jsx";
import SelectAdderss from "../pages/Checkout/SelectAdderss.jsx";
import Payment from "../pages/Checkout/Payment.jsx";
import Orders from "../pages/Order/Orders.jsx";
import TrackOrder from "../pages/Order/TrackOrder.jsx";

function GuestOnly(){
  const {isAuthenticated} = useAuth();

  return isAuthenticated?(
    <Navigate to="/" replace/>
  ):(
    <DashboardLayout><Outlet/></DashboardLayout>
  )
}

function Private(){
    const {isAuthenticated} = useAuth();
    return isAuthenticated ? 
    (
      <DashboardLayout><Outlet/></DashboardLayout>
    ):(
      <Navigate  to ="/login" replace/>
    )
    }
function Public(){

  return (
    <DashboardLayout><Outlet/></DashboardLayout>
  )
}
const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<GuestOnly/>}>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Route>
      <Route element={<Public/>}>
        <Route path="/outlets" element={<OutletList/>}/>
        <Route path="/outlet/:id" element={<OutletDetails/>}/>
        <Route path="/menu/:outletId" element={<Menu/>}/>
        <Route path="/cart" element = {<Cart/>}/>
      </Route>
      <Route element={<Private/>}>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/Dashboard" element = {<Dashboard/>} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/payment" element={<Payment/>}/>
        <Route path="/checkout/:outletId" element={<Checkout/>}/>
        <Route path="/trackorder/:orderId" element={<TrackOrder/>}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/profile/addresses" element={<Addresses/>}/>
        <Route path="/profile/addaddress" element={<AddAddress/>}/>
        <Route path="/checkout/address" element={<SelectAdderss/>}/>
      </Route>
        <Route path="*" element={<NotFound/>}/>
    </Routes>
  )
}

export default AppRoutes