import { Plus } from "lucide-react"
import { useCart } from "../../context/useCart"

const MenuItemCard = ({menuItem}) => {
    const {addItem} = useCart();
    const image = menuItem.image?.url
  return (
    <article className="menuItem-card">
        {
            image?(
                <img src={image} alt={menuItem.name || "Food"}/>
            ):(
                <div className="food-placeholder">🍲</div>
            )
        }
        <div className="menuItem-info">
            <h3>{menuItem.name || "Menu Item"}</h3>
            <p>{menuItem.description || "Freshly prepared and served with care."}</p>
            <div className="item-price">
                <strong>₹{menuItem.price}</strong> 
                <button className="add-btn" onClick={()=>addItem(menuItem)}>
                    <Plus size={16}/>
                    Add
                </button>
            </div>
        </div>
    </article>
  )
}

export default MenuItemCard