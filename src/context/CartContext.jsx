import { createContext, useEffect, useMemo, useState } from "react";
import { useAuth } from './useAuth';
import cartService from "../services/cartService";


export const CartContext = createContext(null);

export const CartProvider = ({children})=>{
    const {isAuthenticated} = useAuth();
    const [items,setItems] = useState([]);
    const [busy,setBusy] = useState(false);
    // const [items,setItems] = useState(()=>{
    //     try {
    //         return JSON.parse(localStorage.getItem("foodStack_cart") ||"[]")
    //     } catch {
    //         return [];
    //     }
    // })
    const formatCartItems = (cartItems=[])=>{
        return cartItems.map(
            (x)=>(
                {
                    ...x.item,
                    quantity:x.quantity
                }
            )
        )
    }
    useEffect(
        ()=>{
            const loadCart = async()=>{
                if(!isAuthenticated){
                    try{
                        const guestCart = JSON.parse(localStorage.getItem("foodstack_cart") || "[]");
                        setItems(guestCart);
                    }catch{
                        setItems([]);
                    }
                    return
                }
                setBusy(true);
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
                    setBusy(false);
                }
            };
            loadCart();
        },[isAuthenticated]
    )
    useEffect(
        ()=>{
            if(!isAuthenticated){
                localStorage.setItem("foodstack_cart",JSON.stringify(items));
            }
        },
        [items,isAuthenticated]
    )
    const addItem = async(item)=>{
        if(!isAuthenticated){
            setItems(
                (currnt)=>{ // currnt is the exinsting the Array of itemsin local storage.
                    const id = item._id;
                    const found = currnt.find((x)=>(x._id) === id)
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
    }


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



const updateQuantity = async(id,quantity)=>{
    if(quantity <=0) return removeItem(id);
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
}
const removeItem =async(id)=>{
    if(!isAuthenticated){
        setItems(
            (current)=> current.filter( (x)=> x._id !== id)
        )
        return;
    }
    try {
        const data = await cartService.remove(id);
        setItems(
            (current)=> current.filter( (x)=> x._id !== id)
        )
    } catch (error) {
        console.log(
            "Failed to remove item",
            error
        )
    }
}
const clearCart = async()=>{
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
}
// TOTAL ITEMS
    const totalItems = items.reduce((sum,item)=>sum+item.quantity, 0)
    const subtotal = items.reduce(
        (sum,item)=> {
            return sum+ Number(item.price) * item.quantity
        }
        ,0
    )

    const value = useMemo(
        ()=>({
            items,
            addItem,
            updateQuantity,
            removeItem,
            clearCart,
            totalItems,
            subtotal
        }),
        [items,totalItems,subtotal,busy]
    )
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}


