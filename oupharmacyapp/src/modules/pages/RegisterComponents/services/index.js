import APIs, { authMediaApi, endpoints } from "../../../../config/APIs"


// To get list object role info  
// {   id: int,
//     name: string
// }
export const fetchUserRoles = async () => {
    const res = await APIs.get(endpoints['roles'])
    return res;
}
// create a user with form register data
export const fetchCreateUser = async (userData) => {
    const res = await authMediaApi().post(endpoints["users"], userData);
    return res;
}