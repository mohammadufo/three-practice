import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'

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
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const geometry = new THREE.TorusGeometry(2.5, 1, 16, 100)
// const geometry = new THREE.TorusKnotGeometry(4, 1, 300, 16)

const positionsArray = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0])
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
const geometry = new THREE.BufferGeometry()
geometry.setAttribute('position', positionsAttribute)

// positionsArray[0] = 0
// positionsArray[1] = 0
// positionsArray[2] = 0

// positionsArray[3] = 0
// positionsArray[4] = 1
// positionsArray[5] = 0

// positionsArray[6] = 1
// positionsArray[7] = 0
// positionsArray[8] = 0

const material = new THREE.MeshBasicMaterial({
  color: 'purple',
  wireframe: true,
})

const cube = new THREE.Mesh(geometry, material)

scene.add(cube)

// const fontLoader = new FontLoader()
// fontLoader.load(
//   'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
//   (font) => {
//     const textGeometry = new TextGeometry('I Love you Alaa <3', {
//       font: font,
//       size: 1,
//       height: 0.2,
//       curveSegments: 12,
//       bevelEnabled: true,
//       bevelThickness: 0.03,
//       bevelSize: 0.02,
//       bevelSegments: 5,
//     })

//     const textMaterial = new THREE.MeshBasicMaterial({
//       color: 'purple',
//       // wireframe: true,
//     })
//     const textMesh = new THREE.Mesh(textGeometry, textMaterial)
//     scene.add(textMesh)
//     camera.lookAt(textMesh.position)

//     // Position the camera
//     camera.position.z = 5

//     // Animation loop
//     // const animate = () => {
//     //   requestAnimationFrame(animate)
//     //   textMesh.rotation.x += 0.01
//     //   textMesh.rotation.y += 0.01
//     //   renderer.render(scene, camera)
//     // }
//     // animate()
//   }
// )

//* Camera
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
  // ! update sizes
  ;(sizes.width = window.innerWidth), (sizes.height = window.innerHeight)

  //! update camera
  camera.aspect = sizes.width / sizes.height

  //! update Matrix
  camera.updateProjectionMatrix()

  //! update Renderer sizes
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', () => {
  const fullscreen =
    document.fullscreenElement || document.webkitFullscreenElement
  if (!fullscreen) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen()
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen()
    }
  } else {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      document.webkitExitFullscreen()
    }
  }
})

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

camera.position.z = 15
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
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

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
