import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { debounce } from "lodash";
import { Input } from "../input";


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
  type: string;
  place_type: string[];
  place_name: string;
  [key: string]: any; // Allow additional properties
}

interface Data {
  features: Feature[];
}

interface MapboxComponentProps {
  onPlaceSelected: (coordinates: Coordinates, placeName: string) => void;
  initialLat?: number;
  initialLng?: number;
  initialAddress?: string;
  height?: string | number;
}

const MapboxComponent: React.FC<MapboxComponentProps> = ({
  onPlaceSelected,
  initialLat,
  initialLng,
  initialAddress,
  height = "350px",
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const geolocateControlRef = useRef<mapboxgl.GeolocateControl | null>(null);
  const [searchText, setSearchText] = useState<string>(initialAddress || "");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [coordinates, setCoordinates] = useState<Coordinates>(
    initialLat && initialLng
      ? { lat: initialLat, lon: initialLng }
      : { lat: 43.45, lon: -80.49 }
  );

  useEffect(() => {
    if (initialLat && initialLng) {
      setCoordinates({ lat: initialLat, lon: initialLng });
    }
    if (initialAddress) {
      setSearchText(initialAddress);
    }
  }, [initialLat, initialLng, initialAddress]);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

    if (mapContainerRef.current === null) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [coordinates.lon, coordinates.lat],
      zoom: 15,
    });

    const marker = new mapboxgl.Marker()
      .setLngLat([coordinates.lon, coordinates.lat])
      .addTo(map);

    markerRef.current = marker;
    mapRef.current = map;

    map.on("click", async (e) => {
      e.preventDefault();
      const { lng, lat } = e.lngLat;
      if (markerRef.current) {
        markerRef.current.setLngLat([lng, lat]);
        setCoordinates({ lat, lon: lng });
        setSearchText(`${lat}, ${lng}`);

        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`;
        const response = await fetch(url);
        const data = await response.json();
        const filteredFeatures = data.features.filter(
          (feature: Feature) => !feature.place_type.includes("poi")
        );

        if (data.features && data.features.length > 0) {
          const placeName = filteredFeatures[0].place_name;
          setSearchText(placeName);
          onPlaceSelected({ lat, lon: lng }, placeName);
        }
      }
    });

    const geolocateControl = new mapboxgl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true,
      showUserHeading: true,
    });

    map.addControl(geolocateControl);

    geolocateControl.on("geolocate", async (e) => {
      
      const { longitude, latitude } = e.coords;
      if (markerRef.current) {
        markerRef.current.setLngLat([longitude, latitude]);
        setCoordinates({ lat: latitude, lon: longitude });
        setSearchText(`${latitude}, ${longitude}`);

        if (mapRef.current) {
          mapRef.current.flyTo({
            center: [longitude, latitude],
            zoom: 15,
            speed: 1.2,
          });
        }

        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`;
        const response = await fetch(url);
        const data = await response.json();
        const filteredFeatures = data.features.filter(
          (feature: Feature) => !feature.place_type.includes("poi")
        );

        if (data.features && data.features.length > 0) {
          const placeName = filteredFeatures[0].place_name;
          setSearchText(placeName);
          onPlaceSelected({ lat: latitude, lon: longitude }, placeName);
        }
      }
    });

    return () => {
      map.remove();
    };
  }, []);

  const debouncedFetchSuggestions = debounce(async (value: string) => {
    if (value.trim().length < 3) return;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      value
    )}.json?autocomplete=true&access_token=${mapboxgl.accessToken}`;
    const response = await fetch(url);
    const data = await response.json();
    setSuggestions(data.features || []);
  }, 300);

  const handleChange = (value: string) => {
    setSearchText(value);
    debouncedFetchSuggestions(value);
  };

  const selectSuggestion = (suggestion: Suggestion) => {
    const [lon, lat] = suggestion.center;
    if (mapRef.current) {
      mapRef.current.flyTo({ center: [lon, lat], zoom: 15 });
      markerRef.current?.setLngLat([lon, lat]);
    }
    setSearchText(suggestion.place_name);
    setCoordinates({ lat, lon });
    onPlaceSelected({ lat, lon }, suggestion.place_name);
    setSuggestions([]);
  };

  return (
    <div>
      <div className="relative">
        <Input
          type="text"
          value={searchText}
          onChange={(e) =>  handleChange(e.target.value)}
          placeholder="Search for places"
          className="my-2 p-1 w-[calc(100%)] relative"
        />
        {suggestions.length > 0 && (
          <ul className="bg-white dark:bg-slate-500 absolute z-20 top-10 left-0 right-0 overflow-y-auto h-40">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                onClick={(e) => {e.preventDefault(); selectSuggestion(suggestion)}}
                className="cursor-pointer p-1 border-b-2"
              >
                {suggestion.place_name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div
        ref={mapContainerRef}
        style={{ height, width: "100%" }}
        className="map-container"
      />
    </div>
  );
};

export default MapboxComponent;
