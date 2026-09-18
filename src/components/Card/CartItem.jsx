import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../../context/useCart"

const CartItem = ({item}) => {
    const {updateQuantity, removeItem} = useCart();
    const id = item._id;
    const price = Number(item.price);
  return (
    <div className="cart-item">
        <div>
            <h3>{item.name}</h3>
            <p>{price}</p>
        </div>
        <div className="quantity">
            <button className="button" onClick={()=>updateQuantity(id,item.quantity -1)}>
                <Minus size={15}/>
            </button>
            <b>{item.quantity}</b>
            <button className="button" onClick={()=>updateQuantity(id, item.quantity+1)}>
                <Plus size={15}/>
            </button>
        </div>
        <strong>{price * item.quantity}</strong>
        <button className="icon-btn danger" onClick={()=>removeItem(id)}>
            <Trash2 size={17}/>
        </button>
    </div>
  )
}

export default CartItem