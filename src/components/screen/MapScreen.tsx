import { useEffect, useMemo, useRef, useState } from "react";
import { useMapStore } from "../../stores/map.store";
import { useScheduleStore } from "../../stores/schedule.store";
import { MarkerDTO } from "../../types/map.type";
import { useDaySelectionStore } from "../../stores/day.store";

/* ─────────────── 상수 & 유틸 ───────────────────────────────────────── */
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_PLACES_KEY;

const getDayColor = (d: number) =>
  getComputedStyle(document.documentElement)
    .getPropertyValue(`--color-day${d}`)
    .trim() || "#666";

const haversine = (
  a: google.maps.LatLngLiteral,
  b: google.maps.LatLngLiteral
) => {
  const R = 6371e3,
    toRad = (v: number) => (v * Math.PI) / 180;
  const φ1 = toRad(a.lat),
    φ2 = toRad(b.lat);
  const dφ = toRad(b.lat - a.lat);
  const dλ = toRad(b.lng - a.lng);
  const s =
    Math.sin(dφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(dλ / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
};

/* ─────────────── (1) 날짜별 캐시  ───────────────────────────────────── */
const markersByDay: Record<number, google.maps.marker.AdvancedMarkerElement[]> =
  {};
const polylinesByDay: Record<number, google.maps.Polyline[]> = {};
const labelsByDay: Record<number, google.maps.marker.AdvancedMarkerElement[]> =
  {};
// const distanceLabelsRef = useRef<google.maps.marker.AdvancedMarkerElement[]>(
//   []
// );
let zCounter = 10;

/* ─────────────── 컴포넌트 ───────────────────────────────────────────── */
const MapScreen = () => {
  /* 스토어 */
  const { center } = useMapStore();
  const schedule = useScheduleStore((s) => s.schedule);
  const selectedDay = useDaySelectionStore((s) => s.selectedDay); // 0 = ALL

  /* ① 스케줄 → 마커 DTO */
  const markers = useMemo<MarkerDTO[]>(() => {
    const out: MarkerDTO[] = [];

    const days = selectedDay
      ? [selectedDay]
      : Object.keys(schedule).map(Number);

    days.forEach((daySeq) => {
      const byTime = schedule[daySeq] ?? {};
      let order = 1;
      Object.keys(byTime)
        .sort()
        .forEach((t) => {
          byTime[t].forEach((p) => {
            const lat = +p.latitude,
              lng = +p.longitude;
            if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;
            out.push({
              id: `${daySeq}-${t}-${order}`,
              daySeq,
              order: order++,
              lat,
              lng,
              placeName: p.placeName,
            });
          });
        });
    });
    return out;
  }, [schedule, selectedDay]);

  /* ② map & SDK */
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY || !mapRef.current) return;

    const load = () =>
      new Promise<void>((ok) => {
        if (window.google?.maps) return ok();
        const s = document.createElement("script");
        s.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=marker`;
        s.async = s.defer = true;
        s.onload = () => ok();
        document.body.appendChild(s);
      });

    (async () => {
      await load();
      if (mapInstanceRef.current) return;
      const { Map } = (await window.google.maps.importLibrary(
        "maps"
      )) as google.maps.MapsLibrary;
      mapInstanceRef.current = new Map(mapRef.current!, {
        center,
        zoom: 15,
        mapId: "ffe46695a68d358762e0960f",
      });
      setReady(true);
    })();
  }, []);

  useEffect(() => {
    mapInstanceRef.current?.setCenter(center);
  }, [center]);

  /* ③ 마커·선·라벨 그리기 */
  useEffect(() => {
    if (!ready || !mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    /* 3-1. 기존 요소 제거 */
    [markersByDay, polylinesByDay, labelsByDay].forEach((rec) =>
      Object.values(rec)
        .flat()
        .forEach((el: any) => {
          if ("setMap" in el) el.setMap(null);
          else el.map = null;
        })
    );
    Object.keys(markersByDay).forEach((k) => delete markersByDay[+k]);
    Object.keys(polylinesByDay).forEach((k) => delete polylinesByDay[+k]);
    Object.keys(labelsByDay).forEach((k) => delete labelsByDay[+k]);
    zCounter = 10;

    /* 3-2. AdvancedMarkerElement import */
    const { AdvancedMarkerElement } = window.google.maps
      .marker as google.maps.MarkerLibrary;

    /* 3-3. daySeq → path 배열 */
    const pathByDay: Record<number, google.maps.LatLngLiteral[]> = {};

    markers.forEach(({ daySeq, order, lat, lng, placeName }) => {
      const svg = `
        <svg width="34" height="44" viewBox="0 0 24 32" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path d="M12 32C12 32 24 20.322 24 11.25C24 5.034 18.627 0 12 0
                   S0 5.034 0 11.25C0 20.322 12 32 12 32Z"
                fill="${getDayColor(daySeq)}"/>
          <text x="12" y="18" text-anchor="middle" fill="white"
                font-family="SUIT-Regular" font-size="12" font-weight="bold">
            ${order}
          </text>
        </svg>`;

      const marker = new AdvancedMarkerElement({
        map,
        position: { lat, lng },
        content: (() => {
          const div = document.createElement("div");
          div.innerHTML = svg;
          return div;
        })(),
        title: placeName,
        zIndex: zCounter++,
      });

      /* 캐시 */
      (markersByDay[daySeq] ??= []).push(marker);
      (pathByDay[daySeq] ??= []).push({ lat, lng });
    });

    /* 3-4. Polyline & 거리라벨 */
    Object.entries(pathByDay).forEach(([k, path]) => {
      const daySeq = +k;
      if (path.length < 2) return;

      /* polyline */
      const pl = new window.google.maps.Polyline({
        map,
        path,
        strokeColor: getDayColor(daySeq),
        strokeOpacity: 0.9,
        strokeWeight: 4,
        zIndex: zCounter++,
      });
      (polylinesByDay[daySeq] ??= []).push(pl);

      /* 세그먼트별 거리 */
      for (let i = 0; i < path.length - 1; i++) {
        const a = path[i],
          b = path[i + 1];
        const dist = haversine(a, b);
        const labelDiv = document.createElement("div");
        Object.assign(labelDiv.style, {
          padding: "2px 4px",
          background: "#ffffffee",
          border: `1px solid ${getDayColor(daySeq)}`,
          borderRadius: "4px",
          fontSize: "11px",
          fontFamily: "SUIT-Regular",
        });
        labelDiv.innerText = `${Math.round(dist).toLocaleString()} m`;

        const mid = { lat: (a.lat + b.lat) / 2, lng: (a.lng + b.lng) / 2 };

        const label = new AdvancedMarkerElement({
          map,
          position: mid,
          content: labelDiv,
          zIndex: zCounter++,
        });
        (labelsByDay[daySeq] ??= []).push(label);
      }
    });

    /* 3-5. bring-to-front : 마커 클릭 시 해당 날짜 z-index ↑ */
    Object.entries(markersByDay).forEach(([dayStr, arr]) => {
      const daySeq = +dayStr;
      arr.forEach((m) =>
        m.addListener("click", () => {
          [
            ...markersByDay[daySeq],
            ...polylinesByDay[daySeq],
            ...labelsByDay[daySeq],
          ].forEach((el: any) => {
            if ("setOptions" in el) el.setOptions({ zIndex: zCounter++ });
            else el.zIndex = zCounter++;
          });
        })
      );
    });
  }, [markers, ready]);

  return <div ref={mapRef} className="h-[100vh] w-[100vw]" />;
};

export default MapScreen;
