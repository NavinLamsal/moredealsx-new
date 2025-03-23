'use client'
import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface Coordinates {
  lat: number;
  lon: number;
}

interface Route {
  distance: number;
  duration: number;
  geometry: mapboxgl.GeoJSONSourceSpecification;
  legs: any[];
  weight: number;
}

const MapboxNavigationComponent = ({
  lat,
  lng,
  height = "350px",
}: {
  lat: string;
  lng: string;
  height?: string;

  
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const geolocateControlRef = useRef<mapboxgl.GeolocateControl | null>(null);
  const [coordinates, setCoordinates] = useState<Coordinates>({
    lat: parseFloat(lat),
    lon: parseFloat(lng),
  });
  const [routes, setRoutes] = useState<Route[]>(
    []
  );
  const [routesIndex, setRoutesIndex] = useState(0);
  const [start, setStart] = useState<number[] | null>(null);
  const [distance, setDistance]=useState<string>("")
  const [duration, setDuration] = useState<string>("")

  const getRoute = async (start: number[], end: number[]) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?alternatives=true&annotations=distance%2Cduration&geometries=geojson&language=en&overview=full&steps=true&access_token=${mapboxgl.accessToken}`,
        { method: "GET" }
      );
      const data = await response.json();
      setRoutes(data.routes);
      const route = data.routes[0];
      return route;
    } catch (error) {
      console.error("Error requesting route:", error);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setStart([position.coords.longitude, position.coords.latitude]);
      },
      (error) => {
        console.error("Error getting current location:", error);
      }
    );
  }, []);

  useEffect(() => {
    mapboxgl.accessToken = process.env
      .NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

    // Ensure mapContainerRef.current is not null before initializing the map
    if (mapContainerRef.current === null) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current, // Now guaranteed not to be null
      style: "mapbox://styles/mapbox/streets-v12",
      center: [coordinates.lon, coordinates.lat],
      zoom: 15,
    });

    const marker = new mapboxgl.Marker()
      .setLngLat([coordinates.lon, coordinates.lat])
      .addTo(map);

    markerRef.current = marker;
    mapRef.current = map;

    const end = [coordinates.lon, coordinates.lat];
    if (start) {
      getRoute(start, end).then((route) => {
        
        if (route) {
          const geojson: GeoJSON.Feature<GeoJSON.LineString> = {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: route.geometry.coordinates,
            },
            properties: {}, // Add an empty properties object
          };

          const geojsonData: GeoJSON.FeatureCollection = {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [start[0], start[1]],
                },
                properties: {
                  title: "Start",
                  description: "Starting point",
                },
              },
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [end[0], end[1]],
                },
                properties: {
                  title: "End",
                  description: "Ending point",
                },
              },
            ],
          };

          // Add the source to the map
          map.addSource("route-source", {
            type: "geojson",
            data: geojson,
          });

          map.addSource("points", {
            type: "geojson",
            data: geojsonData,
          });

          map.addLayer({
            id: "start-dot",
            type: "circle",
            source: "points",
            filter: ["==", "title", "Start"],
            paint: {
              "circle-color": "#90b9",
              "circle-radius": 6,
            },
          });

          // Add a red dot at the end of the route
          map.addLayer({
            id: "end-dot",
            type: "circle",
            source: "points",
            filter: ["==", "title", "End"],
            paint: {
              "circle-color": "red",
              "circle-radius": 6,
            },
          });

          // Add the layer to the map
          map.addLayer({
            id: "route",
            type: "line",
            source: "route-source",
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#3887be",
              "line-width": 5,
              "line-opacity": 0.75,
            },
          });
        }
      });
    }

    return () => {
      map.remove();
    };
  }, [start]);
  
  useEffect(() => {
    if (routes && routes.length>0) {
      setDistance(formatDistance(routes[0].distance))
      setDuration(formatDuration(routes[0].duration))
    }
  },[routes])

  function formatDistance(distanceValue:number) {
    let distanceUnit = "M";
    let distanceFormatted;

    if (distanceValue >= 1000) {
      distanceFormatted = (distanceValue / 1000).toFixed(2);
      distanceUnit = "KM";
    } else {
      distanceFormatted = distanceValue.toFixed(0);
    }

    return `${distanceFormatted} ${distanceUnit}`;
  }

  function formatDuration(durationValue:number) {
    let durationUnit = "sec";
    let durationFormatted;

    if (durationValue >= 3600) {
      durationFormatted = (durationValue / 3600).toFixed(2);
      durationUnit = "hrs";
    } else if (durationValue >= 60) {
      durationFormatted = (durationValue / 60).toFixed(2);
      durationUnit = "min";
    } else {
      durationFormatted = durationValue.toFixed(0);
    }

    return `${durationFormatted.replace(".",":")} ${durationUnit}`;
  }

  // const distance = formatDistance(routes[0].distance);
  // const duration = formatDuration(routes[0].duration);
  return (
    <div className="relative">
      <div
        ref={mapContainerRef}
        style={{ height: `${height}`, width: "100%" }}
        className="map-container"
      />
      <div className="bg-slate-600 text-white absolute top-0 p-2">
        <p>
          <span className="text-dark-P_text">Distance</span> {distance}
        </p>
        <p>
          <span className="text-dark-P_text">Duration</span> {duration}
        </p>
      </div>
    </div>
  );
};

export default MapboxNavigationComponent;
