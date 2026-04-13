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

const startIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const endIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
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

function ChangeView({ markers }: { markers: any[] }) {
  const map = useMap();

  useEffect(() => {
    if (!map || markers.length === 0) return;

    let initialFlyTimeout: NodeJS.Timeout;
    let routeAnimationTimeouts: NodeJS.Timeout[] = [];

    try {
      const bounds = L.latLngBounds(markers.map(m => m.coords));
      if (bounds.isValid()) {
        // Initial overview
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 8, animate: true, duration: 1.5 });

        // Start animation sequence after 2s
        initialFlyTimeout = setTimeout(() => {
          if (markers.length > 0) {
            // Source
            map.flyTo(markers[0].coords, 6, { animate: true, duration: 2 });

            // Destinations
            let currentIdx = 1;
            const animateNext = () => {
              if (currentIdx < markers.length) {
                const timer = setTimeout(() => {
                  map.flyTo(markers[currentIdx].coords, 6, { animate: true, duration: 2.5 });
                  currentIdx++;
                  animateNext();
                }, 3000); // wait 3s at current location
                routeAnimationTimeouts.push(timer);
              } else if (markers.length > 1) {
                // Finally zoom back out
                const timer = setTimeout(() => {
                  map.fitBounds(bounds, { padding: [50, 50], maxZoom: 8, animate: true, duration: 2 });
                }, 4000);
                routeAnimationTimeouts.push(timer);
              }
            };

            animateNext();
          }
        }, 2000);
      }
    } catch (err) {
      console.warn("Map bounds error:", err);
    }

    return () => {
      clearTimeout(initialFlyTimeout);
      routeAnimationTimeouts.forEach(clearTimeout);
    };
  }, [markers, map]);

  return null;
}

interface MapComponentProps {
  itinerary?: any[];
}

export default function MapComponent({ itinerary }: MapComponentProps) {
  // Extract unique cities from itinerary and map to coordinates
  const markers = React.useMemo(() => {
    const list = (itinerary || [])
      .map(item => {
        // Try to find city name in title or description (Case Insensitive)
        const content = `${item.title || ''} ${item.description || ''}`.toLowerCase();
        const cityName = Object.keys(CITY_COORDS).find(city =>
          content.includes(city.toLowerCase())
        );
        return cityName ? { name: cityName, coords: CITY_COORDS[cityName] } : null;
      })
      .filter((m): m is { name: string, coords: [number, number] } => m !== null);

    // Keep only unique destinations (avoid hitting the exact same lat/lng back to back)
    const unique: typeof list = [];
    list.forEach(m => {
      if (!unique.length || unique[unique.length - 1].name !== m.name) {
        unique.push(m);
      }
    });
    return unique;
  }, [itinerary]);

  // Default fallback center (India) if no markers
  const defaultCenter: [number, number] = [20.5937, 78.9629];
  const polylineCoords = markers.map(m => m.coords);

  return (
    <div className="h-full w-full">
      <MapContainer
        center={defaultCenter}
        zoom={5}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {markers.map((marker, idx) => (
          <Marker key={idx} position={marker.coords} icon={idx === 0 ? startIcon : idx === markers.length - 1 ? endIcon : icon}>
            <Popup>
              <div className="p-1">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Destination</div>
                <div className="text-[14px] font-bold text-[#191974]">{marker.name}</div>
              </div>
            </Popup>
          </Marker>
        ))}
        {polylineCoords.length > 1 && (
          <>
            {/* Base Red Line (Destination Path) */}
            <Polyline
              positions={polylineCoords}
              pathOptions={{
                color: "#ee2229",
                weight: 4,
                opacity: 0.8,
                lineCap: "round",
                lineJoin: "round",
              }}
            />
            {/* Yellow Moving Line (Moving Stage) */}
            <Polyline
              positions={polylineCoords}
              pathOptions={{
                color: "#ffc107",
                weight: 4,
                opacity: 0.9,
                dashArray: "10, 20",
                lineCap: "round",
                lineJoin: "round",
                className: "animate-route-flow"
              }}
            />
          </>
        )}
        <ChangeView markers={markers} />
      </MapContainer>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes route-flow {
          from { stroke-dashoffset: 60; }
          to { stroke-dashoffset: 0; }
        }
        .animate-route-flow {
          animation: route-flow 1.5s linear infinite;
          stroke-dasharray: 15 25;
          filter: drop-shadow(0 0 4px rgba(255, 193, 7, 0.8));
        }
      `}} />
    </div>
  );
}
