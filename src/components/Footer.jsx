import { motion } from 'framer-motion'
import { Mail, Phone, Linkedin, Heart } from 'lucide-react'

const links = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Skills', href: '#skills' },
  { label: 'Trajetória', href: '#trajetoria' },
  { label: 'Contato', href: '#contato' },
]

const socials = [
  { icon: Mail, href: 'mailto:la181009@gmail.com', label: 'Email' },
  { icon: Phone, href: 'tel:+5511989940080', label: 'Telefone' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/lucas-gomes-amaral-8b058b391/', label: 'LinkedIn' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/5 overflow-hidden"
      style={{ background: '#02010a' }}>

      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(34,0,124,0.5), rgba(109,40,217,0.5), transparent)' }} />

      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-mono font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #22007c, #6d28d9)' }}>
                LG
              </span>
              <span className="font-display font-bold text-white">Lucas Amaral</span>
            </div>
            <p className="font-body text-white/35 text-sm leading-relaxed max-w-xs">
              Desenvolvedor Full Stack em formação, 16 anos, Indaiatuba – SP. Construindo o futuro com código.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-mono text-xs text-white/30 tracking-widest uppercase mb-4">Navegação</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="font-body text-white/40 hover:text-white/80 text-sm transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-xs text-white/30 tracking-widest uppercase mb-4">Contato</h4>
            <ul className="space-y-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-2.5 font-body text-white/40 hover:text-purple-400 text-sm transition-colors duration-300 group"
                  >
                    <s.icon size={14} className="group-hover:scale-110 transition-transform" />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-white/20 tracking-wide">
            © {year} Lucas Gomes do Amaral. Todos os direitos reservados.
          </p>
          <p className="font-mono text-xs text-white/20 flex items-center gap-1.5">
            Feito com <Heart size={10} className="text-purple-500 fill-purple-500" /> e determinação
          </p>
          <p className="font-mono text-xs text-white/20 italic">
            "Tecnologia é o caminho. Dedicação é o motor."
          </p>
        </div>
      </div>
    </footer>
  )
}
