import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material"
import moment from "moment"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router"
import BillCard from "../../../../modules/common/components/card/BillCard"
import Loading from "../../../../modules/common/components/Loading"
import usePayment from "../../../../modules/pages/PaymentComponents/hooks/usePayment"

const Payments = () => {
    const {isLoadingPrescriptionDetail, examinationDetail, examinationId, prescribing} = usePayment()
    const router = useNavigate()
    const {t, ready} = useTranslation(['payment','common', 'modal'])
    
    //TODO: add skeletons here
    if(!ready)
        return <Box sx={{ height: "300px" }}>
            <Box className='ou-p-5'>
                <Loading/>
            </Box>
        </Box>



    const renderExaminationDetail = () => {
        if(!examinationDetail || examinationDetail === null)
            return
        else
            return (
                <Box className='ou-m-auto ou-max-w-[1536px] ou-min-h-[550px] 
                ou-py-5 ou-flex ou-flex-col ou-justify-center'>
                    <Box className="!ou-mb-3">        
                        <Box  >
                            {examinationDetail.id ? 
                            <Box className="ou-my-4" component={Paper} elevation={4}>
                            <h5 className="ou-text-center ou-text-xl ou-mb-4 ou-pt-4">{t('basicInformation')}</h5>
                            <Box className="ou-p-4">
                                <Grid container>
                                    <Grid item xs={4}>
                                        <Typography
                                            variant="subtitle1"
                                            gutterBottom

                                            style={{ textDecoration: "inherit", marginRight: "20px" }}
                                            color="grey.700"
                                        >
                                            {t('examinationId')}: {examinationId}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography
                                            variant="subtitle1"
                                            gutterBottom
                                            style={{ textDecoration: "inherit" }}
                                            color="grey.700"
                                        >
                                            {t('patientFullName')}: {examinationDetail?.examination?.patient?.first_name} {examinationDetail?.examination?.patient?.last_name}
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
                                            {t('userCreated')}: {examinationDetail?.examination?.user?.username}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography
                                            variant="subtitle1"
                                            gutterBottom
                                            style={{ textDecoration: "inherit" }}
                                            color="grey.700"
                                        >
                                            {t('description')}: {examinationDetail?.examination?.description}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box className="ou-p-4">
                                <Grid container>
                                    <Grid item xs={4}>
                                        <Typography
                                            variant="subtitle1"
                                            gutterBottom

                                            style={{ textDecoration: "inherit", marginRight: "20px" }}
                                            color="grey.700"
                                        >
                                            {t('prescriptionId')}: {examinationDetail?.id}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography
                                            variant="subtitle1"
                                            gutterBottom
                                            style={{ textDecoration: "inherit" }}
                                            color="grey.700"
                                        >
                                            {t('diagnosisDate')}: <span >{examinationDetail.created_date ?  moment(examinationDetail.created_date).format('DD/MM/YYYY') :""}</span>
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
                                            {t('sign')}: <span>{examinationDetail?.sign}</span>
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
                            </Box> : <></>}

                            {prescribing.length !== 0 ? prescribing.map(p => 
                                <BillCard 
                                    id={p.id}
                                    wage={examinationDetail.examination.wage}
                                />) :
                                <BillCard id={-1}/>
                            }
                        

                        </Box>
                    </Box>
                </Box>
            )
    }
    return (<>
        {isLoadingPrescriptionDetail && <Box sx={{ height: "300px" }}>
            <Box className="p-5" >
                <Loading></Loading>
            </Box>
        </Box>}

        {!isLoadingPrescriptionDetail  && renderExaminationDetail() }


        {/* {isLoadingPrescriptionDetail && examinationDetail.length === 0 ?
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
                        <Box className='ou-my-5 ou-mb-8 ou-m-auto ou-max-w-[1536px]'>
                            <Box>        
                                <Box >
                                    <Box className="ou-my-4" component={Paper} elevation={4}>
                                        <h5 className="ou-text-center ou-text-xl ou-mb-4 ou-pt-4">{t('basicInformation')}</h5>
                                        <Box className="ou-p-4">
                                            <Grid container>
                                                <Grid item xs={4}>
                                                    <Typography
                                                        variant="subtitle1"
                                                        gutterBottom

                                                        style={{ textDecoration: "inherit", marginRight: "20px" }}
                                                        color="grey.700"
                                                    >
                                                        {t('examinationId')}: {examinationId}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Typography
                                                        variant="subtitle1"
                                                        gutterBottom
                                                        style={{ textDecoration: "inherit" }}
                                                        color="grey.700"
                                                    >
                                                        {t('patientFullName')}: {examinationDetail?.examination?.patient?.first_name} {examinationDetail?.examination?.patient?.last_name}
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
                                                        {t('userCreated')}: {examinationDetail?.examination?.user?.username}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <Typography
                                                        variant="subtitle1"
                                                        gutterBottom
                                                        style={{ textDecoration: "inherit" }}
                                                        color="grey.700"
                                                    >
                                                        {t('description')}: {examinationDetail?.examination?.description}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <Box className="ou-p-4">
                                            <Grid container>
                                                <Grid item xs={4}>
                                                    <Typography
                                                        variant="subtitle1"
                                                        gutterBottom

                                                        style={{ textDecoration: "inherit", marginRight: "20px" }}
                                                        color="grey.700"
                                                    >
                                                        {t('prescriptionId')}: {examinationDetail?.id}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography
                                                        variant="subtitle1"
                                                        gutterBottom
                                                        style={{ textDecoration: "inherit" }}
                                                        color="grey.700"
                                                    >
                                                        {t('diagnosisDate')}: <span >{moment(examinationDetail?.created_date).format('DD/MM/YYYY')}</span>
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
                                {prescribing.length !== 0 ? prescribing.map(p => 
                                    <BillCard 
                                        id={p.id}
                                        wage={examinationDetail.examination.wage}
                                    />) :
                                    <BillCard id={-1}/>
                                }
                                   
            
                                </Box>
                            </Box>
                        </Box>


                    </>
                )
        } */}
    </>)
}
export default Payments