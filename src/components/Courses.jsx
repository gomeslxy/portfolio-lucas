import { motion } from 'framer-motion'
import { useInView } from './useInView'
import { Globe, TableProperties, FileText, Zap, Code, Layers, Coffee, Clock } from 'lucide-react'

const courses = [
  {
    icon: Globe,
    title: 'Inglês',
    tag: 'Fluente',
    tagColor: 'text-emerald-400',
    tagBg: 'bg-emerald-400/10 border-emerald-400/20',
    duration: '4 anos de estudo',
    status: 'concluido',
    gradient: 'from-emerald-900/30 to-teal-900/20',
    description:
      'Com quatro anos dedicados ao inglês, alcancei fluência plena — leio documentação técnica, assisto a conteúdos sem legenda, me comunico em reuniões e escrevo profissionalmente no idioma. Isso me abre portas para trabalhar com equipes e empresas internacionais, clientes do exterior e ambientes globais de tecnologia. Estou ansioso para fazer um intercâmbio e aprimorar ainda mais minha fluência na prática, imersão total no idioma.',
    highlights: ['Leitura de docs técnicas', 'Comunicação profissional', 'Conteúdo sem legenda', 'Apto para trabalhar no exterior'],
  },
  {
    icon: TableProperties,
    title: 'Excel',
    tag: 'Dominado',
    tagColor: 'text-blue-400',
    tagBg: 'bg-blue-400/10 border-blue-400/20',
    duration: 'Curso completo',
    status: 'concluido',
    gradient: 'from-blue-900/30 to-indigo-900/20',
    description:
      'Completei um curso completo de Excel e hoje domino planilhas com confiança — fórmulas, funções avançadas, formatação condicional, tabelas dinâmicas e organização de dados. Ferramentas essenciais para qualquer profissional que trabalha com dados e produtividade.',
    highlights: ['Fórmulas e funções', 'Tabelas dinâmicas', 'Formatação condicional', 'Organização de dados'],
  },
  {
    icon: FileText,
    title: 'Pacote Office',
    tag: 'Intermediário',
    tagColor: 'text-sky-400',
    tagBg: 'bg-sky-400/10 border-sky-400/20',
    duration: 'Em uso contínuo',
    status: 'concluido',
    gradient: 'from-sky-900/30 to-blue-900/20',
    description:
      'Utilizo Word, PowerPoint e o ecossistema Office com desenvoltura no nível intermediário — crio documentos bem formatados, apresentações profissionais e planilhas organizadas. Habilidade essencial no ambiente corporativo.',
    highlights: ['Word avançado', 'PowerPoint', 'Produtividade Office', 'Documentos profissionais'],
  },
  {
    icon: Code,
    title: 'HTML',
    tag: 'Em andamento',
    tagColor: 'text-orange-400',
    tagBg: 'bg-orange-400/10 border-orange-400/20',
    duration: 'Curso ativo',
    status: 'andamento',
    gradient: 'from-orange-900/30 to-red-900/20',
    description:
      'Estou cursando HTML com foco em estruturação semântica, acessibilidade e boas práticas de marcação. A base de tudo no desenvolvimento web — e estou construindo essa fundação com solidez.',
    highlights: ['HTML5 semântico', 'Acessibilidade', 'Boas práticas', 'Estrutura de páginas'],
  },
  {
    icon: Layers,
    title: 'CSS',
    tag: 'Em andamento',
    tagColor: 'text-purple-400',
    tagBg: 'bg-purple-400/10 border-purple-400/20',
    duration: 'Curso ativo',
    status: 'andamento',
    gradient: 'from-purple-900/30 to-violet-900/20',
    description:
      'Aprendendo CSS3 de forma estruturada — Flexbox, Grid, animações, responsividade e design moderno. Cada conceito sendo aplicado em projetos práticos para fixar o aprendizado.',
    highlights: ['Flexbox & Grid', 'Responsividade', 'Animações CSS', 'Design moderno'],
  },
  {
    icon: Zap,
    title: 'JavaScript',
    tag: 'Em andamento',
    tagColor: 'text-yellow-400',
    tagBg: 'bg-yellow-400/10 border-yellow-400/20',
    duration: 'Curso ativo',
    status: 'andamento',
    gradient: 'from-yellow-900/30 to-amber-900/20',
    description:
      'Em pleno aprendizado de JavaScript — a linguagem que dá vida às interfaces web. Estudando lógica, manipulação do DOM, eventos, funções e estruturas de dados. A linguagem que mais me empolga no momento.',
    highlights: ['Lógica de programação', 'Manipulação DOM', 'Funções & escopo', 'Estruturas de dados'],
  },
  {
    icon: Coffee,
    title: 'Java',
    tag: 'Em breve',
    tagColor: 'text-red-400',
    tagBg: 'bg-red-400/10 border-red-400/20',
    duration: 'Próxima etapa',
    status: 'futuro',
    gradient: 'from-red-900/20 to-rose-900/10',
    description:
      'Java está no meu radar como próxima linguagem a aprender. Quero dominar a orientação a objetos, construir aplicações back-end robustas e expandir minha visão para o desenvolvimento full stack completo. Ainda não comecei, mas está nos planos concretos.',
    highlights: ['Orientação a objetos', 'Back-end robusto', 'Ecossistema empresarial', 'Próxima meta'],
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 36, filter: 'blur(8px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
}

function CourseCard({ course }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6 }}
      className={`group gradient-border rounded-3xl overflow-hidden transition-all duration-400 hover:glow-navy-sm ${
        course.status === 'futuro' ? 'opacity-70 hover:opacity-100' : ''
      }`}
      style={{ background: 'rgba(4, 5, 46, 0.55)' }}
    >
      {/* Top colored band */}
      <div className={`h-2 bg-gradient-to-r ${course.gradient} opacity-80`} />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(34,0,124,0.3)', border: '1px solid rgba(109,40,217,0.2)' }}>
              <course.icon size={18} className="text-purple-300" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-white text-base group-hover:text-purple-200 transition-colors">
                {course.title}
              </h3>
              <span className="font-mono text-xs text-white/30">{course.duration}</span>
            </div>
          </div>
          <span className={`px-2.5 py-1 rounded-full text-xs font-mono border ${course.tagColor} ${course.tagBg} flex-shrink-0`}>
            {course.tag}
          </span>
        </div>

        {/* Description */}
        <p className="font-body text-white/45 text-sm leading-relaxed mb-5">
          {course.description}
        </p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-2">
          {course.highlights.map((h) => (
            <span key={h}
              className="px-2.5 py-1 rounded-lg text-xs font-mono text-purple-400 border border-purple-500/15"
              style={{ background: 'rgba(34,0,124,0.12)' }}>
              {h}
            </span>
          ))}
        </div>

        {/* Future indicator */}
        {course.status === 'futuro' && (
          <div className="mt-4 flex items-center gap-2 pt-4 border-t border-white/5">
            <Clock size={12} className="text-white/25" />
            <span className="font-mono text-xs text-white/25">Planejado para os próximos meses</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function Courses() {
  const [ref, inView] = useInView()

  const concluidos = courses.filter(c => c.status === 'concluido')
  const emAndamento = courses.filter(c => c.status === 'andamento')
  const futuros = courses.filter(c => c.status === 'futuro')

  return (
    <section id="cursos" className="relative py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #04052e 0%, #02010a 100%)' }}>

      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-8 blur-[100px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #140152 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #22007c, #7c3aed)' }} />
            <span className="font-mono text-xs tracking-widest uppercase text-purple-400">Formação</span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Cursos & <span className="gradient-text">Estudos</span>
          </h2>
          <p className="font-body text-white/40 text-lg max-w-xl leading-relaxed">
            Cada curso representa horas de dedicação e comprometimento com a evolução constante. Aprendizado autodidata e estruturado, em paralelo ao ensino médio.
          </p>
        </motion.div>

        {/* Concluídos */}
        <motion.div variants={containerVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-body text-white/50 text-sm font-medium">Concluídos</span>
            <span className="flex-1 h-px bg-white/5" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {concluidos.map(c => <CourseCard key={c.title} course={c} />)}
          </div>

          {/* Em andamento */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-body text-white/50 text-sm font-medium">Em andamento</span>
            <span className="flex-1 h-px bg-white/5" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {emAndamento.map(c => <CourseCard key={c.title} course={c} />)}
          </div>

          {/* Futuros */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-white/20" />
            <span className="font-body text-white/50 text-sm font-medium">Próximas metas</span>
            <span className="flex-1 h-px bg-white/5" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {futuros.map(c => <CourseCard key={c.title} course={c} />)}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
