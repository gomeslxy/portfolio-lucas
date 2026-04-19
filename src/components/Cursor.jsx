import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { stiffness: 700, damping: 40 })
  const springY = useSpring(cursorY, { stiffness: 700, damping: 40 })
  const dotX = useSpring(cursorX, { stiffness: 1500, damping: 60 })
  const dotY = useSpring(cursorY, { stiffness: 1500, damping: 60 })

  const [hovered, setHovered] = useState(false)
  const [clicking, setClicking] = useState(false)
  const [trail, setTrail] = useState([])
  const trailRef = useRef([])
  const frameRef = useRef(null)
  const posRef = useRef({ x: -100, y: -100 })

  useEffect(() => {
    // hide native cursor
    document.body.style.cursor = 'none'

    const move = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const down = () => setClicking(true)
    const up   = () => setClicking(false)

    // hover detection for interactive elements
    const addHover = () => setHovered(true)
    const removeHover = () => setHovered(false)

    const updateInteractables = () => {
      document.querySelectorAll('a, button, [role="button"], input, textarea').forEach(el => {
        el.addEventListener('mouseenter', addHover)
        el.addEventListener('mouseleave', removeHover)
      })
    }
    updateInteractables()
    const mutObs = new MutationObserver(updateInteractables)
    mutObs.observe(document.body, { childList: true, subtree: true })

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)

    // Trail animation loop
    let trailPoints = []
    const MAX_TRAIL = 18

    const animateTrail = () => {
      const { x, y } = posRef.current
      trailPoints.unshift({ x, y, id: Date.now() + Math.random() })
      if (trailPoints.length > MAX_TRAIL) trailPoints = trailPoints.slice(0, MAX_TRAIL)
      setTrail([...trailPoints])
      frameRef.current = requestAnimationFrame(animateTrail)
    }
    frameRef.current = requestAnimationFrame(animateTrail)

    return () => {
      document.body.style.cursor = ''
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      cancelAnimationFrame(frameRef.current)
      mutObs.disconnect()
      document.querySelectorAll('a, button, [role="button"], input, textarea').forEach(el => {
        el.removeEventListener('mouseenter', addHover)
        el.removeEventListener('mouseleave', removeHover)
      })
    }
  }, [])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999]" aria-hidden="true">

      {/* Trail particles */}
      {trail.map((pt, i) => {
        const age = i / trail.length        // 0 = newest, 1 = oldest
        const size = Math.max(1, 5 * (1 - age))
        const opacity = (1 - age) * 0.45
        return (
          <div
            key={pt.id}
            className="absolute rounded-full"
            style={{
              left: pt.x,
              top:  pt.y,
              width:  size,
              height: size,
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(circle, rgba(167,139,250,${opacity}), rgba(109,40,217,${opacity * 0.5}))`,
              boxShadow: `0 0 ${size * 3}px rgba(109,40,217,${opacity * 0.7})`,
              transition: 'opacity 0.1s',
            }}
          />
        )
      })}

      {/* Outer ring */}
      <motion.div
        style={{ x: springX, y: springY }}
        animate={{
          scale: clicking ? 0.6 : hovered ? 1.6 : 1,
          opacity: hovered ? 0.6 : 0.35,
        }}
        transition={{ scale: { duration: 0.18 }, opacity: { duration: 0.2 } }}
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border"
        style={{
          width: 36,
          height: 36,
          borderColor: 'rgba(139,92,246,0.7)',
          boxShadow: clicking
            ? '0 0 20px rgba(109,40,217,0.8), 0 0 40px rgba(109,40,217,0.4)'
            : '0 0 12px rgba(109,40,217,0.3)',
        }}
      />

      {/* Inner dot */}
      <motion.div
        style={{ x: dotX, y: dotY }}
        animate={{
          scale: clicking ? 2.5 : hovered ? 0.3 : 1,
          opacity: hovered ? 0.4 : 1,
        }}
        transition={{ scale: { duration: 0.12 } }}
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 6,
          height: 6,
          background: 'radial-gradient(circle, #c4b5fd, #7c3aed)',
          boxShadow: '0 0 8px rgba(167,139,250,0.8), 0 0 16px rgba(109,40,217,0.5)',
        }}
      />

      {/* Click burst ring */}
      {clicking && (
        <motion.div
          style={{ x: dotX, y: dotY }}
          initial={{ scale: 0.5, opacity: 0.8 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-400/60"
          style={{ width: 36, height: 36 }}
        />
      )}
    </div>
  )
}
