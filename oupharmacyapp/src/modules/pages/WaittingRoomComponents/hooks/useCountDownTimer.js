import { useEffect, useState } from "react"

const useCountDownTimer = () => {
    const [timerSeconds, setTimerSeconds] = useState(1800)

    useEffect(()=>{
        const interval = setInterval(()=> {
                setTimerSeconds(prevState => prevState -1)
        }, 1000)
        console.log(timerSeconds)
        if (timerSeconds === 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    },[timerSeconds])

    return { timerSeconds }
}

export default useCountDownTimer