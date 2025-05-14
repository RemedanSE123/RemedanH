"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"
import { random } from "maath"

function StarField({ count = 5000 }) {
  const ref = useRef<THREE.Points>(null!)
  const particlesRef = useRef<THREE.BufferAttribute>(null!)

  // Create particles
  const sphere = Float32Array.from(random.inSphere(new Float64Array(count * 3), { radius: 25 }))

  useFrame((state, delta) => {
    // Rotate the entire star field
    if (ref.current) {
      ref.current.rotation.x -= delta / 15
      ref.current.rotation.y -= delta / 20
    }

    // Pulse effect for stars
    if (particlesRef.current) {
      const positions = particlesRef.current.array as Float32Array
      for (let i = 0; i < positions.length; i += 3) {
        // Add subtle movement to each star
        positions[i] += Math.sin(state.clock.elapsedTime * 0.1 + i) * 0.01
        positions[i + 1] += Math.cos(state.clock.elapsedTime * 0.1 + i) * 0.01
        positions[i + 2] += Math.sin(state.clock.elapsedTime * 0.1 + i) * 0.01
      }
      particlesRef.current.needsUpdate = true
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffb300"
          size={0.08}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  )
}

function DataParticles({ count = 100 }) {
  const ref = useRef<THREE.Points>(null!)
  const particlesRef = useRef<THREE.BufferAttribute>(null!)

  // Create data-like particles in a grid pattern
  const particles = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    particles[i3] = (Math.random() - 0.5) * 30
    particles[i3 + 1] = (Math.random() - 0.5) * 30
    particles[i3 + 2] = (Math.random() - 0.5) * 30
  }

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta / 30
      ref.current.rotation.y += delta / 40
    }

    // Data flow animation
    if (particlesRef.current) {
      const positions = particlesRef.current.array as Float32Array
      for (let i = 0; i < positions.length; i += 3) {
        // Move particles upward and reset when they go too far
        positions[i + 1] += 0.05
        if (positions[i + 1] > 15) {
          positions[i + 1] = -15
        }
      }
      particlesRef.current.needsUpdate = true
    }
  })

  return (
    <group>
      <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00ffff"
          size={0.2}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  )
}

export function BackgroundAnimation() {
  return (
    <div className="fixed inset-0 -z-10 opacity-40">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ambientLight intensity={0.1} />
        <StarField />
        <DataParticles />
      </Canvas>
    </div>
  )
}
