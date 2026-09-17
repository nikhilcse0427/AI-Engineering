"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { healthcareCategories } from "@/lib/constant";
import { useRouter } from "next/navigation";
import { userAuthStore } from "@/store/authStore";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Star, HeartPulse, Shield, CheckCircle2, ChevronRight } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   Inline styles / palette
   ───────────────────────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  :root {
    --teal-950: #011b1b;
    --teal-900: #022c2c;
    --teal-800: #044040;
    --teal-700: #076060;
    --teal-500: #0d9488;
    --teal-400: #2dd4bf;
    --teal-300: #5eead4;
    --amber-400: #fbbf24;
    --amber-300: #fcd34d;
    --white: #ffffff;
    --gray-50:  #f8fafb;
    --gray-100: #f0f4f3;
    --gray-400: #8fa3a0;
    --gray-600: #4b6360;
  }

  .hero-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--teal-950);
    min-height: 100vh;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
  }

  /* ── noise grain overlay ── */
  .hero-root::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 1;
    opacity: 0.4;
  }

  /* ── aurora blobs ── */
  .blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    pointer-events: none;
  }
  .blob-1 {
    width: 600px; height: 600px;
    top: -200px; left: -150px;
    background: radial-gradient(circle, rgba(13,148,136,0.35) 0%, transparent 70%);
    animation: drift1 12s ease-in-out infinite alternate;
  }
  .blob-2 {
    width: 500px; height: 500px;
    bottom: -180px; right: -100px;
    background: radial-gradient(circle, rgba(45,212,191,0.18) 0%, transparent 70%);
    animation: drift2 14s ease-in-out infinite alternate;
  }
  .blob-3 {
    width: 300px; height: 300px;
    top: 40%; left: 50%;
    background: radial-gradient(circle, rgba(251,191,36,0.10) 0%, transparent 70%);
    animation: drift3 10s ease-in-out infinite alternate;
  }
  @keyframes drift1 { from { transform: translate(0,0) scale(1); } to { transform: translate(60px, 80px) scale(1.15); } }
  @keyframes drift2 { from { transform: translate(0,0) scale(1); } to { transform: translate(-50px,-60px) scale(1.1); } }
  @keyframes drift3 { from { transform: translate(-50%,-50%) scale(1); } to { transform: translate(calc(-50% + 40px), calc(-50% - 30px)) scale(1.2); } }

  /* ── grid lines ── */
  .grid-overlay {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(45,212,191,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(45,212,191,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
  }

  /* ── badge ── */
  .live-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 16px;
    border-radius: 999px;
    background: rgba(13,148,136,0.12);
    border: 1px solid rgba(45,212,191,0.25);
    color: var(--teal-300);
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.04em;
    margin-bottom: 28px;
    width: fit-content;
  }
  .ping-dot {
    position: relative;
    width: 8px; height: 8px;
  }
  .ping-dot span {
    position: absolute; inset: 0;
    border-radius: 50%;
  }
  .ping-dot .ring {
    background: #4ade80;
    animation: ping 1.5s cubic-bezier(0,0,0.2,1) infinite;
  }
  .ping-dot .core {
    background: #22c55e;
  }
  @keyframes ping {
    75%, 100% { transform: scale(2); opacity: 0; }
  }

  /* ── headings ── */
  .hero-eyebrow {
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--teal-400);
    margin-bottom: 20px;
  }
  .hero-h1 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(3rem, 6vw, 5.5rem);
    font-weight: 800;
    line-height: 1.0;
    letter-spacing: -0.03em;
    color: var(--white);
    margin-bottom: 28px;
  }
  .hero-h1 .accent {
    background: linear-gradient(135deg, var(--teal-400) 0%, var(--amber-300) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .hero-sub {
    font-size: clamp(1rem, 1.5vw, 1.15rem);
    font-weight: 300;
    color: rgba(255,255,255,0.55);
    line-height: 1.75;
    max-width: 480px;
    margin-bottom: 44px;
  }

  /* ── buttons ── */
  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 16px 32px;
    background: var(--teal-500);
    color: white;
    border-radius: 14px;
    font-weight: 500;
    font-size: 15px;
    letter-spacing: 0.02em;
    border: 1px solid rgba(45,212,191,0.3);
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 0 40px rgba(13,148,136,0.4), inset 0 1px 0 rgba(255,255,255,0.1);
    position: relative;
    overflow: hidden;
    font-family: 'DM Sans', sans-serif;
  }
  .btn-primary::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 60%);
  }
  .btn-primary:hover {
    background: var(--teal-400);
    transform: translateY(-2px);
    box-shadow: 0 0 60px rgba(13,148,136,0.6), inset 0 1px 0 rgba(255,255,255,0.15);
  }
  .btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 16px 32px;
    background: rgba(255,255,255,0.04);
    color: rgba(255,255,255,0.75);
    border-radius: 14px;
    font-weight: 500;
    font-size: 15px;
    border: 1px solid rgba(255,255,255,0.1);
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: 'DM Sans', sans-serif;
  }
  .btn-ghost:hover {
    background: rgba(255,255,255,0.08);
    color: white;
    border-color: rgba(255,255,255,0.2);
    transform: translateY(-2px);
  }

  /* ── stat strip ── */
  .stat-strip {
    display: flex;
    gap: 40px;
    padding-top: 40px;
    border-top: 1px solid rgba(255,255,255,0.07);
    margin-top: 44px;
  }
  .stat-item .num {
    font-family: 'Syne', sans-serif;
    font-size: 2rem;
    font-weight: 800;
    color: white;
    letter-spacing: -0.03em;
  }
  .stat-item .label {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    margin-top: 2px;
  }
  .stat-divider {
    width: 1px;
    background: rgba(255,255,255,0.07);
    align-self: stretch;
  }

  /* ── card panel ── */
  .card-panel {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 28px;
    padding: 32px;
    backdrop-filter: blur(20px);
    position: relative;
  }
  .card-panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 28px;
  }
  .card-panel-title {
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.4);
  }
  .see-all {
    font-size: 12px;
    font-weight: 500;
    color: var(--teal-400);
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    font-family: 'DM Sans', sans-serif;
  }

  /* ── category chips ── */
  .cat-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
  .cat-chip {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 20px 12px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 18px;
    cursor: pointer;
    transition: all 0.25s ease;
    text-align: center;
  }
  .cat-chip:hover {
    background: rgba(13,148,136,0.15);
    border-color: rgba(45,212,191,0.3);
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0,0,0,0.3);
  }
  .cat-icon {
    width: 44px; height: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cat-label {
    font-size: 11px;
    font-weight: 500;
    color: rgba(255,255,255,0.65);
    letter-spacing: 0.02em;
    line-height: 1.3;
  }

  /* ── floating badges ── */
  .float-card {
    position: absolute;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.12);
    backdrop-filter: blur(20px);
    border-radius: 18px;
    padding: 14px 18px;
    display: flex;
    align-items: center;
    gap: 12px;
    z-index: 20;
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  }
  .float-card .fc-icon {
    width: 40px; height: 40px;
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .float-card .fc-title {
    font-size: 13px; font-weight: 700;
    color: white;
  }
  .float-card .fc-sub {
    font-size: 11px; color: rgba(255,255,255,0.45);
    margin-top: 1px;
  }
  .float-card-tl {
    top: -20px; left: -24px;
  }
  .float-card-br {
    bottom: -20px; right: -24px;
  }

  /* ── trust row ── */
  .trust-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 20px;
  }
  .trust-avatar {
    width: 28px; height: 28px;
    border-radius: 50%;
    border: 2px solid var(--teal-950);
    margin-left: -8px;
    font-size: 11px;
    display: flex; align-items: center; justify-content: center;
    font-weight: 700;
    color: white;
  }
  .trust-avatar:first-child { margin-left: 0; }
  .trust-text {
    font-size: 12px;
    color: rgba(255,255,255,0.45);
    margin-left: 8px;
  }
  .trust-text strong { color: rgba(255,255,255,0.75); }

  /* ── container ── */
  .hero-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 80px 32px;
    width: 100%;
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }

  @media (max-width: 1024px) {
    .hero-container {
      grid-template-columns: 1fr;
      gap: 60px;
      padding: 60px 24px;
      text-align: center;
    }
    .hero-sub { max-width: 100%; }
    .live-badge { margin-left: auto; margin-right: auto; }
    .stat-strip { justify-content: center; }
    .btn-row { justify-content: center; }
    .trust-row { justify-content: center; }
    .cat-grid { grid-template-columns: repeat(3, 1fr); }
    .float-card-tl { top: -16px; left: 8px; }
    .float-card-br { bottom: -16px; right: 8px; }
  }

  @media (max-width: 640px) {
    .hero-h1 { font-size: 2.6rem; }
    .cat-grid { grid-template-columns: repeat(2, 1fr); }
    .stat-strip { gap: 24px; }
    .btn-row { flex-direction: column; align-items: stretch; }
    .btn-row button, .btn-row a { width: 100%; justify-content: center; }
    .float-card { display: none; }
  }
`;

/* ─────────────────────────────────────────────────────────────
   Helpers
   ───────────────────────────────────────────────────────────── */
const avatarColors = ["#0d9488", "#0891b2", "#7c3aed", "#db2777", "#ea580c"];
const avatarLetters = ["A", "R", "S", "M", "P"];

const trustAvatars = avatarLetters.map((l, i) => (
  <div key={i} className="trust-avatar" style={{ background: avatarColors[i] }}>{l}</div>
));

/* ─────────────────────────────────────────────────────────────
   Component
   ───────────────────────────────────────────────────────────── */
const LandingHero = () => {
  const { isAuthenticated } = userAuthStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleBookConsultation = () => {
    router.push(isAuthenticated ? "/doctor-list" : "/signup/patient");
  };
  const handleCategoryClick = (categoryTitle) => {
    router.push(isAuthenticated ? `/doctor-list?category=${categoryTitle}` : "/signup/patient");
  };

  const stagger = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };
  const fadeRight = {
    hidden: { opacity: 0, x: 40 },
    show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  if (!mounted) return null;

  return (
    <>
      <style>{CSS}</style>
      <section className="hero-root">
        {/* Blobs */}
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="grid-overlay" />

        <div className="hero-container">
          {/* ── Left column ── */}
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div variants={fadeUp}>
              <div className="live-badge">
                <div className="ping-dot">
                  <span className="ring" />
                  <span className="core" />
                </div>
                Available 24 / 7 for you
              </div>
            </motion.div>

            <motion.p variants={fadeUp} className="hero-eyebrow">
              Next-gen telemedicine
            </motion.p>

            <motion.h1 variants={fadeUp} className="hero-h1">
              Your Health,<br />
              <span className="accent">Redefined.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="hero-sub">
              Connect with board-certified specialists in minutes — no waiting rooms,
              no paperwork. Real care, wherever you are.
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={fadeUp} className="btn-row" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button className="btn-primary" onClick={handleBookConsultation}>
                Book a Consultation
                <ArrowRight size={17} />
              </button>
              <Link href="/login/doctor">
                <button className="btn-ghost">
                  Join as Doctor
                  <ChevronRight size={16} />
                </button>
              </Link>
            </motion.div>

            {/* Trust avatars */}
            <motion.div variants={fadeUp} className="trust-row">
              {trustAvatars}
              <span className="trust-text"><strong>50,000+</strong> patients trust us</span>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className="stat-strip">
              <div className="stat-item">
                <div className="num">500+</div>
                <div className="label">Specialists</div>
              </div>
              <div className="stat-divider" />
              <div className="stat-item">
                <div className="num" style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  4.9 <Star size={18} fill="#fbbf24" color="#fbbf24" style={{ marginBottom: 2 }} />
                </div>
                <div className="label">Avg Rating</div>
              </div>
              <div className="stat-divider" />
              <div className="stat-item">
                <div className="num">&lt; 5m</div>
                <div className="label">Response</div>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right column ── */}
          <motion.div variants={fadeRight} initial="hidden" animate="show" style={{ position: "relative" }}>
            <div className="card-panel">
              <div className="card-panel-header">
                <span className="card-panel-title">Specialties</span>
                <button className="see-all" onClick={handleBookConsultation}>
                  Browse All <ChevronRight size={13} />
                </button>
              </div>

              <div className="cat-grid">
                {healthcareCategories.map((cat, i) => (
                  <motion.button
                    key={cat.id}
                    className="cat-chip"
                    onClick={() => handleCategoryClick(cat.title)}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <div className="cat-icon" style={{ background: cat.color }}>
                      <svg width="22" height="22" fill="white" viewBox="0 0 24 24">
                        <path d={cat.icon} />
                      </svg>
                    </div>
                    <span className="cat-label">{cat.title}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Floating badge — top left */}
            <motion.div
              className="float-card float-card-tl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="fc-icon" style={{ background: "linear-gradient(135deg,#0d9488,#2dd4bf)" }}>
                <HeartPulse size={20} color="white" />
              </div>
              <div>
                <div className="fc-title">Live Monitoring</div>
                <div className="fc-sub">Real-time vitals</div>
              </div>
            </motion.div>

            {/* Floating badge — bottom right */}
            <motion.div
              className="float-card float-card-br"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="fc-icon" style={{ background: "linear-gradient(135deg,#059669,#34d399)" }}>
                <Shield size={20} color="white" />
              </div>
              <div>
                <div className="fc-title">100% Secure</div>
                <div className="fc-sub">Verified Doctors</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default LandingHero;