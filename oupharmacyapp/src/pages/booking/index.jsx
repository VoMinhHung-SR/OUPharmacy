import { Box, Button, Container, FormControl, IconButton, InputLabel, OutlinedInput } from "@mui/material"
import { useNavigate } from "react-router-dom"
import useExamination from "../../modules/pages/ExaminationDetailComponents/hooks/useExamination"
import SendIcon from '@mui/icons-material/Send';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormAddExamination from "../../modules/pages/ExaminationDetailComponents/FormAddExamination";
import BackdropLoading from "../../modules/common/components/BackdropLoading";
import { useTranslation } from "react-i18next";
import Loading from "../../modules/common/components/Loading";

const Booking = () => {
    const { t, ready } = useTranslation(['booking','common'])

    const {checkEmail, checkPatientExist, openBackdrop, user, checkPatientExistSchema,
        patientID, formEmail, isFormEmailOpen, handleOpenFormEmail} = useExamination()
    const router = useNavigate();


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

    if (user === null || user === undefined) {
        return (
            <>
                <Box  className="ou-relative ou-items-center" sx={{ height: "550px" }}>
                    <Box className='ou-absolute ou-p-5 ou-text-center 
                        ou-flex-col ou-flex ou-justify-center ou-items-center
                        ou-top-0 ou-bottom-0 ou-w-full ou-place-items-center'>
                        <Container className="ou-text-center ou-mt-5">
                            <h4> {t('common:errNullUser')} </h4>
                            <Button onClick={() => { router('/login') }}>{t('common:here')}!</Button>
                        </Container>
                    </Box>
                </Box>
            </>
        )
    }
    const renderIsOpenEmailForm = (isFormEmailOpen) => {
        if(isFormEmailOpen)
        return (
            <Box>        
                <div style={{ "width": "100%" }}>
                    <Container className="ou-py-5">
                        <form className="mb-5 p-4" onSubmit={methods.handleSubmit(checkEmail)} style={{ "width": "60%", "margin": "auto", "padding": "20px 20px", "border": "2px solid black", "borderRadius": "5px" }}>
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
                                 
                    </Container>
                </div>
            </Box>
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
                    /> : <></>
                }   
            </>}
        </>
    )
    
}
export default Booking