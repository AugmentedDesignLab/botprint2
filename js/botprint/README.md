## API Usage (MVC Style)

Since we watched the EventBus video tutorial at
http://tv.jetbrains.net/videocontent/gwt-event-bus-basics, then, for sake of
convenience, I am including the same example.

Note: callbacks are our controllers.

Let's start with out two views: Ping and Pong views. For this example, these
two views may look similar. This won't be the case in our botprint
applications; all views will be different.

## PingView

```JavaScript
function PingView(O) {
	var opts = {name: "Ping"};
	$.extend(opts, O || {});
	var self 	= {
		options: function(){
			return opts;
		}
	};
	// Mixing it in, just smash the methods of the newly created
	// View onto this object
	$.extend (self, View (opts));
	self.bind(
		"ping",
		/*this function is controller or event handler*/
		function(payload){
			console.log("Ping");
			console.log("....");
			self.bus().publish("pong", payload);
		}
	);

	return self;
}
```

## PongView

```JavaScript
function PongView(O){
	var opts = {name: "Pong"};
	$.extend(opts, O || {});
	var self 	= {
		options: function(){
			return opts;
		}
	};

	// Mixing it in, just smash the methods of the newly created
	// View onto this object
	$.extend (self, View (opts));
	self.bind(
		"pong",
		/*this function is controller or event handler*/
		function(payload){
			console.log("Pong");
			console.log("....");
			self.bus().publish("ping", payload);
		}
	);

	return self;
}
```

Now that we developed our views, let's show a simple test page showing the
typical API usage.

## Test page

```HTML
<html>
<head>
    <title>EventBus test</title>
</head>
<body>
<!-- loading of js scripts will go here -->
<script>
    var ebus     = EventBus();
    var options = {bus: ebus};
    var ping    = PingView(options);
    var pong    = PongView(options);
    ebus.publish("ping", /*payload*/{from:"Huascar", to:"Zhongpeng"});
</script>

</body>
</html>
```