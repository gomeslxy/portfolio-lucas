import { motion } from 'framer-motion'
import { useInView } from './useInView'
import { ExternalLink, Github, Sparkles, Lock, Star } from 'lucide-react'

const projects = [
  {
    id: 'agendra',
    featured: true,
    name: 'Agendra',
    tagline: 'SaaS de Automação Comercial com IA',
    description:
      'Plataforma multi-tenant completa que usa inteligência artificial para responder, qualificar e agendar leads em tempo real. Cada empresa tem seu próprio painel de controle, isolamento total de dados, fluxos de atendimento configuráveis e integração direta com WhatsApp — tudo em uma arquitetura SaaS escalável.',
    highlights: [
      'Arquitetura multi-tenant com isolamento de dados por empresa',
      'IA integrada para qualificação e resposta automática de leads',
      'Agendamento em tempo real via WhatsApp',
      'Painel administrativo com métricas e histórico de conversas',
    ],
    tech: ['TypeScript', 'IA / LLM', 'Multi-tenant', 'SaaS', 'WhatsApp API', 'Node.js'],
    status: 'Em produção',
    statusColor: '#34d399',
    live: 'https://agendra.site',
    github: null,
    isPrivate: true,
    accent: '#059669',
  },
  {
    id: 'bonds',
    featured: false,
    name: 'Bonds Agence',
    tagline: 'Site Institucional Premium',
    description:
      'Site institucional para agência criativa com foco total em experiência visual. Apresenta animações fluidas, efeitos de parallax, microinterações elaboradas e menu interativo — tudo construído com atenção máxima a detalhes que elevam a percepção da marca.',
    highlights: [
      'Animações e transições de alta fidelidade',
      'Layout responsivo com microinterações',
      'Desempenho otimizado com Vite',
    ],
    tech: ['TypeScript', 'React', 'Vite', 'Tailwind CSS'],
    status: 'Live',
    statusColor: '#34d399',
    live: 'https://bonds-agence.vercel.app',
    github: 'https://github.com/gomeslxy/bonds-agence',
    isPrivate: false,
    stars: 1,
    accent: '#047857',
  },
  {
    id: 'valentines',
    featured: false,
    name: "Valentine's for Carol",
    tagline: 'Experiência Web Interativa',
    description:
      'Aplicação web emocional e criativa construída inteiramente em TypeScript. Uma experiência personalizada com animações elaboradas e design detalhado — demonstra a capacidade de criar experiências digitais únicas que unem técnica com criatividade genuína.',
    highlights: [
      'Experiência totalmente personalizada e interativa',
      'Animações complexas com TypeScript puro',
      'Design emocional centrado na experiência do usuário',
    ],
    tech: ['TypeScript', 'React', 'Vite', 'Framer Motion'],
    status: 'Live',
    statusColor: '#34d399',
    live: 'https://valentines-carol.vercel.app',
    github: null,
    isPrivate: true,
    accent: '#065f46',
  },
  {
    id: 'portfolio',
    featured: false,
    name: 'Portfolio Gomes v1',
    tagline: 'Portfólio Profissional Anterior',
    description:
      'Primeiro portfólio profissional com design moderno e responsivo. Demonstra evolução técnica consistente — base para o portfólio atual, construído com foco em identidade visual e apresentação profissional.',
    highlights: [
      'Design system construído do zero',
      'Foco em identidade visual e branding',
      'Responsivo e otimizado para todos os dispositivos',
    ],
    tech: ['TypeScript', 'React', 'Vite', 'Tailwind CSS'],
    status: 'Live',
    statusColor: '#34d399',
    live: 'https://portfolio-gomes-delta.vercel.app',
    github: 'https://github.com/gomeslxy/portfolio-gomes',
    isPrivate: false,
    accent: '#022c22',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 32, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
}

function TechTag({ label }) {
  return (
    <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono text-emerald-300/70 border border-emerald-500/15 bg-emerald-500/5">
      {label}
    </span>
  )
}

function FeaturedProject({ project }) {
  const [ref, inView] = useInView()
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-3xl overflow-hidden mb-6 group"
      style={{
        background: `linear-gradient(135deg, rgba(6,95,70,0.25) 0%, rgba(4,26,13,0.7) 60%, rgba(2,44,34,0.3) 100%)`,
        border: `1px solid rgba(5,150,105,0.2)`,
      }}
    >
      {/* Animated background glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 30% 40%, rgba(5,150,105,0.1) 0%, transparent 70%)' }} />

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-8 pointer-events-none" />

      <div className="relative z-10 p-8 md:p-10">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono"
                style={{ background: 'rgba(52,211,153,0.1)', borderColor: 'rgba(52,211,153,0.25)', color: project.statusColor }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: project.statusColor }} />
                {project.status}
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-400/8 border border-emerald-400/15">
                <Sparkles size={10} className="text-emerald-400" />
                <span className="font-mono text-[10px] text-emerald-400">Destaque</span>
              </div>
              {project.isPrivate && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                  <Lock size={9} className="text-white/40" />
                  <span className="font-mono text-[10px] text-white/40">Privado</span>
                </div>
              )}
            </div>

            <h3 className="font-display font-bold text-3xl md:text-4xl text-white mb-1">{project.name}</h3>
            <p className="font-mono text-sm text-emerald-400/70 mb-5">{project.tagline}</p>

            <p className="font-body text-white/55 text-base leading-relaxed mb-6">{project.description}</p>

            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => <TechTag key={t} label={t} />)}
            </div>
          </div>

          {/* Right */}
          <div className="space-y-4">
            {/* Highlights */}
            <div className="rounded-2xl p-5"
              style={{ background: 'rgba(4,26,13,0.6)', border: '1px solid rgba(5,150,105,0.12)' }}>
              <p className="font-mono text-[10px] text-emerald-400/60 tracking-widest uppercase mb-3">Destaques do projeto</p>
              <ul className="space-y-2.5">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-emerald-400/60 mt-2 flex-shrink-0" />
                    <span className="font-body text-white/60 text-sm leading-relaxed">{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Links */}
            <div className="flex gap-3">
              {project.live && (
                <motion.a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04, boxShadow: '0 0 25px rgba(5,150,105,0.4)' }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white font-body font-medium text-sm transition-all duration-300"
                  style={{ background: 'linear-gradient(135deg, #065f46, #059669)' }}
                >
                  <ExternalLink size={14} />
                  Ver ao vivo
                </motion.a>
              )}
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white/60 hover:text-white font-body text-sm transition-all duration-300 border border-white/10 hover:border-white/20 hover:bg-white/5"
                >
                  <Github size={14} />
                  GitHub
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ProjectCard({ project, delay = 0 }) {
  const [ref, inView] = useInView()
  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="group relative rounded-2xl overflow-hidden cursor-default h-full flex flex-col"
      style={{
        background: 'rgba(4, 26, 13, 0.55)',
        border: '1px solid rgba(5,150,105,0.12)',
        transition: 'box-shadow 0.3s, border-color 0.3s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 30px rgba(5,150,105,0.12)`
        e.currentTarget.style.borderColor = 'rgba(5,150,105,0.25)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.borderColor = 'rgba(5,150,105,0.12)'
      }}
    >
      {/* Top accent line */}
      <div className="h-px w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)` }} />

      <div className="p-6 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-mono"
              style={{ background: 'rgba(52,211,153,0.08)', borderColor: 'rgba(52,211,153,0.2)', color: project.statusColor }}>
              <span className="w-1 h-1 rounded-full" style={{ background: project.statusColor }} />
              {project.status}
            </div>
            {project.isPrivate && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 border border-white/8">
                <Lock size={8} className="text-white/35" />
                <span className="font-mono text-[9px] text-white/35">Privado</span>
              </div>
            )}
            {project.stars && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-400/8 border border-amber-400/15">
                <Star size={9} className="text-amber-400 fill-amber-400" />
                <span className="font-mono text-[9px] text-amber-400">{project.stars}</span>
              </div>
            )}
          </div>
        </div>

        <h3 className="font-display font-bold text-white text-xl mb-1 group-hover:text-emerald-100 transition-colors">{project.name}</h3>
        <p className="font-mono text-xs text-emerald-400/60 mb-3">{project.tagline}</p>
        <p className="font-body text-white/50 text-sm leading-relaxed mb-4">{project.description}</p>

        {/* Highlights */}
        <ul className="space-y-1.5 mb-5 flex-1">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-emerald-500/50 mt-1.5 flex-shrink-0" />
              <span className="font-body text-white/40 text-xs leading-relaxed">{h}</span>
            </li>
          ))}
        </ul>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((t) => <TechTag key={t} label={t} />)}
        </div>

        {/* Links */}
        <div className="flex gap-2 mt-auto">
          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-white font-body text-xs font-medium transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, #065f46, #047857)' }}
            >
              <ExternalLink size={12} />
              Ver ao vivo
            </motion.a>
          )}
          {project.github && !project.isPrivate && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-white/50 hover:text-white font-body text-xs transition-all duration-300 border border-white/10 hover:border-white/20 hover:bg-white/5"
            >
              <Github size={12} />
              GitHub
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [ref, inView] = useInView()
  const featured = projects.find((p) => p.featured)
  const regular = projects.filter((p) => !p.featured)

  return (
    <section id="projetos" className="relative py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #02010a 0%, #041a0d 40%, #02010a 100%)' }}>

      {/* Ambient glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(5,150,105,0.3) 0%, transparent 70%)', filter: 'blur(100px)' }} />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full pointer-events-none opacity-15"
        style={{ background: 'radial-gradient(circle, rgba(6,95,70,0.4) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #065f46, #059669)' }} />
            <span className="font-mono text-xs tracking-widest uppercase text-emerald-400">Projetos</span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            O que <span className="gradient-text">já construí</span>
          </h2>
          <p className="font-body text-white/40 text-lg max-w-xl leading-relaxed">
            Cada projeto é uma prova de comprometimento real — não exercícios de sala de aula, mas produtos funcionando em produção.
          </p>
        </motion.div>

        {/* Featured project */}
        {featured && <FeaturedProject project={featured} />}

        {/* Regular projects grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {regular.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={i * 0.1} />
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="mt-12 text-center"
        >
          <p className="font-mono text-[10px] text-white/20 tracking-widest uppercase">
            + Mais projetos em desenvolvimento · GitHub: gomeslxy
          </p>
        </motion.div>
      </div>
    </section>
  )
}
