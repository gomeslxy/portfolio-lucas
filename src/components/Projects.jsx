import { motion } from 'framer-motion'
import { useInView } from './useInView'
import {
  ExternalLink, Github, Star, Zap, Database, Globe,
  Calendar, CreditCard, Brain, Mic, MessageSquare,
  ShieldCheck, TrendingUp, Layers, Box,
} from 'lucide-react'

/* ─── Agendra data ──────────────────────────────────────────────────── */
const agendraFeatures = [
  {
    icon: Brain,
    title: 'Multi-AI com Fallback Automático',
    body: 'Claude (Anthropic), Gemini, Groq, Cerebras e SambaNova integrados. Se um provedor falha, o sistema troca automaticamente para o próximo — zero downtime nas respostas.',
  },
  {
    icon: MessageSquare,
    title: 'WhatsApp + Instagram Cloud API',
    body: 'Atendimento simultâneo via WhatsApp Business Cloud API e Instagram Direct. Lê texto, interpreta áudio via transcrição e analisa imagens enviadas pelo cliente.',
  },
  {
    icon: Calendar,
    title: 'Agendamento Inteligente',
    body: 'Integração nativa com Google Calendar via OAuth2. A IA negocia horários, verifica disponibilidade em tempo real e confirma agendamentos diretamente na conversa, com suporte a fusos horários.',
  },
  {
    icon: TrendingUp,
    title: 'Lead Scoring Dinâmico',
    body: 'Cada lead é classificado automaticamente como hot, warm ou cold com base no comportamento da conversa. Leads frios recebem campanhas de reengajamento automáticas com follow-ups programados.',
  },
  {
    icon: Database,
    title: 'RAG — Base de Conhecimento Vetorial',
    body: 'Indexação de documentos (PDF, Excel, Word) em vetores. A IA responde com base no conteúdo real da empresa, garantindo precisão e contexto, sem alucinações genéricas.',
  },
  {
    icon: ShieldCheck,
    title: 'Shadow Mode',
    body: 'Modo de revisão humana: a IA rascunha a resposta e a exibe para aprovação antes de enviar. Garante controle total da equipe sem abrir mão da velocidade da automação.',
  },
  {
    icon: CreditCard,
    title: 'Stripe + PIX no Chat',
    body: 'Planos gerenciados via Stripe com limites por tier. Cobranças PIX processadas diretamente dentro da conversa do WhatsApp, sem redirecionar o cliente para links externos.',
  },
  {
    icon: Mic,
    title: 'Áudio e Imagem',
    body: 'Transcrição de mensagens de voz em tempo real e análise de imagens enviadas pelo cliente — a IA entende contexto visual e auditivo, não só texto.',
  },
]

const agendraStack = [
  { label: 'Next.js 15', note: 'App Router' },
  { label: 'React 19', note: 'Server Components' },
  { label: 'TypeScript', note: '95.3% do código' },
  { label: 'Supabase', note: 'PostgreSQL + Realtime + Auth + Storage + Edge Functions' },
  { label: 'Upstash Redis', note: 'Cache + Rate Limiting' },
  { label: 'Claude AI', note: 'Anthropic SDK' },
  { label: 'OpenAI SDK', note: 'Fallback' },
  { label: 'WhatsApp Cloud API', note: 'Meta' },
  { label: 'Google Calendar', note: 'OAuth2' },
  { label: 'Stripe', note: 'Subscriptions + Webhooks' },
  { label: 'Framer Motion 12', note: 'Animações' },
  { label: 'TailwindCSS v4', note: 'Styling' },
  { label: 'Vitest', note: 'Testes' },
  { label: 'GitHub Actions', note: 'CI/CD' },
  { label: 'Vercel', note: 'Deploy' },
]

const agendraStats = [
  { value: '311', label: 'commits' },
  { value: '95%', label: 'TypeScript' },
  { value: '6', label: 'provedores IA' },
  { value: '2', label: 'canais (WA + IG)' },
]

/* ─── Other projects ────────────────────────────────────────────────── */
const otherProjects = [
  {
    id: 'bonds',
    name: 'Bonds Agence',
    tagline: 'Site Institucional Premium — v3.5',
    description:
      'Site institucional para agência criativa com backend real: Supabase, autenticação JWT, Redis para rate-limiting e Stripe para pagamentos. Não é só vitrine — é uma plataforma com infraestrutura de produção.',
    highlights: [
      'Supabase SSR + autenticação JWT com Jose',
      'Redis (Upstash) para cache e rate-limiting',
      'Stripe para processamento de pagamentos',
      'Animações Framer Motion + dark mode nativo',
    ],
    tech: ['Next.js', 'TypeScript', 'Supabase', 'Stripe', 'Redis', 'Framer Motion', 'Tailwind'],
    status: 'Live',
    live: 'https://bonds-agence.vercel.app',
    github: 'https://github.com/gomeslxy/bonds-agence',
    isPublic: true,
    stars: 1,
    accent: '#047857',
    Icon: Globe,
  },
  {
    id: 'portfolio-gomes',
    name: 'Portfolio Gomes v1',
    tagline: 'Portfólio 3D — Three.js + GSAP',
    description:
      'Portfólio anterior com renderização 3D real via Three.js e @react-three/fiber. Animações complexas com GSAP, scroll suavizado por Lenis e monitoramento de performance via Vercel Analytics.',
    highlights: [
      'Three.js + React Three Fiber para cenas 3D WebGL',
      'GSAP para animações de alta performance',
      'Vercel Analytics + Speed Insights integrados',
      'Vite bundler com TypeScript estrito',
    ],
    tech: ['React', 'TypeScript', 'Three.js', 'GSAP', 'Vite', 'Lenis'],
    status: 'Live',
    live: 'https://portfolio-gomes-delta.vercel.app',
    github: 'https://github.com/gomeslxy/portfolio-gomes',
    isPublic: true,
    stars: 0,
    accent: '#065f46',
    Icon: Box,
  },
  {
    id: 'valentines',
    name: "Valentine's for Carol",
    tagline: 'Experiência Web Interativa',
    description:
      'Aplicação TypeScript de grande porte (14k+ linhas) criada como experiência personalizada. Animações elaboradas, interatividade rica e design emocional — demonstra criatividade técnica além do funcional.',
    highlights: [
      'Codebase de 14k+ linhas em TypeScript',
      'Experiência visual completamente customizada',
      'Animações e interatividade complexas',
      'Deploy independente em produção',
    ],
    tech: ['TypeScript', 'React', 'Vite', 'Framer Motion'],
    status: 'Live',
    live: 'https://valentines-carol.vercel.app',
    github: null,
    isPublic: false,
    stars: 0,
    accent: '#022c22',
    Icon: Layers,
  },
]

/* ─── Sub-components ────────────────────────────────────────────────── */
function StatPill({ value, label }) {
  return (
    <div className="flex flex-col items-center px-4 py-2.5 rounded-xl"
      style={{ background: 'rgba(5,150,105,0.08)', border: '1px solid rgba(5,150,105,0.15)' }}>
      <span className="font-display font-bold text-emerald-300 text-xl leading-none">{value}</span>
      <span className="font-mono text-[9px] text-white/35 tracking-widest uppercase mt-1">{label}</span>
    </div>
  )
}

function StackTag({ label, note }) {
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
      style={{ background: 'rgba(5,150,105,0.06)', border: '1px solid rgba(5,150,105,0.12)' }}>
      <span className="font-mono text-[11px] text-emerald-300/80 font-medium">{label}</span>
      {note && <span className="font-mono text-[9px] text-white/25">· {note}</span>}
    </div>
  )
}

function SmallTag({ label }) {
  return (
    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono text-emerald-300/60 border border-emerald-500/12 bg-emerald-500/4">
      {label}
    </span>
  )
}

function FeatureCard({ item, index }) {
  const { icon: Icon, title, body } = item
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-xl p-4 group"
      style={{ background: 'rgba(4,26,13,0.5)', border: '1px solid rgba(5,150,105,0.1)' }}
    >
      <div className="flex items-start gap-3">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ background: 'rgba(5,150,105,0.15)', border: '1px solid rgba(5,150,105,0.2)' }}>
          <Icon size={13} className="text-emerald-400" />
        </div>
        <div>
          <p className="font-body font-semibold text-white/80 text-sm mb-1">{title}</p>
          <p className="font-body text-white/40 text-xs leading-relaxed">{body}</p>
        </div>
      </div>
    </motion.div>
  )
}

function AgendraFeatured() {
  const [ref, inView] = useInView()
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-3xl overflow-hidden mb-8 group"
      style={{
        background: 'linear-gradient(135deg, rgba(6,95,70,0.2) 0%, rgba(4,26,13,0.85) 50%, rgba(2,44,34,0.25) 100%)',
        border: '1px solid rgba(5,150,105,0.22)',
      }}
    >
      {/* Top glow bar */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(52,211,153,0.6) 40%, rgba(5,150,105,0.4) 70%, transparent 95%)' }} />

      {/* Ambient glow */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ background: 'radial-gradient(circle, rgba(5,150,105,0.15) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="absolute inset-0 dot-grid opacity-[0.06] pointer-events-none" />

      <div className="relative z-10 p-8 md:p-10">

        {/* ── Header ── */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2.5 mb-3 flex-wrap">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono text-emerald-300"
                style={{ background: 'rgba(52,211,153,0.1)', borderColor: 'rgba(52,211,153,0.25)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Em produção
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-400/8 border border-emerald-400/15">
                <Zap size={10} className="text-emerald-400" />
                <span className="font-mono text-[10px] text-emerald-400">Projeto Principal</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/4 border border-white/10">
                <Github size={10} className="text-white/40" />
                <span className="font-mono text-[10px] text-white/40">Público</span>
              </div>
            </div>
            <h3 className="font-display font-extrabold text-4xl md:text-5xl text-white mb-1.5 tracking-tight">Agendra</h3>
            <p className="font-mono text-sm text-emerald-400/70">IA que responde, qualifica e agenda leads em tempo real · Multi-tenant SaaS</p>
          </div>

          {/* Stats */}
          <div className="flex gap-2 flex-wrap">
            {agendraStats.map((s) => <StatPill key={s.label} {...s} />)}
          </div>
        </div>

        {/* ── Description ── */}
        <p className="font-body text-white/55 text-base md:text-lg leading-relaxed mb-8 max-w-3xl">
          Plataforma SaaS completa que usa inteligência artificial para transformar conversas no WhatsApp e Instagram em vendas agendadas, automaticamente. Cada empresa tem seu tenant isolado, painel próprio e IA treinada com seu conteúdo — sem código adicional.
        </p>

        {/* ── Features grid ── */}
        <div className="mb-8">
          <p className="font-mono text-[10px] text-emerald-400/50 tracking-widest uppercase mb-4">Funcionalidades</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {agendraFeatures.map((f, i) => (
              inView && <FeatureCard key={f.title} item={f} index={i} />
            ))}
          </div>
        </div>

        {/* ── Stack ── */}
        <div className="mb-8">
          <p className="font-mono text-[10px] text-emerald-400/50 tracking-widest uppercase mb-3">Stack técnica</p>
          <div className="flex flex-wrap gap-2">
            {agendraStack.map((s) => <StackTag key={s.label} {...s} />)}
          </div>
        </div>

        {/* ── Links ── */}
        <div className="flex gap-3 flex-wrap">
          <motion.a
            href="https://agendra.site"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(5,150,105,0.45)' }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-body font-medium text-sm transition-all duration-300"
            style={{ background: 'linear-gradient(135deg, #065f46, #059669)' }}
          >
            <ExternalLink size={14} />
            agendra.site
          </motion.a>
          <motion.a
            href="https://github.com/gomeslxy/Agendra"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-white/60 hover:text-white font-body text-sm transition-all duration-300 border border-white/10 hover:border-white/20 hover:bg-white/5"
          >
            <Github size={14} />
            Ver código no GitHub
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}

function ProjectCard({ project, delay = 0 }) {
  const [ref, inView] = useInView()
  const { Icon } = project
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, filter: 'blur(7px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5 }}
      className="group relative rounded-2xl overflow-hidden flex flex-col"
      style={{ background: 'rgba(4,26,13,0.55)', border: '1px solid rgba(5,150,105,0.1)', transition: 'border-color 0.3s, box-shadow 0.3s' }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(5,150,105,0.28)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(5,150,105,0.1)' }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(5,150,105,0.1)'; e.currentTarget.style.boxShadow = 'none' }}
    >
      {/* Top accent line */}
      <div className="h-px w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)` }} />

      <div className="p-6 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `linear-gradient(135deg, ${project.accent}40, ${project.accent}18)`, border: `1px solid ${project.accent}35` }}>
            <Icon size={18} className="text-emerald-400" />
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-end">
            <div className="flex items-center gap-1 px-2 py-1 rounded-full border text-[9px] font-mono text-emerald-300"
              style={{ background: 'rgba(52,211,153,0.07)', borderColor: 'rgba(52,211,153,0.2)' }}>
              <span className="w-1 h-1 rounded-full bg-emerald-400" />
              {project.status}
            </div>
            {project.stars > 0 && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-400/8 border border-amber-400/15">
                <Star size={9} className="text-amber-400 fill-amber-400" />
                <span className="font-mono text-[9px] text-amber-400">{project.stars}</span>
              </div>
            )}
            {!project.isPublic && (
              <span className="px-2 py-1 rounded-full bg-white/5 border border-white/8 font-mono text-[9px] text-white/30">Privado</span>
            )}
          </div>
        </div>

        <h3 className="font-display font-bold text-white text-xl mb-0.5 group-hover:text-emerald-100 transition-colors">{project.name}</h3>
        <p className="font-mono text-xs text-emerald-400/55 mb-3">{project.tagline}</p>
        <p className="font-body text-white/48 text-sm leading-relaxed mb-4">{project.description}</p>

        {/* Highlights */}
        <ul className="space-y-1.5 mb-5 flex-1">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-emerald-500/50 mt-1.5 flex-shrink-0" />
              <span className="font-body text-white/38 text-xs leading-relaxed">{h}</span>
            </li>
          ))}
        </ul>

        {/* Tech */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((t) => <SmallTag key={t} label={t} />)}
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
          {project.github && project.isPublic && (
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

/* ─── Section ────────────────────────────────────────────────────────── */
export default function Projects() {
  const [ref, inView] = useInView()

  return (
    <section id="projetos" className="relative py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #02010a 0%, #041a0d 45%, #02010a 100%)' }}>

      {/* Ambient glows */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none opacity-15"
        style={{ background: 'radial-gradient(circle, rgba(5,150,105,0.35) 0%, transparent 70%)', filter: 'blur(120px)' }} />
      <div className="absolute bottom-1/4 left-1/5 w-[400px] h-[400px] rounded-full pointer-events-none opacity-10"
        style={{ background: 'radial-gradient(circle, rgba(6,95,70,0.5) 0%, transparent 70%)', filter: 'blur(80px)' }} />

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
            O que já <span className="gradient-text">construí</span>
          </h2>
          <p className="font-body text-white/40 text-lg max-w-xl leading-relaxed">
            Produtos reais em produção — não exercícios de sala de aula. Cada linha de código representa um problema resolvido.
          </p>
        </motion.div>

        {/* Agendra — destaque máximo */}
        <AgendraFeatured />

        {/* Outros projetos */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="font-body text-white/30 text-sm tracking-wide">Outros projetos</span>
          <span className="flex-1 h-px bg-white/6" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {otherProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={i * 0.1} />
          ))}
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="mt-12 text-center font-mono text-[10px] text-white/18 tracking-widest uppercase"
        >
          + Mais projetos em desenvolvimento · github.com/gomeslxy
        </motion.p>
      </div>
    </section>
  )
}
