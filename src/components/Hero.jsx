import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowDown, Sparkles, MapPin } from 'lucide-react'

export default function Hero() {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 })
  const bgX = useTransform(springX, [-1, 1], ['-3%', '3%'])
  const bgY = useTransform(springY, [-1, 1], ['-3%', '3%'])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []
    let w, h

    const resize = () => {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
      init()
    }

    const init = () => {
      particles = Array.from({ length: 70 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.2 + 0.2,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        alpha: Math.random() * 0.35 + 0.08,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      particles.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(139, 92, 246, ${p.alpha})`
        ctx.fill()
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0
      })
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < 110) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(34,0,124,${0.12 * (1 - d / 110)})`
            ctx.lineWidth = 0.4
            ctx.stroke()
          }
        })
      })
      animId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2)
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2)
  }
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0) }

  const seq = (i, dur = 0.85) => ({
    initial: { opacity: 0, y: 28, filter: 'blur(8px)', scale: 0.97 },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 },
    transition: { delay: i * 0.14, duration: dur, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse 90% 80% at 50% -5%, #140152 0%, #04052e 45%, #02010a 100%)' }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-50" />
      <div className="absolute inset-0 dot-grid opacity-25" />

      {/* Parallax glow orbs */}
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(34,0,124,0.18) 0%, transparent 65%)', filter: 'blur(80px)', x: bgX, y: bgY }}
      />
      <motion.div
        style={{ x: useTransform(springX, [-1, 1], ['2%', '-2%']), y: bgY }}
        className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(109,40,217,0.1) 0%, transparent 70%)', filter: 'blur(60px)', x: useTransform(springX, [-1,1], ['2%','-2%']), y: bgY }}
      />

      {/* Orbital rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden md:block">
        <div className="orbital w-[550px] h-[550px] rounded-full border border-purple-800/15 absolute -translate-x-1/2 -translate-y-1/2" />
        <div className="orbital-reverse w-[780px] h-[780px] rounded-full border border-indigo-900/8 absolute -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">

        {/* Badge */}
        <motion.div {...seq(0, 0.7)} className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-10 glass text-sm font-body text-purple-300">
          <Sparkles size={13} className="text-purple-400" />
          <span>Disponível para estágio</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
        </motion.div>

        {/* Name */}
        <motion.h1
          {...seq(1, 1)}
          className="font-display font-extrabold leading-[0.92] mb-5"
          style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)' }}
        >
          <span className="block text-white">Lucas Gomes</span>
          <span className="block gradient-text text-glow">do Amaral</span>
        </motion.h1>

        {/* Role */}
        <motion.p {...seq(2, 0.8)}
          className="font-mono text-white/40 tracking-[0.25em] uppercase text-xs md:text-sm mb-3"
        >
          Desenvolvedor Full Stack · Em Formação
        </motion.p>

        {/* Location */}
        <motion.div {...seq(2.5, 0.7)} className="flex items-center justify-center gap-1.5 mb-8">
          <MapPin size={12} className="text-purple-500" />
          <span className="font-body text-white/30 text-sm">Indaiatuba, SP</span>
        </motion.div>

        {/* Phrase */}
        <motion.p {...seq(3, 0.8)}
          className="font-body text-white/45 text-base md:text-xl max-w-lg mx-auto mb-14 leading-relaxed"
        >
          Decidido desde cedo sobre o meu futuro na tecnologia.
        </motion.p>

        {/* CTAs */}
        <motion.div {...seq(4, 0.8)} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button
            onClick={() => document.querySelector('#trajetoria')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.055, boxShadow: '0 0 50px rgba(34,0,124,0.65), 0 0 100px rgba(34,0,124,0.25)' }}
            whileTap={{ scale: 0.96 }}
            className="px-9 py-4 rounded-2xl text-white font-body font-medium text-base transition-shadow duration-300"
            style={{ background: 'linear-gradient(135deg, #22007c 0%, #4c1d95 55%, #7c3aed 100%)' }}
          >
            Minha trajetória
          </motion.button>
          <motion.button
            onClick={() => document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.04, borderColor: 'rgba(255,255,255,0.25)', color: '#fff' }}
            whileTap={{ scale: 0.96 }}
            className="px-9 py-4 rounded-2xl text-white/60 font-body font-medium text-base transition-all duration-300 border border-white/10"
          >
            Entre em contato
          </motion.button>
        </motion.div>

        {/* Scroll cue */}
        <motion.button
          onClick={() => document.querySelector('#sobre')?.scrollIntoView({ behavior: 'smooth' })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25 hover:text-white/50 transition-colors"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase">scroll</span>
          <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}>
            <ArrowDown size={14} />
          </motion.div>
        </motion.button>
      </div>
    </section>
  )
}
