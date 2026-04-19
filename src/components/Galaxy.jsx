import { useEffect, useRef } from 'react'

export default function Galaxy({ style = {}, className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animId = null
    let W = 0, H = 0
    let stars = []
    let shooting = []
    let time = 0

    // Utility
    const rand = (a, b) => a + Math.random() * (b - a)
    const randInt = (a, b) => Math.floor(rand(a, b + 1))

    function resize() {
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      canvas.width  = W
      canvas.height = H
      buildStars()
    }

    function buildStars() {
      stars = []

      // Layer 0 — distant micro-stars (many, tiny, barely visible)
      for (let i = 0; i < 260; i++) {
        stars.push({
          x: rand(0, W), y: rand(0, H),
          r: rand(0.2, 0.55),
          a: rand(0.08, 0.28),
          twFreq: rand(0.3, 0.9),
          twOff:  rand(0, Math.PI * 2),
          layer: 0,
        })
      }
      // Layer 1 — mid stars
      for (let i = 0; i < 120; i++) {
        stars.push({
          x: rand(0, W), y: rand(0, H),
          r: rand(0.5, 1.1),
          a: rand(0.2, 0.55),
          twFreq: rand(0.5, 1.4),
          twOff:  rand(0, Math.PI * 2),
          layer: 1,
          drift: { x: rand(-0.012, 0.012), y: rand(-0.005, 0.005) },
        })
      }
      // Layer 2 — bright foreground stars (few, with glow)
      for (let i = 0; i < 30; i++) {
        const hue = Math.random() < 0.35 ? 270 : Math.random() < 0.5 ? 220 : 0
        stars.push({
          x: rand(0, W), y: rand(0, H),
          r: rand(1.0, 2.0),
          a: rand(0.5, 0.95),
          twFreq: rand(0.6, 1.8),
          twOff:  rand(0, Math.PI * 2),
          layer: 2,
          drift: { x: rand(-0.02, 0.02), y: rand(-0.008, 0.008) },
          hue,
        })
      }
    }

    function spawnShooter() {
      // ~1 every 4 seconds on average
      if (Math.random() > 1 - 0.004) {
        const angle = rand(0.15, 0.45)
        shooting.push({
          x:     rand(W * 0.05, W * 0.85),
          y:     rand(0, H * 0.45),
          vx:    Math.cos(angle) * rand(9, 16),
          vy:    Math.sin(angle) * rand(2.5, 5),
          life:  1,
          decay: rand(0.013, 0.024),
          len:   rand(90, 180),
          a:     rand(0.65, 1.0),
        })
      }
    }

    function drawNebula() {
      // Four soft nebula blobs — positions relative to canvas size
      const blobs = [
        { cx: W * 0.18, cy: H * 0.30, rx: W * 0.28, ry: H * 0.24, r: 34, g: 0, b: 124, base: 0.14 },
        { cx: W * 0.78, cy: H * 0.58, rx: W * 0.24, ry: H * 0.30, r: 109, g: 40, b: 217, base: 0.09 },
        { cx: W * 0.50, cy: H * 0.12, rx: W * 0.35, ry: H * 0.20, r: 76, g: 29, b: 149, base: 0.11 },
        { cx: W * 0.88, cy: H * 0.22, rx: W * 0.20, ry: H * 0.22, r: 20, g: 1, b: 82, base: 0.17 },
      ]

      blobs.forEach((b, i) => {
        const pulse = b.base * (0.82 + 0.18 * Math.sin(time * 0.25 + i * 1.3))

        ctx.save()
        // scale y-axis to create ellipse
        ctx.transform(1, 0, 0, b.ry / b.rx, 0, b.cy - b.cy * (b.ry / b.rx))
        const grd = ctx.createRadialGradient(b.cx, b.cy * (b.rx / b.ry), 0, b.cx, b.cy * (b.rx / b.ry), b.rx)
        grd.addColorStop(0,   `rgba(${b.r},${b.g},${b.b},${pulse})`)
        grd.addColorStop(0.45,`rgba(${b.r},${b.g},${b.b},${pulse * 0.38})`)
        grd.addColorStop(1,   `rgba(${b.r},${b.g},${b.b},0)`)
        ctx.beginPath()
        ctx.arc(b.cx, b.cy * (b.rx / b.ry), b.rx, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()
        ctx.restore()
      })
    }

    function drawStars() {
      stars.forEach(s => {
        const tw = 0.55 + 0.45 * Math.sin(time * s.twFreq + s.twOff)
        const alpha = s.a * tw

        if (s.layer === 2) {
          // Bright star — radial glow
          const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 5)
          const col = s.hue === 270 ? '167,139,250' : s.hue === 220 ? '147,197,253' : '255,255,255'
          glow.addColorStop(0,   `rgba(${col},${alpha})`)
          glow.addColorStop(0.25,`rgba(${col},${alpha * 0.4})`)
          glow.addColorStop(1,   `rgba(${col},0)`)
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.r * 5, 0, Math.PI * 2)
          ctx.fillStyle = glow
          ctx.fill()
          // Crisp center dot
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.r * 0.7, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255,255,255,${alpha})`
          ctx.fill()
        } else {
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
          ctx.fillStyle = s.layer === 1
            ? `rgba(200,190,255,${alpha})`
            : `rgba(255,255,255,${alpha})`
          ctx.fill()
        }

        // Drift
        if (s.drift) {
          s.x += s.drift.x
          s.y += s.drift.y
          if (s.x < -4) s.x = W + 4
          if (s.x > W + 4) s.x = -4
          if (s.y < -4) s.y = H + 4
          if (s.y > H + 4) s.y = -4
        }
      })
    }

    function drawShooters() {
      shooting = shooting.filter(s => s.life > 0)
      shooting.forEach(s => {
        const steps = 14
        const tx = s.x - s.vx * (s.len / (s.vx || 1)) / steps * steps
        const ty = s.y - s.vy * (s.len / (s.vx || 1)) / steps * steps

        const grd = ctx.createLinearGradient(tx, ty, s.x, s.y)
        grd.addColorStop(0,   `rgba(255,255,255,0)`)
        grd.addColorStop(0.5, `rgba(196,181,253,${s.life * s.a * 0.4})`)
        grd.addColorStop(1,   `rgba(255,255,255,${s.life * s.a})`)

        ctx.beginPath()
        ctx.moveTo(tx, ty)
        ctx.lineTo(s.x, s.y)
        ctx.strokeStyle = grd
        ctx.lineWidth = 1.2 * s.life
        ctx.stroke()

        // Head glow
        const hg = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 5)
        hg.addColorStop(0, `rgba(255,255,255,${s.life * s.a})`)
        hg.addColorStop(1, `rgba(167,139,250,0)`)
        ctx.beginPath()
        ctx.arc(s.x, s.y, 5, 0, Math.PI * 2)
        ctx.fillStyle = hg
        ctx.fill()

        s.x    += s.vx
        s.y    += s.vy
        s.life -= s.decay
      })
    }

    function render() {
      ctx.clearRect(0, 0, W, H)
      time += 0.016
      drawNebula()
      drawStars()
      spawnShooter()
      drawShooters()
      animId = requestAnimationFrame(render)
    }

    // Resize observer — more reliable than window resize for embedded canvases
    const ro = new ResizeObserver(() => resize())
    ro.observe(canvas)
    resize()
    render()

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    />
  )
}
