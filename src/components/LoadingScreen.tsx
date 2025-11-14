import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = gsap.timeline({
      onComplete: () => {
        // Fade out the loader
        gsap.to(loaderRef.current, {
          opacity: 0,
          duration: 0.5,
          onComplete: onComplete
        });
      }
    });

    // Animate progress bar
    timeline.to(progressRef.current, {
      width: '100%',
      duration: 2,
      ease: 'power2.inOut'
    });

    // Animate text
    timeline.from(textRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out'
    }, 0);

    // Pulse effect
    timeline.to(textRef.current, {
      scale: 1.05,
      duration: 0.5,
      yoyo: true,
      repeat: 2,
      ease: 'power1.inOut'
    }, 0.5);

  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"
    >
      <div className="text-center space-y-8">
        <div ref={textRef} className="space-y-4">
          <h2 className="text-4xl md:text-6xl font-bold text-white">
            Nahush Patel
          </h2>
          <p className="text-xl text-white/90">
            Loading Portfolio...
          </p>
        </div>
        
        <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-white rounded-full"
            style={{ width: '0%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
