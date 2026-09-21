
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from './../../context/useCart';
import EmptyState from '../../components/Common/EmptyState';
import CartItem from '../../components/Card/CartItem';
const Cart = () => {
    const {groupedItems} = useCart();
    if(!Object.keys(groupedItems).length){
        return (
            <div className="section">
                <div className="empty-icon">
                    <ShoppingBag/>
                </div>
                <EmptyState
                title ="Your cart is Empty"
                text="Add somethign delicious from a outlets."
                />
                <Link className="button primary" to="/outlets">Browse outlet</Link>
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
        <div className="cart-layout">
            {/* <div>
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
                    <b>{subTotal.toFixed(2)}</b>
                </div>
                <div>
                    <span>Delivery fee</span>
                    <b>{deliveryFee.toFixed(2)}</b>
                </div>
                <hr />
                <div>
                    <span className='total'>Total</span>
                    <b>{total.toFixed(2)}</b>
                </div>
                <button className="button primary full">
                    <Link  to="/checkout" className='link'>
                Proceed to checkout <ArrowRight size={17}/>
                </Link>
                </button>
            </aside> */}
            {
                Object.values(groupedItems).map(
                    (group)=>{
                        const deliveryFee = group.subTotal > 0 ? 40:0;
                        const total = group.subTotal + deliveryFee;
                        const outletId = typeof group.outlet === "object"?group.outlet._id : group.outlet;
                        const outletName = typeof group.outlet === "object"? group.outlet.name : "Outlet"
                        return (
                            <div className="cart-outlet" key={outletId}>
                                <h2>{outletName}</h2>
                                {
                                    group.items.map(
                                        (item)=>(
                                            <CartItem key={item._id} item={item}/>
                                        )
                                    )
                                }
                                <div className="outlet-summary">
                                    <div>
                                        <span>SubTotal</span>
                                        <b>{group.subTotal.toFixed(2)}</b>
                                    </div>
                                    <div>
                                        <span>Delivery Fee</span>
                                        <b>₹{deliveryFee.toFixed(2)}</b>
                                    </div>
                                    <div>
                                        <span>Total</span>
                                        <b>₹{total.toFixed(2)}</b>
                                    </div>
                                    <Link className="button primary" to={`/checkout/${outletId}`}>
                                    Proceed to Checkout
                                    <ArrowRight/>
                                    </Link>
                                </div>
                            </div>
                        )
                    }
                )
            }
        </div>
    </section>
  )
}

export default Cart