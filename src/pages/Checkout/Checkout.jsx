import { CreditCard, MapPin } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/useCart'
import useCheckout from './../../context/useCheckout';
import { useState } from 'react';
import { getErrorMessage } from '../../utils/api';
import orderService from '../../services/orderService';
const Checkout = () => {
    const {items,total,clearCart} = useCart();
    const {selectedAddress,selectedPayment} = useCheckout();
    const [error,setError] = useState("");
    const navigate = useNavigate();
    const placeOrder = async()=>{
        try {
            const payload = {
                items,
                addressId:selectedAddress._id,
                paymentMethod:selectedPayment
            }
            console.log(payload)
            const response = await orderService.create(payload);
            console.log(response);
            clearCart();
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
            <Link to="/profile/addresses?form=checkout" className="choice-card">
            <MapPin/>
            <div>
                <h3>Delivery address</h3>
                <p>{ selectedAddress? `${selectedAddress.label}, ${selectedAddress.fullName}, ${selectedAddress.phone}`:"Choose where your order should be delivered"}</p>
            </div>
            </Link>
            <Link to="/payment" className="choice-card">
            <CreditCard/>
            <div>
                <h3>Paymet</h3>
                <p>{selectedPayment?`${selectedPayment}`:"Choose a payment method."} Current total:{total.toFixed(2)}</p>
            </div>
            </Link>
        </div>
        <button className={`button ${(!selectedAddress || !selectedPayment)?"disabled":"primary"} submitbtn`} 
        disabled={!selectedAddress || !selectedPayment}
        onClick={placeOrder}
        >Place Order</button>
    </section>
  )
}

export default Checkout