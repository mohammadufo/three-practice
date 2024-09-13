import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import GUI from 'lil-gui'
import { gsap } from 'gsap'
import Color from './static/textures/door/color.jpg'

//* Textures
const loadingManager = new THREE.LoadingManager()

loadingManager.onStart = () => {
  console.log('loading started')
}

loadingManager.onLoad = () => {
  console.log('loading finished')
}

loadingManager.onProgress = () => {
  console.log('loading on progress')
}

loadingManager.onError = () => {
  console.log('loading is error')
}

const textureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture2 = textureLoader.load(
  './static/textures/checkerboard-1024x1024.png'
)

const minecraftTexture = textureLoader.load('./static/textures/minecraft.png')

const colorTexture = textureLoader.load('./static/textures/door/color.jpg')

// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3

// colorTexture.wrapS = THREE.RepeatWrapping
// colorTexture.wrapT = THREE.RepeatWrapping

// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5

// colorTexture.rotation = Math.PI * 0.25

// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5

minecraftTexture.generateMipmaps = false
// colorTexture.minFilter = THREE.NearestFilter
minecraftTexture.magFilter = THREE.NearestFilter

//* Debug
const gui = new GUI()
const debugObj = {}

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
debugObj.color = '#a778d8'
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({
  // color: debugObj.color,
  map: minecraftTexture,
  // wireframe: true,
})

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
gui.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('elevations')
gui.add(mesh, 'visible')
gui.add(material, 'wireframe')

gui.addColor(debugObj, 'color').onChange(() => {
  material.color.set(debugObj.color)
})

debugObj.spin = () => {
  gsap.to(mesh.rotation, { duration: 3, y: mesh.rotation.y + Math.PI * 2 })
}

gui.add(debugObj, 'spin')

window.addEventListener('keydown', (e) => {
  if (e.key === 'h') {
    gui.show(gui._hidden)
  }
})

debugObj.subdivision = 2
gui
  .add(debugObj, 'subdivision')
  .min(1)
  .max(20)
  .step(1)
  .onFinishChange(() => {
    mesh.geometry.dispose()
    mesh.geometry = new THREE.BoxGeometry(
      1,
      1,
      1,
      debugObj.subdivision,
      debugObj.subdivision,
      debugObj.subdivision
    )
  })

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

//* Helper
const axesHelper = new THREE.AxesHelper(3)
// scene.add(axesHelper)

camera.position.z = 4
camera.lookAt(mesh.position)
scene.add(camera)

//* Controls
const controls = new OrbitControls(camera, canvas)
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
  //   camera.lookAt(mesh.position)

  //? Update Controls
  controls.update()

  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()
