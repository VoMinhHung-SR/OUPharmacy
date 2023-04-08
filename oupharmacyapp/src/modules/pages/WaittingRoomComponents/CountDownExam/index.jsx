
import { Box } from "@mui/material";
import CountDownTimer from "../CountDownTimer";
import moment from "moment";
import { timeUntilExam } from "../../../../lib/utils/helper";

const CountDownExam = (props) => {
    
        return(
            <>
                <Box className="ou-min-w-[300px] ou-max-w-[350px] ou-p-5 ou-border-[1.5px] ou-border-black ou-border-solid ou-rounded-[8px]">
                    {props.currentID ? <>
                        <Box>
                            Phiếu hiện tại {"(mã phiếu)"}: {props.currentID}
                            {props.startedTime && <Box>startedTime {moment(props.startedTime).format('HH:mm:ss')}
                                {/* {timeUntilExam(props.startedTime)} */}
                            </Box> }
                            <CountDownTimer  startedTime={props.startedTime}/>
                        </Box>
                    </> : <>
                        <h1>
                            Phiếu tiếp theo {"(mã phiếu)"}: {props.nextID}
                            {props.startedTime && <Box>startedTime {props.startedTime}</Box> }
                        </h1>
                    </>
                    } 
                </Box>
            </>
        )
}
export default CountDownExam