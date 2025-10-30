"use client";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";

// ---------------------------------------------------------------------------
// Master AI Labs — Single-file React landing page
// TailwindCSS + Framer Motion + Lucide icons
// Ready to paste into a Next.js app (app/page.tsx) or React SPA (src/App.jsx)
// ---------------------------------------------------------------------------

// 9 Core Services (from your starter stack)
const SERVICES = [
  {
    id: 1,
    title: "AI Voice Receptionist (24×7)",
    tagline: "Never miss a paying lead again.",
    desc:
      "Instant call pickup in natural voice. Captures name, requirement, quantity, city and pushes a clean summary to WhatsApp/Email.",
    icon: Phone,
    badge: "#1 Bestseller",
    audience: ["Industrial", "Clinic", "Real Estate", "Coaching", "D2C"],
  },
  {
    id: 2,
    title: "WhatsApp Enquiry Bot + Auto Follow-up",
    tagline: "Reply first. Convert more.",
    desc:
      "Auto-replies to ‘price?/fees?/availability?’ and collects lead details, then politely follows up to book a call/visit.",
    icon: MessageSquare,
    audience: ["Clinic", "Coaching", "Real Estate", "D2C"],
  },
  {
    id: 3,
    title: "High‑Intent Buyer Lists (B2B)",
    tagline: "Purchase manager contacts that actually buy.",
    desc:
      "Verified decision-makers with phone, email, capacity, and product fit. Built for LDO/MTO/Bitumen, machines, logistics, scrap, etc.",
    icon: ClipboardList,
    audience: ["Industrial", "Logistics"],
  },
  {
    id: 4,
    title: "Sales Follow‑up & Accountability",
    tagline: "Daily truth for the owner.",
    desc:
      "Tracks who followed up, who didn’t, and which deals are stuck. Sends one WhatsApp digest every evening to the boss.",
    icon: LineChart,
    audience: ["Industrial", "Coaching", "Real Estate", "Staffing"],
  },
  {
    id: 5,
    title: "Compliance & Penalty Protection",
    tagline: "No fines. No surprises.",
    desc:
      "Calendar + alerts for GST, Pollution NOC, RERA, clinic certs, tanker calibration and more — before the deadline.",
    icon: Shield,
    audience: ["Industrial", "Construction", "Clinic", "Real Estate"],
  },
  {
    id: 6,
    title: "Vertical Intake Agents",
    tagline: "Admissions / Patients / Property buyers.",
    desc:
      "Industry‑tailored agents that qualify serious prospects: budget, location, timeline, loan-ready, symptoms, batch, etc.",
    icon: Headset,
    audience: ["Coaching", "Clinic", "Real Estate"],
  },
  {
    id: 7,
    title: "Reputation + Content Pack",
    tagline: "Look premium online. Get more trust.",
    desc:
      "Monthly content calendar, reel scripts, polite complaint handling and 5★ review harvesting that actually shows up.",
    icon: Rocket,
    audience: ["Clinic", "Coaching", "Real Estate", "D2C"],
  },
  {
    id: 8,
    title: "Enterprise AI Operations Officer",
    tagline: "Your 24×7 digital COO.",
    desc:
      "One AI brain across sales, recovery, dispatch, compliance & stock — reports directly to the MD with a daily truth brief.",
    icon: Bot,
    badge: "Enterprise",
    audience: ["Industrial", "Logistics", "Construction", "Multi‑branch"],
  },
  {
    id: 9,
    title: "AI Ad Engine (Paid Ads + Instant AI Follow‑up)",
    tagline: "Ads that generate warmed leads, not screenshots.",
    desc:
      "AI‑written creatives, smarter targeting and instant AI capture/qualification on WhatsApp/call — you get only serious leads.",
    icon: Megaphone,
    audience: ["Clinic", "Coaching", "Real Estate", "D2C", "Industrial"],
  },
];

const INDUSTRY_ICONS = [
  { name: "Industrial", icon: Factory },
  { name: "Real Estate", icon: Building },
  { name: "Clinic", icon: Stethoscope },
  { name: "Coaching", icon: GraduationCap },
  { name: "Logistics", icon: TruckIcon },
];

// Fallback Truck icon (lucide-react has Truck but we alias in case env differs)
function TruckIcon(props) {
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

const PHONE = "+919993891875"; // Your WhatsApp/phone (from your profile)

export default function MasterAIAgencyLanding() {
  const [selected, setSelected] = useState([]);

  const toggle = (id) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const selectedServicesText = useMemo(() => {
    const names = SERVICES.filter((s) => selected.includes(s.id)).map((s) => s.title);
    return names.length ? names.join(", ") : "General enquiry";
  }, [selected]);

  const openWhatsApp = () => {
    const msg = `Hi, I'm interested in: ${selectedServicesText}. My name is ____ from ____ (city). Please contact me.`;
    const url = `https://wa.me/${PHONE.replace("+", "")}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">
      <BackgroundDecor />
      <Navbar onCta={openWhatsApp} />
      <Hero onCta={openWhatsApp} />
      <TrustedBar />
      <Section id="services" title="Our 9 AI Systems" subtitle="Proven, revenue‑focused services you can switch on in days.">
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

      <Section id="pricing" title="Simple, Transparent Pricing" subtitle="Start lean. Scale when you’re ready.">
        <Pricing onCta={openWhatsApp} />
      </Section>

      <Section id="contact" title="Book a 15‑minute Demo" subtitle="No slides. We’ll show your flows working with your data.">
        <ContactCard onCta={openWhatsApp} selected={selected} />
      </Section>

      <Footer onCta={openWhatsApp} />
    </div>
  );
}

// -------------------- UI Sections --------------------
function Navbar({ onCta }) {
  return (
    <div className="sticky top-0 z-40 w-full border-b border-white/5 bg-neutral-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400" />
          <span className="text-lg font-semibold tracking-tight">Master AI Labs</span>
          <span className="ml-3 hidden rounded-full bg-white/5 px-2 py-0.5 text-xs text-neutral-300 md:inline">Made in India 🇮🇳</span>
        </div>
        <nav className="hidden items-center gap-6 text-sm text-neutral-300 md:flex">
          <a href="#services" className="hover:text-white">Services</a>
          <a href="#industries" className="hover:text-white">Industries</a>
          <a href="#pricing" className="hover:text-white">Pricing</a>
          <a href="#contact" className="hover:text-white">Contact</a>
          <button onClick={onCta} className="ml-2 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-neutral-900 hover:opacity-90">
            <Phone className="h-4 w-4" /> WhatsApp
          </button>
        </nav>
      </div>
    </div>
  );
}

function Hero({ onCta }) {
  return (
    <section className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 pb-20 pt-16 text-center md:pt-24">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-4xl font-semibold leading-tight text-transparent md:text-6xl"
      >
        24×7 AI Systems that <span className="underline decoration-cyan-400/60 decoration-4 underline-offset-8">capture revenue</span>
        <br className="hidden md:block" /> and give owners <span className="underline decoration-indigo-400/60 decoration-4 underline-offset-8">daily truth</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="max-w-2xl text-balance text-neutral-300"
      >
        We install voice, WhatsApp, ads and control dashboards for Indian businesses — so no lead is lost, teams stay accountable, and compliance never slips.
      </motion.p>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
        <button onClick={onCta} className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-neutral-900 hover:opacity-90">
          <Rocket className="h-5 w-5" /> Book a 15‑min demo
        </button>
        <a href="#services" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-5 py-3 text-neutral-200 hover:bg-white/5">
          Explore services <ChevronRight className="h-4 w-4" />
        </a>
      </div>
      <HeroStats />
    </section>
  );
}

function HeroStats() {
  const items = [
    { k: "+120%", v: "Faster lead response" },
    { k: "−35%", v: "Missed calls vs baseline" },
    { k: "+18%", v: "Follow‑ups completed" },
    { k: "0", v: "Fines when on compliance care" },
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

function Section({ id, title, subtitle, children }) {
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

function ServicesGrid({ selected, toggle }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {SERVICES.map((s, idx) => (
        <motion.div
          key={s.id}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: idx * 0.03 }}
          className={`relative flex flex-col rounded-2xl border ${
            selected.includes(s.id) ? "border-cyan-400/50 bg-cyan-400/5" : "border-white/10 bg-white/5"
          } p-5`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white/10 p-2">
                <s.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{s.title}</h3>
                <p className="text-sm text-neutral-300">{s.tagline}</p>
              </div>
            </div>
            {s.badge && (
              <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-neutral-200">{s.badge}</span>
            )}
          </div>
          <p className="mt-3 text-sm text-neutral-300">{s.desc}</p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {s.audience.map((a) => (
              <span key={a} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-neutral-300">
                {a}
              </span>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between">
            <button
              onClick={() => toggle(s.id)}
              className={`rounded-xl px-3 py-2 text-sm ${
                selected.includes(s.id)
                  ? "bg-cyan-400 text-neutral-900 hover:opacity-90"
                  : "bg-white/10 text-neutral-100 hover:bg-white/20"
              }`}
            >
              {selected.includes(s.id) ? "Selected" : "Select"}
            </button>
            <span className="text-xs text-neutral-400">#{String(s.id).padStart(2, "0")}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function IndustryBands() {
  const bands = [
    { name: "Industrial & Supply", icon: Factory, items: ["Fuel / Bitumen", "Machines", "Scrap", "Spare parts"] },
    { name: "Real Estate & Construction", icon: Building, items: ["Builders", "Contractors", "RMC", "Material traders"] },
    { name: "Clinics / Healthcare", icon: Stethoscope, items: ["Dental", "Skin & Hair", "Diagnostics"] },
    { name: "Education / Coaching", icon: GraduationCap, items: ["Admissions", "Test prep", "Visa"] },
    { name: "D2C & Local Brands", icon: Megaphone, items: ["Salons", "Gyms", "Fashion", "Food"] },
  ];
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {bands.map((b, i) => (
        <div key={i} className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white/10 p-2"><b.icon className="h-6 w-6" /></div>
            <h3 className="text-lg font-semibold">{b.name}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {b.items.map((x) => (
              <span key={x} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-neutral-300">{x}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Pricing({ onCta }) {
  const plans = [
    {
      name: "Starter",
      price: "₹15K / mo",
      oneTime: "₹15K setup",
      highlight: false,
      points: [
        "WhatsApp Enquiry Bot",
        "Lead capture to Sheet",
        "Basic auto follow‑ups",
      ],
    },
    {
      name: "Growth",
      price: "₹25K / mo",
      oneTime: "₹25K setup",
      highlight: true,
      points: [
        "AI Voice Receptionist (24×7)",
        "WhatsApp Bot + follow‑ups",
        "Sales follow‑up dashboard",
      ],
    },
    {
      name: "Performance Ads",
      price: "₹20K–₹40K / mo",
      oneTime: "+ Ad spend",
      highlight: false,
      points: [
        "AI creatives & targeting",
        "Instant AI lead qualification",
        "Pay per qualified lead (optional)",
      ],
    },
    {
      name: "Enterprise Control",
      price: "₹40K–₹1.5L / mo",
      oneTime: "₹75K–₹2L setup",
      highlight: false,
      points: [
        "AI Operations Officer",
        "Owner daily truth report",
        "Sales, recovery, dispatch, compliance",
      ],
    },
  ];
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {plans.map((p, i) => (
        <div
          key={i}
          className={`flex flex-col rounded-2xl border ${p.highlight ? "border-cyan-400/60 bg-cyan-400/5" : "border-white/10 bg-white/5"} p-6`}
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-semibold">{p.name}</h3>
            {p.highlight && <span className="rounded-full bg-cyan-400/20 px-2 py-1 text-xs text-cyan-200">Most Popular</span>}
          </div>
          <div className="text-3xl font-semibold">{p.price}</div>
          <div className="text-sm text-neutral-400">{p.oneTime}</div>
          <ul className="mt-6 space-y-2 text-sm text-neutral-200">
            {p.points.map((pt) => (
              <li key={pt} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-cyan-300" /> {pt}</li>
            ))}
          </ul>
          <button onClick={onCta} className="mt-6 rounded-xl bg-white px-4 py-2 text-neutral-900 hover:opacity-90">Get this plan</button>
        </div>
      ))}
    </div>
  );
}

function ContactCard({ onCta, selected }) {
  return (
    <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-6">
      <p className="text-neutral-300">
        Select services above and click WhatsApp. We’ll reply with a tailored 2‑service starter to go live in 5 days.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button onClick={onCta} className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-neutral-900 hover:opacity-90">
          <Phone className="h-5 w-5" /> WhatsApp now
        </button>
        <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-5 py-3 hover:bg-white/20">
          <Phone className="h-5 w-5" /> Call us
        </a>
      </div>
      <p className="mt-4 text-sm text-neutral-400">
        Prefer email? Write to <span className="text-neutral-200">baissujal292@gmail.com</span>
      </p>
    </div>
  );
}

function Footer({ onCta }) {
  return (
    <footer className="mt-20 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400" />
              <span className="text-lg font-semibold">Master AI Labs</span>
            </div>
            <p className="mt-2 text-sm text-neutral-400">
              Ujjain · India • Whatsapp: {PHONE.replace("+91", "+91 ")} • © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a href="#services" className="text-sm text-neutral-300 hover:text-white">Services</a>
            <a href="#pricing" className="text-sm text-neutral-300 hover:text-white">Pricing</a>
            <button onClick={onCta} className="rounded-xl bg-white px-4 py-2 text-neutral-900 hover:opacity-90">Talk on WhatsApp</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function BackgroundDecor() {
  return (
    <>
      {/* soft radial glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-[60vh] w-[80vw] -translate-x-1/2 rounded-full bg-gradient-to-b from-cyan-500/10 to-indigo-500/0 blur-3xl" />
        <div className="absolute right-[-10%] top-1/3 h-[40vh] w-[40vw] rounded-full bg-gradient-to-b from-indigo-500/10 to-cyan-500/0 blur-3xl" />
        <div className="absolute left-[-10%] bottom-[-10%] h-[50vh] w-[50vw] rounded-full bg-gradient-to-b from-blue-500/10 to-indigo-500/0 blur-3xl" />
      </div>
      {/* subtle grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:24px_24px]" />
    </>
  );
}
