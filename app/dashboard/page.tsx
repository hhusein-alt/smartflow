"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  Activity,
  Bus,
  Shield,
  AlertTriangle,
  Map,
  FileText,
  Bell,
  LogOut,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Users,
  Navigation,
  Clock,
} from "lucide-react"
import SmartFlowLogo from "@/components/shared/SmartFlowLogo"

// ── Mock data — all fake, no API ──────────────────────────────────────
const KPI_DATA = [
  {
    label: "Total Flow",
    value: "12,847",
    unit: "peds/hr",
    change: "+8.3%",
    up: true,
    color: "#1D9E75",
    icon: Users,
  },
  {
    label: "Busiest Corridor",
    value: "Fountain Sq.",
    unit: "Icherisheher",
    change: "Peak active",
    up: true,
    color: "#EF9F27",
    icon: Navigation,
  },
  {
    label: "Congestion Index",
    value: "6.2",
    unit: "/ 10",
    change: "+1.1 vs yesterday",
    up: false,
    color: "#D85A30",
    icon: AlertTriangle,
  },
  {
    label: "Accessibility Score",
    value: "64",
    unit: "/ 100",
    change: "2 barriers detected",
    up: false,
    color: "#7F77DD",
    icon: Shield,
  },
]

// sidebar navigation modules
const NAV_MODULES = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "flow", label: "Flow Analytics", icon: Activity },
  { id: "transport", label: "Transport", icon: Bus },
  { id: "accessibility", label: "Accessibility", icon: Shield },
  { id: "congestion", label: "Congestion", icon: AlertTriangle },
  { id: "planning", label: "Planning", icon: Map },
  { id: "reports", label: "Reports", icon: FileText },
]

// recent alerts mock data
const ALERTS = [
  { text: "Peak threshold exceeded — Nizami St.", time: "2 min ago", color: "#D85A30" },
  { text: "Wheelchair barrier detected — Metro Exit 3", time: "8 min ago", color: "#7F77DD" },
  { text: "Bus route #12 delay — 4 min avg", time: "15 min ago", color: "#EF9F27" },
  { text: "New heatmap data — Icherisheher District", time: "22 min ago", color: "#1D9E75" },
  { text: "Congestion cleared — Tbilisi Ave.", time: "34 min ago", color: "#1D9E75" },
]

// 24h hourly data for peak chart
const HOURS_24 = [
  5, 3, 2, 2, 4, 8, 20, 55, 90, 85, 65, 60, 70, 72, 60, 55, 65, 88, 95, 80, 55, 40, 25, 12,
]

// ── Fake map component — f4map 3D OpenStreetMap ───────────────────────
function FakeMap() {
  return (
    <div
      className="flex flex-col w-full h-full rounded-xl overflow-hidden"
      style={{ background: "#0d1f17" }}
    >
      {/* map toolbar — sits above the iframe, not overlapping it */}
      <div
        className="flex items-center justify-between px-3 py-2 flex-shrink-0"
        style={{ background: "#111F18", borderBottom: "1px solid rgba(29,158,117,0.15)" }}
      >
        {/* live badge */}
        <div
          className="flex items-center gap-1.5 px-2 py-1 rounded-full"
          style={{ background: "rgba(29,158,117,0.1)", border: "1px solid rgba(29,158,117,0.3)" }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] animate-pulse" />
          <span className="text-[10px] text-[#5DCAA5] font-mono">LIVE · Baku Icherisheher</span>
        </div>

        {/* layer toggle buttons */}
        <div className="flex items-center gap-1.5">
          {[
            { label: "Flow", color: "#1D9E75", active: true },
            { label: "Heat", color: "#EF9F27", active: false },
            { label: "Access", color: "#7F77DD", active: false },
          ].map((layer) => (
            <div
              key={layer.label}
              className="px-3 py-1 rounded-lg text-[10px] font-mono cursor-pointer"
              style={{
                background: layer.active ? `${layer.color}20` : "rgba(255,255,255,0.04)",
                border: `1px solid ${layer.active ? `${layer.color}60` : "rgba(255,255,255,0.08)"}`,
                color: layer.active ? layer.color : "rgba(255,255,255,0.3)",
              }}
            >
              {layer.label}
            </div>
          ))}
        </div>
      </div>

      {/* f4map iframe — takes remaining height */}
      <div className="flex-1 relative">
        <iframe
          src="https://demo.f4map.com/#lat=40.3663&lon=49.8338&zoom=16&camera.theta=45&camera.phi=0.5"
          className="w-full h-full border-0"
          style={{ filter: "hue-rotate(140deg) saturate(0.8) brightness(0.85)" }}
          title="SmartFlow — Baku Live Map"
          loading="lazy"
        />
      </div>
    </div>
  )
}

// ── 24h bar chart component ───────────────────────────────────────────
function PeakChart() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-end gap-[2px] flex-1 pb-2">
        {HOURS_24.map((v, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-sm"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: i * 0.02, duration: 0.4 }}
            style={{
              height: `${v}%`,
              background: v >= 80 ? "#EF9F27" : v >= 55 ? "#1D9E75" : "#1D9E7535",
              originY: 1,
            }}
          />
        ))}
      </div>
      <div className="flex justify-between">
        <span className="text-[9px] text-white/30 font-mono">00:00</span>
        <span className="text-[9px] text-[#EF9F27] font-mono">↑ Peak: 18:00</span>
        <span className="text-[9px] text-white/30 font-mono">23:00</span>
      </div>
    </div>
  )
}

// ── Inclusive score bars ──────────────────────────────────────────────
function InclusiveScores() {
  const scores = [
    { label: "Wheelchair", score: 64, color: "#7F77DD" },
    { label: "Pram / Stroller", score: 78, color: "#5DCAA5" },
    { label: "Elderly", score: 55, color: "#EF9F27" },
    { label: "Visually Impaired", score: 42, color: "#D85A30" },
  ]
  return (
    <div className="space-y-3">
      {scores.map((s, i) => (
        <div key={i}>
          <div className="flex justify-between mb-1">
            <span className="text-[10px] text-white/50 font-mono">{s.label}</span>
            <span className="text-[10px] font-mono" style={{ color: s.color }}>
              {s.score}/100
            </span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: s.color }}
              initial={{ width: 0 }}
              animate={{ width: `${s.score}%` }}
              transition={{ duration: 1, delay: i * 0.15 }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Main Dashboard Page ───────────────────────────────────────────────
export default function DashboardPage() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeModule, setActiveModule] = useState("overview")
  const [userName, setUserName] = useState("User")

  // auth guard — redirect if not logged in
  useEffect(() => {
    const auth = localStorage.getItem("sf_auth")
    const name = localStorage.getItem("sf_user")
    if (auth !== "true") {
      router.push("/sign-in")
      return
    }
    if (name) setUserName(name)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("sf_auth")
    localStorage.removeItem("sf_user")
    router.push("/")
  }

  const activeLabel = NAV_MODULES.find((m) => m.id === activeModule)?.label || "Overview"

  return (
    <div className="flex min-h-screen w-full" style={{ background: "#0B1B14" }}>
      {/* ── SIDEBAR ──────────────────────────────────────────────── */}
      <motion.nav
        animate={{ width: sidebarOpen ? 240 : 64 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative flex-shrink-0 flex flex-col h-screen sticky top-0"
        style={{ background: "#111F18", borderRight: "1px solid rgba(29,158,117,0.12)" }}
      >
        {/* logo section */}
        <div
          className="flex items-center gap-3 p-4 border-b"
          style={{ borderColor: "rgba(29,158,117,0.12)" }}
        >
          <SmartFlowLogo size={32} />
          <AnimatePresence>
            {sidebarOpen && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-white font-semibold text-base tracking-tight whitespace-nowrap"
              >
                SmartFlow
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* nav modules */}
        <div className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
          {NAV_MODULES.map((module) => {
            const Icon = module.icon
            const isActive = activeModule === module.id
            return (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200"
                style={{
                  background: isActive ? "rgba(29,158,117,0.15)" : "transparent",
                  borderLeft: isActive ? "2px solid #1D9E75" : "2px solid transparent",
                  color: isActive ? "#5DCAA5" : "rgba(255,255,255,0.4)",
                }}
              >
                <Icon size={16} className="flex-shrink-0" />
                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm whitespace-nowrap"
                    >
                      {module.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            )
          })}
        </div>

        {/* logout button at bottom */}
        <div className="p-2 border-t" style={{ borderColor: "rgba(29,158,117,0.12)" }}>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors"
            style={{ color: "rgba(255,255,255,0.3)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#D85A30")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
          >
            <LogOut size={16} className="flex-shrink-0" />
            <AnimatePresence>
              {sidebarOpen && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm whitespace-nowrap">
                  Sign Out
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* collapse toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full flex items-center justify-center z-10 transition-colors"
          style={{ background: "#1D9E75", border: "2px solid #0B1B14" }}
        >
          <motion.div animate={{ rotate: sidebarOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronRight size={12} className="text-white" />
          </motion.div>
        </button>
      </motion.nav>

      {/* ── MAIN CONTENT ─────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-h-screen overflow-auto">
        {/* top bar */}
        <header
          className="flex items-center justify-between px-6 py-4 sticky top-0 z-10"
          style={{
            background: "rgba(11,27,20,0.95)",
            borderBottom: "1px solid rgba(29,158,117,0.1)",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* current module title */}
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] animate-pulse" />
            <h1 className="text-white font-medium text-lg">{activeLabel}</h1>
            {/* breadcrumb context */}
            <span className="text-white/20 text-sm font-mono hidden sm:block">· Baku Central District</span>
          </div>

          {/* right controls */}
          <div className="flex items-center gap-3">
            {/* time filter */}
            <div
              className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono"
              style={{ background: "#111F18", border: "1px solid rgba(29,158,117,0.2)", color: "#5DCAA5" }}
            >
              <Clock size={11} />
              <span>Today · 00:00–23:59</span>
            </div>
            {/* notifications */}
            <button
              className="relative p-2 rounded-lg transition-colors"
              style={{ background: "#111F18", border: "1px solid rgba(29,158,117,0.15)" }}
            >
              <Bell size={16} className="text-white/50" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#D85A30]" />
            </button>
            {/* user */}
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
              style={{ background: "#111F18", border: "1px solid rgba(29,158,117,0.15)" }}
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                style={{ background: "#1D9E75" }}
              >
                {userName.charAt(0).toUpperCase()}
              </div>
              <span className="text-xs text-white/60 hidden sm:block">{userName}</span>
            </div>
          </div>
        </header>

        {/* page content */}
        <main className="flex-1 p-6 space-y-6">
          {/* KPI cards row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {KPI_DATA.map((kpi, i) => {
              const Icon = kpi.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="p-4 rounded-xl"
                  style={{ background: "#111F18", border: "1px solid rgba(29,158,117,0.12)" }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] text-white/40 font-mono uppercase tracking-wider">{kpi.label}</span>
                    <Icon size={14} style={{ color: kpi.color }} />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1 font-mono">{kpi.value}</div>
                  <div className="text-[10px] text-white/30 font-mono">{kpi.unit}</div>
                  <div className="flex items-center gap-1 mt-2">
                    {kpi.up ? (
                      <TrendingUp size={10} style={{ color: kpi.color }} />
                    ) : (
                      <TrendingDown size={10} style={{ color: kpi.color }} />
                    )}
                    <span className="text-[10px] font-mono" style={{ color: kpi.color }}>
                      {kpi.change}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* main grid: map + side panels */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4" style={{ height: "380px" }}>
            {/* map — takes 2 columns */}
            <div
              className="lg:col-span-2 rounded-xl overflow-hidden"
              style={{ background: "#111F18", border: "1px solid rgba(29,158,117,0.12)" }}
            >
              <FakeMap />
            </div>

            {/* right panel: alerts */}
            <div
              className="rounded-xl p-4 flex flex-col"
              style={{ background: "#111F18", border: "1px solid rgba(29,158,117,0.12)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-white/60 font-mono uppercase tracking-wider">Live Alerts</span>
                <div className="w-1.5 h-1.5 rounded-full bg-[#D85A30] animate-pulse" />
              </div>
              <div className="space-y-3 flex-1 overflow-auto">
                {ALERTS.map((alert, i) => (
                  <div
                    key={i}
                    className="flex gap-2 p-2 rounded-lg"
                    style={{ background: "rgba(255,255,255,0.02)" }}
                  >
                    <div
                      className="w-1 rounded-full flex-shrink-0 mt-1"
                      style={{ backgroundColor: alert.color, minHeight: "30px" }}
                    />
                    <div>
                      <p className="text-xs text-white/70 leading-snug">{alert.text}</p>
                      <p className="text-[10px] text-white/25 font-mono mt-1">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* bottom grid: 24h chart + inclusive scores */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* 24h peak chart */}
            <div
              className="p-4 rounded-xl"
              style={{ background: "#111F18", border: "1px solid rgba(29,158,117,0.12)", height: "200px" }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-white/60 font-mono uppercase tracking-wider">24h Peak Hours</span>
                <span className="text-[10px] text-[#EF9F27] font-mono">Peak: 18:00–19:00</span>
              </div>
              <div style={{ height: "140px" }}>
                <PeakChart />
              </div>
            </div>

            {/* inclusive mobility scores */}
            <div
              className="p-4 rounded-xl"
              style={{ background: "#111F18", border: "1px solid rgba(29,158,117,0.12)", height: "200px" }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-white/60 font-mono uppercase tracking-wider">Inclusive Mobility</span>
                <span className="text-[10px] text-[#7F77DD] font-mono">Icherisheher · Today</span>
              </div>
              <InclusiveScores />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

