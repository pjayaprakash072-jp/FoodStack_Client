import { lazy, Suspense } from "react";
import { Routes ,Route,Navigate, Outlet} from "react-router-dom"
import { useAuth } from './../context/useAuth';
import { toast } from "sonner";
const Dashboard = lazy(()=>import('../pages/Dashboard/Dashboard.jsx'));
const DashboardLayout = lazy(()=>import("./../components/Layout/DashboardLayout"));
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
      <>
      {
        toast.error("Please Login")
      }
      <Navigate  to ="/" replace/>
      </>
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