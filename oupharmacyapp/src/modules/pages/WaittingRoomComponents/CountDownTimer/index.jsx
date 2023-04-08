import { Box } from "@mui/material"
import { useGeolocated } from "react-geolocated"
import { getMinAndSecs } from "../../../../lib/utils/getMinAndSecs"
import useCountDownTimer from "../hooks/useCountDownTimer"
import { timeUntilExam } from "../../../../lib/utils/helper"

const CountDownTimer = ({startedTime}) => {
    const {timerSeconds} = useCountDownTimer()
    const {min, secs} = getMinAndSecs(timerSeconds)
    const {hasStarted, hours, minutes, seconds} = timeUntilExam(startedTime)

    if(!hasStarted)
        return <>
            <Box>
                The exam will start in {hours + " hours"} {minutes + " minutes"}  and {seconds} seconds
            </Box>
        </>
    return (
        <>
        <Box>
           The exam has already started: {getMinAndSecs(timerSeconds)}
        </Box>
        </>
     
    )
        
}

export default CountDownTimer