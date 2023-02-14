import { Button, Container, Grid, Typography } from "@mui/material"
import { Box } from "@mui/system"
import moment from "moment"
import { useTranslation } from "react-i18next"
import { Link, useNavigate } from "react-router-dom"
import PrescriptionDetailCard from "../../../modules/common/components/card/PrescriptionDetailCard"
import Loading from "../../../modules/common/components/Loading"
import usePrescriptionDetail from "../../../modules/pages/PrescriptionDetailComponents/hooks/usePrescriptionDetail"

const PrescriptionDetail = () => {
    const {user, isLoadingPrescriptionDetail, prescriptionDetail} = usePrescriptionDetail()
    const router = useNavigate()
    const {t, ready} = useTranslation(['prescription-detail','common']) 
    // TODO: add skeletons here
    if (!ready)
        return <Box sx={{ height: "300px" }}>
        <Box className='p-5'>
            <Loading />
        </Box>
    </Box>
    if (user === null || user === undefined) {
        return (
            <>
                <Box  className="ou-relative ou-items-center" sx={{ height: "550px" }}>
                    <Box className='ou-absolute ou-p-5 ou-text-center 
                        ou-flex-col ou-flex ou-justify-center ou-items-center
                        ou-top-0 ou-bottom-0 ou-w-full ou-place-items-center'>
                        <Container className="ou-text-center ou-mt-5">
                            <h4> {t('common:errNullUser')}</h4>
                            <Button onClick={() => { router('/login') }}>{t('common:here')}!</Button>
                        </Container>
                    </Box>
                </Box>
            </>
        )
    }

    return (
        <>
            {isLoadingPrescriptionDetail && prescriptionDetail === null ?
                (<Box sx={{ height: "300px" }}>
                    <Box className='p-5'>
                        <Loading />
                    </Box>
                </Box>)
                : prescriptionDetail === null ?
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
                            <Box className='ou-py-5 ou-w-[75%] ou-m-auto ou-max-w-[1536px]'>
                                <Box style={{ "margin": "auto" }}>
                                    <h1 className="ou-text-center ou-text-xl">{t('basicInformation')}</h1>
                                    <Grid container justifyContent="flex" style={{ "margin": "0 auto" }} spacing={2}>
                                        <Grid item xs={4} >
                                            <Typography>
                                                <span className="ou-font-bold">{t('patientFullName')}: </span>
                                                {prescriptionDetail.examination.patient.first_name} {prescriptionDetail.examination.patient.last_name}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4} >
                                            <Typography>
                                                <span className="ou-font-bold">{t('dateOfBirth')}: </span>
                                                {prescriptionDetail.examination.patient.date_of_birth ?
                                                    <span >{moment(prescriptionDetail.examination.patient.date_of_birth).format('DD/MM/YYYY') }</span>
                                                    : t('common:undefined')}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4} >
                                            <Typography>
                                                <span className="ou-font-bold">{t('phoneNumber')}: </span>
                                                {prescriptionDetail.examination.patient.phone_number}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4} >
                                            <Typography>
                                                <span className="ou-font-bold">{t('prescriptionId')}: </span>
                                                {prescriptionDetail.examination.id}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography>
                                                <span className="ou-font-bold">{t('createdDate')}: </span>
                                                <span>{moment(prescriptionDetail.examination.created_date).format('DD/MM/YYYY')}</span>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography>
                                                <span className="ou-font-bold">{t('diagnosisDate')}: </span>
                                                <span >{moment(prescriptionDetail.created_date).format('DD/MM/YYYY')}</span>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography>
                                                <span className="ou-font-bold">{t('doctorName')}: </span>
                                                {prescriptionDetail.examination.user.first_name} {prescriptionDetail.examination.user.last_name}
                                            </Typography>
                                        </Grid>
                                        
                                        <Grid item xs={4} >
                                            <Typography>
                                                <span className="ou-font-bold">{t('sign')}: </span>
                                                {prescriptionDetail.sign}
                                            </Typography>

                                        </Grid>
                                        <Grid item xs={4} >
                                            <Typography>
                                                <span className="ou-font-bold">{t('diagnosed')}: </span>
                                                {prescriptionDetail.diagnosed}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <PrescriptionDetailCard />
                            </Box>
                        </>
                    )
            }
        </>
    )
}
export default PrescriptionDetail