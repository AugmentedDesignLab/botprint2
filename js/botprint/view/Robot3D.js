/**
 * 3D view of the robot
 * @author Zhongpeng Lin
 */
function Robot3D(robotModel) {
	var geometry = new THREE.Geometry();
	var visitor = this
	robotModel.parts.forEach(function(p) {
		var part = eval(p.name)();
		$.extend(part, p);
		var p3D = part.accept(visitor);
		THREE.GeometryUtils.merge(geometry, p3D);
	});
	
	THREE.GeometryUtils.center(geometry);
	THREE.Mesh.call(this, geometry, new THREE.MeshPhongMaterial());
	this.rotation.x = Math.PI/2;
}

// Inherit from THREE.Mesh
Robot3D.prototype = Object.create(new THREE.Mesh(), {
	visitWheel: {
		// visitor method to construct Wheel3D
		value: function(wheel) {
			return new Wheel3D(wheel);
		}
	},
	
	visitChassis: {
		// visitor method to construct Wheel3D
		value: function(chassis) {
			return new Chassis3D(chassis);
		}
	}
});
