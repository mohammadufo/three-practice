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

const camera = new THREE.PerspectiveCamera(79, aspect.width / aspect.height)
camera.position.z = 3
camera.position.x = 1
camera.position.y = 1

scene.add(camera)

const canvas = document.querySelector('.draw')
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(aspect.width, aspect.height)
renderer.render(scene, camera)
