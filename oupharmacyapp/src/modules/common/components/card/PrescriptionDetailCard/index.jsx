import { yupResolver } from "@hookform/resolvers/yup"
import { Autocomplete, Box, Button, createFilterOptions, FormControl, Grid, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { prescrtionDetailSchema } from "./hooks/usePrescriptionDetailCard"
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import usePrescriptionDetailCard from "./hooks/usePrescriptionDetailCard";
import BackdropLoading from "../../BackdropLoading";

const PrescriptionDetailCard = () => {
    const {onSubmit, medicinesSubmit, openBackdrop, handleAddPrescriptionDetail,
        medicineUnits, setMedicine, handleDeleteItem} = usePrescriptionDetailCard()
    const methods = useForm({
        mode:"onSubmit",
        resolver: yupResolver(prescrtionDetailSchema),
        default: {
            uses: "",
            quantity:""
        }
    })
    // const options = top100Films.map((option) => {
    //     const firstLetter = option.title[0].toUpperCase();
    //     return {
    //       firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
    //       ...option,
    //     };
    // });
    const filterOptions = createFilterOptions({
        matchFrom: 'start',
        stringify: (option) => option.medicine.name,
    });
    return (
        <>
            {openBackdrop ?
                (<BackdropLoading/>)
                : <></>
            }
            <Box className='ou-mx-4 ou-my-10'>
                <form 
                    className="ou-m-auto"
                    onSubmit={methods.handleSubmit((data)=> onSubmit(data,methods.reset()))}
                >
                    <Grid 
                        container justifyContent="flex" alignItems="center" spacing={3}>

                        <Grid item xs={4.5} >
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
                                        // console.log(value.id)
                                        setMedicine({
                                            "medicineName": value.medicine.name,
                                            "medicineUnitId": value.id
                                        })
                                        // console.log(medicine)
                                    }}

                                    renderInput={(params) => <TextField {...params} label="Tên thuốc (*)" />}
                                />
                                {/* <Autocomplete
                                id="grouped-demo"
                                options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                                groupBy={(option) => option.firstLetter}
                                getOptionLabel={(option) => option.title}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="With categories" />}
                              /> */}
                            </FormControl>
                        </Grid>

                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                autoComplete="given-name"
                                label="Liều dùng"
                                variant="outlined"
                                id="uses"
                                name="uses"
                                type="text"
                                error={methods.formState.errors.uses}
                                helperText={methods.formState.errors.uses ? methods.formState.errors.uses.message : ""}
                                {...methods.register("uses")}
                            />
                        </Grid>
                        <Grid item xs={2.5}>
                            <TextField
                                fullWidth
                                autoComplete="given-name"
                                label="Số lượng"
                                variant="outlined"
                                id="quantity"
                                name="quantity"
                                type="number"
                                error={methods.formState.errors.quantity}
                                helperText={methods.formState.errors.quantity ? methods.formState.errors.quantity.message : ""}
                                {...methods.register("quantity")}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Grid item >
                                <Typography
                                    variant="subtitle1"
                                    gutterBottom
                                    style={{ textDecoration: "inherit" }}
                                    className=""
                                >
                                    <Button variant="contained" color="success" type="submit">
                                        Thêm thuốc</Button>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>

                <form
                    className="ou-my-4"
                    style={{ "padding": "20px 20px", "border": "1.5px solid black", "borderRadius": "5px" }}>
                    <h1 className="ou-text-center ou-text-xl ou-pb-4">Phiếu kê toa</h1>

                    {medicinesSubmit.length === 0 ?
                        (<>
                            <Typography className="ou-text-center m-3">HIện tại chưa có thuốc</Typography>
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
                                                label="Tên thuốc"
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
                                            label="Liều dùng"
                                            variant="outlined"
                                            id="uses"
                                            name="uses"
                                            type="text"
                                            value={item.uses}
                                            InputProps={{
                                                readOnly: true,
                                            }}

                                            handleAddPrescriptionDetail
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField
                                            fullWidth
                                            autoComplete="given-name"
                                            label="Số lượng"
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
                                        onClick={handleAddPrescriptionDetail} 
                                    >
                                        Kê toa
                                    </Button>
                                </Typography>
                            </Grid>
                        </Grid>)}
                </form>
            </Box>

        </>
    )
}
export default PrescriptionDetailCard