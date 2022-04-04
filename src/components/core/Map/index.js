import { GoogleMap, Marker } from "./GoogleMap"
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import * as React from "react";
import { click } from "@testing-library/user-event/dist/click";

const render = (status) => {
  return <h1>{status}</h1>;
};

const MapView = ({ enableClick = 0, locations, centerLocation, markerChange }) => {
  const [clicks, setClicks] = React.useState(locations || []);
  const [zoom, setZoom] = React.useState(7); // initial zoom
  const [center, setCenter] = React.useState(centerLocation || {
    lat: 0,
    lng: 0,
  });

  React.useEffect(() => {
    setClicks(locations || [])
  }, [locations])

  React.useEffect(() => {
    setCenter(centerLocation || {
      lat: 0,
      lng: 0,
    })
  }, [centerLocation])

  const onClick = (e) => {
    // avoid directly mutating state
    if (clicks.length <= enableClick){
      setClicks([...clicks, e.latLng]);
      markerChange([...clicks, e.latLng])
    }
      
  };

  const onClickMarker = (e) => {
    setClicks(clicks.filter(click=>click!==e.latLng))
  };



  const onIdle = (m) => {
    setZoom(m.getZoom());
    setCenter(m.getCenter().toJSON());
  };

  return (
    <div style={{ display: "flex", height: "100%", minHeight: "300px" }}>
      <Wrapper apiKey="" render={render}>
        <GoogleMap
          center={center}
          onClick={onClick}
          onIdle={onIdle}
          zoom={zoom}
          style={{ flexGrow: "1", height: "100%" }}
        >
          {clicks.map((latLng, i) => (
            <Marker key={i} position={latLng} onClickMarker={onClickMarker} />
          ))}
        </GoogleMap>
      </Wrapper>
      {/* Basic form for controlling center and zoom of map. */}

    </div>
  )
}

export default MapView