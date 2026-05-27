import { useState, useEffect, useRef } from 'react';
import { Terminal, X, Play, Pause, Trash2, Database, RefreshCw } from 'lucide-react';

interface SystemsLogConsoleProps {
  isOpen: boolean;
  onClose: () => void;
}

type LogType = 'clickhouse' | 'django' | 'dune';

export default function SystemsLogConsole({ isOpen, onClose }: SystemsLogConsoleProps) {
  const [activeFeed, setActiveFeed] = useState<LogType>('clickhouse');
  const [logs, setLogs] = useState<string[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const logsData: Record<LogType, string[]> = {
    clickhouse: [
      "[CLICKHOUSE-DB] Executed analytical query: SELECT AVG(monetary) FROM crm_events GROUP BY brand_id",
      "[CLICKHOUSE-DB] Scanned 823,104 transactions in 0.082s. Cache: Hit.",
      "[CLICKHOUSE-DB] Syncing order tracking profiles stream directly with S3 bucket partition...",
      "[CLICKHOUSE-METABASE] Rendering dashboard metric boards for client Burger King (F&B)",
      "[CLICKHOUSE-DB] Optimizing materialized views: moving metrics to active transactional nodes",
      "[CLICKHOUSE-DB] Initialized union query over 110,000 Ralali partner lender records",
      "[CLICKHOUSE-METABASE] Routine executive dashboard rendered: query uptime=100.00% latency=1.8ms"
    ],
    django: [
      "[DJANGO-API] Core request received: POST /api/v1/segments/predict from user_ip:182.164.2.11",
      "[DJANGO-ML] Loaded Scikit-Learn validation model: model_churn_predictor_v1.pkl",
      "[DJANGO-ML] Target predictor classification run finished successfully. ROC-AUC Index=0.892",
      "[DJANGO-TASK] Launching background Celery queue 'dispatch_promotion' to S3 push...",
      "[DJANGO-API] Sentry monitoring: resolved code anomaly in customer movement tracking log.",
      "[DJANGO-SENTRY] Cleared null field exceptions. Automated data validator protocols are nominal.",
      "[DJANGO-API] Metabase dashboard API call completed. All database queues synchronized."
    ],
    dune: [
      "[DUNE-ANALYTICS] Running on-chain transaction script for Solana streaming protocol (Mancer)...",
      "[DUNE-ANALYTICS] Decoded Solana transaction logs for vesting cliff release arrays",
      "[CRYPTO-DCA] Scanning Bitcoin (BTC) cost-averaging ledger records...",
      "[DUNE-ANALYTICS] Aggregating multi-sig wallet balances across three payment models",
      "[CRYPTO-ONCHAIN] Parsing Dune Analytics graph shards: detected high accumulation flow volumes",
      "[DUNE-ANALYTICS] Exporting Sol stream analysis metrics directly into Google Sheets CSV format"
    ]
  };

  useEffect(() => {
    // Seed initial logs
    setLogs(logsData[activeFeed]);
  }, [activeFeed]);

  useEffect(() => {
    if (isPaused || !isOpen) return;

    const interval = setInterval(() => {
      // Pick a random log from current category & prepend timestamp
      const feed = logsData[activeFeed];
      const randomMsg = feed[Math.floor(Math.random() * feed.length)];
      
      const parts = randomMsg.split(' ');
      // Substitute or modify some numbers for realism
      const logWithVariation = parts.map(part => {
        if (part.includes('latency=')) {
          return `latency=${(Math.random() * 0.4 + 1.1).toFixed(2)}ms`;
        }
        if (part.includes('Scanned')) {
          return `Scanned ${(Math.floor(Math.random() * 200000 + 700000)).toLocaleString()} transactions`;
        }
        return part;
      }).join(' ');

      const timestamp = new Date().toLocaleTimeString();
      setLogs(prev => [...prev.slice(-30), `[${timestamp}] ${logWithVariation}`]);
    }, 1800);

    return () => clearInterval(interval);
  }, [isPaused, activeFeed, isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const clearConsole = () => {
    setLogs([]);
  };

  const triggerDiagnosticSpike = () => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [
      ...prev,
      `[${timestamp}] ⚠️ WARNING: Discrepancy warning report: Sentry database integrity check failed.`,
      `[${timestamp}] 🔍 Backpressure tracking: locating malformed values in partner transactional data...`,
      `[${timestamp}] ⚙️ Initiating correction protocols: cleaning over 1,000,000 active rows...`,
      `[${timestamp}] ✅ Sentry check resolved. Presentation-level anomalies eliminated, data is clean.`
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#050505] border-t border-outline-variant/60 shadow-2xl flex flex-col h-80 animate-fade-in">
      {/* Top Console Action Bar */}
      <div className="flex justify-between items-center px-4 py-2 bg-neutral-950 border-b border-outline-variant/30 text-xs font-mono font-medium">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-primary-fixed" />
          <span className="text-white/80 uppercase tracking-widest text-[10px] font-bold">Analytics Data & Pipeline Log Console</span>
          <span className="w-1.5 h-1.5 bg-primary-fixed rounded-full animate-ping ml-2"></span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5 bg-[#121414] border border-outline-variant/40 rounded p-0.5">
            <button 
              onClick={() => setActiveFeed('clickhouse')}
              className={`px-3 py-1 text-[10px] font-mono tracking-wider transition-colors rounded cursor-pointer ${activeFeed === 'clickhouse' ? 'bg-primary-container text-on-primary font-medium' : 'text-white/50 hover:text-white'}`}
            >
              CLICKHOUSE DB
            </button>
            <button 
              onClick={() => setActiveFeed('django')}
              className={`px-3 py-1 text-[10px] font-mono tracking-wider transition-colors rounded cursor-pointer ${activeFeed === 'django' ? 'bg-primary-container text-on-primary font-medium' : 'text-white/50 hover:text-white'}`}
            >
              DJANGO & SCYLLA
            </button>
            <button 
              onClick={() => setActiveFeed('dune')}
              className={`px-3 py-1 text-[10px] font-mono tracking-wider transition-colors rounded cursor-pointer ${activeFeed === 'dune' ? 'bg-primary-container text-on-primary font-medium' : 'text-white/50 hover:text-white'}`}
            >
              ON-CHAIN DUNE
            </button>
          </div>

          <div className="h-4 w-px bg-white/10" />

          <button 
            onClick={() => setIsPaused(!isPaused)}
            className="text-white/50 hover:text-white flex items-center gap-1 cursor-pointer"
            title={isPaused ? "Resume log stream" : "Pause log stream"}
          >
            {isPaused ? <Play className="w-3.5 h-3.5 text-primary-fixed" /> : <Pause className="w-3.5 h-3.5" />}
            <span className="text-[10px] uppercase font-mono">{isPaused ? 'Resume' : 'Pause'}</span>
          </button>

          <button 
            onClick={triggerDiagnosticSpike}
            className="text-secondary-fixed hover:text-secondary-fixed-dim flex items-center gap-1 cursor-pointer"
            title="Inject data audit warning script to test sanity validation"
          >
            <RefreshCw className="w-3.5 h-3.5 hover:rotate-180 transition-all duration-500" />
            <span className="text-[10px] uppercase font-mono">Test Audit</span>
          </button>

          <button 
            onClick={clearConsole}
            className="text-white/50 hover:text-[#ffb4ab] flex items-center gap-1 cursor-pointer"
            title="Clear all logs"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          <div className="h-4 w-px bg-white/10" />

          <button 
            onClick={onClose}
            className="text-white/40 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Terminal logs content */}
      <div className="flex-1 p-4 bg-[#020202] text-neutral-300 font-mono text-[11px] overflow-y-auto space-y-1.5 terminal-scroll select-all">
        {logs.map((log, idx) => {
          let color = "text-neutral-400";
          if (log.includes("[CLICKHOUSE-") || log.includes("[DJANGO-")) color = "text-white/70";
          if (log.includes("[DUNE-")) color = "text-[#b9ccb5]";
          if (log.includes("accuracy=") || log.includes("[CLICKHOUSE-METABASE]")) color = "text-primary-fixed/80";
          if (log.includes("[SUCCESS]") || log.includes("✅")) color = "text-primary-fixed font-semibold";
          if (log.includes("⚠️ WARNING") || log.includes("ALERT")) color = "text-[#ffb4ab] bg-red-950/20 px-1 py-0.5 rounded border border-red-950";
          return (
            <div key={idx} className={`leading-relaxed ${color} font-mono animate-fade-in`}>
              {log}
            </div>
          );
        })}
        <div ref={scrollRef} />
      </div>
    </div>
  );
}
