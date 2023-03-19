import { Box, Collapse, Grid, List, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material";
import moment from "moment";
import { useTranslation } from "react-i18next";
import CustomCollapseListItemButton from "../../collapse/ListItemButton";
// import useExaminationDetail from "../../../../pages/ExaminationDetailComponents/hooks/useExaminationDetail";
import Loading from "../../Loading";
import DiagnosisCard from "../DiagnosisCard";
import useExaminationDetailCard from "./hooks/useExaminationDetailCard";


const ExaminationDetailCard = ({examinationData}) => {
    const { t, tReady } = useTranslation(["examination-detail"]);
    const { diagnosis, isLoading, bill, prescbring} = useExaminationDetailCard(examinationData?.id)
    console.log(isLoading);
    if (tReady)
      return (
        <Box>
          <Loading />
        </Box>
      );

    return (
      <Box className="ou-my-5 ou-mb-8 ou-w-[90%] ou-m-auto">
        <Box>
          <Box>
            <Box className="ou-my-4" component={Paper} elevation={4}>
              <h5 className="ou-text-center ou-text-xl ou-mb-4 ou-pt-4">
                {t("examinationDetailInfo")}
              </h5>
              <Box className="ou-p-4">
                <Grid container>
                  <Grid item xs={6} className="ou-pr-2">
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      style={{ textDecoration: "inherit", marginRight: "20px" }}
                      color="grey.700"
                    >
                      {t("examinationId")}: {examinationData.id}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} className="ou-pr-2">
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      style={{ textDecoration: "inherit" }}
                      color="grey.700"
                    >
                      {t("createdDate")}:{" "}
                      <span>
                        {moment(examinationData.created_date).format(
                          "DD/MM/YYYY"
                        )}
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item xs={6} className="ou-pr-2">
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      style={{ textDecoration: "inherit" }}
                      color="grey.700"
                      className="ou-break-words"
                    >
                      {t("patientFullName")}:{" "}
                      {examinationData.patient.first_name}{" "}
                      {examinationData.patient.last_name}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      style={{ textDecoration: "inherit" }}
                      color="grey.700"
                    >
                      {t("mailStatus")}:{" "}
                      <span>
                        {examinationData.mail_status ? t("sent") : t("nosend")}
                      </span>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      style={{ textDecoration: "inherit", marginRight: "20px" }}
                      color="grey.700"
                      className="ou-truncate"
                    >
                      {t("userCreated")}: {examinationData.user.email}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      style={{ textDecoration: "inherit" }}
                      color="grey.700"
                    >
                      {t("mailStatus")}:{" "}
                      <span>
                        {examinationData.mail_status ? t("sent") : t("nosend")}
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      style={{ textDecoration: "inherit" }}
                      color="grey.700"
                    >
                      {t("description")}: {examinationData.description}
                    </Typography>
                  </Grid>
                </Grid>

                <h5 className=" ou-text-lg ou-mb-3 ou-pt-3">
                     {t('moreInfomation')}:
                </h5>
                <CustomCollapseListItemButton title={t("diagnose")} loading={isLoading}
                  content={<DiagnosisCard sign={diagnosis?.sign} key={diagnosis?.id} diagnosed={diagnosis?.diagnosed}/>}
                />
                <CustomCollapseListItemButton title={t("prescribing")}/>
                <CustomCollapseListItemButton title={t("bill")}/>
              </Box>
            </Box>
          </Box>
        </Box>
      
      </Box>
    );
  };
  export default ExaminationDetailCard;
  