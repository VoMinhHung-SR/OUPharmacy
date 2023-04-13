import { Avatar, Container, Grid, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';


const Footer = () => {
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
                                <h4 className='ou-text-green-500 ou-uppercase'>Về Chúng Tôi</h4>
                                <Stack direction="row"  style={{ "flexDirection":"column"}} className='ou-mt-2'>
                                    <Link className='ou-my-0.5' to="#">Giới thiệu</Link>
                                    <Link className='ou-my-0.5' to='#'>Giấy phép kinh doanh</Link>

                                </Stack> 
                            </div>
                            <div className='ou-text-left ou-mt-5'>
                                <h4 className='ou-text-green-500 ou-uppercase '>Các điều khoản</h4>
                                <Stack direction="row"  style={{ "flexDirection":"column"}} className='ou-mt-2'>
                                    <Link className='ou-my-0.5' to="#">Bảo mật</Link>
                                    <Link className='ou-my-0.5' to="#">Trợ giúp</Link>
                                    <Link className='ou-my-0.5' to="#">Quyền riêng tư</Link>
                                </Stack> 
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                       
                            <div className='ou-text-left'>
                                <h4 className='ou-text-green-500 ou-uppercase '>Hệ thống thuốc</h4>
                                <Stack direction="row"  style={{ "flexDirection":"column"}} className='ou-mt-2'>
                                    <Link className='ou-my-0.5' to="#">Hệ thống nhà thuốc</Link>
                                    <Link className='ou-my-0.5' to="#">Nội quy nhà thuốc</Link>
                                    <Link className='ou-my-0.5' to="#">Chất lượng phục vụ</Link>
                                    <Link className='ou-my-0.5' to="#">Chính sách đổi trả, bảo hành</Link>
                                    </Stack> 
                            </div>
                            
                    
                            <div className='ou-text-left ou-mt-5'>
                                    <h4 className='ou-text-green-500 ou-uppercase '>Doanh mục</h4>
                                    <Stack direction="row"  style={{ "flexDirection":"column"}} className='ou-mt-2'>
                                        <Link className='ou-my-0.5' to="#">Thuốc kê toa</Link>
                                        <Link className='ou-my-0.5' to="#">Thuốc không kê toa</Link>
                                        <Link className='ou-my-0.5' to="#">Thực phẩm sức năng</Link>
                                    </Stack> 
                                </div>
                        

                        </Grid>
                      
                        <Grid item xs={3}>
                            <div className='ou-text-left '>
                                <h4 className='ou-text-green-500 ou-uppercase '>Kết nối với chúng tôi</h4>
                                <Stack direction="row"  style={{ "flexDirection":"column"}} className='ou-mt-2'>
                                    <Link className='ou-my-0.5' to="#">Liên hệ ngay: 0382590839</Link>
                                    <Link className='ou-my-0.5' to="#">Trợ giúp</Link>
                                </Stack> 
                            </div>
                                    
                            <div className='ou-text-left ou-mt-5'>
                                <h4 className='ou-text-green-500 ou-uppercase '>Thời gian hoạt động:</h4>
                                <Stack direction="row"  style={{ "flexDirection":"column"}} className='ou-mt-2'>
                                    <Link className='ou-my-0.5' to="#">Lịch khám (2-7): 07:00 - 15:00</Link>
                                    <Link className='ou-my-0.5' to="#">Tư vấn online: 24/24</Link>
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