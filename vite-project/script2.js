import './style.css'

import * as THREE from 'three'

const canvas = document.querySelector('canvas.webgl')

//* Scene
const scene = new THREE.Scene()

//* Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 'red', wireframe: true })

const cube = new THREE.Mesh(geometry, material)

scene.add(cube)

//* Camera
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const aspectRatio = sizes.width / sizes.height

const camera = new THREE.OrthographicCamera(
  -1 * aspectRatio,
  1 * aspectRatio,
  1,
  -1,
  0.1,
  1000
)
// const camera = new THREE.PerspectiveCamera(
//   80,
//   sizes.width / sizes.height,
//   1,
//   100
// )
camera.position.z = 2
scene.add(camera)

const axesHelper = new THREE.AxesHelper(3)
// scene.add(axesHelper)

//* Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  cube.rotation.y = elapsedTime * 1.5
  cube.rotation.x = elapsedTime * 1.2
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()
