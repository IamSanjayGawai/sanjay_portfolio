import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const MagneticCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      gsap.to(cursor, {
        x: mouseX - 6,
        y: mouseY - 6,
        duration: 0.1,
        ease: 'power2.out',
      });

      gsap.to(follower, {
        x: mouseX - 20,
        y: mouseY - 20,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const onMouseEnterInteractive = () => {
      gsap.to(cursor, { scale: 0.5, duration: 0.3 });
      gsap.to(follower, {
        scale: 2,
        borderColor: '#FF5733',
        duration: 0.3,
        ease: 'back.out(1.7)',
      });
    };

    const onMouseLeaveInteractive = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3 });
      gsap.to(follower, {
        scale: 1,
        borderColor: 'rgba(0, 229, 255, 0.5)',
        duration: 0.3,
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    // Attach magnetic behavior to interactive elements
    const interactives = document.querySelectorAll('a, button, [role="button"], .magnetic');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterInteractive);
      el.addEventListener('mouseleave', onMouseLeaveInteractive);
    });

    // Re-attach on DOM changes (for SPA navigation)
    const observer = new MutationObserver(() => {
      const newInteractives = document.querySelectorAll('a, button, [role="button"], .magnetic');
      newInteractives.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive);
        el.removeEventListener('mouseleave', onMouseLeaveInteractive);
        el.addEventListener('mouseenter', onMouseEnterInteractive);
        el.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive);
        el.removeEventListener('mouseleave', onMouseLeaveInteractive);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Core dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-3 h-3 rounded-full bg-coral mix-blend-difference hidden md:block"
        style={{ willChange: 'transform' }}
      />
      {/* Follower ring */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none w-10 h-10 rounded-full border border-cyber/50 hidden md:block"
        style={{ willChange: 'transform' }}
      />
    </>
  );
};

export default MagneticCursor;
