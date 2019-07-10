'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * @ignore
 * @type {RegExp}
 */
var matrixRegex = /^matrix\(\s*([0-9_+-.e]+)\s*,\s*([0-9_+-.e]+)\s*,\s*([0-9_+-.e]+)\s*,\s*([0-9_+-.e]+)\s*,\s*([0-9_+-.e]+)\s*,\s*([0-9_+-.e]+)\s*\)$/i;

/**
 * Parse a string matrix formatted as matrix(a,b,c,d,e,f)
 * @param string String with a matrix
 * @returns {{a: number, b: number, c: number, e: number, d: number, f: number}} Affine matrix
 */
function fromString(string) {
  var parsed = string.match(matrixRegex);
  if (parsed === null || parsed.length < 7) throw new Error("'" + string + "' is not a matrix");
  return {
    a: parseFloat(parsed[1]),
    b: parseFloat(parsed[2]),
    c: parseFloat(parsed[3]),
    d: parseFloat(parsed[4]),
    e: parseFloat(parsed[5]),
    f: parseFloat(parsed[6])
  };
}

/**
 * Identity matrix
 * @returns {{a: number, b: number, c: number, e: number, d: number, f: number}} Affine matrix
 */
function identity() {
  return {
    a: 1,
    c: 0,
    e: 0,
    b: 0,
    d: 1,
    f: 0
  };
}

function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Calculate a translate matrix
 * @param tx Translation on axis x
 * @param [ty = 0] Translation on axis y
 * @returns {{a: number, b: number, c: number, e: number, d: number, f: number}} Affine matrix
 */
function translate(tx) {
  var ty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  return {
    a: 1,
    c: 0,
    e: tx,
    b: 0,
    d: 1,
    f: ty
  };
}

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

/**
 * Merge multiple matrices into one
 * @param matrices {...object} list of matrices
 * @returns {{a: number, b: number, c: number, e: number, d: number, f: number}} Affine matrix
 */
function transform() {
  for (var _len = arguments.length, matrices = Array(_len), _key = 0; _key < _len; _key++) {
    matrices[_key] = arguments[_key];
  }

  matrices = Array.isArray(matrices[0]) ? matrices[0] : matrices;

  var multiply = function multiply(m1, m2) {
    return {
      a: m1.a * m2.a + m1.c * m2.b,
      c: m1.a * m2.c + m1.c * m2.d,
      e: m1.a * m2.e + m1.c * m2.f + m1.e,
      b: m1.b * m2.a + m1.d * m2.b,
      d: m1.b * m2.c + m1.d * m2.d,
      f: m1.b * m2.e + m1.d * m2.f + m1.f
    };
  };

  switch (matrices.length) {
    case 0:
      throw new Error('no matrices provided');

    case 1:
      return matrices[0];

    case 2:
      return multiply(matrices[0], matrices[1]);

    default:
      var _matrices = matrices,
          _matrices2 = _toArray(_matrices),
          m1 = _matrices2[0],
          m2 = _matrices2[1],
          rest = _matrices2.slice(2);

      var m = multiply(m1, m2);
      return transform.apply(undefined, [m].concat(_toConsumableArray(rest)));
  }
}

var PI = Math.PI;

/**
 * Calculate a scaling matrix
 * @param sx Scaling on axis x
 * @param [sy = sx] Scaling on axis y (default sx)
 * @returns {{a: number, b: number, c: number, e: number, d: number, f: number}} Affine matrix
 */
function scale(sx) {
  var sy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

  if (isUndefined(sy)) sy = sx;
  return {
    a: sx,
    c: 0,
    e: 0,
    b: 0,
    d: sy,
    f: 0
  };
}

/**
 * Serialize the matrix to a string that can be used with CSS or SVG
 * @param matrix Affine matrix
 * @returns {string} String that contains a matrix formatted as matrix(a,b,c,d,e,f)
 */

/**
 * Serialize the matrix to a string that can be used with CSS or SVG
 * @param matrix Affine matrix
 * @returns {string} String that contains a matrix formatted as matrix(a,b,c,d,e,f)
 */
function toSVG(matrix) {
  return toString(matrix);
}

/**
 * Serialize the matrix to a string that can be used with CSS or SVG
 * @param matrix Affine matrix
 * @returns {string} String that contains a matrix formatted as matrix(a,b,c,d,e,f)
 */
function toString(matrix) {
  return "matrix(" + matrix.a + "," + matrix.b + "," + matrix.c + "," + matrix.d + "," + matrix.e + "," + matrix.f + ")";
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var renameKeys = createCommonjsModule(function (module) {
(function() {

  function rename(obj, fn) {
    if (typeof fn !== 'function') {
      return obj;
    }

    var res = {};
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        res[fn(key, obj[key]) || key] = obj[key];
      }
    }
    return res;
  }

  if ( module.exports) {
    module.exports = rename;
  } else {
    {
      window.rename = rename;
    }
  }
})();
});

var eventemitter3 = createCommonjsModule(function (module) {

var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @api private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {Mixed} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @api private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @api public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @api public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Boolean} exists Only check if there are listeners.
 * @returns {Array|Boolean}
 * @api public
 */
EventEmitter.prototype.listeners = function listeners(event, exists) {
  var evt = prefix ? prefix + event : event
    , available = this._events[evt];

  if (exists) return !!available;
  if (!available) return [];
  if (available.fn) return [available.fn];

  for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
    ee[i] = available[i].fn;
  }

  return ee;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @api public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Function} fn The listener function.
 * @param {Mixed} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  var listener = new EE(fn, context || this)
    , evt = prefix ? prefix + event : event;

  if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++;
  else if (!this._events[evt].fn) this._events[evt].push(listener);
  else this._events[evt] = [this._events[evt], listener];

  return this;
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Function} fn The listener function.
 * @param {Mixed} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  var listener = new EE(fn, context || this, true)
    , evt = prefix ? prefix + event : event;

  if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++;
  else if (!this._events[evt].fn) this._events[evt].push(listener);
  else this._events[evt] = [this._events[evt], listener];

  return this;
};

/**
 * Remove the listeners of a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {Mixed} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    if (--this._eventsCount === 0) this._events = new Events();
    else delete this._events[evt];
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
         listeners.fn === fn
      && (!once || listeners.once)
      && (!context || listeners.context === context)
    ) {
      if (--this._eventsCount === 0) this._events = new Events();
      else delete this._events[evt];
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
           listeners[i].fn !== fn
        || (once && !listeners[i].once)
        || (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else if (--this._eventsCount === 0) this._events = new Events();
    else delete this._events[evt];
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {String|Symbol} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) {
      if (--this._eventsCount === 0) this._events = new Events();
      else delete this._events[evt];
    }
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// This function doesn't apply anymore.
//
EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
  return this;
};

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
{
  module.exports = EventEmitter;
}
});

var escapeText = function escapeText(text) {
  if (text) {
    var str = String(text);
    return /[&<>]/.test(str) ? "<![CDATA[".concat(str.replace(/]]>/, ']]]]><![CDATA[>'), "]]>") : str;
  }

  return '';
};
var escapeAttr = function escapeAttr(attr) {
  return String(attr).replace(/&/g, '&amp;').replace(/'/g, '&apos;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

var stringify = function stringify(ast) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$transformAttr = _ref.transformAttr,
      transformAttr = _ref$transformAttr === void 0 ? function (key, value, escape) {
    return "".concat(key, "=\"").concat(escape(value), "\"");
  } : _ref$transformAttr,
      _ref$selfClose = _ref.selfClose,
      selfClose = _ref$selfClose === void 0 ? true : _ref$selfClose;

  if (Array.isArray(ast)) {
    return ast.map(function (ast) {
      return stringify(ast, {
        transformAttr: transformAttr,
        selfClose: selfClose
      });
    }).join('');
  }

  if (ast.type === 'text') {
    return escapeText(ast.value);
  }

  var attributes = '';

  for (var attr in ast.attributes) {
    var attrStr = transformAttr(attr, ast.attributes[attr], escapeAttr, ast.name);
    attributes += attrStr ? " ".concat(attrStr) : '';
  }

  return ast.children.length || !selfClose ? "<".concat(ast.name).concat(attributes, ">").concat(stringify(ast.children, {
    transformAttr: transformAttr,
    selfClose: selfClose
  }), "</").concat(ast.name, ">") : "<".concat(ast.name).concat(attributes, "/>");
};

const stringRenderer = ast => {
  if (ast.attributes.style !== undefined) delete ast.attributes.style;
  return stringify(ast)
};

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

function ca(a,b,d,c,e,g,h,f){if(!a){a=void 0;if(void 0===b)a=Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var l=[d,c,e,g,h,f],m=0;a=Error(b.replace(/%s/g,function(){return l[m++]}));a.name="Invariant Violation";}a.framesToPop=1;throw a;}}
function B(a){for(var b=arguments.length-1,d="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=0;c<b;c++)d+="&args[]="+encodeURIComponent(arguments[c+1]);ca(!1,"Minified React error #"+a+"; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ",d);}var C={isMounted:function(){return !1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},D={};
function E(a,b,d){this.props=a;this.context=b;this.refs=D;this.updater=d||C;}E.prototype.isReactComponent={};E.prototype.setState=function(a,b){"object"!==typeof a&&"function"!==typeof a&&null!=a?B("85"):void 0;this.updater.enqueueSetState(this,a,b,"setState");};E.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate");};function F(){}F.prototype=E.prototype;function G(a,b,d){this.props=a;this.context=b;this.refs=D;this.updater=d||C;}var H=G.prototype=new F;
H.constructor=G;objectAssign(H,E.prototype);H.isPureReactComponent=!0;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1 = ReactPropTypesSecret;

var printWarning = function() {};

{
  var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
  var loggedTypeFailures = {};
  var has = Function.call.bind(Object.prototype.hasOwnProperty);

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$1);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  {
    loggedTypeFailures = {};
  }
};

var checkPropTypes_1 = checkPropTypes;

var react_development = createCommonjsModule(function (module) {



{
  (function() {

var _assign = objectAssign;
var checkPropTypes = checkPropTypes_1;

// TODO: this is special because it gets imported during build.

var ReactVersion = '16.8.6';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;

var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;

var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;

var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator';

function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable !== 'object') {
    return null;
  }
  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }
  return null;
}

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function () {};

{
  validateFormat = function (format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error = void 0;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

// Relying on the `invariant()` implementation lets us
// preserve the format and params in the www builds.

/**
 * Forked from fbjs/warning:
 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
 *
 * Only change is we use console.warn instead of console.error,
 * and do nothing when 'console' is not supported.
 * This really simplifies the code.
 * ---
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var lowPriorityWarning = function () {};

{
  var printWarning = function (format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.warn(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  lowPriorityWarning = function (condition, format) {
    if (format === undefined) {
      throw new Error('`lowPriorityWarning(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

var lowPriorityWarning$1 = lowPriorityWarning;

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warningWithoutStack = function () {};

{
  warningWithoutStack = function (condition, format) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    if (format === undefined) {
      throw new Error('`warningWithoutStack(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (args.length > 8) {
      // Check before the condition to catch violations early.
      throw new Error('warningWithoutStack() currently supports at most 8 arguments.');
    }
    if (condition) {
      return;
    }
    if (typeof console !== 'undefined') {
      var argsWithFormat = args.map(function (item) {
        return '' + item;
      });
      argsWithFormat.unshift('Warning: ' + format);

      // We intentionally don't use spread (or .apply) directly because it
      // breaks IE9: https://github.com/facebook/react/issues/13610
      Function.prototype.apply.call(console.error, console, argsWithFormat);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      throw new Error(message);
    } catch (x) {}
  };
}

var warningWithoutStack$1 = warningWithoutStack;

var didWarnStateUpdateForUnmountedComponent = {};

function warnNoop(publicInstance, callerName) {
  {
    var _constructor = publicInstance.constructor;
    var componentName = _constructor && (_constructor.displayName || _constructor.name) || 'ReactClass';
    var warningKey = componentName + '.' + callerName;
    if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
      return;
    }
    warningWithoutStack$1(false, "Can't call %s on a component that is not yet mounted. " + 'This is a no-op, but it might indicate a bug in your application. ' + 'Instead, assign to `this.state` directly or define a `state = {};` ' + 'class property with the desired state in the %s component.', callerName, componentName);
    didWarnStateUpdateForUnmountedComponent[warningKey] = true;
  }
}

/**
 * This is the abstract API for an update queue.
 */
var ReactNoopUpdateQueue = {
  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    return false;
  },

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueForceUpdate: function (publicInstance, callback, callerName) {
    warnNoop(publicInstance, 'forceUpdate');
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {
    warnNoop(publicInstance, 'replaceState');
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} Name of the calling function in the public API.
   * @internal
   */
  enqueueSetState: function (publicInstance, partialState, callback, callerName) {
    warnNoop(publicInstance, 'setState');
  }
};

var emptyObject = {};
{
  Object.freeze(emptyObject);
}

/**
 * Base class helpers for the updating state of a component.
 */
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  // If a component has string refs, we will assign a different object later.
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

Component.prototype.isReactComponent = {};

/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */
Component.prototype.setState = function (partialState, callback) {
  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : void 0;
  this.updater.enqueueSetState(this, partialState, callback, 'setState');
};

/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */
Component.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
};

/**
 * Deprecated APIs. These APIs used to exist on classic React classes but since
 * we would like to deprecate them, we're not going to move them over to this
 * modern base class. Instead, we define a getter that warns if it's accessed.
 */
{
  var deprecatedAPIs = {
    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
  };
  var defineDeprecationWarning = function (methodName, info) {
    Object.defineProperty(Component.prototype, methodName, {
      get: function () {
        lowPriorityWarning$1(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
        return undefined;
      }
    });
  };
  for (var fnName in deprecatedAPIs) {
    if (deprecatedAPIs.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    }
  }
}

function ComponentDummy() {}
ComponentDummy.prototype = Component.prototype;

/**
 * Convenience component with default shallow equality check for sCU.
 */
function PureComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  // If a component has string refs, we will assign a different object later.
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}

var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
pureComponentPrototype.constructor = PureComponent;
// Avoid an extra prototype jump for these methods.
_assign(pureComponentPrototype, Component.prototype);
pureComponentPrototype.isPureReactComponent = true;

// an immutable object with a single mutable value
function createRef() {
  var refObject = {
    current: null
  };
  {
    Object.seal(refObject);
  }
  return refObject;
}

/**
 * Keeps track of the current dispatcher.
 */
var ReactCurrentDispatcher = {
  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null
};

/**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 */
var ReactCurrentOwner = {
  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null
};

var BEFORE_SLASH_RE = /^(.*)[\\\/]/;

var describeComponentFrame = function (name, source, ownerName) {
  var sourceInfo = '';
  if (source) {
    var path = source.fileName;
    var fileName = path.replace(BEFORE_SLASH_RE, '');
    {
      // In DEV, include code for a common special case:
      // prefer "folder/index.js" instead of just "index.js".
      if (/^index\./.test(fileName)) {
        var match = path.match(BEFORE_SLASH_RE);
        if (match) {
          var pathBeforeSlash = match[1];
          if (pathBeforeSlash) {
            var folderName = pathBeforeSlash.replace(BEFORE_SLASH_RE, '');
            fileName = folderName + '/' + fileName;
          }
        }
      }
    }
    sourceInfo = ' (at ' + fileName + ':' + source.lineNumber + ')';
  } else if (ownerName) {
    sourceInfo = ' (created by ' + ownerName + ')';
  }
  return '\n    in ' + (name || 'Unknown') + sourceInfo;
};

var Resolved = 1;


function refineResolvedLazyComponent(lazyComponent) {
  return lazyComponent._status === Resolved ? lazyComponent._result : null;
}

function getWrappedName(outerType, innerType, wrapperName) {
  var functionName = innerType.displayName || innerType.name || '';
  return outerType.displayName || (functionName !== '' ? wrapperName + '(' + functionName + ')' : wrapperName);
}

function getComponentName(type) {
  if (type == null) {
    // Host root, text node or just invalid type.
    return null;
  }
  {
    if (typeof type.tag === 'number') {
      warningWithoutStack$1(false, 'Received an unexpected object in getComponentName(). ' + 'This is likely a bug in React. Please file an issue.');
    }
  }
  if (typeof type === 'function') {
    return type.displayName || type.name || null;
  }
  if (typeof type === 'string') {
    return type;
  }
  switch (type) {
    case REACT_CONCURRENT_MODE_TYPE:
      return 'ConcurrentMode';
    case REACT_FRAGMENT_TYPE:
      return 'Fragment';
    case REACT_PORTAL_TYPE:
      return 'Portal';
    case REACT_PROFILER_TYPE:
      return 'Profiler';
    case REACT_STRICT_MODE_TYPE:
      return 'StrictMode';
    case REACT_SUSPENSE_TYPE:
      return 'Suspense';
  }
  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_CONTEXT_TYPE:
        return 'Context.Consumer';
      case REACT_PROVIDER_TYPE:
        return 'Context.Provider';
      case REACT_FORWARD_REF_TYPE:
        return getWrappedName(type, type.render, 'ForwardRef');
      case REACT_MEMO_TYPE:
        return getComponentName(type.type);
      case REACT_LAZY_TYPE:
        {
          var thenable = type;
          var resolvedThenable = refineResolvedLazyComponent(thenable);
          if (resolvedThenable) {
            return getComponentName(resolvedThenable);
          }
        }
    }
  }
  return null;
}

var ReactDebugCurrentFrame = {};

var currentlyValidatingElement = null;

function setCurrentlyValidatingElement(element) {
  {
    currentlyValidatingElement = element;
  }
}

{
  // Stack implementation injected by the current renderer.
  ReactDebugCurrentFrame.getCurrentStack = null;

  ReactDebugCurrentFrame.getStackAddendum = function () {
    var stack = '';

    // Add an extra top frame while an element is being validated
    if (currentlyValidatingElement) {
      var name = getComponentName(currentlyValidatingElement.type);
      var owner = currentlyValidatingElement._owner;
      stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner.type));
    }

    // Delegate to the injected renderer-specific implementation
    var impl = ReactDebugCurrentFrame.getCurrentStack;
    if (impl) {
      stack += impl() || '';
    }

    return stack;
  };
}

var ReactSharedInternals = {
  ReactCurrentDispatcher: ReactCurrentDispatcher,
  ReactCurrentOwner: ReactCurrentOwner,
  // Used by renderers to avoid bundling object-assign twice in UMD bundles:
  assign: _assign
};

{
  _assign(ReactSharedInternals, {
    // These should not be included in production.
    ReactDebugCurrentFrame: ReactDebugCurrentFrame,
    // Shim for React DOM 16.0.0 which still destructured (but not used) this.
    // TODO: remove in React 17.0.
    ReactComponentTreeHook: {}
  });
}

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = warningWithoutStack$1;

{
  warning = function (condition, format) {
    if (condition) {
      return;
    }
    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
    var stack = ReactDebugCurrentFrame.getStackAddendum();
    // eslint-disable-next-line react-internal/warning-and-invariant-args

    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    warningWithoutStack$1.apply(undefined, [false, format + '%s'].concat(args, [stack]));
  };
}

var warning$1 = warning;

var hasOwnProperty = Object.prototype.hasOwnProperty;

var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

var specialPropKeyWarningShown = void 0;
var specialPropRefWarningShown = void 0;

function hasValidRef(config) {
  {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.ref !== undefined;
}

function hasValidKey(config) {
  {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.key !== undefined;
}

function defineKeyPropWarningGetter(props, displayName) {
  var warnAboutAccessingKey = function () {
    if (!specialPropKeyWarningShown) {
      specialPropKeyWarningShown = true;
      warningWithoutStack$1(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
    }
  };
  warnAboutAccessingKey.isReactWarning = true;
  Object.defineProperty(props, 'key', {
    get: warnAboutAccessingKey,
    configurable: true
  });
}

function defineRefPropWarningGetter(props, displayName) {
  var warnAboutAccessingRef = function () {
    if (!specialPropRefWarningShown) {
      specialPropRefWarningShown = true;
      warningWithoutStack$1(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
    }
  };
  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true
  });
}

/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, no instanceof check
 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} key
 * @param {string|object} ref
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @param {*} owner
 * @param {*} props
 * @internal
 */
var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner
  };

  {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {};

    // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.
    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    });
    // self and source are DEV only properties.
    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    });
    // Two elements created in two different places should be considered
    // equal for testing purposes and therefore we hide it from enumeration.
    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source
    });
    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};

/**
 * Create and return a new ReactElement of the given type.
 * See https://reactjs.org/docs/react-api.html#createelement
 */
function createElement(type, config, children) {
  var propName = void 0;

  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  {
    if (key || ref) {
      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
      if (key) {
        defineKeyPropWarningGetter(props, displayName);
      }
      if (ref) {
        defineRefPropWarningGetter(props, displayName);
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
}

/**
 * Return a function that produces ReactElements of a given type.
 * See https://reactjs.org/docs/react-api.html#createfactory
 */


function cloneAndReplaceKey(oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

  return newElement;
}

/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://reactjs.org/docs/react-api.html#cloneelement
 */
function cloneElement(element, config, children) {
  !!(element === null || element === undefined) ? invariant(false, 'React.cloneElement(...): The argument must be a React element, but you passed %s.', element) : void 0;

  var propName = void 0;

  // Original props are copied
  var props = _assign({}, element.props);

  // Reserved names are extracted
  var key = element.key;
  var ref = element.ref;
  // Self is preserved since the owner is preserved.
  var self = element._self;
  // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.
  var source = element._source;

  // Owner will be preserved, unless ref is overridden
  var owner = element._owner;

  if (config != null) {
    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    // Remaining properties override existing props
    var defaultProps = void 0;
    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
}

/**
 * Verifies the object is a ReactElement.
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a ReactElement.
 * @final
 */
function isValidElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}

var SEPARATOR = '.';
var SUBSEPARATOR = ':';

/**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */
function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    '=': '=0',
    ':': '=2'
  };
  var escapedString = ('' + key).replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });

  return '$' + escapedString;
}

/**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */

var didWarnAboutMaps = false;

var userProvidedKeyEscapeRegex = /\/+/g;
function escapeUserProvidedKey(text) {
  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
}

var POOL_SIZE = 10;
var traverseContextPool = [];
function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
  if (traverseContextPool.length) {
    var traverseContext = traverseContextPool.pop();
    traverseContext.result = mapResult;
    traverseContext.keyPrefix = keyPrefix;
    traverseContext.func = mapFunction;
    traverseContext.context = mapContext;
    traverseContext.count = 0;
    return traverseContext;
  } else {
    return {
      result: mapResult,
      keyPrefix: keyPrefix,
      func: mapFunction,
      context: mapContext,
      count: 0
    };
  }
}

function releaseTraverseContext(traverseContext) {
  traverseContext.result = null;
  traverseContext.keyPrefix = null;
  traverseContext.func = null;
  traverseContext.context = null;
  traverseContext.count = 0;
  if (traverseContextPool.length < POOL_SIZE) {
    traverseContextPool.push(traverseContext);
  }
}

/**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  var invokeCallback = false;

  if (children === null) {
    invokeCallback = true;
  } else {
    switch (type) {
      case 'string':
      case 'number':
        invokeCallback = true;
        break;
      case 'object':
        switch (children.$$typeof) {
          case REACT_ELEMENT_TYPE:
          case REACT_PORTAL_TYPE:
            invokeCallback = true;
        }
    }
  }

  if (invokeCallback) {
    callback(traverseContext, children,
    // If it's the only child, treat the name as if it was wrapped in an array
    // so that it's consistent if the number of children grows.
    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
    return 1;
  }

  var child = void 0;
  var nextName = void 0;
  var subtreeCount = 0; // Count of children found in the current subtree.
  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
    }
  } else {
    var iteratorFn = getIteratorFn(children);
    if (typeof iteratorFn === 'function') {
      {
        // Warn about using Maps as children
        if (iteratorFn === children.entries) {
          !didWarnAboutMaps ? warning$1(false, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.') : void 0;
          didWarnAboutMaps = true;
        }
      }

      var iterator = iteratorFn.call(children);
      var step = void 0;
      var ii = 0;
      while (!(step = iterator.next()).done) {
        child = step.value;
        nextName = nextNamePrefix + getComponentKey(child, ii++);
        subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
      }
    } else if (type === 'object') {
      var addendum = '';
      {
        addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + ReactDebugCurrentFrame.getStackAddendum();
      }
      var childrenString = '' + children;
      invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum);
    }
  }

  return subtreeCount;
}

/**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }

  return traverseAllChildrenImpl(children, '', callback, traverseContext);
}

/**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */
function getComponentKey(component, index) {
  // Do some typechecking here since we call this blindly. We want to ensure
  // that we don't block potential future ES APIs.
  if (typeof component === 'object' && component !== null && component.key != null) {
    // Explicit key
    return escape(component.key);
  }
  // Implicit key determined by the index in the set
  return index.toString(36);
}

function forEachSingleChild(bookKeeping, child, name) {
  var func = bookKeeping.func,
      context = bookKeeping.context;

  func.call(context, child, bookKeeping.count++);
}

/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrenforeach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }
  var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
  traverseAllChildren(children, forEachSingleChild, traverseContext);
  releaseTraverseContext(traverseContext);
}

function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result,
      keyPrefix = bookKeeping.keyPrefix,
      func = bookKeeping.func,
      context = bookKeeping.context;


  var mappedChild = func.call(context, child, bookKeeping.count++);
  if (Array.isArray(mappedChild)) {
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, function (c) {
      return c;
    });
  } else if (mappedChild != null) {
    if (isValidElement(mappedChild)) {
      mappedChild = cloneAndReplaceKey(mappedChild,
      // Keep both the (mapped) and old keys if they differ, just as
      // traverseAllChildren used to do for objects as children
      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
    }
    result.push(mappedChild);
  }
}

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = '';
  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
  }
  var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
  releaseTraverseContext(traverseContext);
}

/**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrenmap
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */
function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}

/**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrencount
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */
function countChildren(children) {
  return traverseAllChildren(children, function () {
    return null;
  }, null);
}

/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrentoarray
 */
function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, function (child) {
    return child;
  });
  return result;
}

/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrenonly
 *
 * The current implementation of this function assumes that a single child gets
 * passed without a wrapper, but the purpose of this helper function is to
 * abstract away the particular structure of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactElement} The first and only `ReactElement` contained in the
 * structure.
 */
function onlyChild(children) {
  !isValidElement(children) ? invariant(false, 'React.Children.only expected to receive a single React element child.') : void 0;
  return children;
}

function createContext(defaultValue, calculateChangedBits) {
  if (calculateChangedBits === undefined) {
    calculateChangedBits = null;
  } else {
    {
      !(calculateChangedBits === null || typeof calculateChangedBits === 'function') ? warningWithoutStack$1(false, 'createContext: Expected the optional second argument to be a ' + 'function. Instead received: %s', calculateChangedBits) : void 0;
    }
  }

  var context = {
    $$typeof: REACT_CONTEXT_TYPE,
    _calculateChangedBits: calculateChangedBits,
    // As a workaround to support multiple concurrent renderers, we categorize
    // some renderers as primary and others as secondary. We only expect
    // there to be two concurrent renderers at most: React Native (primary) and
    // Fabric (secondary); React DOM (primary) and React ART (secondary).
    // Secondary renderers store their context values on separate fields.
    _currentValue: defaultValue,
    _currentValue2: defaultValue,
    // Used to track how many concurrent renderers this context currently
    // supports within in a single renderer. Such as parallel server rendering.
    _threadCount: 0,
    // These are circular
    Provider: null,
    Consumer: null
  };

  context.Provider = {
    $$typeof: REACT_PROVIDER_TYPE,
    _context: context
  };

  var hasWarnedAboutUsingNestedContextConsumers = false;
  var hasWarnedAboutUsingConsumerProvider = false;

  {
    // A separate object, but proxies back to the original context object for
    // backwards compatibility. It has a different $$typeof, so we can properly
    // warn for the incorrect usage of Context as a Consumer.
    var Consumer = {
      $$typeof: REACT_CONTEXT_TYPE,
      _context: context,
      _calculateChangedBits: context._calculateChangedBits
    };
    // $FlowFixMe: Flow complains about not setting a value, which is intentional here
    Object.defineProperties(Consumer, {
      Provider: {
        get: function () {
          if (!hasWarnedAboutUsingConsumerProvider) {
            hasWarnedAboutUsingConsumerProvider = true;
            warning$1(false, 'Rendering <Context.Consumer.Provider> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Provider> instead?');
          }
          return context.Provider;
        },
        set: function (_Provider) {
          context.Provider = _Provider;
        }
      },
      _currentValue: {
        get: function () {
          return context._currentValue;
        },
        set: function (_currentValue) {
          context._currentValue = _currentValue;
        }
      },
      _currentValue2: {
        get: function () {
          return context._currentValue2;
        },
        set: function (_currentValue2) {
          context._currentValue2 = _currentValue2;
        }
      },
      _threadCount: {
        get: function () {
          return context._threadCount;
        },
        set: function (_threadCount) {
          context._threadCount = _threadCount;
        }
      },
      Consumer: {
        get: function () {
          if (!hasWarnedAboutUsingNestedContextConsumers) {
            hasWarnedAboutUsingNestedContextConsumers = true;
            warning$1(false, 'Rendering <Context.Consumer.Consumer> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Consumer> instead?');
          }
          return context.Consumer;
        }
      }
    });
    // $FlowFixMe: Flow complains about missing properties because it doesn't understand defineProperty
    context.Consumer = Consumer;
  }

  {
    context._currentRenderer = null;
    context._currentRenderer2 = null;
  }

  return context;
}

function lazy(ctor) {
  var lazyType = {
    $$typeof: REACT_LAZY_TYPE,
    _ctor: ctor,
    // React uses these fields to store the result.
    _status: -1,
    _result: null
  };

  {
    // In production, this would just set it on the object.
    var defaultProps = void 0;
    var propTypes = void 0;
    Object.defineProperties(lazyType, {
      defaultProps: {
        configurable: true,
        get: function () {
          return defaultProps;
        },
        set: function (newDefaultProps) {
          warning$1(false, 'React.lazy(...): It is not supported to assign `defaultProps` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');
          defaultProps = newDefaultProps;
          // Match production behavior more closely:
          Object.defineProperty(lazyType, 'defaultProps', {
            enumerable: true
          });
        }
      },
      propTypes: {
        configurable: true,
        get: function () {
          return propTypes;
        },
        set: function (newPropTypes) {
          warning$1(false, 'React.lazy(...): It is not supported to assign `propTypes` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');
          propTypes = newPropTypes;
          // Match production behavior more closely:
          Object.defineProperty(lazyType, 'propTypes', {
            enumerable: true
          });
        }
      }
    });
  }

  return lazyType;
}

function forwardRef(render) {
  {
    if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
      warningWithoutStack$1(false, 'forwardRef requires a render function but received a `memo` ' + 'component. Instead of forwardRef(memo(...)), use ' + 'memo(forwardRef(...)).');
    } else if (typeof render !== 'function') {
      warningWithoutStack$1(false, 'forwardRef requires a render function but was given %s.', render === null ? 'null' : typeof render);
    } else {
      !(
      // Do not warn for 0 arguments because it could be due to usage of the 'arguments' object
      render.length === 0 || render.length === 2) ? warningWithoutStack$1(false, 'forwardRef render functions accept exactly two parameters: props and ref. %s', render.length === 1 ? 'Did you forget to use the ref parameter?' : 'Any additional parameter will be undefined.') : void 0;
    }

    if (render != null) {
      !(render.defaultProps == null && render.propTypes == null) ? warningWithoutStack$1(false, 'forwardRef render functions do not support propTypes or defaultProps. ' + 'Did you accidentally pass a React component?') : void 0;
    }
  }

  return {
    $$typeof: REACT_FORWARD_REF_TYPE,
    render: render
  };
}

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' ||
  // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE);
}

function memo(type, compare) {
  {
    if (!isValidElementType(type)) {
      warningWithoutStack$1(false, 'memo: The first argument must be a component. Instead ' + 'received: %s', type === null ? 'null' : typeof type);
    }
  }
  return {
    $$typeof: REACT_MEMO_TYPE,
    type: type,
    compare: compare === undefined ? null : compare
  };
}

function resolveDispatcher() {
  var dispatcher = ReactCurrentDispatcher.current;
  !(dispatcher !== null) ? invariant(false, 'Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem.') : void 0;
  return dispatcher;
}

function useContext(Context, unstable_observedBits) {
  var dispatcher = resolveDispatcher();
  {
    !(unstable_observedBits === undefined) ? warning$1(false, 'useContext() second argument is reserved for future ' + 'use in React. Passing it is not supported. ' + 'You passed: %s.%s', unstable_observedBits, typeof unstable_observedBits === 'number' && Array.isArray(arguments[2]) ? '\n\nDid you call array.map(useContext)? ' + 'Calling Hooks inside a loop is not supported. ' + 'Learn more at https://fb.me/rules-of-hooks' : '') : void 0;

    // TODO: add a more generic warning for invalid values.
    if (Context._context !== undefined) {
      var realContext = Context._context;
      // Don't deduplicate because this legitimately causes bugs
      // and nobody should be using this in existing code.
      if (realContext.Consumer === Context) {
        warning$1(false, 'Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be ' + 'removed in a future major release. Did you mean to call useContext(Context) instead?');
      } else if (realContext.Provider === Context) {
        warning$1(false, 'Calling useContext(Context.Provider) is not supported. ' + 'Did you mean to call useContext(Context) instead?');
      }
    }
  }
  return dispatcher.useContext(Context, unstable_observedBits);
}

function useState(initialState) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useState(initialState);
}

function useReducer(reducer, initialArg, init) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useReducer(reducer, initialArg, init);
}

function useRef(initialValue) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useRef(initialValue);
}

function useEffect(create, inputs) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useEffect(create, inputs);
}

function useLayoutEffect(create, inputs) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useLayoutEffect(create, inputs);
}

function useCallback(callback, inputs) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useCallback(callback, inputs);
}

function useMemo(create, inputs) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useMemo(create, inputs);
}

function useImperativeHandle(ref, create, inputs) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useImperativeHandle(ref, create, inputs);
}

function useDebugValue(value, formatterFn) {
  {
    var dispatcher = resolveDispatcher();
    return dispatcher.useDebugValue(value, formatterFn);
  }
}

/**
 * ReactElementValidator provides a wrapper around a element factory
 * which validates the props passed to the element. This is intended to be
 * used only in DEV and could be replaced by a static type checker for languages
 * that support it.
 */

var propTypesMisspellWarningShown = void 0;

{
  propTypesMisspellWarningShown = false;
}

function getDeclarationErrorAddendum() {
  if (ReactCurrentOwner.current) {
    var name = getComponentName(ReactCurrentOwner.current.type);
    if (name) {
      return '\n\nCheck the render method of `' + name + '`.';
    }
  }
  return '';
}

function getSourceInfoErrorAddendum(elementProps) {
  if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
    var source = elementProps.__source;
    var fileName = source.fileName.replace(/^.*[\\\/]/, '');
    var lineNumber = source.lineNumber;
    return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
  }
  return '';
}

/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */
var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  var info = getDeclarationErrorAddendum();

  if (!info) {
    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
    if (parentName) {
      info = '\n\nCheck the top-level render call using <' + parentName + '>.';
    }
  }
  return info;
}

/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */
function validateExplicitKey(element, parentType) {
  if (!element._store || element._store.validated || element.key != null) {
    return;
  }
  element._store.validated = true;

  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
  if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
    return;
  }
  ownerHasKeyUseWarning[currentComponentErrorInfo] = true;

  // Usually the current owner is the offender, but if it accepts children as a
  // property, it may be the creator of the child that's responsible for
  // assigning it a key.
  var childOwner = '';
  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
    // Give the component that originally created this child.
    childOwner = ' It was passed a child from ' + getComponentName(element._owner.type) + '.';
  }

  setCurrentlyValidatingElement(element);
  {
    warning$1(false, 'Each child in a list should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.', currentComponentErrorInfo, childOwner);
  }
  setCurrentlyValidatingElement(null);
}

/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */
function validateChildKeys(node, parentType) {
  if (typeof node !== 'object') {
    return;
  }
  if (Array.isArray(node)) {
    for (var i = 0; i < node.length; i++) {
      var child = node[i];
      if (isValidElement(child)) {
        validateExplicitKey(child, parentType);
      }
    }
  } else if (isValidElement(node)) {
    // This element was passed in a valid location.
    if (node._store) {
      node._store.validated = true;
    }
  } else if (node) {
    var iteratorFn = getIteratorFn(node);
    if (typeof iteratorFn === 'function') {
      // Entry iterators used to provide implicit keys,
      // but now we print a separate warning for them later.
      if (iteratorFn !== node.entries) {
        var iterator = iteratorFn.call(node);
        var step = void 0;
        while (!(step = iterator.next()).done) {
          if (isValidElement(step.value)) {
            validateExplicitKey(step.value, parentType);
          }
        }
      }
    }
  }
}

/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */
function validatePropTypes(element) {
  var type = element.type;
  if (type === null || type === undefined || typeof type === 'string') {
    return;
  }
  var name = getComponentName(type);
  var propTypes = void 0;
  if (typeof type === 'function') {
    propTypes = type.propTypes;
  } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE ||
  // Note: Memo only checks outer props here.
  // Inner props are checked in the reconciler.
  type.$$typeof === REACT_MEMO_TYPE)) {
    propTypes = type.propTypes;
  } else {
    return;
  }
  if (propTypes) {
    setCurrentlyValidatingElement(element);
    checkPropTypes(propTypes, element.props, 'prop', name, ReactDebugCurrentFrame.getStackAddendum);
    setCurrentlyValidatingElement(null);
  } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
    propTypesMisspellWarningShown = true;
    warningWithoutStack$1(false, 'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');
  }
  if (typeof type.getDefaultProps === 'function') {
    !type.getDefaultProps.isReactClassApproved ? warningWithoutStack$1(false, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : void 0;
  }
}

/**
 * Given a fragment, validate that it can only be provided with fragment props
 * @param {ReactElement} fragment
 */
function validateFragmentProps(fragment) {
  setCurrentlyValidatingElement(fragment);

  var keys = Object.keys(fragment.props);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (key !== 'children' && key !== 'key') {
      warning$1(false, 'Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);
      break;
    }
  }

  if (fragment.ref !== null) {
    warning$1(false, 'Invalid attribute `ref` supplied to `React.Fragment`.');
  }

  setCurrentlyValidatingElement(null);
}

function createElementWithValidation(type, props, children) {
  var validType = isValidElementType(type);

  // We warn in this case but don't throw. We expect the element creation to
  // succeed and there will likely be errors in render.
  if (!validType) {
    var info = '';
    if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
      info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
    }

    var sourceInfo = getSourceInfoErrorAddendum(props);
    if (sourceInfo) {
      info += sourceInfo;
    } else {
      info += getDeclarationErrorAddendum();
    }

    var typeString = void 0;
    if (type === null) {
      typeString = 'null';
    } else if (Array.isArray(type)) {
      typeString = 'array';
    } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
      typeString = '<' + (getComponentName(type.type) || 'Unknown') + ' />';
      info = ' Did you accidentally export a JSX literal instead of a component?';
    } else {
      typeString = typeof type;
    }

    warning$1(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
  }

  var element = createElement.apply(this, arguments);

  // The result can be nullish if a mock or a custom function is used.
  // TODO: Drop this when these are no longer allowed as the type argument.
  if (element == null) {
    return element;
  }

  // Skip key warning if the type isn't valid since our key validation logic
  // doesn't expect a non-string/function type and can throw confusing errors.
  // We don't want exception behavior to differ between dev and prod.
  // (Rendering will throw with a helpful message and as soon as the type is
  // fixed, the key warnings will appear.)
  if (validType) {
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], type);
    }
  }

  if (type === REACT_FRAGMENT_TYPE) {
    validateFragmentProps(element);
  } else {
    validatePropTypes(element);
  }

  return element;
}

function createFactoryWithValidation(type) {
  var validatedFactory = createElementWithValidation.bind(null, type);
  validatedFactory.type = type;
  // Legacy hook: remove it
  {
    Object.defineProperty(validatedFactory, 'type', {
      enumerable: false,
      get: function () {
        lowPriorityWarning$1(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
        Object.defineProperty(this, 'type', {
          value: type
        });
        return type;
      }
    });
  }

  return validatedFactory;
}

function cloneElementWithValidation(element, props, children) {
  var newElement = cloneElement.apply(this, arguments);
  for (var i = 2; i < arguments.length; i++) {
    validateChildKeys(arguments[i], newElement.type);
  }
  validatePropTypes(newElement);
  return newElement;
}

var React = {
  Children: {
    map: mapChildren,
    forEach: forEachChildren,
    count: countChildren,
    toArray: toArray,
    only: onlyChild
  },

  createRef: createRef,
  Component: Component,
  PureComponent: PureComponent,

  createContext: createContext,
  forwardRef: forwardRef,
  lazy: lazy,
  memo: memo,

  useCallback: useCallback,
  useContext: useContext,
  useEffect: useEffect,
  useImperativeHandle: useImperativeHandle,
  useDebugValue: useDebugValue,
  useLayoutEffect: useLayoutEffect,
  useMemo: useMemo,
  useReducer: useReducer,
  useRef: useRef,
  useState: useState,

  Fragment: REACT_FRAGMENT_TYPE,
  StrictMode: REACT_STRICT_MODE_TYPE,
  Suspense: REACT_SUSPENSE_TYPE,

  createElement: createElementWithValidation,
  cloneElement: cloneElementWithValidation,
  createFactory: createFactoryWithValidation,
  isValidElement: isValidElement,

  version: ReactVersion,

  unstable_ConcurrentMode: REACT_CONCURRENT_MODE_TYPE,
  unstable_Profiler: REACT_PROFILER_TYPE,

  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ReactSharedInternals
};



var React$2 = Object.freeze({
	default: React
});

var React$3 = ( React$2 && React ) || React$2;

// TODO: decide on the top-level export form.
// This is hacky but makes it work with both Rollup and Jest.
var react = React$3.default || React$3;

module.exports = react;
  })();
}
});

var react = createCommonjsModule(function (module) {

{
  module.exports = react_development;
}
});

const reactRenderer = node => {
  return (
    react.createElement(
      node.name,
      node.attributes,
      node.children.map(child => ReactSVGRenderer(child))
    )
  )
};

var bac = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"-0.0029152","x2":"127.983","y2":"127.986","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"112","r":"11.5","fill":0,"stroke":0,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"112","r":"9","fill":1,"stroke":1,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var bal = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"0.5","y1":"-0.5","x2":"181.5","y2":"-0.5","transform":"matrix(-0.707107 0.707107 0.707107 0.707107 128.71 0)","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"128","y1":"32.0072","x2":"32.7071","y2":"127.3","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"128","y1":"64.0072","x2":"64.7071","y2":"127.3","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"128","y1":"96.0072","x2":"96.7071","y2":"127.3","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var ban = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 0C128 70.6924 70.6924 128 -1.52588e-05 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var bar = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00292969 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"16","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var bat = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 0C128 35.3462 99.3462 64 64 64C28.6538 64 0 35.3462 0 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var bec = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00280762 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"fill-rule":"evenodd","clip-rule":"evenodd","d":"M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z","fill":0},"children":[]}]}]};
var bel = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var ben = {"name":"g","value":"","attributes":{},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"8","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var bep = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64C92.6538 64 64 92.6538 64 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var ber = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M96 0L96 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var bes = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 128C64 92.6538 35.3462 64 0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00280762 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var bet = {"name":"g","value":"","attributes":{},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"16.0036","y1":"15.9965","x2":"48.0036","y2":"47.9965","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var bex = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"16.0036","y1":"15.9965","x2":"48.0036","y2":"47.9965","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"fill-rule":"evenodd","clip-rule":"evenodd","d":"M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z","fill":0},"children":[]}]};
var bic = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 96C74.9807 96 32 53.0193 32 -4.19629e-06","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var bid = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M32 0C32 70.6925 74.9807 128 128 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64L0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var bil = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"80.0035","y1":"79.9965","x2":"112.004","y2":"111.997","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"fill-rule":"evenodd","clip-rule":"evenodd","d":"M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z","fill":0},"children":[]}]};
var bin = {"name":"g","value":"","attributes":{},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]}]};
var bis = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"128","y1":"64","x2":"-8.87604e-09","y2":"64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"128","y1":"96","x2":"-8.87604e-09","y2":"96","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"128","y1":"32","x2":"-8.87604e-09","y2":"32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var bit = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 0L0 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var bol = {"name":"g","value":"","attributes":{},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"48","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"128","y1":"64","x2":"-4.37114e-08","y2":"64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var bon = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 128C92.6538 128 64 99.3462 64 64C64 28.6538 92.6538 4.215e-07 128 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var bor = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"-0.0029152","x2":"127.983","y2":"127.986","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 128C4.63574e-06 92.6489 14.3309 60.6449 37.5 37.4807","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M32 128C32 101.492 42.7436 77.4939 60.1138 60.1217","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 128C64 110.328 71.1626 94.3287 82.7432 82.7471","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M95.6284 128C95.6284 119.164 99.2097 111.164 105 105.374","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]}]};
var bos = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"-0.0029152","x2":"127.983","y2":"127.986","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var bot = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"32","y1":"2.18557e-08","x2":"32","y2":"128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var bud = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M16 64C16 90.5097 37.4903 112 64 112","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var bur = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M7.37542e-06 -3.56072e-06C1.19529e-06 70.6924 57.3075 128 128 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 0L0 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var bus = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M32 128C32 110.327 17.6731 96 0 96","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00292969 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var byl = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"112","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"112","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00280762 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M22.1288 22.6299C16.0075 28.7511 8.0234 31.874 0.00134547 31.9986M44.7562 45.2573C32.3866 57.6269 16.2133 63.8747 0.00134277 64.0005M67.3836 67.8847C48.7656 86.5027 24.403 95.8749 0.00134412 96.0012","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var byn = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z","fill":1},"children":[]},{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C128 35.3511 113.669 67.3551 90.5 90.5193","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M96 0C96 26.5077 85.2564 50.5061 67.8862 67.8783","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 0C64 17.6721 56.8374 33.6713 45.2568 45.2529","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M32.3716 0C32.3716 8.83603 28.7903 16.8356 23 22.6264","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var byr = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00280762 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"48","cy":"80","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"48","cy":"80","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var byt = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"48","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64L0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M32 0L32 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var dab = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"y1":"-0.5","x2":"45.2548","y2":"-0.5","transform":"matrix(0.707107 -0.707107 -0.707107 -0.707107 79.65 47.6499)","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"112","r":"11.5","fill":0,"stroke":0,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"112","r":"9","fill":1,"stroke":1,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var dac = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 0L0 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 0L64 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64L-5.96046e-08 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var dal = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"-0.0029152","x2":"63.29","y2":"63.2929","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"0.5","y1":"-0.5","x2":"181.5","y2":"-0.5","transform":"matrix(-0.707107 0.707107 0.707107 0.707107 128.71 0)","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"128","y1":"32.0072","x2":"32.7071","y2":"127.3","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"128","y1":"64.0072","x2":"64.7071","y2":"127.3","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"128","y1":"96.0072","x2":"96.7071","y2":"127.3","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var dan = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"64","y1":"2.18557e-08","x2":"64","y2":"128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"96","y1":"2.18557e-08","x2":"96","y2":"128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"16","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var dap = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"80.0035","y1":"79.9964","x2":"112.004","y2":"111.996","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var dar = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M86.6274 86.6274C99.1242 74.1307 99.1242 53.8694 86.6274 41.3726C74.1306 28.8758 53.8694 28.8758 41.3726 41.3726","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M75.3137 75.3137C81.5621 69.0653 81.5621 58.9347 75.3137 52.6863C69.0653 46.4379 58.9347 46.4379 52.6863 52.6863","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M97.9411 97.9411C116.686 79.1959 116.686 48.804 97.9411 30.0589C79.196 11.3137 48.804 11.3137 30.0589 30.0589","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00292969 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var das = {"name":"g","value":"","attributes":{},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"64","y1":"2.18557e-08","x2":"64","y2":"128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"fill-rule":"evenodd","clip-rule":"evenodd","d":"M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z","fill":0},"children":[]}]};
var dat = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 128C92.6538 128 64 99.3462 64 64C64 28.6538 92.6538 -1.54503e-06 128 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var dav = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64L0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M96 64C96 46.3269 81.6731 32 64 32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var deb = {"name":"g","value":"","attributes":{},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 -6.35781e-07C64 35.3462 35.3462 64 0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var dec = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"112","cy":"16","r":"11.5","fill":0,"stroke":0,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"112","cy":"16","r":"9","fill":1,"stroke":1,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var def = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M0 128L128 0","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M0 94L94 0","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M0 64L64 0","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M0 32L32 0","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"112","r":"11.5","fill":0,"stroke":0,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"112","r":"9","fill":1,"stroke":1,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var deg = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 128C64 92.6538 35.3462 64 0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var del = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var dem = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00292969 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 -6.35781e-07C64 35.3462 35.3462 64 0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var den = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M1.52575e-06 96C53.0193 96 96 53.0193 96 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00280762 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var dep = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z","fill":1},"children":[]},{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M32 128C32 101.492 42.7436 77.4939 60.1138 60.1216","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 128C64 110.328 71.1626 94.3287 82.7432 82.7471","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M95.6284 128C95.6284 119.164 99.2097 111.164 105 105.374","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]}]};
var der = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 64L5.59506e-06 0L128 1.11901e-05V64C128 99.3462 99.3462 128 64 128C28.6538 128 -4.6351e-06 99.3462 0 64Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M96 128L96 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var des = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M96 0L96 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var det = {"name":"g","value":"","attributes":{},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"15.9964","y1":"111.996","x2":"47.9964","y2":"79.9964","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var dev = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"96.5","y1":"3.07317e-08","x2":"96.5","y2":"128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"32.5","y1":"3.07317e-08","x2":"32.5","y2":"128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var dex = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"64","y1":"2.18557e-08","x2":"64","y2":"128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"fill-rule":"evenodd","clip-rule":"evenodd","d":"M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z","fill":0},"children":[]}]};
var dib = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"8.74228e-08","y1":"64","x2":"128","y2":"64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"5.25874e-08","y1":"32","x2":"128","y2":"32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var dif = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M60.1244 67.3837C41.5063 48.7657 32.1342 24.4031 32.0079 0.00145601M82.7518 44.7563C70.3822 32.3867 64.1344 16.2134 64.0086 0.00145196M105.379 22.1289C99.258 16.0077 96.1351 8.02351 96.0105 0.00145196","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"0.5","y1":"-0.5","x2":"181.5","y2":"-0.5","transform":"matrix(-0.707107 0.707107 0.707107 0.707107 128.71 0)","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"16","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"16","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"112","r":"11.5","fill":0,"stroke":0,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"112","r":"9","fill":1,"stroke":1,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var dig = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"64.5","y1":"-0.5","x2":"64.5","y2":"127.5","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"16.0035","y1":"15.9965","x2":"48.0035","y2":"47.9965","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"16","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var dil = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"80.0036","y1":"79.9964","x2":"112.004","y2":"111.996","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"0.5","y1":"-0.5","x2":"181.5","y2":"-0.5","transform":"matrix(-0.707107 0.707107 0.707107 0.707107 128.71 0)","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var din = {"name":"g","value":"","attributes":{},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"96","y1":"2.18557e-08","x2":"96","y2":"128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var dir = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M96 64C96 81.6731 81.6731 96 64 96","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"16.0035","y1":"15.9965","x2":"48.0035","y2":"47.9965","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"16","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var dis = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.0029152 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var div = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 0L64 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M-4.19629e-06 96C70.6924 96 128 53.0193 128 5.59506e-06","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M-2.79753e-06 64C70.6924 64 128 35.3462 128 5.59506e-06","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var doc = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M86.6274 86.6274C99.1242 74.1306 99.1242 53.8693 86.6274 41.3725C74.1306 28.8758 53.8694 28.8758 41.3726 41.3725","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"-0.0029152","x2":"127.983","y2":"127.986","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"16","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var dol = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64L0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M-4.19629e-06 16C26.5097 16 48 37.4903 48 64C48 90.5097 26.5097 112 0 112","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var don = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-3.8147e-06 128C-7.24632e-07 92.6538 28.6538 64 64 64C99.3462 64 128 92.6538 128 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var dop = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 112C90.5097 112 112 90.5097 112 64C112 37.4903 90.5097 16 64 16","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64L0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var dor = {"name":"g","value":"","attributes":{},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"line","value":"","attributes":{"y1":"63.5","x2":"128","y2":"63.5","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var dos = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"-0.0029152","x2":"127.983","y2":"127.986","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M86.6274 86.6274C99.1242 74.1306 99.1242 53.8693 86.6274 41.3725C74.1306 28.8758 53.8694 28.8758 41.3726 41.3725","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var dot = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var dov = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 0L0 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.701724 31.9914C25.6281 31.9914 49.4822 42.5913 66.8261 59.7565M-0.701723 63.9914C16.7916 63.9914 32.6456 71.0098 44.1982 82.3844M-0.701722 95.9914C7.955 95.9914 15.8089 99.4288 21.5694 105.013","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M0 0C35.3511 0 67.3551 14.3309 90.5193 37.5","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var doz = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 0L0 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M30.0589 97.9411C11.3137 79.1959 11.3137 48.804 30.0589 30.0589C48.804 11.3137 79.196 11.3137 97.9411 30.0589","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M52.6863 75.3137C46.4379 69.0653 46.4379 58.9347 52.6863 52.6863C58.9347 46.4379 69.0653 46.4379 75.3137 52.6863","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M41.3726 86.6274C28.8758 74.1307 28.8758 53.8694 41.3726 41.3726C53.8694 28.8758 74.1306 28.8758 86.6274 41.3726","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var duc = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64L0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 32L0 32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var dul = {"name":"g","value":"","attributes":{},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 16C90.5097 16 112 37.4903 112 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 64L64 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var dun = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M112 64C112 37.4903 90.5097 16 64 16","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var dur = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M0 64L5.59506e-06 0L128 1.11901e-05V64C128 99.3462 99.3462 128 64 128C28.6538 128 -4.6351e-06 99.3462 0 64Z","fill":1},"children":[]}]};
var dus = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M32 -3.05151e-06C32 53.0193 74.9807 96 128 96","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 0L0 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var dut = {"name":"g","value":"","attributes":{},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var dux = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-2.79795e-06 -3.55988e-06C70.6924 -4.40288e-06 128 57.3075 128 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var dyl = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M2.03434e-06 128C70.6924 128 128 70.6925 128 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var dyn = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 32L0 32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var dyr = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00292969 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var dys = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-3.8147e-06 1.11901e-05C-7.24633e-07 35.3462 28.6538 64 64 64C99.3462 64 128 35.3462 128 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var dyt = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64L0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var fab = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 0L0 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"112","r":"11.5","fill":0,"stroke":0,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"112","r":"9","fill":1,"stroke":1,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var fad = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var fal = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M0 128L128 0","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C35.3511 0 67.3551 14.3309 90.5193 37.5","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M0 32C26.5077 32 50.5061 42.7436 67.8783 60.1138","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M0 64C17.6721 64 33.6713 71.1626 45.2529 82.7432","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M0 95.6284C8.83603 95.6284 16.8356 99.2097 22.6264 105","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]}]};
var fam = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"128","y1":"64","x2":"-4.37114e-08","y2":"64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"64","y1":"2.18557e-08","x2":"64","y2":"128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var fan = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 0L0 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 0L64 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00292969 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var fas = {"name":"g","value":"","attributes":{},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var feb = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M7.37542e-06 -3.56072e-06C1.19529e-06 70.6924 57.3075 128 128 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var fed = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 32L0 32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var fel = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"y1":"-0.5","x2":"45.2548","y2":"-0.5","transform":"matrix(0.707107 -0.707107 -0.707107 -0.707107 79.65 47.6499)","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var fen = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00280762 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 128C4.63574e-06 92.6489 14.3309 60.6449 37.5 37.4807","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M32 128C32 101.492 42.7436 77.4939 60.1138 60.1217","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 128C64 110.328 71.1626 94.3287 82.7432 82.7471","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M95.6284 128C95.6284 119.164 99.2097 111.164 105 105.374","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]}]};
var fep = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 0L0 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var fer = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 0L64 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var fes = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M32 0L32 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var fet = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 0L0 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var fex = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"y1":"-0.5","x2":"45.2548","y2":"-0.5","transform":"matrix(0.707107 -0.707107 -0.707107 -0.707107 79.6499 47.6499)","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"fill-rule":"evenodd","clip-rule":"evenodd","d":"M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z","fill":0},"children":[]}]};
var fid = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00291443 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var fig = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 0L64 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"16","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var fil = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"128","y1":"64","x2":"-4.37114e-08","y2":"64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"64","y1":"2.18557e-08","x2":"64","y2":"128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"32","y1":"2.18557e-08","x2":"32","y2":"128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var fin = {"name":"g","value":"","attributes":{},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"98","y1":"2.18557e-08","x2":"98","y2":"128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var fip = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"-0.0029152","x2":"127.983","y2":"127.986","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var fir = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"y1":"-0.5","x2":"45.2548","y2":"-0.5","transform":"matrix(0.707107 -0.707107 -0.707107 -0.707107 79.65 47.6499)","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"80.0036","y1":"79.9965","x2":"112.004","y2":"111.997","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"16.0035","y1":"15.9965","x2":"48.0035","y2":"47.9965","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var fit = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"0.5","y1":"-0.5","x2":"181.5","y2":"-0.5","transform":"matrix(-0.707107 0.707107 0.707107 0.707107 128.71 0)","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var fod = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"fill-rule":"evenodd","clip-rule":"evenodd","d":"M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z","fill":0},"children":[]}]};
var fog = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00292969 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M86.6274 86.6274C99.1242 74.1306 99.1242 53.8694 86.6274 41.3726C74.1306 28.8758 53.8694 28.8758 41.3726 41.3726","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"16","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var fol = {"name":"g","value":"","attributes":{},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"16","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"128","y1":"64","x2":"-4.37114e-08","y2":"64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var fon = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"-0.0029152","x2":"127.983","y2":"127.986","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var fop = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"-0.0029152","x2":"127.983","y2":"127.986","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M16 64C16 90.5097 37.4903 112 64 112","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var fos = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"-0.0029152","x2":"127.983","y2":"127.986","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M96 0C96 53.0193 53.0193 96 0 96","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 0C64 35.3462 35.3462 64 0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M32 0C32 17.6731 17.6731 32 0 32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var fot = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"15.9964","y1":"111.997","x2":"47.9964","y2":"79.9965","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var ful = {"name":"g","value":"","attributes":{},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 96C81.6731 96 96 81.6731 96 64C96 46.3269 81.6731 32 64 32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var fun = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 64V128H0L2.79753e-06 64C4.34256e-06 28.6538 28.6538 -1.54503e-06 64 0C99.3462 1.54503e-06 128 28.6538 128 64Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"15.9964","y1":"111.997","x2":"47.9964","y2":"79.9965","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00280762 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"112","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"112","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var fur = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 0L0 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M86.8823 41.6275C74.3855 29.1307 54.1242 29.1307 41.6274 41.6275C29.1307 54.1243 29.1307 74.3855 41.6274 86.8823","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"16","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var fus = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 0L0 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M32 128C32 110.327 17.6731 96 0 96","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var fyl = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M22.1288 22.6299C16.0075 28.7511 8.0234 31.874 0.00134547 31.9986M44.7562 45.2573C32.3866 57.6269 16.2133 63.8747 0.00134277 64.0005M67.3836 67.8847C48.7656 86.5027 24.403 95.8749 0.00134412 96.0012","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00280762 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var fyn = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 0L0 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var fyr = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00268555 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"y1":"-0.5","x2":"45.2548","y2":"-0.5","transform":"matrix(0.707107 -0.707107 -0.707107 -0.707107 79.6499 47.6499)","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var hab = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"0.5","y1":"-0.5","x2":"181.5","y2":"-0.5","transform":"matrix(-0.707107 0.707107 0.707107 0.707107 128.71 0)","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M60.1244 67.3837C41.5063 48.7657 32.1342 24.4031 32.0079 0.00145601M82.7518 44.7563C70.3822 32.3867 64.1344 16.2134 64.0086 0.00145196M105.379 22.1289C99.258 16.0077 96.1351 8.02351 96.0105 0.00145196","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"112","r":"11.5","fill":0,"stroke":0,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"112","r":"9","fill":1,"stroke":1,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var hac = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"0.5","y1":"-0.5","x2":"181.5","y2":"-0.5","transform":"matrix(-0.707107 0.707107 0.707107 0.707107 128.71 0)","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var had = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var hal = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"64.5","y1":"-0.5","x2":"64.5","y2":"127.5","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M16 64C16 90.5097 37.4903 112 64 112","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M112 64C112 37.4903 90.5097 16 64 16","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var han = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z","fill":1},"children":[]}]};
var hap = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"48","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00292969 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var har = {"name":"g","value":"","attributes":{},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"64","y1":"2.18557e-08","x2":"64","y2":"128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"16","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var has$1 = {"name":"g","value":"","attributes":{},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var hat = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"16","r":"8","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"0.5","y1":"-0.5","x2":"181.5","y2":"-0.5","transform":"matrix(-0.707107 0.707107 0.707107 0.707107 128.71 0)","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"fill-rule":"evenodd","clip-rule":"evenodd","d":"M48 32C48 40.8366 40.8366 48 32 48C23.1634 48 16 40.8366 16 32C16 23.1634 23.1634 16 32 16C40.8366 16 48 23.1634 48 32ZM32 40C36.4183 40 40 36.4183 40 32C40 27.5817 36.4183 24 32 24C27.5817 24 24 27.5817 24 32C24 36.4183 27.5817 40 32 40Z","fill":0},"children":[]}]}]};
var hav = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"96","y1":"2.18557e-08","x2":"96","y2":"128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var heb = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M2.03434e-06 128C70.6924 128 128 70.6925 128 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var hec = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var hep = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"-0.00285417","x2":"127.983","y2":"127.986","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00292969 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var hes = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M32 0L32 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"fill-rule":"evenodd","clip-rule":"evenodd","d":"M48 96C48 104.837 40.8366 112 32 112C23.1634 112 16 104.837 16 96C16 87.1634 23.1634 80 32 80C40.8366 80 48 87.1634 48 96ZM32 104C36.4183 104 40 100.418 40 96C40 91.5817 36.4183 88 32 88C27.5817 88 24 91.5817 24 96C24 100.418 27.5817 104 32 104Z","fill":0},"children":[]}]}]};
var het = {"name":"g","value":"","attributes":{},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M96 128L96 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var hex = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 0L0 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"fill-rule":"evenodd","clip-rule":"evenodd","d":"M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z","fill":0},"children":[]}]}]};
var hid = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00292969 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M2.03434e-06 128C70.6924 128 128 70.6925 128 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M1.52575e-06 96C53.0193 96 96 53.0193 96 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M1.01717e-06 64C35.3462 64 64 35.3462 64 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M5.08584e-07 32C17.6731 32 32 17.6731 32 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var hil = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"8.74228e-08","y1":"64","x2":"128","y2":"64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"64","y1":"2.18557e-08","x2":"64","y2":"128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var hin = {"name":"g","value":"","attributes":{},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"32","y1":"2.18557e-08","x2":"32","y2":"128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"fill-rule":"evenodd","clip-rule":"evenodd","d":"M48 64C48 72.8366 40.8366 80 32 80C23.1634 80 16 72.8366 16 64C16 55.1634 23.1634 48 32 48C40.8366 48 48 55.1634 48 64ZM32 72C36.4183 72 40 68.4183 40 64C40 59.5817 36.4183 56 32 56C27.5817 56 24 59.5817 24 64C24 68.4183 27.5817 72 32 72Z","fill":0},"children":[]}]};
var hob = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M128 64V128H0L2.79753e-06 64C4.34256e-06 28.6538 28.6538 -1.54503e-06 64 0C99.3462 1.54503e-06 128 28.6538 128 64Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"128","y1":"64","x2":"-4.37114e-08","y2":"64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var hoc = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"y1":"-0.5","x2":"45.2548","y2":"-0.5","transform":"matrix(0.707107 -0.707107 -0.707107 -0.707107 79.65 47.6499)","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var hod = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"80","y1":"2.18557e-08","x2":"80","y2":"128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var hol = {"name":"g","value":"","attributes":{},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"128","y1":"64","x2":"-4.37114e-08","y2":"64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"16","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var hop = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64L0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 96C81.6731 96 96 81.6731 96 64C96 46.3269 81.6731 32 64 32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var hos = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"80.0036","y1":"79.9965","x2":"112.004","y2":"111.997","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"16.0036","y1":"15.9965","x2":"48.0036","y2":"47.9965","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"48","cy":"48","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"48","cy":"48","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"80","cy":"47","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"80","cy":"47","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"80","cy":"81","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"80","cy":"81","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"48","cy":"80","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"48","cy":"80","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var hul = {"name":"g","value":"","attributes":{},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"48","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"48","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var hus = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00292969 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 96C46.3269 96 32 81.6731 32 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var hut = {"name":"g","value":"","attributes":{},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"48","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var lab = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"-0.0029152","x2":"127.983","y2":"127.986","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"y1":"-0.5","x2":"45.2548","y2":"-0.5","transform":"matrix(0.707107 -0.707107 -0.707107 -0.707107 79.65 47.6499)","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"15.9964","y1":"111.997","x2":"47.9964","y2":"79.9965","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var lac = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 -9.40976e-06C64 70.6924 92.6538 128 128 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M32 -7.63193e-07C32 70.6924 74.9807 128 128 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 64L0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]}]};
var lad = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"95.35","y1":"32.7071","x2":"32.0571","y2":"96","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var lag = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 112C90.5097 112 112 90.5097 112 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var lan = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"64","y1":"2.18557e-08","x2":"64","y2":"128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"32","y1":"2.18557e-08","x2":"32","y2":"128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"16","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var lap = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M112 64C112 37.4903 90.5097 16 64 16","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"112","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"112","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var lar = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"2.78181e-08","y1":"64","x2":"128","y2":"64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"16","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var las = {"name":"g","value":"","attributes":{},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"48","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var lat = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M2.03434e-06 128C70.6924 128 128 70.6925 128 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M1.52575e-06 96C53.0193 96 96 53.0193 96 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M1.01717e-06 64C35.3462 64 64 35.3462 64 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M5.08584e-07 32C17.6731 32 32 17.6731 32 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var lav = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z","fill":1},"children":[]},{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C92.6489 128 60.6449 113.669 37.4807 90.5","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 96C101.492 96 77.4939 85.2564 60.1217 67.8862","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64C110.328 64 94.3287 56.8374 82.7471 45.2568","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 32.3716C119.164 32.3716 111.164 28.7903 105.374 23","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]}]};
var leb = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-1.64036e-05 32C53.0193 32 96 74.9807 96 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var lec = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00292969 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var led = {"name":"g","value":"","attributes":{},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var leg = {"name":"g","value":"","attributes":{},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M7.63192e-07 32C17.6731 32 32 46.3269 32 64C32 81.6731 17.6731 96 0 96","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var len = {"name":"g","value":"","attributes":{},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"48","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var lep = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 96C110.327 96 96 110.327 96 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var ler = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M32 0L32 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var lev = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var lex = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00292969 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"15.9965","y1":"111.997","x2":"47.9965","y2":"79.9965","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"fill-rule":"evenodd","clip-rule":"evenodd","d":"M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z","fill":0},"children":[]}]}]};
var lib = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64C92.6538 64 64 92.6538 64 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 64L0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]}]};
var lid = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"16.0036","y1":"15.9965","x2":"48.0036","y2":"47.9965","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 0L0 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var lig = {"name":"g","value":"","attributes":{},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"48","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var lin = {"name":"g","value":"","attributes":{},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"64","y1":"128","x2":"64","y2":"-6.55671e-08","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"80","cy":"64","r":"8","fill":0},"children":[]}]};
var lis = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64L0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M-4.70488e-06 64C35.3462 64 64 35.3462 64 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var lit = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00286865 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C128 35.3511 113.669 67.3551 90.5 90.5193","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M96 0C96 26.5077 85.2564 50.5061 67.8862 67.8783","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 0C64 17.6721 56.8374 33.6713 45.2568 45.2529","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M32.3716 0C32.3716 8.83603 28.7903 16.8356 23 22.6264","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]}]};
var liv = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-5.21346e-06 32C70.6924 32 128 17.6731 128 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M3.4331e-06 96C70.6924 96 128 53.0193 128 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 0L64 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var loc = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 96C74.9807 96 32 53.0193 32 -4.19629e-06","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var lod = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M16 64C16 90.5097 37.4903 112 64 112","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var lom = {"name":"g","value":"","attributes":{},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var lon = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M2.03434e-06 128C70.6924 128 128 70.6925 128 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M1.52575e-06 96C53.0193 96 96 53.0193 96 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M1.01717e-06 64C35.3462 64 64 35.3462 64 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M5.08584e-07 32C17.6731 32 32 17.6731 32 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var lop = {"name":"g","value":"","attributes":{},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"128","y1":"64","x2":"-8.87604e-09","y2":"64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"128","y1":"32","x2":"-8.87604e-09","y2":"32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var lor = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"64","y1":"2.18557e-08","x2":"64","y2":"128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var los = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"-0.0029152","x2":"127.983","y2":"127.986","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var luc = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"128","y1":"64","x2":"-8.87604e-09","y2":"64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64L0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 96L0 96","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var lud = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64L0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M32 0L32 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 0L64 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M96 0L96 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var lug = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 128H0L5.59506e-06 -7.62939e-06L64 -2.03434e-06C99.3462 1.05573e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z","fill":1},"children":[]}]};
var lun = {"name":"g","value":"","attributes":{},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var lup = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 128H0L5.59506e-06 -7.62939e-06L64 -2.03434e-06C99.3462 1.05573e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 16C90.5097 16 112 37.4903 112 64C112 90.5097 90.5097 112 64 112","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"128","y1":"64","x2":"-8.87604e-09","y2":"64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var lur = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 0L64 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M96 0L96 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M32 0L32 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var lus = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 0L0 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var lut = {"name":"g","value":"","attributes":{},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var lux = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"fill-rule":"evenodd","clip-rule":"evenodd","d":"M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z","fill":0},"children":[]}]};
var lyd = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00280762 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var lyn = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M32 0L32 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var lyr = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00268555 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"80","cy":"48","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"80","cy":"48","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var lys = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"112","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"112","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var lyt = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 0L0 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"80.0035","y1":"79.9965","x2":"112.003","y2":"111.997","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"16","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var lyx = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00292969 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var mac = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"112","r":"11.5","fill":0,"stroke":0,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"112","r":"9","fill":1,"stroke":1,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var mag = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64L0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var mal = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"80.0035","y1":"79.9964","x2":"112.004","y2":"111.996","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"112","r":"11.5","fill":0,"stroke":0,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"112","r":"9","fill":1,"stroke":1,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var map = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"80.0036","y1":"79.9965","x2":"112.004","y2":"111.997","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var mar = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.0029152 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 64L64 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M86.6274 86.6274C99.1242 74.1307 99.1242 53.8694 86.6274 41.3726C74.1306 28.8758 53.8694 28.8758 41.3726 41.3726","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M75.3137 75.3137C81.5621 69.0653 81.5621 58.9347 75.3137 52.6863C69.0653 46.4379 58.9347 46.4379 52.6863 52.6863","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M97.9411 97.9411C116.686 79.1959 116.686 48.804 97.9411 30.0589C79.196 11.3137 48.804 11.3137 30.0589 30.0589","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var mas = {"name":"g","value":"","attributes":{},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"fill-rule":"evenodd","clip-rule":"evenodd","d":"M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z","fill":0},"children":[]}]};
var mat = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 32C110.327 32 96 17.6731 96 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var meb = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M32 -3.05151e-06C32 53.0193 74.9807 96 128 96","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var mec = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"80.0035","y1":"79.9965","x2":"112.003","y2":"111.997","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var med = {"name":"g","value":"","attributes":{},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var meg = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64C92.6538 64 64 92.6538 64 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var mel = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"15.9964","y1":"111.997","x2":"47.9964","y2":"79.9965","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var mep = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64L0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 96L0 96","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 32L0 32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var mer = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M32 0L32 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var mes = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00280762 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"15.9964","y1":"111.996","x2":"47.9964","y2":"79.9964","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var met = {"name":"g","value":"","attributes":{},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M32 128L32 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var mev = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"16","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var mex = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00292969 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"fill-rule":"evenodd","clip-rule":"evenodd","d":"M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z","fill":0},"children":[]}]}]};
var mic = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-2.09815e-06 80C26.5097 80 48 101.49 48 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var mid = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"128","y1":"64","x2":"-4.37114e-08","y2":"64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64C92.6538 64 64 92.6538 64 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var mig = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"64","y1":"2.18557e-08","x2":"64","y2":"128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"80.0036","y1":"79.9965","x2":"112.004","y2":"111.997","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"16","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var mil = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"128","y1":"64","x2":"-4.37114e-08","y2":"64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"128","y1":"32","x2":"-4.37114e-08","y2":"32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"128","y1":"96","x2":"-4.37114e-08","y2":"96","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var min = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"-0.0029152","x2":"127.983","y2":"127.986","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var mip = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"64","y1":"2.18557e-08","x2":"64","y2":"128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 128C92.6538 128 64 99.3462 64 64C64 28.6538 92.6538 4.215e-07 128 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"16","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var mir = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"16.0036","y1":"15.9964","x2":"48.0036","y2":"47.9964","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M96 64C96 46.3269 81.6731 32 64 32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"16","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var mis = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64C92.6538 64 64 92.6538 64 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00286865 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var mit = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"0.5","y1":"-0.5","x2":"181.5","y2":"-0.5","transform":"matrix(-0.707107 0.707107 0.707107 0.707107 128.71 0)","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var moc = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64L0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 96L0 96","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 32L0 32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var mod = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M0 96L128 96","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"16.0035","y1":"15.9965","x2":"48.0035","y2":"47.9965","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var mog = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"-0.0029152","x2":"127.983","y2":"127.986","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"16","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var mol = {"name":"g","value":"","attributes":{},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"128","y1":"64","x2":"-4.37114e-08","y2":"64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M112 64C112 90.5097 90.5097 112 64 112C37.4903 112 16 90.5097 16 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M112 0C112 26.5097 90.5097 48 64 48C37.4903 48 16 26.5097 16 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var mon = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"fill-rule":"evenodd","clip-rule":"evenodd","d":"M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z","fill":0},"children":[]}]};
var mop = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"-0.0029152","x2":"127.983","y2":"127.986","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var mor = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"16.0035","y1":"15.9964","x2":"48.0035","y2":"47.9964","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"15.9964","y1":"111.996","x2":"47.9964","y2":"79.9964","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var mos = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"0.5","y1":"-0.5","x2":"181.5","y2":"-0.5","transform":"matrix(-0.707107 0.707107 0.707107 0.707107 128.71 0)","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var mot = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 96C110.327 96 96 81.6731 96 64C96 46.3269 110.327 32 128 32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var mud = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00292969 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"80","cy":"80","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"80","cy":"80","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var mug = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 96C81.6731 96 96 81.6731 96 64C96 46.3269 81.6731 32 64 32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var mul = {"name":"g","value":"","attributes":{},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"80.0035","y1":"79.9964","x2":"112.003","y2":"111.996","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M112 64C112 37.4903 90.5097 16 64 16","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var mun = {"name":"g","value":"","attributes":{},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64C92.6538 64 64 35.3462 64 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var mur = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64L0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var mus = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"0.5","y1":"-0.5","x2":"181.5","y2":"-0.5","transform":"matrix(-0.707107 0.707107 0.707107 0.707107 128.71 0)","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M96 128C96 74.9807 53.0193 32 0 32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var mut = {"name":"g","value":"","attributes":{},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var myl = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"16.0035","y1":"15.9965","x2":"48.0035","y2":"47.9965","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"16","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"16","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var myn = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 1.52638e-06C57.3076 -7.74381e-06 9.2702e-06 57.3075 0 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 32C74.9807 32 32 74.9807 32 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64C92.6538 64 64 92.6538 64 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 96C110.327 96 96 110.327 96 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var myr = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00292969 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var nac = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"16","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"112","r":"11.5","fill":0,"stroke":0,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"112","r":"9","fill":1,"stroke":1,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var nal = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"-0.0029152","x2":"127.983","y2":"127.986","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M2.82114e-06 110C60.7513 110 110 60.7513 110 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M-5.09828e-06 73C40.3168 73 73 40.3168 73 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M-6.63647e-07 37C20.4345 37 37 20.4345 37 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var nam = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"8.74228e-08","y1":"64","x2":"128","y2":"64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"112","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"112","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var nap = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"64","y1":"2.18557e-08","x2":"64","y2":"128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var nar = {"name":"g","value":"","attributes":{},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"8","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var nat = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-1.52588e-05 128C-9.07866e-06 57.3075 57.3076 1.44926e-06 128 7.62939e-06","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var nav = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 96C101.492 96 77.4939 85.2564 60.1217 67.8862","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64C110.328 64 94.3287 56.8374 82.7471 45.2568","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 32.3716C119.164 32.3716 111.164 28.7903 105.374 23","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]}]};
var neb = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 32C74.9807 32 32 74.9807 32 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var nec = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 0L64 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var ned = {"name":"g","value":"","attributes":{},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var nel = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00268555 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M96 1.90735e-06C96 53.0193 53.0193 96 0 96","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var nem = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00292969 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64C92.6538 64 64 92.6538 64 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var nep = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 128C57.3076 128 3.09007e-06 70.6925 0 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 96C74.9807 96 32 53.0193 32 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64C92.6538 64 64 35.3462 64 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 32C110.327 32 96 17.6731 96 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var ner = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 0L64 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"15.9965","y1":"111.997","x2":"47.9965","y2":"79.9965","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var nes = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 0L64 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var net = {"name":"g","value":"","attributes":{},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 64L64 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var nev = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"16","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var nex = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 128H0L5.59506e-06 -7.62939e-06L64 -2.03434e-06C99.3462 1.05573e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"80.0035","y1":"79.9964","x2":"112.003","y2":"111.996","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"fill-rule":"evenodd","clip-rule":"evenodd","d":"M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z","fill":0},"children":[]}]};
var nib = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64L0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 96L0 96","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var nid = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64L0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 128C92.6538 128 64 70.6925 64 7.63192e-07","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var nil = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"128","y1":"64","x2":"-8.87604e-09","y2":"64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"128","y1":"32","x2":"-8.87604e-09","y2":"32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var nim = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M128 64V128H0L2.79753e-06 64C4.34256e-06 28.6538 28.6538 -1.54503e-06 64 0C99.3462 1.54503e-06 128 28.6538 128 64Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"64","y1":"2.18557e-08","x2":"64","y2":"128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var nis = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 32C74.9807 32 32 74.9807 32 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00285435 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var noc = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"64","y1":"2.18557e-08","x2":"64","y2":"128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var nod = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var nol = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"128","y1":"64","x2":"1.51277e-05","y2":"64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var nom = {"name":"g","value":"","attributes":{},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var nop = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"-0.0029152","x2":"127.983","y2":"127.986","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"y1":"-0.5","x2":"45.2548","y2":"-0.5","transform":"matrix(0.707107 -0.707107 -0.707107 -0.707107 79.65 47.65)","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var nor = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 96C46.3269 96 32 81.6731 32 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var nos = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"0.5","y1":"-0.5","x2":"181.5","y2":"-0.5","transform":"matrix(-0.707107 0.707107 0.707107 0.707107 128.71 0)","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var nov = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"-0.0029152","x2":"127.983","y2":"127.986","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M2.03434e-06 128C70.6924 128 128 70.6925 128 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M1.52575e-06 96C53.0193 96 96 53.0193 96 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M1.01717e-06 64C35.3462 64 64 35.3462 64 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M5.08584e-07 32C17.6731 32 32 17.6731 32 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var nub = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64L0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var nul = {"name":"g","value":"","attributes":{},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var num = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 0L0 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var nup = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 128H0L5.59506e-06 -7.62939e-06L64 -2.03434e-06C99.3462 1.05573e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 16C90.5097 16 112 37.4903 112 64C112 90.5097 90.5097 112 64 112","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var nus = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00280762 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M0.000105172 128C35.3582 128 67.3679 113.664 90.5332 90.4863","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"31","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"31","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var nut = {"name":"g","value":"","attributes":{},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"80.0035","y1":"79.9964","x2":"112.003","y2":"111.996","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"y1":"-0.5","x2":"45.2548","y2":"-0.5","transform":"matrix(0.707107 -0.707107 -0.707107 -0.707107 79.6499 47.6499)","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var nux = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64L0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 96L0 96","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 32L0 32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var nyd = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00292969 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"16","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var nyl = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00292969 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 128C4.63574e-06 92.6489 14.3309 60.6449 37.5 37.4807","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M32 128C32 101.492 42.7436 77.4939 60.1138 60.1217","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 128C64 110.328 71.1626 94.3287 82.7432 82.7471","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M95.6284 128C95.6284 119.164 99.2097 111.164 105 105.374","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]}]};
var nym = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 0L64 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M96 0L96 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M32 0L32 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var nyr = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00268555 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M95.9984 0C95.9984 26.3298 85.3985 50.1839 68.2332 67.5278M63.9983 0C63.9983 17.4933 56.9799 33.3473 45.6054 44.8999M31.9983 0C31.9983 8.65672 28.5609 16.5106 22.9766 22.2711","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var nys = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"112","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"112","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var nyt = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64L0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 32C81.6731 32 96 46.3269 96 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 16C90.5097 16 112 37.4903 112 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var nyx = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00292969 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"fill-rule":"evenodd","clip-rule":"evenodd","d":"M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z","fill":0},"children":[]}]}]};
var pac = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 0L0 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"16","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var pad = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var pag = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"15.9964","y1":"111.997","x2":"47.9964","y2":"79.9965","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var pal = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 0L0 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 96C101.492 96 77.4939 85.2564 60.1217 67.8862","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64C110.328 64 94.3287 56.8374 82.7471 45.2568","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 32.3716C119.164 32.3716 111.164 28.7903 105.374 23","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]}]};
var pan = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"0.5","y1":"-0.5","x2":"181.5","y2":"-0.5","transform":"matrix(-0.707107 0.707107 0.707107 0.707107 128.71 0)","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M41.3726 86.6274C28.8758 74.1306 28.8758 53.8693 41.3726 41.3725C53.8694 28.8758 74.1306 28.8758 86.6274 41.3725","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var par = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"0.5","y1":"-0.5","x2":"181.5","y2":"-0.5","transform":"matrix(-0.707107 0.707107 0.707107 0.707107 128.693 0)","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"16","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var pas = {"name":"g","value":"","attributes":{},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M32 0L32 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 0L64 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M96 0L96 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var pat = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M32 -2.67054e-06C32 53.0193 74.9807 96 128 96","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 -1.78036e-06C64 35.3462 92.6538 64 128 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M96 -8.9018e-07C96 17.6731 110.327 32 128 32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var pec = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 0L0 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var ped = {"name":"g","value":"","attributes":{},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var peg = {"name":"g","value":"","attributes":{},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M96 0C96 17.6731 81.6731 32 64 32C46.3269 32 32 17.6731 32 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var pel = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M112 64C112 37.4903 90.5097 16 64 16","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var pem = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00280762 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 128C64 92.6538 35.3462 64 0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var pen = {"name":"g","value":"","attributes":{},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M96 0C96 17.6731 81.6731 32 64 32C46.3269 32 32 17.6731 32 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M-0.00292969 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var per = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M0 64L5.59506e-06 0L128 1.11901e-05V64C128 99.3462 99.3462 128 64 128C28.6538 128 -4.6351e-06 99.3462 0 64Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 0L64 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var pes = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 112C90.5097 112 112 90.5097 112 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"-0.00285417","x2":"127.983","y2":"127.986","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var pet = {"name":"g","value":"","attributes":{},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"80.0035","y1":"79.9964","x2":"112.003","y2":"111.996","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var pex = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"fill-rule":"evenodd","clip-rule":"evenodd","d":"M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z","fill":0},"children":[]}]};
var pic = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M96 128C96 74.9807 53.0193 32 0 32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 128C64 92.6538 35.3462 64 0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M32 128C32 110.327 17.6731 96 0 96","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var pid = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"-0.0029152","x2":"127.983","y2":"127.986","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"112","r":"11.5","fill":0,"stroke":0,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"112","r":"9","fill":1,"stroke":1,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var pil = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"0.5","y1":"-0.5","x2":"181.5","y2":"-0.5","transform":"matrix(-0.707107 0.707107 0.707107 0.707107 128.71 0)","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var pin = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M32 0L32 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var pit = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"0.5","y1":"-0.5","x2":"181.5","y2":"-0.5","transform":"matrix(-0.707107 0.707107 0.707107 0.707107 128.71 0)","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"112","r":"11.5","fill":0,"stroke":0,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"112","r":"9","fill":1,"stroke":1,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var poc = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"64.5","y1":"-0.5","x2":"64.5","y2":"127.5","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"96.5","y1":"-0.5","x2":"96.5","y2":"127.5","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"32.5","y1":"-0.5","x2":"32.5","y2":"127.5","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var pod = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"128","y1":"96","x2":"-8.87604e-09","y2":"96","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var pol = {"name":"g","value":"","attributes":{},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"48","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"128","y1":"32","x2":"-8.87604e-09","y2":"32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var pon = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z","fill":1},"children":[]}]};
var pos = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"-0.0029152","x2":"127.983","y2":"127.986","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var pub = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M32 0L32 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var pun = {"name":"g","value":"","attributes":{},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M112 64C112 37.4903 90.5097 16 64 16","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M96 64C96 46.3269 81.6731 32 64 32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M80 64C80 55.1634 72.8366 48 64 48","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var pur = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00292969 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M3.73284e-05 64C17.6633 64 33.6554 56.8445 45.2356 45.2741","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var put = {"name":"g","value":"","attributes":{},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var pyl = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-5.59506e-06 128C35.3462 128 64 99.3462 64 64C64 28.6538 35.3462 1.54503e-06 0 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var pyx = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00292969 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var rab = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00292969 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"15.9965","y1":"111.997","x2":"47.9964","y2":"79.9965","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var rac = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"112","r":"11.5","fill":0,"stroke":0,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"112","r":"9","fill":1,"stroke":1,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var rad = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var rag = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"16.0036","y1":"15.9965","x2":"48.0036","y2":"47.9965","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var ral = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"16","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var ram = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"64","y1":"2.18557e-08","x2":"64","y2":"128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"fill-rule":"evenodd","clip-rule":"evenodd","d":"M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z","fill":0},"children":[]}]};
var ran = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 0L64 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00291443 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"16","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var rap = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"64","y1":"-1.29797e-08","x2":"64","y2":"128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var rav = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 32L0 32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var reb = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 -9.40976e-06C57.3075 -6.31969e-06 -3.09007e-06 57.3075 0 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var rec = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var red = {"name":"g","value":"","attributes":{},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var ref = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00292969 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"112","r":"11.5","fill":0,"stroke":0,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"112","r":"9","fill":1,"stroke":1,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var reg = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 96C110.327 96 96 81.6731 96 64C96 46.3269 110.327 32 128 32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var rel = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64L0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 96L0 96","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 32L0 32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var rem = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00292969 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64C92.6538 64 64 35.3462 64 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var ren = {"name":"g","value":"","attributes":{},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"80.0035","y1":"79.9965","x2":"112.003","y2":"111.997","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"16","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var rep = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M32 128C32 74.9807 74.9807 32 128 32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var res = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"80.0035","y1":"79.9965","x2":"112.003","y2":"111.997","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var ret = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64L0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var rev = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"15.9965","y1":"111.997","x2":"53.9965","y2":"73.9965","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"112","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"112","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"fill-rule":"evenodd","clip-rule":"evenodd","d":"M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z","fill":0},"children":[]}]};
var rex = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64L0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"fill-rule":"evenodd","clip-rule":"evenodd","d":"M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z","fill":0},"children":[]}]}]};
var rib = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"8.74228e-08","y1":"64","x2":"128","y2":"64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"64","y1":"2.18557e-08","x2":"64","y2":"128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var ric = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M96 128C96 74.9807 53.0193 32 0 32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var rid = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 0L64 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M96 0L96 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var rig = {"name":"g","value":"","attributes":{},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var ril = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"0.5","y1":"-0.5","x2":"181.5","y2":"-0.5","transform":"matrix(-0.707107 0.707107 0.707107 0.707107 128.693 0)","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var rin = {"name":"g","value":"","attributes":{},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"64","y1":"2.18557e-08","x2":"64","y2":"128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"32","y1":"2.18557e-08","x2":"32","y2":"128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var rip = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00292969 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M96 64C96 46.3269 81.6731 32 64 32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var ris = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"-0.0029152","x2":"127.983","y2":"127.986","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C128 35.3511 113.669 67.3551 90.5 90.5193","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M96 0C96 26.5077 85.2564 50.5061 67.8862 67.8783","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 0C64 17.6721 56.8374 33.6713 45.2568 45.2529","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M32.3716 0C32.3716 8.83603 28.7903 16.8356 23 22.6264","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]}]};
var rit = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"0.5","y1":"-0.5","x2":"181.5","y2":"-0.5","transform":"matrix(-0.707107 0.707107 0.707107 0.707107 128.71 0)","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"fill-rule":"evenodd","clip-rule":"evenodd","d":"M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z","fill":0},"children":[]}]}]};
var riv = {"name":"g","value":"","attributes":{},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"64","y1":"2.18557e-08","x2":"64","y2":"128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"48","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var roc = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"112","r":"11.5","fill":0,"stroke":0,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"112","r":"9","fill":1,"stroke":1,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"112","cy":"16","r":"11.5","fill":0,"stroke":0,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"112","cy":"16","r":"9","fill":1,"stroke":1,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var rol = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64L0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 16C90.5097 16 112 37.4903 112 64C112 90.5097 90.5097 112 64 112","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var ron = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 0C128 70.6924 70.6925 128 0 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var rop = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00292969 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M112 64C112 37.4903 90.5097 16 64 16","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var ros = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"0.5","y1":"-0.5","x2":"181.5","y2":"-0.5","transform":"matrix(-0.707107 0.707107 0.707107 0.707107 128.71 0)","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var rov = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"-0.0029152","x2":"127.983","y2":"127.986","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C128 35.3511 113.669 67.3551 90.5 90.5193","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M96 0C96 26.5077 85.2564 50.5061 67.8862 67.8783","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 0C64 17.6721 56.8374 33.6713 45.2568 45.2529","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M32.3716 0C32.3716 8.83603 28.7903 16.8356 23 22.6264","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]}]};
var ruc = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64L0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 32L0 32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var rud = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64L0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M32 0L32 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 0L64 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var rul = {"name":"g","value":"","attributes":{},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"80.0035","y1":"79.9964","x2":"112.003","y2":"111.996","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"fill-rule":"evenodd","clip-rule":"evenodd","d":"M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z","fill":0},"children":[]}]};
var rum = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M5.08584e-07 32C17.6731 32 32 17.6731 32 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var run = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 0L64 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M96 0L96 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M32 0L32 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var rup = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 0L64 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 112C90.5097 112 112 90.5097 112 64C112 37.4903 90.5097 16 64 16","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var rus = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 0L0 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 128C64 92.6538 35.3462 64 0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var rut = {"name":"g","value":"","attributes":{},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var rux = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64L0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M32 64C32 81.6731 46.3269 96 64 96","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var ryc = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 96L0 96","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var ryd = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00280762 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M96 64C96 81.6731 81.6731 96 64 96","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var ryg = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-2.79795e-06 -3.55988e-06C70.6924 -4.40288e-06 128 57.3075 128 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"16.0035","y1":"15.9965","x2":"48.0035","y2":"47.9965","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var ryl = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 0L0 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C92.6489 128 60.6449 113.669 37.4807 90.5","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 96C101.492 96 77.4939 85.2564 60.1217 67.8862","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64C110.328 64 94.3287 56.8374 82.7471 45.2568","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 32.3716C119.164 32.3716 111.164 28.7903 105.374 23","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]}]};
var rym = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 96L0 96","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var ryn = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 128C57.3075 128 -3.09007e-06 70.6925 0 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var ryp = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00292969 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var rys = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M1.52575e-06 96C53.0193 96 96 53.0193 96 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var ryt = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M64 128H0L5.59506e-06 -7.62939e-06L64 -2.03434e-06C99.3462 1.05573e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"16","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"48","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 0L0 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var ryx = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"0.5","y1":"-0.5","x2":"181.5","y2":"-0.5","transform":"matrix(-0.707107 0.707107 0.707107 0.707107 128.71 0)","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 0L0 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"16","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var sab = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00292969 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"y1":"-0.5","x2":"45.2548","y2":"-0.5","transform":"matrix(0.707107 -0.707107 -0.707107 -0.707107 79.65 47.65)","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"112","r":"11.5","fill":0,"stroke":0,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"112","r":"9","fill":1,"stroke":1,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var sal = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M0 128L128 0","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.701724 31.9914C25.6281 31.9914 49.4822 42.5913 66.8261 59.7565M-0.701723 63.9914C16.7916 63.9914 32.6456 71.0098 44.1982 82.3844M-0.701722 95.9914C7.955 95.9914 15.8089 99.4288 21.5694 105.013","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var sam = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"48","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 0L64 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"fill-rule":"evenodd","clip-rule":"evenodd","d":"M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z","fill":0},"children":[]}]}]};
var san = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"-0.0029152","x2":"127.983","y2":"127.986","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var sap = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"128","y1":"64","x2":"-4.37114e-08","y2":"64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"64","r":"8","fill":0},"children":[]}]};
var sar = {"name":"g","value":"","attributes":{},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"48","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"48","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"64","y1":"2.18557e-08","x2":"64","y2":"128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var sat = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 0 0 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var sav = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"0.5","y1":"-0.5","x2":"181.5","y2":"-0.5","transform":"matrix(-0.707107 0.707107 0.707107 0.707107 128.71 0)","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M96 64C96 46.3269 81.6731 32 64 32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var seb = {"name":"g","value":"","attributes":{},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64C92.6538 64 64 35.3462 64 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var sec = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var sed = {"name":"g","value":"","attributes":{},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var sef = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"112","r":"11.5","fill":0,"stroke":0,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"112","r":"9","fill":1,"stroke":1,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var seg = {"name":"g","value":"","attributes":{},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M32 128C32 110.327 46.3269 96 64 96C81.6731 96 96 110.327 96 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var sel = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"8","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var sem = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M1.01717e-06 64C35.3462 64 64 35.3462 64 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00292969 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var sen = {"name":"g","value":"","attributes":{},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 0L64 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M96 128C96 110.327 81.6731 96 64 96C46.3269 96 32 110.327 32 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var sep = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 128L64 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M32 128L32 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M96 128L96 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var ser = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M0 64L5.59506e-06 0L128 1.11901e-05V64C128 99.3462 99.3462 128 64 128C28.6538 128 -4.6351e-06 99.3462 0 64Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M32 0L32 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var set = {"name":"g","value":"","attributes":{},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 64L128 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var sev = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"48","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var sib = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 0L0 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 9.40976e-06C64 35.3462 92.6538 64 128 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var sic = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 0L0 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var sid = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64L0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 128C110.327 128 96 113.673 96 96C96 78.3269 110.327 64 128 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var sig = {"name":"g","value":"","attributes":{},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var sil = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"16.0036","y1":"15.9965","x2":"48.0036","y2":"47.9965","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 0L0 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var sim = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 64V128H0L2.79753e-06 64C4.34256e-06 28.6538 28.6538 -1.54503e-06 64 0C99.3462 1.54503e-06 128 28.6538 128 64Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 0L64 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M32 0L32 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var sip = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 0L64 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M16 64C16 37.4903 37.4903 16 64 16","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var sit = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"fill-rule":"evenodd","clip-rule":"evenodd","d":"M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z","fill":0},"children":[]}]};
var siv = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 0L64 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 96L0 96","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var soc = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"64","y1":"2.18557e-08","x2":"64","y2":"128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"16","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"16","r":"11.5","fill":0,"stroke":0,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"16","r":"9","fill":1,"stroke":1,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var sog = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 0L0 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 96C81.6731 96 96 81.6731 96 64C96 46.3269 81.6731 32 64 32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"16","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var sol = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64L-5.96046e-08 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var som = {"name":"g","value":"","attributes":{},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var son = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"127.553","y1":"128.224","x2":"63.5528","y2":"0.223598","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var sop = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00292969 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var sor = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00292969 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C128 35.3511 113.669 67.3551 90.5 90.5193","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M96 0C96 26.5077 85.2564 50.5061 67.8862 67.8783","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 0C64 17.6721 56.8374 33.6713 45.2568 45.2529","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M32.3716 0C32.3716 8.83603 28.7903 16.8356 23 22.6264","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]}]};
var sov = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M0 128L128 0","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C92.6489 128 60.6449 113.669 37.4807 90.5","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 96C101.492 96 77.4939 85.2564 60.1217 67.8862","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64C110.328 64 94.3287 56.8374 82.7471 45.2568","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 32.3716C119.164 32.3716 111.164 28.7903 105.374 23","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]}]};
var sub = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 0L64 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var sud = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"128","y1":"64","x2":"-8.87604e-09","y2":"64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64L0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"fill-rule":"evenodd","clip-rule":"evenodd","d":"M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z","fill":0},"children":[]}]}]};
var sug = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"80","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"80","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var sul = {"name":"g","value":"","attributes":{},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 96C46.3269 96 32 81.6731 32 64C32 46.3269 46.3269 32 64 32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var sum = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M1.01717e-06 64C35.3462 64 64 35.3462 64 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var sun = {"name":"g","value":"","attributes":{},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"80","cy":"80","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"80","cy":"80","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"80","cy":"48","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"80","cy":"48","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"48","cy":"48","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"48","cy":"48","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"48","cy":"80","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"48","cy":"80","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var sup = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 112C90.5097 112 112 90.5097 112 64C112 37.4903 90.5097 16 64 16","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64L0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var sur = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00292969 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M3.73284e-05 64.0001C17.6633 64.0001 33.6554 56.8446 45.2356 45.2742","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M0.000105172 128C35.3582 128 67.3679 113.664 90.5332 90.4863","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var sut = {"name":"g","value":"","attributes":{},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var syd = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 16C37.4903 16 16 37.4903 16 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00292969 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var syl = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00292969 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var sym = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"96.5","y1":"3.07317e-08","x2":"96.5","y2":"128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var syn = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z","fill":1},"children":[]},{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C35.3511 0 67.3551 14.3309 90.5193 37.5","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M0 32C26.5077 32 50.5061 42.7436 67.8783 60.1138","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M0 64C17.6721 64 33.6713 71.1626 45.2529 82.7432","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M0 95.6284C8.83603 95.6284 16.8356 99.2097 22.6264 105","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]}]};
var syp = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00280762 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M1.01717e-06 64C35.3462 64 64 35.3462 64 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var syr = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00292969 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var syt = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"48","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 0L0 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var syx = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z","fill":1},"children":[]},{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 128C4.63574e-06 92.6488 14.3309 60.6449 37.5 37.4807","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M32 128C32 101.492 42.7436 77.4939 60.1138 60.1216","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 128C64 110.328 71.1626 94.3287 82.7432 82.7471","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M95.6284 128C95.6284 119.164 99.2097 111.164 105 105.374","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]},{"name":"path","value":"","attributes":{"d":"M-0.00280762 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var tab = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"8","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"-0.0029152","x2":"127.983","y2":"127.986","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"112","r":"11.5","fill":0,"stroke":0,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"112","r":"9","fill":1,"stroke":1,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var tac = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 0L0 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var tad = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var tag = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"80.0036","y1":"79.9964","x2":"112.004","y2":"111.996","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var tal = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"0.5","y1":"-0.5","x2":"181.5","y2":"-0.5","transform":"matrix(-0.707107 0.707107 0.707107 0.707107 128.71 0)","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M96 128C96 74.9807 53.0193 32 0 32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var tam = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"128","y1":"96","x2":"-8.87604e-09","y2":"96","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"128","y1":"32","x2":"-8.87604e-09","y2":"32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var tan = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M96 128C96 74.9807 53.0193 32 0 32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 128C64 92.6538 35.3462 64 0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M48 128C48 101.49 26.5097 80 0 80","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M32 128C32 110.327 17.6731 96 0 96","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M16 128C16 119.163 8.83656 112 0 112","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3075 70.6925 0 0 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var tap = {"name":"g","value":"","attributes":{},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"48","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"128","y1":"64","x2":"-8.87604e-09","y2":"64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 32C81.6731 32 96 46.3269 96 64C96 81.6731 81.6731 96 64 96","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var tar = {"name":"g","value":"","attributes":{},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"48","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var tas = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 0L64 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 32C81.6731 32 96 46.3269 96 64C96 81.6731 81.6731 96 64 96","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var teb = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M1.52575e-06 96C53.0193 96 96 53.0193 96 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var tec = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"80.0035","y1":"79.9965","x2":"112.003","y2":"111.997","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"fill-rule":"evenodd","clip-rule":"evenodd","d":"M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z","fill":0},"children":[]}]};
var ted = {"name":"g","value":"","attributes":{},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var teg = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 80C119.163 80 112 72.8366 112 64C112 55.1634 119.163 48 128 48","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var tel = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"15","cy":"112","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"15","cy":"112","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M0 0L127.986 127.986","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M32 0L128 96","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 0L128 64","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M96 0L128 32","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var tem = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64C92.6538 64 64 92.6538 64 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"-0.00285417","x2":"127.983","y2":"127.986","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var ten = {"name":"g","value":"","attributes":{},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"48","cy":"48","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"48","cy":"48","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"80","cy":"48","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"80","cy":"48","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"80","cy":"80","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"80","cy":"80","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"48","cy":"80","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"48","cy":"80","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var tep = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M1.14479e-06 96C53.0193 96 96 53.0193 96 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var ter = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 64L5.59506e-06 0L128 1.11901e-05V64C128 99.3462 99.3462 128 64 128C28.6538 128 -4.6351e-06 99.3462 0 64Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"96.5","y1":"3.07317e-08","x2":"96.5","y2":"128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M1.01717e-06 64C35.3462 64 64 35.3462 64 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var tes = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 0L64 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64L0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var tev = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var tex = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"15.9965","y1":"111.997","x2":"47.9965","y2":"79.9965","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"fill-rule":"evenodd","clip-rule":"evenodd","d":"M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z","fill":0},"children":[]}]};
var tic = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 32C110.327 32 96 17.6731 96 -1.39876e-06","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var tid = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"64","y1":"2.18557e-08","x2":"64","y2":"128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"96","y1":"2.18557e-08","x2":"96","y2":"128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"fill-rule":"evenodd","clip-rule":"evenodd","d":"M112 32C112 40.8366 104.837 48 96 48C87.1634 48 80 40.8366 80 32C80 23.1634 87.1634 16 96 16C104.837 16 112 23.1634 112 32ZM96 40C100.418 40 104 36.4183 104 32C104 27.5817 100.418 24 96 24C91.5817 24 88 27.5817 88 32C88 36.4183 91.5817 40 96 40Z","fill":0},"children":[]}]};
var til = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"80.0036","y1":"79.9965","x2":"112.004","y2":"111.997","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var tim = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 64V128H0L2.79753e-06 64C4.34256e-06 28.6538 28.6538 -1.54503e-06 64 0C99.3462 1.54503e-06 128 28.6538 128 64Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00291443 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var tin = {"name":"g","value":"","attributes":{},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"32","y1":"2.18557e-08","x2":"32","y2":"128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var tip = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 0L64 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"fill-rule":"evenodd","clip-rule":"evenodd","d":"M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z","fill":0},"children":[]}]}]};
var tir = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"-0.0029152","x2":"127.983","y2":"127.986","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"16","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var tob = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 64V128H0L2.79753e-06 64C4.34256e-06 28.6538 28.6538 -1.54503e-06 64 0C99.3462 1.54503e-06 128 28.6538 128 64Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 96L0 96","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var toc = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"128","y1":"96","x2":"-8.87604e-09","y2":"96","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"16","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var tod = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var tog = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 96C46.3269 96 32 81.6731 32 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"16","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 0L0 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var tol = {"name":"g","value":"","attributes":{},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"128","y1":"64","x2":"-4.37114e-08","y2":"64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M16 128C16 101.49 37.4903 80 64 80C90.5097 80 112 101.49 112 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var tom = {"name":"g","value":"","attributes":{},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var ton = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 32C74.9807 32 32 74.9807 32 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64C92.6538 64 64 92.6538 64 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 96C110.327 96 96 110.327 96 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var top = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"-0.0029152","x2":"127.983","y2":"127.986","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"16","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var tor = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var tuc = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64L0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 96L0 96","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var tud = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64L0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var tug = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64L0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 32L0 32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var tul = {"name":"g","value":"","attributes":{},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"path","value":"","attributes":{"fill-rule":"evenodd","clip-rule":"evenodd","d":"M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z","fill":0},"children":[]}]};
var tun = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 64V128H0L2.79753e-06 64C4.34256e-06 28.6538 28.6538 -1.54503e-06 64 0C99.3462 1.54503e-06 128 28.6538 128 64Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00292969 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"48","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var tus = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 0L0 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var tux = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64L0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var tyc = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"fill-rule":"evenodd","clip-rule":"evenodd","d":"M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z","fill":0},"children":[]}]};
var tyd = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00280762 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"y1":"-0.5","x2":"45.2548","y2":"-0.5","transform":"matrix(0.707107 -0.707107 -0.707107 -0.707107 79.65 47.6499)","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"15.9964","y1":"111.997","x2":"47.9964","y2":"79.9965","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var tyl = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M7.37542e-06 -3.56072e-06C1.19529e-06 70.6924 57.3075 128 128 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var tyn = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 -2.28831e-06C57.3076 -3.13131e-06 8.42999e-07 57.3075 0 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var typ = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00292969 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M96 1.90735e-06C96 53.0193 53.0193 96 0 96","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var tyr = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 0L0 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64C92.6538 64 64 92.6538 64 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M1.01717e-06 64C35.3462 64 64 35.3462 64 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var tyv = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M256 0L128 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var wac = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64L0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"112","r":"11.5","fill":0,"stroke":0,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"112","r":"9","fill":1,"stroke":1,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var wal = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"64.5","y1":"-0.5","x2":"64.5","y2":"127.5","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"32","y1":"2.18557e-08","x2":"32","y2":"128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var wan = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]}]};
var wat = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"fill-rule":"evenodd","clip-rule":"evenodd","d":"M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z","fill":0},"children":[]}]};
var web = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3075 70.6925 0 0 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var wed = {"name":"g","value":"","attributes":{},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var weg = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M79.5254 0C79.5254 8.83656 72.3619 16 63.5254 16C54.6888 16 47.5254 8.83656 47.5254 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var wel = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 32C74.9807 32 32 74.9807 32 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64C92.6538 64 64 92.6538 64 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 96C110.327 96 96 110.327 96 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var wen = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M1.01717e-06 64C35.3462 64 64 35.3462 64 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00292969 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var wep = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var wer = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 64L5.59506e-06 0L128 1.11901e-05V64C128 99.3462 99.3462 128 64 128C28.6538 128 -4.6351e-06 99.3462 0 64Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M32 0L32 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var wes = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"80.0035","y1":"79.9965","x2":"112.003","y2":"111.997","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"112","cy":"112","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"112","cy":"112","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var wet = {"name":"g","value":"","attributes":{},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 64H0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var wex = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"fill-rule":"evenodd","clip-rule":"evenodd","d":"M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z","fill":0},"children":[]}]};
var wic = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z","fill":1},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]};
var wid = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"48.0035","y1":"80.0036","x2":"16.0035","y2":"112.004","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"fill-rule":"evenodd","clip-rule":"evenodd","d":"M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z","fill":0},"children":[]}]};
var win = {"name":"g","value":"","attributes":{},"children":[{"name":"rect","value":"","attributes":{"width":"128","height":"128","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"64","y1":"2.18557e-08","x2":"64","y2":"128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var wis = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0 0C0 70.6925 57.3075 128 128 128V0H0Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 64L0 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 32L0 32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var wit = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"64","y1":"2.18557e-08","x2":"64","y2":"128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"32","y1":"2.18557e-08","x2":"32","y2":"128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"96","y1":"2.18557e-08","x2":"96","y2":"128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]};
var wol = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M0 64L128 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 96C110.327 96 96 81.6731 96 64C96 46.3269 110.327 32 128 32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var wor = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"y1":"-0.5","x2":"45.2548","y2":"-0.5","transform":"matrix(0.707107 -0.707107 -0.707107 -0.707107 79.65 47.65)","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"line","value":"","attributes":{"x1":"-0.0029152","x2":"127.983","y2":"127.986","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 96C46.3269 96 32 81.6731 32 64","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var wyc = {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]}]};
var wyd = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00292969 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M32 64C32 46.3269 46.3269 32 64 32","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var wyl = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-3.8147e-06 128C-7.24633e-07 92.6538 28.6538 64 64 64C99.3462 64 128 92.6538 128 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var wyn = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M1.52575e-06 96C53.0193 96 96 53.0193 96 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M1.01717e-06 64C35.3462 64 64 35.3462 64 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"path","value":"","attributes":{"d":"M5.08584e-07 32C17.6731 32 32 17.6731 32 0","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var wyt = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M128 0L0 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"48","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"16","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var wyx = {"name":"g","value":"","attributes":{},"children":[{"name":"g","value":"","attributes":{"fill":"none"},"children":[{"name":"path","value":"","attributes":{"d":"M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M-0.00292969 0L127.997 128","stroke":0,"stroke-linecap":"square","fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"96","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"96","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"32","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"32","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"96","cy":"32","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]}]};
var zod = {"name":"g","value":"","attributes":{},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]}]};
var index = {
	bac: bac,
	bal: bal,
	ban: ban,
	bar: bar,
	bat: bat,
	bec: bec,
	bel: bel,
	ben: ben,
	bep: bep,
	ber: ber,
	bes: bes,
	bet: bet,
	bex: bex,
	bic: bic,
	bid: bid,
	bil: bil,
	bin: bin,
	bis: bis,
	bit: bit,
	bol: bol,
	bon: bon,
	bor: bor,
	bos: bos,
	bot: bot,
	bud: bud,
	bur: bur,
	bus: bus,
	byl: byl,
	byn: byn,
	byr: byr,
	byt: byt,
	dab: dab,
	dac: dac,
	dal: dal,
	dan: dan,
	dap: dap,
	dar: dar,
	das: das,
	dat: dat,
	dav: dav,
	deb: deb,
	dec: dec,
	def: def,
	deg: deg,
	del: del,
	dem: dem,
	den: den,
	dep: dep,
	der: der,
	des: des,
	det: det,
	dev: dev,
	dex: dex,
	dib: dib,
	dif: dif,
	dig: dig,
	dil: dil,
	din: din,
	dir: dir,
	dis: dis,
	div: div,
	doc: doc,
	dol: dol,
	don: don,
	dop: dop,
	dor: dor,
	dos: dos,
	dot: dot,
	dov: dov,
	doz: doz,
	duc: duc,
	dul: dul,
	dun: dun,
	dur: dur,
	dus: dus,
	dut: dut,
	dux: dux,
	dyl: dyl,
	dyn: dyn,
	dyr: dyr,
	dys: dys,
	dyt: dyt,
	fab: fab,
	fad: fad,
	fal: fal,
	fam: fam,
	fan: fan,
	fas: fas,
	feb: feb,
	fed: fed,
	fel: fel,
	fen: fen,
	fep: fep,
	fer: fer,
	fes: fes,
	fet: fet,
	fex: fex,
	fid: fid,
	fig: fig,
	fil: fil,
	fin: fin,
	fip: fip,
	fir: fir,
	fit: fit,
	fod: fod,
	fog: fog,
	fol: fol,
	fon: fon,
	fop: fop,
	fos: fos,
	fot: fot,
	ful: ful,
	fun: fun,
	fur: fur,
	fus: fus,
	fyl: fyl,
	fyn: fyn,
	fyr: fyr,
	hab: hab,
	hac: hac,
	had: had,
	hal: hal,
	han: han,
	hap: hap,
	har: har,
	has: has$1,
	hat: hat,
	hav: hav,
	heb: heb,
	hec: hec,
	hep: hep,
	hes: hes,
	het: het,
	hex: hex,
	hid: hid,
	hil: hil,
	hin: hin,
	hob: hob,
	hoc: hoc,
	hod: hod,
	hol: hol,
	hop: hop,
	hos: hos,
	hul: hul,
	hus: hus,
	hut: hut,
	lab: lab,
	lac: lac,
	lad: lad,
	lag: lag,
	lan: lan,
	lap: lap,
	lar: lar,
	las: las,
	lat: lat,
	lav: lav,
	leb: leb,
	lec: lec,
	led: led,
	leg: leg,
	len: len,
	lep: lep,
	ler: ler,
	lev: lev,
	lex: lex,
	lib: lib,
	lid: lid,
	lig: lig,
	lin: lin,
	lis: lis,
	lit: lit,
	liv: liv,
	loc: loc,
	lod: lod,
	lom: lom,
	lon: lon,
	lop: lop,
	lor: lor,
	los: los,
	luc: luc,
	lud: lud,
	lug: lug,
	lun: lun,
	lup: lup,
	lur: lur,
	lus: lus,
	lut: lut,
	lux: lux,
	lyd: lyd,
	lyn: lyn,
	lyr: lyr,
	lys: lys,
	lyt: lyt,
	lyx: lyx,
	mac: mac,
	mag: mag,
	mal: mal,
	map: map,
	mar: mar,
	mas: mas,
	mat: mat,
	meb: meb,
	mec: mec,
	med: med,
	meg: meg,
	mel: mel,
	mep: mep,
	mer: mer,
	mes: mes,
	met: met,
	mev: mev,
	mex: mex,
	mic: mic,
	mid: mid,
	mig: mig,
	mil: mil,
	min: min,
	mip: mip,
	mir: mir,
	mis: mis,
	mit: mit,
	moc: moc,
	mod: mod,
	mog: mog,
	mol: mol,
	mon: mon,
	mop: mop,
	mor: mor,
	mos: mos,
	mot: mot,
	mud: mud,
	mug: mug,
	mul: mul,
	mun: mun,
	mur: mur,
	mus: mus,
	mut: mut,
	myl: myl,
	myn: myn,
	myr: myr,
	nac: nac,
	nal: nal,
	nam: nam,
	nap: nap,
	nar: nar,
	nat: nat,
	nav: nav,
	neb: neb,
	nec: nec,
	ned: ned,
	nel: nel,
	nem: nem,
	nep: nep,
	ner: ner,
	nes: nes,
	net: net,
	nev: nev,
	nex: nex,
	nib: nib,
	nid: nid,
	nil: nil,
	nim: nim,
	nis: nis,
	noc: noc,
	nod: nod,
	nol: nol,
	nom: nom,
	nop: nop,
	nor: nor,
	nos: nos,
	nov: nov,
	nub: nub,
	nul: nul,
	num: num,
	nup: nup,
	nus: nus,
	nut: nut,
	nux: nux,
	nyd: nyd,
	nyl: nyl,
	nym: nym,
	nyr: nyr,
	nys: nys,
	nyt: nyt,
	nyx: nyx,
	pac: pac,
	pad: pad,
	pag: pag,
	pal: pal,
	pan: pan,
	par: par,
	pas: pas,
	pat: pat,
	pec: pec,
	ped: ped,
	peg: peg,
	pel: pel,
	pem: pem,
	pen: pen,
	per: per,
	pes: pes,
	pet: pet,
	pex: pex,
	pic: pic,
	pid: pid,
	pil: pil,
	pin: pin,
	pit: pit,
	poc: poc,
	pod: pod,
	pol: pol,
	pon: pon,
	pos: pos,
	pub: pub,
	pun: pun,
	pur: pur,
	put: put,
	pyl: pyl,
	pyx: pyx,
	rab: rab,
	rac: rac,
	rad: rad,
	rag: rag,
	ral: ral,
	ram: ram,
	ran: ran,
	rap: rap,
	rav: rav,
	reb: reb,
	rec: rec,
	red: red,
	ref: ref,
	reg: reg,
	rel: rel,
	rem: rem,
	ren: ren,
	rep: rep,
	res: res,
	ret: ret,
	rev: rev,
	rex: rex,
	rib: rib,
	ric: ric,
	rid: rid,
	rig: rig,
	ril: ril,
	rin: rin,
	rip: rip,
	ris: ris,
	rit: rit,
	riv: riv,
	roc: roc,
	rol: rol,
	ron: ron,
	rop: rop,
	ros: ros,
	rov: rov,
	ruc: ruc,
	rud: rud,
	rul: rul,
	rum: rum,
	run: run,
	rup: rup,
	rus: rus,
	rut: rut,
	rux: rux,
	ryc: ryc,
	ryd: ryd,
	ryg: ryg,
	ryl: ryl,
	rym: rym,
	ryn: ryn,
	ryp: ryp,
	rys: rys,
	ryt: ryt,
	ryx: ryx,
	sab: sab,
	sal: sal,
	sam: sam,
	san: san,
	sap: sap,
	sar: sar,
	sat: sat,
	sav: sav,
	seb: seb,
	sec: sec,
	sed: sed,
	sef: sef,
	seg: seg,
	sel: sel,
	sem: sem,
	sen: sen,
	sep: sep,
	ser: ser,
	set: set,
	sev: sev,
	sib: sib,
	sic: sic,
	sid: sid,
	sig: sig,
	sil: sil,
	sim: sim,
	sip: sip,
	sit: sit,
	siv: siv,
	soc: soc,
	sog: sog,
	sol: sol,
	som: som,
	son: son,
	sop: sop,
	sor: sor,
	sov: sov,
	sub: sub,
	sud: sud,
	sug: sug,
	sul: sul,
	sum: sum,
	sun: sun,
	sup: sup,
	sur: sur,
	sut: sut,
	syd: syd,
	syl: syl,
	sym: sym,
	syn: syn,
	syp: syp,
	syr: syr,
	syt: syt,
	syx: syx,
	tab: tab,
	tac: tac,
	tad: tad,
	tag: tag,
	tal: tal,
	tam: tam,
	tan: tan,
	tap: tap,
	tar: tar,
	tas: tas,
	teb: teb,
	tec: tec,
	ted: ted,
	teg: teg,
	tel: tel,
	tem: tem,
	ten: ten,
	tep: tep,
	ter: ter,
	tes: tes,
	tev: tev,
	tex: tex,
	tic: tic,
	tid: tid,
	til: til,
	tim: tim,
	tin: tin,
	tip: tip,
	tir: tir,
	tob: tob,
	toc: toc,
	tod: tod,
	tog: tog,
	tol: tol,
	tom: tom,
	ton: ton,
	top: top,
	tor: tor,
	tuc: tuc,
	tud: tud,
	tug: tug,
	tul: tul,
	tun: tun,
	tus: tus,
	tux: tux,
	tyc: tyc,
	tyd: tyd,
	tyl: tyl,
	tyn: tyn,
	typ: typ,
	tyr: tyr,
	tyv: tyv,
	wac: wac,
	wal: wal,
	wan: wan,
	wat: wat,
	web: web,
	wed: wed,
	weg: weg,
	wel: wel,
	wen: wen,
	wep: wep,
	wer: wer,
	wes: wes,
	wet: wet,
	wex: wex,
	wic: wic,
	wid: wid,
	win: win,
	wis: wis,
	wit: wit,
	wol: wol,
	wor: wor,
	wyc: wyc,
	wyd: wyd,
	wyl: wyl,
	wyn: wyn,
	wyt: wyt,
	wyx: wyx,
	zod: zod,
	"for": {"name":"g","value":"","attributes":{},"children":[{"name":"path","value":"","attributes":{"d":"M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z","fill":1},"children":[]},{"name":"line","value":"","attributes":{"x1":"96","y1":"2.18557e-08","x2":"96","y2":"128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"11.5","fill":1,"stroke":1,"vector-effect":"non-scaling-stroke"},"children":[]},{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"9","fill":0,"stroke":0,"stroke-width":"2","vector-effect":"non-scaling-stroke"},"children":[]}]},
	"let": {"name":"g","value":"","attributes":{},"children":[{"name":"circle","value":"","attributes":{"cx":"64","cy":"64","r":"64","fill":1},"children":[]},{"name":"path","value":"","attributes":{"d":"M64 0L64 128","stroke":0,"fill":"none","vector-effect":"non-scaling-stroke"},"children":[]}]}
};

const UNIT = 128;
const MARGIN_RATIO = 0.1;
const BG = 0;

class ConfigError extends Error {}


// apply color preference
const paint = (node, colors, strokeWidth) => {

  if (
    node.attributes.fill !== undefined
    && node.attributes.fill !== 'none'
  ) {
    node.attributes.fill = colors[node.attributes.fill];
  }

  if (
    node.attributes.stroke !== undefined
    && node.attributes.stroke !== 'none'
  ) {
    node.attributes.stroke = colors[node.attributes.stroke];
    node.attributes.strokeWidth = strokeWidth;
    node.attributes['stroke-linecap'] = 'square';
  }

  return {
    name: node.name,
    attributes: node.attributes,
    children: node.children.map(n => paint(n, colors, strokeWidth))
  }
};



const grid = ( length, margin, size, strokeWidth ) => {

  const rm = margin;

  // calculate symbols size based on margin.
  const symbolSize = size - (rm * 2) - (strokeWidth / 2);

  const ss = symbolSize / 2;

  // put everything together into a profile object
  const p = {
    // number of symbols
    le: length,
    // how big is the background square in px?
    tw: size,
    // how big are the symbols in px?
    ss: ss,
    // real margin: how big is the margin in px?
    rm: rm,
    // real padding: how big is the space in between symbols?
    sw: strokeWidth,
  };

  let resultGrid = [];

  if (length === 4) {
    resultGrid = [
      { x: d1(p), y: d1(p) },
      { x: d2(p), y: d1(p) },
      { x: d1(p), y: d2(p) },
      { x: d2(p), y: d2(p) },
    ];
  }

  if (length === 2) {
    resultGrid = [
      { x: d1(p), y: dc(p) },
      { x: d2(p), y: dc(p) },
    ];
  }

  if (length === 1) {
    resultGrid = [
      { x: dc(p), y: dc(p) },
    ];
  }

  return {
    ...p,
    scale: p.ss / UNIT,
    grid: resultGrid,
  };
};


// center a rectangle
const dc = p => p.tw - (p.ss * 1.5) - p.rm;

// 2 dimensional offset for position 1
// 1.5 is used because stroke alignment = center
const d1 = p => p.rm - (p.sw / 4);

// 2 dimensional offset for position 2
// 1.5 is used because stroke alignment = center
const d2 = p => p.tw - p.ss - p.rm + (p.sw / 4);

//
const proportionFunction = t => t/256 + 0.33;


// perform transformations
const transformations = (symbols, layout) => {
  return symbols.map((symbol, index) => {
    const { x, y } = layout.grid[index];

    let affineMatrix;
    // If the symbols has no transformations, generate
    if (symbol.attributes === undefined) {
     affineMatrix = transform(
        translate(x, y),
        scale(layout.scale, layout.scale),
      );
      symbol.attributes = {};
    } else {
      let existingTransformation = symbol.attributes.transform === undefined
        ? identity()
        : fromString(symbol.attributes.transform);

      affineMatrix = transform(
        translate(x, y),
        scale(layout.scale, layout.scale),
        existingTransformation
      );
    }

    symbol.attributes.transform = toSVG(affineMatrix);
    return symbol
  })
};


//==============================================================================
// Main function
//
const sigil = params => {
  // Set default values from config
  const colors = params.colors === undefined
    ? ['#fff', '#000']
    : params.colors;

  const attributes = params.attributes === undefined
    ? {}
    : params.attributes;


  const margin = params.margin === undefined
    ? MARGIN_RATIO * params.size
    // 2 is added to offset center stroke alignment
    : params.margin + 2;

  const strokeWidth = params.iconMode === true
    ? 1
    : proportionFunction(params.size);

  // get phonemes as array from patp input
  const phonemes = params.patp.replace(/[\^~-]/g,'').match(/.{1,3}/g);

  if (phonemes.length !== 1 && phonemes.length !== 2 && phonemes.length !== 4) {
    throw new ConfigError(`sigil.js cannot render @P of length ${phonemes.length}. Only lengths of 1 (galaxy), 2 (star), and 4 (planet) are supported at this time.`)
  }

  // get symbols and clone them.
  const symbols = phonemes.map(phoneme => {
    return JSON.parse(JSON.stringify(index[phoneme]))
  });

  // make a layout object for the transformations function
  const layout = grid(symbols.length, margin, params.size, strokeWidth);

  // apply the transformations
  const arranged = transformations(symbols, layout);

  // wrap symbols in SVG tag and add background rect
  const wrapped = {
    name: 'svg',
    attributes: {
      style: {
        // prevent bottom margin on svg tag
        width: '100%',
        height: '100%',
        display: 'block'
      },
      viewBox:`0 0 ${params.size} ${params.size}`,
      preserveAspectRatio: "xMidYMid meet",
      width: `${params.size}px`,
      height: `${params.size}px`,
      version:'1.1',
      xmlns:"http://www.w3.org/2000/svg",
      className: params.className,
      ...attributes,
    },
    children: [
      {
        name: 'rect',
        attributes: {
          // 'shape-rendering':'crispEdges',
          fill: BG,
          width: `${params.size}px`,
          height: `${params.size}px`,
          x: 0,
          y: 0,
        },
        children: [],
      },
      ...arranged,
    ],
  };

  // apply color
  const withColor = paint(wrapped, colors, strokeWidth);

  return params.renderer(withColor)

};

exports.reactRenderer = reactRenderer;
exports.sigil = sigil;
exports.stringRenderer = stringRenderer;
