import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, ArrowRight, ChevronUp } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import { ALL_PROJECTS, type ProjectItem } from '../data/projectsData'
import VideoModal from '../components/VideoModal'
import './ALLProjectsPage.css'

/* ═══════════════════════════════════════════════════════════
   ALL PROJECTS PAGE
   ═══════════════════════════════════════════════════════════ */

export default function ALLProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [activeProject, setActiveProject] = useState<{
    num: string
    category: string
    name: string
    description: string
    videoSrc: string
    thumbnail: string
  } | null>(null)

  /* Derive unique categories */
  const categories = useMemo(() => {
    const cats = Array.from(new Set(ALL_PROJECTS.map((p) => p.category)))
    return ['All', ...cats]
  }, [])

  /* Filter projects */
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return ALL_PROJECTS
    return ALL_PROJECTS.filter((p) => p.category === activeFilter)
  }, [activeFilter])

  /* Play handler — maps ProjectItem to the VideoModal's expected shape */
  const handlePlay = useCallback((project: ProjectItem) => {
    setActiveProject({
      num: project.id,
      category: project.category,
      name: project.title,
      description: project.description,
      videoSrc: project.videoSrc,
      thumbnail: project.image,
    })
  }, [])

  const handleClose = useCallback(() => {
    setActiveProject(null)
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="allprojects-page">
      {/* Background glows */}
      <div className="allprojects-bg-glow allprojects-bg-glow-1" />
      <div className="allprojects-bg-glow allprojects-bg-glow-2" />
      <div className="allprojects-bg-glow allprojects-bg-glow-3" />

      {/* ── Hero ── */}
      <FadeIn delay={0.1} y={30}>
        <div className="allprojects-hero">
          <span className="allprojects-hero-label">Portfolio</span>
          <h1 className="allprojects-hero-title">
            All{' '}
            <span className="allprojects-hero-title-accent">Projects</span>
          </h1>
          <p className="allprojects-hero-desc">
            A showcase of creative work, editing projects, content systems,
            and growth-focused campaigns crafted by Clarivo.
          </p>
          <div className="allprojects-divider" />
        </div>
      </FadeIn>

      {/* ── Category Filters ── */}
      <FadeIn delay={0.2} y={20}>
        <div className="allprojects-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`allprojects-filter-btn ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </FadeIn>

      {/* ── Projects Grid ── */}
      <div className="allprojects-grid">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <div
                className="ap-card"
                onClick={() => handlePlay(project)}
              >
                {/* Thumbnail */}
                <div className="ap-card-thumb">
                  <img
                    src={project.image}
                    alt={`${project.title} thumbnail`}
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Play overlay */}
                  <div className="ap-card-play-overlay">
                    <div className="ap-card-play-icon">
                      <Play size={22} fill="currentColor" strokeWidth={0} />
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="ap-card-body">
                  <span className="ap-card-category">{project.category}</span>
                  <h3 className="ap-card-title">{project.title}</h3>
                  <p className="ap-card-desc">{project.description}</p>
                  <button
                    className="ap-card-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      handlePlay(project)
                    }}
                  >
                    <span>View Project</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ── Back to Top ── */}
      <FadeIn delay={0} y={20}>
        <button className="allprojects-back-top" onClick={scrollToTop}>
          <ChevronUp size={16} />
          <span>Back to Top</span>
        </button>
      </FadeIn>

      {/* ── Video Modal (reused from ProjectsSection) ── */}
      <AnimatePresence>
        {activeProject && (
          <VideoModal
            project={activeProject}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
