import { useEffect, useRef, useState } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  [key: string]: any;
}

const LazyImage = ({
  src,
  alt,
  className = "",
  width,
  height,
  ...props
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const imgRef = useRef<HTMLDivElement>(null); // Intersection Observer가 관찰할 DOM 요소 참조

  useEffect(() => {
    if (!imgRef.current) return;

    // IntersectionObserver 인스턴스 생성
    const observer = new IntersectionObserver(
      // entries: 관찰 대상 요소 배열 (여기서는 첫 번째 요소만 사용)
      ([entry]) => {
        // entry가 뷰포트와 교차하고, 아직 이미지가 로드되지 않았다면
        if (entry.isIntersecting && !isLoaded) {
          const img = new Image(); // Image 객체 생성 (실제 이미지 미리 로드)
          img.src = src;
          img.onload = () => setIsLoaded(true); // 이미지 로드 완료 시 isLoaded 상태를 true로 변경
          img.onerror = () => console.error(`Image load failed: ${src}`); // 이미지 로드 실패 시 콘솔에 에러 출력
        }
      },
      {
        rootMargin: "900px", // 뷰포트보다 900px 먼저 로딩 시작
        threshold: 0, // 요소의 0%가 보이면 트리거
      }
    );

    observer.observe(imgRef.current); // imgRef.current 요소를 관찰 대상으로 등록

    return () => observer.disconnect(); // 컴포넌트 언마운트 시 관찰 해제
  }, [src, isLoaded]);

  return (
    <div ref={imgRef} style={{ width, height }}>
      {isLoaded ? (
        <img
          src={src}
          alt={alt}
          className={className}
          width={width}
          height={height}
          {...props}
        />
      ) : (
        <div
          className={className}
          style={{
            background: "#f0f0f0",
            width: "100%",
            height: "100%",
            borderRadius: "4px",
          }}
        ></div>
      )}
    </div>
  );
};

export default LazyImage;
