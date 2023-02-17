import { Button, Container, FormControl, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { Link, useNavigate } from "react-router-dom"
import Loading from "../../modules/common/components/Loading"
import usePrescriptionList from "../../modules/pages/PrescriptionListComponents/hooks/usePrescription"
import SearchIcon from '@mui/icons-material/Search';
import AssignmentIcon from '@mui/icons-material/Assignment';
import moment from "moment"
import { useTranslation } from "react-i18next"
import { ROLE_DOCTOR } from "../../lib/constants"
const PrescriptionList = () => {
    const {user, prescriptionList, isLoadingPrescriptionList} = usePrescriptionList()
    const router = useNavigate()
    const {t, ready} = useTranslation(['prescription', 'common'])

    //TODO: add skeletons here
    if(!ready)
        return <Box sx={{ height: "300px" }}>
            <Box className='ou-p-5'>
                <Loading/>
            </Box>
        </Box>

    return (
        <>
            {isLoadingPrescriptionList && prescriptionList.length === 0 ?
                (<Box sx={{ height: "300px" }}>
                    <Box className='p-5'>
                        <Loading/>
                    </Box>
                </Box>)
                : prescriptionList.length === 0 ?
                    (<Box className="ou-relative ou-items-center " sx={{ minHeight: "550px" }}>
                    <Box className='ou-absolute ou-p-5 ou-text-center 
                    ou-flex-col ou-flex ou-justify-center ou-items-center
                    ou-top-0 ou-bottom-0 ou-w-full ou-place-items-center'>
                        <h2 className='ou-text-xl ou-text-red-600'>
                            {t('errNullPrescription')}
                        </h2>
                        <Typography className='text-center'>
                            <h3>{t('common:goToBooking')} </h3>
                            <Button onClick={() => { router('/booking') }}>{t('common:here')}!</Button>
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
                                <TableContainer component={Paper} elevation={4}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>{t('prescriptionId')}</TableCell>
                                                <TableCell align="center">{t('sign')}</TableCell>
                                                <TableCell align="center">{t('diagnosed')}</TableCell>
                                                <TableCell align="center">{t('diagnosisDate')}</TableCell>
                                                <TableCell align="center">{t('doctorName')}</TableCell>
                                                <TableCell align="center">{t('feature')}</TableCell>
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
                                                        {user && user.role.name === ROLE_DOCTOR ?
                                                            (<>
                                                                <Typography className="mb-2">
                                                                    <Link style={{ "textDecoration": "none" }}

                                                                        to={`/prescriptions/${p.id}`}>
                                                                        <Button variant="contained" size="small" endIcon={<AssignmentIcon />}>
                                                                            {t('prescribing')}
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