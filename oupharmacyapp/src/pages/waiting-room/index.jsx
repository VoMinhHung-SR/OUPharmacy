import { Box, Button, Container } from "@mui/material"
import moment from "moment";
import { useContext } from "react";
import { useGeolocated } from "react-geolocated";
import { CURRENT_DATE, MAX_EXAM_PER_DAY } from "../../lib/constants";
import { QueueStateContext } from "../../lib/context/QueueStateContext";
import CountDownExam from "../../modules/pages/WaittingRoomComponents/CountDownExam"
import useWaitingRoom from "../../modules/pages/WaittingRoomComponents/hooks/useWaitingRoom";
import Loading from "../../modules/common/components/Loading";
import { convertFirestoreTimestampToString } from "../../lib/utils/getMessagesInConversation";
import { convertTimestampToDateTime } from "../../lib/utils/helper";


const WaitingRoom = () => {
    const queue = useContext(QueueStateContext)
    const { exams, isLoading } = useWaitingRoom()

    const {isGeolocationAvailable, isGeolocationEnabled, coords, getPosition} = useGeolocated({
        positionOptions: {
            enableHighAccuracy: false,
        },
        userDecisionTimeout: 5000,
    })
   
    if(isLoading){
        return <>
            <Box> <Loading/> </Box>
        </>
    }

    const renderCurrentAndNextExam = (exams) => {
        const filteredExams = exams.filter(exam => !exam.isCommitted);

        if(filteredExams.length === 0)
            return <Box className="ou-col-span-12 ou-mt-4 ou-mb-2 ou-text-center">
            He thong hien tai khong co phieu kham chua xu ly.
        </Box>
   
        if (filteredExams.length > 1)
            return (
                <>
                    <Box className="ou-py-4 ou-col-span-6 ou-m-auto">
                        <Box className="ou-my-2">Current</Box>
                        <CountDownExam  currentID={filteredExams[0].examID} 
                        startedTime={convertFirestoreTimestampToString(filteredExams[0].startedDate)}/>
                    </Box>
                    <Box className="ou-py-4 ou-col-span-6 ou-m-auto">
                        <Box className="ou-my-2">Next</Box>
                        <CountDownExam nextID={filteredExams[1].examID} 
                       startedTime={convertFirestoreTimestampToString(filteredExams[1].startedDate)}/>
                    </Box>
                </>
            )
        return (
            <Box className="ou-py-4 ou-col-span-12 ou-m-auto ou-text-center">
                <Box className="ou-my-2">Current </Box>
                <CountDownExam  currentID={filteredExams[0].examID} 
                startedTime={convertFirestoreTimestampToString(filteredExams[0].startedDate)}/>
            </Box>
        )
        
        
   } 

    return !isGeolocationAvailable ? (
        <div>Your browser does not support Geolocation</div>
    ) : !isGeolocationEnabled ? (
        <Container>
             <Button onClick={()=> queue.dequeue()}>xoa</Button>
              <div className="ou-grid ou-grid-cols-12 ou-text-center">
                  <Box className="ou-col-span-12 ou-mt-4 ou-mb-2">
                     He thong hien tai co: {queue.getLength()}/{MAX_EXAM_PER_DAY} phieu kham trong ngay {moment(CURRENT_DATE).format('DD-MM-yyyy')}
                 </Box>
                 {renderCurrentAndNextExam(exams)}
                </div>
                <Box></Box>
            <div>Geolocation is not enabled</div>
        </Container>
    ) : coords ? (
        <Container>
            <Button onClick={()=> queue.dequeue()}>xoa</Button>
              <div className="ou-grid ou-grid-cols-12 ou-text-center">
                  <Box className="ou-col-span-12 ou-mt-4 ou-mb-2">
                     He thong hien tai co: {queue.getLength()}/{MAX_EXAM_PER_DAY} phieu kham trong ngay {moment(CURRENT_DATE).format('DD-MM-yyyy')}
                 </Box>
                    {renderCurrentAndNextExam(exams)}
                </div>
            <Box>
            
                <Button onClick={()=> console.log(getPosition)}>GET POSITION</Button>
                
                <table>
                    <tbody>
                        <tr>
                            <td>latitude</td>
                            <td>{coords.latitude}</td>
                        </tr>
                        <tr>
                            <td>longitude</td>
                            <td>{coords.longitude}</td>
                        </tr>
                    </tbody>
                </table>
            </Box>
     
            </Container>
        
    ) : (
        <div>Getting the location data&hellip; </div>
    );
}
export default WaitingRoom