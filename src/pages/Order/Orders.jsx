import { useEffect, useState } from "react"
import orderService from './../../services/orderService';
import { getErrorMessage } from "../../utils/api";
import Loader from '../../components/Common/Loader'
import { Link } from "react-router-dom";
import EmptyState from './../../components/Common/EmptyState';

const Orders = () => {
    const [orders,setOrders] = useState([]);
    const [busy,setBusy] = useState(true);
    const [error,setError] = useState("");
    useEffect(
        ()=>{
            (async ()=>{
                try {
                    const response = await orderService.getall();
                    setOrders(response.orders)
                } catch (error) {
                    setError(getErrorMessage(error));
                }finally{
                    setBusy(false)
                }
            })();
        },[orders]
    )
    if(busy) return <Loader label="Loading orders"/>
  return (
    <section className="section">
        <span className="eyebrow">HISTORY</span>
        <h1>Your orders</h1>
        {error && <div className="error">{error}</div>}
        {
            orders.length?(
                <div className="order-list">
                    {
                        orders.map(
                            (o)=>(
                                <Link 
                                className="order-card"
                                // to={`/order/${o._id}`}
                                to={`/trackorder/${o._id}`}
                                key={o._id}
                                >
                                    <div>
                                        <b>Order #{String(o._id).slice(-6)}</b>
                                        <p>{o.orderStatus || "placed"}</p>
                                    </div>
                                    <strong>{o.totalAmount}</strong>
                                </Link>
                            )
                        )
                    }
                </div>
                ):(
                    <EmptyState
                    title="No orders yer"
                    text="Your orders will appear here."
                    />
                )
        }
    </section>
  )
}

export default Orders