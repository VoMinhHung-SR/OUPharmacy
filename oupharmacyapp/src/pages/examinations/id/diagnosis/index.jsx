import { Box, Button, Container, Grid, Typography } from "@mui/material"
import moment from "moment"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router"
import Loading from "../../../../modules/common/components/Loading"
import DiagnosisForm from "../../../../modules/pages/DiagnosisComponents/DiagnosisForm"
import useDiagnosis from "../../../../modules/pages/DiagnosisComponents/hooks/useDiagnosis"

const Diagnosis = () => {
    const { examinationDetail, isLoadingExamination, diagnosis,
        prescriptionId, examinationId, user, handleChangeFlag } = useDiagnosis()
    const router = useNavigate()
    const {t , ready} = useTranslation(['diagnosis','common'])

    if (!ready)
        return <Box sx={{ height: "300px" }}>
        <Box className='ou-p-5'>
            <Loading></Loading>
        </Box>
    </Box>

    return (
        <>
            {isLoadingExamination && examinationDetail.length === 0 ?
                (<Box sx={{ height: "300px" }}>
                    <Box className='ou-p-5'>
                        <Loading></Loading>
                    </Box>
                </Box>)
                : examinationDetail.length === 0 ?
                    (
                    <Box className="ou-relative ou-items-center " sx={{ minHeight: "550px" }}>
                        <Box className='ou-absolute ou-p-5 ou-text-center 
                        ou-flex-col ou-flex ou-justify-center ou-items-center
                        ou-top-0 ou-bottom-0 ou-w-full ou-place-items-center'>
                            <h2 className='ou-text-xl ou-text-red-600'>
                                {t('errNullExamination')}
                            </h2>
                            <Typography className='text-center'>
                                <h3>{t('common:goToBooking')}</h3>
                                <Button onClick={() => { router('/booking') }}>{t('here')}!</Button>
                            </Typography>
                        </Box>
                    </Box>)
                    : (
                        <Container>
                            <Box className='ou-py-5 ou-m-auto'>
                                <Box style={{ "margin": "auto" }}>
                                    <h1 className="ou-text-center text-primary ou-text-xl">{t('examinationInformantion')}</h1>
                                    <Grid container justifyContent="flex" style={{ "margin": "10px auto" }} spacing={2}>
                                        <Grid  xs={6} >
                                            <Typography>
                                                <span className="ou-font-semibold">{t('patientFullName')}: </span>  
                                                {examinationDetail.patient.first_name} {examinationDetail.patient.last_name} 
                                            </Typography>
                                        </Grid>
                                        <Grid  xs={3}>
                                            <Typography>
                                                <span className="ou-font-semibold">{t('createdDate')}:</span> {moment(examinationDetail.created_date).format('DD/MM/YYYY')}
                                            </Typography>
                                        </Grid>
                                        <Grid  xs={12} className="ou-pt-3">
                                            <Typography>
                                                <span className="ou-font-semibold">{t('description')}:</span> {examinationDetail.description}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>

                            <Box className='ou-mt-5'>
                                <Box style={{ "margin": "auto" }}>
                                    {user && <DiagnosisForm
                                        id={prescriptionId}
                                        examinationId={examinationId}
                                        diagnosed={diagnosis.diagnosed}
                                        sign={diagnosis.sign}
                                        userID={user.id}
                                        handleChangeFlag={handleChangeFlag}
                                        />
                                    }       
                                </Box>
                            </Box>
                        </Container>

                    )
            }

        </>
    )
}
export default Diagnosis