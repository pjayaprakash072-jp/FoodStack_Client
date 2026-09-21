import { CreditCard, MapPin } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useCart } from '../../context/useCart'
import useCheckout from './../../context/useCheckout';
import { useState } from 'react';
import { getErrorMessage } from '../../utils/api';
import orderService from '../../services/orderService';
const Checkout = () => {
    const {outletId} = useParams();
    const {getItemsByOutlet,clearOutletcart} = useCart();
    const {selectedAddress,selectedPayment} = useCheckout();
    const [error,setError] = useState("");
    const navigate = useNavigate();
    const items = getItemsByOutlet(outletId);
    const subTotal = items.reduce(
        (sum,item)=> sum+ Number(item.price)*Number(item.quantity),0
    )
    const deliveryFee = subTotal>0? 40:0;
    const total = subTotal+deliveryFee;
    const placeOrder = async()=>{
        if(!selectedAddress){
            setError("Please select a delivery Address.");
            return;
        }
        if(!selectedPayment){
            setError("Please selece a payment method.");
            return;
        }
        if(!items.length){
            setError("This outlet cart is Empty");
            return;
        }
        try {
            setError("");
            const payload = {
                outlet:outletId,
                items,
                addressId:selectedAddress._id,
                paymentMethod:selectedPayment
            }
            console.log("Order payload" , payload)
            const response = await orderService.create(payload);
            console.log(response);
            await clearOutletcart(outletId);
            navigate("/orders")
        } catch (error) {
            setError(getErrorMessage(error));
        }
    }
    return (
    <section className="section">
        <span className="eyebrow">CHECKOUT</span>
        <h1>complete your order</h1>
        {error && <div className='error'>{error}</div>}
        <div className="checkout-cards">
            <Link to={`/profile/addresses?form=checkout&outletId=${outletId}`} className="choice-card">
            <MapPin/>
            <div>
                <h3>Delivery address</h3>
                <p>{ selectedAddress? `${selectedAddress.label}, ${selectedAddress.fullName}, ${selectedAddress.phone}`:"Choose where your order should be delivered"}</p>
            </div>
            </Link>
            <Link to={`/payment?outletId=${outletId}`} className="choice-card">
            <CreditCard/>
            <div>
                <h3>Paymet</h3>
                <p>{selectedPayment?`${selectedPayment}`:"Choose a payment method."} Current total:{total.toFixed(2)}</p>
            </div>
            </Link>
        </div>
        <button className={`button ${(!selectedAddress || !selectedPayment)?"disabled":"primary"} submitbtn`} 
        disabled={!selectedAddress || !selectedPayment || !items.length}
        onClick={placeOrder}
        >Place Order</button>
    </section>
  )
}

export default Checkout