import { Box, Container, FormControl, IconButton, InputLabel, OutlinedInput } from "@mui/material"
import { Link } from "react-router-dom"
import useExamination, { checkPatientExistSchema } from "../../modules/pages/ExaminationComponents/hooks/useExamination"
import SendIcon from '@mui/icons-material/Send';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormAddExamination from "../../modules/pages/ExaminationComponents/FormAddExamination";

const Examination = () => {

    const {user, checkEmail, checkPatientExist} = useExamination()

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
        <h1>
              <>
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
                                    {...methods.register("email")}
                                />
                                {methods.formState.errors ? (<span className="ou-text-sm ou-text-red-600">{methods.formState.errors.email?.message}</span>) : <></>}
                            </FormControl>
                        </form>
                        { methods.getValues('email') !== '' ?
                            <FormAddExamination checkPatientExist={checkPatientExist}/> : <></>
                        }
                        
                    </Container>

                </div>
            </>
        </h1>
    )
    
}
export default Examination