import { Box, Button, Grid, InputLabel, TextField, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import Loading from "../../Loading"

const DiagnosisCard = ({id, sign, diagnosed, isLoading}) => {
    
    const {t, ready} = useTranslation(['diagnosis'])
    //TODO: add skeletons here
    if(!ready && isLoading)
        return <Box sx={{ height: "300px" }}>
        <Box className='ou-p-5'>
            <Loading/>
        </Box>
    </Box>

    if(!id)
        return   <Box className="ou-text-red-700">{t("errNullDiagnosis")}</Box>

    return <>
         <Box className="ou-mt-3" >
                <form  style={{ "width": "80%", "margin": "auto", "padding": "20px 20px", "border": "1px solid black", "borderRadius": "4px" }}>
                    <h1 className="ou-text-center ou-text-lg">
                        {t('prescriptionInfomation')}
                        </h1>
                    <Grid container justifyContent="flex" style={{ "margin": "0 auto" }} spacing={3}>
                        <Grid item xs={11} >
                            <InputLabel htmlFor="diagnosed" className="ou-text-xs">{t('sign')}</InputLabel>
                            <TextField
                                fullWidth
                                autoComplete="given-name"
                                id="sign"
                                name="sign"
                                type="text"
                                value={sign}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>

                        <Grid item xs={11}>
                            <InputLabel htmlFor="diagnosed" className="ou-text-xs">{t('diagnosed')}</InputLabel>
                            <TextField
                                fullWidth
                                autoComplete="given-name"
                                id="diagnosed"
                                name="diagnosed"
                                type="text"
                                value={diagnosed}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container className="p-3">
                        <Grid item sx={{ margin: "10px auto" }}>
                            <Typography
                                variant="subtitle1"
                                gutterBottom
                                style={{ textDecoration: "inherit" }}
                                color="grey.700"
                    
                            >
                            </Typography>
                        </Grid>
                    </Grid>
                </form>

            </Box>
        </>
    }
export default DiagnosisCard