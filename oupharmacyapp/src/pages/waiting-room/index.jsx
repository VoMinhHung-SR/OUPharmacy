import { Box, Button, Container } from "@mui/material"
import moment from "moment";
import { useContext } from "react";
import { useGeolocated } from "react-geolocated";
import { CURRENT_DATE, MAX_EXAM_PER_DAY } from "../../lib/constants";
import { QueueStateContext } from "../../lib/context/QueueStateContext";
import CountDownExam from "../../modules/pages/WaittingRoomComponents/CountDownExam"
import useWaitingRoom from "../../modules/pages/WaittingRoomComponents/hooks/useWaitingRoom";

const WaitingRoom = () => {
    const queue = useContext(QueueStateContext)
    const { exams } = useWaitingRoom()
    const {isGeolocationAvailable, isGeolocationEnabled, coords, getPosition} = useGeolocated({
        positionOptions: {
            enableHighAccuracy: false,
        },
        userDecisionTimeout: 5000,
    })
    if(queue.getLength() === 0)
        return <Box className="ou-col-span-12 ou-mt-4 ou-mb-2 ou-text-center">
        He thong hien tai co: {queue.getLength()}/{MAX_EXAM_PER_DAY} phieu kham trong ngay {moment(CURRENT_DATE).format('DD-MM-yyyy')}
    </Box>
   
    return !isGeolocationAvailable ? (
        <div>Your browser does not support Geolocation</div>
    ) : !isGeolocationEnabled ? (
        <Container>
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
                <Box></Box>
            <div>Geolocation is not enabled</div>
        </Container>
    ) : coords ? (
        <Container>
             {console.log(queue.items)}
             {exams && console.log(exams)}
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
                <Box>
            {/* DAY LA DONG HO NE: {getMinAndSecs(timerSeconds)} */}
            
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

    // return <>
    //     <Container>
    //        {console.log(queue.items)}
    //        <Button onClick={()=> queue.dequeue()}>xoa</Button>
    //         <div className="ou-grid ou-grid-cols-12 ou-text-center">
    //             <Box className="ou-col-span-12 ou-mt-4 ou-mb-2">
    //                 He thong hien tai co: {queue.getLength()}/{MAX_EXAM_PER_DAY} phieu kham trong ngay {moment(CURRENT_DATE).format('DD-MM-yyyy')}
    //             </Box>
    //             {queue.getLength() > 1 ? 
    //             <>
    //                 <Box className="ou-py-4 ou-col-span-6 ou-m-auto">
    //                     <Box className="ou-my-2">Current</Box>
    //                     <CountDownExam  currentID={queue?.front?.id}/>
    //                 </Box>
    //                 <Box className="ou-py-4 ou-col-span-6 ou-m-auto">
    //                     <Box className="ou-my-2">Next</Box>
    //                     <CountDownExam nextID={queue.items[1].id}/>
    //                 </Box>
    //             </> : queue.getLength() === 1 ?
    //                  <Box className="ou-py-4 ou-col-span-12 ou-m-auto">
    //                     <Box className="ou-my-2">Current</Box>
    //                     <CountDownExam  currentID={queue?.front?.id}/>
    //                  </Box>
    //                 : <></>
    //             }
    //         </div>
            
    //     </Container>
    // </>
}
export default WaitingRoom