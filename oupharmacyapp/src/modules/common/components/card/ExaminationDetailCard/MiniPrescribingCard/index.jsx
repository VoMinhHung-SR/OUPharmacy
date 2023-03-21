import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import Loading from "../../../Loading"
import useListItemButton from "../hooks/useListItemButton"
import ListItemButton from "../ListItemButton"
import PrescribingCard from "./PrescribingCard"

const MiniPrescribingCard = ({prescribing, isLoading, receipt}) => {
    const {t, tReady} = useTranslation("prescription-detail")
    const { selectedId,handleSelectId, isOpen } = useListItemButton()
   
    

    console.log(receipt)
    if(!tReady && isLoading)
        return <Box sx={{ height: "300px" }}>
        <Box className='ou-p-5'>
            <Loading/>
        </Box>
    </Box>
    else{
        if(prescribing.length === 0)
            return   <Box className="ou-text-red-700">{t("errNullPrescribing")}</Box>
   
        return (
            <>
                <ListItemButton title={t('prescribingExist')} 
                arrayContent={prescribing ? prescribing : []} 
                callback={(id) => {
                    handleSelectId(id)
                    console.log("Button clicked with ID:", id);
                }}
            />
             {(isOpen && selectedId) ? <>
                <PrescribingCard prescribing={selectedId}/>
                {/* <Box component={Paper} elevation={4}>
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

                                    {console.log(selectedId, receipt)}
                                    {receipt.filter((p) => p.prescribing.id === selectedId).map((p) => (
                                        <TableRow
                                            key={p.medicine_unit.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row" align="center" >
                                                <Typography>
                                                    {p?.prescribing?.id}
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
                    </Box>
                </Box> */}
                    </> : <></>}
            </>
            
        )
    }
    
}

export default MiniPrescribingCard