import { Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import Loading from "../../../modules/common/components/Loading";
import useExaminationList from "../../../modules/pages/ExaminationListComponents/hooks/useExaminationList"
import moment from "moment";

const ExaminationList = () =>{
    const {user, isLoading, examinationList, handleDeleteExamination} = useExaminationList();
    const router = useNavigate();

    
    
    if (user === null || user === undefined) {
        return (
            <>
                <Box  className="ou-relative ou-items-center" sx={{ height: "550px" }}>
                    <Box className='ou-absolute ou-p-5 ou-text-center 
                        ou-flex-col ou-flex ou-justify-center ou-items-center
                        ou-top-0 ou-bottom-0 ou-w-full ou-place-items-center'>
                        <Container className="ou-text-center ou-mt-5">
                            <h4> Bạn phải đăng nhập để xem được phiếu đăng ký khám</h4>
                            <Button onClick={() => { router('/login') }}>Tại đây!</Button>
                        </Container>
                    </Box>
                </Box>
            </>
        )
    }



    return(
    <>
        {isLoading && examinationList.length === 0 ?
            (<Box sx={{ minHeight: "300px" }}>
                <Box className='ou-p-5'>
                    <Loading></Loading>
                </Box>
            </Box>)
            : examinationList.length === 0 ?
                (<Box className="ou-relative ou-items-center " sx={{ minHeight: "550px" }}>
                    <Box className='ou-absolute ou-p-5 ou-text-center 
                    ou-flex-col ou-flex ou-justify-center ou-items-center
                    ou-top-0 ou-bottom-0 ou-w-full ou-place-items-center'>
                        <h2 className='ou-text-xl ou-text-red-600'>
                            Hiện tại người dùng chưa đặt lịch
                        </h2>
                        <Typography className='text-center'>
                            <h3>Quay lại đặt lịch</h3>
                            <Button onClick={() => { router('/examinations') }}>Tại đây!</Button>
                        </Typography>
                    </Box>
                </Box>)
                : (
                    <Container >
                            <Box className='ou-pt-5 ou-pb-5' sx={{ minHeight: "300px" }}>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Mã phiếu</TableCell>
                                                <TableCell align="center">Mô tả</TableCell>
                                                <TableCell align="center">Ngày đăng ký</TableCell>
                                                <TableCell align="center">Tình trạng mail</TableCell>
                                                <TableCell align="center">Tên bệnh nhân</TableCell>
                                                <TableCell align="center">Chức năng</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {examinationList.map(e => (
                                                <TableRow
                                                    key={e.id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row" >
                                                        <Typography>
                                                            {e.id}
                                                        </Typography>
                                                    </TableCell>

                                                    <TableCell align="center">
                                                        <Typography>
                                                            {e.description}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Typography>{moment(e.created_date).format('DD/MM/YYYY')}</Typography>
                                                        {/* <Moment format="DD/MM/YYY" >{e.created_date}</Moment> */}
                                                    </TableCell>
                                                    <TableCell align="center">{e.mail_status === true ? "Đã gửi" : "Chưa"}</TableCell>
                                                    <TableCell align="center">
                                                        <Typography>
                                                            {e.patient.first_name +" "+ e.patient.last_name}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {/* <Button size="small" variant="contained"
                                                            color="success" sx={{marginRight:"10px"}}>
                                                            Chỉnh sửa
                                                        </Button> */}
                                                        <Button size="small"
                                                            variant="contained"
                                                            onClick={()=>{
                                                                handleDeleteExamination(e.id)
                                                            }}
                                                            color="error" >
                                                            Xóa
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                    </Container>
                )
        }
    </>)
} 
export default ExaminationList