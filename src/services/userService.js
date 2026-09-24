import  api,{unwrap} from './../utils/api';

const userService = {
    register:async(payload) => unwrap(await api.post("/user/create",payload)),
    login:async(payload) => unwrap(await api.post("/user/login",payload)),
    verify:async()=> unwrap(await api.get("/user/verify-emaol/:verificationToken")),
    update:async(payload)=>unwrap(await api.post("/user/update",payload))
}
export default userService
