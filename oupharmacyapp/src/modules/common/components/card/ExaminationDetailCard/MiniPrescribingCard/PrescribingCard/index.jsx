import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { fetchReciept } from "../../../../../../pages/PaymentComponents/services"
import Loading from "../../../../Loading"
import { fetchPrescrriptionDetailBillCard } from "../../../BillCard/services"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


const PrescribingCard = ({prescribing}) => {
    const {t, tReady} = useTranslation(['payment'])
    const [isLoading, setIsLoading] = useState(true)
    const [receiptStatus, setReceiptStatus] = useState(false)
    const [p , setP]  = useState([])
    useEffect(()=> {
        const loadPrescription = async (prescribingId) => {
            try{
                const res = await fetchPrescrriptionDetailBillCard(prescribingId)
                if(res.status === 200){
                    setP(res.data)
                }
                loadReceipt(prescribingId)
            }catch(err){
                console.log(err)
            }finally{
                setIsLoading(false)
            }
        }

        const loadReceipt = async (prescribingID) => {
            try {
                const res = await fetchReciept(prescribingID)
                if (res.status === 200) {
                    setReceiptStatus(true)
                }
            } catch (err) {
                if(err.status === 500){
                    setReceiptStatus(false)
                }
            }
        }

        if(prescribing)
        {
            loadPrescription(prescribing)
            loadReceipt(prescribing)
           
        }
    }, [prescribing])

    if(isLoading || !prescribing || tReady) 
        return <Box className="ou-mt-3"><Loading/></Box>

    return(
        <Box>

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
                            {p.map((p) => (
                                <TableRow
                                    key={p.medicine_unit.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" align="center" >
                                        <Typography>
                                            {p?.prescribing?.id}
                                        </Typography>
                                    </TableCell >

                                    <TableCell colSpan={5} align="left" className="ou-truncate" >
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
            </Box>
        </Box>

        <Box className="ou-mt-6 ou-text-xl ou-text-right">
            {t('paymentStatus')}: {receiptStatus === true ? 
            <span className="ou-text-xl ou-mt-4 ou-text-green-700 ou-font-bold">
                {t('done')} <CheckCircleOutlineIcon />
            </span>
            : <span className="ou-text-xl ou-mt-4 ou-text-red-700 ou-font-bold">
              {t('unDone')}
            </span>
            }
        </Box>
    </Box>
    )
}
export default PrescribingCard