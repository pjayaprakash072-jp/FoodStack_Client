import  api,{unwrap} from './../utils/api';

const userService = {
    registerAuth:async(payload)=>unwrap(await api.post("/userAuth/create",payload)),
    create:async(authId,payload) => unwrap(await api.post(`/user/create/${authId}`,payload)),
    login:async(payload) => unwrap(await api.post("/userAuth/login",payload)),
    verify:async(verificationToken)=> unwrap(await api.get(`/userAuth/verify-email/${verificationToken}`)),
    update:async(payload)=>unwrap(await api.put("/user/update",payload)),
    getOne:async(authId)=>unwrap(await api.get(`user/getOne/${authId}`))
}
export default userService
