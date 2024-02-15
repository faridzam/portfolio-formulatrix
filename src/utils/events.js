document.addEventListener('mousemove', onDocumentMouseMove);
window.addEventListener('resize', onWindowResize);

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
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  cameraPositionTarget.set(((mouse.x+1)*6)-(6), 0, 6);

  const rotationSpeed = 0.5;
  targetQuaternion.setFromAxisAngle(
    new THREE.Vector3(0, mouse.x, 0),
    1
  );
  cameraRotation.slerp(targetQuaternion, 0.1);

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

