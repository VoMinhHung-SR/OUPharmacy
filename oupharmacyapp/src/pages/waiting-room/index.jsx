import { Box, Button, Container } from "@mui/material"
import moment from "moment";
import { useContext } from "react";
import { CURRENT_DATE, MAX_EXAM_PER_DAY } from "../../lib/constants";
import { QueueStateContext } from "../../lib/context/QueueStateContext";
import CountDownExam from "../../modules/pages/WaittingRoomComponents/CountDownExam"

const WaitingRoom = () => {
    const queue = useContext(QueueStateContext)
    if(queue.getLength() === 0)
        return <Box className="ou-col-span-12 ou-mt-4 ou-mb-2">
        He thong hien tai co: {queue.getLength()}/{MAX_EXAM_PER_DAY} phieu kham trong ngay {moment(CURRENT_DATE).format('DD-MM-yyyy')}
    </Box>

    return <>
        <Container>
           {console.log(queue.items)}
           <Button onClick={()=> queue.dequeue()}>xoa</Button>
            <div className="ou-grid ou-grid-cols-12 ou-text-center">
                <Box className="ou-col-span-12 ou-mt-4 ou-mb-2">
                    He thong hien tai co: {queue.getLength()}/{MAX_EXAM_PER_DAY} phieu kham trong ngay {moment(CURRENT_DATE).format('DD-MM-yyyy')}
                </Box>
                {queue.getLength() > 1 ? 
                <>
                    <Box className="ou-py-4 ou-col-span-6 ou-m-auto">
                        <Box className="ou-my-2">Current</Box>
                        <CountDownExam  currentID={queue?.front?.id}/>
                    </Box>
                    <Box className="ou-py-4 ou-col-span-6 ou-m-auto">
                        <Box className="ou-my-2">Next</Box>
                        <CountDownExam nextID={queue.items[1].id}/>
                    </Box>
                </> : queue.getLength() === 1 ?
                     <Box className="ou-py-4 ou-col-span-12 ou-m-auto">
                        <Box className="ou-my-2">Current</Box>
                        <CountDownExam  currentID={queue?.front?.id}/>
                     </Box>
                    : <></>
                }
            </div>
            
        </Container>
    </>
}
export default WaitingRoom