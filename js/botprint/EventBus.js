/**
 * EventBus API.
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function EventBus () {
	// Array Remove - By John Resig (MIT Licensed)
	Array.prototype.remove = function(array, from, to) {
		var rest = array.slice((to || from) + 1 || array.length);
		array.length = from < 0 ? array.length + from : from;
		return array.push.apply(array, rest);
	};


	//Mixing enumerable into Array.prototype
	$.extend(Array.prototype, Enumerable());

	var eventCallbacks = {};

	return {
		/**
		 * The subscribe method adds a function as an event listener.
		 *
		 * @name subscribe
		 * @methodOf EventBus#
		 *
		 * @param {String} event The event to listen to.
		 * @param {Function} callback The function to be called when the specified event
		 * is triggered.
		 */
		subscribe:function (event, callback, subscriber) {
			eventCallbacks[event] = eventCallbacks[event] || [];

			eventCallbacks[event].push ({
				subscriber: subscriber,
				callback:   callback
			});
		},

		/**
		 * The publish method calls all listeners attached to the specified event.
		 *
		 * @name publish
		 * @methodOf EventBus#
		 *
		 * @param {String} event The event to trigger.
		 */
		publish:function (event, payload/*payload is a record object*/) {
			var callbacks = eventCallbacks[event];
			if (callbacks && callbacks.length) {
				callbacks.forEach(function (elem) {
					elem.callback(elem.subscriber, payload);
				});
			}
		}
	};
}
