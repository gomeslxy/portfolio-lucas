import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Sparkles } from 'lucide-react'

const floatVariants = {
  initial: { opacity: 0, y: 30 },
  animate: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

export default function Hero() {
  const canvasRef = useRef(null)

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
      particles = Array.from({ length: 80 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.3,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        alpha: Math.random() * 0.4 + 0.1,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      particles.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(109, 40, 217, ${p.alpha})`
        ctx.fill()
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0
      })

      // Draw connections
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < 120) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(34, 0, 124, ${0.15 * (1 - d / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      animId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const handleScroll = () => {
    document.querySelector('#sobre')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse 80% 70% at 50% -10%, #140152 0%, #04052e 40%, #02010a 100%)' }}>

      {/* Canvas particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-30" />

      {/* Glow orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #22007c 0%, transparent 70%)' }} />
      <div className="absolute top-3/4 right-1/4 w-[300px] h-[300px] rounded-full opacity-10 blur-[80px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #6d28d9 0%, transparent 70%)' }} />

      {/* Orbital rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="orbital w-[500px] h-[500px] rounded-full border border-purple-900/20 absolute -translate-x-1/2 -translate-y-1/2" />
        <div className="orbital-reverse w-[700px] h-[700px] rounded-full border border-indigo-900/10 absolute -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

        {/* Badge */}
        <motion.div
          custom={0}
          variants={floatVariants}
          initial="initial"
          animate="animate"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 glass border border-purple-500/15 text-sm font-body text-purple-300"
        >
          <Sparkles size={14} className="text-purple-400" />
          Disponível para oportunidades de estágio
        </motion.div>

        {/* Name */}
        <motion.h1
          custom={1}
          variants={floatVariants}
          initial="initial"
          animate="animate"
          className="font-display font-extrabold leading-none mb-4"
          style={{ fontSize: 'clamp(2.8rem, 8vw, 7rem)' }}
        >
          <span className="block text-white/90">Lucas Gomes</span>
          <span className="block gradient-text text-glow">do Amaral</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          custom={2}
          variants={floatVariants}
          initial="initial"
          animate="animate"
          className="font-display font-medium text-white/50 tracking-widest uppercase text-sm md:text-base mb-6 letter-wide"
        >
          Desenvolvedor Full Stack em Formação
        </motion.p>

        {/* Phrase */}
        <motion.p
          custom={3}
          variants={floatVariants}
          initial="initial"
          animate="animate"
          className="font-body text-white/40 text-base md:text-lg max-w-xl mx-auto mb-12 leading-relaxed"
        >
          Decidido desde cedo sobre o meu futuro na tecnologia
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={4}
          variants={floatVariants}
          initial="initial"
          animate="animate"
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            onClick={() => document.querySelector('#projetos')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(34,0,124,0.6), 0 0 80px rgba(34,0,124,0.3)' }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 rounded-2xl text-white font-body font-medium text-base transition-all duration-300"
            style={{ background: 'linear-gradient(135deg, #22007c 0%, #4c1d95 50%, #6d28d9 100%)' }}
          >
            Ver meus projetos
          </motion.button>
          <motion.button
            onClick={() => document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 rounded-2xl text-white/70 hover:text-white font-body font-medium text-base transition-all duration-300 border border-white/10 hover:border-white/20"
          >
            Entre em contato
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          onClick={handleScroll}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors group"
        >
          <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <ArrowDown size={16} />
          </motion.div>
        </motion.button>
      </div>
    </section>
  )
}
