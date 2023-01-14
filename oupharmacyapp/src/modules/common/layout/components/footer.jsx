import { Avatar, Container, Grid, Stack } from '@mui/material';



const Footer = () => {
    return(
        <>
            <div style={{"backgroundColor":"#084468", "color":"white","padding":"50px"}}>
                <Container> 
                    <Grid container spacing={2} columns={12}>
                        <Grid item xs={4}>
                            <Avatar sx={{width:'200px',  height:'50px', }} variant="square" 
                            src="https://res.cloudinary.com/dl6artkyb/image/upload/v1666357910/OUPharmacy/bg_Oupharmacy_3x4_jicpdp.png"></Avatar>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack direction="row" spacing={2}>
                                <div className='ou-text-left'>
                                    <h4>Thông tin liên hệ</h4>
                                    <Stack direction="row" spacing={2} style={{"flexDirection":"column"}}>
                                        <div>Địa chỉ: 371 Nguyễn Kiệm, phường 3, quận Gò Vấp, Tp.Hồ Chí Minh</div>
                                        <a  style={{"textDecoration":"none","color":"#4ec85b"}}
                                            href="https://www.google.com/maps/place/371+Nguy%E1%BB%85n+Ki%E1%BB%87m,+Ph%C6%B0%E1%BB%9Dng+3,+G%C3%B2+V%E1%BA%A5p,+Th%C3%A0nh+ph%E1%BB%91+H%E1%BB%93+Ch%C3%AD+Minh,+Vi%E1%BB%87t+Nam/@10.8149271,106.6768845,17z/data=!4m5!3m4!1s0x317528e195f816b7:0xfb5c0101490d8870!8m2!3d10.8162655!4d106.6778125?hl=vi-VN">Chỉ đường</a>
                                    </Stack>
                                    <Stack direction="row" spacing={2} style={{"flexDirection":"column"}}>
                                        <div>Địa chỉ: 5A, phường Trung Mỹ Tây , quận 12, Tp.Hồ Chí Minh</div>
                                        <a  style={{"textDecoration":"none","color":"#4ec85b"}}
                                            href="https://www.google.com/maps/place/5A+%C4%90%C6%B0%E1%BB%9Dng+Trung+M%E1%BB%B9+T%C3%A2y+14A,+Trung+M%E1%BB%B9+T%C3%A2y,+Qu%E1%BA%ADn+12,+Th%C3%A0nh+ph%E1%BB%91+H%E1%BB%93+Ch%C3%AD+Minh,+Vi%E1%BB%87t+Nam/@10.8466549,106.6115204,17z/data=!3m1!4b1!4m5!3m4!1s0x31752a30f2722f7f:0x5baf4e75a56c47fb!8m2!3d10.8466549!4d106.6137144?hl=vi-VN">Chỉ đường</a>
                                    </Stack>
                                    <Stack direction="row" spacing={2} style={{"flexDirection":"column"}}>
                                        <div>Địa chỉ: Ấp Tân Hòa, xã Tân Lập, huyện Tân Biên, tỉnh Tây Ninh</div>
                                        <a style={{"textDecoration":"none","color":"#4ec85b"}}
                                            href="https://www.google.com/maps/place/Ch%E1%BB%A3+T%C3%A2n+L%E1%BA%ADp,+T%C3%A2n+L%E1%BA%ADp,+T%C3%A2n+Bi%C3%AAn,+T%C3%A2y+Ninh,+Vi%E1%BB%87t+Nam/@11.6084851,105.9845187,17.78z/data=!4m13!1m7!3m6!1s0x310b62a4a1680145:0x64c138350d29ded0!2zQ2jhu6MgVMOibiBM4bqtcCwgVMOibiBM4bqtcCwgVMOibiBCacOqbiwgVMOieSBOaW5oLCBWaeG7h3QgTmFt!3b1!8m2!3d11.6079575!4d105.9873395!3m4!1s0x310b62a4a1680145:0x64c138350d29ded0!8m2!3d11.6079575!4d105.9873395?hl=vi-VN">Chỉ đường</a>
                                    </Stack>
                                    <Stack direction="row" spacing={2}>
                                        <p>Email 1:</p>
                                        <a  style={{"textDecoration":"none","color":"#4ec85b"}}
                                            href="mailto:1951052083hung@ou.edu.vn">1951052083hung@ou.edu.vn</a>
                                    </Stack>
                                    <Stack direction="row" spacing={2}>
                                        <p>Email 2:</p>
                                        <a  style={{"textDecoration":"none","color":"#4ec85b"}}
                                            href="mailto:vominhhung1546@gmail.com">vominhhung1546@gmail.com</a>
                                    </Stack>
                                    <Stack direction="row" spacing={2}>
                                        <p>Hotline:</p>
                                        <p>0382590839</p>
                                    </Stack>    
                                </div>
                            
                            </Stack>
                        </Grid>
                        <Grid item xs={2}>
                            <div className='ou-text-left'>
                                <h4>Các điều khoản</h4>
                                <Stack direction="row" spacing={2} style={{ "flexDirection":"column"}}>
                                    <div style={{"textDecoration":"none","color":"#4ec85b","marginLeft":"0px","cursor":"pointer"}}>Bảo mật</div>
                                    <div style={{"textDecoration":"none","color":"#4ec85b","marginLeft":"0px","cursor":"pointer"}}>Quyền riêng tư</div>
                                    <div style={{"textDecoration":"none","color":"#4ec85b","marginLeft":"0px","cursor":"pointer"}}>Trợ giúp</div>
                                </Stack> 
                            </div>
                            <div className='ou-text-left ou-pt-5'>
                                <h4>Về Chúng Tôi</h4>
                                <Stack direction="row" spacing={2} style={{ "flexDirection":"column"}}>
                                    <div style={{"textDecoration":"none","color":"#4ec85b","marginLeft":"0px","cursor":"pointer"}}>Giới thiệu</div>
                                    <div style={{"textDecoration":"none","color":"#4ec85b","marginLeft":"0px","cursor":"pointer"}}>Liên Hệ</div>
                                    <div style={{"textDecoration":"none","color":"#4ec85b","marginLeft":"0px","cursor":"pointer"}}>Chứng Nhận</div>
                                </Stack> 
                            </div>
                        </Grid>
                    </Grid>
                    {/* <div class="footer__flex">
                        <div class="col10 ft-mobile ft-mobile__top">
                            <ul class="social-media">
                                <li>
                                    <a href="https://www.youtube.com/channel/UClCe0jTV9_Ti9m8kvU0NNIA" class="fab fa-youtube"></a>
                                    <a href="https://www.facebook.com/Shiray.h/" class="fab fa-facebook-f"></a>
                                    <a href="https://twitter.com/ShiRay76094313"  class="fab fa-twitter"></a>
                                    <a href="https://www.instagram.com/shiray_h/"  class="fab fa-instagram"></a>
                                    <a href="https://www.linkedin.com/in/shiray/"  class="fab fa-linkedin-in"></a>
                                </li>
                            </ul>
                        </div>
                        
                        
                    </div> */}
                </Container>
                
            </div>

            
                
        </>
    )
}
export default Footer