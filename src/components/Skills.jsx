import { motion } from 'framer-motion'
import { useInView } from './useInView'

const skillGroups = [
  {
    category: 'Frontend',
    skills: [
      { name: 'HTML5', level: 75, icon: '🌐', desc: 'Estruturação semântica de páginas web' },
      { name: 'CSS3', level: 70, icon: '🎨', desc: 'Estilização avançada e layouts modernos' },
      { name: 'JavaScript', level: 45, icon: '⚡', desc: 'Em aprendizado ativo — lógica e manipulação DOM' },
    ],
  },
  {
    category: 'Programação & Lógica',
    skills: [
      { name: 'Lógica de Programação', level: 65, icon: '🧠', desc: 'Algoritmos e raciocínio lógico com Portugol' },
      { name: 'Portugol', level: 60, icon: '📟', desc: 'Pseudocódigo e estruturas de controle' },
    ],
  },
  {
    category: 'Ferramentas & Idiomas',
    skills: [
      { name: 'Excel Intermediário', level: 65, icon: '📊', desc: 'Planilhas, fórmulas e organização de dados' },
      { name: 'Pacote Office', level: 70, icon: '📄', desc: 'Word, PowerPoint e produtividade geral' },
      { name: 'Inglês', level: 90, icon: '🇺🇸', desc: 'Fluente — comunicação técnica e cotidiana' },
      { name: 'Windows / Tecnologia', level: 80, icon: '💻', desc: 'Ambiente de trabalho e troubleshooting' },
    ],
  },
  {
    category: 'Em breve',
    skills: [
      { name: 'Java', level: 0, icon: '☕', desc: 'Próxima meta — orientação a objetos e back-end robusto' },
    ],
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

function SkillBar({ level, color }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} className="h-1 rounded-full overflow-hidden bg-white/5">
      <motion.div
        className="h-full rounded-full"
        style={{ background: color }}
        initial={{ width: 0 }}
        animate={{ width: inView ? `${level}%` : 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  )
}

function SkillCard({ skill, index }) {
  const isFuture = skill.level === 0
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`gradient-border rounded-2xl p-5 group transition-all duration-300 hover:glow-navy-sm cursor-default ${isFuture ? 'opacity-60 hover:opacity-90' : ''}`}
      style={{ background: 'rgba(4, 5, 46, 0.5)' }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{skill.icon}</span>
          <div>
            <div className="font-display font-semibold text-white text-sm group-hover:text-purple-300 transition-colors">
              {skill.name}
            </div>
            <div className="font-mono text-xs text-white/35 mt-0.5">
              {isFuture ? 'Próxima meta' : `${skill.level}% domínio`}
            </div>
          </div>
        </div>
        {isFuture && (
          <span className="px-2 py-0.5 rounded-full text-xs font-mono text-white/30 border border-white/10">
            Em breve
          </span>
        )}
      </div>
      <p className="font-body text-white/40 text-xs leading-relaxed mb-4">{skill.desc}</p>
      {!isFuture && (
        <SkillBar
          level={skill.level}
          color="linear-gradient(90deg, #22007c, #7c3aed)"
        />
      )}
    </motion.div>
  )
}

export default function Skills() {
  const [ref, inView] = useInView()

  return (
    <section id="skills" className="relative py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #02010a 0%, #04052e 30%, #140152 70%, #04052e 100%)' }}>

      {/* BG orb */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-10 blur-[80px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #22007c 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #22007c, #7c3aed)' }} />
            <span className="font-mono text-xs tracking-widest uppercase text-purple-400">Habilidades</span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            O que eu <span className="gradient-text">domino</span>
          </h2>
          <p className="font-body text-white/40 text-lg max-w-xl leading-relaxed">
            Cada habilidade representa horas de estudo dedicado e prática constante. Em evolução permanente.
          </p>
        </motion.div>

        {/* Skill groups */}
        <div className="space-y-12">
          {skillGroups.map((group) => (
            <div key={group.category}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-6"
              >
                <span className="font-body text-white/50 text-sm font-medium tracking-wide">{group.category}</span>
                <span className="flex-1 h-px bg-white/5" />
              </motion.div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className={`grid gap-4 ${
                  group.skills.length === 2
                    ? 'sm:grid-cols-2'
                    : group.skills.length >= 4
                    ? 'sm:grid-cols-2 lg:grid-cols-4'
                    : 'sm:grid-cols-3'
                }`}
              >
                {group.skills.map((skill, i) => (
                  <SkillCard key={skill.name} skill={skill} index={i} />
                ))}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="font-mono text-xs text-white/25 tracking-widest uppercase">
            + Novas habilidades sendo adquiridas constantemente
          </p>
        </motion.div>
      </div>
    </section>
  )
}
