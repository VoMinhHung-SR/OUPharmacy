import {
  Badge,
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
import { Helmet } from "react-helmet";
const Examinations = () => {
  const {
    user,
    pagination,
    handleChangePage,
    examinationList,
    isLoadingExamination,
    isRequestSuccessful,
    page,
    paramsFilter,
    filterCount,
    handleChangeFlag,
    handleOnSubmitFilter,
    disableOtherCards, handleSendEmailConfirm, loadingState
  } = useExaminationConfirm();

  const {expanded, toggleExpanded} = useExaminationFilter();
  const router = useNavigate();

  const { t, ready } = useTranslation(["examinations", "common", "modal"]);

  //TODO: add skeletons here
  if (!ready)
    return (
      <Box sx={{ height: "300px" }}>

        <Helmet>
          <title>Examinations</title>
        </Helmet>

        <Box className="ou-p-5"> 
          <Loading />
        </Box>
      </Box>
    )


  const renderExamList = () => 
  (
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
            <ExaminationFilter onSubmit={handleOnSubmitFilter} 
              mailStatus={paramsFilter.mailStatus} createdDate={paramsFilter.createdDate} 
              kw={paramsFilter.kw}/>
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
              <TableCell align="center">
                <Box className="ou-flex ou-justify-center ou-items-center">

                  {t("function")} 
                
                  <Box className="!ou-text-right">
                    <Button onClick={toggleExpanded}>  
                      <Badge
                        badgeContent={filterCount}
                        color="error"
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                        >
                        {expanded ? <FilterAltOffIcon/> : <FilterAltIcon/>} 
                      </Badge>
                    </Button>
                  </Box>
                </Box>
            
              
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              examinationList.length > 0 ? examinationList.map((e) => (
                <ExaminationCard key={`e-${e.id}`} 
                examinationData={e} user={user} 
                callback={handleChangeFlag}
                disableOtherCards={disableOtherCards}
                loading={loadingState[e.id] || false} 
                sendEmailConfirm={() => handleSendEmailConfirm(e.user.id, e.id, user.avatar_path)}
                />       
            )) :  <TableCell colSpan={12} component="th" scope="row">
            <Typography> <Box className="ou-text-center ou-p-10 ou-text-red-700">{t('examinations:errExamsNull')}</Box></Typography>
          </TableCell>
            }
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
   </Box>)
  
  return (
    <>
      <Helmet>
          <title>Examinations</title>
      </Helmet>


      {isLoadingExamination && <Box sx={{ height: "300px" }}>
          <Box className="p-5" >
            <Loading></Loading>
          </Box>
      </Box>}
      {!isLoadingExamination && isRequestSuccessful && renderExamList() }
     
      {!isLoadingExamination && !isRequestSuccessful && (
        <p>Failed to load examinations.</p>
      )}

    </>
  );
};
export default Examinations;
