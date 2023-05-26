import { authApi, endpoints } from "../../../../config/APIs"

export const updateProfile = async (userID, data) => {
    const res = await authApi().patch(endpoints['user-detail'](userID), data)
    return res;
}
export const fetchUserLocation = async (userID) => {
    const res = await authApi().get(endpoints['get-user-location'](userID))
    return res;
}