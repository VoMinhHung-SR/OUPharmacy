import {
  Box,
  Button,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import PaidIcon from "@mui/icons-material/Paid";
import SendIcon from "@mui/icons-material/Send";
import ErrorIcon from "@mui/icons-material/Error";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { ROLE_DOCTOR, ROLE_NURSE } from "../../../../../lib/constants";
import useExaminationCard from "./hooks/useExaminationCard";
import Loading from "../../Loading";
import CustomModal from "../../Modal";
import useCustomModal from "../../../../../lib/hooks/useCustomModal";
import ExaminationDetailCard from "../ExaminationDetailCard";
import BackdropLoading from "../../BackdropLoading";

const ExaminationCard = ({examinationData, user, callback}) => {
  const { t } = useTranslation(["examinations", "common", "modal", "examination-detail"]);

  const {id, description, created_date, mail_status} = examinationData
  const { isLoadingButton, handleSendEmailConfirm, isBackdropLoading } = useExaminationCard();
  const { handleCloseModal, isOpen, handleOpenModal } = useCustomModal();
 
 
  const renderButton = (userID, examinationID, avatar) => {
    if (isLoadingButton)
      return (
        <Box className="ou-min-w-[68px]">
          <Loading />
        </Box>
      );
    return (
      <Tooltip title={t("sendEmail")}>
        <Button
          onClick={() => {
            handleSendEmailConfirm(
              userID,
              examinationID,
              avatar,
              callback
            );
          }}
          variant="contained"
          className="!ou-min-w-[68px] !ou-py-2"
        >
          <SendIcon />
        </Button>
      </Tooltip>
    );
  };

  return (
    <>
      {isBackdropLoading && <Box><BackdropLoading/></Box>}
      <TableRow
        key={id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          <Typography>{id}</Typography>
        </TableCell>
        <TableCell align="left">
          <Typography className="ou-table-truncate-text-container">
            {description}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography>{moment(created_date).format("DD/MM/YYYY")}</Typography>
        </TableCell>
        {mail_status ? (
          <TableCell align="center" className="!ou-text-green-700 !ou-font-bold"> {t("sent")}</TableCell>
        ) : (
          <TableCell align="center" className="!ou-text-red-700 !ou-font-bold"> {t("noSent")}</TableCell>
        )}
        <TableCell align="center">
          <Typography>{examinationData?.user?.email ? examinationData.user.email : "undefined"}</Typography>
        </TableCell>
        <TableCell
          align="center"
          className="!ou-flex ou-justify-center ou-items-center"
        >
          <Typography>
            {mail_status === true ? (
              <>
                {user && user.role === ROLE_DOCTOR ? (
                  <>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/examinations/${id}/diagnosis`}
                    >
                    <Tooltip title={t("diagnose")} className="hover:ou-cursor-pointer">
                      <span>
                          <Button
                            variant="contained"
                          
                            color="success"
                            className="!ou-min-w-[68px] !ou-min-h-[40px] !ou-p-2  hover:ou-cursor-pointer"
                          >
                              <MedicalServicesIcon />
                          </Button>
                      </span>
                        
                      </Tooltip>
                    </Link>
                  </>
                ) : (
                  <></>
                )}
                {user && user.role === ROLE_NURSE ? (
                  <>
                    <Tooltip title={t("pay")}>
                      <span>
                        <Link
                          style={{ textDecoration: "none" }}
                          to={`/examinations/${id}/payments`}
                        >
                          <Button
                            variant="contained"
                            color="success"
                            size="small"
                            className="!ou-min-w-[68px] !ou-py-2"
                          >
                            <PaidIcon />
                          </Button>
                        </Link>
                      
                      </span>
                    </Tooltip>
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <>
                {/* Render button for DOCTORS */}
                {user && user.role === ROLE_DOCTOR ? (
                  <>
                    <Tooltip title={t("noReady")}>
                        <Button
                              size="small"
                              variant="contained"
                              className="!ou-bg-red-700 !ou-min-w-[68px]"
                              >
                            <span>
                              <ErrorIcon />
                           </span>
                          </Button>
                        
                    </Tooltip>
                  </>
                ) : (
                  <></>
                )}
                {/* Render button for NURSES */}
                {user && user.role === ROLE_NURSE ? (
                  renderButton(examinationData?.user?.id, id, examinationData?.user?.avatar_path)
                ) : (
                  <></>
                )}
              </>
            )}
          </Typography>
          <Typography>
            <Tooltip title={t("detail")} >
              <span>
                <Button
                    variant="contained"
                    className="ou-bg-blue-700 !ou-min-w-[68px] !ou-py-2 !ou-mx-2"
                    size="small"
                    onClick={()=>handleOpenModal()}
                  >
                    <AssignmentIcon />
                  </Button>
              </span>
            </Tooltip>
          </Typography>
        </TableCell>
      </TableRow>
      

      <CustomModal
        className="ou-w-[900px]"
        open={isOpen}
        onClose={handleCloseModal}
        content={<Box>
          <div>
            <ExaminationDetailCard examinationData={examinationData} />
          </div> 
        </Box>}
        actions={[
          <Button key="cancel" onClick={handleCloseModal}>
            {t('modal:cancel')}
          </Button>
        ]}
        />
    
    </>

  );
};
export default ExaminationCard;
