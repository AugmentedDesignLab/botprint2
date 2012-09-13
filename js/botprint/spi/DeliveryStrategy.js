/**
 * A delivery strategy is a global function that handles how every message that passes
 * through the event bus will be delivered.
 *
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function DeliveryStrategy () {
	var eventCallbacks 	= {};

	/**
	 * constrols the consumptions of subscribers per event.
	 */
	var Queue = function(){
		var self = this;

		// initialise the queue and offset
		var queue  = [];
		var offset = 0;

		self.flush = function(){
			while(!self.isEmpty()){
				self.dequeue();
			}
		};

		/**
		 * @return the length of the queue.
		 */
		self.size = function(){

			// return the length of the queue
			return (queue.length - offset);

		};

		/**
		 * @return true if the queue is empty, and false otherwise.
		 */
		self.isEmpty = function(){

			// return whether the queue is empty
			return (queue.length == 0);

		};

		/**
		 * enqueues the specified item. The parameter is:
		 *
		 * @item - the item to enqueue
		 */
		self.enqueue = function(item){
			// enqueue the item
			queue.push(item);
			return item;
		};

		/**
		 * dequeues an item and returns it. If the queue is empty then undefined is
		 * returned.
		 */
		self.dequeue = function(){

			// if the queue is empty, return undefined
			if (queue.length == 0) return undefined;

			// store the item at the front of the queue
			var item = queue[offset];

			// increment the offset and remove the free space if necessary
			if (++ offset * 2 >= queue.length){
				queue  = queue.slice(offset);
				offset = 0;
			}

			// return the dequeued item
			return item;

		};

		/* Returns the item at the front of the queue (without dequeuing it). If the
		 * queue is empty then undefined is returned.
		 */
		self.peek = function(){

			// return the item at the front of the queue
			return (queue.length > 0 ? queue[offset] : undefined);

		}

	};

	// one entry queue, always, to determine which event is being handled.
	// whichever event is here has the priority to finalize its processing. everybody has to wait.
	// this works as long as everybody share the same event bus.
	var lock 		= new Queue();
	// next event in line to be processed.
	var nextInLine  = new Queue();


	return {
		checkin:function (event, eventCallback) {
			if(eventCallbacks[event]) {
				eventCallbacks[event].enqueue(eventCallback);
			} else {
				var queue = new Queue();
				queue.enqueue(eventCallback);
				eventCallbacks[event] = queue;
			}
		},

		checkout: function(event, eventCallback){
			var queue = eventCallbacks[event];
			if(queue){
				var inTheClub  = new Queue();
				while(!queue.isEmpty()){
					var each = queue.dequeue();
					if(each.subscriber != eventCallback.subscriber ||
					   each.callback != eventCallback.callback) {
						inTheClub.enqueue(each);
					}
				}

				eventCallbacks[event] = inTheClub;
			}
		},

		_acquireLock: function(event){
			if(lock.isEmpty()) {
				return lock.enqueue(event) != null;
			} else {
				return false;
			}
		},

		_processNextInLine: function(){
			lock.dequeue();
			var next = nextInLine.dequeue();
			if(next){
				this.onEvent(next.event, next.payload, next.completionCallback);
			}
		},

		onEvent:function (event, payload, completionCallback) {
			if(this._acquireLock(event)){
				var queue = eventCallbacks[event];
				if(queue){
					var processed  = new Queue();
					while(!queue.isEmpty()){
						var each = processed.enqueue(queue.dequeue());
						each.callback.call(each.subscriber || null, payload);
					}

					eventCallbacks[event] = processed; // this way we won't get rid of processed eventCallbacks
				}

				if(queue && completionCallback){ /*delivery complete callback*/
					completionCallback.call();
				}

				this._processNextInLine();
			} else {
				nextInLine.enqueue({
					event: event, payload: payload, completionCallback: completionCallback
					}
				);
			}
		}
	};

}

