import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import FadeIn from '../components/FadeIn'

/* ─────────────────────── Service Data ─────────────────────── */

const SERVICES = [
  {
    num: '01',
    title: 'REELS & SHORTS EDITING',
    desc: 'Fast, punchy edits built for retention — cut-to-beat pacing, trending transitions, and hook-driven storytelling for Instagram, YouTube Shorts, and TikTok.',
  },
  {
    num: '02',
    title: 'YOUTUBE VIDEO EDITING',
    desc: 'Full long-form video editing including pacing, b-roll, sound design, motion graphics, and color grading that keeps viewers watching to the end.',
  },
  {
    num: '03',
    title: 'THUMBNAIL DESIGN',
    desc: 'Scroll-stopping, click-worthy thumbnails designed to maximize CTR and stand out in a crowded feed.',
  },
  {
    num: '04',
    title: 'CONTENT STRATEGY',
    desc: 'Planning and structuring content calendars, hooks, and formats tailored to your audience and business goals to drive consistent growth.',
  },
  {
    num: '05',
    title: 'SOCIAL MEDIA MANAGEMENT',
    desc: 'End-to-end social media management designed to grow your online presence through strategic content planning, publishing, audience engagement, and performance tracking.',
  },
]

/* ──────────────────── Service Row ──────────────────── */

function ServiceRow({
  service,
  index,
}: {
  service: (typeof SERVICES)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className="svc-row"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <span className="svc-num hero-heading">{service.num}</span>
      <div className="svc-text">
        <h3 className="svc-title">{service.title}</h3>
        <p className="svc-desc">{service.desc}</p>
      </div>
    </motion.div>
  )
}

/* ──────────────────── Main Section ──────────────────── */

export default function ServicesSection() {
  return (
    <section id="services" className="svc-section">
      {/* Heading */}
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading svc-heading"
        >
          Services
        </h2>
      </FadeIn>

      <FadeIn delay={0.15} y={20}>
        <p className="svc-sub">
          High-impact creative services designed to grow your brand, engage your audience, and deliver real results.
        </p>
      </FadeIn>

      {/* Service Rows */}
      <div className="svc-list">
        {SERVICES.map((service, i) => (
          <ServiceRow key={service.num} service={service} index={i} />
        ))}
      </div>
    </section>
  )
}
