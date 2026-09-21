import api,{unwrap} from "../utils/api"

const orderService = {
    create:async(payload)=>unwrap(await api.post('/order/create',payload)),
    getall:async()=> unwrap(await api.get("/order/getall"))
}

export default orderService;