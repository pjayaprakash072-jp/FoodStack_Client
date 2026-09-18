import { createContext, useEffect, useMemo, useState ,useContext} from "react";




const CartContext = createContext(null);

export const CartProvider = ({children})=>{
    const [items,setItems] = useState(()=>{
        try {
            return JSON.parse(localStorage.getItem("foodStack_cart") ||"[]")
        } catch {
            return [];
        }
    })
    useEffect(
        ()=>{
            localStorage.setItem("foodStack_cart",JSON.stringify(items))
        },[items]
    )
    const addItem =(item)=>{
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
        )
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
            items,addItem,totalItems,subtotal
        }),
        [items,totalItems,subtotal]
    )
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}


export const useCart =()=>{
    return useContext(CartContext)
}