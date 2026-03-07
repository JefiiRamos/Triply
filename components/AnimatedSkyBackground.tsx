"use client"

import { useEffect, useRef, useState } from "react"

// --- SVG do avião detalhado ---
function PlaneIcon({ className }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" aria-hidden="true" className={className}>
      {/* Fuselagem */}
      <path
        d="M8 40 Q30 36 58 38 Q66 38.5 70 40 Q66 41.5 58 42 Q30 44 8 40Z"
        fill="white"
        opacity="0.95"
      />
      {/* Asa principal */}
      <path
        d="M28 40 L18 24 L22 24 L38 39 Z"
        fill="white"
        opacity="0.9"
      />
      <path
        d="M28 40 L18 56 L22 56 L38 41 Z"
        fill="white"
        opacity="0.9"
      />
      {/* Nariz */}
      <path
        d="M58 38 Q72 39 75 40 Q72 41 58 42 Z"
        fill="white"
        opacity="0.85"
      />
      {/* Cauda vertical */}
      <path
        d="M14 40 L10 30 L17 38 Z"
        fill="white"
        opacity="0.8"
      />
      {/* Cauda horizontal */}
      <path
        d="M14 40 L8 35 L12 39 Z"
        fill="white"
        opacity="0.75"
      />
      <path
        d="M14 40 L8 45 L12 41 Z"
        fill="white"
        opacity="0.75"
      />
    </svg>
  )
}

// --- Estrelas/partículas de fundo ---
function StarField({ count = 60 }) {
  const stars = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 5,
    }))
  ).current

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            background: "white",
            opacity: s.opacity,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite alternate`,
          }}
        />
      ))}
    </div>
  )
}

// --- Nuvem decorativa ---
function Cloud({ style, className = "" }) {
  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={style}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          filter: "blur(1px)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(255,255,255,0.18)",
            borderRadius: "50%",
            transform: "scaleX(2.5)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "20%",
            top: "-35%",
            width: "50%",
            height: "80%",
            background: "rgba(255,255,255,0.14)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "45%",
            top: "-20%",
            width: "40%",
            height: "65%",
            background: "rgba(255,255,255,0.12)",
            borderRadius: "50%",
          }}
        />
      </div>
    </div>
  )
}

// --- Avião animado com trilha de vapor ---
function AnimatedPlane({
  startDelay = 0,
  yPercent = 25,
  scale = 1,
  duration = 8,
  trailLength = 180,
  opacity = 1,
  flipY = false,
}) {
  const [phase, setPhase] = useState("waiting")
  const timeoutRef = useRef(null)

  useEffect(() => {
    function cycle() {
      setPhase("flying")
      timeoutRef.current = setTimeout(() => {
        setPhase("waiting")
        timeoutRef.current = setTimeout(cycle, (Math.random() * 4 + 2) * 1000)
      }, duration * 1000 + 1000)
    }

    timeoutRef.current = setTimeout(cycle, startDelay * 1000)
    return () => clearTimeout(timeoutRef.current)
  }, [startDelay, duration])

  const isFlying = phase === "flying"

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        top: `${yPercent}%`,
        left: 0,
        right: 0,
        height: 0,
        transform: flipY ? "scaleY(-1)" : undefined,
      }}
    >
      {/* Avião */}
      <div
        style={{
          position: "absolute",
          top: -16 * scale,
          left: 0,
          width: "100%",
          height: 32 * scale,
          transition: `transform ${duration}s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.8s ease`,
          transform: isFlying ? "translateX(110vw)" : "translateX(-12vw)",
          opacity: isFlying ? opacity : 0,
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Trilha de vapor */}
        <div
          style={{
            position: "absolute",
            right: "100%",
            top: "50%",
            height: 2 * scale,
            width: trailLength,
            marginTop: -1 * scale,
            background: `linear-gradient(to left, rgba(255,255,255,0.55), rgba(255,255,255,0.0))`,
            borderRadius: 4,
            filter: "blur(1.5px)",
            transition: `opacity 0.5s`,
            opacity: isFlying ? 1 : 0,
          }}
        />
        {/* Segunda trilha (ligeiramente offset) */}
        <div
          style={{
            position: "absolute",
            right: "100%",
            top: "50%",
            height: 1.5 * scale,
            width: trailLength * 0.75,
            marginTop: 3 * scale,
            background: `linear-gradient(to left, rgba(255,255,255,0.35), rgba(255,255,255,0.0))`,
            borderRadius: 4,
            filter: "blur(2px)",
            opacity: isFlying ? 0.7 : 0,
            transition: `opacity 0.5s`,
          }}
        />
        {/* Ícone do avião */}
        <PlaneIcon
          className=""
          style={{
            width: 52 * scale,
            height: 52 * scale,
            filter: `drop-shadow(0 4px 16px rgba(100,180,255,0.4)) drop-shadow(0 0 6px rgba(255,255,255,0.3))`,
          }}
        />
      </div>
    </div>
  )
}

// --- Componente principal ---
export default function AnimatedSkyBackground({
  intensity = 1,
  zIndex = 0,
  children,
}) {
  return (
    <>
      <style>{`
        @keyframes twinkle {
          0% { opacity: var(--from-opacity, 0.1); transform: scale(1); }
          100% { opacity: var(--to-opacity, 0.5); transform: scale(1.3); }
        }
        @keyframes cloudDrift {
          0% { transform: translateX(0px); }
          50% { transform: translateX(18px); }
          100% { transform: translateX(0px); }
        }
        @keyframes cloudDriftSlow {
          0% { transform: translateX(0px); }
          50% { transform: translateX(-12px); }
          100% { transform: translateX(0px); }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes shimmer {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
      `}</style>

      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        {/* --- Gradiente de fundo principal --- */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `
              linear-gradient(
                165deg,
                #0a1628 0%,
                #0d2244 20%,
                #0e3060 42%,
                #1a4a8a 65%,
                #1e5fa8 82%,
                #2176c2 100%
              )
            `,
            opacity: intensity,
          }}
        />

        {/* --- Glow atmosférico --- */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `
              radial-gradient(ellipse 80% 40% at 50% -10%, rgba(56,189,248,0.18) 0%, transparent 65%),
              radial-gradient(ellipse 60% 50% at 80% 30%, rgba(14,165,233,0.12) 0%, transparent 55%),
              radial-gradient(ellipse 70% 60% at 10% 60%, rgba(30,58,138,0.25) 0%, transparent 60%)
            `,
            opacity: intensity,
          }}
        />

        {/* --- Horizon glow --- */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "40%",
            background: `linear-gradient(to top, rgba(30,95,168,0.35), transparent)`,
          }}
        />

        {/* --- Estrelas --- */}
        <StarField count={80} />

        {/* --- Nuvens decorativas --- */}
        <Cloud
          style={{
            left: "5%",
            top: "12%",
            width: 220,
            height: 55,
            animation: "cloudDrift 20s ease-in-out infinite",
          }}
        />
        <Cloud
          style={{
            left: "35%",
            top: "6%",
            width: 160,
            height: 40,
            animation: "cloudDriftSlow 26s ease-in-out infinite",
          }}
        />
        <Cloud
          style={{
            right: "10%",
            top: "18%",
            width: 190,
            height: 48,
            animation: "cloudDrift 23s ease-in-out 3s infinite",
          }}
        />
        <Cloud
          style={{
            left: "60%",
            top: "35%",
            width: 130,
            height: 32,
            opacity: 0.6,
            animation: "cloudDriftSlow 30s ease-in-out 5s infinite",
          }}
        />
        <Cloud
          style={{
            left: "15%",
            top: "55%",
            width: 100,
            height: 26,
            opacity: 0.4,
            animation: "cloudDrift 18s ease-in-out 8s infinite",
          }}
        />

        {/* --- Aviões animados --- */}
        {/* Avião grande, rota principal */}
        <AnimatedPlane
          startDelay={1}
          yPercent={22}
          scale={1.1}
          duration={9}
          trailLength={200}
          opacity={0.95}
        />

        {/* Avião médio, rota intermediária */}
        <AnimatedPlane
          startDelay={5.5}
          yPercent={45}
          scale={0.75}
          duration={10}
          trailLength={150}
          opacity={0.75}
        />

        {/* Avião pequeno/distante */}
        <AnimatedPlane
          startDelay={9}
          yPercent={14}
          scale={0.5}
          duration={12}
          trailLength={110}
          opacity={0.55}
        />

        {/* Avião extra — aparece na parte inferior, direção oposta */}
        <AnimatedPlane
          startDelay={3}
          yPercent={68}
          scale={0.65}
          duration={11}
          trailLength={130}
          opacity={0.6}
          flipY
        />

        {/* --- Grade/overlay sutil para profundidade --- */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* --- Vinheta nas bordas --- */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `
              radial-gradient(ellipse at center, transparent 55%, rgba(5,15,40,0.55) 100%)
            `,
          }}
        />
      </div>

      {/* Conteúdo por cima */}
      {children && (
        <div style={{ position: "relative", zIndex: zIndex + 1 }}>
          {children}
        </div>
      )}
    </>
  )
}