import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/* A procedural 3D house (no model files). `getP(t)` returns build progress 0..1:
   0.00-0.12 site · 0.10-0.30 foundation · 0.28-0.62 frame · 0.58-0.86 walls + roof · 0.86-1 lights on */

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const seg = (p, a, b) => clamp((p - a) / (b - a))
const ease = (t) => 1 - Math.pow(1 - t, 3)
const lerp = (a, b, t) => a + (b - a) * t
const LAMP = '#f4c872'
const W = 4.8, D = 6.4, WALL_H = 3, BASE = 0.3
const RISE = 1.9, HALF = W / 2 + 0.35
const ANG = Math.atan2(RISE, HALF), SLAB_W = Math.hypot(HALF, RISE), SLAB_L = D + 0.7

function House({ getP }) {
  const M = useMemo(() => ({
    siding: new THREE.MeshStandardMaterial({ color: '#e9e2d3', roughness: 0.95, transparent: true }),
    trim: new THREE.MeshStandardMaterial({ color: '#fbfaf6', roughness: 0.8, transparent: true }),
    roof: new THREE.MeshStandardMaterial({ color: '#66787f', roughness: 0.7, transparent: true }),
    wood: new THREE.MeshStandardMaterial({ color: '#d2a86a', roughness: 0.9, transparent: true }),
    concrete: new THREE.MeshStandardMaterial({ color: '#a4a39b', roughness: 1 }),
    brick: new THREE.MeshStandardMaterial({ color: '#7a5844', roughness: 1, transparent: true }),
    door: new THREE.MeshStandardMaterial({ color: '#8a5a2b', roughness: 0.6 }),
    dirt: new THREE.MeshStandardMaterial({ color: '#7a6850', roughness: 1 }),
    pine: new THREE.MeshStandardMaterial({ color: '#3d6b4c', roughness: 1 }),
    glass: new THREE.MeshBasicMaterial({ color: LAMP, transparent: true, opacity: 0 }),
  }), [])

  const studPos = useMemo(() => {
    const a = []
    for (let x = -2.3; x <= 2.31; x += 0.575) { a.push([x, D / 2 - 0.06]); a.push([x, -D / 2 + 0.06]) }
    for (let z = -2.8; z <= 2.81; z += 0.56) { a.push([W / 2 - 0.06, z]); a.push([-W / 2 + 0.06, z]) }
    return a
  }, [])
  const rafterZ = useMemo(() => Array.from({ length: 9 }, (_, i) => -3 + i * 0.75), [])
  const trees = useMemo(() => [[-6, 2, 1.25], [-7.5, -3, 1.6], [9.5, -4, 1.3], [-4.2, -7, 1.3], [3, -8.5, 1.45], [-9, 6, 1.1], [-2, -11, 1.5], [11, -8, 1.2]], [])
  const triangle = useMemo(() => {
    const s = new THREE.Shape(); s.moveTo(-W / 2, 0); s.lineTo(W / 2, 0); s.lineTo(0, RISE - 0.15); s.closePath()
    return new THREE.ExtrudeGeometry(s, { depth: 0.1, bevelEnabled: false })
  }, [])

  const R = useRef({ studs: [], rafters: [], trees: [], lights: [], glass: [] })
  const slab = useRef(), slabEdges = useRef(), dirt = useRef(), stakes = useRef(), walls = useRef(), roofG = useRef(), door = useRef()
  const slabGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(W + 0.8, BASE, D + 0.8)), [])

  useFrame(({ clock }) => {
    const p = getP(clock.elapsedTime)
    const r = R.current
    const eDirt = ease(seg(p, 0, 0.12))
    dirt.current.scale.setScalar(Math.max(0.001, eDirt));
    stakes.current.scale.setScalar(Math.max(0.001, ease(seg(p, 0, 0.1))))
    const eSlab = ease(seg(p, 0.1, 0.3))
    slab.current.visible = eSlab > 0.001
    slab.current.scale.y = Math.max(0.001, eSlab); slab.current.position.y = (BASE * eSlab) / 2
    slabEdges.current.visible = p > 0.05 && eSlab < 0.98
    const N = r.studs.length
    r.studs.forEach((m, i) => {
      const s = ease(seg(p, 0.28 + (i / N) * 0.2, 0.4 + (i / N) * 0.2))
      m.visible = s > 0.001; m.scale.y = Math.max(0.001, s); m.position.y = BASE + 1.5 * s
    })
    M.wood.opacity = 1 - seg(p, 0.72, 0.8)
    r.rafters.forEach((m, i) => { const s = ease(seg(p, 0.5 + i * 0.008, 0.62 + i * 0.008)); m.visible = s > 0.001; m.scale.x = Math.max(0.001, s) })
    const eW = ease(seg(p, 0.58, 0.74))
    walls.current.visible = eW > 0.001
    M.siding.opacity = eW; M.trim.opacity = eW
    const eR = ease(seg(p, 0.7, 0.86))
    roofG.current.visible = eR > 0.001
    roofG.current.position.y = (1 - eR) * 5; M.roof.opacity = eR; M.brick.opacity = eR
    const glow = ease(seg(p, 0.86, 1))
    M.glass.opacity = glow * 0.95
    r.lights.forEach((l) => (l.intensity = glow * 14))
    door.current.scale.y = Math.max(0.001, ease(seg(p, 0.8, 0.92)))
    r.trees.forEach((t, i) => { const s = ease(seg(p, 0.8 + i * 0.02, 0.98)); t.scale.setScalar(Math.max(0.001, s) * trees[i][2]) })
  })

  const winFront = [[-1.55, 1.85], [1.55, 1.85]]
  const sideZ = [-2, 0, 2]

  return (
    <group>
      {/* site */}
      <mesh ref={dirt} rotation-x={-Math.PI / 2} position-y={0.01} receiveShadow><circleGeometry args={[5.4, 48]} /><primitive object={M.dirt} attach="material" /></mesh>
      <group ref={stakes}>
        {[[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([sx, sz], i) => (
          <group key={i} position={[sx * (W / 2 + 0.4), 0, sz * (D / 2 + 0.4)]}>
            <mesh position-y={0.6}><cylinderGeometry args={[0.03, 0.03, 1.2, 6]} /><primitive object={M.wood} attach="material" /></mesh>
            <mesh position-y={1.22}><sphereGeometry args={[0.07, 8, 8]} /><meshBasicMaterial color={LAMP} /></mesh>
          </group>
        ))}
      </group>
      <lineSegments ref={slabEdges} geometry={slabGeo} position-y={BASE / 2}><lineBasicMaterial color={LAMP} /></lineSegments>
      {/* foundation */}
      <mesh ref={slab} castShadow receiveShadow><boxGeometry args={[W + 0.8, BASE, D + 0.8]} /><primitive object={M.concrete} attach="material" /></mesh>
      {/* frame */}
      {studPos.map(([x, z], i) => (
        <mesh key={i} ref={(el) => (R.current.studs[i] = el)} position={[x, BASE, z]} castShadow><boxGeometry args={[0.08, 3, 0.08]} /><primitive object={M.wood} attach="material" /></mesh>
      ))}
      {rafterZ.map((z, i) => (
        <group key={z}>
          {[1, -1].map((s) => (
            <mesh key={s} ref={(el) => (R.current.rafters[i * 2 + (s > 0 ? 0 : 1)] = el)} position={[s * (SLAB_W / 2) * Math.cos(ANG), BASE + WALL_H + (SLAB_W / 2) * Math.sin(ANG) - 0.1, z]} rotation-z={-s * ANG}>
              <boxGeometry args={[SLAB_W, 0.08, 0.08]} /><primitive object={M.wood} attach="material" />
            </mesh>
          ))}
        </group>
      ))}
      {/* walls */}
      <group ref={walls}>
        <mesh position={[0, BASE + WALL_H / 2, D / 2]} castShadow><boxGeometry args={[W, WALL_H, 0.12]} /><primitive object={M.siding} attach="material" /></mesh>
        <mesh position={[0, BASE + WALL_H / 2, -D / 2]} castShadow><boxGeometry args={[W, WALL_H, 0.12]} /><primitive object={M.siding} attach="material" /></mesh>
        <mesh position={[W / 2, BASE + WALL_H / 2, 0]} castShadow><boxGeometry args={[0.12, WALL_H, D]} /><primitive object={M.siding} attach="material" /></mesh>
        <mesh position={[-W / 2, BASE + WALL_H / 2, 0]} castShadow><boxGeometry args={[0.12, WALL_H, D]} /><primitive object={M.siding} attach="material" /></mesh>
        <mesh geometry={triangle} position={[0, BASE + WALL_H, D / 2 - 0.05]}><primitive object={M.siding} attach="material" /></mesh>
        <mesh geometry={triangle} position={[0, BASE + WALL_H, -D / 2 - 0.05]}><primitive object={M.siding} attach="material" /></mesh>
        <mesh position={[0, BASE + WALL_H + 0.02, 0]}><boxGeometry args={[W + 0.2, 0.08, D + 0.2]} /><primitive object={M.trim} attach="material" /></mesh>
        {/* garage wing */}
        <mesh position={[W / 2 + 1.5, BASE + 1.1, -1.4]} castShadow><boxGeometry args={[3, 2.2, 3.4]} /><primitive object={M.siding} attach="material" /></mesh>
        <mesh position={[W / 2 + 1.5, BASE + 2.3, -1.4]} rotation-z={-0.1} castShadow><boxGeometry args={[3.5, 0.14, 4]} /><primitive object={M.roof} attach="material" /></mesh>
        <mesh position={[W / 2 + 1.5, BASE + 0.9, 0.31]}><boxGeometry args={[2.2, 1.7, 0.06]} /><primitive object={M.trim} attach="material" /></mesh>
        {/* front trim */}
        {winFront.map(([x, y], i) => <mesh key={i} position={[x, BASE + y - 0.2, D / 2 + 0.04]}><boxGeometry args={[1.08, 1.4, 0.04]} /><primitive object={M.trim} attach="material" /></mesh>)}
        {sideZ.map((z) => <mesh key={z} position={[-W / 2 - 0.04, BASE + 1.65, z]}><boxGeometry args={[0.04, 1.4, 1.08]} /><primitive object={M.trim} attach="material" /></mesh>)}
        <mesh position={[W / 2 + 0.04, BASE + 1.65, 2]}><boxGeometry args={[0.04, 1.4, 1.08]} /><primitive object={M.trim} attach="material" /></mesh>
      </group>
      {/* glass (lit windows) */}
      {winFront.map(([x, y], i) => <mesh key={i} position={[x, BASE + y - 0.2, D / 2 + 0.07]}><planeGeometry args={[0.9, 1.25]} /><primitive object={M.glass} attach="material" /></mesh>)}
      {sideZ.map((z) => <mesh key={z} position={[-W / 2 - 0.07, BASE + 1.65, z]} rotation-y={-Math.PI / 2}><planeGeometry args={[0.9, 1.25]} /><primitive object={M.glass} attach="material" /></mesh>)}
      <mesh position={[W / 2 + 0.07, BASE + 1.65, 2]} rotation-y={Math.PI / 2}><planeGeometry args={[0.9, 1.25]} /><primitive object={M.glass} attach="material" /></mesh>
      <mesh position={[0, BASE + WALL_H + 0.85, D / 2 + 0.07]}><circleGeometry args={[0.34, 24]} /><primitive object={M.glass} attach="material" /></mesh>
      <group ref={door} position={[0, BASE, 0]}>
        <mesh position={[0, 1.05, D / 2 + 0.06]}><boxGeometry args={[0.95, 2.1, 0.08]} /><primitive object={M.door} attach="material" /></mesh>
      </group>
      {[[-1.55, 2.3], [1.55, 2.3], [-W / 2 - 1.2, 0]].map(([x, z], i) => (
        <pointLight key={i} ref={(el) => (R.current.lights[i] = el)} position={[x, 2, z === 2.3 ? D / 2 + 1 : z]} color={LAMP} intensity={0} distance={9} decay={2} />
      ))}
      {/* roof */}
      <group ref={roofG}>
        {[1, -1].map((s) => (
          <mesh key={s} position={[s * (SLAB_W / 2) * Math.cos(ANG), BASE + WALL_H + (SLAB_W / 2) * Math.sin(ANG), 0]} rotation-z={-s * ANG} castShadow>
            <boxGeometry args={[SLAB_W, 0.14, SLAB_L]} /><primitive object={M.roof} attach="material" />
          </mesh>
        ))}
        <mesh position={[0, BASE + WALL_H + RISE + 0.02, 0]}><boxGeometry args={[0.24, 0.1, SLAB_L]} /><primitive object={M.trim} attach="material" /></mesh>
        <mesh position={[1.3, BASE + WALL_H + 1.9, -1]} castShadow><boxGeometry args={[0.55, 1.9, 0.55]} /><primitive object={M.brick} attach="material" /></mesh>
      </group>
      {/* pines */}
      {trees.map(([x, z], i) => (
        <group key={i} position={[x, 0, z]} ref={(el) => (R.current.trees[i] = el)}>
          <mesh position-y={0.4}><cylinderGeometry args={[0.1, 0.14, 0.8, 6]} /><primitive object={M.wood} attach="material" /></mesh>
          {[[1.1, 1.8, 1.0], [0.85, 1.7, 2.1], [0.6, 1.5, 3.1]].map(([rad, h, y], k) => (
            <mesh key={k} position-y={y} castShadow><coneGeometry args={[rad, h, 8]} /><primitive object={M.pine} attach="material" /></mesh>
          ))}
        </group>
      ))}
    </group>
  )
}

function Stars() {
  const geo = useMemo(() => {
    const pos = []
    for (let i = 0; i < 500; i++) {
      const th = Math.random() * Math.PI * 2, ph = Math.acos(Math.random() * 0.85 + 0.1), r = 70
      pos.push(r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph), r * Math.sin(ph) * Math.sin(th))
    }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); return g
  }, [])
  return <points geometry={geo}><pointsMaterial color="#fff7e0" size={0.35} sizeAttenuation transparent opacity={0.8} fog={false} /></points>
}

function Rig({ mode, getP, mx }) {
  const size = useThree((st) => st.size)
  useFrame(({ camera, clock }) => {
    const t = clock.elapsedTime, p = getP(t)
    let az, rad, h
    if (mode === 'hero') { az = lerp(-0.2, 0.62, ease(p)) + mx.get() * 0.35 + Math.sin(t * 0.2) * 0.05; rad = lerp(27, 23, ease(p)); h = lerp(11, 8, ease(p)) }
    else { az = lerp(-0.95, 0.75, p); rad = lerp(28, 21, p); h = lerp(13, 8.5, p) }
    const k = size.width < 700 ? 1.55 : size.width < 1000 ? 1.25 : 1
    rad *= k; h *= k
    camera.position.set(Math.sin(az) * rad, h, Math.cos(az) * rad)
    camera.lookAt(1, 2.2, 0)
    if (mode === 'hero') {
      if (size.width > 1000) camera.setViewOffset(size.width, size.height, -size.width * 0.2, size.height * 0.1, size.width, size.height)
      else camera.clearViewOffset()
    }
    if (mode === 'scroll') {
      const wide = size.width > 900
      camera.setViewOffset(size.width, size.height, wide ? -size.width * 0.2 : 0, wide ? 0 : size.height * 0.16, size.width, size.height)
    }
  })
  return null
}

export default function Scene3D({ mode = 'hero', getP, mx, fog = '#26332e' }) {
  return (
    <Canvas shadows dpr={[1, 1.75]} camera={{ fov: 32, near: 0.5, far: 200 }} gl={{ antialias: true, alpha: true }} onCreated={({ scene }) => { scene.fog = new THREE.Fog(fog, 28, 62) }} aria-hidden="true">
      <hemisphereLight args={['#9db4cc', '#3a4a40', 1.5]} />
      <directionalLight position={[-9, 14, 8]} intensity={1.3} color="#b9c9e6" castShadow shadow-mapSize={[1024, 1024]} shadow-camera-left={-14} shadow-camera-right={14} shadow-camera-top={14} shadow-camera-bottom={-14} />
      <mesh rotation-x={-Math.PI / 2} receiveShadow><circleGeometry args={[40, 64]} /><meshStandardMaterial color={fog} roughness={1} emissive="#3b5546" emissiveIntensity={0.5} /></mesh>
      {[6.5, 9.5, 13, 18].map((r) => <mesh key={r} rotation-x={-Math.PI / 2} position-y={0.02}><ringGeometry args={[r, r + 0.035, 96]} /><meshBasicMaterial color="#f9f7f3" transparent opacity={0.12} /></mesh>)}
      <mesh position={[-30, 24, -42]}><sphereGeometry args={[2.2, 24, 24]} /><meshBasicMaterial color="#f1dfb3" fog={false} /></mesh>
      <Stars />
      <House getP={getP} />
      <Rig mode={mode} getP={getP} mx={mx} />
    </Canvas>
  )
}
