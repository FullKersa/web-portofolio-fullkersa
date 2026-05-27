import { useState } from 'react';
import { Play, RotateCcw, Terminal, BarChart2 } from 'lucide-react';

export default function PythonPipelineRunner() {
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const steps = [
    "python crm_recommender.py --train --eval",
    "   [00:00:01] [INFO] Swarming pandas dataframes from ClickHouse source pools...",
    "   [00:00:01] [INFO] Unpacking transaction log context. Shape: (912300 rows, 14 attributes)",
    "   [00:00:01] [INFO] Extracting feature vectors: RFM segmentation, transaction frequency, profile tags",
    "   [00:00:02] [STATS] Imputing missing profile records with KNNImputer...",
    "   [00:00:02] [MODEL] Training Random Forest Classification & Apriori association algorithms...",
    "   [00:00:03] [BENCH] Model convergence achieved. Training duration: 1.14s",
    "   [00:00:03] [EVAL] ROC-AUC Index: 0.892 | Email CTR Lift Index: +22.31%",
    "   [00:00:03] [SUCCESS] Exported target list segment (104,740 highly qualified users) to AWS S3 storage bucket.",
    "   [00:00:03] [SUCCESS] Exit Code: 0"
  ];

  const handleRun = () => {
    if (isRunning) return;
    setIsRunning(true);
    setLogs([]);

    let currentStep = 0;
    const runInterval = setInterval(() => {
      if (currentStep < steps.length) {
        setLogs(prev => [...prev, steps[currentStep]]);
        currentStep++;
      } else {
        clearInterval(runInterval);
        setIsRunning(false);
      }
    }, 350);
  };

  const resetLogs = () => {
    setLogs([]);
    setIsRunning(false);
  };

  return (
    <div className="flex flex-col h-full bg-black">
      <div className="flex justify-between items-center px-4 py-2 bg-neutral-950 border-b border-outline-variant/30 text-xs text-white/50">
        <span className="font-mono text-primary-fixed uppercase tracking-wider text-[11px] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed-dim inline-block animate-ping"></span>
          CRM_ANALYTICS_PIPELINE
        </span>
        <div className="flex gap-2">
          {logs.length > 0 && !isRunning && (
            <button 
              onClick={resetLogs}
              className="px-2 py-1 bg-white/5 border border-white/10 rounded font-label-md flex items-center gap-1 hover:bg-white/10 hover:text-white transition-all text-[11px] whitespace-nowrap cursor-pointer"
              title="Reset Console"
            >
              <RotateCcw className="w-3.5 h-3.5 text-white/40" />
              Reset
            </button>
          )}
          <button
            onClick={handleRun}
            disabled={isRunning}
            className={`px-3 py-1 rounded font-mono font-medium flex items-center gap-1.5 text-[11px] tracking-wider transition-all shadow-md ${
              isRunning 
                ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-700/50' 
                : 'bg-primary-container text-on-primary hover:scale-[1.03] active:scale-95 cursor-pointer hover:bg-primary-container/80'
            }`}
          >
            {isRunning ? (
              <>
                <div className="w-3 h-3 border-2 border-neutral-500 border-t-transparent rounded-full animate-spin"></div>
                Analyzing...
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                Run Analytics
              </>
            )}
          </button>
        </div>
      </div>
      
      <div className="flex-1 p-4 font-mono text-[12px] overflow-y-auto max-h-[300px] terminal-scroll">
        <pre className="text-[#849581] leading-relaxed select-text whitespace-pre-wrap">
          <span className="text-secondary-fixed">import</span> pandas <span className="text-secondary-fixed">as</span> pd
          <span className="text-secondary-fixed">from</span> sklearn.ensemble <span className="text-secondary-fixed">import</span> RandomForestClassifier
          <span className="text-secondary-fixed">from</span> clickhouse_driver <span className="text-secondary-fixed">import</span> Client

          <span className="text-white/40"># Pull verified CRM profiles</span>
          client = Client(host=<span className="text-primary-fixed">'clickhouse.stamps.io'</span>)
          df = pd.DataFrame(client.execute(<span className="text-primary-fixed">"SELECT * FROM user_metrics"</span>))

          <span className="text-white/40"># Train customer response predictions</span>
          clf = RandomForestClassifier(n_estimators=<span className="text-secondary-fixed">100</span>, max_depth=<span className="text-secondary-fixed">10</span>)
          clf.fit(df[[<span className="text-primary-fixed">'recency'</span>, <span className="text-primary-fixed">'frequency'</span>, <span className="text-primary-fixed">'monetary'</span>]], df[<span className="text-primary-fixed">'is_reengaged'</span>])
        </pre>

        {/* Live Terminal Overlay / Output Panel */}
        {logs.length > 0 && (
          <div className="mt-4 pt-4 border-t border-white/5 font-mono text-[11px]">
            <div className="flex items-center gap-1.5 text-white/40 uppercase text-[9px] tracking-widest mb-2 font-semibold">
              <Terminal className="w-3 h-3" />
              DATAFRAME_AND_MODEL_CONVERGENCE_LOGS
            </div>
            <div className="bg-[#050505] border border-white/10 rounded p-3 text-neutral-300 space-y-1 terminal-scroll select-all">
              {logs.map((log, i) => {
                let textClass = "text-neutral-400";
                if (log.includes("[SUCCESS]")) textClass = "text-primary-fixed";
                if (log.includes("[INFO]")) textClass = "text-secondary-fixed";
                if (log.includes("[STATS]")) textClass = "text-[#c8c6c5]";
                if (log.includes("[EVAL]")) textClass = "text-primary-fixed font-bold bg-primary-fixed/5 px-1 py-0.5 rounded";
                if (log.startsWith("python")) textClass = "text-white font-semibold";
                return (
                  <div key={i} className={`font-mono text-[11px] leading-relaxed ${textClass}`}>
                    {log}
                  </div>
                );
              })}
              {isRunning && (
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-1.5 h-1.5 bg-secondary-fixed-dim rounded-full animate-ping"></span>
                  <span className="text-[10px] text-white/30 animate-pulse font-mono font-medium">Extracting transactional database features...</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
