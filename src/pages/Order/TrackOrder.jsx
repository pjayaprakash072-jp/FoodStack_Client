import { useEffect, useState } from 'react';
import OrderStatus from './../../components/OrderStatus/OrderStatus';
import { Link, useParams } from 'react-router-dom';
import orderService from '../../services/orderService';
import { getErrorMessage } from '../../utils/api';
import Loader from '../../components/Common/Loader';
const TrackOrder = () => {
    const {orderId} = useParams();
    const [order,setOrder] = useState(null);
    const [error,setError] = useState("");
    const [busy,setBusy] = useState(true);
    useEffect(
        ()=>{
            (async()=>{
                try {
                    const response = await orderService.getOne(orderId);
                    setOrder(response.order)
                } catch (error) {
                    setError(getErrorMessage(error));
                }finally{
                    setBusy(false);
                }
            })()
        },[orderId]
    )
    if(busy) return <Loader label='Tracking the order'/>
  return (
    <section className="section">
        <span>LIVE STATUS</span>
        <h1>Track order for {orderId}</h1>
        {error && <div className='error'>{error}</div>}
        <div className="tracking-card">
            <OrderStatus status={`${order.orderStatus}`}/>
            <p>Your order is preparing.</p>
        </div>
        <Link to="/orders" className='button primary'>Order History</Link>
    </section>
  )
}

export default TrackOrder