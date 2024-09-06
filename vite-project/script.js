import './style.css'

import * as THREE from 'three'
import { gsap } from 'gsap'

const canvas = document.querySelector('canvas.webgl')

//* Scene
const scene = new THREE.Scene()

//* Object
const group = new THREE.Group()
scene.add(group)

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 'purple' })
)
cube1.position.z = -2
group.add(cube1)

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(2, 1.5, 1),
  new THREE.MeshBasicMaterial({ color: 'teal' })
)
cube2.position.x = 4
cube2.position.y = 1
group.add(cube2)

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(3, 1, 2),
  new THREE.MeshBasicMaterial({ color: 'green', wireframe: true })
)
cube3.position.y = 3
cube3.position.x = 3
group.add(cube3)

group.position.x = 4

// const geometry = new THREE.BoxGeometry()
// const material = new THREE.MeshBasicMaterial({
//   color: 'purple',
//   //   wireframe: true,
// })
// const mesh = new THREE.Mesh(geometry, material)
// // mesh.position.z = -4
// // mesh.position.y = 3
// // mesh.position.x = 2
// mesh.position.set(2, -1, 3)
// mesh.scale.set(2, 1, 3)
// mesh.rotation.reorder('YXZ')
// mesh.rotation.y = Math.PI - 1
// mesh.rotation.x = 2
// mesh.rotation.z = Math.PI

// scene.add(mesh)

//* Camera
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}
// const camera = new THREE.PerspectiveCamera(
//   80,
//   sizes.width / sizes.height,
//   0.1,
//   100
// )
const camera = new THREE.OrthographicCamera(10, -1, -10, 10, 1, 1000)
camera.position.z = 10
camera.position.y = 2
// camera.position.x = 1

// camera.lookAt(mesh.position)

// camera.position.set(-1, -1, 3)

scene.add(camera)

const axesHelper = new THREE.AxesHelper(4)
scene.add(axesHelper)

//* Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

// let time = Date.now()

//* Clock
const clock = new THREE.Clock()

//* Animation

// gsap.to(group.position, { duration: 1, delay: 1, x: 2 })
// gsap.to(group.position, { duration: 1, delay: 1, x: 0 })

const tick = () => {
  // const currentTime = Date.now()
  // const deltaTime = currentTime - time
  // time = currentTime

  const elapsedTime = clock.getElapsedTime()

  // console.log('tick')
  // group.rotation.x += 0.01
  // group.rotation.y += 0.03
  // group.rotation.x = Math.sin(elapsedTime)
  // group.rotation.y = Math.tan(elapsedTime)
  group.rotation.y = elapsedTime * 2
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()
