import React from 'react';

export const SVGElements = () => (
  <svg width="0" height="0" className="absolute hidden">
    <defs>
      {/* Organic Shape Mask for Images */}
      <clipPath id="organicShape" clipPathUnits="objectBoundingBox">
        <path d="M0.95,0.2 C0.98,0.4,1,0.6,0.9,0.8 C0.8,1,0.5,1,0.2,0.9 C-0.1,0.8,0,0.5,0.05,0.3 C0.1,0.1,0.4,0,0.7,0.05 C0.85,0.08,0.92,0.1,0.95,0.2 Z" />
      </clipPath>
      
      {/* Isometric Grid Pattern */}
      <pattern id="isoGrid" patternUnits="userSpaceOnUse" width="60" height="34.64" patternTransform="scale(1) rotate(0)">
        <path d="M30 0 l30 17.32 v34.64 l-30 17.32 l-30-17.32 v-34.64 z M0 17.32 l30 17.32 l30-17.32 M30 34.64 v34.64" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.05"/>
      </pattern>
    </defs>
  </svg>
);

export const RotatingBadge = ({ text = "CONSULT WITH US • ÁUREA • " }: { text?: string }) => {
  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <div className="absolute inset-0 animate-[spin_10s_linear_infinite]">
        <svg viewBox="0 0 100 100" className="w-full h-full text-aurea-gold overflow-visible">
          <path id="circlePath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="none" />
          <text className="text-[11px] font-sans tracking-[0.2em] uppercase" fill="currentColor">
            <textPath href="#circlePath" startOffset="0%">
              {text}
            </textPath>
          </text>
        </svg>
      </div>
      <div className="w-2 h-2 rounded-full bg-aurea-gold"></div>
    </div>
  );
};

export const BackgroundGrid = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="url(#isoGrid)"/>
    </svg>
    <div className="absolute inset-0 bg-gradient-to-b from-aurea-dark via-transparent to-aurea-dark"></div>
  </div>
);
