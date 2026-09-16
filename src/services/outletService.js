import api,{ unwrap } from './../utils/api';

const outletService = {
    getAll:async ()=>unwrap(await api.get("/outlet/getall")),
    getOne:async (id)=>unwrap(await api.get(`/outlet/get/${id}`)),
    byVendor:async(vendorId)=> unwrap(await api.get(`/outlet/vendor/${vendorId}`))
}
export default outletService;
