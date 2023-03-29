import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import useDebounce from '../../../../lib/hooks/useDebounce';
import { fetchPlaceById, fetchPlaceByInput } from '../../../common/components/Mapbox/services';
import { fetchDistrictsByCity } from '../services';


const useAddressInfo = () => {
    const [districts, setDistricts] = useState([])
    const [cityId, setCityId] = useState(null)
    const [addressInput, setAddressInput] = useState('')
    const [listPlace, setListPlace] = useState([])
    const [loading, setLoading] = useState(false)
    const [location, setLocation] = useState({
        lat: "",
        lng: ""
    })
    const debouncedValue = useDebounce(addressInput,500)
    const handleSetLocation = () => 
        setLocation({
            lat: "",
            lng: ""
        })
    
    const [selectedOption, setSelectedOption] = useState(null);

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

    const handleGetPlaceByID = async (placeId) =>{
        const res = await fetchPlaceById(placeId)
        if(res.status === 200){
            console.log(res.data.result.geometry)
            setLocation({lat: res.data.result.geometry.location.lat,
            lng:  res.data.result.geometry.location.lng})
        }
    }

    return {
        setCityId, addressInput,loading, listPlace, handleGetPlaceByID, handleSetLocation,
        setAddressInput, districts, setSelectedOption, selectedOption, locationGeo: location
    }
}

export default useAddressInfo