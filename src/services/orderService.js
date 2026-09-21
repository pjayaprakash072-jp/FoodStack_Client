import api,{unwrap} from "../utils/api"

const orderService = {
    create:async(payload)=>unwrap(await api.post('/order/create',payload)),
    getall:async()=> unwrap(await api.get("/order/getall")),
    getOne:async(orderId)=>unwrap(await api.get(`/order/get/${orderId}`))
}

export default orderService;