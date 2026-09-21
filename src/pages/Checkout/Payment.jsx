import { useNavigate } from "react-router-dom";
import useCheckout from "../../context/useCheckout"

const Payment = () => {
    const navigage = useNavigate();
    const {selectedPayment,setSelectedPayment} = useCheckout();
  return (
    <section className="section">
        <span className="eyebrow">Payment</span>
        <h1>Choose Payment</h1>
        <div className="payment-options">
            <label>
                <input 
                type="radio"
                checked = {selectedPayment === "COD"}
                onChange={()=> setSelectedPayment("COD")}
                /> {" "} Cash on Delivery
            </label>
            <label>
                <input 
                type="radio"
                checked = {selectedPayment === "UPI"}
                onChange={()=> setSelectedPayment("UPI")}
                /> {" "} Upi
            </label>
        </div>
        <button className="button primary" type="button" onClick={()=>navigage("/checkout")}> submit</button>
    </section>
  )
}

export default Payment