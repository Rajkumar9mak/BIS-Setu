import React from 'react';

export interface DecorativeShapesProps {
  variant?: 'loop' | 'tubular' | 'rectangles' | 'connected';
  className?: string;
  opacity?: number;
}

export function DecorativeShapes({
  variant = 'loop',
  className = '',
  opacity = 0.8
}: DecorativeShapesProps) {
  if (variant === 'loop') {
    return (
      <div className={`select-none ${className}`} style={{ opacity }}>
        <svg width="340" height="340" viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="goldOliveGrad" x1="40" y1="40" x2="380" y2="380" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#D1A24F" stopOpacity="0.9" />
              <stop offset="45%" stopColor="#927A48" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#4B4932" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="beigeGrad" x1="120" y1="60" x2="320" y2="360" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F4F2EC" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#D5C7B2" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path
            d="M 210 50 C 310 50 370 120 370 210 C 370 310 290 370 190 370 C 100 370 50 300 50 210 C 50 110 120 50 210 50 Z"
            stroke="url(#goldOliveGrad)"
            strokeWidth="38"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 120 160 C 180 80 280 120 310 220 C 330 280 270 340 200 320"
            stroke="url(#beigeGrad)"
            strokeWidth="16"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="210" cy="50" r="16" fill="#D1A24F" />
          <circle cx="370" cy="210" r="12" fill="#927A48" />
        </svg>
      </div>
    );
  }

  if (variant === 'tubular') {
    return (
      <div className={`select-none ${className}`} style={{ opacity }}>
        <svg width="420" height="240" viewBox="0 0 480 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="tubularGrad" x1="20" y1="20" x2="460" y2="260" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#927A48" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#D1A24F" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#4B4932" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path
            d="M 30 180 C 110 60 210 240 310 120 C 370 40 430 80 460 140"
            stroke="url(#tubularGrad)"
            strokeWidth="42"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 50 195 C 125 85 215 250 305 135 C 360 65 415 100 445 150"
            stroke="#F4F2EC"
            strokeOpacity="0.3"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={`relative w-72 h-72 ${className}`} style={{ opacity }}>
      <div className="absolute top-0 right-0 w-44 h-56 rounded-3xl border border-[#D1A24F]/40 bg-gradient-to-br from-[#927A48]/30 to-[#4B4932]/20 backdrop-blur-md transform rotate-12 shadow-2xl" />
      <div className="absolute bottom-2 left-2 w-48 h-36 rounded-3xl border border-[#D5C7B2]/40 bg-gradient-to-tr from-[#D1A24F]/25 to-[#171713]/50 backdrop-blur-lg transform -rotate-6 shadow-xl" />
      <div className="absolute top-12 left-10 w-28 h-28 rounded-2xl border border-[#927A48]/50 bg-[#4B4932]/35 backdrop-blur-xl transform rotate-45" />
    </div>
  );
}

// 21st.dev Demo export
export default function DecorativeShapesDemo() {
  return (
    <div className="min-h-[400px] w-full bg-[#171713] flex flex-wrap items-center justify-center gap-8 p-6">
      <DecorativeShapes variant="loop" />
      <DecorativeShapes variant="tubular" />
      <DecorativeShapes variant="rectangles" />
    </div>
  );
}
