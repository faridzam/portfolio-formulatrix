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
  camera.position.z = 15;
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

  const geometryProjects = new THREE.PlaneGeometry(16/4, 9/4);
  
  // lokapos
  const textureLokaposAdmin1 = new THREE.TextureLoader().load(`${import.meta.env.VITE_BASE_URL}/images/lokapos-admin/admin_panel_login.jpeg`);
  const materialLokaposAdmin1 = new THREE.MeshBasicMaterial({map:textureLokaposAdmin1});
  const planeLokaposAdmin1 = new THREE.Mesh( geometryProjects, materialLokaposAdmin1 );
  scene.add(planeLokaposAdmin1);
  planeLokaposAdmin1.position.set(0, 4, 0);
  planeLokaposAdmin1.name = 'planeLokaposAdmin1';
  
  const textureLokaposAdmin2 = new THREE.TextureLoader().load(`${import.meta.env.VITE_BASE_URL}/images/lokapos-admin/admin_panel_dashboard.jpeg`);
  const materialLokaposAdmin2 = new THREE.MeshBasicMaterial({map:textureLokaposAdmin2});
  const planeLokaposAdmin2 = new THREE.Mesh( geometryProjects, materialLokaposAdmin2 );
  scene.add(planeLokaposAdmin2);
  planeLokaposAdmin2.position.set(0, 1.5, 0);
  planeLokaposAdmin2.name = 'planeLokaposAdmin2';

  const textureLokapos1 = new THREE.TextureLoader().load(`${import.meta.env.VITE_BASE_URL}/images/lokapos/pos_login.jpeg`);
  const materialLokapos1 = new THREE.MeshBasicMaterial({map:textureLokapos1});
  const planeLokapos1 = new THREE.Mesh( geometryProjects, materialLokapos1 );
  scene.add(planeLokapos1);
  planeLokapos1.position.set(0, -1, 0);
  planeLokapos1.name = 'planeLokapos1';
  
  const textureLokapos2 = new THREE.TextureLoader().load(`${import.meta.env.VITE_BASE_URL}/images/lokapos/pos_input_deposit.jpeg`);
  const materialLokapos2 = new THREE.MeshBasicMaterial({map:textureLokapos2});
  const planeLokapos2 = new THREE.Mesh( geometryProjects, materialLokapos2 );
  scene.add(planeLokapos2);
  planeLokapos2.position.set(0, -3.5, 0);
  planeLokapos2.name = 'planeLokapos2';
  
  const textureLokapos3 = new THREE.TextureLoader().load(`${import.meta.env.VITE_BASE_URL}/images/lokapos/pos_home.jpeg`);
  const materialLokapos3 = new THREE.MeshBasicMaterial({map:textureLokapos3});
  const planeLokapos3 = new THREE.Mesh( geometryProjects, materialLokapos3 );
  scene.add(planeLokapos3);
  planeLokapos3.position.set(0, -6, 0);
  planeLokapos3.name = 'planeLokapos3';

  // qlola
  const geometryQlola1 = new THREE.PlaneGeometry(4, 5.4);
  const textureQlola1 = new THREE.TextureLoader().load(`${import.meta.env.VITE_BASE_URL}/images/qlola/qlola-login.jpg`);
  const materialQlola1 = new THREE.MeshBasicMaterial({map:textureQlola1});
  const planeQlola1 = new THREE.Mesh( geometryQlola1, materialQlola1 );
  scene.add(planeQlola1);
  planeQlola1.position.set(-4.5, 4, 0);
  planeQlola1.name = 'planeQlola1';
  
  const geometryQlola2 = new THREE.PlaneGeometry(4, 6.55);
  const textureQlola2 = new THREE.TextureLoader().load(`${import.meta.env.VITE_BASE_URL}/images/qlola/giro-online.jpg`);
  const materialQlola2 = new THREE.MeshBasicMaterial({map:textureQlola2});
  const planeQlola2 = new THREE.Mesh( geometryQlola2, materialQlola2 );
  scene.add(planeQlola2);
  planeQlola2.position.set(-4.5, -2.2, 0);
  planeQlola2.name = 'planeQlola2';
  
  const geometryQlola3 = new THREE.PlaneGeometry(4, 11.7);
  const textureQlola3 = new THREE.TextureLoader().load(`${import.meta.env.VITE_BASE_URL}/images/qlola/giro-form.jpg`);
  const materialQlola3 = new THREE.MeshBasicMaterial({map:textureQlola3});
  const planeQlola3 = new THREE.Mesh( geometryQlola3, materialQlola3 );
  scene.add(planeQlola3);
  planeQlola3.position.set(-9, 0, 0);
  planeQlola3.name = 'planeQlola3';

  // qlola-admin
  const geometryQlolaAdmin1 = new THREE.PlaneGeometry(4, 9/4);
  const textureQlolaAdmin1 = new THREE.TextureLoader().load(`${import.meta.env.VITE_BASE_URL}/images/qlola-admin/admin-home.jpg`);
  const materialQlolaAdmin1 = new THREE.MeshBasicMaterial({map:textureQlolaAdmin1});
  const planeQlolaAdmin1 = new THREE.Mesh( geometryQlolaAdmin1, materialQlolaAdmin1 );
  scene.add(planeQlolaAdmin1);
  planeQlolaAdmin1.position.set(-13.5, 5, 0);
  planeQlolaAdmin1.name = 'planeQlolaAdmin1';
  
  const geometryQlolaAdmin2 = new THREE.PlaneGeometry(4, 3.33);
  const textureQlolaAdmin2 = new THREE.TextureLoader().load(`${import.meta.env.VITE_BASE_URL}/images/qlola-admin/admin-kurs-pairing.jpg`);
  const materialQlolaAdmin2 = new THREE.MeshBasicMaterial({map:textureQlolaAdmin2});
  const planeQlolaAdmin2 = new THREE.Mesh( geometryQlolaAdmin2, materialQlolaAdmin2 );
  scene.add(planeQlolaAdmin2);
  planeQlolaAdmin2.position.set(-13.5, 2, 0);
  planeQlolaAdmin2.name = 'planeQlolaAdmin2';
  
  const geometryQlolaAdmin3 = new THREE.PlaneGeometry(4, 3.2);
  const textureQlolaAdmin3 = new THREE.TextureLoader().load(`${import.meta.env.VITE_BASE_URL}/images/qlola-admin/admin-dplk-management.jpg`);
  const materialQlolaAdmin3 = new THREE.MeshBasicMaterial({map:textureQlolaAdmin3});
  const planeQlolaAdmin3 = new THREE.Mesh( geometryQlolaAdmin3, materialQlolaAdmin3 );
  scene.add(planeQlolaAdmin3);
  planeQlolaAdmin3.position.set(-13.5, -1.5, 0);
  planeQlolaAdmin3.name = 'planeQlolaAdmin3';
  
  const geometryQlolaAdmin4 = new THREE.PlaneGeometry(4, 15.38);
  const textureQlolaAdmin4 = new THREE.TextureLoader().load(`${import.meta.env.VITE_BASE_URL}/images/qlola-admin/admin-performance-monitoring.jpg`);
  const materialQlolaAdmin4 = new THREE.MeshBasicMaterial({map:textureQlolaAdmin4});
  const planeQlolaAdmin4 = new THREE.Mesh( geometryQlolaAdmin4, materialQlolaAdmin4 );
  scene.add(planeQlolaAdmin4);
  planeQlolaAdmin4.position.set(-18, -2, 0);
  planeQlolaAdmin4.name = 'planeQlolaAdmin4';


  // salokapark
  const geometrySaloka1 = new THREE.PlaneGeometry(4, 11.4);
  const textureSaloka1 = new THREE.TextureLoader().load(`${import.meta.env.VITE_BASE_URL}/images/salokapark/salokapark.jpg`);
  const materialSaloka1 = new THREE.MeshBasicMaterial({map:textureSaloka1});
  const planeSaloka1 = new THREE.Mesh( geometrySaloka1, materialSaloka1 );
  scene.add(planeSaloka1);
  planeSaloka1.position.set(4.5, 2, 0);
  planeSaloka1.name = 'planeSaloka1';
  
  const geometrySaloka2 = new THREE.PlaneGeometry(4, 9/4);
  const textureSaloka2 = new THREE.TextureLoader().load(`${import.meta.env.VITE_BASE_URL}/images/salokapark/salokapark-tiket.jpg`);
  const materialSaloka2 = new THREE.MeshBasicMaterial({map:textureSaloka2});
  const planeSaloka2 = new THREE.Mesh( geometrySaloka2, materialSaloka2 );
  scene.add(planeSaloka2);
  planeSaloka2.position.set(4.5, -5, 0);
  planeSaloka2.name = 'planeSaloka2';
  
  const geometrySaloka3 = new THREE.PlaneGeometry(4, 9/4);
  const textureSaloka3 = new THREE.TextureLoader().load(`${import.meta.env.VITE_BASE_URL}/images/salokapark/salokapark-tiket-1.jpg`);
  const materialSaloka3 = new THREE.MeshBasicMaterial({map:textureSaloka3});
  const planeSaloka3 = new THREE.Mesh( geometrySaloka3, materialSaloka3 );
  scene.add(planeSaloka3);
  planeSaloka3.position.set(9, -0.5, 0);
  planeSaloka3.name = 'planeSaloka3';
  
  const geometrySaloka4 = new THREE.PlaneGeometry(4, 9/4);
  const textureSaloka4 = new THREE.TextureLoader().load(`${import.meta.env.VITE_BASE_URL}/images/salokapark/salokapark-tiket-2.jpg`);
  const materialSaloka4 = new THREE.MeshBasicMaterial({map:textureSaloka4});
  const planeSaloka4 = new THREE.Mesh( geometrySaloka4, materialSaloka4 );
  scene.add(planeSaloka4);
  planeSaloka4.position.set(9, -3, 0);
  planeSaloka4.name = 'planeSaloka4';
  
  const geometrySaloka5 = new THREE.PlaneGeometry(4, 9/4);
  const textureSaloka5 = new THREE.TextureLoader().load(`${import.meta.env.VITE_BASE_URL}/images/salokapark/salokapark-tiket-3.jpg`);
  const materialSaloka5 = new THREE.MeshBasicMaterial({map:textureSaloka5});
  const planeSaloka5 = new THREE.Mesh( geometrySaloka5, materialSaloka5 );
  scene.add(planeSaloka5);
  planeSaloka5.position.set(9, -5.5, 0);
  planeSaloka5.name = 'planeSaloka5';

  // quadra

  const geometryQuadra1 = new THREE.PlaneGeometry(4, 9/4);
  const textureQuadra1 = new THREE.TextureLoader().load(`${import.meta.env.VITE_BASE_URL}/images/quadra/quadra-login.jpg`);
  const materialQuadra1 = new THREE.MeshBasicMaterial({map:textureQuadra1});
  const planeQuadra1 = new THREE.Mesh( geometryQuadra1, materialQuadra1 );
  scene.add(planeQuadra1);
  planeQuadra1.position.set(9, 7, 0);
  planeQuadra1.name = 'planeQuadra1';
  
  const geometryQuadra2 = new THREE.PlaneGeometry(4, 9/4);
  const textureQuadra2 = new THREE.TextureLoader().load(`${import.meta.env.VITE_BASE_URL}/images/quadra/quadra-overtime.jpg`);
  const materialQuadra2 = new THREE.MeshBasicMaterial({map:textureQuadra2});
  const planeQuadra2 = new THREE.Mesh( geometryQuadra2, materialQuadra2 );
  scene.add(planeQuadra2);
  planeQuadra2.position.set(9, 4.5, 0);
  planeQuadra2.name = 'planeQuadra2';
  
  const geometryQuadra3 = new THREE.PlaneGeometry(4, 9/4);
  const textureQuadra3 = new THREE.TextureLoader().load(`${import.meta.env.VITE_BASE_URL}/images/quadra/quadra-timesheet.jpg`);
  const materialQuadra3 = new THREE.MeshBasicMaterial({map:textureQuadra3});
  const planeQuadra3 = new THREE.Mesh( geometryQuadra3, materialQuadra3 );
  scene.add(planeQuadra3);
  planeQuadra3.position.set(9, 2, 0);
  planeQuadra3.name = 'planeQuadra3';
  
  
  
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
          object.position.set(0,8,0);
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

    textMesh.position.set(-100, 70, -100);

    scene.add( textMesh );
  });
  fontLoader.load(`${import.meta.env.VITE_BASE_URL}/fonts/Poppins_Regular.json`, function (font) {
    const textGeometry = new TextGeometry('Portfolio for formulatrix', {
      font: font,
      size: 3,
      height: 0,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0,
      bevelSize: 0,
      bevelOffset: 0,
      bevelSegments: 0,
    });
    textGeometry.center();
    const textMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);

    textMesh.position.set(-108, 60, -100);

    scene.add( textMesh );
  });
  
  // event listener
  document.addEventListener('mousemove', onDocumentMouseMove);
  document.addEventListener('click', onObjectClick);
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

function onObjectClick(event){
  if (hoveredObject) {
    // console.log(hoveredObject)
    window.open(hoveredObject.material.map.source.data.currentSrc, '_blank').focus();
  }
}

// var lastMove = Date.now();
var cameraPositionTarget = new THREE.Vector3(0,0,15);
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

  cameraPositionTarget.set(((mouse.x+1)*6)-(6), 0, 15);

  // cameraPositionTarget.set(((mouse.x+1)*6)-(6), 0, 15);

  // const rotationSpeed = 0.5;
  // targetQuaternion.setFromAxisAngle(
  //   new THREE.Vector3(0, mouse.x, 0),
  //   rotationSpeed
  // );
  // cameraRotation.slerp(targetQuaternion, 0.1);

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
    'planeQlola1',
    'planeQlola2',
    'planeQlola3',
    'planeQlolaAdmin1',
    'planeQlolaAdmin2',
    'planeQlolaAdmin3',
    'planeQlolaAdmin4',
    'planeSaloka1',
    'planeSaloka2',
    'planeSaloka3',
    'planeSaloka4',
    'planeSaloka5',
    'planeQuadra1',
    'planeQuadra2',
    'planeQuadra3',
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
      hoveredObject = null;
    }
  }

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
  }

	renderer.render( scene, camera );
}
