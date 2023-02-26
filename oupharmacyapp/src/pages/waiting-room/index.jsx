import { Box, Container } from "@mui/material"
import moment from "moment";
import { CURRENT_DATE, MAX_EXAM_PER_DAY } from "../../lib/constants";
import CountDownExam from "../../modules/pages/WaittingRoomComponents/CountDownExam"
import useCountDownExam from "../../modules/pages/WaittingRoomComponents/hooks/useCountDownExam"

const WaitingRoom = () => {
    const {total} = useCountDownExam();
    return <>
        <Container>
           
            <div className="ou-grid ou-grid-cols-12 ou-text-center">
                <Box className="ou-col-span-12 ou-mt-4 ou-mb-2">

                    He thong hien tai co: {total}/{MAX_EXAM_PER_DAY} phieu kham trong ngay {moment(CURRENT_DATE).format('DD-MM-yyyy')}
                </Box>
                <Box className="ou-py-4 ou-col-span-6 ou-m-auto">
                    <Box className="ou-my-2">Current</Box>
                    <CountDownExam total={total} currentID={1}/>
                </Box>
                <Box className="ou-py-4 ou-col-span-6 ou-m-auto">
                    <Box className="ou-my-2">Next</Box>
                    <CountDownExam total={total} nextID={2}/>
                </Box>
            </div>
            
        </Container>
    </>
}
export default WaitingRoom