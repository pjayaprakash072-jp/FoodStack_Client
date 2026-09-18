import { Plus } from "lucide-react"

const MenuItemCard = ({menuItem}) => {
    const image = menuItem.image?.url
  return (
    <article className="menuItem-card">
        <div className="menuItem-info">
            <h3>{menuItem.name || "Menu Item"}</h3>
            <strong>{menuItem.price}</strong>
            <p>{menuItem.description || "Freshly prepared and served with care."}</p>
            <button className="add-btn">
                <Plus size={16}/>
                Add
            </button>
        </div>
        {
            image?(
                <img src={image} alt={menuItem.name || "Food"}/>
            ):(
                <div className="food-placeholder">🍲</div>
            )
        }
    </article>
  )
}

export default MenuItemCard