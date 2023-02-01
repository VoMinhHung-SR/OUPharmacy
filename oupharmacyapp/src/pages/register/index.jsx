import { Box, Button, Container, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import BackdropLoading from "../../modules/common/components/BackdropLoading";
import useRegister, { registerSchema } from "../../modules/pages/RegisterComponents/hooks/useRegister";
import {yupResolver} from "@hookform/resolvers/yup"

const Register = () => {
    const {imageUrl, setImageUrl, openBackdrop, dob, setDOB,
        selectedImage, setOpenBackdop, setSelectedImage,
        currentDate, gender, setGender ,onSubmit
    } = useRegister();
    const methods = useForm({
        mode:"onSubmit", 
        resolver: yupResolver(registerSchema),
        defaultValues:{
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            address: "",
            phoneNumber: ""
        }
    })
    return (
        <>
            {openBackdrop === true ?
                (<BackdropLoading></BackdropLoading>)
                : <></>
            }

            <div style={{ "width": "100%"
            // , "backgroundColor": "#f3f3f3" 
            }}>
                <Container style={{ "padding": "50px" }}>



                    <form onSubmit={methods.handleSubmit((data)=> onSubmit)} style={{ "width": "60%", "margin": "auto", "padding": "20px 20px", "border": "2px solid black", "borderRadius": "5px" }}>
                        <h1 className="text-center" style={{ color: "#084468" }}>Đăng ký người dùng</h1>
                        <Grid container justifyContent="flex" style={{ "margin": "0 auto" }} spacing={3}>
                            <Grid item xs={4} >
                                {/* <RegisterForm id="firstName" name="firstName" label="Họ" type="text"
                                    placeholder="Enter your first name" value={firstName} change={(evt) => setFirstName(evt.target.value)} /> */}
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
                            <Grid item xs={4} >
                                {/* <RegisterForm id="lastName" name="lastName" label="Tên" type="text"
                                    placeholder="Enter your last name" value={lastName} change={(evt) => setLastName(evt.target.value)} /> */}
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
                            <Grid item xs={3}>
                                {/* <RegisterForm id="phoneNumber" name="phoneNumber" label="SĐT" type="text"
                                    placeholder="Enter your phone number" value={phoneNumber} change={(evt) => setPhoneNumber(evt.target.value)} /> */}
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
                        </Grid>

                        <Grid container justifyContent="flex" style={{ "margin": "0 auto" }} spacing={3}>
                            <Grid item xs={6}>
                                {/* <RegisterForm id="userName" name="username" label="Tên tài khoản" type="text"
                                    placeholder="Enter your username" value={username} change={(evt) => setUserName(evt.target.value)} /> */}
                                <TextField
                                    fullWidth
                                    autoComplete="given-name"
                                
                                    id="username"
                                    name="username"
                                    type="text"
                                    label="Tên người dùng"
                                    error={methods.formState.errors.username}
                                    helperText={methods.formState.errors.username ? methods.formState.errors.username.message : ""}
                                    {...methods.register("username")}
                                />
                            </Grid>
                            <Grid item xs={5}>
                                {/* <RegisterForm id="password" name="password" label="Mật khẩu" type="password"
                                    placeholder="Enter your password" value={password} change={(evt) => setPassword(evt.target.value)} /> */}
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
                                {/* <RegisterForm id="email" name="email" label="Email" type="email"
                                    placeholder="Enter your email" value={email} change={(evt) => setEmail(evt.target.value)} /> */}
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
                            </Grid>
                            <Grid item xs={5}>
                                {/* <RegisterForm id="confirmPassword" name="confirmPassword" label="Nhập lại mật khẩu" type="password"
                                    placeholder="Enter your password" value={confirmPassword} change={(evt) => setConfirmPassword(evt.target.value)} /> */}
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
                                {/* <RegisterForm id="address" name="address" label="Địa chỉ" type="text"
                                    placeholder="Enter your address" value={address} change={(evt) => setAddress(evt.target.value)} /> */}
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
                                    defaultValue={currentDate}
                                    value={dob}
                                    onChange={(evt) => setDOB(evt.target.value)}
                                    sx={{ width: 220 }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    style={{ "margin": "5px" }}
                                />

                                <Box sx={{ width: 220 }} style={{ "margin": "5px" }}>
                                    <label id="demo-simple-select-label">Giới tính</label>
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
                                </Box>
                            </Grid>

                        </Grid>




                        <Box className="mb-3" controlId="formBasicImage" style={{ "margin": "5px" }}>
                            <label style={{ "paddingRight": "20px" }}>Chọn hình ảnh*</label>
                            <input accept="image/*" type="file" id="select-image" style={{ display: 'none' }}
                                onChange={(e) => {
                                    setSelectedImage(e.target.files[0]);
                                    console.log(selectedImage);
                                    console.log(imageUrl);
                                }}
                            />
                            <label htmlFor="select-image">
                                <Button variant="contained" color="primary" component="span">
                                    Upload Avatar
                                </Button>
                            </label>
                            {imageUrl && selectedImage && (
                                <Box mt={2} textAlign="center">
                                    <img src={imageUrl} alt={selectedImage.name} height="250px" />
                                </Box>
                            )}
                        </Box>
                        <Box sx={{textAlign:"right"}}>
                            <Button variant="contained" color="success" type="submit" >Đăng ký</Button>
                        </Box>

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