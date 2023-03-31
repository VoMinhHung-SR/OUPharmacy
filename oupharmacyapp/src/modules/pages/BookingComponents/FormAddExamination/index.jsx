import { yupResolver } from "@hookform/resolvers/yup"
import { Box, Button, Container, FormControl, Grid, InputAdornment, InputLabel, MenuItem, 
    OutlinedInput, Paper, Select, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import BackdropLoading from "../../../common/components/BackdropLoading";
import Loading from "../../../common/components/Loading";
import useFormAddExamination from "./hooks/useFormAddExamination"

const FormAddExamination = (props) => {

    const {t , tReady} = useTranslation(['booking', 'yup-validate', 'modal'])
    const {onSubmit, openBackdrop, formAddExaminationSchema} = useFormAddExamination();
    const methods = useForm({
        mode:"onSubmit", 
        resolver: yupResolver(formAddExaminationSchema),
        defaultValues:{
            description:"",
            createdDate:"",
            firstName:"",
            lastName:"",
            email:props.email ? props.email : "",
            phoneNumber:"",
            address:"",
            dateOfBirth:"",
            gender:0
        }
    })
    // TODO: adding skeletons here
    if (tReady)
        return <Box sx={{ minHeight: "300px" }}>
        <Box className='ou-p-5'>
            <Loading></Loading>
        </Box>
    </Box>;
    return (
        <>
            {openBackdrop ?
                (<Loading></Loading>)
                : <></>
            }
            <div className="ou-w-[80%] ou-m-auto ou-my-8">
                <Box component={Paper} elevation={6}>
                <form onSubmit={methods.handleSubmit((data)=> onSubmit(props.patientID, data, props.handleOpenFormEmail))} 
                    className="ou-m-auto ou-py-6 ou-px-10">
                        <h3 className="ou-text-center ou-text-2xl">{t('booking')}</h3>
                        <Grid container justifyContent="flex">
                            <Grid item xs={12} className="!ou-mt-6" >
                                <FormControl fullWidth >
                                    <InputLabel htmlFor="description">{t('description')}</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        autoComplete="given-name"
                                        autoFocus
                                        multiline
                                        rows={2}
                                        id="description"
                                        name="description"
                                        type="text"
                                        label={t('description')}
                                        error={methods.formState.errors.description}
                                        helperText={methods.formState.errors.description ? methods.formState.errors.description.message : ""}
                                        {...methods.register("description")}
                                    />
                                    {methods.formState.errors ? (<p className="ou-text-xs ou-text-red-600 ou-mt-1 ou-mx-[14px]">{methods.formState.errors.description?.message}</p>) : <></>}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} className="!ou-mt-6" >

                                <TextField
                                    fullWidth
                                    autoComplete="given-name"
                                    id="createdDate"
                                    name="createdDate"
                                    type="date"
                                    label={t('createdDate')}
                                    error={methods.formState.errors.createdDate}
                                    helperText={methods.formState.errors.createdDate ? methods.formState.errors.createdDate.message : ""}
                                    {...methods.register("createdDate")}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                        </Grid>

                        <h5 className="ou-text-center ou-mt-8 ou-text-2xl">{t('patientInfo')}</h5>
                        <Grid container justifyContent="flex"  id={props.id}>
                            <Grid item xs={6}  className="!ou-mt-6 ou-pr-2" >
                                <TextField
                                    fullWidth
                                    autoComplete="given-name"
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    label={t('firstName')}
                                    error={methods.formState.errors.firstName}
                                    helperText={methods.formState.errors.firstName ? methods.formState.errors.firstName.message : ""}
                                    {...methods.register("firstName")}
                                />
                            </Grid>

                            <Grid item xs={6} className="!ou-mt-6 ou-pl-2" >
                                <TextField
                                    fullWidth
                                    autoComplete="given-name"
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    label={t('lastName')}
                                    error={methods.formState.errors.lastName}
                                    helperText={methods.formState.errors.lastName ? methods.formState.errors.lastName.message : ""}
                                    {...methods.register("lastName")}
                                />
                            </Grid>
                        </Grid>

                        <Grid container justifyContent="flex" >
                            <Grid item xs={7} className="!ou-mt-6 ou-pr-2">
                                <TextField
                                    fullWidth
                                    autoComplete="given-name"
                                    id="email"
                                    name="email"
                                    type="text"
                                    label={t('email')}
                                    value={props.email}
                                    error={methods.formState.errors.email}
                                    helperText={methods.formState.errors.email ? methods.formState.errors.email.message : ""}
                                    {...methods.register("email")}
                                    InputProps={{
                                        readOnly: true,
                                        startAdornment: <InputAdornment position="start"></InputAdornment>,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={5} className="!ou-mt-6 ou-pl-2">

                                <TextField
                                    fullWidth
                                    autoComplete="given-name"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="text"
                                    label={t('phoneNumber')}
                                    // value={props.phoneNumber ===""? "": props.phoneNumber}
                                    error={methods.formState.errors.phoneNumber}
                                    helperText={methods.formState.errors.phoneNumber ? methods.formState.errors.phoneNumber.message : ""}
                                    {...methods.register("phoneNumber")}
                                    />
                            </Grid>
                        </Grid>

                        <Grid container justifyContent="flex" style={{ "margin": "0 auto" }} >
                            <Grid item xs={12} className="!ou-mt-6">
                                <TextField
                                    fullWidth
                                    autoComplete="given-name"
                                    id="address"
                                    name="address"
                                    type="text"
                                    label={t('address')}
                                    value={props.address}
                                    error={methods.formState.errors.address}
                                    helperText={methods.formState.errors.address ? methods.formState.errors.address.message : ""}
                                    {...methods.register("address")} 
                            
                                    />
                                    
                            </Grid>

                        </Grid>

                        <Grid container justifyContent="flex" style={{ "margin": "0 auto" }}>
                            <Grid item xs={12} className="!ou-mt-6">
                                <FormControl>
                                    <TextField
                                        id="dateOfBirth"
                                        label={t('dateOfBirth')}
                                        type="date"
                                        name="dateOfBirth"
                                        error={methods.formState.errors.dateOfBirth}
                                        sx={{ width: 220 }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        style={{ "margin": "5px" }}
                                        {...methods.register("dateOfBirth")} 
                                    />
                                    {methods.formState.errors ? (<p className="ou-text-xs ou-text-red-600 ou-mt-1 ou-mx-[14px]">{methods.formState.errors.dateOfBirth?.message}</p>) : <></>}
                                </FormControl>
                                <FormControl sx={{ width: 220 }} style={{ "margin": "5px" }}>
                                    <InputLabel id="demo-simple-select-label">{t('gender')}</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="gender"
                                        error={methods.formState.errors.gender}
                                        label={t('gender')}
                                        defaultValue={0}
                                        {...methods.register("gender")} 
                                    >
                                        <MenuItem value={0}>{t('man')}</MenuItem>
                                        <MenuItem value={1}>{t('woman')}</MenuItem>
                                        <MenuItem value={2}>{t('secret')}</MenuItem>
                                    </Select>
                                    {methods.formState.errors ? (<p className="ou-text-xs ou-text-red-600 ou-mt-1 ou-mx-[14px]">{methods.formState.errors.gender?.message}</p>) : <></>}
                                </FormControl>
                            </Grid>

                        </Grid>
                        <Grid container>
                            <Grid item sx={{ width: "100%"}}>
                                <Typography
                                    variant="subtitle1"
                                    gutterBottom
                                    className="ou-text-right"
                                    style={{ textDecoration: "inherit", margin:"40px auto 0px auto" }}
                                    color="grey.700"
                                >
                                    <Button variant="contained" 
                                        onClick={props.handleOpenFormEmail}
                                        color="primary" 
                                        type="button" 
                                        style={{"marginRight":"20px", "padding": "6px 40px"}}>
                                        {t('new')}
                                    </Button>

                                    <Button variant="contained" 
                                        color="success" 
                                        type="submit" 
                                        style={{"padding": "6px 40px"}}
                                        >
                                        {t('submit')}
                                    </Button>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
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
                  

            </div>
        </>
    )
}
export default FormAddExamination