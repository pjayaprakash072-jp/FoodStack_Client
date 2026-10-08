import { useEffect, useState } from 'react';
import OrderStatus from './../../components/OrderStatus/OrderStatus';
import { Link, useParams } from 'react-router-dom';
import orderService from '../../services/orderService';
import { getErrorMessage } from '../../utils/api';
import Loader from '../../components/Common/Loader';
import socket from './../../services/socket';
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
                    const currentOrder = response.order
                    setOrder(currentOrder)
                    if(!socket.connected) {
                        socket.connect();
                    }
                    socket.emit("join-order",orderId);
                    socket.on("order-status-updated",(data)=>{
                        console.log(data)
                        if(String(data.orderId )=== String(orderId)){
                            setOrder(
                                (prev)=>(
                                    {
                                        ...prev,
                                        orderStatus:data.orderStatus
                                        //paymentStatus:data.paymentStatus
                                    }
                                )
                            )
                        }
                    })
                } catch (error) {
                    setError(getErrorMessage(error));
                }finally{
                    setBusy(false);
                }
            })()
            return ()=>{
                socket.off("order-status-updated");
                socket.emit("leave-order",orderId)
                socket.disconnect();
            }
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