
import { Box } from "@mui/material";
import CountDownTimer from "../CountDownTimer";

const CountDownExam = (props) => {
  
        return(
            <>
                <Box className="ou-min-w-[300px] ou-max-w-[350px] ou-p-5 ou-border-[1.5px] ou-border-black ou-border-solid ou-rounded-[8px]">
                    {props.currentID ? <>
                        <h1>
                            Phiếu hiện tại {"(mã phiếu)"}: {props.currentID}
                            <CountDownTimer/>
                        </h1>
                    </> : <>
                        <h1>
                            Phiếu tiếp theo {"(mã phiếu)"}: {props.nextID}
                        </h1>
                    </>
                    } 
                </Box>
            </>
        )
}
export default CountDownExam