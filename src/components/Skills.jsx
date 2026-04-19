import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useInView } from './useInView'

const skillGroups = [
  {
    category: 'Frontend & Web',
    skills: [
      { name: 'HTML5',      level: 75, icon: '🌐', desc: 'Estruturação semântica, acessibilidade e boas práticas de marcação' },
      { name: 'CSS3',       level: 68, icon: '🎨', desc: 'Flexbox, Grid, animações e design responsivo moderno' },
      { name: 'JavaScript', level: 42, icon: '⚡', desc: 'Em aprendizado ativo — DOM, eventos, lógica e estruturas de dados' },
    ],
  },
  {
    category: 'Lógica & Programação',
    skills: [
      { name: 'Lógica de Programação', level: 68, icon: '🧠', desc: 'Algoritmos, estruturas de controle e raciocínio computacional com Portugol' },
    ],
  },
  {
    category: 'Ferramentas & Idiomas',
    skills: [
      { name: 'Inglês Fluente', level: 92, icon: '🇺🇸', desc: 'BC School — fluência plena após anos de estudo intensivo em conversação' },
      { name: 'Excel',          level: 68, icon: '📊', desc: 'Fórmulas, tabelas dinâmicas, formatação condicional e organização de dados' },
      { name: 'Pacote Office',  level: 70, icon: '📄', desc: 'Word, PowerPoint e produtividade corporativa no nível intermediário' },
      { name: 'Windows',        level: 82, icon: '💻', desc: 'Ambiente de trabalho, troubleshooting e configurações avançadas' },
    ],
  },
  {
    category: 'Em breve',
    skills: [
      { name: 'Java', level: 0, icon: '☕', desc: 'Próxima meta — orientação a objetos, back-end robusto e ecossistema empresarial' },
    ],
  },
]

function TiltCard({ children, className, style }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 18 })
  const sy = useSpring(y, { stiffness: 200, damping: 18 })
  const rotateX = useTransform(sy, [-0.5, 0.5], ['8deg', '-8deg'])
  const rotateY = useTransform(sx, [-0.5, 0.5], ['-8deg', '8deg'])
  const glowX = useTransform(sx, [-0.5, 0.5], ['0%', '100%'])
  const glowY = useTransform(sy, [-0.5, 0.5], ['0%', '100%'])

  const handle = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const reset = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handle}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', ...style }}
      className={className}
    >
      {/* Dynamic glow spot */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(109,40,217,0.12) 0%, transparent 55%)`,
        }}
      />
      {children}
    </motion.div>
  )
}

function SkillBar({ level }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} className="h-0.5 rounded-full overflow-hidden bg-white/6 mt-4">
      <motion.div
        className="h-full rounded-full"
        style={{ background: 'linear-gradient(90deg, #22007c, #8b5cf6)' }}
        initial={{ width: 0 }}
        animate={{ width: inView ? `${level}%` : 0 }}
        transition={{ duration: 1.3, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  )
}

const cardAnim = {
  hidden:  { opacity: 0, y: 28, filter: 'blur(7px)' },
  visible: { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export default function Skills() {
  const [ref, inView] = useInView()

  return (
    <section id="skills" className="relative py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #02010a 0%, #04052e 35%, #140152 70%, #04052e 100%)' }}>

      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(34,0,124,0.12) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #22007c, #7c3aed)' }} />
            <span className="font-mono text-xs tracking-widest uppercase text-purple-400">Habilidades</span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Stack & <span className="gradient-text">domínio</span>
          </h2>
          <p className="font-body text-white/40 text-lg max-w-lg leading-relaxed">
            Cada barra representa horas reais de prática. Evolução constante, sem pressa, sem atalhos.
          </p>
        </motion.div>

        <div className="space-y-14">
          {skillGroups.map((group) => (
            <div key={group.category}>
              <motion.div initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5 }} className="flex items-center gap-3 mb-6">
                <span className="font-body text-white/45 text-sm tracking-wide">{group.category}</span>
                <span className="flex-1 h-px bg-white/6" />
              </motion.div>

              <motion.div
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className={`grid gap-4 ${
                  group.skills.length === 1 ? 'grid-cols-1 max-w-sm'
                  : group.skills.length === 2 ? 'sm:grid-cols-2'
                  : group.skills.length >= 4 ? 'sm:grid-cols-2 lg:grid-cols-4'
                  : 'sm:grid-cols-3'
                }`}
              >
                {group.skills.map((skill) => {
                  const isFuture = skill.level === 0
                  return (
                    <motion.div key={skill.name} variants={cardAnim}>
                      <TiltCard
                        className={`group relative gradient-border rounded-2xl p-5 overflow-hidden cursor-default transition-all duration-300 hover:glow-navy-sm ${isFuture ? 'opacity-55 hover:opacity-85' : ''}`}
                        style={{ background: 'rgba(4, 5, 46, 0.55)' }}
                      >
                        <div className="relative z-10">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <span className="text-xl">{skill.icon}</span>
                              <div>
                                <div className="font-display font-semibold text-white text-sm group-hover:text-purple-200 transition-colors">
                                  {skill.name}
                                </div>
                                <div className="font-mono text-[10px] text-white/30 mt-0.5">
                                  {isFuture ? 'Próxima meta' : `${skill.level}%`}
                                </div>
                              </div>
                            </div>
                            {isFuture && (
                              <span className="text-[10px] font-mono text-white/25 border border-white/10 px-2 py-0.5 rounded-full">Em breve</span>
                            )}
                          </div>
                          <p className="font-body text-white/38 text-xs leading-relaxed">{skill.desc}</p>
                          {!isFuture && <SkillBar level={skill.level} />}
                        </div>
                      </TiltCard>
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1 }}
          className="mt-16 text-center font-mono text-[10px] text-white/20 tracking-widest uppercase">
          + Novas habilidades sendo adquiridas continuamente
        </motion.p>
      </div>
    </section>
  )
}
