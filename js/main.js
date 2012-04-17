/* Author: Zhongpeng Lin

*/
new Canvas2D('canvas2d');
var preview = new Preview3D('preview3d');

//Create mock object
var geometry = new THREE.CubeGeometry( 20, 20, 20 );
var material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

var mesh = new THREE.Mesh( geometry, material );
//end creating mock object

preview.setObject(mesh);
preview.animate();
