import * as THREE from './three.module.js'

const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 'purple' })

const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)

const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height)
camera.position.z = 3

scene.add(camera)

const canvas = document.querySelector('.draw')
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(aspect.width, aspect.height)

const clock = new THREE.Clock()

const animate = () => {
  const elapseTime = clock.getElapsedTime()

  mesh.rotation.x = elapseTime
  mesh.rotation.y = elapseTime
  mesh.rotation.z = elapseTime

  renderer.render(scene, camera)

  window.requestAnimationFrame(animate)
}

animate()
