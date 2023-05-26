import { Autocomplete, Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography, createFilterOptions } from "@mui/material"
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import moment from "moment";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import useUpdateLocation from "../../../modules/pages/ProfileComponents/hooks/useUpdateLocation";
import MapGL from "../../../modules/common/components/Mapbox";
import CustomModal from "../../../modules/common/components/Modal";
import useCustomModal from "../../../lib/hooks/useCustomModal";
import UpdateAddressInfo from "../../../modules/pages/ProfileComponents/UpdateAddressInfo";
import AddressInfo from "../../../modules/pages/ProfileComponents/AddressInfo";
import { userContext } from "../../../App";
import UserContext from "../../../lib/context/UserContext";

const ProfileAddressInfo = () => {
    const { t, tReady } = useTranslation(['register', 'common', 'yup-validate']);
   
    // const [user] = useContext(userContext)
    const {user} = useContext(UserContext);

    const { handleCloseModal, isOpen, handleOpenModal} = useCustomModal();

    return(
        <Box className=" ou-m-auto ou-rounded">
        <Helmet>
          <title>Address info</title>
        </Helmet>
        <Box  className="ou-m-auto ou-px-8 ou-py-4 ">
          <h2 className="ou-text-center ou-text-2xl ou-py-2 ou-pb-3 ou-uppercase ou-font-semibold">{t('addressInfo')}</h2>

            <AddressInfo locationData={user.locationGeo}/>

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
            content={
                <UpdateAddressInfo 
                callBackSuccess={() => {
                    handleCloseModal();
                }
                }/>
            }
       
        />
      
      </Box>
    )
}

export default ProfileAddressInfo