import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import Loading from "../../Loading"
import useBillCard from "./hooks/useBillCard"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { calculateAmount } from "./utils/helper";
const BillCard = (props) =>{
    const {isLoadingPrescriptionDetail, onSubmit,prescriptionDetail, isLoadingButton} = useBillCard(props.id)
   
    const renderLoadingButton = () => {
        if(isLoadingButton)
            return(<Box className="!ou-mt-2">
                <Loading/>
            </Box>
            )
        else return (
            <Box className="!ou-mt-2">
                <Button variant="contained" 
                // onClick={momoPayment}
                disabled
                color="success">
                        Thanh toán MoMo
                </Button>
                <Button className="!ou-ml-5" onClick={()=>
                    onSubmit(calculateAmount(prescriptionDetail, props.wage), 
                    props.id, props.handleChangeFlag)} 
                    variant="contained" color="success">
                    Thanh toán
                </Button>
            </Box>
        )
        
    }
    

    return (<>
        {isLoadingPrescriptionDetail && prescriptionDetail.length === 0 ?
            (<Box sx={{ height: "300px" }}>
                <Box className='p-5'>
                    <Loading/>                
                </Box>
            </Box>)
            : prescriptionDetail.length === 0 ?
                (<Box sx={{ height: "300px" }}>
                    <Box className='p-5'>
                        <h2 className='text-center text-danger'>
                            Phiếu chẩn đoán chưa được kê toa
                        </h2>
                        <Typography className='text-center'>
                            <h3>Quay lại trang chủ</h3>
                            <Button onClick={() => { redirect('/') }}>Tại đây!</Button>
                        </Typography>
                    </Box>
                </Box>)
                : (
                    <>
                        <h1 className="ou-text-center ou-mt-8 ou-mb-5 ou-text-xl">Chi tiết phiếu kê toa</h1>
                        <Box component={Paper}>
                            <Box className="ou-p-3">
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell colSpan={1} align="center">Mã phiếu</TableCell>
                                                <TableCell colSpan={5} align="center">Tên thuốc</TableCell>
                                                <TableCell colSpan={1} align="center">Liều dùng</TableCell>
                                                <TableCell colSpan={1} align="center">Số lượng</TableCell>
                                                <TableCell colSpan={1} align="center">Đơn giá</TableCell>
                                                <TableCell colSpan={2} align="center">Thành tiền (VND)</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>

                                            {prescriptionDetail.map((p) => (
                                                <TableRow
                                                    key={p.medicine_unit.id}
                                                    id={p.medicine_unit.id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row" align="center" >
                                                        <Typography>
                                                            {p.prescription.id}
                                                        </Typography>
                                                    </TableCell >

                                                    <TableCell colSpan={5} align="left" >
                                                        <Typography>
                                                            {p.medicine_unit.medicine.name}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Typography>
                                                            {p.uses}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {p.quantity}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Typography>
                                                            {p.medicine_unit.price}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {p.medicine_unit.price * p.quantity}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>

                                    </Table>

                                </TableContainer>
                                <Box className="ou-p-3" style={{ textAlign: "right" }}>
                                    <Typography className="ou-p-2">Phí dịch vụ: {props.wage} VND</Typography>
                                    <h4 className="p-2">Tổng tiền: {calculateAmount(prescriptionDetail, props.wage)} VND</h4>
                                    {props.receipt? 
                                    (<>
                                        <h3 className="ou-text-xl ou-mt-4 ou-text-green-700 ou-font-bold ou-flex ou-justify-end ou-items-center">Đã thanh toán <CheckCircleOutlineIcon /></h3>
                                    </>)
                                        : renderLoadingButton()}

                                </Box>
                            </Box>
                        </Box>
                    </>
                )
        }

    </>)
}
export default BillCard