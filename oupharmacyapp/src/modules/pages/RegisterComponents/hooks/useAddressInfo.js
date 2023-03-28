import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import useDebounce from '../../../../lib/hooks/useDebounce';
import { fetchPlaceByInput } from '../../../common/components/Mapbox/services';
import { fetchDistrictsByCity } from '../services';


const useAddressInfo = () => {
    const [districts, setDistricts] = useState([])
    const [cityId, setCityId] = useState(null)
    const [addressInput, setAddressInput] = useState('')
    const [listPlace, setListPlace] = useState([])
    const [loading, setLoading] = useState(false)
    const debouncedValue = useDebounce(addressInput,500)
    useEffect(()=> {

        const loadDistricts = async (cityId) => {
            const res = await fetchDistrictsByCity(cityId)
            if(res.status === 200){
                console.log(res.data)
                setDistricts(res.data)
            }
            else{
                setDistricts([])
            }
        }

        if(cityId)
            loadDistricts(cityId)
    },[cityId])

    console.log(debouncedValue)

    useEffect(()=> {
        const loadMapInput = async () => {
            try{
                setLoading(true)
                const res = await fetchPlaceByInput(debouncedValue)
                if(res.status === 200){
                    console.log(res.data)
                    setListPlace(res.data.predictions)
                }
            }catch (err){
                setListPlace([])
                console.log(err)
            }finally{
                setLoading(false)
            }
        }
        if(debouncedValue)
            loadMapInput()
    }, [debouncedValue])

    return {
        setCityId, addressInput,loading, listPlace,
        setAddressInput, districts
    }
}

export default useAddressInfo