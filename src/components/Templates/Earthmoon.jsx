import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const Earthmoon = () => {
  // ! INIT
  let sun_radius = 20
  let earth_radius = 10
  let moon_radius = 4.321

  let sphere_width_segments = 64
  let sphere_height_segments = 32

  // * SCENE
  const scene = new THREE.Scene()

  // * CAMERA
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.setZ(30)
  camera.position.setX(-3)
  
  // * RENDERER
  const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('earth') })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)

  // * LIGHTS
  const sphere = new THREE.SphereGeometry( sun_radius, sphere_width_segments, sphere_height_segments );
  const light1 = new THREE.PointLight( 0xfdf6b7, 7000 );
	light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xfdf6b7 } ) ) );
  light1.position.set( 0, 0, 0 );

  // HELPERS
  // const lightHelper = new THREE.PointLightHelper(PointLight)
  const gridHelper = new THREE.GridHelper(200, 50)

  // CONTROLS
  const controls = new OrbitControls(camera, renderer.domElement)

  // OBJECTS
  const distance = 22

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

  // torus test
  const torus = new THREE.Mesh(
    new THREE.TorusGeometry(10, 3, 16, 100),
    new THREE.MeshBasicMaterial({ color: 0xFF6347 })
  )

  // Add objects to scene
  scene.add( light1);
  //scene.add(PointLight, ambientLight)
  scene.add(gridHelper)
  scene.add(earth, moon)
  // scene.add(earth, moon)

  // ANIMATION LOOP
  const animate = () => {
    requestAnimationFrame(animate)

    const time = Date.now() * 0.0005
    
    // Rotate the earth and moon
    earth.rotation.y += 0.01
    moon.rotation.y += 0.05
    moon.rotation.x += 0.05

    // Move the earth and moon
    earth.position.x = 80 * Math.cos(-0.7 * time)
    earth.position.z = 92.5 * Math.sin(-0.7 * time)

    moon.position.x = earth.position.x + distance * Math.sin(moon.rotation.x)
    moon.position.z = earth.position.z + distance * Math.cos(moon.rotation.y)

    controls.update()

    renderer.render(scene, camera)
  }

  animate()

  return (
    <div>
      Earth and moon
    </div>
  )
}

export default Earthmoon