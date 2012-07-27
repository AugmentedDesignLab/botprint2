/**
 * 3D view of the robot
 * @author Zhongpeng Lin
 */
function Robot3D(robotModel) {
	var geometry = new THREE.Geometry();
	var chassis3D = new Chassis3D(robotModel.chassis);
	THREE.GeometryUtils.merge(geometry, chassis3D);
	for(var id in robotModel.wheels)
	{
		if(robotModel.wheels.hasOwnProperty(id)){
			var wheel3D = new Wheel3D(robotModel.wheels[id]);
			THREE.GeometryUtils.merge(geometry, wheel3D);
		}
	}

	THREE.GeometryUtils.center(geometry);
	THREE.Mesh.call(this, geometry, new THREE.MeshPhongMaterial());
	this.rotation.x = Math.PI/2;
}

Robot3D.prototype = Object.create(new THREE.Mesh());
