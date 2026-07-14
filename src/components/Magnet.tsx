import { useRef, useState, useCallback, type ReactNode, type MouseEvent } from 'react'

interface MagnetProps {
  children: ReactNode
  padding?: number
  strength?: number
  activeTransition?: string
  inactiveTransition?: string
  className?: string
}

export default function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className = '',
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: 'translate3d(0,0,0)',
    transition: inactiveTransition,
    willChange: 'transform',
  })

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      const limit = Math.max(rect.width, rect.height) / 2 + padding

      if (dist < limit) {
        setStyle({
          transform: `translate3d(${dx / strength}px, ${dy / strength}px, 0)`,
          transition: activeTransition,
          willChange: 'transform',
        })
      } else {
        setStyle({
          transform: 'translate3d(0,0,0)',
          transition: inactiveTransition,
          willChange: 'transform',
        })
      }
    },
    [padding, strength, activeTransition, inactiveTransition],
  )

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: 'translate3d(0,0,0)',
      transition: inactiveTransition,
      willChange: 'transform',
    })
  }, [inactiveTransition])

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}
