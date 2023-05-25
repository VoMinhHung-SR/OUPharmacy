import { useContext, useEffect, useState } from "react"
import { fetchUserLocation } from "../services"
import { userContext } from "../../../../App"
import { useTranslation } from "react-i18next"
import * as Yup from 'yup';

const useUpdateLocation = () => {
    const {t} = useTranslation(['yup-validate','modal'])
    const [user] = useContext(userContext)
    const [locationData, setLocationData] = useState([])
    
    const locationSchema = Yup.object().shape({
        location: Yup.object().shape({
            address: Yup.string().trim()
                .required(t('yupAddressRequired')),
            city: Yup
                .number().moreThan(0, t('yupCityNumber'))
                .required(t('yupCityRequired')),
            district: Yup
            .number().moreThan(0, t('yupDistrictNumber'))
            .required(t('yupDistrictRequired')),
        })
    })

    useEffect(()=> {
        const loadLocationData = async (userID) => {
            try{
                const res = await fetchUserLocation(userID)
                if (res.status === 200){
                    setLocationData(res.data)
                    console.log(res.data)
                }
            }catch (err) {
                console.log(err)
            }
        }
        if(user)
            loadLocationData(user.id)
    }, [user])

    return{
        locationData, user,locationSchema
    }
}
export default useUpdateLocation