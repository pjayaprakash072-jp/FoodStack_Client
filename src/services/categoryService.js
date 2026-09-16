import api,{ unwrap } from '../utils/api';

const categoryService ={
    byOutlet:async(id)=>unwrap(await api.get(`/menu-category/outlet/${id}`)),
    getOne:async(id)=>unwrap(await api.get(`/menu-category/get/${id}`)),
    getAll:async()=> unwrap(await api.get("/menu-category/getall")),
    byVendor:async(vendorId)=>unwrap(await api.get(`/menu-category/vendor/${vendorId}`))
}
export default categoryService;
