import { authApi, endpoints } from "../../../../config/APIs"

// To get diagnosis info  
// {    id, 
//      examination{userCreate, patient}, 
//      sign, 
//      diagnosed, 
//      userDotor...
//  }
export const fetchPrescriptionDetail = async (prescbingId) => {
    const res = await authApi().get(endpoints['prescription'](prescbingId));
    return res;
}