import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { Helmet } from 'react-helmet';
import useRegister from '../../RegisterComponents/hooks/useRegister';
import { CURRENT_DATE } from '../../../../lib/constants';

const UpdateProfile = ({ email, firstName, lastName, dob, phoneNumber, gender }) => {
  const { t, tReady } = useTranslation(['register', 'common', 'yup-validate']);

  const {
    imageUrl,
    setImageUrl,
    openBackdrop,
    setDOB,
    isLoadingUserRole,
    registerSchema,
    selectedImage,
    setSelectedImage,
    userRoleID,
    setGender,
    onSubmit
  } = useRegister();

  const [initialGender, setInitialGender] = useState(gender);

  const formattedDOB = moment(dob).format('YYYY-MM-DD');

  const methods = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(registerSchema),
    defaultValues: {
      firstName: firstName ? firstName : '',
      lastName: lastName ? lastName : '',
      email: email ? email : '',
      dob: dob ? formattedDOB : '',
      phoneNumber: phoneNumber ? phoneNumber : ''
    }
  });

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  if (tReady && isLoadingUserRole)
    return (
      <Box sx={{ minHeight: '300px' }}>
        <Helmet>
          <title>Profile</title>
        </Helmet>
        <Box className="ou-p-5">
          <Loading></Loading>
        </Box>
      </Box>
    );

  return (
    <Box className=" ou-m-auto ou-rounded">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <form
        onSubmit={methods.handleSubmit((data) => {
          onSubmit(data, methods.setError, locationGeo);
        })}
        className="ou-m-auto ou-px-8 ou-py-4 "
      >
        <h1 className="ou-text-center ou-text-2xl ou-py-2 ou-uppercase ou-font-semibold">Chinh sua thong tin</h1>
        <Grid container justifyContent="flex" className="ou-mt-6">
          <Grid item xs={4} className="ou-pr-2">
            <TextField
              fullWidth
              autoComplete="given-name"
              autoFocus
              id="firstName"
              name="firstName"
              type="text"
              label={t('firstName')}
              error={methods.formState.errors.firstName}
              helperText={methods.formState.errors.firstName ? methods.formState.errors.firstName.message : ''}
              {...methods.register('firstName')}
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
              helperText={methods.formState.errors.lastName ? methods.formState.errors.lastName.message : ''}
              {...methods.register('lastName')}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              autoComplete="given-name"
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              label={t('phoneNumber')}
              error={methods.formState.errors.phoneNumber}
              helperText={methods.formState.errors.phoneNumber ? methods.formState.errors.phoneNumber.message : ''}
              {...methods.register('phoneNumber')}
            />
          </Grid>
        </Grid>

        <Grid container justifyContent="flex" className="ou-mt-4 ou-items-center">
          <Grid item xs={6} className="ou-pr-2">
            <TextField
              fullWidth
              autoComplete="given-name"
              id="email"
              name="email"
              type="text"
              label={t('email')}
              error={methods.formState.errors.email}
              {...methods.register('email')}
            />
            {methods.formState.errors ? (
              <p className="ou-text-xs ou-text-red-600 ou-mt-1 ou-mx-[14px]">{methods.formState.errors.email?.message}</p>
            ) : (
              <></>
            )}
          </Grid>
          <Grid item xs={6} className="ou-flex ou-flex-1 ou-w-full">
            <Box className="!ou-pr-2 ou-min-w-[70%]">
              <TextField
                id="date"
                className="!ou-w-full"
                label={t('dateOfBirth')}
                type="date"
                name="dob"
                error={methods.formState.errors.dob}
                onChange={(evt) => setDOB(evt.target.value)}
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true
                }}
                inputProps={{
                  max: moment(CURRENT_DATE).format('YYYY-MM-DD')
                }}
                {...methods.register('dob')}
              />
              {methods.formState.errors ? (
                <p className="ou-text-xs ou-text-red-600 ou-mt-1 ou-mx-[14px]">{methods.formState.errors.dob?.message}</p>
              ) : (
                <></>
              )}
            </Box>

            <FormControl className="!ou-min-w-[30%]">
              <InputLabel id="demo-simple-select-label">{t('gender')}</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              
                label={t('gender')}
                onChange={(evt) => setGender(evt.target.value)}
                defaultValue={gender}
              >
                <MenuItem value={0}>{t('male')}</MenuItem>
                <MenuItem value={1}>{t('female')}</MenuItem>
                <MenuItem value={2}>{t('secret')}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container justifyContent="flex" className="ou-my-3">
          <Grid item xs={12}>
            {userRoleID === -1 ? (
              <Box className="ou-p-5 ou-text-center">
                <div className="ou-text-red-700 ou-text-xl">{t('common:refresh')}</div>
                <div></div>
              </Box>
            ) : (
              <Box sx={{ textAlign: 'right' }}>
                <Button className="!ou-min-w-[150px]" variant="contained" color="success" type="submit">
                  {t('Update Infomation')}
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default UpdateProfile;