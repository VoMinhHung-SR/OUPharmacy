import { Autocomplete, Box, Button, Container, createFilterOptions, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Tooltip, Typography } from "@mui/material";
import { set, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import BackdropLoading from "../../modules/common/components/BackdropLoading";
import useRegister from "../../modules/pages/RegisterComponents/hooks/useRegister";
import {yupResolver} from "@hookform/resolvers/yup"
import { useEffect } from "react";
import Loading from "../../modules/common/components/Loading";
import { useSelector } from 'react-redux'; 
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import useAddressInfo from "../../modules/pages/RegisterComponents/hooks/useAddressInfo";

const Register = () => {
    const {t, tReady} = useTranslation(['register', 'common']) 
    const {imageUrl, setImageUrl, openBackdrop, dob, setDOB, isLoadingUserRole, registerSchema,
        selectedImage, setSelectedImage, userRoleID, gender, setGender ,onSubmit
    } = useRegister();
    const {districts, setAddressInput, setCityId, loading, listPlace} = useAddressInfo()
    const methods = useForm({
        mode:"onSubmit", 
        resolver: yupResolver(registerSchema),
        defaultValues:{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            address: "",
            dob:"",
            phoneNumber: "",
            city:"",
            district:""
        }
    })
    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
        }

    }, [selectedImage]);

    const { allConfig } = useSelector((state) => state.config);

    const filterOptions = createFilterOptions({
        matchFrom: 'start',
        stringify: (option) => option.name,
    });

    const filterAddressOptions = createFilterOptions({
        matchFrom: 'start',
        stringify: (option) => option ? option.description : "",
    })

    if (tReady && isLoadingUserRole)
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
                    <form onSubmit={methods.handleSubmit((data)=> {
                       
                        onSubmit(data, methods.setError);
                    })} 
                    className="ou-m-auto ou-px-8 ou-py-4 ou-w-[80%]"
                    style={{ "border": "2px solid black", "borderRadius": "5px" }}>
                        <h1 className="ou-text-center ou-text-2xl" style={{ color: "#084468", fontWeight:"bold" }}>{t('registerUser')}</h1>
                        <Grid container justifyContent="flex" className="ou-mt-6" >
                            <Grid item xs={4} className="ou-pr-2" >
                                <TextField
                                    fullWidth
                                    autoComplete="given-name"
                                    autoFocus
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    label={t('firstName')}
                                    error={methods.formState.errors.firstName}
                                    helperText={methods.formState.errors.firstName ? methods.formState.errors.firstName.message : ""}
                                    {...methods.register("firstName")}
                                />
                            </Grid>
                            <Grid item xs={4} className="ou-pr-2">
                                <TextField
                                    fullWidth
                                    autoComplete="given-name"
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    label={t('lastName')}
                                    error={methods.formState.errors.lastName}
                                    helperText={methods.formState.errors.lastName ? methods.formState.errors.lastName.message : ""}
                                    {...methods.register("lastName")} />
                            </Grid>
                            <Grid item xs={4} className="ou-pr-2">
                                <TextField
                                    fullWidth
                                    autoComplete="given-name"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="text"
                                    label={t('phoneNumber')}
                                    error={methods.formState.errors.phoneNumber}
                                    helperText={methods.formState.errors.phoneNumber ? methods.formState.errors.phoneNumber.message : ""}
                                    {...methods.register("phoneNumber")} />
                            </Grid>
                        </Grid>

                        <Grid container justifyContent="flex"  className="ou-mt-4  ou-items-center">
                            <Grid item xs={6} className="ou-pr-1">
                                <TextField
                                        fullWidth
                                        autoComplete="given-name"
                                        id="email"
                                        name="email"
                                        type="text"
                                        label={t('email')}
                                        error={methods.formState.errors.email}
                                        helperText={methods.formState.errors.email ? methods.formState.errors.email.message : ""}
                                        {...methods.register("email")}
                                    />
                            </Grid>
                            < Grid item xs={6} className="ou-flex">
                                <TextField
                                    id="date"
                                    label={t('dateOfBirth')}
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
                                    <InputLabel id="demo-simple-select-label">{t('gender')}</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={gender}
                                        label={t('gender')}
                                        onChange={(evt) => setGender(evt.target.value)}
                                        defaultValue={0}
                                    >
                                        <MenuItem value={0}>{t('male')}</MenuItem>
                                        <MenuItem value={1}>{t('female')}</MenuItem>
                                        <MenuItem value={2}>{t('secret')}</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                           
                        </Grid>

                        <Grid container justifyContent="flex" className="ou-mt-4 ou-items-center">
                        <Grid item xs={6} className="ou-pr-1">
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
                            <Grid item xs={6} className="ou-pl-1">
                                <TextField
                                    fullWidth
                                    autoComplete="given-name"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    label={t('confirmPassword')}
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

                        <h1 className="ou-text-center ou-text-2xl ou-mt-6" style={{ color: "#084468", fontWeight:"bold" }}>{t('addressInfo')}</h1>
                        <Grid container justifyContent="flex">
                            
                            <Grid item xs={4} className={clsx('ou-pr-2 !ou-mt-4')} >
                                <FormControl fullWidth >
                                    <Autocomplete
                                        id="city"
                                        options={allConfig.cityOptions}
                                        getOptionLabel={(option) => option.name}
                                        filterOptions={filterOptions}
                                        isOptionEqualToValue={(option, value) => option.id === value.id}
                                   
                                        noOptionsText={t('noCityFound')}
                                        onChange={(event, value) => {
                                            methods.setValue('district', ' ')
                                            setCityId(value.id)
                                            methods.setValue("city",value.id)
                                            methods.clearErrors('city')
                                        }}
                                        renderInput={(params) => <TextField {...params} label={t('city')} 
            
                                            error={methods.formState.errors.city}
                                            name="city"
                                            />}
                                    />
                                       {methods.formState.errors ? (<p className="ou-text-xs ou-text-red-600 ou-mt-1 ou-mx-[14px]">{methods.formState.errors.city?.message}</p>) : <></>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={8} className="!ou-mt-4 ou-pl-2" >
                                <FormControl fullWidth >
                                    <Autocomplete
                                        id="district"
                                        options={districts}
                                        getOptionLabel={(option) => option.name}
                                        filterOptions={filterOptions}
                                        isOptionEqualToValue={(option, value) => option.id === value.id}
                                       
                                        noOptionsText={t('noDistrictFound')}
                                        onChange={(event, value) => {
                                            
                                            methods.setValue("district",value.id)
                                            methods.clearErrors('district')
                                        }}
                                        renderInput={(params) => <TextField {...params} label={t('district')}
                                            error={methods.formState.errors.district ? true: false}
                                            name="district"
                                        />}
                                    />
                                    {methods.formState.errors ? (<p className="ou-text-xs ou-text-red-600 ou-mt-1 ou-mx-[14px]">{methods.formState.errors.district?.message}</p>) : <></>}
                                   
                                </FormControl>
                            </Grid>
                        {/* address */}
                        <Grid item xs={12} className="!ou-mt-4">
                        <FormControl fullWidth >
                            <Autocomplete
                                freeSolo
                                id="address"
                                options={listPlace ? listPlace : []}
                                getOptionLabel={(option) => option ? option.description : ""}
                                filterOptions={filterAddressOptions}
                                isOptionEqualToValue={(option, value) => option?.id === value?.id}
                                noOptionsText={"No Option"}
                                onInputChange={(event, value) => {
                                    setAddressInput(value)
                                }}

                                renderInput={(params) => <TextField {...params} label={t('address')}
                                    error={methods.formState.errors.address}
                                    name="address"

                                {...methods.register("address")}
                                />}
                            />
                            {methods.formState.errors ? (<p className="ou-text-xs ou-text-red-600 ou-mt-1 ou-mx-[14px]">{methods.formState.errors.address?.message}</p>) : <></>}
                                
                        </FormControl>
                            </Grid>
                        </Grid>

                        <Grid container justifyContent="flex" className="ou-my-3">
                            <Grid item xs={12}>
                                    <Box style={{ "margin": "5px" }} >
                                        <input accept="image/*" type="file" id="select-image" style={{ display: 'none' }}
                                            onChange={(e) => {
                                                setSelectedImage(e.target.files[0]);
                                            }}
                                        />
                      
                                        <label htmlFor="select-image">
                                            <Button variant="contained" color="primary" component="span">
                                                {t('uploadAvatar')}
                                            </Button>
                                        </label>
                        
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
                                        <Button variant="contained" color="success" type="submit" >{t('submit')}</Button>
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
                            {t('common:backToHomepage')}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container justifyContent="flex-end">
                    <Grid item sx={{ margin: "0 auto", mb: 2 }}>
                        <Link
                            to="/login/"
                            style={{ textDecoration: "inherit", color: "#1976d2" }}
                        >
                           {t('common:haveAnCount')}
                        </Link>
                    </Grid>
                </Grid>
            </div>

        </>
    )

}

export default Register