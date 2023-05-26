import { Box, FormControl, Grid, Paper, TextField } from "@mui/material"
import { useContext, useState } from "react";
import clsx from "clsx";
import { userContext } from "../../../../App";
import UserContext from "../../../../lib/context/UserContext";

const AddressInfo = () => {
    // const [user] = useContext(userContext)
    const {user} = useContext(UserContext);
    const [viewport, setViewport] = useState({
        latitude: user.locationGeo.lat,
        longitude: user.locationGeo.lng,
        zoom: 16,
    }); 
    console.log("address info !!@ ", user)
    return (
        <>
        
        <Grid container justifyContent="flex">
                <Grid item xs={6} className={clsx('ou-pr-2 !ou-mt-4')} >
                    <FormControl fullWidth >
                        <TextField value={user.locationGeo.city.name}></TextField>
                    </FormControl>
                </Grid>
                <Grid item xs={6} className="!ou-mt-4 ou-pl-2" >
                    <FormControl fullWidth >
                        <TextField value={user.locationGeo.district.name}></TextField>   
                    </FormControl>
                </Grid>
            </Grid>
                <Grid item xs={12} className="!ou-mt-4">
                <FormControl fullWidth >
                    <TextField value={user.locationGeo.address}></TextField>   
                        
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

        </>
    )
}
export default AddressInfo