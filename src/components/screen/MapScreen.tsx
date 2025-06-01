import { useEffect, useRef } from "react";

const MapScreen = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${
        import.meta.env.VITE_GOOGLE_PLACES_KEY
      }&libraries=marker`;
      script.async = true;
      document.body.appendChild(script);
      script.onload = initMap;
    } else {
      initMap();
    }

    function initMap() {
      if (!mapRef.current) return; // null 체크
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 41.9009, lng: 12.4833 },
        zoom: 16,
        mapId: "ffe46695a68d358762e0960f",
      });
      new window.google.maps.marker.AdvancedMarkerElement({
        map,
        position: { lat: 41.9009, lng: 12.4833 },
        title: "트레비 분수",
      });
    }

    return () => {
      // 필요시 스크립트 정리
    };
  }, []);

  return <div ref={mapRef} className="h-[690px] w-[860px]" />;
};

export default MapScreen;
