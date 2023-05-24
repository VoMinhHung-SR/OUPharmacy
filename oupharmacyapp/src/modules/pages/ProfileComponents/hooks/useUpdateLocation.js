import { useContext, useEffect, useState } from "react"
import { fetchUserLocation } from "../services"
import { userContext } from "../../../../App"

const useUpdateLocation = () => {
    const [user] = useContext(userContext)
    const [locationData, setLocationData] = useState([])
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
        locationData, user
    }
}
export default useUpdateLocation