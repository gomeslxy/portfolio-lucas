import { motion } from 'framer-motion'
import { useInView } from './useInView'
import { Code2, Globe, BookOpen, Layers, Coffee, ArrowRight } from 'lucide-react'

const milestones = [
  {
    icon: BookOpen,
    period: 'Início',
    title: 'A decisão veio cedo',
    body: 'Desde criança, tecnologia sempre chamou atenção de um jeito diferente. Não era só uso — era curiosidade de entender o que havia por baixo. Isso foi crescendo até virar uma decisão clara: programação seria o meu caminho.',
    color: '#7c3aed',
  },
  {
    icon: Globe,
    period: 'BC School',
    title: 'Inglês como ferramenta real',
    body: 'O inglês veio pela BC School, com metodologia intensiva e foco em conversação. Com fluência plena, o mercado internacional ficou acessível — documentações técnicas, cursos e oportunidades no exterior já fazem parte da rotina.',
    color: '#6d28d9',
    highlight: 'Apto a trabalhar para o exterior',
  },
  {
    icon: Code2,
    period: 'Agora',
    title: 'Construindo a base técnica',
    body: 'HTML, CSS, JavaScript e lógica de programação em Portugol formam o núcleo atual de estudos. Cada linguagem aprendida com intencionalidade — entendendo o porquê antes do como. Domino também Excel e o Pacote Office em nível intermediário.',
    color: '#5b21b6',
  },
  {
    icon: Layers,
    period: 'Próximo passo',
    title: 'Evoluindo para Full Stack',
    body: 'O foco é avançar para o back-end. Java está no radar como próxima linguagem — orientação a objetos e solidez de arquitetura. A meta é unir front e back com visão de produto completo.',
    color: '#4c1d95',
  },
  {
    icon: Coffee,
    period: 'Visão',
    title: 'Contribuindo com times reais',
    body: 'Mais do que escrever código, quero resolver problemas reais com pessoas que compartilham o mesmo comprometimento. Disciplina, curiosidade e proatividade para aprender o que for necessário — essa é a mentalidade que carrego.',
    color: '#3b0764',
  },
]

const competencies = [
  'Facilidade de aprendizado',
  'Disciplina e consistência',
  'Curiosidade genuína por tecnologia',
  'Proatividade nos estudos',
  'Responsabilidade com objetivos',
  'Trabalho em equipe',
]

const item = {
  hidden:  { opacity: 0, x: -20, filter: 'blur(5px)' },
  visible: { opacity: 1, x: 0,   filter: 'blur(0px)', transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
}

export default function Vision() {
  const [ref, inView] = useInView()
  const [compRef, compInView] = useInView()

  return (
    <section id="trajetoria" className="relative py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #04052e 0%, #02010a 100%)' }}>

      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(20,1,82,0.6) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #22007c, #7c3aed)' }} />
            <span className="font-mono text-xs tracking-widest uppercase text-purple-400">Trajetória</span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Visão & <span className="gradient-text">trajetória</span>
          </h2>
          <p className="font-body text-white/40 text-lg max-w-xl leading-relaxed">
            Uma história de decisões consistentes — não de acasos. Cada etapa foi escolhida com propósito.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="grid lg:grid-cols-2 gap-12 mb-24">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-5 top-8 bottom-0 w-px pointer-events-none"
              style={{ background: 'linear-gradient(to bottom, rgba(109,40,217,0.45) 0%, transparent 100%)' }} />

            <motion.div
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.13 } } }}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="space-y-0"
            >
              {milestones.map((m, i) => (
                <motion.div key={m.title} variants={item} className="flex gap-5 pb-10 relative">
                  {/* Node */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center z-10"
                    style={{ background: `linear-gradient(135deg, ${m.color}55, ${m.color}22)`, border: `1px solid ${m.color}40` }}>
                    <m.icon size={16} style={{ color: m.color === '#7c3aed' ? '#c4b5fd' : '#a78bfa' }} />
                  </div>

                  <div className="pt-1 flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: m.color === '#7c3aed' ? '#c4b5fd' : '#a78bfa' }}>
                        {m.period}
                      </span>
                      {m.highlight && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/20">
                          {m.highlight}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display font-semibold text-white text-lg mb-2">{m.title}</h3>
                    <p className="font-body text-white/45 text-sm leading-relaxed">{m.body}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right side — competencies + CTA */}
          <div className="lg:pt-4">
            <motion.div
              ref={compRef}
              initial={{ opacity: 0, y: 30 }}
              animate={compInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75 }}
              className="gradient-border rounded-3xl p-8 mb-6"
              style={{ background: 'rgba(4, 5, 46, 0.55)' }}
            >
              <div className="flex items-center gap-2 mb-6">
                <span className="w-6 h-px" style={{ background: '#7c3aed' }} />
                <span className="font-mono text-xs tracking-widest uppercase text-purple-400">Perfil comportamental</span>
              </div>
              <p className="font-body text-white/50 text-sm leading-relaxed mb-6">
                Além do técnico, o que define o profissional que estou me tornando é a forma como abordo o aprendizado — com consistência, sem esperar que as oportunidades apareçam sozinhas.
              </p>
              <motion.div
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
                initial="hidden"
                animate={compInView ? 'visible' : 'hidden'}
                className="space-y-2.5"
              >
                {competencies.map((c) => (
                  <motion.div
                    key={c}
                    variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5 } } }}
                    className="flex items-center gap-3"
                  >
                    <ArrowRight size={12} className="text-purple-500 flex-shrink-0" />
                    <span className="font-body text-white/65 text-sm">{c}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={compInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="gradient-border rounded-3xl p-7 text-center"
              style={{ background: 'rgba(4, 5, 46, 0.35)', borderStyle: 'dashed' }}
            >
              <p className="font-display font-semibold text-white/75 text-lg mb-2">Pronto para colaborar</p>
              <p className="font-body text-white/35 text-sm mb-5 leading-relaxed">
                Estágio, projeto freelance ou primeira oportunidade CLT — estou disponível e comprometido.
              </p>
              <motion.button
                onClick={() => document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(34,0,124,0.5)' }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 rounded-xl text-white font-body font-medium text-sm"
                style={{ background: 'linear-gradient(135deg, #22007c, #4c1d95)' }}
              >
                Entrar em contato
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
