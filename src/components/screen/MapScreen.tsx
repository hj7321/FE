import { useEffect, useRef } from "react";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_PLACES_KEY;

const MapScreen = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY) {
      console.error("Google Maps API 키가 없습니다.");
      return;
    }

    if (!window.google?.maps) {
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
    } else {
      initMap();
    }

    function initMap() {
      if (!mapRef.current || !window.google?.maps) return; // null 체크

      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 41.9009, lng: 12.4833 },
        zoom: 16,
        mapId: "ffe46695a68d358762e0960f",
      });

      if (window.google.maps.marker?.AdvancedMarkerElement) {
        new window.google.maps.marker.AdvancedMarkerElement({
          map,
          position: { lat: 41.9009, lng: 12.4833 },
          title: "트레비 분수",
        });
      } else {
        new window.google.maps.Marker({
          map,
          position: { lat: 41.9009, lng: 12.4833 },
          title: "트레비 분수",
        });
      }
    }

    return () => {
      // 필요시 스크립트 정리
    };
  }, []);

  return <div ref={mapRef} className="h-[100vh] w-[100vw]" />;
};

export default MapScreen;
