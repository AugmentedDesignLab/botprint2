/**
 * @author Zhongpeng Lin
 */
Chassis.prototype = new THREE.Mesh();
Chassis.constructor = Chassis;

function Chassis(svgs, height) {
	var toShape = new SVG2Shape();
	var geometry = new THREE.Geometry();
	var material = new THREE.MeshPhongMaterial();
	$.each(svgs, function(index, value){
		var s = toShape.convert(value);
		var g = s.extrude({amount: height});
		// replay transforms in original SVG
		var matrix = new THREE.Matrix4();
		$.each(s.transforms, function(index, t){
			if(t[0] == 'T')
			{
				matrix.translate(new THREE.Vector3(t[1], t[2], 0));
			}
		});
		$.each(s.transforms, function(index, t){
			if(t[0] == 'R')
			{
				matrix.rotateZ(t[1]);
			}
		});
		g.applyMatrix(matrix);
		THREE.GeometryUtils.merge(geometry, g);
	});
	THREE.GeometryUtils.center( geometry );
	THREE.Mesh.call(this,  geometry, material);
}