import * as THREE from './three.module.js'

const scene = new THREE.Scene()

const group = new THREE.Group()

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 'purple' })
const mesh = new THREE.Mesh(geometry, material)

mesh.position.z = 1

const geometryT = new THREE.BoxGeometry(1, 1, 1)
const materialT = new THREE.MeshBasicMaterial({ color: 'green' })
const meshT = new THREE.Mesh(geometryT, materialT)

meshT.position.y = 2

group.add(mesh, meshT)
scene.add(group)

group.position.x = 2

const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const camera = new THREE.PerspectiveCamera(79, aspect.width / aspect.height)
camera.position.z = 5
camera.position.x = 1
camera.position.y = 1

scene.add(camera)

const canvas = document.querySelector('.draw')
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(aspect.width, aspect.height)
renderer.render(scene, camera)
