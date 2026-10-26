window.__ModuleLoader__.load({
  id: "@chenglun17-0/dsh-browser",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/bind-event-listener/dist/bind.js
var require_bind = __commonJS({
  "node_modules/bind-event-listener/dist/bind.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.bind = void 0;
    function bind3(target, _a) {
      var type = _a.type, listener = _a.listener, options = _a.options;
      target.addEventListener(type, listener, options);
      return function unbind() {
        target.removeEventListener(type, listener, options);
      };
    }
    exports.bind = bind3;
  }
});

// node_modules/bind-event-listener/dist/bind-all.js
var require_bind_all = __commonJS({
  "node_modules/bind-event-listener/dist/bind-all.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.bindAll = void 0;
    var bind_1 = require_bind();
    function toOptions(value) {
      if (typeof value === "undefined") {
        return void 0;
      }
      if (typeof value === "boolean") {
        return {
          capture: value
        };
      }
      return value;
    }
    function getBinding(original, sharedOptions) {
      if (sharedOptions == null) {
        return original;
      }
      var binding = __assign(__assign({}, original), { options: __assign(__assign({}, toOptions(sharedOptions)), toOptions(original.options)) });
      return binding;
    }
    function bindAll4(target, bindings, sharedOptions) {
      var unbinds = bindings.map(function(original) {
        var binding = getBinding(original, sharedOptions);
        return (0, bind_1.bind)(target, binding);
      });
      return function unbindAll() {
        unbinds.forEach(function(unbind) {
          return unbind();
        });
      };
    }
    exports.bindAll = bindAll4;
  }
});

// node_modules/bind-event-listener/dist/index.js
var require_dist = __commonJS({
  "node_modules/bind-event-listener/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.bindAll = exports.bind = void 0;
    var bind_1 = require_bind();
    Object.defineProperty(exports, "bind", { enumerable: true, get: function() {
      return bind_1.bind;
    } });
    var bind_all_1 = require_bind_all();
    Object.defineProperty(exports, "bindAll", { enumerable: true, get: function() {
      return bind_all_1.bindAll;
    } });
  }
});

// src/client.jsx
var client_exports = {};
__export(client_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(client_exports);
var React = __toESM(require("react"), 1);

// node_modules/zustand/esm/vanilla.mjs
var createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const api = { setState, getState, getInitialState, subscribe };
  const initialState = state = createState(setState, getState, api);
  return api;
};
var createStore = ((createState) => createState ? createStoreImpl(createState) : createStoreImpl);

// node_modules/zustand/esm/middleware.mjs
function createJSONStorage(getStorage, options) {
  let storage;
  try {
    storage = getStorage();
  } catch (e) {
    return;
  }
  const persistStorage = {
    getItem: (name) => {
      var _a;
      const parse = (str2) => {
        if (str2 === null) {
          return null;
        }
        return JSON.parse(str2, options == null ? void 0 : options.reviver);
      };
      const str = (_a = storage.getItem(name)) != null ? _a : null;
      if (str instanceof Promise) {
        return str.then(parse);
      }
      return parse(str);
    },
    setItem: (name, newValue) => storage.setItem(name, JSON.stringify(newValue, options == null ? void 0 : options.replacer)),
    removeItem: (name) => storage.removeItem(name)
  };
  return persistStorage;
}
var toThenable = (fn) => (input) => {
  try {
    const result = fn(input);
    if (result instanceof Promise) {
      return result;
    }
    return {
      then(onFulfilled) {
        return toThenable(onFulfilled)(result);
      },
      catch(_onRejected) {
        return this;
      }
    };
  } catch (e) {
    return {
      then(_onFulfilled) {
        return this;
      },
      catch(onRejected) {
        return toThenable(onRejected)(e);
      }
    };
  }
};
var persistImpl = (config, baseOptions) => (set, get, api) => {
  let options = {
    storage: createJSONStorage(() => window.localStorage),
    partialize: (state) => state,
    version: 0,
    merge: (persistedState, currentState) => ({
      ...currentState,
      ...persistedState
    }),
    ...baseOptions
  };
  let hasHydrated = false;
  let hydrationVersion = 0;
  const hydrationListeners = /* @__PURE__ */ new Set();
  const finishHydrationListeners = /* @__PURE__ */ new Set();
  let storage = options.storage;
  if (!storage) {
    return config(
      (...args) => {
        console.warn(
          `[zustand persist middleware] Unable to update item '${options.name}', the given storage is currently unavailable.`
        );
        set(...args);
      },
      get,
      api
    );
  }
  const setItem = () => {
    const state = options.partialize({ ...get() });
    return storage.setItem(options.name, {
      state,
      version: options.version
    });
  };
  const savedSetState = api.setState;
  api.setState = (...args) => {
    savedSetState(...args);
    return setItem();
  };
  const configResult = config(
    (...args) => {
      set(...args);
      return setItem();
    },
    get,
    api
  );
  api.getInitialState = () => configResult;
  let stateFromStorage;
  const hydrate = () => {
    var _a, _b;
    if (!storage) return;
    const currentVersion = ++hydrationVersion;
    hasHydrated = false;
    hydrationListeners.forEach((cb) => {
      var _a2;
      return cb((_a2 = get()) != null ? _a2 : configResult);
    });
    const postRehydrationCallback = ((_b = options.onRehydrateStorage) == null ? void 0 : _b.call(options, (_a = get()) != null ? _a : configResult)) || void 0;
    return toThenable(storage.getItem.bind(storage))(options.name).then((deserializedStorageValue) => {
      if (deserializedStorageValue) {
        if (typeof deserializedStorageValue.version === "number" && deserializedStorageValue.version !== options.version) {
          if (options.migrate) {
            const migration = options.migrate(
              deserializedStorageValue.state,
              deserializedStorageValue.version
            );
            if (migration instanceof Promise) {
              return migration.then((result) => [true, result]);
            }
            return [true, migration];
          }
          console.error(
            `State loaded from storage couldn't be migrated since no migrate function was provided`
          );
        } else {
          return [false, deserializedStorageValue.state];
        }
      }
      return [false, void 0];
    }).then((migrationResult) => {
      var _a2;
      if (currentVersion !== hydrationVersion) {
        return;
      }
      const [migrated, migratedState] = migrationResult;
      stateFromStorage = options.merge(
        migratedState,
        (_a2 = get()) != null ? _a2 : configResult
      );
      set(stateFromStorage, true);
      if (migrated) {
        return setItem();
      }
    }).then(() => {
      if (currentVersion !== hydrationVersion) {
        return;
      }
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(get(), void 0);
      stateFromStorage = get();
      hasHydrated = true;
      finishHydrationListeners.forEach((cb) => cb(stateFromStorage));
    }).catch((e) => {
      if (currentVersion !== hydrationVersion) {
        return;
      }
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(void 0, e);
    });
  };
  api.persist = {
    setOptions: (newOptions) => {
      options = {
        ...options,
        ...newOptions
      };
      if (newOptions.storage) {
        storage = newOptions.storage;
      }
    },
    clearStorage: () => {
      ++hydrationVersion;
      storage == null ? void 0 : storage.removeItem(options.name);
    },
    getOptions: () => options,
    rehydrate: () => hydrate(),
    hasHydrated: () => hasHydrated,
    onHydrate: (cb) => {
      hydrationListeners.add(cb);
      return () => {
        hydrationListeners.delete(cb);
      };
    },
    onFinishHydration: (cb) => {
      finishHydrationListeners.add(cb);
      return () => {
        finishHydrationListeners.delete(cb);
      };
    }
  };
  if (!options.skipHydration) {
    hydrate();
  }
  return stateFromStorage || configResult;
};
var persist = persistImpl;

// node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}

// node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = false;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}

// node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}

// node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

// node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

// node_modules/@babel/runtime/helpers/esm/slicedToArray.js
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}

// node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/adapter/element-adapter.js
var import_bind_event_listener4 = __toESM(require_dist());

// node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/honey-pot-fix/honey-pot-data-attribute.js
var honeyPotDataAttribute = "data-pdnd-honey-pot";

// node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/honey-pot-fix/is-honey-pot-element.js
function isHoneyPotElement(target) {
  return target instanceof Element && target.hasAttribute(honeyPotDataAttribute);
}

// node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/honey-pot-fix/get-element-from-point-without-honey-pot.js
function getElementFromPointWithoutHoneypot(client) {
  var _document$elementsFro = document.elementsFromPoint(client.x, client.y), _document$elementsFro2 = _slicedToArray(_document$elementsFro, 2), top = _document$elementsFro2[0], second = _document$elementsFro2[1];
  if (!top) {
    return null;
  }
  if (isHoneyPotElement(top)) {
    return second !== null && second !== void 0 ? second : null;
  }
  return top;
}

// node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}

// node_modules/@babel/runtime/helpers/esm/toPrimitive.js
function toPrimitive(t, e) {
  if ("object" != _typeof(t) || !t) return t;
  var r;
  if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) {
    var i = r.call(t, e || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === e ? String : Number)(t);
}

// node_modules/@babel/runtime/helpers/esm/toPropertyKey.js
function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}

// node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(e, r, t) {
  return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}

// node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/honey-pot-fix/make-honey-pot-fix.js
var import_bind_event_listener = __toESM(require_dist());

// node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/util/max-z-index.js
var maxZIndex = 2147483647;

// node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/util/popover-reset-styles.js
var popoverResetUserAgentStyles = {
  inset: "unset",
  border: "none",
  padding: 0,
  margin: 0,
  overflow: "visible",
  color: "inherit",
  background: "transparent",
  width: "auto",
  height: "auto"
};

// node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/public-utils/once.js
function once(fn) {
  var cache = null;
  return function wrapped() {
    if (!cache) {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      var result = fn.apply(this, args);
      cache = {
        result
      };
    }
    return cache.result;
  };
}

// node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/util/supports-popover.js
var supportsPopover = once(function supportsPopover2() {
  return typeof HTMLElement !== "undefined" && typeof HTMLElement.prototype.showPopover === "function";
});

// node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/honey-pot-fix/make-honey-pot-fix.js
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
var honeyPotSize = 2;
var halfHoneyPotSize = honeyPotSize / 2;
function floorToClosestPixel(point) {
  return {
    x: Math.floor(point.x),
    y: Math.floor(point.y)
  };
}
function pullBackByHalfHoneyPotSize(point) {
  return {
    x: point.x - halfHoneyPotSize,
    y: point.y - halfHoneyPotSize
  };
}
function preventGoingBackwardsOffScreen(point) {
  return {
    x: Math.max(point.x, 0),
    y: Math.max(point.y, 0)
  };
}
function preventGoingForwardsOffScreen(point) {
  return {
    x: Math.min(point.x, window.innerWidth - honeyPotSize),
    y: Math.min(point.y, window.innerHeight - honeyPotSize)
  };
}
function getHoneyPotRectFor(_ref) {
  var client = _ref.client;
  var point = preventGoingForwardsOffScreen(preventGoingBackwardsOffScreen(pullBackByHalfHoneyPotSize(floorToClosestPixel(client))));
  return DOMRect.fromRect({
    x: point.x,
    y: point.y,
    width: honeyPotSize,
    height: honeyPotSize
  });
}
function getRectStyles(_ref2) {
  var clientRect = _ref2.clientRect;
  return {
    left: "".concat(clientRect.left, "px"),
    top: "".concat(clientRect.top, "px"),
    width: "".concat(clientRect.width, "px"),
    height: "".concat(clientRect.height, "px")
  };
}
function isWithin(_ref3) {
  var client = _ref3.client, clientRect = _ref3.clientRect;
  return (
    // is within horizontal bounds
    client.x >= clientRect.x && client.x <= clientRect.x + clientRect.width && // is within vertical bounds
    client.y >= clientRect.y && client.y <= clientRect.y + clientRect.height
  );
}
function mountHoneyPot(_ref4) {
  var initial = _ref4.initial;
  var element = document.createElement("div");
  element.setAttribute(honeyPotDataAttribute, "true");
  if (supportsPopover()) {
    element.setAttribute("popover", "manual");
  }
  var clientRect = getHoneyPotRectFor({
    client: initial
  });
  Object.assign(element.style, _objectSpread(_objectSpread({
    position: "fixed"
  }, supportsPopover() ? (
    // needs to come first as it has 'inset: unset' which
    // needs to be overridden by our top / left values
    popoverResetUserAgentStyles
  ) : {
    // Fallback: using maximum possible z-index so that this element
    // will always be on top of other positioned content.
    zIndex: maxZIndex
  }), {}, {
    // Setting a background color explicitly to avoid any inherited styles.
    // Looks like this could be `opacity: 0`, but worried that _might_
    // cause the element to be ignored on some platforms.
    // When debugging, set backgroundColor to something like "red".
    backgroundColor: "transparent",
    // Being explicit to avoid inheriting styles
    padding: 0,
    margin: 0,
    boxSizing: "border-box",
    // We want this element to absorb pointer events,
    // it's kind of the whole point 😉
    pointerEvents: "auto"
  }, getRectStyles({
    clientRect
  })));
  document.body.appendChild(element);
  if (supportsPopover()) {
    element.showPopover();
  }
  var unbindPointerMove = (0, import_bind_event_listener.bind)(window, {
    type: "pointermove",
    listener: function listener(event) {
      var client = {
        x: event.clientX,
        y: event.clientY
      };
      clientRect = getHoneyPotRectFor({
        client
      });
      Object.assign(element.style, getRectStyles({
        clientRect
      }));
    },
    // using capture so we are less likely to be impacted by event stopping
    options: {
      capture: true
    }
  });
  return function finish(_ref5) {
    var current = _ref5.current;
    unbindPointerMove();
    if (isWithin({
      client: current,
      clientRect
    })) {
      element.remove();
      return;
    }
    function cleanup() {
      unbindPostDragEvents();
      element.remove();
    }
    var unbindPostDragEvents = (0, import_bind_event_listener.bindAll)(window, [
      {
        type: "pointerdown",
        listener: cleanup
      },
      {
        type: "pointermove",
        listener: cleanup
      },
      {
        type: "focusin",
        listener: cleanup
      },
      {
        type: "focusout",
        listener: cleanup
      },
      // a 'pointerdown' should happen before 'dragstart', but just being super safe
      {
        type: "dragstart",
        listener: cleanup
      },
      // if the user has dragged something out of the window
      // and then is dragging something back into the window
      // the first events we will see are "dragenter" (and then "dragover").
      // So if we see any of these we need to clear the post drag fix.
      {
        type: "dragenter",
        listener: cleanup
      },
      {
        type: "dragover",
        listener: cleanup
      }
      // Not adding a "wheel" event listener, as "wheel" by itself does not
      // resolve the bug.
    ], {
      // Using `capture` so less likely to be impacted by other code stopping events
      capture: true
    });
  };
}
function makeHoneyPotFix() {
  var latestPointerMove = null;
  function bindEvents() {
    latestPointerMove = null;
    return (0, import_bind_event_listener.bind)(window, {
      type: "pointermove",
      listener: function listener(event) {
        latestPointerMove = {
          x: event.clientX,
          y: event.clientY
        };
      },
      // listening for pointer move in capture phase
      // so we are less likely to be impacted by events being stopped.
      options: {
        capture: true
      }
    });
  }
  function getOnPostDispatch() {
    var finish = null;
    return function onPostEvent(_ref6) {
      var eventName = _ref6.eventName, payload = _ref6.payload;
      if (eventName === "onDragStart") {
        var input = payload.location.initial.input;
        var initial = latestPointerMove !== null && latestPointerMove !== void 0 ? latestPointerMove : {
          x: input.clientX,
          y: input.clientY
        };
        finish = mountHoneyPot({
          initial
        });
      }
      if (eventName === "onDrop") {
        var _finish;
        var _input = payload.location.current.input;
        (_finish = finish) === null || _finish === void 0 || _finish({
          current: {
            x: _input.clientX,
            y: _input.clientY
          }
        });
        finish = null;
        latestPointerMove = null;
      }
    };
  }
  return {
    bindEvents,
    getOnPostDispatch
  };
}

// node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}

// node_modules/@babel/runtime/helpers/esm/iterableToArray.js
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}

// node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

// node_modules/@babel/runtime/helpers/esm/toConsumableArray.js
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}

// node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/ledger/lifecycle-manager.js
var import_bind_event_listener3 = __toESM(require_dist());

// node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/util/is-firefox.js
var isFirefox = once(function isFirefox2() {
  if (false) {
    return false;
  }
  return navigator.userAgent.includes("Firefox");
});

// node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/util/is-safari.js
var isSafari = once(function isSafari2() {
  if (false) {
    return false;
  }
  var _navigator = navigator, userAgent = _navigator.userAgent;
  return userAgent.includes("AppleWebKit") && !userAgent.includes("Chrome");
});

// node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/util/changing-window/is-from-another-window.js
function isNodeLike(target) {
  return "nodeName" in target;
}
function isFromAnotherWindow(eventTarget) {
  return isNodeLike(eventTarget) && eventTarget.ownerDocument !== document;
}

// node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/util/changing-window/count-events-for-safari.js
var import_bind_event_listener2 = __toESM(require_dist());
var symbols = {
  isLeavingWindow: /* @__PURE__ */ Symbol("leaving"),
  isEnteringWindow: /* @__PURE__ */ Symbol("entering")
};
(function fixSafari() {
  if (typeof window === "undefined") {
    return;
  }
  if (false) {
    return;
  }
  if (!isSafari()) {
    return;
  }
  function getInitialState() {
    return {
      enterCount: 0,
      isOverWindow: false
    };
  }
  var state = getInitialState();
  function resetState() {
    state = getInitialState();
  }
  (0, import_bind_event_listener2.bindAll)(
    window,
    [{
      type: "dragstart",
      listener: function listener() {
        state.enterCount = 0;
        state.isOverWindow = true;
      }
    }, {
      type: "drop",
      listener: resetState
    }, {
      type: "dragend",
      listener: resetState
    }, {
      type: "dragenter",
      listener: function listener(event) {
        if (!state.isOverWindow && state.enterCount === 0) {
          event[symbols.isEnteringWindow] = true;
        }
        state.isOverWindow = true;
        state.enterCount++;
      }
    }, {
      type: "dragleave",
      listener: function listener(event) {
        state.enterCount--;
        if (state.isOverWindow && state.enterCount === 0) {
          event[symbols.isLeavingWindow] = true;
          state.isOverWindow = false;
        }
      }
    }],
    // using `capture: true` so that adding event listeners
    // in bubble phase will have the correct symbols
    {
      capture: true
    }
  );
})();

// node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/util/changing-window/is-leaving-window-in-safari.js
function isLeavingWindowInSafari(_ref) {
  var dragLeave = _ref.dragLeave;
  if (!isSafari()) {
    return false;
  }
  return dragLeave.hasOwnProperty(symbols.isLeavingWindow);
}

// node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/util/changing-window/is-leaving-window.js
function isLeavingWindow(_ref) {
  var dragLeave = _ref.dragLeave;
  var type = dragLeave.type, relatedTarget = dragLeave.relatedTarget;
  if (type !== "dragleave") {
    return false;
  }
  if (isSafari()) {
    return isLeavingWindowInSafari({
      dragLeave
    });
  }
  if (relatedTarget == null) {
    return true;
  }
  if (isFirefox()) {
    return isFromAnotherWindow(relatedTarget);
  }
  return relatedTarget instanceof HTMLIFrameElement;
}

// node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/util/detect-broken-drag.js
function getBindingsForBrokenDrags(_ref) {
  var onDragEnd = _ref.onDragEnd;
  return [
    // ## Detecting drag ending for removed draggables
    //
    // If a draggable element is removed during a drag and the user drops:
    // 1. if over a valid drop target: we get a "drop" event to know the drag is finished
    // 2. if not over a valid drop target (or cancelled): we get nothing
    // The "dragend" event will not fire on the source draggable if it has been
    // removed from the DOM.
    // So we need to figure out if a drag operation has finished by looking at other events
    // We can do this by looking at other events
    // ### First detection: "pointermove" events
    // 1. "pointermove" events cannot fire during a drag and drop operation
    // according to the spec. So if we get a "pointermove" it means that
    // the drag and drop operations has finished. So if we get a "pointermove"
    // we know that the drag is over
    // 2. 🦊😤 Drag and drop operations are _supposed_ to suppress
    // other pointer events. However, firefox will allow a few
    // pointer event to get through after a drag starts.
    // The most I've seen is 3
    {
      type: "pointermove",
      listener: /* @__PURE__ */ (function() {
        var callCount = 0;
        return function listener() {
          if (callCount < 20) {
            callCount++;
            return;
          }
          onDragEnd();
        };
      })()
    },
    // ### Second detection: "pointerdown" events
    // If we receive this event then we know that a drag operation has finished
    // and potentially another one is about to start.
    // Note: `pointerdown` fires on all browsers / platforms before "dragstart"
    {
      type: "pointerdown",
      listener: onDragEnd
    }
  ];
}

// node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/util/get-input.js
function getInput(event) {
  return {
    altKey: event.altKey,
    button: event.button,
    buttons: event.buttons,
    ctrlKey: event.ctrlKey,
    metaKey: event.metaKey,
    shiftKey: event.shiftKey,
    clientX: event.clientX,
    clientY: event.clientY,
    pageX: event.pageX,
    pageY: event.pageY
  };
}

// node_modules/raf-schd/dist/raf-schd.esm.js
var rafSchd = function rafSchd2(fn) {
  var lastArgs = [];
  var frameId = null;
  var wrapperFn = function wrapperFn2() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    lastArgs = args;
    if (frameId) {
      return;
    }
    frameId = requestAnimationFrame(function() {
      frameId = null;
      fn.apply(void 0, lastArgs);
    });
  };
  wrapperFn.cancel = function() {
    if (!frameId) {
      return;
    }
    cancelAnimationFrame(frameId);
    frameId = null;
  };
  return wrapperFn;
};
var raf_schd_esm_default = rafSchd;

// node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/ledger/dispatch-consumer-event.js
var scheduleOnDrag = raf_schd_esm_default(function(fn) {
  return fn();
});
var dragStart = /* @__PURE__ */ (function() {
  var scheduled = null;
  function schedule(fn) {
    var frameId = requestAnimationFrame(function() {
      scheduled = null;
      fn();
    });
    scheduled = {
      frameId,
      fn
    };
  }
  function flush() {
    if (scheduled) {
      cancelAnimationFrame(scheduled.frameId);
      scheduled.fn();
      scheduled = null;
    }
  }
  return {
    schedule,
    flush
  };
})();
function makeDispatch(_ref) {
  var source = _ref.source, initial = _ref.initial, dispatchEvent = _ref.dispatchEvent;
  var previous = {
    dropTargets: []
  };
  function safeDispatch(args) {
    dispatchEvent(args);
    previous = {
      dropTargets: args.payload.location.current.dropTargets
    };
  }
  var dispatch = {
    start: function start2(_ref2) {
      var nativeSetDragImage = _ref2.nativeSetDragImage;
      var location = {
        current: initial,
        previous,
        initial
      };
      safeDispatch({
        eventName: "onGenerateDragPreview",
        payload: {
          source,
          location,
          nativeSetDragImage
        }
      });
      dragStart.schedule(function() {
        safeDispatch({
          eventName: "onDragStart",
          payload: {
            source,
            location
          }
        });
      });
    },
    dragUpdate: function dragUpdate(_ref3) {
      var current = _ref3.current;
      dragStart.flush();
      scheduleOnDrag.cancel();
      safeDispatch({
        eventName: "onDropTargetChange",
        payload: {
          source,
          location: {
            initial,
            previous,
            current
          }
        }
      });
    },
    drag: function drag(_ref4) {
      var current = _ref4.current;
      scheduleOnDrag(function() {
        dragStart.flush();
        var location = {
          initial,
          previous,
          current
        };
        safeDispatch({
          eventName: "onDrag",
          payload: {
            source,
            location
          }
        });
      });
    },
    drop: function drop(_ref5) {
      var current = _ref5.current, updatedSourcePayload = _ref5.updatedSourcePayload;
      dragStart.flush();
      scheduleOnDrag.cancel();
      safeDispatch({
        eventName: "onDrop",
        payload: {
          source: updatedSourcePayload !== null && updatedSourcePayload !== void 0 ? updatedSourcePayload : source,
          location: {
            current,
            previous,
            initial
          }
        }
      });
    }
  };
  return dispatch;
}

// node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/ledger/lifecycle-manager.js
var globalState = {
  isActive: false
};
function canStart() {
  return !globalState.isActive;
}
function getNativeSetDragImage(event) {
  if (event.dataTransfer) {
    return event.dataTransfer.setDragImage.bind(event.dataTransfer);
  }
  return null;
}
function hasHierarchyChanged(_ref) {
  var current = _ref.current, next = _ref.next;
  if (current.length !== next.length) {
    return true;
  }
  for (var i = 0; i < current.length; i++) {
    if (current[i].element !== next[i].element) {
      return true;
    }
  }
  return false;
}
function start(_ref2) {
  var event = _ref2.event, dragType = _ref2.dragType, getDropTargetsOver = _ref2.getDropTargetsOver, dispatchEvent = _ref2.dispatchEvent;
  if (!canStart()) {
    return;
  }
  var initial = getStartLocation({
    event,
    dragType,
    getDropTargetsOver
  });
  globalState.isActive = true;
  var state = {
    current: initial
  };
  setDropEffectOnEvent({
    event,
    current: initial.dropTargets
  });
  var dispatch = makeDispatch({
    source: dragType.payload,
    dispatchEvent,
    initial
  });
  function updateState(next) {
    var hasChanged = hasHierarchyChanged({
      current: state.current.dropTargets,
      next: next.dropTargets
    });
    state.current = next;
    if (hasChanged) {
      dispatch.dragUpdate({
        current: state.current
      });
    }
  }
  function onUpdateEvent(event2) {
    var input = getInput(event2);
    var target = isHoneyPotElement(event2.target) ? getElementFromPointWithoutHoneypot({
      x: input.clientX,
      y: input.clientY
    }) : event2.target;
    var nextDropTargets = getDropTargetsOver({
      target,
      input,
      source: dragType.payload,
      current: state.current.dropTargets
    });
    if (nextDropTargets.length) {
      event2.preventDefault();
      setDropEffectOnEvent({
        event: event2,
        current: nextDropTargets
      });
    }
    updateState({
      dropTargets: nextDropTargets,
      input
    });
  }
  function cancel() {
    if (state.current.dropTargets.length) {
      updateState({
        dropTargets: [],
        input: state.current.input
      });
    }
    dispatch.drop({
      current: state.current,
      updatedSourcePayload: null
    });
    finish();
  }
  function finish() {
    globalState.isActive = false;
    unbindEvents();
  }
  var unbindEvents = (0, import_bind_event_listener3.bindAll)(
    window,
    [{
      // 👋 Note: we are repurposing the `dragover` event as our `drag` event
      // this is because firefox does not publish pointer coordinates during
      // a `drag` event, but does for every other type of drag event
      // `dragover` fires on all elements that are being dragged over
      // Because we are binding to `window` - our `dragover` is effectively the same as a `drag`
      // 🦊😤
      type: "dragover",
      listener: function listener(event2) {
        onUpdateEvent(event2);
        dispatch.drag({
          current: state.current
        });
      }
    }, {
      type: "dragenter",
      listener: onUpdateEvent
    }, {
      type: "dragleave",
      listener: function listener(event2) {
        if (!isLeavingWindow({
          dragLeave: event2
        })) {
          return;
        }
        updateState({
          input: state.current.input,
          dropTargets: []
        });
        if (dragType.startedFrom === "external") {
          cancel();
        }
      }
    }, {
      // A "drop" can only happen if the browser allowed the drop
      type: "drop",
      listener: function listener(event2) {
        state.current = {
          dropTargets: state.current.dropTargets,
          input: getInput(event2)
        };
        if (!state.current.dropTargets.length) {
          cancel();
          return;
        }
        event2.preventDefault();
        setDropEffectOnEvent({
          event: event2,
          current: state.current.dropTargets
        });
        dispatch.drop({
          current: state.current,
          // When dropping something native, we need to extract the latest
          // `.items` from the "drop" event as it is now accessible
          updatedSourcePayload: dragType.type === "external" ? dragType.getDropPayload(event2) : null
        });
        finish();
      }
    }, {
      // "dragend" fires when on the drag source (eg a draggable element)
      // when the drag is finished.
      // "dragend" will fire after "drop" (if there was a successful drop)
      // "dragend" does not fire if the draggable source has been removed during the drag
      // or for external drag sources (eg files)
      // This "dragend" listener will not fire if there was a successful drop
      // as we will have already removed the event listener
      type: "dragend",
      listener: function listener(event2) {
        state.current = {
          dropTargets: state.current.dropTargets,
          input: getInput(event2)
        };
        cancel();
      }
    }].concat(_toConsumableArray(getBindingsForBrokenDrags({
      onDragEnd: cancel
    }))),
    // Once we have started a managed drag operation it is important that we see / own all drag events
    // We got one adoption bug pop up where some code was stopping (`event.stopPropagation()`)
    // all "drop" events in the bubble phase on the `document.body`.
    // This meant that we never saw the "drop" event.
    {
      capture: true
    }
  );
  dispatch.start({
    nativeSetDragImage: getNativeSetDragImage(event)
  });
}
function setDropEffectOnEvent(_ref3) {
  var _current$;
  var event = _ref3.event, current = _ref3.current;
  var innerMost = (_current$ = current[0]) === null || _current$ === void 0 ? void 0 : _current$.dropEffect;
  if (innerMost != null && event.dataTransfer) {
    event.dataTransfer.dropEffect = innerMost;
  }
}
function getStartLocation(_ref4) {
  var event = _ref4.event, dragType = _ref4.dragType, getDropTargetsOver = _ref4.getDropTargetsOver;
  var input = getInput(event);
  if (dragType.startedFrom === "external") {
    return {
      input,
      dropTargets: []
    };
  }
  var dropTargets = getDropTargetsOver({
    input,
    source: dragType.payload,
    target: event.target,
    current: []
  });
  return {
    input,
    dropTargets
  };
}
var lifecycle = {
  canStart,
  start
};

// node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/ledger/usage-ledger.js
var ledger = /* @__PURE__ */ new Map();
function registerUsage(_ref) {
  var typeKey = _ref.typeKey, mount2 = _ref.mount;
  var entry = ledger.get(typeKey);
  if (entry) {
    entry.usageCount++;
    return entry;
  }
  var initial = {
    typeKey,
    unmount: mount2(),
    usageCount: 1
  };
  ledger.set(typeKey, initial);
  return initial;
}
function register(args) {
  var entry = registerUsage(args);
  return function unregister() {
    entry.usageCount--;
    if (entry.usageCount > 0) {
      return;
    }
    entry.unmount();
    ledger.delete(args.typeKey);
  };
}

// node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/public-utils/combine.js
function combine() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }
  return function cleanup() {
    fns.forEach(function(fn) {
      return fn();
    });
  };
}

// node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/util/add-attribute.js
function addAttribute(element, _ref) {
  var attribute = _ref.attribute, value = _ref.value;
  element.setAttribute(attribute, value);
  return function() {
    return element.removeAttribute(attribute);
  };
}

// node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/make-adapter/make-drop-target.js
function ownKeys2(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys2(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys2(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _createForOfIteratorHelper(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray2(r)) || e && r && "number" == typeof r.length) {
      t && (r = t);
      var _n = 0, F = function F2() {
      };
      return { s: F, n: function n() {
        return _n >= r.length ? { done: true } : { done: false, value: r[_n++] };
      }, e: function e2(r2) {
        throw r2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o, a = true, u = false;
  return { s: function s() {
    t = t.call(r);
  }, n: function n() {
    var r2 = t.next();
    return a = r2.done, r2;
  }, e: function e2(r2) {
    u = true, o = r2;
  }, f: function f() {
    try {
      a || null == t.return || t.return();
    } finally {
      if (u) throw o;
    }
  } };
}
function _unsupportedIterableToArray2(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray2(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray2(r, a) : void 0;
  }
}
function _arrayLikeToArray2(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function copyReverse(array) {
  return array.slice(0).reverse();
}
function makeDropTarget(_ref) {
  var typeKey = _ref.typeKey, defaultDropEffect = _ref.defaultDropEffect;
  var registry = /* @__PURE__ */ new WeakMap();
  var dropTargetDataAtt = "data-drop-target-for-".concat(typeKey);
  var dropTargetSelector = "[".concat(dropTargetDataAtt, "]");
  function addToRegistry2(args) {
    registry.set(args.element, args);
    return function() {
      return registry.delete(args.element);
    };
  }
  function dropTargetForConsumers(args) {
    if (true) {
      var existing = registry.get(args.element);
      if (existing) {
        console.warn("You have already registered a [".concat(typeKey, "] dropTarget on the same element"), {
          existing,
          proposed: args
        });
      }
      if (args.element instanceof HTMLIFrameElement) {
        console.warn("\n            We recommend not registering <iframe> elements as drop targets\n            as it can result in some strange browser event ordering.\n          ".replace(/\s{2,}/g, " ").trim());
      }
    }
    var cleanup = combine(addAttribute(args.element, {
      attribute: dropTargetDataAtt,
      value: "true"
    }), addToRegistry2(args));
    return once(cleanup);
  }
  function getActualDropTargets(_ref2) {
    var _args$getData, _args$getData2, _args$getDropEffect, _args$getDropEffect2;
    var source = _ref2.source, target = _ref2.target, input = _ref2.input, _ref2$result = _ref2.result, result = _ref2$result === void 0 ? [] : _ref2$result;
    if (target == null) {
      return result;
    }
    if (!(target instanceof Element)) {
      if (target instanceof Node) {
        return getActualDropTargets({
          source,
          target: target.parentElement,
          input,
          result
        });
      }
      return result;
    }
    var closest = target.closest(dropTargetSelector);
    if (closest == null) {
      return result;
    }
    var args = registry.get(closest);
    if (args == null) {
      return result;
    }
    var feedback = {
      input,
      source,
      element: args.element
    };
    if (args.canDrop && !args.canDrop(feedback)) {
      return getActualDropTargets({
        source,
        target: args.element.parentElement,
        input,
        result
      });
    }
    var data = (_args$getData = (_args$getData2 = args.getData) === null || _args$getData2 === void 0 ? void 0 : _args$getData2.call(args, feedback)) !== null && _args$getData !== void 0 ? _args$getData : {};
    var dropEffect = (_args$getDropEffect = (_args$getDropEffect2 = args.getDropEffect) === null || _args$getDropEffect2 === void 0 ? void 0 : _args$getDropEffect2.call(args, feedback)) !== null && _args$getDropEffect !== void 0 ? _args$getDropEffect : defaultDropEffect;
    var record = {
      data,
      element: args.element,
      dropEffect,
      // we are collecting _actual_ drop targets, so these are
      // being applied _not_ due to stickiness
      isActiveDueToStickiness: false
    };
    return getActualDropTargets({
      source,
      target: args.element.parentElement,
      input,
      // Using bubble ordering. Same ordering as `event.getPath()`
      result: [].concat(_toConsumableArray(result), [record])
    });
  }
  function notifyCurrent(_ref3) {
    var eventName = _ref3.eventName, payload = _ref3.payload;
    var _iterator = _createForOfIteratorHelper(payload.location.current.dropTargets), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var _entry$eventName;
        var record = _step.value;
        var entry = registry.get(record.element);
        var args = _objectSpread2(_objectSpread2({}, payload), {}, {
          self: record
        });
        entry === null || entry === void 0 || (_entry$eventName = entry[eventName]) === null || _entry$eventName === void 0 || _entry$eventName.call(
          entry,
          // I cannot seem to get the types right here.
          // TS doesn't seem to like that one event can need `nativeSetDragImage`
          // @ts-expect-error
          args
        );
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  var actions = {
    onGenerateDragPreview: notifyCurrent,
    onDrag: notifyCurrent,
    onDragStart: notifyCurrent,
    onDrop: notifyCurrent,
    onDropTargetChange: function onDropTargetChange(_ref4) {
      var payload = _ref4.payload;
      var isCurrent = new Set(payload.location.current.dropTargets.map(function(record2) {
        return record2.element;
      }));
      var visited = /* @__PURE__ */ new Set();
      var _iterator2 = _createForOfIteratorHelper(payload.location.previous.dropTargets), _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
          var _entry$onDropTargetCh;
          var record = _step2.value;
          visited.add(record.element);
          var entry = registry.get(record.element);
          var isOver = isCurrent.has(record.element);
          var args = _objectSpread2(_objectSpread2({}, payload), {}, {
            self: record
          });
          entry === null || entry === void 0 || (_entry$onDropTargetCh = entry.onDropTargetChange) === null || _entry$onDropTargetCh === void 0 || _entry$onDropTargetCh.call(entry, args);
          if (!isOver) {
            var _entry$onDragLeave;
            entry === null || entry === void 0 || (_entry$onDragLeave = entry.onDragLeave) === null || _entry$onDragLeave === void 0 || _entry$onDragLeave.call(entry, args);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      var _iterator3 = _createForOfIteratorHelper(payload.location.current.dropTargets), _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
          var _entry$onDropTargetCh2, _entry$onDragEnter;
          var _record = _step3.value;
          if (visited.has(_record.element)) {
            continue;
          }
          var _args = _objectSpread2(_objectSpread2({}, payload), {}, {
            self: _record
          });
          var _entry = registry.get(_record.element);
          _entry === null || _entry === void 0 || (_entry$onDropTargetCh2 = _entry.onDropTargetChange) === null || _entry$onDropTargetCh2 === void 0 || _entry$onDropTargetCh2.call(_entry, _args);
          _entry === null || _entry === void 0 || (_entry$onDragEnter = _entry.onDragEnter) === null || _entry$onDragEnter === void 0 || _entry$onDragEnter.call(_entry, _args);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  };
  function dispatchEvent(args) {
    actions[args.eventName](args);
  }
  function getIsOver(_ref5) {
    var source = _ref5.source, target = _ref5.target, input = _ref5.input, current = _ref5.current;
    var actual = getActualDropTargets({
      source,
      target,
      input
    });
    if (actual.length >= current.length) {
      return actual;
    }
    var lastCaptureOrdered = copyReverse(current);
    var actualCaptureOrdered = copyReverse(actual);
    var resultCaptureOrdered = [];
    for (var index = 0; index < lastCaptureOrdered.length; index++) {
      var _argsForLast$getIsSti;
      var last = lastCaptureOrdered[index];
      var fresh = actualCaptureOrdered[index];
      if (fresh != null) {
        resultCaptureOrdered.push(fresh);
        continue;
      }
      var parent = resultCaptureOrdered[index - 1];
      var lastParent = lastCaptureOrdered[index - 1];
      if ((parent === null || parent === void 0 ? void 0 : parent.element) !== (lastParent === null || lastParent === void 0 ? void 0 : lastParent.element)) {
        break;
      }
      var argsForLast = registry.get(last.element);
      if (!argsForLast) {
        break;
      }
      var feedback = {
        input,
        source,
        element: argsForLast.element
      };
      if (argsForLast.canDrop && !argsForLast.canDrop(feedback)) {
        break;
      }
      if (!((_argsForLast$getIsSti = argsForLast.getIsSticky) !== null && _argsForLast$getIsSti !== void 0 && _argsForLast$getIsSti.call(argsForLast, feedback))) {
        break;
      }
      resultCaptureOrdered.push(_objectSpread2(_objectSpread2({}, last), {}, {
        // making it clear to consumers this drop target is active due to stickiness
        isActiveDueToStickiness: true
      }));
    }
    return copyReverse(resultCaptureOrdered);
  }
  return {
    dropTargetForConsumers,
    getIsOver,
    dispatchEvent
  };
}

// node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/make-adapter/make-monitor.js
function _createForOfIteratorHelper2(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray3(r)) || e && r && "number" == typeof r.length) {
      t && (r = t);
      var _n = 0, F = function F2() {
      };
      return { s: F, n: function n() {
        return _n >= r.length ? { done: true } : { done: false, value: r[_n++] };
      }, e: function e2(r2) {
        throw r2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o, a = true, u = false;
  return { s: function s() {
    t = t.call(r);
  }, n: function n() {
    var r2 = t.next();
    return a = r2.done, r2;
  }, e: function e2(r2) {
    u = true, o = r2;
  }, f: function f() {
    try {
      a || null == t.return || t.return();
    } finally {
      if (u) throw o;
    }
  } };
}
function _unsupportedIterableToArray3(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray3(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray3(r, a) : void 0;
  }
}
function _arrayLikeToArray3(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function ownKeys3(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread3(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys3(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys3(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function makeMonitor() {
  var registry = /* @__PURE__ */ new Set();
  var dragging = null;
  function tryAddToActive(monitor) {
    if (!dragging) {
      return;
    }
    if (!monitor.canMonitor || monitor.canMonitor(dragging.canMonitorArgs)) {
      dragging.active.add(monitor);
    }
  }
  function monitorForConsumers(args) {
    var entry = _objectSpread3({}, args);
    registry.add(entry);
    tryAddToActive(entry);
    function cleanup() {
      registry.delete(entry);
      if (dragging) {
        dragging.active.delete(entry);
      }
    }
    return once(cleanup);
  }
  function dispatchEvent(_ref) {
    var eventName = _ref.eventName, payload = _ref.payload;
    if (eventName === "onGenerateDragPreview") {
      dragging = {
        canMonitorArgs: {
          initial: payload.location.initial,
          source: payload.source
        },
        active: /* @__PURE__ */ new Set()
      };
      var _iterator = _createForOfIteratorHelper2(registry), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var monitor = _step.value;
          tryAddToActive(monitor);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    if (!dragging) {
      return;
    }
    var active = Array.from(dragging.active);
    for (var _i = 0, _active = active; _i < _active.length; _i++) {
      var _monitor = _active[_i];
      if (dragging.active.has(_monitor)) {
        var _monitor$eventName;
        (_monitor$eventName = _monitor[eventName]) === null || _monitor$eventName === void 0 || _monitor$eventName.call(_monitor, payload);
      }
    }
    if (eventName === "onDrop") {
      dragging.active.clear();
      dragging = null;
    }
  }
  return {
    dispatchEvent,
    monitorForConsumers
  };
}

// node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/make-adapter/make-adapter.js
function makeAdapter(_ref) {
  var typeKey = _ref.typeKey, mount2 = _ref.mount, dispatchEventToSource2 = _ref.dispatchEventToSource, onPostDispatch = _ref.onPostDispatch, defaultDropEffect = _ref.defaultDropEffect;
  var monitorAPI = makeMonitor();
  var dropTargetAPI = makeDropTarget({
    typeKey,
    defaultDropEffect
  });
  function dispatchEvent(args) {
    dispatchEventToSource2 === null || dispatchEventToSource2 === void 0 || dispatchEventToSource2(args);
    dropTargetAPI.dispatchEvent(args);
    monitorAPI.dispatchEvent(args);
    onPostDispatch === null || onPostDispatch === void 0 || onPostDispatch(args);
  }
  function start2(_ref2) {
    var event = _ref2.event, dragType = _ref2.dragType;
    lifecycle.start({
      event,
      dragType,
      getDropTargetsOver: dropTargetAPI.getIsOver,
      dispatchEvent
    });
  }
  function registerUsage2() {
    function mountAdapter() {
      var api = {
        canStart: lifecycle.canStart,
        start: start2
      };
      return mount2(api);
    }
    return register({
      typeKey,
      mount: mountAdapter
    });
  }
  return {
    registerUsage: registerUsage2,
    dropTarget: dropTargetAPI.dropTargetForConsumers,
    monitor: monitorAPI.monitorForConsumers
  };
}

// node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/util/android.js
var isAndroid = once(function isAndroid2() {
  return navigator.userAgent.toLocaleLowerCase().includes("android");
});
var androidFallbackText = "pdnd:android-fallback";

// node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/util/media-types/text-media-type.js
var textMediaType = "text/plain";

// node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/util/media-types/url-media-type.js
var URLMediaType = "text/uri-list";

// node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/adapter/element-adapter-native-data-key.js
var elementAdapterNativeDataKey = "application/vnd.pdnd";

// node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/adapter/element-adapter.js
var draggableRegistry = /* @__PURE__ */ new WeakMap();
function addToRegistry(args) {
  draggableRegistry.set(args.element, args);
  return function cleanup() {
    draggableRegistry.delete(args.element);
  };
}
var honeyPotFix = makeHoneyPotFix();
var adapter = makeAdapter({
  typeKey: "element",
  defaultDropEffect: "move",
  mount: function mount(api) {
    return combine(honeyPotFix.bindEvents(), (0, import_bind_event_listener4.bind)(document, {
      type: "dragstart",
      listener: function listener(event) {
        var _entry$dragHandle, _entry$getInitialData, _entry$getInitialData2, _entry$dragHandle2, _entry$getInitialData3, _entry$getInitialData4;
        if (!api.canStart(event)) {
          return;
        }
        if (event.defaultPrevented) {
          return;
        }
        if (!event.dataTransfer) {
          if (true) {
            console.warn("\n              It appears as though you have are not testing DragEvents correctly.\n\n              - If you are unit testing, ensure you have polyfilled DragEvent.\n              - If you are browser testing, ensure you are dispatching drag events correctly.\n\n              Please see our testing guides for more information:\n              https://atlassian.design/components/pragmatic-drag-and-drop/core-package/testing\n            ".replace(/ {2}/g, ""));
          }
          return;
        }
        var target = event.target;
        if (!(target instanceof HTMLElement)) {
          return;
        }
        var entry = draggableRegistry.get(target);
        if (!entry) {
          return;
        }
        var input = getInput(event);
        var feedback = {
          element: entry.element,
          dragHandle: (_entry$dragHandle = entry.dragHandle) !== null && _entry$dragHandle !== void 0 ? _entry$dragHandle : null,
          input
        };
        if (entry.canDrag && !entry.canDrag(feedback)) {
          event.preventDefault();
          return;
        }
        if (entry.dragHandle) {
          var over = getElementFromPointWithoutHoneypot({
            x: input.clientX,
            y: input.clientY
          });
          if (!entry.dragHandle.contains(over)) {
            event.preventDefault();
            return;
          }
        }
        var nativeData = (_entry$getInitialData = (_entry$getInitialData2 = entry.getInitialDataForExternal) === null || _entry$getInitialData2 === void 0 ? void 0 : _entry$getInitialData2.call(entry, feedback)) !== null && _entry$getInitialData !== void 0 ? _entry$getInitialData : null;
        if (nativeData) {
          for (var _i = 0, _Object$entries = Object.entries(nativeData); _i < _Object$entries.length; _i++) {
            var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), key = _Object$entries$_i[0], data = _Object$entries$_i[1];
            event.dataTransfer.setData(key, data !== null && data !== void 0 ? data : "");
          }
        }
        if (isAndroid() && !event.dataTransfer.types.includes(textMediaType) && !event.dataTransfer.types.includes(URLMediaType)) {
          event.dataTransfer.setData(textMediaType, androidFallbackText);
        }
        event.dataTransfer.setData(elementAdapterNativeDataKey, "");
        var payload = {
          element: entry.element,
          dragHandle: (_entry$dragHandle2 = entry.dragHandle) !== null && _entry$dragHandle2 !== void 0 ? _entry$dragHandle2 : null,
          data: (_entry$getInitialData3 = (_entry$getInitialData4 = entry.getInitialData) === null || _entry$getInitialData4 === void 0 ? void 0 : _entry$getInitialData4.call(entry, feedback)) !== null && _entry$getInitialData3 !== void 0 ? _entry$getInitialData3 : {}
        };
        var dragType = {
          type: "element",
          payload,
          startedFrom: "internal"
        };
        api.start({
          event,
          dragType
        });
      }
    }));
  },
  dispatchEventToSource: function dispatchEventToSource(_ref) {
    var _draggableRegistry$ge, _draggableRegistry$ge2;
    var eventName = _ref.eventName, payload = _ref.payload;
    (_draggableRegistry$ge = draggableRegistry.get(payload.source.element)) === null || _draggableRegistry$ge === void 0 || (_draggableRegistry$ge2 = _draggableRegistry$ge[eventName]) === null || _draggableRegistry$ge2 === void 0 || _draggableRegistry$ge2.call(
      _draggableRegistry$ge,
      // I cannot seem to get the types right here.
      // TS doesn't seem to like that one event can need `nativeSetDragImage`
      // @ts-expect-error
      payload
    );
  },
  onPostDispatch: honeyPotFix.getOnPostDispatch()
});
var dropTargetForElements = adapter.dropTarget;
var monitorForElements = adapter.monitor;
function draggable(args) {
  if (true) {
    if (args.dragHandle && !args.element.contains(args.dragHandle)) {
      console.warn("Drag handle element must be contained in draggable element", {
        element: args.element,
        dragHandle: args.dragHandle
      });
    }
  }
  if (true) {
    var existing = draggableRegistry.get(args.element);
    if (existing) {
      console.warn("You have already registered a `draggable` on the same element", {
        existing,
        proposed: args
      });
    }
  }
  var cleanup = combine(
    // making the draggable register the adapter rather than drop targets
    // this is because you *must* have a draggable element to start a drag
    // but you _might_ not have any drop targets immediately
    // (You might create drop targets async)
    adapter.registerUsage(),
    addToRegistry(args),
    addAttribute(args.element, {
      attribute: "draggable",
      value: "true"
    })
  );
  return once(cleanup);
}

// node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/public-utils/reorder.js
function reorder(_ref) {
  var list = _ref.list, startIndex = _ref.startIndex, finishIndex = _ref.finishIndex;
  if (startIndex === -1 || finishIndex === -1) {
    return Array.from(list);
  }
  var result = Array.from(list);
  var _result$splice = result.splice(startIndex, 1), _result$splice2 = _slicedToArray(_result$splice, 1), removed = _result$splice2[0];
  result.splice(finishIndex, 0, removed);
  return result;
}

// src/client.jsx
var import_jsx_runtime = require("react/jsx-runtime");
var STORAGE_KEY = "dsh.global-browser.tabs.v2";
var PANEL_ID = "browser";
var NAMESPACE = "dshBrowser";
var MAX_TABS = 20;
var SIDEBAR_COLLAPSED_WIDTH = 104;
var SIDEBAR_DEFAULT_WIDTH = 190;
var SIDEBAR_MIN_WIDTH = 132;
var SIDEBAR_MAX_WIDTH = 420;
var DND_TYPE = "dsh-browser-tab";
var IFRAME_SANDBOX = "allow-scripts allow-forms allow-same-origin";
var zh = {
  "panel.label": "\u6D4F\u89C8\u5668",
  "tabs.label": "\u6D4F\u89C8\u5668\u6807\u7B7E",
  "tabs.new": "\u65B0\u5EFA\u6807\u7B7E",
  "tabs.close": "\u5173\u95ED\u6807\u7B7E",
  "tabs.drag": "\u62D6\u52A8\u6392\u5E8F",
  "tabs.limit": "\u6700\u591A\u4FDD\u7559 20 \u4E2A\u6807\u7B7E",
  "tabs.collapse": "\u6536\u8D77\u6807\u7B7E\u680F",
  "tabs.expand": "\u5C55\u5F00\u6807\u7B7E\u680F",
  "tabs.resize": "\u8C03\u6574\u6807\u7B7E\u680F\u5BBD\u5EA6",
  back: "\u540E\u9000",
  forward: "\u524D\u8FDB",
  reload: "\u5237\u65B0",
  home: "\u4E3B\u9875",
  "error.config": "\u65E0\u6CD5\u8BFB\u53D6\u9ED8\u8BA4 URL \u8BBE\u7F6E\u3002",
  "settings.open": "\u8BBE\u7F6E\u9ED8\u8BA4 URL",
  "settings.title": "\u9ED8\u8BA4 URL",
  "settings.label": "\u65B0\u6807\u7B7E\u548C\u4E3B\u9875\u6253\u5F00\u7684\u7F51\u5740",
  "settings.afterSend": "\u4EFB\u610F\u95E8\u884C\u4E3A",
  "settings.openSession": "\u8DF3\u8F6C\u5230\u65B0\u4F1A\u8BDD",
  "settings.stayBrowser": "\u7559\u5728\u6D4F\u89C8\u5668",
  "settings.cancel": "\u53D6\u6D88",
  "settings.save": "\u4FDD\u5B58",
  "settings.saving": "\u6B63\u5728\u4FDD\u5B58\u2026",
  "settings.saveError": "\u4FDD\u5B58\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002",
  "portal.open": "\u53D1\u9001\u5230 DSH",
  "portal.title": "\u53D1\u9001\u5230 DSH",
  "portal.workspace": "\u5DE5\u4F5C\u533A",
  "portal.noWorkspace": "\u6682\u65E0\u53EF\u7528\u5DE5\u4F5C\u533A",
  "portal.text": "\u53D1\u9001\u5185\u5BB9",
  "portal.note": "\u8865\u5145\u6587\u5B57",
  "portal.notePlaceholder": "\u4E3A\u622A\u56FE\u6DFB\u52A0\u8BF4\u660E\uFF08\u53EF\u9009\uFF09",
  "portal.cancel": "\u53D6\u6D88",
  "portal.send": "\u53D1\u9001",
  "portal.sending": "\u6B63\u5728\u53D1\u9001\u2026",
  "portal.capture": "\u62D6\u52A8\u622A\u53D6\u7F51\u9875\u533A\u57DF",
  "portal.captureError": "\u622A\u56FE\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002",
  "portal.sendError": "\u65E0\u6CD5\u521B\u5EFA\u4F1A\u8BDD\u6216\u53D1\u9001\u5185\u5BB9\uFF0C\u8BF7\u91CD\u8BD5\u3002",
  go: "\u524D\u5F80",
  "address.label": "\u7F51\u5740",
  "address.placeholder": "\u8F93\u5165\u7F51\u5740",
  "address.changed": "\u9875\u9762\u5DF2\u8DF3\u8F6C\uFF0C\u5730\u5740\u65E0\u6CD5\u8BFB\u53D6",
  "error.empty": "\u8BF7\u8F93\u5165\u5730\u5740\u3002",
  "error.invalid": "\u5730\u5740\u65E0\u6548\u6216\u8FC7\u957F\u3002",
  "error.protocol": "\u53EA\u652F\u6301 HTTP \u548C HTTPS \u5730\u5740\u3002",
  "error.credentials": "\u5730\u5740\u4E0D\u80FD\u5305\u542B\u7528\u6237\u540D\u6216\u5BC6\u7801\u3002",
  "error.application-origin": "\u4E0D\u80FD\u5728\u5185\u5D4C\u6D4F\u89C8\u5668\u4E2D\u6253\u5F00 DSH \u81EA\u8EAB\u3002",
  "error.load": "\u9875\u9762\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u5237\u65B0\u91CD\u8BD5\u3002",
  "find.placeholder": "\u5728\u9875\u9762\u4E2D\u67E5\u627E",
  "find.previous": "\u4E0A\u4E00\u4E2A\u5339\u914D\u9879",
  "find.next": "\u4E0B\u4E00\u4E2A\u5339\u914D\u9879",
  "find.close": "\u5173\u95ED\u641C\u7D22",
  "shortcut.select": "\u5207\u6362\u5230\u6D4F\u89C8\u5668\u6807\u7B7E",
  "shortcut.new": "\u65B0\u5EFA\u6D4F\u89C8\u5668\u6807\u7B7E",
  "shortcut.close": "\u5173\u95ED\u5F53\u524D\u6D4F\u89C8\u5668\u6807\u7B7E",
  "shortcut.reload": "\u5237\u65B0\u5F53\u524D\u6D4F\u89C8\u5668\u6807\u7B7E",
  "shortcut.find": "\u5728\u5F53\u524D\u9875\u9762\u4E2D\u67E5\u627E"
};
var en = {
  "panel.label": "Browser",
  "tabs.label": "Browser tabs",
  "tabs.new": "New tab",
  "tabs.close": "Close tab",
  "tabs.drag": "Drag to reorder",
  "tabs.limit": "Up to 20 tabs can be kept",
  "tabs.collapse": "Collapse tab sidebar",
  "tabs.expand": "Expand tab sidebar",
  "tabs.resize": "Resize tab sidebar",
  back: "Back",
  forward: "Forward",
  reload: "Reload",
  home: "Home",
  "error.config": "Could not load the default URL setting.",
  "settings.open": "Set default URL",
  "settings.title": "Default URL",
  "settings.label": "Address opened by new tabs and Home",
  "settings.afterSend": "Portal behavior",
  "settings.openSession": "Open the new session",
  "settings.stayBrowser": "Stay in Browser",
  "settings.cancel": "Cancel",
  "settings.save": "Save",
  "settings.saving": "Saving\u2026",
  "settings.saveError": "Could not save. Try again.",
  "portal.open": "Send to DSH",
  "portal.title": "Send to DSH",
  "portal.workspace": "Workspace",
  "portal.noWorkspace": "No workspace available",
  "portal.text": "Content",
  "portal.note": "Additional text",
  "portal.notePlaceholder": "Add context for the capture (optional)",
  "portal.cancel": "Cancel",
  "portal.send": "Send",
  "portal.sending": "Sending\u2026",
  "portal.capture": "Drag to capture a page region",
  "portal.captureError": "Could not capture the page. Try again.",
  "portal.sendError": "Could not create a session or send the content. Try again.",
  go: "Go",
  "address.label": "Address",
  "address.placeholder": "Enter an address",
  "address.changed": "The page navigated and its address is unavailable",
  "error.empty": "Enter an address.",
  "error.invalid": "The address is invalid or too long.",
  "error.protocol": "Only HTTP and HTTPS addresses are supported.",
  "error.credentials": "Addresses cannot contain a username or password.",
  "error.application-origin": "The embedded browser cannot open DSH itself.",
  "error.load": "The page could not load. Reload it to try again.",
  "find.placeholder": "Find on page",
  "find.previous": "Previous match",
  "find.next": "Next match",
  "find.close": "Close find",
  "shortcut.select": "Select browser tab",
  "shortcut.new": "New browser tab",
  "shortcut.close": "Close current browser tab",
  "shortcut.reload": "Reload current browser tab",
  "shortcut.find": "Find on current page"
};
var css = `
  .dsh-browser-root {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
    color: var(--dsw-alias-label-primary);
    background: var(--dsw-alias-bg-base);
    display: flex;
    position: relative;
    overflow: hidden;
  }
  .dsh-browser-tabs {
    box-sizing: border-box;
    width: 190px;
    min-width: ${SIDEBAR_MIN_WIDTH}px;
    min-height: 0;
    flex: 0 1 190px;
    display: flex;
    flex-direction: column;
    background: var(--dsw-specific-sidebar-fill);
    border-right: 1px solid var(--dsw-alias-border-l1);
  }
  .dsh-browser-tabs-head {
    box-sizing: border-box;
    height: 44px;
    flex: none;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 7px 8px 7px 12px;
    border-bottom: 1px solid var(--dsw-alias-border-l1);
  }
  .dsh-browser-tab-list {
    min-height: 0;
    flex: 1;
    overflow: auto;
    padding: 6px;
  }
  .dsh-browser-tab-row {
    box-sizing: border-box;
    width: 100%;
    height: 36px;
    display: flex;
    align-items: center;
    margin-bottom: 2px;
    border-top: 2px solid transparent;
    border-left: 2px solid transparent;
    border-radius: 6px;
  }
  .dsh-browser-tab-row:hover { background: var(--dsw-alias-bg-layer-1); }
  .dsh-browser-tab-row.is-active {
    background: var(--dsw-alias-bg-layer-2);
    border-left-color: var(--dsw-alias-brand-primary);
  }
  .dsh-browser-tab-row.is-dragging { opacity: .5; }
  .dsh-browser-tab-row.is-drop-target {
    border-top-color: var(--dsw-alias-brand-primary);
  }
  .dsh-browser-drag-handle {
    width: 20px;
    height: 100%;
    flex: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--dsw-alias-label-secondary);
    cursor: grab;
    touch-action: none;
  }
  .dsh-browser-drag-handle:active { cursor: grabbing; }
  .dsh-browser-tab-select {
    box-sizing: border-box;
    min-width: 0;
    height: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 0 4px 0 2px;
    color: var(--dsw-alias-label-secondary);
    background: transparent;
    border: 0;
    cursor: pointer;
    text-align: left;
  }
  .dsh-browser-tab-row.is-active .dsh-browser-tab-select {
    color: var(--dsw-alias-label-primary);
  }
  .dsh-browser-tab-title {
    min-width: 0;
    overflow: hidden;
    font-size: 12px;
    letter-spacing: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .dsh-browser-favicon {
    width: 16px;
    height: 16px;
    flex: none;
    display: block;
    object-fit: contain;
  }
  .dsh-browser-sidebar-resizer {
    box-sizing: border-box;
    width: 5px;
    min-width: 5px;
    align-self: stretch;
    position: relative;
    z-index: 2;
    background: transparent;
    cursor: col-resize;
    touch-action: none;
  }
  .dsh-browser-sidebar-resizer::after {
    content: '';
    position: absolute;
    inset: 0 2px;
    background: var(--dsw-alias-border-l1);
  }
  .dsh-browser-sidebar-resizer:hover::after,
  .dsh-browser-sidebar-resizer:focus-visible::after,
  .dsh-browser-root.is-resizing-sidebar .dsh-browser-sidebar-resizer::after {
    inset: 0 1px;
    background: var(--dsw-alias-brand-primary);
  }
  .dsh-browser-sidebar-resizer:focus-visible { outline: none; }
  .dsh-browser-root.is-resizing-sidebar {
    cursor: col-resize;
    user-select: none;
  }
  .dsh-browser-pages {
    min-width: 0;
    min-height: 0;
    flex: 1;
    position: relative;
  }
  .dsh-browser-page {
    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
    display: none;
    flex-direction: column;
  }
  .dsh-browser-page.is-active { display: flex; }
  .dsh-browser-toolbar,
  .dsh-browser-findbar {
    box-sizing: border-box;
    flex: none;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 7px 10px;
    border-bottom: 1px solid var(--dsw-alias-border-l1);
    background: var(--dsw-alias-bg-layer-1);
  }
  .dsh-browser-toolbar { height: 44px; }
  .dsh-browser-findbar { height: 40px; justify-content: flex-end; }
  .dsh-browser-button {
    box-sizing: border-box;
    width: 30px;
    height: 30px;
    flex: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    color: var(--dsw-alias-label-secondary);
    background: transparent;
    border: 1px solid transparent;
    border-radius: 6px;
    cursor: pointer;
  }
  .dsh-browser-button:hover:not(:disabled),
  .dsh-browser-button:focus-visible,
  .dsh-browser-tab-select:focus-visible,
  .dsh-browser-drag-handle:focus-visible {
    color: var(--dsw-alias-label-primary);
    background: var(--dsw-alias-bg-layer-2);
    border-color: var(--dsw-alias-border-l1);
    outline: none;
  }
  .dsh-browser-button:disabled {
    color: var(--dsw-alias-state-idle-primary);
    cursor: default;
    opacity: .55;
  }
  .dsh-browser-tab-close { opacity: 0; margin-right: 2px; }
  .dsh-browser-tab-row:hover .dsh-browser-tab-close,
  .dsh-browser-tab-row.is-active .dsh-browser-tab-close,
  .dsh-browser-tab-close:focus-visible { opacity: 1; }
  .dsh-browser-new-tab { margin-left: auto; }
  .dsh-browser-tabs.is-collapsed {
    min-width: ${SIDEBAR_COLLAPSED_WIDTH}px;
  }
  .dsh-browser-tabs.is-collapsed .dsh-browser-tabs-head {
    gap: 4px;
    padding: 7px 5px;
  }
  .dsh-browser-tabs.is-collapsed .dsh-browser-drag-handle,
  .dsh-browser-tabs.is-collapsed .dsh-browser-tab-title,
  .dsh-browser-tabs.is-collapsed .dsh-browser-tab-close {
    display: none;
  }
  .dsh-browser-tabs.is-collapsed .dsh-browser-tab-row {
    justify-content: center;
    border-left-color: transparent;
  }
  .dsh-browser-tabs.is-collapsed .dsh-browser-tab-row.is-active {
    border-left-color: var(--dsw-alias-brand-primary);
  }
  .dsh-browser-tabs.is-collapsed .dsh-browser-tab-select {
    width: 36px;
    flex: none;
    justify-content: center;
    padding: 0;
  }
  .dsh-browser-address-wrap { min-width: 96px; flex: 1 1 auto; position: relative; }
  .dsh-browser-address,
  .dsh-browser-find-input {
    box-sizing: border-box;
    height: 30px;
    color: var(--dsw-alias-label-primary);
    background: var(--dsw-alias-bg-base);
    border: 1px solid var(--dsw-alias-border-l2);
    border-radius: 6px;
    font: inherit;
    font-size: 13px;
    letter-spacing: 0;
  }
  .dsh-browser-address { width: 100%; padding: 0 36px 0 10px; }
  .dsh-browser-find-input { width: min(320px, 45%); padding: 0 9px; }
  .dsh-browser-address:focus,
  .dsh-browser-find-input:focus {
    border-color: var(--dsw-alias-brand-primary);
    outline: 2px solid color-mix(in srgb, var(--dsw-alias-brand-primary) 18%, transparent);
    outline-offset: 0;
  }
  .dsh-browser-go { position: absolute; top: 0; right: 0; }
  .dsh-browser-find-count {
    min-width: 54px;
    color: var(--dsw-alias-label-secondary);
    font-size: 12px;
    text-align: center;
  }
  .dsh-browser-status {
    box-sizing: border-box;
    min-height: 28px;
    flex: none;
    display: flex;
    align-items: center;
    padding: 5px 12px;
    color: var(--dsw-alias-label-secondary);
    background: var(--dsw-alias-bg-layer-2);
    border-bottom: 1px solid var(--dsw-alias-border-l1);
    font-size: 12px;
  }
  .dsh-browser-status-error { color: var(--dsw-alias-state-error-primary); }
  .dsh-browser-progress { height: 2px; flex: none; background: var(--dsw-alias-brand-primary); }
  .dsh-browser-viewport {
    min-width: 0;
    min-height: 0;
    flex: 1 1 auto;
    position: relative;
    background: var(--dsw-alias-bg-base);
  }
  .dsh-browser-frame,
  .dsh-browser-webview-host,
  .dsh-browser-webview-host webview {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border: 0;
    display: flex;
  }
  .dsh-browser-settings-backdrop {
    position: absolute;
    inset: 0;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: color-mix(in srgb, var(--dsw-alias-bg-base) 62%, transparent);
  }
  .dsh-browser-settings-dialog {
    box-sizing: border-box;
    width: min(520px, 100%);
    padding: 20px;
    color: var(--dsw-alias-label-primary);
    background: var(--dsw-alias-bg-base);
    border: 1px solid var(--dsw-alias-border-l1);
    border-radius: 8px;
    box-shadow: 0 12px 36px color-mix(in srgb, black 24%, transparent);
  }
  .dsh-browser-settings-title {
    margin: 0 0 18px;
    font-size: 17px;
    font-weight: 600;
    letter-spacing: 0;
  }
  .dsh-browser-settings-label {
    display: block;
    margin-bottom: 7px;
    color: var(--dsw-alias-label-secondary);
    font-size: 12px;
  }
  .dsh-browser-settings-input {
    box-sizing: border-box;
    width: 100%;
    height: 36px;
    padding: 0 10px;
    color: var(--dsw-alias-label-primary);
    background: var(--dsw-alias-bg-layer-1);
    border: 1px solid var(--dsw-alias-border-l2);
    border-radius: 6px;
    font: inherit;
    font-size: 13px;
    letter-spacing: 0;
  }
  .dsh-browser-settings-input:focus {
    border-color: var(--dsw-alias-brand-primary);
    outline: 2px solid color-mix(in srgb, var(--dsw-alias-brand-primary) 18%, transparent);
  }
  .dsh-browser-settings-error {
    min-height: 18px;
    margin-top: 6px;
    color: var(--dsw-alias-state-error-primary);
    font-size: 12px;
  }
  .dsh-browser-settings-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 14px;
  }
  .dsh-browser-settings-action {
    min-width: 72px;
    height: 32px;
    padding: 0 14px;
    color: var(--dsw-alias-label-primary);
    background: var(--dsw-alias-bg-layer-1);
    border: 1px solid var(--dsw-alias-border-l1);
    border-radius: 6px;
    cursor: pointer;
    font: inherit;
    font-size: 13px;
  }
  .dsh-browser-settings-action.is-primary {
    color: white;
    background: var(--dsw-alias-brand-primary);
    border-color: var(--dsw-alias-brand-primary);
  }
  .dsh-browser-settings-action:disabled { cursor: default; opacity: .55; }
  .dsh-browser-capture-layer {
    position: absolute;
    inset: 0;
    z-index: 8;
    overflow: hidden;
    background: color-mix(in srgb, black 32%, transparent);
    cursor: crosshair;
    touch-action: none;
  }
  .dsh-browser-capture-layer.has-selection { background: transparent; }
  .dsh-browser-capture-selection {
    position: absolute;
    box-sizing: border-box;
    border: 2px solid var(--dsw-alias-brand-primary);
    background: color-mix(in srgb, var(--dsw-alias-brand-primary) 8%, transparent);
    box-shadow: 0 0 0 9999px color-mix(in srgb, black 38%, transparent);
    pointer-events: none;
  }
  .dsh-browser-capture-layer.is-busy { cursor: wait; }
  .dsh-browser-portal-dialog {
    box-sizing: border-box;
    width: min(560px, 100%);
    max-height: min(680px, calc(100% - 40px));
    overflow: auto;
    padding: 20px;
    color: var(--dsw-alias-label-primary);
    background: var(--dsw-alias-bg-base);
    border: 1px solid var(--dsw-alias-border-l1);
    border-radius: 8px;
    box-shadow: 0 12px 36px color-mix(in srgb, black 24%, transparent);
  }
  .dsh-browser-portal-preview {
    width: 100%;
    max-height: 260px;
    display: block;
    margin-bottom: 16px;
    object-fit: contain;
    background: var(--dsw-alias-bg-layer-1);
    border: 1px solid var(--dsw-alias-border-l1);
    border-radius: 6px;
  }
  .dsh-browser-portal-field { margin-bottom: 14px; }
  .dsh-browser-portal-select,
  .dsh-browser-portal-textarea {
    box-sizing: border-box;
    width: 100%;
    color: var(--dsw-alias-label-primary);
    background: var(--dsw-alias-bg-layer-1);
    border: 1px solid var(--dsw-alias-border-l2);
    border-radius: 6px;
    font: inherit;
    font-size: 13px;
    letter-spacing: 0;
  }
  .dsh-browser-portal-select { height: 36px; padding: 0 10px; }
  .dsh-browser-portal-textarea {
    min-height: 112px;
    padding: 9px 10px;
    resize: vertical;
    line-height: 1.5;
  }
  .dsh-browser-portal-select:focus,
  .dsh-browser-portal-textarea:focus {
    border-color: var(--dsw-alias-brand-primary);
    outline: 2px solid color-mix(in srgb, var(--dsw-alias-brand-primary) 18%, transparent);
  }
  .dsh-browser-portal-toast {
    position: absolute;
    right: 16px;
    bottom: 16px;
    z-index: 30;
    max-width: min(360px, calc(100% - 32px));
    padding: 9px 12px;
    color: var(--dsw-alias-state-error-primary);
    background: var(--dsw-alias-bg-base);
    border: 1px solid var(--dsw-alias-state-error-primary);
    border-radius: 6px;
    box-shadow: 0 8px 24px color-mix(in srgb, black 18%, transparent);
    font-size: 12px;
  }
  @media (max-width: 900px) {
    .dsh-browser-tabs { width: 152px; flex-basis: 152px; }
    .dsh-browser-toolbar, .dsh-browser-findbar { padding-left: 6px; padding-right: 6px; }
  }
`;
function canonicalAddress(input) {
  const trimmed = String(input ?? "").trim();
  if (!trimmed) return { ok: false, reason: "empty" };
  if (trimmed.length > 16384) return { ok: false, reason: "invalid" };
  const candidate = /^[A-Za-z][A-Za-z\d+.-]*:(?!\d+(?:[/?#]|$))/u.test(trimmed) ? trimmed : `https://${trimmed}`;
  let url;
  try {
    url = new URL(candidate);
  } catch {
    return { ok: false, reason: "invalid" };
  }
  if (url.username || url.password) return { ok: false, reason: "credentials" };
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return { ok: false, reason: "protocol" };
  }
  if (url.origin === window.location.origin) {
    return { ok: false, reason: "application-origin" };
  }
  return { ok: true, url: url.href };
}
function sanitizedFavicon(value) {
  if (typeof value !== "string" || !value || value.length > 262144) return void 0;
  if (value.startsWith("data:image/")) return value;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : void 0;
  } catch {
    return void 0;
  }
}
function fallbackFavicon(url) {
  try {
    return new URL("/favicon.ico", url).href;
  } catch {
    return void 0;
  }
}
function makeId() {
  return globalThis.crypto?.randomUUID?.() ?? `tab-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
function clampSidebarWidth(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return SIDEBAR_DEFAULT_WIDTH;
  return Math.min(SIDEBAR_MAX_WIDTH, Math.max(SIDEBAR_MIN_WIDTH, Math.round(numeric)));
}
function makeTab(url) {
  const parsed = canonicalAddress(url);
  if (!parsed.ok) return void 0;
  return {
    id: makeId(),
    title: new URL(parsed.url).hostname || "Browser",
    url: parsed.url,
    favicon: fallbackFavicon(parsed.url)
  };
}
function sanitizedTabs(value) {
  if (!Array.isArray(value)) return [];
  const seen = /* @__PURE__ */ new Set();
  return value.slice(0, MAX_TABS).flatMap((tab) => {
    if (!tab || typeof tab.id !== "string" || seen.has(tab.id)) return [];
    const parsed = canonicalAddress(tab.url);
    if (!parsed.ok) return [];
    seen.add(tab.id);
    return [{
      id: tab.id,
      title: typeof tab.title === "string" && tab.title.trim() ? tab.title.trim().slice(0, 160) : new URL(parsed.url).hostname,
      url: parsed.url,
      favicon: sanitizedFavicon(tab.favicon) ?? fallbackFavicon(parsed.url)
    }];
  });
}
var browserStore = createStore(persist((set, get) => ({
  tabs: [],
  activeId: void 0,
  defaultUrl: void 0,
  afterSendBehavior: "open-session",
  configError: false,
  sidebarWidth: SIDEBAR_DEFAULT_WIDTH,
  sidebarCollapsed: false,
  setSidebarWidth(value) {
    set({ sidebarWidth: clampSidebarWidth(value) });
  },
  toggleSidebar() {
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }));
  },
  setConfig(rawUrl, afterSendBehavior) {
    const parsed = canonicalAddress(rawUrl);
    const behaviorValid = afterSendBehavior === "open-session" || afterSendBehavior === "stay-browser";
    if (!parsed.ok || !behaviorValid) {
      set({ configError: true });
      return false;
    }
    const state = get();
    if (state.tabs.length) {
      set({
        defaultUrl: parsed.url,
        afterSendBehavior,
        configError: false
      });
    } else {
      const tab = makeTab(parsed.url);
      set({
        defaultUrl: parsed.url,
        afterSendBehavior,
        configError: false,
        tabs: tab ? [tab] : [],
        activeId: tab?.id
      });
    }
    return true;
  },
  setConfigError() {
    set({ configError: true });
  },
  addTab(rawUrl) {
    const target = rawUrl ?? get().defaultUrl;
    const parsed = canonicalAddress(target);
    if (!parsed.ok || get().tabs.length >= MAX_TABS) return void 0;
    const tab = makeTab(parsed.url);
    if (!tab) return void 0;
    set((state) => ({ tabs: [...state.tabs, tab], activeId: tab.id }));
    return tab.id;
  },
  closeTab(id) {
    const state = get();
    const index = state.tabs.findIndex((tab) => tab.id === id);
    if (index < 0) return void 0;
    let tabs = state.tabs.filter((tab) => tab.id !== id);
    if (!tabs.length) {
      const fallback = makeTab(state.defaultUrl);
      tabs = fallback ? [fallback] : [];
    }
    const activeId = state.activeId === id ? tabs[Math.min(index, tabs.length - 1)]?.id : state.activeId;
    set({ tabs, activeId });
    return activeId;
  },
  selectTab(id) {
    if (get().tabs.some((tab) => tab.id === id)) set({ activeId: id });
  },
  updateTab(id, patch) {
    set((state) => {
      let changed = false;
      const tabs = state.tabs.map((tab) => {
        if (tab.id !== id) return tab;
        const next = { ...tab, ...patch };
        if (next.url === tab.url && next.title === tab.title && next.favicon === tab.favicon) return tab;
        changed = true;
        return next;
      });
      return changed ? { tabs } : state;
    });
  },
  moveTab(sourceId, targetId) {
    set((state) => {
      const startIndex = state.tabs.findIndex((tab) => tab.id === sourceId);
      const finishIndex = state.tabs.findIndex((tab) => tab.id === targetId);
      if (startIndex < 0 || finishIndex < 0 || startIndex === finishIndex) return state;
      return { tabs: reorder({ list: state.tabs, startIndex, finishIndex }) };
    });
  }
}), {
  name: STORAGE_KEY,
  storage: createJSONStorage(() => localStorage),
  partialize: (state) => ({
    tabs: state.tabs,
    activeId: state.activeId,
    sidebarWidth: state.sidebarWidth,
    sidebarCollapsed: state.sidebarCollapsed
  }),
  merge: (persisted, current) => {
    const base = {
      ...current,
      sidebarWidth: clampSidebarWidth(persisted?.sidebarWidth),
      sidebarCollapsed: persisted?.sidebarCollapsed === true
    };
    const tabs = sanitizedTabs(persisted?.tabs);
    if (!tabs.length) return base;
    const activeId = tabs.some((tab) => tab.id === persisted?.activeId) ? persisted.activeId : tabs[0].id;
    return { ...base, tabs, activeId };
  }
}));
function useBrowserStore(selector) {
  return React.useSyncExternalStore(
    browserStore.subscribe,
    () => selector(browserStore.getState()),
    () => selector(browserStore.getInitialState())
  );
}
async function loadBrowserConfig(signal) {
  const response = await fetch("/api/dsh-browser/config", {
    method: "GET",
    headers: { accept: "application/json" },
    credentials: "same-origin",
    signal
  });
  if (!response.ok) throw new Error(`Config request failed: ${response.status}`);
  const payload = await response.json();
  if (!browserStore.getState().setConfig(payload?.defaultUrl, payload?.afterSendBehavior)) {
    throw new Error("Config returned invalid browser settings");
  }
}
async function saveBrowserConfig(defaultUrl, afterSendBehavior) {
  const response = await fetch("/api/dsh-browser/config", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json"
    },
    credentials: "same-origin",
    body: JSON.stringify({ defaultUrl, afterSendBehavior })
  });
  if (!response.ok) throw new Error(`Config save failed: ${response.status}`);
  const payload = await response.json();
  if (!browserStore.getState().setConfig(payload?.defaultUrl, payload?.afterSendBehavior)) {
    throw new Error("Config save returned invalid browser settings");
  }
  return payload;
}
function useWorkspaceItems(source) {
  return React.useSyncExternalStore(
    (listener) => source.subscribe(listener),
    () => source.getSnapshot().items,
    () => source.getSnapshot().items
  );
}
async function sendPortalToWorkspace(ctx, workspaceId, payload, text, afterSendBehavior) {
  const content = [];
  if (payload.kind === "image") {
    const prefix = "data:image/png;base64,";
    if (!payload.dataUrl.startsWith(prefix)) throw new Error("Invalid PNG capture");
    content.push({
      type: "image",
      mediaType: "image/png",
      data: payload.dataUrl.slice(prefix.length),
      name: "browser-capture.png"
    });
    if (text) content.push({ type: "text", text });
  } else {
    content.push({ type: "text", text });
  }
  const sessionId = await ctx.sessions.create({ workspaceId });
  const reference = ctx.sessions.retain(sessionId, { source: "dshBrowserCapture" });
  try {
    await reference.ready;
    const result = await reference.binding.session.prompt(content, "queue");
    if (!result.ok) {
      throw new Error(result.error?.message ?? "Session prompt failed");
    }
    if (afterSendBehavior === "open-session") ctx.uiWorkspace.openSession(sessionId);
    return sessionId;
  } finally {
    reference.release();
  }
}
var panelLayout = { active: false, left: 0, top: 0, width: 0, height: 0 };
var panelLayoutSubscribers = /* @__PURE__ */ new Set();
var desktopControllers = /* @__PURE__ */ new Map();
var tabCommands = /* @__PURE__ */ new Map();
var shortcutActions;
function publishPanelLayout(next) {
  panelLayout = next;
  for (const subscriber of panelLayoutSubscribers) subscriber();
}
function usePanelLayout() {
  return React.useSyncExternalStore(
    (listener) => {
      panelLayoutSubscribers.add(listener);
      return () => panelLayoutSubscribers.delete(listener);
    },
    () => panelLayout,
    () => panelLayout
  );
}
function openEmbeddedTab(rawUrl) {
  const parsed = canonicalAddress(rawUrl);
  if (!parsed.ok) return false;
  browserStore.getState().addTab(parsed.url);
  return true;
}
function createDesktopController(tab, bridge) {
  let snapshot = {
    url: tab.url,
    title: tab.title,
    favicon: tab.favicon,
    loading: true,
    error: false,
    ready: false,
    canGoBack: false,
    canGoForward: false,
    findMatches: 0,
    findActive: 0
  };
  let pendingUrl = tab.url;
  let element;
  let lease;
  let host;
  let unsubscribeOpen;
  let bootstrapped = false;
  let resetHistoryOnNextHttpLoad = true;
  let findRequestId;
  let pendingFind;
  let loadEpoch = 0;
  let loadingTimer;
  let disposed = false;
  const subscribers = /* @__PURE__ */ new Set();
  const removers = [];
  const publish = (patch) => {
    snapshot = { ...snapshot, ...patch };
    for (const subscriber of subscribers) subscriber();
  };
  const observe = () => {
    if (!element || disposed) return;
    const parsed = canonicalAddress(element.getURL());
    if (!parsed.ok) return;
    pendingUrl = parsed.url;
    publish({
      url: parsed.url,
      title: element.getTitle() || new URL(parsed.url).hostname,
      loading: element.isLoading(),
      ready: true,
      canGoBack: element.canGoBack(),
      canGoForward: element.canGoForward()
    });
  };
  const clearLoadingTimer = () => {
    if (loadingTimer !== void 0) window.clearTimeout(loadingTimer);
    loadingTimer = void 0;
  };
  const beginLoading = () => {
    const epoch = ++loadEpoch;
    clearLoadingTimer();
    publish({ loading: true, error: false });
    loadingTimer = window.setTimeout(() => {
      if (disposed || epoch !== loadEpoch) return;
      try {
        if (element?.isLoading()) element.stop();
      } catch {
      }
      observe();
      publish({ loading: false });
      loadingTimer = void 0;
    }, 3e4);
  };
  const finishLoading = (patch = {}) => {
    loadEpoch += 1;
    clearLoadingTimer();
    observe();
    publish({ loading: false, ...patch });
  };
  const add = (name, listener) => {
    element.addEventListener(name, listener);
    removers.push(() => element?.removeEventListener(name, listener));
  };
  const clearBootstrapHistory = () => {
    if (!resetHistoryOnNextHttpLoad || !element || disposed) return;
    const parsed = canonicalAddress(element.getURL());
    if (!parsed.ok) return;
    try {
      element.clearHistory();
      resetHistoryOnNextHttpLoad = false;
    } catch {
    }
    observe();
  };
  const installSelectionTracker = async () => {
    if (!element || disposed) return;
    try {
      await element.executeJavaScript(`(() => {
        const cacheKey = '__dshBrowserSelectionCacheV1'
        const trackerKey = '__dshBrowserSelectionTrackerV1'
        if (globalThis[trackerKey]) return
        globalThis[cacheKey] = ''
        const remember = () => {
          const text = String(globalThis.getSelection?.()?.toString() ?? '').trim()
          if (text) globalThis[cacheKey] = text
        }
        document.addEventListener('pointerdown', () => {
          globalThis[cacheKey] = ''
        }, true)
        document.addEventListener('selectionchange', remember, true)
        document.addEventListener('mouseup', remember, true)
        globalThis[trackerKey] = true
      })()`, true);
    } catch {
    }
  };
  const startFind = () => {
    if (!pendingFind || !element || !snapshot.ready || snapshot.loading) return false;
    try {
      const requestId = element.findInPage(pendingFind.query, {
        forward: pendingFind.forward,
        findNext: pendingFind.findNext
      });
      if (typeof requestId === "number") findRequestId = requestId;
      return true;
    } catch {
      return false;
    }
  };
  const controller = {
    getSnapshot: () => snapshot,
    subscribe(listener) {
      subscribers.add(listener);
      return () => subscribers.delete(listener);
    },
    attach(nextHost) {
      host = nextHost;
      if (element && element.parentNode !== host) host.append(element);
      return () => {
        if (host === nextHost) host = void 0;
      };
    },
    load(rawUrl) {
      const parsed = canonicalAddress(rawUrl);
      if (!parsed.ok) return parsed;
      pendingUrl = parsed.url;
      pendingFind = void 0;
      findRequestId = void 0;
      if (element && typeof element.stopFindInPage === "function") {
        try {
          element.stopFindInPage("clearSelection");
        } catch {
        }
      }
      publish({
        url: parsed.url,
        title: new URL(parsed.url).hostname,
        favicon: fallbackFavicon(parsed.url),
        findMatches: 0,
        findActive: 0
      });
      beginLoading();
      if (snapshot.ready && element) {
        element.loadURL(parsed.url).catch(() => finishLoading({ error: true }));
      }
      return parsed;
    },
    reload() {
      if (!element) return;
      pendingFind = void 0;
      findRequestId = void 0;
      if (typeof element.stopFindInPage === "function") {
        try {
          element.stopFindInPage("clearSelection");
        } catch {
        }
      }
      try {
        if (element.isLoading()) element.stop();
        beginLoading();
        const current = canonicalAddress(element.getURL());
        if (current.ok) {
          element.reload();
        } else {
          resetHistoryOnNextHttpLoad = true;
          element.loadURL(pendingUrl).catch(() => finishLoading({ error: true }));
        }
      } catch {
        finishLoading({ error: true });
      }
    },
    command(name) {
      if (!element) return;
      try {
        element[name]();
      } catch {
        publish({ loading: false, error: true });
      }
    },
    find(query, forward = true, findNext = false) {
      if (!query) {
        controller.stopFind();
        return true;
      }
      pendingFind = { query, forward, findNext };
      return startFind() || !snapshot.ready || snapshot.loading;
    },
    stopFind() {
      pendingFind = void 0;
      findRequestId = void 0;
      if (element && typeof element.stopFindInPage === "function") {
        try {
          element.stopFindInPage("clearSelection");
        } catch {
        }
      }
      publish({ findMatches: 0, findActive: 0 });
    },
    async selectedText() {
      if (!element || !snapshot.ready) return "";
      try {
        const value = await element.executeJavaScript(
          `(() => {
            const current = String(globalThis.getSelection?.()?.toString() ?? '').trim()
            return current || String(globalThis.__dshBrowserSelectionCacheV1 ?? '').trim()
          })()`,
          true
        );
        return typeof value === "string" ? value.trim() : "";
      } catch {
        return "";
      }
    },
    async captureRegion(rect) {
      if (!element || !snapshot.ready || typeof element.capturePage !== "function") {
        throw new Error("WebView capture is unavailable");
      }
      const image = await element.capturePage({
        x: Math.round(rect.x),
        y: Math.round(rect.y),
        width: Math.round(rect.width),
        height: Math.round(rect.height)
      });
      const dataUrl = image?.toDataURL?.();
      if (typeof dataUrl !== "string" || !dataUrl.startsWith("data:image/png;base64,")) {
        throw new Error("WebView capture returned no PNG data");
      }
      return dataUrl;
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      loadEpoch += 1;
      clearLoadingTimer();
      pendingFind = void 0;
      findRequestId = void 0;
      if (element && typeof element.stopFindInPage === "function") {
        try {
          element.stopFindInPage("clearSelection");
        } catch {
        }
      }
      unsubscribeOpen?.();
      for (const remove of removers) remove();
      element?.remove();
      element = void 0;
      subscribers.clear();
      if (lease) bridge.release(lease).catch(() => {
      });
    }
  };
  bridge.acquire("plugin:tower-global-browser").then((reservation) => {
    if (disposed) {
      bridge.release(reservation.lease).catch(() => {
      });
      return;
    }
    lease = reservation.lease;
    element = document.createElement("webview");
    element.dataset.sidebarBrowserFrame = "webview";
    element.setAttribute("name", reservation.lease);
    element.setAttribute("partition", reservation.partition);
    element.setAttribute("allowpopups", "");
    element.setAttribute("src", `about:blank#${reservation.lease}`);
    element.setAttribute("aria-label", tab.title);
    add("dom-ready", () => {
      publish({ ready: true });
      if (bootstrapped) {
        observe();
        return;
      }
      bootstrapped = true;
      element.loadURL(pendingUrl).catch(() => finishLoading({ error: true }));
    });
    add("did-start-loading", beginLoading);
    add("did-stop-loading", () => {
      finishLoading();
      clearBootstrapHistory();
      void installSelectionTracker();
      startFind();
    });
    add("did-navigate", (event) => {
      const previousUrl = snapshot.url;
      const parsed = canonicalAddress(event.url);
      if (!parsed.ok && bootstrapped) {
        window.setTimeout(() => {
          if (disposed || !element) return;
          const current = canonicalAddress(element.getURL());
          if (current.ok || element.isLoading()) return;
          resetHistoryOnNextHttpLoad = true;
          beginLoading();
          element.loadURL(pendingUrl).catch(() => finishLoading({ error: true }));
        }, 0);
        return;
      }
      observe();
      if (parsed.ok && parsed.url === previousUrl) finishLoading();
    });
    add("did-navigate-in-page", (event) => {
      if (event.isMainFrame) finishLoading();
    });
    add("page-title-updated", observe);
    add("page-favicon-updated", (event) => {
      const favicon = event.favicons?.map(sanitizedFavicon).find(Boolean);
      if (favicon) publish({ favicon });
    });
    add("did-fail-load", (event) => {
      if (event.isMainFrame && event.errorCode !== -3) {
        finishLoading({ error: true });
      }
    });
    add("found-in-page", (event) => {
      const result = event.result;
      if (!result || findRequestId !== void 0 && result.requestId !== findRequestId) return;
      publish({
        findMatches: result.matches ?? 0,
        findActive: result.activeMatchOrdinal ?? 0
      });
    });
    add("before-input-event", (event) => {
      const input = event.input;
      if (!input || input.type !== "keyDown" || input.isAutoRepeat) return;
      const primary = /Mac|iPhone|iPad/u.test(navigator.platform) ? input.meta : input.control;
      if (!primary || !dispatchBrowserShortcut(input.code, input.shift)) return;
      event.preventDefault();
    });
    unsubscribeOpen = bridge.onOpenRequested(reservation.lease, (url) => {
      openEmbeddedTab(url);
    });
    if (host) host.append(element);
  }).catch(() => publish({ loading: false, error: true }));
  desktopControllers.set(tab.id, controller);
  return controller;
}
function disposeDesktopController(tabId) {
  const controller = desktopControllers.get(tabId);
  if (!controller) return;
  desktopControllers.delete(tabId);
  controller.dispose();
}
function disposeDesktopControllers() {
  for (const controller of desktopControllers.values()) controller.dispose();
  desktopControllers.clear();
}
function useDesktopBrowser(tab, bridge) {
  const hostRef = React.useRef(null);
  const controllerRef = React.useRef();
  if (!controllerRef.current) {
    controllerRef.current = desktopControllers.get(tab.id) || createDesktopController(tab, bridge);
  }
  const controller = controllerRef.current;
  const state = React.useSyncExternalStore(
    controller.subscribe,
    controller.getSnapshot,
    controller.getSnapshot
  );
  React.useLayoutEffect(() => {
    const host = hostRef.current;
    return host ? controller.attach(host) : void 0;
  }, [controller]);
  return {
    kind: "desktop",
    ...state,
    load: controller.load,
    back: () => controller.command("goBack"),
    forward: () => controller.command("goForward"),
    reload: controller.reload,
    find: controller.find,
    stopFind: controller.stopFind,
    selectedText: controller.selectedText,
    captureRegion: controller.captureRegion,
    frame: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dsh-browser-webview-host", ref: hostRef })
  };
}
function useIframeBrowser(tab) {
  const [entries, setEntries] = React.useState([tab.url]);
  const [index, setIndex] = React.useState(0);
  const [title, setTitle] = React.useState(tab.title);
  const [revision, setRevision] = React.useState(1);
  const [loading, setLoading] = React.useState(true);
  const [unknown, setUnknown] = React.useState(false);
  const [error, setError] = React.useState(false);
  const observation = React.useRef({ revision, loads: 0 });
  if (observation.current.revision !== revision) {
    observation.current = { revision, loads: 0 };
  }
  const url = entries[index];
  const show = React.useCallback((nextEntries, nextIndex, nextTitle) => {
    if (nextEntries) setEntries(nextEntries);
    if (typeof nextIndex === "number") setIndex(nextIndex);
    if (nextTitle) setTitle(nextTitle);
    setRevision((value) => value + 1);
    setLoading(true);
    setUnknown(false);
    setError(false);
  }, []);
  return {
    kind: "iframe",
    url,
    title,
    favicon: fallbackFavicon(url),
    loading,
    unknown,
    error,
    findMatches: 0,
    findActive: 0,
    canGoBack: !unknown && index > 0,
    canGoForward: !unknown && index < entries.length - 1,
    load(rawUrl) {
      const parsed = canonicalAddress(rawUrl);
      if (!parsed.ok) return parsed;
      const nextTitle = new URL(parsed.url).hostname;
      if (parsed.url === url) {
        show(void 0, void 0, nextTitle);
        return parsed;
      }
      const nextEntries = [...entries.slice(0, index + 1), parsed.url].slice(-100);
      show(nextEntries, nextEntries.length - 1, nextTitle);
      return parsed;
    },
    back() {
      if (index <= 0 || unknown) return;
      const nextIndex = index - 1;
      show(void 0, nextIndex, new URL(entries[nextIndex]).hostname);
    },
    forward() {
      if (index >= entries.length - 1 || unknown) return;
      const nextIndex = index + 1;
      show(void 0, nextIndex, new URL(entries[nextIndex]).hostname);
    },
    reload: () => show(),
    frame: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "iframe",
      {
        className: "dsh-browser-frame",
        src: url,
        title,
        referrerPolicy: "no-referrer",
        sandbox: IFRAME_SANDBOX,
        onLoad: () => {
          observation.current.loads += 1;
          setLoading(false);
          if (observation.current.loads > 1) setUnknown(true);
        },
        onError: () => {
          setLoading(false);
          setError(true);
        }
      },
      revision
    )
  };
}
function Icon({ name, size = 17 }) {
  const paths = {
    back: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m15 18-6-6 6-6" }),
    forward: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m9 18 6-6-6-6" }),
    reload: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 12a9 9 0 0 1-15.3 6.4L3 16" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 21v-5h5" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 12A9 9 0 0 1 18.3 5.6L21 8" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 3v5h-5" })
    ] }),
    home: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m3 11 9-8 9 8" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5 10v10h14V10" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9 20v-6h6v6" })
    ] }),
    go: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5 12h14" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m13 6 6 6-6 6" })
    ] }),
    portal: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 3H5a2 2 0 0 0-2 2v3" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M16 3h3a2 2 0 0 1 2 2v3" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 21H5a2 2 0 0 1-2-2v-3" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M16 21h3a2 2 0 0 0 2-2v-3" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m9 8 7 4-7 4Z" })
    ] }),
    plus: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 5v14M5 12h14" }),
    close: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m7 7 10 10" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17 7 7 17" })
    ] }),
    grip: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "9", cy: "7", r: "1", fill: "currentColor", stroke: "none" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "15", cy: "7", r: "1", fill: "currentColor", stroke: "none" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "9", cy: "12", r: "1", fill: "currentColor", stroke: "none" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "15", cy: "12", r: "1", fill: "currentColor", stroke: "none" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "9", cy: "17", r: "1", fill: "currentColor", stroke: "none" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "15", cy: "17", r: "1", fill: "currentColor", stroke: "none" })
    ] }),
    globe: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "12", r: "9" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 12h18" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 3a15 15 0 0 1 0 18" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 3a15 15 0 0 0 0 18" })
    ] }),
    settings: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "12", r: "3" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3a2 2 0 1 1 4 0v.09A1.7 1.7 0 0 0 15.4 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.14.36.36.7.66.94.3.24.68.38 1.06.4H21a2 2 0 1 1 0 4h-.09A1.7 1.7 0 0 0 19.4 15Z" })
    ] }),
    panelClose: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9 3v18" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m16 9-3 3 3 3" })
    ] }),
    panelOpen: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9 3v18" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m13 9 3 3-3 3" })
    ] }),
    up: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m18 15-6-6-6 6" }),
    down: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m6 9 6 6 6-6" })
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: paths[name] });
}
function BrowserMark({ size = 18, active = false }) {
  const stroke = active ? "white" : "currentColor";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "rect",
      {
        x: "2.5",
        y: "3",
        width: "19",
        height: "18",
        rx: "4",
        fill: active ? "var(--dsw-alias-brand-primary)" : "none",
        stroke: active ? "var(--dsw-alias-brand-primary)" : "currentColor",
        strokeWidth: "1.5"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M2.5 8h19", stroke, strokeWidth: "1.5" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "14", r: "4", stroke, strokeWidth: "1.5" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 14h8M12 10a7 7 0 0 1 0 8M12 10a7 7 0 0 0 0 8", stroke, strokeWidth: "1.2", strokeLinecap: "round" })
  ] });
}
function ToolButton({ label, name, disabled = false, onClick, className = "" }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: `dsh-browser-button ${className}`.trim(), title: label, "aria-label": label, disabled, onClick, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name }) });
}
function DefaultUrlDialog({ locale, defaultUrl, afterSendBehavior, onClose }) {
  const t = locale.bind(NAMESPACE);
  const [draft, setDraft] = React.useState(defaultUrl ?? "");
  const [behavior, setBehavior] = React.useState(afterSendBehavior ?? "open-session");
  const [error, setError] = React.useState();
  const [saving, setSaving] = React.useState(false);
  React.useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape" && !saving) onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, saving]);
  const submit = async (event) => {
    event.preventDefault();
    const parsed = canonicalAddress(draft);
    if (!parsed.ok) {
      setError(t(`error.${parsed.reason}`));
      return;
    }
    setSaving(true);
    setError(void 0);
    try {
      await saveBrowserConfig(parsed.url, behavior);
      onClose();
    } catch {
      setError(t("settings.saveError"));
      setSaving(false);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dsh-browser-settings-backdrop", onMouseDown: (event) => {
    if (event.target === event.currentTarget && !saving) onClose();
  }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", { className: "dsh-browser-settings-dialog", role: "dialog", "aria-modal": "true", "aria-labelledby": "dsh-browser-settings-title", onSubmit: submit, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { id: "dsh-browser-settings-title", className: "dsh-browser-settings-title", children: t("settings.title") }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "dsh-browser-settings-label", htmlFor: "dsh-browser-default-url", children: t("settings.label") }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "input",
      {
        id: "dsh-browser-default-url",
        className: "dsh-browser-settings-input",
        value: draft,
        autoFocus: true,
        autoCapitalize: "none",
        autoCorrect: "off",
        spellCheck: false,
        disabled: saving,
        onChange: (event) => setDraft(event.currentTarget.value)
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "dsh-browser-settings-label", htmlFor: "dsh-browser-after-send", style: { marginTop: 16 }, children: t("settings.afterSend") }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "select",
      {
        id: "dsh-browser-after-send",
        className: "dsh-browser-settings-input",
        value: behavior,
        disabled: saving,
        onChange: (event) => setBehavior(event.currentTarget.value),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "open-session", children: t("settings.openSession") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "stay-browser", children: t("settings.stayBrowser") })
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dsh-browser-settings-error", role: error ? "alert" : void 0, children: error }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-browser-settings-actions", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "dsh-browser-settings-action", disabled: saving, onClick: onClose, children: t("settings.cancel") }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "submit", className: "dsh-browser-settings-action is-primary", disabled: saving, children: saving ? t("settings.saving") : t("settings.save") })
    ] })
  ] }) });
}
function RegionCapture({ locale, capture, onComplete, onCancel, onError }) {
  const t = locale.bind(NAMESPACE);
  const drag = React.useRef();
  const [selection, setSelection] = React.useState();
  const [busy, setBusy] = React.useState(false);
  React.useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape" && !busy) onCancel();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [busy, onCancel]);
  const rectFromPoints = (startX, startY, endX, endY) => ({
    x: Math.min(startX, endX),
    y: Math.min(startY, endY),
    width: Math.abs(endX - startX),
    height: Math.abs(endY - startY)
  });
  const point = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    return {
      x: Math.max(0, Math.min(bounds.width, event.clientX - bounds.left)),
      y: Math.max(0, Math.min(bounds.height, event.clientY - bounds.top))
    };
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      className: `dsh-browser-capture-layer${selection ? " has-selection" : ""}${busy ? " is-busy" : ""}`,
      role: "application",
      "aria-label": t("portal.capture"),
      onPointerDown: (event) => {
        if (busy || event.button !== 0) return;
        const start2 = point(event);
        drag.current = { pointerId: event.pointerId, ...start2 };
        event.currentTarget.setPointerCapture(event.pointerId);
        setSelection({ x: start2.x, y: start2.y, width: 0, height: 0 });
      },
      onPointerMove: (event) => {
        const current = drag.current;
        if (!current || current.pointerId !== event.pointerId) return;
        const next = point(event);
        setSelection(rectFromPoints(current.x, current.y, next.x, next.y));
      },
      onPointerUp: async (event) => {
        const current = drag.current;
        if (!current || current.pointerId !== event.pointerId || busy) return;
        drag.current = void 0;
        const end = point(event);
        const rect = rectFromPoints(current.x, current.y, end.x, end.y);
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
        if (rect.width < 8 || rect.height < 8) {
          setSelection(void 0);
          return;
        }
        setSelection(rect);
        setBusy(true);
        try {
          const dataUrl = await capture(rect);
          onComplete(dataUrl);
        } catch {
          setBusy(false);
          setSelection(void 0);
          onError();
        }
      },
      onPointerCancel: (event) => {
        drag.current = void 0;
        setSelection(void 0);
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
      },
      children: selection && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dsh-browser-capture-selection", style: {
        left: selection.x,
        top: selection.y,
        width: selection.width,
        height: selection.height
      } })
    }
  );
}
function PortalDialog({ locale, payload, workspaces, onClose, onSend }) {
  const t = locale.bind(NAMESPACE);
  const [workspaceId, setWorkspaceId] = React.useState(workspaces[0]?.workspaceId ?? "");
  const [text, setText] = React.useState(payload.kind === "text" ? payload.text : "");
  const [sending, setSending] = React.useState(false);
  const [error, setError] = React.useState();
  React.useEffect(() => {
    if (!workspaceId && workspaces[0]) setWorkspaceId(workspaces[0].workspaceId);
  }, [workspaceId, workspaces]);
  React.useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape" && !sending) onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, sending]);
  const submit = async (event) => {
    event.preventDefault();
    if (!workspaceId || payload.kind === "text" && !text.trim()) return;
    setSending(true);
    setError(void 0);
    try {
      await onSend(workspaceId, payload, text.trim());
      onClose();
    } catch {
      setError(t("portal.sendError"));
      setSending(false);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dsh-browser-settings-backdrop", onMouseDown: (event) => {
    if (event.target === event.currentTarget && !sending) onClose();
  }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", { className: "dsh-browser-portal-dialog", role: "dialog", "aria-modal": "true", "aria-labelledby": "dsh-browser-portal-title", onSubmit: submit, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { id: "dsh-browser-portal-title", className: "dsh-browser-settings-title", children: t("portal.title") }),
    payload.kind === "image" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { className: "dsh-browser-portal-preview", src: payload.dataUrl, alt: "" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-browser-portal-field", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "dsh-browser-settings-label", htmlFor: "dsh-browser-portal-workspace", children: t("portal.workspace") }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "select",
        {
          id: "dsh-browser-portal-workspace",
          className: "dsh-browser-portal-select",
          value: workspaceId,
          autoFocus: true,
          disabled: sending || !workspaces.length,
          onChange: (event) => setWorkspaceId(event.currentTarget.value),
          children: [
            !workspaces.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "", children: t("portal.noWorkspace") }),
            workspaces.map((workspace) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: workspace.workspaceId, children: workspace.title }, workspace.workspaceId))
          ]
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-browser-portal-field", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "dsh-browser-settings-label", htmlFor: "dsh-browser-portal-text", children: payload.kind === "text" ? t("portal.text") : t("portal.note") }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "textarea",
        {
          id: "dsh-browser-portal-text",
          className: "dsh-browser-portal-textarea",
          value: text,
          placeholder: payload.kind === "image" ? t("portal.notePlaceholder") : void 0,
          disabled: sending,
          onChange: (event) => setText(event.currentTarget.value)
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dsh-browser-settings-error", role: error ? "alert" : void 0, children: error }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-browser-settings-actions", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "dsh-browser-settings-action", disabled: sending, onClick: onClose, children: t("portal.cancel") }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "submit", className: "dsh-browser-settings-action is-primary", disabled: sending || !workspaceId || payload.kind === "text" && !text.trim(), children: sending ? t("portal.sending") : t("portal.send") })
    ] })
  ] }) });
}
function BrowserChrome({ browser, tabId, locale, defaultUrl, onOpenSettings, onPortalPayload, onPortalError }) {
  const t = locale.bind(NAMESPACE);
  const [draft, setDraft] = React.useState(browser.url);
  const [addressError, setAddressError] = React.useState();
  const [findOpen, setFindOpen] = React.useState(false);
  const [captureOpen, setCaptureOpen] = React.useState(false);
  const [findQuery, setFindQuery] = React.useState("");
  const [findFocus, setFindFocus] = React.useState(0);
  const findRef = React.useRef(null);
  React.useEffect(() => {
    if (!browser.unknown) setDraft(browser.url);
  }, [browser.url, browser.unknown]);
  React.useEffect(() => {
    browserStore.getState().updateTab(tabId, {
      url: browser.url,
      title: browser.title,
      favicon: browser.favicon
    });
  }, [browser.url, browser.title, browser.favicon, tabId]);
  React.useEffect(() => {
    const actions = {
      reload: browser.reload,
      canFind: typeof browser.find === "function",
      canPortal: typeof browser.selectedText === "function" && typeof browser.captureRegion === "function",
      async startPortal() {
        if (typeof browser.selectedText !== "function" || typeof browser.captureRegion !== "function") {
          onPortalError();
          return;
        }
        const text = await browser.selectedText();
        if (text) {
          onPortalPayload({ kind: "text", text });
          return;
        }
        setFindOpen(false);
        browser.stopFind?.();
        setCaptureOpen(true);
      },
      openFind() {
        if (typeof browser.find !== "function") return;
        setFindOpen(true);
        setFindFocus((value) => value + 1);
      }
    };
    tabCommands.set(tabId, actions);
    return () => {
      if (tabCommands.get(tabId) === actions) tabCommands.delete(tabId);
    };
  }, [
    browser.captureRegion,
    browser.find,
    browser.reload,
    browser.selectedText,
    browser.stopFind,
    onPortalError,
    onPortalPayload,
    tabId
  ]);
  React.useEffect(() => {
    if (!findOpen) return;
    findRef.current?.focus();
    findRef.current?.select();
  }, [findOpen, findFocus]);
  const closeFind = () => {
    setFindOpen(false);
    browser.stopFind?.();
  };
  const runFind = (query, forward, findNext) => {
    setFindQuery(query);
    browser.find?.(query, forward, findNext);
  };
  const submit = (event) => {
    event.preventDefault();
    const parsed = browser.load(draft);
    if (!parsed?.ok) {
      setAddressError(parsed?.reason ?? "invalid");
      return;
    }
    setAddressError(void 0);
    setDraft(parsed.url);
  };
  const statusText = addressError ? t(`error.${addressError}`) : browser.error ? t("error.load") : browser.unknown ? t("address.changed") : void 0;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", { className: "dsh-browser-toolbar", onSubmit: submit, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, { label: t("back"), name: "back", disabled: !browser.canGoBack, onClick: browser.back }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, { label: t("forward"), name: "forward", disabled: !browser.canGoForward, onClick: browser.forward }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, { label: t("reload"), name: "reload", onClick: browser.reload }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, { label: t("home"), name: "home", disabled: !defaultUrl, onClick: () => browser.load(defaultUrl) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-browser-address-wrap", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { className: "dsh-browser-address", value: draft, "aria-label": t("address.label"), placeholder: t("address.placeholder"), autoCapitalize: "none", autoCorrect: "off", spellCheck: false, onChange: (event) => setDraft(event.currentTarget.value) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "submit", className: "dsh-browser-button dsh-browser-go", title: t("go"), "aria-label": t("go"), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "go" }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, { label: t("settings.open"), name: "settings", onClick: onOpenSettings })
    ] }),
    findOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-browser-findbar", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "input",
        {
          ref: findRef,
          className: "dsh-browser-find-input",
          value: findQuery,
          "aria-label": t("find.placeholder"),
          placeholder: t("find.placeholder"),
          onChange: (event) => runFind(event.currentTarget.value, true, false),
          onKeyDown: (event) => {
            if (event.key === "Escape") {
              event.preventDefault();
              closeFind();
            } else if (event.key === "Enter") {
              event.preventDefault();
              runFind(findQuery, !event.shiftKey, true);
            }
          }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dsh-browser-find-count", children: browser.findMatches ? `${browser.findActive}/${browser.findMatches}` : "0/0" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, { label: t("find.previous"), name: "up", onClick: () => runFind(findQuery, false, true) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, { label: t("find.next"), name: "down", onClick: () => runFind(findQuery, true, true) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, { label: t("find.close"), name: "close", onClick: closeFind })
    ] }),
    browser.loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dsh-browser-progress", role: "progressbar" }),
    statusText && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `dsh-browser-status${addressError || browser.error ? " dsh-browser-status-error" : ""}`, role: addressError || browser.error ? "alert" : "status", children: statusText }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "dsh-browser-viewport", children: [
      browser.frame,
      captureOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        RegionCapture,
        {
          locale,
          capture: browser.captureRegion,
          onComplete: (dataUrl) => {
            setCaptureOpen(false);
            onPortalPayload({ kind: "image", dataUrl });
          },
          onCancel: () => setCaptureOpen(false),
          onError: () => {
            setCaptureOpen(false);
            onPortalError();
          }
        }
      )
    ] })
  ] });
}
function DesktopPage({ tab, active, locale, bridge, defaultUrl, onOpenSettings, onPortalPayload, onPortalError }) {
  const browser = useDesktopBrowser(tab, bridge);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `dsh-browser-page${active ? " is-active" : ""}`, role: "tabpanel", "aria-hidden": !active, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrowserChrome, { browser, tabId: tab.id, locale, defaultUrl, onOpenSettings, onPortalPayload, onPortalError }) });
}
function IframePage({ tab, active, locale, defaultUrl, onOpenSettings, onPortalPayload, onPortalError }) {
  const browser = useIframeBrowser(tab);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `dsh-browser-page${active ? " is-active" : ""}`, role: "tabpanel", "aria-hidden": !active, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrowserChrome, { browser, tabId: tab.id, locale, defaultUrl, onOpenSettings, onPortalPayload, onPortalError }) });
}
function TabPageIcon({ favicon }) {
  const [failed, setFailed] = React.useState(false);
  React.useEffect(() => setFailed(false), [favicon]);
  if (!favicon || failed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "globe", size: 16 });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "img",
    {
      className: "dsh-browser-favicon",
      src: favicon,
      alt: "",
      referrerPolicy: "no-referrer",
      onError: () => setFailed(true)
    }
  );
}
function TabRow({ tab, index, active, locale, onSelect, onClose }) {
  const t = locale.bind(NAMESPACE);
  const rowRef = React.useRef(null);
  const handleRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  const [over, setOver] = React.useState(false);
  React.useEffect(() => {
    const element = rowRef.current;
    const dragHandle = handleRef.current;
    if (!element || !dragHandle) return void 0;
    const disposeDrag = draggable({
      element,
      dragHandle,
      getInitialData: () => ({ type: DND_TYPE, tabId: tab.id }),
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false)
    });
    const disposeDrop = dropTargetForElements({
      element,
      getData: () => ({ type: DND_TYPE, tabId: tab.id }),
      canDrop: ({ source }) => source.data.type === DND_TYPE && source.data.tabId !== tab.id,
      onDragEnter: () => setOver(true),
      onDragLeave: () => setOver(false),
      onDrop: () => setOver(false)
    });
    return () => {
      disposeDrag();
      disposeDrop();
    };
  }, [tab.id]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { ref: rowRef, className: `dsh-browser-tab-row${active ? " is-active" : ""}${dragging ? " is-dragging" : ""}${over ? " is-drop-target" : ""}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { ref: handleRef, className: "dsh-browser-drag-handle", title: t("tabs.drag"), tabIndex: 0, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "grip", size: 15 }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { type: "button", className: "dsh-browser-tab-select", role: "tab", title: `${tab.title} \xB7 \u2318${index + 1}`, "aria-selected": active, onClick: onSelect, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabPageIcon, { favicon: tab.favicon }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dsh-browser-tab-title", children: tab.title })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, { label: t("tabs.close"), name: "close", className: "dsh-browser-tab-close", onClick: onClose })
  ] });
}
function SidebarResizeHandle({ locale, width, onResize, onCommit, onResizingChange }) {
  const t = locale.bind(NAMESPACE);
  const drag = React.useRef();
  const finish = (element, pointerId) => {
    const current = drag.current;
    if (!current || current.pointerId !== pointerId) return;
    drag.current = void 0;
    onCommit(current.width);
    if (element.hasPointerCapture(pointerId)) element.releasePointerCapture(pointerId);
    onResizingChange(false);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      className: "dsh-browser-sidebar-resizer",
      role: "separator",
      tabIndex: 0,
      title: t("tabs.resize"),
      "aria-label": t("tabs.resize"),
      "aria-orientation": "vertical",
      "aria-valuemin": SIDEBAR_MIN_WIDTH,
      "aria-valuemax": SIDEBAR_MAX_WIDTH,
      "aria-valuenow": width,
      onPointerDown: (event) => {
        if (event.button !== 0) return;
        event.preventDefault();
        drag.current = {
          pointerId: event.pointerId,
          startX: event.clientX,
          startWidth: width,
          width
        };
        event.currentTarget.setPointerCapture(event.pointerId);
        onResizingChange(true);
      },
      onPointerMove: (event) => {
        const current = drag.current;
        if (!current || current.pointerId !== event.pointerId) return;
        const next = clampSidebarWidth(current.startWidth + event.clientX - current.startX);
        current.width = next;
        onResize(next);
      },
      onPointerUp: (event) => finish(event.currentTarget, event.pointerId),
      onPointerCancel: (event) => finish(event.currentTarget, event.pointerId),
      onLostPointerCapture: () => {
        const current = drag.current;
        if (!current) return;
        drag.current = void 0;
        onCommit(current.width);
        onResizingChange(false);
      },
      onKeyDown: (event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        const next = clampSidebarWidth(width + (event.key === "ArrowRight" ? 8 : -8));
        onResize(next);
        onCommit(next);
      }
    }
  );
}
function TowerMainAnchor() {
  const hostRef = React.useRef(null);
  React.useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host) return void 0;
    let disposed = false;
    const update = () => {
      if (disposed) return;
      const rect = host.getBoundingClientRect();
      publishPanelLayout({ active: true, left: rect.left, top: rect.top, width: rect.width, height: rect.height });
    };
    const observer = new ResizeObserver(update);
    observer.observe(host);
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    update();
    const frame = requestAnimationFrame(update);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
      publishPanelLayout({ ...panelLayout, active: false });
    };
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: hostRef, style: { width: "100%", height: "100%", minWidth: 0, minHeight: 0 } });
}
function BrowserPanel({ locale, workspaces, sendPortal }) {
  const tabs = useBrowserStore((state) => state.tabs);
  const activeId = useBrowserStore((state) => state.activeId);
  const defaultUrl = useBrowserStore((state) => state.defaultUrl);
  const afterSendBehavior = useBrowserStore((state) => state.afterSendBehavior);
  const configError = useBrowserStore((state) => state.configError);
  const sidebarWidth = useBrowserStore((state) => state.sidebarWidth);
  const sidebarCollapsed = useBrowserStore((state) => state.sidebarCollapsed);
  const bridge = globalThis.dshDesktop?.protocolVersion === 1 ? globalThis.dshDesktop.browser : void 0;
  const [visitedIds, setVisitedIds] = React.useState(() => new Set(activeId ? [activeId] : []));
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [portalPayload, setPortalPayload] = React.useState();
  const [portalError, setPortalError] = React.useState();
  const [resizingSidebar, setResizingSidebar] = React.useState(false);
  const [previewSidebarWidth, setPreviewSidebarWidth] = React.useState();
  const renderedSidebarWidth = previewSidebarWidth ?? sidebarWidth;
  const openSettings = React.useCallback(() => setSettingsOpen(true), []);
  const closeSettings = React.useCallback(() => setSettingsOpen(false), []);
  const closePortal = React.useCallback(() => setPortalPayload(void 0), []);
  const receivePortalPayload = React.useCallback((payload) => {
    setPortalError(void 0);
    setPortalPayload(payload);
  }, []);
  const reportPortalError = React.useCallback(() => {
    setPortalError(locale.bind(NAMESPACE)("portal.captureError"));
  }, [locale]);
  const t = locale.bind(NAMESPACE);
  React.useEffect(() => {
    if (!portalError) return void 0;
    const timeout = window.setTimeout(() => setPortalError(void 0), 5e3);
    return () => window.clearTimeout(timeout);
  }, [portalError]);
  React.useEffect(() => {
    const controller = new AbortController();
    loadBrowserConfig(controller.signal).catch((error) => {
      if (error?.name !== "AbortError") browserStore.getState().setConfigError();
    });
    return () => controller.abort();
  }, []);
  React.useEffect(() => {
    if (!activeId) return;
    setVisitedIds((current) => {
      if (current.has(activeId)) return current;
      const next = new Set(current);
      next.add(activeId);
      return next;
    });
  }, [activeId]);
  const closeTab = React.useCallback((id) => {
    if (bridge) disposeDesktopController(id);
    tabCommands.delete(id);
    setVisitedIds((current) => {
      if (!current.has(id)) return current;
      const next = new Set(current);
      next.delete(id);
      return next;
    });
    browserStore.getState().closeTab(id);
  }, [bridge]);
  React.useEffect(() => {
    const actions = {
      canSelect(index) {
        return index >= 0 && index < browserStore.getState().tabs.length;
      },
      select(index) {
        const tab = browserStore.getState().tabs[index];
        if (tab) browserStore.getState().selectTab(tab.id);
      },
      close() {
        closeTab(browserStore.getState().activeId);
      },
      canNew() {
        const state = browserStore.getState();
        return Boolean(state.defaultUrl) && state.tabs.length < MAX_TABS;
      },
      newTab() {
        browserStore.getState().addTab();
      },
      reload() {
        tabCommands.get(browserStore.getState().activeId)?.reload?.();
      },
      canFind() {
        return tabCommands.get(browserStore.getState().activeId)?.canFind === true;
      },
      find() {
        tabCommands.get(browserStore.getState().activeId)?.openFind?.();
      }
    };
    shortcutActions = actions;
    return () => {
      if (shortcutActions === actions) shortcutActions = void 0;
    };
  }, [closeTab]);
  React.useEffect(() => monitorForElements({
    canMonitor: ({ source }) => source.data.type === DND_TYPE,
    onDrop: ({ source, location }) => {
      const target = location.current.dropTargets.find((entry) => entry.data.type === DND_TYPE);
      if (!target) return;
      browserStore.getState().moveTab(source.data.tabId, target.data.tabId);
    }
  }), []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: css }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { className: `dsh-browser-root${resizingSidebar ? " is-resizing-sidebar" : ""}`, "aria-label": t("panel.label"), children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "nav",
        {
          className: `dsh-browser-tabs${sidebarCollapsed ? " is-collapsed" : ""}`,
          style: {
            width: sidebarCollapsed ? SIDEBAR_COLLAPSED_WIDTH : renderedSidebarWidth,
            flexBasis: sidebarCollapsed ? SIDEBAR_COLLAPSED_WIDTH : renderedSidebarWidth
          },
          "aria-label": t("tabs.label"),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-browser-tabs-head", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                ToolButton,
                {
                  label: sidebarCollapsed ? t("tabs.expand") : t("tabs.collapse"),
                  name: sidebarCollapsed ? "panelOpen" : "panelClose",
                  onClick: () => browserStore.getState().toggleSidebar()
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                ToolButton,
                {
                  label: t("portal.open"),
                  name: "portal",
                  disabled: !bridge || !activeId,
                  onClick: () => {
                    const command = tabCommands.get(activeId);
                    if (command?.canPortal) void command.startPortal();
                    else reportPortalError();
                  }
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                ToolButton,
                {
                  label: tabs.length >= MAX_TABS ? t("tabs.limit") : t("tabs.new"),
                  name: "plus",
                  className: "dsh-browser-new-tab",
                  disabled: tabs.length >= MAX_TABS || !defaultUrl,
                  onClick: () => browserStore.getState().addTab()
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dsh-browser-tab-list", role: "tablist", children: tabs.map((tab, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabRow, { tab, index, active: tab.id === activeId, locale, onSelect: () => browserStore.getState().selectTab(tab.id), onClose: () => closeTab(tab.id) }, tab.id)) })
          ]
        }
      ),
      !sidebarCollapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        SidebarResizeHandle,
        {
          locale,
          width: renderedSidebarWidth,
          onResize: setPreviewSidebarWidth,
          onCommit: (value) => {
            browserStore.getState().setSidebarWidth(value);
            setPreviewSidebarWidth(void 0);
          },
          onResizingChange: setResizingSidebar
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "dsh-browser-pages", children: [
        configError && !tabs.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dsh-browser-status dsh-browser-status-error", role: "alert", children: t("error.config") }),
        tabs.filter((tab) => visitedIds.has(tab.id)).map((tab) => {
          const props = {
            key: tab.id,
            tab,
            active: tab.id === activeId,
            locale,
            defaultUrl,
            onOpenSettings: openSettings,
            onPortalPayload: receivePortalPayload,
            onPortalError: reportPortalError
          };
          return bridge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DesktopPage, { ...props, bridge }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IframePage, { ...props });
        })
      ] }),
      settingsOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        DefaultUrlDialog,
        {
          locale,
          defaultUrl,
          afterSendBehavior,
          onClose: closeSettings
        }
      ),
      portalPayload && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        PortalDialog,
        {
          locale,
          payload: portalPayload,
          workspaces,
          onClose: closePortal,
          onSend: sendPortal
        }
      ),
      portalError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dsh-browser-portal-toast", role: "alert", children: portalError })
    ] })
  ] });
}
function TowerOverlay({ locale, workspaceSource, sendPortal }) {
  const layout = usePanelLayout();
  const workspaces = useWorkspaceItems(workspaceSource);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { "aria-hidden": !layout.active, style: {
    position: "fixed",
    left: layout.left,
    top: layout.top,
    width: layout.width,
    height: layout.height,
    minWidth: 0,
    minHeight: 0,
    visibility: layout.active ? "visible" : "hidden",
    pointerEvents: layout.active ? "auto" : "none",
    zIndex: 1
  }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrowserPanel, { locale, workspaces, sendPortal }) });
}
function dispatchBrowserShortcut(code, shift = false) {
  if (!panelLayout.active || !shortcutActions) return false;
  if (/^Digit[1-9]$/u.test(code) && !shift) {
    const index = Number(code.slice(5)) - 1;
    if (!shortcutActions.canSelect(index)) return false;
    shortcutActions.select(index);
    return true;
  }
  if (code === "KeyT" && !shift && shortcutActions.canNew()) shortcutActions.newTab();
  else if (code === "KeyW" && shift) shortcutActions.close();
  else if (code === "KeyR" && shift) shortcutActions.reload();
  else if (code === "KeyF" && !shift && shortcutActions.canFind()) shortcutActions.find();
  else return false;
  return true;
}
function commandResolution(action) {
  if (!panelLayout.active || !shortcutActions) return { status: "pass" };
  if (action.type === "select" && !shortcutActions.canSelect(action.index)) return { status: "pass" };
  if (action.type === "new" && !shortcutActions.canNew()) return { status: "pass" };
  if (action.type === "find" && !shortcutActions.canFind()) return { status: "pass" };
  return {
    status: "handled",
    run: () => {
      if (action.type === "select") shortcutActions.select(action.index);
      else if (action.type === "new") shortcutActions.newTab();
      else if (action.type === "close") shortcutActions.close();
      else if (action.type === "reload") shortcutActions.reload();
      else if (action.type === "find") shortcutActions.find();
    }
  };
}
function shortcutDefaults(code, modifiers = ["primary"]) {
  const binding = { code, modifiers };
  return {
    "desktop:macos": binding,
    "desktop:windows": binding,
    "desktop:linux": binding
  };
}
function registerShortcuts(ctx, t) {
  ctx.inject(["shortcuts"], (scope) => {
    const definitions = [
      ...Array.from({ length: 9 }, (_, index) => ({
        id: `dsh-browser.tab${index + 1}`,
        label: () => `${t("shortcut.select")} ${index + 1}`,
        aliases: [`browser tab ${index + 1}`],
        defaults: shortcutDefaults(`Digit${index + 1}`),
        action: { type: "select", index }
      })),
      {
        id: "dsh-browser.new",
        label: () => t("shortcut.new"),
        aliases: ["new browser tab"],
        defaults: shortcutDefaults("KeyT"),
        action: { type: "new" }
      },
      {
        id: "dsh-browser.close",
        label: () => t("shortcut.close"),
        aliases: ["close browser tab"],
        defaults: shortcutDefaults("KeyW", ["primary", "shift"]),
        action: { type: "close" }
      },
      {
        id: "dsh-browser.reload",
        label: () => t("shortcut.reload"),
        aliases: ["reload browser tab"],
        defaults: shortcutDefaults("KeyR", ["primary", "shift"]),
        action: { type: "reload" }
      },
      {
        id: "dsh-browser.find",
        label: () => t("shortcut.find"),
        aliases: ["find on page"],
        defaults: shortcutDefaults("KeyF"),
        action: { type: "find" }
      }
    ];
    for (const definition of definitions) {
      scope.effect(() => scope.shortcuts.register({
        id: definition.id,
        label: definition.label,
        aliases: definition.aliases,
        defaults: definition.defaults,
        regions: ["page", "editable", "terminal"],
        modals: [],
        resolve: () => commandResolution(definition.action)
      }), `dsh-browser.shortcut.${definition.id}`);
    }
  });
}
var inject = ["slots", "locale", "workspaces", "sessions", "uiWorkspace"];
function apply(ctx) {
  const t = ctx.locale.bind(NAMESPACE);
  const sendPortal = (workspaceId, payload, text) => sendPortalToWorkspace(
    ctx,
    workspaceId,
    payload,
    text,
    browserStore.getState().afterSendBehavior
  );
  ctx.effect(() => ctx.locale.register(NAMESPACE, { zh, en }), "dsh-browser.copy");
  ctx.effect(() => () => publishPanelLayout({ ...panelLayout, active: false }), "dsh-browser.layout");
  if (globalThis.dshDesktop?.protocolVersion === 1) {
    ctx.effect(() => () => disposeDesktopControllers(), "dsh-browser.desktop-controllers");
  }
  registerShortcuts(ctx, t);
  ctx.effect(() => ctx.slots.inject("shell.overlay", () => ctx.slots.register({
    name: "shell.overlay",
    id: "dsh-browser-overlay",
    order: -100
  }, () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TowerOverlay, { locale: ctx.locale, workspaceSource: ctx.workspaces.list, sendPortal }))), "dsh-browser.overlay");
  ctx.effect(() => ctx.slots.inject("sidebar.panellist", () => ctx.slots.register({
    name: "sidebar.panellist",
    id: PANEL_ID,
    order: 20,
    label: () => t("panel.label")
  }, ({ size, active }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrowserMark, { size, active }))), "dsh-browser.sidebar");
  ctx.effect(() => ctx.slots.inject("main", () => ctx.slots.register({
    name: "main",
    key: PANEL_ID
  }, TowerMainAnchor)), "dsh-browser.panel");
}
    return module.exports;
  },
});
