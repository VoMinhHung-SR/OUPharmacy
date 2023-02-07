import { Box, Container, FormControl, IconButton, InputLabel, OutlinedInput } from "@mui/material"
import { Link } from "react-router-dom"
import useExamination, { checkPatientExistSchema } from "../../modules/pages/ExaminationDetailComponents/hooks/useExamination"
import SendIcon from '@mui/icons-material/Send';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormAddExamination from "../../modules/pages/ExaminationDetailComponents/FormAddExamination";
import BackdropLoading from "../../modules/common/components/BackdropLoading";

const Examination = () => {
    
    const {checkEmail, checkPatientExist, openBackdrop, user, patientID, formEmail,
    isFormEmailOpen, handleOpenFormEmail} = useExamination()

    if (user === null || user === undefined) {
        return (
            <>
                <Box sx={{ height: "300px" }}>
                    <Box className='ou-p-5'>
                        <Container className="ou-text-center ou-mt-5">
                            <h4> Bạn phải đăng nhập để tiến hành chẩn đoán</h4>
                            <Link className="nav-link text-primary" to='/login'><h4>Tại đây!</h4></Link>
                        </Container>
                    </Box>
                </Box>
            </>
        )
    }

    const methods = useForm({
        mode:"onSubmit",
        resolver: yupResolver(checkPatientExistSchema),
        defaultValues:{
            email:""
        }
    })

    return (
        <>
            {openBackdrop === true ?
                (<BackdropLoading></BackdropLoading>)
                : <></>
            }
            {isFormEmailOpen ? <Box>        
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
                                 
                    </Container>
                </div>
            </Box> : 
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
export default Examination