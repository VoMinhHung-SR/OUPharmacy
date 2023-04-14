import { Avatar, Container, Grid, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useTranslation } from 'react-i18next';


const Footer = () => {
    const {t, tReady} = useTranslation("common");

    if(tReady)
        return <Box></Box>

    return(
        <>
            
        <footer id="contact">
            <div className='ou-bg-blue-700' style={{"color":"white","padding":"50px"}}>
                <Container> 
                    <Grid container columns={12}>
                        <Grid item xs={3}>
                            <Avatar sx={{width:'200px',  height:'50px', }} variant="square" 
                            src="https://res.cloudinary.com/dl6artkyb/image/upload/v1666357910/OUPharmacy/bg_Oupharmacy_3x4_jicpdp.png"></Avatar>
                           
                           {/* <div className='ou-text-left ou-mt-10'>
                                <h4 className='ou-text-green-500 ou-uppercase '>Thời gian hoạt động:</h4>
                                <Stack direction="row"  className='ou-mt-2'>
                                    <Link className='ou-my-0.5' to="#"><FacebookIcon sx={{ width: 40, height: 40 }} /></Link>
                                    <Link className='ou-my-0.5' to="#"><FacebookIcon/></Link>
                                </Stack> 
                            </div> */}
                        </Grid>
                        <Grid item xs={3}>
                            <div className='ou-text-left'>
                                <h4 className='ou-text-green-500 ou-uppercase'>{t('aboutUs')}</h4>
                                <Stack direction="row"  style={{ "flexDirection":"column"}} className='ou-mt-2'>
                                    <Link className='ou-my-0.5' to="#">{t('introduce')}</Link>
                                    <Link className='ou-my-0.5' to='#'>{t('businessLicense')}</Link>

                                </Stack> 
                            </div>
                            <div className='ou-text-left ou-mt-5'>
                                    <h4 className='ou-text-green-500 ou-uppercase '>{t('categories')}</h4>
                                    <Stack direction="row"  style={{ "flexDirection":"column"}} className='ou-mt-2'>
                                        <Link className='ou-my-0.5' to="#">{t('prescriptionDrugs')}</Link>
                                        <Link className='ou-my-0.5' to="#">{t('otcDrugs')}</Link>
                                        <Link className='ou-my-0.5' to="#">{t('functionalFoods')}</Link>
                                    </Stack> 
                                </div>
                        </Grid>
                        <Grid item xs={3}>
                       
                            <div className='ou-text-left'>
                                <h4 className='ou-text-green-500 ou-uppercase '>{t('pharmacySystem')}</h4>
                                <Stack direction="row"  style={{ "flexDirection":"column"}} className='ou-mt-2'>
                                    <Link className='ou-my-0.5' to="#">{t('drugSystem')}</Link>
                                    <Link className='ou-my-0.5' to="#">{t('pharmacyRules')}</Link>
                                    <Link className='ou-my-0.5' to="#">{t('serviceQuality')}</Link>
                                    <Link className='ou-my-0.5' to="#">{t('returnPolicy')}</Link>
                                       <Link className='ou-my-0.5' to="#">{t('warrantyPolicy')}</Link>
                                    </Stack> 
                            </div>
                            
                            <div className='ou-text-left ou-mt-5'>
                                <h4 className='ou-text-green-500 ou-uppercase '>{t('terms')}</h4>
                                <Stack direction="row"  style={{ "flexDirection":"column"}} className='ou-mt-2'>
                                    <Link className='ou-my-0.5' to="#">{t('security')}</Link>
                                    <Link className='ou-my-0.5' to="#">{t('support')}</Link>
                                    <Link className='ou-my-0.5' to="#">{t('privacy')}</Link>
                                </Stack> 
                            </div>
                         
                        

                        </Grid>
                      
                        <Grid item xs={3}>
                            <div className='ou-text-left '>
                                <h4 className='ou-text-green-500 ou-uppercase '>{t('contactUs')}</h4>
                                <Stack direction="row"  style={{ "flexDirection":"column"}} className='ou-mt-2'>
                                    <Link className='ou-my-0.5' to="#">{t('hotline')}: 0382590839</Link>
                                    <Link className='ou-my-0.5' to="#">{t('support')}</Link>
                                </Stack> 
                            </div>
                                    
                            <div className='ou-text-left ou-mt-5'>
                                <h4 className='ou-text-green-500 ou-uppercase '>{t('operatingTime')}</h4>
                                <Stack direction="row"  style={{ "flexDirection":"column"}} className='ou-mt-2'>
                                    <Link className='ou-my-0.5' to="#">{t('examinationSchedule')}</Link>
                                    <Link className='ou-my-0.5' to="#">{t('onlineConsultation')}: 24/24</Link>
                                </Stack> 
                            </div>
                        </Grid>
                    </Grid>
                  
                </Container>
                
            </div>

        </footer>            
                
        </>
         
    )
}
export default Footer