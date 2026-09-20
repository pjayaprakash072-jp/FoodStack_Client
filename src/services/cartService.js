import api,{ unwrap } from './../utils/api';


const cartService = {
    add:async(itemId)=>unwrap(await api.post('/cart/add',{item:itemId})),
    remove:async(itemId)=>unwrap(await api.delete(`/cart/remove/${itemId}`)),
    update:async(itemId,quantity) =>unwrap(api.put(`/cart/update/${itemId}`,{quantity})),
    clear:async()=>unwrap(await api.delete("/cart/clear")),
    getall:async()=>unwrap(await api.get("/cart/getall"))
}
export default cartService