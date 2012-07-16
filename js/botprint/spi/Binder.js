/**
 * An helper object that allows me extract certain repetitive code and use it any time we want.
 * this object is trying to help the case where we want handlers to interact thru the bus.
 *
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function Binder (that) {
	that 	= that    || {};
	return {
		bindAll: function(thruClosure){
			thruClosure = thruClosure || function() {
				this.bindSelfToDraggable();
				this.bindSelfToHoverable();
				this.bindSelfToDisabled();
				this.bindSelfToEnabled();
			};

			thruClosure.call(this);
		},

		bindSelfToHoverable: function() {
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

		bindSelfToDraggable: function() {
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

		bindWheelsToDraggable: function () {
			that.bind(Events.draggable, function(payload){
				var vertex   		= payload['vertex'];
				var handlerOptions 	= payload['handlerOptions'];
				var dragging = DraggingHandler(vertex, handlerOptions);
				dragging.enable();
				if(vertex.handlers){
					vertex.handlers.push(dragging);
				}
			});
		},

		bindSelfToDisabled: function(thruStrategy) {
			thruStrategy = thruStrategy || Binder.DISABLED;
			that.bind(Events.disabled, thruStrategy);
		},

		bindSelfToEnabled: function(thruStrategy) {
			thruStrategy = thruStrategy || Binder.ENABLED;
			that.bind(Events.enabled, thruStrategy);
		}
	}
}

Binder.DISABLED = function (payload) {
	var thisHandler = this;
	var view = payload['view'];
	thisHandler.events.forEach (function (ev) {
		view.elem.bind (ev.toLowerCase (), thisHandler[ev]);
	});
};

Binder.ENABLED  = function(payload) {
	var thisHandler = this;
	var view = payload['view'];
	thisHandler.events.forEach(function(ev){
		view.elem.unbind(ev.toLowerCase(), thisHandler[ev]);
	});
};
