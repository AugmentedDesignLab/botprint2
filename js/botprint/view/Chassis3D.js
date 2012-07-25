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
	var start = new THREE.Vector2();

	// used to remove duplicate actions
	var existingActions = {};
	var cleanedPath = [];
	for(var i = 0; i < path.length; i++)
	{
		var action = path[i];
		if(!existingActions[action]){
			existingActions[action] = true;
			cleanedPath.push(action);
			switch(action[0]){
				case 'M':
				case 'm':
					shape.moveTo(action[1], action[2]);
					start.set(action[1], action[2]);
					break;
				case 'L':
				case 'l':
					shape.lineTo(action[1], action[2]);
					break;
				case 'Z':
				case 'z':
					shape.lineTo(start.x, start.y);
					break;
			}

		}
	}
	return shape;
};