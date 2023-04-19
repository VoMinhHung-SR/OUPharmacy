import { TextField, FormControl, InputLabel, Select, MenuItem, Button }  from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const ExaminationFilter = () => {
    const [searchValue, setSearchValue] = useState('');
    const [filterValue, setFilterValue] = useState('');

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
      };
      
    const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
    };
    const idOptions = [
        { value: 'all', label: 'All' },
        { value: 'asc', label: 'Ascending' },
        { value: 'desc', label: 'Descending' },
    ];
    const filterOptions = [
        { value: 'all', label: 'All' },
        { value: 'asc', label: 'Ascending' },
        { value: 'desc', label: 'Descending' },
    ];
    const mailStatus = [
        { value: -1, label: "All"},
        { value: 1, label: 'True' },
        { value: 0, label: 'False' }
    ];
    const methods = useForm({
        mode:"onSubmit", 
        resolver: yupResolver(),
        defaultValues:{
            id: "all",
            mailStatus:-1,
            createdDate:"all",
            value: "all",
        }
    })
    return (
    <>
        <form onSubmit={methods.handleSubmit}>
            <FormControl className='!ou-min-w-[100px]'>
                <InputLabel>id</InputLabel>
                <Select
                    value={filterValue}
                    label="Id"
                >
                    {idOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl className='!ou-min-w-[100px]'>
                <InputLabel>Mail status</InputLabel>
                <Select
                    value={mailStatus}
                    label="Mail status"
                >
                    {mailStatus.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
                <TextField
                variant="outlined"
                label="Search"
                value={searchValue}
                onChange={handleSearchChange}
                
            />
            <Button variant="contained" 
                color="success" 
                type="submit" 
                className='!ou-h-full'
                style={{"padding": "6px 40px"}}
                >
                    submit
                {/* {t('submit')} */}
            </Button>
        </form>
        
    </>

    )

}

export default ExaminationFilter