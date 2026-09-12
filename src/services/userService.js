import  api,{unwrap} from './../utils/api';

const userService = {
    register:async(payload) => unwrap(api.post("/customer/create",payload)),
    login:async(payload) => unwrap(api.post("/customer/login",payload))
}
export default userService
