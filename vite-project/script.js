import './style.css'

import * as THREE from 'three'

const canvas = document.querySelector('canvas.webgl')

//* Scene
const scene = new THREE.Scene()

//* Object
const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({
  color: 'red',
  wireframe: true,
})
const mesh = new THREE.Mesh(geometry, material)
mesh.position.z = -4

scene.add(mesh)

//* Camera
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 7
camera.position.y = -2
camera.position.x = 3
scene.add(camera)

console.log(mesh.position.distanceTo(camera.position))

//* Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
