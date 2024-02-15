import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { particles } from './objects/randomParticle';

let camera, scene, renderer, sizes, composer;
let mouse;
let originalScale, hoveredObject;

init();
animate();

function init() {
  sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  }
  
  // scene & camera
  scene = new THREE.Scene();
  // const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera = new THREE.PerspectiveCamera( 75, sizes.width / sizes.height, 0.1, 1000 );
  camera.position.z = 6;
  scene.background = new THREE.Color(0x000000)
  // scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );
  
  // light
  const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1)
  ambientLight.position.set(1, 1, 1).normalize();
  scene.add(ambientLight)
  
  const pointLight = new THREE.PointLight( 0xffffff, 300, 100, 0.5 );
  pointLight.position.set( -50, 50, 50 );
  scene.add( pointLight );
  
  // renderer
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize( sizes.width, sizes.height );
  var container = document.querySelector('.main-banner-container')
  container.appendChild( renderer.domElement );

  // lokapos
  const geometryProjects = new THREE.PlaneGeometry(3.2, 1.8);

  const textureLokaposAdmin1 = new THREE.TextureLoader().load('/images/lokapos-admin/admin_panel_login.jpeg');
  const materialLokaposAdmin1 = new THREE.MeshBasicMaterial({map:textureLokaposAdmin1});
  const planeLokaposAdmin1 = new THREE.Mesh( geometryProjects, materialLokaposAdmin1 );
  scene.add(planeLokaposAdmin1);
  planeLokaposAdmin1.position.set(3, -1, -2);
  planeLokaposAdmin1.name = 'planeLokaposAdmin1';
  
  const textureLokaposAdmin2 = new THREE.TextureLoader().load('/images/lokapos-admin/admin_panel_dashboard.jpeg');
  const materialLokaposAdmin2 = new THREE.MeshBasicMaterial({map:textureLokaposAdmin2});
  const planeLokaposAdmin2 = new THREE.Mesh( geometryProjects, materialLokaposAdmin2 );
  scene.add(planeLokaposAdmin2);
  planeLokaposAdmin2.position.set(3+3.5, -1, -2);
  planeLokaposAdmin2.name = 'planeLokaposAdmin2';

  const textureLokapos1 = new THREE.TextureLoader().load('/images/lokapos/pos_login.jpeg');
  const materialLokapos1 = new THREE.MeshBasicMaterial({map:textureLokapos1});
  const planeLokapos1 = new THREE.Mesh( geometryProjects, materialLokapos1 );
  scene.add(planeLokapos1);
  planeLokapos1.position.set(3, -3, -2);
  planeLokapos1.name = 'planeLokapos1';
  
  const textureLokapos2 = new THREE.TextureLoader().load('/images/lokapos/pos_input_deposit.jpeg');
  const materialLokapos2 = new THREE.MeshBasicMaterial({map:textureLokapos2});
  const planeLokapos2 = new THREE.Mesh( geometryProjects, materialLokapos2 );
  scene.add(planeLokapos2);
  planeLokapos2.position.set(3+3.5, -3, -2);
  planeLokapos2.name = 'planeLokapos2';
  
  const textureLokapos3 = new THREE.TextureLoader().load('/images/lokapos/pos_home.jpeg');
  const materialLokapos3 = new THREE.MeshBasicMaterial({map:textureLokapos3});
  const planeLokapos3 = new THREE.Mesh( geometryProjects, materialLokapos3 );
  scene.add(planeLokapos3);
  planeLokapos3.position.set(3+7, -3, -2);
  planeLokapos3.name = 'planeLokapos3';
  
  
  // object (cube)
  // const cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
  // const cubeMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  // const cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
  // scene.add( cube );
  
  // object (cone)
  // const coneRadius = 1;
  // const coneHeight = 2;
  // const coneRadialSegment = 360;
  // const coneHeightSegment = 24;
  // const coneOpenEnded = false;
  // const coneThetaStart = Math.PI * 0;
  // const coneThetaLength = Math.PI * 2; // *2 means full cone
  // const ConeGeometry = new THREE.ConeGeometry(
  //   coneRadius,
  //   coneHeight,
  //   coneRadialSegment,
  //   coneHeightSegment,
  //   coneOpenEnded,
  //   coneThetaStart,
  //   coneThetaLength,
  // );
  
  // const coneMaterial = new THREE.MeshBasicMaterial({color: 0x9CD26D});
  // const cone = new THREE.Mesh(ConeGeometry, coneMaterial);
  // scene.add(cone);
  
  // object moon
  const moonMtlLoader = new MTLLoader();
  moonMtlLoader.load(`${import.meta.env.VITE_BASE_URL}/objects/Moon_2K.mtl`, (moonMaterials) => {
    moonMaterials.preload();
  
    // texture loader
    var moonTextureLoader = new THREE.TextureLoader();
    moonTextureLoader.load(`${import.meta.env.VITE_BASE_URL}/textures/Diffuse_2K.png`, function(moonTexture) {
      // Set the texture for the material
      moonMaterials.materials.Moon.shininess = 10;
      moonMaterials.materials.Moon.map = moonTexture;
  
      // Load the model file (OBJ file) along with the materials
      var objLoader = new OBJLoader();
      objLoader.setMaterials(moonMaterials);
      objLoader.load(`${import.meta.env.VITE_BASE_URL}/objects/Moon_2K.obj`, function (object) {
          // Add the loaded object to the scene
          object.name = 'moon';
          object.position.set(0,0,0);
          object.scale.set(1, 1, 1)
          scene.add(object);
      });
  });
  });

  // random particle
  scene.add(particles);

  // text geometry
  const fontLoader = new FontLoader();
  fontLoader.load(`${import.meta.env.VITE_BASE_URL}/fonts/Poppins_Regular.json`, function (font) {
    const textGeometry = new TextGeometry('Faridzam', {
      font: font,
      size: 10,
      height: 0,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0,
      bevelSize: 0.3,
      bevelOffset: 0,
      bevelSegments: 0,
    });
    textGeometry.center();
    const textMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);

    textMesh.position.set(0, 50, -100);

    scene.add( textMesh );
  });
  
  // event listener
  document.addEventListener('mousemove', onDocumentMouseMove);
  window.addEventListener('resize', onWindowResize);

  // postprocessing
  composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(new BloomPass());
  
  // orbit controls
  // controls = new OrbitControls( camera, renderer.domElement );
  // //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
  // controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  // controls.dampingFactor = 0.2;
  // controls.screenSpacePanning = false;
  // controls.minDistance = 1;
  // controls.maxDistance = 500;
  // controls.maxPolarAngle = Math.PI / 2;

}

// var lastMove = Date.now();
var cameraPositionTarget = new THREE.Vector3(0,0,6);
var cameraRotation = new THREE.Quaternion();
var targetQuaternion = new THREE.Quaternion();
function onDocumentMouseMove(event) {

  // if (Date.now() - lastMove < 10) {
  //   return;
  // } else {
  //     lastMove = Date.now();
  // }

  mouse = new THREE.Vector2();
  mouse.x = (event.clientX / sizes.width) * 2 - 1;
  mouse.y = -(event.clientY / sizes.height) * 2 + 1;

  cameraPositionTarget.set(((mouse.x+1)*6)-(6), 0, 6);

  const rotationSpeed = 0.5;
  targetQuaternion.setFromAxisAngle(
    new THREE.Vector3(0, mouse.x, 0),
    rotationSpeed
  );
  cameraRotation.slerp(targetQuaternion, 0.1);

  // Update the raycaster with the mouse position
  var raycaster = new THREE.Raycaster();
  raycaster.setFromCamera( mouse, camera );

  // Step 3: Perform raycasting and check for intersections with objects by name
  const intersects = raycaster.intersectObjects(scene.children, true);

  // Filter the intersections based on object names
  const intersectedObjects = intersects.filter(intersect => [
    'planeLokaposAdmin1',
    'planeLokaposAdmin2',
    'planeLokapos1',
    'planeLokapos2',
    'planeLokapos3',
  ].includes(intersect.object.name));

  if (intersectedObjects.length > 0) {
    // Get the first intersected object (closest to the camera)
    const intersectedObject = intersectedObjects[0].object;
    // Do something with the intersected object
    if (!originalScale) {
      originalScale = intersectedObject.scale.clone(); // Store the original scale
    }
    document.body.style.cursor = 'pointer';

    if (hoveredObject !== intersectedObject) {
        // Reset the scale of the previously hovered object (if exists)
        if (hoveredObject) {
            hoveredObject.scale.copy(originalScale);
        }

        // Store the original scale of the intersected object
        originalScale = intersectedObject.scale.clone();

        // Scale the intersected object
        intersectedObject.scale.set(originalScale.x * 1.2, originalScale.y * 1.2, originalScale.z * 1.2);

        // Update the currently hovered object
        hoveredObject = intersectedObject;
    }
  } else {
    document.body.style.cursor = 'default';
    if (hoveredObject) {
      hoveredObject.scale.copy(originalScale);
      hoveredObject = null; // Reset the currently hovered object
    }
  }

  // camera.position.set(((mouse.x+1)/2*6)-(6), 0, (mouse.x+1)*3);
  // camera.rotation.y = -Math.PI/3 + (mouse.x*Math.PI/4);

}

function onWindowResize(){
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  
  renderer.render(scene, camera);
}



// animate function
function animate() {
	requestAnimationFrame( animate );

  if (cameraPositionTarget) {
    camera.position.lerp(cameraPositionTarget, 0.01);
  }

  if (cameraRotation) {
    camera.setRotationFromQuaternion(cameraRotation);
  }

  const moon = scene.getObjectByName('moon');

  if (moon) {
    moon.rotation.y += 0.001;
    moon.rotation.x += 0.001;
  }

	renderer.render( scene, camera );
}
