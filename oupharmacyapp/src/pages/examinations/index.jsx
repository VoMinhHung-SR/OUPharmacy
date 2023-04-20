import {
  Box,
  Button,
  Container,
  Fade,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import Loading from "../../modules/common/components/Loading";
import useExaminationConfirm from "../../modules/pages/ExaminationListComponents/ExaminationConfirm/hooks/useExaminationConfirm";
import { useTranslation } from "react-i18next";
import ExaminationCard from "../../modules/common/components/card/ExaminationCard";
import { useNavigate } from "react-router";
import ExpandCloseComponent from "../../modules/common/components/Expand";
import ExaminationFilter from "../../modules/pages/ExaminationListComponents/ExaminationFilter";
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import useExaminationFilter from "../../modules/pages/ExaminationListComponents/hooks/useExaminationFIlter";
const Examinations = () => {
  const {
    user,
    pagination,
    handleChangePage,
    examinationList,
    isLoadingExamination,
    page,
    handleChangeFlag,
    handleOnSubmitFilter
  } = useExaminationConfirm();

  const {expanded, toggleExpanded} = useExaminationFilter();
  const router = useNavigate();

  const { t, ready } = useTranslation(["examinations", "common", "modal"]);

  //TODO: add skeletons here
  if (!ready)
    return (
      <Box sx={{ height: "300px" }}>
        <Box className="ou-p-5">
          <Loading />
        </Box>
      </Box>
    );

  return (
    <>
      {isLoadingExamination && examinationList.length === 0 ? (
        <Box sx={{ height: "300px" }}>
          <Box className="p-5" >
            <Loading></Loading>
          </Box>
        </Box>
      ) : examinationList.length === 0 ? (
        <Box
          className="ou-relative ou-items-center "
          sx={{ minHeight: "550px" }}
        >
          <Box
            className="ou-absolute ou-p-5 ou-text-center 
                        ou-flex-col ou-flex ou-justify-center ou-items-center
                        ou-top-0 ou-bottom-0 ou-w-full ou-place-items-center"
          >
            <h2 className="ou-text-xl ou-text-red-600">
              {t("errExaminationList")}
            </h2>
            <Typography className="text-center">
              <h3>{t("common:goToBooking")} </h3>
              <Button
                onClick={() => {
                  router("/booking");
                }}
              >
                {t("common:here")}!
              </Button>
            </Typography>
          </Box>
        </Box>
      ) : (
        <>
         

          <Box className="ou-py-8 ou-m-auto ou-max-w-[1536px]" >
            <Box className="ou-flex ou-justify-end ou-items-end">
              {expanded &&  
              <Fade show={expanded}>
                  <ExpandCloseComponent 
                    expanded={expanded}
                    disableButtonOff={true}
                    toggleExpanded = {toggleExpanded}
                    openIcon = { <FilterAltIcon/>}
                    closeIcon = { <FilterAltOffIcon/>}
                  >
                  <ExaminationFilter onSubmit={handleOnSubmitFilter}></ExaminationFilter>
                </ExpandCloseComponent>
              </Fade>
             
            }
             
            </Box>
            
            <TableContainer component={Paper} elevation={4}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>{t("id")}</TableCell>
                    <TableCell align="center">{t("description")}</TableCell>
                    <TableCell align="center">{t("createdDate")}</TableCell>
                    <TableCell align="center">{t("mailStatus")}</TableCell>
                    <TableCell align="center">{t("userCreated")}</TableCell>
                    <TableCell className="!ou-flex !ou-justify-center !ou-items-center" align="center">{t("function")} 
                      <Box className="!ou-text-right">
                        <Button onClick={toggleExpanded}> {expanded ? <FilterAltOffIcon/> : <FilterAltIcon/>} </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {examinationList.map((e) => (
                      <ExaminationCard key={`e-${e.id}`} examinationData={e} user={user} callback={handleChangeFlag}/>       
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
       
        </>
      )}
    </>
  );
};
export default Examinations;
