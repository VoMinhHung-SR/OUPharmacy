import { yupResolver } from "@hookform/resolvers/yup"
import { Autocomplete, Box, Button, createFilterOptions, FormControl, Grid, Paper, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import usePrescriptionDetailCard from "./hooks/usePrescriptionDetailCard";
import BackdropLoading from "../../BackdropLoading";
import { useTranslation } from "react-i18next";
import Loading from "../../Loading";

const PrescriptionDetailCard = ({examID, recipientID}) => {


    const {onSubmit, medicinesSubmit, openBackdrop, handleAddPrescriptionDetail,
        medicineUnits, setMedicine, handleDeleteItem, prescriptionDetailSchema} = usePrescriptionDetailCard()

    const {t, ready} = useTranslation(['prescription-detail', 'yup-validate', 'modal'])

    const methods = useForm({
        mode:"onSubmit",
        resolver: yupResolver(prescriptionDetailSchema),
        default: {
            uses: "",
            quantity:""
        }
    })
    const filterOptions = createFilterOptions({
        matchFrom: 'start',
        stringify: (option) => option.medicine.name,
    });
    //TODO: add skeletons here
    if(!ready)
        return <Box sx={{ height: "300px" }}>
        <Box className='ou-p-5'>
            <Loading/>
        </Box>
    </Box>

    return (
        <>
            {openBackdrop ?
                (<BackdropLoading/>)
                : <></>
            }
            <Box className='ou-my-10 ou-py-8 ou-px-6'  component={Paper} elevation={5} >
                <form 
                    className="ou-m-auto"
                    onSubmit={methods.handleSubmit((data)=> onSubmit(data,methods.reset()))}
                >
                    <Grid 
                        container justifyContent="flex" alignItems="center"  >

                        <Grid item xs={4} className="ou-pr-2">
                            <FormControl fullWidth >
                                <Autocomplete
                                    id="medicineName"
                                    // List Of medicine Units
                                    options={medicineUnits}
                                    getOptionLabel={(option) => option.medicine.name}
                                    filterOptions={filterOptions}
                                    // getOptionSelected={(option) => option.medicine.name}
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                    name="medicineName"

                                    onChange={(event, value) => {
                                        setMedicine({
                                            "medicineName": value.medicine.name,
                                            "medicineUnitId": value.id
                                        })
                                    }}

                                    renderInput={(params) => <TextField {...params} label={t('medicineName') + "*"} />}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={3} className="ou-px-2">
                            <TextField
                                fullWidth
                                autoComplete="given-name"
                                label={t('uses')+'*'}
                                variant="outlined"
                                id="uses"
                                name="uses"
                                type="text"
                                error={methods.formState.errors.uses}
                                helperText={methods.formState.errors.uses ? methods.formState.errors.uses.message : ""}
                                {...methods.register("uses")}
                            />
                        </Grid>
                        <Grid item xs={3} className="ou-px-2">
                            <TextField
                                fullWidth
                                autoComplete="given-name"
                                label={t('quantity')+'*'}
                                variant="outlined"
                                id="quantity"
                                name="quantity"
                                type="text"
                                error={methods.formState.errors.quantity}
                                helperText={methods.formState.errors.quantity ? methods.formState.errors.quantity.message : ""}
                                {...methods.register("quantity")}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Grid item  className="ou-flex !ou-items-center">
                                <Typography
                            
                                    variant="subtitle1"
                                    gutterBottom
                                    style={{ textDecoration: "inherit" }}
                                    className="ou-w-[100%] ou-block"
                                >
                                    <Button variant="contained" color="success" type="submit"  className="!ou-py-3 !ou-px-8 !ou-w-full">
                                        {t('addMedicine')}</Button>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
                
                <Box component={Paper} >
                <form
                    className="ou-my-4"
                    style={{ "padding": "20px 20px", "border": "1.5px solid gray", "borderRadius":"8px" }}>
                    <h1 className="ou-text-center ou-text-xl ou-pb-4">{t('prescriptionDetail')}</h1>

                    {medicinesSubmit.length === 0 ?
                        (<>
                            <Typography className="ou-text-center m-3">{t('nullMedicine')}</Typography>
                        </>)
                        : medicinesSubmit.map((item) => (
                            <>
                                <Grid id={item.id} key={item.id}
                                    container justifyContent="flex" style={{ "margin": "0 auto" }} spacing={3}>

                                    <Grid item xs={4.5} >
                                        <FormControl fullWidth >
                                            <TextField
                                                fullWidth
                                                autoComplete="given-name"
                                                autoFocus
                                                label={t('medicineName')}
                                                variant="outlined"
                                                id="medicineName"
                                                name="medicineName"
                                                value={item.medicineName}
                                                type="text"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />

                                        </FormControl>
                                    </Grid>
                                
                                    <Grid item xs={3}>

                                        <TextField
                                            fullWidth
                                            autoComplete="given-name"
                                            label={t('uses')}
                                            variant="outlined"
                                            id="uses"
                                            name="uses"
                                            type="text"
                                            value={item.uses}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField
                                            fullWidth
                                            autoComplete="given-name"
                                            label={t('quantity')}
                                            variant="outlined"
                                            id="quantity"
                                            name="quantity"
                                            type="number"
                                            value={item.quantity}
                                            InputProps={{
                                                readOnly: true,
                                            }}

                                        />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Button
                                            onClick={() => {
                                                handleDeleteItem(item.id)
                                            }}
                                            className="ou-text-red-700"
                                            sx={{ color:"red", width: '100%', height: '100%' }}>
                                            <RemoveCircleIcon />
                                        </Button>
                                    </Grid>
                                </Grid>

                            </>
                        ))}
                    {medicinesSubmit.length === 0 ? <></>
                        : (<Grid container className="p-3">
                            <Grid item sx={{ margin: "10px auto" }}>
                                <Typography
                                    variant="subtitle1"
                                    gutterBottom
                                    style={{ textDecoration: "inherit" }}
                                    color="grey.700"
                                >
                                    <Button className="!ou-mt-5 ou-w-[120px]" variant="contained" color="success"
                                        onClick={() =>handleAddPrescriptionDetail(examID, recipientID)} 
                                    >
                                        {t('prescribing')}
                                    </Button>
                                </Typography>
                            </Grid>
                        </Grid>)}
                </form>

                </Box>
               
            </Box>

        </>
    )
}
export default PrescriptionDetailCard