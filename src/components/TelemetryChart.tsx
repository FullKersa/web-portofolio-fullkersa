import { useState, useEffect } from 'react';

export default function TelemetryChart() {
  const [data, setData] = useState([30, 45, 60, 40, 80, 65, 90]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        return prev.map(val => {
          // Add a subtle drift: -8% to +8%
          const shift = Math.floor(Math.random() * 17) - 8;
          let newVal = val + shift;
          // Constrain between 15% and 95%
          if (newVal < 15) newVal = 15;
          if (newVal > 95) newVal = 95;
          return newVal;
        });
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-28 bg-[#050505] border border-white/5 relative overflow-hidden flex items-end px-4 py-2 rounded-lg">
      <div className="w-full flex items-end justify-between gap-1.5 h-full">
        {data.map((height, idx) => {
          // Dynamic color gradient/intensity based on position/height
          // The items on the right are highlighted more brightly as in the mock
          let bgClass = "bg-primary-fixed/20";
          if (idx === 3) bgClass = "bg-primary-fixed/40";
          if (idx === 4) bgClass = "bg-primary-fixed/60";
          if (idx === 5) bgClass = "bg-primary-fixed/80";
          if (idx === 6) bgClass = "bg-primary-fixed emissive-glow";

          return (
            <div key={idx} className="flex-1 flex flex-col justify-end h-full">
              <div 
                className={`w-full rounded-t-sm transition-all duration-1000 ${bgClass}`}
                style={{ height: `${height}%` }}
              />
              <span className="text-[8px] font-mono text-center text-white/30 mt-1">
                T-{6 - idx}s
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
