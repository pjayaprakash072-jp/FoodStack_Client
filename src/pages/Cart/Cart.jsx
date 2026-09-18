
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from './../../context/useCart';
import EmptyState from '../../components/Common/EmptyState';
import CartItem from '../../components/Card/CartItem';
const Cart = () => {
    const {items,subtotal} = useCart();
    const delivery = subtotal ? 40:0;
    const total = subtotal+delivery;
    if(!items.length){
        return (
            <div className="section">
                <div className="empty-icon">
                    <ShoppingBag/>
                </div>
                <EmptyState
                title ="Your cart is Empty"
                text="Add somethign delicious from a outlets."
                />
                <Link className="button" to="/outlets">Browse outlet</Link>
            </div>
        )
    }
  return (
    <section className="section">
        <div className="section-heading">
            <div>
                <span className="eyebrow">YOUR ORDER</span>
                <h1>Cart</h1>
            </div>
        </div>
        <div className="card-layout">
            <div>
                {
                    items.map(
                        (x)=>(
                            <CartItem key={x._id} item={x}/>
                        )
                    )
                }
            </div>
            <aside className="summary">
                <h2>Bill details</h2>
                <div>
                    <span>subtotal</span>
                    <b>{subtotal.toFixed(2)}</b>
                </div>
                <div>
                    <span>Delivery fee</span>
                    <b>{delivery.toFixed(2)}</b>
                </div>
                <div>
                    <span>Total</span>
                    <b>{total.toFixed(2)}</b>
                </div>
                <Link className="button primary" to="/checkout">
                Proceed to checkout <ArrowRight size={17}/>
                </Link>
            </aside>
        </div>
    </section>
  )
}

export default Cart