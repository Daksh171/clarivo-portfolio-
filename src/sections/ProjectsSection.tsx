import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import { Play, X } from 'lucide-react'

import kustard_story from '../photos/kustard_story.jpeg'
import coffee from '../photos/coffee.jpeg'

interface ProjectData {
  num: string
  category: string
  name: string
  description: string
  videoSrc: string
  thumbnail: string
}

const PROJECTS: ProjectData[] = [

  {
    num: '01',
    category: 'Personal Project',
    name: 'Kustard story',
    description: 'Immersive digital storytelling through beautiful visuals.',
    videoSrc: 'https://res.cloudinary.com/zrwhcw4t/video/upload/v1784054887/Kustard_story.final_1_djle8z.mp4',
    thumbnail: kustard_story,
  },
  {
    num: '02',
    category: 'Client Project',
    name: ' How to make viral videos',
    description: 'viral videos',
    videoSrc: 'https://res.cloudinary.com/zrwhcw4t/video/upload/v1784721272/short_full_sample_1_yy4ss1.mp4',
    thumbnail: 'https://res.cloudinary.com/zrwhcw4t/image/upload/v1784721522/WhatsApp_Image_2026-07-22_at_5.28.21_PM_tqkzjh.jpg'
  },
  {
    num: '03',
    category: 'Brand Project',
    name: 'Roasted Coffee',
    description: 'Roasted Coffee shoot.',
    videoSrc: 'https://res.cloudinary.com/zrwhcw4t/video/upload/v1784054538/Roasted_Coffee_shoot_dwbczb.mp4',
    thumbnail: coffee,
  },
  {
    num: '04',
    category: 'Client Project',
    name: 'Teach marketing video ',
    description: 'a teach video',
    videoSrc: 'https://res.cloudinary.com/zrwhcw4t/video/upload/v1784721974/WEP_GIG_249EDIT_kjkakq.mp4',
    thumbnail: 'https://res.cloudinary.com/zrwhcw4t/image/upload/v1784722122/WhatsApp_Image_2026-07-22_at_5.38.23_PM_vnzpbg.jpg',
  },
  {
    num: '05',
    category: 'Client Project',
    name: 'Airsoft',
    description: '',
    videoSrc: 'https://res.cloudinary.com/zrwhcw4t/video/upload/v1784724089/20_AIRSOFT_fails_249edit_1_1_hxh7y3.mp4',
    thumbnail: 'https://res.cloudinary.com/zrwhcw4t/image/upload/v1784724357/WhatsApp_Image_2026-07-22_at_6.15.33_PM_c14pxg.jpg',
  }
]

/* ═══════════════════════════════════════════════════════════
   VIDEO MODAL — Cinematic fullscreen player
   ═══════════════════════════════════════════════════════════ */

function VideoModal({
  project,
  onClose,
}: {
  project: ProjectData
  onClose: () => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  /* Lock body scroll when modal is open */
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  /* Close on Escape key */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <motion.div
      className="video-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      onClick={onClose}
    >
      {/* Close button */}
      <motion.button
        className="video-modal-close"
        onClick={onClose}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ delay: 0.15, duration: 0.25 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <X size={20} />
      </motion.button>

      {/* Project title */}
      <motion.div
        className="video-modal-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <span className="video-modal-num">{project.num}</span>
        <span className="video-modal-name">{project.name}</span>
      </motion.div>

      {/* Video container */}
      <motion.div
        className="video-modal-container"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <video
          ref={videoRef}
          className="video-modal-player"
          src={project.videoSrc}
          controls
          autoPlay
          playsInline
          poster={project.thumbnail}
        />
      </motion.div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════
   PROJECT CARD
   ═══════════════════════════════════════════════════════════ */

function ProjectCard({
  project,
  index,
  totalCards,
  onPlay,
}: {
  project: ProjectData
  index: number
  totalCards: number
  onPlay: (project: ProjectData) => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  })

  const targetScale = 1 - (totalCards - 1 - index) * 0.04
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, targetScale])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 1])

  return (
    <div
      ref={cardRef}
      className="project-card-wrapper"
      style={{
        top: `calc(80px + ${index * 32}px)`,
      }}
    >
      <motion.div
        style={{ scale, opacity }}
        className="project-card"
      >
        {/* Left side: Number + info */}
        <div className="project-info">
          <span className="project-num">{project.num}</span>
          <div className="project-meta">
            <span className="project-category">{project.category}</span>
            <h3 className="project-name">{project.name}</h3>
            <p className="project-desc">{project.description}</p>
          </div>
        </div>

        {/* Right side: Thumbnail + button */}
        <div className="project-right">
          {/* View Project button — top right */}
          <div className="project-btn-row">
            <button
              className="project-view-btn group"
              onClick={() => onPlay(project)}
            >
              <Play size={14} className="transition-transform duration-300 group-hover:scale-110" />
              <span>Watch Video</span>
            </button>
          </div>

          {/* Thumbnail with play overlay */}
          <div
            className="project-thumbnail"
            onClick={() => onPlay(project)}
          >
            <img
              src={project.thumbnail}
              alt={`${project.name} thumbnail`}
              loading="lazy"
            />
            {/* Play overlay */}
            <div className="project-play-overlay">
              <div className="project-play-icon">
                <Play size={24} fill="currentColor" strokeWidth={0} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   PROJECTS SECTION
   ═══════════════════════════════════════════════════════════ */

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null)

  const handlePlay = useCallback((project: ProjectData) => {
    setActiveProject(project)
  }, [])

  const handleClose = useCallback(() => {
    setActiveProject(null)
  }, [])

  return (
    <section
      id="projects"
      className="projects-section"
    >
      {/* Section header */}
      <FadeIn delay={0} y={40}>
        <div className="projects-header">
          <div className="projects-header-left">
            <span className="projects-label">Portfolio</span>
            <h2 className="projects-title">
              Featured <span className="projects-title-accent">Projects</span>
            </h2>
            <p className="projects-subtitle">
              A selection of work that reflects our creativity, strategy
              and commitment to excellence.
            </p>
          </div>
          <button className="projects-explore-btn group">
            <span>Explore all projects</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </FadeIn>

      {/* Stacking cards */}
      <div className="projects-cards">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.num}
            project={project}
            index={i}
            totalCards={PROJECTS.length}
            onPlay={handlePlay}
          />
        ))}
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeProject && (
          <VideoModal
            project={activeProject}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>

      <style>{`
        .projects-section {
          background: #0C0C0C;
          border-top-left-radius: clamp(40px, 5vw, 60px);
          border-top-right-radius: clamp(40px, 5vw, 60px);
          margin-top: -40px;
          position: relative;
          z-index: 10;
          padding: 80px 20px 40px;
        }

        /* ── Header ── */
        .projects-header {
          max-width: 1200px;
          margin: 0 auto 60px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 24px;
          flex-wrap: wrap;
        }
        .projects-header-left {
          max-width: 500px;
        }
        .projects-label {
          display: inline-block;
          color: #A855F7;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          margin-bottom: 12px;
        }
        .projects-title {
          font-family: 'Kanit', sans-serif;
          font-size: clamp(2rem, 4.5vw, 3.5rem);
          font-weight: 900;
          color: #D7E2EA;
          line-height: 1.1;
          margin-bottom: 14px;
          text-transform: uppercase;
        }
        .projects-title-accent {
          background: linear-gradient(135deg, #A855F7 0%, #B600A8 50%, #7621B0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .projects-subtitle {
          color: rgba(215, 226, 234, 0.5);
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .projects-explore-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          border-radius: 100px;
          border: 1px solid rgba(215, 226, 234, 0.25);
          background: transparent;
          color: #D7E2EA;
          font-size: 0.9rem;
          font-weight: 500;
          font-family: 'Kanit', sans-serif;
          cursor: pointer;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }
        .projects-explore-btn:hover {
          border-color: #A855F7;
          color: #fff;
          background: rgba(168, 85, 247, 0.08);
        }

        /* ── Cards container ── */
        .projects-cards {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* ── Card wrapper — makes it sticky ── */
        .project-card-wrapper {
          position: sticky;
          height: 480px;
          margin-bottom: 40px;
        }
        .project-card-wrapper:last-child {
          margin-bottom: 120px;
        }

        /* ── Card ── */
        .project-card {
          height: 100%;
          border-radius: 28px;
          border: 1.5px solid rgba(215, 226, 234, 0.12);
          background: #111114;
          padding: 32px;
          display: flex;
          gap: 32px;
          transform-origin: top center;
          will-change: transform, opacity;
          overflow: hidden;
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.4);
        }

        /* ── Left: Info ── */
        .project-info {
          display: flex;
          flex-direction: column;
          width: 280px;
          flex-shrink: 0;
          padding-top: 8px;
        }
        .project-num {
          font-family: 'Kanit', sans-serif;
          font-size: clamp(3.5rem, 7vw, 6rem);
          font-weight: 900;
          line-height: 1;
          background: linear-gradient(180deg, #646973 0%, #bbccd7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 20px;
        }
        .project-category {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 600;
          color: rgba(215, 226, 234, 0.45);
          text-transform: uppercase;
          letter-spacing: 0.18em;
          margin-bottom: 6px;
        }
        .project-name {
          font-family: 'Kanit', sans-serif;
          font-size: clamp(1.2rem, 2vw, 1.6rem);
          font-weight: 700;
          color: #D7E2EA;
          text-transform: uppercase;
          line-height: 1.2;
          margin-bottom: 10px;
        }
        .project-desc {
          font-size: 0.88rem;
          color: rgba(215, 226, 234, 0.45);
          line-height: 1.5;
        }

        /* ── Right side ── */
        .project-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 16px;
          min-width: 0;
        }

        /* ── View Project button row ── */
        .project-btn-row {
          display: flex;
          justify-content: flex-end;
        }
        .project-view-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 22px;
          border-radius: 100px;
          border: 1.5px solid rgba(215, 226, 234, 0.2);
          background: rgba(215, 226, 234, 0.05);
          color: #D7E2EA;
          font-size: 0.85rem;
          font-weight: 500;
          font-family: 'Kanit', sans-serif;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
          flex-shrink: 0;
          text-decoration: none;
        }
        .project-view-btn:hover {
          border-color: #A855F7;
          color: #fff;
          background: rgba(168, 85, 247, 0.12);
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.15);
        }

        /* ── Single Thumbnail ── */
        .project-thumbnail {
          flex: 1;
          min-height: 0;
          border-radius: 18px;
          overflow: hidden;
          position: relative;
          cursor: pointer;
        }
        .project-thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        .project-card:hover .project-thumbnail img {
          transform: scale(1.04);
        }

        /* ── Play overlay ── */
        .project-play-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.2);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .project-thumbnail:hover .project-play-overlay {
          opacity: 1;
        }
        .project-play-icon {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(168, 85, 247, 0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          box-shadow: 0 4px 30px rgba(168, 85, 247, 0.4), 0 0 60px rgba(168, 85, 247, 0.15);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .project-thumbnail:hover .project-play-icon {
          transform: scale(1.1);
          box-shadow: 0 4px 40px rgba(168, 85, 247, 0.6), 0 0 80px rgba(168, 85, 247, 0.2);
        }

        /* ═══════════════════════════════════════════════════════════
           VIDEO MODAL
           ═══════════════════════════════════════════════════════════ */

        .video-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(5, 5, 5, 0.92);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }

        .video-modal-close {
          position: absolute;
          top: 24px;
          right: 24px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.15);
          background: rgba(255, 255, 255, 0.06);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          z-index: 10;
        }
        .video-modal-close:hover {
          background: rgba(168, 85, 247, 0.2);
          border-color: rgba(168, 85, 247, 0.4);
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.15);
        }

        .video-modal-title {
          display: flex;
          align-items: baseline;
          gap: 12px;
          margin-bottom: 20px;
        }
        .video-modal-num {
          font-family: 'Kanit', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          color: #A855F7;
          letter-spacing: 0.1em;
        }
        .video-modal-name {
          font-family: 'Kanit', sans-serif;
          font-size: 1.2rem;
          font-weight: 700;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .video-modal-container {
          width: 100%;
          max-width: 1000px;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(168, 85, 247, 0.15);
          box-shadow:
            0 0 0 1px rgba(168, 85, 247, 0.06),
            0 20px 80px rgba(0, 0, 0, 0.6),
            0 0 120px rgba(168, 85, 247, 0.08);
          background: #0a0a0a;
        }

        .video-modal-player {
          width: 100%;
          display: block;
          aspect-ratio: 16 / 9;
          object-fit: contain;
          background: #000;
          outline: none;
        }

        /* Custom video controls colors */
        .video-modal-player::-webkit-media-controls-panel {
          background: linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 100%);
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .project-card {
            flex-direction: column;
            padding: 24px;
            gap: 20px;
            height: auto;
          }
          .project-card-wrapper {
            height: auto;
            min-height: 500px;
          }
          .project-info {
            width: 100%;
            flex-direction: row;
            align-items: center;
            gap: 20px;
            padding-top: 0;
          }
          .project-num {
            margin-bottom: 0;
          }
          .project-right {
            flex: 1;
          }
          .project-thumbnail {
            min-height: 250px;
          }
          .video-modal-backdrop {
            padding: 20px;
          }
          .video-modal-container {
            border-radius: 14px;
          }
        }

        @media (max-width: 640px) {
          .projects-section {
            padding: 60px 14px 20px;
          }
          .projects-header {
            margin-bottom: 36px;
          }
          .project-card {
            padding: 18px;
            border-radius: 22px;
          }
          .project-card-wrapper {
            margin-bottom: 28px;
            min-height: 420px;
          }
          .project-info {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
          .project-num {
            font-size: 3rem;
          }
          .project-name {
            font-size: 1.1rem;
          }
          .project-view-btn {
            padding: 8px 16px;
            font-size: 0.78rem;
          }
          .project-thumbnail {
            min-height: 200px;
          }
          .project-play-icon {
            width: 48px;
            height: 48px;
          }
          .video-modal-backdrop {
            padding: 12px;
          }
          .video-modal-container {
            border-radius: 10px;
          }
          .video-modal-title {
            margin-bottom: 12px;
          }
          .video-modal-name {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  )
}
