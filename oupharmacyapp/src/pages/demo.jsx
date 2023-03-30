import { Box, Button, TextField } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { userContext } from "../App"
import useDebounce from "../lib/hooks/useDebounce"
import Loading from "../modules/common/components/Loading"
import { fetchPlaceById, fetchPlaceByInput } from "../modules/common/components/Mapbox/services"

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
        </>
    )
}
export default Demo