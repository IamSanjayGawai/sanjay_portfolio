import { useEffect, useState } from 'react';

const PRELOAD_IMAGES = [
  '/dhansource/dhansource-1.jpeg', '/dhansource/dhansource-2.jpeg', '/dhansource/dhansource-3.jpeg', '/dhansource/dhansource-4.jpeg',
  '/asnaro-home.png', '/asnaro-dashboard.png', '/asnaro-admin.png', '/asnaro-product.png',
  '/ringbuzz/WhatsApp Image 2026-06-19 at 4.05.56 PM (1).jpeg', '/ringbuzz/WhatsApp Image 2026-06-19 at 4.05.59 PM (1).jpeg', '/ringbuzz/WhatsApp Image 2026-06-19 at 4.06.00 PM (2).jpeg', '/ringbuzz/WhatsApp Image 2026-06-19 at 4.06.00 PM.jpeg',
  '/funzo-mobile-home.png', '/funzo-mobile-live.png', '/funzo-mobile-chat.png', '/funzo-mobile-profile.png',
  '/cloude2.png',
  '/earth_loader.png',
  '/cloud.png'
];

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [isGrowing, setIsGrowing] = useState(false);
  const [isCloudsCovering, setIsCloudsCovering] = useState(false);
  const [isEarthFading, setIsEarthFading] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isCloudsFading, setIsCloudsFading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const isReady = imagesLoaded;

  const handleEnterWorld = () => {
    setIsGrowing(true); // 0s - Earth starts zooming in

    // Clouds appear when earth is huge (about 80% grown)
    setTimeout(() => {
      setIsCloudsCovering(true); // 6.5s
    }, 6500);

    // At 8.5s, the website begins revealing (background & earth fade out)
    setTimeout(() => {
      setIsEarthFading(true); // 8.5s
      setIsRevealing(true);
    }, 8500);

    // After clouds finish their 5s fullscreen cover (6.5s + 5s = 11.5s), they fade out
    setTimeout(() => {
      setIsCloudsFading(true); // 11.5s
    }, 11500);

    // Unmount after all fades complete
    setTimeout(() => {
      onComplete(); // 15s
    }, 15000);
  };

  useEffect(() => {
    let loadedCount = 0;
    if (PRELOAD_IMAGES.length === 0) {
      setImagesLoaded(true);
      setProgress(100);
      return;
    }
    PRELOAD_IMAGES.forEach(src => {
      const img = new Image();
      const onLoadOrError = () => {
        loadedCount++;
        setProgress(Math.floor((loadedCount / PRELOAD_IMAGES.length) * 100));
        if (loadedCount >= PRELOAD_IMAGES.length) {
          setImagesLoaded(true);
        }
      };
      img.onload = onLoadOrError;
      img.onerror = onLoadOrError;
      img.src = src;
    });
    const fallbackTimer = setTimeout(() => {
      setImagesLoaded(true);
      setProgress(100);
    }, 8000);
    return () => clearTimeout(fallbackTimer);
  }, []);

  return (
    <div className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-colors duration-[3000ms] ease-in-out ${isRevealing ? 'bg-transparent' : 'bg-black'}`}>
      {/* Background Starfield */}
      <div className={`absolute inset-0 z-0 transition-opacity duration-[3000ms] ease-in-out ${isRevealing ? 'opacity-0' : 'opacity-40'}`}>
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-ping delay-300"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-white rounded-full animate-pulse delay-700"></div>
      </div>

      <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none overflow-hidden">
        <div
          className={`relative flex items-center justify-center`}
          style={{
            width: '50vmin',
            height: '50vmin',
            transform: isGrowing ? 'scale(15) translateZ(0)' : 'scale(1) translateZ(0)',
            transition: 'transform 15s cubic-bezier(0.5, 0, 0.8, 1)',
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            maskImage: 'url(/earth_loader.png)',
            WebkitMaskImage: 'url(/earth_loader.png)',
            maskSize: 'contain',
            WebkitMaskSize: 'contain',
            maskPosition: 'center',
            WebkitMaskPosition: 'center',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat'
          }}
        >
          {/* Earth Loader - Uncropped */}
          <img
            src="/earth_loader.png"
            alt="Earth Loader"
            className={`absolute inset-0 w-full h-full max-w-none object-contain transition-opacity duration-[3000ms] ease-in-out animate-[spin_40s_linear_infinite] ${isEarthFading ? 'opacity-0' : 'opacity-90'}`}
            style={{
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden'
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://cdn-icons-png.flaticon.com/512/814/814513.png';
            }}
          />

          {/* Top-Left Cloud */}
          <img
            src="/cloud.png"
            className={`absolute top-0 left-0 w-[80%] h-[80%] object-contain ${isCloudsFading ? 'opacity-0' : isCloudsCovering ? 'opacity-100' : 'opacity-0'}`}
            style={{
              transform: `translate3d(${isCloudsCovering ? '20%' : '-35%'}, ${isCloudsCovering ? '20%' : '-35%'}, 0) scale(${isCloudsCovering ? 4 : 1})`,
              transformOrigin: 'center center',
              transition: 'transform 5s ease-out, opacity 3s ease-out',
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden'
            }}
          />

          {/* Top-Right Cloud */}
          <img
            src="/cloud.png"
            className={`absolute top-0 right-0 w-[80%] h-[80%] object-contain ${isCloudsFading ? 'opacity-0' : isCloudsCovering ? 'opacity-100' : 'opacity-0'}`}
            style={{
              transform: `translate3d(${isCloudsCovering ? '-20%' : '35%'}, ${isCloudsCovering ? '20%' : '-35%'}, 0) scale(${isCloudsCovering ? 4 : 1})`,
              transformOrigin: 'center center',
              transition: 'transform 5s ease-out, opacity 3s ease-out',
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden'
            }}
          />

          {/* Bottom-Left Cloud */}
          <img
            src="/cloud.png"
            className={`absolute bottom-0 left-0 w-[80%] h-[80%] object-contain ${isCloudsFading ? 'opacity-0' : isCloudsCovering ? 'opacity-100' : 'opacity-0'}`}
            style={{
              transform: `translate3d(${isCloudsCovering ? '20%' : '-35%'}, ${isCloudsCovering ? '-20%' : '35%'}, 0) scale(${isCloudsCovering ? 4 : 1})`,
              transformOrigin: 'center center',
              transition: 'transform 5s ease-out, opacity 3s ease-out',
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden'
            }}
          />

          {/* Bottom-Right Cloud */}
          <img
            src="/cloud.png"
            className={`absolute bottom-0 right-0 w-[80%] h-[80%] object-contain ${isCloudsFading ? 'opacity-0' : isCloudsCovering ? 'opacity-100' : 'opacity-0'}`}
            style={{
              transform: `translate3d(${isCloudsCovering ? '-20%' : '35%'}, ${isCloudsCovering ? '-20%' : '35%'}, 0) scale(${isCloudsCovering ? 4 : 1})`,
              transformOrigin: 'center center',
              transition: 'transform 5s ease-out, opacity 3s ease-out',
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden'
            }}
          />
        </div>
      </div>

      {/* Button and Progress */}
      <div className={`absolute bottom-16 z-30 flex flex-col items-center w-full gap-4 transition-opacity duration-[1500ms] ${isGrowing ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {isReady ? (
          <button
            onClick={handleEnterWorld}
            className="text-white font-mono text-lg sm:text-xl font-bold tracking-[0.3em] uppercase bg-sky-500/20 hover:bg-sky-500/40 transition-all duration-300 backdrop-blur-sm px-8 py-3 rounded-full border border-sky-400 shadow-[0_0_30px_rgba(14,165,233,0.4)] hover:shadow-[0_0_50px_rgba(14,165,233,0.8)] hover:scale-105 cursor-pointer flex items-center gap-3 group"
          >
            <span>INITIALIZE_SYSTEM</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </button>
        ) : (
          <div className="text-white font-mono text-lg sm:text-xl font-bold tracking-[0.3em] uppercase bg-white/5 backdrop-blur-sm px-8 py-3 rounded-full border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)] opacity-50 pointer-events-none">
            Booting Core...
          </div>
        )}

        {!isReady && (
          <div className="flex flex-col items-center gap-2 mt-4">
            <div className="w-64 h-1 bg-slate-800 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-sky-500 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(14,165,233,0.8)]"
                style={{ width: progress + '%' }}
              />
            </div>
            <div className="text-[10px] sm:text-xs font-mono text-sky-400/80 uppercase tracking-widest mt-2">
              {progress < 25 && ">> ESTABLISHING SECURE PROTOCOLS..."}
              {progress >= 25 && progress < 50 && ">> COMPILING PRODUCT ECOSYSTEM..."}
              {progress >= 50 && progress < 75 && ">> SYNCHRONIZING CLOUD INFRASTRUCTURE..."}
              {progress >= 75 && progress < 100 && ">> LOADING NEXT-GEN EXPERIENCES..."}
              {progress === 100 && ">> SYSTEM FULLY OPERATIONAL"}
              <span className="ml-2 text-white">[{progress}%]</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Preloader;
