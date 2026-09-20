import { CreditCard, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/useCart'
const Checkout = () => {
    const {subtotal} = useCart();
  return (
    <section className="section">
        <span className="eyebrow">CHECKOUT</span>
        <h1>complete your order</h1>
        <div className="checkout-cards">
            <Link to="/checkout/address" className="choice-card">
            <MapPin/>
            <div>
                <h3>Delivery address</h3>
                <p>Choose where your order should be delivered</p>
            </div>
            </Link>
            <Link to="/checkout/payment" className="choice-card">
            <CreditCard/>
            <div>
                <h3>Paymet</h3>
                <p>Choose a payment method. Current subtotal:{subtotal.toFixed(2)}</p>
            </div>
            </Link>
        </div>
    </section>
  )
}

export default Checkout