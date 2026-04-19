import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowDown, Sparkles, MapPin } from 'lucide-react'
import Galaxy from './Galaxy'

export default function Hero() {
  const containerRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 35, damping: 18 })
  const springY = useSpring(mouseY, { stiffness: 35, damping: 18 })
  const orbX = useTransform(springX, [-1, 1], ['-40px', '40px'])
  const orbY = useTransform(springY, [-1, 1], ['-30px', '30px'])
  const orb2X = useTransform(springX, [-1, 1], ['30px', '-30px'])
  const orb2Y = useTransform(springY, [-1, 1], ['20px', '-20px'])

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2)
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2)
  }
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0) }

  const seq = (i, dur = 0.9) => ({
    initial: { opacity: 0, y: 30, filter: 'blur(10px)', scale: 0.96 },
    animate: { opacity: 1, y: 0,  filter: 'blur(0px)',  scale: 1 },
    transition: { delay: i * 0.15, duration: dur, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse 100% 90% at 50% 0%, #0d0035 0%, #04052e 40%, #02010a 100%)' }}
    >
      {/* Galaxy canvas — full hero background */}
      <Galaxy className="opacity-90" />

      {/* Deep vignette overlay */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, rgba(2,1,10,0.75) 100%)' }} />

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #02010a)' }} />

      {/* Parallax glow orbs */}
      <motion.div style={{ x: orbX, y: orbY }}
        className="absolute top-[30%] left-[45%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(34,0,124,0.22) 0%, transparent 65%)', filter: 'blur(80px)', x: orbX, y: orbY }} />
      <motion.div style={{ x: orb2X, y: orb2Y }}
        className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(109,40,217,0.15) 0%, transparent 65%)', filter: 'blur(70px)', x: orb2X, y: orb2Y }} />

      {/* Spinning orbital rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden lg:block">
        <div className="orbital  w-[560px] h-[560px] rounded-full border border-purple-800/12 absolute -translate-x-1/2 -translate-y-1/2" />
        <div className="orbital-reverse w-[800px] h-[800px] rounded-full border border-indigo-900/8  absolute -translate-x-1/2 -translate-y-1/2" />
        {/* Dot on the ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ width: 560, height: 560 }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
            style={{ background: '#7c3aed', boxShadow: '0 0 12px #7c3aed, 0 0 24px rgba(124,58,237,0.5)' }} />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">

        {/* Badge */}
        <motion.div {...seq(0, 0.7)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-10 glass text-sm font-body text-purple-300">
          <Sparkles size={13} className="text-purple-400" />
          <span>Disponível para estágio</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
        </motion.div>

        {/* Name */}
        <motion.h1 {...seq(1, 1.05)}
          className="font-display font-extrabold leading-[0.9] mb-5"
          style={{ fontSize: 'clamp(3rem, 9.5vw, 8rem)' }}>
          <span className="block text-white drop-shadow-[0_0_40px_rgba(109,40,217,0.3)]">Lucas Gomes</span>
          <span className="block gradient-text text-glow">do Amaral</span>
        </motion.h1>

        {/* Role */}
        <motion.p {...seq(2, 0.8)}
          className="font-mono text-white/38 tracking-[0.28em] uppercase text-[11px] md:text-sm mb-3">
          Desenvolvedor Full Stack · Em Formação
        </motion.p>

        {/* Location */}
        <motion.div {...seq(2.4, 0.7)} className="flex items-center justify-center gap-1.5 mb-9">
          <MapPin size={11} className="text-purple-500" />
          <span className="font-body text-white/28 text-sm">Indaiatuba, SP</span>
        </motion.div>

        {/* Phrase */}
        <motion.p {...seq(3, 0.85)}
          className="font-body text-white/50 text-base md:text-xl max-w-lg mx-auto mb-14 leading-relaxed">
          Decidido desde cedo sobre o meu futuro na tecnologia.
        </motion.p>

        {/* CTAs */}
        <motion.div {...seq(4, 0.8)} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button
            onClick={() => document.querySelector('#trajetoria')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.06, boxShadow: '0 0 60px rgba(34,0,124,0.7), 0 0 120px rgba(34,0,124,0.28)' }}
            whileTap={{ scale: 0.95 }}
            className="px-9 py-4 rounded-2xl text-white font-body font-medium text-base transition-shadow duration-300"
            style={{ background: 'linear-gradient(135deg, #22007c 0%, #4c1d95 55%, #7c3aed 100%)' }}>
            Minha trajetória
          </motion.button>
          <motion.button
            onClick={() => document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.04, backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.22)' }}
            whileTap={{ scale: 0.96 }}
            className="px-9 py-4 rounded-2xl text-white/55 hover:text-white font-body font-medium text-base transition-all duration-300 border border-white/10">
            Entre em contato
          </motion.button>
        </motion.div>

        {/* Scroll cue */}
        <motion.button
          onClick={() => document.querySelector('#sobre')?.scrollIntoView({ behavior: 'smooth' })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/22 hover:text-white/50 transition-colors">
          <span className="font-mono text-[10px] tracking-[0.35em] uppercase">scroll</span>
          <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}>
            <ArrowDown size={13} />
          </motion.div>
        </motion.button>
      </div>
    </section>
  )
}
