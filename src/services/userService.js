import  api,{unwrap} from './../utils/api';

const userService = {
    register:async(payload) => unwrap(await api.post("/user/create",payload)),
    login:async(payload) => unwrap(await api.post("/user/login",payload)),
    verify:async(verificationToken)=> unwrap(await api.get(`/user/verify-email/${verificationToken}`)),
    update:async(payload)=>unwrap(await api.put("/user/update",payload)),
}
export default userService
