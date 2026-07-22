import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  Phone,
  Copy,
  PhoneCall,
  Check,
} from 'lucide-react'
import FadeIn from '../components/FadeIn'

interface ContactItem {
  icon: typeof Mail
  label: string
  value: string
  href: string
  actionType: 'copy' | 'call'
  actionLabel: string
}

const CONTACTS: ContactItem[] = [
  {
    icon: Mail,
    label: 'Email',
    value: 'clarivo.businesses@gmail.com',
    href: 'mailto:clarivo.businesses@gmail.com',
    actionType: 'copy',
    actionLabel: 'Copy',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 7977178830',
    href: 'tel:+917977178830',
    actionType: 'call',
    actionLabel: 'Call',
  },
]

function ContactCard({ item, index }: { item: ContactItem; index: number }) {
  const [copied, setCopied] = useState(false)

  const ActionIcon =
    item.actionType === 'copy' ? Copy : PhoneCall

  const handleAction = (e: React.MouseEvent) => {
    if (item.actionType === 'copy') {
      e.preventDefault()
      navigator.clipboard.writeText(item.value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
    // For 'call' and 'open', let the <a> handle navigation
  }

  return (
    <motion.a
      href={item.href}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="contact-card group"
      onClick={item.actionType === 'copy' ? handleAction : undefined}
    >
      {/* Icon container */}
      <div className="contact-card-icon">
        <item.icon size={20} strokeWidth={1.8} />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="contact-card-label">{item.label}</p>
        <p className="contact-card-value">{item.value}</p>
      </div>

      {/* Action button */}
      <button
        className="contact-action-btn"
        onClick={item.actionType === 'copy' ? handleAction : undefined}
        tabIndex={-1}
      >
        {copied ? (
          <>
            <Check size={14} />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <ActionIcon size={14} />
            <span>{item.actionLabel}</span>
          </>
        )}
      </button>
    </motion.a>
  )
}

export default function ContactSection() {
  return (
    <section id="contact" className="contact-section">
      {/* Background glow effects */}
      <div className="contact-glow contact-glow-1" />
      <div className="contact-glow contact-glow-2" />

      <div className="contact-container">
        {/* Header */}
        <FadeIn delay={0} y={30}>
          <div className="contact-header">
            <span className="contact-subtitle">Contact</span>
            <h2 className="contact-title">
              Let's <span className="contact-title-accent">Connect</span>
            </h2>
            <p className="contact-description">
              Reach out through any of these channels. We'd love to hear about your project.
            </p>
          </div>
        </FadeIn>

        {/* Glass card container */}
        <FadeIn delay={0.15} y={40}>
          <div className="contact-glass-card">
            {/* Contact items */}
            <div className="contact-items">
              {CONTACTS.map((item, i) => (
                <ContactCard key={item.label} item={item} index={i} />
              ))}
            </div>


          </div>
        </FadeIn>
      </div>

      <style>{`
        .contact-section {
          position: relative;
          padding: 100px 20px 120px;
          background: #0C0C0C;
          overflow: hidden;
        }

        /* Background glows */
        .contact-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.15;
          pointer-events: none;
        }
        .contact-glow-1 {
          width: 500px;
          height: 500px;
          background: #7621B0;
          top: -100px;
          left: -100px;
        }
        .contact-glow-2 {
          width: 400px;
          height: 400px;
          background: #B600A8;
          bottom: -50px;
          right: -50px;
        }

        .contact-container {
          max-width: 560px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Header */
        .contact-header {
          text-align: center;
          margin-bottom: 48px;
        }
        .contact-subtitle {
          display: inline-block;
          color: #A855F7;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          margin-bottom: 16px;
        }
        .contact-title {
          font-family: 'Kanit', sans-serif;
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          font-weight: 800;
          color: #D7E2EA;
          line-height: 1.1;
          margin-bottom: 16px;
        }
        .contact-title-accent {
          background: linear-gradient(135deg, #A855F7 0%, #B600A8 50%, #7621B0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .contact-description {
          color: rgba(215, 226, 234, 0.5);
          font-size: 1rem;
          line-height: 1.6;
          max-width: 400px;
          margin: 0 auto;
        }

        /* Glass card */
        .contact-glass-card {
          background: rgba(20, 20, 28, 0.7);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(168, 85, 247, 0.12);
          border-radius: 28px;
          padding: 8px;
          box-shadow:
            0 0 0 1px rgba(168, 85, 247, 0.06),
            0 20px 60px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.04);
        }

        /* Contact items */
        .contact-items {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        /* Individual contact card */
        .contact-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          border-radius: 20px;
          background: transparent;
          transition: all 0.25s cubic-bezier(0.25, 0.1, 0.25, 1);
          cursor: pointer;
          text-decoration: none;
          position: relative;
        }
        .contact-card:hover {
          background: rgba(168, 85, 247, 0.06);
        }

        .contact-card-icon {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(168, 85, 247, 0.1);
          border: 1px solid rgba(168, 85, 247, 0.15);
          color: #A855F7;
          flex-shrink: 0;
          transition: all 0.25s ease;
        }
        .contact-card:hover .contact-card-icon {
          background: rgba(168, 85, 247, 0.18);
          border-color: rgba(168, 85, 247, 0.3);
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.15);
        }

        .contact-card-label {
          font-size: 0.7rem;
          font-weight: 500;
          color: rgba(215, 226, 234, 0.4);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: 2px;
        }
        .contact-card-value {
          font-size: 0.95rem;
          font-weight: 500;
          color: #D7E2EA;
          transition: color 0.2s;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .contact-card:hover .contact-card-value {
          color: #fff;
        }

        /* Action button */
        .contact-action-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 12px;
          border: 1px solid rgba(168, 85, 247, 0.2);
          background: rgba(168, 85, 247, 0.08);
          color: #A855F7;
          font-size: 0.78rem;
          font-weight: 500;
          cursor: pointer;
          opacity: 0;
          transform: translateX(8px);
          transition: all 0.25s cubic-bezier(0.25, 0.1, 0.25, 1);
          flex-shrink: 0;
          font-family: 'Kanit', sans-serif;
        }
        .contact-card:hover .contact-action-btn {
          opacity: 1;
          transform: translateX(0);
        }
        .contact-action-btn:hover {
          background: rgba(168, 85, 247, 0.18);
          border-color: rgba(168, 85, 247, 0.35);
        }



        /* Mobile adjustments */
        @media (max-width: 640px) {
          .contact-section {
            padding: 70px 16px 80px;
          }
          .contact-glass-card {
            padding: 6px;
          }
          .contact-card {
            padding: 14px 14px;
            gap: 12px;
          }
          .contact-card-icon {
            width: 38px;
            height: 38px;
            border-radius: 12px;
          }
          .contact-card-value {
            font-size: 0.85rem;
          }
          .contact-action-btn {
            opacity: 1;
            transform: translateX(0);
            padding: 6px 10px;
            font-size: 0.72rem;
          }
        }
      `}</style>
    </section>
  )
}
