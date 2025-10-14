import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.IcosahedronGeometry(0.7, 0)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const edges = new THREE.EdgesGeometry(geometry)
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 })
const line = new THREE.LineSegments(edges, lineMaterial)
mesh.add(line)



//Axes Helper
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

// Animate
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })
const clock = new THREE.Clock()
const tick = () =>
{
const elapsedTime = clock.getElapsedTime()
// Update objects
camera.position.x = Math.cos(elapsedTime)
camera.position.y = Math.sin(elapsedTime)
camera.lookAt(mesh.position)
// Render
renderer.render(scene, camera)
// Call tick again on the next frame
window.requestAnimationFrame(tick)
}
tick()
