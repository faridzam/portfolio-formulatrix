import * as THREE from 'three';

// random particle
export const particles = new THREE.Group();
const particleCount = 2000;

for (let i = 0; i < particleCount; i++) {
  const particle = new THREE.Mesh(
    // sphereGeometry,
    new THREE.SphereGeometry(Math.random() * 0.3),
    new THREE.MeshStandardMaterial({ color: 0xffffff, lightMapIntensity: 1 }),
  );

  particle.position.set(
    Math.random() * 2000 - 1000,
    Math.random() * 200 - 100,
    Math.random() * 2000 - 1000
  );

  particles.add(particle);
}
