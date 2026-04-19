import { useEffect, useRef } from 'react'

export default function Galaxy({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let w, h, t = 0

    // Stars config
    let stars = []
    let shootingStars = []
    let nebulaClouds = []

    const rand = (a, b) => a + Math.random() * (b - a)

    const resize = () => {
      w = canvas.width  = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
      init()
    }

    const init = () => {
      // Background star field — 3 layers (depth)
      stars = []
      const counts = [180, 90, 40]
      const sizes  = [[0.3, 0.8], [0.8, 1.4], [1.4, 2.2]]
      const alphas = [[0.15, 0.5], [0.3, 0.7], [0.5, 0.9]]
      const speeds = [0.015, 0.04, 0.08]

      counts.forEach((n, layer) => {
        for (let i = 0; i < n; i++) {
          stars.push({
            x: rand(0, w), y: rand(0, h),
            r: rand(...sizes[layer]),
            baseAlpha: rand(...alphas[layer]),
            alpha: rand(...alphas[layer]),
            twinkleSpeed: rand(0.4, 1.5),
            twinkleOffset: rand(0, Math.PI * 2),
            vx: speeds[layer] * (Math.random() - 0.5) * 0.3,
            vy: -speeds[layer] * rand(0.05, 0.15),
            layer,
            color: Math.random() < 0.08
              ? `rgba(167,139,250,`   // purple tint
              : Math.random() < 0.05
              ? `rgba(196,181,253,`   // lavender
              : `rgba(255,255,255,`,  // white
          })
        }
      })

      // Nebula blobs
      nebulaClouds = [
        { x: w * 0.2,  y: h * 0.35, rx: w * 0.25, ry: h * 0.22, color: 'rgba(34,0,124,',   alpha: 0.18 },
        { x: w * 0.75, y: h * 0.6,  rx: w * 0.22, ry: h * 0.28, color: 'rgba(109,40,217,', alpha: 0.12 },
        { x: w * 0.5,  y: h * 0.15, rx: w * 0.3,  ry: h * 0.18, color: 'rgba(76,29,149,',  alpha: 0.14 },
        { x: w * 0.85, y: h * 0.2,  rx: w * 0.18, ry: h * 0.2,  color: 'rgba(20,1,82,',    alpha: 0.2  },
      ]
    }

    const spawnShootingStar = () => {
      if (Math.random() > 0.004) return
      const angle = rand(-0.3, 0.2)
      const startX = rand(w * 0.1, w * 0.9)
      const startY = rand(0, h * 0.5)
      shootingStars.push({
        x: startX, y: startY,
        vx: Math.cos(angle) * rand(8, 14),
        vy: Math.sin(angle) * rand(3, 7) + 2,
        life: 1,
        decay: rand(0.012, 0.022),
        len: rand(80, 160),
        alpha: rand(0.6, 0.9),
      })
    }

    const drawNebulae = () => {
      nebulaClouds.forEach(n => {
        const pulse = 0.85 + 0.15 * Math.sin(t * 0.3 + n.x)
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.rx)
        grd.addColorStop(0,   `${n.color}${n.alpha * pulse})`)
        grd.addColorStop(0.5, `${n.color}${n.alpha * 0.4 * pulse})`)
        grd.addColorStop(1,   `${n.color}0)`)
        ctx.save()
        ctx.scale(1, n.ry / n.rx)
        ctx.beginPath()
        ctx.arc(n.x, n.y * (n.rx / n.ry), n.rx, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()
        ctx.restore()
      })
    }

    const drawStars = () => {
      stars.forEach(s => {
        // twinkle
        s.alpha = s.baseAlpha * (0.6 + 0.4 * Math.sin(t * s.twinkleSpeed + s.twinkleOffset))

        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)

        if (s.layer === 2) {
          // bright stars get a soft glow
          const grd = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 4)
          grd.addColorStop(0,   `${s.color}${s.alpha})`)
          grd.addColorStop(0.3, `${s.color}${s.alpha * 0.4})`)
          grd.addColorStop(1,   `${s.color}0)`)
          ctx.fillStyle = grd
          ctx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2)
        } else {
          ctx.fillStyle = `${s.color}${s.alpha})`
        }
        ctx.fill()

        // drift
        s.x += s.vx; s.y += s.vy
        if (s.x < 0) s.x = w; if (s.x > w) s.x = 0
        if (s.y < 0) s.y = h; if (s.y > h) s.y = 0
      })
    }

    const drawShootingStars = () => {
      shootingStars = shootingStars.filter(s => s.life > 0)
      shootingStars.forEach(s => {
        const tailX = s.x - s.vx * (s.len / 14)
        const tailY = s.y - s.vy * (s.len / 14)
        const grd = ctx.createLinearGradient(tailX, tailY, s.x, s.y)
        grd.addColorStop(0, `rgba(255,255,255,0)`)
        grd.addColorStop(0.6, `rgba(196,181,253,${s.life * s.alpha * 0.5})`)
        grd.addColorStop(1,   `rgba(255,255,255,${s.life * s.alpha})`)
        ctx.beginPath()
        ctx.moveTo(tailX, tailY)
        ctx.lineTo(s.x, s.y)
        ctx.strokeStyle = grd
        ctx.lineWidth = 1.5 * s.life
        ctx.stroke()
        // head glow
        const g2 = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 6)
        g2.addColorStop(0,   `rgba(255,255,255,${s.life * s.alpha})`)
        g2.addColorStop(1,   `rgba(167,139,250,0)`)
        ctx.beginPath()
        ctx.arc(s.x, s.y, 6, 0, Math.PI * 2)
        ctx.fillStyle = g2
        ctx.fill()
        s.x += s.vx; s.y += s.vy
        s.life -= s.decay
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      t += 0.016
      drawNebulae()
      drawStars()
      spawnShootingStar()
      drawShootingStars()
      animId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ display: 'block' }}
    />
  )
}
