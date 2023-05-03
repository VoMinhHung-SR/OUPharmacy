
import { Box } from "@mui/material";
import CountDownTimer from "../CountDownTimer";
import moment from "moment";
import { timeUntilExam } from "../../../../lib/utils/helper";
import { useTranslation } from "react-i18next";

const CountDownExam = (props) => {

        const {t} = useTranslation(['waiting-room'])

        return(
            <>
                <Box className="ou-min-w-[300px] 
                ou-p-5 ou-border-[1.5px] ou-border-black ou-border-solid 
                
                ou-rounded-[8px]">
                    {props.currentID ? <>
                        <Box>
                            {t('currentExam')} : {props.currentID}
                            {props.startedTime && <Box>{t('startedTime')} {moment(props.startedTime).format('HH:mm:ss')}
                                {/* {timeUntilExam(props.startedTime)} */}
                            </Box> }
                            <CountDownTimer  startedTime={props.startedTime}/>
                        </Box>
                    </> : <>
                        <h1>
                            {t('nextExam')} : {props.nextID}
                            {props.startedTime && <Box>{t('startedTime')} {moment(props.startedTime).format('HH:mm:ss')}</Box> }
                            <CountDownTimer  startedTime={props.startedTime}/>
                        
                        </h1>
                    </>
                    } 
                </Box>
            </>
        )
}
export default CountDownExam