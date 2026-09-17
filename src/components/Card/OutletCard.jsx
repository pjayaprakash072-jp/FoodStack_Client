import { Clock3, Star } from "lucide-react"
import { Link } from "react-router-dom"

const OutletCard = ({outlet}) => {
    const id = outlet.id
    const image = outlet.image?.url
  return (
    <Link className="outlet-card" to={`/outlet/${id}`}>
    {
        image?(
            <img src={image} alt={outlet.name || "Outlet"}/>
        ):(
            <div className="image-placeholder">🍽️</div>
        )
    }
    <div className="card-body">
        <div className="row-between">
            <h3>{outlet.name || "Outlet"}</h3>
            <span className="rating">
                <Star size={15} fill="currentColor"/>{outlet.rating || "4.2"}
            </span>
        </div>
        <p>{outlet.description || "Delicious food && quick delivery"}</p>
        <small>
            <Clock3 size={15}/> {outlet.deliveryTime ||"25-35(Default)min"}
        </small>
    </div>
    </Link>
  )
}

export default OutletCard