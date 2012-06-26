/**
 * Bindable mixin.
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function Bindable (B) {
	var bus = B || EventBus();
	return {
		/**
		 * The bind method adds a function as an event listener.
		 *
		 * @name bind
		 * @methodOf View#
		 *
		 * @param {String} event The event to listen to.
		 * @param {Function} callback The function to be called when the specified event
		 * is triggered.
		 */
		bind:function (event, callback) {
			bus.subscribe(event, callback, this);
		},

		/**
		 * The trigger method calls all listeners attached to the specified event.
		 *
		 * @name trigger
		 * @methodOf View#
		 *
		 * @param {String} event The event to trigger.
		 */
		trigger:function (event, payload) {
			bus.publish(event, payload)
		}
	};
}