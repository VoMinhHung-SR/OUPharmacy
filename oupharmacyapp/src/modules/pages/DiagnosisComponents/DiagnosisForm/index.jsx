import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, FormControl, Grid, InputLabel, OutlinedInput, TextField, Typography }  from "@mui/material";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import Loading from "../../../common/components/Loading";
import useDiagnosisForm from "../hooks/useDiagnosisForm";

const DiagnosisForm = (props) => {
    
    const {t, ready} = useTranslation(['diagnosis','yup-validate','modal'])
    const {onSubmit, isLoadingButton, diagnosisSchema} = useDiagnosisForm();
    const methods = useForm({
        mode:"onSubmit",
        resolver: yupResolver(diagnosisSchema),
        defaultValues:{
            sign: "",
            diagnosed: ""
        }
    })
    const router = useNavigate()
    //TODO: add skeletons here
    if(!ready)
        return <Box sx={{ height: "300px" }}>
        <Box className='ou-p-5'>
            <Loading/>
        </Box>
    </Box>


    // This condition meant if the examination doen't have a diagnosis 
    // Then create a new form
    // Else show the info of the diagnosis
    if (props.id === -1)
        return (
            <>
                <Box className='m-5' sx={{ minHeight: "300px" }}>
                    <form onSubmit={methods.handleSubmit((data) => 
                        onSubmit(data,props.examinationId, props.userID, props.handleChangeFlag))
                    } 
                        style={{ "width": "80%", "margin": "auto", "padding": "20px 20px", "border": "1px solid black", "borderRadius": "4px" }}>
                        <h1 className="ou-text-center ou-text-blue-500 ou-text-2xl ou-font-bold">{t('createPrescription')}</h1>
                        <Grid container justifyContent="flex" style={{ "margin": "0 auto" }} spacing={3}>
                            <Grid item xs={11} >
                                <FormControl fullWidth >
                                    <InputLabel htmlFor="sign">{t('sign')}<span className="text-danger">*</span></InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        autoComplete="given-name"
                                        autoFocus
                                        multiline
                                        rows={2}
                                        id="sign"
                                        name="sign"
                                        type="text"
                                        label={t('sign') + '*'}
                                        error={methods.formState.errors.sign}
                                        {...methods.register("sign")}
                                    />
                                    {methods.formState.errors ? (<p className="ou-text-xs ou-text-red-600 ou-mt-1 ou-mx-[14px]">{methods.formState.errors.sign?.message}</p>) : <></>}
                                </FormControl>
                            </Grid>

                            <Grid item xs={11}>
                                <TextField
                                    fullWidth
                                    autoComplete="given-name"
                                    id="diagnosed"
                                    label={t('diagnosed') + '*'}
                                    name="diagnosed"
                                    type="text"
                                    error={methods.formState.errors.diagnosed}
                                    {...methods.register("diagnosed")}
                                />
                                {methods.formState.errors ? (<p className="ou-text-xs ou-text-red-600 ou-mt-1 ou-mx-[14px]">{methods.formState.errors.diagnosed?.message}</p>) : <></>}
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
                                    {isLoadingButton ? (<Button variant="contained" disabled color="success">{t('wait')} <Loading/> </Button>)
                                    : (<Button variant="contained" 
                                        color="success" 
                                        className="!ou-mt-5 !ou-w-[30%] !ou-min-w-[150px] !ou-min-h-[40px] " 
                                        type="submit">
                                            {t('submit')}
                                        </Button>
                                        )
                                    }
                                    
                                </Typography>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </>
        )


    return (
        <>
            <Box  sx={{ minHeight: "300px" }} >
                <form  style={{ "width": "80%", "margin": "auto", "padding": "20px 20px", "border": "1px solid black", "borderRadius": "4px" }}>
                    <h1 className="ou-text-center ou-text-blue-500 ou-text-2xl ou-font-bold">
                        {t('prescriptionInfomation')}
                        </h1>
                    <Grid container justifyContent="flex" style={{ "margin": "0 auto" }} spacing={3}>
                        <Grid item xs={11} >
                            <InputLabel htmlFor="diagnosed">{t('sign')}<span className="text-danger">*</span></InputLabel>
                            <TextField
                                fullWidth
                                autoComplete="given-name"
                                id="sign"
                                name="sign"
                                type="text"
                                // disabled
                                value={props.sign}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>

                        <Grid item xs={11}>
                            <InputLabel htmlFor="diagnosed">{t('diagnosed')}<span className="text-danger">*</span></InputLabel>
                            <TextField
                                fullWidth
                                autoComplete="given-name"
                                id="diagnosed"
                                name="diagnosed"
                                type="text"
                                value={props.diagnosed}
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
                                <Button variant="contained" 
                                    className="!ou-mt-5 !ou-min-w-[150px] !ou-min-h-[40px]" 
                                    color="success" 
                                    onClick={()=> router(`/prescribing/${props.id}`)} >
                                    {t('prescribing')}
                                </Button>
                            </Typography>
                        </Grid>
                    </Grid>



                </form>

            </Box>
        </>)
}
export default DiagnosisForm