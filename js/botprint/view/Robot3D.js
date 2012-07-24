/**
 * 3D view of the robot
 * @author Zhongpeng Lin
 */
function Robot3D(chassis, wheels/*will add more parameters for other parts later*/) {
	var geometry = new THREE.Geometry();
	THREE.GeometryUtils.merge(geometry, chassis);
	for(var id in wheels)
	{
		if(wheels.hasOwnProperty(id)){
			THREE.GeometryUtils.merge(geometry, wheels[id]);
		}
	}

	THREE.GeometryUtils.center(geometry);
	THREE.Mesh.call(this, geometry, new THREE.MeshPhongMaterial());
	this.rotation.x = Math.PI/2;
}

Robot3D.prototype = Object.create(new THREE.Mesh());
