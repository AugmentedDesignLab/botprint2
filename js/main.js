/* Author: Zhongpeng Lin

*/
var canvas = new Canvas2D('canvas2d');
var preview = new Preview3D('preview3d');
new SidePanel('side-container', canvas, preview);

//Create default object
var geometry = new THREE.CubeGeometry( 100, 100, 100 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );

var mesh = new THREE.Mesh( geometry, material );
preview.setObject(mesh);
//end creating default object

preview.animate();




