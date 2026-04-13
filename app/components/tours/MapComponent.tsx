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

const CITY_COORDS: Record<string, [number, number]> = {
  // Japan
  'Tokyo': [35.6762, 139.6503], 'Osaka': [34.6937, 135.5023], 'Kyoto': [35.0116, 135.7681],
  'Nara': [34.6851, 135.8048], 'Mt. Fuji': [35.3606, 138.7274], 'Fuji': [35.3606, 138.7274],
  'Hiroshima': [34.3853, 132.4553], 'Sapporo': [43.0618, 141.3545],
  // Vietnam & SE Asia
  'Hanoi': [21.0285, 105.8542], 'Halong': [20.9101, 107.1839], 'Halong Bay': [20.9101, 107.1839],
  'Hoi An': [15.8801, 108.3380], 'Da Nang': [16.0544, 108.2022], 'Ho Chi Minh': [10.8231, 106.6297],
  'Saigon': [10.8231, 106.6297], 'Bangkok': [13.7563, 100.5018], 'Phuket': [7.8804, 98.3923],
  'Bali': [-8.4095, 115.1889], 'Singapore': [1.3521, 103.8198], 'Kuala Lumpur': [3.1390, 101.6869],
  'Pattaya': [12.9236, 100.8825], 'Chiang Mai': [18.7883, 98.9853],
  // Europe
  'London': [51.5074, -0.1278], 'Paris': [48.8566, 2.3522], 'Rome': [41.9028, 12.4964],
  'Swiss': [46.8182, 8.2275], 'Lucerne': [47.0502, 8.3093], 'Zurich': [47.3769, 8.5417],
  'Geneva': [46.2044, 6.1432], 'Interlaken': [46.6863, 7.8632], 'Amsterdam': [52.3676, 4.9041],
  'Berlin': [52.5200, 13.4050], 'Munich': [48.1351, 11.5820], 'Vienna': [48.2082, 16.3738],
  'Prague': [50.0755, 14.4378], 'Budapest': [47.4979, 19.0402], 'Venice': [45.4408, 12.3155],
  'Florence': [43.7696, 11.2558], 'Milan': [45.4642, 9.1900], 'Barcelona': [41.3851, 2.1734],
  'Madrid': [40.4168, -3.7038], 'Athens': [37.9838, 23.7275],
  // Scandinavia
  'Copenhagen': [55.6761, 12.5683], 'Oslo': [59.9139, 10.7522], 'Stockholm': [59.3293, 18.0686],
  'Helsinki': [60.1695, 24.9354], 'Bergen': [60.3913, 5.3221], 'Tromso': [69.6492, 18.9553],
  'Reykjavik': [64.1466, -21.9426], 'Gothenburg': [57.7089, 11.9746],
  // Middle East & Africa
  'Dubai': [25.2048, 55.2708], 'Abu Dhabi': [24.4539, 54.3773], 'Doha': [25.2854, 51.5310],
  'Cairo': [30.0444, 31.2357], 'Cape Town': [-33.9249, 18.4241],
  // Americas
  'New York': [40.7128, -74.0060], 'Los Angeles': [34.0522, -118.2437], 'Las Vegas': [36.1699, -115.1398],
  'Toronto': [43.6510, -79.3470], 'Vancouver': [49.2827, -123.1207], 'Rio de Janeiro': [-22.9068, -43.1729],
  // Australia & NZ
  'Sydney': [-33.8688, 151.2093], 'Melbourne': [-37.8136, 144.9631], 'Gold Coast': [-28.0167, 153.4000],
  'Auckland': [-36.8485, 174.7633], 'Queenstown': [-45.0312, 168.6626],
  // India
  'Mumbai': [19.0760, 72.8777], 'Delhi': [28.7041, 77.1025], 'Chennai': [13.0827, 80.2707],
  'Bangalore': [12.9716, 77.5946], 'Kochi': [9.9312, 76.2673], 'Jaipur': [26.9124, 75.7873],
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
  cities?: string[];
}

function MovingArrow({ coords }: { coords: [number, number][] }) {
  const [position, setPosition] = React.useState<{ latLng: [number, number], bearing: number } | null>(null);

  React.useEffect(() => {
    if (!coords || coords.length < 2) return;

    let totalDist = 0;
    const segments: any[] = [];
    for (let i = 0; i < coords.length - 1; i++) {
       const [lat1, lon1] = coords[i];
       const [lat2, lon2] = coords[i+1];
       const dist = Math.sqrt(Math.pow(lat2-lat1, 2) + Math.pow(lon2-lon1, 2));
       
       const toRad = (deg: number) => deg * Math.PI / 180;
       const toDeg = (rad: number) => rad * 180 / Math.PI;
       const dLon = toRad(lon2 - lon1);
       const y = Math.sin(dLon) * Math.cos(toRad(lat2));
       const x = Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) - Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(dLon);
       const bearing = (toDeg(Math.atan2(y, x)) + 360) % 360;

       segments.push({ lat1, lon1, lat2, lon2, dist, bearing });
       totalDist += dist;
    }

    if (totalDist === 0) return;

    let animationFrameId: number;
    const DURATION = Math.max(4000, segments.length * 1200); // Dynamic duration based on segments
    let startTime = performance.now();

    const animate = (time: number) => {
       const elapsed = (time - startTime) % DURATION;
       const progress = elapsed / DURATION;
       const targetDist = progress * totalDist;

       let accumulated = 0;
       for (let i = 0; i < segments.length; i++) {
         const seg = segments[i];
         if (accumulated + seg.dist >= targetDist || i === segments.length - 1) {
            const segProgress = seg.dist === 0 ? 1 : (targetDist - accumulated) / seg.dist;
            const currentLat = seg.lat1 + (seg.lat2 - seg.lat1) * segProgress;
            const currentLon = seg.lon1 + (seg.lon2 - seg.lon1) * segProgress;
            setPosition({ latLng: [currentLat, currentLon], bearing: seg.bearing });
            break;
         }
         accumulated += seg.dist;
       }

       animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [coords]);

  if (!position) return null;

  const arrowSvg = `
    <div style="transform: rotate(${position.bearing}deg); width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
      <svg viewBox="0 0 24 24" width="32" height="32" fill="#FFD700" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.6));">
        <path d="M12 2L20 20L12 16L4 20L12 2Z" stroke="#ee2229" stroke-width="1.5" stroke-linejoin="round"/>
      </svg>
    </div>
  `;
  const icon = L.divIcon({
    html: arrowSvg,
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });

  return <Marker position={position.latLng} icon={icon} interactive={false} />;
}

export default function MapComponent({ itinerary, cities }: MapComponentProps) {
  // Extract unique cities from explicit cities array, fallback to itinerary parsing
  const markers = React.useMemo(() => {
    let list: { name: string, coords: [number, number] }[] = [];

    // Approach 1: Try using explicitly passed 'cities'
    if (cities && cities.length > 0) {
      list = cities.map((c: string) => {
        const cleanName = c.replace(/[^a-zA-Z\s]/g, '').trim().toLowerCase();
        // Look up by exact matching the key in lowercase
        const matchKey = Object.keys(CITY_COORDS).find(key => key.toLowerCase() === cleanName);
        if (matchKey) {
          return { name: matchKey, coords: CITY_COORDS[matchKey] };
        }
        return null;
      }).filter((m): m is { name: string; coords: [number, number] } => m !== null);
    }

    // Approach 2: Fallback to reading the itinerary if cities is missing or yielded nothing
    if (list.length === 0 && itinerary && itinerary.length > 0) {
      list = itinerary.map((item: any) => {
          const content = `${item.title || ''} ${item.description || ''}`.toLowerCase();
          const cityKeys = Object.keys(CITY_COORDS).sort((a, b) => b.length - a.length);
          const cityName = cityKeys.find(city => {
            const regex = new RegExp(`\\b${city.toLowerCase()}\\b`);
            return regex.test(content);
          });
          return cityName ? { name: cityName, coords: CITY_COORDS[cityName] } : null;
        }).filter((m: any): m is { name: string, coords: [number, number] } => m !== null);
    }
      
    // Strip consecutive duplicates to avoid 0-length visual route bugs
    const unique: typeof list = [];
    list.forEach((m) => {
      if (!unique.length || unique[unique.length - 1].name !== m.name) {
        unique.push(m);
      }
    });

    return unique;
  }, [itinerary, cities]);

  const defaultCenter: [number, number] = [20.5937, 78.9629];
  const polylineCoords = markers.map((m: any) => m.coords);

  return (
    <div className="h-full w-full relative">
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
        
        {/* Render Route Polylines */}
        {polylineCoords.length > 1 && (
          <Polyline
            positions={polylineCoords}
            pathOptions={{
              color: "#ee2229",
              weight: 4,
              opacity: 1,
              lineCap: "round",
              lineJoin: "round",
            }}
          />
        )}

        {/* Dynamic Moving Arrow Marker */}
        {polylineCoords.length > 1 && (
           <MovingArrow coords={polylineCoords} />
        )}

        {/* Render Destination Markers */}
        {markers.map((marker: any, idx: number) => (
          <Marker key={idx} position={marker.coords} icon={idx === 0 ? startIcon : idx === markers.length - 1 ? endIcon : icon}>
            <Popup>
              <div className="p-1">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Destination</div>
                <div className="text-[14px] font-bold text-[#191974]">{marker.name}</div>
              </div>
            </Popup>
          </Marker>
        ))}
        
        <ChangeView markers={markers} />
      </MapContainer>
    </div>
  );
}
