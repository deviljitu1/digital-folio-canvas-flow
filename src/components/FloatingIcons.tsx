import { useEffect, useRef } from 'react';
import { Code2, Palette, TrendingUp, Megaphone, Globe, Sparkles } from 'lucide-react';
import gsap from 'gsap';

const icons = [
  { Icon: Code2, delay: 0, position: { x: -100, y: -50 } },
  { Icon: Palette, delay: 0.2, position: { x: 100, y: -80 } },
  { Icon: TrendingUp, delay: 0.4, position: { x: -120, y: 50 } },
  { Icon: Megaphone, delay: 0.6, position: { x: 80, y: 80 } },
  { Icon: Globe, delay: 0.8, position: { x: 0, y: -100 } },
  { Icon: Sparkles, delay: 1, position: { x: 0, y: 100 } },
];

export default function FloatingIcons() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const iconElements = containerRef.current.querySelectorAll('.floating-icon');
    
    iconElements.forEach((icon, index) => {
      const timeline = gsap.timeline({ repeat: -1, yoyo: true });
      
      timeline.to(icon, {
        y: `+=${Math.random() * 30 + 10}`,
        x: `+=${Math.random() * 20 - 10}`,
        rotation: Math.random() * 20 - 10,
        duration: 3 + Math.random() * 2,
        ease: 'sine.inOut',
        delay: icons[index].delay
      });
    });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      iconElements.forEach((icon, index) => {
        const speed = 0.02 + index * 0.005;
        const x = (clientX - innerWidth / 2) * speed;
        const y = (clientY - innerHeight / 2) * speed;
        
        gsap.to(icon, {
          x: `+=${x}`,
          y: `+=${y}`,
          duration: 1,
          ease: 'power2.out'
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none hidden lg:block">
      {icons.map(({ Icon, position }, index) => (
        <div
          key={index}
          className="floating-icon absolute text-blue-500/20 dark:text-blue-400/20"
          style={{
            left: '50%',
            top: '50%',
            transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`
          }}
        >
          <Icon size={48} />
        </div>
      ))}
    </div>
  );
}
