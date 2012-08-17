/**
 * Robot domain object.
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function Robot (opts/*e.g., {name: "RobotA", bus: EventBus(), algs: {wheel:W, chassis: C}}*/){
	opts = opts || {};
    var toArray = function(algs){
        var algorithms = [];
        for(var each in algs){
            algorithms.push(algs[each]);
        }
        return algorithms;
    };

	var self 	= {
		serializable: ['parts'],
		
		parts: [],
		get chassis() {
			if(!self._chassis) {
				self._chassis = self.find(function(p) {return p.name == 'Chassis';})[0];
			}
			return self._chassis;
		},
		/**
		 * assembles a Robot given a set of parts and a set of PCG
		 * algorithms that put these parts together.
		 */
		assemble: function(){
		  	// iterate over all algorithms in the right order
	      	// get the necessary data or resources for the algo to function
		  	// return a result
			var algs = opts.algs;
			if (algs) {
				/**
				 * The idea is to call the algorithms in a specific order,
				 * each of which feeds the next algorithm in turn.
				 *
				 * For example, let's assume we have three algorithms:
				 * 1. chassis layout,
				 * 2. wheels' snapping,
				 * 3. and wires' routing
				 *
				 * We execute the chassis' layout first given the available
				 * Robot parts. The output of this algorithm consists now
				 * of the Robot parts, and a given layout.
				 *
				 * Then, we execute the wheels' snapping algorithm given the
				 * the Robot parts, and a given layout. The output will be
				 * the Robot parts, a layout, and the wheels mounted on a set
				 * of coordinates along the available layout.
				 *
				 * Lastly, we execute the wires' routing algorithm given the
				 * output of the previous algorithm. The output of this algorithm
				 * is a complete robot with all its parts properly placed,
				 * snapped wheels, and the proper wiring.
				 *
				 **/
				var data = self.parts;
				toArray(algs).forEach(function (elem) {
					// e.g., function(data){ AlgorithmX(data).perform(); }
					data = elem.call(data);
				});

				// persist the assembled robot in a format understood by
				// a 3D printing system. e.g., JSON.
				self.persist(data);
			}
		},

        contains: function(part, filter) {
            filter = filter || function(element){ return element.name() == part.name(); };
            var elems = self.find(filter);
            return elems[0] != null;
        },

        count: function(){
            return self.parts.length;
        },

		/**
		 * finds the parts of interest matching a condition.
		 * @param filter filter condition.
		 * @return {*} matched elements.
		 */
		find: function(filter){
			return self.parts.select(filter);
		},

		/**
		 * installs a part on the Robot.
		 * @param part robot part to be installed.
		 */
		install: function(part) {
			self.parts.push(part);
			self.validate();
		},
		
		updatePart: function(part) {
			var existingPart = self._getPart(part.id);
			$.extend(existingPart, part);
			self.validate();
		},

		/**
		 * persists a part of robot.
		 * @param data the Blob object of the robot part.
		 */
		persist: function(data) {
			saveAs(data,'botprint.svg');
		},

        _getPart: function(id) {
			var p = self.find(function(part){return part.id == id;});
			if(p.length > 0)
				return p[0];
			else
		        return null;
        },

		/**
		 * uninstalls the parts matching a condition.
		 * @param part part to be uninstalled.
		 */
		uninstall: function(id){
			self.parts.forEach(function(node, i) {
				if(node.id == id) {
					if(node.isLeaf()){
						self.parts.splice(i, 1);
					} else {
						node.removeAll();
						self.parts.splice(i, 1);
					}
					return;
				}
			});
			self.validate();
		},

		validate: function() {
			if(self.validateChassis() && self.validateWheels()) {
				self.update();
			}
		},
		
		validateWheels: function() {
			var wheels = self.find(function(p){
				return p.name == 'Wheel';
			});
			
			var invalidWheels = [];
			for(var i=0; i<wheels.length; i++){
				for(var j=i+1; j<wheels.length; j++) {
					if(wheels[i].isOverlappingWith(wheels[j])){
						invalidWheels.push(wheels[i].id);
						invalidWheels.push(wheels[j].id);
					}
				}
			}
			
			self.radio.trigger(ApplicationEvents.wheelsOverlapping,
							   {wheels: invalidWheels});
			return invalidWheels.length == 0;
		},
		
		validateChassis: function() {
			if(self.chassis.isSelfIntersecting()) {
				self.radio.trigger(ApplicationEvents.chassisSelfIntersecting, {});
				return false;
			} else {
				self.radio.trigger(ApplicationEvents.chassisValidated, {});
				return true;
			}
		},
		
		update: function() {
			var json = JSON.stringify(self);
			self.radio.trigger(ApplicationEvents.robotUpdated, {robot: json});
		}
	};

	// Mixing it in, just smash the methods of the newly created
	// View onto this object
    Mixable(self).mix( Model (opts));
	return self;
}
