import { useState } from "react";
import ReactMapGL from '@goongmaps/goong-map-react';
import { GOONGMAP_MAPTOKEN } from "../../../../lib/constants";
// import { Map, Marker } from "react-map-gl"
// import { MAPGL_TOKEN } from "../../../../lib/constants"

const MapGL = (props) => {
    const [viewport, setViewport] = useState({
        width: 400,
        height: 400,
        latitude: 10.793500150986223,
        longitude: 106.67777364026149,
        zoom: 16
      });
    
      return (
        <ReactMapGL
          {...viewport}
          goongApiAccessToken={GOONGMAP_MAPTOKEN}
          onViewportChange={nextViewport => setViewport(nextViewport)}
        />
      );
}

export default MapGL