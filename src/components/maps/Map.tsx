'use client'

import { GoogleMap, useLoadScript, Marker, MarkerF } from "@react-google-maps/api";
import { Loader } from '@googlemaps/js-api-loader';
import SearchLocationInput from './Search'
import { useEffect, useState, useRef, useCallback } from "react"
import { MAP_KEY } from '@/config/envVars'

type Props = {
    selectedLocation: { lat: number, lng: number }, 
    setSelectedLocation: React.Dispatch<React.SetStateAction<any>>,
    height?: string,
    width?: string,
    showSearch?: boolean
}

export default function GMap({selectedLocation, setSelectedLocation, height = '400px', width = '400px', showSearch = true }: Props) {
    console.log(MAP_KEY)

    const { isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: MAP_KEY,
    });
    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
      mapRef.current = map;
    }, []);
    if (loadError) return "Error";
    if (!isLoaded) return "Maps";

    return (
       <div>
            {showSearch && <SearchLocationInput setSelectedLocation={setSelectedLocation} />}
            <div style={{ marginTop: "20px", width: '100%' }}>
            <GoogleMap
                mapContainerStyle={{
                height,
                width
                }}
                center={selectedLocation}
                zoom={13}
                onLoad={onMapLoad}
            >
                <MarkerF
                position={selectedLocation}
                icon={"http://maps.google.com/mapfiles/ms/icons/red-dot.png"}
                />
            </GoogleMap>
        </div>
       </div>
    )
}