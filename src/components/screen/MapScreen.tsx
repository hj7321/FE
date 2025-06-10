import { useEffect, useRef } from "react";
import { useMapStore } from "../../stores/map.store";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_PLACES_KEY;

const MapScreen = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(
    null
  );
  const { center, placeName } = useMapStore();

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=marker`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = () => {
        initMap();
      };
      script.onerror = () => {
        console.error("Google Maps 스크립트 로딩 실패");
      };
    };

    const initMap = async () => {
      if (!mapRef.current || !window.google?.maps) return;

      const { Map } = (await window.google.maps.importLibrary(
        "maps"
      )) as google.maps.MapsLibrary;
      const { AdvancedMarkerElement } = (await window.google.maps.importLibrary(
        "marker"
      )) as google.maps.MarkerLibrary;

      const map = new Map(mapRef.current, {
        center,
        zoom: 16,
        mapId: "ffe46695a68d358762e0960f",
      });

      mapInstanceRef.current = map;

      // 고급 마커 생성
      markerRef.current = new AdvancedMarkerElement({
        map,
        position: center,
        title: placeName || "선택된 장소",
      });
    };

    if (!GOOGLE_MAPS_API_KEY) {
      console.error("Google Maps API 키가 없습니다.");
      return;
    }

    if (!window.google?.maps) {
      loadGoogleMapsScript();
    } else {
      initMap();
    }
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    const marker = markerRef.current;

    if (map) {
      map.setCenter(center);
    }

    if (marker) {
      marker.position = center;
    } else if (map && window.google?.maps.marker?.AdvancedMarkerElement) {
      markerRef.current = new window.google.maps.marker.AdvancedMarkerElement({
        map,
        position: center,
        title: placeName || "선택된 장소",
      });
    }
  }, [center]);

  return <div ref={mapRef} className="h-[100vh] w-[100vw]" />;
};

export default MapScreen;
