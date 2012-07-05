/**
 * See http://strd6.com/2010/10/javascript-mixins/
 */
function Enumerable () {
	return {
		partition:function (iterator, context) {
			var trueCollection = [];
			var falseCollection = [];

			this.forEach (function (element) {
				if (iterator.call (context, element)) {
					trueCollection.push (element);
				} else {
					falseCollection.push (element);
				}
			});

			return [trueCollection, falseCollection];
		},

		reject:function (iterator, context) {
			return this.partition (iterator, context)[1];
		},

		shuffle:function () {
			var shuffledArray = [];

			this.each (function (element) {
				shuffledArray.splice (rand (shuffledArray.length + 1), 0, element);
			});

			return shuffledArray;
		}
	}
}