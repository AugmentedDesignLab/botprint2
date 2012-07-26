/**
 * @author Zhongpeng Lin
 */
Chassis3D.prototype = new THREE.Mesh();
Chassis3D.constructor = Chassis3D;

function Chassis3D(chassisModel) {
	var material = new THREE.MeshPhongMaterial();
	var shape = this.buildShape(chassisModel.path);
	var geometry = shape.extrude({amount: Spec.chassis.height});
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
	$.each(chassisModel.transform, function(index, t){
		if(t[0] == 'T')
		{
			this.translateX(t[1]);
			this.translateY(t[2]);
		}else if(t[0] == 'R'){
			this.rotation.z += t[1] * Math.PI /180;
		}
	});
}

Chassis3D.prototype.buildShape = function(path) {
	var shape = new THREE.Shape();

	// used to remove duplicate actions
	var existingActions = {};
	for(var i = 0; i < path.length; i++)
	{
		var action = path[i];
		if(!existingActions[action]){
			existingActions[action] = true;
			switch(action[0]){
				case 'M':
				case 'm':
					shape.moveTo(action[1], action[2]);
					break;
				case 'L':
				case 'l':
					shape.lineTo(action[1], action[2]);
					break;
				case 'C':
					shape.bezierCurveTo(action[1], action[2], action[3], action[4], action[5], action[6]);
				case 'Z':
				case 'z':
					shape.closePath();
					break;
			}

		}
	}
	return shape;
};