"use client";
import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapboxLocation = ({
  lat,
  lng,
  height = "350px",
}: {
  lat: number;
  lng: number;
  height?: string;
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

    if (!mapContainerRef.current) return;

    // Initialize Map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: 14,
    });

    // Add Marker
    new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);

    // Save map reference
    mapRef.current = map;

    return () => map.remove(); // Cleanup on unmount
  }, [lat, lng]);

  return <div ref={mapContainerRef} style={{ height, width: "100%" }} className="rounded-lg shadow-md" />;
};

export default MapboxLocation;
