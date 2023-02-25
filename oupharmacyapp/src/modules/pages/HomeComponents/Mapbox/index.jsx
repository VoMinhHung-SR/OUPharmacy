import { Map, Marker } from "react-map-gl"
import { MAPGL_TOKEN } from "../../../../lib/constants"

const MapGL = (props) => {
    return(
        <Map        
            mapboxAccessToken={MAPGL_TOKEN}  
            initialViewState={  
                {
                    longitude:props.longitude,
                    latitude: props.latitude,
                    zoom: props.zoom
                    
                }
            }
            
            style={{minWidth:350, minHeight:600}}
            mapStyle="mapbox://styles/mapbox/streets-v11"
        >
                
            <Marker latitude={props.latitude} longitude={props.longitude}>
            </Marker>
       
    </Map>
    )
}

export default MapGL