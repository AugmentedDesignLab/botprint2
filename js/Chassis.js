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
		
		g.computeBoundingBox();
		var bBox = g.boundingBox;
		var position = new THREE.Vector3((bBox.min.x+bBox.max.x)*.5, 
			(bBox.min.y+bBox.max.y)*.5, 0);
		THREE.GeometryUtils.center(g);
		var mesh = new THREE.Mesh(g, material);
		mesh.position = position;
		
		// replay transforms in original SVG
		$.each(s.transforms, function(index, t){
			if(t[0] == 'T')
			{
				mesh.translateX(t[1]);
				mesh.translateY(t[2]);
			}else if(t[0] == 'R'){
				mesh.rotation.z += t[1] * Math.PI /180;
			}
		});
		
		THREE.GeometryUtils.merge(geometry, mesh);
	});
	THREE.GeometryUtils.center( geometry );
	THREE.Mesh.call(this,  geometry, material);
}

function rotateAroundObjectAxis( object, axis, radians ) {

    var rotationMatrix = new THREE.Matrix4();

    rotationMatrix.setRotationAxis( axis.normalize(), radians );
    object.matrix.multiplySelf( rotationMatrix );                       // post-multiply
    object.rotation.getRotationFromMatrix( object.matrix );
}