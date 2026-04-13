import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('./MapComponent'), { 
  ssr: false,
  loading: () => <div className="h-full w-full bg-gray-50 animate-pulse flex items-center justify-center text-gray-400">Loading Map...</div>
});

interface TourMapProps {
  tourTitle?: string;
  onPreview?: () => void;
  fullsize?: boolean;
  itinerary?: any[];
  cities?: string[];
}

export default function TourMap({ fullsize, itinerary, cities }: TourMapProps) {
  return (
    <div className={`relative w-full overflow-hidden bg-gray-100 border border-gray-200 ${fullsize ? 'h-full' : 'rounded-[32px] h-full shadow-inner'}`}>
      <MapComponent itinerary={itinerary} cities={cities} />

    </div>
  );
}
