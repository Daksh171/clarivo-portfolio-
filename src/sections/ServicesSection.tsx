import { useRef, useEffect, useState, useCallback } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  type Variants,
} from 'framer-motion'

/* ─────────────────────── Service Data ─────────────────────── */

const SERVICES = [
  {
    num: '01',
    title: 'REELS & SHORTS EDITING',
    desc: 'Fast, punchy edits built for retention — cut-to-beat pacing, trending transitions, and hook-driven storytelling for Instagram, YouTube Shorts, and TikTok.',
    image: '/services-reels.png',
    icon: 'reels',
  },
  {
    num: '02',
    title: 'YOUTUBE VIDEO EDITING',
    desc: 'Full long-form video editing including pacing, b-roll, sound design, motion graphics, and color grading that keeps viewers watching to the end.',
    image: '/services-youtube.png',
    icon: 'youtube',
  },
  {
    num: '03',
    title: 'THUMBNAIL DESIGN',
    desc: 'Scroll-stopping, click-worthy thumbnails designed to maximize CTR and stand out in a crowded feed.',
    image: '/services-thumbnail.png',
    icon: 'thumbnail',
  },
  {
    num: '04',
    title: 'CONTENT STRATEGY',
    desc: 'Planning and structuring content calendars, hooks, and formats tailored to your audience and business goals to drive consistent growth.',
    image: '/services-content.png',
    icon: 'strategy',
  },
  {
    num: '05',
    title: 'SOCIAL MEDIA MANAGEMENT',
    desc: 'End-to-end social media management designed to grow your online presence through strategic content planning, publishing, audience engagement, and performance tracking.',
    image: '/services-social.png',
    icon: 'social',
  },
]

/* ─────────────────────── Icon Components ─────────────────────── */

function ReelsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="3" width="20" height="18" rx="3" stroke="#c084fc" strokeWidth="1.5" />
      <path d="M2 8h20" stroke="#c084fc" strokeWidth="1.5" />
      <path d="M8 3l4 5" stroke="#c084fc" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 3l4 5" stroke="#c084fc" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 14l4-2.5L10 9v5z" fill="#c084fc" />
    </svg>
  )
}

function YoutubeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="3" stroke="#c084fc" strokeWidth="1.5" />
      <path d="M10 9l5 3-5 3V9z" fill="#c084fc" />
    </svg>
  )
}

function ThumbnailIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="#c084fc" strokeWidth="1.5" />
      <path d="M12 8l2 4h-4l2-4z" fill="#c084fc" />
      <path d="M8 14l2-2 2 2 3-3 3 3v3H6v-2l2-1z" stroke="#c084fc" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="16" cy="8" r="1.5" fill="#c084fc" />
    </svg>
  )
}

function StrategyIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#c084fc" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="5" stroke="#c084fc" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="1.5" fill="#c084fc" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2" stroke="#c084fc" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function SocialMediaIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="#c084fc" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="#c084fc" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="#c084fc" />
    </svg>
  )
}

const ICON_MAP: Record<string, () => React.JSX.Element> = {
  reels: ReelsIcon,
  youtube: YoutubeIcon,
  thumbnail: ThumbnailIcon,
  strategy: StrategyIcon,
  social: SocialMediaIcon,
}



/* ─────────────────────── Sparkle Icon ─────────────────────── */

function Sparkle({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
    >
      <path
        d="M7 0l1.5 5.5L14 7l-5.5 1.5L7 14l-1.5-5.5L0 7l5.5-1.5L7 0z"
        fill="#c084fc"
      />
    </svg>
  )
}

/* ─────────────────── Floating Particles ─────────────────── */

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  opacity: number
}

function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const pts: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.3 + 0.1,
    }))
    setParticles(pts)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: 'rgba(192, 132, 252, 0.6)',
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [p.opacity, p.opacity * 1.8, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

/* ──────────────────── Animated Number ──────────────────── */

function AnimatedNumber({ num, inView }: { num: string; inView: boolean }) {
  return (
    <motion.span
      className="services-number select-none pointer-events-none"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={
        inView
          ? { opacity: 1, scale: 1 }
          : { opacity: 0, scale: 0.85 }
      }
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {num}
    </motion.span>
  )
}

/* ──────────────────── Service Card ──────────────────── */

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const IconComponent = ICON_MAP[service.icon]

  /* Hover glow intensity */
  const glowOpacity = useMotionValue(0)
  const boxShadow = useTransform(
    glowOpacity,
    [0, 1],
    [
      '0 0 0px rgba(168, 85, 247, 0), inset 0 0 0px rgba(168, 85, 247, 0)',
      '0 0 40px rgba(168, 85, 247, 0.15), 0 0 80px rgba(168, 85, 247, 0.08), inset 0 1px 0 rgba(168, 85, 247, 0.1)',
    ],
  )

  const handleHoverStart = useCallback(() => {
    animate(glowOpacity, 1, { duration: 0.3 })
  }, [glowOpacity])

  const handleHoverEnd = useCallback(() => {
    animate(glowOpacity, 0, { duration: 0.4 })
  }, [glowOpacity])

  return (
    <motion.div
      ref={ref}
      className="services-card group"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      custom={index}
      whileHover={{ y: -4, scale: 1.02 }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      style={{ boxShadow }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {/* Left: Number */}
      <div className="services-card-left">
        <AnimatedNumber num={service.num} inView={isInView} />

        {/* Icon Container */}
        <motion.div
          className="services-icon-container"
          whileHover={{ rotate: 12 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <div className="services-icon-glow" />
          <IconComponent />
        </motion.div>
      </div>

      {/* Middle: Text */}
      <div className="services-card-middle">
        <h3 className="services-card-title">{service.title}</h3>
        <p className="services-card-desc">{service.desc}</p>
      </div>

      {/* Right: Preview Image */}
      <div className="services-card-right">
        <div className="services-preview-wrapper">
          <motion.img
            src={service.image}
            alt={service.title}
            className="services-preview-image"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            draggable={false}
          />
          <div className="services-preview-overlay" />
        </div>
      </div>
    </motion.div>
  )
}

/* ──────────────────── Main Section ──────────────────── */

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      ref={sectionRef}
      id="services"
      className="services-section"
    >
      {/* Background Glows */}
      <div className="services-bg-glow services-bg-glow-1" />
      <div className="services-bg-glow services-bg-glow-2" />
      <div className="services-bg-glow services-bg-glow-3" />

      {/* Floating Particles */}
      <FloatingParticles />

      {/* ── Header ── */}
      <div className="services-header">
        <motion.div
          className="services-subtitle-row"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="services-subtitle-line" />
          <Sparkle className="services-sparkle" />
          <span className="services-subtitle-text">WHAT I OFFER</span>
          <Sparkle className="services-sparkle" />
          <span className="services-subtitle-line" />
        </motion.div>

        <motion.h2
          className="services-heading"
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          SERVICES
        </motion.h2>

        <motion.p
          className="services-description"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: 0.25,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          High-impact creative services designed to grow your brand,
          <br />
          engage your audience, and deliver real results.
        </motion.p>
      </div>

      {/* ── Service Cards ── */}
      <div className="services-cards-container">
        {SERVICES.map((service, i) => (
          <ServiceCard key={service.num} service={service} index={i} />
        ))}
      </div>

      {/* ── CTA Footer ── */}
      <motion.div
        className="services-cta"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <p className="services-cta-label">
          <Sparkle className="services-sparkle-sm" />
          <span>Got a project in mind?</span>
        </p>
        <p className="services-cta-text">
          Let's create something{' '}
          <span className="services-cta-highlight">amazing</span> together.
        </p>
      </motion.div>
    </section>
  )
}
