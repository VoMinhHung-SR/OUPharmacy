import { Box, Button, TextField } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { userContext } from "../App"
import useDebounce from "../lib/hooks/useDebounce"
import Loading from "../modules/common/components/Loading"
import { fetchPlaceById, fetchPlaceByInput } from "../modules/common/components/Mapbox/services"
import { getDirections } from "../lib/utils/getDirections"
import { CURRENT_DATE } from "../lib/constants"
import moment from "moment"


const Demo = () => {
    const [input, setInput] = useState('')
    const [user]  = useContext(userContext)
    console.log(user)
    const debounceValue = useDebounce(input, 500)
    const [listPlace, setListPlace] = useState([])
    const [loading, setLoading] = useState(false)
    const [location, setLocation] = useState({
        lat: "",
        lng: ""
    })
    const [distance, setDistance] = useState({
        duration: "",
        distance: ""
    })

    useEffect(()=> {
        const loadMapInput = async () => {
            try{
                setLoading(true)
                const res = await fetchPlaceByInput(debounceValue)
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
        if(debounceValue)
            loadMapInput()
    }, [debounceValue])
    
    useEffect(()=> {
        const loadDistanceFromUser = async (lat, lng) => {
            try{
                const res = await getDirections(lat, lng)
                if(res.status === 200)
                    setDistance({distance: res.data.routes[0].legs[0].distance.text, duration: res.data.routes[0].legs[0].duration.text})
                console.log(res.data)
                
            }catch(err)
            {
                console.log(err)
            }
           
        }
        if(user?.locationGeo)
            loadDistanceFromUser(user.locationGeo.lat, user.locationGeo.lng)

    }, [user])

    const handleGetPlaceByID = async (placeId) =>{
        const res = await fetchPlaceById(placeId)
        if(res.status === 200){
            console.log(res.data.result.geometry)
            setLocation({lat: res.data.result.geometry.location.lat,
            lng:  res.data.result.geometry.location.lng})
        }
    }
    console.log(location)
    return (
        <>
            <h1>Day la trang demo</h1>
            <TextField label="input" value={input} onChange={(evt)=> setInput(evt.target.value)}/>
            <h1>input: {input}</h1>
            <h1>debounceValue: {debounceValue}</h1>
            {loading ? <Loading/> : 
                listPlace && listPlace.length !== 0 ?
                 <Box>
                    {listPlace.map((place)=> <Box>{place.description} <Button onClick={()=> handleGetPlaceByID(place.place_id)}>CLICK ME</Button></Box>)}
                </Box> 
                : <h1>KO co phan tu</h1> }
            {moment(CURRENT_DATE).format('YYYY-MM-DD')}
        </>
    )
}
export default Demo