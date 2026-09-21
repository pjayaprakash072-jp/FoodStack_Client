import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from './useAuth';
import cartService from "../services/cartService";


export const CartContext = createContext(null);

export const CartProvider = ({children})=>{
    const {isAuthenticated} = useAuth();
    const [items,setItems] = useState([]);
    const [Loading,setLoading] = useState(false);

    const formatCartItems = useCallback((cartItems=[])=>{
        return cartItems.filter((x)=>x?.item).map(
            (x)=>(
                {
                    ...x.item,
                    quantity:x.quantity
                }
            )
        )
    },[])
    useEffect(
        ()=>{
            const loadCart = async()=>{
                if(!isAuthenticated){
                    try{
                        const guestCart = JSON.parse(localStorage.getItem("foodstack_cart") || "[]");
                        setItems(
                            Array.isArray(guestCart)? guestCart:[]
                        );
                    }catch(error){
                        console.log("Failed to load gurst cart",error)
                        setItems([]);
                    }
                    return
                }
                setLoading(true);
                try {
                    const guestCart = JSON.parse(localStorage.getItem("foodstack_cart") || "[]");
                    let data;
                    if(guestCart.length >0){
                        data = await cartService.merge(guestCart);
                        localStorage.removeItem("foodstack_cart");
                    }else{
                        data = await cartService.getall();
                    }
                    setItems(
                        formatCartItems(data.cartItems)
                    )
                } catch (error) {
                    console.log("Failed to load cart"),
                    error
                }finally{
                    setLoading(false);
                }
            };
            loadCart();
        },[isAuthenticated,formatCartItems]
    )
    useEffect(
        ()=>{
            if(!isAuthenticated){
                localStorage.setItem("foodstack_cart",JSON.stringify(items));
            }
        },
        [items,isAuthenticated]
    )
    const addItem = useCallback(async(item)=>{
        if(!isAuthenticated){
            setItems(
                (currnt)=>{ // currnt is the exinsting the Array of itemsin local storage.
                    const id = item._id;
                    const found = currnt.find((x)=>x._id === id)
                    if(found){
                        return currnt.map(
                            (x)=>(
                                x._id === id ? {...x,quantity:x.quantity+1} : x
                            )
                        )
                    }
                    return [...currnt,{...item,quantity:1}];
                }
            );
            return;
        }
        try{
            const data = await cartService.add(item._id);
            setItems(
                formatCartItems(data.cartItems)
            )
        }catch(error){
            console.log("Failed to add item",
                error
            )
        }
    },[isAuthenticated,formatCartItems]
)


// addItem(item)
//      ↓
// get item's _id
//      ↓
// Does _id already exist in current?
//      ↓
//  ┌───────────────┐
//  │               │
// YES             NO
//  │               │
//  ↓               ↓
// map()           add item
//  │               │
//  ↓               ↓
// quantity + 1    quantity: 1


const removeItem =useCallback(async(id)=>{
    if(!isAuthenticated){
        setItems(
            (current)=> current.filter( (x)=> x._id !== id)
        )
        return;
    }
    try {
        const data = await cartService.remove(id);
        setItems(formatCartItems(data.cartItems));
    } catch (error) {
        console.log(
            "Failed to remove item",
            error
        )
    }
},[isAuthenticated,formatCartItems]
)

const updateQuantity = useCallback(async(id,quantity)=>{
    if(quantity <=0){
        await removeItem(id);
        return;
    } 
    if(!isAuthenticated){
        setItems(
            (current)=>(
                current.map(
                    (x)=>(
                        x._id === id ? {...x , quantity} :x
                    )
                )
            )
        )
        return;
    }
    try {
        const data = await cartService.update(id,quantity);
        setItems(
            formatCartItems(data.cartItems)
        )
    } catch (error) {
        console.log(
            "Failed to update quality",
            error
        )
    }
},[isAuthenticated,formatCartItems,removeItem]);

const clearCart = useCallback(async()=>{
    if(!isAuthenticated){
        setItems([]);
        return;
    }
    try{
        await cartService.clear();
        setItems([]);
    }catch(error){
        console.log(
            "Failed to clear cart",
            error
        )
    }
},[isAuthenticated])
// TOTAL ITEMS
const groupedItems = useMemo(
    ()=>{
        return items.reduce(
            (groups,item)=>{
                const outletId = typeof item.outlet === "object" ? item.outlet._id : item.outlet;
                // if(!outletId){
                //     return groups;
                // }
                if(!groups[outletId]){
                    groups[outletId] = {
                        outlet: item.outlet,
                        items:[],
                        subTotal:0
                    }
                }
                groups[outletId].items.push(item);
                groups[outletId].subTotal += Number(item.price)* item.quantity;
                return groups;
            },
            {}
        )
    },[items]
)
const getItemsByOutlet =useCallback (
    (outletId) =>{
        return items.filter(
            (item)=>{
                const itemOutletId = typeof item.outlet === "object" ? item.outlet._id: item.outlet;
                return String(itemOutletId) === String(outletId)
            }
        )
    },[items]
)
const clearOutletcart = useCallback(async(outletId)=>{
    if(!isAuthenticated){
        setItems(
            (current)=>
                current.filter(
                    (item)=>{
                        const itemOutletId = typeof item.outlet === "object"? item.outlet._id : item.outlet;
                        return String(itemOutletId) !== String(outletId)
                    }
                )
        )
        return;
    }
    try {
        const outletItems = getItemsByOutlet(outletId);
        for(const item of outletItems){
            await cartService.remove(item._id);
        }
        setItems(
            (current)=>
                current.filter(
                    (item)=>{
                        const itemOutletId = typeof item.outlet === "object"? item.outlet._id : item.outlet;
                        return String(itemOutletId) !== String(outletId)
                    }
                )
        )
    } catch (error) {
        console.log("Failed to clear Outlet cart",error)
    }
},[isAuthenticated,getItemsByOutlet])

    const totalItems = useMemo(
        ()=>{

            return    items.reduce((sum,item)=>sum+item.quantity, 0)
        },[items]
    )
    const totalSubTotal = useMemo(
        ()=>{
            return items.reduce(
                (sum,item)=> sum+ Number(item.price) *Number(item.quantity),0
            )
        },[items]
    )
    const value = useMemo(
        ()=>({
            Loading,
            items,
            groupedItems,
            getItemsByOutlet,
            addItem,
            updateQuantity,
            removeItem,
            clearCart,
            clearOutletcart,
            totalItems,
            totalSubTotal
        }),
        [
            Loading,
            items,
            groupedItems,
            getItemsByOutlet,
            addItem,
            updateQuantity,
            removeItem,
            clearCart,
            clearOutletcart,
            totalItems,
            totalSubTotal
        ]
    )
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}


