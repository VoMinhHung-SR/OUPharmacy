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
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";


const WaitingRoom = () => {
    const queue = useContext(QueueStateContext)
    const { exams, isLoaded , isLoading} = useWaitingRoom()
    const {t, tReady} = useTranslation(['waiting-room'])

    const {isGeolocationAvailable, isGeolocationEnabled, coords, getPosition} = useGeolocated({
        positionOptions: {
            enableHighAccuracy: false,
        },
        userDecisionTimeout: 5000,
    })
    if(isLoading || tReady){
        return <>
            <Helmet>
                <title>Waiting room</title>
            </Helmet>
            <Box> 
                <Loading/> 
            </Box>
        </>
    }

    const renderCurrentAndNextExam = (exams) => {
        const filteredExams = exams.filter(exam => !exam.isCommitted);

        if(filteredExams.length === 0)
            return <Box className="ou-col-span-12 ou-mt-4 ou-mb-2 ou-text-center">
           {t('waiting-room:errNullExams')}
        </Box>
   
        if (filteredExams.length > 1)
            return (
                <>
                    <Box className="ou-py-4 ou-col-span-6 ou-m-auto ou-mt-8">
                        {/* <Box className="ou-my-2">Current</Box> */}
                        <CountDownExam  currentID={filteredExams[0].examID} 
                        startedTime={convertFirestoreTimestampToString(filteredExams[0].startedDate)}/>
                    </Box>
                    <Box className="ou-py-4 ou-col-span-6 ou-m-auto ou-mt-8">
                        {/* <Box className="ou-my-2">Next</Box> */}
                        <CountDownExam nextID={filteredExams[1].examID} 
                       startedTime={convertFirestoreTimestampToString(filteredExams[1].startedDate)}/>
                      
                    </Box>
                </>
            )
        return (
            <Box className="ou-py-4 ou-col-span-12 ou-m-auto ou-text-center">
                {/* <Box className="ou-my-2">Current </Box> */}
                <CountDownExam  currentID={filteredExams[0].examID} 
                startedTime={convertFirestoreTimestampToString(filteredExams[0].startedDate)}/>
            </Box>
        )
        
        
   } 

    return !isGeolocationAvailable ? (
        <div>Your browser does not support Geolocation</div>
    ) : !isGeolocationEnabled ? (
        <Container>
            <Helmet>
                <title>Waiting room</title>
            </Helmet>
              <div className="ou-grid ou-grid-cols-12 ou-text-center">
                 {renderCurrentAndNextExam(exams)}
                </div>
                <Box></Box>
            <div>Geolocation is not enabled</div>
        </Container>
    ) : coords ? (
        <Container>
            <Helmet>
                <title>Waiting room</title>
            </Helmet>
              <div className="ou-grid ou-grid-cols-12 ou-text-center">
                    {renderCurrentAndNextExam(exams)}
                </div>
                <div className="ou-text-center">
                    {t('listExamsToday')}
                </div>
            </Container>
        
    ) : (
        <div>Getting the location data&hellip; </div>
    );
}
export default WaitingRoom