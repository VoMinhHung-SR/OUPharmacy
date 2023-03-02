import { Box, Button, Container, Pagination, Paper, Stack, Table, TableBody,
     TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import Loading from "../../modules/common/components/Loading";
import useExaminationConfirm from "../../modules/pages/ExaminationDetailComponents/ExaminationConfirm/hooks/useExaminationConfirm"
import SendIcon from '@mui/icons-material/Send';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ErrorIcon from '@mui/icons-material/Error';
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { ROLE_DOCTOR, ROLE_NURSE } from "../../lib/constants";

const Examinations = () =>{
    const {user, pagination,handleChangePage, examinationList, isLoadingButton,
        isLoadingExamination, page, handleSendEmailConfirm} = useExaminationConfirm();
    const router = useNavigate();

    const { t, ready } = useTranslation(['examinations', 'common', 'modal'])

    //TODO: add skeletons here
    if(!ready)
        return <Box sx={{ height: "300px" }}>
            <Box className='ou-p-5'>
                <Loading/>
            </Box>
    </Box>

    const renderButton = (userID, examinationID) =>{
        if (isLoadingButton)
            return(
                <Loading/>
        )
        return (
            <Button onClick={() => {
                    handleSendEmailConfirm(userID, examinationID)
                }} variant="contained" endIcon={<SendIcon />}>
                    {t("common:send")}
            </Button>
        )
        
    }
    const renderMailStatus = (mailStatus) => {
        if (mailStatus)
            return <TableCell align="center"> {t('sent')}</TableCell> 

        return <TableCell align="center"> {t('noSent')}</TableCell> 
    }
    return (
        <>
        {isLoadingExamination && examinationList.length === 0 ?
            (<Box sx={{ height: "300px" }}>
                <Box className='p-5'>
                    <Loading></Loading>
                </Box>
            </Box>)
            : examinationList.length === 0 ?
                (
                    <Box className="ou-relative ou-items-center " sx={{ minHeight: "550px" }}>
                        <Box className='ou-absolute ou-p-5 ou-text-center 
                        ou-flex-col ou-flex ou-justify-center ou-items-center
                        ou-top-0 ou-bottom-0 ou-w-full ou-place-items-center'>
                            <h2 className='ou-text-xl ou-text-red-600'>
                                {t('errExaminationList')}
                            </h2>
                            <Typography className='text-center'>
                                <h3>{t('common:goToBooking')} </h3>
                                <Button onClick={() => { router('/booking') }}>{t('common:here')}!</Button>
                            </Typography>
                        </Box>
                     </Box>
                )
                : (<>
                    <Box className='ou-py-5 ou-w-[75%] ou-m-auto ou-max-w-[1536px]'>
                        <TableContainer component={Paper} elevation={4}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow >
                                        <TableCell>{t('id')}</TableCell>
                                        <TableCell align="center">{t('description')}</TableCell>
                                        <TableCell align="center">{t('createdDate')}</TableCell>
                                        <TableCell align="center">{t('mailStatus')}</TableCell>
                                        <TableCell align="center">{t('userCreated')}</TableCell>
                                        <TableCell align="center">{t('function')}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {examinationList.map(e => (
                                        <TableRow
                                            key={e.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row" >
                                                <Typography>
                                                    {e.id}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography>
                                                    {e.description}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography>{moment(e.created_date).format("DD/MM/YYYY")}</Typography>
                                            </TableCell>
                                                {renderMailStatus(e.mail_status)}
                                            <TableCell align="center">
                                                <Typography>
                                                    {e.user.email}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                {e.mail_status === true ?
                                                    (<>
                                                        {user && user.role === ROLE_DOCTOR ?
                                                            (<><Typography>
                                                                <Link style={{ "textDecoration": "none" }} to={`/examinations/${e.id}/diagnosis`}>
                                                                    <Button variant="contained" size="small" endIcon={<AssignmentIcon />}>
                                                                        {t('diagnose')}
                                                                    </Button>
                                                                </Link>
                                                            </Typography></>)
                                                            : <></>}
                                                        {user && user.role === ROLE_NURSE ?
                                                            (<>
                                                                <Typography>
                                                                    <Link style={{ "textDecoration": "none" }} to={`/examinations/${e.id}/payments`}>
                                                                        <Button variant="contained" color="success" size="small" endIcon={<AssignmentIcon />}>
                                                                            {t('pay')}
                                                                        </Button>
                                                                    </Link>
                                                                </Typography>
                                                            </>)
                                                            : <></>}
                                                    </>
                                                    )
                                                    : (
                                                        <>
                                                            {/* Render button for DOCTORS */}
                                                            {user && user.role === ROLE_DOCTOR ?
                                                                (<>
                                                                <Typography className='text-danger'>
                                                                    {t('noReady')} <ErrorIcon />
                                                                </Typography>
                                                                </>)
                                                                : <></>}
                                                            {/* Render button for NURSES */}
                                                            {user && user.role === ROLE_NURSE ? 
                                                                renderButton(e.user.id,e.id) 
                                                                : <></>
                                                            }
                                                        </>)
                                                }
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {pagination.sizeNumber >= 2 && (
                            <Box sx={{ pt: 5, pb: 2 }}>
                                <Stack>
                                    <Pagination
                                        count={pagination.sizeNumber}
                                        variant="outlined"
                                        sx={{ margin: "0 auto" }}
                                        page={page}
                                        onChange={handleChangePage}
                                    />
                                </Stack>
                            </Box>
                        )}
                    </Box>
                </>)

        }
    </>
    )
}
export default Examinations