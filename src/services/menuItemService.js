import api, { unwrap } from '../utils/api';

const menuItemService ={
    getAll: async ()=>unwrap(await api.get("menu-item/getall")),
    getOne:async(id) => unwrap(await api.get(`/menu-item/get/${id}`)),
    byOutlet:async(outletId) =>unwrap(await api.get(`/menu-item/outlet/${outletId}`)),
    byCategory:async(categoryId)=>unwrap(await api.get(`/menu-item/category/${categoryId}`)),
    byVendor:async(vendorId)=>unwrap(await api.get(`/menu-item/vendor/${vendorId}`))

}
export default menuItemService;