/**
 * @author Zhongpeng Lin
 */
Chassis.prototype = new THREE.Mesh();
Chassis.constructor = Chassis;

function Chassis(svgs, height) {
	var toShape = new SVG2Shape();
	var geometry = new THREE.Geometry();
	$.each(svgs, function(index, value){
		var s = toShape.convert(value);
		var g = s.extrude({amount: height});
		THREE.GeometryUtils.merge(geometry, g);
	});
	THREE.GeometryUtils.center( geometry );
	THREE.Mesh.call(this,  geometry, new THREE.MeshPhongMaterial());
}