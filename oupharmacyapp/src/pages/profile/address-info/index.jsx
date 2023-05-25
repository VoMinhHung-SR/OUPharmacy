import { Autocomplete, Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography, createFilterOptions } from "@mui/material"
import UpdateProfile from "../../../modules/pages/ProfileComponents/UpdateProfile"
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import useUpdateProfile from "../../../modules/pages/ProfileComponents/hooks/useUpdateProfile";
import moment from "moment";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { useState } from "react";
import useUpdateLocation from "../../../modules/pages/ProfileComponents/hooks/useUpdateLocation";
import MapGL from "../../../modules/common/components/Mapbox";
import CustomModal from "../../../modules/common/components/Modal";
import useCustomModal from "../../../lib/hooks/useCustomModal";
import UpdateAddressInfo from "../../../modules/pages/ProfileComponents/UpdateAddressInfo";

const ProfileAddressInfo = () => {
    const { t, tReady } = useTranslation(['register', 'common', 'yup-validate']);
    const { locationData, user } = useUpdateLocation()

    const [viewport, setViewport] = useState({
        latitude: user.locationGeo.lat,
        longitude: user.locationGeo.lng,
        zoom: 16,
    }); 

    const { handleCloseModal, isOpen, handleOpenModal } = useCustomModal();


    return(
        <Box className=" ou-m-auto ou-rounded">
        <Helmet>
          <title>Address info</title>
        </Helmet>
        <Box  className="ou-m-auto ou-px-8 ou-py-4 ">
          <h2 className="ou-text-center ou-text-2xl ou-py-2 ou-pb-3 ou-uppercase ou-font-semibold">{t('addressInfo')}</h2>

            <Grid container justifyContent="flex">
                <Grid item xs={6} className={clsx('ou-pr-2 !ou-mt-4')} >
                    <FormControl fullWidth >
                        <TextField value={locationData.city?.name}></TextField>
                    </FormControl>
                </Grid>
                <Grid item xs={6} className="!ou-mt-4 ou-pl-2" >
                    <FormControl fullWidth >
                        <TextField value={locationData.district?.name}></TextField>   
                    </FormControl>
                </Grid>
            </Grid>
                <Grid item xs={12} className="!ou-mt-4">
                <FormControl fullWidth >
                    <TextField value={locationData.address}></TextField>   
                        
                </FormControl>
            </Grid>
            <Grid>
                <Grid item xs={12} className="!ou-my-4 !ou-mt-8">
                <Paper style={{height: '80%'}} className="ou-w-[75%] ou-m-auto">
                    <Box
                    component={Paper} elevation={5}
                            // max-[600px]:ou-w-[354px] max-[600px]:ou-m-auto 
                        className=" ou-rounded  ou-min-w-[300px] "
                    >
                        {/* <MapGL longitude={viewport.longitude} latitude={viewport.latitude} zoom={viewport.zoom}/> */}
                    </Box>
                        
                    </Paper>
                </Grid>
            </Grid>

            <Box sx={{ textAlign: 'right' }}>
                <Button className="!ou-min-w-[150px] !ou-mt-3" variant="contained" 
                color="success" onClick={handleOpenModal}>
                  {t('common:edit')}
                </Button>
              </Box>
            
            
        </Box>
            <CustomModal
            title="chinh sua thong tin"
            className="ou-w-[900px]"
            open={isOpen}
            onClose={handleCloseModal}
            content={<UpdateAddressInfo/>}
       
        />
      
      </Box>
    )
}

export default ProfileAddressInfo