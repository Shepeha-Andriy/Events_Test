'use client'

import React, { useEffect, useRef, useState } from "react";
import { Input } from '@mui/material'
import { MAP_KEY } from '@/config/envVars'

let autoComplete;

const loadScript = (url, callback) => {
  let script: any = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

const SearchLocationInput = ({ setSelectedLocation }) => {
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  const handleScriptLoad = (updateQuery, autoCompleteRef) => {
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      {
        // types: ["(cities)"],
        // componentRestrictions: { country: "UKR" },
      }
    );

    autoComplete.addListener("place_changed", () => {
        console.log(updateQuery)
      handlePlaceSelect(updateQuery);
    });
  };

  const handlePlaceSelect = async (updateQuery) => {
    const addressObject = await autoComplete.getPlace();

    const query = addressObject.formatted_address;
    updateQuery(query);

    const latLng = {
      lat: addressObject?.geometry?.location?.lat(),
      lng: addressObject?.geometry?.location?.lng(),
    };

    setSelectedLocation(latLng);
  };

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${MAP_KEY}=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, []);

  return (
    <div className="search-location-input">
      <input
        style={{ width: '400px', padding: '8px', border: '1px black solid', borderRadius: 8 }}
        ref={autoCompleteRef}
        className="form-control"
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search Places ..."
        value={query}
      />
    </div>
  );
};

export default SearchLocationInput;

