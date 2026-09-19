import api, {unwrap } from './../utils/api';

const addressService = {
    create: async(payload)=> unwrap(await api.post('/address/create', payload)),
    getall: async()=> unwrap(await api.get("/address/getall")),
    getOne:async(addressId) => unwrap(await api.get(`/address/${addressId}`)),
    update:async(addressId,payload)=> unwrap(await api.put(`/address/update/${addressId}`,payload)),
    delete:async(addressId) => unwrap(await api.delete(`/address/delete/${addressId}`))
}

export default addressService