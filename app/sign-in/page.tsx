"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import SmartFlowLogo from "@/components/shared/SmartFlowLogo"

// ── Pupil component — tracks mouse position ──────────────────────────
interface PupilProps {
  size?: number
  maxDistance?: number
  pupilColor?: string
  forceLookX?: number
  forceLookY?: number
}

const Pupil = ({ size = 12, maxDistance = 5, pupilColor = "#0B1B14", forceLookX, forceLookY }: PupilProps) => {
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const pupilRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX)
      setMouseY(e.clientY)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const getPos = () => {
    if (!pupilRef.current) return { x: 0, y: 0 }
    if (forceLookX !== undefined && forceLookY !== undefined) return { x: forceLookX, y: forceLookY }
    const rect = pupilRef.current.getBoundingClientRect()
    const dx = mouseX - (rect.left + rect.width / 2)
    const dy = mouseY - (rect.top + rect.height / 2)
    const dist = Math.min(Math.sqrt(dx ** 2 + dy ** 2), maxDistance)
    const angle = Math.atan2(dy, dx)
    return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist }
  }

  const pos = getPos()
  return (
    <div
      ref={pupilRef}
      className="rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: pupilColor,
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: "transform 0.1s ease-out",
      }}
    />
  )
}

// ── EyeBall component — full eye with pupil and blinking ─────────────
interface EyeBallProps {
  size?: number
  pupilSize?: number
  maxDistance?: number
  eyeColor?: string
  pupilColor?: string
  isBlinking?: boolean
  forceLookX?: number
  forceLookY?: number
}

const EyeBall = ({
  size = 48,
  pupilSize = 16,
  maxDistance = 10,
  eyeColor = "white",
  pupilColor = "#0B1B14",
  isBlinking = false,
  forceLookX,
  forceLookY,
}: EyeBallProps) => {
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const eyeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX)
      setMouseY(e.clientY)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const getPos = () => {
    if (!eyeRef.current) return { x: 0, y: 0 }
    if (forceLookX !== undefined && forceLookY !== undefined) return { x: forceLookX, y: forceLookY }
    const rect = eyeRef.current.getBoundingClientRect()
    const dx = mouseX - (rect.left + rect.width / 2)
    const dy = mouseY - (rect.top + rect.height / 2)
    const dist = Math.min(Math.sqrt(dx ** 2 + dy ** 2), maxDistance)
    const angle = Math.atan2(dy, dx)
    return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist }
  }

  const pos = getPos()
  return (
    <div
      ref={eyeRef}
      className="rounded-full flex items-center justify-center transition-all duration-150"
      style={{
        width: size,
        height: isBlinking ? 2 : size,
        backgroundColor: eyeColor,
        overflow: "hidden",
      }}
    >
      {!isBlinking && (
        <div
          className="rounded-full"
          style={{
            width: pupilSize,
            height: pupilSize,
            backgroundColor: pupilColor,
            transform: `translate(${pos.x}px, ${pos.y}px)`,
            transition: "transform 0.1s ease-out",
          }}
        />
      )}
    </div>
  )
}

// ── Main Sign In Page ─────────────────────────────────────────────────
export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [isLookingAtEachOther, setIsLookingAtEachOther] = useState(false)
  const [isPurpleBlinking, setIsPurpleBlinking] = useState(false)
  const [isBlackBlinking, setIsBlackBlinking] = useState(false)
  const [isPurplePeeking, setIsPurplePeeking] = useState(false)

  const purpleRef = useRef<HTMLDivElement>(null)
  const blackRef = useRef<HTMLDivElement>(null)
  const yellowRef = useRef<HTMLDivElement>(null)
  const orangeRef = useRef<HTMLDivElement>(null)
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX)
      setMouseY(e.clientY)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // random blinking for purple character
  useEffect(() => {
    const scheduleBlink = () => {
      const t = setTimeout(() => {
        setIsPurpleBlinking(true)
        setTimeout(() => {
          setIsPurpleBlinking(false)
          scheduleBlink()
        }, 150)
      }, Math.random() * 4000 + 3000)
      return t
    }
    const t = scheduleBlink()
    return () => clearTimeout(t)
  }, [])

  // random blinking for teal character
  useEffect(() => {
    const scheduleBlink = () => {
      const t = setTimeout(() => {
        setIsBlackBlinking(true)
        setTimeout(() => {
          setIsBlackBlinking(false)
          scheduleBlink()
        }, 150)
      }, Math.random() * 4000 + 3000)
      return t
    }
    const t = scheduleBlink()
    return () => clearTimeout(t)
  }, [])

  // when typing starts — characters look at each other briefly
  useEffect(() => {
    if (isTyping) {
      setIsLookingAtEachOther(true)
      const t = setTimeout(() => setIsLookingAtEachOther(false), 800)
      return () => clearTimeout(t)
    } else {
      setIsLookingAtEachOther(false)
    }
  }, [isTyping])

  // purple peeks when password is visible
  useEffect(() => {
    if (password.length > 0 && showPassword) {
      const t = setTimeout(() => {
        setIsPurplePeeking(true)
        setTimeout(() => setIsPurplePeeking(false), 800)
      }, Math.random() * 3000 + 2000)
      return () => clearTimeout(t)
    } else {
      setIsPurplePeeking(false)
    }
  }, [password, showPassword, isPurplePeeking])

  // calculate character lean based on mouse position
  const calculatePos = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return { faceX: 0, faceY: 0, bodySkew: 0 }
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 3
    const dx = mouseX - cx
    const dy = mouseY - cy
    return {
      faceX: Math.max(-15, Math.min(15, dx / 20)),
      faceY: Math.max(-10, Math.min(10, dy / 30)),
      bodySkew: Math.max(-6, Math.min(6, -dx / 120)),
    }
  }

  const purplePos = calculatePos(purpleRef)
  const blackPos = calculatePos(blackRef)
  const yellowPos = calculatePos(yellowRef)
  const orangePos = calculatePos(orangeRef)

  // fake auth — no backend, just credential check
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 600)) // fake loading delay

    if (email.endsWith("@gmail.com") && password.length > 0) {
      // store fake session in localStorage
      localStorage.setItem("sf_auth", "true")
      localStorage.setItem("sf_user", "Husein")
      router.push("/dashboard")
    } else {
      setError("Invalid credentials. Please check your email and password.")
    }
    setIsLoading(false)
  }

  const passwordHidden = password.length > 0 && !showPassword

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#0B1B14]">
      {/* ── LEFT: animated characters panel ── */}
      <div
        className="relative hidden lg:flex flex-col justify-between p-12"
        style={{ background: "linear-gradient(135deg, #0B1B14 0%, #111F18 50%, #162820 100%)" }}
      >
        {/* top left logo */}
        <div className="relative z-20 flex items-center gap-2">
          <SmartFlowLogo size={32} />
          <span className="text-white font-semibold text-lg tracking-tight">SmartFlow</span>
        </div>

        {/* animated characters — centered vertically */}
        <div className="relative z-20 flex items-end justify-center h-[420px]">
          <div className="relative" style={{ width: 520, height: 380 }}>
            {/* PURPLE character — tall rectangle, back layer */}
            {/* CHANGE from original: color #6C3FF5 → #1D9E75 (SmartFlow teal) */}
            <div
              ref={purpleRef}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: 60,
                width: 170,
                height: passwordHidden ? 430 : 390,
                backgroundColor: "#1D9E75", // SmartFlow teal instead of purple
                borderRadius: "10px 10px 0 0",
                zIndex: 1,
                transform: passwordHidden
                  ? `skewX(0deg)`
                  : isTyping
                    ? `skewX(${(purplePos.bodySkew || 0) - 12}deg) translateX(40px)`
                    : `skewX(${purplePos.bodySkew || 0}deg)`,
                transformOrigin: "bottom center",
              }}
            >
              <div
                className="absolute flex gap-7 transition-all duration-700 ease-in-out"
                style={{
                  left: passwordHidden ? 18 : isLookingAtEachOther ? 52 : 42 + purplePos.faceX,
                  top: passwordHidden ? 32 : isLookingAtEachOther ? 62 : 38 + purplePos.faceY,
                }}
              >
                <EyeBall
                  size={17}
                  pupilSize={7}
                  maxDistance={5}
                  eyeColor="white"
                  pupilColor="#0B1B14"
                  isBlinking={isPurpleBlinking}
                  forceLookX={passwordHidden ? (isPurplePeeking ? 4 : -4) : isLookingAtEachOther ? 3 : undefined}
                  forceLookY={passwordHidden ? (isPurplePeeking ? 5 : -4) : isLookingAtEachOther ? 4 : undefined}
                />
                <EyeBall
                  size={17}
                  pupilSize={7}
                  maxDistance={5}
                  eyeColor="white"
                  pupilColor="#0B1B14"
                  isBlinking={isPurpleBlinking}
                  forceLookX={passwordHidden ? (isPurplePeeking ? 4 : -4) : isLookingAtEachOther ? 3 : undefined}
                  forceLookY={passwordHidden ? (isPurplePeeking ? 5 : -4) : isLookingAtEachOther ? 4 : undefined}
                />
              </div>
            </div>

            {/* DARK character — middle layer */}
            {/* CHANGE: color kept dark #111F18 (SmartFlow surface) */}
            <div
              ref={blackRef}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: 222,
                width: 115,
                height: 300,
                backgroundColor: "#111F18",
                borderRadius: "8px 8px 0 0",
                zIndex: 2,
                transform: passwordHidden
                  ? `skewX(0deg)`
                  : isLookingAtEachOther
                    ? `skewX(${(blackPos.bodySkew || 0) * 1.5 + 10}deg) translateX(20px)`
                    : `skewX(${blackPos.bodySkew || 0}deg)`,
                transformOrigin: "bottom center",
                border: "1px solid rgba(29,158,117,0.2)",
              }}
            >
              <div
                className="absolute flex gap-5 transition-all duration-700 ease-in-out"
                style={{
                  left: passwordHidden ? 8 : isLookingAtEachOther ? 30 : 24 + blackPos.faceX,
                  top: passwordHidden ? 26 : isLookingAtEachOther ? 10 : 30 + blackPos.faceY,
                }}
              >
                <EyeBall
                  size={15}
                  pupilSize={6}
                  maxDistance={4}
                  eyeColor="white"
                  pupilColor="#0B1B14"
                  isBlinking={isBlackBlinking}
                  forceLookX={passwordHidden ? -4 : isLookingAtEachOther ? 0 : undefined}
                  forceLookY={passwordHidden ? -4 : isLookingAtEachOther ? -4 : undefined}
                />
                <EyeBall
                  size={15}
                  pupilSize={6}
                  maxDistance={4}
                  eyeColor="white"
                  pupilColor="#0B1B14"
                  isBlinking={isBlackBlinking}
                  forceLookX={passwordHidden ? -4 : isLookingAtEachOther ? 0 : undefined}
                  forceLookY={passwordHidden ? -4 : isLookingAtEachOther ? -4 : undefined}
                />
              </div>
            </div>

            {/* ORANGE semi-circle — front left */}
            {/* CHANGE: color #FF9B6B → #EF9F27 (SmartFlow amber) */}
            <div
              ref={orangeRef}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: 0,
                width: 230,
                height: 190,
                backgroundColor: "#EF9F27", // amber
                borderRadius: "115px 115px 0 0",
                zIndex: 3,
                transform: passwordHidden ? `skewX(0deg)` : `skewX(${orangePos.bodySkew || 0}deg)`,
                transformOrigin: "bottom center",
              }}
            >
              <div
                className="absolute flex gap-7 transition-all duration-200 ease-out"
                style={{
                  left: passwordHidden ? 48 : 78 + (orangePos.faceX || 0),
                  top: passwordHidden ? 82 : 88 + (orangePos.faceY || 0),
                }}
              >
                <Pupil
                  size={11}
                  maxDistance={5}
                  pupilColor="#0B1B14"
                  forceLookX={passwordHidden ? -5 : undefined}
                  forceLookY={passwordHidden ? -4 : undefined}
                />
                <Pupil
                  size={11}
                  maxDistance={5}
                  pupilColor="#0B1B14"
                  forceLookX={passwordHidden ? -5 : undefined}
                  forceLookY={passwordHidden ? -4 : undefined}
                />
              </div>
            </div>

            {/* PURPLE character — front right */}
            {/* CHANGE: color #E8D754 → #7F77DD (SmartFlow purple/inclusive) */}
            <div
              ref={yellowRef}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: 295,
                width: 135,
                height: 220,
                backgroundColor: "#7F77DD", // SmartFlow purple
                borderRadius: "68px 68px 0 0",
                zIndex: 4,
                transform: passwordHidden ? `skewX(0deg)` : `skewX(${yellowPos.bodySkew || 0}deg)`,
                transformOrigin: "bottom center",
              }}
            >
              <div
                className="absolute flex gap-5 transition-all duration-200 ease-out"
                style={{
                  left: passwordHidden ? 18 : 50 + (yellowPos.faceX || 0),
                  top: passwordHidden ? 32 : 38 + (yellowPos.faceY || 0),
                }}
              >
                <Pupil
                  size={11}
                  maxDistance={5}
                  pupilColor="#0B1B14"
                  forceLookX={passwordHidden ? -5 : undefined}
                  forceLookY={passwordHidden ? -4 : undefined}
                />
                <Pupil
                  size={11}
                  maxDistance={5}
                  pupilColor="#0B1B14"
                  forceLookX={passwordHidden ? -5 : undefined}
                  forceLookY={passwordHidden ? -4 : undefined}
                />
              </div>
              {/* mouth line */}
              <div
                className="absolute h-[3px] rounded-full transition-all duration-200 ease-out"
                style={{
                  backgroundColor: "#0B1B14",
                  width: 75,
                  left: passwordHidden ? 8 : 38 + (yellowPos.faceX || 0),
                  top: passwordHidden ? 85 : 85 + (yellowPos.faceY || 0),
                }}
              />
            </div>
          </div>
        </div>

        {/* bottom links */}
        <div className="relative z-20 flex items-center gap-6 text-xs text-white/30">
          <a href="/" className="hover:text-white/60 transition-colors">
            ← Back to SmartFlow
          </a>
          <a href="#" className="hover:text-white/60 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white/60 transition-colors">
            Terms of Service
          </a>
        </div>

        {/* subtle grid overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(29,158,117,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(29,158,117,0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* ── RIGHT: login form ── */}
      <div className="flex items-center justify-center p-8 bg-[#0B1B14]">
        <div className="w-full max-w-[400px]">
          {/* mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-10">
            <SmartFlowLogo size={28} />
            <span className="text-white font-semibold text-lg">SmartFlow</span>
          </div>

          {/* header */}
          <div className="text-center mb-8">
            {/* live indicator badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#1D9E75]/30 bg-[#1D9E75]/5 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] animate-pulse" />
              <span className="text-xs text-[#1D9E75] font-mono">Secure Access Portal</span>
            </div>
            <h1 className="text-3xl font-light text-white mb-2 tracking-tight">Welcome back</h1>
            <p className="text-white/40 text-sm">Sign in to your SmartFlow dashboard</p>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-mono text-white/50 uppercase tracking-wider">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsTyping(true)}
                onBlur={() => setIsTyping(false)}
                required
                className="h-12 bg-[#111F18] border-[#1D9E75]/20 text-white placeholder:text-white/20 focus:border-[#1D9E75]/60 focus:ring-[#1D9E75]/20 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-mono text-white/50 uppercase tracking-wider">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 pr-10 bg-[#111F18] border-[#1D9E75]/20 text-white placeholder:text-white/20 focus:border-[#1D9E75]/60 rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* error message */}
            {error && (
              <div className="p-3 text-xs text-[#D85A30] bg-[#D85A30]/10 border border-[#D85A30]/20 rounded-xl font-mono">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-xl bg-[#1D9E75] text-white font-medium text-sm transition-all duration-200 hover:bg-[#5DCAA5] hover:text-[#0B1B14] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* back link */}
          <div className="text-center mt-6">
            <a href="/" className="text-xs text-white/30 hover:text-white/60 transition-colors font-mono">
              ← Return to SmartFlow platform
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

