import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from './useInView'
import { Copy, Check, Linkedin, ArrowUpRight, Mail } from 'lucide-react'

function useCopy(text) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
      const el = document.createElement('textarea')
      el.value = text
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }
  return [copied, copy]
}

const EMAIL = 'la181009@gmail.com'
const PHONE = '(11) 98994-0080'

export default function Contact() {
  const [ref, inView] = useInView()
  const [emailCopied, copyEmail] = useCopy(EMAIL)
  const [phoneCopied, copyPhone] = useCopy(PHONE)
  const [btnCopied, copyBtn] = useCopy(EMAIL)

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section id="contato" className="relative py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #02010a 0%, #04052e 50%, #140152 100%)' }}>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #22007c 0%, transparent 70%)' }} />

      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, #7c3aed)' }} />
            <span className="font-mono text-xs tracking-widest uppercase text-purple-400">Contato</span>
            <span className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #7c3aed, transparent)' }} />
          </motion.div>
          <motion.h2 variants={itemVariants} className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Vamos <span className="gradient-text">conversar</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="font-body text-white/40 text-lg max-w-md mx-auto leading-relaxed">
            Estou aberto a oportunidades, estágios, projetos e conexões dentro do universo tech.
          </motion.p>
        </motion.div>

        {/* Contact cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-3 gap-5 mb-12"
        >
          {/* Email — copy */}
          <motion.button
            variants={itemVariants}
            onClick={copyEmail}
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="group gradient-border rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:glow-navy-sm cursor-pointer w-full"
            style={{ background: 'rgba(4, 5, 46, 0.6)' }}
          >
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
              style={{ background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.25)' }}>
              <AnimatePresence mode="wait">
                {emailCopied
                  ? <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Check size={20} className="text-emerald-400" /></motion.div>
                  : <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Copy size={20} className="text-purple-400" /></motion.div>
                }
              </AnimatePresence>
            </div>
            <div className="font-mono text-xs text-white/30 tracking-wide mb-1">E-mail</div>
            <div className="font-body font-medium text-white/80 text-sm mb-1 group-hover:text-white transition-colors break-all">
              {EMAIL}
            </div>
            <div className={`font-mono text-xs transition-colors duration-300 ${emailCopied ? 'text-emerald-400' : 'text-white/25'}`}>
              {emailCopied ? '✓ Copiado!' : 'Clique para copiar'}
            </div>
          </motion.button>

          {/* Phone — copy */}
          <motion.button
            variants={itemVariants}
            onClick={copyPhone}
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="group gradient-border rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:glow-navy-sm cursor-pointer w-full"
            style={{ background: 'rgba(4, 5, 46, 0.6)' }}
          >
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
              style={{ background: 'rgba(34,0,124,0.25)', border: '1px solid rgba(34,0,124,0.3)' }}>
              <AnimatePresence mode="wait">
                {phoneCopied
                  ? <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Check size={20} className="text-emerald-400" /></motion.div>
                  : <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Copy size={20} className="text-purple-400" /></motion.div>
                }
              </AnimatePresence>
            </div>
            <div className="font-mono text-xs text-white/30 tracking-wide mb-1">Telefone / WhatsApp</div>
            <div className="font-body font-medium text-white/80 text-sm mb-1 group-hover:text-white transition-colors">
              {PHONE}
            </div>
            <div className={`font-mono text-xs transition-colors duration-300 ${phoneCopied ? 'text-emerald-400' : 'text-white/25'}`}>
              {phoneCopied ? '✓ Copiado!' : 'Clique para copiar'}
            </div>
          </motion.button>

          {/* LinkedIn — external link */}
          <motion.a
            href="https://www.linkedin.com/in/lucas-gomes-amaral-8b058b391/"
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            whileHover={{ y: -6, scale: 1.02 }}
            className="group gradient-border rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:glow-navy-sm"
            style={{ background: 'rgba(4, 5, 46, 0.6)', textDecoration: 'none' }}
          >
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
              style={{ background: 'rgba(76,29,149,0.25)', border: '1px solid rgba(76,29,149,0.3)' }}>
              <Linkedin size={20} className="text-purple-300" />
            </div>
            <div className="font-mono text-xs text-white/30 tracking-wide mb-1">LinkedIn</div>
            <div className="font-body font-medium text-white/80 text-sm mb-1 group-hover:text-white transition-colors">
              Lucas Gomes Amaral
            </div>
            <div className="flex items-center gap-1 font-mono text-xs text-white/25 group-hover:text-purple-400 transition-colors">
              Abrir perfil <ArrowUpRight size={10} />
            </div>
          </motion.a>
        </motion.div>

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden p-8 md:p-12 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(34,0,124,0.35) 0%, rgba(76,29,149,0.2) 50%, rgba(20,1,82,0.35) 100%)',
            border: '1px solid rgba(109, 40, 217, 0.2)',
          }}
        >
          <div className="absolute inset-0 dot-grid opacity-10" />
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ background: 'linear-gradient(135deg, #22007c, #7c3aed)' }}>
              <Mail size={22} className="text-white" />
            </div>
            <h3 className="font-display font-bold text-2xl md:text-3xl text-white mb-3">
              Tem uma oportunidade?
            </h3>
            <p className="font-body text-white/45 text-base max-w-md mx-auto mb-8 leading-relaxed">
              Estou buscando minha primeira experiência profissional e pronto para contribuir com dedicação e vontade de crescer.
            </p>

            {/* Copy email button */}
            <motion.button
              onClick={copyBtn}
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(34,0,124,0.6)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-white font-body font-medium transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, #22007c, #4c1d95)' }}
            >
              <AnimatePresence mode="wait">
                {btnCopied
                  ? <motion.span key="done" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                      className="flex items-center gap-2">
                      <Check size={18} /> E-mail copiado!
                    </motion.span>
                  : <motion.span key="copy" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                      className="flex items-center gap-2">
                      <Copy size={18} /> Copiar endereço de e-mail
                    </motion.span>
                }
              </AnimatePresence>
            </motion.button>
            <p className="mt-3 font-mono text-xs text-white/25">{EMAIL}</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
