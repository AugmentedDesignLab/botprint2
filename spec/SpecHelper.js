beforeEach(function() {
    this.addMatchers({
        toBeNaked: function(parts) {
            var robot = this.actual;
			parts.forEach(function(elem){
				robot.uninstall(elem);
			});

			return robot.count() == 0;
        }
    });
});
