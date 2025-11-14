import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power2.out'
      });

      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
      });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Outer cursor ring */}
      <div
        ref={cursorRef}
        className={`fixed pointer-events-none z-[9999] transition-all duration-300 ${
          isHovering ? 'scale-150' : 'scale-100'
        }`}
        style={{
          width: '40px',
          height: '40px',
          border: '2px solid rgba(59, 130, 246, 0.5)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'difference'
        }}
      />
      
      {/* Inner cursor dot */}
      <div
        ref={cursorDotRef}
        className={`fixed pointer-events-none z-[9999] transition-all duration-100 ${
          isHovering ? 'scale-0' : 'scale-100'
        }`}
        style={{
          width: '8px',
          height: '8px',
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />
    </>
  );
}
