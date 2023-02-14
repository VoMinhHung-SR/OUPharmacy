import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material"
import moment from "moment"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router"
import BillCard from "../../../../modules/common/components/card/BillCard"
import Loading from "../../../../modules/common/components/Loading"
import usePayment from "../../../../modules/pages/PaymentComponents/hooks/usePayment"

const Payments = () => {
    const {user, isLoadingPrescriptionDetail, examinationDetail, examinationID, 
        receipt, handleChangeFlag} = usePayment()
    const router = useNavigate()
    const {t, ready} = useTranslation(['payment','common'])
    // TODO: skeleton here
    if(!ready){
        return <Box sx={{ minHeight: "300px" }}>
            <Box className='p-5'>
                <Loading></Loading>
            </Box>
        </Box>
    }
    if (user === null || user === undefined) {
        return (
            <>
                <Box  className="ou-relative ou-items-center" sx={{ height: "550px" }}>
                    <Box className='ou-absolute ou-p-5 ou-text-center 
                        ou-flex-col ou-flex ou-justify-center ou-items-center
                        ou-top-0 ou-bottom-0 ou-w-full ou-place-items-center'>
                        <Container className="ou-text-center ou-mt-5">
                            <h4 className="ou-text-xl"> {t('common:errNullUser')}</h4>
                            <Button onClick={() => { router('/login') }}>{t('here')}!</Button>
                        </Container>
                    </Box>
                </Box>
            </>
        )
    }

    return (<>
        {isLoadingPrescriptionDetail && examinationDetail.length === 0 ?
            (<Box sx={{ minHeight: "300px" }}>
                <Box className='p-5'>
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
                        {t('errNullPrescription')}
                        </h2>
                        <Typography className='text-center'>
                            <h3>{t('common:goToBooking')}</h3>
                            <Button onClick={() => { router('/booking') }}>{t('common:here')}!</Button>
                        </Typography>
                    </Box>
                </Box>)
                : (
                    <>
                        <Box className='ou-py-5 ou-my-5 ou-w-[75%] ou-m-auto ou-max-w-[1536px]'>
                            <Box>        
                                <Box >
                                    <Box className="mt-2 mb-2 p-3" component={Paper}>
                                        <h5 className="ou-text-center ou-text-xl">{t('basicInformation')}</h5>
                                        <Box className="ou-p-3">
                                            <Grid container>
                                                <Grid item xs={4}>
                                                    <Typography
                                                        variant="subtitle1"
                                                        gutterBottom

                                                        style={{ textDecoration: "inherit", marginRight: "20px" }}
                                                        color="grey.700"
                                                    >
                                                        {t('examinationId')}: {examinationID.examinationId}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Typography
                                                        variant="subtitle1"
                                                        gutterBottom
                                                        style={{ textDecoration: "inherit" }}
                                                        color="grey.700"
                                                    >
                                                        {t('patientFullName')}: {examinationDetail.examination.patient.first_name} {examinationDetail.examination.patient.last_name}
                                                    </Typography>
                                                </Grid>
                                            </Grid>

                                            <Grid container>
                                                <Grid item xs={4}>
                                                    <Typography
                                                        variant="subtitle1"
                                                        gutterBottom

                                                        style={{ textDecoration: "inherit", marginRight: "20px" }}
                                                        color="grey.700"
                                                    >
                                                        {t('userCreated')}: {examinationDetail.examination.user.username}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <Typography
                                                        variant="subtitle1"
                                                        gutterBottom
                                                        style={{ textDecoration: "inherit" }}
                                                        color="grey.700"
                                                    >
                                                        {t('description')}: {examinationDetail.examination.description}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <Box className="ou-p-3">
                                            <Grid container>
                                                <Grid item xs={4}>
                                                    <Typography
                                                        variant="subtitle1"
                                                        gutterBottom

                                                        style={{ textDecoration: "inherit", marginRight: "20px" }}
                                                        color="grey.700"
                                                    >
                                                        {t('prescriptionId')}: {examinationDetail.id}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography
                                                        variant="subtitle1"
                                                        gutterBottom
                                                        style={{ textDecoration: "inherit" }}
                                                        color="grey.700"
                                                    >
                                                        {t('diagnosisDate')}: <span >{moment(examinationDetail.created_date).format('DD/MM/YYYY')}</span>
                                                    </Typography>
                                                </Grid>
                                            </Grid>

                                            <Grid container>
                                                <Grid item xs={4}>
                                                    <Typography
                                                        variant="subtitle1"
                                                        gutterBottom

                                                        style={{ textDecoration: "inherit", marginRight: "20px" }}
                                                        color="grey.700"
                                                    >
                                                        {t('sign')}: <span>{examinationDetail.sign}</span>
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <Typography
                                                        variant="subtitle1"
                                                        gutterBottom
                                                        style={{ textDecoration: "inherit" }}
                                                        color="grey.700"
                                                    >
                                                        {t('diagnosed')}: {examinationDetail.diagnosed}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Box>

                                    <BillCard 
                                    id={examinationDetail.id}
                                    wage={examinationDetail.examination.wage}
                                    handleChangeFlag={handleChangeFlag}
                                    receipt={receipt}
                                    />
            
                                </Box>
                            </Box>
                        </Box>


                    </>
                )
        }
    </>)
}
export default Payments