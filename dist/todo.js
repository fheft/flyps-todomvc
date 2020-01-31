(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.todo = {}));
}(this, function (exports) { 'use strict';

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      keys.push.apply(keys, Object.getOwnPropertySymbols(object));
    }

    if (enumerableOnly) keys = keys.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(source, true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(source).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  function _slicedToArray$1(arr, i) {
    return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _nonIterableRest$1();
  }

  function _toArray(arr) {
    return _arrayWithHoles$1(arr) || _iterableToArray$1(arr) || _nonIterableRest$1();
  }

  function _toConsumableArray$1(arr) {
    return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _nonIterableSpread$1();
  }

  function _arrayWithoutHoles$1(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _arrayWithHoles$1(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray$1(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _iterableToArrayLimit$1(arr, i) {
    if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
      return;
    }

    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableSpread$1() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function _nonIterableRest$1() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  /**
   * A signal is a container for state information that changes over time.
   * Signals can depend on other signals (inputs). By creating signals and putting
   * them together you build a circuit of signals. State changes will be
   * propagated through the signal circuit starting from the signal where the
   * state change happened. The state change might force dependant signals to also
   * change their state which then leads to state change propagation to their
   * dependant signals in the circuit and so on. The propagation stops as soon as
   * there are no more signals reacting to state changes.
   *
   * @module signal
   */

  /**
   * A Signal is a container used to store state information. A Signal can be made
   * to change state by calling `reset` or `update`.
   * Outputs can be connected to signals. Whenever the state of a Signal changes,
   * all connected outputs will be triggered.
   *
   * @typedef Signal
   */

  /**
   * Creates a new Signal.
   *
   * @param {*} state The initial state.
   * @returns {Signal} The created signal.
   */
  function signal(state) {
    var outputs = [];
    return {
      value: function value() {
        if (context) {
          context.inputs = context.inputs || [];

          if (!context.inputs.includes(this)) {
            context.inputs = [].concat(_toConsumableArray$1(context.inputs), [this]);
          }
        }

        return state;
      },
      reset: function reset(next) {
        var _this = this;

        var prev = state;
        state = next;

        if (prev !== next) {
          outputs.forEach(function (fn) {
            return fn(_this, prev, next);
          });
        }
      },
      update: function update(fn) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        this.reset(fn.call.apply(fn, [null, state].concat(args)));
      },
      connect: function connect(fn) {
        outputs = [].concat(_toConsumableArray$1(outputs), [fn]);

        var disconnect = function disconnect() {
          outputs = outputs.filter(function (s) {
            return s !== fn;
          });
        };

        return disconnect;
      }
    };
  }
  /**
   * A SignalFn is a signal that computes its state by running `fn`. It keeps
   * track of and connects to all referenced input signals during the function
   * call. If the state of any of the connected input signals changes, the state
   * of SignalFn gets re-computed (which means re-running `fn`). The state held by
   * the SignalFn is the return value of `fn` and can be preset using `state`.
   * Like with signals, outputs can be connected. Whenever the state of a SignalFn
   * changes, all connected outputs will be triggered.
   *
   * @typedef SignalFn
   */

  /**
   * Creates a new SignalFn.
   *
   * @param {function} fn The initial state
   * @param {*} state The initial state
   * @returns {SignalFn} The created signal.
   */

  function signalFn(fn, state) {
    var _inputs = [];
    var outputs = [];
    var disconnectors = new WeakMap();
    var freeWatchers = [];
    var _dirty = true;
    return {
      value: function value() {
        if (context) {
          context.inputs = context.inputs || [];

          if (!context.inputs.includes(this)) {
            context.inputs = [].concat(_toConsumableArray$1(context.inputs), [this]);
          }
        }

        if (_dirty) {
          this.run();
        }

        return state;
      },
      run: function run() {
        var _this2 = this;

        var _trackInputs = trackInputs(fn),
            _trackInputs2 = _slicedToArray$1(_trackInputs, 2),
            context = _trackInputs2[0],
            next = _trackInputs2[1];

        _dirty = false;
        var trackedInputs = context.inputs || [];
        var connectingInputs = arrayDiff(trackedInputs, _inputs);
        var disconnectingInputs = arrayDiff(_inputs, trackedInputs);
        _inputs = _toConsumableArray$1(trackedInputs);
        connectingInputs.forEach(function (s) {
          var disconnect = s.connect(_this2.strobe.bind(_this2));
          disconnectors.set(s, disconnect);
        });
        disconnectingInputs.forEach(function (s) {
          var disconnect = disconnectors.get(s);
          disconnectors["delete"](s);
          disconnect();
        });
        var prev = state;
        state = next;

        if (prev !== next) {
          outputs.forEach(function (fn) {
            return fn(_this2, prev, next);
          });
        }
      },
      dirty: function dirty() {
        return _dirty;
      },
      strobe: function strobe() {
        _dirty = true;
        this.run();
      },
      connect: function connect(fn) {
        var _this3 = this;

        if (_dirty) {
          this.run();
        }

        outputs = [].concat(_toConsumableArray$1(outputs), [fn]);

        var disconnect = function disconnect() {
          outputs = outputs.filter(function (s) {
            return s !== fn;
          });

          if (outputs.length === 0) {
            _this3.free();
          }
        };

        return disconnect;
      },
      free: function free() {
        _inputs.forEach(function (s) {
          var disconnect = disconnectors.get(s);
          disconnectors["delete"](s);
          disconnect();
        });

        _inputs = [];
        _dirty = true;
        state = undefined;
        freeWatchers.forEach(function (fn) {
          return fn();
        });
        freeWatchers = [];
      },
      onFree: function onFree(fn) {
        freeWatchers = [].concat(_toConsumableArray$1(freeWatchers), [fn]);
      },
      inputs: function inputs() {
        if (_dirty) {
          this.run();
        }

        return _toConsumableArray$1(_inputs);
      }
    };
  }
  /**
   * Holds the current, global context for a signalFn. A context urges referenced
   * signals to register as input signals. signalFns can therefore use a context
   * for tracking and book keeping of referenced input signals.
   */

  var context = undefined;
  /**
   * Tracks all referenced signals while running `fn` by setting a new global
   * context. The return value is a tuple of the used context and return value of
   * `fn`. After running `fn`, the previous context gets restored.
   *
   * @param {function} fn
   * @returns {Array} An array that contains the context with information about
   *    the tracked input signals and the return value of `fn`.
   */

  function trackInputs(fn) {
    var prevContext = context;
    context = {};
    var res = [context, fn()];
    context = prevContext;
    return res;
  }

  function arrayDiff(arr, other) {
    return arr.filter(function (v) {
      return other.indexOf(v) < 0;
    });
  }

  /**
   * A connector is a helper to simplify building signal circuits. Connectors
   * give access to signals. By providing a connectors identifier it's possible
   * to connect to a specific signal without the need of explicit interconnections
   * in your code (loose coupling). Connectors can be created by passing a
   * function that returns a connectors state. The connector will then take care
   * of the signal creation and lifetime management for you.
   *
   * @module connector
   */

  /** Holds the registered connectors. */

  var registry = new Map();
  /** Holds the created signals. */

  var signalCache = new Map();

  function cacheAndReturn(connectorId, signal) {
    // remove freed signals from the cache
    signal.onFree(function () {
      return signalCache["delete"](connectorId);
    });
    signalCache.set(connectorId, signal);
    return signal;
  }
  /**
   * Returns a new function that calls `fn` with a list of values extracted from
   * the provided signals returned by `inputsFn`. Arguments passed to the returned
   * function are transparently passed to `fn`. `inputsFn` is a function that
   * returns one or many input signals.
   *
   * @param {function} inputsFn A function returning input signals.
   * @param {function} fn A function expecting input signals as first argument.
   * @returns {function} A new function that applies the signal values extracted
   *    from `signalFn` together with the provided arguments to the original `fn`.
   *
   * @example
   *
   *  let fn = withInputSignals(
   *    () => signal("foo"),
   *    (s, arg) => s + arg,
   *  );
   *  fn("bar"); // => "foobar"
   *
   *  let fn = withInputSignals(
   *    () => [signal("foo"), signal("bar")],
   *    ([s1, s2], arg) => s1 + s2 + arg,
   *  );
   *  fn("baz"); // => "foobarbaz"
   */


  function withInputSignals(inputsFn, fn) {
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var inputs = inputsFn.apply(void 0, args);
      var values = Array.isArray(inputs) ? inputs.map(function (s) {
        return s.value();
      }) : inputs.value();
      return fn.apply(void 0, [values].concat(args));
    };
  }
  /**
   * Connects to the connector identified by `connectorId`. As a result, a signal
   * is returned which can then be used to access a stream of values reactively
   * changing over time.
   *
   * Note: for any given call to `connect` there must be a previous call to
   * `connector`, registering a computation function for `connectorId`.
   *
   * @param {string} connectorId The connector identifier.
   * @returns {Signal} The connector signal.
   */

  function connect(connectorId) {
    if (signalCache.has(connectorId)) {
      return signalCache.get(connectorId);
    }

    var connectorFn = registry.get(connectorId);

    if (connectorFn) {
      return cacheAndReturn(connectorId, connectorFn(connectorId));
    }

    console.warn("no connector registered for:", connectorId);
  }
  /**
   * Registers a connector identified by `connectorId`.
   *
   * The computation function is wrapped inside a signal, therefore the connector
   * re-computes whenever a state change in any referenced input signal gets
   * detected.
   *
   * @param {string} connectorId A connector identifier
   * @param {function} computationFn A function which gets passed one argument,
   *    `connectorId` and must return the connectors state.
   *
   * @example
   *
   *  let s = signal("foo");
   *  connector("myConnector",
   *    withInputSignals(
   *      () => s
   *      input => input + "bar"
   *    )
   *  );
   *
   *  connect("myConnector").value() // => "foobar"
   */

  function connector(connectorId, computationFn) {
    rawConnector(connectorId, function (connectorId) {
      return signalFn(function () {
        return computationFn(connectorId);
      });
    });
  }
  /**
   * Registers a raw connector identified by `connectorId`.
   *
   * @param {string} connectorId A connector identifier
   * @param {function} connectorFn A function which gets one argument,
   *    `connectorId` and must return a `signalFn`.
   *
   * @example
   *
   *  let s = signal("foo");
   *  rawConnector("myConnector", () => s)
   *
   *  connect("myConnector").value() // => "foo"
   */

  function rawConnector(connectorId, connectorFn) {
    if (signalCache.has(connectorId)) {
      signalCache["delete"](connectorId);
    }

    if (registry.has(connectorId)) {
      console.warn("overwriting connector for", connectorId);
    }

    registry.set(connectorId, connectorFn);
  }

  /**
   * Unlike an effect, a cause does not mutate but extracts state from the world.
   * By providing a cause identifier the registered cause handler gets called and
   * must return the requested state. A cause can be anything, e.g. the current
   * state of a `signal`, the current time or a browsers window dimensions, just
   * to give some examples.
   *
   * @module cause
   */

  /** Holds the registered causings. */
  var registry$1 = new Map();
  /**
   * Registers a cause handler identified by `causeId`.
   *
   * @param {string} causeId A cause identifier.
   * @param {function} handlerFn A function which gets passed the arguments from
   *    the call to `cause`.
   */

  function causing(causeId, handlerFn) {
    if (registry$1.has(causeId)) {
      console.warn("overwriting causing for", causeId);
    }

    registry$1.set(causeId, handlerFn);
  }
  /**
   * Calls the cause handler identified by `causeId` with the provided `args`.
   *
   * Note: for any given call to `cause` there must be a previous call to
   * `causing`, registering a handler function for `causeId`.
   *
   * @param {string} causeId The cause identifier.
   * @param  {...any} args Arguments passed to the cause handler.
   */

  function cause(causeId) {
    var handlerFn = registry$1.get(causeId);

    if (handlerFn) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return handlerFn.apply(void 0, args);
    }

    console.warn("no causing registered for:", causeId);
  }

  /**
   * A signal storing the state of a database.
   */

  var db = signal({});

  function queue() {
    var nextTick = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.requestAnimationFrame;
    var queue = [];
    var scheduled = false;
    return {
      enqueue: function enqueue(fn) {
        queue.push(fn);
        this.schedule();
      },
      flush: function flush() {
        scheduled = false;

        var fns = _toConsumableArray$1(queue);

        queue = [];
        fns.forEach(function (fn) {
          return fn();
        });
      },
      schedule: function schedule() {
        if (!scheduled) {
          scheduled = true;
          nextTick(this.flush);
        }
      },
      tickFn: function tickFn(fn) {
        nextTick = fn;
      }
    };
  }

  /**
   * The dom module helps to connect view functions with signal circuits. A view
   * can be mounted by passing a function that returns a views representation.
   * mount/unmount will then take care of the signal creation and lifetime
   * management for you. Also, mount/unmount helps in doing the necessary
   * side-effects to the DOM by calling the provided `patchFn` (mount) and
   * `cleanupFn` (unmount). The goal is to provide a simple interface consisting
   * of these two functions but perform optimized rendering based on signals.
   *
   * @module dom
   */

  var renderQueue = queue();
  /**
   * Mounts the result of `viewFn` as a replacement of `root`.
   *
   * The view function is wrapped inside a signal, therefore the view re-computes
   * whenever a state change in any referenced input signal gets detected.
   *
   * As `mount` only tries to make minimal assumptions on how the DOM gets patched
   * a `patchFn` and `cleanupFn` must be provided. What a view function returns
   * is up to the user but must be understood by the patch function. Whenever the
   * result of `viewFn` changes, `patchFn` gets called with the last result from
   * `patchFn` as the first argument (`root` on first call) and the result from
   * `viewFn` as the second argument. The patch function must ensure that the DOM
   * gets updated accordingly. On unmount, the `cleanupFn` gets called with the
   * last result from `patchFn` and must ensure the previously mounted DOM node
   * gets removed from the DOM.
   *
   * @param {DOMNode} root The root DOM node.
   * @param {function} viewFn The view function.
   * @param {function} patchFn The patch function.
   * @param {function} [cleanupFn] The cleanup function.
   * @returns {function} A function to unmount the mounted view from the DOM.
   *
   * @example
   *
   * function htmlToElement(html) {
   *   let template = document.createElement('template');
   *   template.innerHTML = html;
   *   return template.content.firstChild;
   * }
   *
   * // Mount with a really simple patch function that creates new elements from
   * // text. Note: This solution is _very_ limited and is only used for
   * // demonstration purposes.
   * mount(document.querySelector("#my-view"),
   *   () => "<h1>Hello World!</h1>",
   *   (prev, next) => {
   *     let el = htmlToElement(next);
   *     prev.parentNode.replaceChild(el, prev);
   *     return el;
   *   },
   *   prev => {
   *     return prev.parentNode.removeChild(el);
   *   }
   * );
   */

  function mount(root, viewFn, patchFn) {
    var cleanupFn = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};
    var s = signalFn(viewFn);
    var dirty = true;

    var render = function render() {
      if (dirty) {
        root = patchFn(root, s.value());
        dirty = false;
      }
    };

    render();
    var disconnect = s.connect(function () {
      dirty = true;
      renderQueue.enqueue(render);
    });
    return function () {
      disconnect();
      return cleanupFn(root);
    };
  }

  /**
   * An effector is the place where all the dirty stuff happens. By providing an
   * effects identifier the registered effect handler gets called and must do the
   * required mutations to the world. This can be anything, e.g. reset a
   * `signal`s state, `trigger` events, change the browsers state (e.g. updating a
   * scrollbars position) or doing xhrs, just to give some examples.
   *
   * @module effect
   */

  /** Holds the registered effectors. */
  var registry$2 = new Map();
  /**
   * Registers an effect handler identified by `effectId`.
   *
   * @param {string} effectId An effect identifier.
   * @param {function} handlerFn A function which gets passed the arguments from
   *    the call to `effect`.
   */

  function effector(effectId, handlerFn) {
    if (registry$2.has(effectId)) {
      console.warn("overwriting effector for", effectId);
    }

    registry$2.set(effectId, handlerFn);
  }
  /**
   * Calls the effect handler identified by `effectId` with the provided `args`.
   *
   * Note: for any given call to `effect` there must be a previous call to
   * `effector`, registering a handler function for `effectId`.
   *
   * @param {string} effectId The effect identifier.
   * @param  {...any} args Arguments passed to the effect handler.
   */

  function effect(effectId) {
    var handlerFn = registry$2.get(effectId);

    if (handlerFn) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      handlerFn.apply(void 0, args);
      return;
    }

    console.warn("no effector registered for:", effectId);
  }

  /**
   * The event module provides machanisms to trigger and handle the happening of
   * events. Raw event handlers are based on reading from and writing to contexts.
   * On top of the provided event contexts there is the concept of an event
   * handler having causes and describing effects. Therefore, an event handler is
   * a pure function that doesn't perform changes but describes them.
   *
   * @module event
   */

  /** Holds the registered event handlers. */

  var registry$3 = new Map();
  /**
   * The event queue scheduling is done at timeouts, without being synchronized
   * to vertical sync or repaints. Since this is being scheduled in the browser
   * main event loop, users should avoid stacking too slow blocking operations
   * in the event handlers.
   */

  var eventQueue = queue(function (fn) {
    return setTimeout(fn, 16);
  });
  /**
   * Registers an event handler identified by `eventId`.
   *
   * The event handler gets called whenever an event with the provided `eventId`
   * gets triggered. It will receive a map of causes related to the event and must
   * return a map which describes the resulting effects. The resulting effects are
   * then performed by specific effect handlers. Interceptors can be added to
   * perform additional actions based on the resulting context.
   *
   * @param {string} eventId An event identifier.
   * @param {function} handlerFn A function which gets passed causes of the event
   *    and must return a map of effects that should be performed.
   * @param {function[]} interceptors A list of interceptor functions.
   *
   * @see {@link event.effectsInterceptor} for an interceptor example.
   */

  function handler(eventId, handlerFn) {
    var interceptors = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    return rawHandler(eventId, function (context) {
      var _context$causes$event = _slicedToArray$1(context.causes.event, 2),
          eventId = _context$causes$event[0],
          args = _context$causes$event[1];

      context.effects = handlerFn.apply(void 0, [context.causes, eventId].concat(_toConsumableArray$1(args)));
      return context;
    }, [injectCause("db"), effectsInterceptor].concat(_toConsumableArray$1(interceptors)));
  }
  /**
   * Registers a raw event handler identified by `eventId`.
   *
   * The event handler gets called whenever an event with the provided `eventId`
   * gets triggered. It will receive a context related to the event and must
   * return a (modified) context. Interceptors can be added to actually perform
   * actions based on the resulting context.
   *
   * @param {string} eventId An event identifier.
   * @param {function} handlerFn A function which gets passed a context describing
   *    the causes of the event and modifies the context.
   * @param {function[]} interceptors A list of interceptor functions.
   *
   * @see {@link event.effectsInterceptor} for an interceptor example.
   */

  function rawHandler(eventId, handlerFn) {
    var interceptors = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    interceptors.reverse();
    var handlerChain = interceptors.reduce(function (handler, interceptor) {
      return interceptor(handler);
    }, handlerFn);

    var handler = function handler(eventId) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var context = {
        causes: {
          event: [eventId, args]
        }
      };
      return handlerChain(context);
    };

    if (registry$3.has(eventId)) {
      console.warn("overwriting handler for", eventId);
    }

    registry$3.set(eventId, handler);
    return handler;
  }
  /**
   * Enqueues an event for processing. Processing will not happen immediately, but
   * on the next tick after all previously triggered events were handled.
   *
   * @param {string} eventId The event identifier.
   * @param  {...any} args Additional arguments describing the event.
   */

  function trigger(eventId) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    eventQueue.enqueue(function () {
      return handle.apply(void 0, [eventId].concat(args));
    });
  }
  /**
   * Triggers an event immediately without queueing.
   *
   * @param {string} eventId The event identifier.
   * @param  {...any} args Additional arguments describing the event.
   */

  function triggerImmediately(eventId) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }

    handle.apply(void 0, [eventId].concat(args));
  }
  /**
   * Creates an interceptor which injects the cause identified by `causeId` into
   * the contexts causes.
   */

  function injectCause(causeId) {
    for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4];
    }

    return function (nextFn) {
      return function (context) {
        context.causes[causeId] = cause.apply(void 0, [causeId].concat(args));
        return nextFn(context);
      };
    };
  }
  /**
   * An interceptor which calls the corresponding effect handler for each
   * described effect in `context.effects`.
   */

  function effectsInterceptor(nextFn) {
    return function (context) {
      context = nextFn(context);

      for (var effectId in context.effects) {
        effect(effectId, context.effects[effectId]);
      }

      return context;
    };
  }

  function handle(eventId) {
    var handlerFn = registry$3.get(eventId);

    if (handlerFn) {
      for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        args[_key5 - 1] = arguments[_key5];
      }

      return handlerFn.apply(void 0, [eventId].concat(args));
    }

    console.warn("no handler registered for:", eventId);
  }

  /**
   * Cause that returns the state of the database signal.
   *
   * @see {@link db}
   */

  causing("db", function () {
    return db.value();
  });
  /**
   * Connector that connects to the database state.
   *
   * @see {@link db}
   */

  connector("db", function () {
    return db.value();
  });
  /**
   * Cause that returns the current time.
   */

  causing("now", function () {
    return Date.now();
  });
  /**
   * Effect that resets the state of the database signal to a new value.
   *
   * @see {@link db}
   *
   * @example
   *
   * {
   *   db: { ...db, some: "value" }
   * }
   */

  effector("db", function (updatedDb) {
    return db.reset(updatedDb);
  });
  /**
   * Effect that triggers an event with args.
   *
   * @example
   *
   * {
   *   trigger: ["event-id", "arg1", "arg2"]
   * }
   */

  effector("trigger", function (_ref) {
    var _ref2 = _toArray(_ref),
        eventId = _ref2[0],
        args = _ref2.slice(1);

    return trigger.apply(void 0, [eventId].concat(_toConsumableArray$1(args)));
  });
  var STATUS_OK = 200;
  var STATUS_CREATED = 201;
  var STATUS_ACCEPTED = 202;
  var STATUS_NO_CONTENT = 204;
  var STATUS_PARTIAL_CONTENT = 206;
  var STATUS_NOT_MODIFIED = 304;
  /**
   * Effect that performs an XML HTTP request to interact with a server.
   *
   * @example
   *
   * {
   *   xhr: {
   *     url: "/endpoint",
   *     method: "GET",
   *     onSuccess: ["success"]
   *   }
   * }
   */

  effector("xhr", function (_ref3) {
    var url = _ref3.url,
        _ref3$method = _ref3.method,
        method = _ref3$method === void 0 ? "GET" : _ref3$method,
        _ref3$responseType = _ref3.responseType,
        responseType = _ref3$responseType === void 0 ? "" : _ref3$responseType,
        _ref3$timeout = _ref3.timeout,
        timeout = _ref3$timeout === void 0 ? 3000 : _ref3$timeout,
        _ref3$headers = _ref3.headers,
        headers = _ref3$headers === void 0 ? {} : _ref3$headers,
        data = _ref3.data,
        onSuccess = _ref3.onSuccess,
        onError = _ref3.onError;
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = responseType;
    xhr.timeout = timeout;

    for (var name in headers) {
      xhr.setRequestHeader(name, headers[name]);
    }

    xhr.onloadend = function () {
      switch (this.status) {
        case STATUS_OK:
        case STATUS_CREATED:
        case STATUS_ACCEPTED:
        case STATUS_NO_CONTENT:
        case STATUS_PARTIAL_CONTENT:
        case STATUS_NOT_MODIFIED:
          if (onSuccess) {
            trigger.apply(void 0, _toConsumableArray$1(onSuccess).concat([this.response]));
          }

          break;

        default:
          if (onError) {
            trigger.apply(void 0, _toConsumableArray$1(onError).concat([{
              status: this.status,
              statusText: this.statusText,
              response: this.response
            }]));
          }

      }
    };

    xhr.send(data);
  });
  //# sourceMappingURL=flyps.esm.js.map

  function vnode(sel, data, children, text, elm) {
      var key = data === undefined ? undefined : data.key;
      return { sel: sel, data: data, children: children,
          text: text, elm: elm, key: key };
  }
  //# sourceMappingURL=vnode.js.map

  var array = Array.isArray;
  function primitive(s) {
      return typeof s === 'string' || typeof s === 'number';
  }
  //# sourceMappingURL=is.js.map

  function createElement(tagName) {
      return document.createElement(tagName);
  }
  function createElementNS(namespaceURI, qualifiedName) {
      return document.createElementNS(namespaceURI, qualifiedName);
  }
  function createTextNode(text) {
      return document.createTextNode(text);
  }
  function createComment(text) {
      return document.createComment(text);
  }
  function insertBefore(parentNode, newNode, referenceNode) {
      parentNode.insertBefore(newNode, referenceNode);
  }
  function removeChild(node, child) {
      node.removeChild(child);
  }
  function appendChild(node, child) {
      node.appendChild(child);
  }
  function parentNode(node) {
      return node.parentNode;
  }
  function nextSibling(node) {
      return node.nextSibling;
  }
  function tagName(elm) {
      return elm.tagName;
  }
  function setTextContent(node, text) {
      node.textContent = text;
  }
  function getTextContent(node) {
      return node.textContent;
  }
  function isElement(node) {
      return node.nodeType === 1;
  }
  function isText(node) {
      return node.nodeType === 3;
  }
  function isComment(node) {
      return node.nodeType === 8;
  }
  var htmlDomApi = {
      createElement: createElement,
      createElementNS: createElementNS,
      createTextNode: createTextNode,
      createComment: createComment,
      insertBefore: insertBefore,
      removeChild: removeChild,
      appendChild: appendChild,
      parentNode: parentNode,
      nextSibling: nextSibling,
      tagName: tagName,
      setTextContent: setTextContent,
      getTextContent: getTextContent,
      isElement: isElement,
      isText: isText,
      isComment: isComment,
  };
  //# sourceMappingURL=htmldomapi.js.map

  function isUndef(s) { return s === undefined; }
  function isDef(s) { return s !== undefined; }
  var emptyNode = vnode('', {}, [], undefined, undefined);
  function sameVnode(vnode1, vnode2) {
      return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
  }
  function isVnode(vnode) {
      return vnode.sel !== undefined;
  }
  function createKeyToOldIdx(children, beginIdx, endIdx) {
      var i, map = {}, key, ch;
      for (i = beginIdx; i <= endIdx; ++i) {
          ch = children[i];
          if (ch != null) {
              key = ch.key;
              if (key !== undefined)
                  map[key] = i;
          }
      }
      return map;
  }
  var hooks = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];
  function init(modules, domApi) {
      var i, j, cbs = {};
      var api = domApi !== undefined ? domApi : htmlDomApi;
      for (i = 0; i < hooks.length; ++i) {
          cbs[hooks[i]] = [];
          for (j = 0; j < modules.length; ++j) {
              var hook = modules[j][hooks[i]];
              if (hook !== undefined) {
                  cbs[hooks[i]].push(hook);
              }
          }
      }
      function emptyNodeAt(elm) {
          var id = elm.id ? '#' + elm.id : '';
          var c = elm.className ? '.' + elm.className.split(' ').join('.') : '';
          return vnode(api.tagName(elm).toLowerCase() + id + c, {}, [], undefined, elm);
      }
      function createRmCb(childElm, listeners) {
          return function rmCb() {
              if (--listeners === 0) {
                  var parent_1 = api.parentNode(childElm);
                  api.removeChild(parent_1, childElm);
              }
          };
      }
      function createElm(vnode, insertedVnodeQueue) {
          var i, data = vnode.data;
          if (data !== undefined) {
              if (isDef(i = data.hook) && isDef(i = i.init)) {
                  i(vnode);
                  data = vnode.data;
              }
          }
          var children = vnode.children, sel = vnode.sel;
          if (sel === '!') {
              if (isUndef(vnode.text)) {
                  vnode.text = '';
              }
              vnode.elm = api.createComment(vnode.text);
          }
          else if (sel !== undefined) {
              // Parse selector
              var hashIdx = sel.indexOf('#');
              var dotIdx = sel.indexOf('.', hashIdx);
              var hash = hashIdx > 0 ? hashIdx : sel.length;
              var dot = dotIdx > 0 ? dotIdx : sel.length;
              var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
              var elm = vnode.elm = isDef(data) && isDef(i = data.ns) ? api.createElementNS(i, tag)
                  : api.createElement(tag);
              if (hash < dot)
                  elm.setAttribute('id', sel.slice(hash + 1, dot));
              if (dotIdx > 0)
                  elm.setAttribute('class', sel.slice(dot + 1).replace(/\./g, ' '));
              for (i = 0; i < cbs.create.length; ++i)
                  cbs.create[i](emptyNode, vnode);
              if (array(children)) {
                  for (i = 0; i < children.length; ++i) {
                      var ch = children[i];
                      if (ch != null) {
                          api.appendChild(elm, createElm(ch, insertedVnodeQueue));
                      }
                  }
              }
              else if (primitive(vnode.text)) {
                  api.appendChild(elm, api.createTextNode(vnode.text));
              }
              i = vnode.data.hook; // Reuse variable
              if (isDef(i)) {
                  if (i.create)
                      i.create(emptyNode, vnode);
                  if (i.insert)
                      insertedVnodeQueue.push(vnode);
              }
          }
          else {
              vnode.elm = api.createTextNode(vnode.text);
          }
          return vnode.elm;
      }
      function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
          for (; startIdx <= endIdx; ++startIdx) {
              var ch = vnodes[startIdx];
              if (ch != null) {
                  api.insertBefore(parentElm, createElm(ch, insertedVnodeQueue), before);
              }
          }
      }
      function invokeDestroyHook(vnode) {
          var i, j, data = vnode.data;
          if (data !== undefined) {
              if (isDef(i = data.hook) && isDef(i = i.destroy))
                  i(vnode);
              for (i = 0; i < cbs.destroy.length; ++i)
                  cbs.destroy[i](vnode);
              if (vnode.children !== undefined) {
                  for (j = 0; j < vnode.children.length; ++j) {
                      i = vnode.children[j];
                      if (i != null && typeof i !== "string") {
                          invokeDestroyHook(i);
                      }
                  }
              }
          }
      }
      function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
          for (; startIdx <= endIdx; ++startIdx) {
              var i_1 = void 0, listeners = void 0, rm = void 0, ch = vnodes[startIdx];
              if (ch != null) {
                  if (isDef(ch.sel)) {
                      invokeDestroyHook(ch);
                      listeners = cbs.remove.length + 1;
                      rm = createRmCb(ch.elm, listeners);
                      for (i_1 = 0; i_1 < cbs.remove.length; ++i_1)
                          cbs.remove[i_1](ch, rm);
                      if (isDef(i_1 = ch.data) && isDef(i_1 = i_1.hook) && isDef(i_1 = i_1.remove)) {
                          i_1(ch, rm);
                      }
                      else {
                          rm();
                      }
                  }
                  else {
                      api.removeChild(parentElm, ch.elm);
                  }
              }
          }
      }
      function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
          var oldStartIdx = 0, newStartIdx = 0;
          var oldEndIdx = oldCh.length - 1;
          var oldStartVnode = oldCh[0];
          var oldEndVnode = oldCh[oldEndIdx];
          var newEndIdx = newCh.length - 1;
          var newStartVnode = newCh[0];
          var newEndVnode = newCh[newEndIdx];
          var oldKeyToIdx;
          var idxInOld;
          var elmToMove;
          var before;
          while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
              if (oldStartVnode == null) {
                  oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
              }
              else if (oldEndVnode == null) {
                  oldEndVnode = oldCh[--oldEndIdx];
              }
              else if (newStartVnode == null) {
                  newStartVnode = newCh[++newStartIdx];
              }
              else if (newEndVnode == null) {
                  newEndVnode = newCh[--newEndIdx];
              }
              else if (sameVnode(oldStartVnode, newStartVnode)) {
                  patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
                  oldStartVnode = oldCh[++oldStartIdx];
                  newStartVnode = newCh[++newStartIdx];
              }
              else if (sameVnode(oldEndVnode, newEndVnode)) {
                  patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
                  oldEndVnode = oldCh[--oldEndIdx];
                  newEndVnode = newCh[--newEndIdx];
              }
              else if (sameVnode(oldStartVnode, newEndVnode)) {
                  patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
                  api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
                  oldStartVnode = oldCh[++oldStartIdx];
                  newEndVnode = newCh[--newEndIdx];
              }
              else if (sameVnode(oldEndVnode, newStartVnode)) {
                  patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
                  api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
                  oldEndVnode = oldCh[--oldEndIdx];
                  newStartVnode = newCh[++newStartIdx];
              }
              else {
                  if (oldKeyToIdx === undefined) {
                      oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
                  }
                  idxInOld = oldKeyToIdx[newStartVnode.key];
                  if (isUndef(idxInOld)) {
                      api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
                      newStartVnode = newCh[++newStartIdx];
                  }
                  else {
                      elmToMove = oldCh[idxInOld];
                      if (elmToMove.sel !== newStartVnode.sel) {
                          api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
                      }
                      else {
                          patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
                          oldCh[idxInOld] = undefined;
                          api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
                      }
                      newStartVnode = newCh[++newStartIdx];
                  }
              }
          }
          if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
              if (oldStartIdx > oldEndIdx) {
                  before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
                  addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
              }
              else {
                  removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
              }
          }
      }
      function patchVnode(oldVnode, vnode, insertedVnodeQueue) {
          var i, hook;
          if (isDef(i = vnode.data) && isDef(hook = i.hook) && isDef(i = hook.prepatch)) {
              i(oldVnode, vnode);
          }
          var elm = vnode.elm = oldVnode.elm;
          var oldCh = oldVnode.children;
          var ch = vnode.children;
          if (oldVnode === vnode)
              return;
          if (vnode.data !== undefined) {
              for (i = 0; i < cbs.update.length; ++i)
                  cbs.update[i](oldVnode, vnode);
              i = vnode.data.hook;
              if (isDef(i) && isDef(i = i.update))
                  i(oldVnode, vnode);
          }
          if (isUndef(vnode.text)) {
              if (isDef(oldCh) && isDef(ch)) {
                  if (oldCh !== ch)
                      updateChildren(elm, oldCh, ch, insertedVnodeQueue);
              }
              else if (isDef(ch)) {
                  if (isDef(oldVnode.text))
                      api.setTextContent(elm, '');
                  addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
              }
              else if (isDef(oldCh)) {
                  removeVnodes(elm, oldCh, 0, oldCh.length - 1);
              }
              else if (isDef(oldVnode.text)) {
                  api.setTextContent(elm, '');
              }
          }
          else if (oldVnode.text !== vnode.text) {
              if (isDef(oldCh)) {
                  removeVnodes(elm, oldCh, 0, oldCh.length - 1);
              }
              api.setTextContent(elm, vnode.text);
          }
          if (isDef(hook) && isDef(i = hook.postpatch)) {
              i(oldVnode, vnode);
          }
      }
      return function patch(oldVnode, vnode) {
          var i, elm, parent;
          var insertedVnodeQueue = [];
          for (i = 0; i < cbs.pre.length; ++i)
              cbs.pre[i]();
          if (!isVnode(oldVnode)) {
              oldVnode = emptyNodeAt(oldVnode);
          }
          if (sameVnode(oldVnode, vnode)) {
              patchVnode(oldVnode, vnode, insertedVnodeQueue);
          }
          else {
              elm = oldVnode.elm;
              parent = api.parentNode(elm);
              createElm(vnode, insertedVnodeQueue);
              if (parent !== null) {
                  api.insertBefore(parent, vnode.elm, api.nextSibling(elm));
                  removeVnodes(parent, [oldVnode], 0, 0);
              }
          }
          for (i = 0; i < insertedVnodeQueue.length; ++i) {
              insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
          }
          for (i = 0; i < cbs.post.length; ++i)
              cbs.post[i]();
          return vnode;
      };
  }
  //# sourceMappingURL=snabbdom.js.map

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var attributes = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  var xlinkNS = 'http://www.w3.org/1999/xlink';
  var xmlNS = 'http://www.w3.org/XML/1998/namespace';
  var colonChar = 58;
  var xChar = 120;
  function updateAttrs(oldVnode, vnode) {
      var key, elm = vnode.elm, oldAttrs = oldVnode.data.attrs, attrs = vnode.data.attrs;
      if (!oldAttrs && !attrs)
          return;
      if (oldAttrs === attrs)
          return;
      oldAttrs = oldAttrs || {};
      attrs = attrs || {};
      // update modified attributes, add new attributes
      for (key in attrs) {
          var cur = attrs[key];
          var old = oldAttrs[key];
          if (old !== cur) {
              if (cur === true) {
                  elm.setAttribute(key, "");
              }
              else if (cur === false) {
                  elm.removeAttribute(key);
              }
              else {
                  if (key.charCodeAt(0) !== xChar) {
                      elm.setAttribute(key, cur);
                  }
                  else if (key.charCodeAt(3) === colonChar) {
                      // Assume xml namespace
                      elm.setAttributeNS(xmlNS, key, cur);
                  }
                  else if (key.charCodeAt(5) === colonChar) {
                      // Assume xlink namespace
                      elm.setAttributeNS(xlinkNS, key, cur);
                  }
                  else {
                      elm.setAttribute(key, cur);
                  }
              }
          }
      }
      // remove removed attributes
      // use `in` operator since the previous `for` iteration uses it (.i.e. add even attributes with undefined value)
      // the other option is to remove all attributes with value == undefined
      for (key in oldAttrs) {
          if (!(key in attrs)) {
              elm.removeAttribute(key);
          }
      }
  }
  exports.attributesModule = { create: updateAttrs, update: updateAttrs };
  exports.default = exports.attributesModule;
  //# sourceMappingURL=attributes.js.map
  });

  var attrs = unwrapExports(attributes);
  var attributes_1 = attributes.attributesModule;

  var _class = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  function updateClass(oldVnode, vnode) {
      var cur, name, elm = vnode.elm, oldClass = oldVnode.data.class, klass = vnode.data.class;
      if (!oldClass && !klass)
          return;
      if (oldClass === klass)
          return;
      oldClass = oldClass || {};
      klass = klass || {};
      for (name in oldClass) {
          if (!klass[name]) {
              elm.classList.remove(name);
          }
      }
      for (name in klass) {
          cur = klass[name];
          if (cur !== oldClass[name]) {
              elm.classList[cur ? 'add' : 'remove'](name);
          }
      }
  }
  exports.classModule = { create: updateClass, update: updateClass };
  exports.default = exports.classModule;
  //# sourceMappingURL=class.js.map
  });

  var cls = unwrapExports(_class);
  var _class_1 = _class.classModule;

  var eventlisteners = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  function invokeHandler(handler, vnode, event) {
      if (typeof handler === "function") {
          // call function handler
          handler.call(vnode, event, vnode);
      }
      else if (typeof handler === "object") {
          // call handler with arguments
          if (typeof handler[0] === "function") {
              // special case for single argument for performance
              if (handler.length === 2) {
                  handler[0].call(vnode, handler[1], event, vnode);
              }
              else {
                  var args = handler.slice(1);
                  args.push(event);
                  args.push(vnode);
                  handler[0].apply(vnode, args);
              }
          }
          else {
              // call multiple handlers
              for (var i = 0; i < handler.length; i++) {
                  invokeHandler(handler[i], vnode, event);
              }
          }
      }
  }
  function handleEvent(event, vnode) {
      var name = event.type, on = vnode.data.on;
      // call event handler(s) if exists
      if (on && on[name]) {
          invokeHandler(on[name], vnode, event);
      }
  }
  function createListener() {
      return function handler(event) {
          handleEvent(event, handler.vnode);
      };
  }
  function updateEventListeners(oldVnode, vnode) {
      var oldOn = oldVnode.data.on, oldListener = oldVnode.listener, oldElm = oldVnode.elm, on = vnode && vnode.data.on, elm = (vnode && vnode.elm), name;
      // optimization for reused immutable handlers
      if (oldOn === on) {
          return;
      }
      // remove existing listeners which no longer used
      if (oldOn && oldListener) {
          // if element changed or deleted we remove all existing listeners unconditionally
          if (!on) {
              for (name in oldOn) {
                  // remove listener if element was changed or existing listeners removed
                  oldElm.removeEventListener(name, oldListener, false);
              }
          }
          else {
              for (name in oldOn) {
                  // remove listener if existing listener removed
                  if (!on[name]) {
                      oldElm.removeEventListener(name, oldListener, false);
                  }
              }
          }
      }
      // add new listeners which has not already attached
      if (on) {
          // reuse existing listener or create new
          var listener = vnode.listener = oldVnode.listener || createListener();
          // update vnode for listener
          listener.vnode = vnode;
          // if element changed or added we add all needed listeners unconditionally
          if (!oldOn) {
              for (name in on) {
                  // add listener if element was changed or new listeners added
                  elm.addEventListener(name, listener, false);
              }
          }
          else {
              for (name in on) {
                  // add listener if new listener added
                  if (!oldOn[name]) {
                      elm.addEventListener(name, listener, false);
                  }
              }
          }
      }
  }
  exports.eventListenersModule = {
      create: updateEventListeners,
      update: updateEventListeners,
      destroy: updateEventListeners
  };
  exports.default = exports.eventListenersModule;
  //# sourceMappingURL=eventlisteners.js.map
  });

  var events = unwrapExports(eventlisteners);
  var eventlisteners_1 = eventlisteners.eventListenersModule;

  var style = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  // Bindig `requestAnimationFrame` like this fixes a bug in IE/Edge. See #360 and #409.
  var raf = (typeof window !== 'undefined' && (window.requestAnimationFrame).bind(window)) || setTimeout;
  var nextFrame = function (fn) { raf(function () { raf(fn); }); };
  var reflowForced = false;
  function setNextFrame(obj, prop, val) {
      nextFrame(function () { obj[prop] = val; });
  }
  function updateStyle(oldVnode, vnode) {
      var cur, name, elm = vnode.elm, oldStyle = oldVnode.data.style, style = vnode.data.style;
      if (!oldStyle && !style)
          return;
      if (oldStyle === style)
          return;
      oldStyle = oldStyle || {};
      style = style || {};
      var oldHasDel = 'delayed' in oldStyle;
      for (name in oldStyle) {
          if (!style[name]) {
              if (name[0] === '-' && name[1] === '-') {
                  elm.style.removeProperty(name);
              }
              else {
                  elm.style[name] = '';
              }
          }
      }
      for (name in style) {
          cur = style[name];
          if (name === 'delayed' && style.delayed) {
              for (var name2 in style.delayed) {
                  cur = style.delayed[name2];
                  if (!oldHasDel || cur !== oldStyle.delayed[name2]) {
                      setNextFrame(elm.style, name2, cur);
                  }
              }
          }
          else if (name !== 'remove' && cur !== oldStyle[name]) {
              if (name[0] === '-' && name[1] === '-') {
                  elm.style.setProperty(name, cur);
              }
              else {
                  elm.style[name] = cur;
              }
          }
      }
  }
  function applyDestroyStyle(vnode) {
      var style, name, elm = vnode.elm, s = vnode.data.style;
      if (!s || !(style = s.destroy))
          return;
      for (name in style) {
          elm.style[name] = style[name];
      }
  }
  function applyRemoveStyle(vnode, rm) {
      var s = vnode.data.style;
      if (!s || !s.remove) {
          rm();
          return;
      }
      if (!reflowForced) {
          getComputedStyle(document.body).transform;
          reflowForced = true;
      }
      var name, elm = vnode.elm, i = 0, compStyle, style = s.remove, amount = 0, applied = [];
      for (name in style) {
          applied.push(name);
          elm.style[name] = style[name];
      }
      compStyle = getComputedStyle(elm);
      var props = compStyle['transition-property'].split(', ');
      for (; i < props.length; ++i) {
          if (applied.indexOf(props[i]) !== -1)
              amount++;
      }
      elm.addEventListener('transitionend', function (ev) {
          if (ev.target === elm)
              --amount;
          if (amount === 0)
              rm();
      });
  }
  function forceReflow() {
      reflowForced = false;
  }
  exports.styleModule = {
      pre: forceReflow,
      create: updateStyle,
      update: updateStyle,
      destroy: applyDestroyStyle,
      remove: applyRemoveStyle
  };
  exports.default = exports.styleModule;
  //# sourceMappingURL=style.js.map
  });

  var style$1 = unwrapExports(style);
  var style_1 = style.styleModule;

  var vnode_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  function vnode(sel, data, children, text, elm) {
      var key = data === undefined ? undefined : data.key;
      return { sel: sel, data: data, children: children,
          text: text, elm: elm, key: key };
  }
  exports.vnode = vnode;
  exports.default = vnode;
  //# sourceMappingURL=vnode.js.map
  });

  unwrapExports(vnode_1);
  var vnode_2 = vnode_1.vnode;

  var is = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.array = Array.isArray;
  function primitive(s) {
      return typeof s === 'string' || typeof s === 'number';
  }
  exports.primitive = primitive;
  //# sourceMappingURL=is.js.map
  });

  unwrapExports(is);
  var is_1 = is.array;
  var is_2 = is.primitive;

  var h_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });


  function addNS(data, children, sel) {
      data.ns = 'http://www.w3.org/2000/svg';
      if (sel !== 'foreignObject' && children !== undefined) {
          for (var i = 0; i < children.length; ++i) {
              var childData = children[i].data;
              if (childData !== undefined) {
                  addNS(childData, children[i].children, children[i].sel);
              }
          }
      }
  }
  function h(sel, b, c) {
      var data = {}, children, text, i;
      if (c !== undefined) {
          data = b;
          if (is.array(c)) {
              children = c;
          }
          else if (is.primitive(c)) {
              text = c;
          }
          else if (c && c.sel) {
              children = [c];
          }
      }
      else if (b !== undefined) {
          if (is.array(b)) {
              children = b;
          }
          else if (is.primitive(b)) {
              text = b;
          }
          else if (b && b.sel) {
              children = [b];
          }
          else {
              data = b;
          }
      }
      if (children !== undefined) {
          for (i = 0; i < children.length; ++i) {
              if (is.primitive(children[i]))
                  children[i] = vnode_1.vnode(undefined, undefined, undefined, children[i], undefined);
          }
      }
      if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g' &&
          (sel.length === 3 || sel[3] === '.' || sel[3] === '#')) {
          addNS(data, children, sel);
      }
      return vnode_1.vnode(sel, data, children, text, undefined);
  }
  exports.h = h;
  exports.default = h;
  //# sourceMappingURL=h.js.map
  });

  unwrapExports(h_1);
  var h_2 = h_1.h;

  var snabbdomPatch = init([attrs, cls, events, style$1]);

  function patch(prevNode, nextNode) {
    return snabbdomPatch(prevNode, nextNode);
  }

  function cleanup(prevNode) {
    return prevNode.elm.parentNode.removeChild(prevNode.elm);
  }

  function mount$1(root, viewFn) {
    return mount(root, viewFn, patch, cleanup);
  }
  //# sourceMappingURL=flyps-dom-snabbdom.esm.js.map

  /**
   * Initialize the data store
   */

  handler("initialize", function () {
    return {
      db: {
        todos: [],
        newTodo: "",
        filter: null
      }
    };
  });
  /**
   * Todos
   */

  connector("todos", withInputSignals(function () {
    return db;
  }, function (db) {
    return db.todos;
  }));
  connector("todo-count", withInputSignals(function () {
    return connect("todos");
  }, function (todos) {
    return todos.length;
  }));
  connector("active-todo-count", withInputSignals(function () {
    return connect("todos");
  }, function (todos) {
    return todos.filter(function (todo) {
      return !todo.completed;
    }).length;
  }));
  connector("completed-todo-count", withInputSignals(function () {
    return [connect("todo-count"), connect("active-todo-count")];
  }, function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        todoCount = _ref2[0],
        activeTodoCount = _ref2[1];

    return todoCount - activeTodoCount;
  }));
  handler("todos/add", function (_ref3, _, entry) {
    var db = _ref3.db;
    return {
      db: _objectSpread2({}, db, {
        todos: [].concat(_toConsumableArray(db.todos), [entry])
      })
    };
  });
  handler("todos/destroy", function (_ref4, _, entry) {
    var db = _ref4.db;
    return {
      db: _objectSpread2({}, db, {
        todos: _toConsumableArray(db.todos.filter(function (todo) {
          return todo !== entry;
        }))
      })
    };
  });
  handler("todos/toggle", function (_ref5, _, entry) {
    var db = _ref5.db;
    return {
      db: _objectSpread2({}, db, {
        todos: _toConsumableArray(db.todos.map(function (todo) {
          return todo === entry ? _objectSpread2({}, todo, {
            completed: !todo.completed
          }) : todo;
        }))
      })
    };
  });
  handler("todos/toggle-all", function (_ref6, _, completed) {
    var db = _ref6.db;
    return {
      db: _objectSpread2({}, db, {
        todos: db.todos.map(function (todo) {
          return _objectSpread2({}, todo, {
            completed: completed
          });
        })
      })
    };
  });
  handler("todos/clear-completed", function (_ref7) {
    var db = _ref7.db;
    return {
      db: _objectSpread2({}, db, {
        todos: db.todos.filter(function (todo) {
          return !todo.completed;
        })
      })
    };
  });
  /**
   * Filtered todos
   */

  connector("filter", withInputSignals(function () {
    return db;
  }, function (db) {
    return db.filter;
  }));
  connector("filtered-todos", withInputSignals(function () {
    return [connect("todos"), connect("filter")];
  }, function (_ref8) {
    var _ref9 = _slicedToArray(_ref8, 2),
        todos = _ref9[0],
        filter = _ref9[1];

    return todos.filter(function (todo) {
      return !filter || filter === "active" && !todo.completed || filter === "completed" && todo.completed;
    });
  }));
  handler("filter/change", function (_ref10, _, filter) {
    var db = _ref10.db;
    return {
      db: _objectSpread2({}, db, {
        filter: filter
      })
    };
  });
  /**
   * New todo
   */

  connector("new-todo", withInputSignals(function () {
    return db;
  }, function (db) {
    return db.newTodo;
  }));
  handler("new-todo/clear", function (_ref11) {
    var db = _ref11.db;
    return {
      db: _objectSpread2({}, db, {
        newTodo: ""
      })
    };
  });
  handler("new-todo/update", function (_ref12, _, value) {
    var db = _ref12.db;
    return {
      db: _objectSpread2({}, db, {
        newTodo: value
      })
    };
  });
  handler("new-todo/save", function (_ref13) {
    var db = _ref13.db;

    if (db.newTodo) {
      return {
        db: _objectSpread2({}, db, {
          newTodo: ""
        }),
        trigger: ["todos/add", {
          text: db.newTodo
        }]
      };
    }
  });
  /**
   * App view that gets mounted into the DOM
   */

  var app = withInputSignals(function () {
    return connect("todo-count");
  }, function (todoCount) {
    return h_2("section.todoapp", [header(), todoCount > 0 ? main() : null, todoCount > 0 ? footer() : null]);
  });
  /**
   * Header view
   */

  var header = withInputSignals(function () {
    return connect("new-todo");
  }, function (newTodo) {
    return h_2("section.header", [h_2("h1", "todos"), todoInput(newTodo)]);
  });

  var todoInput = function todoInput(newTodo) {
    return h_2("input.new-todo", {
      attrs: {
        type: "text",
        placeholder: "What needs to be done?",
        autofocus: true,
        value: newTodo
      },
      hook: {
        update: function update(o, n) {
          return n.elm.value = newTodo;
        }
      },
      on: {
        keydown: function keydown(e) {
          switch (e.which) {
            case 13:
              // Return
              trigger("new-todo/save");
              break;

            case 27:
              // ESC
              trigger("new-todo/clear");
              break;
          }
        },
        input: function input(e) {
          return trigger("new-todo/update", e.target.value);
        }
      }
    });
  };

  var toggleAll = withInputSignals(function () {
    return connect("active-todo-count");
  }, function (activeTodoCount) {
    return h_2("div", [h_2("input#toggle-all.toggle-all", {
      attrs: {
        type: "checkbox",
        checked: activeTodoCount === 0
      },
      on: {
        change: function change(e) {
          return trigger("todos/toggle-all", e.target.checked);
        }
      },
      hook: {
        update: function update(o, n) {
          return n.elm.checked = activeTodoCount === 0;
        }
      }
    }), h_2("label", {
      attrs: {
        "for": "toggle-all"
      }
    })]);
  });
  /**
   * Main view
   */

  var main = withInputSignals(function () {
    return [connect("filtered-todos"), connect("active-todo-count")];
  }, function (_ref14) {
    var _ref15 = _slicedToArray(_ref14, 2),
        filteredTodos = _ref15[0],
        activeTodoCount = _ref15[1];

    return h_2("section.main", [toggleAll(activeTodoCount), h_2("ul.todo-list", filteredTodos.map(todoItem))]);
  });

  var todoItem = function todoItem(todo) {
    return h_2("li", {
      "class": {
        completed: todo.completed
      }
    }, [h_2("input.toggle", {
      attrs: {
        type: "checkbox",
        checked: todo.completed
      },
      on: {
        change: function change() {
          return trigger("todos/toggle", todo);
        }
      },
      hook: {
        update: function update(o, n) {
          return n.elm.checked = todo.completed;
        }
      }
    }), h_2("label", todo.text), h_2("button.destroy", {
      on: {
        click: function click() {
          return trigger("todos/destroy", todo);
        }
      }
    })]);
  };
  /**
   * Footer view
   */


  var footer = withInputSignals(function () {
    return [connect("active-todo-count"), connect("completed-todo-count"), connect("filter")];
  }, function (_ref16) {
    var _ref17 = _slicedToArray(_ref16, 3),
        activeTodoCount = _ref17[0],
        completedTodoCount = _ref17[1],
        filter = _ref17[2];

    return h_2("section.footer", [todoCount(activeTodoCount), filters(filter), completedTodoCount > 0 ? clearCompleted() : null]);
  });

  var todoCount = function todoCount(activeTodoCount) {
    return h_2("span.todo-count", "".concat(activeTodoCount, " item").concat(activeTodoCount === 1 ? "" : "s", " left"));
  };

  var filters = function filters(filter) {
    return h_2("ul.filters", [h_2("li", h_2("a", {
      attrs: {
        href: "#"
      },
      "class": {
        selected: !filter
      },
      on: {
        click: function click() {
          return trigger("filter/change", null);
        }
      }
    }, "All")), h_2("li", h_2("a", {
      attrs: {
        href: "#"
      },
      "class": {
        selected: filter === "active"
      },
      on: {
        click: function click() {
          return trigger("filter/change", "active");
        }
      }
    }, "Active")), h_2("li", h_2("a", {
      attrs: {
        href: "#"
      },
      "class": {
        selected: filter === "completed"
      },
      on: {
        click: function click() {
          return trigger("filter/change", "completed");
        }
      }
    }, "Completed"))]);
  };

  var clearCompleted = function clearCompleted() {
    return h_2("button.clear-completed", {
      on: {
        click: function click() {
          return trigger("todos/clear-completed");
        }
      }
    }, "Clear completed");
  };
  /**
   * Main export, initialize data store and mount app into DOM
   */


  function init$1() {
    triggerImmediately("initialize");
    mount$1(document.querySelector("#app"), app);
  }

  exports.init = init$1;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=todo.js.map
