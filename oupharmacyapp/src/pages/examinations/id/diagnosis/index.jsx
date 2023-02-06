import { Box, Button, Container, Grid, Typography } from "@mui/material"
import moment from "moment"
import PrescriptionCard from "../../../../modules/common/components/card/PrescriptionCard"
import Loading from "../../../../modules/common/components/Loading"
import useDiagnosis from "../../../../modules/pages/DiagnosisComponents/hooks/useDiagnosis"

const Diagnosis = () => {
    const { examinationDetail, isLoadingExamination, prescription,
        prescriptionId, examinationId, user, handleChangeFlag } = useDiagnosis()
    return (
        <>
            {isLoadingExamination && examinationDetail.length === 0 ?
                (<Box sx={{ height: "300px" }}>
                    <Box className='p-5'>
                        <Loading></Loading>
                    </Box>
                </Box>)
                : examinationDetail.length === 0 ?
                    (<Box sx={{ height: "300px" }}>
                        <Box className='p-5'>
                            <h2 className='text-center text-danger'>
                                Phiếu khám không tồn tại hoặc chưa được y tá duyệt đơn.
                            </h2>
                            <Typography className='text-center'>
                                <h3>Quay lại kê toa</h3>
                                <Button onClick={() => { redirect('/add-examination') }}>Tại đây!</Button>
                            </Typography>
                        </Box>
                    </Box>)
                    : (
                        <Container>
                            <Box className='ou-my-5'>
                                <Box style={{ "margin": "auto" }}>
                                    <h1 className="ou-text-center text-primary ou-text-3xl">Thông tin phiếu đặt lịch khám số {examinationId}</h1>
                                    <Grid container justifyContent="flex" style={{ "margin": "10px auto" }} spacing={2}>
                                        <Grid item xs={3} >
                                            <Typography>
                                                <span className="ou-font-bold">Họ tên bệnh nhân: </span>  
                                                {examinationDetail.patient.first_name} {examinationDetail.patient.last_name} 
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography>
                                                <span className="ou-font-bold">Ngày tạo:</span> {moment(examinationDetail.created_date).format('DD/MM/YYYY')}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Typography>
                                                <span className="ou-font-bold">Mô tả:</span> {examinationDetail.description}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>

                            <Box className='p-5'>
                                <Box style={{ "margin": "auto" }}>
                                   
                                    <PrescriptionCard
                                        id={prescriptionId}
                                        examinationId={examinationId}
                                        diagnosed={prescription.diagnosed}
                                        sign={prescription.sign}
                                        userID={user.id}
                                        handleChangeFlag={handleChangeFlag}
                                        />
                                </Box>
                            </Box>
                        </Container>

                    )
            }

        </>
    )
}
export default Diagnosis