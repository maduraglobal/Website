"use client";

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with Next.js/Webpack
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// A small dictionary of city coordinates for common destinations
const CITY_COORDS: Record<string, [number, number]> = {
  // Japan
  'Tokyo': [35.6762, 139.6503],
  'Osaka': [34.6937, 135.5023],
  'Kyoto': [35.0116, 135.7681],
  'Nara': [34.6851, 135.8048],
  'Mt. Fuji': [35.3606, 138.7274],
  'Fuji': [35.3606, 138.7274],
  // Vietnam & SE Asia
  'Hanoi': [21.0285, 105.8542],
  'Halong': [20.9101, 107.1839],
  'Hoi An': [15.8801, 108.3380],
  'Da Nang': [16.0544, 108.2022],
  'Ho Chi Minh': [10.8231, 106.6297],
  'Saigon': [10.8231, 106.6297],
  'Bangkok': [13.7563, 100.5018],
  'Phuket': [7.8804, 98.3923],
  'Bali': [-8.4095, 115.1889],
  'Singapore': [1.3521, 103.8198],
  'Kuala Lumpur': [3.1390, 101.6869],
  // Europe & Others
  'London': [51.5074, -0.1278],
  'Paris': [48.8566, 2.3522],
  'Rome': [41.9028, 12.4964],
  'Swiss': [46.8182, 8.2275],
  'Lucerne': [47.0502, 8.3093],
  'Dubai': [25.2048, 55.2708],
  'Abu Dhabi': [24.4539, 54.3773],
  'Copenhagen': [55.6761, 12.5683],
};

function ChangeView({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

interface MapComponentProps {
  itinerary?: any[];
}

export default function MapComponent({ itinerary }: MapComponentProps) {
  // Extract unique cities from itinerary and map to coordinates
  const markers = (itinerary || [])
    .map(item => {
      // Try to find city name in title or description
      const cityName = Object.keys(CITY_COORDS).find(city =>
        item.title?.includes(city) || item.description?.includes(city)
      );
      return cityName ? { name: cityName, coords: CITY_COORDS[cityName] } : null;
    })
    .filter((m): m is { name: string, coords: [number, number] } => m !== null);

  // If no markers found, use default (Copenhagen)
  const center: [number, number] = markers.length > 0 ? markers[0].coords : [55.6761, 12.5683];
  const zoom = markers.length > 1 ? 5 : 8;

  const polylineCoords = markers.map(m => m.coords);

  return (
    <div className="h-full w-full">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker, idx) => (
          <Marker key={idx} position={marker.coords} icon={icon}>
            <Popup>
              <div className="font-bold">{marker.name}</div>
            </Popup>
          </Marker>
        ))}
        {polylineCoords.length > 1 && (
          <Polyline
            positions={polylineCoords}
            color="#191974"
            weight={3}
            opacity={0.6}
            dashArray="10, 10"
          />
        )}
        <ChangeView center={center} zoom={zoom} />
      </MapContainer>
    </div>
  );
}
