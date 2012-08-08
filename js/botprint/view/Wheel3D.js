/**
 * @author Zhongpeng Lin
 */
Wheel3D.prototype = new THREE.Mesh();
Wheel3D.constructor = Wheel3D;

function Wheel3D(wheelModel) {
	var radius 		= SpecSheet.wheel.radius;
	var width 		= SpecSheet.wheel.width;
	var geometry 	= new THREE.CylinderGeometry(radius, radius, width, 50, 50, false);
	var material 	= new THREE.MeshPhongMaterial();
	THREE.Mesh.call(this,  geometry, material);
	this.position.x = wheelModel.x;
	this.position.y = wheelModel.y;
	this.position.z = radius;
	this.rotation.z = Math.PI / 2;
}
