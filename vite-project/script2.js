import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'

const canvas = document.querySelector('canvas.webgl')

// * Curser
const curser = {
  x: 0,
  y: 0,
}
window.addEventListener('mousemove', (e) => {
  curser.x = e.clientX / sizes.width - 0.5
  curser.y = -(e.clientY / sizes.height - 0.5)
})

//* Scene
const scene = new THREE.Scene()

//* Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({
  color: 'red',
  wireframe: true,
})

const cube = new THREE.Mesh(geometry, material)

scene.add(cube)

//* Camera
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const aspectRatio = sizes.width / sizes.height

const camera = new THREE.PerspectiveCamera(
  80,
  sizes.width / sizes.height,
  0.1,
  100
)

// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   1000
// )

camera.position.z = 5
camera.lookAt(cube.position)
scene.add(camera)

//* Helper
const axesHelper = new THREE.AxesHelper(3)
scene.add(axesHelper)

//* Controls
const controls = new TrackballControls(camera, canvas)
controls.enableDamping = true

//* Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  //   camera.position.x = Math.sin(curser.x * Math.PI * 2) * 2
  //   camera.position.z = Math.cos(curser.x * Math.PI * 2) * 2
  //   camera.position.y = curser.y * 3
  //   camera.lookAt(cube.position)

  //? Update Controls
  controls.update()

  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()
