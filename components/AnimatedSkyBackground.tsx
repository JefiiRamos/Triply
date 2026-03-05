"use client"

import { motion, useReducedMotion } from "framer-motion"

type AnimatedSkyBackgroundProps = {
  /** controla intensidade do fundo (0 a 1) */
  intensity?: number
  /** tempo (em segundos) de um ciclo completo */
  duration?: number
  /** z-index do background (mantém atrás do conteúdo) */
  zIndex?: number
}

function PlaneSvg(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      {/* corpo */}
      <path
        d="M3 34.2c0-1.3 1.1-2.4 2.4-2.4h18.3l15-14.7c1.1-1.1 2.9-1.1 4 0l1.1 1.1c.8.8 1 2.1.3 3.1L36.6 31.8h17.2c1.3 0 2.4 1.1 2.4 2.4v1.6c0 1.3-1.1 2.4-2.4 2.4H36.6l7.5 10.4c.7 1 .5 2.3-.3 3.1l-1.1 1.1c-1.1 1.1-2.9 1.1-4 0l-15-14.7H5.4C4.1 41.1 3 40 3 38.7v-4.5Z"
        fill="currentColor"
        opacity="0.9"
      />
      {/* asa */}
      <path
        d="M23 31.8 14.5 24c-.6-.6-.7-1.5-.2-2.2l1-1.4c.5-.7 1.5-.9 2.2-.4l12.6 8.3H23Z"
        fill="currentColor"
        opacity="0.65"
      />
      {/* asa traseira */}
      <path
        d="M23 38.2 14.5 46c-.6.6-.7 1.5-.2 2.2l1 1.4c.5.7 1.5.9 2.2.4l12.6-8.3H23Z"
        fill="currentColor"
        opacity="0.65"
      />
    </svg>
  )
}

export default function AnimatedSkyBackground({
  intensity = 1,
  duration = 15,
  zIndex = 0,
}: AnimatedSkyBackgroundProps) {
  const reduce = useReducedMotion()

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex }}
    >
      {/* Camada base: gradientes “azulados” */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.9 * intensity,
          background:
            "radial-gradient(1200px 600px at 20% 10%, rgba(59,130,246,0.18), transparent 55%)," +
            "radial-gradient(900px 520px at 80% 20%, rgba(14,165,233,0.14), transparent 55%)," +
            "radial-gradient(1000px 700px at 50% 90%, rgba(37,99,235,0.10), transparent 60%)," +
            "linear-gradient(180deg, rgba(248,250,252,0.96), rgba(255,255,255,1))",
        }}
      />

      {/* “Noise” leve (sem imagem externa) */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
        }}
      />

      {/* Faixa de “luz” sutil animada (bem discreta) */}
      {!reduce && (
        <motion.div
          className="absolute -inset-x-32 -top-40 h-[420px] rotate-6"
          initial={{ x: -200, opacity: 0.0 }}
          animate={{ x: 200, opacity: 0.18 }}
          transition={{
            duration: 6,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
          style={{
            background:
              "radial-gradient(closest-side, rgba(59,130,246,0.22), transparent 65%)",
            filter: "blur(18px)",
          }}
        />
      )}

      {/* Avião atravessando a tela (a cada 15s) */}
      <motion.div
        className="absolute left-0 top-[18%] md:top-[16%]"
        initial={{ x: "-20vw", y: 0, opacity: 0 }}
        animate={
          reduce
            ? { opacity: 0 } // respeita redução de movimento
            : { x: "120vw", y: [0, -6, 0], opacity: [0, 1, 1, 0] }
        }
        transition={
          reduce
            ? { duration: 0 }
            : {
                duration,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 0, // um ciclo completo já é o duration
                times: [0, 0.2, 0.85, 1],
              }
        }
        style={{ filter: "blur(0px)" }}
      >
        <motion.div
          className="relative"
          initial={{ rotate: -2 }}
          animate={reduce ? {} : { rotate: [-2, 0, -1] }}
          transition={
            reduce
              ? {}
              : { duration: duration, ease: "easeInOut", repeat: Infinity }
          }
        >
          {/* trilha */}
          {!reduce && (
            <div className="absolute left-[-220px] top-1/2 h-[2px] w-[220px] -translate-y-1/2 bg-gradient-to-r from-transparent via-sky-300/40 to-transparent" />
          )}

          <PlaneSvg className="h-10 w-10 text-sky-500/75 drop-shadow-[0_12px_28px_rgba(59,130,246,0.18)] md:h-12 md:w-12" />
        </motion.div>
      </motion.div>
    </div>
  )
}