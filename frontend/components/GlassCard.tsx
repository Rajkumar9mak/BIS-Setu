import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  variant?: 'charcoal' | 'olive' | 'ivory' | 'elevated';
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

export default function GlassCard({
  children,
  variant = 'charcoal',
  className = '',
  onClick,
  hoverEffect = true
}: GlassCardProps) {
  let baseStyles = 'rounded-[24px] p-6 transition-all duration-300 relative overflow-hidden ';

  if (variant === 'charcoal') {
    baseStyles += 'glass-charcoal text-[#f4f2ec] ';
    if (hoverEffect) baseStyles += 'card-hover-gold ';
  } else if (variant === 'olive') {
    baseStyles += 'glass-olive text-[#f4f2ec] ';
    if (hoverEffect) baseStyles += 'card-hover-olive ';
  } else if (variant === 'ivory') {
    baseStyles += 'glass-ivory text-[#171713] border border-[#927a48]/25 shadow-lg shadow-[#171713]/5 ';
    if (hoverEffect) baseStyles += 'hover:-translate-y-1 hover:border-[#d1a24f] hover:shadow-xl ';
  } else {
    baseStyles += 'bg-[#171713] border-2 border-[#d1a24f]/40 glow-gold text-[#f4f2ec] ';
  }

  return (
    <div className={`${baseStyles} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}
