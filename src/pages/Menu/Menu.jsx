import { useEffect, useState } from "react";
import {  useSearchParams } from "react-router-dom"
import menuItemService from "../../services/menuItemService";
import { getErrorMessage } from "../../utils/api";
import Loader from "../../components/Common/Loader"
import MenuItemCard from "../../components/Card/MenuItemCard";
import EmptyState from "../../components/Common/EmptyState";
const Menu = () => {
    const [params] = useSearchParams();
    const outletId = params.get("outlet")
    const [items,setItems] = useState([]);
    const [busy,setBusy] = useState(true);
    const [error,setError]= useState("");
    useEffect(
        ()=>{
            (async ()=>{
                try {
                    const response = outletId?  await menuItemService.byOutlet(outletId): await menuItemService.getAll();
                    setItems(response.menuItems)
                } catch (error) {
                    setError(getErrorMessage(error));
                }finally{
                    setBusy(false)
                }
            })();
        },[outletId]
    )

    if(busy) return <Loader label = "Loading Menu"/>
  return (
    <section className="section">
        <div className="section-heading">
            <div>
                <span className="eyebrow">Menu</span>
                <h1>Waht would you like ?</h1>
            </div>
        </div>
        {error && <div className="error">{error}</div>}
        {
            items.length ?(
                <div className="menuItem-grid">
                    {
                        items.map(
                            (x)=>(
                                <MenuItemCard key ={x._id} menuItem = {x}/>
                            )
                        )
                    }
                </div>
            ):(
                <EmptyState 
                title="Menu is empty"
                text="This Outlet has not added menu items yer"
                />
            )
        }
    </section>
  )
}

export default Menu