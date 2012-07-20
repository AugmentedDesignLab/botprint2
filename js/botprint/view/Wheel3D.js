/**
 * @author Zhongpeng Lin
 */
Wheel3D.prototype = new THREE.Mesh();
Wheel3D.constructor = Wheel3D;

function Wheel3D(svg) {
	var radius = svg.attrs.height * .5;
	var width = svg.attrs.width;
	var geometry = new THREE.CylinderGeometry(radius, radius, width, 50, 50, false);
	var material = new THREE.MeshPhongMaterial();
	THREE.Mesh.call(this,  geometry, material);
	this.position.x = svg.attrs.x + svg.attrs.width * .5;
	this.position.y = svg.attrs.y + svg.attrs.height * .5;
	this.position.z = radius;
	this.rotation.z = Math.PI / 2;
}
