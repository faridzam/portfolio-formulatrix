import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

const fontLoader = new FontLoader();
const title = new THREE.Mesh();

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

  // scene.add( textMesh );
  title = textMesh;
});

export {
  fontLoader,
  title
};
