import { Autocomplete, Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography, createFilterOptions } from "@mui/material"
import UpdateProfile from "../../../modules/pages/ProfileComponents/UpdateProfile"
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import useUpdateProfile from "../../../modules/pages/ProfileComponents/hooks/useUpdateProfile";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { CURRENT_DATE } from "../../../lib/constants";
import useAddressInfo from "../../../modules/pages/RegisterComponents/hooks/useAddressInfo";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { useContext } from "react";
import { userContext } from "../../../App";
import useUpdateLocation from "../../../modules/pages/ProfileComponents/hooks/useUpdateLocation";

const ProfileAddressInfo = ({ userID ,email, firstName, lastName, dob, phoneNumber, gender }) => {
    const { t, tReady } = useTranslation(['register', 'common', 'yup-validate']);
    const { locationData, user } = useUpdateLocation()

  
  const formattedDOB = moment(new Date()).format('YYYY-MM-DD');
    const methods = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(),
        defaultValues: {
            location:{
                address: "",
                city: locationData.city?.id ? locationData.city.id : -1 ,
                district: locationData.district?.id ? locationData.district.id : -1
            }
          }
      })

    const isFormDirty = methods.formState.isDirty;


    const {districts, setAddressInput, setCityId, handleGetPlaceByID, handleSetLocation,
        listPlace, setSelectedOption, locationGeo} = useAddressInfo()
    const { allConfig } = useSelector((state) => state.config);

     // Filter Options for address
    const filterAddressOptions = createFilterOptions({
        matchFrom: 'start',
        stringify: (option) => option ? option.description : "",
    })


    // Filter Options for city and wards
    const filterOptions = createFilterOptions({
        matchFrom: 'start',
        stringify: (option) => option.name,
    });

    return(
        <Box className=" ou-m-auto ou-rounded">
        <Helmet>
          <title>OUPharmacy | Address info</title>
        </Helmet>
        <form
        //   onSubmit={methods.handleSubmit((data) => {
        //     onSubmit(data, methods.setError, userID, () => methods.reset());
        //   })}
          className="ou-m-auto ou-px-8 ou-py-4 "
        >
          
          <h2 className="ou-text-center ou-text-2xl ou-py-2 ou-pb-3 ou-uppercase ou-font-semibold">{t('addressInfo')}</h2>
            <Grid container justifyContent="flex">
                <Grid item xs={6} className={clsx('ou-pr-2 !ou-mt-4')} >
                    <FormControl fullWidth >
                        <Autocomplete
                            id="city"
                            options={allConfig.cityOptions}
                            getOptionLabel={(option) => option.name}
                            filterOptions={filterOptions}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            noOptionsText={t('noCityFound')}
                            getOptionSelected={(option) => option.id === locationData.city?.id}
                            onChange={(event, value) => {
                                methods.setValue('location.district', ' ')
                                setCityId(value.id)
                                methods.setValue("location.city", value.id)
                                methods.clearErrors('location.city')
                            }}
                            renderInput={(params) => <TextField {...params} label={t('city')} 

                                error={methods.formState.errors.location?.city}
                                name="location.city"
                                />}
                        />
                            {methods.formState.errors ? (<p className="ou-text-xs ou-text-red-600 ou-mt-1 ou-mx-[14px]">{methods.formState.errors.location?.city?.message}</p>) : <></>}
                    </FormControl>
                </Grid>
                <Grid item xs={6} className="!ou-mt-4 ou-pl-2" >
                    <FormControl fullWidth >
                        <Autocomplete
                            id="district"
                            options={districts}
                            getOptionLabel={(option) => option.name}
                            filterOptions={filterOptions}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            
                            noOptionsText={t('noDistrictFound')}
                            onChange={(event, value) => {
                                
                                methods.setValue("location.district",value.id)
                                methods.clearErrors('location.district')
                            }}
                            renderInput={(params) => <TextField {...params} 
                                label={t('district')}
                                error={methods.formState.errors.location?.district}
                                name="location.district"
                            />}
                        />
                        {methods.formState.errors ? (<p className="ou-text-xs ou-text-red-600 ou-mt-1 ou-mx-[14px]">{methods.formState.errors.location?.district?.message}</p>) : <></>}
                        
                    </FormControl>
                </Grid>
            </Grid>
             <Grid item xs={12} className="!ou-mt-4">
                <FormControl fullWidth >
                <Autocomplete
                    freeSolo
                    id="location.address"
                    options={listPlace ? listPlace : []}
                    getOptionLabel={(option) => option ? option.description : ""}
                    filterOptions={filterAddressOptions}
                    isOptionEqualToValue={(option, value) => option?.id === value?.id}
                    noOptionsText={"No Option"}
                    onInputChange={(event, value) => {
                        setAddressInput(value);
                        setSelectedOption(null); // reset selected option when user types a new value
                    }}
                    onChange={(event, value) => {
                        if (value) {
                            handleGetPlaceByID(value.place_id)
                            setSelectedOption(value);
                        } else {
                            setSelectedOption(null);
                            handleSetLocation();
                        }
                    }}
                    getOptionSelected={(option, value) => option?.id === value?.id}
                    renderInput={(params) => (
                        <>
                            <TextField
                            {...params}
                            label={t('address')}
                            error={methods.formState.errors.location?.address}
                            name="location.address"
                            {...methods.register('location.address')}
                            />                 
                        </>
                        )}
                    />

                    {methods.formState.errors ? (<p className="ou-text-xs ou-text-red-600 ou-mt-1 ou-mx-[14px]">{methods.formState.errors.location?.address?.message}</p>) : <></>}
                        
                </FormControl>
            </Grid>
        
                       
        </form>
      </Box>
    )
}

export default ProfileAddressInfo