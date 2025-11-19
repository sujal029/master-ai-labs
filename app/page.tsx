"use client";
import React, { useMemo, useState } from "react";
import {
  Bot,
  Phone,
  MessageSquare,
  Megaphone,
  CheckCircle2,
  ClipboardList,
  GaugeCircle,
  Shield,
  Rocket,
  Building2,
  Factory,
  Stethoscope,
  GraduationCap,
  Building,
  LineChart,
  Headset,
  Zap,
  ChevronRight,
  Database,
  Clock,
} from "lucide-react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
  useAnimationFrame,
} from "framer-motion";

// ---------------------------------------------------------------------------
// HJYNEX — Single-file React landing page (Next.js App Router / React SPA)
// TailwindCSS + Framer Motion + Lucide icons
// ---------------------------------------------------------------------------

// ===== Brand & Contact =====
const BRAND = "HJYNEX";
const PHONE = "+919993891875"; // WhatsApp / phone CTA

// ===== Solutions (cards) =====
const SOLUTIONS = [
  {
    title: "Custom AI Development",
    desc: "Tailored AI apps & internal tools built around your process — from planning to deployment.",
    bullets: ["AI Readiness Assessment", "Technology Roadmap", "ROI Analysis", "Implementation Planning"],
    icon: Rocket,
  },
  {
    title: "Business Process Automation",
    desc: "Automate repetitive ops, integrate tools and orchestrate workflows for measurable efficiency.",
    bullets: ["Process Analysis", "Workflow Design", "Integrations", "Performance Monitoring"],
    icon: GaugeCircle,
  },
  {
    title: "AI‑Powered Chatbots",
    desc: "Omnichannel chat/voice agents for enquiries, support and intake that qualify serious buyers.",
    bullets: ["Custom Chatbot", "Multi‑channel", "Analytics & Insights", "24/7 Availability"],
    icon: MessageSquare,
  },
  {
    title: "Machine Learning Models",
    desc: "Predictive models that learn from your data to forecast, detect patterns and optimize decisions.",
    bullets: ["Predictive Analytics", "Pattern Recognition", "Decision Automation", "Model Optimization"],
    icon: LineChart,
  },
  {
    title: "Intelligent Document Processing",
    desc: "AI pipelines to extract, validate and push structured data from invoices, POs, KYC and more.",
    bullets: ["High‑accuracy OCR", "Validation Rules", "ERP/CRM Sync", "Audit Logs"],
    icon: ClipboardList,
  },
  {
    title: "AI Data Analytics",
    desc: "Transform raw business data into dashboards & automated insights for faster decisions.",
    bullets: ["Data Mining", "Business Intelligence", "Custom Dashboards", "Automated Reports"],
    icon: Database,
  },
  {
    title: "AI System Integration",
    desc: "Seamlessly integrate AI into existing systems and modernize legacy workflows.",
    bullets: ["API Development", "System Integration", "Legacy System Modernization", "Cloud Migration"],
    icon: Building2,
  },
  {
    title: "AI Performance Optimization",
    desc: "Monitor, tune and scale AI systems to cut cost and maximize business impact.",
    bullets: ["Performance Monitoring", "Model Optimization", "Cost Reduction", "Scalability Planning"],
    icon: GaugeCircle,
  },
];

// ===== 9 Core Services (money stack) =====
const SERVICES = [
  {
    id: 1,
    title: "AI Voice Receptionist (24×7)",
    tagline: "Never miss a paying lead again.",
    desc: "Instant call pickup in natural voice. Captures name, requirement, quantity, city and pushes a clean summary to WhatsApp/Email.",
    icon: Phone,
    badge: "#1 Bestseller",
    audience: ["Industrial", "Clinic", "Real Estate", "Coaching", "D2C"],
  },
  {
    id: 2,
    title: "WhatsApp Enquiry Bot + Auto Follow-up",
    tagline: "Reply first. Convert more.",
    desc: "Auto-replies to ‘price?/fees?/availability?’ and collects lead details, then politely follows up to book a call/visit.",
    icon: MessageSquare,
    audience: ["Clinic", "Coaching", "Real Estate", "D2C"],
  },
  {
    id: 3,
    title: "High‑Intent Buyer Lists (B2B)",
    tagline: "Purchase manager contacts that actually buy.",
    desc: "Verified decision-makers with phone, email, capacity, and product fit. Built for LDO/MTO/Bitumen, machines, logistics, scrap, etc.",
    icon: ClipboardList,
    audience: ["Industrial", "Logistics"],
  },
  {
    id: 4,
    title: "Sales Follow‑up & Accountability",
    tagline: "Daily truth for the owner.",
    desc: "Tracks who followed up, who didn’t, and which deals are stuck. Sends one WhatsApp digest every evening to the boss.",
    icon: LineChart,
    audience: ["Industrial", "Coaching", "Real Estate", "Staffing"],
  },
  {
    id: 5,
    title: "Compliance & Penalty Protection",
    tagline: "No fines. No surprises.",
    desc: "Calendar + alerts for GST, Pollution NOC, RERA, clinic certs, tanker calibration and more — before the deadline.",
    icon: Shield,
    audience: ["Industrial", "Construction", "Clinic", "Real Estate"],
  },
  {
    id: 6,
    title: "Vertical Intake Agents",
    tagline: "Admissions / Patients / Property buyers.",
    desc: "Industry‑tailored agents that qualify serious prospects: budget, location, timeline, loan-ready, symptoms, batch, etc.",
    icon: Headset,
    audience: ["Coaching", "Clinic", "Real Estate"],
  },
  {
    id: 7,
    title: "Reputation + Content Pack",
    tagline: "Look premium online. Get more trust.",
    desc: "Monthly content calendar, reel scripts, polite complaint handling and 5★ review harvesting that actually shows up.",
    icon: Rocket,
    audience: ["Clinic", "Coaching", "Real Estate", "D2C"],
  },
  {
    id: 8,
    title: "Enterprise AI Operations Officer",
    tagline: "Your 24×7 digital COO.",
    desc: "One AI brain across sales, recovery, dispatch, compliance & stock — reports directly to the MD with a daily truth brief.",
    icon: Bot,
    badge: "Enterprise",
    audience: ["Industrial", "Logistics", "Construction", "Multi‑branch"],
  },
  {
    id: 9,
    title: "AI Ad Engine (Paid Ads + Instant AI Follow‑up)",
    tagline: "Ads that generate warmed leads, not screenshots.",
    desc: "AI‑written creatives, smarter targeting and instant AI capture/qualification on WhatsApp/call — you get only serious leads.",
    icon: Megaphone,
    audience: ["Clinic", "Coaching", "Real Estate", "D2C", "Industrial"],
  },
];

// Industry badges
const INDUSTRY_ICONS = [
  { name: "Industrial", icon: Factory },
  { name: "Real Estate", icon: Building },
  { name: "Clinic", icon: Stethoscope },
  { name: "Coaching", icon: GraduationCap },
  { name: "Logistics", icon: TruckIcon },
];

// Fallback Truck icon (lucide-react has Truck but we alias in case env differs)
function TruckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 17h4" />
      <path d="M4 17h2a2 2 0 1 0 4 0h4a2 2 0 1 0 4 0h2v-6h-3l-3-4H4z" />
    </svg>
  );
}

// ========================= Page =========================
export default function HJYNEXLanding() {
  const [selected, setSelected] = useState<number[]>([]);

  // Lead form modal state (SINGLE declaration — do not duplicate)
  const [isLeadOpen, setLeadOpen] = useState(false);
  const [lead, setLead] = useState({ service: "", name: "", company: "", email: "", phone: "", city: "" });

  const openLeadForm = (service = "") => {
    setLead((l) => ({ ...l, service }));
    setLeadOpen(true);
  };

  const handleLeadSubmit = () => {
    const { name, company, email, phone, city, service } = lead;
    const msg = `New lead via site\nService: ${service || "General"}\nName: ${name}\nCompany: ${company}\nCity: ${city}\nEmail: ${email}\nPhone: ${phone}`;
    const url = `https://wa.me/${PHONE.replace("+", "")}?text=${encodeURIComponent(msg)}`;
    if (typeof window !== "undefined") window.open(url, "_blank");
    setLeadOpen(false);
  };

  // WhatsApp CTAs
  const selectedServicesText = useMemo(() => {
    const names = SERVICES.filter((s) => selected.includes(s.id)).map((s) => s.title);
    return names.length ? names.join(", ") : "General enquiry";
  }, [selected]);

  const openWhatsApp = () => {
    const msg = `Hi, I'm interested in: ${selectedServicesText}. My name is ____ from ____ (city). Please contact me.`;
    const url = `https://wa.me/${PHONE.replace("+", "")}?text=${encodeURIComponent(msg)}`;
    if (typeof window !== "undefined") window.open(url, "_blank");
  };

  const openWhatsAppWith = (topic: string) => {
    const msg = `Hi ${BRAND}, I'm interested in ${topic}. My name is ____ from ____ (city). Please contact me.`;
    const url = `https://wa.me/${PHONE.replace("+", "")}?text=${encodeURIComponent(msg)}`;
    if (typeof window !== "undefined") window.open(url, "_blank");
  };

  const toggle = (id: number) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">
      <BackgroundDecor />
      <LiveScrollOrb />
      <Navbar onCta={openWhatsApp} />

      {/* Modal */}
      <LeadFormModal
        open={isLeadOpen}
        lead={lead}
        setLead={setLead}
        onClose={() => setLeadOpen(false)}
        onSubmit={handleLeadSubmit}
      />

      <Hero onCta={openWhatsApp} />
      <TrustedBar />

      <Section id="solutions" title="AI Services & Solutions" subtitle="From strategy to automation — production‑ready systems that ship and scale.">
        <PillBar />
        {/* Learn More opens the LEAD FORM */}
        <SolutionsGrid onLearn={openLeadForm} />
      </Section>

      <Section id="why-partner" title="Why Partner with Our AI Automation Agency?" subtitle="We specialize exclusively in AI automation, bringing deep expertise in ML, NLP and business process optimization.">
        <WhyPartner />
      </Section>

      <Section id="services" title="Our 9 Revenue Systems" subtitle="Proven, revenue‑focused services you can switch on in days.">
        <ServicesGrid selected={selected} toggle={toggle} />
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <button onClick={openWhatsApp} className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 backdrop-blur hover:bg-white/20">
            <Zap className="h-5 w-5" /> Get a tailored plan on WhatsApp
          </button>
          <span className="text-sm text-neutral-400">Tell us your industry — we’ll recommend a 2‑service starter to go live in 5 days.</span>
        </div>
      </Section>

      <Section id="industries" title="Designed for Indian Businesses" subtitle="We speak operations, not buzzwords.">
        <IndustryBands />
      </Section>

      <Section id="about" title={`About ${BRAND}`} subtitle="We’re a specialized AI automation company focused on tangible business outcomes.">
        <AboutBlock />
      </Section>

      <Section id="cases" title="Case Studies" subtitle="A peek into the type of wins we engineer.">
        <CaseStudies onCtaWith={openWhatsAppWith} />
      </Section>

      <Section id="pricing" title="Simple, Transparent Pricing" subtitle="Start lean. Scale when you’re ready.">
        <Pricing onCta={openWhatsApp} />
      </Section>

      <Section id="ready" title="" subtitle="">
        <ReadyCTA onCta={openWhatsApp} />
      </Section>

      <Section id="roi-block" title="" subtitle="">
        <ROISection onCta={openWhatsApp} />
      </Section>

      <Section id="careers" title="Careers" subtitle="Passionate about AI + automation? Work with us remotely or onsite.">
        <CareersBlock onCta={openWhatsApp} />
      </Section>

      <Section id="contact" title="Book a 15‑minute Consultation" subtitle="No slides. We’ll show your flows working with your data.">
        <ContactCard onCta={openWhatsApp} />
      </Section>

      <Footer onCta={openWhatsApp} />

      {/* Dev sanity tests (client-only in dev) */}
      {typeof window !== "undefined" && process.env.NODE_ENV !== "production" && <DevSanityTests />}
    </div>
  );
}

// -------------------- UI Sections --------------------
function Navbar({ onCta }: { onCta: () => void }) {
  return (
    <div className="sticky top-0 z-40 w-full border-b border-white/5 bg-neutral-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400" />
          <span className="text-lg font-semibold tracking-tight">{BRAND}</span>
          <span className="ml-3 hidden rounded-full bg-white/5 px-2 py-0.5 text-xs text-neutral-300 md:inline">specialized ai automation innovation company</span>
        </div>
        <nav className="hidden items-center gap-6 text-sm text-neutral-300 md:flex">
          <a href="#solutions" className="hover:text-white">Solutions</a>
          <a href="#services" className="hover:text-white">Services</a>
          <a href="#about" className="hover:text-white">About</a>
          <a href="#careers" className="hover:text-white">Careers</a>
          <a href="#cases" className="hover:text-white">Case Studies</a>
          <a href="#contact" className="hover:text-white">Contact</a>
          <button onClick={onCta} className="ml-2 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-neutral-900 hover:opacity-90">
            <Phone className="h-4 w-4" /> Get AI Consultation
          </button>
        </nav>
      </div>
    </div>
  );
}

function Hero({ onCta }: { onCta: () => void }) {
  return (
    <section className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 pb-20 pt-16 text-center md:pt-24">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-4xl font-semibold leading-tight text-transparent md:text-6xl"
      >
        Transform Your Business with <span className="underline decoration-cyan-400/60 decoration-4 underline-offset-8">AI Automation</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="max-w-2xl text-balance text-neutral-300"
      >
        We build custom AI systems — from intelligent chat/voice agents to automated workflows — to solve specific business challenges and boost efficiency.
      </motion.p>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
        <button onClick={onCta} className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-neutral-900 hover:opacity-90">
          <Rocket className="h-5 w-5" /> Get AI Consultation
        </button>
        <a href="#solutions" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-5 py-3 text-neutral-200 hover:bg-white/5">
          View AI Solutions <ChevronRight className="h-4 w-4" />
        </a>
      </div>
      <HeroStats />
    </section>
  );
}

function PillBar() {
  const pills = ["AI automation", "enterprise‑grade agents", "workflow orchestration", "data‑driven ops"];
  return (
    <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
      {pills.map((p) => (
        <span key={p} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-300">
          {p}
        </span>
      ))}
    </div>
  );
}

function HeroStats() {
  const items = [
    { k: "+120%", v: "Faster lead response" },
    { k: "−35%", v: "Missed calls vs baseline" },
    { k: "+18%", v: "Follow‑ups completed" },
    { k: "0", v: "Fines on compliance care" },
  ];
  return (
    <div className="mt-10 grid w-full max-w-4xl grid-cols-2 gap-3 md:grid-cols-4">
      {items.map((it, i) => (
        <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left">
          <div className="text-2xl font-semibold text-white md:text-3xl">{it.k}</div>
          <div className="text-sm text-neutral-400">{it.v}</div>
        </div>
      ))}
    </div>
  );
}

function TrustedBar() {
  const logos = ["Piramal Ops", "SteelWorks", "Clinic+", "Prime Realty", "Edulab", "RouteGo"];
  return (
    <div className="border-y border-white/5 bg-neutral-950/70">
      <div className="mx-auto flex max-w-7xl items-center gap-6 overflow-x-auto px-4 py-6 text-neutral-400">
        <span className="text-xs uppercase tracking-wider text-neutral-500">Trusted by teams like</span>
        {logos.map((l, i) => (
          <div key={i} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm">{l}</div>
        ))}
      </div>
    </div>
  );
}

function Section({ id, title, subtitle, children }: { id: string; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h2 className="text-pretty bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-3xl font-semibold text-transparent md:text-5xl">
          {title}
        </h2>
        {subtitle && <p className="mt-3 max-w-2xl text-neutral-300">{subtitle}</p>}
      </motion.div>
      {children}
    </section>
  );
}

// ---- 3D Tilt wrapper -------------------------------------------------------
function TiltCard({ className = "", children, delay = 0 }: { className?: string; children: React.ReactNode; delay?: number }) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 12 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 12 });
  const glareX = useSpring(useTransform(mx, [-0.5, 0.5], [-20, 20]), { stiffness: 150, damping: 12 });
  const glareY = useSpring(useTransform(my, [-0.5, 0.5], [-20, 20]), { stiffness: 150, damping: 12 });
  const scale = useSpring(1, { stiffness: 200, damping: 15 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(px);
    my.set(py);
  }
  function onEnter() {
    scale.set(1.02);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
    scale.set(1);
  }

  return (
    <div style={{ perspective: 1000 }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, scale, transformStyle: "preserve-3d" }}
        className={`relative ${className}`}
      >
        {children}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/10 to-transparent"
          style={{ x: glareX, y: glareY, opacity: 0.25 }}
        />
      </motion.div>
    </div>
  );
}

function SolutionsGrid({ onLearn }: { onLearn: (service: string) => void }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {SOLUTIONS.map((s, idx) => (
        <TiltCard key={s.title} delay={idx * 0.05} className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-white/10 p-2">
              <s.icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{s.title}</h3>
              <p className="mt-1 text-sm text-neutral-300">{s.desc}</p>
            </div>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-neutral-200">
            {s.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-cyan-300" /> {b}
              </li>
            ))}
          </ul>
          <button onClick={() => onLearn(s.title)} className="mt-4 w-max rounded-xl bg-white px-4 py-2 text-neutral-900 hover:opacity-90">
            Learn More
          </button>
        </TiltCard>
      ))}
    </div>
  );
}

function ServicesGrid({ selected, toggle }: { selected: number[]; toggle: (id: number) => void }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {SERVICES.map((s, idx) => (
        <TiltCard key={s.id} delay={idx * 0.04} className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-white/10 p-2">
                <s.icon className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-lg font-semibold">{s.title}</h4>
                <div className="text-sm text-neutral-400">{s.tagline}</div>
              </div>
            </div>
            <button onClick={() => toggle(s.id)} className={`rounded-full px-3 py-1 text-xs ${selected.includes(s.id) ? "bg-cyan-400/20 text-cyan-200" : "bg-white/10 text-neutral-200 hover:bg-white/20"}`}>
              {selected.includes(s.id) ? "Selected" : "Add"}
            </button>
          </div>
          <p className="mt-3 text-sm text-neutral-300">{s.desc}</p>
          {s.audience && (
            <div className="mt-3 flex flex-wrap gap-2">
              {s.audience.map((a) => (
                <span key={a} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-neutral-300">
                  {a}
                </span>
              ))}
            </div>
          )}
        </TiltCard>
      ))}
    </div>
  );
}

function IndustryBands() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {INDUSTRY_ICONS.map(({ name, icon: Icon }) => (
        <span key={name} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-neutral-300">
          <Icon className="h-4 w-4" /> {name}
        </span>
      ))}
    </div>
  );
}

function AboutBlock() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="text-xl font-semibold">Why {BRAND}</h3>
        <p className="mt-2 text-neutral-300">
          We partner with founders and operations heads to deliver outcomes — more qualified leads, faster follow‑ups, zero compliance risks and live visibility across teams.
        </p>
        <ul className="mt-4 space-y-2 text-sm text-neutral-200">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-cyan-300" /> India‑first WhatsApp + voice expertise
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-cyan-300" /> Playbooks for clinics, coaching, real estate & industry supply
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-cyan-300" /> Owner‑level reporting — daily truth, not dashboards
          </li>
        </ul>
      </div>
      <BigStatsRow />
    </div>
  );
}

function CaseStudies({ onCtaWith }: { onCtaWith: (topic: string) => void }) {
  const cases = [
    { title: "Clinic chain — 2.1× consults", bullets: ["WhatsApp + voice intake", "Ad follow‑up automation", "Lead triage to CRM"] },
    { title: "Industrial fuel supplier — +38% recovery", bullets: ["Daily truth report", "Overdue reminders", "Dispatch + stock signals"] },
    { title: "Coaching — +27% admissions", bullets: ["Inbound WhatsApp", "Parent callbacks", "Counsellor accountability"] },
  ];
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {cases.map((c) => (
        <div key={c.title} className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-5">
          <h4 className="text-lg font-semibold">{c.title}</h4>
          <ul className="mt-3 space-y-2 text-sm text-neutral-200">
            {c.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-cyan-300" /> {b}
              </li>
            ))}
          </ul>
          <button onClick={() => onCtaWith(`Case Study: ${c.title}`)} className="mt-4 w-max rounded-2xl bg-white px-4 py-2 text-neutral-900 hover:opacity-90">
            See similar for my biz
          </button>
        </div>
      ))}
    </div>
  );
}

function Pricing({ onCta }: { onCta: () => void }) {
  const plans = [
    { name: "Starter", price: "₹15K / mo", oneTime: "₹15K setup", highlight: false, points: ["WhatsApp Enquiry Bot", "Lead capture to Sheet", "Basic auto follow‑ups"] },
    { name: "Growth", price: "₹25K / mo", oneTime: "₹25K setup", highlight: true, points: ["AI Voice Receptionist (24×7)", "WhatsApp Bot + follow‑ups", "Sales follow‑up dashboard"] },
    { name: "Performance Ads", price: "₹20K–₹40K / mo", oneTime: "+ Ad spend", highlight: false, points: ["AI creatives & targeting", "Instant AI lead qualification", "Pay per qualified lead (optional)"] },
    { name: "Enterprise Control", price: "₹40K–₹1.5L / mo", oneTime: "₹75K–₹2L setup", highlight: false, points: ["AI Operations Officer", "Owner daily truth report", "Sales, recovery, dispatch, compliance"] },
  ];
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {plans.map((p, i) => (
        <div key={i} className={`flex flex-col rounded-2xl border ${p.highlight ? "border-cyan-400/60 bg-cyan-400/5" : "border-white/10 bg-white/5"} p-6`}>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-semibold">{p.name}</h3>
            {p.highlight && <span className="rounded-full bg-cyan-400/20 px-2 py-1 text-xs text-cyan-200">Most Popular</span>}
          </div>
          <div className="text-3xl font-semibold">{p.price}</div>
          <div className="text-sm text-neutral-400">{p.oneTime}</div>
          <ul className="mt-6 space-y-2 text-sm text-neutral-200">
            {p.points.map((pt) => (
              <li key={pt} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-cyan-300" /> {pt}
              </li>
            ))}
          </ul>
          <button onClick={onCta} className="mt-6 rounded-2xl bg-white px-4 py-2 text-neutral-900 hover:opacity-90">Get this plan</button>
        </div>
      ))}
    </div>
  );
}

function CareersBlock({ onCta }: { onCta: () => void }) {
  return (
    <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-6">
      <p className="text-neutral-300">We’re always looking for builders who can ship fast. Send a short note with links to your best work.</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button onClick={onCta} className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-neutral-900 hover:opacity-90">
          <Phone className="h-5 w-5" /> WhatsApp HR
        </button>
        <span className="text-sm text-neutral-400">Or email: <span className="text-neutral-200">baissujal292@gmail.com</span></span>
      </div>
    </div>
  );
}

function ContactCard({ onCta }: { onCta: () => void }) {
  return (
    <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-6">
      <p className="text-neutral-300">Tell us about your team and goals. We’ll reply with a tailored 2‑service starter to go live in 5 days.</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button onClick={onCta} className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-neutral-900 hover:opacity-90">
          <Phone className="h-5 w-5" /> WhatsApp now
        </button>
        <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-5 py-3 hover:bg-white/20">
          <Phone className="h-5 w-5" /> Call us
        </a>
      </div>
      <p className="mt-4 text-sm text-neutral-400">Prefer email? Write to <span className="text-neutral-200">baissujal292@gmail.com</span></p>
    </div>
  );
}

function ReadyCTA({ onCta }: { onCta: () => void }) {
  return (
    <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-2xl font-semibold">Ready to Transform Your Business?</h3>
      <p className="mt-2 text-neutral-300">Join businesses across India that have automated operations and achieved measurable ROI with {BRAND}.</p>
      <ul className="mt-4 space-y-2 text-sm text-neutral-200">
        <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-cyan-300"/> Free Consultation</li>
        <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-cyan-300"/> Proof of Concept</li>
        <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-cyan-300"/> Ongoing Support</li>
      </ul>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button onClick={onCta} className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-neutral-900 hover:opacity-90">
          <Rocket className="h-5 w-5" /> Get Started
        </button>
        <a href="#roi" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-5 py-3 text-neutral-200 hover:bg-white/5">
          View ROI Calculator <ChevronRight className="h-4 w-4" />
        </a>
      </div>
      <p className="mt-3 text-sm text-neutral-400">Trusted by 100+ businesses across India</p>
    </div>
  );
}

function WhyPartner() {
  const cards = [
    { title: "80% Less Manual Work", sub: "Operational Efficiency", desc: "Automation reduces manual work by up to 80% so teams focus on growth.", icon: Rocket },
    { title: "99.5% Accuracy", sub: "Error Reduction", desc: "Models provide consistent results with minimal human error.", icon: Shield },
    { title: "Always Active", sub: "24/7 AI Operations", desc: "Systems run round‑the‑clock, processing requests and tasks.", icon: Clock },
    { title: "300% ROI Average", sub: "Rapid ROI", desc: "See measurable returns on AI investment within weeks.", icon: Rocket },
  ];
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((c, i) => (
        <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="mb-3 inline-flex rounded-2xl bg-white/10 p-2"><c.icon className="h-6 w-6"/></div>
          <h4 className="text-xl font-semibold">{c.title}</h4>
          <div className="text-sm text-cyan-200">{c.sub}</div>
          <p className="mt-2 text-sm text-neutral-300">{c.desc}</p>
        </div>
      ))}
    </div>
  );
}

function BigStatsRow() {
  const items = [
    { k: "50+", v: "AI Solutions Delivered" },
    { k: "200+", v: "Processes Automated" },
    { k: "98%", v: "Client Satisfaction" },
    { k: "15+", v: "Industries Served" },
  ];
  return (
    <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-4">
      {items.map((it, i) => (
        <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left">
          <div className="text-2xl font-semibold text-white md:text-3xl">{it.k}</div>
          <div className="text-sm text-neutral-400">{it.v}</div>
        </div>
      ))}
    </div>
  );
}

function ROISection({ onCta }: { onCta: () => void }) {
  const [teamCost, setTeamCost] = React.useState(100000);
  const [reduction, setReduction] = React.useState(30);
  const [aiCost, setAiCost] = React.useState(25000);

  const saved = Math.round(teamCost * (reduction / 100));
  const net = saved - aiCost;
  const roi = aiCost ? Math.round((net / aiCost) * 100) : 0;
  const months = net > 0 ? Math.max(1, Math.round(aiCost / net)) : Infinity;

  return (
    <div id="roi" className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-2xl font-semibold">AI ROI Quick Calculator</h3>
      <p className="mt-2 text-sm text-neutral-300">Estimate monthly savings from automation.</p>
      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
        <label className="text-sm">Monthly team cost (₹)
          <input type="number" className="mt-1 w-full rounded-2xl bg-neutral-900 p-2" value={teamCost} onChange={(e)=>setTeamCost(Number(e.target.value))}/>
        </label>
        <label className="text-sm">Reduction %
          <input type="number" className="mt-1 w-full rounded-2xl bg-neutral-900 p-2" value={reduction} onChange={(e)=>setReduction(Number(e.target.value))}/>
        </label>
        <label className="text-sm">AI monthly cost (₹)
          <input type="number" className="mt-1 w-full rounded-2xl bg-neutral-900 p-2" value={aiCost} onChange={(e)=>setAiCost(Number(e.target.value))}/>
        </label>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-3 text-sm md:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3"><div className="text-neutral-400">Est. saving</div><div className="text-xl font-semibold">₹{saved.toLocaleString()}</div></div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3"><div className="text-neutral-400">Net gain</div><div className="text-xl font-semibold">₹{net.toLocaleString()}</div></div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3"><div className="text-neutral-400">ROI</div><div className="text-xl font-semibold">{isFinite(roi)? roi: 0}%</div></div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3"><div className="text-neutral-400">Payback</div><div className="text-xl font-semibold">{isFinite(months)? `${months} mo` : "N/A"}</div></div>
      </div>
      <div className="mt-5 flex gap-3">
        <button onClick={onCta} className="rounded-2xl bg-white px-4 py-2 text-neutral-900 hover:opacity-90">Book a 15‑min call</button>
      </div>
    </div>
  );
}

function LeadFormModal({ open, onClose, lead, setLead, onSubmit }: { open: boolean; onClose: () => void; lead: any; setLead: (l: any) => void; onSubmit: () => void; }) {
  if (!open) return null;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.25 }} className="relative z-[61] w-full max-w-lg rounded-2xl border border-white/10 bg-neutral-950 p-6">
        <h3 className="text-2xl font-semibold">Quick Project Form</h3>
        <p className="mt-1 text-sm text-neutral-400">Fill your details and we’ll contact you within minutes.</p>
        <div className="mt-4 grid grid-cols-1 gap-3">
          <label className="text-sm">Service / Interest
            <input className="mt-1 w-full rounded-2xl bg-neutral-900 p-2" value={lead.service} onChange={(e) => setLead({ ...lead, service: e.target.value })} placeholder="e.g., AI Voice Receptionist" />
          </label>
          <label className="text-sm">Your Name
            <input className="mt-1 w-full rounded-2xl bg-neutral-900 p-2" value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} placeholder="e.g., Sujal Singh" />
          </label>
          <label className="text-sm">Company Name
            <input className="mt-1 w-full rounded-2xl bg-neutral-900 p-2" value={lead.company} onChange={(e) => setLead({ ...lead, company: e.target.value })} placeholder="e.g., HJYNEX Pvt Ltd" />
          </label>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <label className="text-sm">Email
              <input type="email" className="mt-1 w-full rounded-2xl bg-neutral-900 p-2" value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })} placeholder="name@company.com" />
            </label>
            <label className="text-sm">Phone / WhatsApp
              <input className="mt-1 w-full rounded-2xl bg-neutral-900 p-2" value={lead.phone} onChange={(e) => setLead({ ...lead, phone: e.target.value })} placeholder="+91xxxxxxxxxx" />
            </label>
          </div>
          <label className="text-sm">City
            <input className="mt-1 w-full rounded-2xl bg-neutral-900 p-2" value={lead.city} onChange={(e) => setLead({ ...lead, city: e.target.value })} placeholder="e.g., Ahmedabad" />
          </label>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <button onClick={onSubmit} className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-neutral-900 hover:opacity-90">
            <MessageSquare className="h-5 w-5" /> Submit via WhatsApp
          </button>
          <button onClick={onClose} className="rounded-2xl border border-white/10 px-5 py-3 text-neutral-200 hover:bg-white/5">Close</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Footer({ onCta }: { onCta: () => void }) {
  return (
    <footer className="mt-16 border-t border-white/5">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-10 text-sm text-neutral-400 md:flex-row">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400" />
          <span>{BRAND}</span>
          <span className="hidden md:inline">• specialized ai automation</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#solutions" className="hover:text-white">Solutions</a>
          <a href="#services" className="hover:text-white">Services</a>
          <a href="#pricing" className="hover:text-white">Pricing</a>
          <a href="#contact" className="hover:text-white">Contact</a>
          <button onClick={onCta} className="rounded-2xl bg-white px-3 py-2 text-neutral-900 hover:opacity-90">Talk to us</button>
        </div>
      </div>
    </footer>
  );
}

// ---- Background & Live object --------------------------------------------
function BackgroundDecor() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute -top-24 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-indigo-500/10 blur-3xl" />
    </div>
  );
}

function LiveScrollOrb() {
  const { scrollYProgress } = useScroll();

  // Smooth, springed parallax based on page scroll
  const yBase = useTransform(scrollYProgress, [0, 1], [0, 520]);
  const xBase = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 1.08]), {
    stiffness: 120,
    damping: 18,
  });

  const y = useSpring(yBase, { stiffness: 120, damping: 20 });
  const x = useSpring(xBase, { stiffness: 120, damping: 20 });

  // Gentle floating even when the page isn't long enough to scroll
  const bob = useMotionValue(0);
  useAnimationFrame((t) => {
    bob.set(Math.sin(t / 900) * 6);
  });
  const yWithBob = useTransform([y, bob], (vals) => {
    const yv = Number((vals as any[])[0] ?? 0);
    const bv = Number((vals as any[])[1] ?? 0);
    return yv + bv;
  });

  // Dev: verify scroll binding
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (process.env.NODE_ENV !== "production") console.log("scrollYProgress →", v);
  });

  return (
    <motion.div
      className="pointer-events-none fixed right-6 top-28 z-30 will-change-transform sm:right-12 sm:top-32"
      style={{ x, y: yWithBob, rotate, scale }}
    >
      <div className="relative h-24 w-24 overflow-visible rounded-full sm:h-28 sm:w-28">
        {/* core orb */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/30 via-indigo-400/25 to-transparent" />
        {/* glossy highlight */}
        <div className="absolute -inset-1 rounded-full bg-cyan-400/10 blur-2xl" />
        {/* ring */}
        <div className="absolute inset-0 rounded-full ring-1 ring-white/10" />
        {/* aura */}
        <motion.div
          aria-hidden
          className="absolute -inset-6 rounded-full bg-gradient-to-tr from-cyan-500/10 to-indigo-500/10 blur-3xl"
          style={{ rotate }}
        />
        {/* sparkle */}
        <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/60 shadow-[0_0_12px_4px_rgba(255,255,255,0.35)]" />
      </div>
    </motion.div>
  );
}

// --- Dev sanity tests (kept tiny and non-invasive) -------------------------
function DevSanityTests() {
  React.useEffect(() => {
    const issues: string[] = [];

    try {
      const uniq = [AboutBlock, LiveScrollOrb, LeadFormModal, Pricing, SolutionsGrid].filter(Boolean);
      if (new Set(uniq.map((f) => f.name)).size !== uniq.length) issues.push("Duplicate component names");
    } catch (e) {
      issues.push("Component presence check failed");
    }

    if (Array.isArray(SOLUTIONS) && SOLUTIONS.length !== 8) issues.push(`SOLUTIONS expected 8, got ${SOLUTIONS.length}`);
    if (Array.isArray(SERVICES) && SERVICES.length !== 9) issues.push(`SERVICES expected 9, got ${SERVICES.length}`);

    if (typeof useScroll !== "function" || typeof useTransform !== "function") issues.push("Framer hooks not found");

    if (issues.length) console.warn("DEV TESTS: issues →", issues);
    else console.log("DEV TESTS: all good ✅");
  }, []);
  return null;
}
