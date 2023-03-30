import { Alert, Avatar, Button, Collapse, Container, Grid, IconButton, TextField } from "@mui/material";
import { Box } from "@mui/system";
import BackdropLoading from "../../modules/common/components/BackdropLoading";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import useLogin from "../../modules/pages/LoginComponents/hooks/useLogin";
import { useForm } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup"
import { useTranslation } from "react-i18next";
import Loading from "../../modules/common/components/Loading";
const Login = () =>{
    const {t, tReady} = useTranslation(['login', 'yup-validate'])
    const {onSubmit, openError, openBackdrop, setOpenError, loginSchema} = useLogin();
    
    const methods = useForm({
        mode:"onSubmit", 
        resolver: yupResolver(loginSchema),
        defaultValues:{
            username:"",
            password:"",
        } 
    })
    if(tReady)
        return <Box className="ou-mt-3">
            <Loading/>
        </Box>
    return (
        <>
        {openBackdrop === true ?
            (<BackdropLoading></BackdropLoading>)
            : <></>
        }
 
                <Box style={{
                    "width": "100%", 
                    "top": "50%", "left": "50%", "position": "absolute",
                    "transform": "translate(-50%, -50%)"
                }}>

                    <Container style={{ "padding": "20px", "width": "600px", "border": "2px solid black", "borderRadius": "5px" }}>
                        <Box style={{"margin":"12px auto"}}>
                            <Avatar sx={{ width: '200px', height: '50px', margin:"auto" }} variant="square"
                                src="https://res.cloudinary.com/dl6artkyb/image/upload/v1666354515/OUPharmacy/Untitled-1_hdvtsk.png"></Avatar>
                        </Box>

                        <form onSubmit={methods.handleSubmit((data) => {
                                onSubmit(data);
                            })}>
                            <Grid item xs={12} sm={12} >
                                <Collapse in={openError}>
                                    <Alert
                                        action={
                                            <IconButton
                                                aria-label="close"
                                                color="inherit"
                                                size="small"
                                                onClick={() => {
                                                    setOpenError(false);
                                                }}
                                            >
                                                <CloseIcon fontSize="inherit" />
                                            </IconButton>
                                        }
                                        sx={{ mb: 2 }}
                                        severity="error"
                                    >
                                        {t('incorrectInfo')}
                                    </Alert>
                                </Collapse>
                            </Grid>
                            <Grid item xs={12} sm={12} style={{margin:"16px 0"}}>
                                <TextField
                                    fullWidth
                                    autoComplete="given-name"
                                    autoFocus
                                    id="username"
                                    name="username"
                                    type="text"
                                    label= {t('username')}
                                    error={methods.formState.errors.username}
                                    helperText={methods.formState.errors.username ? methods.formState.errors.username.message : ""}
                                    {...methods.register("username")}
                                />
                            </Grid>
                            <Grid item xs={12} style={{margin:"16px 0"}}>
                                <TextField
                                    fullWidth
                                    autoComplete="given-name"
                                    id="password"
                                    name="password"
                                    type="password"
                                    label={t('password')}
                                    error={methods.formState.errors.password}
                                    helperText={methods.formState.errors.password ? methods.formState.errors.password.message : ""}
                                    {...methods.register("password")}
                                />
                            </Grid>
                            <div style={{ "margin": "0 auto", "textAlign": "center" }}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    {t('login')}
                                </Button>
                                <Grid container justifyContent="flex-end" style={{ "margin": "20px 0 0 0" }}>
                                    <Grid item>
                                        <Link
                                            to="/register/"
                                            style={{ textDecoration: "inherit", color: "black", margin: "10px 5px" }}
                                        >
                                            <Button variant="default" type="submit" >{t('register')}</Button>
                                        </Link>
                                        <Link
                                            to="/"
                                            style={{ textDecoration: "inherit", color: "black", margin: "10px 5px" }}
                                        >
                                            <Button className="!ou-bg-blue-600 !ou-text-white " type="submit" >{t('homePage')}</Button>
                                        </Link>
                                    </Grid>
                                </Grid>
                            </div>
                        </form>
                    </Container>
                </Box>
 




    </>
    )
}

export default Login