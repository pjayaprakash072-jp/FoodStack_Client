import { useEffect } from "react";
import { useState } from "react"
import addressService from '../../services/addressService';
import { getErrorMessage } from "../../utils/api";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import EmptyState from '../../components/Common/EmptyState';
import Loader from "../../components/Common/Loader";
import AddressCard from "../../components/Card/AddressCard";
import useCheckout from "../../context/useCheckout";
const Addresses = () => {
    const [items,setItems] = useState([]);
    const [busy,setBusy] = useState(true);
    const [error,setError] = useState("");
    const [params] = useSearchParams();
    const fromCheckout = params.get("form") === "checkout"
    const {setSelectedAddress} = useCheckout();
    const navigate = useNavigate();
    useEffect(
        ()=>{
            (async()=>{
                try {
                    const response = await addressService.getall();
                    setItems(response.addresses);
                } catch (error) {
                    setError(getErrorMessage(error));
                }finally{
                    setBusy(false)
                }
            })();
        },[]
    )

    const remove = async(id)=>{
        await addressService.delete(id);
        setItems(
            (x)=> x.filter((a)=>a._id != id)
        )
    }
    if(busy) return <Loader label="Finding Saved Addresses"/>
  return (
    <section className="section">
        <div className="section-headign">
            <div>
                <span className="eyebrow">PROFILE</span>
                <h1>Addresses</h1>
            </div>
            <Link className="button primary" to="/profile/addaddress">
            Add
            </Link>
        </div>
        {error && <div className="error">{error}</div>}
        {
            items.length ?(
                items.map(
                    (a)=>(
                        <AddressCard 
                        key={a._id} 
                        a = {a} 
                        select={fromCheckout}
                        selecetThis={
                            fromCheckout ?
                            ()=>{
                                setSelectedAddress(a);
                                navigate("/checkout")
                            }:undefined
                        }
                        remove= {remove}/>
                    )
                )
            ):(
                <EmptyState
                title="No saved Address"
                text="Add your first delivery Address"
                />
            )
        }
    </section>
  )
}

export default Addresses