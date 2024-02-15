import * as THREE from 'three';

// sphere BufferGeometry
var sphereGeometry = new THREE.BufferGeometry();
var sphereVertices = [];
var sphereIndices = [];

// Number of horizontal and vertical segments
var segments = 32;
var phiStart = 0;
var phiLength = Math.PI * 2;
var thetaStart = 0;
var thetaLength = Math.PI;

// Generate the vertices and indices for the sphere
for (var i = 0; i <= segments; i++) {
  var phi = phiStart + (phiLength * i) / segments;

  for (var j = 0; j <= segments; j++) {
      var theta = thetaStart + (thetaLength * j) / segments;

      // Calculate the Cartesian coordinates
      var x = Math.sin(phi) * Math.cos(theta);
      var y = Math.cos(phi);
      var z = Math.sin(phi) * Math.sin(theta);

      // Add the vertex to the array
      sphereVertices.push(x, y, z);
  }
}

// Generate the indices for the sphere
for (var i = 0; i < segments; i++) {
  for (var j = 0; j < segments; j++) {
      var a = i * (segments + 1) + j;
      var b = a + (segments + 1);
      var c = a + 1;
      var d = b + 1;

      // Add the indices to the array
      sphereIndices.push(a, b, d);
      sphereIndices.push(d, c, a);
  }
}

// Set the attributes for the buffer geometry
sphereGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(sphereVertices), 3));
sphereGeometry.setIndex(new THREE.BufferAttribute(new Uint32Array(sphereIndices), 1));