import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import FadeIn from '../components/FadeIn'

/* ── Statistics data ── */
interface Stat {
  value: number
  suffix: string
  label: string
}

const STATS: Stat[] = [
  { value: 15, suffix: '+', label: 'Brands Worked With' },
  { value: 100, suffix: '+', label: 'Projects Delivered' },
  { value: 8, suffix: 'M+', label: 'Content Views Generated' },
  { value: 1.2, suffix: 'K', label: 'Videos Edited' },
]

/* ═══════════════════════════════════════════════════════════
   ANIMATED COUNTER
   ═══════════════════════════════════════════════════════════ */

function useCountUp(
  target: number,
  duration: number,
  shouldStart: boolean,
): number {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!shouldStart) return

    let startTime: number | null = null
    let rafId: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Ease-out cubic for a polished deceleration
      const eased = 1 - Math.pow(1 - progress, 3)
      setCurrent(eased * target)

      if (progress < 1) {
        rafId = requestAnimationFrame(animate)
      }
    }

    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [target, duration, shouldStart])

  return current
}

/* ── Single stat block ── */
function StatBlock({
  stat,
  index,
  isInView,
}: {
  stat: Stat
  index: number
  isInView: boolean
}) {
  const count = useCountUp(stat.value, 1800, isInView)

  // Format the displayed number
  const displayed =
    stat.value % 1 !== 0
      ? count.toFixed(1) // e.g. 1.2
      : Math.floor(count).toString()

  return (
    <motion.div
      className="btn-stat-block"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: 0.2 + index * 0.12,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <span className="btn-stat-value">
        {displayed}
        <span className="btn-stat-suffix">{stat.suffix}</span>
      </span>
      <span className="btn-stat-label">{stat.label}</span>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════
   BY THE NUMBERS SECTION
   ═══════════════════════════════════════════════════════════ */

export default function ByTheNumbersSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section className="btn-section" ref={sectionRef}>
      {/* Header */}
      <FadeIn delay={0} y={30}>
        <div className="btn-header">
          <span className="btn-label">Impact</span>
          <h2 className="btn-heading">
            By The <span className="btn-heading-accent">Numbers</span>
          </h2>
          <p className="btn-subheading">
            Four years of helping brands, creators, and businesses
            grow through strategic editing, design, and storytelling.
          </p>
        </div>
      </FadeIn>

      {/* Stats grid */}
      <div className="btn-stats-grid">
        {STATS.map((stat, i) => (
          <StatBlock
            key={stat.label}
            stat={stat}
            index={i}
            isInView={isInView}
          />
        ))}
      </div>

      {/* Divider */}
      <div className="btn-bottom-line" />

      <style>{`
        .btn-section {
          background: #0C0C0C;
          padding: 80px 16px 60px;
          position: relative;
          overflow: hidden;
        }

        /* ── Header ── */
        .btn-header {
          text-align: center;
          max-width: 600px;
          margin: 0 auto 56px;
        }

        .btn-label {
          display: inline-block;
          color: #A855F7;
          font-family: 'Kanit', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          margin-bottom: 14px;
        }

        .btn-heading {
          font-family: 'Kanit', sans-serif;
          font-weight: 900;
          font-size: clamp(1.8rem, 4.5vw, 3rem);
          color: #D7E2EA;
          text-transform: uppercase;
          line-height: 1.1;
          margin-bottom: 16px;
          letter-spacing: -0.01em;
        }

        .btn-heading-accent {
          background: linear-gradient(135deg, #A855F7 0%, #B600A8 50%, #7621B0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .btn-subheading {
          font-family: 'Kanit', sans-serif;
          font-weight: 300;
          font-size: clamp(0.85rem, 1.3vw, 1rem);
          line-height: 1.7;
          color: rgba(215, 226, 234, 0.45);
        }

        /* ── Stats Grid — Mobile-first: 2×2 ── */
        .btn-stats-grid {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 40px 20px;
        }

        /* ── Stat Block ── */
        .btn-stat-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 8px;
          cursor: default;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }

        .btn-stat-block:hover {
          transform: translateY(-3px);
          opacity: 0.85;
        }

        .btn-stat-value {
          font-family: 'Kanit', sans-serif;
          font-weight: 900;
          font-size: clamp(2.8rem, 7vw, 5rem);
          line-height: 1;
          color: #D7E2EA;
          letter-spacing: -0.03em;
        }

        .btn-stat-suffix {
          font-size: 0.55em;
          font-weight: 700;
          color: #A855F7;
          letter-spacing: 0;
        }

        .btn-stat-label {
          font-family: 'Kanit', sans-serif;
          font-weight: 500;
          font-size: clamp(0.65rem, 1vw, 0.8rem);
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: rgba(215, 226, 234, 0.4);
          line-height: 1.4;
        }

        /* ── Bottom divider ── */
        .btn-bottom-line {
          width: 60px;
          height: 1.5px;
          background: linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.4), transparent);
          margin: 56px auto 0;
          border-radius: 2px;
        }

        /* ── Desktop: 4 columns ── */
        @media (min-width: 768px) {
          .btn-section {
            padding: 100px 24px 80px;
          }

          .btn-stats-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 32px;
          }

          .btn-header {
            margin-bottom: 64px;
          }

          .btn-bottom-line {
            margin-top: 64px;
          }
        }

        /* ── Large desktop ── */
        @media (min-width: 1024px) {
          .btn-section {
            padding: 120px 40px 100px;
          }

          .btn-stats-grid {
            gap: 48px;
          }
        }

        /* ── Small mobile ── */
        @media (max-width: 380px) {
          .btn-section {
            padding: 60px 12px 48px;
          }

          .btn-stats-grid {
            gap: 32px 16px;
          }

          .btn-stat-value {
            font-size: 2.4rem;
          }
        }
      `}</style>
    </section>
  )
}
