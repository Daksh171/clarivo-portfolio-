import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
}

export default function AnimatedText({ text, className = '', style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })

  // Split into words to preserve natural wrapping
  const words = text.split(' ')

  return (
    <p ref={ref} className={`${className}`} style={style}>
      {words.map((word, wi) => (
        <span key={wi} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.split('').map((char, ci) => {
            const charIndex = text.indexOf(word, text.split(' ').slice(0, wi).join(' ').length) - wi + ci + wi
            return (
              <AnimatedChar
                key={`${wi}-${ci}`}
                char={char}
                index={charIndex}
                total={text.length}
                progress={scrollYProgress}
              />
            )
          })}
          {wi < words.length - 1 && <span>{'\u00A0'}</span>}
        </span>
      ))}
    </p>
  )
}

interface AnimatedCharProps {
  char: string
  index: number
  total: number
  progress: MotionValue<number>
}

function AnimatedChar({ char, index, total, progress }: AnimatedCharProps) {
  const start = index / total
  const end = Math.min((index + 1) / total, 1)
  const opacity = useTransform(progress, [start, end], [0.2, 1])

  return (
    <motion.span style={{ opacity, display: 'inline' }}>
      {char}
    </motion.span>
  )
}
