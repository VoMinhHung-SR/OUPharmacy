import { Box } from "@mui/material"
import { useGeolocated } from "react-geolocated"
import { getMinAndSecs } from "../../../../lib/utils/getMinAndSecs"
import useCountDownTimer from "../hooks/useCountDownTimer"

const CountDownTimer = () => {
    const {timerSeconds} = useCountDownTimer()
    const {min, secs} = getMinAndSecs(timerSeconds)
   
    return (

        <Box>
            DAY LA DONG HO NE: {getMinAndSecs(timerSeconds)}
        </Box>
     
    )
        
}

export default CountDownTimer