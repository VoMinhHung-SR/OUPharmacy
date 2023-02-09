import { Box, Button, Grid, Paper, Typography } from "@mui/material"
import moment from "moment"
import { Container } from "postcss"
import BillCard from "../../../../modules/common/components/card/BillCard"
import Loading from "../../../../modules/common/components/Loading"
import usePayment from "../../../../modules/pages/PaymentComponents/hooks/usePayment"

const Payments = () => {
    const {user, isLoadingPrescriptionDetail, examinationDetail, examinationID, 
        receipt, handleChangeFlag} = usePayment()
     
    if (user === null || user === undefined) {
        return (
            <>
                <Box  className="ou-relative ou-items-center" sx={{ height: "550px" }}>
                    <Box className='ou-absolute ou-p-5 ou-text-center 
                        ou-flex-col ou-flex ou-justify-center ou-items-center
                        ou-top-0 ou-bottom-0 ou-w-full ou-place-items-center'>
                        <Container className="ou-text-center ou-mt-5">
                            <h4 className="ou-text-xl"> Bạn phải đăng nhập để  tiến hành thanh toán hóa đơn</h4>
                            <Button onClick={() => { router('/login') }}>Tại đây!</Button>
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
                (<Box sx={{ minHeight: "300px" }}>
                    <Box className='p-5'>
                        <h2 className='text-center text-danger'>
                            Phiếu khám chưa được chẩn đoán hoặc kê toa bởi bác sĩ
                        </h2>
                        <Typography className='text-center'>
                            <h3>Quay lại trang chủ</h3>
                            <Button onClick={() => { redirect('/') }}>Tại đây!</Button>
                        </Typography>
                    </Box>
                </Box>)
                : (
                    <>
                        <Box className='ou-py-5 ou-my-5 ou-w-[75%] ou-m-auto ou-max-w-[1536px]'>
                            <Box>        
                                <Box >
                                    <Box className="mt-2 mb-2 p-3" component={Paper}>
                                        <h5 className="ou-text-center ou-text-xl">Thông tin cơ bản:</h5>
                                        <Box className="ou-p-3">
                                            <Grid container>
                                                <Grid item xs={4}>
                                                    <Typography
                                                        variant="subtitle1"
                                                        gutterBottom

                                                        style={{ textDecoration: "inherit", marginRight: "20px" }}
                                                        color="grey.700"
                                                    >
                                                        Phiếu khám số: {examinationID.examinationId}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Typography
                                                        variant="subtitle1"
                                                        gutterBottom
                                                        style={{ textDecoration: "inherit" }}
                                                        color="grey.700"
                                                    >
                                                        Họ tên bệnh nhân:
                                                        {examinationDetail.examination.patient.first_name} {examinationDetail.examination.patient.last_name}
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
                                                        Người dùng đăng ký: {examinationDetail.examination.user.username}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <Typography
                                                        variant="subtitle1"
                                                        gutterBottom
                                                        style={{ textDecoration: "inherit" }}
                                                        color="grey.700"
                                                    >
                                                        Mô tả: {examinationDetail.examination.description}
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
                                                        Phiếu chẩn đoán số: {examinationDetail.id}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography
                                                        variant="subtitle1"
                                                        gutterBottom
                                                        style={{ textDecoration: "inherit" }}
                                                        color="grey.700"
                                                    >
                                                        Ngày chẩn đoán: <span >{moment(examinationDetail.created_date).format('DD/MM/YYYY')}</span>
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
                                                        Triệu chứng: <span>{examinationDetail.sign}</span>
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <Typography
                                                        variant="subtitle1"
                                                        gutterBottom
                                                        style={{ textDecoration: "inherit" }}
                                                        color="grey.700"
                                                    >
                                                        Chẩn đoán: {examinationDetail.diagnosed}
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