import { Box, Button, Container, FormControl, IconButton, InputLabel, OutlinedInput } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import useExamination, { checkPatientExistSchema } from "../../modules/pages/ExaminationDetailComponents/hooks/useExamination"
import SendIcon from '@mui/icons-material/Send';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormAddExamination from "../../modules/pages/ExaminationDetailComponents/FormAddExamination";
import BackdropLoading from "../../modules/common/components/BackdropLoading";
import { useTranslation } from "react-i18next";

const Booking = () => {
    const {checkEmail, checkPatientExist, openBackdrop, user, 
        patientID, formEmail, isFormEmailOpen, handleOpenFormEmail} = useExamination()
    const router = useNavigate();

    const { t, ready } = useTranslation(['booking','common'])

    const methods = useForm({
        mode:"onSubmit",
        resolver: yupResolver(checkPatientExistSchema),
        defaultValues:{
            email:""
        }
    })

    if (!ready)
        return <div>Loading translations...</div>;

    if (user === null || user === undefined) {
        return (
            <>
                <Box  className="ou-relative ou-items-center" sx={{ height: "550px" }}>
                    <Box className='ou-absolute ou-p-5 ou-text-center 
                        ou-flex-col ou-flex ou-justify-center ou-items-center
                        ou-top-0 ou-bottom-0 ou-w-full ou-place-items-center'>
                        <Container className="ou-text-center ou-mt-5">
                            <h4> {t('common:errNullUser')} </h4>
                            <Button onClick={() => { router('/login') }}>{t('here')}!</Button>
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

            {/* <Box>        
                <div style={{ "width": "100%" }}>
                    <Container className="ou-py-5">
                        <form className="mb-5 p-4" onSubmit={methods.handleSubmit(checkEmail)} style={{ "width": "60%", "margin": "auto", "padding": "20px 20px", "border": "2px solid black", "borderRadius": "5px" }}>
                            <FormControl fullWidth >
                                <InputLabel htmlFor="email">Nhập vào email để tạo lịch khám(<span className="text-danger">*</span>)</InputLabel>
                                <OutlinedInput
                                    autoComplete="given-name"
                                    id="email"
                                    name="email"
                                    label="Nhập vào Email để tạo lịch khám (*)"
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
                        { (!methods.formState.errors.email && methods.getValues('email') !== '' && isOpenForm) ?
                            <FormAddExamination 
                                checkPatientExist={checkPatientExist} 
                                patientID={patientID}
                                email={formEmail.email}
                            /> : <></>
                        }              
                    </Container>
                </div>
            </Box> */}
        </>
    )
    
}
export default Booking