import React from 'react';

interface ShapeProps {
  variant?: 'loop' | 'tubular' | 'rectangles' | 'ribbon' | 'connected';
  className?: string;
  opacity?: number;
}

export default function DecorativeShapes({ variant = 'loop', className = '', opacity = 0.6 }: ShapeProps) {
  if (variant === 'loop') {
    return (
      <div
        className={`pointer-events-none absolute -z-10 select-none ${className}`}
        style={{ opacity }}
        aria-hidden="true"
      >
        <svg width="420" height="420" viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="goldOliveGrad" x1="40" y1="40" x2="380" y2="380" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#D1A24F" stopOpacity="0.85" />
              <stop offset="45%" stopColor="#927A48" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#4B4932" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="beigeGrad" x1="120" y1="60" x2="320" y2="360" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F4F2EC" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#D5C7B2" stopOpacity="0.1" />
            </linearGradient>
            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="24" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          {/* Outer 3D Tubular Loop */}
          <path
            d="M 210 50 C 310 50 370 120 370 210 C 370 310 290 370 190 370 C 100 370 50 300 50 210 C 50 110 120 50 210 50 Z"
            stroke="url(#goldOliveGrad)"
            strokeWidth="38"
            strokeLinecap="round"
            fill="none"
            filter="url(#softGlow)"
          />
          {/* Inner Intersecting Subtle Ribbon */}
          <path
            d="M 120 160 C 180 80 280 120 310 220 C 330 280 270 340 200 320"
            stroke="url(#beigeGrad)"
            strokeWidth="18"
            strokeLinecap="round"
            fill="none"
          />
          {/* Floating Rounded Nodes */}
          <circle cx="210" cy="50" r="16" fill="#D1A24F" fillOpacity="0.7" />
          <circle cx="370" cy="210" r="12" fill="#927A48" fillOpacity="0.6" />
        </svg>
      </div>
    );
  }

  if (variant === 'tubular') {
    return (
      <div
        className={`pointer-events-none absolute -z-10 select-none ${className}`}
        style={{ opacity }}
        aria-hidden="true"
      >
        <svg width="480" height="280" viewBox="0 0 480 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="tubularGrad" x1="20" y1="20" x2="460" y2="260" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#927A48" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#D1A24F" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#4B4932" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path
            d="M 30 180 C 110 60 210 240 310 120 C 370 40 430 80 460 140"
            stroke="url(#tubularGrad)"
            strokeWidth="44"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 50 195 C 125 85 215 250 305 135 C 360 65 415 100 445 150"
            stroke="#F4F2EC"
            strokeOpacity="0.25"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
    );
  }

  if (variant === 'rectangles') {
    return (
      <div
        className={`pointer-events-none absolute -z-10 select-none ${className}`}
        style={{ opacity }}
        aria-hidden="true"
      >
        <div className="relative w-72 h-72">
          <div className="absolute top-0 right-0 w-44 h-56 rounded-3xl border border-[#D1A24F]/30 bg-gradient-to-br from-[#927A48]/20 to-[#4B4932]/10 backdrop-blur-md transform rotate-12 shadow-2xl" />
          <div className="absolute bottom-2 left-2 w-48 h-36 rounded-3xl border border-[#D5C7B2]/30 bg-gradient-to-tr from-[#D1A24F]/15 to-[#171713]/40 backdrop-blur-lg transform -rotate-6 shadow-xl" />
          <div className="absolute top-12 left-10 w-28 h-28 rounded-2xl border border-[#927A48]/40 bg-[#4B4932]/25 backdrop-blur-xl transform rotate-45" />
        </div>
      </div>
    );
  }

  if (variant === 'ribbon') {
    return (
      <div
        className={`pointer-events-none absolute -z-10 select-none ${className}`}
        style={{ opacity }}
        aria-hidden="true"
      >
        <svg width="400" height="320" viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="ribbonGrad" x1="0" y1="0" x2="400" y2="320" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#D1A24F" stopOpacity="0.6" />
              <stop offset="40%" stopColor="#927A48" stopOpacity="0.4" />
              <stop offset="80%" stopColor="#4B4932" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#171713" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M 20 280 C 80 180 140 60 250 80 C 340 100 380 200 320 280"
            stroke="url(#ribbonGrad)"
            strokeWidth="32"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
    );
  }

  // connected forms (representing Indian Standards Connectivity)
  return (
    <div
      className={`pointer-events-none absolute -z-10 select-none ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg width="340" height="340" viewBox="0 0 340 340" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="90" cy="90" r="44" stroke="#927A48" strokeOpacity="0.4" strokeWidth="8" fill="#4B4932" fillOpacity="0.2" />
        <circle cx="250" cy="110" r="54" stroke="#D1A24F" strokeOpacity="0.5" strokeWidth="10" fill="#927A48" fillOpacity="0.15" />
        <circle cx="170" cy="250" r="40" stroke="#D5C7B2" strokeOpacity="0.3" strokeWidth="6" fill="#171713" fillOpacity="0.4" />
        <path d="M 125 100 L 205 105" stroke="#D1A24F" strokeOpacity="0.5" strokeWidth="4" strokeDasharray="6 6" />
        <path d="M 230 160 L 185 215" stroke="#927A48" strokeOpacity="0.4" strokeWidth="4" />
        <path d="M 115 130 L 155 215" stroke="#D5C7B2" strokeOpacity="0.3" strokeWidth="3" />
      </svg>
    </div>
  );
}
