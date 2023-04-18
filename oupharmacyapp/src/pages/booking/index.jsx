import { Box, Container, FormControl, IconButton, InputLabel, OutlinedInput, Paper } from "@mui/material"

import SendIcon from '@mui/icons-material/Send';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormAddExamination from "../../modules/pages/BookingComponents/FormAddExamination";
import BackdropLoading from "../../modules/common/components/BackdropLoading";
import { useTranslation } from "react-i18next";
import Loading from "../../modules/common/components/Loading";
import useBooking from "../../modules/pages/BookingComponents/hooks/useBooking";

const Booking = () => {
    const { t, ready } = useTranslation(['booking','common'])

    const {checkEmail, checkPatientExist, openBackdrop, checkPatientExistSchema,
        patientID, formEmail, isFormEmailOpen, handleOpenFormEmail} = useBooking()

    const methods = useForm({
        mode:"onSubmit",
        resolver: yupResolver(checkPatientExistSchema),
        defaultValues:{
            email:""
        }
    })
    // TODO: adding skeletons here
    if (!ready)
        return <Box sx={{ minHeight: "300px" }}>
        <Box className='ou-p-5'>
            <Loading></Loading>
        </Box>
    </Box>;

    const renderIsOpenEmailForm = (isFormEmailOpen) => {
        if(isFormEmailOpen)
        return (
            <Container>

                <Box className="ou-w-[60%] ou-max-w-[600px] 
                ou-absolute ou-top-[40%] ou-left-[50%] -ou-translate-y-1/2 -ou-translate-x-1/2 ou-m-auto" component={Paper}>        
                    <div>
                        <form className="mb-5 p-4 " onSubmit={methods.handleSubmit(checkEmail)} style={{"margin": "auto",
                        "padding": "20px 20px", "border": "1.5px solid black", "borderRadius": "5px" }}>
                            <FormControl fullWidth >
                                <InputLabel htmlFor="email">{t('enterEmail')}</InputLabel>
                                <OutlinedInput
                                    autoComplete="given-name"
                                    id="email"
                                    name="email"
                                    label={t('enterEmail')}
                                    endAdornment={
                                        <IconButton position="start" type='submit' >
                                            <SendIcon />
                                        </IconButton>
                                    }
                                    error={methods.formState.errors.email}
                                    {...methods.register("email")}
                                    />
                                {methods.formState.errors ? (<span className="ou-text-xs ou-text-red-600 ou-mt-1">{methods.formState.errors.email?.message}</span>) : <></>}
                            </FormControl>
                        </form>                   
                    
                    </div>
                </Box>
            </Container>
        )
    }

    return (
        <>
            {openBackdrop === true ?
                (<BackdropLoading />)
                : <></>
            }
            {renderIsOpenEmailForm(isFormEmailOpen)}
            {!isFormEmailOpen && 
            <> 
                {(!methods.formState.errors.email && methods.getValues('email') !== '' && !isFormEmailOpen) ?
                        <FormAddExamination 
                        checkPatientExist={checkPatientExist} 
                        patientID={patientID}
                        email={formEmail.email}
                        handleOpenFormEmail={handleOpenFormEmail}
                    />
                     : <></>
                }   
            </>}
        </>
    )
    
}
export default Booking