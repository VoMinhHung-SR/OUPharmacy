import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Container, Divider, FormControl, Grid, InputAdornment, InputLabel, MenuItem, 
    OutlinedInput, Select, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form";
import BackdropLoading from "../../../common/components/BackdropLoading";
import useFormAddExamination, { formAddExaminationSchema } from "./hooks/useFormAddExamination"

const FormAddExamination = (props) => {

    const {onSubmit, openBackdrop} = useFormAddExamination();
    const methods = useForm({
        mode:"onSubmit", 
        resolver: yupResolver(formAddExaminationSchema),
        defaultValues:{
            description:"",
            createdDate:"",
            firstName:"",
            lastName:"",
            email:props.email ? props.email : "",
            phoneNumber:"",
            address:"",
            dateOfBirth:"",
            gender:0
        }
    })
    return (
        <>
            {openBackdrop ?
                (<BackdropLoading></BackdropLoading>)
                : <></>
            }
            <div className="ou-w-[100%] ou-m-auto ou-my-8">
                <Container>
                    <form onSubmit={methods.handleSubmit((data)=> onSubmit(props.patientID, data))} 
                    style={{ "width": "70%", "margin": "auto", "padding": "20px 20px", "border": "2px solid black", "borderRadius": "5px" }}>
                        <h3 className="ou-text-center ou-text-2xl ou-font-medium">Đặt lịch khám</h3>
                        <Grid container justifyContent="flex" style={{ "margin": "0 auto" }} spacing={3}>
                            <Grid item xs={11} >
                                <FormControl fullWidth >
                                    <InputLabel htmlFor="description">Mô tả(<span className="text-danger">*</span>)</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        autoComplete="given-name"
                                        autoFocus
                                        multiline
                                        rows={2}
                                        id="description"
                                        name="description"
                                        type="text"
                                        label="Mô tả(*)"
                                        error={methods.formState.errors.description}
                                        helperText={methods.formState.errors.description ? methods.formState.errors.description.message : ""}
                                        {...methods.register("description")}
                                    />
                                    {methods.formState.errors ? (<p className="ou-text-xs ou-text-red-600 ou-mt-1 ou-mx-[14px]">{methods.formState.errors.description?.message}</p>) : <></>}
                                </FormControl>
                            </Grid>

                            <Grid item xs={11}>

                                <TextField
                                    fullWidth
                                    autoComplete="given-name"
                                    id="createdDate"
                                    name="createdDate"
                                    type="date"
                                    label="Ngày khám"
                                    error={methods.formState.errors.createdDate}
                                    helperText={methods.formState.errors.createdDate ? methods.formState.errors.createdDate.message : ""}
                                    {...methods.register("createdDate")}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                        </Grid>

                        <h5 className="ou-text-center ou-mt-5 ou-font-medium ou-text-2xl">Thông tin bệnh nhân(<span className="text-danger">*</span>)</h5>
                        <Grid container justifyContent="flex" style={{ "margin": "0 auto" }} spacing={3} id={props.id}>
                            <Grid item xs={5} >

                                <TextField
                                    fullWidth
                                    autoComplete="given-name"
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    label="Họ"
                                    // value={props.firstName === "" ? "": props.firstName}
                                    error={methods.formState.errors.firstName}
                                    helperText={methods.formState.errors.firstName ? methods.formState.errors.firstName.message : ""}
                                    {...methods.register("firstName")}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"></InputAdornment>,
                                    }}
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
                                    // value={props.lastName === ""? "" : props.lastName}
                                    error={methods.formState.errors.lastName}
                                    helperText={methods.formState.errors.lastName ? methods.formState.errors.lastName.message : ""}
                                    {...methods.register("lastName")}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"></InputAdornment>,
                                    }}
                                />
                            </Grid>
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
                                    value={props.email}
                                    error={methods.formState.errors.email}
                                    helperText={methods.formState.errors.email ? methods.formState.errors.email.message : ""}
                                    {...methods.register("email")}
                                    InputProps={{
                                        // readOnly: true,
                                        // disabled:true,
                                        startAdornment: <InputAdornment position="start"></InputAdornment>,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={5}>

                                <TextField
                                    fullWidth
                                    autoComplete="given-name"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="text"
                                    label="SĐT"
                                    // value={props.phoneNumber ===""? "": props.phoneNumber}
                                    error={methods.formState.errors.phoneNumber}
                                    helperText={methods.formState.errors.phoneNumber ? methods.formState.errors.phoneNumber.message : ""}
                                    {...methods.register("phoneNumber")}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"></InputAdornment>,
                                    }} />
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
                                    value={props.address}
                                    error={methods.formState.errors.address}
                                    helperText={methods.formState.errors.address ? methods.formState.errors.address.message : ""}
                                    {...methods.register("address")} 
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"></InputAdornment>,
                                    }}
                                    />
                                    
                            </Grid>

                        </Grid>

                        <Grid container justifyContent="flex" style={{ "margin": "0 auto" }} spacing={3}>
                            <Grid item xs={11}>
                                <FormControl>
                                    <TextField
                                        id="dateOfBirth"
                                        label="Ngày sinh"
                                        type="date"
                                        name="dateOfBirth"
                                        error={methods.formState.errors.dateOfBirth}
                                        sx={{ width: 220 }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        style={{ "margin": "5px" }}
                                        {...methods.register("dateOfBirth")} 
                                    />
                                    {methods.formState.errors ? (<p className="ou-text-xs ou-text-red-600 ou-mt-1 ou-mx-[14px]">{methods.formState.errors.dateOfBirth?.message}</p>) : <></>}
                                </FormControl>
                                <FormControl sx={{ width: 220 }} style={{ "margin": "5px" }}>
                                    <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="gender"
                                        error={methods.formState.errors.gender}
                                        label="Giới tính"
                                        defaultValue={0}
                                        {...methods.register("gender")} 
                                    >
                                        <MenuItem value={0}>Nam</MenuItem>
                                        <MenuItem value={1}>Nữ</MenuItem>
                                        <MenuItem value={2}>Bí Mật</MenuItem>
                                    </Select>
                                    {methods.formState.errors ? (<p className="ou-text-xs ou-text-red-600 ou-mt-1 ou-mx-[14px]">{methods.formState.errors.gender?.message}</p>) : <></>}
                                </FormControl>
                            </Grid>

                        </Grid>
                        <Grid container>
                            <Grid item sx={{ width: "100%"}}>
                                <Typography
                                    variant="subtitle1"
                                    gutterBottom
                                    className="ou-text-right"
                                    style={{ textDecoration: "inherit", margin:"40px auto 0px auto" }}
                                    color="grey.700"
                                >
                                    <Button variant="contained" 
                                        color="success" 
                                        type="submit" 
                                        style={{"marginRight":"20px", "padding": "6px 40px"}}>
                                        Đăng ký
                                    </Button>
                                    
                                    <Button variant="contained" 
                                        onClick={props.handleOpenFormEmail}
                                        color="primary" 
                                        type="button" 
                                        style={{"padding": "6px 40px"}}
                                    >
                                        Tạo mới
                                        </Button>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item sx={{ margin: "10px auto" }}>
                                <Typography
                                    variant="subtitle1"
                                    gutterBottom
                                    style={{ textDecoration: "inherit" }}
                                    color="grey.700"
                                >
                                    
                                </Typography>
                            </Grid>
                        </Grid>
                    </form>
                </Container>

            </div>
        </>
    )
}
export default FormAddExamination