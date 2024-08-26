import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

const BigDataClub = () => {
  const text = 'Big Data Club', 
        bevelEnabled = false;

  const depth = 1,
				size = 4,
				hover = 30,
				curveSegments = 2,
				bevelThickness = 1,
				bevelSize = 1;

  // * SCENE
  const scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x000000 );
	scene.fog = new THREE.Fog( 0x000000, 100, 200 );

  // * CAMERA
  const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 200)
  camera.position.set(0, 30, 120)
  
  // * RENDERER
  const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('earth') })
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );

  // * LIGHTS
  const sphere = new THREE.SphereGeometry( 0.3, 10, 8 );
  const dirLight = new THREE.DirectionalLight( 0xfefdf0, 1 );
	dirLight.position.set( 0, 0, 1 ).normalize();
	scene.add( dirLight );

	const pointLight = new THREE.PointLight( 0xffffff, 4.5, 0, 0 );
	pointLight.color.setHSL( Math.random(), 1, 0.5 );
	pointLight.position.set( 0, 100, 90 );
	scene.add( pointLight );

  const arrPointLights = [0xff0040, 0x0040ff, 0x80ff80, 0xffaa00]

  const light1 = new THREE.PointLight( 0xff0040, 400 );
	light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xff0040 } ) ) );
	scene.add( light1 );

	const light2 = new THREE.PointLight( 0x0040ff, 400 );
	light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x0040ff } ) ) );
	scene.add( light2 );

	const light3 = new THREE.PointLight( 0x80ff80, 400 );
	light3.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x80ff80 } ) ) );
	scene.add( light3 );

	const light4 = new THREE.PointLight( 0xffaa00, 400 );
	light4.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffaa00 } ) ) );
  scene.add( light4 );

  // * MATERIAL
  const materials = [
    new THREE.MeshPhongMaterial( { color: 0x1c03fc, flatShading: true } ), // front
    new THREE.MeshPhongMaterial( { color: 0x1c03fc } ) // side
  ];
  

  // * PLANE
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry( 300, 300 ),
    new THREE.MeshBasicMaterial( { color: 0xffffff, opacity: 0.5, transparent: true } )
  );
  plane.position.x = 5;
  plane.position.y = -18;
  plane.position.z = 40;
  plane.rotation.x = -Math.PI/2;
  

  // * CONTROLS
  const controls = new OrbitControls(camera, renderer.domElement)

  // * OBJECTS
  const createCylinder = (radius, height, radialSegments, position, rotation) => {
    const geometry = new THREE.CylinderGeometry(radius, radius, height, radialSegments)
    const material = new THREE.MeshPhongMaterial({ color: 0x1c03fc })
    const cylinder = new THREE.Mesh(geometry, material)
    cylinder.position.set(...position)
    cylinder.rotation.set(...rotation)
    return cylinder
  }

  const createTorus = (radius, tube, arc, position = [0, 0, 0], rotation = [0,0,0]) => {
    const geometry = new THREE.TorusGeometry(radius, tube, 30, 200, arc)
    const material = new THREE.MeshPhongMaterial( { color: 0x1c03fc } )
    const torus = new THREE.Mesh(geometry, material)
    torus.position.set(...position)
    torus.rotation.set(...rotation)
    return torus
  }

  const logo = new THREE.Group()

  const seg = [createTorus(6,0.5,Math.PI - Math.PI / 6.2, [2.4,0.5,0], [0,0,Math.PI/4.5]),
              createTorus(4,0.5,Math.PI - Math.PI / 15, [-2.9,-5,0], [Math.PI,0,Math.PI/2]),
              createCylinder(0.5, 7, 30, [0.5, -9, 0], [0,0,Math.PI/2]),
              createCylinder(0.5, 6.5, 30, [5.29, -6.37, 0], [0,0,-Math.PI/6]),
              createTorus(1,0.5,Math.PI * 2, [7.1,-2.8,0], [0,0,0]),
              createCylinder(0.5, 6.5, 30, [4.08, -1, 0], [0,0,-Math.PI/6]),
              createTorus(1,0.5,Math.PI * 2, [1.6,-5,0], [0,0,0]),
              createCylinder(0.5, 5.4, 30, [8, 1.6, 0], [0,0,Math.PI/2]),
              createTorus(5.3,0.5,Math.PI, [10.5,-3.69,0], [0,0, -Math.PI/2]),
              createCylinder(0.5, 3.5, 30, [9, -9, 0], [0,0,-Math.PI/2]),
              createTorus(0.09,0.5,Math.PI * 2, [-3.5,-0.9,0], [0,0,0])]

  seg.forEach((s) => logo.add(s))

  // * TextGeometry
  let textGroup = new THREE.Group();
  const loader = new FontLoader();
  let textGeo;
  loader.load( 'fonts/tff/optimer_bold.typeface.json', function ( response ) {
    textGeo = new TextGeometry( text, {

      font: response,
  
      size: size,
      depth: depth,
      curveSegments: curveSegments,
      bevelOffset: 0,
      bevelSegments: 5,
      bevelThickness: bevelThickness,
      bevelSize: bevelSize,
      bevelEnabled: bevelEnabled
  
    });
    const textMesh1 = new THREE.Mesh( textGeo, materials );
    textMesh1.rotation.x = 0;
		textMesh1.rotation.y = Math.PI * 2;
    textGroup.add( textMesh1 );
    const textMesh2 = new THREE.Mesh( textGeo, materials );
    textMesh2.rotation.x = Math.PI - Math.PI / 6;
		textMesh2.rotation.y = Math.PI * 2;
    textMesh2.position.set(0, textMesh1.position.y - 5, textMesh1.position.z - 3);
    textGroup.add( textMesh2 );
  });  
  textGroup.position.set(-12, -15, 0)

  // Add objects to scene
  scene.add(logo)
  scene.add(textGroup)
  scene.add(plane)

  // ANIMATION LOOP
  const animate = () => {
    requestAnimationFrame(animate)
    const time = Date.now() * 0.0005;
    light1.position.x = Math.sin( time * 0.7 ) * 20;
		light1.position.y = Math.cos( time * 0.5 ) * 30;
		light1.position.z = Math.cos( time * 0.3 ) * 10;

		light2.position.x = Math.cos( time * 0.3 ) * 10;
		light2.position.y = Math.sin( time * 0.5 ) * 30;
		light2.position.z = Math.sin( time * 0.7 ) * 20;

		light3.position.x = Math.sin( time * 0.7 ) * 10;
		light3.position.y = Math.cos( time * 0.3 ) * 10;
		light3.position.z = Math.sin( time * 0.5 ) * 10;

		light4.position.x = Math.sin( time * 0.3 ) * 20;
		light4.position.y = Math.cos( time * 0.7 ) * 10;
		light4.position.z = Math.sin( time * 0.5 ) * 15;

    controls.update()

    renderer.render(scene, camera)
  }

  animate()

  return (
    <div>
      Big Data Club
    </div>
  )
}

export default BigDataClub