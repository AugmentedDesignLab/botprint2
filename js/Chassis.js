/**
 * @author Zhongpeng Lin
 */
Chassis.prototype = new THREE.Mesh();
Chassis.constructor = Chassis;

function Chassis(shape, height) {
	var geometry = shape.extrude({amount: height});
	geometry.computeBoundingBox();
	this.boundingBox = geometry.boundingBox;
	var bb = this.boundingBox;
	THREE.GeometryUtils.center( geometry );
	THREE.Mesh.call(this,  geometry, new THREE.MeshBasicMaterial({color: 0x00ff00}));
}