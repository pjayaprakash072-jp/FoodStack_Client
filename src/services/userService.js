import  api,{unwrap} from './../utils/api';

const userService = {
    login:async(payload) => unwrap(api.post("/user/login",payload))
}
export default userService
