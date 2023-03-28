import { mapApi } from "../../../../../config/APIs"
import { GOONGMAP_APITOKEN } from "../../../../../lib/constants"



export const fetchPlaceByInput = async (input) => {
    const url = `/Place/AutoComplete?api_key=${GOONGMAP_APITOKEN}&input=${input}`
    const res = await mapApi().get(url) 
    return res;
}