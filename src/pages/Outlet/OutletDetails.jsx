import { useEffect, useState } from "react";
import { useParams,Link} from "react-router-dom"
import outletService from "../../../../Frontend/src/services/outletService";
import { getErrorMessage } from "../../utils/api";
import Loader from "../../components/Common/Loader";
import { ArrowLeft, Clock3, MapPin, Star } from "lucide-react";



const OutletDetails = () => {
    const {id} = useParams();
    const [outlet,setOutlet] = useState(null);
    const [error,setError] = useState("");
    const [busy,setBusy] = useState(true);

    useEffect(
        ()=>{
            (async()=>{
                try {
                    const response = await outletService.getOne(id);
                    setOutlet(response.outlet)
                } catch (error) {
                    setError(getErrorMessage(error))
                }finally{
                    setBusy(false);
                }
            })();
        },[id]
    )
    if(busy) return <Loader label="Getting outlet"/>
    const image = outlet.image?.url
  return (
    <section className="section">
        <Link to="/outlets" className="back-link"><ArrowLeft size={17}/>Outlets</Link>
        {error && <div className="error">{error}</div>}
        <div className="outlet-detail">
            {
                image ? (
                    <img src={image} alt={outlet.name} />
                ):(
                    <div className="detail-placeholder">🍽️</div>
                )
            }
            <div>
                <span className="eyebrow">OUTLET</span>
                <h1>{outlet.name}</h1>
                <p>{outlet.description  || "Great food, freshly prepared."}</p>
                <div className="detail-meta">
                    <span>
                        <Star size={16}/> {outlet.rating || "4.2*"}
                    </span>
                    <span>
                        <Clock3 size={16}/> {outlet.deliveryTime || "25-35*"}
                    </span>
                    <span>
                        <MapPin size={16} />{outlet.city || "Nearby"}
                    </span>
                </div>
                <Link className="button primary" to={`/menu/${id}`}>view Menu</Link>
            </div>
        </div>
    </section>
  )
}

export default OutletDetails