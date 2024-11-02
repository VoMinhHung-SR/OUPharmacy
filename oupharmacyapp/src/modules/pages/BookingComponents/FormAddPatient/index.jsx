import { yupResolver } from "@hookform/resolvers/yup"
import { Button, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import SchemaModels from "../../../../lib/schema"
import moment from "moment"
import { CURRENT_DATE } from "../../../../lib/constants"
import usePatient from "../../../../lib/hooks/usePatient"
import { useContext } from "react"
import UserContext from "../../../../lib/context/UserContext"


const FormAddPatient = ({onCallbackSuccess = () => {}}) => {
    const {t , tReady} = useTranslation(['booking', 'yup-validate', 'modal'])
    const {user} = useContext(UserContext)
    const {createPatient} = usePatient()
    const { addingPatientSchema } = SchemaModels()
    const methods = useForm({
        mode:"obSubmit", 
        resolver: yupResolver(addingPatientSchema),
        defaultValues:{
            firstName:"",
            lastName:"",
            email:  "",
            phoneNumber:"",
            address:"",
            dateOfBirth:"",
            gender:0
        }
    })

    const handleOnCallbackSuccess = () => {
        try {
            onCallbackSuccess()
        } catch (err) {
            console.log(err)
        }
    }

    return (    
        <>
        <div className="ou-base-form-outline">
            <h5 className="ou-text-center ou-text-2xl">{t('patientInfo')}</h5>
            <form onSubmit={methods.handleSubmit((data)=> 
                createPatient(user.id, data, methods.setError, handleOnCallbackSuccess))}
                
            >
                 
                <Grid container justifyContent="flex"  id={1}>
                    <Grid item xs={6}  className="!ou-mt-6 ou-pr-2" >
                        <TextField
                            fullWidth
                            autoComplete="given-name"
                            id="firstName"
                            name="firstName"
                            type="text"
                            label={t('firstName')}
                            error={methods.formState.errors.firstName}
                            {...methods.register("firstName")}
                        />
                        {methods.formState.errors ? (<p className="ou-text-xs ou-text-red-600 ou-mt-1 ou-mx-[14px]">{methods.formState.errors.firstName?.message}</p>) : <></>}                            </Grid>

                    <Grid item xs={6} className="!ou-mt-6 ou-pl-2" >
                        <TextField
                            fullWidth
                            autoComplete="given-name"
                            id="lastName"
                            name="lastName"
                            type="text"
                            label={t('lastName')}
                            error={methods.formState.errors.lastName}
                            {...methods.register("lastName")}
                        />
                        {methods.formState.errors ? (<p className="ou-text-xs ou-text-red-600 ou-mt-1 ou-mx-[14px]">{methods.formState.errors.lastName?.message}</p>) : <></>}
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
                            error={methods.formState.errors.email}
                            {...methods.register("email")}
                        
                        />
                        {methods.formState.errors ? (<p className="ou-text-xs ou-text-red-600 ou-mt-1 ou-mx-[14px]">{methods.formState.errors.email?.message}</p>) : <></>}
                    </Grid>

                    <Grid item xs={5} className="!ou-mt-6 ou-pl-2">

                        <TextField
                            fullWidth
                            autoComplete="given-name"
                            id="phoneNumber"
                            name="phoneNumber"
                            type="text"
                            label={t('phoneNumber')}
                            error={methods.formState.errors.phoneNumber}
                            {...methods.register("phoneNumber")}
                            />
                            {methods.formState.errors ? (<p className="ou-text-xs ou-text-red-600 ou-mt-1 ou-mx-[14px]">{methods.formState.errors.phoneNumber?.message}</p>) : <></>}
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
                            error={methods.formState.errors.address}
                            {...methods.register("address")}                             
                            />
                            {methods.formState.errors ? (<p className="ou-text-xs ou-text-red-600 ou-mt-1 ou-mx-[14px]">{methods.formState.errors.address?.message}</p>) : <></>}
                            
                    </Grid>

                </Grid>

                <Grid container justifyContent="flex" style={{ "margin": "0 auto", "marginBottom": "12px" }}>
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
                                inputProps={{
                                    max: moment(CURRENT_DATE).add(0, 'days').format('YYYY-MM-DD') ,
                                }}
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
                <Button variant="contained" 
                    color="success" 
                    type="submit" 
                    style={{"padding": "6px 40px"}}
                    >
                    {t('submit')}
                </Button>
            </form> 
        </div>
        </>
    )
}

export default FormAddPatient