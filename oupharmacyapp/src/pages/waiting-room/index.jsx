import { Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
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

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


const WaitingRoom = () => {
    const queue = useContext(QueueStateContext)
    const { exams , isLoading, handleMoveToTop, handleBringToBottom} = useWaitingRoom()
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

    const filteredExams = exams.filter(exam => !exam.isCommitted);

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

                    
                   
                    <TableContainer component={Paper} elevation={4} className="ou-my-3 ou-mb-8">

                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                            <TableCell>{t("turn")}</TableCell>
                            <TableCell align="center">{t("patientFullName")}</TableCell>
                            <TableCell align="center">{t("examID")}</TableCell>
                            <TableCell align="center">{t("startedTime")}</TableCell>
                            <TableCell align="center">{t("status")}</TableCell>
                            <TableCell align="center">{t("emailRemind")}</TableCell>
                            <TableCell align="center">
                                <Box className="ou-flex ou-justify-center ou-items-center">

                                {t("function")} 
                                
                                </Box>
                            
                            
                            </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            ! exams.length ? <></> : 
                            exams.map((e,index) => (
                                    <TableRow>
                                        <TableCell>
                                            {index + 1}
                                        </TableCell>
                                        <TableCell>
                                            {e.patientFullName ? e.patientFullName : t('unKnown')}
                                        </TableCell>
                                        <TableCell align="center">
                                            {e.examID}
                                        </TableCell>
                                        <TableCell align="center">
                                            {moment(convertFirestoreTimestampToString(e.startedDate)).format('HH:mm:ss')}
                                        </TableCell>
                                        <TableCell align="center">
                                            {e.isCommitted ? <span className="ou-text-green-700">{t('done')}</span>
                                            : <span className="ou-text-red-700">{t('unDone')}</span> }
                                        </TableCell>
                                        <TableCell align="center">
                                            {e.remindStatus ?  <span className="ou-text-green-700">{t('sent')}</span> 
                                            : <span className="ou-text-red-700">{t('unSent')}</span>}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button className="!ou-bg-green-700 !ou-text-white !ou-mr-1" onClick={()=> handleMoveToTop(index)}><ArrowUpwardIcon/></Button>
                                            <Button className="!ou-bg-blue-700 !ou-text-white !ou-ml-1" onClick={()=> handleBringToBottom(index)}><ArrowDownwardIcon/></Button>
                                        </TableCell>
                                    </TableRow>
                            ))
                        }
                        </TableBody>
                       

                        </Table>
                        
                    </TableContainer>
                </div>
            </Container>
        
    ) : (
        <div>Getting the location data&hellip; </div>
    );
}
export default WaitingRoom