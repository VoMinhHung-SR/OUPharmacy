import { Box, Button, Container, Pagination, Paper, Stack, Table, TableBody,
     TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import Loading from "../../modules/common/components/Loading";
import useExaminationConfirm from "../../modules/pages/ExaminationComponents/ExaminationConfirm/hooks/useExaminationConfirm"
import SendIcon from '@mui/icons-material/Send';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ErrorIcon from '@mui/icons-material/Error';
import moment from "moment";
import { Link } from "react-router-dom";

const ExaminationsConfirm = () =>{
    const {user, pagination,handleChangePage, examinationList, isLoadingButton,
        isLoadingExamination, page, handleSendEmailConfirm} = useExaminationConfirm();
    if (user === null || user === undefined) {
        return (
            <>
                <Box className="ou-relative ou-items-center" sx={{ height: "550px" }}>
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
    const renderButton = (examinationID) =>{
        if (isLoadingButton)
            return(
                <Loading/>
        )
        return (
            <Button onClick={() => {
                    handleSendEmailConfirm(examinationID)
                }} variant="contained" endIcon={<SendIcon />}>
                    Gửi
            </Button>
        )
        
    }

    return (
        <>
        {isLoadingExamination && examinationList.length === 0 ?
            (<Box sx={{ height: "300px" }}>
                <Box className='p-5'>
                    <Loading></Loading>
                </Box>
            </Box>)
            : examinationList.length === 0 ?
                (<Box sx={{ height: "300px" }}>
                    <Box className='p-5'>
                        <h2 className='text-center text-danger'>
                            Hiện tại chưa tồn tại phiếu đặt lịch khám.
                        </h2>
                        <Typography className='text-center'>
                            <h3>Quay lại đặt lịch</h3>
                            <Button onClick={() => { redirect('/add-examination') }}>Tại đây!</Button>
                        </Typography>
                    </Box>
                </Box>)
                : (<>
                    <Box className='ou-py-5 ou-w-[80%] ou-m-auto ou-max-w-[1536px]'>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow >
                                        <TableCell>Mã phiếu</TableCell>
                                        <TableCell align="center">Mô tả</TableCell>
                                        <TableCell align="center">Ngày đăng ký</TableCell>
                                        <TableCell align="center">Tình trạng mail</TableCell>
                                        <TableCell align="center">Người dùng đăng ký</TableCell>
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
                                                <Typography>{moment(e.created_date).format("DD/MM/YYYY")}</Typography>
                                            </TableCell>
                                            <TableCell align="center">{e.mail_status === true ? "Đã gửi" : "Chưa"}</TableCell>
                                            <TableCell align="center">
                                                <Typography>
                                                    {e.user.username}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                {e.mail_status === true ?
                                                    (<>
                                                        {user && user.is_doctor === true ?
                                                            (<><Typography>
                                                                <Link style={{ "textDecoration": "none" }} to={`/examinations/${e.id}/diagnosis`}>
                                                                    <Button variant="contained" size="small" endIcon={<AssignmentIcon />}>
                                                                        Chẩn doán
                                                                    </Button>
                                                                </Link>
                                                            </Typography></>)
                                                            : <></>}
                                                        {user && user.is_nurse === true ?
                                                            (<>
                                                                <Typography>
                                                                    <Link style={{ "textDecoration": "none" }} to={`/examinations/${e.id}/payments`}>
                                                                        <Button variant="contained" color="success" size="small" endIcon={<AssignmentIcon />}>
                                                                            Thanh toán
                                                                        </Button>
                                                                    </Link>
                                                                </Typography>
                                                            </>)
                                                            : <></>}
                                                    </>
                                                    )
                                                    : (
                                                        <>
                                                            {user && user.is_doctor === true ?
                                                                (<>
                                                                <Typography className='text-danger'>
                                                                    Chưa xác nhận <ErrorIcon />
                                                                </Typography>
                                                                </>)
                                                                : <></>}
                                                            {user && user.is_nurse === true ? 
                                                                renderButton(e.id) 
                                                                : <></>
                                                            }
                                                        </>)
                                                }
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {pagination.sizeNumber >= 2 && (
                            <Box sx={{ pt: 5, pb: 2 }}>
                                <Stack>
                                    <Pagination
                                        count={pagination.sizeNumber}
                                        variant="outlined"
                                        sx={{ margin: "0 auto" }}
                                        page={page}
                                        onChange={handleChangePage}
                                    />
                                </Stack>
                            </Box>
                        )}
                    </Box>
                </>)

        }
    </>
    )
}
export default ExaminationsConfirm