import { useEffect, useRef } from 'react'
import { cn } from '../lib/cn'

// A slow, low lying dry ice fog, drawn by a small fragment shader (raw WebGL, no library).
// It renders at a fraction of the screen resolution because fog is soft by nature,
// pauses when off screen or in a background tab, and falls back to a static gradient.
const VERT = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`

const FRAG = `
precision mediump float;
uniform vec2 r;
uniform float t;
uniform vec2 m;
uniform float k;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.02 + vec2(7.1, 3.7);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / r;
  vec2 q = vec2(uv.x * r.x / r.y, uv.y);
  float s = t * 0.035;

  vec2 w = vec2(fbm(q * 1.5 + vec2(s, -s * 0.6)), fbm(q * 1.5 + vec2(5.2, 1.3) - vec2(s * 0.7, 0.0)));
  float n = fbm(q * 1.7 + 2.2 * w + vec2(s * 0.8, 0.0) + (m - 0.5) * 0.25);

  // Dense along the floor, thinning out as it rises
  float floorMask = smoothstep(1.0, 0.05, uv.y);
  float d = smoothstep(0.32, 0.9, n) * (0.25 + 0.75 * floorMask);

  // Cool ice white, with the faintest forge warmth rising from the centre floor
  float warm = exp(-pow(length((uv - vec2(0.5, 0.0)) * vec2(1.0, 1.6)), 2.0) * 3.0);
  vec3 col = mix(vec3(0.72, 0.78, 0.86), vec3(1.0, 0.78, 0.55), warm * 0.45);

  float a = d * k;
  gl_FragColor = vec4(col * a, a);
}
`

function compile(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null
}

export default function DryIce({ className, intensity = 0.2, scale = 0.5 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: false, powerPreference: 'low-power' })
    if (!gl) {
      canvas.style.display = 'none'
      return undefined
    }

    const vert = compile(gl, gl.VERTEX_SHADER, VERT)
    const frag = compile(gl, gl.FRAGMENT_SHADER, FRAG)
    const program = gl.createProgram()
    if (!vert || !frag || !program) {
      canvas.style.display = 'none'
      return undefined
    }
    gl.attachShader(program, vert)
    gl.attachShader(program, frag)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      canvas.style.display = 'none'
      return undefined
    }
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const position = gl.getAttribLocation(program, 'p')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(program, 'r')
    const uTime = gl.getUniformLocation(program, 't')
    const uMouse = gl.getUniformLocation(program, 'm')
    const uStrength = gl.getUniformLocation(program, 'k')
    gl.uniform1f(uStrength, intensity)

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 }
    let visible = true
    let frame = 0

    const resize = () => {
      const width = Math.max(2, Math.round(canvas.clientWidth * scale))
      const height = Math.max(2, Math.round(canvas.clientHeight * scale))
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
        gl.viewport(0, 0, width, height)
      }
    }

    const draw = (now) => {
      resize()
      mouse.x += (mouse.tx - mouse.x) * 0.03
      mouse.y += (mouse.ty - mouse.y) * 0.03
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, now / 1000 + 40)
      gl.uniform2f(uMouse, mouse.x, mouse.y)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    const loop = (now) => {
      draw(now)
      frame = requestAnimationFrame(loop)
    }

    const start = () => {
      if (reduced || frame || !visible || document.hidden) return
      frame = requestAnimationFrame(loop)
    }
    const stop = () => {
      cancelAnimationFrame(frame)
      frame = 0
    }

    const onPointer = (event) => {
      mouse.tx = event.clientX / window.innerWidth
      mouse.ty = 1 - event.clientY / window.innerHeight
    }
    const onVisibility = () => (document.hidden ? stop() : start())

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })
    observer.observe(canvas)

    draw(performance.now())
    start()
    window.addEventListener('pointermove', onPointer, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      stop()
      observer.disconnect()
      window.removeEventListener('pointermove', onPointer)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [intensity, scale])

  return <canvas ref={canvasRef} aria-hidden="true" className={cn('pointer-events-none block h-full w-full', className)} />
}
