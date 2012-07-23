/**
 * @author Zhongpeng Lin
 */
Chassis3D.prototype = new THREE.Mesh();
Chassis3D.constructor = Chassis3D;

function Chassis3D(svg, height) {
	var toShape = new SVG2Shape();
	var material = new THREE.MeshPhongMaterial();
	var shape = toShape.convert(svg);
	var geometry = shape.extrude({amount: height});
	geometry.computeBoundingBox();
	var bBox = geometry.boundingBox;
	// record the position of the geometry
	var position = new THREE.Vector3((bBox.min.x+bBox.max.x)*.5, 
		(bBox.min.y+bBox.max.y)*.5, 0);
	/* move the geometry to center, so that later rotation of
	 * the mesh will be around the center of the geometry
	 */
	THREE.GeometryUtils.center(geometry);
	THREE.Mesh.call(this,  geometry, material);
	this.position = position;
	// replay transforms in original SVG
	$.each(shape.transforms, function(index, t){
		if(t[0] == 'T')
		{
			this.translateX(t[1]);
			this.translateY(t[2]);
		}else if(t[0] == 'R'){
			this.rotation.z += t[1] * Math.PI /180;
		}
	});
}