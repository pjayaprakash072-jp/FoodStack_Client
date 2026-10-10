import { lazy, Suspense } from "react";
import { Routes ,Route,Navigate, Outlet} from "react-router-dom"
import { useAuth } from './../context/useAuth';
// import Dashboard from "../pages/Dashboard/Dashboard.jsx"
// import DashboardLayout from './../components/Layout/DashboardLayout';
// import Login from "../pages/Auth/Login.jsx";
// import Register from "../pages/Auth/Register.jsx";
// import OutletList from "../pages/Outlet/OutletList.jsx";
// import OutletDetails from "../pages/Outlet/OutletDetails.jsx";
// import Menu from "../pages/Menu/Menu.jsx";
// import NotFound from "../pages/NotFound/NotFound.jsx";
// import Cart from "../pages/Cart/Cart.jsx";
// import Profile from "../pages/Profile/Profile.jsx";
// import Addresses from "../pages/Address/Addresses.jsx";
// import AddAddress from "../pages/Address/AddAddress.jsx";
// import Checkout from "../pages/Checkout/Checkout.jsx";
// import SelectAddress from "../pages/Checkout/SelectAddress.jsx";
// import Payment from "../pages/Checkout/Payment.jsx";
// import Orders from "../pages/Order/Orders.jsx";
// import TrackOrder from "../pages/Order/TrackOrder.jsx";
// import VerifyEmail from "../pages/Auth/VerifyEmail.jsx";
const Dashboard = lazy(()=>import('../pages/Dashboard/Dashboard.jsx'));
const DashboardLayout = lazy(()=>import("./../components/Layout/DashboardLayout"));
const Login = lazy(()=>import("../pages/Auth/Login.jsx"))
const Register = lazy(()=>import("../pages/Auth/Register.jsx"))
const OutletList = lazy(()=>import("../pages/Outlet/OutletList.jsx"))
const OutletDetails = lazy(()=>import("../pages/Outlet/OutletDetails.jsx"))
const Menu = lazy(()=>import("../pages/Menu/Menu.jsx"))
const NotFound = lazy(()=>import("../pages/NotFound/NotFound.jsx"))
const Cart = lazy(()=>import("../pages/Cart/Cart.jsx"))
const Profile = lazy(()=>import("../pages/Profile/Profile.jsx"))
const Addresses = lazy(()=>import("../pages/Address/Addresses.jsx"))
const AddAddress = lazy(()=>import("../pages/Address/AddAddress.jsx"))
const Checkout = lazy(()=>import("../pages/Checkout/Checkout.jsx"))
const SelectAddress = lazy(()=>import("../pages/Checkout/SelectAddress.jsx"))
const Payment = lazy(()=>import("../pages/Checkout/Payment.jsx"))
const Orders = lazy(()=>import("../pages/Order/Orders.jsx"))
const TrackOrder = lazy(()=>import("../pages/Order/TrackOrder.jsx"))
const VerifyEmail = lazy(()=>import("../pages/Auth/VerifyEmail.jsx"))

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
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>

          <Route element={<GuestOnly/>}>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/verify-email/:verificationToken" element={<VerifyEmail/>}/>
          </Route>
          <Route element={<Public/>}>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/outlets" element={<OutletList/>}/>
            <Route path="/outlet/:id" element={<OutletDetails/>}/>
            <Route path="/menu" element={<Menu/>}/>
            <Route path="/cart" element = {<Cart/>}/>
          </Route>
          <Route element={<Private/>}>
            <Route path="/Dashboard" element = {<Dashboard/>} />
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/payment" element={<Payment/>}/>
            <Route path="/checkout/:outletId" element={<Checkout/>}/>
            <Route path="/trackorder/:orderId" element={<TrackOrder/>}/>
            <Route path="/orders" element={<Orders/>}/>
            <Route path="/profile/addresses" element={<Addresses/>}/>
            <Route path="/profile/addaddress" element={<AddAddress/>}/>
            <Route path="/checkout/address" element={<SelectAddress/>}/>
          </Route>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Suspense>
  )
}

export default AppRoutes