import { motion } from 'framer-motion'
import { useInView } from './useInView'
import { Code2, Globe, BookOpen, Target } from 'lucide-react'

const stats = [
  { icon: Code2, label: 'Linguagens em estudo', value: '4+' },
  { icon: Globe, label: 'Inglês', value: 'Fluente' },
  { icon: BookOpen, label: 'Ano letivo', value: '2º EM' },
  { icon: Target, label: 'Foco', value: 'Full Stack' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(6px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function About() {
  const [ref, inView] = useInView()

  return (
    <section id="sobre" className="relative py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #02010a 0%, #04052e 50%, #02010a 100%)' }}>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-8 blur-[100px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #140152 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #22007c, #7c3aed)' }} />
            <span className="font-mono text-xs tracking-widest uppercase text-purple-400">Sobre mim</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.h2
                variants={itemVariants}
                className="font-display font-bold text-4xl md:text-5xl text-white mb-8 leading-tight"
              >
                Um desenvolvedor
                <span className="block gradient-text">em construção</span>
              </motion.h2>

              <motion.div variants={itemVariants}
                className="space-y-5 font-body text-white/60 text-base md:text-lg leading-relaxed"
              >
                <p>
                  Sou <span className="text-white/85 font-medium">Lucas Gomes do Amaral</span>, estudante do 2º ano do ensino médio e apaixonado por tecnologia.
                  Estou em formação como desenvolvedor Full Stack, com foco em <span className="text-purple-400">JavaScript, HTML e CSS</span>, além de lógica de programação em Portugol.
                </p>
                <p>
                  Tenho <span className="text-white/85 font-medium">inglês fluente</span> após quatro anos de estudo dedicado, o que me permite consumir documentações, cursos e conteúdos técnicos internacionais sem barreiras — e me abre portas para atuar no mercado global.
                </p>
                <p>
                  Domino <span className="text-purple-400">Excel e o Pacote Office</span> em nível intermediário, e tenho sólido conhecimento em sistemas Windows. Minha próxima meta de linguagem é <span className="text-white/85 font-medium">Java</span> — ainda não comecei, mas está nos planos concretos para ampliar minha visão de back-end.
                </p>
                <p>
                  Meu objetivo é <span className="text-purple-400">evoluir constantemente</span> e ingressar no mercado de tecnologia construindo soluções reais e impactantes — com disciplina, visão de longo prazo e paixão genuína pelo que faço.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-8">
                <motion.button
                  onClick={() => document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' })}
                  whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(34,0,124,0.5)' }}
                  whileTap={{ scale: 0.97 }}
                  className="px-7 py-3.5 rounded-xl text-white font-body font-medium text-sm transition-all duration-300"
                  style={{ background: 'linear-gradient(135deg, #22007c, #4c1d95)' }}
                >
                  Vamos conversar →
                </motion.button>
              </motion.div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  variants={itemVariants}
                  custom={i}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="gradient-border rounded-2xl p-6 group transition-all duration-300 hover:glow-navy-sm"
                  style={{ background: 'rgba(4, 5, 46, 0.5)' }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                    style={{ background: 'linear-gradient(135deg, rgba(34,0,124,0.4), rgba(109,40,217,0.2))' }}>
                    <s.icon size={18} className="text-purple-400" />
                  </div>
                  <div className="font-display font-bold text-2xl text-white mb-1">{s.value}</div>
                  <div className="font-body text-white/40 text-sm">{s.label}</div>
                </motion.div>
              ))}

              <motion.div
                variants={itemVariants}
                className="col-span-2 gradient-border rounded-2xl p-6"
                style={{ background: 'rgba(4, 5, 46, 0.5)' }}
              >
                <p className="font-display text-white/70 text-base italic leading-relaxed">
                  "Tecnologia não é apenas minha área de estudo — é o campo onde decidi construir meu futuro desde cedo."
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="w-4 h-px" style={{ background: '#7c3aed' }} />
                  <span className="font-mono text-xs text-purple-400 tracking-wide">Lucas Amaral</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
