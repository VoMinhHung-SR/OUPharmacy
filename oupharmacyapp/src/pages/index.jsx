import { Box, Button, Tooltip } from "@mui/material"
import { useTranslation } from "react-i18next"
import { changeLanguage } from "../i18n"
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapGL, { Map, Marker, Popup } from "react-map-gl";
import { MAPGL_TOKEN } from "../lib/constants";
import { useState } from "react";
const Home = () => {
    const { t } = useTranslation()

    const [viewport, setViewport] = useState({
        latitude: 10.816800580111298,
        longitude: 106.67855666909755,
        width: "100vw",
        height: "100vh",
        zoom: 16,
    })

    const [selectedPlace, setSelectedPlace] = useState(false)

    return (
        <>
            <Box sx={{ minHeight: "600px" }}>
                <Map        
                    mapboxAccessToken={MAPGL_TOKEN}  
                    initialViewState={  
                        {
                            longitude:viewport.longitude,
                            latitude: viewport.latitude,
                            zoom: 16
                            }
                    }
                    style={{minWidth:600, minHeight:600}}
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                >
                        
                    <Marker latitude={viewport.latitude} longitude={viewport.longitude}>
                    </Marker>
                    {selectedPlace && (<Popup latitude={viewport.latitude} longitude={viewport.longitude} closeOnClick={()=> setSelectedPlace(false)}>
                        <div>
                            OUPharmacy
                        </div>
                    </Popup>)}
                </Map>
    
            </Box>
            {console.log(selectedPlace)}
            
        </>
    )
}
export default Home