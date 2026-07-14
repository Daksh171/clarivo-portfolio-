import { useState, useRef, useEffect } from 'react'
import { Mail, Phone, Camera, Link2, Globe, X } from 'lucide-react'

const contacts = [
  { icon: Mail, label: 'Email', value: 'clarivo.businesses@gmail.com', href: 'mailto:clarivo.businesses@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+91 7977178830', href: 'tel:+917977178830' },
  { icon: Camera, label: 'Instagram', value: '@clarivobuisness', href: 'https://instagram.com/clarivobuisness' },
  { icon: Link2, label: 'LinkedIn', value: 'Clarivo', href: 'https://linkedin.com/company/clarivo' },
  { icon: Globe, label: 'Facebook', value: 'Clarivo Businesses', href: 'https://facebook.com/clarivobusinesses' },
]

export default function ContactButton() {
  const [open, setOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative rounded-full text-white font-medium uppercase tracking-widest
          px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4
          text-xs sm:text-sm md:text-base
          cursor-pointer select-none
          transition-transform duration-200 hover:scale-105 active:scale-95"
        style={{
          background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
          boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
          outline: '2px solid white',
          outlineOffset: '-3px',
        }}
      >
        Contact Us
      </button>

      {/* Contact Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div
            ref={modalRef}
            className="relative bg-[#141418] border border-[#2a2a30] rounded-3xl p-8 sm:p-10 w-[90vw] max-w-md
              shadow-2xl animate-in"
            style={{
              animation: 'modalIn 0.3s ease-out',
            }}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-[#D7E2EA] hover:text-white transition-colors cursor-pointer"
            >
              <X size={24} />
            </button>
            <h3 className="text-[#D7E2EA] text-2xl font-bold uppercase tracking-wider mb-6">
              Get in Touch
            </h3>
            <div className="flex flex-col gap-4">
              {contacts.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 rounded-xl bg-[#1c1c22] hover:bg-[#252530]
                    transition-colors group"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                    }}
                  >
                    <Icon size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[#D7E2EA]/60 text-xs uppercase tracking-wider">{label}</p>
                    <p className="text-[#D7E2EA] text-sm font-medium group-hover:text-white transition-colors">
                      {value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </>
  )
}
