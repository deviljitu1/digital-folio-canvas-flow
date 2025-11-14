import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';

interface MouseParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export default function MouseParallax({ children, speed = 0.05, className = '' }: MouseParallaxProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX - innerWidth / 2) * speed;
      const y = (clientY - innerHeight / 2) * speed;

      gsap.to(element, {
        x,
        y,
        duration: 1,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [speed]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
