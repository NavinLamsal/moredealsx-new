// import React, { useState, useEffect, useRef } from "react";
// import mapboxgl, { GeolocateControl } from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import { debounce } from "lodash";

// interface Coordinates {
//   lat: number;
//   lon: number;
// }

// interface Suggestion {
//   id: string;
//   place_name: string;
//   center: [number, number];
// }


// interface Feature {
//   id: string;
//   type: string;
//   place_type: string[];
//   place_name: string;
//   [key: string]: any; // Additional properties can be handled with an index signature
// }

// interface Data {
//   features: Feature[];
// }

// const UserLocationSetMap = ({ setNewAddress , setChoosefield }: { setNewAddress?: any , setChoosefield?: any }) => {
//   const mapContainerRef = useRef<HTMLDivElement>(null);
//   const mapRef = useRef<mapboxgl.Map | null>(null);
//   const markerRef = useRef<mapboxgl.Marker | null>(null);
//   const geolocateControlRef = useRef<mapboxgl.GeolocateControl | null>(null);
//   const [searchText, setSearchText] = useState<string>(
//     localStorage.getItem("location") || ""
//   );
//   const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
//   const [coordinates, setCoordinates] = useState<Coordinates>({
//     lat: parseFloat(localStorage.getItem("latitude") ?? "51.505"),
//     lon: parseFloat(localStorage.getItem("longitude") ?? "-0.09"),
//   });

//   useEffect(() => {
//     mapboxgl.accessToken = process.env
//       .NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

//     // Ensure mapContainerRef.current is not null before initializing the map
//     if (mapContainerRef.current === null) return;

//     const map = new mapboxgl.Map({
//       container: mapContainerRef.current, // Now guaranteed not to be null
//       style: "mapbox://styles/mapbox/streets-v12",
//       center: [coordinates.lon, coordinates.lat],
//       zoom: 15,
//     });

//     const marker = new mapboxgl.Marker({
//       color:'#f00',
//     })
//       .setLngLat([coordinates.lon, coordinates.lat])
//       .addTo(map);

//     markerRef.current = marker;
//     mapRef.current = map;

//     // Add click listener to update the marker position and save to local storage
//     map.on("click", async (e) => {
//       const { lng, lat } = e.lngLat;
//       if (markerRef.current) {
//         markerRef.current.setLngLat([lng, lat]);
//         setCoordinates({ lat, lon: lng });
//         setSearchText(`${lat}, ${lng}`);
//         localStorage.setItem("latitude", lat.toString());
//         localStorage.setItem("longitude", lng.toString());

//         const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`;
//         const response = await fetch(url);
//         const data = await response.json();
//         // const filteredFeatures = data.features.filter(
//         //   (feature: Feature) => !feature.place_type.includes("poi")
//         // );

//         // if (data.features && data.features.length > 0) {
//         //   const placeName = filteredFeatures[0].place_name;
//         //   setSearchText(placeName);
//         //   localStorage.setItem("location", placeName);
//         //   setNewAddress(placeName);
//         // }
//         if (data.features && data.features.length > 0) {
//             const place = data.features.find((feature: Feature) =>
//               feature.place_type.includes("place")
//             ); // City Name
//             const country = data.features.find((feature: Feature) =>
//               feature.place_type.includes("country")
//             ); // Country Name
      
//             const cityName = place ? place.text : "";
//             const countryName = country ? country.text : "";
//             const fullAddress = data.features[0].place_name;
      
//             setSearchText(fullAddress);
//             setNewAddress({
//               fullAddress,
//               city: cityName,
//               country: countryName,
//             });
      
//             localStorage.setItem("location", fullAddress);
//             localStorage.setItem("city", cityName);
//             localStorage.setItem("country", countryName);
//           }
        
//       }
//     });

//     // Add geolocator 
//    const geolocateControl = new mapboxgl.GeolocateControl({
//       positionOptions: {
//         enableHighAccuracy: true,
//       },
//       trackUserLocation: true,
//       showUserHeading: true,
//     });

//     map.addControl(geolocateControl);

//       geolocateControl._onSuccess = async(e) => {
//         const { longitude, latitude } = e.coords;
//         if (markerRef.current) {
//           markerRef.current.setLngLat([longitude, latitude]);
//           setCoordinates({ lat: latitude, lon: longitude });
//           setSearchText(`${latitude}, ${latitude}`);
//           localStorage.setItem("latitude", latitude.toString());
//           localStorage.setItem("longitude", longitude.toString());
  
//           if (mapRef.current) {
//             mapRef.current.flyTo({
//               center: [longitude, latitude],
//               zoom: 15,
//               speed: 1.2, 
//             });
//           }
  
//           const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`;
//           const response = await fetch(url);
//           const data = await response.json();
//         //   const filteredFeatures = data.features.filter(
//         //     (feature: Feature) => !feature.place_type.includes("poi")
//         //   );
  
//         //   if (data.features && data.features.length > 0) {
//         //     const placeName = filteredFeatures[0].place_name;
//         //     setSearchText(placeName);
//         //     localStorage.setItem("location", placeName);
//         //     setNewAddress(placeName);
//         //   }

//           if (data.features && data.features.length > 0) {
//             const place = data.features.find((feature: Feature) =>
//               feature.place_type.includes("place")
//             ); // City Name
//             const country = data.features.find((feature: Feature) =>
//               feature.place_type.includes("country")
//             ); // Country Name
      
//             const cityName = place ? place.text : "";
//             const countryName = country ? country.text : "";
//             const fullAddress = data.features[0].place_name;
      
//             setSearchText(fullAddress);
//             setNewAddress({
//               fullAddress,
//               city: cityName,
//               country: countryName,
//             });
      
//             localStorage.setItem("location", fullAddress);
//             localStorage.setItem("city", cityName);
//             localStorage.setItem("country", countryName);
//           }
//         }
//         geolocateControl._geolocateButton?.click();
//     };
    
      
  


    

//     return () => {
//       map.remove();
//     };
//   }, []); // Empty dependency array ensures this runs only once after the initial render

//   // Debounce function setup outside of the useEffect
//   const debouncedFetchSuggestions = debounce(async (value: string) => {
//     if (value.trim().length < 3) return;
//     const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
//       value
//     )}.json?autocomplete=true&access_token=${mapboxgl.accessToken}`;
//     const response = await fetch(url);
//     const data = await response.json();
//     setSuggestions(data.features || []);
//   }, 300);

//   const handleChange = (value: string) => {
//     setSearchText(value);
//     debouncedFetchSuggestions(value);
//   };

//   const selectSuggestion = (suggestion: Suggestion) => {
//     const [lon, lat] = suggestion.center;
//     if (mapRef.current) {
//       mapRef.current.flyTo({ center: [lon, lat], zoom: 15 });
//       markerRef.current?.setLngLat([lon, lat]);
//     }
//     setSearchText(suggestion.place_name);
//     localStorage.setItem("latitude", lat.toString());
//     localStorage.setItem("longitude", lon.toString());
//     localStorage.setItem("location", suggestion.place_name);
//     setNewAddress(suggestion.place_name);
//     setSuggestions([]);
//   };

//   return (
//     <div>
//       <div className="relative">
//         <input
//           type="text"
//           value={searchText}
//           onChange={(e) => handleChange(e.target.value)}
//           placeholder="Search for places"
//           className="my-2 p-1 w-[calc(100%)] "
//         />
//         <div className="relative ">
//           {suggestions.length > 0 && (
//             <ul
//               style={{ listStyleType: "none", padding: 0 }}
//               className="bg-white dark:bg-slate-500 absolute z-20 top-0 left-0 right-0 overflow-y-auto h-40"
//             >
//               {suggestions.map((suggestion) => (
//                 <li
//                   key={suggestion.id}
//                   onClick={() => selectSuggestion(suggestion)}
//                   className="cursor-pointer p-1 border-b-2 border-light-primary dark:border-dark-primary"
//                   style={{ cursor: "pointer", padding: "5px" }}
//                 >
//                   {suggestion.place_name}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//       <div
//         ref={mapContainerRef}
//         style={{ height: "350px", width: "100%" }}
//         className="map-container"
//       />
//     </div>
//   );
// };

// export default UserLocationSetMap;


import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { debounce } from "lodash";
import { AlertOctagonIcon } from "lucide-react";

interface Coordinates {
  lat: number;
  lon: number;
}

interface Suggestion {
  id: string;
  place_name: string;
  center: [number, number];
}

interface Feature {
  id: string;
  place_type: string[];
  text: string;
  place_name: string;
}

const UserLocationSetMap = ({ setNewAddress , setChoosefield }: { setNewAddress?: any , setChoosefield?: any }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const [searchText, setSearchText] = useState(localStorage.getItem("location") || "");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [coordinates, setCoordinates] = useState<Coordinates>({
    lat: parseFloat(localStorage.getItem("latitude") ?? "51.505"),
    lon: parseFloat(localStorage.getItem("longitude") ?? "-0.09"),
  });
  const [error , setError] = useState("");

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [coordinates.lon, coordinates.lat],
      zoom: 15,
    });

    const marker = new mapboxgl.Marker({ color: "#f00" })
      .setLngLat([coordinates.lon, coordinates.lat])
      .addTo(map);
    markerRef.current = marker;
    mapRef.current = map;

    map.on("click", (e) => handleMapClick(e.lngLat.lng, e.lngLat.lat));

    const geolocateControl = new mapboxgl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true,
      showUserHeading: true,
    });
    map.addControl(geolocateControl);

    geolocateControl.on("geolocate", (e) =>
      handleMapClick(e.coords.longitude, e.coords.latitude)
    );

    return () => map.remove();
  }, []);


    const selectSuggestion = (suggestion: Suggestion) => {
    const [lon, lat] = suggestion.center;
    if (mapRef.current) {
      mapRef.current.flyTo({ center: [lon, lat], zoom: 15 });
      markerRef.current?.setLngLat([lon, lat]);
    }
    // setSearchText(suggestion.place_name);
    // setNewAddress(suggestion.place_name);
    setSuggestions([]);
    handleMapClick(lon, lat);
  };

  const handleMapClick = async (lon: number, lat: number) => {
    setError("");
    if (markerRef.current) markerRef.current.setLngLat([lon, lat]);
    setCoordinates({ lat, lon });
    localStorage.setItem("latitude", lat.toString());
    localStorage.setItem("longitude", lon.toString());
    
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?access_token=${mapboxgl.accessToken}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.features.length > 0) {
      const cityFeature = data.features.find((feature: Feature) => feature.place_type.includes("place"));
      const countryFeature = data.features.find((feature: Feature) => feature.place_type.includes("country"));
      
      const cityName = cityFeature ? cityFeature.text : "";
      const countryName = countryFeature ? countryFeature.text : "";
      const fullAddress = data.features[0].place_name;
      
      setSearchText(fullAddress);
      setNewAddress?.({ fullAddress, city: cityName, country: countryName });

      localStorage.setItem("location", fullAddress);
      localStorage.setItem("city", cityName);
      localStorage.setItem("country", countryName);
      
      const validationUrl = `http://192.168.1.155:8000/api/moredealsx/country/validate/?country_name=${encodeURIComponent(
        countryName
      )}&city_name=${encodeURIComponent(cityName)}`;
  
      const validationResponse = await fetch(validationUrl,{
        method:"GET"
      });
      const validationData = await validationResponse.json();
  
      if (!validationData.success) {
        setError("Service is not available in your region or city.");
        setChoosefield(true);
        localStorage.removeItem("location");
        localStorage.removeItem("city")
        localStorage.removeItem("country");
        localStorage.removeItem("latitude");
        localStorage.removeItem("longitude");
      }else{
        setChoosefield(false);
      }
    }
  };

  const debouncedFetchSuggestions = debounce(async (query: string) => {
    if (query.length < 3) return;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?autocomplete=true&access_token=${mapboxgl.accessToken}`;
    const response = await fetch(url);
    const data = await response.json();
    setSuggestions(data.features || []);
  }, 300);

  return (
    <div>
       <>
       {error && <p className="flex items-center justify-center w-full text-center text-sm text-red-600 p-2 mb-2 bg-red-200 md:col-span-2 lg:col-span-3">
        <AlertOctagonIcon className="mr-2 h-4 w-4" />&nbsp;{error}&nbsp;<AlertOctagonIcon className="ml-2 h-4 w-4 " />
      </p>}
       </>
      <div className="relative">  
        <input
          type="text"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            debouncedFetchSuggestions(e.target.value);
          }}
          placeholder="Search for places"
          className="my-2 p-1 w-full"
        />
        <div className="relative">

        {suggestions.length > 0 && (
          <ul className="bg-white dark:bg-slate-500 absolute z-20 top-0 left-0 right-0 overflow-y-auto h-40">
            {suggestions.map((s) => (
              <li
                key={s.id}
                onClick={() =>selectSuggestion(s)}
                className="cursor-pointer p-1 border-b-2 border-light-primary dark:border-dark-primary"
              >
                {s.place_name}
              </li>
            ))}
          </ul>
        )}
        </div>
      </div>
      <div ref={mapContainerRef} style={{ height: "350px", width: "100%" }} className="map-container" />
    </div>
  );
};

export default UserLocationSetMap;
