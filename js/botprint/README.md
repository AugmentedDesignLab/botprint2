# Event Based Communication
---
## Communication Paradigm
The event based communication is based on *bind*/*trigger* event to/from some `Bindable` object:

```JavaScript
bindableObj.bind(someEvent, handlerMethod);
bindableObj.trigger(someEvent, payload);
```

By default, each `Bindable` object has its own event bus. This means that the `bind` and `trigger` must be called on the same `Bindable` object in order to call the handler method on some event. For example, the handler method in the following code will not be called, because they are not on the same object:

```JavaScript
huascar.bind(someEvent, handlerMethod);
zhongpeng.trigger(someEvent, payload);
```

It is possible to share an event bus between different objects, so that a handler method can be called when an event is triggered from other objects than the one it is bound to. However, it is discouraged to do so.

###Best Practices

* Forget about event buses, let the `Bindable` objects take care of them under the hood.
* Always trigger events from the same object as the one the handler method is bound to.
* If different parts of the system need to communicate, let them share a `Bindable` objects, instead of sharing an event bus.

## Events
There are two categories of events in the system: `ApplicationEvents` and `UserEvents`. `UserEvents` are used by the views to notify the controllers when the views detect user inputs. `ApplicationEvents` are used by models  notify controllers when the models are changed.

# Model-View-Controller Architecture
---
The current architecture is a Model-View-Controller (MVC) architecture, which consists of:

* *Model*. Models are domain data and logic that are core to application. A model is also responsible for notifying controllers when it is changed. Such notification is made by triggering `ApplicationEvents` from a shared `Bindable` object, called `radio`. Model objects all extend `Model` class. Although model objects are all `Bindable`, handler methods bound to them may not be called, because most model objects are created on the fly and destroyed immediately.
* *View*. A view manages a UI element that provides a visual representation of models. The UI element is often stored in an attribute called `elem`. A view is also responsible for notifying controllers when any user input is received. In order to do that, a view object is often decorated by one or more decorators, such as `Draggable2D`, `Sketchable`. In those decorators, events from UI elements (`view.elem`) is handled by anonymous functions, in order to trigger corresponding `UserEvents`, with payload needed for later processing. Views extend `View` class, which is `Bindable`.
* *Controller*. Controllers are event handlers. They handler events from view (`UserEvents`), and modify models accordingly. They also handler events from models (`ApplicationEvents`), and update view to reflect the changes. Controllers are subclasses of `EventHandler`, inheriting the `enable` and `disable` methods. By default, the `enable` method will look at the event names in `appEvents` and `userEvents` instance variables of a controller, bind all `appEvents` to a shared `Bindable` object, and bind all `userEvents` to its view, assuming the handler methods are of the same name as the event they want to handle.


