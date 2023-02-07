import { Button, Container, FormControl, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { Link } from "react-router-dom"
import Loading from "../../modules/common/components/Loading"
import usePrescriptionList from "../../modules/pages/PrescriptionListComponents/hooks/usePrescription"
import SearchIcon from '@mui/icons-material/Search';
import AssignmentIcon from '@mui/icons-material/Assignment';
import moment from "moment"
const PrescriptionList = () => {
    const {user, prescriptionList, isLoadingPrescriptionList} = usePrescriptionList()

    if (user === null || user === undefined) {
        return (
            <>
               <Box sx={{ height: "300px" }}>
                    <Box className='ou-p-5'>
                        <Container className="ou-text-center ou-mx-5">
                            <h4 className="ou-text-xl ou-py-1"> Bạn phải đăng nhập để tiến hành kê toa</h4>
                            <Link className="ou-text-blue-700" to='/login'><h4>Tại đây!</h4></Link>
                        </Container>
                    </Box>
                </Box>
            </>
        )
    }
 
    return (
        <>
            {isLoadingPrescriptionList && prescriptionList.length === 0 ?
                (<Box sx={{ height: "300px" }}>
                    <Box className='p-5'>
                        <Loading/>
                    </Box>
                </Box>)
                : prescriptionList.length === 0 ?
                    (<Box sx={{ height: "300px" }}>
                        <Box className='p-5'>
                            <h2 className='text-center text-danger'>
                                Hiện tại chưa có phiếu khám được chẩn đoán.
                            </h2>
                            <Typography className='text-center'>
                                <h3>Vui lòng quay lại đặt lịch khám</h3>
                                <Button onClick={() => { redirect('/add-examination') }}>Tại đây!</Button>
                            </Typography>
                        </Box>
                    </Box>)
                    : (
                        <>
                            <Box className='ou-py-5 ou-w-[75%] ou-m-auto ou-max-w-[1536px]'>
                                {/* <form className="d-flex mb-3 "
                                    // onSubmit={search} 
                                    style={{ "marginLeft": "auto", "maxWidth": "300px" }}>
                                    <FormControl
                                        type="search"
                                        placeholder="Nhập tên bác sĩ..."
                                        aria-label="Search"
                                    // value={q}
                                    // onChange={event => setQ(event.target.value)}
                                    />
                                    <Button type="submit" variant="contained">
                                        <SearchIcon />
                                    </Button>
                                </form> */}
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Mã phiếu khám</TableCell>
                                                <TableCell align="center">Triệu chứng</TableCell>
                                                <TableCell align="center">Chẩn đoán</TableCell>
                                                <TableCell align="center">Ngày chẩn đoán</TableCell>
                                                <TableCell align="center">Bác sĩ chẩn đoán</TableCell>
                                                <TableCell align="center">Chức năng</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {prescriptionList.map(p => (
                                                <TableRow
                                                    key={p.id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row" >
                                                        <Typography>
                                                            {p.examination.id}
                                                        </Typography>
                                                    </TableCell>

                                                    <TableCell align="center">
                                                        <Typography>
                                                            {p.sign}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Typography>
                                                            {p.diagnosed}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Typography>{moment(p.created_date).format('DD/MM/YYYY')}</Typography>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Typography>
                                                            {p.examination.user.first_name} {p.examination.user.last_name}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {user && user.is_doctor === true ?
                                                            (<>
                                                                <Typography className="mb-2">
                                                                    <Link style={{ "textDecoration": "none" }}

                                                                        to={`/prescriptions/${p.id}`}>
                                                                        <Button variant="contained" size="small" endIcon={<AssignmentIcon />}>
                                                                            Kê toa
                                                                        </Button>
                                                                    </Link>
                                                                </Typography>
                                                            </>)
                                                            : <></>}

                                                        {user && user.is_nurse === true ?
                                                            (<>
                                                                <Typography>
                                                                    <Link style={{ "textDecoration": "none" }} to={`/examinations/${p.examination.id}/payments`}>
                                                                        <Button variant="contained" color="success" size="small" endIcon={<AssignmentIcon />}>
                                                                            Thanh toán
                                                                        </Button>
                                                                    </Link>
                                                                </Typography>
                                                            </>)
                                                            : <></>}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </>
                    )
            }
        </>
    )
} 
export default PrescriptionList