import { motion } from 'framer-motion'
import { useInView } from './useInView'
import { GraduationCap, Globe, MapPin, Lightbulb } from 'lucide-react'

const highlights = [
  { icon: GraduationCap, label: 'E.E. Professora Helena de Campos Camargo', sub: '2º ano do Ensino Médio' },
  { icon: Globe,         label: 'BC School — Inglês Intensivo',             sub: 'Fluente após anos de estudo' },
  { icon: MapPin,        label: 'Jardim do Vale 2, Indaiatuba – SP',         sub: 'São Paulo, Brasil' },
  { icon: Lightbulb,     label: 'Objetivo claro desde cedo',                sub: 'Desenvolvedor Full Stack' },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11 } },
}
const item = {
  hidden:  { opacity: 0, y: 35, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

export default function About() {
  const [ref, inView] = useInView()

  return (
    <section id="sobre" className="relative py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #02010a 0%, #04052e 55%, #02010a 100%)' }}>

      <div className="absolute right-0 top-0 h-full w-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 100% 40%, rgba(20,1,82,0.5) 0%, transparent 60%)' }} />

      {/* Floating star dots for atmosphere */}
      {[...Array(12)].map((_, i) => (
        <div key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width:  `${1 + (i % 3) * 0.5}px`,
            height: `${1 + (i % 3) * 0.5}px`,
            left:   `${5 + (i * 7.8) % 90}%`,
            top:    `${10 + (i * 11.3) % 80}%`,
            background: i % 4 === 0 ? 'rgba(167,139,250,0.6)' : 'rgba(255,255,255,0.25)',
            boxShadow: i % 3 === 0 ? '0 0 4px rgba(167,139,250,0.5)' : 'none',
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${2 + (i % 4)}s`,
          }}
        />
      ))}

      <div className="max-w-6xl mx-auto px-6">
        <motion.div ref={ref} variants={container} initial="hidden" animate={inView ? 'visible' : 'hidden'}>

          <motion.div variants={item} className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #22007c, #7c3aed)' }} />
            <span className="font-mono text-xs tracking-widest uppercase text-purple-400">Sobre mim</span>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-16 items-start">
            {/* Text — 3 cols */}
            <div className="lg:col-span-3">
              <motion.h2 variants={item} className="font-display font-bold leading-tight mb-8"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
                <span className="text-white">Dezesseis anos,</span>
                <span className="block gradient-text">uma direção clara.</span>
              </motion.h2>

              <motion.div variants={item} className="space-y-5 font-body text-white/55 text-base md:text-lg leading-relaxed">
                <p>
                  Me chamo <span className="text-white/85 font-medium">Lucas Gomes do Amaral</span>.
                  Estudo na <span className="text-purple-300">E.E. Professora Helena de Campos Camargo</span> em Indaiatuba, onde curso o 2º ano do ensino médio — e, em paralelo, dedico boa parte do meu tempo ao que realmente me move: programação e tecnologia.
                </p>
                <p>
                  Aprendi inglês na <span className="text-purple-300">BC School</span>, escola de inglês com metodologia intensiva e foco em conversação. Foram anos de prática constante que me levaram à <span className="text-white/85 font-medium">fluência plena</span> — o que hoje me permite consumir documentações internacionais, acompanhar conteúdos técnicos sem barreiras e me comunicar com equipes globais. Tenho planos de fazer intercâmbio para aprimorar ainda mais.
                </p>
                <p>
                  Minha decisão de seguir desenvolvimento foi tomada cedo — e com convicção. Aprendo com facilidade, tenho disciplina para estudar de forma consistente e curiosidade genuína por entender como as coisas funcionam por baixo. Não espero a sala de aula me trazer tecnologia: eu vou atrás.
                </p>
                <p>
                  Meu objetivo é me tornar <span className="text-purple-300">desenvolvedor Full Stack</span>, construir produtos reais e colaborar com equipes que compartilham a mesma paixão por criar coisas úteis e bem feitas.
                </p>
              </motion.div>

              <motion.button
                variants={item}
                onClick={() => document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.04, boxShadow: '0 0 35px rgba(34,0,124,0.55)' }}
                whileTap={{ scale: 0.97 }}
                className="mt-10 px-7 py-3.5 rounded-xl text-white font-body font-medium text-sm transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, #22007c, #4c1d95)' }}
              >
                Vamos conversar →
              </motion.button>
            </div>

            {/* Highlights — 2 cols */}
            <div className="lg:col-span-2 grid grid-cols-1 gap-4">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.label}
                  variants={item}
                  whileHover={{ x: 4, scale: 1.01 }}
                  className="gradient-border gradient-border-hover rounded-2xl p-5 flex items-center gap-4 transition-all duration-300"
                  style={{ background: 'rgba(4, 5, 46, 0.55)' }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, rgba(34,0,124,0.4), rgba(109,40,217,0.2))' }}>
                    <h.icon size={17} className="text-purple-400" />
                  </div>
                  <div>
                    <div className="font-body font-medium text-white/85 text-sm leading-snug">{h.label}</div>
                    <div className="font-mono text-xs text-white/35 mt-0.5">{h.sub}</div>
                  </div>
                </motion.div>
              ))}

              {/* Quote */}
              <motion.div
                variants={item}
                className="gradient-border rounded-2xl p-5 mt-1"
                style={{ background: 'rgba(4, 5, 46, 0.4)' }}
              >
                <p className="font-display text-white/60 text-sm italic leading-relaxed">
                  "Tecnologia não é só o que estudo — é o campo onde escolhi construir meu futuro."
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="w-4 h-px" style={{ background: '#7c3aed' }} />
                  <span className="font-mono text-xs text-purple-400/70">Lucas, 16 anos</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
