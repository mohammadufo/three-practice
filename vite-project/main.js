import './style.css'
import * as THREE from 'three'

//* Scene
const scene = new THREE.Scene()

window.addEventListener('resize', () => {
  //* update size
  aspect.width = window.innerWidth
  aspect.height = window.innerHeight

  //* new aspect ratio
  camera.aspect = aspect.width / aspect.height
  camera.updateProjectionMatrix()

  //* new rendererSize
  renderer.setSize(aspect.width, aspect.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

//* Create geometry and material for the shape
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({
  color: 'purple',
  wireframe: true,
})
const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)

//* Aspect ratio
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
}

//* Create a perspective camera
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height)
camera.position.set(2, 2, 2)
camera.lookAt(mesh.position)
scene.add(camera)

//* WebGL renderer
const canvas = document.querySelector('.draw')
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(aspect.width, aspect.height)

const clock = new THREE.Clock()

let isDragging = false
let previousMousePosition = {
  x: 0,
  y: 0,
}

//* Mouse down event listener
window.addEventListener('mousedown', (event) => {
  isDragging = true
  previousMousePosition.x = event.clientX
  previousMousePosition.y = event.clientY
})

//* Mouse up event listener
window.addEventListener('mouseup', () => {
  isDragging = false
})

//* Mouse move event listener
window.addEventListener('mousemove', (event) => {
  if (isDragging) {
    const deltaX = event.clientX - previousMousePosition.x
    const deltaY = event.clientY - previousMousePosition.y

    const rotationSpeed = 0.005

    //* Rotate mesh
    mesh.rotation.y += deltaX * rotationSpeed
    mesh.rotation.x += deltaY * rotationSpeed

    previousMousePosition.x = event.clientX
    previousMousePosition.y = event.clientY
  }
})

//* Animate function
const animate = () => {
  const elapseTime = clock.getElapsedTime()

  renderer.render(scene, camera)

  window.requestAnimationFrame(animate)
}

animate()
