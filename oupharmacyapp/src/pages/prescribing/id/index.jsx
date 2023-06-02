import { Button, Container, Grid, Paper, Typography } from "@mui/material"
import { Box } from "@mui/system"
import moment from "moment"
import { useTranslation } from "react-i18next"
import { Link, useNavigate } from "react-router-dom"
import PrescriptionDetailCard from "../../../modules/common/components/card/PrescriptionDetailCard"
import Loading from "../../../modules/common/components/Loading"
import usePrescriptionDetail from "../../../modules/pages/PrescriptionDetailComponents/hooks/usePrescriptionDetail"
import { Helmet } from "react-helmet"
import PatientInfoModal from "../../../modules/pages/PrescriptionDetailComponents/PatientInfoModal"
import MedicalRecordsModal from "../../../modules/pages/PrescriptionDetailComponents/MedicalRecordsModal"

const PrescriptionDetail = () => {
    const {isLoadingPrescriptionDetail, prescriptionDetail} = usePrescriptionDetail()
    const router = useNavigate()
    const {t, ready} = useTranslation(['prescription-detail','common']) 
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
        
    return (
        <>
            <Helmet>
                <title>Prescribing</title>
            </Helmet>

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
                            <Box className='ou-my-5 ou-pt-8 ou-m-auto ou-max-w-[1536px]'>
                                <Box style={{ "margin": "auto" }} >
                                    <Grid container justifyContent="flex" className="ou-min-h-[160px] ou-p-5" component={Paper} elevation={5}> 
                                        <Grid item xs={12} className="ou-pb-5" >
                                            <h1 className="ou-text-center ou-text-2xl">{t('common:basicInformation')}</h1>
                                        </Grid>

                                        <Grid item xs={6} className="ou-text-center" >
                                            <PatientInfoModal patientData={prescriptionDetail.examination.patient}/>
                                        </Grid>

                                        <Grid item xs={6} className="ou-text-center">
                                            <MedicalRecordsModal patientID={prescriptionDetail.examination.patient.id}/>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box >

                                <PrescriptionDetailCard examID={prescriptionDetail.examination.id} 
                                recipientID={prescriptionDetail.examination.user.id} />
                                </Box>
                            </Box>
                        </>
                    )
            }
        </>
    )
}
export default PrescriptionDetail