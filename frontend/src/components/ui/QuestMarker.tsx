import { useEffect, useState } from 'react';
import { useTutorial } from '../../contexts/TutorialContext';
import { Pointer } from 'lucide-react';

const missionData = {
  1: { targetId: 'mission-1-target', text: 'Scroll down to begin your journey!', direction: 'down' as const },
  2: { targetId: 'mission-2-target', text: 'Click to toggle the theme!', direction: 'down' as const },
  3: { targetId: 'mission-3-target', text: 'Scroll down to see previous roles!', direction: 'down' as const },
  4: { targetId: 'mission-4-target', text: 'Hover or tap to reveal details!', direction: 'down' as const },
  5: { targetId: 'mission-5-target', text: 'Launch the rocket!', direction: 'up' as const },
};

export const GlobalQuestMarker = () => {
  const { currentMission, isCompleted } = useTutorial();
  const [pos, setPos] = useState({ x: -1000, y: -1000, isClamped: false, clampedDir: '' });

  useEffect(() => {
    if (isCompleted || currentMission > 5) return;

    let animationFrameId: number;
    const targetId = missionData[currentMission as keyof typeof missionData].targetId;

    const updatePosition = () => {
      let el = document.getElementById(targetId);
      if (el && el.offsetParent === null) {
         // Try finding mobile version if desktop is hidden
         el = document.getElementById(targetId + '-mobile') || el;
      }

      if (el) {
        const rect = el.getBoundingClientRect();
        const dir = missionData[currentMission as keyof typeof missionData].direction;
        
        let targetX = rect.left + rect.width / 2;
        let targetY = rect.top + rect.height / 2;

        // Position hand slightly above or below the element based on direction
        if (dir === 'down') targetY = rect.top - 40;
        if (dir === 'up') targetY = rect.bottom + 40;

        const paddingX = 80;
        const paddingTop = 120;
        const paddingBottom = 120;

        let clampedX = Math.max(paddingX, Math.min(window.innerWidth - paddingX, targetX));
        let clampedY = Math.max(paddingTop, Math.min(window.innerHeight - paddingBottom, targetY));

        let isClamped = false;
        let clampedDir = '';
        
        // If element is off-screen vertically, clamp and change direction
        if (targetY < paddingTop) { 
          isClamped = true; 
          clampedDir = 'up'; 
        } else if (targetY > window.innerHeight - paddingBottom) { 
          isClamped = true; 
          clampedDir = 'down'; 
        }

        setPos({ x: clampedX, y: clampedY, isClamped, clampedDir });
      }
      animationFrameId = requestAnimationFrame(updatePosition);
    };

    updatePosition();
    return () => cancelAnimationFrame(animationFrameId);
  }, [currentMission, isCompleted]);

  if (isCompleted || currentMission > 5) return null;

  const data = missionData[currentMission as keyof typeof missionData];
  if (!data) return null;

  // Hide entirely if we haven't found the target yet
  if (pos.x === -1000) return null;

  // Determine rotation based on clamping or intended direction
  let rotateClass = 'rotate-0'; // Points down by default
  let textOnTop = true;

  if (pos.isClamped) {
     if (pos.clampedDir === 'up') {
       rotateClass = '-rotate-180'; // point up
       textOnTop = false;
     }
     if (pos.clampedDir === 'down') {
       rotateClass = 'rotate-0'; // point down
       textOnTop = true;
     }
  } else {
     if (data.direction === 'up') {
       rotateClass = '-rotate-180';
       textOnTop = false;
     }
     if (data.direction === 'down') {
       rotateClass = 'rotate-0';
       textOnTop = true;
     }
  }

  return (
    <div 
      className="fixed z-[9999] pointer-events-none flex flex-col items-center justify-center animate-[bounce_2s_infinite]"
      style={{ left: `${pos.x}px`, top: `${pos.y}px`, transform: 'translate(-50%, -50%)' }}
    >
      {/* Text Popup */}
      {textOnTop && (
        <div className="mb-3 px-4 py-2.5 bg-slate-900/90 dark:bg-black/90 border border-sky-500/50 rounded-xl shadow-[0_0_20px_rgba(14,165,233,0.5)] backdrop-blur-md flex items-center justify-center w-max max-w-[140px] sm:max-w-[200px] text-center">
          <span className="font-display font-bold text-xs sm:text-sm text-sky-400 tracking-wide leading-tight">
            {pos.isClamped ? (pos.clampedDir === 'up' ? 'Scroll Up!' : 'Scroll Down!') : data.text}
          </span>
        </div>
      )}

      {/* Pointing Hand */}
      <div className="relative flex items-center justify-center">
        <div className="absolute w-12 h-12 bg-sky-500/20 rounded-full animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite] border border-sky-400/50" />
        <div className="absolute w-8 h-8 bg-sky-400/40 rounded-full animate-pulse blur-md" />
        <Pointer size={40} strokeWidth={1.5} className={`relative text-sky-400 fill-sky-400/30 drop-shadow-[0_0_10px_rgba(14,165,233,1)] transition-transform duration-300 ${rotateClass}`} />
      </div>

      {/* Text Popup (Bottom) */}
      {!textOnTop && (
        <div className="mt-3 px-4 py-2.5 bg-slate-900/90 dark:bg-black/90 border border-sky-500/50 rounded-xl shadow-[0_0_20px_rgba(14,165,233,0.5)] backdrop-blur-md flex items-center justify-center w-max max-w-[140px] sm:max-w-[200px] text-center">
          <span className="font-display font-bold text-xs sm:text-sm text-sky-400 tracking-wide leading-tight">
            {pos.isClamped ? (pos.clampedDir === 'up' ? 'Scroll Up!' : 'Scroll Down!') : data.text}
          </span>
        </div>
      )}
    </div>
  );
};
