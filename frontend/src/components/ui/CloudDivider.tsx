export default function CloudDivider() {
  return (
    <div
      className="absolute bottom-0 left-0 w-full -z-10 pointer-events-none flex justify-center mix-blend-normal overflow-visible opacity-100"
      style={{
        maskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)'
      }}
    >
      {/* Left Cloud */}
      <img
        src="/cloude2.png"
        alt="Cloud left"
        className="w-1/2 h-auto object-cover object-right-bottom opacity-100 dark:opacity-30 dark:brightness-50 transition-all duration-700"
        style={{ filter: 'drop-shadow(0px -10px 20px rgba(0,0,0,0.2))' }}
      />
      {/* Right Cloud (Mirrored for perfect seamless join in the center) */}
      <img
        src="/cloude2.png"
        alt="Cloud right"
        className="w-1/2 h-auto object-cover object-right-bottom opacity-100 dark:opacity-30 dark:brightness-50 transition-all duration-700"
        style={{
          filter: 'drop-shadow(0px -10px 20px rgba(0,0,0,0.2))',
          transform: 'scaleX(-1)'
        }}
      />
    </div>
  );
}
