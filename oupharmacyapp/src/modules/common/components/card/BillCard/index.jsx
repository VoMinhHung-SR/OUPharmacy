import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import Loading from "../../Loading"
import useBillCard from "./hooks/useBillCard"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { calculateAmount } from "./utils/helper";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
const BillCard = (props) =>{
    const {isLoadingPrescriptionDetail, onSubmit,prescriptionDetail,receipt,
         isLoadingButton, momoPayment} = useBillCard(props.id)
    const {t} = useTranslation(['payment','common', 'modal']);
    const router = useNavigate();

    const renderLoadingButton = () => {
        if(isLoadingButton)
            return(<Box className="!ou-mt-2">
                <Loading/>
            </Box>
            )
        else return (
            <Box className="!ou-mt-2">
                <Button variant="contained" 
                onClick={()=> momoPayment(calculateAmount(prescriptionDetail, props.wage), props.id)}
                color="success">
                        {t('momoPayment')}
                </Button>
                <Button className="!ou-ml-5" onClick={()=>
                    onSubmit(calculateAmount(prescriptionDetail, props.wage), 
                    // , props.handleChangeFlag
                    props.id)} 
              
                    variant="contained" color="success">
                    {t('pay')}
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
                (<Box className="ou-relative ou-items-center " sx={{ minHeight: "300px" }}>
                <Box className='ou-absolute ou-p-5 ou-text-center 
                ou-flex-col ou-flex ou-justify-center ou-items-center
                ou-top-0 ou-bottom-0 ou-w-full ou-place-items-center'>
                    <h2 className='ou-text-xl ou-text-red-600'>
                        {t('errNullPrescriptionDetail')}
                    </h2>
                    <Typography className='text-center'>
                        <h3>{t('common:backToHomepage')} </h3>
                        <Button onClick={() => { router('/') }}>{t('common:here')}!</Button>
                    </Typography>
                </Box>
             </Box>)
                : (
                    <>
                        <Box component={Paper} elevation={4}>
                            <h1 className="ou-text-center ou-mt-8 ou-mb-4 ou-pt-4 ou-text-xl">{t('prescriptionDetail')}</h1>
                            <Box className="ou-p-3">
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell colSpan={1} align="center">{t('prescriptionDetailId')}</TableCell>
                                                <TableCell colSpan={5} align="center">{t('medicineName')}</TableCell>
                                                <TableCell colSpan={1} align="center">{t('uses')}</TableCell>
                                                <TableCell colSpan={1} align="center">{t('quantity')}</TableCell>
                                                <TableCell colSpan={1} align="center">{t('unitPrice')}</TableCell>
                                                <TableCell colSpan={2} align="center">{t('total')} (VND)</TableCell>
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
                                                            {p.prescribing.id}
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
                                    <Typography className="ou-p-2">{t('serviceFee')}: {props.wage} VND</Typography>
                                    <h4 className="p-2">{t('amount')}: {calculateAmount(prescriptionDetail, props.wage)} VND</h4>
                                    {receipt ? 
                                    (<>
                                        <h3 className="ou-text-xl ou-mt-4 ou-text-green-700 ou-font-bold ou-flex ou-justify-end ou-items-center">{t('success')} <CheckCircleOutlineIcon /></h3>
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