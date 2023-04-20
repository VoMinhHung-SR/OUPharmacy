import { TextField, FormControl, InputLabel, Select, MenuItem, Button }  from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { REGEX_EMAIL, REGEX_NOTE } from '../../../../lib/constants';
import { useTranslation } from 'react-i18next';

const ExaminationFilter = (props) => {
    const {t} = useTranslation(['yup-validate'])

    const examinationFilterSchema = Yup.object().shape({
        kw:  Yup.string().trim().notRequired().matches(REGEX_NOTE, t('yup')),
    })

    const methods = useForm({
        mode:"onSubmit", 
        resolver: yupResolver(examinationFilterSchema),
        defaultValues:{
            id: 0,
            mailStatus:0,
            createdDate:0,
            kw: '',
        }
    })
    return (
    <>
        <form onSubmit={methods.handleSubmit((data) => props.onSubmit(data))} className='ou-flex ou-items-center ou-mt-5 ou-mb-3'>
            <FormControl className='!ou-min-w-[100px] !ou-mr-3'>
                <InputLabel id="exam_filter_id">Id</InputLabel>
                    <Select
                        id="demo-simple-select"
                        name="id"
                        label="id"
                        defaultValue={0}
                        {...methods.register("id")} 
                    >
                        <MenuItem value={0}>All</MenuItem>
                        <MenuItem value={-1}>Descending</MenuItem>
                        <MenuItem value={1}>Ascending</MenuItem>
                    </Select>
            </FormControl>
            <FormControl className='!ou-min-w-[100px] !ou-mr-3'>
                <InputLabel id="exam_filter_email">Mail status</InputLabel>
                    <Select

                        id="exam_filter_email_label"      
                        name="mailStatus"
                        label="Mail status"
                        defaultValue={0}
                        {...methods.register("mailStatus")} 
                    >
                        <MenuItem value={0}>All</MenuItem>
                        <MenuItem value={-1}>True</MenuItem>
                        <MenuItem value={1}>False</MenuItem>
                    </Select>
            </FormControl>


            <FormControl className='!ou-min-w-[100px] !ou-mr-3'>
            <InputLabel id="exam_filter_createdDate">Created date</InputLabel>
                <Select

                    id="exam_filter_created_date_label"      
                    name="createdDate"
                    label="Created date"
                    defaultValue={0}
                    {...methods.register("createdDate")} 
                >
                        <MenuItem value={0}>All</MenuItem>
                        <MenuItem value={-1}>Descending</MenuItem>
                    <MenuItem value={1}>Ascending</MenuItem>
                </Select>
            </FormControl>
            <FormControl  className=' !ou-mr-3'>
                <TextField
                    placeholder='Default is all'
                    variant="outlined"
                    label="user email (no quired)"
                    {...methods.register("kw")} 
                />

            </FormControl>
                
            <Button variant="contained" 
                color="success" 
                type="submit" 

                size='small'
                // className='!ou-h-full'
                style={{"padding": "6px 40px"}}
                >
                    Search
                {/* {t('submit')} */}
            </Button>
        </form>
        
    </>

    )

}

export default ExaminationFilter