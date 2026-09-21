import api,{unwrap} from "../utils/api"

const orderService = {
    create:async(payload)=>unwrap(await api.post('/order/create',payload))
}

export default orderService;