import api,{unwrap} from "../utils/api"
const paymentService = {
    create:async(payload) => unwrap(await api.post('/payment/create',payload)),
    verify:async(payload)=> unwrap(await api.post('/payment/verify',payload))
}
export default paymentService;