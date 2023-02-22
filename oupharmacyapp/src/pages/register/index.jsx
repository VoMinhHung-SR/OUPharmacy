import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Tooltip, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import BackdropLoading from "../../modules/common/components/BackdropLoading";
import useRegister, { registerSchema } from "../../modules/pages/RegisterComponents/hooks/useRegister";
import {yupResolver} from "@hookform/resolvers/yup"
import { useEffect } from "react";
import Loading from "../../modules/common/components/Loading";

const Register = () => {
    const {imageUrl, setImageUrl, openBackdrop, dob, setDOB, isLoadingUserRole,
        selectedImage, setSelectedImage, userRoleID, gender, setGender ,onSubmit
    } = useRegister();
    const methods = useForm({
        mode:"onSubmit", 
        resolver: yupResolver(registerSchema),
        defaultValues:{
            firstName: "",
            lastName: "",
            // username: "",
            email: "",
            password: "",
            confirmPassword: "",
            address: "",
            dob:"",
            phoneNumber: ""
        }
    })
    console.log(userRoleID)
    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);

    if (isLoadingUserRole)
        return <Box sx={{ minHeight: "300px" }}>
        <Box className='ou-p-5'>
            <Loading></Loading>
        </Box>
    </Box>
    
    return (
        <>
            {openBackdrop === true ?
                (<BackdropLoading></BackdropLoading>)
                : <></>
            }

            <div style={{ "width": "100%"
            }}>
                <Container style={{ "padding": "50px" }}>
                    <form onSubmit={methods.handleSubmit((data)=> onSubmit(data, methods.setError))} style={{ "width": "80%", "margin": "auto", "padding": "20px 20px", "border": "2px solid black", "borderRadius": "5px" }}>
                        <h1 className="ou-text-center ou-text-2xl" style={{ color: "#084468", fontWeight:"bold" }}>Đăng ký người dùng</h1>
                        <Grid container justifyContent="flex" style={{ "margin": "0 auto" }} >
                            <Grid item xs={6} >
                                <TextField
                                    fullWidth
                                    autoComplete="given-name"
                                    autoFocus
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    label="Họ"
                                    error={methods.formState.errors.firstName}
                                    helperText={methods.formState.errors.firstName ? methods.formState.errors.firstName.message : ""}
                                    {...methods.register("firstName")}
                                />
                            </Grid>
                            <Grid item xs={6} >
                                <TextField
                                    fullWidth
                                    autoComplete="given-name"
                         
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    label="Tên"
                                    error={methods.formState.errors.lastName}
                                    helperText={methods.formState.errors.lastName ? methods.formState.errors.lastName.message : ""}
                                    {...methods.register("lastName")} />
                            </Grid>
                            {/* <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    autoComplete="given-name"
                      
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="text"
                                    label="SĐT"
                                    error={methods.formState.errors.phoneNumber}
                                    helperText={methods.formState.errors.phoneNumber ? methods.formState.errors.phoneNumber.message : ""}
                                    {...methods.register("phoneNumber")} />
                            </Grid> */}
                        </Grid>

                        <Grid container justifyContent="flex" style={{ "margin": "0 auto" }} spacing={3}>
                            <Grid item xs={6}>
                                <TextField
                                        fullWidth
                                        autoComplete="given-name"
                                        id="email"
                                        name="email"
                                        type="text"
                                        label="Email"
                                        error={methods.formState.errors.email}
                                        helperText={methods.formState.errors.email ? methods.formState.errors.email.message : ""}
                                        {...methods.register("email")}
                                    />
                                {/* <TextField
                                    fullWidth
                                    autoComplete="given-name"
                                
                                    id="username"
                                    name="username"
                                    type="text"
                                    label="Tên người dùng"
                                    error={methods.formState.errors.username}
                                    helperText={methods.formState.errors.username ? methods.formState.errors.username.message : ""}
                                    {...methods.register("username")}
                                /> */}
                            </Grid>
                            <Grid item xs={5}>
                                <TextField
                                    fullWidth
                                    autoComplete="given-name"
                                    id="password"
                                    name="password"
                                    type="password"
                                    label="Mật khẩu"
                                    error={methods.formState.errors.password}
                                    helperText={methods.formState.errors.password ? methods.formState.errors.password.message : ""}
                                    {...methods.register("password")}
                                />
                            </Grid>
                        </Grid>

                        <Grid container justifyContent="flex" style={{ "margin": "0 auto" }} spacing={3}>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    autoComplete="given-name"
                      
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="text"
                                    label="SĐT"
                                    error={methods.formState.errors.phoneNumber}
                                    helperText={methods.formState.errors.phoneNumber ? methods.formState.errors.phoneNumber.message : ""}
                                    {...methods.register("phoneNumber")} />
                            </Grid>
                            <Grid item xs={5}>
                                <TextField
                                    fullWidth
                                    autoComplete="given-name"
                                  
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    label="Xác nhận mật khẩu"
                                    error={methods.formState.errors.confirmPassword}
                                    helperText={
                                        methods.formState.errors.confirmPassword
                                            ? methods.formState.errors.confirmPassword.message
                                            : ""
                                    }
                                    {...methods.register("confirmPassword")}
                                />
                            </Grid>
                        </Grid>

                        <Grid container justifyContent="flex" style={{ "margin": "0 auto" }} spacing={3}>
                            <Grid item xs={11}>
                                <TextField
                                    fullWidth
                                    autoComplete="given-name"
                                    id="address"
                                    name="address"
                                    type="text"
                                    label="Địa chỉ"
                                    error={methods.formState.errors.address}
                                    helperText={methods.formState.errors.address ? methods.formState.errors.address.message : ""}
                                    {...methods.register("address")} />
                            </Grid>

                        </Grid>

                        <Grid container justifyContent="flex" style={{ "margin": "0 auto" }} spacing={3}>
                            <Grid item xs={11}>
                                <TextField
                                    id="date"
                                    label="Ngày sinh"
                                    type="date"
                                    name="dob"
                                    {...methods.register('dob')}
                                    onChange={(evt) => setDOB(evt.target.value)}
                                    sx={{ width: 220 }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    style={{ "margin": "5px" }}
                                />

                                <FormControl sx={{ width: 220 }} style={{ "margin": "5px" }}>
                                    <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={gender}
                                        label="Giới tính"
                                        onChange={(evt) => setGender(evt.target.value)}
                                        defaultValue={0}
                                    >
                                        <MenuItem value={0}>Nam</MenuItem>
                                        <MenuItem value={1}>Nữ</MenuItem>
                                        <MenuItem value={2}>Bí Mật</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                        </Grid>



                        <Grid container justifyContent="flex" style={{ "margin": "0 auto" }}  spacing={3}>
                            <Grid item xs={11}>
                                    <Box style={{ "margin": "5px" }} >
                                        <input accept="image/*" type="file" id="select-image" style={{ display: 'none' }}
                                            onChange={(e) => {
                                                setSelectedImage(e.target.files[0]);
                                            }}
                                        />
                                        <Tooltip title="Ảnh đại diện">
                                        <label htmlFor="select-image">
                                            <Button variant="contained" color="primary" component="span">
                                                Upload Avatar
                                            </Button>
                                        </label>
                                        </Tooltip>
                                        {imageUrl && selectedImage && (
                                            <Box className="ou-my-4 ou-border-solid" textAlign="center">
                                                <img src={imageUrl} alt={selectedImage.name} height="250px" width={250} className="ou-mx-auto"/>
                                            </Box>
                                        )}
                                    </Box>
                                {userRoleID === -1 ? (
                                    <Box className="ou-p-5 ou-text-center">
                                        <div className="ou-text-red-700 ou-text-xl">Hệ thống hiện tại không thể tạo người dùng mới </div>
                                        <div>vui lòng liên hệ quản trị viên để kiểm tra tình trạng người dùng</div>
                                    </Box>
                                    
                                ): (
                                    <Box sx={{textAlign:"right"}}>
                                        <Button variant="contained" color="success" type="submit" >Đăng ký</Button>
                                    </Box>
                                )}
                                
                            </Grid>
                              
                        </Grid>
                      

                    </form>
                </Container>
                <Grid container>
                    <Grid item sx={{ margin: "0 auto", mb: 2 }}>
                        <Typography
                            variant="subtitle1"
                            gutterBottom
                            component={Link}
                            to="/"
                            style={{ textDecoration: "inherit" }}
                            color="grey.700"
                        >
                            Quay về trang chủ
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container justifyContent="flex-end">
                    <Grid item sx={{ margin: "0 auto", mb: 2 }}>
                        <Link
                            to="/login/"
                            style={{ textDecoration: "inherit", color: "#1976d2" }}
                        >
                            Bạn đã có tài khoản? Đăng nhập
                        </Link>
                    </Grid>
                </Grid>
            </div>

        </>
    )

}

export default Register