import { Alert, Avatar, Button, Collapse, Container, Grid, IconButton, Paper, TextField } from "@mui/material";
import { Box } from "@mui/system";
import BackdropLoading from "../../modules/common/components/BackdropLoading";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import useLogin from "../../modules/pages/LoginComponents/hooks/useLogin";
import { useForm } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup"
import { useTranslation } from "react-i18next";
import Loading from "../../modules/common/components/Loading";
import { Helmet } from "react-helmet";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import HomeIcon from '@mui/icons-material/Home';
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
            <Helmet>
                <title>Login</title>
            </Helmet>
            
            <Loading/>
        </Box>
    return (
        <>
         <Helmet>
          <title>Login</title>
        </Helmet>

        {openBackdrop === true ?
            (<BackdropLoading></BackdropLoading>)
            : <></>
        }
 
                <Box 
                
                style={{
                    "width": "100%", 
                    "top": "50%", "left": "50%", "position": "absolute",
                    "transform": "translate(-50%, -50%)"
                }}>

                    <Container component={Paper} elevation={4} style={{ "padding": "20px", "width": "600px", "border": "1.5px solid black", "borderRadius": "5px" }}>
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
                                    {...methods.register("username")}
                                />
                                {methods.formState.errors ? (<p className="ou-text-xs ou-text-red-600 ou-mt-1 ou-mx-[14px]">{methods.formState.errors.username?.message}</p>) : <></>}
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
                                    {...methods.register("password")}
                                />
                                 {methods.formState.errors ? (<p className="ou-text-xs ou-text-red-600 ou-mt-1 ou-mx-[14px]">{methods.formState.errors.password?.message}</p>) : <></>}
                            </Grid>
                            <div style={{ "margin": "0 auto", "textAlign": "center" }}>
                                <Button
                                    type="submit"
                                    className="!ou-bg-blue-600 !ou-text-white !ou-min-w-[80px] !ou-px-5"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    {t('login')}
                                </Button>
                                <Grid container justifyContent="flex-end" style={{ "margin": "20px 0 0 0" }}>
                                    <Grid item className="ou-flex ou-justify-center ou-items-center">
                                        <Box className='ou-mr-2 ou-flex ou-justify-center ou-items-center'>
                                            <Link
                                                className="hover:ou-bg-gray-700 hover:ou-bg-opacity-20 ou-p-2 ou-rounded"
                                                to="/register/"
                                                sx={{ mt: 3, mb: 2 }}
                                            >
                                                <HowToRegIcon />
                                                <Button variant="default" style={{padding:"0px 4px"}} >{t('register')} </Button>
                                            </Link>
    
                                        </Box>
                                        <Box className='ou-flex ou-justify-center ou-items-center'>
                                            <Link
                                                className="hover:ou-bg-gray-700 hover:ou-bg-opacity-20 ou-p-2 ou-rounded ou-text-blue-700"
                                                to="/"
                                                style={{ textDecoration: "inherit", margin: "10px 5px" }}
                                            >
                                                <HomeIcon />
                                                <Button style={{padding:"0px 4px"}} >{t('homePage')}</Button>
                                            </Link>
    
                                        </Box>
                                       
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