import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer } from "react-leaflet";

function Map() {
  return (
    <MapContainer center={[ -4.322222,39.575001]} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}

export default Map;
