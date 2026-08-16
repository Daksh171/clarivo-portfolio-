import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

export interface VideoModalProject {
  num: string
  category: string
  name: string
  description: string
  videoSrc: string
  thumbnail: string
}

/**
 * Cinematic fullscreen video modal — reusable across all pages.
 * Renders a fixed overlay with blurred backdrop, close on ESC / click-outside,
 * and auto-pauses video on close.
 */
export default function VideoModal({
  project,
  onClose,
}: {
  project: VideoModalProject
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

  /* Auto-pause video when unmounting */
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause()
      }
    }
  }, [])

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

      {/* ── Scoped styles — always rendered with the modal ── */}
      <style>{`
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
          .video-modal-backdrop {
            padding: 20px;
          }
          .video-modal-container {
            border-radius: 14px;
          }
        }

        @media (max-width: 640px) {
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
    </motion.div>
  )
}
