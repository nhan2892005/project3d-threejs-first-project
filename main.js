import * as THREE from 'three'
import { MapControls } from 'three/addons/controls/MapControls.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

console.log('main.js loaded');

const scence = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.setZ(30)
camera.position.setX(-3)

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg') })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshBasicMaterial({ color: 0xFF6347 })
const torus = new THREE.Mesh(geometry, material)

// scence.add(torus)

const PointLight = new THREE.PointLight()
PointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff)
ambientLight.position.set(20,20,20)

scence.add(PointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(PointLight)
const gridHelper = new THREE.GridHelper(200, 50)
scence.add(lightHelper, gridHelper)

const controls = new MapControls(camera, renderer.domElement)
const twoControls = new OrbitControls(camera, renderer.domElement)

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24)
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
    const star = new THREE.Mesh(geometry, material)

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

    star.position.set(x, y, z)
    scence.add(star)
}

Array(200).fill().forEach(addStar)

const earthTexture = new THREE.TextureLoader().load('/earth.jpg')

const earth = new THREE.Mesh(
    new THREE.SphereGeometry(10, 64, 32),
    new THREE.MeshStandardMaterial({ map: earthTexture })
)

const moonTexture = new THREE.TextureLoader().load('/moon.jpg')
const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({ map: moonTexture })
)
moon.position.set(22, 0, 0)

scence.add(earth, moon);

function moveCamera() {
    const t = document.body.getBoundingClientRect().top

    earth.rotation.x += 0.05
    earth.rotation.y += 0.075
    earth.rotation.z += 0.05

    camera.position.z = t * -0.01
    camera.position.x = t * -0.0002
    camera.rotation.y = t * -0.0002
}

document.body.onscroll = moveCamera
moveCamera()

const distance_moon_earth = 22


function animate() {
    requestAnimationFrame(animate)
    
    earth.rotation.y += 0.01
    moon.rotation.y += 0.005
    moon.rotation.x += 0.005


    // moon around earth x^2 + y^2 + z^2 = r^2
    moon.position.x = distance_moon_earth * Math.sin(moon.rotation.x)
    moon.position.z = distance_moon_earth * Math.cos(moon.rotation.y) 

    controls.update()

    renderer.render(scence, camera)
}

animate()