import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Skills', href: '#skills' },
  { label: 'Cursos', href: '#cursos' },
  { label: 'Contato', href: '#contato' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
      >
        <AnimatePresence mode="wait">
          {scrolled ? (
            <motion.div
              key="scrolled"
              initial={{ opacity: 0, y: -16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto mt-4 flex items-center gap-1 px-4 py-2.5 rounded-2xl glass-strong"
              style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(109,40,217,0.15)' }}
            >
              <button
                onClick={() => window.scrollTo({ top: 0 })}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold text-white mr-2 flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #22007c, #6d28d9)' }}
              >
                LG
              </button>
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="px-3 py-1.5 text-sm font-body text-white/60 hover:text-white rounded-xl transition-all duration-200 hover:bg-white/5 whitespace-nowrap"
                >
                  {link.label}
                </button>
              ))}
              <motion.button
                onClick={() => handleNav('#contato')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="ml-1 px-4 py-1.5 rounded-xl text-sm font-body font-medium text-white"
                style={{ background: 'linear-gradient(135deg, #22007c, #4c1d95)' }}
              >
                Contato
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="top"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="pointer-events-auto w-full max-w-6xl mx-auto px-6 py-5 flex items-center justify-between"
            >
              <button
                onClick={() => window.scrollTo({ top: 0 })}
                className="font-display font-bold text-lg tracking-tight flex items-center gap-2 group"
              >
                <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-mono font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #22007c, #6d28d9)' }}>
                  LG
                </span>
                <span className="text-white/90 group-hover:text-white transition-colors">
                  Lucas <span className="gradient-text">Amaral</span>
                </span>
              </button>

              <nav className="hidden md:flex items-center gap-1">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href}
                    onClick={() => handleNav(link.href)}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i + 0.3 }}
                    className="px-4 py-2 text-sm font-body text-white/60 hover:text-white rounded-lg transition-all duration-300 hover:bg-white/5 relative group"
                  >
                    {link.label}
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 rounded-full transition-all duration-300 group-hover:w-4"
                      style={{ background: 'linear-gradient(90deg, #22007c, #7c3aed)' }} />
                  </motion.button>
                ))}
                <motion.button
                  onClick={() => handleNav('#contato')}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="ml-4 px-5 py-2.5 rounded-xl text-sm font-body font-medium text-white glow-navy-sm"
                  style={{ background: 'linear-gradient(135deg, #22007c, #4c1d95)' }}
                >
                  Fale comigo
                </motion.button>
              </nav>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-20 z-40 rounded-2xl glass-strong p-6 flex flex-col gap-2 md:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="text-left px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-all font-body"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNav('#contato')}
              className="mt-2 px-4 py-3 rounded-xl text-white font-body font-medium text-center"
              style={{ background: 'linear-gradient(135deg, #22007c, #4c1d95)' }}
            >
              Fale comigo
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
