import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowDown, Sparkles, MapPin } from 'lucide-react'
import Galaxy from './Galaxy'

export default function Hero() {
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 30, damping: 18 })
  const sy = useSpring(my, { stiffness: 30, damping: 18 })
  const o1x = useTransform(sx, [-1, 1], ['-35px', '35px'])
  const o1y = useTransform(sy, [-1, 1], ['-25px', '25px'])
  const o2x = useTransform(sx, [-1, 1], ['25px', '-25px'])
  const o2y = useTransform(sy, [-1, 1], ['18px', '-18px'])

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    mx.set(((e.clientX - r.left) / r.width  - 0.5) * 2)
    my.set(((e.clientY - r.top)  / r.height - 0.5) * 2)
  }

  const enter = (i, d = 0.9) => ({
    initial:    { opacity: 0, y: 26, filter: 'blur(10px)', scale: 0.97 },
    animate:    { opacity: 1, y: 0,  filter: 'blur(0px)',  scale: 1 },
    transition: { delay: i * 0.14, duration: d, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { mx.set(0); my.set(0) }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#04022a' }}
    >
      {/* ── Galaxy canvas fills entire hero ── */}
      <div className="absolute inset-0">
        <Galaxy />
      </div>

      {/* Vignette — keeps edges dark so text pops */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 75% 75% at 50% 50%, transparent 25%, rgba(2,1,10,0.65) 80%, rgba(2,1,10,0.92) 100%)',
        }} />

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 inset-x-0 h-36 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #02010a)' }} />

      {/* Parallax soft glow orbs (float above canvas) */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ x: o1x, y: o1y }}>
        <div className="absolute top-[28%] left-[42%] w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(34,0,124,0.28) 0%, transparent 65%)', filter: 'blur(90px)' }} />
      </motion.div>
      <motion.div className="absolute inset-0 pointer-events-none" style={{ x: o2x, y: o2y }}>
        <div className="absolute bottom-[28%] right-[22%] w-[380px] h-[380px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(109,40,217,0.18) 0%, transparent 65%)', filter: 'blur(70px)' }} />
      </motion.div>

      {/* Spinning orbital ring (desktop only) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden lg:block">
        <div className="orbital w-[560px] h-[560px] rounded-full absolute -translate-x-1/2 -translate-y-1/2"
          style={{ border: '1px solid rgba(109,40,217,0.14)' }} />
        {/* Glowing dot on ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ width: 560, height: 560 }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
            style={{ background: '#a78bfa', boxShadow: '0 0 10px #a78bfa, 0 0 22px rgba(167,139,250,0.6)' }} />
        </motion.div>
        <div className="orbital-reverse w-[760px] h-[760px] rounded-full absolute -translate-x-1/2 -translate-y-1/2"
          style={{ border: '1px solid rgba(76,29,149,0.07)' }} />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">

        <motion.div {...enter(0, 0.7)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-10 glass text-sm font-body text-purple-300">
          <Sparkles size={13} className="text-purple-400" />
          <span>Disponível para estágio</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
        </motion.div>

        <motion.h1 {...enter(1, 1.05)}
          className="font-display font-extrabold leading-[0.9] mb-5"
          style={{ fontSize: 'clamp(3rem, 9.5vw, 8rem)' }}>
          <span className="block text-white" style={{ textShadow: '0 0 60px rgba(109,40,217,0.35)' }}>
            Lucas Gomes
          </span>
          <span className="block gradient-text text-glow">do Amaral</span>
        </motion.h1>

        <motion.p {...enter(2, 0.8)}
          className="font-mono text-white/38 tracking-[0.28em] uppercase text-[11px] md:text-sm mb-3">
          Desenvolvedor Full Stack · Em Formação
        </motion.p>

        <motion.div {...enter(2.4, 0.7)} className="flex items-center justify-center gap-1.5 mb-9">
          <MapPin size={11} className="text-purple-500" />
          <span className="font-body text-white/28 text-sm">Indaiatuba, SP</span>
        </motion.div>

        <motion.p {...enter(3, 0.85)}
          className="font-body text-white/50 text-base md:text-xl max-w-lg mx-auto mb-14 leading-relaxed">
          Decidido desde cedo sobre o meu futuro na tecnologia.
        </motion.p>

        <motion.div {...enter(4, 0.8)} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button
            onClick={() => document.querySelector('#trajetoria')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.06, boxShadow: '0 0 55px rgba(34,0,124,0.7), 0 0 110px rgba(34,0,124,0.25)' }}
            whileTap={{ scale: 0.95 }}
            className="px-9 py-4 rounded-2xl text-white font-body font-medium text-base"
            style={{ background: 'linear-gradient(135deg, #22007c 0%, #4c1d95 55%, #7c3aed 100%)' }}>
            Minha trajetória
          </motion.button>
          <motion.button
            onClick={() => document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.04, backgroundColor: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.25)' }}
            whileTap={{ scale: 0.96 }}
            className="px-9 py-4 rounded-2xl text-white/55 hover:text-white font-body font-medium text-base transition-all duration-300 border border-white/12">
            Entre em contato
          </motion.button>
        </motion.div>

        <motion.button
          onClick={() => document.querySelector('#sobre')?.scrollIntoView({ behavior: 'smooth' })}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/22 hover:text-white/55 transition-colors">
          <span className="font-mono text-[10px] tracking-[0.35em] uppercase">scroll</span>
          <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}>
            <ArrowDown size={13} />
          </motion.div>
        </motion.button>
      </div>
    </section>
  )
}
