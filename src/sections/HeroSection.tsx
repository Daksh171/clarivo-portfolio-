import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'
import gsap from 'gsap'

/* ─────────────────────── Constants ─────────────────────── */

const POLAROID_IMAGES = [
  '/polaroid-1.png',
  '/polaroid-2.png',
  '/polaroid-3.png',
  '/polaroid-4.png',
]

const MAX_POLAROIDS = 5

/* ─────────────────────── Types ─────────────────────── */

interface Polaroid {
  id: number
  src: string
  rotation: number
  x: number
  y: number
}

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  opacity: number
}

/* ─────────────────────── Floating Particles ─────────────────────── */

function HeroParticles() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const pts: Particle[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 6,
      opacity: Math.random() * 0.4 + 0.1,
    }))
    setParticles(pts)
  }, [])

  return (
    <div className="hero-particles">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="hero-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [p.opacity, p.opacity * 2, p.opacity],
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

/* ─────────────────────── Scribble SVG Overlays ─────────────────────── */

function CircleScribble({ className = '' }: { className?: string }) {
  return (
    <svg className={`scribble-svg ${className}`} viewBox="0 0 200 80" fill="none" preserveAspectRatio="none">
      <path
        d="M20 60 C20 20, 180 20, 180 40 C180 60, 20 70, 20 50"
        stroke="#A855F7"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        strokeDasharray="500"
        strokeDashoffset="500"
      >
        <animate attributeName="stroke-dashoffset" from="500" to="0" dur="1.2s" begin="1.5s" fill="freeze" />
      </path>
    </svg>
  )
}

function ArrowScribble({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 80" fill="none">
      <path
        d="M10 10 C20 40, 30 50, 30 70 M30 70 L22 58 M30 70 L38 58"
        stroke="#A855F7"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        strokeDasharray="200"
        strokeDashoffset="200"
      >
        <animate attributeName="stroke-dashoffset" from="200" to="0" dur="0.8s" begin="2s" fill="freeze" />
      </path>
    </svg>
  )
}

/* ─────────────────────── Rotating Badge ─────────────────────── */

function RotatingBadge() {
  return (
    <div className="hero-rotating-badge">
      <svg viewBox="0 0 200 200" className="hero-badge-text">
        <defs>
          <path id="circlePath" d="M100,100 m-75,0 a75,75 0 1,1 150,0 a75,75 0 1,1 -150,0" />
        </defs>
        <text>
          <textPath href="#circlePath" className="hero-badge-textpath">
            CONTENT THAT CONNECTS • STORIES THAT SELL •{' '}
          </textPath>
        </text>
      </svg>
      <div className="hero-badge-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2l2 4 2-4M12 22l2-4 2 4M2 12l4 2-4 2M22 12l-4 2 4 2M4.93 4.93l3.54 1.41-1.41 3.54M19.07 4.93l-3.54 1.41 1.41 3.54M4.93 19.07l3.54-1.41-1.41-3.54M19.07 19.07l-3.54-1.41 1.41-3.54" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  )
}

/* ─────────────────────── Camera Component ─────────────────────── */

function CinemaCamera({
  onCapture,
  mouseX,
  mouseY,
}: {
  onCapture: () => void
  mouseX: ReturnType<typeof useMotionValue<number>>
  mouseY: ReturnType<typeof useMotionValue<number>>
}) {
  const cameraRef = useRef<HTMLDivElement>(null)
  const [isCapturing, setIsCapturing] = useState(false)

  /* Parallax transforms */
  const rotateX = useTransform(mouseY, [0, 1], [5, -5])
  const rotateY = useTransform(mouseX, [0, 1], [-5, 5])
  const translateX = useTransform(mouseX, [0, 1], [-15, 15])
  const translateY = useTransform(mouseY, [0, 1], [-10, 10])

  const springRotateX = useSpring(rotateX, { stiffness: 50, damping: 20 })
  const springRotateY = useSpring(rotateY, { stiffness: 50, damping: 20 })
  const springTranslateX = useSpring(translateX, { stiffness: 50, damping: 20 })
  const springTranslateY = useSpring(translateY, { stiffness: 50, damping: 20 })

  const handleClick = useCallback(() => {
    if (isCapturing) return
    setIsCapturing(true)

    // Play shutter sound
    try {
      const audioCtx = new AudioContext()
      const osc = audioCtx.createOscillator()
      const gain = audioCtx.createGain()
      osc.connect(gain)
      gain.connect(audioCtx.destination)
      osc.frequency.setValueAtTime(800, audioCtx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.08)
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1)
      osc.start(audioCtx.currentTime)
      osc.stop(audioCtx.currentTime + 0.1)
    } catch {
      // Audio not available, continue silently
    }

    // Camera capture animation with GSAP
    if (cameraRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          onCapture()
          setIsCapturing(false)
        },
      })
      tl.to(cameraRef.current, {
        scale: 1.06,
        duration: 0.12,
        ease: 'power2.out',
      })
        .to(cameraRef.current, {
          scale: 1,
          duration: 0.25,
          ease: 'elastic.out(1, 0.5)',
        })
    }
  }, [isCapturing, onCapture])

  return (
    <motion.div
      ref={cameraRef}
      className="hero-camera-container"
      onClick={handleClick}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        x: springTranslateX,
        y: springTranslateY,
      }}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Purple rim glow */}
      <div className="hero-camera-glow" />

      {/* Recording LED */}
      <div className="hero-camera-led" />

      {/* Monitor behind camera */}
      <motion.img
        src="/hero-monitor.png"
        alt="Editing monitor"
        className="hero-monitor-image"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        draggable={false}
      />

      {/* Camera */}
      <motion.img
        src="/hero-camera.png"
        alt="Cinema camera"
        className="hero-camera-image"
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        draggable={false}
      />

      {/* Lens reflection */}
      <div className="hero-lens-reflection" />

      {/* Flash overlay */}
      <AnimatePresence>
        {isCapturing && (
          <motion.div
            className="hero-camera-flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0] }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ─────────────────────── Polaroid Stack ─────────────────────── */

function PolaroidStack({ polaroids }: { polaroids: Polaroid[] }) {
  return (
    <div className="hero-polaroid-stack">
      <AnimatePresence>
        {polaroids.map((p, i) => (
          <motion.div
            key={p.id}
            className="hero-polaroid"
            style={{
              rotate: p.rotation,
              zIndex: i + 1,
            }}
            initial={{ opacity: 0, scale: 0.5, y: -200, x: -100 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: i * -8,
              x: i * 4,
            }}
            exit={{ opacity: 0, scale: 0.3, y: 50 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 20,
            }}
          >
            <img src={p.src} alt="Captured moment" draggable={false} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

/* ─────────────────────── Main Hero Section ─────────────────────── */

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const [polaroids, setPolaroids] = useState<Polaroid[]>([])
  const polaroidCounter = useRef(0)

  /* Mouse tracking for parallax */
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth)
      mouseY.set(e.clientY / window.innerHeight)
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  /* GSAP entry timeline */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Heading reveal
      tl.from('.hero-line-1 .hero-word', {
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
      }, 0.3)
        .from('.hero-line-2 .hero-word', {
          y: 80,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
        }, 0.5)
        // Brush stroke reveal
        .from('.hero-brush-stroke', {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 0.6,
          stagger: 0.15,
        }, 0.8)
        // Subtitle lines
        .from('.hero-subtitle-line', {
          y: 30,
          opacity: 0,
          duration: 0.5,
          stagger: 0.08,
        }, 1.0)
        // CTA buttons
        .from('.hero-cta-btn', {
          scale: 0.8,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
        }, 1.2)
        // Rotating badge
        .from('.hero-rotating-badge', {
          scale: 0,
          opacity: 0,
          rotation: -90,
          duration: 0.8,
        }, 1.4)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  /* Camera capture handler */
  const handleCapture = useCallback(() => {
    const randomImg = POLAROID_IMAGES[Math.floor(Math.random() * POLAROID_IMAGES.length)]
    const newPolaroid: Polaroid = {
      id: ++polaroidCounter.current,
      src: randomImg,
      rotation: Math.random() * 16 - 8,
      x: Math.random() * 20 - 10,
      y: 0,
    }

    setPolaroids((prev) => {
      const updated = [...prev, newPolaroid]
      if (updated.length > MAX_POLAROIDS) {
        return updated.slice(-MAX_POLAROIDS)
      }
      return updated
    })
  }, [])

  /* Background glow parallax */
  const glowX = useTransform(mouseX, [0, 1], [-30, 30])
  const glowY = useTransform(mouseY, [0, 1], [-20, 20])
  const springGlowX = useSpring(glowX, { stiffness: 30, damping: 20 })
  const springGlowY = useSpring(glowY, { stiffness: 30, damping: 20 })

  return (
    <section ref={sectionRef} id="hero" className="hero-section">
      {/* ── Background ── */}
      <div className="hero-vignette" />
      <div className="hero-grain" />

      {/* Animated Radial Glows */}
      <motion.div
        className="hero-bg-glow hero-bg-glow-1"
        style={{ x: springGlowX, y: springGlowY }}
      />
      <motion.div
        className="hero-bg-glow hero-bg-glow-2"
        style={{ x: springGlowX, y: springGlowY }}
      />
      <motion.div className="hero-bg-glow hero-bg-glow-3" />

      {/* Floating Particles */}
      <HeroParticles />

      {/* ── Main Content ── */}
      <div className="hero-content">
        {/* LEFT SIDE */}
        <div className="hero-left">
          {/* Brush Heading */}
          <div ref={headingRef} className="hero-heading-block">
            <div className="hero-line-1">
              <span className="hero-word hero-brush-white">WE</span>
              <span className="hero-word hero-brush-white hero-word-large">CUT.</span>
              <div className="hero-brush-stroke hero-brush-stroke-1" />
            </div>
            <div className="hero-line-2">
              <span className="hero-word hero-brush-purple">YOU</span>
              <span className="hero-word hero-brush-purple hero-word-large">GROW.</span>
              <div className="hero-brush-stroke hero-brush-stroke-2" />
            </div>
          </div>

          {/* Arrow Scribble */}
          <ArrowScribble className="hero-arrow-scribble" />

          {/* Subtitle */}
          <div ref={subtitleRef} className="hero-subtitle-block">
            <p className="hero-subtitle-line">
              A <span className="hero-highlight">CONTENT STUDIO</span>
            </p>
            <p className="hero-subtitle-line">
              CRAFTING <span className="hero-bold">REELS, SHORTS</span>
            </p>
            <p className="hero-subtitle-line">
              AND <span className="hero-bold">YOUTUBE VIDEOS</span>
            </p>
            <p className="hero-subtitle-line hero-subtitle-scribble-wrap">
              THAT{' '}
              <span className="hero-underline-word">
                HOOK,
                <CircleScribble className="scribble-hook" />
              </span>{' '}
              <span className="hero-underline-word">
                RETAIN
                <CircleScribble className="scribble-retain" />
              </span>
            </p>
            <p className="hero-subtitle-line">
              AND{' '}
              <span className="hero-underline-word">
                CONVERT
                <CircleScribble className="scribble-convert" />
              </span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="hero-cta-row">
            <motion.button
              className="hero-cta-btn hero-cta-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                const projects = document.getElementById('projects')
                if (projects) projects.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <span>VIEW OUR WORK</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>

            <motion.button
              className="hero-cta-btn hero-cta-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>PLAY SHOWREEL</span>
              <div className="hero-play-icon">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 1.5l7.5 4.5L3 10.5V1.5z" fill="currentColor" />
                </svg>
              </div>
            </motion.button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="hero-right">
          <CinemaCamera
            onCapture={handleCapture}
            mouseX={mouseX}
            mouseY={mouseY}
          />
        </div>
      </div>

      {/* Polaroid Stack */}
      <PolaroidStack polaroids={polaroids} />

      {/* Rotating Badge */}
      <RotatingBadge />

      {/* Full-page flash */}
      <AnimatePresence>
        {polaroids.length > 0 && polaroids[polaroids.length - 1].id === polaroidCounter.current && (
          <motion.div
            key={`flash-${polaroidCounter.current}`}
            className="hero-full-flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ duration: 0.25 }}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
