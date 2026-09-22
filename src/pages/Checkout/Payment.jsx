import { useNavigate, useSearchParams } from "react-router-dom";
import useCheckout from "../../context/useCheckout"

const Payment = () => {
    const navigage = useNavigate();
    const [params] =useSearchParams();
    const outletId = params.get("outletId")
    const {selectedPayment,setSelectedPayment} = useCheckout();
  return (
    <section className="section">
        <span className="eyebrow">Payment</span>
        <h1>Choose Payment</h1>
        <div className="payment-options">
            <label>
                <input 
                type="radio"
                checked = {selectedPayment.method === "COD"}
                onChange={()=> setSelectedPayment(prev =>({...prev,method:"COD",razorpayOrderId:null,razorpayPaymentId:null,status:"not_required"}))}
                /> {" "} Cash on Delivery
            </label>
            <label>
                <input 
                type="radio"
                checked = {selectedPayment.method === "UPI"}
                onChange={()=> setSelectedPayment(prev =>({...prev,method:"UPI",razorpayOrderId:null,razorpayPaymentId:null,status:null}))}
                /> {" "} Upi
            </label>
        </div>
        <button className="button primary" type="button" onClick={()=>navigage(`/checkout/${outletId}`)}> submit</button>
    </section>
  )
}

export default Payment