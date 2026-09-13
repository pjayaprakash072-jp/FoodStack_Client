import  api,{unwrap} from './../utils/api';

const userService = {
    register:async(payload) => unwrap(await api.post("/customer/create",payload)),
    login:async(payload) => unwrap(await api.post("/customer/login",payload))
}
export default userService
