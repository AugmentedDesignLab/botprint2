/**
 * An helper object that allows me extract certain repetitive code and use it any time we want.
 * this object is trying to help the case where we want handlers to interact thru the bus.
 *
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function HandlerMaker (that) {
	that 	= that    || {};
	return {
		makeAll: function(closure){
			closure = closure || function() {
				this.makeSelfDraggable();
				this.makeSelfHoverable();
			};

			closure.call(this);
		},

		makeSelfHoverable: function() {
			that.bind(Events.hoverable, function(payload){
				var vertex   		= payload['vertex'];
				var handlerOptions 	= payload['handlerOptions'];
				var hovering = HoveringHandler(vertex, handlerOptions);
				hovering.enable();
				if(vertex.handlers){
					vertex.handlers.push(hovering);
				}
			});
		},

		makeSelfDraggable: function() {
			that.bind(Events.draggable, function(payload){
				var vertex   		= payload['vertex'];
				var handlerOptions 	= payload['handlerOptions'];
				var dragging = VertexDraggingHandler(vertex, handlerOptions);
				dragging.enable();
				if(vertex.handlers){
					vertex.handlers.push(dragging);
				}
			});
		},

		makeWheelDraggable: function () {
			that.bind(Events.draggable, function(payload){
				var vertex   		= payload['vertex'];
				var handlerOptions 	= payload['handlerOptions'];
				var dragging = DraggingHandler(vertex, handlerOptions);
				dragging.enable();
				if(vertex.handlers){
					vertex.handlers.push(dragging);
				}
			});
		}
	}
}
