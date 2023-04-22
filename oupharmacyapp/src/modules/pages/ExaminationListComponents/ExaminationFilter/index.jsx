import { TextField, FormControl, InputLabel, Select, MenuItem, Button }  from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { REGEX_EMAIL, REGEX_NOTE } from '../../../../lib/constants';
import { useTranslation } from 'react-i18next';

const ExaminationFilter = (props) => {
    const {t} = useTranslation(['yup-validate', 'examinations'])

 

    const methods = useForm({
        mode:"onSubmit", 
 
        defaultValues:{
   
            mailStatus: props.mailStatus ? props.mailStatus : 0,
            createdDate: props.createdDate ? props.createdDate : 0,
            kw: props.kw ? props.kw : '',
        }
    })
    return (
    <>
        <form onSubmit={methods.handleSubmit((data) => props.onSubmit(data))} className='ou-flex ou-items-center ou-mt-5 ou-mb-3'>
            <FormControl className='!ou-min-w-[100px] !ou-mr-3'>
                <InputLabel id="exam_filter_email">{t('examinations:mailStatus')}</InputLabel>
                    <Select

                        id="exam_filter_email_label"      
                        name="mailStatus"
                        label={('examinations:mailStatus')}
                        defaultValue={props.mailStatus ? props.mailStatus : 0}
                        {...methods.register("mailStatus")} 
                    >
                        <MenuItem value={0}>{t('examinations:all')}</MenuItem>
                        <MenuItem value={1}>{t('examinations:sent')}</MenuItem>
                        <MenuItem value={-1}>{t('examinations:noSent')}</MenuItem>
                    </Select>
            </FormControl>


            <FormControl className='!ou-min-w-[100px] !ou-mr-3'>
            <InputLabel id="exam_filter_createdDate">{t('examinations:createdDate')}</InputLabel>
                <Select

                    id="exam_filter_created_date_label"      
                    name="createdDate"
                    label={('examinations:createdDate')}
                    defaultValue={props.createdDate ? props.createdDate : 0}
                    {...methods.register("createdDate")} 
                >
                        <MenuItem value={0}>{t('examinations:descending')}</MenuItem>
                    <MenuItem value={1}>{t('examinations:ascending')}</MenuItem>
                </Select>
            </FormControl>
            <FormControl  className=' !ou-mr-3'>
                <TextField
                    required={false}
                    variant="outlined"
                    label={t('examinations:filterUserLabel')}
                    {...methods.register("kw")} 
                />

            </FormControl>
                
            <Button variant="contained" 
                color="success" 
                type="submit" 

                size='small'
                style={{"padding": "6px 40px"}}
                >
                   {t('examinations:search')}
                {/* {t('submit')} */}
            </Button>
        </form>
        
    </>

    )

}

export default ExaminationFilter