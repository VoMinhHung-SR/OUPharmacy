import { Button, Container, FormControl, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { Link, useNavigate } from "react-router-dom"
import Loading from "../../modules/common/components/Loading"
import usePrescriptionList from "../../modules/pages/PrescriptionListComponents/hooks/usePrescription"
import SearchIcon from '@mui/icons-material/Search';
import PaidIcon from "@mui/icons-material/Paid";
import AssignmentIcon from '@mui/icons-material/Assignment';
import moment from "moment"
import { useTranslation } from "react-i18next"
import { ROLE_DOCTOR, ROLE_NURSE } from "../../lib/constants"
import { Helmet } from "react-helmet"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const PrescriptionList = () => {
    const {user, prescriptionList, isLoadingPrescriptionList,
    pagination, page, handleChangePage} = usePrescriptionList()
    const router = useNavigate()
    const {t, ready} = useTranslation(['prescription', 'common'])

    //TODO: add skeletons here
    if(!ready)
        return <Box sx={{ height: "300px" }}>
            <Helmet>
                <title>Prescribing</title>
            </Helmet>

            <Box className='ou-p-5'>
                <Loading/>
            </Box>
        </Box>

    const renderBillStatus = (prescribingArray) => {

        let doneStatus = 0
        if(prescribingArray.length === 0)
            return <span><CheckCircleIcon className="!ou-text-red-700"/></span> 

    
        if (prescribingArray.some(prescribing => prescribing && prescribing.bill_status === null)) {
            doneStatus = -1;
        }

        if(doneStatus === -1 ) 
            return <span><CheckCircleIcon className="!ou-text-red-700"/></span> 
        return  <span><CheckCircleIcon className="!ou-text-green-700"/></span> 
    }

    return (
        <>
            <Helmet>
                <title>Prescribing</title>
            </Helmet>

            {isLoadingPrescriptionList && prescriptionList.length === 0 ?
                (<Box sx={{ height: "300px" }}>
                    <Box className='p-5'>
                        <Loading/>
                    </Box>
                </Box>)
                : prescriptionList.length === 0 ?
                    (<Box className="ou-relative ou-items-center " sx={{ minHeight: "550px" }}>
                    <Box className='ou-absolute ou-p-5 ou-text-center 
                    ou-flex-col ou-flex ou-justify-center ou-items-center
                    ou-top-0 ou-bottom-0 ou-w-full ou-place-items-center'>
                        <h2 className='ou-text-xl ou-text-red-600'>
                            {t('errNullPrescription')}
                        </h2>
                        <Typography className='text-center'>
                            <h3>{t('common:goToBooking')} </h3>
                            <Button onClick={() => { router('/booking') }}>{t('common:here')}!</Button>
                        </Typography>
                    </Box>
                 </Box>)
                    : (
                        <>
                            <Box className='ou-py-8 ou-m-auto ou-max-w-[1536px] ou-w-[100%]'>
                                <TableContainer component={Paper} elevation={4}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>{t('prescriptionId')}</TableCell>
                                                <TableCell align="center">{t('sign')}</TableCell>
                                                <TableCell align="center">{t('diagnosed')}</TableCell>
                                                <TableCell align="center">{t('diagnosisDate')}</TableCell>
                                                <TableCell align="center">{t('prescribingStatus')}</TableCell>
                                                <TableCell align="center">{t('paymentStatus')}</TableCell>
                                                <TableCell align="center">{t('patientName')}</TableCell>
                                                <TableCell align="center">{t('doctorName')}</TableCell>
                                                <TableCell align="center">{t('feature')}</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {prescriptionList.map(p => (
                                                <TableRow
                                                    key={p.id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row" >
                                                        <Typography>
                                                            {p.examination.id}
                                                        </Typography>   
                                                    </TableCell>
                                                    <TableCell  >
                                                        <Typography className="ou-table-truncate-text-container"  >
                                                            {p.sign}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell >
                                                        <Typography className="ou-table-truncate-text-container" >
                                                            {p.diagnosed}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="center" >
                                                        <Typography>{moment(p.created_date).format('DD/MM/YYYY')}</Typography>
                                                    </TableCell>
                                                    <TableCell align="center" >
                                                        <Typography>{  p.prescribing_info?.length ? 
                                                          <span><CheckCircleIcon className="!ou-text-green-700"/></span> 
                                                        : <span><CheckCircleIcon className="!ou-text-red-700"/></span>}
                                                    </Typography>
                                                    </TableCell>
                                                    <TableCell align="center" >
                                                        <Typography>{renderBillStatus(p.prescribing_info)}
                                                    </Typography>
                                                    </TableCell>
                                                    <TableCell align="center" >
                                                        <Typography>
                                                            {p.patient.first_name} {p.patient.last_name} 
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="center" >
                                                        <Typography>
                                                            {p.user.first_name} {p.user.last_name} 
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="center" >
                                                        {user && user.role === ROLE_DOCTOR &&
                                                            (<>
                                                                <Typography className="mb-2">
                                                                    <Link style={{ "textDecoration": "none" }}

                                                                        to={`/dashboard/prescribing/${p.id}`}>

                                                                            <Tooltip followCursor title={t('prescribing')}>
                                                                                <span>

                                                                                <Button variant="contained"  
                                                                                 className="ou-bg-blue-700 !ou-min-w-[68px] !ou-min-h-[40px] !ou-mx-2">
                                                                                    <AssignmentIcon />
                                                                                </Button>
                                                                                </span>
                                                                            </Tooltip>
                                                                        
                                                                    </Link>
                                                                </Typography>
                                                            </>)}
                                                              {user && user.role === ROLE_NURSE && (
                                                                    <>
                                                                    <Tooltip followCursor title={t("pay")}>
                                                                        <span>
                                                                        <Link
                                                                            style={{ textDecoration: "none" }}
                                                                            to={`/dashboard/payments/examinations/${p.examination.id}`}
                                                                        >
                                                                            <Button
                                                                            variant="contained"
                                                                            color="success"
                                                                            size="small"
                                                                            className="!ou-min-w-[68px] !ou-py-2  !ou-min-h-[40px]"
                                                                            >
                                                                            <PaidIcon />
                                                                            </Button>
                                                                        </Link>
                                                                        
                                                                        </span>
                                                                    </Tooltip>
                                                                    </>)}
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
                        </>
                    )
            }
        </>
    )
} 
export default PrescriptionList