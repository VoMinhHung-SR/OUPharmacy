import APIs, { authMediaApi, endpoints } from "../../../../config/APIs"

export const fetchUserRoles = async () => {
    const res = await APIs.get(endpoints['roles'])
    return res;
}
export const fetchCreateUser = async (userData) => {
    const res = await authMediaApi().post(endpoints["users"], userData);
    return res;
}