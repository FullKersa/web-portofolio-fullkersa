import { useState, useEffect, useRef } from 'react';
import { X, Server, Radio, Shield, Zap, Terminal, Activity, Sliders, CheckCircle } from 'lucide-react';

interface DeployModalProps {
  onClose: () => void;
}

export default function DeployModal({ onClose }: DeployModalProps) {
  const [clientName, setClientName] = useState("Burger King");
  const [targetScale, setTargetScale] = useState(400000);
  const [deployStep, setDeployStep] = useState<"idle" | "running" | "completed">("idle");
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [chaosLog, setChaosLog] = useState<string[]>([]);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const chaosEndRef = useRef<HTMLDivElement>(null);

  const deploymentSequence = [
    "⚡ [INIT] Swarming automated query parameters for client: " + clientName + "...",
    "🛡️ [SECURE] Matching secure CRM database credentials via Vault...",
    "🛰️ [QUERY] Sending high-throughput ClickHouse query stream over order transaction tables...",
    "💾 [FEATURE] Extracting RFM segmentation features & cohort clusters...",
    "🖥️ [MODEL] Ingesting features into Scikit-Learn RandomForest classifier...",
    "🐳 [PREDICT] Running recommendation model predictions across target user list...",
    "📦 [VALIDATION] Executing automated data sanity checks (resolving representation errors)...",
    "🔍 [S3_DISPATCH] Packaging secure list data and establishing connection to S3...",
    "🌐 [SUCCESS] Successfully dispatched list file to campaign queue (WhatsApp/Email channels)!",
    "🚀 [LIVE] CRM TARGETED SEGMENT CAMPAIGN DISPATCHED. MONITORING CONVERSIONS."
  ];

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  useEffect(() => {
    if (chaosEndRef.current) {
      chaosEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chaosLog]);

  const startDeployment = () => {
    setDeployStep("running");
    setLogs([]);
    setProgress(0);

    let stepIdx = 0;
    const interval = setInterval(() => {
      if (stepIdx < deploymentSequence.length) {
        setLogs(prev => [...prev, deploymentSequence[stepIdx]]);
        setProgress(Math.round(((stepIdx + 1) / deploymentSequence.length) * 100));
        stepIdx++;
      } else {
        clearInterval(interval);
        setDeployStep("completed");
        setChaosLog([
          `✅ Segment query streams closed. Currently monitoring ${targetScale.toLocaleString()} target CRM customer profiles.`,
          `✅ Deliverability pipeline status: AWS S3 storage buckets are hydrated & ready.`
        ]);
      }
    }, 450);
  };

  const handleChaosEvent = (type: "disconnect" | "latency" | "scale") => {
    const timestamp = () => `[${new Date().toLocaleTimeString()}]`;
    
    if (type === "disconnect") {
      setChaosLog(prev => [
        ...prev,
        `${timestamp()} ⚠️ WARNING: Sentry report: code anomaly detected in S3 reporter module.`,
        `${timestamp()} 🔍 Sentry backtracking pinpointed missing dictionary mapping.`,
        `${timestamp()} ⚙️ Launching Hotfix compiler... Resolving null entries.`,
        `${timestamp()} 🖥️ Successfully corrected and re-aligned 1,000,000+ customer data points!`,
        `${timestamp()} ✅ Hotfix pipeline deployed to production in 150ms. Presentation errors eliminated.`
      ]);
    } else if (type === "latency") {
      setChaosLog(prev => [
        ...prev,
        `${timestamp()} 📡 ALERT: Injecting synthetic latency test across ClickHouse shard nodes.`,
        `${timestamp()} ⚡ Database cluster response time spiked from 2.5ms to 184.2ms.`,
        `${timestamp()} ⚙️ Activating query routing rules: moving analytics queues to backup replication tier...`,
        `${timestamp()} 🔒 Balancing load using optimized ClickHouse indices.`,
        `${timestamp()} ✅ Average database response rate stabilized at 9.8ms. Pipeline preserved.`
      ]);
    } else {
      setTargetScale(prev => prev + 150000);
      setChaosLog(prev => [
        ...prev,
        `${timestamp()} 📈 CRM SCALE EXPANSION: Marketing triggers requested supplemental demographic clusters.`,
        `${timestamp()} 🖥️ Running secondary SQL union joins for broad geography queries...`,
        `${timestamp()} 🐳 Added 150,000 extra users to target campaign files.`,
        `${timestamp()} ✅ Segment hydration completed. Target files compiled with expanded data sizes.`
      ]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0b0c0c] border border-outline-variant/50 w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-surface-container border-b border-outline-variant/30">
          <div className="flex items-center gap-2">
            <Server className="text-primary-fixed w-5 h-5 animate-pulse" />
            <h3 className="font-display text-lg font-semibold text-white tracking-tight flex items-center gap-1.5">
              Stamps CRM Client Pipeline Orchestrator
              <span className="text-xs bg-primary-fixed/15 text-primary-fixed px-2 py-0.5 rounded font-mono font-normal">SIMULATOR</span>
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          {deployStep === "idle" && (
            <div className="space-y-6 text-center max-w-lg mx-auto py-8">
              <div className="w-16 h-16 rounded-full bg-primary-container/10 border border-primary-fixed flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Radio className="text-primary-fixed w-8 h-8" />
              </div>
              <h4 className="font-display text-2xl font-bold text-white tracking-tight">Deploy BI Campaign Segment</h4>
              <p className="font-sans text-on-surface-variant text-sm">
                Formulate live customer rosters using ClickHouse databases, process demographic behavior maps, calculate target campaign weights, and push directly to campaign engines.
              </p>

              {/* Form Options */}
              <div className="grid grid-cols-2 gap-4 text-left pt-4">
                <div>
                  <label className="block text-[11px] font-mono text-white/40 uppercase tracking-widest mb-1.5 font-bold">Select Client Brand</label>
                  <select 
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-[#121414] border border-outline-variant/50 rounded p-2.5 text-xs text-white focus:outline-none focus:border-primary-fixed transition-colors font-mono cursor-pointer"
                  >
                    <option value="Burger King">Burger King (F&B)</option>
                    <option value="Levi's">Levi's (Fashion)</option>
                    <option value="Tim Hortons Singapore">Tim Hortons SG (Retail)</option>
                    <option value="Kawan Lama Group">Kawan Lama Group (Retail)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-white/40 uppercase tracking-widest mb-1.5 font-bold">Target User Shard Size</label>
                  <select 
                    value={targetScale}
                    onChange={(e) => setTargetScale(Number(e.target.value))}
                    className="w-full bg-[#121414] border border-outline-variant/50 rounded p-2.5 text-xs text-white focus:outline-none focus:border-primary-fixed transition-colors font-mono cursor-pointer"
                  >
                    <option value="100000">100k Customer Profiles</option>
                    <option value="300000">300k Customer Profiles</option>
                    <option value="500000">500k Customer Profiles</option>
                    <option value="800000">800k Customer Profiles</option>
                  </select>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={startDeployment}
                  className="w-full bg-primary-container text-on-primary font-mono font-semibold tracking-wider text-xs px-6 py-3 rounded bloom-hover transition-all duration-300 transform active:scale-95 cursor-pointer"
                >
                  INITIALIZE CRM SEGMENT PROCESSING
                </button>
              </div>
            </div>
          )}

          {deployStep === "running" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-primary-fixed animate-pulse">EXTRACTING AND COMPILING TARGET CUSTOMER DATA...</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 w-full bg-neutral-900 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary-fixed transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="bg-black/80 rounded border border-white/5 p-4 h-64 font-mono text-xs overflow-y-auto space-y-1.5 terminal-scroll">
                {logs.map((log, i) => (
                  <div key={i} className="text-neutral-300 whitespace-pre-wrap animate-fade-in font-mono">
                    {log}
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>
            </div>
          )}

          {deployStep === "completed" && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Left column: stats and chaos engineering */}
              <div className="md:col-span-5 space-y-6">
                <div className="glass-card rounded-lg p-5 border border-primary-fixed/20 bg-primary-fixed/5 text-center flex flex-col items-center justify-center space-y-2">
                  <CheckCircle className="text-primary-fixed w-10 h-10 animate-bounce" />
                  <h4 className="font-display text-lg font-bold text-white">Segment Processing Complete</h4>
                  <p className="font-mono text-xs text-primary-fixed-dim">All pipeline metrics report nominal accuracy</p>
                  
                  <div className="grid grid-cols-2 gap-4 w-full pt-4 text-left">
                    <div className="bg-black p-2 border border-outline-variant/30 rounded">
                      <div className="text-[9px] text-white/40 font-mono">COMPILED PROFILES</div>
                      <div className="text-sm font-mono text-white font-semibold">{targetScale.toLocaleString()}</div>
                    </div>
                    <div className="bg-black p-2 border border-outline-variant/30 rounded">
                      <div className="text-[9px] text-white/40 font-mono">CLIENT SOURCE</div>
                      <div className="text-sm font-mono text-white font-semibold uppercase truncate">{clientName.split(' ')[0]}</div>
                    </div>
                  </div>
                </div>

                {/* Operations sandbox */}
                <div className="glass-card rounded-lg p-5 border border-white/5 space-y-4">
                  <h5 className="font-mono text-[10px] text-white/40 tracking-widest uppercase flex items-center gap-1.5 font-bold">
                    <Sliders className="w-3.5 h-3.5 text-secondary-fixed" />
                    Interactive Pipeline Controls
                  </h5>
                  <p className="font-sans text-xs text-on-surface-variant">
                    Inject mock operational scenarios and check how Bintang's automated validation algorithms handle failures in real-time.
                  </p>

                  <div className="space-y-2 pt-2 col-span-12">
                    <button 
                      onClick={() => handleChaosEvent("disconnect")}
                      className="w-full bg-red-950/20 hover:bg-red-950/45 border border-red-900/60 text-red-100 font-mono text-[11px] py-2 rounded text-left px-3 transition-colors flex justify-between items-center active:scale-95 duration-100 cursor-pointer"
                    >
                      <span>Simulate Code Sentry Check & Patch</span>
                      <span className="text-[9px] bg-red-950 px-1.5 py-0.5 rounded text-red-300 font-bold uppercase whitespace-nowrap">Resolve 1M Errors</span>
                    </button>

                    <button 
                      onClick={() => handleChaosEvent("latency")}
                      className="w-full bg-[#00363a]/20 hover:bg-[#00363a]/45 border border-[#00686f]/60 text-secondary-fixed font-mono text-[11px] py-2 rounded text-left px-3 transition-colors flex justify-between items-center active:scale-95 duration-100 cursor-pointer"
                    >
                      <span>Induce Database Stress (Latency)</span>
                      <span className="text-[9px] bg-[#00363a] px-1.5 py-0.5 rounded text-secondary-fixed-dim font-bold uppercase whitespace-nowrap">Check Failover</span>
                    </button>

                    <button 
                      onClick={() => handleChaosEvent("scale")}
                      className="w-full bg-green-950/20 hover:bg-green-950/45 border border-green-900/60 text-primary-fixed font-mono text-[11px] py-2 rounded text-left px-3 transition-colors flex justify-between items-center active:scale-95 duration-100 cursor-pointer"
                    >
                      <span>Expand Campaign Cluster Size</span>
                      <span className="text-[9px] bg-green-950 px-1.5 py-0.5 rounded text-primary-fixed-dim font-bold uppercase whitespace-nowrap">+150k profiles</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right column: live console of events */}
              <div className="md:col-span-7 flex flex-col h-[380px] bg-black border border-white/5 rounded-lg overflow-hidden">
                <div className="px-4 py-2 bg-neutral-950 border-b border-white/5 text-[10px] text-white/50 font-mono flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-primary-fixed" />
                    LIVE_PIPELINE_METRIC_FEED
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary-fixed animate-ping"></span>
                    <span className="text-[9px] text-primary-fixed font-bold uppercase">Connected</span>
                  </div>
                </div>
                <div className="flex-1 p-4 overflow-y-auto space-y-1.5 terminal-scroll font-mono text-[11px] bg-[#030303] text-neutral-300">
                  {chaosLog.map((log, i) => {
                    let color = "text-neutral-400";
                    if (log.includes("⚠️ WARNING") || log.includes("ALERT")) color = "text-red-400";
                    if (log.includes("✅ Sentry Hotfix") || log.includes("✅ Average database") || log.includes("✅ Segment hydration")) color = "text-primary-fixed font-bold";
                    if (log.includes("✅")) color = "text-primary-fixed";
                    return (
                      <div key={i} className={`whitespace-pre-wrap leading-relaxed animate-fade-in font-mono ${color}`}>
                        {log}
                      </div>
                    );
                  })}
                  <div ref={chaosEndRef} />
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 bg-surface-container border-t border-outline-variant/30 flex justify-end gap-3">
          {deployStep === "completed" && (
            <button
              onClick={() => {
                setDeployStep("idle");
              }}
              className="px-4 py-2 border border-outline-variant/50 font-mono text-[11px] text-white hover:bg-white/5 transition-colors rounded cursor-pointer"
            >
              Reset Target Segments
            </button>
          )}
          <button
            onClick={onClose}
            className="bg-neutral-800 text-white font-mono hover:bg-neutral-700 text-xs px-5 py-2.5 rounded transition-all active:scale-95 cursor-pointer"
          >
            Close Orchestration Stream
          </button>
        </div>

      </div>
    </div>
  );
}
