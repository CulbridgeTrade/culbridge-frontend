import Link from "next/link";

function CulbridgeLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lg-hero" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F7911E" />
          <stop offset="100%" stopColor="#9C9DA1" />
        </linearGradient>
      </defs>
      <path d='M6 22 C6 14, 14 10, 22 14 C30 10, 38 14, 38 22'
        stroke="url(#lg-hero)" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d='M6 22 C6 30, 14 34, 22 30 C30 34, 38 30, 38 22'
        stroke="url(#lg-hero)" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="22" cy="22" r="2.8" fill="#F7911E" />
      <line x1="22" y1="13" x2="22" y2="31" stroke="#F7911E" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
    </svg>
  );
}

const commodities = [
  { name: "Sesame", hsCode: "1207.40", focus: "MRL validation, Salmonella screening flags, NVWA enhanced category", icon: "🌿" },
  { name: "Cocoa", hsCode: "1801.00", focus: "Cadmium & pesticide residue, ICCO compliance, EU Farm-to-Fork", icon: "🍫" },
  { name: "Ginger", hsCode: "0910.11", focus: "Aflatoxin limits, EU Novel Food check, BVL residue rules", icon: "🫚" },
  { name: "Groundnuts", hsCode: "1202.41", focus: "Aflatoxin B1 threshold, NVWA high-risk categorisation, lot traceability", icon: "🥜" },
  { name: "Shea Butter", hsCode: "1515.90", focus: "Cosmetic vs food grade, EU Novel Food status, contaminant screens", icon: "🧈" },
  { name: "Cashew", hsCode: "0801.31", focus: "Aflatoxin & ochratoxin, processing state classification, destination rules", icon: "🌰" },
];

const steps = [
  { n: "01", t: "Document Parsing & Ingestion", d: "Upload export documents (phytosanitary certificates, test reports, NEPC certificates, packing lists). Uses OCR validation to extract data." },
  { n: "02", t: "Commodity & HS Code Normalisation", d: "Maps data to current EU regulatory frameworks including MRL thresholds (EFSA), NVWA requirements, and BVL rules." },
  { n: "03", t: "Multi-Layer Compliance Validation", d: "Validates against four modules: pesticide residue, certificate authenticity/expiry, destination-specific rules, and RASFF cross-referencing." },
  { n: "04", t: "Decision Report with Executable Actions", d: "Provides a confidence-scored report (Cleared / Action Required / Do Not Ship) with specific corrective actions." },
];

const risks = [
  { v: "72h", l: "Average time before a rejected shipment is ordered destroyed at an EU port." },
  { v: "€40K+", l: "Estimated total loss per rejected container (including destruction costs)." },
  { v: "3–6 Mo", l: "Amount of profit margin a single rejected container can wipe out." },
  { v: "2 Yrs", l: "Duration of enhanced border scrutiny/blacklisting after a violation record." },
];

const checks = [
  { c: "MRL Residue Levels (EFSA)", s: "COMPLIANT", ok: true },
  { c: "NAQS Phytosanitary Certificate", s: "VALID", ok: true },
  { c: "NVWA Import Notification", s: "ACTION NEEDED", ok: false },
  { c: "NEPC Export Certificate", s: "VERIFIED", ok: true },
  { c: "HS Code Classification", s: "MATCHED", ok: true },
];

const auths = [
  { n: "NAQS", r: "Phytosanitary certificates", f: "🇳🇬" },
  { n: "NEPC", r: "Export certificates", f: "🇳🇬" },
  { n: "NAFDAC", r: "Food safety", f: "🇳🇬" },
  { n: "NVWA", r: "Dutch import requirements", f: "🇳🇱" },
  { n: "BVL", r: "German MRL enforcement", f: "🇩🇪" },
  { n: "EFSA / RASFF", r: "EU-wide alerts & MRLs", f: "🇪🇺" },
];

function StatusPill({ s, ok }: { s: string; ok: boolean }) {
  return (
    <span className={`px-2.5 py-0.5 rounded text-xs font-semibold border ${ok ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"}`}>
      {s}
    </span>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A1338] text-white font-sans selection:bg-[#F59E0B]/30">
      {/* Header */}
      <header className="border-b border-white/5 backdrop-blur-sm sticky top-0 z-50 bg-[#0A1338]/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2.5">
              <CulbridgeLogo size={28} />
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight leading-none"><span className="text-white">Cul</span><span className="text-[#F59E0B]">bridge</span></span>
                <span className="text-[9px] font-bold tracking-[0.15em] text-slate-500 uppercase leading-none mt-0.5">Export Compliance</span>
              </div>
            </div>
            <nav className="flex items-center gap-3">
              <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition px-3 py-2">Login</Link>
              <Link href="/signup" className="rounded-lg bg-[#F59E0B] px-5 py-2.5 text-sm font-bold text-[#0A1338] hover:bg-[#D97706] transition shadow-lg shadow-[#F59E0B]/20">Get started →</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(245,158,11,0.08)_0%,_transparent_50%)]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-[#F59E0B] text-xs font-bold tracking-wider uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
              Validation Engine v1.0 Live
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
              Stop export shipment<br />losses to <span className="text-[#F59E0B]">Europe.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl leading-relaxed">
              Culbridge validates compliance <em>before</em> the shipment leaves Nigeria so you <strong className="text-white">arrive, not get turned away.</strong>
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/signup" className="rounded-xl bg-[#F59E0B] px-8 py-4 text-base font-bold text-[#0A1338] hover:bg-[#D97706] transition shadow-xl shadow-[#F59E0B]/20">Run EU Compliance Check →</Link>
              <Link href="/login" className="rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition backdrop-blur-sm">Emergency Shipment Check</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Commodities */}
      <section className="py-20 border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Supported Commodities & Regulatory Data</h2>
          <p className="text-slate-400 mb-8">Six core commodities mapped to EU compliance frameworks.</p>
          <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#0d1642]">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-white/10 text-left text-xs font-bold tracking-wider uppercase text-slate-500"><th className="px-6 py-4">Commodity</th><th className="px-6 py-4">HS Code</th><th className="px-6 py-4">Key Compliance Focus Areas</th></tr></thead>
              <tbody className="divide-y divide-white/5">
                {commodities.map(c => (
                  <tr key={c.name} className="hover:bg-white/[0.02] transition">
                    <td className="px-6 py-4 font-semibold text-white flex items-center gap-2"><span className="text-lg">{c.icon}</span> {c.name}</td>
                    <td className="px-6 py-4 font-mono text-[#F59E0B]">{c.hsCode}</td>
                    <td className="px-6 py-4 text-slate-400">{c.focus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Four Steps */}
      <section className="py-20 border-t border-white/5 bg-[#070d28]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">The &ldquo;Four-Step Validation&rdquo; Process</h2>
          <p className="text-slate-400 mb-8">From document upload to executable decision report.</p>
          <div className="relative">
            <div className="absolute left-[19px] top-8 bottom-8 w-px bg-gradient-to-b from-[#F59E0B]/50 via-[#F59E0B]/20 to-transparent hidden sm:block" />
            <div className="space-y-8">
              {steps.map(s => (
                <div key={s.n} className="relative flex gap-6 sm:gap-8">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B] font-bold text-sm z-10">{s.n}</div>
                  <div className="pb-2">
                    <h3 className="text-lg font-bold text-white">{s.t}</h3>
                    <p className="mt-1 text-slate-400 leading-relaxed max-w-2xl">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Regulatory */}
      <section className="py-20 border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Regulatory & Geographic Coverage</h2>
          <p className="text-slate-400 mb-8">Nigeria → European Union trade corridor compliance.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-xl border border-white/10 bg-[#0d1642] p-6">
              <h3 className="text-sm font-bold tracking-wider uppercase text-slate-500 mb-4">Market Corridor</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10"><span className="text-lg">🇳🇬</span><span className="font-semibold">Nigeria (NG)</span></div>
                <span className="text-[#F59E0B] text-xl">→</span>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10"><span className="text-lg">🇪🇺</span><span className="font-semibold">European Union (EU)</span></div>
              </div>
              <p className="text-sm text-slate-400">Specific focus: Nigeria-Netherlands-Germany agricultural trade route.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#0d1642] p-6">
              <h3 className="text-sm font-bold tracking-wider uppercase text-slate-500 mb-4">Authorities & Frameworks</h3>
              <div className="grid grid-cols-2 gap-3">
                {auths.map(a => (
                  <div key={a.n} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/5">
                    <span>{a.f}</span>
                    <div><div className="text-sm font-semibold">{a.n}</div><div className="text-[11px] text-slate-500">{a.r}</div></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Risk */}
      <section className="py-20 border-t border-white/5 bg-[#070d28]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Risk Assessment & Financial Impact</h2>
          <p className="text-slate-400 mb-8">The high stakes of non-compliance at EU borders.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {risks.map(r => (
              <div key={r.v} className="rounded-xl border border-white/10 bg-[#0d1642] p-6 hover:border-[#F59E0B]/30 transition">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#F59E0B] tracking-tight">{r.v}</div>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">{r.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Endpoints */}
      <section className="py-20 border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Technical API Endpoints</h2>
          <p className="text-slate-400 mb-8">RESTful endpoints for pre-shipment and crisis validation.</p>
          <div className="space-y-6">
            {[
              { m: "POST", p: "/api/v1/validate", d: "Pre-shipment validation.", tags: ["PRE-SHIPMENT", "NVWA", "MRL CHECK", "NEPC"] },
              { m: "POST", p: "/api/v1/emergency-check", d: "Crisis response for shipments in transit or held at port (60-second triage).", tags: ["IN-TRANSIT", "PORT HOLD", "RASFF ALERT", "CRISIS"] },
            ].map(api => (
              <div key={api.p} className="rounded-xl border border-white/10 bg-[#0d1642] overflow-hidden">
                <div className="px-6 py-4 border-b border-white/5 flex flex-wrap items-center gap-3">
                  <span className="px-2.5 py-1 rounded bg-[#F59E0B]/10 text-[#F59E0B] text-xs font-bold">{api.m}</span>
                  <code className="text-sm font-mono text-white">{api.p}</code>
                </div>
                <div className="px-6 py-4">
                  <p className="text-sm text-slate-400 mb-3">{api.d}</p>
                  <div className="flex flex-wrap gap-2">
                    {api.tags.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-[#1a2450] text-slate-400 border border-[#2a3460]">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-20 border-t border-white/5 bg-[#070d28]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">Core System Guarantees</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { t: "Status Always Returned", d: "Never null. Every validation produces a definitive Cleared, Action Required, or Do Not Ship status." },
              { t: "Reasons Tied to Findings", d: "Every status is backed by specific, auditable compliance findings with traceable evidence." },
              { t: "Actions Immediately Executable", d: "Corrective actions are concrete, prioritized, and ready to implement without interpretation." },
              { t: "Confidence Gate at 0.85", d: "Manual review escalation enforced if confidence score falls below the 0.85 threshold." },
            ].map(g => (
              <div key={g.t} className="flex gap-4 p-5 rounded-xl border border-white/10 bg-[#0d1642]">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm">✓</div>
                <div><h3 className="font-bold text-white">{g.t}</h3><p className="mt-1 text-sm text-slate-400 leading-relaxed">{g.d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance + Sample Report */}
      <section className="py-20 border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">Performance Metrics</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-[#0d1642]"><span className="text-slate-400">Validation Modules</span><span className="text-xl font-bold text-white">4+ Active</span></div>
                <div className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-[#0d1642]"><span className="text-slate-400">Crisis Response</span><span className="text-xl font-bold text-white">60s</span></div>
                <div className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-[#0d1642]"><span className="text-slate-400">Compliance Threshold</span><span className="text-xl font-bold text-[#F59E0B]">0.85</span></div>
                <div className="p-4 rounded-xl border border-[#F59E0B]/20 bg-[#F59E0B]/5">
                  <div className="flex items-center justify-between mb-2"><span className="text-sm font-semibold text-[#F59E0B]">Live Case: Sesame Batch #NG-2024-1187</span><StatusPill s="Cleared" ok={true} /></div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-[#F59E0B] to-[#D97706] w-[91%]" /></div>
                    <span className="text-sm font-bold text-white">0.91</span>
                  </div>
                  <p className="mt-2 text-xs text-slate-400">1 action item before shipment.</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">Sample Validation Report</h2>
              <div className="rounded-xl border border-white/10 bg-[#0d1642] overflow-hidden">
                <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" /><div className="w-3 h-3 rounded-full bg-yellow-500/80" /><div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-xs text-slate-500 font-mono">Validation Engine v1.0</span>
                </div>
                <div className="p-5 space-y-3">
                  {checks.map(item => (
                    <div key={item.c} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                      <div className="flex items-center gap-3">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${item.ok ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}`}>{item.ok ? "✓" : "!"}</span>
                        <span className="text-sm text-slate-300">{item.c}</span>
                      </div>
                      <StatusPill s={item.s} ok={item.ok} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 border-t border-white/5 bg-[#070d28]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">The Problem: The High Cost of Non-Compliance</h2>
            <div className="space-y-6 text-slate-400 leading-relaxed">
              <p>The platform frames its value proposition against <strong className="text-white">stricter and faster</strong> EU border enforcement. A widening gap exists between local Nigerian standards and EU requirements.</p>
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6">
                <h3 className="text-lg font-bold text-red-400 mb-2">The &ldquo;Bounce Back&rdquo; Myth</h3>
                <p>Shipments rejected at major ports like <strong className="text-white">Rotterdam</strong> or <strong className="text-white">Hamburg</strong> don&apos;t just return; they trigger <strong className="text-white">RASFF alerts</strong>.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg border border-white/10 bg-[#0d1642]"><div className="text-2xl font-bold text-red-400 mb-1">27</div><div className="text-sm text-slate-400">EU member states flagged simultaneously</div></div>
                <div className="p-4 rounded-lg border border-white/10 bg-[#0d1642]"><div className="text-2xl font-bold text-red-400 mb-1">∞</div><div className="text-sm text-slate-400">Future market access destroyed</div></div>
                <div className="p-4 rounded-lg border border-white/10 bg-[#0d1642]"><div className="text-2xl font-bold text-red-400 mb-1">€Ms</div><div className="text-sm text-slate-400">Costing Nigerian exporters millions</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Ready to ship with confidence?</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">Create your account and run your first compliance check in under a minute. No KYB gate at entry.</p>
          <Link href="/signup" className="inline-block rounded-xl bg-[#F59E0B] px-8 py-4 text-base font-bold text-[#0A1338] hover:bg-[#D97706] transition shadow-xl shadow-[#F59E0B]/20">Create Free Account →</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#070d28]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <CulbridgeLogo size={20} />
              <span className="font-bold"><span className="text-white">Cul</span><span className="text-[#F59E0B]">bridge</span></span>
            </div>
            <p className="text-sm text-slate-500">© 2026 Culbridge Export Compliance. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

