import { Button, Container, Grid, Typography } from "@mui/material"
import { Box } from "@mui/system"
import moment from "moment"
import { Link, useNavigate } from "react-router-dom"
import PrescriptionDetailCard from "../../../modules/common/components/card/PrescriptionDetailCard"
import Loading from "../../../modules/common/components/Loading"
import usePrescriptionDetail from "../../../modules/pages/PrescriptionDetailComponents/hooks/usePrescriptionDetail"

const PrescriptionDetail = () => {
    const {user, isLoadingPrescriptionDetail, prescriptionDetail} = usePrescriptionDetail()
    const router = useNavigate()
    if (user === null || user === undefined) {
        return (
            <>
                <Box  className="ou-relative ou-items-center" sx={{ height: "550px" }}>
                    <Box className='ou-absolute ou-p-5 ou-text-center 
                        ou-flex-col ou-flex ou-justify-center ou-items-center
                        ou-top-0 ou-bottom-0 ou-w-full ou-place-items-center'>
                        <Container className="ou-text-center ou-mt-5">
                            <h4> Bạn phải đăng nhập để tiến hành kê toa</h4>
                            <Button onClick={() => { router('/login') }}>Tại đây!</Button>
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
                    (<Box sx={{ height: "300px" }}>
                        <Box className='p-5'>
                            <h2 className='text-center text-danger'>
                                Phiếu khám không tồn tại hoặc chưa được bác sĩ chẩn đoán.
                            </h2>
                            <Typography className='text-center'>
                                <h3>Vui lòng kiểm tra quyền, quay lại trang chủ</h3>
                                <Button onClick={() => { redirect('/') }}>Tại đây!</Button>
                            </Typography>
                        </Box>
                    </Box>)
                    : (
                        <>
                            <Box className='ou-py-5 ou-w-[75%] ou-m-auto ou-max-w-[1536px]'>
                                <Box style={{ "margin": "auto" }}>
                                    <h1 className="ou-text-center ou-text-xl">Thông tin cơ bản</h1>
                                    <Grid container justifyContent="flex" style={{ "margin": "0 auto" }} spacing={2}>
                                        <Grid item xs={4} >
                                            <Typography>
                                                <span className="ou-font-bold">Họ tên bệnh nhân: </span>
                                                {prescriptionDetail.examination.patient.first_name} {prescriptionDetail.examination.patient.last_name}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4} >
                                            <Typography>
                                                <span className="ou-font-bold">Ngày sinh: </span>
                                                {prescriptionDetail.examination.patient.date_of_birth ?
                                                    <span >{moment(prescriptionDetail.examination.patient.date_of_birth).format('DD/MM/YYYY') }</span>
                                                    : "CHƯA XÁC ĐỊNH"}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4} >
                                            <Typography>
                                                <span className="ou-font-bold">SĐT: </span>
                                                {prescriptionDetail.examination.patient.phone_number}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4} >
                                            <Typography>
                                                <span className="ou-font-bold">Phiếu khám số: </span>
                                                {prescriptionDetail.examination.id}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography>
                                                <span className="ou-font-bold">Ngày tạo: </span>
                                                <span>{moment(prescriptionDetail.examination.created_date).format('DD/MM/YYYY')}</span>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography>
                                                <span className="ou-font-bold">Ngày chẩn đoán: </span>
                                                <span >{moment(prescriptionDetail.created_date).format('DD/MM/YYYY')}</span>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography>
                                                <span className="ou-font-bold">Bác sĩ chẩn đoán: </span>
                                                {prescriptionDetail.examination.user.first_name} {prescriptionDetail.examination.user.last_name}
                                            </Typography>
                                        </Grid>
                                        
                                        <Grid item xs={4} >
                                            <Typography>
                                                <span className="ou-font-bold">Triệu chứng: </span>
                                                {prescriptionDetail.sign}
                                            </Typography>

                                        </Grid>
                                        <Grid item xs={4} >
                                            <Typography>
                                                <span className="ou-font-bold"> Chấn đoán: </span>
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