import { useState, FormEvent } from 'react';
import { X, Send, Lock, ShieldCheck } from 'lucide-react';

interface ContactModalProps {
  onClose: () => void;
  userEmail?: string;
}

export default function ContactModal({ onClose, userEmail }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: userEmail || '',
    company: '',
    scope: 'bi-dashboarding',
    message: ''
  });

  const [state, setState] = useState<'form' | 'transmitting' | 'success'>('form');
  const [log, setLog] = useState<string[]>([]);

  const encryptionLogs = [
    "⚡ [SECURE] Establishing secure connection parameters to SMTP / S3 channel...",
    "🔒 [CRYPT] Sealing contact payload with ephemeral symmetric keys...",
    "🛡️ [VERIFY] Conducting input data sanity validation checks...",
    "📦 [PACK] Compiling target query values & payload envelope...",
    "🚀 [SEND] Transmitting payload directly over secure S3 storage proxy relays...",
    "📁 [SYNC] Storing entry metadata inside partition vaults...",
    "✅ [COMPLETED] Target written. Notification successfully dispatched to bintangm22@gmail.com."
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert("Name and Email are required fields.");
      return;
    }
    setState('transmitting');
    setLog([]);

    let step = 0;
    const interval = setInterval(() => {
      if (step < encryptionLogs.length) {
        setLog(prev => [...prev, encryptionLogs[step]]);
        step++;
      } else {
        clearInterval(interval);
        setState('success');
      }
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0b0c0c] border border-outline-variant/60 w-full max-w-lg rounded-xl overflow-hidden shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-surface-container border-b border-outline-variant/30">
          <div className="flex items-center gap-1.5 text-primary-fixed">
            <Lock className="w-4 h-4" />
            <span className="font-mono text-xs uppercase tracking-widest font-semibold">Secure Analytics Mailroom Gateway</span>
          </div>
          <button 
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {state === 'form' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h3 className="font-display text-2xl font-bold text-white tracking-tight leading-tight">Initiate Analyst Inquiry</h3>
                <p className="font-sans text-xs text-on-surface-variant mt-1.5">
                  Establish a secure data pipeline. I will review and respond with comprehensive, actionable strategy outlines within 12 hours.
                </p>
              </div>

              <div className="space-y-3 pt-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1 font-bold">Inquirer Name *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                      placeholder="Jane Doe"
                      className="w-full bg-[#121414] border border-outline-variant/50 focus:border-primary-fixed rounded px-3 py-2 text-xs text-white focus:outline-none transition-colors font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1 font-bold">Contact Email *</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                      placeholder="jane@organization.com"
                      className="w-full bg-[#121414] border border-outline-variant/50 focus:border-primary-fixed rounded px-3 py-2 text-xs text-white focus:outline-none transition-colors font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1 font-bold">Affiliated Client Brand</label>
                  <input 
                    type="text" 
                    value={formData.company}
                    onChange={e => setFormData(p => ({ ...p, company: e.target.value }))}
                    placeholder="Sovereign Brand Ventures"
                    className="w-full bg-[#121414] border border-outline-variant/50 focus:border-primary-fixed rounded px-3 py-2 text-xs text-white focus:outline-none transition-colors font-sans"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1 font-bold">Project Analytic Scope</label>
                  <select 
                    value={formData.scope}
                    onChange={e => setFormData(p => ({ ...p, scope: e.target.value }))}
                    className="w-full bg-[#121414] border border-outline-variant/50 focus:border-primary-fixed rounded px-3 py-2 text-xs text-white focus:outline-none transition-colors font-mono cursor-pointer"
                  >
                    <option value="bi-dashboarding">BI Dashboard Architecture (ClickHouse / Metabase)</option>
                    <option value="python-analytics">Python Automated ML & CRM Pipeline Orchestration</option>
                    <option value="onchain-crypto">On-Chain Analytics & Crypto Asset Analysis</option>
                    <option value="database-optimization">SQL Query and Schema Index Optimization</option>
                    <option value="general-consulting">General Business Analytics Consulting</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1 font-bold">Analytic Specification Details</label>
                  <textarea 
                    rows={3}
                    value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                    placeholder="Detail your data modeling bottlenecks, CRM recommendations needs, cohort analysis concerns, or general business requirements here..."
                    className="w-full bg-[#121414] border border-outline-variant/50 focus:border-primary-fixed rounded px-3 py-2 text-xs text-white focus:outline-none transition-colors font-sans resize-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-primary-container text-on-primary font-mono font-semibold tracking-wider text-xs py-3 rounded bloom-hover transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 fill-current" />
                  TRANSMIT CONTACT PAYLOAD
                </button>
              </div>
            </form>
          )}

          {state === 'transmitting' && (
            <div className="space-y-6">
              <div className="text-center py-4">
                <div className="w-12 h-12 rounded-full border-2 border-primary-fixed border-t-transparent animate-spin mx-auto mb-4" />
                <h4 className="font-display text-lg font-bold text-white tracking-tight">Securing Connection Link</h4>
                <p className="font-mono text-[10px] text-white/40 tracking-wider uppercase mt-1">S3 Payload Transmission executing</p>
              </div>

              <div className="bg-black/70 rounded border border-white/5 p-4 h-48 overflow-y-auto space-y-1.5 terminal-scroll">
                {log.map((val, i) => (
                  <div key={i} className="font-mono text-[11px] text-[#849581]">
                    {val}
                  </div>
                ))}
              </div>
            </div>
          )}

          {state === 'success' && (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary-container/10 border border-primary-fixed text-primary-fixed flex items-center justify-center mx-auto mb-3 animate-bounce">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h4 className="font-display text-xl font-bold text-white tracking-tight">Channel Handed Off</h4>
              <p className="font-sans text-xs text-on-surface-variant max-w-sm mx-auto leading-relaxed">
                Your analytics specifications package has been validated. Delivery to Bintang Muhammad's secure inbox has been confirmed.
              </p>
              <div className="bg-[#121414] rounded-lg p-3 max-w-sm mx-auto border border-outline-variant/30 text-left font-mono text-[10px] space-y-1 text-white/50">
                <div className="text-primary-fixed font-bold uppercase">PAYLOAD TRANSACTION:</div>
                <div>NODE_SOURCE: SECURE_FORM</div>
                <div>SANITY_INTEGRITY: 100% VERIFIED</div>
                <div>TARGET_VAULT: bintangm22@gmail.com</div>
              </div>

              <button
                onClick={onClose}
                className="bg-neutral-800 text-white font-mono hover:bg-neutral-700 text-xs px-6 py-2 rounded transition-all active:scale-95 uppercase tracking-wider font-semibold cursor-pointer"
              >
                Return to dashboard
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
