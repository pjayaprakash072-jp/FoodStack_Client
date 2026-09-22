import { CreditCard, MapPin } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useCart } from '../../context/useCart'
import useCheckout from './../../context/useCheckout';
import { useState } from 'react';
import { getErrorMessage } from '../../utils/api';
import orderService from '../../services/orderService';
import paymentService from '../../services/paymentService';
import { useRazorpay } from 'react-razorpay';
const Checkout = () => {
    const {outletId} = useParams();
    const {getItemsByOutlet,clearOutletcart} = useCart();
    const {selectedAddress,selectedPayment} = useCheckout();
    const [error,setError] = useState("");
    const navigate = useNavigate();
    const {Razorpay} = useRazorpay();
    const items = getItemsByOutlet(outletId);
    const subTotal = items.reduce(
        (sum,item)=> sum+ Number(item.price)*Number(item.quantity),0
    )
    const deliveryFee = subTotal>0? 40:0;
    const total = subTotal+deliveryFee;
    const placeOrder = async()=>{
        if(!selectedAddress){
            setError("Please select a delivery Address.");
            return;
        }
        if(!selectedPayment){
            setError("Please selece a payment method.");
            return;
        }
        if(!items.length){
            setError("This outlet cart is Empty");
            return;
        }
        try {
            setError("");
            const payload = {
                outlet:outletId,
                items,
                addressId:selectedAddress._id,
                paymentMethod:selectedPayment.method
            }
            console.log("Order payload" , payload)
            const response = await orderService.create(payload);
            console.log(response);
            await clearOutletcart(outletId);
            navigate("/orders")
        } catch (error) {
            setError(getErrorMessage(error));
        }
    }

    const  openRazorpay = (razorpayOrder)=>{
        if(!razorpayOrder){
            setError("Razorpay order was nto created.")
            return;
        }
        const options = {
            key:import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount:razorpayOrder.amount,
            currency:razorpayOrder.currency,
            order_id:razorpayOrder.id,
            name:"FoodStack",
            description:"foodStack Food Order",
            handler: async(paymentResponse) =>{
                try {
                    console.log("Payment successrul",paymentResponse)
                    // paymentResponse contains
                    // razorpay_order_id, razorpay_payment_id,razorpay_signature
                    const verifyPayload={
                        razorpay_order_id:paymentResponse.razorpay_order_id,
                        razorpay_payment_id:paymentResponse.razorpay_payment_id,
                        razorpay_signature:paymentResponse.razorpay_signature,
                        outlet:outletId,
                        items:items.map(
                            item=>(
                                {
                                    _id:item._id,
                                    quantity:item.quantity
                                }
                            )
                        ),
                        addressId:selectedAddress._id,
                        paymentMethod:selectedPayment.method
                    }
                    const verifyResponse = await paymentService.verify(verifyPayload);
                    console.log("Payment Verification",verifyResponse);
                    await clearOutletcart(outletId);
                    navigate("/orders")
                } catch (error) {
                    console.log("Payment verification failed",error);
                    setError(getErrorMessage(error));

                }

            },
            prefill:{
                name:selectedAddress?.fullName ||"",
                contack:selectedAddress?.phone ||""
            }
            ,
            theme:{
                color:"#ff6b35"
            }
        }
        const razorpay  = new  Razorpay(options);
        razorpay.open();
    }
    const handleUPIPayment = async()=>{
        if(!selectedAddress){
            setError("Please select a delivery Address.");
            return;
        }
        if(!selectedPayment){
            setError("Please selece a payment method.");
            return;
        }
        if(!items.length){
            setError("This outlet cart is Empty");
            return;
        }
        try {
            setError("");
            const payload = {
                outlet:outletId,
                items : items.map(
                    item=>(
                        {
                            _id:item._id,
                            quantity:item.quantity
                        }
                    )
                )
            }
            const response = await paymentService.create(payload);
            console.log("Razorpay order:",response);
            openRazorpay(response.razorpayOrder)
        } catch (error) {
            console.log("Razorpay creation failed",error);
            setError(getErrorMessage(error));
        }
    }
    const handlecheckout = ()=>{
        if(!selectedPayment){
            setError("Please select a pryment method");
            return;
        }
        if(selectedPayment.method === "UPI"){
            handleUPIPayment();
        }else{
            placeOrder();
        }
    }
    return (
    <section className="section">
        <span className="eyebrow">CHECKOUT</span>
        <h1>complete your order</h1>
        {error && <div className='error'>{error}</div>}
        <div className="checkout-cards">
            <Link to={`/profile/addresses?form=checkout&outletId=${outletId}`} className="choice-card">
            <MapPin/>
            <div>
                <h3>Delivery address</h3>
                <p>{ selectedAddress? `${selectedAddress.label}, ${selectedAddress.fullName}, ${selectedAddress.phone}`:"Choose where your order should be delivered"}</p>
            </div>
            </Link>
            <Link to={`/payment?outletId=${outletId}`} className="choice-card">
            <CreditCard/>
            <div>
                <h3>Paymet</h3>
                <p>{selectedPayment.method?`${selectedPayment.method}`:"Choose a payment method."} Current total:{total.toFixed(2)}</p>
            </div>
            </Link>
        </div>
        <button className={`button ${(!selectedAddress || !selectedPayment)?"disabled":"primary"} submitbtn`} 
        disabled={!selectedAddress || !selectedPayment || !items.length}
        onClick={handlecheckout}
        >{
            selectedPayment.method == "UPI" && selectedPayment.status !== "paid" ? `pay₹${total.toFixed(2)}`:"Place Order"
        }</button>
    </section>
  )
}

export default Checkout