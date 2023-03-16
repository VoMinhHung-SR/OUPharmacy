import { Box, Button, TableCell, TableRow, Tooltip, Typography } from "@mui/material"
import moment from "moment"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import PaidIcon from '@mui/icons-material/Paid';
import SendIcon from '@mui/icons-material/Send';
import ErrorIcon from '@mui/icons-material/Error';
import AssignmentIcon from '@mui/icons-material/Assignment';

const ExaminationCard = (props) => {
    const {t} = useTranslation(["examination-detail"])
    const examiantion = props
    return (
<TableRow
        key={examiantion?.id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
        <TableCell component="th" scope="row" >
            <Typography>
                {examiantion?.id}
            </Typography>
        </TableCell>
        <TableCell align="left">
            <Typography className="ou-table-truncate-text-container">
                {examiantion?.description}
            </Typography>
        </TableCell>
        <TableCell align="center">
            <Typography>{moment(examiantion?.created_date).format("DD/MM/YYYY")}</Typography>
        </TableCell>
            {/* {renderMailStatus(examiantion?.mail_status)} */}
        <TableCell align="center">
            <Typography>
                {examiantion?.user?.email}
            </Typography>
        </TableCell>
        <TableCell align="center" className="!ou-flex ou-justify-center ou-items-center">
        </TableCell>
        <TableCell align="center">
            <Typography>
                {examiantion?.user?.email}
            </Typography>
        </TableCell>
        <TableCell align="center" className="!ou-flex ou-justify-center ou-items-center">
            
            <Tooltip title={t('detail')}>
                <span>
                    {/* <Link style={{ "textDecoration": "none" }} to={`/examinations/${e.id}`}> */}
                        <Button variant="contained" className="ou-bg-blue-700 !ou-min-w-[68px] !ou-py-2 !ou-ml-2" size="small"
                        //  onClick={()=>renderModal(true, e.id)} 
                        >
                            <AssignmentIcon />
                        </Button>
                    {/* </Link> */}
                </span>
            </Tooltip>
        </TableCell>
    </TableRow>
    )

    
    
}
export default ExaminationCard