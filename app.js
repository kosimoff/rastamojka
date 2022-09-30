/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

// Expose isAxiosError
axios.isAxiosError = __webpack_require__(/*! ./helpers/isAxiosError */ "./node_modules/axios/lib/helpers/isAxiosError.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAxiosError.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAxiosError.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return (typeof payload === 'object') && (payload.isAxiosError === true);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Application.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Application.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({name:"Application",props:[],data:function data(){return{tables:[{"2006":4106,"2007":4830,"2008":5683,"2009":6685,"2010":7865,"2011":9253,"2012":10886,"2013":12807,"2014":15067,"2015":17726,"2016":20854,"2017":24534,"2018":28864,"2019":33958,"2020":39950,"2021":47000,"Make":"Acura","Model":"Acura MDX"},{"2006":3232,"2007":3802,"2008":4474,"2009":5263,"2010":6192,"2011":7284,"2012":8570,"2013":10082,"2014":11861,"2015":13955,"2016":16417,"2017":19314,"2018":22723,"2019":26733,"2020":31450,"2021":37000,"Make":"Acura","Model":"Acura RDX"},{"2006":1398,"2007":1644,"2008":1934,"2009":2276,"2010":2677,"2011":3150,"2012":3706,"2013":4360,"2014":5129,"2015":6034,"2016":7099,"2017":8352,"2018":9826,"2019":11560,"2020":13600,"2021":16000,"Make":"Alfa Romeo","Model":"MiTo"},{"2006":1922,"2007":2261,"2008":2660,"2009":3129,"2010":3682,"2011":4331,"2012":5096,"2013":5995,"2014":7053,"2015":8297,"2016":9762,"2017":11484,"2018":13511,"2019":15895,"2020":18700,"2021":22000,"Make":"Alfa Romeo","Model":159},{"2006":2271,"2007":2672,"2008":3144,"2009":3698,"2010":4351,"2011":5119,"2012":6022,"2013":7085,"2014":8335,"2015":9806,"2016":11536,"2017":13572,"2018":15967,"2019":18785,"2020":22100,"2021":26000,"Make":"Alfa Romeo","Model":"Giulietta"},{"2006":3844,"2007":4522,"2008":5320,"2009":6259,"2010":7363,"2011":8662,"2012":10191,"2013":11990,"2014":14105,"2015":16595,"2016":19523,"2017":22968,"2018":27022,"2019":31790,"2020":37400,"2021":44000,"Make":"Alfa Romeo","Model":"Giulia"},{"2006":2053,"2007":2415,"2008":2841,"2009":3343,"2010":3933,"2011":4627,"2012":5443,"2013":6404,"2014":7534,"2015":8863,"2016":10427,"2017":12267,"2018":14432,"2019":16979,"2020":19975,"2021":23500,"Make":"Alfa Romeo","Model":"159 (универсал)"},{"2006":5241,"2007":6166,"2008":7254,"2009":8535,"2010":10041,"2011":11812,"2012":13897,"2013":16349,"2014":19235,"2015":22629,"2016":26622,"2017":31320,"2018":36848,"2019":43350,"2020":51000,"2021":60000,"Make":"Alfa Romeo","Model":"Stelvio"},{"2006":1616,"2007":1901,"2008":2237,"2009":2631,"2010":3096,"2011":3642,"2012":4285,"2013":5041,"2014":5931,"2015":6977,"2016":8209,"2017":9657,"2018":11361,"2019":13366,"2020":15725,"2021":18500,"Make":"Audi","Model":"A 1"},{"2006":2140,"2007":2518,"2008":2962,"2009":3485,"2010":4100,"2011":4823,"2012":5675,"2013":6676,"2014":7854,"2015":9240,"2016":10871,"2017":12789,"2018":15046,"2019":17701,"2020":20825,"2021":24500,"Make":"Audi","Model":"A 3"},{"2006":2184,"2007":2569,"2008":3023,"2009":3556,"2010":4184,"2011":4922,"2012":5790,"2013":6812,"2014":8014,"2015":9429,"2016":11093,"2017":13050,"2018":15353,"2019":18063,"2020":21250,"2021":25000,"Make":"Audi","Model":"A 3 Sportback"},{"2006":2533,"2007":2980,"2008":3506,"2009":4125,"2010":4853,"2011":5709,"2012":6717,"2013":7902,"2014":9297,"2015":10937,"2016":12867,"2017":15138,"2018":17810,"2019":20953,"2020":24650,"2021":29000,"Make":"Audi","Model":"A 4"},{"2006":3014,"2007":3546,"2008":4171,"2009":4907,"2010":5773,"2011":6792,"2012":7991,"2013":9401,"2014":11060,"2015":13012,"2016":15308,"2017":18009,"2018":21187,"2019":24926,"2020":29325,"2021":34500,"Make":"Audi","Model":"A 5"},{"2006":3232,"2007":3802,"2008":4474,"2009":5263,"2010":6192,"2011":7284,"2012":8570,"2013":10082,"2014":11861,"2015":13955,"2016":16417,"2017":19314,"2018":22723,"2019":26733,"2020":31450,"2021":37000,"Make":"Audi","Model":"A 5 Купе"},{"2006":3887,"2007":4573,"2008":5380,"2009":6330,"2010":7447,"2011":8761,"2012":10307,"2013":12126,"2014":14266,"2015":16783,"2016":19745,"2017":23229,"2018":27329,"2019":32151,"2020":37825,"2021":44500,"Make":"Audi","Model":"A 6"},{"2006":5198,"2007":6115,"2008":7194,"2009":8463,"2010":9957,"2011":11714,"2012":13781,"2013":16213,"2014":19074,"2015":22440,"2016":26400,"2017":31059,"2018":36540,"2019":42989,"2020":50575,"2021":59500,"Make":"Audi","Model":"A 7"},{"2006":6831,"2007":8037,"2008":9455,"2009":11123,"2010":13086,"2011":15396,"2012":18112,"2013":21309,"2014":25069,"2015":29493,"2016":34698,"2017":40821,"2018":48025,"2019":56500,"2020":66470,"2021":78200,"Make":"Audi","Model":"A 8"},{"2006":7425,"2007":8735,"2008":10277,"2009":12091,"2010":14224,"2011":16734,"2012":19687,"2013":23162,"2014":27249,"2015":32058,"2016":37715,"2017":44371,"2018":52201,"2019":61413,"2020":72250,"2021":85000,"Make":"Audi","Model":"A 8 L"},{"2006":3276,"2007":3854,"2008":4534,"2009":5334,"2010":6275,"2011":7383,"2012":8686,"2013":10218,"2014":12022,"2015":14143,"2016":16639,"2017":19575,"2018":23030,"2019":27094,"2020":31875,"2021":37500,"Make":"Audi","Model":"TT"},{"2006":6202,"2007":7297,"2008":8584,"2009":10099,"2010":11881,"2011":13978,"2012":16445,"2013":19347,"2014":22761,"2015":26778,"2016":31503,"2017":37062,"2018":43603,"2019":51298,"2020":60350,"2021":71000,"Make":"Audi","Model":"TT RS"},{"2006":12317,"2007":14491,"2008":17048,"2009":20056,"2010":23595,"2011":27759,"2012":32658,"2013":38421,"2014":45201,"2015":53178,"2016":62562,"2017":73603,"2018":86592,"2019":101873,"2020":119850,"2021":141000,"Make":"Audi","Model":"R 8"},{"2006":6552,"2007":7708,"2008":9068,"2009":10668,"2010":12551,"2011":14766,"2012":17371,"2013":20437,"2014":24043,"2015":28286,"2016":33278,"2017":39150,"2018":46059,"2019":54188,"2020":63750,"2021":75000,"Make":"Audi","Model":"RS 5"},{"2006":9347,"2007":10996,"2008":12937,"2009":15220,"2010":17906,"2011":21066,"2012":24783,"2013":29156,"2014":34302,"2015":40355,"2016":47476,"2017":55855,"2018":65711,"2019":77308,"2020":90950,"2021":107000,"Make":"Audi","Model":"RS 7"},{"2006":5049,"2007":5940,"2008":6988,"2009":8222,"2010":9672,"2011":11379,"2012":13387,"2013":15750,"2014":18529,"2015":21799,"2016":25646,"2017":30172,"2018":35496,"2019":41761,"2020":49130,"2021":57800,"Make":"Audi","Model":"S 5"},{"2006":6683,"2007":7862,"2008":9249,"2009":10881,"2010":12802,"2011":15061,"2012":17719,"2013":20846,"2014":24524,"2015":28852,"2016":33943,"2017":39933,"2018":46981,"2019":55271,"2020":65025,"2021":76500,"Make":"Audi","Model":"S 6"},{"2006":6814,"2007":8016,"2008":9431,"2009":11095,"2010":13053,"2011":15356,"2012":18066,"2013":21254,"2014":25005,"2015":29418,"2016":34609,"2017":40716,"2018":47902,"2019":56355,"2020":66300,"2021":78000,"Make":"Audi","Model":"S 7 Sportback"},{"2006":10657,"2007":12538,"2008":14750,"2009":17353,"2010":20416,"2011":24019,"2012":28257,"2013":33244,"2014":39110,"2015":46012,"2016":54132,"2017":63685,"2018":74923,"2019":88145,"2020":103700,"2021":122000,"Make":"Audi","Model":"S 8"},{"2006":5346,"2007":6290,"2008":7399,"2009":8705,"2010":10241,"2011":12049,"2012":14175,"2013":16676,"2014":19619,"2015":23082,"2016":27155,"2017":31947,"2018":37584,"2019":44217,"2020":52020,"2021":61200,"Make":"Audi","Model":"S 5 Купе"},{"2006":2455,"2007":2888,"2008":3397,"2009":3997,"2010":4702,"2011":5532,"2012":6508,"2013":7657,"2014":9008,"2015":10598,"2016":12468,"2017":14668,"2018":17257,"2019":20302,"2020":23885,"2021":28100,"Make":"Audi","Model":"Q 3"},{"2006":3477,"2007":4090,"2008":4812,"2009":5661,"2010":6660,"2011":7836,"2012":9218,"2013":10845,"2014":12759,"2015":15011,"2016":17659,"2017":20776,"2018":24442,"2019":28756,"2020":33830,"2021":39800,"Make":"Audi","Model":"Q 5"},{"2006":4673,"2007":5498,"2008":6468,"2009":7610,"2010":8953,"2011":10533,"2012":12392,"2013":14578,"2014":17151,"2015":20177,"2016":23738,"2017":27927,"2018":32856,"2019":38654,"2020":45475,"2021":53500,"Make":"Audi","Model":"SQ 5"},{"2006":4473,"2007":5262,"2008":6190,"2009":7283,"2010":8568,"2011":10080,"2012":11859,"2013":13952,"2014":16414,"2015":19310,"2016":22718,"2017":26727,"2018":31443,"2019":36992,"2020":43520,"2021":51200,"Make":"Audi","Model":"Q 7"},{"2006":6892,"2007":8109,"2008":9539,"2009":11223,"2010":13203,"2011":15533,"2012":18275,"2013":21500,"2014":25294,"2015":29757,"2016":35008,"2017":41186,"2018":48454,"2019":57005,"2020":67065,"2021":78900,"Make":"Audi","Model":"SQ 7"},{"2006":5460,"2007":6423,"2008":7557,"2009":8890,"2010":10459,"2011":12305,"2012":14476,"2013":17031,"2014":20036,"2015":23572,"2016":27732,"2017":32625,"2018":38383,"2019":45156,"2020":53125,"2021":62500,"Make":"Audi","Model":"Q 8"},{"2006":2883,"2007":3391,"2008":3990,"2009":4694,"2010":5522,"2011":6497,"2012":7643,"2013":8992,"2014":10579,"2015":12446,"2016":14642,"2017":17226,"2018":20266,"2019":23843,"2020":28050,"2021":33000,"Make":"Audi","Model":"A 4 (универсал)"},{"2006":3363,"2007":3957,"2008":4655,"2009":5476,"2010":6443,"2011":7580,"2012":8917,"2013":10491,"2014":12342,"2015":14520,"2016":17083,"2017":20097,"2018":23644,"2019":27816,"2020":32725,"2021":38500,"Make":"Audi","Model":"A 6 (универсал)"},{"2006":5521,"2007":6495,"2008":7641,"2009":8990,"2010":10576,"2011":12442,"2012":14638,"2013":17221,"2014":20260,"2015":23836,"2016":28042,"2017":32991,"2018":38813,"2019":45662,"2020":53720,"2021":63200,"Make":"Audi","Model":"RS 4 (универсал)"},{"2006":8203,"2007":9650,"2008":11353,"2009":13357,"2010":15714,"2011":18487,"2012":21749,"2013":25587,"2014":30102,"2015":35414,"2016":41664,"2017":49016,"2018":57666,"2019":67843,"2020":79815,"2021":93900,"Make":"Audi","Model":"RS 6 (универсал)"},{"2006":5966,"2007":7019,"2008":8258,"2009":9715,"2010":11430,"2011":13447,"2012":15819,"2013":18611,"2014":21895,"2015":25759,"2016":30305,"2017":35653,"2018":41945,"2019":49347,"2020":58055,"2021":68300,"Make":"Audi","Model":"S 6 (универсал)"},{"2006":3215,"2007":3782,"2008":4449,"2009":5234,"2010":6158,"2011":7245,"2012":8524,"2013":10028,"2014":11797,"2015":13879,"2016":16328,"2017":19210,"2018":22600,"2019":26588,"2020":31280,"2021":36800,"Make":"Audi","Model":"A 4 Allroad quattro"},{"2006":4612,"2007":5426,"2008":6384,"2009":7510,"2010":8836,"2011":10395,"2012":12229,"2013":14387,"2014":16926,"2015":19913,"2016":23428,"2017":27562,"2018":32426,"2019":38148,"2020":44880,"2021":52800,"Make":"Audi","Model":"A 6 Allroad quattro"},{"2006":1931,"2007":2271,"2008":2672,"2009":3144,"2010":3698,"2011":4351,"2012":5119,"2013":6022,"2014":7085,"2015":8335,"2016":9806,"2017":11536,"2018":13572,"2019":15967,"2020":18785,"2021":22100,"Make":"BMW","Model":"1 series"},{"2006":2315,"2007":2723,"2008":3204,"2009":3769,"2010":4435,"2011":5217,"2012":6138,"2013":7221,"2014":8495,"2015":9994,"2016":11758,"2017":13833,"2018":16274,"2019":19146,"2020":22525,"2021":26500,"Make":"BMW","Model":"2 series"},{"2006":3887,"2007":4573,"2008":5380,"2009":6330,"2010":7447,"2011":8761,"2012":10307,"2013":12126,"2014":14266,"2015":16783,"2016":19745,"2017":23229,"2018":27329,"2019":32151,"2020":37825,"2021":44500,"Make":"BMW","Model":"M2 series"},{"2006":2516,"2007":2960,"2008":3482,"2009":4097,"2010":4819,"2011":5670,"2012":6671,"2013":7848,"2014":9233,"2015":10862,"2016":12779,"2017":15034,"2018":17687,"2019":20808,"2020":24480,"2021":28800,"Make":"BMW","Model":"3 series"},{"2006":3101,"2007":3648,"2008":4292,"2009":5050,"2010":5941,"2011":6989,"2012":8222,"2013":9673,"2014":11380,"2015":13389,"2016":15752,"2017":18531,"2018":21801,"2019":25649,"2020":30175,"2021":35500,"Make":"BMW","Model":"3 series Гран Туризмо"},{"2006":3363,"2007":3957,"2008":4655,"2009":5476,"2010":6443,"2011":7580,"2012":8917,"2013":10491,"2014":12342,"2015":14520,"2016":17083,"2017":20097,"2018":23644,"2019":27816,"2020":32725,"2021":38500,"Make":"BMW","Model":"4 series"},{"2006":3197,"2007":3761,"2008":4425,"2009":5206,"2010":6125,"2011":7206,"2012":8477,"2013":9973,"2014":11733,"2015":13804,"2016":16240,"2017":19105,"2018":22477,"2019":26444,"2020":31110,"2021":36600,"Make":"BMW","Model":"4 series Гран Купе"},{"2006":3616,"2007":4255,"2008":5005,"2009":5889,"2010":6928,"2011":8151,"2012":9589,"2013":11281,"2014":13272,"2015":15614,"2016":18369,"2017":21611,"2018":25425,"2019":29912,"2020":35190,"2021":41400,"Make":"BMW","Model":"4 series (кабриолет)"},{"2006":4630,"2007":5447,"2008":6408,"2009":7539,"2010":8869,"2011":10434,"2012":12276,"2013":14442,"2014":16991,"2015":19989,"2016":23516,"2017":27666,"2018":32549,"2019":38293,"2020":45050,"2021":53000,"Make":"BMW","Model":"M4 series"},{"2006":3879,"2007":4563,"2008":5368,"2009":6316,"2010":7430,"2011":8741,"2012":10284,"2013":12099,"2014":14234,"2015":16745,"2016":19701,"2017":23177,"2018":27267,"2019":32079,"2020":37740,"2021":44400,"Make":"BMW","Model":"5 series"},{"2006":7565,"2007":8900,"2008":10470,"2009":12318,"2010":14492,"2011":17049,"2012":20058,"2013":23598,"2014":27762,"2015":32661,"2016":38425,"2017":45206,"2018":53183,"2019":62569,"2020":73610,"2021":86600,"Make":"BMW","Model":"M5 series"},{"2006":4892,"2007":5755,"2008":6771,"2009":7966,"2010":9371,"2011":11025,"2012":12971,"2013":15259,"2014":17952,"2015":21120,"2016":24847,"2017":29232,"2018":34391,"2019":40460,"2020":47600,"2021":56000,"Make":"BMW","Model":"6 series GT"},{"2006":6359,"2007":7482,"2008":8802,"2009":10355,"2010":12183,"2011":14332,"2012":16862,"2013":19837,"2014":23338,"2015":27456,"2016":32302,"2017":38002,"2018":44708,"2019":52598,"2020":61880,"2021":72800,"Make":"BMW","Model":"7 series"},{"2006":8561,"2007":10071,"2008":11849,"2009":13940,"2010":16400,"2011":19294,"2012":22698,"2013":26704,"2014":31417,"2015":36961,"2016":43483,"2017":51157,"2018":60184,"2019":70805,"2020":83300,"2021":98000,"Make":"BMW","Model":"8 series"},{"2006":4542,"2007":5344,"2008":6287,"2009":7397,"2010":8702,"2011":10237,"2012":12044,"2013":14170,"2014":16670,"2015":19612,"2016":23073,"2017":27144,"2018":31935,"2019":37570,"2020":44200,"2021":52000,"Make":"BMW","Model":"i 3 series"},{"2006":11531,"2007":13566,"2008":15960,"2009":18776,"2010":22089,"2011":25987,"2012":30573,"2013":35969,"2014":42316,"2015":49784,"2016":58569,"2017":68905,"2018":81065,"2019":95370,"2020":112200,"2021":132000,"Make":"BMW","Model":"i 8 series"},{"2006":12928,"2007":15210,"2008":17894,"2009":21052,"2010":24767,"2011":29137,"2012":34279,"2013":40329,"2014":47445,"2015":55818,"2016":65668,"2017":77257,"2018":90891,"2019":106930,"2020":125800,"2021":148000,"Make":"BMW","Model":"i 8 series Кабриолет"},{"2006":4542,"2007":5344,"2008":6287,"2009":7397,"2010":8702,"2011":10237,"2012":12044,"2013":14170,"2014":16670,"2015":19612,"2016":23073,"2017":27144,"2018":31935,"2019":37570,"2020":44200,"2021":52000,"Make":"BMW","Model":"Z4"},{"2006":2621,"2007":3083,"2008":3627,"2009":4267,"2010":5020,"2011":5906,"2012":6949,"2013":8175,"2014":9617,"2015":11314,"2016":13311,"2017":15660,"2018":18424,"2019":21675,"2020":25500,"2021":30000,"Make":"BMW","Model":"X1 series"},{"2006":2830,"2007":3330,"2008":3917,"2009":4609,"2010":5422,"2011":6379,"2012":7504,"2013":8829,"2014":10387,"2015":12220,"2016":14376,"2017":16913,"2018":19898,"2019":23409,"2020":27540,"2021":32400,"Make":"BMW","Model":"X2 series"},{"2006":4193,"2007":4933,"2008":5803,"2009":6828,"2010":8032,"2011":9450,"2012":11118,"2013":13080,"2014":15388,"2015":18103,"2016":21298,"2017":25056,"2018":29478,"2019":34680,"2020":40800,"2021":48000,"Make":"BMW","Model":"X3 series"},{"2006":6814,"2007":8016,"2008":9431,"2009":11095,"2010":13053,"2011":15356,"2012":18066,"2013":21254,"2014":25005,"2015":29418,"2016":34609,"2017":40716,"2018":47902,"2019":56355,"2020":66300,"2021":78000,"Make":"BMW","Model":"X3 М series"},{"2006":4726,"2007":5560,"2008":6541,"2009":7695,"2010":9053,"2011":10651,"2012":12530,"2013":14742,"2014":17343,"2015":20404,"2016":24004,"2017":28241,"2018":33224,"2019":39087,"2020":45985,"2021":54100,"Make":"BMW","Model":"X4 series"},{"2006":6988,"2007":8222,"2008":9672,"2009":11379,"2010":13387,"2011":15750,"2012":18529,"2013":21799,"2014":25646,"2015":30172,"2016":35496,"2017":41761,"2018":49130,"2019":57800,"2020":68000,"2021":80000,"Make":"BMW","Model":"X4 М series"},{"2006":6027,"2007":7091,"2008":8342,"2009":9815,"2010":11547,"2011":13584,"2012":15982,"2013":18802,"2014":22120,"2015":26023,"2016":30616,"2017":36018,"2018":42375,"2019":49853,"2020":58650,"2021":69000,"Make":"BMW","Model":"X5 series"},{"2006":9784,"2007":11510,"2008":13541,"2009":15931,"2010":18742,"2011":22050,"2012":25941,"2013":30519,"2014":35905,"2015":42241,"2016":49695,"2017":58465,"2018":68782,"2019":80920,"2020":95200,"2021":112000,"Make":"BMW","Model":"X5 М series"},{"2006":6290,"2007":7399,"2008":8705,"2009":10241,"2010":12049,"2011":14175,"2012":16676,"2013":19619,"2014":23082,"2015":27155,"2016":31947,"2017":37584,"2018":44217,"2019":52020,"2020":61200,"2021":72000,"Make":"BMW","Model":"X6 series"},{"2006":10220,"2007":12024,"2008":14146,"2009":16642,"2010":19579,"2011":23034,"2012":27099,"2013":31881,"2014":37508,"2015":44126,"2016":51914,"2017":61075,"2018":71853,"2019":84533,"2020":99450,"2021":117000,"Make":"BMW","Model":"X6 M series"},{"2006":7600,"2007":8941,"2008":10519,"2009":12375,"2010":14559,"2011":17128,"2012":20151,"2013":23707,"2014":27890,"2015":32812,"2016":38602,"2017":45415,"2018":53429,"2019":62858,"2020":73950,"2021":87000,"Make":"BMW","Model":"X7 series"},{"2006":2027,"2007":2384,"2008":2805,"2009":3300,"2010":3882,"2011":4567,"2012":5374,"2013":6322,"2014":7437,"2015":8750,"2016":10294,"2017":12111,"2018":14248,"2019":16762,"2020":19720,"2021":23200,"Make":"BMW","Model":"2 series Active Tourer (минивен)"},{"2006":856,"2007":1007,"2008":1185,"2009":1394,"2010":1640,"2011":1929,"2012":2270,"2013":2670,"2014":3142,"2015":3696,"2016":4348,"2017":5116,"2018":6018,"2019":7081,"2020":8330,"2021":9800,"Make":"BYD","Model":"BYD"},{"2006":2708,"2007":3186,"2008":3748,"2009":4409,"2010":5188,"2011":6103,"2012":7180,"2013":8447,"2014":9938,"2015":11692,"2016":13755,"2017":16182,"2018":19038,"2019":22398,"2020":26350,"2021":31000,"Make":"Cadillac","Model":"CTS-V 2,0"},{"2006":8735,"2007":10277,"2008":12091,"2009":14224,"2010":16734,"2011":19687,"2012":23162,"2013":27249,"2014":32058,"2015":37715,"2016":44371,"2017":52201,"2018":61413,"2019":72250,"2020":85000,"2021":100000,"Make":"Cadillac","Model":"CTS-V 6,2"},{"2006":6726,"2007":7913,"2008":9310,"2009":10953,"2010":12885,"2011":15159,"2012":17835,"2013":20982,"2014":24684,"2015":29041,"2016":34165,"2017":40194,"2018":47288,"2019":55633,"2020":65450,"2021":77000,"Make":"Cadillac","Model":"CT6"},{"2006":2795,"2007":3289,"2008":3869,"2009":4552,"2010":5355,"2011":6300,"2012":7412,"2013":8720,"2014":10258,"2015":12069,"2016":14199,"2017":16704,"2018":19652,"2019":23120,"2020":27200,"2021":32000,"Make":"Cadillac","Model":"CTS"},{"2006":2970,"2007":3494,"2008":4111,"2009":4836,"2010":5690,"2011":6694,"2012":7875,"2013":9265,"2014":10900,"2015":12823,"2016":15086,"2017":17748,"2018":20880,"2019":24565,"2020":28900,"2021":34000,"Make":"Cadillac","Model":"ATS"},{"2006":7862,"2007":9249,"2008":10881,"2009":12802,"2010":15061,"2011":17719,"2012":20846,"2013":24524,"2014":28852,"2015":33943,"2016":39933,"2017":46981,"2018":55271,"2019":65025,"2020":76500,"2021":90000,"Make":"Cadillac","Model":"Escalade"},{"2006":4368,"2007":5138,"2008":6045,"2009":7112,"2010":8367,"2011":9844,"2012":11581,"2013":13625,"2014":16029,"2015":18857,"2016":22185,"2017":26100,"2018":30706,"2019":36125,"2020":42500,"2021":50000,"Make":"Cadillac","Model":"XT5"},{"2006":1048,"2007":1233,"2008":1451,"2009":1707,"2010":2008,"2011":2362,"2012":2779,"2013":3270,"2014":3847,"2015":4526,"2016":5324,"2017":6264,"2018":7370,"2019":8670,"2020":10200,"2021":12000,"Make":"Changan","Model":"Star 9"},{"2006":1136,"2007":1336,"2008":1572,"2009":1849,"2010":2175,"2011":2559,"2012":3011,"2013":3542,"2014":4168,"2015":4903,"2016":5768,"2017":6786,"2018":7984,"2019":9393,"2020":11050,"2021":13000,"Make":"Changan","Model":"CS35"},{"2006":1834,"2007":2158,"2008":2539,"2009":2987,"2010":3514,"2011":4134,"2012":4864,"2013":5722,"2014":6732,"2015":7920,"2016":9318,"2017":10962,"2018":12897,"2019":15173,"2020":17850,"2021":21000,"Make":"Changan","Model":"CS75"},{"2006":786,"2007":925,"2008":1088,"2009":1280,"2010":1506,"2011":1772,"2012":2085,"2013":2452,"2014":2885,"2015":3394,"2016":3993,"2017":4698,"2018":5527,"2019":6503,"2020":7650,"2021":9000,"Make":"Chery","Model":"M11"},{"2006":699,"2007":822,"2008":967,"2009":1138,"2010":1339,"2011":1575,"2012":1853,"2013":2180,"2014":2565,"2015":3017,"2016":3550,"2017":4176,"2018":4913,"2019":5780,"2020":6800,"2021":8000,"Make":"Chery","Model":"IndiS"},{"2006":743,"2007":874,"2008":1028,"2009":1209,"2010":1422,"2011":1673,"2012":1969,"2013":2316,"2014":2725,"2015":3206,"2016":3771,"2017":4437,"2018":5220,"2019":6141,"2020":7225,"2021":8500,"Make":"Chery","Model":"Very"},{"2006":585,"2007":689,"2008":810,"2009":953,"2010":1121,"2011":1319,"2012":1552,"2013":1826,"2014":2148,"2015":2527,"2016":2973,"2017":3497,"2018":4115,"2019":4841,"2020":5695,"2021":6700,"Make":"Chery","Model":"Kimo"},{"2006":620,"2007":730,"2008":858,"2009":1010,"2010":1188,"2011":1398,"2012":1644,"2013":1935,"2014":2276,"2015":2678,"2016":3150,"2017":3706,"2018":4360,"2019":5130,"2020":6035,"2021":7100,"Make":"Chery","Model":"Bonus"},{"2006":1048,"2007":1233,"2008":1451,"2009":1707,"2010":2008,"2011":2362,"2012":2779,"2013":3270,"2014":3847,"2015":4526,"2016":5324,"2017":6264,"2018":7370,"2019":8670,"2020":10200,"2021":12000,"Make":"Chery","Model":"Fora (A21)"},{"2006":1310,"2007":1542,"2008":1814,"2009":2134,"2010":2510,"2011":2953,"2012":3474,"2013":4087,"2014":4809,"2015":5657,"2016":6656,"2017":7830,"2018":9212,"2019":10838,"2020":12750,"2021":15000,"Make":"Chery","Model":"Cross Eastar (B14)"},{"2006":1223,"2007":1439,"2008":1693,"2009":1991,"2010":2343,"2011":2756,"2012":3243,"2013":3815,"2014":4488,"2015":5280,"2016":6212,"2017":7308,"2018":8598,"2019":10115,"2020":11900,"2021":14000,"Make":"Chery","Model":"Tiggo 2"},{"2006":1310,"2007":1542,"2008":1814,"2009":2134,"2010":2510,"2011":2953,"2012":3474,"2013":4087,"2014":4809,"2015":5657,"2016":6656,"2017":7830,"2018":9212,"2019":10838,"2020":12750,"2021":15000,"Make":"Chery","Model":"Tiggo 3"},{"2006":1616,"2007":1901,"2008":2237,"2009":2631,"2010":3096,"2011":3642,"2012":4285,"2013":5041,"2014":5931,"2015":6977,"2016":8209,"2017":9657,"2018":11361,"2019":13366,"2020":15725,"2021":18500,"Make":"Chery","Model":"Tiggo 5"},{"2006":1267,"2007":1490,"2008":1753,"2009":2063,"2010":2426,"2011":2855,"2012":3358,"2013":3951,"2014":4648,"2015":5469,"2016":6434,"2017":7569,"2018":8905,"2019":10476,"2020":12325,"2021":14500,"Make":"Chery","Model":"Tiggo Т11"},{"2006":999,"2007":1162,"2008":1351,"2009":1571,"2010":1827,"2011":2124,"2012":2470,"2013":2872,"2014":3340,"2015":3884,"2016":4516,"2017":5251,"2018":6106,"2019":7100,"2020":8256,"2021":9600,"Make":"Chevrolet","Model":"Viva"},{"2006":769,"2007":904,"2008":1064,"2009":1252,"2010":1473,"2011":1732,"2012":2038,"2013":2398,"2014":2821,"2015":3319,"2016":3905,"2017":4594,"2018":5404,"2019":6358,"2020":7480,"2021":8800,"Make":"Chevrolet","Model":"Niva"},{"2006":1223,"2007":1439,"2008":1693,"2009":1991,"2010":2343,"2011":2756,"2012":3243,"2013":3815,"2014":4488,"2015":5280,"2016":6212,"2017":7308,"2018":8598,"2019":10115,"2020":11900,"2021":14000,"Make":"Chevrolet","Model":"Monza"},{"2006":1162,"2007":1367,"2008":1608,"2009":1892,"2010":2226,"2011":2618,"2012":3081,"2013":3624,"2014":4264,"2015":5016,"2016":5901,"2017":6943,"2018":8168,"2019":9609,"2020":11305,"2021":13300,"Make":"Chevrolet","Model":"Lacetti"},{"2006":1162,"2007":1367,"2008":1608,"2009":1892,"2010":2226,"2011":2618,"2012":3081,"2013":3624,"2014":4264,"2015":5016,"2016":5901,"2017":6943,"2018":8168,"2019":9609,"2020":11305,"2021":13300,"Make":"Chevrolet","Model":"Cruze"},{"2006":1223,"2007":1439,"2008":1693,"2009":1991,"2010":2343,"2011":2756,"2012":3243,"2013":3815,"2014":4488,"2015":5280,"2016":6212,"2017":7308,"2018":8598,"2019":10115,"2020":11900,"2021":14000,"Make":"Chevrolet","Model":"Cruze Universal"},{"2006":9172,"2007":10791,"2008":12695,"2009":14935,"2010":17571,"2011":20672,"2012":24320,"2013":28612,"2014":33661,"2015":39601,"2016":46589,"2017":54811,"2018":64483,"2019":75863,"2020":89250,"2021":105000,"Make":"Chevrolet","Model":"Corvette 6,2"},{"2006":786,"2007":925,"2008":1088,"2009":1280,"2010":1506,"2011":1772,"2012":2085,"2013":2452,"2014":2885,"2015":3394,"2016":3993,"2017":4698,"2018":5527,"2019":6503,"2020":7650,"2021":9000,"Make":"Chevrolet","Model":"Spark"},{"2006":1747,"2007":2055,"2008":2418,"2009":2845,"2010":3347,"2011":3937,"2012":4632,"2013":5450,"2014":6412,"2015":7543,"2016":8874,"2017":10440,"2018":12283,"2019":14450,"2020":17000,"2021":20000,"Make":"Chevrolet","Model":"Malibu"},{"2006":917,"2007":1079,"2008":1270,"2009":1494,"2010":1757,"2011":2067,"2012":2432,"2013":2861,"2014":3366,"2015":3960,"2016":4659,"2017":5481,"2018":6448,"2019":7586,"2020":8925,"2021":10500,"Make":"Chevrolet","Model":"Cobalt"},{"2006":961,"2007":1130,"2008":1330,"2009":1565,"2010":1841,"2011":2166,"2012":2548,"2013":2997,"2014":3526,"2015":4149,"2016":4881,"2017":5742,"2018":6755,"2019":7948,"2020":9350,"2021":11000,"Make":"Chevrolet","Model":"Aveo"},{"2006":961,"2007":1130,"2008":1330,"2009":1565,"2010":1841,"2011":2166,"2012":2548,"2013":2997,"2014":3526,"2015":4149,"2016":4881,"2017":5742,"2018":6755,"2019":7948,"2020":9350,"2021":11000,"Make":"Chevrolet","Model":"Sonic"},{"2006":1162,"2007":1367,"2008":1608,"2009":1892,"2010":2226,"2011":2618,"2012":3081,"2013":3624,"2014":4264,"2015":5016,"2016":5901,"2017":6943,"2018":8168,"2019":9609,"2020":11305,"2021":13300,"Make":"Chevrolet","Model":"Lacetti"},{"2006":1162,"2007":1367,"2008":1608,"2009":1892,"2010":2226,"2011":2618,"2012":3081,"2013":3624,"2014":4264,"2015":5016,"2016":5901,"2017":6943,"2018":8168,"2019":9609,"2020":11305,"2021":13300,"Make":"Chevrolet","Model":"Cruze"},{"2006":830,"2007":976,"2008":1149,"2009":1351,"2010":1590,"2011":1870,"2012":2200,"2013":2589,"2014":3045,"2015":3583,"2016":4215,"2017":4959,"2018":5834,"2019":6864,"2020":8075,"2021":9500,"Make":"Chevrolet","Model":"Lanos"},{"2006":3057,"2007":3597,"2008":4232,"2009":4978,"2010":5857,"2011":6891,"2012":8107,"2013":9537,"2014":11220,"2015":13200,"2016":15530,"2017":18270,"2018":21494,"2019":25288,"2020":29750,"2021":35000,"Make":"Chevrolet","Model":"Camaro 3,6"},{"2006":3931,"2007":4625,"2008":5441,"2009":6401,"2010":7530,"2011":8859,"2012":10423,"2013":12262,"2014":14426,"2015":16972,"2016":19967,"2017":23490,"2018":27636,"2019":32513,"2020":38250,"2021":45000,"Make":"Chevrolet","Model":"Camaro 6,2"},{"2006":8735,"2007":10277,"2008":12091,"2009":14224,"2010":16734,"2011":19687,"2012":23162,"2013":27249,"2014":32058,"2015":37715,"2016":44371,"2017":52201,"2018":61413,"2019":72250,"2020":85000,"2021":100000,"Make":"Chevrolet","Model":"Corvette 6,2"},{"2006":917,"2007":1079,"2008":1270,"2009":1494,"2010":1757,"2011":2067,"2012":2432,"2013":2861,"2014":3366,"2015":3960,"2016":4659,"2017":5481,"2018":6448,"2019":7586,"2020":8925,"2021":10500,"Make":"Chevrolet","Model":"Lacetti (универсал)"},{"2006":961,"2007":1130,"2008":1330,"2009":1565,"2010":1841,"2011":2166,"2012":2548,"2013":2997,"2014":3526,"2015":4149,"2016":4881,"2017":5742,"2018":6755,"2019":7948,"2020":9350,"2021":11000,"Make":"Chevrolet","Model":"Cruze (универсал) 1,6"},{"2006":1101,"2007":1295,"2008":1523,"2009":1792,"2010":2109,"2011":2481,"2012":2918,"2013":3433,"2014":4039,"2015":4752,"2016":5591,"2017":6577,"2018":7738,"2019":9104,"2020":10710,"2021":12600,"Make":"Chevrolet","Model":"Cruze (универсал) 1,8"},{"2006":4193,"2007":4933,"2008":5803,"2009":6828,"2010":8032,"2011":9450,"2012":11118,"2013":13080,"2014":15388,"2015":18103,"2016":21298,"2017":25056,"2018":29478,"2019":34680,"2020":40800,"2021":48000,"Make":"Chevrolet","Model":"Tahoe"},{"2006":2271,"2007":2672,"2008":3144,"2009":3698,"2010":4351,"2011":5119,"2012":6022,"2013":7085,"2014":8335,"2015":9806,"2016":11536,"2017":13572,"2018":15967,"2019":18785,"2020":22100,"2021":26000,"Make":"Chevrolet","Model":"TrailBlazer 2,8"},{"2006":2446,"2007":2878,"2008":3385,"2009":3983,"2010":4686,"2011":5512,"2012":6485,"2013":7630,"2014":8976,"2015":10560,"2016":12424,"2017":14616,"2018":17196,"2019":20230,"2020":23800,"2021":28000,"Make":"Chevrolet","Model":"TrailBlazer 3,6"},{"2006":1747,"2007":2055,"2008":2418,"2009":2845,"2010":3347,"2011":3937,"2012":4632,"2013":5450,"2014":6412,"2015":7543,"2016":8874,"2017":10440,"2018":12283,"2019":14450,"2020":17000,"2021":20000,"Make":"Chevrolet","Model":"Captiva 2,2"},{"2006":1529,"2007":1798,"2008":2116,"2009":2489,"2010":2929,"2011":3445,"2012":4053,"2013":4769,"2014":5610,"2015":6600,"2016":7765,"2017":9135,"2018":10747,"2019":12644,"2020":14875,"2021":17500,"Make":"Chevrolet","Model":"Captiva 2,4"},{"2006":1878,"2007":2210,"2008":2599,"2009":3058,"2010":3598,"2011":4233,"2012":4980,"2013":5859,"2014":6892,"2015":8109,"2016":9540,"2017":11223,"2018":13204,"2019":15534,"2020":18275,"2021":21500,"Make":"Chevrolet","Model":"Captiva 3,0"},{"2006":1223,"2007":1439,"2008":1693,"2009":1991,"2010":2343,"2011":2756,"2012":3243,"2013":3815,"2014":4488,"2015":5280,"2016":6212,"2017":7308,"2018":8598,"2019":10115,"2020":11900,"2021":14000,"Make":"Chevrolet","Model":"Orlando"},{"2006":4455,"2007":5241,"2008":6166,"2009":7254,"2010":8535,"2011":10041,"2012":11812,"2013":13897,"2014":16349,"2015":19235,"2016":22629,"2017":26622,"2018":31320,"2019":36848,"2020":43350,"2021":51000,"Make":"Chevrolet","Model":"Traverse"},{"2006":7862,"2007":9249,"2008":10881,"2009":12802,"2010":15061,"2011":17719,"2012":20846,"2013":24524,"2014":28852,"2015":33943,"2016":39933,"2017":46981,"2018":55271,"2019":65025,"2020":76500,"2021":90000,"Make":"Chevrolet","Model":"Suburban"},{"2006":2795,"2007":3289,"2008":3869,"2009":4552,"2010":5355,"2011":6300,"2012":7412,"2013":8720,"2014":10258,"2015":12069,"2016":14199,"2017":16704,"2018":19652,"2019":23120,"2020":27200,"2021":32000,"Make":"Chrysler","Model":"300 C"},{"2006":3057,"2007":3597,"2008":4232,"2009":4978,"2010":5857,"2011":6891,"2012":8107,"2013":9537,"2014":11220,"2015":13200,"2016":15530,"2017":18270,"2018":21494,"2019":25288,"2020":29750,"2021":35000,"Make":"Chrysler","Model":"Grand Voyager"},{"2006":5329,"2007":6269,"2008":7375,"2009":8677,"2010":10208,"2011":12009,"2012":14129,"2013":16622,"2014":19555,"2015":23006,"2016":27066,"2017":31842,"2018":37462,"2019":44073,"2020":51850,"2021":61000,"Make":"Chrysler","Model":"Pacifica"},{"2006":843,"2007":969,"2008":1114,"2009":1280,"2010":1506,"2011":1772,"2012":2085,"2013":2452,"2014":2885,"2015":3394,"2016":3993,"2017":4698,"2018":5527,"2019":6503,"2020":7650,"2021":9000,"Make":"Citroen","Model":"C1"},{"2006":937,"2007":1077,"2008":1238,"2009":1422,"2010":1673,"2011":1969,"2012":2316,"2013":2725,"2014":3206,"2015":3771,"2016":4437,"2017":5220,"2018":6141,"2019":7225,"2020":8500,"2021":10000,"Make":"Citroen","Model":"C-Elisee 1,2"},{"2006":1171,"2007":1346,"2008":1547,"2009":1778,"2010":2092,"2011":2461,"2012":2895,"2013":3406,"2014":4007,"2015":4714,"2016":5546,"2017":6525,"2018":7677,"2019":9031,"2020":10625,"2021":12500,"Make":"Citroen","Model":"C-Elisee 1,6"},{"2006":1171,"2007":1346,"2008":1547,"2009":1778,"2010":2092,"2011":2461,"2012":2895,"2013":3406,"2014":4007,"2015":4714,"2016":5546,"2017":6525,"2018":7677,"2019":9031,"2020":10625,"2021":12500,"Make":"Citroen","Model":"C 3"},{"2006":1733,"2007":1992,"2008":2289,"2009":2631,"2010":3096,"2011":3642,"2012":4285,"2013":5041,"2014":5931,"2015":6977,"2016":8209,"2017":9657,"2018":11361,"2019":13366,"2020":15725,"2021":18500,"Make":"Citroen","Model":"C 4"},{"2006":2342,"2007":2692,"2008":3094,"2009":3556,"2010":4184,"2011":4922,"2012":5790,"2013":6812,"2014":8014,"2015":9429,"2016":11093,"2017":13050,"2018":15353,"2019":18063,"2020":21250,"2021":25000,"Make":"Citroen","Model":"C 5"},{"2006":3325,"2007":3822,"2008":4393,"2009":5050,"2010":5941,"2011":6989,"2012":8222,"2013":9673,"2014":11380,"2015":13389,"2016":15752,"2017":18531,"2018":21801,"2019":25649,"2020":30175,"2021":35500,"Make":"Citroen","Model":"C 6"},{"2006":1873,"2007":2153,"2008":2475,"2009":2845,"2010":3347,"2011":3937,"2012":4632,"2013":5450,"2014":6412,"2015":7543,"2016":8874,"2017":10440,"2018":12283,"2019":14450,"2020":17000,"2021":20000,"Make":"Citroen","Model":"DS 3"},{"2006":2435,"2007":2799,"2008":3218,"2009":3698,"2010":4351,"2011":5119,"2012":6022,"2013":7085,"2014":8335,"2015":9806,"2016":11536,"2017":13572,"2018":15967,"2019":18785,"2020":22100,"2021":26000,"Make":"Citroen","Model":"DS 4"},{"2006":2623,"2007":3015,"2008":3465,"2009":3983,"2010":4686,"2011":5512,"2012":6485,"2013":7630,"2014":8976,"2015":10560,"2016":12424,"2017":14616,"2018":17196,"2019":20230,"2020":23800,"2021":28000,"Make":"Citroen","Model":"DS 4 Crossback 1,6"},{"2006":3091,"2007":3553,"2008":4084,"2009":4694,"2010":5522,"2011":6497,"2012":7643,"2013":8992,"2014":10579,"2015":12446,"2016":14642,"2017":17226,"2018":20266,"2019":23843,"2020":28050,"2021":33000,"Make":"Citroen","Model":"DS 4 Crossback 2,0"},{"2006":1368,"2007":1572,"2008":1807,"2009":2077,"2010":2443,"2011":2874,"2012":3382,"2013":3978,"2014":4680,"2015":5506,"2016":6478,"2017":7621,"2018":8966,"2019":10549,"2020":12410,"2021":14600,"Make":"Citroen","Model":"C 3 Picasso"},{"2006":1780,"2007":2046,"2008":2351,"2009":2703,"2010":3180,"2011":3741,"2012":4401,"2013":5177,"2014":6091,"2015":7166,"2016":8430,"2017":9918,"2018":11668,"2019":13728,"2020":16150,"2021":19000,"Make":"Citroen","Model":"C 3 Aircross"},{"2006":2061,"2007":2369,"2008":2723,"2009":3129,"2010":3682,"2011":4331,"2012":5096,"2013":5995,"2014":7053,"2015":8297,"2016":9762,"2017":11484,"2018":13511,"2019":15895,"2020":18700,"2021":22000,"Make":"Citroen","Model":"C Crosser"},{"2006":2997,"2007":3445,"2008":3960,"2009":4552,"2010":5355,"2011":6300,"2012":7412,"2013":8720,"2014":10258,"2015":12069,"2016":14199,"2017":16704,"2018":19652,"2019":23120,"2020":27200,"2021":32000,"Make":"Citroen","Model":"Space Tourer"},{"2006":2810,"2007":3230,"2008":3713,"2009":4267,"2010":5020,"2011":5906,"2012":6949,"2013":8175,"2014":9617,"2015":11314,"2016":13311,"2017":15660,"2018":18424,"2019":21675,"2020":25500,"2021":30000,"Make":"Citroen","Model":"C 4 Space Tourer"},{"2006":2997,"2007":3445,"2008":3960,"2009":4552,"2010":5355,"2011":6300,"2012":7412,"2013":8720,"2014":10258,"2015":12069,"2016":14199,"2017":16704,"2018":19652,"2019":23120,"2020":27200,"2021":32000,"Make":"Citroen","Model":"Grand C 4 Space Tourer"},{"2006":1967,"2007":2261,"2008":2599,"2009":2987,"2010":3514,"2011":4134,"2012":4864,"2013":5722,"2014":6732,"2015":7920,"2016":9318,"2017":10962,"2018":12897,"2019":15173,"2020":17850,"2021":21000,"Make":"Citroen","Model":"Berlingo Multispace"},{"2006":2248,"2007":2584,"2008":2970,"2009":3414,"2010":4016,"2011":4725,"2012":5559,"2013":6540,"2014":7694,"2015":9052,"2016":10649,"2017":12528,"2018":14739,"2019":17340,"2020":20400,"2021":24000,"Make":"Citroen","Model":"C 5 универсал"},{"2006":"","2007":"","2008":"","2009":"","2010":"","2011":"","2012":"","2013":"","2014":"","2015":1992,"2016":2344,"2017":2758,"2018":3244,"2019":3817,"2020":4491,"2021":5283,"Make":"Damas","Model":"DLX"},{"2006":"","2007":"","2008":"","2009":"","2010":"","2011":"","2012":"","2013":"","2014":"","2015":1839,"2016":2163,"2017":2545,"2018":2994,"2019":3522,"2020":4144,"2021":4875,"Make":"Damas","Model":"VAN"},{"2006":"","2007":"","2008":"","2009":"","2010":"","2011":"","2012":"","2013":"","2014":"","2015":1979,"2016":2329,"2017":2739,"2018":3223,"2019":3792,"2020":4461,"2021":5248,"Make":"Damas","Model":"АМВ"},{"2006":"","2007":"","2008":"","2009":"","2010":"","2011":"","2012":"","2013":"","2014":"","2015":2223,"2016":2615,"2017":3076,"2018":3619,"2019":4258,"2020":5009,"2021":5893,"Make":"Damas","Model":"Labo"},{"2006":833,"2007":968,"2008":1126,"2009":1309,"2010":1523,"2011":1770,"2012":2059,"2013":2394,"2014":2783,"2015":3237,"2016":3763,"2017":4376,"2018":5088,"2019":5917,"2020":6880,"2021":8000,"Make":"Datsun","Model":"ON-DO Access (1,6 куб. см., мт, 87 л.с.)"},{"2006":885,"2007":1029,"2008":1196,"2009":1391,"2010":1618,"2011":1881,"2012":2187,"2013":2543,"2014":2957,"2015":3439,"2016":3999,"2017":4650,"2018":5406,"2019":6287,"2020":7310,"2021":8500,"Make":"Datsun","Model":"ON-DO Trust I (1,6 куб. см., мт, 87 л.с.)"},{"2006":968,"2007":1126,"2008":1309,"2009":1522,"2010":1770,"2011":2058,"2012":2393,"2013":2783,"2014":3236,"2015":3762,"2016":4375,"2017":5087,"2018":5915,"2019":6878,"2020":7998,"2021":9300,"Make":"Datsun","Model":"ON-DO Trust I (1,6 куб. см., ат, 87 л.с.)"},{"2006":937,"2007":1089,"2008":1267,"2009":1473,"2010":1713,"2011":1992,"2012":2316,"2013":2693,"2014":3131,"2015":3641,"2016":4234,"2017":4923,"2018":5725,"2019":6656,"2020":7740,"2021":9000,"Make":"Datsun","Model":"ON-DO Trust II (1,6 куб. см., мт, 87 л.с.)"},{"2006":958,"2007":1114,"2008":1295,"2009":1506,"2010":1751,"2011":2036,"2012":2367,"2013":2753,"2014":3201,"2015":3722,"2016":4328,"2017":5032,"2018":5852,"2019":6804,"2020":7912,"2021":9200,"Make":"Datsun","Model":"ON-DO Trust II (1,6 куб. см., мт, 106 л.с.)"},{"2006":989,"2007":1150,"2008":1337,"2009":1555,"2010":1808,"2011":2102,"2012":2445,"2013":2843,"2014":3305,"2015":3843,"2016":4469,"2017":5197,"2018":6043,"2019":7026,"2020":8170,"2021":9500,"Make":"Datsun","Model":"ON-DO Trust II (1,6 куб. см., ат, 87 л.с.)"},{"2006":937,"2007":1089,"2008":1267,"2009":1473,"2010":1713,"2011":1992,"2012":2316,"2013":2693,"2014":3131,"2015":3641,"2016":4234,"2017":4923,"2018":5725,"2019":6656,"2020":7740,"2021":9000,"Make":"Datsun","Model":"ON-DO Trust III (1,6 куб. см., мт, 87 л.с.)"},{"2006":958,"2007":1114,"2008":1295,"2009":1506,"2010":1751,"2011":2036,"2012":2367,"2013":2753,"2014":3201,"2015":3722,"2016":4328,"2017":5032,"2018":5852,"2019":6804,"2020":7912,"2021":9200,"Make":"Datsun","Model":"ON-DO Trust III (1,6 куб. см., мт, 106 л.с.)"},{"2006":1020,"2007":1186,"2008":1379,"2009":1604,"2010":1865,"2011":2169,"2012":2522,"2013":2932,"2014":3410,"2015":3965,"2016":4610,"2017":5361,"2018":6233,"2019":7248,"2020":8428,"2021":9800,"Make":"Datsun","Model":"ON-DO Trust III (1,6 куб. см., ат, 87 л.с.)"},{"2006":968,"2007":1126,"2008":1309,"2009":1522,"2010":1770,"2011":2058,"2012":2393,"2013":2783,"2014":3236,"2015":3762,"2016":4375,"2017":5087,"2018":5915,"2019":6878,"2020":7998,"2021":9300,"Make":"Datsun","Model":"ON-DO Dream I (1,6 куб. см., мт, 87 л.с.)"},{"2006":999,"2007":1162,"2008":1351,"2009":1571,"2010":1827,"2011":2124,"2012":2470,"2013":2872,"2014":3340,"2015":3884,"2016":4516,"2017":5251,"2018":6106,"2019":7100,"2020":8256,"2021":9600,"Make":"Datsun","Model":"ON-DO Dream I (1,6 куб. см., мт, 106 л.с.)"},{"2006":1020,"2007":1186,"2008":1379,"2009":1604,"2010":1865,"2011":2169,"2012":2522,"2013":2932,"2014":3410,"2015":3965,"2016":4610,"2017":5361,"2018":6233,"2019":7248,"2020":8428,"2021":9800,"Make":"Datsun","Model":"ON-DO Dream I (1,6 куб. см., ат, 87 л.с.)"},{"2006":1020,"2007":1186,"2008":1379,"2009":1604,"2010":1865,"2011":2169,"2012":2522,"2013":2932,"2014":3410,"2015":3965,"2016":4610,"2017":5361,"2018":6233,"2019":7248,"2020":8428,"2021":9800,"Make":"Datsun","Model":"ON-DO Dream II (1,6 куб. см., мт, 87 л.с.)"},{"2006":1051,"2007":1223,"2008":1422,"2009":1653,"2010":1922,"2011":2235,"2012":2599,"2013":3022,"2014":3514,"2015":4086,"2016":4751,"2017":5525,"2018":6424,"2019":7470,"2020":8686,"2021":10100,"Make":"Datsun","Model":"ON-DO Dream II (1,6 куб. см., мт, 106 л.с.)"},{"2006":1093,"2007":1271,"2008":1478,"2009":1719,"2010":1998,"2011":2324,"2012":2702,"2013":3142,"2014":3653,"2015":4248,"2016":4939,"2017":5744,"2018":6679,"2019":7766,"2020":9030,"2021":10500,"Make":"Datsun","Model":"ON-DO Dream II (1,6 куб. см., ат, 87 л.с.)"},{"2006":1747,"2007":2055,"2008":2418,"2009":2845,"2010":3347,"2011":3937,"2012":4632,"2013":5450,"2014":6412,"2015":7543,"2016":8874,"2017":10440,"2018":12283,"2019":14450,"2020":17000,"2021":20000,"Make":"Dodge","Model":"Caliber"},{"2006":2621,"2007":3083,"2008":3627,"2009":4267,"2010":5020,"2011":5906,"2012":6949,"2013":8175,"2014":9617,"2015":11314,"2016":13311,"2017":15660,"2018":18424,"2019":21675,"2020":25500,"2021":30000,"Make":"Dodge","Model":"Challenger"},{"2006":7862,"2007":9249,"2008":10881,"2009":12802,"2010":15061,"2011":17719,"2012":20846,"2013":24524,"2014":28852,"2015":33943,"2016":39933,"2017":46981,"2018":55271,"2019":65025,"2020":76500,"2021":90000,"Make":"Dodge","Model":"Ram"},{"2006":917,"2007":1079,"2008":1270,"2009":1494,"2010":1757,"2011":2067,"2012":2432,"2013":2861,"2014":3366,"2015":3960,"2016":4659,"2017":5481,"2018":6448,"2019":7586,"2020":8925,"2021":10500,"Make":"Dongfeng","Model":"H30 Cross"},{"2006":1310,"2007":1542,"2008":1814,"2009":2134,"2010":2510,"2011":2953,"2012":3474,"2013":4087,"2014":4809,"2015":5657,"2016":6656,"2017":7830,"2018":9212,"2019":10838,"2020":12750,"2021":15000,"Make":"Dongfeng","Model":"ZN1035"},{"2006":1625,"2007":1912,"2008":2249,"2009":2646,"2010":3113,"2011":3662,"2012":4308,"2013":5068,"2014":5963,"2015":7015,"2016":8253,"2017":9709,"2018":11423,"2019":13439,"2020":15810,"2021":18600,"Make":"Dongfeng","Model":"DFM 580"},{"2006":1616,"2007":1901,"2008":2237,"2009":2631,"2010":3096,"2011":3642,"2012":4285,"2013":5041,"2014":5931,"2015":6977,"2016":8209,"2017":9657,"2018":11361,"2019":13366,"2020":15725,"2021":18500,"Make":"Dongfeng","Model":"AX7"},{"2006":1441,"2007":1696,"2008":1995,"2009":2347,"2010":2761,"2011":3248,"2012":3822,"2013":4496,"2014":5290,"2015":6223,"2016":7321,"2017":8613,"2018":10133,"2019":11921,"2020":14025,"2021":16500,"Make":"Dongfeng","Model":"RUIJING 6"},{"2006":743,"2007":874,"2008":1028,"2009":1209,"2010":1422,"2011":1673,"2012":1969,"2013":2316,"2014":2725,"2015":3206,"2016":3771,"2017":4437,"2018":5220,"2019":6141,"2020":7225,"2021":8500,"Make":"FAW","Model":"Oley"},{"2006":1136,"2007":1336,"2008":1572,"2009":1849,"2010":2175,"2011":2559,"2012":3011,"2013":3542,"2014":4168,"2015":4903,"2016":5768,"2017":6786,"2018":7984,"2019":9393,"2020":11050,"2021":13000,"Make":"FAW","Model":"Besturn Х40"},{"2006":1616,"2007":1901,"2008":2237,"2009":2631,"2010":3096,"2011":3642,"2012":4285,"2013":5041,"2014":5931,"2015":6977,"2016":8209,"2017":9657,"2018":11361,"2019":13366,"2020":15725,"2021":18500,"Make":"FAW","Model":"Besturn Х80"},{"2006":1529,"2007":1798,"2008":2116,"2009":2489,"2010":2929,"2011":3445,"2012":4053,"2013":4769,"2014":5610,"2015":6600,"2016":7765,"2017":9135,"2018":10747,"2019":12644,"2020":14875,"2021":17500,"Make":"Fiat","Model":"Doblo Combi Corto 1,3"},{"2006":1398,"2007":1644,"2008":1934,"2009":2276,"2010":2677,"2011":3150,"2012":3706,"2013":4360,"2014":5129,"2015":6034,"2016":7099,"2017":8352,"2018":9826,"2019":11560,"2020":13600,"2021":16000,"Make":"Fiat","Model":"Doblo Combi Corto 1,4"},{"2006":1791,"2007":2107,"2008":2479,"2009":2916,"2010":3431,"2011":4036,"2012":4748,"2013":5586,"2014":6572,"2015":7732,"2016":9096,"2017":10701,"2018":12590,"2019":14811,"2020":17425,"2021":20500,"Make":"Fiat","Model":"500 Abarth"},{"2006":1328,"2007":1562,"2008":1838,"2009":2162,"2010":2544,"2011":2992,"2012":3521,"2013":4142,"2014":4873,"2015":5733,"2016":6744,"2017":7934,"2018":9335,"2019":10982,"2020":12920,"2021":15200,"Make":"Fiat","Model":"500 new"},{"2006":1005,"2007":1182,"2008":1390,"2009":1636,"2010":1924,"2011":2264,"2012":2664,"2013":3134,"2014":3687,"2015":4337,"2016":5103,"2017":6003,"2018":7062,"2019":8309,"2020":9775,"2021":11500,"Make":"Fiat","Model":500},{"2006":1267,"2007":1490,"2008":1753,"2009":2063,"2010":2426,"2011":2855,"2012":3358,"2013":3951,"2014":4648,"2015":5469,"2016":6434,"2017":7569,"2018":8905,"2019":10476,"2020":12325,"2021":14500,"Make":"Fiat","Model":"Tipo"},{"2006":1005,"2007":1182,"2008":1390,"2009":1636,"2010":1924,"2011":2264,"2012":2664,"2013":3134,"2014":3687,"2015":4337,"2016":5103,"2017":6003,"2018":7062,"2019":8309,"2020":9775,"2021":11500,"Make":"Fiat","Model":"Punto"},{"2006":1529,"2007":1798,"2008":2116,"2009":2489,"2010":2929,"2011":3445,"2012":4053,"2013":4769,"2014":5610,"2015":6600,"2016":7765,"2017":9135,"2018":10747,"2019":12644,"2020":14875,"2021":17500,"Make":"Fiat","Model":"Doblo Panorama"},{"2006":1441,"2007":1696,"2008":1995,"2009":2347,"2010":2761,"2011":3248,"2012":3822,"2013":4496,"2014":5290,"2015":6223,"2016":7321,"2017":8613,"2018":10133,"2019":11921,"2020":14025,"2021":16500,"Make":"Fiat","Model":"Tipo HB"},{"2006":1747,"2007":2055,"2008":2418,"2009":2845,"2010":3347,"2011":3937,"2012":4632,"2013":5450,"2014":6412,"2015":7543,"2016":8874,"2017":10440,"2018":12283,"2019":14450,"2020":17000,"2021":20000,"Make":"Fiat","Model":"Tipo SW"},{"2006":1616,"2007":1901,"2008":2237,"2009":2631,"2010":3096,"2011":3642,"2012":4285,"2013":5041,"2014":5931,"2015":6977,"2016":8209,"2017":9657,"2018":11361,"2019":13366,"2020":15725,"2021":18500,"Make":"Fiat","Model":"Doblo Combi Maxi 1,3"},{"2006":1529,"2007":1798,"2008":2116,"2009":2489,"2010":2929,"2011":3445,"2012":4053,"2013":4769,"2014":5610,"2015":6600,"2016":7765,"2017":9135,"2018":10747,"2019":12644,"2020":14875,"2021":17500,"Make":"Fiat","Model":"Doblo Combi Maxi 1,4"},{"2006":1834,"2007":2158,"2008":2539,"2009":2987,"2010":3514,"2011":4134,"2012":4864,"2013":5722,"2014":6732,"2015":7920,"2016":9318,"2017":10962,"2018":12897,"2019":15173,"2020":17850,"2021":21000,"Make":"Fiat","Model":"Doblo Combi Maxi 1,6"},{"2006":1703,"2007":2004,"2008":2358,"2009":2774,"2010":3263,"2011":3839,"2012":4517,"2013":5314,"2014":6251,"2015":7354,"2016":8652,"2017":10179,"2018":11975,"2019":14089,"2020":16575,"2021":19500,"Make":"Fiat","Model":"500 L Trekking"},{"2006":1485,"2007":1747,"2008":2055,"2009":2418,"2010":2845,"2011":3347,"2012":3937,"2013":4632,"2014":5450,"2015":6412,"2016":7543,"2017":8874,"2018":10440,"2019":12283,"2020":14450,"2021":17000,"Make":"Fiat","Model":"500 L new 1,3"},{"2006":1616,"2007":1901,"2008":2237,"2009":2631,"2010":3096,"2011":3642,"2012":4285,"2013":5041,"2014":5931,"2015":6977,"2016":8209,"2017":9657,"2018":11361,"2019":13366,"2020":15725,"2021":18500,"Make":"Fiat","Model":"500 L new 1,4"},{"2006":1572,"2007":1850,"2008":2176,"2009":2560,"2010":3012,"2011":3544,"2012":4169,"2013":4905,"2014":5770,"2015":6789,"2016":7987,"2017":9396,"2018":11054,"2019":13005,"2020":15300,"2021":18000,"Make":"Fiat","Model":"500 X Cross"},{"2006":1974,"2007":2323,"2008":2732,"2009":3215,"2010":3782,"2011":4449,"2012":5235,"2013":6158,"2014":7245,"2015":8524,"2016":10028,"2017":11797,"2018":13879,"2019":16329,"2020":19210,"2021":22600,"Make":"Fiat","Model":"500 X Cross MID"},{"2006":1922,"2007":2261,"2008":2660,"2009":3129,"2010":3682,"2011":4331,"2012":5096,"2013":5995,"2014":7053,"2015":8297,"2016":9762,"2017":11484,"2018":13511,"2019":15895,"2020":18700,"2021":22000,"Make":"Fiat","Model":"500 X Cross MID +"},{"2006":2009,"2007":2364,"2008":2781,"2009":3272,"2010":3849,"2011":4528,"2012":5327,"2013":6267,"2014":7373,"2015":8674,"2016":10205,"2017":12006,"2018":14125,"2019":16618,"2020":19550,"2021":23000,"Make":"Fiat","Model":"500 X Cross MID AWD"},{"2006":2053,"2007":2415,"2008":2841,"2009":3343,"2010":3933,"2011":4627,"2012":5443,"2013":6404,"2014":7534,"2015":8863,"2016":10427,"2017":12267,"2018":14432,"2019":16979,"2020":19975,"2021":23500,"Make":"Fiat","Model":"500 X Cross MID AWD +"},{"2006":1747,"2007":2055,"2008":2418,"2009":2845,"2010":3347,"2011":3937,"2012":4632,"2013":5450,"2014":6412,"2015":7543,"2016":8874,"2017":10440,"2018":12283,"2019":14450,"2020":17000,"2021":20000,"Make":"Fiat","Model":"New 500 L Cross 1,3"},{"2006":1572,"2007":1850,"2008":2176,"2009":2560,"2010":3012,"2011":3544,"2012":4169,"2013":4905,"2014":5770,"2015":6789,"2016":7987,"2017":9396,"2018":11054,"2019":13005,"2020":15300,"2021":18000,"Make":"Fiat","Model":"New 500 L Cross 1,4"},{"2006":1223,"2007":1439,"2008":1693,"2009":1991,"2010":2343,"2011":2756,"2012":3243,"2013":3815,"2014":4488,"2015":5280,"2016":6212,"2017":7308,"2018":8598,"2019":10115,"2020":11900,"2021":14000,"Make":"Fiat","Model":"Qubo"},{"2006":1485,"2007":1747,"2008":2055,"2009":2418,"2010":2845,"2011":3347,"2012":3937,"2013":4632,"2014":5450,"2015":6412,"2016":7543,"2017":8874,"2018":10440,"2019":12283,"2020":14450,"2021":17000,"Make":"Ford","Model":"Fusion"},{"2006":1310,"2007":1542,"2008":1814,"2009":2134,"2010":2510,"2011":2953,"2012":3474,"2013":4087,"2014":4809,"2015":5657,"2016":6656,"2017":7830,"2018":9212,"2019":10838,"2020":12750,"2021":15000,"Make":"Ford","Model":"Fiesta"},{"2006":1616,"2007":1901,"2008":2237,"2009":2631,"2010":3096,"2011":3642,"2012":4285,"2013":5041,"2014":5931,"2015":6977,"2016":8209,"2017":9657,"2018":11361,"2019":13366,"2020":15725,"2021":18500,"Make":"Ford","Model":"Focus"},{"2006":2708,"2007":3186,"2008":3748,"2009":4409,"2010":5188,"2011":6103,"2012":7180,"2013":8447,"2014":9938,"2015":11692,"2016":13755,"2017":16182,"2018":19038,"2019":22398,"2020":26350,"2021":31000,"Make":"Ford","Model":"Mondeo 2,0"},{"2006":2184,"2007":2569,"2008":3023,"2009":3556,"2010":4184,"2011":4922,"2012":5790,"2013":6812,"2014":8014,"2015":9429,"2016":11093,"2017":13050,"2018":15353,"2019":18063,"2020":21250,"2021":25000,"Make":"Ford","Model":"Mondeo 2,5"},{"2006":1310,"2007":1542,"2008":1814,"2009":2134,"2010":2510,"2011":2953,"2012":3474,"2013":4087,"2014":4809,"2015":5657,"2016":6656,"2017":7830,"2018":9212,"2019":10838,"2020":12750,"2021":15000,"Make":"Ford","Model":"Figo"},{"2006":3057,"2007":3597,"2008":4232,"2009":4978,"2010":5857,"2011":6891,"2012":8107,"2013":9537,"2014":11220,"2015":13200,"2016":15530,"2017":18270,"2018":21494,"2019":25288,"2020":29750,"2021":35000,"Make":"Ford","Model":"Mustang"},{"2006":4106,"2007":4830,"2008":5683,"2009":6685,"2010":7865,"2011":9253,"2012":10886,"2013":12807,"2014":15067,"2015":17726,"2016":20854,"2017":24534,"2018":28864,"2019":33958,"2020":39950,"2021":47000,"Make":"Ford","Model":"Exporer"},{"2006":2140,"2007":2518,"2008":2962,"2009":3485,"2010":4100,"2011":4823,"2012":5675,"2013":6676,"2014":7854,"2015":9240,"2016":10871,"2017":12789,"2018":15046,"2019":17701,"2020":20825,"2021":24500,"Make":"Ford","Model":"Kuga 2,5"},{"2006":2446,"2007":2878,"2008":3385,"2009":3983,"2010":4686,"2011":5512,"2012":6485,"2013":7630,"2014":8976,"2015":10560,"2016":12424,"2017":14616,"2018":17196,"2019":20230,"2020":23800,"2021":28000,"Make":"Ford","Model":"Kuga 1,5"},{"2006":1572,"2007":1850,"2008":2176,"2009":2560,"2010":3012,"2011":3544,"2012":4169,"2013":4905,"2014":5770,"2015":6789,"2016":7987,"2017":9396,"2018":11054,"2019":13005,"2020":15300,"2021":18000,"Make":"Ford","Model":"EcoSport"},{"2006":1616,"2007":1901,"2008":2237,"2009":2631,"2010":3096,"2011":3642,"2012":4285,"2013":5041,"2014":5931,"2015":6977,"2016":8209,"2017":9657,"2018":11361,"2019":13366,"2020":15725,"2021":18500,"Make":"Ford","Model":"Focus Универсал"},{"2006":1834,"2007":2158,"2008":2539,"2009":2987,"2010":3514,"2011":4134,"2012":4864,"2013":5722,"2014":6732,"2015":7920,"2016":9318,"2017":10962,"2018":12897,"2019":15173,"2020":17850,"2021":21000,"Make":"Ford","Model":"S-Max"},{"2006":2097,"2007":2466,"2008":2902,"2009":3414,"2010":4016,"2011":4725,"2012":5559,"2013":6540,"2014":7694,"2015":9052,"2016":10649,"2017":12528,"2018":14739,"2019":17340,"2020":20400,"2021":24000,"Make":"Ford","Model":"Galaxy 2,0"},{"2006":2009,"2007":2364,"2008":2781,"2009":3272,"2010":3849,"2011":4528,"2012":5327,"2013":6267,"2014":7373,"2015":8674,"2016":10205,"2017":12006,"2018":14125,"2019":16618,"2020":19550,"2021":23000,"Make":"Ford","Model":"Galaxy 2,3"},{"2006":1922,"2007":2261,"2008":2660,"2009":3129,"2010":3682,"2011":4331,"2012":5096,"2013":5995,"2014":7053,"2015":8297,"2016":9762,"2017":11484,"2018":13511,"2019":15895,"2020":18700,"2021":22000,"Make":"Ford","Model":"Tourneo"},{"2006":2359,"2007":2775,"2008":3264,"2009":3841,"2010":4518,"2011":5316,"2012":6254,"2013":7357,"2014":8656,"2015":10183,"2016":11980,"2017":14094,"2018":16581,"2019":19508,"2020":22950,"2021":27000,"Make":"Ford","Model":"Edge"},{"2006":8299,"2007":9763,"2008":11486,"2009":13513,"2010":15898,"2011":18703,"2012":22004,"2013":25887,"2014":30455,"2015":35829,"2016":42152,"2017":49591,"2018":58342,"2019":68638,"2020":80750,"2021":95000,"Make":"Ford","Model":"Raptor"},{"2006":2708,"2007":3186,"2008":3748,"2009":4409,"2010":5188,"2011":6103,"2012":7180,"2013":8447,"2014":9938,"2015":11692,"2016":13755,"2017":16182,"2018":19038,"2019":22398,"2020":26350,"2021":31000,"Make":"Ford","Model":"Ranger"},{"2006":611,"2007":719,"2008":846,"2009":996,"2010":1171,"2011":1378,"2012":1621,"2013":1907,"2014":2244,"2015":2640,"2016":3106,"2017":3654,"2018":4299,"2019":5058,"2020":5950,"2021":7000,"Make":"Geely","Model":"MK"},{"2006":1223,"2007":1439,"2008":1693,"2009":1991,"2010":2343,"2011":2756,"2012":3243,"2013":3815,"2014":4488,"2015":5280,"2016":6212,"2017":7308,"2018":8598,"2019":10115,"2020":11900,"2021":14000,"Make":"Geely","Model":"Emgrand 7"},{"2006":2271,"2007":2672,"2008":3144,"2009":3698,"2010":4351,"2011":5119,"2012":6022,"2013":7085,"2014":8335,"2015":9806,"2016":11536,"2017":13572,"2018":15967,"2019":18785,"2020":22100,"2021":26000,"Make":"Geely","Model":"Emgrand GT 1,8"},{"2006":1922,"2007":2261,"2008":2660,"2009":3129,"2010":3682,"2011":4331,"2012":5096,"2013":5995,"2014":7053,"2015":8297,"2016":9762,"2017":11484,"2018":13511,"2019":15895,"2020":18700,"2021":22000,"Make":"Geely","Model":"Emgrand GT 2,4"},{"2006":1485,"2007":1747,"2008":2055,"2009":2418,"2010":2845,"2011":3347,"2012":3937,"2013":4632,"2014":5450,"2015":6412,"2016":7543,"2017":8874,"2018":10440,"2019":12283,"2020":14450,"2021":17000,"Make":"Geely","Model":"Atlas 2,0"},{"2006":1834,"2007":2158,"2008":2539,"2009":2987,"2010":3514,"2011":4134,"2012":4864,"2013":5722,"2014":6732,"2015":7920,"2016":9318,"2017":10962,"2018":12897,"2019":15173,"2020":17850,"2021":21000,"Make":"Geely","Model":"Atlas 2,4"},{"2006":1136,"2007":1336,"2008":1572,"2009":1849,"2010":2175,"2011":2559,"2012":3011,"2013":3542,"2014":4168,"2015":4903,"2016":5768,"2017":6786,"2018":7984,"2019":9393,"2020":11050,"2021":13000,"Make":"Geely","Model":"Emgrand X7 1,8"},{"2006":1179,"2007":1387,"2008":1632,"2009":1920,"2010":2259,"2011":2658,"2012":3127,"2013":3679,"2014":4328,"2015":5092,"2016":5990,"2017":7047,"2018":8291,"2019":9754,"2020":11475,"2021":13500,"Make":"Geely","Model":"Emgrand X7 2,0"},{"2006":1354,"2007":1593,"2008":1874,"2009":2205,"2010":2594,"2011":3052,"2012":3590,"2013":4224,"2014":4969,"2015":5846,"2016":6877,"2017":8091,"2018":9519,"2019":11199,"2020":13175,"2021":15500,"Make":"Geely","Model":"Emgrand X7 2,4"},{"2006":2717,"2007":3196,"2008":3760,"2009":4424,"2010":5204,"2011":6123,"2012":7203,"2013":8474,"2014":9970,"2015":11729,"2016":13799,"2017":16234,"2018":19099,"2019":22470,"2020":26435,"2021":31100,"Make":"Genesis","Model":"G70"},{"2006":4804,"2007":5652,"2008":6650,"2009":7823,"2010":9204,"2011":10828,"2012":12739,"2013":14987,"2014":17632,"2015":20743,"2016":24404,"2017":28710,"2018":33777,"2019":39738,"2020":46750,"2021":55000,"Make":"Genesis","Model":"GV80"},{"2006":6115,"2007":7194,"2008":8463,"2009":9957,"2010":11714,"2011":13781,"2012":16213,"2013":19074,"2014":22440,"2015":26400,"2016":31059,"2017":36540,"2018":42989,"2019":50575,"2020":59500,"2021":70000,"Make":"GMC","Model":"Terrain"},{"2006":4804,"2007":5652,"2008":6650,"2009":7823,"2010":9204,"2011":10828,"2012":12739,"2013":14987,"2014":17632,"2015":20743,"2016":24404,"2017":28710,"2018":33777,"2019":39738,"2020":46750,"2021":55000,"Make":"GMC","Model":"Yukon"},{"2006":2097,"2007":2466,"2008":2902,"2009":3414,"2010":4016,"2011":4725,"2012":5559,"2013":6540,"2014":7694,"2015":9052,"2016":10649,"2017":12528,"2018":14739,"2019":17340,"2020":20400,"2021":24000,"Make":"Haval","Model":"F7"},{"2006":3494,"2007":4111,"2008":4836,"2009":5690,"2010":6694,"2011":7875,"2012":9265,"2013":10900,"2014":12823,"2015":15086,"2016":17748,"2017":20880,"2018":24565,"2019":28900,"2020":34000,"2021":40000,"Make":"Haval","Model":"H9"},{"2006":1747,"2007":2055,"2008":2418,"2009":2845,"2010":3347,"2011":3937,"2012":4632,"2013":5450,"2014":6412,"2015":7543,"2016":8874,"2017":10440,"2018":12283,"2019":14450,"2020":17000,"2021":20000,"Make":"Haval","Model":"H6"},{"2006":2009,"2007":2364,"2008":2781,"2009":3272,"2010":3849,"2011":4528,"2012":5327,"2013":6267,"2014":7373,"2015":8674,"2016":10205,"2017":12006,"2018":14125,"2019":16618,"2020":19550,"2021":23000,"Make":"Haval","Model":"H6 Coupe"},{"2006":1616,"2007":1901,"2008":2237,"2009":2631,"2010":3096,"2011":3642,"2012":4285,"2013":5041,"2014":5931,"2015":6977,"2016":8209,"2017":9657,"2018":11361,"2019":13366,"2020":15725,"2021":18500,"Make":"Haval","Model":"H2"},{"2006":1834,"2007":2158,"2008":2539,"2009":2987,"2010":3514,"2011":4134,"2012":4864,"2013":5722,"2014":6732,"2015":7920,"2016":9318,"2017":10962,"2018":12897,"2019":15173,"2020":17850,"2021":21000,"Make":"Honda","Model":"Accord 2,4"},{"2006":2228,"2007":2621,"2008":3083,"2009":3627,"2010":4267,"2011":5020,"2012":5906,"2013":6949,"2014":8175,"2015":9617,"2016":11314,"2017":13311,"2018":15660,"2019":18424,"2020":21675,"2021":25500,"Make":"Honda","Model":"Accord 3,5"},{"2006":1310,"2007":1542,"2008":1814,"2009":2134,"2010":2510,"2011":2953,"2012":3474,"2013":4087,"2014":4809,"2015":5657,"2016":6656,"2017":7830,"2018":9212,"2019":10838,"2020":12750,"2021":15000,"Make":"Honda","Model":"Civic"},{"2006":1136,"2007":1336,"2008":1572,"2009":1849,"2010":2175,"2011":2559,"2012":3011,"2013":3542,"2014":4168,"2015":4903,"2016":5768,"2017":6786,"2018":7984,"2019":9393,"2020":11050,"2021":13000,"Make":"Honda","Model":"Jazz"},{"2006":2446,"2007":2878,"2008":3385,"2009":3983,"2010":4686,"2011":5512,"2012":6485,"2013":7630,"2014":8976,"2015":10560,"2016":12424,"2017":14616,"2018":17196,"2019":20230,"2020":23800,"2021":28000,"Make":"Honda","Model":"Crosstour"},{"2006":1834,"2007":2158,"2008":2539,"2009":2987,"2010":3514,"2011":4134,"2012":4864,"2013":5722,"2014":6732,"2015":7920,"2016":9318,"2017":10962,"2018":12897,"2019":15173,"2020":17850,"2021":21000,"Make":"Honda","Model":"CR-Z"},{"2006":2359,"2007":2775,"2008":3264,"2009":3841,"2010":4518,"2011":5316,"2012":6254,"2013":7357,"2014":8656,"2015":10183,"2016":11980,"2017":14094,"2018":16581,"2019":19508,"2020":22950,"2021":27000,"Make":"Honda","Model":"CR-V"},{"2006":3844,"2007":4522,"2008":5320,"2009":6259,"2010":7363,"2011":8662,"2012":10191,"2013":11990,"2014":14105,"2015":16595,"2016":19523,"2017":22968,"2018":27022,"2019":31790,"2020":37400,"2021":44000,"Make":"Honda","Model":"Pilot"},{"2006":2883,"2007":3391,"2008":3990,"2009":4694,"2010":5522,"2011":6497,"2012":7643,"2013":8992,"2014":10579,"2015":12446,"2016":14642,"2017":17226,"2018":20266,"2019":23843,"2020":28050,"2021":33000,"Make":"Honda","Model":"Odyssey"},{"2006":2009,"2007":2364,"2008":2781,"2009":3272,"2010":3849,"2011":4528,"2012":5327,"2013":6267,"2014":7373,"2015":8674,"2016":10205,"2017":12006,"2018":14125,"2019":16618,"2020":19550,"2021":23000,"Make":"Honda","Model":"HR-V"},{"2006":2184,"2007":2569,"2008":3023,"2009":3556,"2010":4184,"2011":4922,"2012":5790,"2013":6812,"2014":8014,"2015":9429,"2016":11093,"2017":13050,"2018":15353,"2019":18063,"2020":21250,"2021":25000,"Make":"Honda","Model":"FR-V"},{"2006":4106,"2007":4830,"2008":5683,"2009":6685,"2010":7865,"2011":9253,"2012":10886,"2013":12807,"2014":15067,"2015":17726,"2016":20854,"2017":24534,"2018":28864,"2019":33958,"2020":39950,"2021":47000,"Make":"Honda","Model":"Elysion"},{"2006":6256,"2007":7360,"2008":8659,"2009":10187,"2010":11985,"2011":14100,"2012":"","2013":"","2014":"","2015":"","2016":"","2017":"","2018":"","2019":"","2020":"","2021":"","Make":"Hummer","Model":"H1"},{"2006":6123,"2007":7204,"2008":8475,"2009":9971,"2010":11730,"2011":13800,"2012":"","2013":"","2014":"","2015":"","2016":"","2017":"","2018":"","2019":"","2020":"","2021":"","Make":"Hummer","Model":"H2"},{"2006":5990,"2007":7047,"2008":8291,"2009":9754,"2010":11475,"2011":13500,"2012":"","2013":"","2014":"","2015":"","2016":"","2017":"","2018":"","2019":"","2020":"","2021":"","Make":"Hummer","Model":"H3"},{"2006":1965,"2007":2312,"2008":2720,"2009":3200,"2010":3765,"2011":4430,"2012":5211,"2013":6131,"2014":7213,"2015":8486,"2016":9983,"2017":11745,"2018":13818,"2019":16256,"2020":19125,"2021":22500,"Make":"Hyundai","Model":"Veloster"},{"2006":1354,"2007":1593,"2008":1874,"2009":2205,"2010":2594,"2011":3052,"2012":3590,"2013":4224,"2014":4969,"2015":5846,"2016":6877,"2017":8091,"2018":9519,"2019":11199,"2020":13175,"2021":15500,"Make":"Hyundai","Model":"i 10 1,25"},{"2006":1223,"2007":1439,"2008":1693,"2009":1991,"2010":2343,"2011":2756,"2012":3243,"2013":3815,"2014":4488,"2015":5280,"2016":6212,"2017":7308,"2018":8598,"2019":10115,"2020":11900,"2021":14000,"Make":"Hyundai","Model":"i 10 1,0"},{"2006":1310,"2007":1542,"2008":1814,"2009":2134,"2010":2510,"2011":2953,"2012":3474,"2013":4087,"2014":4809,"2015":5657,"2016":6656,"2017":7830,"2018":9212,"2019":10838,"2020":12750,"2021":15000,"Make":"Hyundai","Model":"i 20"},{"2006":952,"2007":1120,"2008":1318,"2009":1550,"2010":1824,"2011":2146,"2012":2525,"2013":2970,"2014":3494,"2015":4111,"2016":4836,"2017":5690,"2018":6694,"2019":7875,"2020":9265,"2021":10900,"Make":"Hyundai","Model":"i 30"},{"2006":1433,"2007":1685,"2008":1983,"2009":2333,"2010":2744,"2011":3229,"2012":3799,"2013":4469,"2014":5257,"2015":6185,"2016":7277,"2017":8561,"2018":10072,"2019":11849,"2020":13940,"2021":16400,"Make":"Hyundai","Model":"i 40"},{"2006":1529,"2007":1798,"2008":2116,"2009":2489,"2010":2929,"2011":3445,"2012":4053,"2013":4769,"2014":5610,"2015":6600,"2016":7765,"2017":9135,"2018":10747,"2019":12644,"2020":14875,"2021":17500,"Make":"Hyundai","Model":"ix 20"},{"2006":1179,"2007":1387,"2008":1632,"2009":1920,"2010":2259,"2011":2658,"2012":3127,"2013":3679,"2014":4328,"2015":5092,"2016":5990,"2017":7047,"2018":8291,"2019":9754,"2020":11475,"2021":13500,"Make":"Hyundai","Model":"Getz"},{"2006":1922,"2007":2261,"2008":2660,"2009":3129,"2010":3682,"2011":4331,"2012":5096,"2013":5995,"2014":7053,"2015":8297,"2016":9762,"2017":11484,"2018":13511,"2019":15895,"2020":18700,"2021":22000,"Make":"Hyundai","Model":"Ioniq Comfort (Hybrid)"},{"2006":2184,"2007":2569,"2008":3023,"2009":3556,"2010":4184,"2011":4922,"2012":5790,"2013":6812,"2014":8014,"2015":9429,"2016":11093,"2017":13050,"2018":15353,"2019":18063,"2020":21250,"2021":25000,"Make":"Hyundai","Model":"Ioniq Style (Hybrid)"},{"2006":1048,"2007":1233,"2008":1451,"2009":1707,"2010":2008,"2011":2362,"2012":2779,"2013":3270,"2014":3847,"2015":4526,"2016":5324,"2017":6264,"2018":7370,"2019":8670,"2020":10200,"2021":12000,"Make":"Hyundai","Model":"Verna"},{"2006":970,"2007":1141,"2008":1342,"2009":1579,"2010":1858,"2011":2185,"2012":2571,"2013":3025,"2014":3558,"2015":4186,"2016":4925,"2017":5794,"2018":6817,"2019":8020,"2020":9435,"2021":11100,"Make":"Hyundai","Model":"Accent (Solaris) 1,4"},{"2006":1057,"2007":1244,"2008":1463,"2009":1721,"2010":2025,"2011":2382,"2012":2803,"2013":3297,"2014":3879,"2015":4564,"2016":5369,"2017":6316,"2018":7431,"2019":8742,"2020":10285,"2021":12100,"Make":"Hyundai","Model":"Accent (Solaris) 1,6"},{"2006":1232,"2007":1449,"2008":1705,"2009":2006,"2010":2360,"2011":2776,"2012":3266,"2013":3842,"2014":4520,"2015":5318,"2016":6256,"2017":7360,"2018":8659,"2019":10187,"2020":11985,"2021":14100,"Make":"Hyundai","Model":"Sonata 2,0"},{"2006":1345,"2007":1583,"2008":1862,"2009":2191,"2010":2577,"2011":3032,"2012":3567,"2013":4196,"2014":4937,"2015":5808,"2016":6833,"2017":8039,"2018":9458,"2019":11127,"2020":13090,"2021":15400,"Make":"Hyundai","Model":"Sonata 2,4"},{"2006":900,"2007":1059,"2008":1245,"2009":1465,"2010":1724,"2011":2028,"2012":2386,"2013":2807,"2014":3302,"2015":3885,"2016":4570,"2017":5377,"2018":6325,"2019":7442,"2020":8755,"2021":10300,"Make":"Hyundai","Model":"Elantra 1,6"},{"2006":987,"2007":1161,"2008":1366,"2009":1607,"2010":1891,"2011":2225,"2012":2617,"2013":3079,"2014":3623,"2015":4262,"2016":5014,"2017":5899,"2018":6940,"2019":8164,"2020":9605,"2021":11300,"Make":"Hyundai","Model":"Elantra 2,0"},{"2006":3319,"2007":3905,"2008":4594,"2009":5405,"2010":6359,"2011":7481,"2012":8801,"2013":10355,"2014":12182,"2015":14332,"2016":16861,"2017":19836,"2018":23337,"2019":27455,"2020":32300,"2021":38000,"Make":"Hyundai","Model":"Equus"},{"2006":1791,"2007":2107,"2008":2479,"2009":2916,"2010":3431,"2011":4036,"2012":4748,"2013":5586,"2014":6572,"2015":7732,"2016":9096,"2017":10701,"2018":12590,"2019":14811,"2020":17425,"2021":20500,"Make":"Hyundai","Model":"Grandeur"},{"2006":1354,"2007":1593,"2008":1874,"2009":2205,"2010":2594,"2011":3052,"2012":3590,"2013":4224,"2014":4969,"2015":5846,"2016":6877,"2017":8091,"2018":9519,"2019":11199,"2020":13175,"2021":15500,"Make":"Hyundai","Model":"IX 35"},{"2006":1572,"2007":1850,"2008":2176,"2009":2560,"2010":3012,"2011":3544,"2012":4169,"2013":4905,"2014":5770,"2015":6789,"2016":7987,"2017":9396,"2018":11054,"2019":13005,"2020":15300,"2021":18000,"Make":"Hyundai","Model":"i 30 (Universal)"},{"2006":1922,"2007":2261,"2008":2660,"2009":3129,"2010":3682,"2011":4331,"2012":5096,"2013":5995,"2014":7053,"2015":8297,"2016":9762,"2017":11484,"2018":13511,"2019":15895,"2020":18700,"2021":22000,"Make":"Hyundai","Model":"i 40 (Universal) 1,7 дизель"},{"2006":1747,"2007":2055,"2008":2418,"2009":2845,"2010":3347,"2011":3937,"2012":4632,"2013":5450,"2014":6412,"2015":7543,"2016":8874,"2017":10440,"2018":12283,"2019":14450,"2020":17000,"2021":20000,"Make":"Hyundai","Model":"i 40 (Universal) 2,0"},{"2006":1747,"2007":2055,"2008":2418,"2009":2845,"2010":3347,"2011":3937,"2012":4632,"2013":5450,"2014":6412,"2015":7543,"2016":8874,"2017":10440,"2018":12283,"2019":14450,"2020":17000,"2021":20000,"Make":"Hyundai","Model":"Tucson 1,6"},{"2006":1354,"2007":1593,"2008":1874,"2009":2205,"2010":2594,"2011":3052,"2012":3590,"2013":4224,"2014":4969,"2015":5846,"2016":6877,"2017":8091,"2018":9519,"2019":11199,"2020":13175,"2021":15500,"Make":"Hyundai","Model":"Tucson 2,0"},{"2006":2097,"2007":2466,"2008":2902,"2009":3414,"2010":4016,"2011":4725,"2012":5559,"2013":6540,"2014":7694,"2015":9052,"2016":10649,"2017":12528,"2018":14739,"2019":17340,"2020":20400,"2021":24000,"Make":"Hyundai","Model":"Tucson N Line"},{"2006":1834,"2007":2158,"2008":2539,"2009":2987,"2010":3514,"2011":4134,"2012":4864,"2013":5722,"2014":6732,"2015":7920,"2016":9318,"2017":10962,"2018":12897,"2019":15173,"2020":17850,"2021":21000,"Make":"Hyundai","Model":"Santa Fe 2,0"},{"2006":1922,"2007":2261,"2008":2660,"2009":3129,"2010":3682,"2011":4331,"2012":5096,"2013":5995,"2014":7053,"2015":8297,"2016":9762,"2017":11484,"2018":13511,"2019":15895,"2020":18700,"2021":22000,"Make":"Hyundai","Model":"Santa Fe 2,2"},{"2006":1878,"2007":2210,"2008":2599,"2009":3058,"2010":3598,"2011":4233,"2012":4980,"2013":5859,"2014":6892,"2015":8109,"2016":9540,"2017":11223,"2018":13204,"2019":15534,"2020":18275,"2021":21500,"Make":"Hyundai","Model":"Santa Fe 3,3"},{"2006":1642,"2007":1932,"2008":2273,"2009":2674,"2010":3146,"2011":3701,"2012":4354,"2013":5123,"2014":6027,"2015":7090,"2016":8342,"2017":9814,"2018":11546,"2019":13583,"2020":15980,"2021":18800,"Make":"Hyundai","Model":"Santa Fe 2,5"},{"2006":1782,"2007":2097,"2008":2466,"2009":2902,"2010":3414,"2011":4016,"2012":4725,"2013":5559,"2014":6540,"2015":7694,"2016":9052,"2017":10649,"2018":12528,"2019":14739,"2020":17340,"2021":20400,"Make":"Hyundai","Model":"Santa Fe 3,5"},{"2006":1363,"2007":1603,"2008":1886,"2009":2219,"2010":2611,"2011":3071,"2012":3613,"2013":4251,"2014":5001,"2015":5884,"2016":6922,"2017":8143,"2018":9580,"2019":11271,"2020":13260,"2021":15600,"Make":"Hyundai","Model":"Creta 1,6"},{"2006":1424,"2007":1675,"2008":1971,"2009":2319,"2010":2728,"2011":3209,"2012":3775,"2013":4442,"2014":5225,"2015":6148,"2016":7232,"2017":8509,"2018":10010,"2019":11777,"2020":13855,"2021":16300,"Make":"Hyundai","Model":"Creta 2,0"},{"2006":1485,"2007":1747,"2008":2055,"2009":2418,"2010":2845,"2011":3347,"2012":3937,"2013":4632,"2014":5450,"2015":6412,"2016":7543,"2017":8874,"2018":10440,"2019":12283,"2020":14450,"2021":17000,"Make":"Hyundai","Model":"H-1"},{"2006":1703,"2007":2004,"2008":2358,"2009":2774,"2010":3263,"2011":3839,"2012":4517,"2013":5314,"2014":6251,"2015":7354,"2016":8652,"2017":10179,"2018":11975,"2019":14089,"2020":16575,"2021":19500,"Make":"Hyundai","Model":"Kona"},{"2006":1861,"2007":2189,"2008":2575,"2009":3030,"2010":3564,"2011":4193,"2012":4933,"2013":5804,"2014":6828,"2015":8033,"2016":9451,"2017":11119,"2018":13081,"2019":15389,"2020":18105,"2021":21300,"Make":"Hyundai","Model":"Polisade"},{"2006":2359,"2007":2775,"2008":3264,"2009":3841,"2010":4518,"2011":5316,"2012":6254,"2013":7357,"2014":8656,"2015":10183,"2016":11980,"2017":14094,"2018":16581,"2019":19508,"2020":22950,"2021":27000,"Make":"Hyundai","Model":"Veracruz"},{"2006":2271,"2007":2672,"2008":3144,"2009":3698,"2010":4351,"2011":5119,"2012":6022,"2013":7085,"2014":8335,"2015":9806,"2016":11536,"2017":13572,"2018":15967,"2019":18785,"2020":22100,"2021":26000,"Make":"Hyundai","Model":"ix55"},{"2006":1572,"2007":1850,"2008":2176,"2009":2560,"2010":3012,"2011":3544,"2012":4169,"2013":4905,"2014":5770,"2015":6789,"2016":7987,"2017":9396,"2018":11054,"2019":13005,"2020":15300,"2021":18000,"Make":"Hyundai","Model":"Matrix"},{"2006":2009,"2007":2364,"2008":2781,"2009":3272,"2010":3849,"2011":4528,"2012":5327,"2013":6267,"2014":7373,"2015":8674,"2016":10205,"2017":12006,"2018":14125,"2019":16618,"2020":19550,"2021":23000,"Make":"Hyundai","Model":"Terracan"},{"2006":1529,"2007":1798,"2008":2116,"2009":2489,"2010":2929,"2011":3445,"2012":4053,"2013":4769,"2014":5610,"2015":6600,"2016":7765,"2017":9135,"2018":10747,"2019":12644,"2020":14875,"2021":17500,"Make":"Hyundai","Model":"Venue"},{"2006":2970,"2007":3494,"2008":4111,"2009":4836,"2010":5690,"2011":6694,"2012":7875,"2013":9265,"2014":10900,"2015":12823,"2016":15086,"2017":17748,"2018":20880,"2019":24565,"2020":28900,"2021":34000,"Make":"Infiniti","Model":"Q30 1,6"},{"2006":3319,"2007":3905,"2008":4594,"2009":5405,"2010":6359,"2011":7481,"2012":8801,"2013":10355,"2014":12182,"2015":14332,"2016":16861,"2017":19836,"2018":23337,"2019":27455,"2020":32300,"2021":38000,"Make":"Infiniti","Model":"Q30 2,0"},{"2006":2795,"2007":3289,"2008":3869,"2009":4552,"2010":5355,"2011":6300,"2012":7412,"2013":8720,"2014":10258,"2015":12069,"2016":14199,"2017":16704,"2018":19652,"2019":23120,"2020":27200,"2021":32000,"Make":"Infiniti","Model":"Q50 2,0"},{"2006":4193,"2007":4933,"2008":5803,"2009":6828,"2010":8032,"2011":9450,"2012":11118,"2013":13080,"2014":15388,"2015":18103,"2016":21298,"2017":25056,"2018":29478,"2019":34680,"2020":40800,"2021":48000,"Make":"Infiniti","Model":"Q50 3,0"},{"2006":4368,"2007":5138,"2008":6045,"2009":7112,"2010":8367,"2011":9844,"2012":11581,"2013":13625,"2014":16029,"2015":18857,"2016":22185,"2017":26100,"2018":30706,"2019":36125,"2020":42500,"2021":50000,"Make":"Infiniti","Model":"Q60 3,0"},{"2006":4630,"2007":5447,"2008":6408,"2009":7539,"2010":8869,"2011":10434,"2012":12276,"2013":14442,"2014":16991,"2015":19989,"2016":23516,"2017":27666,"2018":32549,"2019":38293,"2020":45050,"2021":53000,"Make":"Infiniti","Model":"Q70"},{"2006":2795,"2007":3289,"2008":3869,"2009":4552,"2010":5355,"2011":6300,"2012":7412,"2013":8720,"2014":10258,"2015":12069,"2016":14199,"2017":16704,"2018":19652,"2019":23120,"2020":27200,"2021":32000,"Make":"Infiniti","Model":"QX 30"},{"2006":3145,"2007":3700,"2008":4353,"2009":5121,"2010":6024,"2011":7087,"2012":8338,"2013":9810,"2014":11541,"2015":13577,"2016":15973,"2017":18792,"2018":22109,"2019":26010,"2020":30600,"2021":36000,"Make":"Infiniti","Model":"QX4"},{"2006":3669,"2007":4316,"2008":5078,"2009":5974,"2010":7028,"2011":8269,"2012":9728,"2013":11445,"2014":13464,"2015":15840,"2016":18636,"2017":21924,"2018":25793,"2019":30345,"2020":35700,"2021":42000,"Make":"Infiniti","Model":"QX 50"},{"2006":4193,"2007":4933,"2008":5803,"2009":6828,"2010":8032,"2011":9450,"2012":11118,"2013":13080,"2014":15388,"2015":18103,"2016":21298,"2017":25056,"2018":29478,"2019":34680,"2020":40800,"2021":48000,"Make":"Infiniti","Model":"QX 60 2,5, Гибрид"},{"2006":3844,"2007":4522,"2008":5320,"2009":6259,"2010":7363,"2011":8662,"2012":10191,"2013":11990,"2014":14105,"2015":16595,"2016":19523,"2017":22968,"2018":27022,"2019":31790,"2020":37400,"2021":44000,"Make":"Infiniti","Model":"QX 60 3,5"},{"2006":4018,"2007":4727,"2008":5562,"2009":6543,"2010":7698,"2011":9056,"2012":10654,"2013":12535,"2014":14747,"2015":17349,"2016":20410,"2017":24012,"2018":28250,"2019":33235,"2020":39100,"2021":46000,"Make":"Infiniti","Model":"QX 70"},{"2006":6115,"2007":7194,"2008":8463,"2009":9957,"2010":11714,"2011":13781,"2012":16213,"2013":19074,"2014":22440,"2015":26400,"2016":31059,"2017":36540,"2018":42989,"2019":50575,"2020":59500,"2021":70000,"Make":"Infiniti","Model":"QX 80"},{"2006":3931,"2007":4625,"2008":5441,"2009":6401,"2010":7530,"2011":8859,"2012":10423,"2013":12262,"2014":14426,"2015":16972,"2016":19967,"2017":23490,"2018":27636,"2019":32513,"2020":38250,"2021":45000,"Make":"Infiniti","Model":"FX 35"},{"2006":4193,"2007":4933,"2008":5803,"2009":6828,"2010":8032,"2011":9450,"2012":11118,"2013":13080,"2014":15388,"2015":18103,"2016":21298,"2017":25056,"2018":29478,"2019":34680,"2020":40800,"2021":48000,"Make":"Infiniti","Model":"FX 50"},{"2006":1223,"2007":1439,"2008":1693,"2009":1991,"2010":2343,"2011":2756,"2012":3243,"2013":3815,"2014":4488,"2015":5280,"2016":6212,"2017":7308,"2018":8598,"2019":10115,"2020":11900,"2021":14000,"Make":"JAC","Model":"S3"},{"2006":1398,"2007":1644,"2008":1934,"2009":2276,"2010":2677,"2011":3150,"2012":3706,"2013":4360,"2014":5129,"2015":6034,"2016":7099,"2017":8352,"2018":9826,"2019":11560,"2020":13600,"2021":16000,"Make":"JAC","Model":"S5"},{"2006":4193,"2007":4933,"2008":5803,"2009":6828,"2010":8032,"2011":9450,"2012":11118,"2013":13080,"2014":15388,"2015":18103,"2016":21298,"2017":25056,"2018":29478,"2019":34680,"2020":40800,"2021":48000,"Make":"Jaguar","Model":"XJ 2,0"},{"2006":6988,"2007":8222,"2008":9672,"2009":11379,"2010":13387,"2011":15750,"2012":18529,"2013":21799,"2014":25646,"2015":30172,"2016":35496,"2017":41761,"2018":49130,"2019":57800,"2020":68000,"2021":80000,"Make":"Jaguar","Model":"XJ 3,0"},{"2006":4368,"2007":5138,"2008":6045,"2009":7112,"2010":8367,"2011":9844,"2012":11581,"2013":13625,"2014":16029,"2015":18857,"2016":22185,"2017":26100,"2018":30706,"2019":36125,"2020":42500,"2021":50000,"Make":"Jaguar","Model":"XF 2,0"},{"2006":5067,"2007":5961,"2008":7013,"2009":8250,"2010":9706,"2011":11419,"2012":13434,"2013":15804,"2014":18593,"2015":21875,"2016":25735,"2017":30276,"2018":35619,"2019":41905,"2020":49300,"2021":58000,"Make":"Jaguar","Model":"XF 2,0 4WD"},{"2006":4804,"2007":5652,"2008":6650,"2009":7823,"2010":9204,"2011":10828,"2012":12739,"2013":14987,"2014":17632,"2015":20743,"2016":24404,"2017":28710,"2018":33777,"2019":39738,"2020":46750,"2021":55000,"Make":"Jaguar","Model":"F-type Coupe 3,0"},{"2006":8299,"2007":9763,"2008":11486,"2009":13513,"2010":15898,"2011":18703,"2012":22004,"2013":25887,"2014":30455,"2015":35829,"2016":42152,"2017":49591,"2018":58342,"2019":68638,"2020":80750,"2021":95000,"Make":"Jaguar","Model":"F-type Coupe Sport 3,0"},{"2006":7425,"2007":8735,"2008":10277,"2009":12091,"2010":14224,"2011":16734,"2012":19687,"2013":23162,"2014":27249,"2015":32058,"2016":37715,"2017":44371,"2018":52201,"2019":61413,"2020":72250,"2021":85000,"Make":"Jaguar","Model":"F-type Coupe 5,0"},{"2006":6290,"2007":7399,"2008":8705,"2009":10241,"2010":12049,"2011":14175,"2012":16676,"2013":19619,"2014":23082,"2015":27155,"2016":31947,"2017":37584,"2018":44217,"2019":52020,"2020":61200,"2021":72000,"Make":"Jaguar","Model":"F-type"},{"2006":3101,"2007":3648,"2008":4292,"2009":5050,"2010":5941,"2011":6989,"2012":8222,"2013":9673,"2014":11380,"2015":13389,"2016":15752,"2017":18531,"2018":21801,"2019":25649,"2020":30175,"2021":35500,"Make":"Jaguar","Model":"XE"},{"2006":5525,"2007":6500,"2008":7647,"2009":8997,"2010":10584,"2011":12452,"2012":14650,"2013":17235,"2014":20277,"2015":23855,"2016":28064,"2017":33017,"2018":38843,"2019":45698,"2020":53763,"2021":63250,"Make":"Jaguar","Model":"F-pace 2,0"},{"2006":6530,"2007":7682,"2008":9038,"2009":10633,"2010":12509,"2011":14716,"2012":17313,"2013":20369,"2014":23963,"2015":28192,"2016":33167,"2017":39020,"2018":45906,"2019":54007,"2020":63538,"2021":74750,"Make":"Jaguar","Model":"F-pace 3,0"},{"2006":5023,"2007":5909,"2008":6952,"2009":8179,"2010":9622,"2011":11320,"2012":13318,"2013":15668,"2014":18433,"2015":21686,"2016":25513,"2017":30015,"2018":35312,"2019":41544,"2020":48875,"2021":57500,"Make":"Jaguar","Model":"E-pace 2,0"},{"2006":4848,"2007":5704,"2008":6710,"2009":7894,"2010":9288,"2011":10927,"2012":12855,"2013":15123,"2014":17792,"2015":20932,"2016":24626,"2017":28971,"2018":34084,"2019":40099,"2020":47175,"2021":55500,"Make":"Jaguar","Model":"E-pace P250"},{"2006":5512,"2007":6485,"2008":7629,"2009":8975,"2010":10559,"2011":12423,"2012":14615,"2013":17194,"2014":20228,"2015":23798,"2016":27998,"2017":32939,"2018":38751,"2019":45590,"2020":53635,"2021":63100,"Make":"Jaguar","Model":"E-pace P300"},{"2006":4525,"2007":5323,"2008":6263,"2009":7368,"2010":8668,"2011":10198,"2012":11998,"2013":14115,"2014":16606,"2015":19536,"2016":22984,"2017":27040,"2018":31812,"2019":37426,"2020":44030,"2021":51800,"Make":"Jaguar","Model":"E-pace D150"},{"2006":4647,"2007":5467,"2008":6432,"2009":7567,"2010":8903,"2011":10474,"2012":12322,"2013":14496,"2014":17055,"2015":20064,"2016":23605,"2017":27771,"2018":32671,"2019":38437,"2020":45220,"2021":53200,"Make":"Jaguar","Model":"E-pace D180"},{"2006":5101,"2007":6002,"2008":7061,"2009":8307,"2010":9773,"2011":11497,"2012":13526,"2013":15913,"2014":18722,"2015":22026,"2016":25912,"2017":30485,"2018":35865,"2019":42194,"2020":49640,"2021":58400,"Make":"Jaguar","Model":"E-pace D240"},{"2006":3494,"2007":4111,"2008":4836,"2009":5690,"2010":6694,"2011":7875,"2012":9265,"2013":10900,"2014":12823,"2015":15086,"2016":17748,"2017":20880,"2018":24565,"2019":28900,"2020":34000,"2021":40000,"Make":"Jeep","Model":"Wrangler 3 двери"},{"2006":3931,"2007":4625,"2008":5441,"2009":6401,"2010":7530,"2011":8859,"2012":10423,"2013":12262,"2014":14426,"2015":16972,"2016":19967,"2017":23490,"2018":27636,"2019":32513,"2020":38250,"2021":45000,"Make":"Jeep","Model":"Wrangler 5 двери"},{"2006":2446,"2007":2878,"2008":3385,"2009":3983,"2010":4686,"2011":5512,"2012":6485,"2013":7630,"2014":8976,"2015":10560,"2016":12424,"2017":14616,"2018":17196,"2019":20230,"2020":23800,"2021":28000,"Make":"Jeep","Model":"Renegade"},{"2006":2970,"2007":3494,"2008":4111,"2009":4836,"2010":5690,"2011":6694,"2012":7875,"2013":9265,"2014":10900,"2015":12823,"2016":15086,"2017":17748,"2018":20880,"2019":24565,"2020":28900,"2021":34000,"Make":"Jeep","Model":"Compass"},{"2006":3494,"2007":4111,"2008":4836,"2009":5690,"2010":6694,"2011":7875,"2012":9265,"2013":10900,"2014":12823,"2015":15086,"2016":17748,"2017":20880,"2018":24565,"2019":28900,"2020":34000,"2021":40000,"Make":"Jeep","Model":"Cherokee 2,4"},{"2006":3582,"2007":4214,"2008":4957,"2009":5832,"2010":6861,"2011":8072,"2012":9496,"2013":11172,"2014":13144,"2015":15463,"2016":18192,"2017":21402,"2018":25179,"2019":29623,"2020":34850,"2021":41000,"Make":"Jeep","Model":"Cherokee 3,2"},{"2006":3582,"2007":4214,"2008":4957,"2009":5832,"2010":6861,"2011":8072,"2012":9496,"2013":11172,"2014":13144,"2015":15463,"2016":18192,"2017":21402,"2018":25179,"2019":29623,"2020":34850,"2021":41000,"Make":"Jeep","Model":"Grand Cherokee 3,0"},{"2006":3931,"2007":4625,"2008":5441,"2009":6401,"2010":7530,"2011":8859,"2012":10423,"2013":12262,"2014":14426,"2015":16972,"2016":19967,"2017":23490,"2018":27636,"2019":32513,"2020":38250,"2021":45000,"Make":"Jeep","Model":"Grand Cherokee 3,6"},{"2006":1485,"2007":1747,"2008":2055,"2009":2418,"2010":2845,"2011":3347,"2012":3937,"2013":4632,"2014":5450,"2015":6412,"2016":7543,"2017":8874,"2018":10440,"2019":12283,"2020":14450,"2021":17000,"Make":"Kia","Model":"Optima"},{"2006":874,"2007":1028,"2008":1209,"2009":1422,"2010":1673,"2011":1969,"2012":2316,"2013":2725,"2014":3206,"2015":3771,"2016":4437,"2017":5220,"2018":6141,"2019":7225,"2020":8500,"2021":10000,"Make":"Kia","Model":"Picanto 1,0"},{"2006":1048,"2007":1233,"2008":1451,"2009":1707,"2010":2008,"2011":2362,"2012":2779,"2013":3270,"2014":3847,"2015":4526,"2016":5324,"2017":6264,"2018":7370,"2019":8670,"2020":10200,"2021":12000,"Make":"Kia","Model":"Picanto 1,2"},{"2006":1965,"2007":2312,"2008":2720,"2009":3200,"2010":3765,"2011":4430,"2012":5211,"2013":6131,"2014":7213,"2015":8486,"2016":9983,"2017":11745,"2018":13818,"2019":16256,"2020":19125,"2021":22500,"Make":"Kia","Model":"Cadenza"},{"2006":1136,"2007":1336,"2008":1572,"2009":1849,"2010":2175,"2011":2559,"2012":3011,"2013":3542,"2014":4168,"2015":4903,"2016":5768,"2017":6786,"2018":7984,"2019":9393,"2020":11050,"2021":13000,"Make":"Kia","Model":"Venga 1,4"},{"2006":1310,"2007":1542,"2008":1814,"2009":2134,"2010":2510,"2011":2953,"2012":3474,"2013":4087,"2014":4809,"2015":5657,"2016":6656,"2017":7830,"2018":9212,"2019":10838,"2020":12750,"2021":15000,"Make":"Kia","Model":"Venga 1,6"},{"2006":1005,"2007":1182,"2008":1390,"2009":1636,"2010":1924,"2011":2264,"2012":2664,"2013":3134,"2014":3687,"2015":4337,"2016":5103,"2017":6003,"2018":7062,"2019":8309,"2020":9775,"2021":11500,"Make":"Kia","Model":"Rio 1,4"},{"2006":1223,"2007":1439,"2008":1693,"2009":1991,"2010":2343,"2011":2756,"2012":3243,"2013":3815,"2014":4488,"2015":5280,"2016":6212,"2017":7308,"2018":8598,"2019":10115,"2020":11900,"2021":14000,"Make":"Kia","Model":"Rio 1,6"},{"2006":1485,"2007":1747,"2008":2055,"2009":2418,"2010":2845,"2011":3347,"2012":3937,"2013":4632,"2014":5450,"2015":6412,"2016":7543,"2017":8874,"2018":10440,"2019":12283,"2020":14450,"2021":17000,"Make":"Kia","Model":"Cerato 1,6"},{"2006":1616,"2007":1901,"2008":2237,"2009":2631,"2010":3096,"2011":3642,"2012":4285,"2013":5041,"2014":5931,"2015":6977,"2016":8209,"2017":9657,"2018":11361,"2019":13366,"2020":15725,"2021":18500,"Make":"Kia","Model":"Cerato 2,0"},{"2006":1485,"2007":1747,"2008":2055,"2009":2418,"2010":2845,"2011":3347,"2012":3937,"2013":4632,"2014":5450,"2015":6412,"2016":7543,"2017":8874,"2018":10440,"2019":12283,"2020":14450,"2021":17000,"Make":"Kia","Model":"Ceed SW"},{"2006":3931,"2007":4625,"2008":5441,"2009":6401,"2010":7530,"2011":8859,"2012":10423,"2013":12262,"2014":14426,"2015":16972,"2016":19967,"2017":23490,"2018":27636,"2019":32513,"2020":38250,"2021":45000,"Make":"Kia","Model":"Quoris"},{"2006":2883,"2007":3391,"2008":3990,"2009":4694,"2010":5522,"2011":6497,"2012":7643,"2013":8992,"2014":10579,"2015":12446,"2016":14642,"2017":17226,"2018":20266,"2019":23843,"2020":28050,"2021":33000,"Make":"Kia","Model":"Stinger 2,0"},{"2006":3931,"2007":4625,"2008":5441,"2009":6401,"2010":7530,"2011":8859,"2012":10423,"2013":12262,"2014":14426,"2015":16972,"2016":19967,"2017":23490,"2018":27636,"2019":32513,"2020":38250,"2021":45000,"Make":"Kia","Model":"Stinger 3,3"},{"2006":1747,"2007":2055,"2008":2418,"2009":2845,"2010":3347,"2011":3937,"2012":4632,"2013":5450,"2014":6412,"2015":7543,"2016":8874,"2017":10440,"2018":12283,"2019":14450,"2020":17000,"2021":20000,"Make":"Kia","Model":"Spectra"},{"2006":1747,"2007":2055,"2008":2418,"2009":2845,"2010":3347,"2011":3937,"2012":4632,"2013":5450,"2014":6412,"2015":7543,"2016":8874,"2017":10440,"2018":12283,"2019":14450,"2020":17000,"2021":20000,"Make":"Kia","Model":"Opirus"},{"2006":1660,"2007":1953,"2008":2297,"2009":2703,"2010":3180,"2011":3741,"2012":4401,"2013":5177,"2014":6091,"2015":7166,"2016":8430,"2017":9918,"2018":11668,"2019":13728,"2020":16150,"2021":19000,"Make":"Kia","Model":"Sportage"},{"2006":2184,"2007":2569,"2008":3023,"2009":3556,"2010":4184,"2011":4922,"2012":5790,"2013":6812,"2014":8014,"2015":9429,"2016":11093,"2017":13050,"2018":15353,"2019":18063,"2020":21250,"2021":25000,"Make":"Kia","Model":"Sorento Prime 2,2 (дизель)"},{"2006":2097,"2007":2466,"2008":2902,"2009":3414,"2010":4016,"2011":4725,"2012":5559,"2013":6540,"2014":7694,"2015":9052,"2016":10649,"2017":12528,"2018":14739,"2019":17340,"2020":20400,"2021":24000,"Make":"Kia","Model":"Sorento Prime 2,4"},{"2006":1485,"2007":1747,"2008":2055,"2009":2418,"2010":2845,"2011":3347,"2012":3937,"2013":4632,"2014":5450,"2015":6412,"2016":7543,"2017":8874,"2018":10440,"2019":12283,"2020":14450,"2021":17000,"Make":"Kia","Model":"Soul"},{"2006":2271,"2007":2672,"2008":3144,"2009":3698,"2010":4351,"2011":5119,"2012":6022,"2013":7085,"2014":8335,"2015":9806,"2016":11536,"2017":13572,"2018":15967,"2019":18785,"2020":22100,"2021":26000,"Make":"Kia","Model":"Sedona (Carnival) EX"},{"2006":2795,"2007":3289,"2008":3869,"2009":4552,"2010":5355,"2011":6300,"2012":7412,"2013":8720,"2014":10258,"2015":12069,"2016":14199,"2017":16704,"2018":19652,"2019":23120,"2020":27200,"2021":32000,"Make":"Kia","Model":"Sedona (Carnival) SXL"},{"2006":1310,"2007":1542,"2008":1814,"2009":2134,"2010":2510,"2011":2953,"2012":3474,"2013":4087,"2014":4809,"2015":5657,"2016":6656,"2017":7830,"2018":9212,"2019":10838,"2020":12750,"2021":15000,"Make":"Kia","Model":"Carens"},{"2006":961,"2007":1130,"2008":1330,"2009":1565,"2010":1841,"2011":2166,"2012":2548,"2013":2997,"2014":3526,"2015":4149,"2016":4881,"2017":5742,"2018":6755,"2019":7948,"2020":9350,"2021":11000,"Make":"Kia","Model":"Rio X-Line 1,4"},{"2006":1179,"2007":1387,"2008":1632,"2009":1920,"2010":2259,"2011":2658,"2012":3127,"2013":3679,"2014":4328,"2015":5092,"2016":5990,"2017":7047,"2018":8291,"2019":9754,"2020":11475,"2021":13500,"Make":"Kia","Model":"Rio X-Line 1,6"},{"2006":2359,"2007":2775,"2008":3264,"2009":3841,"2010":4518,"2011":5316,"2012":6254,"2013":7357,"2014":8656,"2015":10183,"2016":11980,"2017":14094,"2018":16581,"2019":19508,"2020":22950,"2021":27000,"Make":"Kia","Model":"Niro"},{"2006":1485,"2007":1747,"2008":2055,"2009":2418,"2010":2845,"2011":3347,"2012":3937,"2013":4632,"2014":5450,"2015":6412,"2016":7543,"2017":8874,"2018":10440,"2019":12283,"2020":14450,"2021":17000,"Make":"Kia","Model":"Ceed"},{"2006":1660,"2007":1953,"2008":2297,"2009":2703,"2010":3180,"2011":3741,"2012":4401,"2013":5177,"2014":6091,"2015":7166,"2016":8430,"2017":9918,"2018":11668,"2019":13728,"2020":16150,"2021":19000,"Make":"Kia","Model":"Х Ceed"},{"2006":3145,"2007":3700,"2008":4353,"2009":5121,"2010":6024,"2011":7087,"2012":8338,"2013":9810,"2014":11541,"2015":13577,"2016":15973,"2017":18792,"2018":22109,"2019":26010,"2020":30600,"2021":36000,"Make":"Kia","Model":"Mohave"},{"2006":1747,"2007":2055,"2008":2418,"2009":2845,"2010":3347,"2011":3937,"2012":4632,"2013":5450,"2014":6412,"2015":7543,"2016":8874,"2017":10440,"2018":12283,"2019":14450,"2020":17000,"2021":20000,"Make":"Kia","Model":"Seltos"},{"2006":1179,"2007":1387,"2008":1632,"2009":1920,"2010":2259,"2011":2658,"2012":3127,"2013":3679,"2014":4328,"2015":5092,"2016":5990,"2017":7047,"2018":8291,"2019":9754,"2020":11475,"2021":13500,"Make":"Kia","Model":"Stonic"},{"2006":2621,"2007":3083,"2008":3627,"2009":4267,"2010":5020,"2011":5906,"2012":6949,"2013":8175,"2014":9617,"2015":11314,"2016":13311,"2017":15660,"2018":18424,"2019":21675,"2020":25500,"2021":30000,"Make":"Kia","Model":"Telluride"},{"2006":571,"2007":668,"2008":781,"2009":914,"2010":1069,"2011":1250,"2012":1462,"2013":1710,"2014":2000,"2015":"Х","2016":"Х","2017":"Х","2018":"Х","2019":"Х","2020":"Х","2021":"Х","Make":"Lada","Model":2107},{"2006":628,"2007":735,"2008":859,"2009":1005,"2010":1176,"2011":1375,"2012":1608,"2013":1881,"2014":2200,"2015":"Х","2016":"Х","2017":"Х","2018":"Х","2019":"Х","2020":"Х","2021":"Х","Make":"Lada","Model":"Samara"},{"2006":906,"2007":1060,"2008":1240,"2009":1450,"2010":1696,"2011":1983,"2012":2320,"2013":2713,"2014":3173,"2015":3711,"2016":4341,"2017":5077,"2018":5938,"2019":6945,"2020":8123,"2021":9500,"Make":"Lada","Model":"Granta"},{"2006":916,"2007":1071,"2008":1253,"2009":1465,"2010":1714,"2011":2004,"2012":2344,"2013":2742,"2014":3207,"2015":3750,"2016":4386,"2017":5130,"2018":6000,"2019":7018,"2020":8208,"2021":9600,"Make":"Lada","Model":"Granta Sport"},{"2006":906,"2007":1060,"2008":1240,"2009":1450,"2010":1696,"2011":1983,"2012":2320,"2013":2713,"2014":3173,"2015":3711,"2016":4341,"2017":5077,"2018":5938,"2019":6945,"2020":8123,"2021":9500,"Make":"Lada","Model":"Granta Liftback"},{"2006":906,"2007":1060,"2008":1240,"2009":1450,"2010":1696,"2011":1983,"2012":2320,"2013":2713,"2014":3173,"2015":3711,"2016":4341,"2017":5077,"2018":5938,"2019":6945,"2020":8123,"2021":9500,"Make":"Lada","Model":"Kalina Cross"},{"2006":906,"2007":1060,"2008":1240,"2009":1450,"2010":1696,"2011":1983,"2012":2320,"2013":2713,"2014":3173,"2015":3711,"2016":4341,"2017":5077,"2018":5938,"2019":6945,"2020":8123,"2021":9500,"Make":"Lada","Model":"Kalina (хечбек)"},{"2006":954,"2007":1116,"2008":1305,"2009":1526,"2010":1785,"2011":2088,"2012":2442,"2013":2856,"2014":3340,"2015":3907,"2016":4569,"2017":5344,"2018":6250,"2019":7310,"2020":8550,"2021":10000,"Make":"Lada","Model":"Kalina Sport"},{"2006":811,"2007":948,"2008":1109,"2009":1297,"2010":1517,"2011":1775,"2012":2075,"2013":2427,"2014":2839,"2015":3321,"2016":3884,"2017":4542,"2018":5313,"2019":6214,"2020":7268,"2021":8500,"Make":"Lada","Model":"Priora (хечбек)"},{"2006":782,"2007":915,"2008":1070,"2009":1251,"2010":1464,"2011":1712,"2012":2002,"2013":2342,"2014":2739,"2015":3203,"2016":3747,"2017":4382,"2018":5125,"2019":5994,"2020":7011,"2021":8200,"Make":"Lada","Model":"Priora (седан)"},{"2006":1335,"2007":1562,"2008":1827,"2009":2137,"2010":2499,"2011":2923,"2012":3418,"2013":3998,"2014":4676,"2015":5469,"2016":6397,"2017":7482,"2018":8750,"2019":10234,"2020":11970,"2021":14000,"Make":"Lada","Model":"Vesta 1,6 (бензин / газ)"},{"2006":1116,"2007":1305,"2008":1527,"2009":1786,"2010":2088,"2011":2443,"2012":2857,"2013":3341,"2014":3908,"2015":4571,"2016":5346,"2017":6252,"2018":7313,"2019":8553,"2020":10004,"2021":11700,"Make":"Lada","Model":"Vesta 1,6"},{"2006":1250,"2007":1461,"2008":1709,"2009":1999,"2010":2338,"2011":2735,"2012":3199,"2013":3741,"2014":4376,"2015":5118,"2016":5986,"2017":7001,"2018":8188,"2019":9576,"2020":11201,"2021":13100,"Make":"Lada","Model":"Vesta 1,8"},{"2006":1145,"2007":1339,"2008":1566,"2009":1831,"2010":2142,"2011":2505,"2012":2930,"2013":3427,"2014":4008,"2015":4688,"2016":5483,"2017":6413,"2018":7500,"2019":8772,"2020":10260,"2021":12000,"Make":"Lada","Model":"Vesta Cross 1,6"},{"2006":1278,"2007":1495,"2008":1748,"2009":2045,"2010":2392,"2011":2797,"2012":3272,"2013":3827,"2014":4476,"2015":5235,"2016":6123,"2017":7161,"2018":8375,"2019":9796,"2020":11457,"2021":13400,"Make":"Lada","Model":"Vesta Cross 1,8"},{"2006":856,"2007":1007,"2008":1185,"2009":1394,"2010":1640,"2011":1929,"2012":2270,"2013":2670,"2014":3142,"2015":3696,"2016":4348,"2017":5116,"2018":6018,"2019":7081,"2020":8330,"2021":9800,"Make":"Lada","Model":"Kalina (универсал)"},{"2006":743,"2007":874,"2008":1028,"2009":1209,"2010":1422,"2011":1673,"2012":1969,"2013":2316,"2014":2725,"2015":3206,"2016":3771,"2017":4437,"2018":5220,"2019":6141,"2020":7225,"2021":8500,"Make":"Lada","Model":"Priora (универсал)"},{"2006":856,"2007":1007,"2008":1185,"2009":1394,"2010":1640,"2011":1929,"2012":2270,"2013":2670,"2014":3142,"2015":3696,"2016":4348,"2017":5116,"2018":6018,"2019":7081,"2020":8330,"2021":9800,"Make":"Lada","Model":"Granta (универсал)"},{"2006":1040,"2007":1223,"2008":1439,"2009":1693,"2010":1991,"2011":2343,"2012":2756,"2013":3243,"2014":3815,"2015":4488,"2016":5280,"2017":6212,"2018":7308,"2019":8598,"2020":10115,"2021":11900,"Make":"Lada","Model":"X Ray 1,6"},{"2006":1109,"2007":1305,"2008":1535,"2009":1806,"2010":2125,"2011":2500,"2012":2942,"2013":3461,"2014":4071,"2015":4790,"2016":5635,"2017":6629,"2018":7799,"2019":9176,"2020":10795,"2021":12700,"Make":"Lada","Model":"X Ray 1,8"},{"2006":1197,"2007":1408,"2008":1656,"2009":1949,"2010":2293,"2011":2697,"2012":3173,"2013":3733,"2014":4392,"2015":5167,"2016":6079,"2017":7151,"2018":8414,"2019":9898,"2020":11645,"2021":13700,"Make":"Lada","Model":"X Ray Cross"},{"2006":970,"2007":1141,"2008":1342,"2009":1579,"2010":1858,"2011":2185,"2012":2571,"2013":3025,"2014":3558,"2015":4186,"2016":4925,"2017":5794,"2018":6817,"2019":8020,"2020":9435,"2021":11100,"Make":"Lada","Model":"Largus Cross (5 мест)"},{"2006":1005,"2007":1182,"2008":1390,"2009":1636,"2010":1924,"2011":2264,"2012":2664,"2013":3134,"2014":3687,"2015":4337,"2016":5103,"2017":6003,"2018":7062,"2019":8309,"2020":9775,"2021":11500,"Make":"Lada","Model":"Largus Cross (7 мест)"},{"2006":917,"2007":1079,"2008":1270,"2009":1494,"2010":1757,"2011":2067,"2012":2432,"2013":2861,"2014":3366,"2015":3960,"2016":4659,"2017":5481,"2018":6448,"2019":7586,"2020":8925,"2021":10500,"Make":"Lada","Model":"Largus 5 мест (универсал)"},{"2006":970,"2007":1141,"2008":1342,"2009":1579,"2010":1858,"2011":2185,"2012":2571,"2013":3025,"2014":3558,"2015":4186,"2016":4925,"2017":5794,"2018":6817,"2019":8020,"2020":9435,"2021":11100,"Make":"Lada","Model":"Largus 7 мест (универсал)"},{"2006":1048,"2007":1233,"2008":1451,"2009":1707,"2010":2008,"2011":2362,"2012":2779,"2013":3270,"2014":3847,"2015":4526,"2016":5324,"2017":6264,"2018":7370,"2019":8670,"2020":10200,"2021":12000,"Make":"Lada","Model":"4X4 Bronto"},{"2006":751,"2007":884,"2008":1040,"2009":1223,"2010":1439,"2011":1693,"2012":1992,"2013":2343,"2014":2757,"2015":3243,"2016":3816,"2017":4489,"2018":5281,"2019":6214,"2020":7310,"2021":8600,"Make":"Lada","Model":"4X4 (3-х дверная)"},{"2006":769,"2007":904,"2008":1064,"2009":1252,"2010":1473,"2011":1732,"2012":2038,"2013":2398,"2014":2821,"2015":3319,"2016":3905,"2017":4594,"2018":5404,"2019":6358,"2020":7480,"2021":8800,"Make":"Lada","Model":"4X4 Urban (3-х дверная)"},{"2006":812,"2007":956,"2008":1124,"2009":1323,"2010":1556,"2011":1831,"2012":2154,"2013":2534,"2014":2981,"2015":3507,"2016":4126,"2017":4855,"2018":5711,"2019":6719,"2020":7905,"2021":9300,"Make":"Lada","Model":"4X4 (5-ти дверная)"},{"2006":821,"2007":966,"2008":1137,"2009":1337,"2010":1573,"2011":1851,"2012":2177,"2013":2561,"2014":3013,"2015":3545,"2016":4171,"2017":4907,"2018":5773,"2019":6792,"2020":7990,"2021":9400,"Make":"Lada","Model":"4X4 Urban (5-ти дверная)"},{"2006":1066,"2007":1254,"2008":1475,"2009":1735,"2010":2042,"2011":2402,"2012":2826,"2013":3324,"2014":3911,"2015":4601,"2016":5413,"2017":6368,"2018":7492,"2019":8815,"2020":10370,"2021":12200,"Make":"Lada","Model":"Vesta SW 1,6"},{"2006":1136,"2007":1336,"2008":1572,"2009":1849,"2010":2175,"2011":2559,"2012":3011,"2013":3542,"2014":4168,"2015":4903,"2016":5768,"2017":6786,"2018":7984,"2019":9393,"2020":11050,"2021":13000,"Make":"Lada","Model":"Vesta SW 1,8"},{"2006":1136,"2007":1336,"2008":1572,"2009":1849,"2010":2175,"2011":2559,"2012":3011,"2013":3542,"2014":4168,"2015":4903,"2016":5768,"2017":6786,"2018":7984,"2019":9393,"2020":11050,"2021":13000,"Make":"Lada","Model":"Vesta SW Cross 1,6"},{"2006":1223,"2007":1439,"2008":1693,"2009":1991,"2010":2343,"2011":2756,"2012":3243,"2013":3815,"2014":4488,"2015":5280,"2016":6212,"2017":7308,"2018":8598,"2019":10115,"2020":11900,"2021":14000,"Make":"Lada","Model":"Vesta SW Cross 1,8"},{"2006":22712,"2007":26720,"2008":31435,"2009":36983,"2010":43509,"2011":51187,"2012":60220,"2013":70848,"2014":83350,"2015":98059,"2016":115363,"2017":135722,"2018":159673,"2019":187850,"2020":221000,"2021":260000,"Make":"Lamborghini","Model":"Aventador"},{"2006":16597,"2007":19526,"2008":22972,"2009":27026,"2010":31795,"2011":37406,"2012":44007,"2013":51773,"2014":60910,"2015":71658,"2016":84304,"2017":99181,"2018":116684,"2019":137275,"2020":161500,"2021":190000,"Make":"Lamborghini","Model":"URUS"},{"2006":2795,"2007":3289,"2008":3869,"2009":4552,"2010":5355,"2011":6300,"2012":7412,"2013":8720,"2014":10258,"2015":12069,"2016":14199,"2017":16704,"2018":19652,"2019":23120,"2020":27200,"2021":32000,"Make":"Lexus","Model":"ES 200"},{"2006":2970,"2007":3494,"2008":4111,"2009":4836,"2010":5690,"2011":6694,"2012":7875,"2013":9265,"2014":10900,"2015":12823,"2016":15086,"2017":17748,"2018":20880,"2019":24565,"2020":28900,"2021":34000,"Make":"Lexus","Model":"ES 250"},{"2006":3145,"2007":3700,"2008":4353,"2009":5121,"2010":6024,"2011":7087,"2012":8338,"2013":9810,"2014":11541,"2015":13577,"2016":15973,"2017":18792,"2018":22109,"2019":26010,"2020":30600,"2021":36000,"Make":"Lexus","Model":"ES 350"},{"2006":2970,"2007":3494,"2008":4111,"2009":4836,"2010":5690,"2011":6694,"2012":7875,"2013":9265,"2014":10900,"2015":12823,"2016":15086,"2017":17748,"2018":20880,"2019":24565,"2020":28900,"2021":34000,"Make":"Lexus","Model":"GS 250"},{"2006":3145,"2007":3700,"2008":4353,"2009":5121,"2010":6024,"2011":7087,"2012":8338,"2013":9810,"2014":11541,"2015":13577,"2016":15973,"2017":18792,"2018":22109,"2019":26010,"2020":30600,"2021":36000,"Make":"Lexus","Model":"GS 350"},{"2006":3844,"2007":4522,"2008":5320,"2009":6259,"2010":7363,"2011":8662,"2012":10191,"2013":11990,"2014":14105,"2015":16595,"2016":19523,"2017":22968,"2018":27022,"2019":31790,"2020":37400,"2021":44000,"Make":"Lexus","Model":"GS 450h"},{"2006":2795,"2007":3289,"2008":3869,"2009":4552,"2010":5355,"2011":6300,"2012":7412,"2013":8720,"2014":10258,"2015":12069,"2016":14199,"2017":16704,"2018":19652,"2019":23120,"2020":27200,"2021":32000,"Make":"Lexus","Model":"IS"},{"2006":5678,"2007":6680,"2008":7859,"2009":9246,"2010":10877,"2011":12797,"2012":15055,"2013":17712,"2014":20838,"2015":24515,"2016":28841,"2017":33930,"2018":39918,"2019":46963,"2020":55250,"2021":65000,"Make":"Lexus","Model":"LS 350"},{"2006":5853,"2007":6886,"2008":8101,"2009":9530,"2010":11212,"2011":13191,"2012":15518,"2013":18257,"2014":21479,"2015":25269,"2016":29728,"2017":34974,"2018":41146,"2019":48408,"2020":56950,"2021":67000,"Make":"Lexus","Model":"LS 500"},{"2006":4193,"2007":4933,"2008":5803,"2009":6828,"2010":8032,"2011":9450,"2012":11118,"2013":13080,"2014":15388,"2015":18103,"2016":21298,"2017":25056,"2018":29478,"2019":34680,"2020":40800,"2021":48000,"Make":"Lexus","Model":"RC 300"},{"2006":6901,"2007":8119,"2008":9552,"2009":11237,"2010":13220,"2011":15553,"2012":18298,"2013":21527,"2014":25326,"2015":29795,"2016":35053,"2017":41238,"2018":48516,"2019":57078,"2020":67150,"2021":79000,"Make":"Lexus","Model":"RC F"},{"2006":7425,"2007":8735,"2008":10277,"2009":12091,"2010":14224,"2011":16734,"2012":19687,"2013":23162,"2014":27249,"2015":32058,"2016":37715,"2017":44371,"2018":52201,"2019":61413,"2020":72250,"2021":85000,"Make":"Lexus","Model":"LC 500"},{"2006":3145,"2007":3700,"2008":4353,"2009":5121,"2010":6024,"2011":7087,"2012":8338,"2013":9810,"2014":11541,"2015":13577,"2016":15973,"2017":18792,"2018":22109,"2019":26010,"2020":30600,"2021":36000,"Make":"Lexus","Model":"CT 200h"},{"2006":2970,"2007":3494,"2008":4111,"2009":4836,"2010":5690,"2011":6694,"2012":7875,"2013":9265,"2014":10900,"2015":12823,"2016":15086,"2017":17748,"2018":20880,"2019":24565,"2020":28900,"2021":34000,"Make":"Lexus","Model":"UX 200"},{"2006":3669,"2007":4316,"2008":5078,"2009":5974,"2010":7028,"2011":8269,"2012":9728,"2013":11445,"2014":13464,"2015":15840,"2016":18636,"2017":21924,"2018":25793,"2019":30345,"2020":35700,"2021":42000,"Make":"Lexus","Model":"UX 250h"},{"2006":2970,"2007":3494,"2008":4111,"2009":4836,"2010":5690,"2011":6694,"2012":7875,"2013":9265,"2014":10900,"2015":12823,"2016":15086,"2017":17748,"2018":20880,"2019":24565,"2020":28900,"2021":34000,"Make":"Lexus","Model":"NX"},{"2006":3319,"2007":3905,"2008":4594,"2009":5405,"2010":6359,"2011":7481,"2012":8801,"2013":10355,"2014":12182,"2015":14332,"2016":16861,"2017":19836,"2018":23337,"2019":27455,"2020":32300,"2021":38000,"Make":"Lexus","Model":"NX Hybrid"},{"2006":6115,"2007":7194,"2008":8463,"2009":9957,"2010":11714,"2011":13781,"2012":16213,"2013":19074,"2014":22440,"2015":26400,"2016":31059,"2017":36540,"2018":42989,"2019":50575,"2020":59500,"2021":70000,"Make":"Lexus","Model":"LX 450d"},{"2006":5853,"2007":6886,"2008":8101,"2009":9530,"2010":11212,"2011":13191,"2012":15518,"2013":18257,"2014":21479,"2015":25269,"2016":29728,"2017":34974,"2018":41146,"2019":48408,"2020":56950,"2021":67000,"Make":"Lexus","Model":"LX 470"},{"2006":6814,"2007":8016,"2008":9431,"2009":11095,"2010":13053,"2011":15356,"2012":18066,"2013":21254,"2014":25005,"2015":29418,"2016":34609,"2017":40716,"2018":47902,"2019":56355,"2020":66300,"2021":78000,"Make":"Lexus","Model":"LX 570"},{"2006":3931,"2007":4625,"2008":5441,"2009":6401,"2010":7530,"2011":8859,"2012":10423,"2013":12262,"2014":14426,"2015":16972,"2016":19967,"2017":23490,"2018":27636,"2019":32513,"2020":38250,"2021":45000,"Make":"Lexus","Model":"RX"},{"2006":4368,"2007":5138,"2008":6045,"2009":7112,"2010":8367,"2011":9844,"2012":11581,"2013":13625,"2014":16029,"2015":18857,"2016":22185,"2017":26100,"2018":30706,"2019":36125,"2020":42500,"2021":50000,"Make":"Lexus","Model":"RX Hibrid"},{"2006":5241,"2007":6166,"2008":7254,"2009":8535,"2010":10041,"2011":11812,"2012":13897,"2013":16349,"2014":19235,"2015":22629,"2016":26622,"2017":31320,"2018":36848,"2019":43350,"2020":51000,"2021":60000,"Make":"Lexus","Model":"GX"},{"2006":1354,"2007":1593,"2008":1874,"2009":2205,"2010":2594,"2011":3052,"2012":3590,"2013":4224,"2014":4969,"2015":5846,"2016":6877,"2017":8091,"2018":9519,"2019":11199,"2020":13175,"2021":15500,"Make":"Lifan","Model":"Murman"},{"2006":961,"2007":1130,"2008":1330,"2009":1565,"2010":1841,"2011":2166,"2012":2548,"2013":2997,"2014":3526,"2015":4149,"2016":4881,"2017":5742,"2018":6755,"2019":7948,"2020":9350,"2021":11000,"Make":"Lifan","Model":"Solano ll 1,5"},{"2006":1048,"2007":1233,"2008":1451,"2009":1707,"2010":2008,"2011":2362,"2012":2779,"2013":3270,"2014":3847,"2015":4526,"2016":5324,"2017":6264,"2018":7370,"2019":8670,"2020":10200,"2021":12000,"Make":"Lifan","Model":"Solano ll 1,8"},{"2006":786,"2007":925,"2008":1088,"2009":1280,"2010":1506,"2011":1772,"2012":2085,"2013":2452,"2014":2885,"2015":3394,"2016":3993,"2017":4698,"2018":5527,"2019":6503,"2020":7650,"2021":9000,"Make":"Lifan","Model":"Solano"},{"2006":568,"2007":668,"2008":786,"2009":925,"2010":1088,"2011":1280,"2012":1506,"2013":1771,"2014":2084,"2015":2451,"2016":2884,"2017":3393,"2018":3992,"2019":4696,"2020":5525,"2021":6500,"Make":"Lifan","Model":"Smily"},{"2006":655,"2007":771,"2008":907,"2009":1067,"2010":1255,"2011":1477,"2012":1737,"2013":2044,"2014":2404,"2015":2829,"2016":3328,"2017":3915,"2018":4606,"2019":5419,"2020":6375,"2021":7500,"Make":"Lifan","Model":"Breez"},{"2006":1354,"2007":1593,"2008":1874,"2009":2205,"2010":2594,"2011":3052,"2012":3590,"2013":4224,"2014":4969,"2015":5846,"2016":6877,"2017":8091,"2018":9519,"2019":11199,"2020":13175,"2021":15500,"Make":"Lifan","Model":"X70"},{"2006":1223,"2007":1439,"2008":1693,"2009":1991,"2010":2343,"2011":2756,"2012":3243,"2013":3815,"2014":4488,"2015":5280,"2016":6212,"2017":7308,"2018":8598,"2019":10115,"2020":11900,"2021":14000,"Make":"Lifan","Model":"X60"},{"2006":961,"2007":1130,"2008":1330,"2009":1565,"2010":1841,"2011":2166,"2012":2548,"2013":2997,"2014":3526,"2015":4149,"2016":4881,"2017":5742,"2018":6755,"2019":7948,"2020":9350,"2021":11000,"Make":"Lifan","Model":"X50"},{"2006":1267,"2007":1490,"2008":1753,"2009":2063,"2010":2426,"2011":2855,"2012":3358,"2013":3951,"2014":4648,"2015":5469,"2016":6434,"2017":7569,"2018":8905,"2019":10476,"2020":12325,"2021":14500,"Make":"Lifan","Model":"Myway"},{"2006":6377,"2007":7502,"2008":8826,"2009":10384,"2010":12216,"2011":14372,"2012":16908,"2013":19892,"2014":23402,"2015":27532,"2016":32390,"2017":38106,"2018":44831,"2019":52743,"2020":62050,"2021":73000,"Make":"Lincoln","Model":"Navigator"},{"2006":6814,"2007":8016,"2008":9431,"2009":11095,"2010":13053,"2011":15356,"2012":18066,"2013":21254,"2014":25005,"2015":29418,"2016":34609,"2017":40716,"2018":47902,"2019":56355,"2020":66300,"2021":78000,"Make":"Lincoln","Model":"Select"},{"2006":7425,"2007":8735,"2008":10277,"2009":12091,"2010":14224,"2011":16734,"2012":19687,"2013":23162,"2014":27249,"2015":32058,"2016":37715,"2017":44371,"2018":52201,"2019":61413,"2020":72250,"2021":85000,"Make":"Lincoln","Model":"Reserve"},{"2006":9609,"2007":11305,"2008":13300,"2009":15647,"2010":18408,"2011":21656,"2012":25478,"2013":29974,"2014":35263,"2015":41486,"2016":48808,"2017":57421,"2018":67554,"2019":79475,"2020":93500,"2021":110000,"Make":"Maserati","Model":"Levante S"},{"2006":7512,"2007":8838,"2008":10398,"2009":12233,"2010":14392,"2011":16931,"2012":19919,"2013":23434,"2014":27570,"2015":32435,"2016":38159,"2017":44893,"2018":52815,"2019":62135,"2020":73100,"2021":86000,"Make":"Maserati","Model":"Levante"},{"2006":7338,"2007":8633,"2008":10156,"2009":11948,"2010":14057,"2011":16537,"2012":19456,"2013":22889,"2014":26928,"2015":31681,"2016":37271,"2017":43849,"2018":51587,"2019":60690,"2020":71400,"2021":84000,"Make":"Maserati","Model":"Levante Diesel"},{"2006":568,"2007":668,"2008":786,"2009":925,"2010":1088,"2011":1280,"2012":1506,"2013":1771,"2014":2084,"2015":2451,"2016":2884,"2017":3393,"2018":3992,"2019":4696,"2020":5525,"2021":6500,"Make":"Matiz","Model":"0,8"},{"2006":716,"2007":843,"2008":991,"2009":1166,"2010":1372,"2011":1614,"2012":1899,"2013":2234,"2014":2629,"2015":3093,"2016":3638,"2017":4280,"2018":5036,"2019":5925,"2020":6970,"2021":8200,"Make":"Matiz","Model":"1,0"},{"2006":917,"2007":1079,"2008":1270,"2009":1494,"2010":1757,"2011":2067,"2012":2432,"2013":2861,"2014":3366,"2015":3960,"2016":4659,"2017":5481,"2018":6448,"2019":7586,"2020":8925,"2021":10500,"Make":"Mazda","Model":2},{"2006":1747,"2007":2055,"2008":2418,"2009":2845,"2010":3347,"2011":3937,"2012":4632,"2013":5450,"2014":6412,"2015":7543,"2016":8874,"2017":10440,"2018":12283,"2019":14450,"2020":17000,"2021":20000,"Make":"Mazda","Model":3},{"2006":2009,"2007":2364,"2008":2781,"2009":3272,"2010":3849,"2011":4528,"2012":5327,"2013":6267,"2014":7373,"2015":8674,"2016":10205,"2017":12006,"2018":14125,"2019":16618,"2020":19550,"2021":23000,"Make":"Mazda","Model":"6 2,0"},{"2006":2359,"2007":2775,"2008":3264,"2009":3841,"2010":4518,"2011":5316,"2012":6254,"2013":7357,"2014":8656,"2015":10183,"2016":11980,"2017":14094,"2018":16581,"2019":19508,"2020":22950,"2021":27000,"Make":"Mazda","Model":"6 2,5"},{"2006":1747,"2007":2055,"2008":2418,"2009":2845,"2010":3347,"2011":3937,"2012":4632,"2013":5450,"2014":6412,"2015":7543,"2016":8874,"2017":10440,"2018":12283,"2019":14450,"2020":17000,"2021":20000,"Make":"Mazda","Model":"5 (Premacy) минивэн"},{"2006":2097,"2007":2466,"2008":2902,"2009":3414,"2010":4016,"2011":4725,"2012":5559,"2013":6540,"2014":7694,"2015":9052,"2016":10649,"2017":12528,"2018":14739,"2019":17340,"2020":20400,"2021":24000,"Make":"Mazda","Model":"СX 3"},{"2006":2271,"2007":2672,"2008":3144,"2009":3698,"2010":4351,"2011":5119,"2012":6022,"2013":7085,"2014":8335,"2015":9806,"2016":11536,"2017":13572,"2018":15967,"2019":18785,"2020":22100,"2021":26000,"Make":"Mazda","Model":"СX 5 2,0"},{"2006":2446,"2007":2878,"2008":3385,"2009":3983,"2010":4686,"2011":5512,"2012":6485,"2013":7630,"2014":8976,"2015":10560,"2016":12424,"2017":14616,"2018":17196,"2019":20230,"2020":23800,"2021":28000,"Make":"Mazda","Model":"СX 5 2,5"},{"2006":2621,"2007":3083,"2008":3627,"2009":4267,"2010":5020,"2011":5906,"2012":6949,"2013":8175,"2014":9617,"2015":11314,"2016":13311,"2017":15660,"2018":18424,"2019":21675,"2020":25500,"2021":30000,"Make":"Mazda","Model":"СX 7"},{"2006":3319,"2007":3905,"2008":4594,"2009":5405,"2010":6359,"2011":7481,"2012":8801,"2013":10355,"2014":12182,"2015":14332,"2016":16861,"2017":19836,"2018":23337,"2019":27455,"2020":32300,"2021":38000,"Make":"Mazda","Model":"СX 9"},{"2006":2362,"2007":2778,"2008":3269,"2009":3846,"2010":4524,"2011":5323,"2012":6262,"2013":7367,"2014":8667,"2015":10196,"2016":11996,"2017":14112,"2018":16603,"2019":19533,"2020":22980,"2021":27035,"Make":"Mercedes Benz","Model":"A 180 Compact Saloon"},{"2006":2426,"2007":2855,"2008":3358,"2009":3951,"2010":4648,"2011":5468,"2012":6433,"2013":7569,"2014":8904,"2015":10476,"2016":12324,"2017":14499,"2018":17058,"2019":20068,"2020":23610,"2021":27776,"Make":"Mercedes Benz","Model":"A 180 Saloon"},{"2006":2591,"2007":3048,"2008":3586,"2009":4219,"2010":4964,"2011":5840,"2012":6870,"2013":8083,"2014":9509,"2015":11187,"2016":13162,"2017":15484,"2018":18217,"2019":21431,"2020":25213,"2021":29663,"Make":"Mercedes Benz","Model":"A 200 Compact Saloon"},{"2006":2626,"2007":3089,"2008":3635,"2009":4276,"2010":5031,"2011":5918,"2012":6963,"2013":8192,"2014":9637,"2015":11338,"2016":13339,"2017":15692,"2018":18462,"2019":21720,"2020":25553,"2021":30062,"Make":"Mercedes Benz","Model":"A 200 Saloon"},{"2006":2961,"2007":3483,"2008":4098,"2009":4821,"2010":5672,"2011":6673,"2012":7850,"2013":9235,"2014":10865,"2015":12782,"2016":15038,"2017":17692,"2018":20814,"2019":24487,"2020":28808,"2021":33892,"Make":"Mercedes Benz","Model":"A 200 4MATIC Compact Saloon"},{"2006":3087,"2007":3631,"2008":4272,"2009":5026,"2010":5913,"2011":6956,"2012":8184,"2013":9628,"2014":11327,"2015":13326,"2016":15678,"2017":18445,"2018":21700,"2019":25529,"2020":30034,"2021":35334,"Make":"Mercedes Benz","Model":"A 250 e Compact Saloon"},{"2006":3108,"2007":3656,"2008":4301,"2009":5060,"2010":5953,"2011":7004,"2012":8239,"2013":9693,"2014":11404,"2015":13417,"2016":15784,"2017":18570,"2018":21847,"2019":25702,"2020":30238,"2021":35574,"Make":"Mercedes Benz","Model":"A 250 Compact Saloon"},{"2006":3292,"2007":3873,"2008":4556,"2009":5360,"2010":6306,"2011":7419,"2012":8728,"2013":10268,"2014":12080,"2015":14212,"2016":16720,"2017":19671,"2018":23142,"2019":27226,"2020":32030,"2021":37683,"Make":"Mercedes Benz","Model":"A 250 4MATIC Compact Saloon"},{"2006":3952,"2007":4650,"2008":5471,"2009":6436,"2010":7572,"2011":8908,"2012":10480,"2013":12329,"2014":14505,"2015":17065,"2016":20076,"2017":23619,"2018":27787,"2019":32691,"2020":38460,"2021":45247,"Make":"Mercedes Benz","Model":"AMG A 35 4MATIC Compact Saloon"},{"2006":4017,"2007":4726,"2008":5560,"2009":6541,"2010":7696,"2011":9054,"2012":10652,"2013":12531,"2014":14743,"2015":17344,"2016":20405,"2017":24006,"2018":28242,"2019":33226,"2020":39089,"2021":45988,"Make":"Mercedes Benz","Model":"AMG A 35 4MATIC Saloon"},{"2006":4658,"2007":5480,"2008":6447,"2009":7585,"2010":8923,"2011":10498,"2012":12351,"2013":14530,"2014":17094,"2015":20111,"2016":23660,"2017":27835,"2018":32747,"2019":38526,"2020":45325,"2021":53324,"Make":"Mercedes Benz","Model":"AMG A 45 4MATIC+ Compact Saloon"},{"2006":5126,"2007":6031,"2008":7095,"2009":8347,"2010":9820,"2011":11553,"2012":13592,"2013":15990,"2014":18812,"2015":22132,"2016":26037,"2017":30632,"2018":36038,"2019":42397,"2020":49879,"2021":58682,"Make":"Mercedes Benz","Model":"AMG A 45 S 4MATIC+ Compact Saloon"},{"2006":2510,"2007":2952,"2008":3473,"2009":4086,"2010":4807,"2011":5656,"2012":6654,"2013":7828,"2014":9210,"2015":10835,"2016":12747,"2017":14996,"2018":17643,"2019":20756,"2020":24419,"2021":28728,"Make":"Mercedes Benz","Model":"B 180"},{"2006":2651,"2007":3119,"2008":3670,"2009":4317,"2010":5079,"2011":5976,"2012":7030,"2013":8271,"2014":9730,"2015":11447,"2016":13468,"2017":15844,"2018":18640,"2019":21930,"2020":25800,"2021":30353,"Make":"Mercedes Benz","Model":"B 200"},{"2006":2739,"2007":3222,"2008":3790,"2009":4459,"2010":5246,"2011":6172,"2012":7261,"2013":8543,"2014":10050,"2015":11824,"2016":13910,"2017":16365,"2018":19253,"2019":22650,"2020":26648,"2021":31350,"Make":"Mercedes Benz","Model":"C 160 (объем 1,6)"},{"2006":2905,"2007":3418,"2008":4021,"2009":4731,"2010":5566,"2011":6548,"2012":7703,"2013":9063,"2014":10662,"2015":12544,"2016":14757,"2017":17362,"2018":20425,"2019":24030,"2020":28271,"2021":33260,"Make":"Mercedes Benz","Model":"C 180 (объем 1,6)"},{"2006":2928,"2007":3444,"2008":4052,"2009":4767,"2010":5609,"2011":6598,"2012":7763,"2013":9133,"2014":10744,"2015":12641,"2016":14871,"2017":17496,"2018":20583,"2019":24215,"2020":28489,"2021":33516,"Make":"Mercedes Benz","Model":"C 160 (объем 1,5)"},{"2006":3119,"2007":3670,"2008":4318,"2009":5080,"2010":5976,"2011":7030,"2012":8271,"2013":9731,"2014":11448,"2015":13468,"2016":15845,"2017":18641,"2018":21931,"2019":25801,"2020":30354,"2021":35711,"Make":"Mercedes Benz","Model":"C 180 (объем 1,5)"},{"2006":3185,"2007":3747,"2008":4408,"2009":5186,"2010":6101,"2011":7177,"2012":8444,"2013":9934,"2014":11687,"2015":13750,"2016":16176,"2017":19031,"2018":22389,"2019":26340,"2020":30989,"2021":36457,"Make":"Mercedes Benz","Model":"C 180 Coupe"},{"2006":3259,"2007":3834,"2008":4511,"2009":5307,"2010":6243,"2011":7345,"2012":8641,"2013":10166,"2014":11960,"2015":14070,"2016":16553,"2017":19474,"2018":22911,"2019":26954,"2020":31711,"2021":37307,"Make":"Mercedes Benz","Model":"C 180 Estate"},{"2006":3334,"2007":3922,"2008":4615,"2009":5429,"2010":6387,"2011":7514,"2012":8840,"2013":10400,"2014":12236,"2015":14395,"2016":16935,"2017":19924,"2018":23439,"2019":27576,"2020":32442,"2021":38167,"Make":"Mercedes Benz","Model":"C 200 (объем 2,0)"},{"2006":3374,"2007":3969,"2008":4670,"2009":5494,"2010":6463,"2011":7604,"2012":8946,"2013":10524,"2014":12382,"2015":14567,"2016":17137,"2017":20162,"2018":23719,"2019":27905,"2020":32830,"2021":38623,"Make":"Mercedes Benz","Model":"C 200 (объем 1,5)"},{"2006":3406,"2007":4007,"2008":4715,"2009":5547,"2010":6525,"2011":7677,"2012":9032,"2013":10625,"2014":12500,"2015":14706,"2016":17302,"2017":20355,"2018":23947,"2019":28173,"2020":33145,"2021":38994,"Make":"Mercedes Benz","Model":"C 180 Coupe (объем 1,5)"},{"2006":3473,"2007":4086,"2008":4808,"2009":5656,"2010":6654,"2011":7828,"2012":9210,"2013":10835,"2014":12747,"2015":14997,"2016":17643,"2017":20757,"2018":24420,"2019":28729,"2020":33799,"2021":39763,"Make":"Mercedes Benz","Model":"C 200 Estate (объем 2,0)"},{"2006":3513,"2007":4133,"2008":4863,"2009":5721,"2010":6730,"2011":7918,"2012":9315,"2013":10959,"2014":12893,"2015":15169,"2016":17845,"2017":20995,"2018":24700,"2019":29058,"2020":34186,"2021":40219,"Make":"Mercedes Benz","Model":"C 200 Estate (объем 1,5)"},{"2006":3533,"2007":4157,"2008":4890,"2009":5753,"2010":6769,"2011":7963,"2012":9368,"2013":11021,"2014":12966,"2015":15255,"2016":17947,"2017":21114,"2018":24840,"2019":29223,"2020":34380,"2021":40447,"Make":"Mercedes Benz","Model":"C 200 4MATIC (объем 2,0)"},{"2006":3549,"2007":4175,"2008":4912,"2009":5778,"2010":6798,"2011":7998,"2012":9409,"2013":11070,"2014":13023,"2015":15321,"2016":18025,"2017":21206,"2018":24948,"2019":29351,"2020":34530,"2021":40624,"Make":"Mercedes Benz","Model":"C 200 Coupe (объем 2,0)"},{"2006":3573,"2007":4204,"2008":4945,"2009":5818,"2010":6845,"2011":8053,"2012":9474,"2013":11146,"2014":13113,"2015":15427,"2016":18149,"2017":21352,"2018":25120,"2019":29553,"2020":34768,"2021":40903,"Make":"Mercedes Benz","Model":"C 200 4MATIC (объем 1,5)"},{"2006":3589,"2007":4222,"2008":4967,"2009":5843,"2010":6874,"2011":8088,"2012":9515,"2013":11194,"2014":13169,"2015":15493,"2016":18227,"2017":21444,"2018":25228,"2019":29680,"2020":34918,"2021":41080,"Make":"Mercedes Benz","Model":"C 200 Coupe (объем 1,5)"},{"2006":3616,"2007":4255,"2008":5005,"2009":5889,"2010":6928,"2011":8151,"2012":9589,"2013":11281,"2014":13272,"2015":15614,"2016":18369,"2017":21611,"2018":25425,"2019":29912,"2020":35190,"2021":41400,"Make":"Mercedes Benz","Model":"C 220"},{"2006":3638,"2007":4280,"2008":5036,"2009":5924,"2010":6970,"2011":8200,"2012":9647,"2013":11349,"2014":13352,"2015":15708,"2016":18480,"2017":21742,"2018":25578,"2019":30092,"2020":35403,"2021":41650,"Make":"Mercedes Benz","Model":"C 240"},{"2006":3665,"2007":4311,"2008":5072,"2009":5967,"2010":7020,"2011":8259,"2012":9716,"2013":11431,"2014":13448,"2015":15821,"2016":18613,"2017":21898,"2018":25763,"2019":30309,"2020":35658,"2021":41950,"Make":"Mercedes Benz","Model":"C 280"},{"2006":3683,"2007":4333,"2008":5098,"2009":5997,"2010":7056,"2011":8301,"2012":9766,"2013":11489,"2014":13516,"2015":15902,"2016":18708,"2017":22009,"2018":25893,"2019":30463,"2020":35838,"2021":42163,"Make":"Mercedes Benz","Model":"C 300"},{"2006":3712,"2007":4368,"2008":5138,"2009":6045,"2010":7112,"2011":8367,"2012":9844,"2013":11581,"2014":13624,"2015":16029,"2016":18857,"2017":22185,"2018":26100,"2019":30706,"2020":36124,"2021":42499,"Make":"Mercedes Benz","Model":"C 200 4MATIC Estate"},{"2006":3748,"2007":4409,"2008":5187,"2009":6103,"2010":7180,"2011":8447,"2012":9937,"2013":11691,"2014":13754,"2015":16181,"2016":19037,"2017":22396,"2018":26348,"2019":30998,"2020":36468,"2021":42904,"Make":"Mercedes Benz","Model":"C 200 4MATIC Coupe"},{"2006":3969,"2007":4669,"2008":5493,"2009":6463,"2010":7603,"2011":8945,"2012":10523,"2013":12381,"2014":14565,"2015":17136,"2016":20160,"2017":23717,"2018":27903,"2019":32827,"2020":38619,"2021":45435,"Make":"Mercedes Benz","Model":"C 300 Coupe"},{"2006":4022,"2007":4731,"2008":5566,"2009":6549,"2010":7704,"2011":9064,"2012":10663,"2013":12545,"2014":14759,"2015":17364,"2016":20428,"2017":24033,"2018":28274,"2019":33263,"2020":39133,"2021":46039,"Make":"Mercedes Benz","Model":"C 300 4MATIC Estate"},{"2006":4023,"2007":4733,"2008":5568,"2009":6550,"2010":7706,"2011":9066,"2012":10666,"2013":12548,"2014":14763,"2015":17368,"2016":20433,"2017":24039,"2018":28281,"2019":33271,"2020":39143,"2021":46050,"Make":"Mercedes Benz","Model":"C 200 Cabriolet (объем 2,0)"},{"2006":4027,"2007":4738,"2008":5574,"2009":6558,"2010":7715,"2011":9076,"2012":10678,"2013":12562,"2014":14779,"2015":17387,"2016":20456,"2017":24065,"2018":28312,"2019":33308,"2020":39186,"2021":46102,"Make":"Mercedes Benz","Model":"C 300 e Estate"},{"2006":4063,"2007":4779,"2008":5623,"2009":6615,"2010":7783,"2011":9156,"2012":10772,"2013":12673,"2014":14909,"2015":17540,"2016":20635,"2017":24277,"2018":28561,"2019":33601,"2020":39530,"2021":46506,"Make":"Mercedes Benz","Model":"C 200 Cabriolet (объем 1,5)"},{"2006":4087,"2007":4808,"2008":5657,"2009":6655,"2010":7829,"2011":9211,"2012":10836,"2013":12749,"2014":14998,"2015":17645,"2016":20759,"2017":24422,"2018":28732,"2019":33803,"2020":39768,"2021":46786,"Make":"Mercedes Benz","Model":"C 300 e 4MATIC"},{"2006":4168,"2007":4904,"2008":5769,"2009":6787,"2010":7985,"2011":9394,"2012":11052,"2013":13002,"2014":15296,"2015":17996,"2016":21171,"2017":24907,"2018":29303,"2019":34474,"2020":40557,"2021":47715,"Make":"Mercedes Benz","Model":"C 300 4MATIC Coupe"},{"2006":4189,"2007":4929,"2008":5799,"2009":6822,"2010":8026,"2011":9442,"2012":11108,"2013":13069,"2014":15375,"2015":18088,"2016":21280,"2017":25035,"2018":29453,"2019":34651,"2020":40766,"2021":47960,"Make":"Mercedes Benz","Model":"C 200 4MATIC Cabriolet"},{"2006":4443,"2007":5227,"2008":6149,"2009":7235,"2010":8511,"2011":10013,"2012":11780,"2013":13859,"2014":16305,"2015":19182,"2016":22567,"2017":26550,"2018":31235,"2019":36747,"2020":43232,"2021":50861,"Make":"Mercedes Benz","Model":"C 300 Cabriolet"},{"2006":4569,"2007":5375,"2008":6323,"2009":7439,"2010":8752,"2011":10297,"2012":12114,"2013":14251,"2014":16766,"2015":19725,"2016":23206,"2017":27301,"2018":32119,"2019":37787,"2020":44455,"2021":52300,"Make":"Mercedes Benz","Model":"C 350"},{"2006":4642,"2007":5461,"2008":6425,"2009":7559,"2010":8893,"2011":10462,"2012":12308,"2013":14480,"2014":17036,"2015":20042,"2016":23579,"2017":27740,"2018":32635,"2019":38394,"2020":45170,"2021":53141,"Make":"Mercedes Benz","Model":"C 300 4MATIC Cabriolet"},{"2006":4677,"2007":5502,"2008":6473,"2009":7616,"2010":8960,"2011":10541,"2012":12401,"2013":14589,"2014":17164,"2015":20193,"2016":23756,"2017":27948,"2018":32880,"2019":38683,"2020":45509,"2021":53540,"Make":"Mercedes Benz","Model":"C 400 4MATIC Estate"},{"2006":4719,"2007":5552,"2008":6531,"2009":7684,"2010":9040,"2011":10635,"2012":12512,"2013":14720,"2014":17317,"2015":20373,"2016":23968,"2017":28198,"2018":33174,"2019":39029,"2020":45916,"2021":54019,"Make":"Mercedes Benz","Model":"C 400 4MATIC Coupe"},{"2006":5193,"2007":6109,"2008":7187,"2009":8456,"2010":9948,"2011":11703,"2012":13769,"2013":16198,"2014":19057,"2015":22420,"2016":26376,"2017":31031,"2018":36507,"2019":42949,"2020":50529,"2021":59445,"Make":"Mercedes Benz","Model":"C 400 4MATIC Cabriolet"},{"2006":5213,"2007":6133,"2008":7216,"2009":8489,"2010":9987,"2011":11749,"2012":13823,"2013":16262,"2014":19132,"2015":22508,"2016":26480,"2017":31153,"2018":36650,"2019":43118,"2020":50727,"2021":59679,"Make":"Mercedes Benz","Model":"AMG C 43 4MATIC"},{"2006":5353,"2007":6297,"2008":7408,"2009":8716,"2010":10254,"2011":12063,"2012":14192,"2013":16697,"2014":19643,"2015":23110,"2016":27188,"2017":31986,"2018":37631,"2019":44271,"2020":52084,"2021":61275,"Make":"Mercedes Benz","Model":"AMG C 43 4MATIC T-Model"},{"2006":5442,"2007":6402,"2008":7532,"2009":8861,"2010":10425,"2011":12264,"2012":14429,"2013":16975,"2014":19970,"2015":23495,"2016":27641,"2017":32519,"2018":38257,"2019":45008,"2020":52951,"2021":62295,"Make":"Mercedes Benz","Model":"AMG C 43 4MATIC Coupe"},{"2006":5916,"2007":6960,"2008":8188,"2009":9633,"2010":11333,"2011":13333,"2012":15685,"2013":18454,"2014":21710,"2015":25541,"2016":30048,"2017":35351,"2018":41590,"2019":48929,"2020":57563,"2021":67722,"Make":"Mercedes Benz","Model":"AMG C 43 4MATIC Cabriolet"},{"2006":6670,"2007":7847,"2008":9231,"2009":10860,"2010":12777,"2011":15032,"2012":17684,"2013":20805,"2014":24477,"2015":28796,"2016":33878,"2017":39856,"2018":46889,"2019":55164,"2020":64899,"2021":76352,"Make":"Mercedes Benz","Model":"AMG C 63 Estate"},{"2006":6700,"2007":7882,"2008":9273,"2009":10910,"2010":12835,"2011":15100,"2012":17765,"2013":20900,"2014":24588,"2015":28927,"2016":34032,"2017":40037,"2018":47103,"2019":55415,"2020":65194,"2021":76699,"Make":"Mercedes Benz","Model":"AMG C 63 Coupe"},{"2006":7178,"2007":8445,"2008":9935,"2009":11688,"2010":13751,"2011":16177,"2012":19032,"2013":22391,"2014":26342,"2015":30991,"2016":36460,"2017":42894,"2018":50463,"2019":59369,"2020":69846,"2021":82171,"Make":"Mercedes Benz","Model":"AMG C 63 Cabriolet"},{"2006":7262,"2007":8544,"2008":10051,"2009":11825,"2010":13912,"2011":16367,"2012":19255,"2013":22653,"2014":26651,"2015":31354,"2016":36887,"2017":43397,"2018":51055,"2019":60065,"2020":70664,"2021":83135,"Make":"Mercedes Benz","Model":"AMG C 63 S"},{"2006":7402,"2007":8708,"2008":10244,"2009":12052,"2010":14179,"2011":16681,"2012":19625,"2013":23088,"2014":27163,"2015":31956,"2016":37595,"2017":44230,"2018":52035,"2019":61218,"2020":72021,"2021":84731,"Make":"Mercedes Benz","Model":"AMG C 63 S Estate"},{"2006":7432,"2007":8743,"2008":10286,"2009":12102,"2010":14237,"2011":16750,"2012":19706,"2013":23183,"2014":27274,"2015":32087,"2016":37750,"2017":44411,"2018":52249,"2019":61469,"2020":72316,"2021":85078,"Make":"Mercedes Benz","Model":"AMG C 63 S Coupe"},{"2006":7910,"2007":9306,"2008":10948,"2009":12880,"2010":15153,"2011":17827,"2012":20973,"2013":24674,"2014":29028,"2015":34151,"2016":40178,"2017":47268,"2018":55609,"2019":65423,"2020":76968,"2021":90550,"Make":"Mercedes Benz","Model":"AMG C 63 S Cabriolet"},{"2006":2659,"2007":3128,"2008":3680,"2009":4330,"2010":5094,"2011":5992,"2012":7050,"2013":8294,"2014":9758,"2015":11480,"2016":13506,"2017":15889,"2018":18693,"2019":21991,"2020":25872,"2021":30438,"Make":"Mercedes Benz","Model":"CLA 180 Coupe"},{"2006":2836,"2007":3336,"2008":3925,"2009":4617,"2010":5432,"2011":6391,"2012":7519,"2013":8845,"2014":10406,"2015":12243,"2016":14403,"2017":16945,"2018":19935,"2019":23453,"2020":27592,"2021":32462,"Make":"Mercedes Benz","Model":"CLA 200 Coupe"},{"2006":2897,"2007":3409,"2008":4010,"2009":4718,"2010":5550,"2011":6530,"2012":7682,"2013":9038,"2014":10633,"2015":12509,"2016":14717,"2017":17314,"2018":20369,"2019":23964,"2020":28193,"2021":33168,"Make":"Mercedes Benz","Model":"CLA 200 Shooting Brake"},{"2006":3205,"2007":3771,"2008":4436,"2009":5219,"2010":6140,"2011":7223,"2012":8498,"2013":9998,"2014":11762,"2015":13838,"2016":16280,"2017":19153,"2018":22533,"2019":26509,"2020":31187,"2021":36691,"Make":"Mercedes Benz","Model":"CLA 200 4MATIC Coupe"},{"2006":3515,"2007":4136,"2008":4865,"2009":5724,"2010":6734,"2011":7923,"2012":9321,"2013":10966,"2014":12901,"2015":15177,"2016":17856,"2017":21007,"2018":24714,"2019":29075,"2020":34206,"2021":40242,"Make":"Mercedes Benz","Model":"CLA 250 4MATIC Coupe"},{"2006":4287,"2007":5044,"2008":5934,"2009":6981,"2010":8213,"2011":9662,"2012":11367,"2013":13373,"2014":15733,"2015":18509,"2016":21776,"2017":25619,"2018":30139,"2019":35458,"2020":41715,"2021":49077,"Make":"Mercedes Benz","Model":"AMG CLA 35 4MATIC Coupe"},{"2006":4989,"2007":5870,"2008":6905,"2009":8124,"2010":9558,"2011":11244,"2012":13229,"2013":15563,"2014":18309,"2015":21541,"2016":25342,"2017":29814,"2018":35075,"2019":41265,"2020":48547,"2021":57114,"Make":"Mercedes Benz","Model":"AMG CLA 45 4MATIC+ Coupe"},{"2006":5457,"2007":6420,"2008":7553,"2009":8886,"2010":10454,"2011":12299,"2012":14470,"2013":17023,"2014":20027,"2015":23561,"2016":27719,"2017":32611,"2018":38366,"2019":45136,"2020":53101,"2021":62472,"Make":"Mercedes Benz","Model":"AMG CLA 45 S 4MATIC+ Coupe"},{"2006":5586,"2007":6572,"2008":7732,"2009":9096,"2010":10701,"2011":12590,"2012":14812,"2013":17425,"2014":20500,"2015":24118,"2016":28374,"2017":33381,"2018":39272,"2019":46203,"2020":54356,"2021":63948,"Make":"Mercedes Benz","Model":"CLS 350 4MATIC Coupe"},{"2006":5730,"2007":6742,"2008":7931,"2009":9331,"2010":10978,"2011":12915,"2012":15194,"2013":17875,"2014":21030,"2015":24741,"2016":29107,"2017":34244,"2018":40287,"2019":47396,"2020":55760,"2021":65600,"Make":"Mercedes Benz","Model":"CLS 400 4MATIC"},{"2006":5765,"2007":6783,"2008":7980,"2009":9388,"2010":11045,"2011":12994,"2012":15287,"2013":17984,"2014":21158,"2015":24892,"2016":29285,"2017":34452,"2018":40532,"2019":47685,"2020":56100,"2021":66000,"Make":"Mercedes Benz","Model":"CLS 400d 4MATIC"},{"2006":5994,"2007":7052,"2008":8297,"2009":9761,"2010":11483,"2011":13510,"2012":15894,"2013":18699,"2014":21999,"2015":25881,"2016":30448,"2017":35821,"2018":42143,"2019":49580,"2020":58329,"2021":68622,"Make":"Mercedes Benz","Model":"CLS 450 4MATIC Coupe"},{"2006":7163,"2007":8427,"2008":9914,"2009":11664,"2010":13722,"2011":16144,"2012":18993,"2013":22344,"2014":26287,"2015":30926,"2016":36384,"2017":42805,"2018":50358,"2019":59245,"2020":69700,"2021":82000,"Make":"Mercedes Benz","Model":"CLS 53 4MATIC+"},{"2006":4057,"2007":4772,"2008":5615,"2009":6605,"2010":7771,"2011":9142,"2012":10756,"2013":12654,"2014":14887,"2015":17514,"2016":20605,"2017":24241,"2018":28519,"2019":33551,"2020":39472,"2021":46438,"Make":"Mercedes Benz","Model":"E 200 Sedan"},{"2006":4218,"2007":4962,"2008":5838,"2009":6868,"2010":8080,"2011":9506,"2012":11184,"2013":13157,"2014":15479,"2015":18211,"2016":21424,"2017":25205,"2018":29653,"2019":34886,"2020":41042,"2021":48285,"Make":"Mercedes Benz","Model":"E 200 Coupe"},{"2006":4286,"2007":5042,"2008":5932,"2009":6978,"2010":8210,"2011":9659,"2012":11363,"2013":13368,"2014":15727,"2015":18503,"2016":21768,"2017":25610,"2018":30129,"2019":35446,"2020":41701,"2021":49060,"Make":"Mercedes Benz","Model":"E 200 4MATIC Sedan"},{"2006":4447,"2007":5232,"2008":6155,"2009":7241,"2010":8519,"2011":10022,"2012":11791,"2013":13872,"2014":16320,"2015":19199,"2016":22588,"2017":26574,"2018":31263,"2019":36780,"2020":43271,"2021":50907,"Make":"Mercedes Benz","Model":"E 200 4MATIC Coupe"},{"2006":4682,"2007":5508,"2008":6480,"2009":7624,"2010":8969,"2011":10552,"2012":12414,"2013":14605,"2014":17182,"2015":20214,"2016":23781,"2017":27978,"2018":32915,"2019":38724,"2020":45558,"2021":53597,"Make":"Mercedes Benz","Model":"E 200 Cabriolet"},{"2006":4464,"2007":5252,"2008":6178,"2009":7269,"2010":8551,"2011":10060,"2012":11836,"2013":13924,"2014":16381,"2015":19272,"2016":22673,"2017":26675,"2018":31382,"2019":36920,"2020":43435,"2021":51100,"Make":"Mercedes Benz","Model":"E 220"},{"2006":4499,"2007":5293,"2008":6227,"2009":7325,"2010":8618,"2011":10139,"2012":11928,"2013":14033,"2014":16510,"2015":19423,"2016":22851,"2017":26883,"2018":31627,"2019":37209,"2020":43775,"2021":51500,"Make":"Mercedes Benz","Model":"E 240"},{"2006":4525,"2007":5323,"2008":6263,"2009":7368,"2010":8668,"2011":10198,"2012":11998,"2013":14115,"2014":16606,"2015":19536,"2016":22984,"2017":27040,"2018":31812,"2019":37426,"2020":44030,"2021":51800,"Make":"Mercedes Benz","Model":"E 280"},{"2006":4612,"2007":5426,"2008":6384,"2009":7510,"2010":8836,"2011":10395,"2012":12229,"2013":14387,"2014":16926,"2015":19913,"2016":23427,"2017":27561,"2018":32425,"2019":38147,"2020":44879,"2021":52799,"Make":"Mercedes Benz","Model":"E 300 Sedan"},{"2006":4759,"2007":5598,"2008":6586,"2009":7749,"2010":9116,"2011":10725,"2012":12617,"2013":14844,"2014":17463,"2015":20545,"2016":24171,"2017":28436,"2018":33454,"2019":39358,"2020":46304,"2021":54475,"Make":"Mercedes Benz","Model":"E 300 Coupe"},{"2006":5223,"2007":6144,"2008":7229,"2009":8504,"2010":10005,"2011":11771,"2012":13848,"2013":16291,"2014":19166,"2015":22549,"2016":26528,"2017":31209,"2018":36717,"2019":43196,"2020":50819,"2021":59787,"Make":"Mercedes Benz","Model":"E 300 Cabriolet"},{"2006":4909,"2007":5776,"2008":6795,"2009":7994,"2010":9405,"2011":11064,"2012":13017,"2013":15314,"2014":18016,"2015":21196,"2016":24936,"2017":29337,"2018":34514,"2019":40605,"2020":47770,"2021":56200,"Make":"Mercedes Benz","Model":"E 320"},{"2006":4891,"2007":5754,"2008":6770,"2009":7964,"2010":9370,"2011":11023,"2012":12968,"2013":15257,"2014":17949,"2015":21117,"2016":24844,"2017":29228,"2018":34386,"2019":40454,"2020":47592,"2021":55991,"Make":"Mercedes Benz","Model":"E 350 Sedan"},{"2006":4758,"2007":5597,"2008":6585,"2009":7747,"2010":9114,"2011":10722,"2012":12615,"2013":14841,"2014":17460,"2015":20541,"2016":24166,"2017":28430,"2018":33447,"2019":39350,"2020":46294,"2021":54464,"Make":"Mercedes Benz","Model":"E 400 Coupe"},{"2006":5257,"2007":6184,"2008":7275,"2009":8559,"2010":10070,"2011":11847,"2012":13938,"2013":16397,"2014":19291,"2015":22695,"2016":26700,"2017":31412,"2018":36955,"2019":43476,"2020":51149,"2021":60175,"Make":"Mercedes Benz","Model":"E 400 4MATIC Sedan"},{"2006":5407,"2007":6362,"2008":7484,"2009":8805,"2010":10359,"2011":12187,"2012":14338,"2013":16868,"2014":19844,"2015":23346,"2016":27466,"2017":32313,"2018":38016,"2019":44724,"2020":52617,"2021":61902,"Make":"Mercedes Benz","Model":"E 450 4MATIC Sedan"},{"2006":5448,"2007":6410,"2008":7541,"2009":8872,"2010":10437,"2011":12279,"2012":14446,"2013":16995,"2014":19994,"2015":23523,"2016":27674,"2017":32557,"2018":38303,"2019":45062,"2020":53014,"2021":62369,"Make":"Mercedes Benz","Model":"E 400 4MATIC Coupe"},{"2006":5621,"2007":6613,"2008":7780,"2009":9153,"2010":10768,"2011":12668,"2012":14904,"2013":17534,"2014":20628,"2015":24269,"2016":28551,"2017":33590,"2018":39517,"2019":46491,"2020":54695,"2021":64347,"Make":"Mercedes Benz","Model":"E 450 4MATIC Coupe"},{"2006":6085,"2007":7159,"2008":8422,"2009":9909,"2010":11657,"2011":13714,"2012":16134,"2013":18982,"2014":22331,"2015":26272,"2016":30908,"2017":36363,"2018":42780,"2019":50329,"2020":59211,"2021":69660,"Make":"Mercedes Benz","Model":"E 450 4MATIC Cabriolet"},{"2006":5372,"2007":6320,"2008":7436,"2009":8748,"2010":10292,"2011":12108,"2012":14244,"2013":16758,"2014":19715,"2015":23195,"2016":27288,"2017":32103,"2018":37769,"2019":44434,"2020":52275,"2021":61500,"Make":"Mercedes Benz","Model":"Е 500"},{"2006":5460,"2007":6423,"2008":7557,"2009":8890,"2010":10459,"2011":12305,"2012":14476,"2013":17031,"2014":20036,"2015":23572,"2016":27732,"2017":32625,"2018":38383,"2019":45156,"2020":53125,"2021":62500,"Make":"Mercedes Benz","Model":"Е 550"},{"2006":6849,"2007":8058,"2008":9480,"2009":11153,"2010":13121,"2011":15437,"2012":18161,"2013":21366,"2014":25136,"2015":29572,"2016":34791,"2017":40930,"2018":48153,"2019":56651,"2020":66648,"2021":78409,"Make":"Mercedes Benz","Model":"AMG Е 53 4MATIC+ Sedan"},{"2006":7001,"2007":8236,"2008":9690,"2009":11400,"2010":13411,"2011":15778,"2012":18562,"2013":21838,"2014":25692,"2015":30226,"2016":35559,"2017":41835,"2018":49217,"2019":57903,"2020":68121,"2021":80142,"Make":"Mercedes Benz","Model":"AMG Е 53 4MATIC+ Coupe"},{"2006":7465,"2007":8782,"2008":10332,"2009":12155,"2010":14300,"2011":16824,"2012":19793,"2013":23286,"2014":27395,"2015":32229,"2016":37917,"2017":44608,"2018":52480,"2019":61741,"2020":72636,"2021":85454,"Make":"Mercedes Benz","Model":"AMG Е 53 4MATIC+ Cabriolet"},{"2006":9358,"2007":11010,"2008":12953,"2009":15239,"2010":17928,"2011":21091,"2012":24813,"2013":29192,"2014":34344,"2015":40405,"2016":47535,"2017":55923,"2018":65792,"2019":77403,"2020":91062,"2021":107132,"Make":"Mercedes Benz","Model":"AMG Е 63 4MATIC+ Sedan"},{"2006":10389,"2007":12222,"2008":14379,"2009":16917,"2010":19902,"2011":23414,"2012":27546,"2013":32407,"2014":38126,"2015":44855,"2016":52770,"2017":62082,"2018":73038,"2019":85927,"2020":101091,"2021":118931,"Make":"Mercedes Benz","Model":"AMG Е 63 S 4MATIC+ Sedan"},{"2006":7443,"2007":8756,"2008":10301,"2009":12119,"2010":14258,"2011":16774,"2012":19734,"2013":23216,"2014":27313,"2015":32133,"2016":37804,"2017":44475,"2018":52323,"2019":61557,"2020":72420,"2021":85200,"Make":"Mercedes Benz","Model":"S до 400"},{"2006":7709,"2007":9069,"2008":10670,"2009":12553,"2010":14768,"2011":17374,"2012":20440,"2013":24047,"2014":28291,"2015":33283,"2016":39157,"2017":46067,"2018":54197,"2019":63761,"2020":75013,"2021":88250,"Make":"Mercedes Benz","Model":"S от 400 до 500"},{"2006":7936,"2007":9337,"2008":10984,"2009":12923,"2010":15203,"2011":17886,"2012":21042,"2013":24756,"2014":29124,"2015":34264,"2016":40311,"2017":47424,"2018":55793,"2019":65639,"2020":77223,"2021":90850,"Make":"Mercedes Benz","Model":"S 500"},{"2006":8093,"2007":9522,"2008":11202,"2009":13179,"2010":15504,"2011":18240,"2012":21459,"2013":25246,"2014":29701,"2015":34943,"2016":41109,"2017":48364,"2018":56899,"2019":66940,"2020":78753,"2021":92650,"Make":"Mercedes Benz","Model":"S 550"},{"2006":8521,"2007":10025,"2008":11794,"2009":13876,"2010":16324,"2011":19205,"2012":22594,"2013":26581,"2014":31272,"2015":36791,"2016":43283,"2017":50922,"2018":59908,"2019":70480,"2020":82918,"2021":97550,"Make":"Mercedes Benz","Model":"S 560"},{"2006":9229,"2007":10858,"2008":12774,"2009":15028,"2010":17680,"2011":20800,"2012":24470,"2013":28789,"2014":33869,"2015":39846,"2016":46877,"2017":55150,"2018":64882,"2019":76332,"2020":89803,"2021":105650,"Make":"Mercedes Benz","Model":"S 600"},{"2006":9156,"2007":10771,"2008":12672,"2009":14909,"2010":17540,"2011":20635,"2012":24276,"2013":28560,"2014":33600,"2015":39530,"2016":46505,"2017":54712,"2018":64367,"2019":75726,"2020":89090,"2021":104812,"Make":"Mercedes Benz","Model":"S 450 4MATIC Sedan Long"},{"2006":12646,"2007":14877,"2008":17503,"2009":20591,"2010":24225,"2011":28500,"2012":33530,"2013":39447,"2014":46408,"2015":54597,"2016":64232,"2017":75567,"2018":88903,"2019":104591,"2020":123048,"2021":144763,"Make":"Mercedes Benz","Model":"Maybach S 450 4MATIC"},{"2006":13428,"2007":15798,"2008":18586,"2009":21865,"2010":25724,"2011":30264,"2012":35604,"2013":41887,"2014":49279,"2015":57975,"2016":68206,"2017":80243,"2018":94403,"2019":111063,"2020":130662,"2021":153720,"Make":"Mercedes Benz","Model":"Maybach S 560 4MATIC"},{"2006":13585,"2007":15983,"2008":18803,"2009":22121,"2010":26025,"2011":30618,"2012":36021,"2013":42378,"2014":49856,"2015":58654,"2016":69005,"2017":81182,"2018":95509,"2019":112363,"2020":132192,"2021":155520,"Make":"Mercedes Benz","Model":"Maybach S 650 4MATIC"},{"2006":14193,"2007":16698,"2008":19645,"2009":23111,"2010":27190,"2011":31988,"2012":37633,"2013":44274,"2014":52087,"2015":61279,"2016":72093,"2017":84816,"2018":99783,"2019":117392,"2020":138108,"2021":162480,"Make":"Mercedes Benz","Model":"AMG S 63 4MATIC"},{"2006":14382,"2007":16920,"2008":19906,"2009":23419,"2010":27551,"2011":32413,"2012":38133,"2013":44863,"2014":52780,"2015":62094,"2016":73052,"2017":85943,"2018":101110,"2019":118952,"2020":139944,"2021":164640,"Make":"Mercedes Benz","Model":"AMG S 65 4MATIC"},{"2006":7469,"2007":8787,"2008":10337,"2009":12162,"2010":14308,"2011":16833,"2012":19803,"2013":23298,"2014":27409,"2015":32246,"2016":37937,"2017":44632,"2018":52508,"2019":61774,"2020":72675,"2021":85500,"Make":"Mercedes Benz","Model":"SL до 400"},{"2006":8482,"2007":9979,"2008":11740,"2009":13812,"2010":16249,"2011":19117,"2012":22490,"2013":26459,"2014":31128,"2015":36621,"2016":43084,"2017":50687,"2018":59632,"2019":70155,"2020":82535,"2021":97100,"Make":"Mercedes Benz","Model":"SL от 400 до 500"},{"2006":9434,"2007":11099,"2008":13058,"2009":15362,"2010":18073,"2011":21262,"2012":25015,"2013":29429,"2014":34622,"2015":40732,"2016":47920,"2017":56377,"2018":66326,"2019":78030,"2020":91800,"2021":108000,"Make":"Mercedes Benz","Model":"AMG SL 63"},{"2006":4210,"2007":4953,"2008":5828,"2009":6856,"2010":8066,"2011":9489,"2012":11164,"2013":13134,"2014":15452,"2015":18179,"2016":21387,"2017":25161,"2018":29601,"2019":34825,"2020":40970,"2021":48200,"Make":"Mercedes Benz","Model":"SLC до 250"},{"2006":4481,"2007":5272,"2008":6202,"2009":7297,"2010":8585,"2011":10100,"2012":11882,"2013":13979,"2014":16446,"2015":19348,"2016":22762,"2017":26779,"2018":31505,"2019":37064,"2020":43605,"2021":51300,"Make":"Mercedes Benz","Model":"SLC от 250 до 400"},{"2006":5084,"2007":5981,"2008":7037,"2009":8278,"2010":9739,"2011":11458,"2012":13480,"2013":15859,"2014":18658,"2015":21950,"2016":25824,"2017":30381,"2018":35742,"2019":42050,"2020":49470,"2021":58200,"Make":"Mercedes Benz","Model":"AMG SLC 43"},{"2006":7761,"2007":9131,"2008":10742,"2009":12638,"2010":14868,"2011":17491,"2012":20578,"2013":24210,"2014":28482,"2015":33508,"2016":39421,"2017":46378,"2018":54562,"2019":64191,"2020":75519,"2021":88846,"Make":"Mercedes Benz","Model":"AMG GT 43"},{"2006":8050,"2007":9470,"2008":11142,"2009":13108,"2010":15421,"2011":18142,"2012":21344,"2013":25111,"2014":29542,"2015":34755,"2016":40888,"2017":48104,"2018":56593,"2019":66580,"2020":78329,"2021":92152,"Make":"Mercedes Benz","Model":"AMG GT 43 4MATIC+"},{"2006":9225,"2007":10853,"2008":12768,"2009":15021,"2010":17672,"2011":20791,"2012":24460,"2013":28776,"2014":33854,"2015":39828,"2016":46857,"2017":55126,"2018":64854,"2019":76299,"2020":89763,"2021":105604,"Make":"Mercedes Benz","Model":"AMG GT 53 4MATIC+"},{"2006":10200,"2007":12000,"2008":14118,"2009":16610,"2010":19541,"2011":22989,"2012":27046,"2013":31819,"2014":37434,"2015":44040,"2016":51812,"2017":60955,"2018":71711,"2019":84366,"2020":99255,"2021":116770,"Make":"Mercedes Benz","Model":"AMG GT"},{"2006":11196,"2007":13172,"2008":15496,"2009":18231,"2010":21448,"2011":25233,"2012":29686,"2013":34925,"2014":41088,"2015":48339,"2016":56870,"2017":66906,"2018":78713,"2019":92603,"2020":108945,"2021":128170,"Make":"Mercedes Benz","Model":"AMG GT Roadster"},{"2006":12676,"2007":14912,"2008":17544,"2009":20640,"2010":24282,"2011":28567,"2012":33609,"2013":39540,"2014":46517,"2015":54726,"2016":64384,"2017":75746,"2018":89113,"2019":104838,"2020":123339,"2021":145105,"Make":"Mercedes Benz","Model":"AMG GT 63 4MATIC+"},{"2006":12824,"2007":15087,"2008":17749,"2009":20882,"2010":24567,"2011":28902,"2012":34002,"2013":40003,"2014":47062,"2015":55367,"2016":65137,"2017":76632,"2018":90156,"2019":106066,"2020":124783,"2021":146804,"Make":"Mercedes Benz","Model":"AMG GT C"},{"2006":13820,"2007":16259,"2008":19128,"2009":22503,"2010":26474,"2011":31146,"2012":36643,"2013":43109,"2014":50716,"2015":59666,"2016":70196,"2017":82583,"2018":97157,"2019":114302,"2020":134473,"2021":158204,"Make":"Mercedes Benz","Model":"AMG GT C Roadster"},{"2006":14100,"2007":16588,"2008":19515,"2009":22959,"2010":27010,"2011":31777,"2012":37385,"2013":43982,"2014":51743,"2015":60875,"2016":71617,"2017":84255,"2018":99124,"2019":116616,"2020":137196,"2021":161407,"Make":"Mercedes Benz","Model":"AMG GT 63 S 4MATIC+"},{"2006":14288,"2007":16809,"2008":19775,"2009":23265,"2010":27371,"2011":32201,"2012":37884,"2013":44569,"2014":52434,"2015":61687,"2016":72573,"2017":85380,"2018":100447,"2019":118173,"2020":139027,"2021":163562,"Make":"Mercedes Benz","Model":"AMG GT R"},{"2006":28757,"2007":33832,"2008":39803,"2009":46826,"2010":55090,"2011":64812,"2012":76249,"2013":89705,"2014":105535,"2015":124159,"2016":146069,"2017":171846,"2018":202172,"2019":237850,"2020":279823,"2021":329204,"Make":"Mercedes Benz","Model":"AMG GT Black Series"},{"2006":9617,"2007":11314,"2008":13310,"2009":15659,"2010":18423,"2011":21674,"2012":25499,"2013":29998,"2014":35292,"2015":41520,"2016":48847,"2017":57468,"2018":67609,"2019":79540,"2020":93576,"2021":110090,"Make":"Mercedes Benz","Model":"G"},{"2006":13211,"2007":15543,"2008":18286,"2009":21512,"2010":25309,"2011":29775,"2012":35029,"2013":41211,"2014":48483,"2015":57039,"2016":67105,"2017":78947,"2018":92879,"2019":109270,"2020":128552,"2021":151238,"Make":"Mercedes Benz","Model":"AMG G 63"},{"2006":2725,"2007":3206,"2008":3772,"2009":4438,"2010":5221,"2011":6142,"2012":7226,"2013":8502,"2014":10002,"2015":11767,"2016":13844,"2017":16287,"2018":19161,"2019":22542,"2020":26520,"2021":31200,"Make":"Mercedes Benz","Model":"GLA 180"},{"2006":3075,"2007":3618,"2008":4256,"2009":5007,"2010":5891,"2011":6931,"2012":8154,"2013":9593,"2014":11285,"2015":13277,"2016":15620,"2017":18376,"2018":21619,"2019":25434,"2020":29923,"2021":35203,"Make":"Mercedes Benz","Model":"GLA 200"},{"2006":3270,"2007":3847,"2008":4526,"2009":5325,"2010":6265,"2011":7371,"2012":8671,"2013":10201,"2014":12002,"2015":14120,"2016":16611,"2017":19543,"2018":22991,"2019":27049,"2020":31822,"2021":37438,"Make":"Mercedes Benz","Model":"GLA 200 4MATIC"},{"2006":3670,"2007":4318,"2008":5080,"2009":5976,"2010":7031,"2011":8272,"2012":9731,"2013":11449,"2014":13469,"2015":15846,"2016":18642,"2017":21932,"2018":25802,"2019":30356,"2020":35712,"2021":42015,"Make":"Mercedes Benz","Model":"GLA 250 4MATIC"},{"2006":4422,"2007":5202,"2008":6120,"2009":7200,"2010":8470,"2011":9965,"2012":11724,"2013":13792,"2014":16226,"2015":19090,"2016":22459,"2017":26422,"2018":31085,"2019":36570,"2020":43024,"2021":50616,"Make":"Mercedes Benz","Model":"AMG GLA 35 4MATIC"},{"2006":5607,"2007":6596,"2008":7760,"2009":9129,"2010":10740,"2011":12636,"2012":14866,"2013":17489,"2014":20575,"2015":24206,"2016":28478,"2017":33503,"2018":39416,"2019":46371,"2020":54555,"2021":64182,"Make":"Mercedes Benz","Model":"AMG GLA 45 S 4MATIC"},{"2006":3419,"2007":4022,"2008":4732,"2009":5567,"2010":6549,"2011":7705,"2012":9065,"2013":10664,"2014":12546,"2015":14760,"2016":17365,"2017":20429,"2018":24035,"2019":28276,"2020":33266,"2021":39136,"Make":"Mercedes Benz","Model":"GLB 200 4MATIC"},{"2006":3819,"2007":4492,"2008":5285,"2009":6218,"2010":7315,"2011":8606,"2012":10125,"2013":11911,"2014":14013,"2015":16486,"2016":19396,"2017":22819,"2018":26845,"2019":31583,"2020":37156,"2021":43713,"Make":"Mercedes Benz","Model":"GLB 250 4MATIC"},{"2006":3683,"2007":4332,"2008":5097,"2009":5997,"2010":7055,"2011":8300,"2012":9764,"2013":11487,"2014":13515,"2015":15900,"2016":18705,"2017":22006,"2018":25890,"2019":30459,"2020":35834,"2021":42157,"Make":"Mercedes Benz","Model":"GLC 200"},{"2006":3862,"2007":4543,"2008":5345,"2009":6288,"2010":7398,"2011":8704,"2012":10240,"2013":12047,"2014":14172,"2015":16673,"2016":19616,"2017":23077,"2018":27150,"2019":31941,"2020":37578,"2021":44209,"Make":"Mercedes Benz","Model":"GLC 200 4MATIC"},{"2006":4082,"2007":4802,"2008":5650,"2009":6647,"2010":7820,"2011":9200,"2012":10823,"2013":12733,"2014":14980,"2015":17624,"2016":20734,"2017":24393,"2018":28697,"2019":33761,"2020":39719,"2021":46729,"Make":"Mercedes Benz","Model":"GLC 200 Coupe"},{"2006":4473,"2007":5262,"2008":6190,"2009":7283,"2010":8568,"2011":10080,"2012":11859,"2013":13952,"2014":16414,"2015":19310,"2016":22718,"2017":26727,"2018":31443,"2019":36992,"2020":43520,"2021":51200,"Make":"Mercedes Benz","Model":"GLC 220 d 4MATIC"},{"2006":4507,"2007":5303,"2008":6239,"2009":7340,"2010":8635,"2011":10159,"2012":11951,"2013":14061,"2014":16542,"2015":19461,"2016":22895,"2017":26936,"2018":31689,"2019":37281,"2020":43860,"2021":51600,"Make":"Mercedes Benz","Model":"GLC 250 4MATIC"},{"2006":4477,"2007":5267,"2008":6196,"2009":7290,"2010":8576,"2011":10090,"2012":11870,"2013":13965,"2014":16429,"2015":19328,"2016":22739,"2017":26752,"2018":31473,"2019":37027,"2020":43561,"2021":51249,"Make":"Mercedes Benz","Model":"GLC 300 4MATIC"},{"2006":4884,"2007":5745,"2008":6759,"2009":7952,"2010":9355,"2011":11006,"2012":12949,"2013":15234,"2014":17922,"2015":21085,"2016":24806,"2017":29183,"2018":34333,"2019":40392,"2020":47520,"2021":55906,"Make":"Mercedes Benz","Model":"GLC 300 4MATIC Coupe"},{"2006":5080,"2007":5976,"2008":7031,"2009":8272,"2010":9731,"2011":11449,"2012":13469,"2013":15846,"2014":18642,"2015":21932,"2016":25802,"2017":30355,"2018":35712,"2019":42014,"2020":49429,"2021":58151,"Make":"Mercedes Benz","Model":"GLC 300 e 4MATIC Coupe"},{"2006":5503,"2007":6474,"2008":7617,"2009":8961,"2010":10543,"2011":12403,"2012":14592,"2013":17167,"2014":20196,"2015":23760,"2016":27953,"2017":32886,"2018":38690,"2019":45518,"2020":53550,"2021":63000,"Make":"Mercedes Benz","Model":"GLC 350 e 4MATIC"},{"2006":5730,"2007":6742,"2008":7931,"2009":9331,"2010":10978,"2011":12915,"2012":15194,"2013":17875,"2014":21030,"2015":24741,"2016":29107,"2017":34244,"2018":40287,"2019":47396,"2020":55760,"2021":65600,"Make":"Mercedes Benz","Model":"GLC 400"},{"2006":6010,"2007":7071,"2008":8318,"2009":9786,"2010":11513,"2011":13545,"2012":15935,"2013":18747,"2014":22056,"2015":25948,"2016":30527,"2017":35914,"2018":42252,"2019":49708,"2020":58480,"2021":68800,"Make":"Mercedes Benz","Model":"GLC 450"},{"2006":6324,"2007":7441,"2008":8754,"2009":10298,"2010":12116,"2011":14254,"2012":16769,"2013":19728,"2014":23210,"2015":27306,"2016":32124,"2017":37793,"2018":44463,"2019":52309,"2020":61540,"2021":72400,"Make":"Mercedes Benz","Model":"GLC 500"},{"2006":6604,"2007":7769,"2008":9140,"2009":10753,"2010":12651,"2011":14884,"2012":17510,"2013":20600,"2014":24236,"2015":28513,"2016":33544,"2017":39464,"2018":46428,"2019":54621,"2020":64260,"2021":75600,"Make":"Mercedes Benz","Model":"GLC 550"},{"2006":5567,"2007":6549,"2008":7705,"2009":9064,"2010":10664,"2011":12546,"2012":14760,"2013":17365,"2014":20429,"2015":24034,"2016":28276,"2017":33265,"2018":39136,"2019":46042,"2020":54167,"2021":63726,"Make":"Mercedes Benz","Model":"AMG GLC 43 4MATIC"},{"2006":5866,"2007":6902,"2008":8120,"2009":9553,"2010":11238,"2011":13222,"2012":15555,"2013":18300,"2014":21529,"2015":25328,"2016":29798,"2017":35057,"2018":41243,"2019":48521,"2020":57084,"2021":67157,"Make":"Mercedes Benz","Model":"AMG GLC 43 4MATIC Coupe"},{"2006":7131,"2007":8389,"2008":9869,"2009":11611,"2010":13660,"2011":16071,"2012":18907,"2013":22243,"2014":26169,"2015":30787,"2016":36220,"2017":42611,"2018":50131,"2019":58977,"2020":69385,"2021":81630,"Make":"Mercedes Benz","Model":"AMG GLC 63 4MATIC+"},{"2006":7868,"2007":9256,"2008":10889,"2009":12811,"2010":15072,"2011":17732,"2012":20861,"2013":24542,"2014":28873,"2015":33968,"2016":39963,"2017":47015,"2018":55312,"2019":65072,"2020":76556,"2021":90066,"Make":"Mercedes Benz","Model":"AMG GLC 63 S 4MATIC+"},{"2006":8167,"2007":9609,"2008":11304,"2009":13299,"2010":15646,"2011":18407,"2012":21656,"2013":25477,"2014":29973,"2015":35262,"2016":41485,"2017":48806,"2018":57419,"2019":67552,"2020":79473,"2021":93497,"Make":"Mercedes Benz","Model":"AMG GLC 63 S 4MATIC+ Coupe"},{"2006":5093,"2007":5991,"2008":7049,"2009":8293,"2010":9756,"2011":11478,"2012":13503,"2013":15886,"2014":18690,"2015":21988,"2016":25868,"2017":30433,"2018":35803,"2019":42122,"2020":49555,"2021":58300,"Make":"Mercedes Benz","Model":"GLЕ 250 d"},{"2006":5285,"2007":6218,"2008":7315,"2009":8606,"2010":10124,"2011":11911,"2012":14013,"2013":16486,"2014":19395,"2015":22818,"2016":26844,"2017":31581,"2018":37155,"2019":43711,"2020":51425,"2021":60500,"Make":"Mercedes Benz","Model":"GLЕ 350 d"},{"2006":5023,"2007":5909,"2008":6952,"2009":8179,"2010":9622,"2011":11320,"2012":13318,"2013":15668,"2014":18433,"2015":21686,"2016":25513,"2017":30015,"2018":35312,"2019":41544,"2020":48875,"2021":57500,"Make":"Mercedes Benz","Model":"GLЕ 250"},{"2006":5346,"2007":6290,"2008":7399,"2009":8705,"2010":10241,"2011":12049,"2012":14175,"2013":16676,"2014":19619,"2015":23082,"2016":27155,"2017":31947,"2018":37584,"2019":44217,"2020":52020,"2021":61200,"Make":"Mercedes Benz","Model":"GLЕ 300"},{"2006":5630,"2007":6624,"2008":7792,"2009":9167,"2010":10785,"2011":12689,"2012":14928,"2013":17562,"2014":20661,"2015":24307,"2016":28597,"2017":33643,"2018":39580,"2019":46565,"2020":54783,"2021":64450,"Make":"Mercedes Benz","Model":"GLЕ 350"},{"2006":5923,"2007":6968,"2008":8197,"2009":9644,"2010":11346,"2011":13348,"2012":15704,"2013":18475,"2014":21735,"2015":25571,"2016":30083,"2017":35392,"2018":41638,"2019":48986,"2020":57630,"2021":67800,"Make":"Mercedes Benz","Model":"GLЕ 400"},{"2006":6044,"2007":7111,"2008":8366,"2009":9842,"2010":11579,"2011":13622,"2012":16026,"2013":18854,"2014":22181,"2015":26096,"2016":30701,"2017":36119,"2018":42493,"2019":49991,"2020":58813,"2021":69192,"Make":"Mercedes Benz","Model":"GLЕ 450 4MATIC"},{"2006":6077,"2007":7150,"2008":8411,"2009":9896,"2010":11642,"2011":13696,"2012":16113,"2013":18957,"2014":22302,"2015":26238,"2016":30868,"2017":36315,"2018":42724,"2019":50263,"2020":59133,"2021":69569,"Make":"Mercedes Benz","Model":"GLЕ 500 e 4MATIC"},{"2006":6101,"2007":7178,"2008":8444,"2009":9934,"2010":11688,"2011":13750,"2012":16177,"2013":19031,"2014":22390,"2015":26341,"2016":30989,"2017":36458,"2018":42892,"2019":50461,"2020":59366,"2021":69842,"Make":"Mercedes Benz","Model":"GLЕ 450 4MATIC Coupe"},{"2006":7426,"2007":8737,"2008":10279,"2009":12093,"2010":14227,"2011":16737,"2012":19691,"2013":23166,"2014":27254,"2015":32064,"2016":37722,"2017":44379,"2018":52210,"2019":61424,"2020":72263,"2021":85016,"Make":"Mercedes Benz","Model":"GLЕ 580 4MATIC"},{"2006":7048,"2007":8292,"2008":9755,"2009":11477,"2010":13502,"2011":15885,"2012":18688,"2013":21985,"2014":25865,"2015":30430,"2016":35800,"2017":42117,"2018":49550,"2019":58294,"2020":68581,"2021":80684,"Make":"Mercedes Benz","Model":"AMG GLЕ 53 4MATIC+"},{"2006":7200,"2007":8470,"2008":9965,"2009":11724,"2010":13793,"2011":16227,"2012":19090,"2013":22459,"2014":26423,"2015":31085,"2016":36571,"2017":43025,"2018":50617,"2019":59550,"2020":70059,"2021":82422,"Make":"Mercedes Benz","Model":"AMG GLE 53 4MATIC+ Coupe"},{"2006":10023,"2007":11792,"2008":13873,"2009":16321,"2010":19201,"2011":22590,"2012":26576,"2013":31266,"2014":36783,"2015":43275,"2016":50911,"2017":59896,"2018":70465,"2019":82900,"2020":97530,"2021":114741,"Make":"Mercedes Benz","Model":"AMG GLЕ 63 4MATIC+"},{"2006":10401,"2007":12236,"2008":14395,"2009":16936,"2010":19924,"2011":23440,"2012":27577,"2013":32443,"2014":38168,"2015":44904,"2016":52828,"2017":62151,"2018":73119,"2019":86022,"2020":101202,"2021":119062,"Make":"Mercedes Benz","Model":"AMG GLE 63 4MATIC+ Coupe"},{"2006":10984,"2007":12922,"2008":15203,"2009":17886,"2010":21042,"2011":24755,"2012":29124,"2013":34264,"2014":40310,"2015":47424,"2016":55792,"2017":65638,"2018":77221,"2019":90849,"2020":106881,"2021":125742,"Make":"Mercedes Benz","Model":"AMG GLE 63 S 4MATIC+"},{"2006":11386,"2007":13396,"2008":15760,"2009":18541,"2010":21813,"2011":25662,"2012":30191,"2013":35518,"2014":41786,"2015":49161,"2016":57836,"2017":68042,"2018":80050,"2019":94176,"2020":110795,"2021":130348,"Make":"Mercedes Benz","Model":"AMG GLE 63 S 4MATIC+ Coupe"},{"2006":6744,"2007":7934,"2008":9334,"2009":10981,"2010":12919,"2011":15199,"2012":17881,"2013":21036,"2014":24749,"2015":29116,"2016":34254,"2017":40299,"2018":47410,"2019":55777,"2020":65620,"2021":77200,"Make":"Mercedes Benz","Model":"GLS 350 d 4MATIC"},{"2006":6884,"2007":8098,"2008":9527,"2009":11209,"2010":13187,"2011":15514,"2012":18251,"2013":21472,"2014":25261,"2015":29719,"2016":34964,"2017":41134,"2018":48393,"2019":56933,"2020":66980,"2021":78800,"Make":"Mercedes Benz","Model":"GLS 400 4MATIC"},{"2006":6679,"2007":7857,"2008":9244,"2009":10875,"2010":12794,"2011":15052,"2012":17708,"2013":20833,"2014":24509,"2015":28835,"2016":33923,"2017":39910,"2018":46952,"2019":55238,"2020":64986,"2021":76454,"Make":"Mercedes Benz","Model":"GLS 450 4MATIC"},{"2006":8229,"2007":9681,"2008":11389,"2009":13399,"2010":15764,"2011":18546,"2012":21818,"2013":25669,"2014":30198,"2015":35527,"2016":41797,"2017":49173,"2018":57851,"2019":68060,"2020":80070,"2021":94200,"Make":"Mercedes Benz","Model":"GLS 500 4MATIC"},{"2006":8856,"2007":10419,"2008":12258,"2009":14421,"2010":16966,"2011":19960,"2012":23483,"2013":27627,"2014":32502,"2015":38238,"2016":44985,"2017":52924,"2018":62264,"2019":73251,"2020":86178,"2021":101386,"Make":"Mercedes Benz","Model":"GLS 580 4MATIC"},{"2006":12221,"2007":14378,"2008":16915,"2009":19900,"2010":23411,"2011":27543,"2012":32403,"2013":38122,"2014":44849,"2015":52764,"2016":62075,"2017":73029,"2018":85917,"2019":101078,"2020":118916,"2021":139901,"Make":"Mercedes Benz","Model":"AMG GLS 63 4MATIC+"},{"2006":13093,"2007":15403,"2008":18121,"2009":21319,"2010":25082,"2011":29508,"2012":34715,"2013":40841,"2014":48049,"2015":56528,"2016":66503,"2017":78239,"2018":92046,"2019":108289,"2020":127399,"2021":149882,"Make":"Mercedes Benz","Model":"Mercedes Maybach GLS 600 4MATIC"},{"2006":4106,"2007":4830,"2008":5683,"2009":6685,"2010":7865,"2011":9253,"2012":10886,"2013":12807,"2014":15067,"2015":17726,"2016":20854,"2017":24534,"2018":28864,"2019":33958,"2020":39950,"2021":47000,"Make":"Mercedes Benz","Model":"ML 250 4MATIC"},{"2006":4481,"2007":5272,"2008":6202,"2009":7297,"2010":8585,"2011":10100,"2012":11882,"2013":13979,"2014":16446,"2015":19348,"2016":22762,"2017":26779,"2018":31505,"2019":37064,"2020":43605,"2021":51300,"Make":"Mercedes Benz","Model":"ML 300 4MATIC"},{"2006":4673,"2007":5498,"2008":6468,"2009":7610,"2010":8953,"2011":10533,"2012":12392,"2013":14578,"2014":17151,"2015":20177,"2016":23738,"2017":27927,"2018":32856,"2019":38654,"2020":45475,"2021":53500,"Make":"Mercedes Benz","Model":"ML 350 4MATIC"},{"2006":4874,"2007":5735,"2008":6747,"2009":7937,"2010":9338,"2011":10986,"2012":12924,"2013":15205,"2014":17888,"2015":21045,"2016":24759,"2017":29128,"2018":34268,"2019":40316,"2020":47430,"2021":55800,"Make":"Mercedes Benz","Model":"ML 400 4MATIC"},{"2006":5119,"2007":6022,"2008":7085,"2009":8335,"2010":9806,"2011":11537,"2012":13573,"2013":15968,"2014":18786,"2015":22101,"2016":26001,"2017":30590,"2018":35988,"2019":42339,"2020":49810,"2021":58600,"Make":"Mercedes Benz","Model":"ML 450 4MATIC"},{"2006":5695,"2007":6701,"2008":7883,"2009":9274,"2010":10911,"2011":12836,"2012":15101,"2013":17766,"2014":20902,"2015":24590,"2016":28930,"2017":34035,"2018":40041,"2019":47107,"2020":55420,"2021":65200,"Make":"Mercedes Benz","Model":"ML 500 4MATIC"},{"2006":7469,"2007":8787,"2008":10337,"2009":12162,"2010":14308,"2011":16833,"2012":19803,"2013":23298,"2014":27409,"2015":32246,"2016":37937,"2017":44632,"2018":52508,"2019":61774,"2020":72675,"2021":85500,"Make":"Mercedes Benz","Model":"AMG ML 63"},{"2006":3494,"2007":4111,"2008":4836,"2009":5690,"2010":6694,"2011":7875,"2012":9265,"2013":10900,"2014":12823,"2015":15086,"2016":17748,"2017":20880,"2018":24565,"2019":28900,"2020":34000,"2021":40000,"Make":"Mercedes Benz","Model":"Х 220 d 4MATIC"},{"2006":4018,"2007":4727,"2008":5562,"2009":6543,"2010":7698,"2011":9056,"2012":10654,"2013":12535,"2014":14747,"2015":17349,"2016":20410,"2017":24012,"2018":28250,"2019":33235,"2020":39100,"2021":46000,"Make":"Mercedes Benz","Model":"Х 250 d 4MATIC"},{"2006":4542,"2007":5344,"2008":6287,"2009":7397,"2010":8702,"2011":10237,"2012":12044,"2013":14170,"2014":16670,"2015":19612,"2016":23073,"2017":27144,"2018":31935,"2019":37570,"2020":44200,"2021":52000,"Make":"Mercedes Benz","Model":"Х 350 d 4MATIC"},{"2006":3319,"2007":3905,"2008":4594,"2009":5405,"2010":6359,"2011":7481,"2012":8801,"2013":10355,"2014":12182,"2015":14332,"2016":16861,"2017":19836,"2018":23337,"2019":27455,"2020":32300,"2021":38000,"Make":"Mercedes Benz","Model":"Viano"},{"2006":2795,"2007":3289,"2008":3869,"2009":4552,"2010":5355,"2011":6300,"2012":7412,"2013":8720,"2014":10258,"2015":12069,"2016":14199,"2017":16704,"2018":19652,"2019":23120,"2020":27200,"2021":32000,"Make":"Mercedes Benz","Model":"Vito"},{"2006":3494,"2007":4111,"2008":4836,"2009":5690,"2010":6694,"2011":7875,"2012":9265,"2013":10900,"2014":12823,"2015":15086,"2016":17748,"2017":20880,"2018":24565,"2019":28900,"2020":34000,"2021":40000,"Make":"Mercedes Benz","Model":"V 200"},{"2006":3844,"2007":4522,"2008":5320,"2009":6259,"2010":7363,"2011":8662,"2012":10191,"2013":11990,"2014":14105,"2015":16595,"2016":19523,"2017":22968,"2018":27022,"2019":31790,"2020":37400,"2021":44000,"Make":"Mercedes Benz","Model":"V 220"},{"2006":4193,"2007":4933,"2008":5803,"2009":6828,"2010":8032,"2011":9450,"2012":11118,"2013":13080,"2014":15388,"2015":18103,"2016":21298,"2017":25056,"2018":29478,"2019":34680,"2020":40800,"2021":48000,"Make":"Mercedes Benz","Model":"V 250"},{"2006":2708,"2007":3186,"2008":3748,"2009":4409,"2010":5188,"2011":6103,"2012":7180,"2013":8447,"2014":9938,"2015":11692,"2016":13755,"2017":16182,"2018":19038,"2019":22398,"2020":26350,"2021":31000,"Make":"Mini","Model":"John Cooper Works"},{"2006":2446,"2007":2878,"2008":3385,"2009":3983,"2010":4686,"2011":5512,"2012":6485,"2013":7630,"2014":8976,"2015":10560,"2016":12424,"2017":14616,"2018":17196,"2019":20230,"2020":23800,"2021":28000,"Make":"Mini","Model":"Countryman"},{"2006":1965,"2007":2312,"2008":2720,"2009":3200,"2010":3765,"2011":4430,"2012":5211,"2013":6131,"2014":7213,"2015":8486,"2016":9983,"2017":11745,"2018":13818,"2019":16256,"2020":19125,"2021":22500,"Make":"Mini","Model":"Cooper (5 дверей)"},{"2006":2184,"2007":2569,"2008":3023,"2009":3556,"2010":4184,"2011":4922,"2012":5790,"2013":6812,"2014":8014,"2015":9429,"2016":11093,"2017":13050,"2018":15353,"2019":18063,"2020":21250,"2021":25000,"Make":"Mini","Model":"Cooper 1,5 (3 дверей)"},{"2006":2446,"2007":2878,"2008":3385,"2009":3983,"2010":4686,"2011":5512,"2012":6485,"2013":7630,"2014":8976,"2015":10560,"2016":12424,"2017":14616,"2018":17196,"2019":20230,"2020":23800,"2021":28000,"Make":"Mini","Model":"Cooper 2,0 (3 дверей)"},{"2006":2097,"2007":2466,"2008":2902,"2009":3414,"2010":4016,"2011":4725,"2012":5559,"2013":6540,"2014":7694,"2015":9052,"2016":10649,"2017":12528,"2018":14739,"2019":17340,"2020":20400,"2021":24000,"Make":"Mini","Model":"Clubman"},{"2006":1398,"2007":1644,"2008":1934,"2009":2276,"2010":2677,"2011":3150,"2012":3706,"2013":4360,"2014":5129,"2015":6034,"2016":7099,"2017":8352,"2018":9826,"2019":11560,"2020":13600,"2021":16000,"Make":"Mitsubishi","Model":"Lancer"},{"2006":1529,"2007":1798,"2008":2116,"2009":2489,"2010":2929,"2011":3445,"2012":4053,"2013":4769,"2014":5610,"2015":6600,"2016":7765,"2017":9135,"2018":10747,"2019":12644,"2020":14875,"2021":17500,"Make":"Mitsubishi","Model":"I-Miev"},{"2006":1660,"2007":1953,"2008":2297,"2009":2703,"2010":3180,"2011":3741,"2012":4401,"2013":5177,"2014":6091,"2015":7166,"2016":8430,"2017":9918,"2018":11668,"2019":13728,"2020":16150,"2021":19000,"Make":"Mitsubishi","Model":"Galant"},{"2006":2795,"2007":3289,"2008":3869,"2009":4552,"2010":5355,"2011":6300,"2012":7412,"2013":8720,"2014":10258,"2015":12069,"2016":14199,"2017":16704,"2018":19652,"2019":23120,"2020":27200,"2021":32000,"Make":"Mitsubishi","Model":"L 200"},{"2006":2883,"2007":3391,"2008":3990,"2009":4694,"2010":5522,"2011":6497,"2012":7643,"2013":8992,"2014":10579,"2015":12446,"2016":14642,"2017":17226,"2018":20266,"2019":23843,"2020":28050,"2021":33000,"Make":"Mitsubishi","Model":"Pajero до 2,5"},{"2006":3407,"2007":4008,"2008":4715,"2009":5547,"2010":6526,"2011":7678,"2012":9033,"2013":10627,"2014":12503,"2015":14709,"2016":17305,"2017":20358,"2018":23951,"2019":28178,"2020":33150,"2021":39000,"Make":"Mitsubishi","Model":"Pajero более 2,5"},{"2006":2228,"2007":2621,"2008":3083,"2009":3627,"2010":4267,"2011":5020,"2012":5906,"2013":6949,"2014":8175,"2015":9617,"2016":11314,"2017":13311,"2018":15660,"2019":18424,"2020":21675,"2021":25500,"Make":"Mitsubishi","Model":"Outlander 2,0"},{"2006":2359,"2007":2775,"2008":3264,"2009":3841,"2010":4518,"2011":5316,"2012":6254,"2013":7357,"2014":8656,"2015":10183,"2016":11980,"2017":14094,"2018":16581,"2019":19508,"2020":22950,"2021":27000,"Make":"Mitsubishi","Model":"Outlander 2,4"},{"2006":2708,"2007":3186,"2008":3748,"2009":4409,"2010":5188,"2011":6103,"2012":7180,"2013":8447,"2014":9938,"2015":11692,"2016":13755,"2017":16182,"2018":19038,"2019":22398,"2020":26350,"2021":31000,"Make":"Mitsubishi","Model":"Outlander 3,0"},{"2006":1485,"2007":1747,"2008":2055,"2009":2418,"2010":2845,"2011":3347,"2012":3937,"2013":4632,"2014":5450,"2015":6412,"2016":7543,"2017":8874,"2018":10440,"2019":12283,"2020":14450,"2021":17000,"Make":"Mitsubishi","Model":"ASX 1,6"},{"2006":1834,"2007":2158,"2008":2539,"2009":2987,"2010":3514,"2011":4134,"2012":4864,"2013":5722,"2014":6732,"2015":7920,"2016":9318,"2017":10962,"2018":12897,"2019":15173,"2020":17850,"2021":21000,"Make":"Mitsubishi","Model":"ASX 2,0"},{"2006":2184,"2007":2569,"2008":3023,"2009":3556,"2010":4184,"2011":4922,"2012":5790,"2013":6812,"2014":8014,"2015":9429,"2016":11093,"2017":13050,"2018":15353,"2019":18063,"2020":21250,"2021":25000,"Make":"Mitsubishi","Model":"Eclipse Cross"},{"2006":2184,"2007":2569,"2008":3023,"2009":3556,"2010":4184,"2011":4922,"2012":5790,"2013":6812,"2014":8014,"2015":9429,"2016":11093,"2017":13050,"2018":15353,"2019":18063,"2020":21250,"2021":25000,"Make":"Mitsubishi","Model":"Grandis"},{"2006":1747,"2007":2055,"2008":2418,"2009":2845,"2010":3347,"2011":3937,"2012":4632,"2013":5450,"2014":6412,"2015":7543,"2016":8874,"2017":10440,"2018":12283,"2019":14450,"2020":17000,"2021":20000,"Make":"Mitsubishi","Model":"Space Wagon"},{"2006":668,"2007":786,"2008":925,"2009":1088,"2010":1280,"2011":1506,"2012":1772,"2013":2085,"2014":2452,"2015":2885,"2016":3394,"2017":3993,"2018":4698,"2019":5527,"2020":6503,"2021":7650,"Make":"Nexia","Model":"Nexia"},{"2006":2271,"2007":2672,"2008":3144,"2009":3698,"2010":4351,"2011":5119,"2012":6022,"2013":7085,"2014":8335,"2015":9806,"2016":11536,"2017":13572,"2018":15967,"2019":18785,"2020":22100,"2021":26000,"Make":"Nissan","Model":"Bluebird"},{"2006":9609,"2007":11305,"2008":13300,"2009":15647,"2010":18408,"2011":21656,"2012":25478,"2013":29974,"2014":35263,"2015":41486,"2016":48808,"2017":57421,"2018":67554,"2019":79475,"2020":93500,"2021":110000,"Make":"Nissan","Model":"GT-R"},{"2006":2446,"2007":2878,"2008":3385,"2009":3983,"2010":4686,"2011":5512,"2012":6485,"2013":7630,"2014":8976,"2015":10560,"2016":12424,"2017":14616,"2018":17196,"2019":20230,"2020":23800,"2021":28000,"Make":"Nissan","Model":"Primera"},{"2006":1398,"2007":1644,"2008":1934,"2009":2276,"2010":2677,"2011":3150,"2012":3706,"2013":4360,"2014":5129,"2015":6034,"2016":7099,"2017":8352,"2018":9826,"2019":11560,"2020":13600,"2021":16000,"Make":"Nissan","Model":"Versa"},{"2006":1485,"2007":1747,"2008":2055,"2009":2418,"2010":2845,"2011":3347,"2012":3937,"2013":4632,"2014":5450,"2015":6412,"2016":7543,"2017":8874,"2018":10440,"2019":12283,"2020":14450,"2021":17000,"Make":"Nissan","Model":"Sentra"},{"2006":2359,"2007":2775,"2008":3264,"2009":3841,"2010":4518,"2011":5316,"2012":6254,"2013":7357,"2014":8656,"2015":10183,"2016":11980,"2017":14094,"2018":16581,"2019":19508,"2020":22950,"2021":27000,"Make":"Nissan","Model":"Altima 2,5 S"},{"2006":2446,"2007":2878,"2008":3385,"2009":3983,"2010":4686,"2011":5512,"2012":6485,"2013":7630,"2014":8976,"2015":10560,"2016":12424,"2017":14616,"2018":17196,"2019":20230,"2020":23800,"2021":28000,"Make":"Nissan","Model":"Altima 2,5 SR"},{"2006":2621,"2007":3083,"2008":3627,"2009":4267,"2010":5020,"2011":5906,"2012":6949,"2013":8175,"2014":9617,"2015":11314,"2016":13311,"2017":15660,"2018":18424,"2019":21675,"2020":25500,"2021":30000,"Make":"Nissan","Model":"Altima 2,5 SV"},{"2006":2970,"2007":3494,"2008":4111,"2009":4836,"2010":5690,"2011":6694,"2012":7875,"2013":9265,"2014":10900,"2015":12823,"2016":15086,"2017":17748,"2018":20880,"2019":24565,"2020":28900,"2021":34000,"Make":"Nissan","Model":"Altima 2,5 SL"},{"2006":3145,"2007":3700,"2008":4353,"2009":5121,"2010":6024,"2011":7087,"2012":8338,"2013":9810,"2014":11541,"2015":13577,"2016":15973,"2017":18792,"2018":22109,"2019":26010,"2020":30600,"2021":36000,"Make":"Nissan","Model":"Altima 3,5 SL"},{"2006":2795,"2007":3289,"2008":3869,"2009":4552,"2010":5355,"2011":6300,"2012":7412,"2013":8720,"2014":10258,"2015":12069,"2016":14199,"2017":16704,"2018":19652,"2019":23120,"2020":27200,"2021":32000,"Make":"Nissan","Model":"Maxima"},{"2006":1354,"2007":1593,"2008":1874,"2009":2205,"2010":2594,"2011":3052,"2012":3590,"2013":4224,"2014":4969,"2015":5846,"2016":6877,"2017":8091,"2018":9519,"2019":11199,"2020":13175,"2021":15500,"Make":"Nissan","Model":"Micra"},{"2006":1354,"2007":1593,"2008":1874,"2009":2205,"2010":2594,"2011":3052,"2012":3590,"2013":4224,"2014":4969,"2015":5846,"2016":6877,"2017":8091,"2018":9519,"2019":11199,"2020":13175,"2021":15500,"Make":"Nissan","Model":"Tiida"},{"2006":1223,"2007":1439,"2008":1693,"2009":1991,"2010":2343,"2011":2756,"2012":3243,"2013":3815,"2014":4488,"2015":5280,"2016":6212,"2017":7308,"2018":8598,"2019":10115,"2020":11900,"2021":14000,"Make":"Nissan","Model":"Almera"},{"2006":1878,"2007":2210,"2008":2599,"2009":3058,"2010":3598,"2011":4233,"2012":4980,"2013":5859,"2014":6892,"2015":8109,"2016":9540,"2017":11223,"2018":13204,"2019":15534,"2020":18275,"2021":21500,"Make":"Nissan","Model":"Teana 2,5"},{"2006":2271,"2007":2672,"2008":3144,"2009":3698,"2010":4351,"2011":5119,"2012":6022,"2013":7085,"2014":8335,"2015":9806,"2016":11536,"2017":13572,"2018":15967,"2019":18785,"2020":22100,"2021":26000,"Make":"Nissan","Model":"Teana 3,5"},{"2006":874,"2007":1028,"2008":1209,"2009":1422,"2010":1673,"2011":1969,"2012":2316,"2013":2725,"2014":3206,"2015":3771,"2016":4437,"2017":5220,"2018":6141,"2019":7225,"2020":8500,"2021":10000,"Make":"Nissan","Model":"Note 1,4"},{"2006":1092,"2007":1285,"2008":1511,"2009":1778,"2010":2092,"2011":2461,"2012":2895,"2013":3406,"2014":4007,"2015":4714,"2016":5546,"2017":6525,"2018":7677,"2019":9031,"2020":10625,"2021":12500,"Make":"Nissan","Model":"Note 1,6"},{"2006":1223,"2007":1439,"2008":1693,"2009":1991,"2010":2343,"2011":2756,"2012":3243,"2013":3815,"2014":4488,"2015":5280,"2016":6212,"2017":7308,"2018":8598,"2019":10115,"2020":11900,"2021":14000,"Make":"Nissan","Model":"Terrano 1,6"},{"2006":1398,"2007":1644,"2008":1934,"2009":2276,"2010":2677,"2011":3150,"2012":3706,"2013":4360,"2014":5129,"2015":6034,"2016":7099,"2017":8352,"2018":9826,"2019":11560,"2020":13600,"2021":16000,"Make":"Nissan","Model":"Terrano 2,0"},{"2006":1572,"2007":1850,"2008":2176,"2009":2560,"2010":3012,"2011":3544,"2012":4169,"2013":4905,"2014":5770,"2015":6789,"2016":7987,"2017":9396,"2018":11054,"2019":13005,"2020":15300,"2021":18000,"Make":"Nissan","Model":"Juke"},{"2006":1572,"2007":1850,"2008":2176,"2009":2560,"2010":3012,"2011":3544,"2012":4169,"2013":4905,"2014":5770,"2015":6789,"2016":7987,"2017":9396,"2018":11054,"2019":13005,"2020":15300,"2021":18000,"Make":"Nissan","Model":"Qashqai 1,2"},{"2006":1922,"2007":2261,"2008":2660,"2009":3129,"2010":3682,"2011":4331,"2012":5096,"2013":5995,"2014":7053,"2015":8297,"2016":9762,"2017":11484,"2018":13511,"2019":15895,"2020":18700,"2021":22000,"Make":"Nissan","Model":"Qashqai 2,0"},{"2006":5241,"2007":6166,"2008":7254,"2009":8535,"2010":10041,"2011":11812,"2012":13897,"2013":16349,"2014":19235,"2015":22629,"2016":26622,"2017":31320,"2018":36848,"2019":43350,"2020":51000,"2021":60000,"Make":"Nissan","Model":"Patrol"},{"2006":3494,"2007":4111,"2008":4836,"2009":5690,"2010":6694,"2011":7875,"2012":9265,"2013":10900,"2014":12823,"2015":15086,"2016":17748,"2017":20880,"2018":24565,"2019":28900,"2020":34000,"2021":40000,"Make":"Nissan","Model":"Murano"},{"2006":3931,"2007":4625,"2008":5441,"2009":6401,"2010":7530,"2011":8859,"2012":10423,"2013":12262,"2014":14426,"2015":16972,"2016":19967,"2017":23490,"2018":27636,"2019":32513,"2020":38250,"2021":45000,"Make":"Nissan","Model":"Murano Гибрид"},{"2006":3407,"2007":4008,"2008":4715,"2009":5547,"2010":6526,"2011":7678,"2012":9033,"2013":10627,"2014":12503,"2015":14709,"2016":17305,"2017":20358,"2018":23951,"2019":28178,"2020":33150,"2021":39000,"Make":"Nissan","Model":"Pathfinder"},{"2006":2271,"2007":2672,"2008":3144,"2009":3698,"2010":4351,"2011":5119,"2012":6022,"2013":7085,"2014":8335,"2015":9806,"2016":11536,"2017":13572,"2018":15967,"2019":18785,"2020":22100,"2021":26000,"Make":"Nissan","Model":"X-Trail"},{"2006":2446,"2007":2878,"2008":3385,"2009":3983,"2010":4686,"2011":5512,"2012":6485,"2013":7630,"2014":8976,"2015":10560,"2016":12424,"2017":14616,"2018":17196,"2019":20230,"2020":23800,"2021":28000,"Make":"Nissan","Model":"X-Terra"},{"2006":1747,"2007":2055,"2008":2418,"2009":2845,"2010":3347,"2011":3937,"2012":4632,"2013":5450,"2014":6412,"2015":7543,"2016":8874,"2017":10440,"2018":12283,"2019":14450,"2020":17000,"2021":20000,"Make":"Nissan","Model":"NP300"},{"2006":2184,"2007":2569,"2008":3023,"2009":3556,"2010":4184,"2011":4922,"2012":5790,"2013":6812,"2014":8014,"2015":9429,"2016":11093,"2017":13050,"2018":15353,"2019":18063,"2020":21250,"2021":25000,"Make":"Nissan","Model":"Navara 2,5"},{"2006":2708,"2007":3186,"2008":3748,"2009":4409,"2010":5188,"2011":6103,"2012":7180,"2013":8447,"2014":9938,"2015":11692,"2016":13755,"2017":16182,"2018":19038,"2019":22398,"2020":26350,"2021":31000,"Make":"Nissan","Model":"Navara 3,0"},{"2006":3931,"2007":4625,"2008":5441,"2009":6401,"2010":7530,"2011":8859,"2012":10423,"2013":12262,"2014":14426,"2015":16972,"2016":19967,"2017":23490,"2018":27636,"2019":32513,"2020":38250,"2021":45000,"Make":"Nissan","Model":"Armada"},{"2006":1310,"2007":1542,"2008":1814,"2009":2134,"2010":2510,"2011":2953,"2012":3474,"2013":4087,"2014":4809,"2015":5657,"2016":6656,"2017":7830,"2018":9212,"2019":10838,"2020":12750,"2021":15000,"Make":"Opel","Model":"Adam"},{"2006":1345,"2007":1583,"2008":1862,"2009":2191,"2010":2577,"2011":3032,"2012":3567,"2013":4196,"2014":4937,"2015":5808,"2016":6833,"2017":8039,"2018":9458,"2019":11127,"2020":13090,"2021":15400,"Make":"Opel","Model":"Corsa ОРС (3-door)"},{"2006":874,"2007":1028,"2008":1209,"2009":1422,"2010":1673,"2011":1969,"2012":2316,"2013":2725,"2014":3206,"2015":3771,"2016":4437,"2017":5220,"2018":6141,"2019":7225,"2020":8500,"2021":10000,"Make":"Opel","Model":"Corsa (5-door) 1,2"},{"2006":978,"2007":1151,"2008":1354,"2009":1593,"2010":1874,"2011":2205,"2012":2594,"2013":3052,"2014":3590,"2015":4224,"2016":4969,"2017":5846,"2018":6878,"2019":8092,"2020":9520,"2021":11200,"Make":"Opel","Model":"Corsa (5-door) 1,4"},{"2006":1092,"2007":1285,"2008":1511,"2009":1778,"2010":2092,"2011":2461,"2012":2895,"2013":3406,"2014":4007,"2015":4714,"2016":5546,"2017":6525,"2018":7677,"2019":9031,"2020":10625,"2021":12500,"Make":"Opel","Model":"Karl"},{"2006":1240,"2007":1459,"2008":1717,"2009":2020,"2010":2376,"2011":2796,"2012":3289,"2013":3869,"2014":4552,"2015":5356,"2016":6301,"2017":7412,"2018":8721,"2019":10260,"2020":12070,"2021":14200,"Make":"Opel","Model":"Astra до 1,4"},{"2006":1267,"2007":1490,"2008":1753,"2009":2063,"2010":2426,"2011":2855,"2012":3358,"2013":3951,"2014":4648,"2015":5469,"2016":6434,"2017":7569,"2018":8905,"2019":10476,"2020":12325,"2021":14500,"Make":"Opel","Model":"Astra от 1,4 до 1,6"},{"2006":1354,"2007":1593,"2008":1874,"2009":2205,"2010":2594,"2011":3052,"2012":3590,"2013":4224,"2014":4969,"2015":5846,"2016":6877,"2017":8091,"2018":9519,"2019":11199,"2020":13175,"2021":15500,"Make":"Opel","Model":"Astra 1,6 и выше"},{"2006":1310,"2007":1542,"2008":1814,"2009":2134,"2010":2510,"2011":2953,"2012":3474,"2013":4087,"2014":4809,"2015":5657,"2016":6656,"2017":7830,"2018":9212,"2019":10838,"2020":12750,"2021":15000,"Make":"Opel","Model":"Meriva"},{"2006":3713,"2007":4368,"2008":5138,"2009":6045,"2010":7112,"2011":8367,"2012":9844,"2013":11581,"2014":13625,"2015":16029,"2016":18857,"2017":22185,"2018":26100,"2019":30706,"2020":36125,"2021":42500,"Make":"Opel","Model":"Ampera"},{"2006":2490,"2007":2929,"2008":3446,"2009":4054,"2010":4769,"2011":5611,"2012":6601,"2013":7766,"2014":9136,"2015":10749,"2016":12646,"2017":14877,"2018":17503,"2019":20591,"2020":24225,"2021":28500,"Make":"Opel","Model":"Insignia ОРС"},{"2006":1660,"2007":1953,"2008":2297,"2009":2703,"2010":3180,"2011":3741,"2012":4401,"2013":5177,"2014":6091,"2015":7166,"2016":8430,"2017":9918,"2018":11668,"2019":13728,"2020":16150,"2021":19000,"Make":"Opel","Model":"Insignia 1,6"},{"2006":1572,"2007":1850,"2008":2176,"2009":2560,"2010":3012,"2011":3544,"2012":4169,"2013":4905,"2014":5770,"2015":6789,"2016":7987,"2017":9396,"2018":11054,"2019":13005,"2020":15300,"2021":18000,"Make":"Opel","Model":"Insignia 1,8"},{"2006":2271,"2007":2672,"2008":3144,"2009":3698,"2010":4351,"2011":5119,"2012":6022,"2013":7085,"2014":8335,"2015":9806,"2016":11536,"2017":13572,"2018":15967,"2019":18785,"2020":22100,"2021":26000,"Make":"Opel","Model":"Insignia 2,0"},{"2006":1398,"2007":1644,"2008":1934,"2009":2276,"2010":2677,"2011":3150,"2012":3706,"2013":4360,"2014":5129,"2015":6034,"2016":7099,"2017":8352,"2018":9826,"2019":11560,"2020":13600,"2021":16000,"Make":"Opel","Model":"Vectra"},{"2006":1747,"2007":2055,"2008":2418,"2009":2845,"2010":3347,"2011":3937,"2012":4632,"2013":5450,"2014":6412,"2015":7543,"2016":8874,"2017":10440,"2018":12283,"2019":14450,"2020":17000,"2021":20000,"Make":"Opel","Model":"SIGNUM"},{"2006":1328,"2007":1562,"2008":1838,"2009":2162,"2010":2544,"2011":2992,"2012":3521,"2013":4142,"2014":4873,"2015":5733,"2016":6744,"2017":7934,"2018":9335,"2019":10982,"2020":12920,"2021":15200,"Make":"Opel","Model":"Astra (универсал)"},{"2006":1599,"2007":1881,"2008":2213,"2009":2603,"2010":3062,"2011":3603,"2012":4239,"2013":4987,"2014":5867,"2015":6902,"2016":8120,"2017":9553,"2018":11238,"2019":13222,"2020":15555,"2021":18300,"Make":"Opel","Model":"Zafira"},{"2006":1398,"2007":1644,"2008":1934,"2009":2276,"2010":2677,"2011":3150,"2012":3706,"2013":4360,"2014":5129,"2015":6034,"2016":7099,"2017":8352,"2018":9826,"2019":11560,"2020":13600,"2021":16000,"Make":"Opel","Model":"Combo"},{"2006":2446,"2007":2878,"2008":3385,"2009":3983,"2010":4686,"2011":5512,"2012":6485,"2013":7630,"2014":8976,"2015":10560,"2016":12424,"2017":14616,"2018":17196,"2019":20230,"2020":23800,"2021":28000,"Make":"Opel","Model":"Vivaro"},{"2006":1616,"2007":1901,"2008":2237,"2009":2631,"2010":3096,"2011":3642,"2012":4285,"2013":5041,"2014":5931,"2015":6977,"2016":8209,"2017":9657,"2018":11361,"2019":13366,"2020":15725,"2021":18500,"Make":"Opel","Model":"Insignia 1,6 (универсал)"},{"2006":1424,"2007":1675,"2008":1971,"2009":2319,"2010":2728,"2011":3209,"2012":3775,"2013":4442,"2014":5225,"2015":6148,"2016":7232,"2017":8509,"2018":10010,"2019":11777,"2020":13855,"2021":16300,"Make":"Opel","Model":"Insignia 1,8 (универсал)"},{"2006":1834,"2007":2158,"2008":2539,"2009":2987,"2010":3514,"2011":4134,"2012":4864,"2013":5722,"2014":6732,"2015":7920,"2016":9318,"2017":10962,"2018":12897,"2019":15173,"2020":17850,"2021":21000,"Make":"Opel","Model":"Insignia 2,0 (универсал)"},{"2006":2533,"2007":2980,"2008":3506,"2009":4125,"2010":4853,"2011":5709,"2012":6717,"2013":7902,"2014":9297,"2015":10937,"2016":12867,"2017":15138,"2018":17810,"2019":20953,"2020":24650,"2021":29000,"Make":"Opel","Model":"Insignia ОРС (универсал)"},{"2006":1791,"2007":2107,"2008":2479,"2009":2916,"2010":3431,"2011":4036,"2012":4748,"2013":5586,"2014":6572,"2015":7732,"2016":9096,"2017":10701,"2018":12590,"2019":14811,"2020":17425,"2021":20500,"Make":"Opel","Model":"Antara 2,2"},{"2006":1590,"2007":1870,"2008":2200,"2009":2589,"2010":3046,"2011":3583,"2012":4215,"2013":4959,"2014":5835,"2015":6864,"2016":8075,"2017":9501,"2018":11177,"2019":13150,"2020":15470,"2021":18200,"Make":"Opel","Model":"Antara 2,4"},{"2006":1878,"2007":2210,"2008":2599,"2009":3058,"2010":3598,"2011":4233,"2012":4980,"2013":5859,"2014":6892,"2015":8109,"2016":9540,"2017":11223,"2018":13204,"2019":15534,"2020":18275,"2021":21500,"Make":"Opel","Model":"Antara 3,0"},{"2006":796,"2007":915,"2008":1052,"2009":1209,"2010":1422,"2011":1673,"2012":1969,"2013":2316,"2014":2725,"2015":3206,"2016":3771,"2017":4437,"2018":5220,"2019":6141,"2020":7225,"2021":8500,"Make":"Peugeot","Model":107},{"2006":1358,"2007":1561,"2008":1794,"2009":2063,"2010":2426,"2011":2855,"2012":3358,"2013":3951,"2014":4648,"2015":5469,"2016":6434,"2017":7569,"2018":8905,"2019":10476,"2020":12325,"2021":14500,"Make":"Peugeot","Model":208},{"2006":1358,"2007":1561,"2008":1794,"2009":2063,"2010":2426,"2011":2855,"2012":3358,"2013":3951,"2014":4648,"2015":5469,"2016":6434,"2017":7569,"2018":8905,"2019":10476,"2020":12325,"2021":14500,"Make":"Peugeot","Model":301},{"2006":1686,"2007":1938,"2008":2228,"2009":2560,"2010":3012,"2011":3544,"2012":4169,"2013":4905,"2014":5770,"2015":6789,"2016":7987,"2017":9396,"2018":11054,"2019":13005,"2020":15300,"2021":18000,"Make":"Peugeot","Model":307},{"2006":2154,"2007":2476,"2008":2846,"2009":3272,"2010":3849,"2011":4528,"2012":5327,"2013":6267,"2014":7373,"2015":8674,"2016":10205,"2017":12006,"2018":14125,"2019":16618,"2020":19550,"2021":23000,"Make":"Peugeot","Model":308},{"2006":1686,"2007":1938,"2008":2228,"2009":2560,"2010":3012,"2011":3544,"2012":4169,"2013":4905,"2014":5770,"2015":6789,"2016":7987,"2017":9396,"2018":11054,"2019":13005,"2020":15300,"2021":18000,"Make":"Peugeot","Model":408},{"2006":2997,"2007":3445,"2008":3960,"2009":4552,"2010":5355,"2011":6300,"2012":7412,"2013":8720,"2014":10258,"2015":12069,"2016":14199,"2017":16704,"2018":19652,"2019":23120,"2020":27200,"2021":32000,"Make":"Peugeot","Model":508},{"2006":2061,"2007":2369,"2008":2723,"2009":3129,"2010":3682,"2011":4331,"2012":5096,"2013":5995,"2014":7053,"2015":8297,"2016":9762,"2017":11484,"2018":13511,"2019":15895,"2020":18700,"2021":22000,"Make":"Peugeot","Model":2008},{"2006":2623,"2007":3015,"2008":3465,"2009":3983,"2010":4686,"2011":5512,"2012":6485,"2013":7630,"2014":8976,"2015":10560,"2016":12424,"2017":14616,"2018":17196,"2019":20230,"2020":23800,"2021":28000,"Make":"Peugeot","Model":3008},{"2006":1873,"2007":2153,"2008":2475,"2009":2845,"2010":3347,"2011":3937,"2012":4632,"2013":5450,"2014":6412,"2015":7543,"2016":8874,"2017":10440,"2018":12283,"2019":14450,"2020":17000,"2021":20000,"Make":"Peugeot","Model":4007},{"2006":2061,"2007":2369,"2008":2723,"2009":3129,"2010":3682,"2011":4331,"2012":5096,"2013":5995,"2014":7053,"2015":8297,"2016":9762,"2017":11484,"2018":13511,"2019":15895,"2020":18700,"2021":22000,"Make":"Peugeot","Model":4008},{"2006":2810,"2007":3230,"2008":3713,"2009":4267,"2010":5020,"2011":5906,"2012":6949,"2013":8175,"2014":9617,"2015":11314,"2016":13311,"2017":15660,"2018":18424,"2019":21675,"2020":25500,"2021":30000,"Make":"Peugeot","Model":5008},{"2006":2061,"2007":2369,"2008":2723,"2009":3129,"2010":3682,"2011":4331,"2012":5096,"2013":5995,"2014":7053,"2015":8297,"2016":9762,"2017":11484,"2018":13511,"2019":15895,"2020":18700,"2021":22000,"Make":"Peugeot","Model":"Partner tepee"},{"2006":2623,"2007":3015,"2008":3465,"2009":3983,"2010":4686,"2011":5512,"2012":6485,"2013":7630,"2014":8976,"2015":10560,"2016":12424,"2017":14616,"2018":17196,"2019":20230,"2020":23800,"2021":28000,"Make":"Peugeot","Model":"Traveller 1,6"},{"2006":3185,"2007":3661,"2008":4208,"2009":4836,"2010":5690,"2011":6694,"2012":7875,"2013":9265,"2014":10900,"2015":12823,"2016":15086,"2017":17748,"2018":20880,"2019":24565,"2020":28900,"2021":34000,"Make":"Peugeot","Model":"Traveller 2,0"},{"2006":2716,"2007":3122,"2008":3589,"2009":4125,"2010":4853,"2011":5709,"2012":6717,"2013":7902,"2014":9297,"2015":10937,"2016":12867,"2017":15138,"2018":17810,"2019":20953,"2020":24650,"2021":29000,"Make":"Peugeot","Model":"Expert"},{"2006":7512,"2007":8838,"2008":10398,"2009":12233,"2010":14392,"2011":16931,"2012":19919,"2013":23434,"2014":27570,"2015":32435,"2016":38159,"2017":44893,"2018":52815,"2019":62135,"2020":73100,"2021":86000,"Make":"Porsche","Model":"Panamera Turbo 4,0"},{"2006":7338,"2007":8633,"2008":10156,"2009":11948,"2010":14057,"2011":16537,"2012":19456,"2013":22889,"2014":26928,"2015":31681,"2016":37271,"2017":43849,"2018":51587,"2019":60690,"2020":71400,"2021":84000,"Make":"Porsche","Model":"Panamera 3,0"},{"2006":7775,"2007":9147,"2008":10761,"2009":12660,"2010":14894,"2011":17522,"2012":20614,"2013":24252,"2014":28531,"2015":33566,"2016":39490,"2017":46459,"2018":54657,"2019":64303,"2020":75650,"2021":89000,"Make":"Porsche","Model":"Panamera 4S 2,9"},{"2006":8037,"2007":9455,"2008":11123,"2009":13086,"2010":15396,"2011":18112,"2012":21309,"2013":25069,"2014":29493,"2015":34698,"2016":40821,"2017":48025,"2018":56500,"2019":66470,"2020":78200,"2021":92000,"Make":"Porsche","Model":"Panamera 2,9 hybrid"},{"2006":8997,"2007":10585,"2008":12453,"2009":14651,"2010":17236,"2011":20278,"2012":23857,"2013":28067,"2014":33019,"2015":38846,"2016":45702,"2017":53767,"2018":63255,"2019":74418,"2020":87550,"2021":103000,"Make":"Porsche","Model":"911 Carrera"},{"2006":4936,"2007":5806,"2008":6831,"2009":8037,"2010":9455,"2011":11123,"2012":13086,"2013":15396,"2014":18113,"2015":21309,"2016":25069,"2017":29493,"2018":34698,"2019":40821,"2020":48025,"2021":56500,"Make":"Porsche","Model":"718 Cayman 2,0"},{"2006":6027,"2007":7091,"2008":8342,"2009":9815,"2010":11547,"2011":13584,"2012":15982,"2013":18802,"2014":22120,"2015":26023,"2016":30616,"2017":36018,"2018":42375,"2019":49853,"2020":58650,"2021":69000,"Make":"Porsche","Model":"718 Cayman 2,5"},{"2006":4909,"2007":5776,"2008":6795,"2009":7994,"2010":9405,"2011":11064,"2012":13017,"2013":15314,"2014":18016,"2015":21196,"2016":24936,"2017":29337,"2018":34514,"2019":40605,"2020":47770,"2021":56200,"Make":"Porsche","Model":"718 Boxster"},{"2006":5503,"2007":6474,"2008":7617,"2009":8961,"2010":10543,"2011":12403,"2012":14592,"2013":17167,"2014":20196,"2015":23760,"2016":27953,"2017":32886,"2018":38690,"2019":45518,"2020":53550,"2021":63000,"Make":"Porsche","Model":"Macan"},{"2006":7076,"2007":8324,"2008":9793,"2009":11522,"2010":13555,"2011":15947,"2012":18761,"2013":22072,"2014":25967,"2015":30549,"2016":35940,"2017":42283,"2018":49744,"2019":58523,"2020":68850,"2021":81000,"Make":"Porsche","Model":"Cayenne"},{"2006":6530,"2007":7682,"2008":9038,"2009":10633,"2010":12509,"2011":14716,"2012":17313,"2013":20369,"2014":23963,"2015":28192,"2016":33167,"2017":39020,"2018":45906,"2019":54007,"2020":63538,"2021":74750,"Make":"Range Rover","Model":"Vogue 3,0"},{"2006":6831,"2007":8037,"2008":9455,"2009":11123,"2010":13086,"2011":15396,"2012":18112,"2013":21309,"2014":25069,"2015":29493,"2016":34698,"2017":40821,"2018":48025,"2019":56500,"2020":66470,"2021":78200,"Make":"Range Rover","Model":"Vogue 4,4"},{"2006":5827,"2007":6855,"2008":8064,"2009":9488,"2010":11162,"2011":13132,"2012":15449,"2013":18175,"2014":21382,"2015":25156,"2016":29595,"2017":34818,"2018":40962,"2019":48191,"2020":56695,"2021":66700,"Make":"Range Rover","Model":"Sport 2,0"},{"2006":6228,"2007":7327,"2008":8621,"2009":10142,"2010":11932,"2011":14037,"2012":16514,"2013":19429,"2014":22857,"2015":26891,"2016":31636,"2017":37219,"2018":43787,"2019":51514,"2020":60605,"2021":71300,"Make":"Range Rover","Model":"Sport 3,0"},{"2006":6530,"2007":7682,"2008":9038,"2009":10633,"2010":12509,"2011":14716,"2012":17313,"2013":20369,"2014":23963,"2015":28192,"2016":33167,"2017":39020,"2018":45906,"2019":54007,"2020":63538,"2021":74750,"Make":"Range Rover","Model":"Sport 4,4"},{"2006":7032,"2007":8273,"2008":9733,"2009":11450,"2010":13471,"2011":15848,"2012":18645,"2013":21935,"2014":25806,"2015":30361,"2016":35718,"2017":42022,"2018":49437,"2019":58161,"2020":68425,"2021":80500,"Make":"Range Rover","Model":"Sport 5,0"},{"2006":5023,"2007":5909,"2008":6952,"2009":8179,"2010":9622,"2011":11320,"2012":13318,"2013":15668,"2014":18433,"2015":21686,"2016":25513,"2017":30015,"2018":35312,"2019":41544,"2020":48875,"2021":57500,"Make":"Range Rover","Model":"Evoque"},{"2006":5525,"2007":6500,"2008":7647,"2009":8997,"2010":10584,"2011":12452,"2012":14650,"2013":17235,"2014":20277,"2015":23855,"2016":28064,"2017":33017,"2018":38843,"2019":45698,"2020":53763,"2021":63250,"Make":"Range Rover","Model":"Discovery"},{"2006":7032,"2007":8273,"2008":9733,"2009":11450,"2010":13471,"2011":15848,"2012":18645,"2013":21935,"2014":25806,"2015":30361,"2016":35718,"2017":42022,"2018":49437,"2019":58161,"2020":68425,"2021":80500,"Make":"Range Rover","Model":"Velar 2,0"},{"2006":7534,"2007":8864,"2008":10428,"2009":12268,"2010":14433,"2011":16980,"2012":19977,"2013":23502,"2014":27650,"2015":32529,"2016":38270,"2017":45023,"2018":52968,"2019":62316,"2020":73313,"2021":86250,"Make":"Range Rover","Model":"Velar 3,0"},{"2006":3516,"2007":4136,"2008":4866,"2009":5725,"2010":6736,"2011":7924,"2012":9323,"2013":10968,"2014":12903,"2015":15180,"2016":17859,"2017":21011,"2018":24719,"2019":29081,"2020":34213,"2021":40250,"Make":"Range Rover","Model":"Defender"},{"2006":3817,"2007":4491,"2008":5284,"2009":6216,"2010":7313,"2011":8603,"2012":10122,"2013":11908,"2014":14009,"2015":16481,"2016":19390,"2017":22812,"2018":26837,"2019":31573,"2020":37145,"2021":43700,"Make":"Range Rover","Model":"Freelander"},{"2006":"","2007":"","2008":"","2009":"","2010":"","2011":"","2012":"","2013":"","2014":"","2015":2823,"2016":3321,"2017":3907,"2018":4597,"2019":5408,"2020":6362,"2021":7485,"Make":"Ravon","Model":"R2 Comfort AT"},{"2006":"","2007":"","2008":"","2009":"","2010":"","2011":"","2012":"","2013":"","2014":"","2015":2975,"2016":3500,"2017":4118,"2018":4845,"2019":5700,"2020":6706,"2021":7889,"Make":"Ravon","Model":"R2 Optimum AT"},{"2006":"","2007":"","2008":"","2009":"","2010":"","2011":"","2012":"","2013":"","2014":"","2015":3065,"2016":3606,"2017":4243,"2018":4992,"2019":5872,"2020":6909,"2021":8128,"Make":"Ravon","Model":"R2 Elegant AT"},{"2006":"","2007":"","2008":"","2009":"","2010":"","2011":"","2012":"","2013":"","2014":"","2015":2795,"2016":3288,"2017":3868,"2018":4551,"2019":5354,"2020":6299,"2021":7410,"Make":"Ravon","Model":"Nexia R3 Comfort МТ"},{"2006":"","2007":"","2008":"","2009":"","2010":"","2011":"","2012":"","2013":"","2014":"","2015":2918,"2016":3433,"2017":4039,"2018":4751,"2019":5590,"2020":6576,"2021":7737,"Make":"Ravon","Model":"Nexia R3 Optimum MT"},{"2006":"","2007":"","2008":"","2009":"","2010":"","2011":"","2012":"","2013":"","2014":"","2015":3085,"2016":3630,"2017":4271,"2018":5024,"2019":5911,"2020":6954,"2021":8181,"Make":"Ravon","Model":"Nexia R3 Optimum AT"},{"2006":"","2007":"","2008":"","2009":"","2010":"","2011":"","2012":"","2013":"","2014":"","2015":3148,"2016":3704,"2017":4358,"2018":5127,"2019":6031,"2020":7096,"2021":8348,"Make":"Ravon","Model":"Nexia R3 Elegant АТ"},{"2006":"","2007":"","2008":"","2009":"","2010":"","2011":"","2012":"","2013":"","2014":"","2015":2849,"2016":3352,"2017":3944,"2018":4640,"2019":5458,"2020":6422,"2021":7555,"Make":"Ravon","Model":"R4 Comfort MT"},{"2006":"","2007":"","2008":"","2009":"","2010":"","2011":"","2012":"","2013":"","2014":"","2015":2955,"2016":3476,"2017":4089,"2018":4811,"2019":5660,"2020":6659,"2021":7834,"Make":"Ravon","Model":"R4 Optimum MT"},{"2006":"","2007":"","2008":"","2009":"","2010":"","2011":"","2012":"","2013":"","2014":"","2015":3141,"2016":3696,"2017":4348,"2018":5115,"2019":6018,"2020":7080,"2021":8329,"Make":"Ravon","Model":"R4 Optimum AT"},{"2006":"","2007":"","2008":"","2009":"","2010":"","2011":"","2012":"","2013":"","2014":"","2015":3203,"2016":3768,"2017":4433,"2018":5216,"2019":6136,"2020":7219,"2021":8493,"Make":"Ravon","Model":"R4 Elegant AT"},{"2006":"","2007":"","2008":"","2009":"","2010":"","2011":"","2012":"","2013":"","2014":"","2015":3017,"2016":3550,"2017":4176,"2018":4913,"2019":5780,"2020":6800,"2021":8000,"Make":"Ravon","Model":"Gentra Comfort Plus MT"},{"2006":"","2007":"","2008":"","2009":"","2010":"","2011":"","2012":"","2013":"","2014":"","2015":3319,"2016":3905,"2017":4594,"2018":5404,"2019":6358,"2020":7480,"2021":8800,"Make":"Ravon","Model":"Gentra Comfort Plus AT"},{"2006":"","2007":"","2008":"","2009":"","2010":"","2011":"","2012":"","2013":"","2014":"","2015":3281,"2016":3860,"2017":4541,"2018":5343,"2019":6286,"2020":7395,"2021":8700,"Make":"Ravon","Model":"Gentra Optimum MT"},{"2006":"","2007":"","2008":"","2009":"","2010":"","2011":"","2012":"","2013":"","2014":"","2015":3432,"2016":4038,"2017":4750,"2018":5589,"2019":6575,"2020":7735,"2021":9100,"Make":"Ravon","Model":"Gentra Optimum AT"},{"2006":"","2007":"","2008":"","2009":"","2010":"","2011":"","2012":"","2013":"","2014":"","2015":3545,"2016":4171,"2017":4907,"2018":5773,"2019":6792,"2020":7990,"2021":9400,"Make":"Ravon","Model":"Gentra Elegant MT"},{"2006":"","2007":"","2008":"","2009":"","2010":"","2011":"","2012":"","2013":"","2014":"","2015":3417,"2016":4020,"2017":4729,"2018":5563,"2019":6545,"2020":7700,"2021":9059,"Make":"Ravon","Model":"Gentra Elegant AT"},{"2006":1405,"2007":1615,"2008":1856,"2009":2134,"2010":2510,"2011":2953,"2012":3474,"2013":4087,"2014":4809,"2015":5657,"2016":6656,"2017":7830,"2018":9212,"2019":10838,"2020":12750,"2021":15000,"Make":"Renault","Model":"Twizi"},{"2006":2154,"2007":2476,"2008":2846,"2009":3272,"2010":3849,"2011":4528,"2012":5327,"2013":6267,"2014":7373,"2015":8674,"2016":10205,"2017":12006,"2018":14125,"2019":16618,"2020":19550,"2021":23000,"Make":"Renault","Model":"Clio RS"},{"2006":937,"2007":1077,"2008":1238,"2009":1422,"2010":1673,"2011":1969,"2012":2316,"2013":2725,"2014":3206,"2015":3771,"2016":4437,"2017":5220,"2018":6141,"2019":7225,"2020":8500,"2021":10000,"Make":"Renault","Model":"Megane"},{"2006":2295,"2007":2638,"2008":3032,"2009":3485,"2010":4100,"2011":4823,"2012":5675,"2013":6676,"2014":7854,"2015":9240,"2016":10871,"2017":12789,"2018":15046,"2019":17701,"2020":20825,"2021":24500,"Make":"Renault","Model":"Megane RS"},{"2006":1545,"2007":1776,"2008":2042,"2009":2347,"2010":2761,"2011":3248,"2012":3822,"2013":4496,"2014":5290,"2015":6223,"2016":7321,"2017":8613,"2018":10133,"2019":11921,"2020":14025,"2021":16500,"Make":"Renault","Model":"Fluence"},{"2006":1171,"2007":1346,"2008":1547,"2009":1778,"2010":2092,"2011":2461,"2012":2895,"2013":3406,"2014":4007,"2015":4714,"2016":5546,"2017":6525,"2018":7677,"2019":9031,"2020":10625,"2021":12500,"Make":"Renault","Model":"Sandero Stepway"},{"2006":1030,"2007":1184,"2008":1361,"2009":1565,"2010":1841,"2011":2166,"2012":2548,"2013":2997,"2014":3526,"2015":4149,"2016":4881,"2017":5742,"2018":6755,"2019":7948,"2020":9350,"2021":11000,"Make":"Renault","Model":"Sandero"},{"2006":1171,"2007":1346,"2008":1547,"2009":1778,"2010":2092,"2011":2461,"2012":2895,"2013":3406,"2014":4007,"2015":4714,"2016":5546,"2017":6525,"2018":7677,"2019":9031,"2020":10625,"2021":12500,"Make":"Renault","Model":"Logan Stepway"},{"2006":1077,"2007":1238,"2008":1423,"2009":1636,"2010":1924,"2011":2264,"2012":2664,"2013":3134,"2014":3687,"2015":4337,"2016":5103,"2017":6003,"2018":7062,"2019":8309,"2020":9775,"2021":11500,"Make":"Renault","Model":"Logan"},{"2006":1545,"2007":1776,"2008":2042,"2009":2347,"2010":2761,"2011":3248,"2012":3822,"2013":4496,"2014":5290,"2015":6223,"2016":7321,"2017":8613,"2018":10133,"2019":11921,"2020":14025,"2021":16500,"Make":"Renault","Model":"Kangoo"},{"2006":1405,"2007":1615,"2008":1856,"2009":2134,"2010":2510,"2011":2953,"2012":3474,"2013":4087,"2014":4809,"2015":5657,"2016":6656,"2017":7830,"2018":9212,"2019":10838,"2020":12750,"2021":15000,"Make":"Renault","Model":"Dokker"},{"2006":1358,"2007":1561,"2008":1794,"2009":2063,"2010":2426,"2011":2855,"2012":3358,"2013":3951,"2014":4648,"2015":5469,"2016":6434,"2017":7569,"2018":8905,"2019":10476,"2020":12325,"2021":14500,"Make":"Renault","Model":"Duster 1,5"},{"2006":1171,"2007":1346,"2008":1547,"2009":1778,"2010":2092,"2011":2461,"2012":2895,"2013":3406,"2014":4007,"2015":4714,"2016":5546,"2017":6525,"2018":7677,"2019":9031,"2020":10625,"2021":12500,"Make":"Renault","Model":"Duster 1,6"},{"2006":1452,"2007":1669,"2008":1918,"2009":2205,"2010":2594,"2011":3052,"2012":3590,"2013":4224,"2014":4969,"2015":5846,"2016":6877,"2017":8091,"2018":9519,"2019":11199,"2020":13175,"2021":15500,"Make":"Renault","Model":"Duster 2,0"},{"2006":1592,"2007":1830,"2008":2104,"2009":2418,"2010":2845,"2011":3347,"2012":3937,"2013":4632,"2014":5450,"2015":6412,"2016":7543,"2017":8874,"2018":10440,"2019":12283,"2020":14450,"2021":17000,"Make":"Renault","Model":"Kaptur"},{"2006":1780,"2007":2046,"2008":2351,"2009":2703,"2010":3180,"2011":3741,"2012":4401,"2013":5177,"2014":6091,"2015":7166,"2016":8430,"2017":9918,"2018":11668,"2019":13728,"2020":16150,"2021":19000,"Make":"Renault","Model":"Scenic"},{"2006":2107,"2007":2422,"2008":2784,"2009":3200,"2010":3765,"2011":4430,"2012":5211,"2013":6131,"2014":7213,"2015":8486,"2016":9983,"2017":11745,"2018":13818,"2019":16256,"2020":19125,"2021":22500,"Make":"Renault","Model":"Koleos"},{"2006":29264,"2007":34428,"2008":40503,"2009":47651,"2010":56060,"2011":65953,"2012":77592,"2013":91284,"2014":107393,"2015":126345,"2016":148641,"2017":174872,"2018":205732,"2019":242038,"2020":284750,"2021":335000,"Make":"Rolls Royce","Model":"Rolls Royce"},{"2006":36165,"2007":42547,"2008":50055,"2009":58888,"2010":69280,"2011":81506,"2012":95889,"2013":112811,"2014":132719,"2015":156140,"2016":183694,"2017":216111,"2018":254248,"2019":299115,"2020":351900,"2021":414000,"Make":"Rolls Royce","Model":"Cullinan"},{"2006":817,"2007":950,"2008":1104,"2009":1284,"2010":1493,"2011":1736,"2012":2019,"2013":2348,"2014":2730,"2015":3174,"2016":3691,"2017":4292,"2018":4990,"2019":5803,"2020":6748,"2021":7846,"Make":"Skoda","Model":"Fabia Active (1,0 куб. см., мкпп, 60 л.с.)"},{"2006":860,"2007":1000,"2008":1163,"2009":1352,"2010":1572,"2011":1828,"2012":2126,"2013":2472,"2014":2875,"2015":3343,"2016":3887,"2017":4519,"2018":5255,"2019":6111,"2020":7105,"2021":8262,"Make":"Skoda","Model":"Fabia Active (1,0 куб. см., мкпп, 75 л.с.)"},{"2006":918,"2007":1067,"2008":1241,"2009":1443,"2010":1678,"2011":1951,"2012":2269,"2013":2638,"2014":3067,"2015":3567,"2016":4147,"2017":4822,"2018":5607,"2019":6520,"2020":7582,"2021":8816,"Make":"Skoda","Model":"Fabia Active (1,6 куб. см., мкпп, 90 л.с.)"},{"2006":1091,"2007":1269,"2008":1475,"2009":1715,"2010":1995,"2011":2319,"2012":2697,"2013":3136,"2014":3647,"2015":4240,"2016":4931,"2017":5733,"2018":6667,"2019":7752,"2020":9014,"2021":10481,"Make":"Skoda","Model":"Fabia Active (1,6 куб. см., акпп, 110 л.с.)"},{"2006":1129,"2007":1313,"2008":1526,"2009":1775,"2010":2064,"2011":2400,"2012":2790,"2013":3245,"2014":3773,"2015":4387,"2016":5101,"2017":5932,"2018":6897,"2019":8020,"2020":9326,"2021":10844,"Make":"Skoda","Model":"Fabia Active (1,0 куб. см., акпп, 110 л.с.)"},{"2006":910,"2007":1058,"2008":1231,"2009":1431,"2010":1664,"2011":1935,"2012":2250,"2013":2616,"2014":3042,"2015":3538,"2016":4113,"2017":4783,"2018":5562,"2019":6467,"2020":7520,"2021":8744,"Make":"Skoda","Model":"Fabia Ambiente (1,0 куб. см., мкпп, 60 л.с.)"},{"2006":954,"2007":1109,"2008":1290,"2009":1499,"2010":1744,"2011":2027,"2012":2357,"2013":2741,"2014":3187,"2015":3706,"2016":4310,"2017":5011,"2018":5827,"2019":6775,"2020":7878,"2021":9161,"Make":"Skoda","Model":"Fabia Ambiente (1,0 куб. см., мкпп, 75 л.с.)"},{"2006":1011,"2007":1176,"2008":1367,"2009":1590,"2010":1849,"2011":2150,"2012":2500,"2013":2907,"2014":3380,"2015":3930,"2016":4570,"2017":5314,"2018":6179,"2019":7185,"2020":8354,"2021":9714,"Make":"Skoda","Model":"Fabia Ambiente (1,6 куб. см., мкпп, 90 л.с.)"},{"2006":1185,"2007":1378,"2008":1602,"2009":1863,"2010":2166,"2011":2518,"2012":2928,"2013":3405,"2014":3959,"2015":4604,"2016":5353,"2017":6225,"2018":7238,"2019":8417,"2020":9787,"2021":11380,"Make":"Skoda","Model":"Fabia Ambiente (1,6 куб. см., акпп, 110 л.с.)"},{"2006":1100,"2007":1279,"2008":1487,"2009":1729,"2010":2010,"2011":2337,"2012":2718,"2013":3160,"2014":3675,"2015":4273,"2016":4969,"2017":5778,"2018":6718,"2019":7812,"2020":9083,"2021":10562,"Make":"Skoda","Model":"Fabia Ambiente (1,0 куб. см., мкпп, 95 л.с.)"},{"2006":1223,"2007":1422,"2008":1653,"2009":1922,"2010":2235,"2011":2599,"2012":3022,"2013":3514,"2014":4086,"2015":4751,"2016":5524,"2017":6424,"2018":7469,"2019":8685,"2020":10099,"2021":11743,"Make":"Skoda","Model":"Fabia Ambiente (1,0 куб. см., акпп, 110 л.с.)"},{"2006":1193,"2007":1387,"2008":1613,"2009":1876,"2010":2181,"2011":2536,"2012":2949,"2013":3429,"2014":3987,"2015":4636,"2016":5391,"2017":6268,"2018":7289,"2019":8475,"2020":9855,"2021":11459,"Make":"Skoda","Model":"Scala Active (1,5 куб. см., акпп, 150 л.с.)"},{"2006":1079,"2007":1255,"2008":1459,"2009":1697,"2010":1973,"2011":2294,"2012":2667,"2013":3102,"2014":3607,"2015":4194,"2016":4876,"2017":5670,"2018":6593,"2019":7667,"2020":8915,"2021":10366,"Make":"Skoda","Model":"Scala Active (1,6 куб. см., акпп, 125 л.с.)"},{"2006":975,"2007":1134,"2008":1318,"2009":1533,"2010":1783,"2011":2073,"2012":2410,"2013":2802,"2014":3259,"2015":3789,"2016":4406,"2017":5123,"2018":5957,"2019":6927,"2020":8055,"2021":9366,"Make":"Skoda","Model":"Scala Active (1,6 куб. см., мкпп, 125 л.с.)"},{"2006":1294,"2007":1505,"2008":1750,"2009":2035,"2010":2366,"2011":2751,"2012":3199,"2013":3720,"2014":4326,"2015":5030,"2016":5849,"2017":6801,"2018":7908,"2019":9195,"2020":10692,"2021":12433,"Make":"Skoda","Model":"Scala Ambiente (1,5 куб. см., акпп, 150 л.с.)"},{"2006":1164,"2007":1354,"2008":1574,"2009":1830,"2010":2128,"2011":2475,"2012":2878,"2013":3346,"2014":3891,"2015":4524,"2016":5261,"2017":6117,"2018":7113,"2019":8271,"2020":9617,"2021":11183,"Make":"Skoda","Model":"Scala Ambiente (1,6 куб. см., акпп, 125 л.с.)"},{"2006":1060,"2007":1233,"2008":1433,"2009":1667,"2010":1938,"2011":2254,"2012":2620,"2013":3047,"2014":3543,"2015":4120,"2016":4790,"2017":5570,"2018":6477,"2019":7531,"2020":8757,"2021":10183,"Make":"Skoda","Model":"Scala Ambiente (1,6 куб. см., мкпп, 125 л.с.)"},{"2006":1368,"2007":1591,"2008":1850,"2009":2152,"2010":2502,"2011":2909,"2012":3383,"2013":3933,"2014":4574,"2015":5318,"2016":6184,"2017":7190,"2018":8361,"2019":9722,"2020":11305,"2021":13145,"Make":"Skoda","Model":"Scala Style (1,5 куб. см., акпп, 150 л.с.)"},{"2006":1238,"2007":1440,"2008":1674,"2009":1947,"2010":2264,"2011":2632,"2012":3061,"2013":3559,"2014":4139,"2015":4812,"2016":5596,"2017":6507,"2018":7566,"2019":8798,"2020":10230,"2021":11895,"Make":"Skoda","Model":"Scala Style (1,6 куб. см., акпп, 125 л.с.)"},{"2006":1134,"2007":1319,"2008":1534,"2009":1783,"2010":2074,"2011":2411,"2012":2804,"2013":3260,"2014":3791,"2015":4408,"2016":5125,"2017":5960,"2018":6930,"2019":8058,"2020":9370,"2021":10895,"Make":"Skoda","Model":"Scala Style (1,6 куб. см., мкпп, 125 л.с.)"},{"2006":1843,"2007":2143,"2008":2491,"2009":2897,"2010":3369,"2011":3917,"2012":4555,"2013":5296,"2014":6158,"2015":7161,"2016":8327,"2017":9682,"2018":11258,"2019":13091,"2020":15222,"2021":17700,"Make":"Skoda","Model":"Super b Active (1,4 куб. см., акпп, 150 л.с.)"},{"2006":1967,"2007":2287,"2008":2660,"2009":3092,"2010":3596,"2011":4181,"2012":4862,"2013":5653,"2014":6574,"2015":7644,"2016":8888,"2017":10335,"2018":12018,"2019":13974,"2020":16249,"2021":18894,"Make":"Skoda","Model":"Super b Active (2,0 D куб. см., акпп, 190 л.с.)"},{"2006":2009,"2007":2336,"2008":2717,"2009":3159,"2010":3673,"2011":4271,"2012":4967,"2013":5775,"2014":6715,"2015":7809,"2016":9080,"2017":10558,"2018":12277,"2019":14275,"2020":16599,"2021":19301,"Make":"Skoda","Model":"Super b Active (2,0 куб. см., акпп, 220 л.с.)"},{"2006":1917,"2007":2229,"2008":2592,"2009":3014,"2010":3504,"2011":4075,"2012":4738,"2013":5509,"2014":6406,"2015":7449,"2016":8662,"2017":10072,"2018":11712,"2019":13618,"2020":15835,"2021":18413,"Make":"Skoda","Model":"Super b Active (2,0 D куб. см., акпп, 177 л.с.)"},{"2006":1925,"2007":2238,"2008":2603,"2009":3026,"2010":3519,"2011":4092,"2012":4758,"2013":5532,"2014":6433,"2015":7480,"2016":8698,"2017":10114,"2018":11760,"2019":13674,"2020":15901,"2021":18489,"Make":"Skoda","Model":"Super b Ambiente (1,4 куб. см., акпп, 150 л.с.)"},{"2006":2049,"2007":2383,"2008":2771,"2009":3222,"2010":3746,"2011":4356,"2012":5065,"2013":5890,"2014":6848,"2015":7963,"2016":9259,"2017":10767,"2018":12519,"2019":14558,"2020":16927,"2021":19683,"Make":"Skoda","Model":"Super b Ambiente (2,0 D куб. см., акпп, 190 л.с.)"},{"2006":2091,"2007":2432,"2008":2828,"2009":3288,"2010":3824,"2011":4446,"2012":5170,"2013":6011,"2014":6990,"2015":8128,"2016":9451,"2017":10989,"2018":12778,"2019":14859,"2020":17277,"2021":20090,"Make":"Skoda","Model":"Super b Ambiente (2,0 куб. см., акпп, 220 л.с.)"},{"2006":2341,"2007":2722,"2008":3166,"2009":3681,"2010":4280,"2011":4977,"2012":5787,"2013":6729,"2014":7825,"2015":9098,"2016":10579,"2017":12302,"2018":14304,"2019":16633,"2020":19341,"2021":22489,"Make":"Skoda","Model":"Super b Ambiente (2,0 куб. см., акпп, 280 л.с.)"},{"2006":1999,"2007":2324,"2008":2703,"2009":3143,"2010":3655,"2011":4249,"2012":4941,"2013":5746,"2014":6681,"2015":7769,"2016":9033,"2017":10504,"2018":12214,"2019":14202,"2020":16514,"2021":19202,"Make":"Skoda","Model":"Super b Ambiente (2,0 D куб. см., акпп, 177 л.с.)"},{"2006":2039,"2007":2371,"2008":2757,"2009":3206,"2010":3728,"2011":4334,"2012":5040,"2013":5860,"2014":6815,"2015":7924,"2016":9214,"2017":10714,"2018":12458,"2019":14486,"2020":16844,"2021":19586,"Make":"Skoda","Model":"Super b Style (1,4 куб. см., акпп, 180 л.с.)"},{"2006":2163,"2007":2515,"2008":2925,"2009":3401,"2010":3955,"2011":4599,"2012":5347,"2013":6218,"2014":7230,"2015":8407,"2016":9775,"2017":11367,"2018":13217,"2019":15369,"2020":17871,"2021":20780,"Make":"Skoda","Model":"Super b Style (2,0 D куб. см., акпп, 180 л.с.)"},{"2006":2206,"2007":2565,"2008":2982,"2009":3468,"2010":4032,"2011":4689,"2012":5452,"2013":6340,"2014":7372,"2015":8572,"2016":9967,"2017":11589,"2018":13476,"2019":15670,"2020":18221,"2021":21187,"Make":"Skoda","Model":"Super b Style (2,0 куб. см., акпп, 220 л.с.)"},{"2006":2455,"2007":2855,"2008":3320,"2009":3860,"2010":4489,"2011":5220,"2012":6069,"2013":7057,"2014":8206,"2015":9542,"2016":11095,"2017":12902,"2018":15002,"2019":17444,"2020":20284,"2021":23586,"Make":"Skoda","Model":"Super b Style (2,0 куб. см., акпп, 280 л.с.)"},{"2006":2113,"2007":2457,"2008":2857,"2009":3322,"2010":3863,"2011":4492,"2012":5223,"2013":6074,"2014":7063,"2015":8212,"2016":9549,"2017":11104,"2018":12911,"2019":15013,"2020":17457,"2021":20299,"Make":"Skoda","Model":"Super b Style (2,0 D куб. см., акпп, 177 л.с.)"},{"2006":2471,"2007":2873,"2008":3340,"2009":3884,"2010":4516,"2011":5252,"2012":6107,"2013":7101,"2014":8257,"2015":9601,"2016":11164,"2017":12981,"2018":15094,"2019":17551,"2020":20409,"2021":23731,"Make":"Skoda","Model":"Super b L&K (2,0 D куб. см., акпп, 180 л.с.)"},{"2006":2513,"2007":2922,"2008":3398,"2009":3951,"2010":4594,"2011":5342,"2012":6211,"2013":7223,"2014":8398,"2015":9765,"2016":11355,"2017":13204,"2018":15353,"2019":17852,"2020":20759,"2021":24138,"Make":"Skoda","Model":"Super b L&K (2,0 куб. см., акпп, 220 л.с.)"},{"2006":2763,"2007":3212,"2008":3735,"2009":4343,"2010":5051,"2011":5873,"2012":6829,"2013":7940,"2014":9233,"2015":10736,"2016":12484,"2017":14516,"2018":16879,"2019":19627,"2020":22822,"2021":26537,"Make":"Skoda","Model":"Super b L&K (2,0 куб. см., акпп, 280 л.с.)"},{"2006":1233,"2007":1434,"2008":1667,"2009":1938,"2010":2254,"2011":2621,"2012":3048,"2013":3544,"2014":4121,"2015":4791,"2016":5571,"2017":6478,"2018":7533,"2019":8759,"2020":10185,"2021":11843,"Make":"Skoda","Model":"Kamiq Active (1,5 куб. см., акпп, 150 л.с.)"},{"2006":1103,"2007":1282,"2008":1491,"2009":1734,"2010":2016,"2011":2344,"2012":2726,"2013":3170,"2014":3686,"2015":4286,"2016":4983,"2017":5794,"2018":6738,"2019":7835,"2020":9110,"2021":10593,"Make":"Skoda","Model":"Kamiq Active (1,6 куб. см., акпп, 125 л.с.)"},{"2006":999,"2007":1161,"2008":1350,"2009":1570,"2010":1826,"2011":2123,"2012":2469,"2013":2870,"2014":3338,"2015":3881,"2016":4513,"2017":5247,"2018":6102,"2019":7095,"2020":8250,"2021":9593,"Make":"Skoda","Model":"Kamiq Active (1,6 куб. см., мкпп, 125 л.с.)"},{"2006":1208,"2007":1404,"2008":1633,"2009":1898,"2010":2208,"2011":2567,"2012":2985,"2013":3471,"2014":4036,"2015":4693,"2016":5456,"2017":6345,"2018":7378,"2019":8579,"2020":9975,"2021":11599,"Make":"Skoda","Model":"Kamiq Ambiente (1,5 куб. см., акпп, 150 л.с.)"},{"2006":1182,"2007":1374,"2008":1597,"2009":1858,"2010":2160,"2011":2512,"2012":2920,"2013":3396,"2014":3949,"2015":4591,"2016":5339,"2017":6208,"2018":7219,"2019":8394,"2020":9760,"2021":11349,"Make":"Skoda","Model":"Kamiq Ambiente (1,6 куб. см., акпп, 125 л.с.)"},{"2006":1077,"2007":1253,"2008":1457,"2009":1694,"2010":1970,"2011":2290,"2012":2663,"2013":3097,"2014":3601,"2015":4187,"2016":4868,"2017":5661,"2018":6583,"2019":7654,"2020":8900,"2021":10349,"Make":"Skoda","Model":"Kamiq Ambiente (1,6 куб. см., мкпп, 125 л.с.)"},{"2006":1408,"2007":1638,"2008":1904,"2009":2214,"2010":2575,"2011":2994,"2012":3481,"2013":4048,"2014":4707,"2015":5473,"2016":6364,"2017":7400,"2018":8605,"2019":10006,"2020":11635,"2021":13529,"Make":"Skoda","Model":"Kamiq Style (1,5 куб. см., акпп, 150 л.с.)"},{"2006":1278,"2007":1486,"2008":1728,"2009":2010,"2010":2337,"2011":2717,"2012":3160,"2013":3674,"2014":4272,"2015":4968,"2016":5776,"2017":6717,"2018":7810,"2019":9082,"2020":10560,"2021":12279,"Make":"Skoda","Model":"Kamiq Style (1,6 куб. см., акпп, 125 л.с.)"},{"2006":1174,"2007":1365,"2008":1588,"2009":1846,"2010":2147,"2011":2496,"2012":2902,"2013":3375,"2014":3924,"2015":4563,"2016":5306,"2017":6170,"2018":7174,"2019":8342,"2020":9700,"2021":11279,"Make":"Skoda","Model":"Kamiq Style (1,6 куб. см., мкпп, 125 л.с.)"},{"2006":1780,"2007":2070,"2008":2407,"2009":2799,"2010":3255,"2011":3784,"2012":4401,"2013":5117,"2014":5950,"2015":6919,"2016":8045,"2017":9354,"2018":10877,"2019":12648,"2020":14707,"2021":17101,"Make":"Skoda","Model":"Karоq Ambiente (1,4 куб. см., акпп, 150 л.с.)"},{"2006":1956,"2007":2274,"2008":2645,"2009":3075,"2010":3576,"2011":4158,"2012":4835,"2013":5622,"2014":6537,"2015":7601,"2016":8839,"2017":10278,"2018":11951,"2019":13896,"2020":16159,"2021":18789,"Make":"Skoda","Model":"Karоq Ambiente (2,0 D куб. см., акпп 4х4, 140 л.с.)"},{"2006":1860,"2007":2163,"2008":2516,"2009":2925,"2010":3401,"2011":3955,"2012":4599,"2013":5347,"2014":6218,"2015":7230,"2016":8407,"2017":9776,"2018":11367,"2019":13217,"2020":15369,"2021":17871,"Make":"Skoda","Model":"Karоq Style (1,4 куб. см., акпп, 150 л.с.)"},{"2006":2036,"2007":2368,"2008":2753,"2009":3201,"2010":3722,"2011":4328,"2012":5033,"2013":5852,"2014":6805,"2015":7913,"2016":9201,"2017":10699,"2018":12441,"2019":14466,"2020":16821,"2021":19559,"Make":"Skoda","Model":"Karоq Style (2,0 D куб. см., акпп 4х4, 140 л.с.)"},{"2006":1992,"2007":2316,"2008":2693,"2009":3131,"2010":3641,"2011":4234,"2012":4923,"2013":5725,"2014":6657,"2015":7740,"2016":9000,"2017":10465,"2018":12169,"2019":14150,"2020":16454,"2021":19132,"Make":"Skoda","Model":"Kodiaq Active (1,4 куб. см., акпп, 150 л.с.)"},{"2006":2175,"2007":2529,"2008":2941,"2009":3419,"2010":3976,"2011":4623,"2012":5376,"2013":6251,"2014":7269,"2015":8452,"2016":9828,"2017":11428,"2018":13288,"2019":15451,"2020":17966,"2021":20891,"Make":"Skoda","Model":"Kodiaq Active (2,0 куб. см., акпп 4х4, 180 л.с.)"},{"2006":2080,"2007":2419,"2008":2813,"2009":3271,"2010":3803,"2011":4422,"2012":5142,"2013":5980,"2014":6953,"2015":8085,"2016":9401,"2017":10931,"2018":12711,"2019":14780,"2020":17186,"2021":19984,"Make":"Skoda","Model":"Kodiaq Ambiente (1,4 куб. см., акпп, 150 л.с.)"},{"2006":2264,"2007":2632,"2008":3061,"2009":3559,"2010":4138,"2011":4812,"2012":5595,"2013":6506,"2014":7565,"2015":8797,"2016":10228,"2017":11894,"2018":13830,"2019":16081,"2020":18699,"2021":21743,"Make":"Skoda","Model":"Kodiaq Ambiente (2,0 куб. см., акпп 4х4, 180 л.с.)"},{"2006":2191,"2007":2548,"2008":2962,"2009":3445,"2010":4005,"2011":4657,"2012":5415,"2013":6297,"2014":7322,"2015":8514,"2016":9900,"2017":11512,"2018":13386,"2019":15565,"2020":18099,"2021":21045,"Make":"Skoda","Model":"Kodiaq Style (1,4 куб. см., акпп, 150 л.с.)"},{"2006":2374,"2007":2761,"2008":3210,"2009":3732,"2010":4340,"2011":5047,"2012":5868,"2013":6823,"2014":7934,"2015":9226,"2016":10728,"2017":12474,"2018":14505,"2019":16866,"2020":19611,"2021":22804,"Make":"Skoda","Model":"Kodiaq Style (2,0 куб. см., акпп 4х4, 180 л.с.)"},{"2006":2482,"2007":2886,"2008":3356,"2009":3902,"2010":4537,"2011":5276,"2012":6135,"2013":7133,"2014":8295,"2015":9645,"2016":11215,"2017":13041,"2018":15164,"2019":17632,"2020":20502,"2021":23840,"Make":"Skoda","Model":"Kodiaq Style (2,0 D куб. см., акпп 4х4, 150 л.с.)"},{"2006":2891,"2007":3361,"2008":3908,"2009":4544,"2010":5284,"2011":6144,"2012":7145,"2013":8308,"2014":9660,"2015":11233,"2016":13061,"2017":15188,"2018":17660,"2019":20535,"2020":23878,"2021":27765,"Make":"Skoda","Model":"Kodiaq L&K (2,0 куб. см., акпп 4х4, 180 л.с.)"},{"2006":2551,"2007":2967,"2008":3450,"2009":4011,"2010":4664,"2011":5423,"2012":6306,"2013":7333,"2014":8527,"2015":9915,"2016":11529,"2017":13406,"2018":15588,"2019":18125,"2020":21076,"2021":24507,"Make":"Skoda","Model":"Kodiaq Scout (2,0 куб. см., акпп 4х4, 180 л.с.)"},{"2006":1106,"2007":1286,"2008":1496,"2009":1739,"2010":2022,"2011":2352,"2012":2734,"2013":3179,"2014":3697,"2015":4299,"2016":4999,"2017":5812,"2018":6759,"2019":7859,"2020":9138,"2021":10626,"Make":"Skoda","Model":"Octavia Active Combi Universal (1.6 куб. см., 110 л.с., мкпп)"},{"2006":1180,"2007":1372,"2008":1595,"2009":1854,"2010":2156,"2011":2507,"2012":2915,"2013":3390,"2014":3942,"2015":4584,"2016":5330,"2017":6197,"2018":7206,"2019":8380,"2020":9744,"2021":11330,"Make":"Skoda","Model":"Octavia Active Combi Universal (1.6 куб. см., 110 л.с., акпп)"},{"2006":1190,"2007":1384,"2008":1609,"2009":1871,"2010":2176,"2011":2530,"2012":2942,"2013":3421,"2014":3977,"2015":4625,"2016":5378,"2017":6253,"2018":7271,"2019":8455,"2020":9831,"2021":11432,"Make":"Skoda","Model":"Octavia Active Combi Universal (1.4 куб. см., 150 л.с., мкпп)"},{"2006":1243,"2007":1446,"2008":1681,"2009":1955,"2010":2273,"2011":2643,"2012":3073,"2013":3574,"2014":4156,"2015":4832,"2016":5619,"2017":6533,"2018":7597,"2019":8834,"2020":10272,"2021":11944,"Make":"Skoda","Model":"Octavia Ambiente Combi Universal (1.6 куб. см., 110 л.с., мкпп)"},{"2006":1290,"2007":1500,"2008":1744,"2009":2028,"2010":2358,"2011":2742,"2012":3188,"2013":3707,"2014":4311,"2015":5012,"2016":5828,"2017":6777,"2018":7881,"2019":9163,"2020":10655,"2021":12390,"Make":"Skoda","Model":"Octavia Ambiente Combi Universal (1.6 куб. см., 110 л.с., акпп)"},{"2006":1304,"2007":1516,"2008":1763,"2009":2050,"2010":2384,"2011":2772,"2012":3223,"2013":3748,"2014":4358,"2015":5068,"2016":5893,"2017":6852,"2018":7967,"2019":9264,"2020":10773,"2021":12526,"Make":"Skoda","Model":"Octavia Ambiente Combi Universal (1.4 куб. см., 150 л.с., мкпп)"},{"2006":1343,"2007":1562,"2008":1816,"2009":2111,"2010":2455,"2011":2855,"2012":3319,"2013":3860,"2014":4488,"2015":5219,"2016":6068,"2017":7056,"2018":8205,"2019":9540,"2020":11094,"2021":12899,"Make":"Skoda","Model":"Octavia Ambiente Combi Universal (1.4 куб. см., 150 л.с., акмм)"},{"2006":1405,"2007":1633,"2008":1899,"2009":2208,"2010":2568,"2011":2986,"2012":3472,"2013":4037,"2014":4694,"2015":5458,"2016":6347,"2017":7380,"2018":8581,"2019":9978,"2020":11602,"2021":13491,"Make":"Skoda","Model":"Octavia Ambiente Combi Universal (1.8 куб. см., 180 л.с., акпп)"},{"2006":1345,"2007":1564,"2008":1818,"2009":2114,"2010":2459,"2011":2859,"2012":3324,"2013":3865,"2014":4495,"2015":5226,"2016":6077,"2017":7066,"2018":8217,"2019":9554,"2020":11110,"2021":12918,"Make":"Skoda","Model":"Octavia Style Combi Universal (1.6 куб. см., 110 л.с., мкпп)"},{"2006":1391,"2007":1617,"2008":1880,"2009":2187,"2010":2542,"2011":2956,"2012":3438,"2013":3997,"2014":4648,"2015":5405,"2016":6284,"2017":7307,"2018":8497,"2019":9880,"2020":11489,"2021":13359,"Make":"Skoda","Model":"Octavia Style Combi Universal (1.6 куб. см., 110 л.с., акпп)"},{"2006":1406,"2007":1635,"2008":1901,"2009":2210,"2010":2570,"2011":2988,"2012":3475,"2013":4040,"2014":4698,"2015":5463,"2016":6352,"2017":7386,"2018":8589,"2019":9987,"2020":11612,"2021":13503,"Make":"Skoda","Model":"Octavia Style Combi Universal (1.4 куб.см., 150 л.с., мкпп)"},{"2006":1443,"2007":1678,"2008":1951,"2009":2269,"2010":2638,"2011":3068,"2012":3567,"2013":4148,"2014":4823,"2015":5608,"2016":6521,"2017":7583,"2018":8817,"2019":10253,"2020":11922,"2021":13862,"Make":"Skoda","Model":"Octavia Style Combi Universal (1.4 куб.см., 150 л.с., акпп)"},{"2006":1504,"2007":1749,"2008":2034,"2009":2365,"2010":2750,"2011":3197,"2012":3718,"2013":4323,"2014":5027,"2015":5845,"2016":6796,"2017":7903,"2018":9189,"2019":10685,"2020":12424,"2021":14447,"Make":"Skoda","Model":"Octavia Style Combi Universal (1.8 куб. см., 180 л.с. акпп)"},{"2006":2186,"2007":2542,"2008":2956,"2009":3437,"2010":3997,"2011":4647,"2012":5404,"2013":6284,"2014":7306,"2015":8496,"2016":9879,"2017":11487,"2018":13357,"2019":15532,"2020":18060,"2021":21000,"Make":"Skoda","Model":"Yeti 1,4"},{"2006":2113,"2007":2457,"2008":2857,"2009":3323,"2010":3863,"2011":4492,"2012":5224,"2013":6074,"2014":7063,"2015":8213,"2016":9550,"2017":11104,"2018":12912,"2019":15014,"2020":17458,"2021":20300,"Make":"Skoda","Model":"Yeti 1,6"},{"2006":2394,"2007":2784,"2008":3237,"2009":3765,"2010":4377,"2011":5090,"2012":5919,"2013":6882,"2014":8002,"2015":9305,"2016":10820,"2017":12581,"2018":14629,"2019":17011,"2020":19780,"2021":23000,"Make":"Skoda","Model":"Yeti 1,8"},{"2006":3956,"2007":4600,"2008":5349,"2009":6220,"2010":7232,"2011":8409,"2012":9778,"2013":11370,"2014":13221,"2015":15374,"2016":17876,"2017":20786,"2018":24170,"2019":28105,"2020":32680,"2021":38000,"Make":"Skoda","Model":"Super b Universal"},{"2006":989,"2007":1150,"2008":1337,"2009":1555,"2010":1808,"2011":2102,"2012":2445,"2013":2843,"2014":3305,"2015":3843,"2016":4469,"2017":5197,"2018":6043,"2019":7026,"2020":8170,"2021":9500,"Make":"Skoda","Model":"Fabia 1,2 мт Universal"},{"2006":1093,"2007":1271,"2008":1478,"2009":1719,"2010":1998,"2011":2324,"2012":2702,"2013":3142,"2014":3653,"2015":4248,"2016":4939,"2017":5744,"2018":6679,"2019":7766,"2020":9030,"2021":10500,"Make":"Skoda","Model":"Fabia 1,4 мт Universal"},{"2006":1197,"2007":1392,"2008":1619,"2009":1882,"2010":2189,"2011":2545,"2012":2959,"2013":3441,"2014":4001,"2015":4653,"2016":5410,"2017":6291,"2018":7315,"2019":8505,"2020":9890,"2021":11500,"Make":"Skoda","Model":"Fabia 1,6 мт Universal"},{"2006":1405,"2007":1634,"2008":1900,"2009":2210,"2010":2569,"2011":2988,"2012":3474,"2013":4039,"2014":4697,"2015":5462,"2016":6351,"2017":7385,"2018":8587,"2019":9985,"2020":11610,"2021":13500,"Make":"Skoda","Model":"Roomster"},{"2006":1707,"2007":1985,"2008":2308,"2009":2684,"2010":3121,"2011":3629,"2012":4220,"2013":4907,"2014":5706,"2015":6635,"2016":7715,"2017":8971,"2018":10431,"2019":12129,"2020":14104,"2021":16400,"Make":"Skoda","Model":"Roomster Scout"},{"2006":881,"2007":1024,"2008":1191,"2009":1385,"2010":1611,"2011":1873,"2012":2178,"2013":2532,"2014":2945,"2015":3424,"2016":3981,"2017":4629,"2018":5383,"2019":6259,"2020":7278,"2021":8463,"Make":"Skoda","Model":"(Россия) Rapid Active (1,6 куб. см., мкпп, 90 л.с.)"},{"2006":925,"2007":1075,"2008":1250,"2009":1454,"2010":1690,"2011":1966,"2012":2286,"2013":2658,"2014":3090,"2015":3593,"2016":4178,"2017":4859,"2018":5649,"2019":6569,"2020":7639,"2021":8882,"Make":"Skoda","Model":"(Россия) Rapid Active (1,6 куб. см., мкпп, 110 л.с.)"},{"2006":972,"2007":1130,"2008":1314,"2009":1528,"2010":1776,"2011":2065,"2012":2402,"2013":2793,"2014":3247,"2015":3776,"2016":4390,"2017":5105,"2018":5936,"2019":6903,"2020":8026,"2021":9333,"Make":"Skoda","Model":"(Россия) Rapid Active (1,6 куб. см., акпп, 110 л.с.)"},{"2006":934,"2007":1086,"2008":1263,"2009":1469,"2010":1708,"2011":1986,"2012":2310,"2013":2685,"2014":3123,"2015":3631,"2016":4222,"2017":4909,"2018":5709,"2019":6638,"2020":7719,"2021":8975,"Make":"Skoda","Model":"(Россия) Rapid Ambiente (1,6 куб. см., мкпп, 90 л.с.)"},{"2006":977,"2007":1136,"2008":1321,"2009":1536,"2010":1786,"2011":2077,"2012":2415,"2013":2808,"2014":3266,"2015":3797,"2016":4415,"2017":5134,"2018":5970,"2019":6942,"2020":8072,"2021":9386,"Make":"Skoda","Model":"(Россия) Rapid Ambiente (1,6 куб. см., мкпп, 110 л.с.)"},{"2006":1023,"2007":1190,"2008":1384,"2009":1609,"2010":1871,"2011":2175,"2012":2529,"2013":2941,"2014":3420,"2015":3976,"2016":4624,"2017":5377,"2018":6252,"2019":7270,"2020":8453,"2021":9829,"Make":"Skoda","Model":"(Россия) Rapid Ambiente (1,6 куб. см., акпп, 110 л.с.)"},{"2006":1065,"2007":1238,"2008":1440,"2009":1674,"2010":1946,"2011":2263,"2012":2632,"2013":3060,"2014":3558,"2015":4138,"2016":4811,"2017":5594,"2018":6505,"2019":7564,"2020":8795,"2021":10227,"Make":"Skoda","Model":"(Россия) Rapid Ambiente (1,4 куб. см., акпп, 125 л.с.)"},{"2006":1048,"2007":1218,"2008":1416,"2009":1647,"2010":1915,"2011":2227,"2012":2589,"2013":3011,"2014":3501,"2015":4071,"2016":4733,"2017":5504,"2018":6400,"2019":7442,"2020":8653,"2021":10062,"Make":"Skoda","Model":"(Россия) Rapid Style (1,6 куб. см., мкпп, 90 л.с.)"},{"2006":1090,"2007":1267,"2008":1473,"2009":1713,"2010":1992,"2011":2316,"2012":2693,"2013":3132,"2014":3642,"2015":4235,"2016":4924,"2017":5726,"2018":6658,"2019":7741,"2020":9002,"2021":10467,"Make":"Skoda","Model":"(Россия) Rapid Style (1,6 куб. см., мкпп, 110 л.с.)"},{"2006":1104,"2007":1283,"2008":1492,"2009":1735,"2010":2018,"2011":2346,"2012":2728,"2013":3172,"2014":3689,"2015":4289,"2016":4987,"2017":5799,"2018":6743,"2019":7841,"2020":9118,"2021":10602,"Make":"Skoda","Model":"(Россия) Rapid Style (1,6 куб. см., акпп, 110 л.с.)"},{"2006":1176,"2007":1368,"2008":1590,"2009":1849,"2010":2150,"2011":2500,"2012":2907,"2013":3381,"2014":3931,"2015":4571,"2016":5315,"2017":6180,"2018":7186,"2019":8356,"2020":9716,"2021":11298,"Make":"Skoda","Model":"(Россия) Rapid Style (1,4 куб. см., акпп, 125 л.с.)"},{"2006":1265,"2007":1471,"2008":1711,"2009":1989,"2010":2313,"2011":2689,"2012":3127,"2013":3636,"2014":4228,"2015":4916,"2016":5717,"2017":6647,"2018":7729,"2019":8988,"2020":10451,"2021":12152,"Make":"Skoda","Model":"(Россия) Octavia Active (1,6 куб. см., мкпп, 125 л.с.)"},{"2006":1328,"2007":1544,"2008":1796,"2009":2088,"2010":2428,"2011":2823,"2012":3283,"2013":3817,"2014":4439,"2015":5161,"2016":6002,"2017":6979,"2018":8115,"2019":9436,"2020":10972,"2021":12758,"Make":"Skoda","Model":"(Россия) Octavia Active (1,6 куб. см., акпп, 125 л.с.)"},{"2006":1331,"2007":1548,"2008":1799,"2009":2092,"2010":2433,"2011":2829,"2012":3290,"2013":3825,"2014":4448,"2015":5172,"2016":6014,"2017":6993,"2018":8131,"2019":9455,"2020":10994,"2021":12784,"Make":"Skoda","Model":"(Россия) Octavia Active (1,4 куб. см., мкпп, 150 л.с.)"},{"2006":1384,"2007":1609,"2008":1871,"2009":2176,"2010":2530,"2011":2942,"2012":3420,"2013":3977,"2014":4625,"2015":5378,"2016":6253,"2017":7271,"2018":8454,"2019":9831,"2020":11431,"2021":13292,"Make":"Skoda","Model":"(Россия) Octavia Active (1,4 куб. см., акпп, 150 л.с.)"},{"2006":1335,"2007":1552,"2008":1805,"2009":2099,"2010":2441,"2011":2838,"2012":3300,"2013":3837,"2014":4462,"2015":5188,"2016":6033,"2017":7015,"2018":8157,"2019":9485,"2020":11029,"2021":12824,"Make":"Skoda","Model":"(Россия) Octavia Ambiente (1,6 куб. см., мкпп, 125 л.с.)"},{"2006":1387,"2007":1613,"2008":1875,"2009":2181,"2010":2536,"2011":2948,"2012":3428,"2013":3986,"2014":4635,"2015":5390,"2016":6267,"2017":7288,"2018":8474,"2019":9854,"2020":11458,"2021":13323,"Make":"Skoda","Model":"(Россия) Octavia Ambiente (1,6 куб. см., акпп, 125 л.с.)"},{"2006":1390,"2007":1616,"2008":1879,"2009":2185,"2010":2541,"2011":2954,"2012":3435,"2013":3994,"2014":4644,"2015":5401,"2016":6280,"2017":7302,"2018":8491,"2019":9873,"2020":11480,"2021":13349,"Make":"Skoda","Model":"(Россия) Octavia Ambiente (1,4 куб. см., мкпп, 150 л.с.)"},{"2006":1442,"2007":1676,"2008":1949,"2009":2267,"2010":2636,"2011":3065,"2012":3563,"2013":4144,"2014":4818,"2015":5602,"2016":6514,"2017":7575,"2018":8808,"2019":10242,"2020":11909,"2021":13848,"Make":"Skoda","Model":"(Россия) Octavia Ambiente (1,4 куб. см., акпп, 150 л.с.)"},{"2006":1720,"2007":2000,"2008":2326,"2009":2705,"2010":3145,"2011":3657,"2012":4252,"2013":4945,"2014":5750,"2015":6685,"2016":7774,"2017":9039,"2018":10511,"2019":12222,"2020":14212,"2021":16525,"Make":"Skoda","Model":"(Россия) Octavia Ambiente (2,0 куб. см., акпп, 190 л.с.)"},{"2006":1500,"2007":1744,"2008":2028,"2009":2359,"2010":2743,"2011":3189,"2012":3708,"2013":4312,"2014":5014,"2015":5830,"2016":6779,"2017":7882,"2018":9166,"2019":10658,"2020":12393,"2021":14410,"Make":"Skoda","Model":"(Россия) Octavia Style (1,6 куб. см., мкпп, 125 л.с.)"},{"2006":1551,"2007":1804,"2008":2098,"2009":2439,"2010":2836,"2011":3298,"2012":3835,"2013":4459,"2014":5185,"2015":6029,"2016":7011,"2017":8152,"2018":9479,"2019":11022,"2020":12817,"2021":14903,"Make":"Skoda","Model":"(Россия) Octavia Style (1,6 куб. см., акпп, 125 л.с.)"},{"2006":1554,"2007":1807,"2008":2101,"2009":2443,"2010":2841,"2011":3304,"2012":3842,"2013":4467,"2014":5194,"2015":6040,"2016":7023,"2017":8166,"2018":9496,"2019":11041,"2020":12839,"2021":14929,"Make":"Skoda","Model":"(Россия) Octavia Style (1,4 куб. см., мкпп, 150 л.с.)"},{"2006":1605,"2007":1867,"2008":2171,"2009":2524,"2010":2935,"2011":3413,"2012":3968,"2013":4614,"2014":5365,"2015":6239,"2016":7254,"2017":8435,"2018":9809,"2019":11405,"2020":13262,"2021":15421,"Make":"Skoda","Model":"(Россия) Octavia Style (1,4 куб. см., акпп, 150 л.с.)"},{"2006":1772,"2007":2061,"2008":2396,"2009":2787,"2010":3240,"2011":3768,"2012":4381,"2013":5094,"2014":5923,"2015":6888,"2016":8009,"2017":9313,"2018":10829,"2019":12592,"2020":14642,"2021":17025,"Make":"Skoda","Model":"(Россия) Octavia Style (2,0 куб. см., акпп, 190 л.с.)"},{"2006":1206,"2007":1410,"2008":1649,"2009":1929,"2010":2256,"2011":2639,"2012":3086,"2013":3609,"2014":4222,"2015":4938,"2016":5775,"2017":6754,"2018":7900,"2019":9239,"2020":10806,"2021":12639,"Make":"Skoda","Model":"(Россия) Karоq Active (1,6 куб. см., мкпп, 110 л.с.)"},{"2006":1270,"2007":1485,"2008":1737,"2009":2031,"2010":2376,"2011":2779,"2012":3250,"2013":3801,"2014":4446,"2015":5200,"2016":6082,"2017":7113,"2018":8320,"2019":9731,"2020":11381,"2021":13311,"Make":"Skoda","Model":"(Россия) Karоq Active (1,6 куб. см., акпп, 110 л.с.)"},{"2006":1315,"2007":1538,"2008":1799,"2009":2104,"2010":2461,"2011":2878,"2012":3366,"2013":3937,"2014":4605,"2015":5386,"2016":6299,"2017":7367,"2018":8617,"2019":10078,"2020":11787,"2021":13786,"Make":"Skoda","Model":"(Россия) Karоq Active (1,4 куб. см., акпп, 150 л.с.)"},{"2006":1392,"2007":1628,"2008":1904,"2009":2227,"2010":2605,"2011":3046,"2012":3563,"2013":4167,"2014":4874,"2015":5700,"2016":6667,"2017":7798,"2018":9120,"2019":10667,"2020":12476,"2021":14592,"Make":"Skoda","Model":"(Россия) Karоq Active (1,4 куб. см., акпп 4х4, 150 л.с.)"},{"2006":1314,"2007":1537,"2008":1797,"2009":2102,"2010":2459,"2011":2876,"2012":3363,"2013":3934,"2014":4601,"2015":5381,"2016":6294,"2017":7361,"2018":8610,"2019":10070,"2020":11778,"2021":13775,"Make":"Skoda","Model":"(Россия) Karоq Ambiente (1,6 куб. см., мкпп, 110 л.с.)"},{"2006":1352,"2007":1581,"2008":1849,"2009":2163,"2010":2529,"2011":2958,"2012":3460,"2013":4047,"2014":4733,"2015":5536,"2016":6475,"2017":7573,"2018":8857,"2019":10359,"2020":12116,"2021":14171,"Make":"Skoda","Model":"(Россия) Karоq Ambiente (1,6 куб. см., акпп, 110 л.с.)"},{"2006":1396,"2007":1633,"2008":1910,"2009":2234,"2010":2613,"2011":3056,"2012":3574,"2013":4180,"2014":4889,"2015":5718,"2016":6688,"2017":7822,"2018":9149,"2019":10700,"2020":12515,"2021":14637,"Make":"Skoda","Model":"(Россия) Karоq Ambiente (1,4 куб. см., акпп, 150 л.с.)"},{"2006":1472,"2007":1721,"2008":2013,"2009":2355,"2010":2754,"2011":3221,"2012":3767,"2013":4406,"2014":5153,"2015":6027,"2016":7050,"2017":8245,"2018":9644,"2019":11279,"2020":13192,"2021":15429,"Make":"Skoda","Model":"(Россия) Karоq Ambiente (1,4 куб. см., акпп 4х4, 150 л.с.)"},{"2006":1514,"2007":1771,"2008":2071,"2009":2422,"2010":2833,"2011":3314,"2012":3876,"2013":4533,"2014":5302,"2015":6201,"2016":7253,"2017":8482,"2018":9921,"2019":11604,"2020":13571,"2021":15873,"Make":"Skoda","Model":"(Россия) Karоq Style (1,4 куб. см., акпп, 150 л.с.)"},{"2006":1636,"2007":1914,"2008":2239,"2009":2618,"2010":3062,"2011":3582,"2012":4189,"2013":4899,"2014":5730,"2015":6702,"2016":7839,"2017":9168,"2018":10723,"2019":12541,"2020":14668,"2021":17156,"Make":"Skoda","Model":"(Россия) Karоq Style (1,4 куб. см., акпп 4х4, 150 л.с.)"},{"2006":1374,"2007":1607,"2008":1880,"2009":2199,"2010":2572,"2011":3008,"2012":3518,"2013":4115,"2014":4812,"2015":5629,"2016":6583,"2017":7700,"2018":9005,"2019":10533,"2020":12319,"2021":14408,"Make":"Skoda","Model":"(Россия) Kodiaq Active (1,4 куб. см., акпп, 150 л.с.)"},{"2006":1545,"2007":1807,"2008":2114,"2009":2472,"2010":2892,"2011":3382,"2012":3956,"2013":4626,"2014":5411,"2015":6329,"2016":7402,"2017":8657,"2018":10125,"2019":11843,"2020":13851,"2021":16200,"Make":"Skoda","Model":"(Россия) Kodiaq Active (1,4 куб. см., акпп, 150 л.с.)"},{"2006":1661,"2007":1942,"2008":2272,"2009":2657,"2010":3107,"2011":3634,"2012":4251,"2013":4972,"2014":5815,"2015":6801,"2016":7954,"2017":9303,"2018":10881,"2019":12726,"2020":14885,"2021":17409,"Make":"Skoda","Model":"(Россия) Kodiaq Active (1,4 куб. см., акпп, 150 л.с.)"},{"2006":1695,"2007":1982,"2008":2318,"2009":2712,"2010":3172,"2011":3709,"2012":4338,"2013":5074,"2014":5935,"2015":6941,"2016":8118,"2017":9495,"2018":11105,"2019":12989,"2020":15192,"2021":17768,"Make":"Skoda","Model":"(Россия) Kodiaq Active (1,4 куб. см., акпп 4х4, 150 л.с.)"},{"2006":1642,"2007":1920,"2008":2246,"2009":2627,"2010":3072,"2011":3593,"2012":4202,"2013":4915,"2014":5749,"2015":6724,"2016":7864,"2017":9198,"2018":10757,"2019":12582,"2020":14715,"2021":17211,"Make":"Skoda","Model":"(Россия) Kodiaq Ambiente (1,4 куб. см., акпп, 150 л.с.)"},{"2006":1694,"2007":1981,"2008":2317,"2009":2710,"2010":3170,"2011":3707,"2012":4336,"2013":5071,"2014":5931,"2015":6937,"2016":8113,"2017":9489,"2018":11099,"2019":12981,"2020":15182,"2021":17757,"Make":"Skoda","Model":"(Россия) Kodiaq Ambiente (1,4 куб. см., акпп, 150 л.с.)"},{"2006":1640,"2007":1919,"2008":2244,"2009":2624,"2010":3070,"2011":3590,"2012":4199,"2013":4911,"2014":5744,"2015":6718,"2016":7857,"2017":9190,"2018":10749,"2019":12571,"2020":14703,"2021":17197,"Make":"Skoda","Model":"(Россия) Kodiaq Ambiente (1,4 куб. см., акпп, 150 л.с.)"},{"2006":1769,"2007":2069,"2008":2420,"2009":2831,"2010":3311,"2011":3872,"2012":4529,"2013":5297,"2014":6196,"2015":7246,"2016":8475,"2017":9913,"2018":11594,"2019":13560,"2020":15859,"2021":18549,"Make":"Skoda","Model":"(Россия) Kodiaq Ambiente (1,4 куб. см., акпп 4х4, 150 л.с.)"},{"2006":1923,"2007":2249,"2008":2631,"2009":3077,"2010":3598,"2011":4209,"2012":4922,"2013":5757,"2014":6734,"2015":7876,"2016":9211,"2017":10773,"2018":12601,"2019":14737,"2020":17237,"2021":20160,"Make":"Skoda","Model":"(Россия) Kodiaq Ambiente (1,4 куб. см., акпп 4х4, 180 л.с.)"},{"2006":1868,"2007":2184,"2008":2555,"2009":2988,"2010":3495,"2011":4087,"2012":4781,"2013":5591,"2014":6540,"2015":7649,"2016":8946,"2017":10463,"2018":12237,"2019":14313,"2020":16740,"2021":19579,"Make":"Skoda","Model":"(Россия) Kodiaq Ambiente (2,0 D куб. см., акпп 4х4, 150 л.с.)"},{"2006":1830,"2007":2141,"2008":2504,"2009":2929,"2010":3425,"2011":4006,"2012":4686,"2013":5480,"2014":6410,"2015":7497,"2016":8768,"2017":10255,"2018":11994,"2019":14028,"2020":16407,"2021":19190,"Make":"Skoda","Model":"(Россия) Kodiaq Style (1,4 куб. см., акпп, 150 л.с.)"},{"2006":1871,"2007":2188,"2008":2560,"2009":2994,"2010":3501,"2011":4095,"2012":4790,"2013":5602,"2014":6552,"2015":7663,"2016":8963,"2017":10483,"2018":12261,"2019":14340,"2020":16772,"2021":19616,"Make":"Skoda","Model":"(Россия) Kodiaq Style (1,4 куб. см., акпп, 150 л.с.)"},{"2006":1905,"2007":2228,"2008":2606,"2009":3048,"2010":3565,"2011":4170,"2012":4877,"2013":5704,"2014":6671,"2015":7803,"2016":9126,"2017":10674,"2018":12484,"2019":14601,"2020":17077,"2021":19973,"Make":"Skoda","Model":"(Россия) Kodiaq Style (1,4 куб. см., акпп 4х4, 150 л.с.)"},{"2006":2057,"2007":2406,"2008":2814,"2009":3291,"2010":3849,"2011":4502,"2012":5265,"2013":6158,"2014":7203,"2015":8424,"2016":9853,"2017":11524,"2018":13478,"2019":15764,"2020":18437,"2021":21564,"Make":"Skoda","Model":"(Россия) Kodiaq Style (2,0 куб. см., акпп 4х4, 180 л.с.)"},{"2006":2002,"2007":2342,"2008":2739,"2009":3203,"2010":3747,"2011":4382,"2012":5125,"2013":5994,"2014":7011,"2015":8200,"2016":9591,"2017":11217,"2018":13119,"2019":15344,"2020":17946,"2021":20990,"Make":"Skoda","Model":"(Россия) Kodiaq Style (2,0 D куб. см., акпп 4х4, 150 л.с.)"},{"2006":1529,"2007":1798,"2008":2116,"2009":2489,"2010":2929,"2011":3445,"2012":4053,"2013":4769,"2014":5610,"2015":6600,"2016":7765,"2017":9135,"2018":10747,"2019":12644,"2020":14875,"2021":17500,"Make":"Ssang Yong","Model":"Tivoli"},{"2006":1922,"2007":2261,"2008":2660,"2009":3129,"2010":3682,"2011":4331,"2012":5096,"2013":5995,"2014":7053,"2015":8297,"2016":9762,"2017":11484,"2018":13511,"2019":15895,"2020":18700,"2021":22000,"Make":"Ssang Yong","Model":"Korando"},{"2006":1747,"2007":2055,"2008":2418,"2009":2845,"2010":3347,"2011":3937,"2012":4632,"2013":5450,"2014":6412,"2015":7543,"2016":8874,"2017":10440,"2018":12283,"2019":14450,"2020":17000,"2021":20000,"Make":"Ssang Yong","Model":"MUSSO"},{"2006":1747,"2007":2055,"2008":2418,"2009":2845,"2010":3347,"2011":3937,"2012":4632,"2013":5450,"2014":6412,"2015":7543,"2016":8874,"2017":10440,"2018":12283,"2019":14450,"2020":17000,"2021":20000,"Make":"Ssang Yong","Model":"XLV"},{"2006":1616,"2007":1901,"2008":2237,"2009":2631,"2010":3096,"2011":3642,"2012":4285,"2013":5041,"2014":5931,"2015":6977,"2016":8209,"2017":9657,"2018":11361,"2019":13366,"2020":15725,"2021":18500,"Make":"Ssang Yong","Model":"Actyon"},{"2006":1616,"2007":1901,"2008":2237,"2009":2631,"2010":3096,"2011":3642,"2012":4285,"2013":5041,"2014":5931,"2015":6977,"2016":8209,"2017":9657,"2018":11361,"2019":13366,"2020":15725,"2021":18500,"Make":"Ssang Yong","Model":"Kyron"},{"2006":1922,"2007":2261,"2008":2660,"2009":3129,"2010":3682,"2011":4331,"2012":5096,"2013":5995,"2014":7053,"2015":8297,"2016":9762,"2017":11484,"2018":13511,"2019":15895,"2020":18700,"2021":22000,"Make":"Ssang Yong","Model":"Rexton"},{"2006":2883,"2007":3391,"2008":3990,"2009":4694,"2010":5522,"2011":6497,"2012":7643,"2013":8992,"2014":10579,"2015":12446,"2016":14642,"2017":17226,"2018":20266,"2019":23843,"2020":28050,"2021":33000,"Make":"Subaru","Model":"Legacy"},{"2006":3319,"2007":3905,"2008":4594,"2009":5405,"2010":6359,"2011":7481,"2012":8801,"2013":10355,"2014":12182,"2015":14332,"2016":16861,"2017":19836,"2018":23337,"2019":27455,"2020":32300,"2021":38000,"Make":"Subaru","Model":"WRX STI 2,0"},{"2006":4542,"2007":5344,"2008":6287,"2009":7397,"2010":8702,"2011":10237,"2012":12044,"2013":14170,"2014":16670,"2015":19612,"2016":23073,"2017":27144,"2018":31935,"2019":37570,"2020":44200,"2021":52000,"Make":"Subaru","Model":"WRX STI 2,5"},{"2006":2446,"2007":2878,"2008":3385,"2009":3983,"2010":4686,"2011":5512,"2012":6485,"2013":7630,"2014":8976,"2015":10560,"2016":12424,"2017":14616,"2018":17196,"2019":20230,"2020":23800,"2021":28000,"Make":"Subaru","Model":"Forester 2,0"},{"2006":2970,"2007":3494,"2008":4111,"2009":4836,"2010":5690,"2011":6694,"2012":7875,"2013":9265,"2014":10900,"2015":12823,"2016":15086,"2017":17748,"2018":20880,"2019":24565,"2020":28900,"2021":34000,"Make":"Subaru","Model":"Forester 3,0"},{"2006":2009,"2007":2364,"2008":2781,"2009":3272,"2010":3849,"2011":4528,"2012":5327,"2013":6267,"2014":7373,"2015":8674,"2016":10205,"2017":12006,"2018":14125,"2019":16618,"2020":19550,"2021":23000,"Make":"Subaru","Model":"XV 1,6"},{"2006":2446,"2007":2878,"2008":3385,"2009":3983,"2010":4686,"2011":5512,"2012":6485,"2013":7630,"2014":8976,"2015":10560,"2016":12424,"2017":14616,"2018":17196,"2019":20230,"2020":23800,"2021":28000,"Make":"Subaru","Model":"XV 2,0"},{"2006":3145,"2007":3700,"2008":4353,"2009":5121,"2010":6024,"2011":7087,"2012":8338,"2013":9810,"2014":11541,"2015":13577,"2016":15973,"2017":18792,"2018":22109,"2019":26010,"2020":30600,"2021":36000,"Make":"Subaru","Model":"Outback 2,5"},{"2006":4106,"2007":4830,"2008":5683,"2009":6685,"2010":7865,"2011":9253,"2012":10886,"2013":12807,"2014":15067,"2015":17726,"2016":20854,"2017":24534,"2018":28864,"2019":33958,"2020":39950,"2021":47000,"Make":"Subaru","Model":"Outback 3,6"},{"2006":1485,"2007":1747,"2008":2055,"2009":2418,"2010":2845,"2011":3347,"2012":3937,"2013":4632,"2014":5450,"2015":6412,"2016":7543,"2017":8874,"2018":10440,"2019":12283,"2020":14450,"2021":17000,"Make":"Suzuki","Model":"Swift"},{"2006":874,"2007":1028,"2008":1209,"2009":1422,"2010":1673,"2011":1969,"2012":2316,"2013":2725,"2014":3206,"2015":3771,"2016":4437,"2017":5220,"2018":6141,"2019":7225,"2020":8500,"2021":10000,"Make":"Suzuki","Model":"Splesh"},{"2006":1747,"2007":2055,"2008":2418,"2009":2845,"2010":3347,"2011":3937,"2012":4632,"2013":5450,"2014":6412,"2015":7543,"2016":8874,"2017":10440,"2018":12283,"2019":14450,"2020":17000,"2021":20000,"Make":"Suzuki","Model":"Grand Vitara 2,0, 5 дверей"},{"2006":1922,"2007":2261,"2008":2660,"2009":3129,"2010":3682,"2011":4331,"2012":5096,"2013":5995,"2014":7053,"2015":8297,"2016":9762,"2017":11484,"2018":13511,"2019":15895,"2020":18700,"2021":22000,"Make":"Suzuki","Model":"Grand Vitara 2,4, 5 дверей"},{"2006":1485,"2007":1747,"2008":2055,"2009":2418,"2010":2845,"2011":3347,"2012":3937,"2013":4632,"2014":5450,"2015":6412,"2016":7543,"2017":8874,"2018":10440,"2019":12283,"2020":14450,"2021":17000,"Make":"Suzuki","Model":"Grand Vitara 1,6, 3 дверей"},{"2006":1834,"2007":2158,"2008":2539,"2009":2987,"2010":3514,"2011":4134,"2012":4864,"2013":5722,"2014":6732,"2015":7920,"2016":9318,"2017":10962,"2018":12897,"2019":15173,"2020":17850,"2021":21000,"Make":"Suzuki","Model":"Grand Vitara 2,4, 3 дверей"},{"2006":1922,"2007":2261,"2008":2660,"2009":3129,"2010":3682,"2011":4331,"2012":5096,"2013":5995,"2014":7053,"2015":8297,"2016":9762,"2017":11484,"2018":13511,"2019":15895,"2020":18700,"2021":22000,"Make":"Suzuki","Model":"Vitara 1,4"},{"2006":1747,"2007":2055,"2008":2418,"2009":2845,"2010":3347,"2011":3937,"2012":4632,"2013":5450,"2014":6412,"2015":7543,"2016":8874,"2017":10440,"2018":12283,"2019":14450,"2020":17000,"2021":20000,"Make":"Suzuki","Model":"Vitara 1,6"},{"2006":2009,"2007":2364,"2008":2781,"2009":3272,"2010":3849,"2011":4528,"2012":5327,"2013":6267,"2014":7373,"2015":8674,"2016":10205,"2017":12006,"2018":14125,"2019":16618,"2020":19550,"2021":23000,"Make":"Suzuki","Model":"SX4 1,4"},{"2006":1834,"2007":2158,"2008":2539,"2009":2987,"2010":3514,"2011":4134,"2012":4864,"2013":5722,"2014":6732,"2015":7920,"2016":9318,"2017":10962,"2018":12897,"2019":15173,"2020":17850,"2021":21000,"Make":"Suzuki","Model":"SX4 1,6"},{"2006":1398,"2007":1644,"2008":1934,"2009":2276,"2010":2677,"2011":3150,"2012":3706,"2013":4360,"2014":5129,"2015":6034,"2016":7099,"2017":8352,"2018":9826,"2019":11560,"2020":13600,"2021":16000,"Make":"Suzuki","Model":"Jimny"},{"2006":961,"2007":1130,"2008":1330,"2009":1565,"2010":1841,"2011":2166,"2012":2548,"2013":2997,"2014":3526,"2015":4149,"2016":4881,"2017":5742,"2018":6755,"2019":7948,"2020":9350,"2021":11000,"Make":"Toyota","Model":"Vitz"},{"2006":961,"2007":1130,"2008":1330,"2009":1565,"2010":1841,"2011":2166,"2012":2548,"2013":2997,"2014":3526,"2015":4149,"2016":4881,"2017":5742,"2018":6755,"2019":7948,"2020":9350,"2021":11000,"Make":"Toyota","Model":"Passo"},{"2006":1616,"2007":1901,"2008":2237,"2009":2631,"2010":3096,"2011":3642,"2012":4285,"2013":5041,"2014":5931,"2015":6977,"2016":8209,"2017":9657,"2018":11361,"2019":13366,"2020":15725,"2021":18500,"Make":"Toyota","Model":"Avensis 1,6"},{"2006":2009,"2007":2364,"2008":2781,"2009":3272,"2010":3849,"2011":4528,"2012":5327,"2013":6267,"2014":7373,"2015":8674,"2016":10205,"2017":12006,"2018":14125,"2019":16618,"2020":19550,"2021":23000,"Make":"Toyota","Model":"Avensis 1,8"},{"2006":2621,"2007":3083,"2008":3627,"2009":4267,"2010":5020,"2011":5906,"2012":6949,"2013":8175,"2014":9617,"2015":11314,"2016":13311,"2017":15660,"2018":18424,"2019":21675,"2020":25500,"2021":30000,"Make":"Toyota","Model":"Avensis 2,0"},{"2006":1310,"2007":1542,"2008":1814,"2009":2134,"2010":2510,"2011":2953,"2012":3474,"2013":4087,"2014":4809,"2015":5657,"2016":6656,"2017":7830,"2018":9212,"2019":10838,"2020":12750,"2021":15000,"Make":"Toyota","Model":"Yaris"},{"2006":1485,"2007":1747,"2008":2055,"2009":2418,"2010":2845,"2011":3347,"2012":3937,"2013":4632,"2014":5450,"2015":6412,"2016":7543,"2017":8874,"2018":10440,"2019":12283,"2020":14450,"2021":17000,"Make":"Toyota","Model":"Yaris (гибрид)"},{"2006":2795,"2007":3289,"2008":3869,"2009":4552,"2010":5355,"2011":6300,"2012":7412,"2013":8720,"2014":10258,"2015":12069,"2016":14199,"2017":16704,"2018":19652,"2019":23120,"2020":27200,"2021":32000,"Make":"Toyota","Model":"Prius"},{"2006":1406,"2007":1655,"2008":1947,"2009":2290,"2010":2694,"2011":3170,"2012":3729,"2013":4387,"2014":5161,"2015":6072,"2016":7144,"2017":8404,"2018":9887,"2019":11632,"2020":13685,"2021":16100,"Make":"Toyota","Model":"Corolla 1,3"},{"2006":1696,"2007":1995,"2008":2347,"2009":2761,"2010":3248,"2011":3822,"2012":4496,"2013":5290,"2014":6223,"2015":7321,"2016":8613,"2017":10133,"2018":11921,"2019":14025,"2020":16500,"2021":16900,"Make":"Toyota","Model":"Corolla 1,6"},{"2006":1757,"2007":2067,"2008":2432,"2009":2862,"2010":3367,"2011":3961,"2012":4660,"2013":5482,"2014":6449,"2015":7587,"2016":8926,"2017":10502,"2018":12355,"2019":14535,"2020":17100,"2021":17600,"Make":"Toyota","Model":"Corolla 1,8"},{"2006":3052,"2007":3591,"2008":4225,"2009":4970,"2010":5847,"2011":6879,"2012":8093,"2013":9521,"2014":11201,"2015":13178,"2016":15504,"2017":18240,"2018":21458,"2019":25245,"2020":29700,"2021":30500,"Make":"Toyota","Model":"Camry 2,0 - 2,5 PTL"},{"2006":3391,"2007":3990,"2008":4694,"2009":5522,"2010":6497,"2011":7643,"2012":8992,"2013":10579,"2014":12446,"2015":14642,"2016":17226,"2017":20266,"2018":23843,"2019":28050,"2020":33000,"2021":34000,"Make":"Toyota","Model":"Camry 3,5 PTL"},{"2006":3232,"2007":3802,"2008":4474,"2009":5263,"2010":6192,"2011":7284,"2012":8570,"2013":10082,"2014":11861,"2015":13955,"2016":16417,"2017":19314,"2018":22723,"2019":26733,"2020":31450,"2021":37000,"Make":"Toyota","Model":"Avalon"},{"2006":2621,"2007":3083,"2008":3627,"2009":4267,"2010":5020,"2011":5906,"2012":6949,"2013":8175,"2014":9617,"2015":11314,"2016":13311,"2017":15660,"2018":18424,"2019":21675,"2020":25500,"2021":30000,"Make":"Toyota","Model":"Scion"},{"2006":3014,"2007":3546,"2008":4171,"2009":4907,"2010":5773,"2011":6792,"2012":7991,"2013":9401,"2014":11060,"2015":13012,"2016":15308,"2017":18009,"2018":21187,"2019":24926,"2020":29325,"2021":34500,"Make":"Toyota","Model":"GT86"},{"2006":7512,"2007":8838,"2008":10398,"2009":12233,"2010":14392,"2011":16931,"2012":19919,"2013":23434,"2014":27570,"2015":32435,"2016":38159,"2017":44893,"2018":52815,"2019":62135,"2020":73100,"2021":86000,"Make":"Toyota","Model":"Supra"},{"2006":2184,"2007":2569,"2008":3023,"2009":3556,"2010":4184,"2011":4922,"2012":5790,"2013":6812,"2014":8014,"2015":9429,"2016":11093,"2017":13050,"2018":15353,"2019":18063,"2020":21250,"2021":25000,"Make":"Toyota","Model":"Mark"},{"2006":2184,"2007":2569,"2008":3023,"2009":3556,"2010":4184,"2011":4922,"2012":5790,"2013":6812,"2014":8014,"2015":9429,"2016":11093,"2017":13050,"2018":15353,"2019":18063,"2020":21250,"2021":25000,"Make":"Toyota","Model":"Mark Zio"},{"2006":3931,"2007":4625,"2008":5441,"2009":6401,"2010":7530,"2011":8859,"2012":10423,"2013":12262,"2014":14426,"2015":16972,"2016":19967,"2017":23490,"2018":27636,"2019":32513,"2020":38250,"2021":45000,"Make":"Toyota","Model":"Crown"},{"2006":2883,"2007":3391,"2008":3990,"2009":4694,"2010":5522,"2011":6497,"2012":7643,"2013":8992,"2014":10579,"2015":12446,"2016":14642,"2017":17226,"2018":20266,"2019":23843,"2020":28050,"2021":33000,"Make":"Toyota","Model":"Aurion"},{"2006":3237,"2007":3809,"2008":4481,"2009":5271,"2010":6202,"2011":7296,"2012":8583,"2013":10098,"2014":11880,"2015":13977,"2016":16443,"2017":19345,"2018":22759,"2019":26775,"2020":31500,"2021":32000,"Make":"Toyota","Model":"RAV-4 2,0"},{"2006":3402,"2007":4002,"2008":4708,"2009":5539,"2010":6517,"2011":7667,"2012":9019,"2013":10611,"2014":12484,"2015":14687,"2016":17278,"2017":20328,"2018":23915,"2019":28135,"2020":33100,"2021":33600,"Make":"Toyota","Model":"RAV-4 2,5"},{"2006":3162,"2007":3720,"2008":4377,"2009":5149,"2010":6058,"2011":7127,"2012":8385,"2013":9864,"2014":11605,"2015":13653,"2016":16062,"2017":18897,"2018":22231,"2019":26155,"2020":30770,"2021":36200,"Make":"Toyota","Model":"RAV-4 2,2 d"},{"2006":2822,"2007":3319,"2008":3905,"2009":4594,"2010":5405,"2011":6359,"2012":7481,"2013":8801,"2014":10355,"2015":12182,"2016":14332,"2017":16861,"2018":19836,"2019":23337,"2020":27455,"2021":32300,"Make":"Toyota","Model":"FJ"},{"2006":3957,"2007":4655,"2008":5476,"2009":6443,"2010":7580,"2011":8917,"2012":10491,"2013":12342,"2014":14520,"2015":17083,"2016":20097,"2017":23644,"2018":27816,"2019":32725,"2020":38500,"2021":39000,"Make":"Toyota","Model":"Land Cruiser Prado 2,7"},{"2006":4265,"2007":5018,"2008":5903,"2009":6945,"2010":8170,"2011":9612,"2012":11308,"2013":13304,"2014":15652,"2015":18414,"2016":21663,"2017":25486,"2018":29984,"2019":35275,"2020":41500,"2021":41500,"Make":"Toyota","Model":"Land Cruiser Prado 4,0"},{"2006":4228,"2007":4974,"2008":5852,"2009":6885,"2010":8099,"2011":9529,"2012":11210,"2013":13189,"2014":15516,"2015":18254,"2016":21475,"2017":25265,"2018":29724,"2019":34969,"2020":41140,"2021":48400,"Make":"Toyota","Model":"Land Cruiser Prado 2,8"},{"2006":4625,"2007":5441,"2008":6401,"2009":7530,"2010":8859,"2011":10423,"2012":12262,"2013":14426,"2014":16972,"2015":19967,"2016":23490,"2017":27636,"2018":32513,"2019":38250,"2020":45000,"2021":45000,"Make":"Toyota","Model":"Land Cruiser 200 4,0"},{"2006":7399,"2007":8705,"2008":10241,"2009":12049,"2010":14175,"2011":16676,"2012":19619,"2013":23082,"2014":27155,"2015":31947,"2016":37584,"2017":44217,"2018":52020,"2019":61200,"2020":72000,"2021":75000,"Make":"Toyota","Model":"Land Cruiser 200 4,5"},{"2006":6166,"2007":7254,"2008":8535,"2009":10041,"2010":11812,"2011":13897,"2012":16349,"2013":19235,"2014":22629,"2015":26622,"2016":31320,"2017":36848,"2018":43350,"2019":51000,"2020":60000,"2021":64000,"Make":"Toyota","Model":"Land Cruiser 200 4,6"},{"2006":2991,"2007":3518,"2008":4139,"2009":4870,"2010":5729,"2011":6740,"2012":7929,"2013":9329,"2014":10975,"2015":12912,"2016":15190,"2017":17871,"2018":21025,"2019":24735,"2020":29100,"2021":29900,"Make":"Toyota","Model":"76 (LC) 4,0 PTL"},{"2006":3104,"2007":3651,"2008":4296,"2009":5054,"2010":5946,"2011":6995,"2012":8229,"2013":9681,"2014":11390,"2015":13400,"2016":15765,"2017":18547,"2018":21820,"2019":25670,"2020":30200,"2021":31000,"Make":"Toyota","Model":"76 (LC) 4,2- 4,5 DSL"},{"2006":3134,"2007":3688,"2008":4338,"2009":5104,"2010":6005,"2011":7064,"2012":8311,"2013":9778,"2014":11503,"2015":13533,"2016":15921,"2017":18731,"2018":22036,"2019":25925,"2020":30500,"2021":31300,"Make":"Toyota","Model":"78 (LC) 4,0 PTL"},{"2006":3196,"2007":3760,"2008":4424,"2009":5204,"2010":6123,"2011":7203,"2012":8474,"2013":9970,"2014":11729,"2015":13799,"2016":16234,"2017":19099,"2018":22470,"2019":26435,"2020":31100,"2021":31600,"Make":"Toyota","Model":"78 (LC) 4,2-4,5 DSL"},{"2006":3340,"2007":3929,"2008":4623,"2009":5439,"2010":6398,"2011":7528,"2012":8856,"2013":10419,"2014":12257,"2015":14420,"2016":16965,"2017":19959,"2018":23481,"2019":27625,"2020":32500,"2021":33000,"Make":"Toyota","Model":"79 (LC) 4,0 PTL"},{"2006":3371,"2007":3966,"2008":4666,"2009":5489,"2010":6457,"2011":7597,"2012":8938,"2013":10515,"2014":12371,"2015":14554,"2016":17122,"2017":20143,"2018":23698,"2019":27880,"2020":32800,"2021":33500,"Make":"Toyota","Model":"79 (LC) 4,2-4,5 DSL"},{"2006":2271,"2007":2672,"2008":3144,"2009":3698,"2010":4351,"2011":5119,"2012":6022,"2013":7085,"2014":8335,"2015":9806,"2016":11536,"2017":13572,"2018":15967,"2019":18785,"2020":22100,"2021":26000,"Make":"Toyota","Model":"IPSUM"},{"2006":2009,"2007":2364,"2008":2781,"2009":3272,"2010":3849,"2011":4528,"2012":5327,"2013":6267,"2014":7373,"2015":8674,"2016":10205,"2017":12006,"2018":14125,"2019":16618,"2020":19550,"2021":23000,"Make":"Toyota","Model":"Fielder"},{"2006":2009,"2007":2364,"2008":2781,"2009":3272,"2010":3849,"2011":4528,"2012":5327,"2013":6267,"2014":7373,"2015":8674,"2016":10205,"2017":12006,"2018":14125,"2019":16618,"2020":19550,"2021":23000,"Make":"Toyota","Model":"Verso"},{"2006":1660,"2007":1953,"2008":2297,"2009":2703,"2010":3180,"2011":3741,"2012":4401,"2013":5177,"2014":6091,"2015":7166,"2016":8430,"2017":9918,"2018":11668,"2019":13728,"2020":16150,"2021":19000,"Make":"Toyota","Model":"Auris"},{"2006":3145,"2007":3700,"2008":4353,"2009":5121,"2010":6024,"2011":7087,"2012":8338,"2013":9810,"2014":11541,"2015":13577,"2016":15973,"2017":18792,"2018":22109,"2019":26010,"2020":30600,"2021":36000,"Make":"Toyota","Model":"Venza"},{"2006":3145,"2007":3700,"2008":4353,"2009":5121,"2010":6024,"2011":7087,"2012":8338,"2013":9810,"2014":11541,"2015":13577,"2016":15973,"2017":18792,"2018":22109,"2019":26010,"2020":30600,"2021":36000,"Make":"Toyota","Model":"Highlander"},{"2006":2970,"2007":3494,"2008":4111,"2009":4836,"2010":5690,"2011":6694,"2012":7875,"2013":9265,"2014":10900,"2015":12823,"2016":15086,"2017":17748,"2018":20880,"2019":24565,"2020":28900,"2021":34000,"Make":"Toyota","Model":"Fortuner 2,7"},{"2006":2926,"2007":3443,"2008":4050,"2009":4765,"2010":5606,"2011":6595,"2012":7759,"2013":9128,"2014":10739,"2015":12635,"2016":14864,"2017":17487,"2018":20573,"2019":24204,"2020":28475,"2021":33500,"Make":"Toyota","Model":"Fortuner 2,8"},{"2006":3236,"2007":3808,"2008":4480,"2009":5270,"2010":6200,"2011":7294,"2012":8581,"2013":10096,"2014":11877,"2015":13973,"2016":16439,"2017":19340,"2018":22753,"2019":26769,"2020":31493,"2021":37050,"Make":"Toyota","Model":"4-Runner"},{"2006":2590,"2007":3047,"2008":3584,"2009":4217,"2010":4961,"2011":5837,"2012":6867,"2013":8079,"2014":9504,"2015":11181,"2016":13155,"2017":15476,"2018":18207,"2019":21420,"2020":25200,"2021":25600,"Make":"Toyota","Model":"Hilux 2,5"},{"2006":2991,"2007":3518,"2008":4139,"2009":4870,"2010":5729,"2011":6740,"2012":7929,"2013":9329,"2014":10975,"2015":12912,"2016":15190,"2017":17871,"2018":21025,"2019":24735,"2020":29100,"2021":29500,"Make":"Toyota","Model":"Hilux 2,8"},{"2006":2415,"2007":2841,"2008":3343,"2009":3933,"2010":4627,"2011":5443,"2012":6404,"2013":7534,"2014":8863,"2015":10427,"2016":12267,"2017":14432,"2018":16979,"2019":19975,"2020":23500,"2021":24200,"Make":"Toyota","Model":"Hilux 2,7 PTL"},{"2006":3232,"2007":3802,"2008":4474,"2009":5263,"2010":6192,"2011":7284,"2012":8570,"2013":10082,"2014":11861,"2015":13955,"2016":16417,"2017":19314,"2018":22723,"2019":26733,"2020":31450,"2021":37000,"Make":"Toyota","Model":"Harrier"},{"2006":3844,"2007":4522,"2008":5320,"2009":6259,"2010":7363,"2011":8662,"2012":10191,"2013":11990,"2014":14105,"2015":16595,"2016":19523,"2017":22968,"2018":27022,"2019":31790,"2020":37400,"2021":44000,"Make":"Toyota","Model":"Sequoia SR5"},{"2006":4368,"2007":5138,"2008":6045,"2009":7112,"2010":8367,"2011":9844,"2012":11581,"2013":13625,"2014":16029,"2015":18857,"2016":22185,"2017":26100,"2018":30706,"2019":36125,"2020":42500,"2021":50000,"Make":"Toyota","Model":"Sequoia Iimited"},{"2006":4630,"2007":5447,"2008":6408,"2009":7539,"2010":8869,"2011":10434,"2012":12276,"2013":14442,"2014":16991,"2015":19989,"2016":23516,"2017":27666,"2018":32549,"2019":38293,"2020":45050,"2021":53000,"Make":"Toyota","Model":"Sequoia Platinum"},{"2006":4018,"2007":4727,"2008":5562,"2009":6543,"2010":7698,"2011":9056,"2012":10654,"2013":12535,"2014":14747,"2015":17349,"2016":20410,"2017":24012,"2018":28250,"2019":33235,"2020":39100,"2021":46000,"Make":"Toyota","Model":"Tundra"},{"2006":4018,"2007":4727,"2008":5562,"2009":6543,"2010":7698,"2011":9056,"2012":10654,"2013":12535,"2014":14747,"2015":17349,"2016":20410,"2017":24012,"2018":28250,"2019":33235,"2020":39100,"2021":46000,"Make":"Toyota","Model":"Sienna"},{"2006":4368,"2007":5138,"2008":6045,"2009":7112,"2010":8367,"2011":9844,"2012":11581,"2013":13625,"2014":16029,"2015":18857,"2016":22185,"2017":26100,"2018":30706,"2019":36125,"2020":42500,"2021":50000,"Make":"Toyota","Model":"Tacoma"},{"2006":2883,"2007":3391,"2008":3990,"2009":4694,"2010":5522,"2011":6497,"2012":7643,"2013":8992,"2014":10579,"2015":12446,"2016":14642,"2017":17226,"2018":20266,"2019":23843,"2020":28050,"2021":33000,"Make":"Toyota","Model":"Hiace"},{"2006":5678,"2007":6680,"2008":7859,"2009":9246,"2010":10877,"2011":12797,"2012":15055,"2013":17712,"2014":20838,"2015":24515,"2016":28841,"2017":33930,"2018":39918,"2019":46963,"2020":55250,"2021":65000,"Make":"Toyota","Model":"Alphard"},{"2006":2271,"2007":2672,"2008":3144,"2009":3698,"2010":4351,"2011":5119,"2012":6022,"2013":7085,"2014":8335,"2015":9806,"2016":11536,"2017":13572,"2018":15967,"2019":18785,"2020":22100,"2021":26000,"Make":"Toyota","Model":"C-HR Hybrid"},{"2006":2466,"2007":2902,"2008":3414,"2009":4016,"2010":4725,"2011":5559,"2012":6540,"2013":7694,"2014":9052,"2015":10649,"2016":12528,"2017":14739,"2018":17340,"2019":20400,"2020":24000,"2021":24500,"Make":"Toyota","Model":"C-HR"},{"2006":3057,"2007":3597,"2008":4232,"2009":4978,"2010":5857,"2011":6891,"2012":8107,"2013":9537,"2014":11220,"2015":13200,"2016":15530,"2017":18270,"2018":21494,"2019":25288,"2020":29750,"2021":35000,"Make":"Toyota","Model":"Previa"},{"2006":1922,"2007":2261,"2008":2660,"2009":3129,"2010":3682,"2011":4331,"2012":5096,"2013":5995,"2014":7053,"2015":8297,"2016":9762,"2017":11484,"2018":13511,"2019":15895,"2020":18700,"2021":22000,"Make":"Toyota","Model":"Sienta"},{"2006":2708,"2007":3186,"2008":3748,"2009":4409,"2010":5188,"2011":6103,"2012":7180,"2013":8447,"2014":9938,"2015":11692,"2016":13755,"2017":16182,"2018":19038,"2019":22398,"2020":26350,"2021":31000,"Make":"Toyota","Model":"Voxy"},{"2006":3713,"2007":4368,"2008":5138,"2009":6045,"2010":7112,"2011":8367,"2012":9844,"2013":11581,"2014":13625,"2015":16029,"2016":18857,"2017":22185,"2018":26100,"2019":30706,"2020":36125,"2021":42500,"Make":"Toyota","Model":"Estima"},{"2006":3319,"2007":3905,"2008":4594,"2009":5405,"2010":6359,"2011":7481,"2012":8801,"2013":10355,"2014":12182,"2015":14332,"2016":16861,"2017":19836,"2018":23337,"2019":27455,"2020":32300,"2021":38000,"Make":"Toyota","Model":"Noah"},{"2006":1747,"2007":2055,"2008":2418,"2009":2845,"2010":3347,"2011":3937,"2012":4632,"2013":5450,"2014":6412,"2015":7543,"2016":8874,"2017":10440,"2018":12283,"2019":14450,"2020":17000,"2021":20000,"Make":"Toyota","Model":"Wish"},{"2006":2184,"2007":2569,"2008":3023,"2009":3556,"2010":4184,"2011":4922,"2012":5790,"2013":6812,"2014":8014,"2015":9429,"2016":11093,"2017":13050,"2018":15353,"2019":18063,"2020":21250,"2021":25000,"Make":"Toyota","Model":"Mark Х Zio"},{"2006":961,"2007":1130,"2008":1330,"2009":1565,"2010":1841,"2011":2166,"2012":2548,"2013":2997,"2014":3526,"2015":4149,"2016":4881,"2017":5742,"2018":6755,"2019":7948,"2020":9350,"2021":11000,"Make":"Volkswagen","Model":"Polo"},{"2006":1354,"2007":1593,"2008":1874,"2009":2205,"2010":2594,"2011":3052,"2012":3590,"2013":4224,"2014":4969,"2015":5846,"2016":6877,"2017":8091,"2018":9519,"2019":11199,"2020":13175,"2021":15500,"Make":"Volkswagen","Model":"Jetta"},{"2006":1948,"2007":2292,"2008":2696,"2009":3172,"2010":3732,"2011":4390,"2012":5165,"2013":6077,"2014":7149,"2015":8410,"2016":9895,"2017":11641,"2018":13695,"2019":16112,"2020":18955,"2021":22300,"Make":"Volkswagen","Model":"Passat"},{"2006":1791,"2007":2107,"2008":2479,"2009":2916,"2010":3431,"2011":4036,"2012":4748,"2013":5586,"2014":6572,"2015":7732,"2016":9096,"2017":10701,"2018":12590,"2019":14811,"2020":17425,"2021":20500,"Make":"Volkswagen","Model":"Golf"},{"2006":1703,"2007":2004,"2008":2358,"2009":2774,"2010":3263,"2011":3839,"2012":4517,"2013":5314,"2014":6251,"2015":7354,"2016":8652,"2017":10179,"2018":11975,"2019":14089,"2020":16575,"2021":19500,"Make":"Volkswagen","Model":"Touran"},{"2006":5023,"2007":5909,"2008":6952,"2009":8179,"2010":9622,"2011":11320,"2012":13318,"2013":15668,"2014":18433,"2015":21686,"2016":25513,"2017":30015,"2018":35312,"2019":41544,"2020":48875,"2021":57500,"Make":"Volkswagen","Model":"Phaeton"},{"2006":1415,"2007":1665,"2008":1959,"2009":2304,"2010":2711,"2011":3189,"2012":3752,"2013":4414,"2014":5193,"2015":6110,"2016":7188,"2017":8457,"2018":9949,"2019":11705,"2020":13770,"2021":16200,"Make":"Volkswagen","Model":"Scriocco"},{"2006":3276,"2007":3854,"2008":4534,"2009":5334,"2010":6275,"2011":7383,"2012":8686,"2013":10218,"2014":12022,"2015":14143,"2016":16639,"2017":19575,"2018":23030,"2019":27094,"2020":31875,"2021":37500,"Make":"Volkswagen","Model":"Arteon"},{"2006":1677,"2007":1973,"2008":2321,"2009":2731,"2010":3213,"2011":3780,"2012":4447,"2013":5232,"2014":6155,"2015":7241,"2016":8519,"2017":10023,"2018":11791,"2019":13872,"2020":16320,"2021":19200,"Make":"Volkswagen","Model":"Beetle"},{"2006":1616,"2007":1901,"2008":2237,"2009":2631,"2010":3096,"2011":3642,"2012":4285,"2013":5041,"2014":5931,"2015":6977,"2016":8209,"2017":9657,"2018":11361,"2019":13366,"2020":15725,"2021":18500,"Make":"Volkswagen","Model":"Caddy"},{"2006":2097,"2007":2466,"2008":2902,"2009":3414,"2010":4016,"2011":4725,"2012":5559,"2013":6540,"2014":7694,"2015":9052,"2016":10649,"2017":12528,"2018":14739,"2019":17340,"2020":20400,"2021":24000,"Make":"Volkswagen","Model":"Passat Универсал"},{"2006":2533,"2007":2980,"2008":3506,"2009":4125,"2010":4853,"2011":5709,"2012":6717,"2013":7902,"2014":9297,"2015":10937,"2016":12867,"2017":15138,"2018":17810,"2019":20953,"2020":24650,"2021":29000,"Make":"Volkswagen","Model":"Passat Alltrack"},{"2006":2097,"2007":2466,"2008":2902,"2009":3414,"2010":4016,"2011":4725,"2012":5559,"2013":6540,"2014":7694,"2015":9052,"2016":10649,"2017":12528,"2018":14739,"2019":17340,"2020":20400,"2021":24000,"Make":"Volkswagen","Model":"Tiguan 1,4"},{"2006":2708,"2007":3186,"2008":3748,"2009":4409,"2010":5188,"2011":6103,"2012":7180,"2013":8447,"2014":9938,"2015":11692,"2016":13755,"2017":16182,"2018":19038,"2019":22398,"2020":26350,"2021":31000,"Make":"Volkswagen","Model":"Tiguan 2,0"},{"2006":4193,"2007":4933,"2008":5803,"2009":6828,"2010":8032,"2011":9450,"2012":11118,"2013":13080,"2014":15388,"2015":18103,"2016":21298,"2017":25056,"2018":29478,"2019":34680,"2020":40800,"2021":48000,"Make":"Volkswagen","Model":"Touareg 2,0"},{"2006":4368,"2007":5138,"2008":6045,"2009":7112,"2010":8367,"2011":9844,"2012":11581,"2013":13625,"2014":16029,"2015":18857,"2016":22185,"2017":26100,"2018":30706,"2019":36125,"2020":42500,"2021":50000,"Make":"Volkswagen","Model":"Touareg 3,0"},{"2006":4542,"2007":5344,"2008":6287,"2009":7397,"2010":8702,"2011":10237,"2012":12044,"2013":14170,"2014":16670,"2015":19612,"2016":23073,"2017":27144,"2018":31935,"2019":37570,"2020":44200,"2021":52000,"Make":"Volkswagen","Model":"Touareg 3,5"},{"2006":3756,"2007":4419,"2008":5199,"2009":6116,"2010":7196,"2011":8466,"2012":9960,"2013":11717,"2014":13785,"2015":16217,"2016":19079,"2017":22446,"2018":26407,"2019":31068,"2020":36550,"2021":43000,"Make":"Volkswagen","Model":"Teramont 2,0"},{"2006":4018,"2007":4727,"2008":5562,"2009":6543,"2010":7698,"2011":9056,"2012":10654,"2013":12535,"2014":14747,"2015":17349,"2016":20410,"2017":24012,"2018":28250,"2019":33235,"2020":39100,"2021":46000,"Make":"Volkswagen","Model":"Teramont 3,6"},{"2006":2708,"2007":3186,"2008":3748,"2009":4409,"2010":5188,"2011":6103,"2012":7180,"2013":8447,"2014":9938,"2015":11692,"2016":13755,"2017":16182,"2018":19038,"2019":22398,"2020":26350,"2021":31000,"Make":"Volkswagen","Model":"Transporter"},{"2006":3145,"2007":3700,"2008":4353,"2009":5121,"2010":6024,"2011":7087,"2012":8338,"2013":9810,"2014":11541,"2015":13577,"2016":15973,"2017":18792,"2018":22109,"2019":26010,"2020":30600,"2021":36000,"Make":"Volkswagen","Model":"Amarok 2,0"},{"2006":4018,"2007":4727,"2008":5562,"2009":6543,"2010":7698,"2011":9056,"2012":10654,"2013":12535,"2014":14747,"2015":17349,"2016":20410,"2017":24012,"2018":28250,"2019":33235,"2020":39100,"2021":46000,"Make":"Volkswagen","Model":"Amarok 3,0"},{"2006":4018,"2007":4727,"2008":5562,"2009":6543,"2010":7698,"2011":9056,"2012":10654,"2013":12535,"2014":14747,"2015":17349,"2016":20410,"2017":24012,"2018":28250,"2019":33235,"2020":39100,"2021":46000,"Make":"Volkswagen","Model":"Multivan"},{"2006":2752,"2007":3237,"2008":3809,"2009":4481,"2010":5271,"2011":6202,"2012":7296,"2013":8583,"2014":10098,"2015":11880,"2016":13977,"2017":16443,"2018":19345,"2019":22759,"2020":26775,"2021":31500,"Make":"Volkswagen","Model":"Caravella"},{"2006":3582,"2007":4214,"2008":4957,"2009":5832,"2010":6861,"2011":8072,"2012":9496,"2013":11172,"2014":13144,"2015":15463,"2016":18192,"2017":21402,"2018":25179,"2019":29623,"2020":34850,"2021":41000,"Make":"Volkswagen","Model":"California"},{"2006":1485,"2007":1747,"2008":2055,"2009":2418,"2010":2845,"2011":3347,"2012":3937,"2013":4632,"2014":5450,"2015":6412,"2016":7543,"2017":8874,"2018":10440,"2019":12283,"2020":14450,"2021":17000,"Make":"Volvo","Model":"C 30"},{"2006":2184,"2007":2569,"2008":3023,"2009":3556,"2010":4184,"2011":4922,"2012":5790,"2013":6812,"2014":8014,"2015":9429,"2016":11093,"2017":13050,"2018":15353,"2019":18063,"2020":21250,"2021":25000,"Make":"Volvo","Model":"V 40 Cross Country 1,5"},{"2006":2446,"2007":2878,"2008":3385,"2009":3983,"2010":4686,"2011":5512,"2012":6485,"2013":7630,"2014":8976,"2015":10560,"2016":12424,"2017":14616,"2018":17196,"2019":20230,"2020":23800,"2021":28000,"Make":"Volvo","Model":"V 40 Cross Country 2,0"},{"2006":3363,"2007":3957,"2008":4655,"2009":5476,"2010":6443,"2011":7580,"2012":8917,"2013":10491,"2014":12342,"2015":14520,"2016":17083,"2017":20097,"2018":23644,"2019":27816,"2020":32725,"2021":38500,"Make":"Volvo","Model":"S 60 Cross Country"},{"2006":2708,"2007":3186,"2008":3748,"2009":4409,"2010":5188,"2011":6103,"2012":7180,"2013":8447,"2014":9938,"2015":11692,"2016":13755,"2017":16182,"2018":19038,"2019":22398,"2020":26350,"2021":31000,"Make":"Volvo","Model":"S 60"},{"2006":3057,"2007":3597,"2008":4232,"2009":4978,"2010":5857,"2011":6891,"2012":8107,"2013":9537,"2014":11220,"2015":13200,"2016":15530,"2017":18270,"2018":21494,"2019":25288,"2020":29750,"2021":35000,"Make":"Volvo","Model":"V 60 Cross Country"},{"2006":2621,"2007":3083,"2008":3627,"2009":4267,"2010":5020,"2011":5906,"2012":6949,"2013":8175,"2014":9617,"2015":11314,"2016":13311,"2017":15660,"2018":18424,"2019":21675,"2020":25500,"2021":30000,"Make":"Volvo","Model":"S 80 2,5"},{"2006":3319,"2007":3905,"2008":4594,"2009":5405,"2010":6359,"2011":7481,"2012":8801,"2013":10355,"2014":12182,"2015":14332,"2016":16861,"2017":19836,"2018":23337,"2019":27455,"2020":32300,"2021":38000,"Make":"Volvo","Model":"S 80 3,0"},{"2006":4193,"2007":4933,"2008":5803,"2009":6828,"2010":8032,"2011":9450,"2012":11118,"2013":13080,"2014":15388,"2015":18103,"2016":21298,"2017":25056,"2018":29478,"2019":34680,"2020":40800,"2021":48000,"Make":"Volvo","Model":"S 90"},{"2006":3145,"2007":3700,"2008":4353,"2009":5121,"2010":6024,"2011":7087,"2012":8338,"2013":9810,"2014":11541,"2015":13577,"2016":15973,"2017":18792,"2018":22109,"2019":26010,"2020":30600,"2021":36000,"Make":"Volvo","Model":"XC 40"},{"2006":4368,"2007":5138,"2008":6045,"2009":7112,"2010":8367,"2011":9844,"2012":11581,"2013":13625,"2014":16029,"2015":18857,"2016":22185,"2017":26100,"2018":30706,"2019":36125,"2020":42500,"2021":50000,"Make":"Volvo","Model":"XC 60"},{"2006":2621,"2007":3083,"2008":3627,"2009":4267,"2010":5020,"2011":5906,"2012":6949,"2013":8175,"2014":9617,"2015":11314,"2016":13311,"2017":15660,"2018":18424,"2019":21675,"2020":25500,"2021":30000,"Make":"Volvo","Model":"XC 70 2,0"},{"2006":2708,"2007":3186,"2008":3748,"2009":4409,"2010":5188,"2011":6103,"2012":7180,"2013":8447,"2014":9938,"2015":11692,"2016":13755,"2017":16182,"2018":19038,"2019":22398,"2020":26350,"2021":31000,"Make":"Volvo","Model":"XC 70 2,4"},{"2006":3494,"2007":4111,"2008":4836,"2009":5690,"2010":6694,"2011":7875,"2012":9265,"2013":10900,"2014":12823,"2015":15086,"2016":17748,"2017":20880,"2018":24565,"2019":28900,"2020":34000,"2021":40000,"Make":"Volvo","Model":"XC 70 3,0"},{"2006":5416,"2007":6372,"2008":7496,"2009":8819,"2010":10375,"2011":12206,"2012":14360,"2013":16894,"2014":19876,"2015":23383,"2016":27510,"2017":32364,"2018":38076,"2019":44795,"2020":52700,"2021":62000,"Make":"Volvo","Model":"XC 90"},{"2006":4455,"2007":5241,"2008":6166,"2009":7254,"2010":8535,"2011":10041,"2012":11812,"2013":13897,"2014":16349,"2015":19235,"2016":22629,"2017":26622,"2018":31320,"2019":36848,"2020":43350,"2021":51000,"Make":"Volvo","Model":"V 90 Cross Country (универсал)"},{"2006":2795,"2007":3289,"2008":3869,"2009":4552,"2010":5355,"2011":6300,"2012":7412,"2013":8720,"2014":10258,"2015":12069,"2016":14199,"2017":16704,"2018":19652,"2019":23120,"2020":27200,"2021":32000,"Make":"Volvo","Model":"V 40"},{"2006":2271,"2007":2672,"2008":3144,"2009":3698,"2010":4351,"2011":5119,"2012":6022,"2013":7085,"2014":8335,"2015":9806,"2016":11536,"2017":13572,"2018":15967,"2019":18785,"2020":22100,"2021":26000,"Make":"Volvo","Model":"V 60 1,6"},{"2006":2621,"2007":3083,"2008":3627,"2009":4267,"2010":5020,"2011":5906,"2012":6949,"2013":8175,"2014":9617,"2015":11314,"2016":13311,"2017":15660,"2018":18424,"2019":21675,"2020":25500,"2021":30000,"Make":"Volvo","Model":"V 60 2,0"},{"2006":3319,"2007":3905,"2008":4594,"2009":5405,"2010":6359,"2011":7481,"2012":8801,"2013":10355,"2014":12182,"2015":14332,"2016":16861,"2017":19836,"2018":23337,"2019":27455,"2020":32300,"2021":38000,"Make":"Volvo","Model":"V 60 3,0"},{"2006":1051,"2007":1223,"2008":1422,"2009":1653,"2010":1922,"2011":2235,"2012":2599,"2013":3022,"2014":3514,"2015":4086,"2016":4751,"2017":5525,"2018":6424,"2019":7470,"2020":8686,"2021":10100,"Make":"Vortex","Model":"Estina"},{"2006":839,"2007":987,"2008":1161,"2009":1366,"2010":1606,"2011":1890,"2012":2224,"2013":2616,"2014":3078,"2015":3621,"2016":4260,"2017":5011,"2018":5896,"2019":6936,"2020":8160,"2021":9600,"Make":"Vortex","Model":"Estina"},{"2006":668,"2007":781,"2008":913,"2009":1068,"2010":1249,"2011":1461,"2012":1709,"2013":1999,"2014":2338,"2015":2735,"2016":3198,"2017":3741,"2018":4375,"2019":5117,"2020":5985,"2021":7000,"Make":"ZAZ","Model":"Vida"},{"2006":1267,"2007":1490,"2008":1753,"2009":2063,"2010":2426,"2011":2855,"2012":3358,"2013":3951,"2014":4648,"2015":5469,"2016":6434,"2017":7569,"2018":8905,"2019":10476,"2020":12325,"2021":14500,"Make":"Zotye","Model":"T600, (Об. 1,5)"},{"2006":1660,"2007":1953,"2008":2297,"2009":2703,"2010":3180,"2011":3741,"2012":4401,"2013":5177,"2014":6091,"2015":7166,"2016":8430,"2017":9918,"2018":11668,"2019":13728,"2020":16150,"2021":19000,"Make":"Zotye","Model":"T600, (Об. 2,0)"},{"2006":1310,"2007":1542,"2008":1814,"2009":2134,"2010":2510,"2011":2953,"2012":3474,"2013":4087,"2014":4809,"2015":5657,"2016":6656,"2017":7830,"2018":9212,"2019":10838,"2020":12750,"2021":15000,"Make":"Zotye","Model":"Coupa"},{"2006":3494,"2007":4111,"2008":4836,"2009":5690,"2010":6694,"2011":7875,"2012":9265,"2013":10900,"2014":12823,"2015":15086,"2016":17748,"2017":20880,"2018":24565,"2019":28900,"2020":34000,"2021":40000,"Make":"Автобус/ микроавтобус","Model":"до 16 сидячих мест Германия"},{"2006":6988,"2007":8222,"2008":9672,"2009":11379,"2010":13387,"2011":15750,"2012":18529,"2013":21799,"2014":25646,"2015":30172,"2016":35496,"2017":41761,"2018":49130,"2019":57800,"2020":68000,"2021":80000,"Make":"Автобус/ микроавтобус","Model":"более 16 сидячих мест Германия"},{"2006":2621,"2007":3083,"2008":3627,"2009":4267,"2010":5020,"2011":5906,"2012":6949,"2013":8175,"2014":9617,"2015":11314,"2016":13311,"2017":15660,"2018":18424,"2019":21675,"2020":25500,"2021":30000,"Make":"Автобус/ микроавтобус","Model":"до 16 сидячих мест Франция"},{"2006":4368,"2007":5138,"2008":6045,"2009":7112,"2010":8367,"2011":9844,"2012":11581,"2013":13625,"2014":16029,"2015":18857,"2016":22185,"2017":26100,"2018":30706,"2019":36125,"2020":42500,"2021":50000,"Make":"Автобус/ микроавтобус","Model":"более 16 сидячих мест Франция"},{"2006":2621,"2007":3083,"2008":3627,"2009":4267,"2010":5020,"2011":5906,"2012":6949,"2013":8175,"2014":9617,"2015":11314,"2016":13311,"2017":15660,"2018":18424,"2019":21675,"2020":25500,"2021":30000,"Make":"Автобус/ микроавтобус","Model":"до 16 сидячих мест Чехия"},{"2006":4368,"2007":5138,"2008":6045,"2009":7112,"2010":8367,"2011":9844,"2012":11581,"2013":13625,"2014":16029,"2015":18857,"2016":22185,"2017":26100,"2018":30706,"2019":36125,"2020":42500,"2021":50000,"Make":"Автобус/ микроавтобус","Model":"более 16 сидячих мест Чехия"},{"2006":2621,"2007":3083,"2008":3627,"2009":4267,"2010":5020,"2011":5906,"2012":6949,"2013":8175,"2014":9617,"2015":11314,"2016":13311,"2017":15660,"2018":18424,"2019":21675,"2020":25500,"2021":30000,"Make":"Автобус/ микроавтобус","Model":"до 16 сидячих мест Италия"},{"2006":4368,"2007":5138,"2008":6045,"2009":7112,"2010":8367,"2011":9844,"2012":11581,"2013":13625,"2014":16029,"2015":18857,"2016":22185,"2017":26100,"2018":30706,"2019":36125,"2020":42500,"2021":50000,"Make":"Автобус/ микроавтобус","Model":"более 16 сидячих мест Италия"},{"2006":5241,"2007":6166,"2008":7254,"2009":8535,"2010":10041,"2011":11812,"2012":13897,"2013":16349,"2014":19235,"2015":22629,"2016":26622,"2017":31320,"2018":36848,"2019":43350,"2020":51000,"2021":60000,"Make":"Автобус/ микроавтобус","Model":"до 16 сидячих мест Бельгия"},{"2006":8735,"2007":10277,"2008":12091,"2009":14224,"2010":16734,"2011":19687,"2012":23162,"2013":27249,"2014":32058,"2015":37715,"2016":44371,"2017":52201,"2018":61413,"2019":72250,"2020":85000,"2021":100000,"Make":"Автобус/ микроавтобус","Model":"более 16 сидячих мест Бельгия"},{"2006":4368,"2007":5138,"2008":6045,"2009":7112,"2010":8367,"2011":9844,"2012":11581,"2013":13625,"2014":16029,"2015":18857,"2016":22185,"2017":26100,"2018":30706,"2019":36125,"2020":42500,"2021":50000,"Make":"Автобус/ микроавтобус","Model":"до 16 сидячих мест Швеция"},{"2006":6115,"2007":7194,"2008":8463,"2009":9957,"2010":11714,"2011":13781,"2012":16213,"2013":19074,"2014":22440,"2015":26400,"2016":31059,"2017":36540,"2018":42989,"2019":50575,"2020":59500,"2021":70000,"Make":"Автобус/ микроавтобус","Model":"более 16 сидячих мест Швеция"},{"2006":4368,"2007":5138,"2008":6045,"2009":7112,"2010":8367,"2011":9844,"2012":11581,"2013":13625,"2014":16029,"2015":18857,"2016":22185,"2017":26100,"2018":30706,"2019":36125,"2020":42500,"2021":50000,"Make":"Автобус/ микроавтобус","Model":"до 16 сидячих мест Великобритания"},{"2006":6115,"2007":7194,"2008":8463,"2009":9957,"2010":11714,"2011":13781,"2012":16213,"2013":19074,"2014":22440,"2015":26400,"2016":31059,"2017":36540,"2018":42989,"2019":50575,"2020":59500,"2021":70000,"Make":"Автобус/ микроавтобус","Model":"более 16 сидячих мест Великобритания"},{"2006":1747,"2007":2055,"2008":2418,"2009":2845,"2010":3347,"2011":3937,"2012":4632,"2013":5450,"2014":6412,"2015":7543,"2016":8874,"2017":10440,"2018":12283,"2019":14450,"2020":17000,"2021":20000,"Make":"Автобус/ микроавтобус","Model":"до 16 сидячих мест СНГ"},{"2006":3494,"2007":4111,"2008":4836,"2009":5690,"2010":6694,"2011":7875,"2012":9265,"2013":10900,"2014":12823,"2015":15086,"2016":17748,"2017":20880,"2018":24565,"2019":28900,"2020":34000,"2021":40000,"Make":"Автобус/ микроавтобус","Model":"более 16 сидячих мест СНГ"},{"2006":2621,"2007":3083,"2008":3627,"2009":4267,"2010":5020,"2011":5906,"2012":6949,"2013":8175,"2014":9617,"2015":11314,"2016":13311,"2017":15660,"2018":18424,"2019":21675,"2020":25500,"2021":30000,"Make":"Автобус/ микроавтобус","Model":"до 16 сидячих мест Корея"},{"2006":4368,"2007":5138,"2008":6045,"2009":7112,"2010":8367,"2011":9844,"2012":11581,"2013":13625,"2014":16029,"2015":18857,"2016":22185,"2017":26100,"2018":30706,"2019":36125,"2020":42500,"2021":50000,"Make":"Автобус/ микроавтобус","Model":"более 16 сидячих мест Корея"},{"2006":2883,"2007":3391,"2008":3990,"2009":4694,"2010":5522,"2011":6497,"2012":7643,"2013":8992,"2014":10579,"2015":12446,"2016":14642,"2017":17226,"2018":20266,"2019":23843,"2020":28050,"2021":33000,"Make":"Автобус/ микроавтобус","Model":"до 16 сидячих мест Япония"},{"2006":5241,"2007":6166,"2008":7254,"2009":8535,"2010":10041,"2011":11812,"2012":13897,"2013":16349,"2014":19235,"2015":22629,"2016":26622,"2017":31320,"2018":36848,"2019":43350,"2020":51000,"2021":60000,"Make":"Автобус/ микроавтобус","Model":"более 16 сидячих мест Япония"},{"2006":3494,"2007":4111,"2008":4836,"2009":5690,"2010":6694,"2011":7875,"2012":9265,"2013":10900,"2014":12823,"2015":15086,"2016":17748,"2017":20880,"2018":24565,"2019":28900,"2020":34000,"2021":40000,"Make":"Автобус/ микроавтобус","Model":"до 16 сидячих мест США"},{"2006":5241,"2007":6166,"2008":7254,"2009":8535,"2010":10041,"2011":11812,"2012":13897,"2013":16349,"2014":19235,"2015":22629,"2016":26622,"2017":31320,"2018":36848,"2019":43350,"2020":51000,"2021":60000,"Make":"Автобус/ микроавтобус","Model":"более 16 сидячих мест США"},{"2006":1747,"2007":2055,"2008":2418,"2009":2845,"2010":3347,"2011":3937,"2012":4632,"2013":5450,"2014":6412,"2015":7543,"2016":8874,"2017":10440,"2018":12283,"2019":14450,"2020":17000,"2021":20000,"Make":"Автобус/ микроавтобус","Model":"до 16 сидячих мест Китай"},{"2006":3494,"2007":4111,"2008":4836,"2009":5690,"2010":6694,"2011":7875,"2012":9265,"2013":10900,"2014":12823,"2015":15086,"2016":17748,"2017":20880,"2018":24565,"2019":28900,"2020":34000,"2021":40000,"Make":"Автобус/ микроавтобус","Model":"более 16 сидячих мест Китай"},{"2006":2184,"2007":2569,"2008":3023,"2009":3556,"2010":4184,"2011":4922,"2012":5790,"2013":6812,"2014":8014,"2015":9429,"2016":11093,"2017":13050,"2018":15353,"2019":18063,"2020":21250,"2021":25000,"Make":"Автобус/ микроавтобус","Model":"до 16 сидячих мест Узбекистан"},{"2006":3057,"2007":3597,"2008":4232,"2009":4978,"2010":5857,"2011":6891,"2012":8107,"2013":9537,"2014":11220,"2015":13200,"2016":15530,"2017":18270,"2018":21494,"2019":25288,"2020":29750,"2021":35000,"Make":"Автобус/ микроавтобус","Model":"более 16 сидячих мест Узбекистан"},{"2006":786,"2007":925,"2008":1088,"2009":1280,"2010":1506,"2011":1772,"2012":2085,"2013":2452,"2014":2885,"2015":3394,"2016":3993,"2017":4698,"2018":5527,"2019":6503,"2020":7650,"2021":9000,"Make":"ВАЗ","Model":"2131 Нива"},{"2006":751,"2007":884,"2008":1040,"2009":1223,"2010":1439,"2011":1693,"2012":1992,"2013":2343,"2014":2757,"2015":3243,"2016":3816,"2017":4489,"2018":5281,"2019":6214,"2020":7310,"2021":8600,"Make":"ВАЗ","Model":"2121 Нива"},{"2006":1228,"2007":1428,"2008":1661,"2009":1931,"2010":2246,"2011":2611,"2012":3036,"2013":3531,"2014":4106,"2015":4774,"2016":5551,"2017":6455,"2018":7505,"2019":8727,"2020":10148,"2021":11800,"Make":"ГАЗ","Model":31},{"2006":961,"2007":1130,"2008":1330,"2009":1565,"2010":1841,"2011":2166,"2012":2548,"2013":2997,"2014":3526,"2015":4149,"2016":4881,"2017":5742,"2018":6755,"2019":7948,"2020":9350,"2021":11000,"Make":"УАЗ","Model":"Буханка Юбилейная (СГР)"},{"2006":1048,"2007":1233,"2008":1451,"2009":1707,"2010":2008,"2011":2362,"2012":2779,"2013":3270,"2014":3847,"2015":4526,"2016":5324,"2017":6264,"2018":7370,"2019":8670,"2020":10200,"2021":12000,"Make":"УАЗ","Model":"Хантер"},{"2006":1092,"2007":1285,"2008":1511,"2009":1778,"2010":2092,"2011":2461,"2012":2895,"2013":3406,"2014":4007,"2015":4714,"2016":5546,"2017":6525,"2018":7677,"2019":9031,"2020":10625,"2021":12500,"Make":"УАЗ","Model":"Патриот"},{"2006":1136,"2007":1336,"2008":1572,"2009":1849,"2010":2175,"2011":2559,"2012":3011,"2013":3542,"2014":4168,"2015":4903,"2016":5768,"2017":6786,"2018":7984,"2019":9393,"2020":11050,"2021":13000,"Make":"УАЗ","Model":"Пикап"}],countries:['Армения','Белоруссия','Казахстан','Кыргызстан','Молдавия','Россия','Узбекистан','Украина','Другие страны'],// countries: [
//   'Австралия',
//   'Австрия',
//   'Азербайджан',
//   'Албания',
//   'Алжир',
//   'Ангилья',
//   'Ангола',
//   'Андорра',
//   'Антигуа и Барбуда',
//   'Аргентина',
//   'Армения',
//   'Аруба',
//   'Афганистан',
//   'Багамские Острова',
//   'Бангладеш',
//   'Барбадос',
//   'Бахрейн',
//   'Белиз',
//   'Белоруссия',
//   'Бельгия',
//   'Бенин',
//   'Бермуды',
//   'Бирма (Мьянма)',
//   'Болгария',
//   'Боливия',
//   'Босния и Герцеговина',
//   'Ботсвана',
//   'Бразилия',
//   'Бруней',
//   'Буркина-Фасо',
//   'Бурунди',
//   'Бутан',
//   'Вануату',
//   'Великобритания',
//   'Венгрия',
//   'Венесуэла',
//   'Виргинские острова Америка',
//   'Виргинские острова',
//   'Восточный Тимор',
//   'Вьетнам',
//   'Габон',
//   'Гаити',
//   'Гайана',
//   'Гамбия',
//   'Гана',
//   'Гваделупа',
//   'Гватемала',
//   'Гвинея-Бисау',
//   'Гвинея',
//   'Германия',
//   'Гибралтар',
//   'Гондурас',
//   'Гренада',
//   'Гренландия',
//   'Греция',
//   'Грузия',
//   'Гуам',
//   'Дания',
//   'Демократическая Республика Конго',
//   'Джибути',
//   'Джонстон (атолл)',
//   'Доминика',
//   'Доминиканская Республика',
//   'Египет ',
//   'Замбия',
//   'Зимбабве',
//   'Израиль',
//   'Индия',
//   'Индонезия',
//   'Иордания',
//   'Ирак',
//   'Иран',
//   'Ирландия',
//   'Исландия',
//   'Испания',
//   'Италия',
//   'Йемен',
//   'Кабо-Верде',
//   'Казахстан',
//   'Каймановы острова',
//   'Камбоджа',
//   'Камерун',
//   'Канада',
//   'Канарские острова',
//   'Катар',
//   'Кения',
//   'Кипр',
//   'Кирибати',
//   'Китай',
//   'Колумбия',
//   'Коморы',
//   'Конго',
//   'Корейская Народно-Демократическая Республика',
//   'Косово',
//   'Коста-Рика',
//   'Кот-д’Ивуар',
//   'Куба',
//   'Кувейт',
//   'Кыргызстан',
//   'Лаос',
//   'Латвия',
//   'Лесото',
//   'Либерия',
//   'Ливан',
//   'Ливия',
//   'Литва',
//   'Лихтенштейн',
//   'Люксембург',
//   'Маврикий',
//   'Мавритания',
//   'Мадагаскар',
//   'Майотта',
//   'Макао',
//   'Малави',
//   'Малайзия',
//   'Мали',
//   'Мальдивы',
//   'Мальта',
//   'Марокко',
//   'Мартиника',
//   'Маршалловы Острова',
//   'Мексика',
//   'Мидуэй',
//   'Мозамбик',
//   'Молдавия',
//   'Монако',
//   'Монголия',
//   'Монтсеррат',
//   'Намибия',
//   'Науру',
//   'Непал',
//   'Нигер',
//   'Нигерия',
//   'Нидерландские Антильские острова',
//   'Нидерланды',
//   'Никарагуа',
//   'Ниуэ',
//   'Новая Зеландия',
//   'Новая Каледония',
//   'Норвегия',
//   'Объединённые Арабские Эмираты',
//   'Оман',
//   'Остров Рождества',
//   'Остров Святой Елены',
//   'Пакистан',
//   'Палау',
//   'Палестина',
//   'Пальмира',
//   'Панама',
//   'Папуа — Новая Гвинея',
//   'Парагвай',
//   'Перу',
//   'Польша',
//   'Португалия',
//   'Пуэрто-Рико',
//   'Республика Корея',
//   'Республика Македония',
//   'Реюньон',
//   'Россия',
//   'Руанда',
//   'Румыния',
//   'Сальвадор',
//   'Самоа',
//   'Самоа',
//   'Сан-Марино',
//   'Сан-Томе и Принсипи',
//   'Саудовская Аравия',
//   'Свазиленд',
//   'Северная Ирландия',
//   'Северные Марианские острова',
//   'Сейшельские Острова',
//   'Сен-Мартен',
//   'Сен-Пьер и Микелон',
//   'Сенегал',
//   'Сент-Винсент и Гренадины',
//   'Сент-Китс и Невис',
//   'Сент-Люсия',
//   'Сербия',
//   'Сингапур',
//   'Сирия',
//   'Словакия',
//   'Словения',
//   'Соломоновы Острова',
//   'Сомали',
//   'Судан',
//   'Суринам',
//   'США',
//   'Сьерра-Леоне',
//   'Таджикистан',
//   'Таиланд',
//   'Тайвань',
//   'Танзания',
//   'Теркс и Кайкос',
//   'Того',
//   'Тонга',
//   'Тринидад и Тобаго',
//   'Тувалу',
//   'Тунис',
//   'Турецкая Республика Северного Кипра',
//   'Туркмения',
//   'Турция',
//   'Уганда',
//   'Узбекистан',
//   'Украина',
//   'Уоллис и Футуна',
//   'Уругвай',
//   'Уэйк',
//   'Уэльс',
//   'Федеративные Штаты Микронезии',
//   'Фиджи',
//   'Филиппины',
//   'Финляндия',
//   'Фолклендские острова',
//   'Франция',
//   'Французская Гвиана',
//   'Французская Полинезия',
//   'Французские Южные и Антарктические Территории',
//   'Хорватия',
//   'Центральноафриканская Республика',
//   'Чад',
//   'Черногория',
//   'Чехия',
//   'Чили',
//   'Швейцария',
//   'Швеция',
//   'Шпицберген и Ян-Майен',
//   'Шри-Ланка',
//   'Эквадор',
//   'Экваториальная Гвинея',
//   'Эритрея',
//   'Эстония',
//   'Эфиопия',
//   'Южная Георгия и Южные Сандвичевы острова',
//   'Южно-Африканская Республика',
//   'Ямайка',
//   'Япония',
// ],
// sngCountries: [
//   'Азербайджан',
//   'Армения',
//   'Белоруссия',
//   'Казахстан',
//   'Кыргызстан',
//   'Молдавия',
//   'Российская Федерация',
//   'Таджикистан',
//   'Туркмения',
//   'Узбекистан',
//   'Украина',
// ],
selectedCountry:null,uniqueMakes:[],models:[],selectedMake:null,selectedModel:null,years:[2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022],year:'',price:null,declarePrice:null,engineCapacity:null,poshlina:null,poshlinaRate:10,akciz:null,akcizPrice:null,akcizPriceRate:10,akcizEngine:null,akcizEngineRate:0.15,euroRate:13.6,dollarRate:11.30,rateType:'(курс по умолчанию)',exchangeRateLoading:false,exchangeRateLoadTime:0,nds:null,ndsRate:18,total:null,procedurePrice:[{min:0,max:5000,cost:10},{min:5001,max:10000,cost:20},{min:10001,max:50000,cost:70},{min:50001,max:100000,cost:150},{min:100001,max:Infinity,cost:450}],procedure:'',about:false,agents:false,makeFault:false,calcFont:false,calcMarginTop:false,calcMarginRight:false,calcMarginBottom:false,calcMarginLeft:false,resultMarginTop:false,resultMarginRight:false,resultMarginBottom:false,resultMarginLeft:false,resultFont:false,window:{width:0,height:0}};},created:function created(){for(var i in this.tables){//get uniqueMakes
for(var j in this.tables){if(this.tables[i].Make===this.tables[j].Make&&!this.uniqueMakes.includes(this.tables[j].Make)){this.uniqueMakes.push(this.tables[j].Make);}}}window.addEventListener('resize',this.handleResize);this.handleResize();this.refreshExchangeRate();},mounted:function mounted(){},destroyed:function destroyed(){window.removeEventListener('resize',this.handleResize);},methods:{handleResize:function handleResize(){this.window.width=window.innerWidth;this.window.height=window.innerHeight;if(this.window.height>this.window.width){//portrait
this.calcFont=this.window.width/100*5+'px';this.resultFont=this.window.width/100*2.8+'px';this.calcMarginX=this.window.width/100*1+'px';this.calcMarginY=this.window.width/100*2+'px';this.resultMarginX=this.window.width/100*5+'px';this.resultMarginY=this.window.width/100*2+'px';this.calcMarginTop=this.calcMarginY;this.calcMarginBottom=this.calcMarginY;this.calcMarginRight=this.calcMarginX;this.calcMarginLeft=this.calcMarginX;this.resultMarginTop=this.resultMarginY;this.resultMarginBottom=this.resultMarginY;this.resultMarginRight=this.resultMarginX;this.resultMarginLeft=this.resultMarginX;}else{//landscape
this.calcFont=this.window.height/100*5+'px';this.resultFont=this.window.height/100*2.7+'px';this.calcMarginX=this.window.height/100*10+'px';this.calcMarginY=this.window.height/100*2+'px';this.resultMarginX=this.window.height/100*13+'px';this.resultMarginY=this.window.height/100*2+'px';this.calcMarginTop=this.calcMarginY;this.calcMarginBottom=this.calcMarginY;this.calcMarginRight=this.calcMarginX;this.calcMarginLeft=this.calcMarginX;this.resultMarginTop=this.resultMarginY;this.resultMarginBottom=this.resultMarginY;this.resultMarginRight=this.resultMarginX;this.resultMarginLeft=this.resultMarginX;}},refreshExchangeRate:function refreshExchangeRate(){var _this=this;this.exchangeRateLoadTime++;this.exchangeRateLoading=true;axios.get('https://cors-anywhere-server-proxy.herokuapp.com/https://nbt.tj/ru/kurs/rss.php').then(function(response){var self=_this;_this.exchangeRateLoading=false;$(response.data).find('item').each(function(){if($(this).find("title").text().includes('CURRENCY CODE: 840')){self.dollarRate=$(this).find("title").text().slice(-7)*1;self.calculate();}if($(this).find("title").text().includes('CURRENCY CODE: 978')){self.euroRate=$(this).find("title").text().slice(-7)*1;self.calculate();};self.rateType='(курс НБТ)';});})["catch"](function(error){_this.exchangeRateLoading=false;console.error(error);if(_this.exchangeRateLoadTime>1){alert('Не удалось загрузить курс Национального Банка Таджикистана. Проверьте соединение к интернету.');}});},calculatorField:function calculatorField(){this.price=false;this.about=false;this.makeFault=false;this.agents=false;},aboutField:function aboutField(){this.about=true;this.price=false;this.agents=false;ym(71383423,'reachGoal','aboutProject');},agentsField:function agentsField(){this.about=false;this.price=false;this.agents=true;},makeSelect:function makeSelect(){this.selectedModel=null;this.models=[];for(var i in this.tables){if(this.tables[i].Make===this.selectedMake){this.models.push(this.tables[i].Model);}}this.models=this.models.sort();},showMakeFault:function showMakeFault(){if(!this.selectedMake){this.makeFault=true;}},calculate:function calculate(){this.makeFault=false;if(this.selectedMake&&this.selectedModel&&this.year&&this.engineCapacity>0&&this.selectedCountry){for(var i in this.tables){if(this.tables[i].Model==this.selectedModel){for(var j in this.tables[i]){if(j===this.year){this.price=this.tables[i][j];}}}}if(!this.price){alert('Минимальная цена на выбранный модель и год выпуска не установлена. Попробуйте поменять модель и/или год выпуска. Или обратитесь в таможенную службу для определения минимальной цены, и расчета растаможки.');}// for (var i in this.sngCountries) { //check for CIS country
//   if(this.sngCountries[i] === this.selectedCountry) {
//     this.poshlina = 0;
//     break;
//   }
//   else {
//     this.poshlina = this.price * this.poshlinaRate/100 * 1;
//   }
// }
if(this.selectedCountry==='Другие страны'){this.poshlina=(this.price*this.dollarRate*this.poshlinaRate/100).toFixed(0)*1;}else{this.poshlina=0;}this.akcizPrice=((this.price*this.dollarRate+this.poshlina)*this.akcizPriceRate/100).toFixed(0)*1;this.akcizEngine=(this.engineCapacity*1000*this.akcizEngineRate*this.euroRate).toFixed(0)*1;if(this.akcizPrice>this.akcizEngine){//akciz switch
this.akciz=this.akcizPrice;}else{this.akciz=this.akcizEngine;}this.nds=((this.price*this.dollarRate+(this.poshlina+this.akciz))*this.ndsRate/100).toFixed(0)*1;//nds
for(var _i=0;_i<this.procedurePrice.length;_i++){//get procedure
if(this.price>=this.procedurePrice[_i].min&&this.price<=this.procedurePrice[_i].max){this.procedure=(this.procedurePrice[_i].cost*this.dollarRate).toFixed(0)*1;}}this.total=this.poshlina+this.akciz+this.nds+this.procedure;//total
}}}});

/***/ }),

/***/ "./node_modules/jquery/dist/jquery.js":
/*!********************************************!*\
  !*** ./node_modules/jquery/dist/jquery.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery JavaScript Library v3.5.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2020-05-04T22:49Z
 */
( function( global, factory ) {

	"use strict";

	if (  true && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var flat = arr.flat ? function( array ) {
	return arr.flat.call( array );
} : function( array ) {
	return arr.concat.apply( [], array );
};


var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

      // Support: Chrome <=57, Firefox <=52
      // In some browsers, typeof returns "function" for HTML <object> elements
      // (i.e., `typeof document.createElement( "object" ) === "function"`).
      // We don't want to classify *any* DOM node as a function.
      return typeof obj === "function" && typeof obj.nodeType !== "number";
  };


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};


var document = window.document;



	var preservedScriptAttributes = {
		type: true,
		src: true,
		nonce: true,
		noModule: true
	};

	function DOMEval( code, node, doc ) {
		doc = doc || document;

		var i, val,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {

				// Support: Firefox 64+, Edge 18+
				// Some browsers don't support the "nonce" property on scripts.
				// On the other hand, just using `getAttribute` is not enough as
				// the `nonce` attribute is reset to an empty string whenever it
				// becomes browsing-context connected.
				// See https://github.com/whatwg/html/issues/2369
				// See https://html.spec.whatwg.org/#nonce-attributes
				// The `node.getAttribute` check was added for the sake of
				// `jQuery.globalEval` so that it can fake a nonce-containing node
				// via an object.
				val = node[ i ] || node.getAttribute && node.getAttribute( i );
				if ( val ) {
					script.setAttribute( i, val );
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.5.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	even: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return ( i + 1 ) % 2;
		} ) );
	},

	odd: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return i % 2;
		} ) );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				copy = options[ name ];

				// Prevent Object.prototype pollution
				// Prevent never-ending loop
				if ( name === "__proto__" || target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {
					src = target[ name ];

					// Ensure proper type for the source value
					if ( copyIsArray && !Array.isArray( src ) ) {
						clone = [];
					} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
						clone = {};
					} else {
						clone = src;
					}
					copyIsArray = false;

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a provided context; falls back to the global one
	// if not specified.
	globalEval: function( code, options, doc ) {
		DOMEval( code, { nonce: options && options.nonce }, doc );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return flat( ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( _i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.5
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://js.foundation/
 *
 * Date: 2020-03-14
 */
( function( window ) {
var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	nonnativeSelectorCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ( {} ).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	pushNative = arr.push,
	push = arr.push,
	slice = arr.slice,

	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[ i ] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|" +
		"ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
	identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace +
		"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +

		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +

		// "Attribute values must be CSS identifiers [capture 5]
		// or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" +
		whitespace + "*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +

		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +

		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +

		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" +
		whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace +
		"*" ),
	rdescend = new RegExp( whitespace + "|>" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
			whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" +
			whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),

		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace +
			"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
			"*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rhtml = /HTML$/i,
	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])", "g" ),
	funescape = function( escape, nonHex ) {
		var high = "0x" + escape.slice( 1 ) - 0x10000;

		return nonHex ?

			// Strip the backslash prefix from a non-hex escape sequence
			nonHex :

			// Replace a hexadecimal escape sequence with the encoded Unicode code point
			// Support: IE <=11+
			// For values outside the Basic Multilingual Plane (BMP), manually construct a
			// surrogate pair
			high < 0 ?
				String.fromCharCode( high + 0x10000 ) :
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" +
				ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	inDisabledFieldset = addCombinator(
		function( elem ) {
			return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		( arr = slice.call( preferredDoc.childNodes ) ),
		preferredDoc.childNodes
	);

	// Support: Android<4.0
	// Detect silently failing push.apply
	// eslint-disable-next-line no-unused-expressions
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			pushNative.apply( target, slice.call( els ) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;

			// Can't trust NodeList.length
			while ( ( target[ j++ ] = els[ i++ ] ) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {
		setDocument( context );
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && ( match = rquickExpr.exec( selector ) ) ) {

				// ID selector
				if ( ( m = match[ 1 ] ) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( ( elem = context.getElementById( m ) ) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && ( elem = newContext.getElementById( m ) ) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[ 2 ] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( ( m = match[ 3 ] ) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!nonnativeSelectorCache[ selector + " " ] &&
				( !rbuggyQSA || !rbuggyQSA.test( selector ) ) &&

				// Support: IE 8 only
				// Exclude object elements
				( nodeType !== 1 || context.nodeName.toLowerCase() !== "object" ) ) {

				newSelector = selector;
				newContext = context;

				// qSA considers elements outside a scoping root when evaluating child or
				// descendant combinators, which is not what we want.
				// In such cases, we work around the behavior by prefixing every selector in the
				// list with an ID selector referencing the scope context.
				// The technique has to be used as well when a leading combinator is used
				// as such selectors are not recognized by querySelectorAll.
				// Thanks to Andrew Dupont for this technique.
				if ( nodeType === 1 &&
					( rdescend.test( selector ) || rcombinators.test( selector ) ) ) {

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;

					// We can use :scope instead of the ID hack if the browser
					// supports it & if we're not changing the context.
					if ( newContext !== context || !support.scope ) {

						// Capture the context ID, setting it first if necessary
						if ( ( nid = context.getAttribute( "id" ) ) ) {
							nid = nid.replace( rcssescape, fcssescape );
						} else {
							context.setAttribute( "id", ( nid = expando ) );
						}
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[ i ] = ( nid ? "#" + nid : ":scope" ) + " " +
							toSelector( groups[ i ] );
					}
					newSelector = groups.join( "," );
				}

				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch ( qsaError ) {
					nonnativeSelectorCache( selector, true );
				} finally {
					if ( nid === expando ) {
						context.removeAttribute( "id" );
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {

		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {

			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return ( cache[ key + " " ] = value );
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement( "fieldset" );

	try {
		return !!fn( el );
	} catch ( e ) {
		return false;
	} finally {

		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}

		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split( "|" ),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[ i ] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( ( cur = cur.nextSibling ) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return ( name === "input" || name === "button" ) && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
					inDisabledFieldset( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction( function( argument ) {
		argument = +argument;
		return markFunction( function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ ( j = matchIndexes[ i ] ) ] ) {
					seed[ j ] = !( matches[ j ] = seed[ j ] );
				}
			}
		} );
	} );
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	var namespace = elem.namespaceURI,
		docElem = ( elem.ownerDocument || elem ).documentElement;

	// Support: IE <=8
	// Assume HTML when documentElement doesn't yet exist, such as inside loading iframes
	// https://bugs.jquery.com/ticket/4833
	return !rhtml.test( namespace || docElem && docElem.nodeName || "HTML" );
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( doc == document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9 - 11+, Edge 12 - 18+
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( preferredDoc != document &&
		( subWindow = document.defaultView ) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	// Support: IE 8 - 11+, Edge 12 - 18+, Chrome <=16 - 25 only, Firefox <=3.6 - 31 only,
	// Safari 4 - 5 only, Opera <=11.6 - 12.x only
	// IE/Edge & older browsers don't support the :scope pseudo-class.
	// Support: Safari 6.0 only
	// Safari 6.0 supports :scope but it's an alias of :root there.
	support.scope = assert( function( el ) {
		docElem.appendChild( el ).appendChild( document.createElement( "div" ) );
		return typeof el.querySelectorAll !== "undefined" &&
			!el.querySelectorAll( ":scope fieldset div" ).length;
	} );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert( function( el ) {
		el.className = "i";
		return !el.getAttribute( "className" );
	} );

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert( function( el ) {
		el.appendChild( document.createComment( "" ) );
		return !el.getElementsByTagName( "*" ).length;
	} );

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert( function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	} );

	// ID filter and find
	if ( support.getById ) {
		Expr.filter[ "ID" ] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute( "id" ) === attrId;
			};
		};
		Expr.find[ "ID" ] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter[ "ID" ] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode( "id" );
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find[ "ID" ] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode( "id" );
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( ( elem = elems[ i++ ] ) ) {
						node = elem.getAttributeNode( "id" );
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find[ "TAG" ] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,

				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( ( elem = results[ i++ ] ) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find[ "CLASS" ] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( ( support.qsa = rnative.test( document.querySelectorAll ) ) ) {

		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert( function( el ) {

			var input;

			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll( "[msallowcapture^='']" ).length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll( "[selected]" ).length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push( "~=" );
			}

			// Support: IE 11+, Edge 15 - 18+
			// IE 11/Edge don't find elements on a `[name='']` query in some cases.
			// Adding a temporary attribute to the document before the selection works
			// around the issue.
			// Interestingly, IE 10 & older don't seem to have the issue.
			input = document.createElement( "input" );
			input.setAttribute( "name", "" );
			el.appendChild( input );
			if ( !el.querySelectorAll( "[name='']" ).length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*name" + whitespace + "*=" +
					whitespace + "*(?:''|\"\")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll( ":checked" ).length ) {
				rbuggyQSA.push( ":checked" );
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push( ".#.+[+~]" );
			}

			// Support: Firefox <=3.6 - 5 only
			// Old Firefox doesn't throw on a badly-escaped identifier.
			el.querySelectorAll( "\\\f" );
			rbuggyQSA.push( "[\\r\\n\\f]" );
		} );

		assert( function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement( "input" );
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll( "[name=d]" ).length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll( ":enabled" ).length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll( ":disabled" ).length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: Opera 10 - 11 only
			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll( "*,:x" );
			rbuggyQSA.push( ",.*:" );
		} );
	}

	if ( ( support.matchesSelector = rnative.test( ( matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector ) ) ) ) {

		assert( function( el ) {

			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		} );
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join( "|" ) );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join( "|" ) );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			) );
		} :
		function( a, b ) {
			if ( b ) {
				while ( ( b = b.parentNode ) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		// Support: IE 11+, Edge 17 - 18+
		// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
		// two documents; shallow comparisons work.
		// eslint-disable-next-line eqeqeq
		compare = ( a.ownerDocument || a ) == ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			( !support.sortDetached && b.compareDocumentPosition( a ) === compare ) ) {

			// Choose the first element that is related to our preferred document
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( a == document || a.ownerDocument == preferredDoc &&
				contains( preferredDoc, a ) ) {
				return -1;
			}

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( b == document || b.ownerDocument == preferredDoc &&
				contains( preferredDoc, b ) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {

		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			/* eslint-disable eqeqeq */
			return a == document ? -1 :
				b == document ? 1 :
				/* eslint-enable eqeqeq */
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( ( cur = cur.parentNode ) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( ( cur = cur.parentNode ) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[ i ] === bp[ i ] ) {
			i++;
		}

		return i ?

			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[ i ], bp[ i ] ) :

			// Otherwise nodes in our document sort first
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			/* eslint-disable eqeqeq */
			ap[ i ] == preferredDoc ? -1 :
			bp[ i ] == preferredDoc ? 1 :
			/* eslint-enable eqeqeq */
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	setDocument( elem );

	if ( support.matchesSelector && documentIsHTML &&
		!nonnativeSelectorCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||

				// As well, disconnected nodes are said to be in a document
				// fragment in IE 9
				elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch ( e ) {
			nonnativeSelectorCache( expr, true );
		}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( context.ownerDocument || context ) != document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( elem.ownerDocument || elem ) != document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],

		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			( val = elem.getAttributeNode( name ) ) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return ( sel + "" ).replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( ( elem = results[ i++ ] ) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {

		// If no nodeType, this is expected to be an array
		while ( ( node = elem[ i++ ] ) ) {

			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {

		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {

			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}

	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[ 1 ] = match[ 1 ].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[ 3 ] = ( match[ 3 ] || match[ 4 ] ||
				match[ 5 ] || "" ).replace( runescape, funescape );

			if ( match[ 2 ] === "~=" ) {
				match[ 3 ] = " " + match[ 3 ] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {

			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[ 1 ] = match[ 1 ].toLowerCase();

			if ( match[ 1 ].slice( 0, 3 ) === "nth" ) {

				// nth-* requires argument
				if ( !match[ 3 ] ) {
					Sizzle.error( match[ 0 ] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[ 4 ] = +( match[ 4 ] ?
					match[ 5 ] + ( match[ 6 ] || 1 ) :
					2 * ( match[ 3 ] === "even" || match[ 3 ] === "odd" ) );
				match[ 5 ] = +( ( match[ 7 ] + match[ 8 ] ) || match[ 3 ] === "odd" );

				// other types prohibit arguments
			} else if ( match[ 3 ] ) {
				Sizzle.error( match[ 0 ] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[ 6 ] && match[ 2 ];

			if ( matchExpr[ "CHILD" ].test( match[ 0 ] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[ 3 ] ) {
				match[ 2 ] = match[ 4 ] || match[ 5 ] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&

				// Get excess from tokenize (recursively)
				( excess = tokenize( unquoted, true ) ) &&

				// advance to the next closing parenthesis
				( excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length ) ) {

				// excess is a negative index
				match[ 0 ] = match[ 0 ].slice( 0, excess );
				match[ 2 ] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() {
					return true;
				} :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				( pattern = new RegExp( "(^|" + whitespace +
					")" + className + "(" + whitespace + "|$)" ) ) && classCache(
						className, function( elem ) {
							return pattern.test(
								typeof elem.className === "string" && elem.className ||
								typeof elem.getAttribute !== "undefined" &&
									elem.getAttribute( "class" ) ||
								""
							);
				} );
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				/* eslint-disable max-len */

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
				/* eslint-enable max-len */

			};
		},

		"CHILD": function( type, what, _argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, _context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( ( node = node[ dir ] ) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}

								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || ( node[ expando ] = {} );

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								( outerCache[ node.uniqueID ] = {} );

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( ( node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								( diff = nodeIndex = 0 ) || start.pop() ) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {

							// Use previously-cached element index if available
							if ( useCache ) {

								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || ( node[ expando ] = {} );

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									( outerCache[ node.uniqueID ] = {} );

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {

								// Use the same loop as above to seek `elem` from the start
								while ( ( node = ++nodeIndex && node && node[ dir ] ||
									( diff = nodeIndex = 0 ) || start.pop() ) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] ||
												( node[ expando ] = {} );

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												( outerCache[ node.uniqueID ] = {} );

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {

			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction( function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[ i ] );
							seed[ idx ] = !( matches[ idx ] = matched[ i ] );
						}
					} ) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {

		// Potentially complex pseudos
		"not": markFunction( function( selector ) {

			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction( function( seed, matches, _context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( ( elem = unmatched[ i ] ) ) {
							seed[ i ] = !( matches[ i ] = elem );
						}
					}
				} ) :
				function( elem, _context, xml ) {
					input[ 0 ] = elem;
					matcher( input, null, xml, results );

					// Don't keep the element (issue #299)
					input[ 0 ] = null;
					return !results.pop();
				};
		} ),

		"has": markFunction( function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		} ),

		"contains": markFunction( function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || getText( elem ) ).indexOf( text ) > -1;
			};
		} ),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {

			// lang value must be a valid identifier
			if ( !ridentifier.test( lang || "" ) ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( ( elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute( "xml:lang" ) || elem.getAttribute( "lang" ) ) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( ( elem = elem.parentNode ) && elem.nodeType === 1 );
				return false;
			};
		} ),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement &&
				( !document.hasFocus || document.hasFocus() ) &&
				!!( elem.type || elem.href || ~elem.tabIndex );
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {

			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return ( nodeName === "input" && !!elem.checked ) ||
				( nodeName === "option" && !!elem.selected );
		},

		"selected": function( elem ) {

			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				// eslint-disable-next-line no-unused-expressions
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {

			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos[ "empty" ]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( ( attr = elem.getAttribute( "type" ) ) == null ||
					attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo( function() {
			return [ 0 ];
		} ),

		"last": createPositionalPseudo( function( _matchIndexes, length ) {
			return [ length - 1 ];
		} ),

		"eq": createPositionalPseudo( function( _matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		} ),

		"even": createPositionalPseudo( function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"odd": createPositionalPseudo( function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"lt": createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i = argument < 0 ?
				argument + length :
				argument > length ?
					length :
					argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"gt": createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} )
	}
};

Expr.pseudos[ "nth" ] = Expr.pseudos[ "eq" ];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || ( match = rcomma.exec( soFar ) ) ) {
			if ( match ) {

				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[ 0 ].length ) || soFar;
			}
			groups.push( ( tokens = [] ) );
		}

		matched = false;

		// Combinators
		if ( ( match = rcombinators.exec( soFar ) ) ) {
			matched = match.shift();
			tokens.push( {
				value: matched,

				// Cast descendant combinators to space
				type: match[ 0 ].replace( rtrim, " " )
			} );
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( ( match = matchExpr[ type ].exec( soFar ) ) && ( !preFilters[ type ] ||
				( match = preFilters[ type ]( match ) ) ) ) {
				matched = match.shift();
				tokens.push( {
					value: matched,
					type: type,
					matches: match
				} );
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :

			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[ i ].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?

		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( ( elem = elem[ dir ] ) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || ( elem[ expando ] = {} );

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] ||
							( outerCache[ elem.uniqueID ] = {} );

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( ( oldCache = uniqueCache[ key ] ) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return ( newCache[ 2 ] = oldCache[ 2 ] );
						} else {

							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( ( newCache[ 2 ] = matcher( elem, context, xml ) ) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[ i ]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[ 0 ];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[ i ], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( ( elem = unmatched[ i ] ) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction( function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts(
				selector || "*",
				context.nodeType ? [ context ] : context,
				[]
			),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?

				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( ( elem = temp[ i ] ) ) {
					matcherOut[ postMap[ i ] ] = !( matcherIn[ postMap[ i ] ] = elem );
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {

					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( ( elem = matcherOut[ i ] ) ) {

							// Restore matcherIn since elem is not yet a final match
							temp.push( ( matcherIn[ i ] = elem ) );
						}
					}
					postFinder( null, ( matcherOut = [] ), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( ( elem = matcherOut[ i ] ) &&
						( temp = postFinder ? indexOf( seed, elem ) : preMap[ i ] ) > -1 ) {

						seed[ temp ] = !( results[ temp ] = elem );
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	} );
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[ 0 ].type ],
		implicitRelative = leadingRelative || Expr.relative[ " " ],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				( checkContext = context ).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );

			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( ( matcher = Expr.relative[ tokens[ i ].type ] ) ) {
			matchers = [ addCombinator( elementMatcher( matchers ), matcher ) ];
		} else {
			matcher = Expr.filter[ tokens[ i ].type ].apply( null, tokens[ i ].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {

				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[ j ].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(

					// If the preceding token was a descendant combinator, insert an implicit any-element `*`
					tokens
						.slice( 0, i - 1 )
						.concat( { value: tokens[ i - 2 ].type === " " ? "*" : "" } )
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( ( tokens = tokens.slice( j ) ) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,

				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find[ "TAG" ]( "*", outermost ),

				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = ( dirruns += contextBackup == null ? 1 : Math.random() || 0.1 ),
				len = elems.length;

			if ( outermost ) {

				// Support: IE 11+, Edge 17 - 18+
				// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
				// two documents; shallow comparisons work.
				// eslint-disable-next-line eqeqeq
				outermostContext = context == document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && ( elem = elems[ i ] ) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;

					// Support: IE 11+, Edge 17 - 18+
					// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
					// two documents; shallow comparisons work.
					// eslint-disable-next-line eqeqeq
					if ( !context && elem.ownerDocument != document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( ( matcher = elementMatchers[ j++ ] ) ) {
						if ( matcher( elem, context || document, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {

					// They will have gone through all possible matchers
					if ( ( elem = !matcher && elem ) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( ( matcher = setMatchers[ j++ ] ) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {

					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !( unmatched[ i ] || setMatched[ i ] ) ) {
								setMatched[ i ] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {

		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[ i ] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache(
			selector,
			matcherFromGroupMatchers( elementMatchers, setMatchers )
		);

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( ( selector = compiled.selector || selector ) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[ 0 ] = match[ 0 ].slice( 0 );
		if ( tokens.length > 2 && ( token = tokens[ 0 ] ).type === "ID" &&
			context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[ 1 ].type ] ) {

			context = ( Expr.find[ "ID" ]( token.matches[ 0 ]
				.replace( runescape, funescape ), context ) || [] )[ 0 ];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr[ "needsContext" ].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[ i ];

			// Abort if we hit a combinator
			if ( Expr.relative[ ( type = token.type ) ] ) {
				break;
			}
			if ( ( find = Expr.find[ type ] ) ) {

				// Search, expanding context for leading sibling combinators
				if ( ( seed = find(
					token.matches[ 0 ].replace( runescape, funescape ),
					rsibling.test( tokens[ 0 ].type ) && testContext( context.parentNode ) ||
						context
				) ) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split( "" ).sort( sortOrder ).join( "" ) === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert( function( el ) {

	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement( "fieldset" ) ) & 1;
} );

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert( function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute( "href" ) === "#";
} ) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	} );
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert( function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
} ) ) {
	addHandle( "value", function( elem, _name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	} );
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert( function( el ) {
	return el.getAttribute( "disabled" ) == null;
} ) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
				( val = elem.getAttributeNode( name ) ) && val.specified ?
					val.value :
					null;
		}
	} );
}

return Sizzle;

} )( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, _i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, _i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, _i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		if ( elem.contentDocument != null &&

			// Support: IE 11+
			// <object> elements with no `data` attribute has an object
			// `contentDocument` with a `null` prototype.
			getProto( elem.contentDocument ) ) {

			return elem.contentDocument;
		}

		// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
		// Treat the template element as a regular one in browsers that
		// don't support it.
		if ( nodeName( elem, "template" ) ) {
			elem = elem.content || elem;
		}

		return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( _i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, _key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( _all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var documentElement = document.documentElement;



	var isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem );
		},
		composed = { composed: true };

	// Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
	// Check attachment across shadow DOM boundaries when possible (gh-3504)
	// Support: iOS 10.0-10.2 only
	// Early iOS 10 versions support `attachShadow` but not `getRootNode`,
	// leading to errors. We need to check for `getRootNode`.
	if ( documentElement.getRootNode ) {
		isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem ) ||
				elem.getRootNode( composed ) === elem.ownerDocument;
		};
	}
var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			isAttached( elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = elem.nodeType &&
			( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]*)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// Support: IE <=9 only
	// IE <=9 replaces <option> tags with their contents when inserted outside of
	// the select element.
	div.innerHTML = "<option></option>";
	support.option = !!div.lastChild;
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: IE <=9 only
if ( !support.option ) {
	wrapMap.optgroup = wrapMap.option = [ 1, "<select multiple='multiple'>", "</select>" ];
}


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, attached, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		attached = isAttached( elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( attached ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 - 11+
// focus() and blur() are asynchronous, except when they are no-op.
// So expect focus to be synchronous when the element is already active,
// and blur to be synchronous when the element is not already active.
// (focus and blur are always synchronous in other supported browsers,
// this just defines when we can count on it).
function expectSync( elem, type ) {
	return ( elem === safeActiveElement() ) === ( type === "focus" );
}

// Support: IE <=9 only
// Accessing document.activeElement can throw unexpectedly
// https://bugs.jquery.com/ticket/13393
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Only attach events to objects that accept data
		if ( !acceptData( elem ) ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = Object.create( null );
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( nativeEvent ),

			handlers = (
					dataPriv.get( this, "events" ) || Object.create( null )
				)[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// If the event is namespaced, then each handler is only invoked if it is
				// specially universal or its namespaces are a superset of the event's.
				if ( !event.rnamespace || handleObj.namespace === false ||
					event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		click: {

			// Utilize native event to ensure correct state for checkable inputs
			setup: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Claim the first handler
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					// dataPriv.set( el, "click", ... )
					leverageNative( el, "click", returnTrue );
				}

				// Return false to allow normal processing in the caller
				return false;
			},
			trigger: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Force setup before triggering a click
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					leverageNative( el, "click" );
				}

				// Return non-false to allow normal event-path propagation
				return true;
			},

			// For cross-browser consistency, suppress native .click() on links
			// Also prevent it if we're currently inside a leveraged native-event stack
			_default: function( event ) {
				var target = event.target;
				return rcheckableType.test( target.type ) &&
					target.click && nodeName( target, "input" ) &&
					dataPriv.get( target, "click" ) ||
					nodeName( target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

// Ensure the presence of an event listener that handles manually-triggered
// synthetic events by interrupting progress until reinvoked in response to
// *native* events that it fires directly, ensuring that state changes have
// already occurred before other listeners are invoked.
function leverageNative( el, type, expectSync ) {

	// Missing expectSync indicates a trigger call, which must force setup through jQuery.event.add
	if ( !expectSync ) {
		if ( dataPriv.get( el, type ) === undefined ) {
			jQuery.event.add( el, type, returnTrue );
		}
		return;
	}

	// Register the controller as a special universal handler for all event namespaces
	dataPriv.set( el, type, false );
	jQuery.event.add( el, type, {
		namespace: false,
		handler: function( event ) {
			var notAsync, result,
				saved = dataPriv.get( this, type );

			if ( ( event.isTrigger & 1 ) && this[ type ] ) {

				// Interrupt processing of the outer synthetic .trigger()ed event
				// Saved data should be false in such cases, but might be a leftover capture object
				// from an async native handler (gh-4350)
				if ( !saved.length ) {

					// Store arguments for use when handling the inner native event
					// There will always be at least one argument (an event object), so this array
					// will not be confused with a leftover capture object.
					saved = slice.call( arguments );
					dataPriv.set( this, type, saved );

					// Trigger the native event and capture its result
					// Support: IE <=9 - 11+
					// focus() and blur() are asynchronous
					notAsync = expectSync( this, type );
					this[ type ]();
					result = dataPriv.get( this, type );
					if ( saved !== result || notAsync ) {
						dataPriv.set( this, type, false );
					} else {
						result = {};
					}
					if ( saved !== result ) {

						// Cancel the outer synthetic event
						event.stopImmediatePropagation();
						event.preventDefault();
						return result.value;
					}

				// If this is an inner synthetic event for an event with a bubbling surrogate
				// (focus or blur), assume that the surrogate already propagated from triggering the
				// native event and prevent that from happening again here.
				// This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
				// bubbling surrogate propagates *after* the non-bubbling base), but that seems
				// less bad than duplication.
				} else if ( ( jQuery.event.special[ type ] || {} ).delegateType ) {
					event.stopPropagation();
				}

			// If this is a native event triggered above, everything is now in order
			// Fire an inner synthetic event with the original arguments
			} else if ( saved.length ) {

				// ...and capture the result
				dataPriv.set( this, type, {
					value: jQuery.event.trigger(

						// Support: IE <=9 - 11+
						// Extend with the prototype to reset the above stopImmediatePropagation()
						jQuery.extend( saved[ 0 ], jQuery.Event.prototype ),
						saved.slice( 1 ),
						this
					)
				} );

				// Abort handling of the native event
				event.stopImmediatePropagation();
			}
		}
	} );
}

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	code: true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

jQuery.each( { focus: "focusin", blur: "focusout" }, function( type, delegateType ) {
	jQuery.event.special[ type ] = {

		// Utilize native event if possible so blur/focus sequence is correct
		setup: function() {

			// Claim the first handler
			// dataPriv.set( this, "focus", ... )
			// dataPriv.set( this, "blur", ... )
			leverageNative( this, type, expectSync );

			// Return false to allow normal processing in the caller
			return false;
		},
		trigger: function() {

			// Force setup before trigger
			leverageNative( this, type );

			// Return non-false to allow normal event-path propagation
			return true;
		},

		delegateType: delegateType
	};
} );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.get( src );
		events = pdataOld.events;

		if ( events ) {
			dataPriv.remove( dest, "handle events" );

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = flat( args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl && !node.noModule ) {
								jQuery._evalUrl( node.src, {
									nonce: node.nonce || node.getAttribute( "nonce" )
								}, doc );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), node, doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && isAttached( node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html;
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = isAttached( elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var swap = function( elem, options, callback ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.call( elem );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		// Support: Chrome <=64
		// Don't get tricked when zoom affects offsetWidth (gh-4029)
		div.style.position = "absolute";
		scrollboxSizeVal = roundPixelMeasures( div.offsetWidth / 3 ) === 12;

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableTrDimensionsVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		},

		// Support: IE 9 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Behavior in IE 9 is more subtle than in newer versions & it passes
		// some versions of this test; make sure not to make it pass there!
		reliableTrDimensions: function() {
			var table, tr, trChild, trStyle;
			if ( reliableTrDimensionsVal == null ) {
				table = document.createElement( "table" );
				tr = document.createElement( "tr" );
				trChild = document.createElement( "div" );

				table.style.cssText = "position:absolute;left:-11111px";
				tr.style.height = "1px";
				trChild.style.height = "9px";

				documentElement
					.appendChild( table )
					.appendChild( tr )
					.appendChild( trChild );

				trStyle = window.getComputedStyle( tr );
				reliableTrDimensionsVal = parseInt( trStyle.height ) > 3;

				documentElement.removeChild( table );
			}
			return reliableTrDimensionsVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !isAttached( elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style,
	vendorProps = {};

// Return a vendor-prefixed property or undefined
function vendorPropName( name ) {

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a potentially-mapped jQuery.cssProps or vendor prefixed property
function finalPropName( name ) {
	var final = jQuery.cssProps[ name ] || vendorProps[ name ];

	if ( final ) {
		return final;
	}
	if ( name in emptyStyle ) {
		return name;
	}
	return vendorProps[ name ] = vendorPropName( name ) || name;
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	};

function setPositiveNumber( _elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5

		// If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
		// Use an explicit zero to avoid NaN (gh-3964)
		) ) || 0;
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),

		// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
		// Fake content-box until we know it's needed to know the true value.
		boxSizingNeeded = !support.boxSizingReliable() || extra,
		isBorderBox = boxSizingNeeded &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox,

		val = curCSS( elem, dimension, styles ),
		offsetProp = "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 );

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}


	// Support: IE 9 - 11 only
	// Use offsetWidth/offsetHeight for when box sizing is unreliable.
	// In those cases, the computed value can be trusted to be border-box.
	if ( ( !support.boxSizingReliable() && isBorderBox ||

		// Support: IE 10 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Interestingly, in some cases IE 9 doesn't suffer from this issue.
		!support.reliableTrDimensions() && nodeName( elem, "tr" ) ||

		// Fall back to offsetWidth/offsetHeight when value is "auto"
		// This happens for inline elements with no explicit setting (gh-3571)
		val === "auto" ||

		// Support: Android <=4.1 - 4.3 only
		// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) &&

		// Make sure the element is visible & connected
		elem.getClientRects().length ) {

		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Where available, offsetWidth/offsetHeight approximate border box dimensions.
		// Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
		// retrieved value as a content box dimension.
		valueIsBorderBox = offsetProp in elem;
		if ( valueIsBorderBox ) {
			val = elem[ offsetProp ];
		}
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"gridArea": true,
		"gridColumn": true,
		"gridColumnEnd": true,
		"gridColumnStart": true,
		"gridRow": true,
		"gridRowEnd": true,
		"gridRowStart": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			// The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
			// "px" to a few hardcoded values.
			if ( type === "number" && !isCustomProp ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( _i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),

				// Only read styles.position if the test has a chance to fail
				// to avoid forcing a reflow.
				scrollboxSizeBuggy = !support.scrollboxSize() &&
					styles.position === "absolute",

				// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
				boxSizingNeeded = scrollboxSizeBuggy || extra,
				isBorderBox = boxSizingNeeded &&
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra ?
					boxModelAdjustment(
						elem,
						dimension,
						extra,
						isBorderBox,
						styles
					) :
					0;

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && scrollboxSizeBuggy ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 && (
					jQuery.cssHooks[ tween.prop ] ||
					tween.elem.style[ finalPropName( tween.prop ) ] != null ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( _i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( _i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = (
					dataPriv.get( cur, "events" ) || Object.create( null )
				)[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {

				// Handle: regular nodes (via `this.ownerDocument`), window
				// (via `this.document`) & document (via `this`).
				var doc = this.ownerDocument || this.document || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this.document || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = { guid: Date.now() };

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	if ( a == null ) {
		return "";
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( _i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() + " " ] =
									( responseHeaders[ match[ 1 ].toLowerCase() + " " ] || [] )
										.concat( match[ 2 ] );
							}
						}
						match = responseHeaders[ key.toLowerCase() + " " ];
					}
					return match == null ? null : match.join( ", " );
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce.guid++ ) +
					uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Use a noop converter for missing script
			if ( !isSuccess && jQuery.inArray( "script", s.dataTypes ) > -1 ) {
				s.converters[ "text script" ] = function() {};
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( _i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );

jQuery.ajaxPrefilter( function( s ) {
	var i;
	for ( i in s.headers ) {
		if ( i.toLowerCase() === "content-type" ) {
			s.contentType = s.headers[ i ] || "";
		}
	}
} );


jQuery._evalUrl = function( url, options, doc ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,

		// Only evaluate the response if it is successful (gh-4126)
		// dataFilter is not invoked for failure responses, so using it instead
		// of the default converter is kludgy but it works.
		converters: {
			"text script": function() {}
		},
		dataFilter: function( response ) {
			jQuery.globalEval( response, options, doc );
		}
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain or forced-by-attrs requests
	if ( s.crossDomain || s.scriptAttrs ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" )
					.attr( s.scriptAttrs || {} )
					.prop( { charset: s.scriptCharset, src: s.url } )
					.on( "load error", callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					} );

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce.guid++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			if ( typeof props.top === "number" ) {
				props.top += "px";
			}
			if ( typeof props.left === "number" ) {
				props.left += "px";
			}
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( _i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( _i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	},

	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );

jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( _i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	} );




// Support: Android <=4.0 only
// Make sure we trim BOM and NBSP
var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};

jQuery.trim = function( text ) {
	return text == null ?
		"" :
		( text + "" ).replace( rtrim, "" );
};



// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( true ) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
		return jQuery;
	}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === "undefined" ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/setimmediate/setImmediate.js":
/*!***************************************************!*\
  !*** ./node_modules/setimmediate/setImmediate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/timers-browserify/main.js":
/*!************************************************!*\
  !*** ./node_modules/timers-browserify/main.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ "./node_modules/setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Application.vue?vue&type=template&id=b02fc960&":
/*!*****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Application.vue?vue&type=template&id=b02fc960& ***!
  \*****************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _vm._m(0),
    _vm._v(" "),
    !_vm.price && !_vm.about && !_vm.agents
      ? _c(
          "div",
          {
            staticClass: "p-10 shadow-2xl bg-blue-800 rounded-lg",
            style: [
              { fontSize: _vm.calcFont },
              { marginTop: _vm.calcMarginTop },
              { marginRight: _vm.calcMarginRight },
              { marginBottom: _vm.calcMarginBottom },
              { marginLeft: _vm.calcMarginLeft }
            ]
          },
          [
            _c(
              "h1",
              {
                staticClass: "font-bold text-white uppercase",
                style: { fontSize: _vm.calcFont }
              },
              [_vm._v("Расчет Растаможки")]
            ),
            _vm._v(" "),
            _c("form", { attrs: { onsubmit: "return false" } }, [
              _c("p", { staticClass: "flex pt-5 text-white" }, [
                _vm._v("Марка")
              ]),
              _vm._v(" "),
              _c(
                "select",
                {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.selectedMake,
                      expression: "selectedMake"
                    }
                  ],
                  staticClass:
                    "text-gray-700 focus:bg-white focus:outline-none w-full rounded bg-gray-200",
                  attrs: { required: "" },
                  on: {
                    change: [
                      function($event) {
                        var $$selectedVal = Array.prototype.filter
                          .call($event.target.options, function(o) {
                            return o.selected
                          })
                          .map(function(o) {
                            var val = "_value" in o ? o._value : o.value
                            return val
                          })
                        _vm.selectedMake = $event.target.multiple
                          ? $$selectedVal
                          : $$selectedVal[0]
                      },
                      function($event) {
                        return _vm.makeSelect()
                      }
                    ],
                    click: function($event) {
                      _vm.makeFault = false
                    }
                  }
                },
                _vm._l(_vm.uniqueMakes, function(uniqueMake) {
                  return _c("option", { staticClass: "notranslate" }, [
                    _vm._v(_vm._s(uniqueMake))
                  ])
                }),
                0
              ),
              _vm._v(" "),
              _vm.makeFault
                ? _c("div", { staticClass: "text-sm text-white" }, [
                    _vm._v(
                      "\n        Пожалуйста, сначала выберите марку\n      "
                    )
                  ])
                : _vm._e(),
              _vm._v(" "),
              _c("p", { staticClass: "flex pt-5 text-white" }, [
                _vm._v("Модель")
              ]),
              _vm._v(" "),
              _c(
                "select",
                {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.selectedModel,
                      expression: "selectedModel"
                    }
                  ],
                  staticClass:
                    "text-gray-700 focus:bg-white focus:outline-none w-full rounded bg-gray-200",
                  attrs: { required: "" },
                  on: {
                    click: function($event) {
                      return _vm.showMakeFault()
                    },
                    change: function($event) {
                      var $$selectedVal = Array.prototype.filter
                        .call($event.target.options, function(o) {
                          return o.selected
                        })
                        .map(function(o) {
                          var val = "_value" in o ? o._value : o.value
                          return val
                        })
                      _vm.selectedModel = $event.target.multiple
                        ? $$selectedVal
                        : $$selectedVal[0]
                    }
                  }
                },
                _vm._l(_vm.models, function(model) {
                  return _c("option", { staticClass: "notranslate" }, [
                    _vm._v(_vm._s(model))
                  ])
                }),
                0
              ),
              _vm._v(" "),
              _c("p", { staticClass: "flex pt-5 text-white" }, [
                _vm._v("Год выпуска")
              ]),
              _vm._v(" "),
              _c(
                "select",
                {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.year,
                      expression: "year"
                    }
                  ],
                  staticClass:
                    "text-gray-700 focus:bg-white focus:outline-none w-full rounded bg-gray-200",
                  attrs: { required: "" },
                  on: {
                    click: function($event) {
                      _vm.makeFault = false
                    },
                    change: function($event) {
                      var $$selectedVal = Array.prototype.filter
                        .call($event.target.options, function(o) {
                          return o.selected
                        })
                        .map(function(o) {
                          var val = "_value" in o ? o._value : o.value
                          return val
                        })
                      _vm.year = $event.target.multiple
                        ? $$selectedVal
                        : $$selectedVal[0]
                    }
                  }
                },
                _vm._l(_vm.years, function(year) {
                  return _c("option", [_vm._v(_vm._s(year))])
                }),
                0
              ),
              _vm._v(" "),
              _c("p", { staticClass: "flex pt-5 text-white" }, [
                _vm._v("Объем двиателя (литр)")
              ]),
              _vm._v(" "),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.engineCapacity,
                    expression: "engineCapacity"
                  }
                ],
                staticClass:
                  "text-gray-700 pl-2 focus:bg-white focus:outline-none w-full rounded bg-gray-200",
                attrs: {
                  type: "number",
                  step: "0.1",
                  min: "0.1",
                  required: ""
                },
                domProps: { value: _vm.engineCapacity },
                on: {
                  click: function($event) {
                    _vm.makeFault = false
                  },
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.engineCapacity = $event.target.value
                  }
                }
              }),
              _vm._v(" "),
              _c("p", { staticClass: "flex pt-5 text-white" }, [
                _vm._v("Производство (сборка)")
              ]),
              _vm._v(" "),
              _c(
                "select",
                {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.selectedCountry,
                      expression: "selectedCountry"
                    }
                  ],
                  staticClass:
                    "text-gray-700 focus:bg-white focus:outline-none w-full rounded bg-gray-200",
                  attrs: { required: "" },
                  on: {
                    click: function($event) {
                      _vm.makeFault = false
                    },
                    change: function($event) {
                      var $$selectedVal = Array.prototype.filter
                        .call($event.target.options, function(o) {
                          return o.selected
                        })
                        .map(function(o) {
                          var val = "_value" in o ? o._value : o.value
                          return val
                        })
                      _vm.selectedCountry = $event.target.multiple
                        ? $$selectedVal
                        : $$selectedVal[0]
                    }
                  }
                },
                _vm._l(_vm.countries, function(country) {
                  return _c("option", { staticClass: "notranslate" }, [
                    _vm._v(_vm._s(country))
                  ])
                }),
                0
              ),
              _vm._v(" "),
              _c("div", { staticClass: "pt-5" }, [
                _c("input", {
                  staticClass:
                    "focus:outline-none bg-red-800 hover:bg-red-900 w-full text-white p-2 rounded",
                  attrs: { type: "submit", value: "Подсчитать" },
                  on: {
                    click: function($event) {
                      return _vm.calculate()
                    }
                  }
                })
              ])
            ])
          ]
        )
      : _vm._e(),
    _vm._v(" "),
    _vm.price
      ? _c(
          "div",
          {
            style: [
              { fontSize: _vm.resultFont },
              { marginTop: _vm.resultMarginTop },
              { marginRight: _vm.resultMarginRight },
              { marginBottom: _vm.resultMarginBottom },
              { marginLeft: _vm.resultMarginLeft }
            ]
          },
          [
            _c("div", { staticClass: "bg-white p-5 shadow-2xl" }, [
              _vm._m(1),
              _vm._v(" "),
              _c("p", { staticClass: "mt-2" }, [
                _vm._v("Марка: " + _vm._s(_vm.selectedMake))
              ]),
              _vm._v(" "),
              _c("p", [_vm._v("Модель: " + _vm._s(_vm.selectedModel))]),
              _vm._v(" "),
              _c("p", [
                _vm._v("Объем двигателя: " + _vm._s(_vm.engineCapacity) + " л.")
              ]),
              _vm._v(" "),
              _c("p", [_vm._v("Год выпуска: " + _vm._s(_vm.year))]),
              _vm._v(" "),
              _c("p", [
                _vm._v(
                  "Расчет исходя от минимальной стоимости: " +
                    _vm._s(_vm.price) +
                    "$"
                )
              ]),
              _vm._v(" "),
              _c("p", [
                _vm._v("Производство (сборка): " + _vm._s(_vm.selectedCountry))
              ]),
              _vm._v(" "),
              _c("hr", { staticClass: "mt-5 border-black" }),
              _vm._v(" "),
              _c("p", { staticClass: "mt-6" }, [
                _c("b", [
                  _vm._v("Курс"),
                  _vm.rateType === "(курс НБТ)"
                    ? _c("span", [_vm._v(" НБТ")])
                    : _vm._e(),
                  _vm._v(":")
                ]),
                _vm._v(" "),
                _vm.rateType === "(курс по умолчанию)" &&
                !_vm.exchangeRateLoading
                  ? _c(
                      "a",
                      {
                        staticClass: "cursor-pointer",
                        on: {
                          click: function($event) {
                            return _vm.refreshExchangeRate()
                          }
                        }
                      },
                      [_vm._v("загрузить курс НБТ")]
                    )
                  : _vm._e(),
                _vm.exchangeRateLoading
                  ? _c(
                      "span",
                      { staticClass: "text-gray-600 italic animate-pulse" },
                      [_vm._v("загрузка курса НБТ...")]
                    )
                  : _vm._e()
              ]),
              _vm._v(" "),
              _c("p", { staticClass: "mt-2" }, [
                _vm._v("1$ = " + _vm._s(_vm.dollarRate) + " сомонӣ "),
                _vm.rateType === "(курс по умолчанию)"
                  ? _c("span", [_vm._v(_vm._s(_vm.rateType))])
                  : _vm._e()
              ]),
              _vm._v(" "),
              _c("p", [
                _vm._v("1€ = " + _vm._s(_vm.euroRate) + " сомонӣ "),
                _vm.rateType === "(курс по умолчанию)"
                  ? _c("span", [_vm._v(_vm._s(_vm.rateType))])
                  : _vm._e()
              ]),
              _vm._v(" "),
              _c("hr", { staticClass: "mt-5 border-black" }),
              _vm._v(" "),
              _vm._m(2),
              _vm._v(" "),
              _c("p", { staticClass: "mt-2" }, [
                _vm._v(_vm._s(_vm.poshlina) + " сомонӣ - пошлина")
              ]),
              _vm._v(" "),
              _vm.akcizEngine <= _vm.akcizPrice
                ? _c(
                    "div",
                    [
                      _c("p", [
                        _vm._v(
                          _vm._s(_vm.akcizPrice) + " сомонӣ - акциз (по цене)"
                        )
                      ]),
                      _vm._v(" "),
                      _c("strike", [
                        _vm._v(
                          " " +
                            _vm._s(_vm.akcizEngine) +
                            " сомонӣ - акциз (по объему двигателя)"
                        )
                      ])
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.akcizEngine > _vm.akcizPrice
                ? _c(
                    "div",
                    [
                      _c("strike", [
                        _vm._v(
                          _vm._s(_vm.akcizPrice) + " сомонӣ - акциз (по цене)"
                        )
                      ]),
                      _vm._v(" "),
                      _c("p", [
                        _vm._v(
                          " " +
                            _vm._s(_vm.akcizEngine) +
                            " сомонӣ - акциз (по объему двигателя)"
                        )
                      ])
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _c("p", [_vm._v(_vm._s(_vm.nds) + " сомонӣ - НДС")]),
              _vm._v(" "),
              _c("p", [_vm._v(_vm._s(_vm.procedure) + " сомонӣ - процедура")]),
              _vm._v(" "),
              _c("hr", { staticClass: "mt-5 border-black" }),
              _vm._v(" "),
              _c("p", { staticClass: "mt-5" }, [
                _c("b", [_vm._v("Всего: " + _vm._s(_vm.total) + " сомонӣ")]),
                _vm._v(
                  " (~" + _vm._s((_vm.total / _vm.dollarRate).toFixed(0)) + "$)"
                )
              ])
            ]),
            _vm._v(" "),
            _c("input", {
              staticClass:
                "bg-blue-800 hover:bg-blue-900 shadow-2xl w-full text-white p-2 mt-4 rounded",
              attrs: { type: "submit", value: "Назад" },
              on: {
                click: function($event) {
                  _vm.price = false
                }
              }
            })
          ]
        )
      : _vm._e(),
    _vm._v(" "),
    _vm.about
      ? _c("div", { staticClass: "p-10 text-gray-700" }, [
          _vm._m(3),
          _vm._v(" "),
          _c("p", { staticClass: "pt-5" }, [
            _vm._v(
              "Этот сайт создан программистами- энтузиастами, в помощь нашим гражданам."
            )
          ]),
          _vm._v(" "),
          _c("p", [
            _vm._v("Вся информация на сайте носит ознакомительный характер.")
          ]),
          _vm._v(" "),
          _c("p", { staticClass: "pt-5" }, [
            _vm._v(
              "Пожалуйста, поддержите проект. Это можно сделать несколькими способами:"
            )
          ]),
          _vm._v(" "),
          _c("p", [
            _vm._v("-поделитесь сайтом в социальных сетях и мессенджерах.")
          ]),
          _vm._v(" "),
          _vm._m(4),
          _vm._v(" "),
          _c("p", [
            _vm._v(
              "-расскажите нам свое мнение, свои предложения, идею, и об ошибках сайта."
            )
          ]),
          _vm._v(" "),
          _vm._m(5),
          _vm._v(" "),
          _c("p", { staticClass: "pt-5" }, [
            _vm._v("Мы будем рады любому вашему вкладу. Спасибо!")
          ])
        ])
      : _vm._e(),
    _vm._v(" "),
    _vm.agents
      ? _c("div", { staticClass: "p-10 text-gray-700" }, [
          _vm._m(6),
          _vm._v(" "),
          _c("p", { staticClass: "mt-5" }, [
            _vm._v(
              "Здесь представлены список представителей, занимающиеся поиском, покупкой и отправкой машин в Таджикистан"
            )
          ]),
          _vm._v(" "),
          _vm._m(7),
          _vm._v(" "),
          _vm._m(8),
          _vm._v(" "),
          _vm._m(9),
          _vm._v(" "),
          _vm._m(10)
        ])
      : _vm._e(),
    _vm._v(" "),
    _c("div", { staticClass: "text-center mt-2 mb-10" }, [
      _c(
        "span",
        {
          staticClass: "text-blue-500 cursor-pointer",
          on: {
            click: function($event) {
              return _vm.calculatorField()
            }
          }
        },
        [_vm._v("Главная")]
      ),
      _vm._v(" "),
      _c("span", { staticClass: "text-black" }, [_vm._v(" | ")]),
      _vm._v(" "),
      _c(
        "span",
        {
          staticClass: "text-blue-500 cursor-pointer",
          on: {
            click: function($event) {
              return _vm.aboutField()
            }
          }
        },
        [_vm._v("О проекте")]
      ),
      _vm._v(" "),
      _c("span", { staticClass: "text-black" }, [_vm._v(" | ")]),
      _vm._v(" "),
      _c(
        "a",
        {
          staticClass: "no-underline cursor-pointer",
          attrs: { target: "child", href: "https://texosmotr.tj?растаможка" }
        },
        [_vm._v("Техосмотр")]
      ),
      _vm._v(" "),
      _vm._m(11)
    ]),
    _vm._v(" "),
    _vm._m(12)
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("a", { attrs: { href: "./" } }, [
      _c("img", {
        staticClass: "mx-auto my-5 w-1/2",
        attrs: { src: "images/logo.png", alt: "RASTAMOJKA.TJ" }
      })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", { staticClass: "mt-5" }, [_c("b", [_vm._v("Данные:")])])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", { staticClass: "mt-6" }, [_c("b", [_vm._v("Расходы:")])])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "uppercase" }, [
      _c("b", [_vm._v("О проекте")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", [
      _vm._v("-подпишитесь на наш инстаграм "),
      _c(
        "a",
        {
          attrs: {
            target: "_blank",
            href: "https://instagram.com/rastamojka.tj"
          }
        },
        [_vm._v("@rastamojka.tj")]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", { staticClass: "mt-5" }, [
      _vm._v("Эл. почта: "),
      _c("a", { attrs: { href: "mailto:info@rastamojka.tj" } }, [
        _vm._v("info@rastamojka.tj")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "uppercase" }, [
      _c("b", [_vm._v("Представители")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "mt-10 flex" }, [
      _c("img", { staticClass: "w-24", attrs: { src: "images/avatar.png" } }),
      _vm._v(" "),
      _c("div", { staticClass: "my-auto mx-5" }, [
        _c("p", { staticClass: "font-bold" }, [_vm._v("Литва, г. Мариямполе")]),
        _vm._v(" "),
        _c("p", [_vm._v("Имя: Фаррух")]),
        _vm._v(" "),
        _c("p", [_vm._v("Тел.: +370-123-1234")])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "mt-10 flex" }, [
      _c("img", { staticClass: "w-24", attrs: { src: "images/avatar.png" } }),
      _vm._v(" "),
      _c("div", { staticClass: "my-auto mx-5" }, [
        _c("p", { staticClass: "font-bold" }, [_vm._v("Германия, г. Мюньхен")]),
        _vm._v(" "),
        _c("p", [_vm._v("Имя: Дилшод")]),
        _vm._v(" "),
        _c("p", [_vm._v("Тел.: +46-123-1234")])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "mt-10 flex" }, [
      _c("img", { staticClass: "w-24", attrs: { src: "images/avatar.png" } }),
      _vm._v(" "),
      _c("div", { staticClass: "my-auto mx-5" }, [
        _c("p", { staticClass: "font-bold" }, [_vm._v("США, Коларадо")]),
        _vm._v(" "),
        _c("p", [_vm._v("Имя: Камол")]),
        _vm._v(" "),
        _c("p", [_vm._v("Тел.: +1-123-1234")])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "mt-10 flex" }, [
      _c("img", { staticClass: "w-24", attrs: { src: "images/avatar.png" } }),
      _vm._v(" "),
      _c("div", { staticClass: "my-auto mx-5" }, [
        _c("p", { staticClass: "font-bold" }, [_vm._v("Корея, г. Сеул")]),
        _vm._v(" "),
        _c("p", [_vm._v("Имя: Фирдавс")]),
        _vm._v(" "),
        _c("p", [_vm._v("Тел.: +21-123-1234")])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "span",
      {
        staticClass: "text-blue-500 cursor-pointer",
        staticStyle: { display: "none" },
        attrs: { id: "btn-install-app" }
      },
      [
        _c("span", { staticClass: "text-black" }, [_vm._v(" | ")]),
        _vm._v("Установить")
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticStyle: { display: "none" }, attrs: { id: "downloadandroidapp" } },
      [
        _c(
          "a",
          {
            attrs: {
              href:
                "https://github.com/kosimoff/rastamojka/releases/download/1.0.0/RASTAMOJKA.TJ.apk"
            }
          },
          [
            _c("img", {
              staticClass: "w-1/6 m-auto",
              attrs: {
                src: "images/downloadforandroid.png",
                alt: "Скачать приложение для Android"
              }
            })
          ]
        )
      ]
    )
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./node_modules/vue/dist/vue.common.dev.js":
/*!*************************************************!*\
  !*** ./node_modules/vue/dist/vue.common.dev.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */


/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Generate a string containing static keys from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

{
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if (!config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null;
var targetStack = [];

function pushTarget (target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget () {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (isUndef(target) || isPrimitive(target)
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (isUndef(target) || isPrimitive(target)
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
{
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var isUsingMicroTask = false;

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
  isUsingMicroTask = true;
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
  isUsingMicroTask = true;
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

var mark;
var measure;

{
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

{
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
      warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      }
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if (!isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if (key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if (isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  }
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
      warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                "timeout (" + (res.timeout) + "ms)"
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if (!config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = expOrFn.toString();
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
      warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if (sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    {
      initProxy(vm);
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if (!(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');

var convertEnumeratedValue = function (key, value) {
  return isFalsyAttrValue(value) || value === 'false'
    ? 'false'
    // allow arbitrary string value for contenteditable
    : key === 'contenteditable' && isValidContentEditableValue(value)
      ? value
      : 'true'
};

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setStyleScope (node, scopeId) {
  node.setAttribute(scopeId, '');
}

var nodeOps = /*#__PURE__*/Object.freeze({
  createElement: createElement$1,
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
  setStyleScope: setStyleScope
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!isDef(key)) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1 (vnode, inVPre) {
    return (
      !inVPre &&
      !vnode.ns &&
      !(
        config.ignoredElements.length &&
        config.ignoredElements.some(function (ignore) {
          return isRegExp(ignore)
            ? ignore.test(vnode.tag)
            : ignore === vnode.tag
        })
      ) &&
      config.isUnknownElement(vnode.tag)
    )
  }

  var creatingElmInVPre = 0;

  function createElm (
    vnode,
    insertedVnodeQueue,
    parentElm,
    refElm,
    nested,
    ownerArray,
    index
  ) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }

      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        insert(parentElm, vnode.elm, refElm);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (nodeOps.parentNode(ref$$1) === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys (children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn(
            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
            vnode.context
          );
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (
    oldVnode,
    vnode,
    insertedVnodeQueue,
    ownerArray,
    index,
    removeOnly
  ) {
    if (oldVnode === vnode) {
      return
    }

    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // clone reused vnode
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        {
          checkDuplicateKeys(ch);
        }
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if (typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if (typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || (
        !isUnknownElement$$1(vnode, inVPre) &&
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm)) {
          removeVnodes([oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      dir.oldArg = oldDir.arg;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, convertEnumeratedValue(key, value));
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr (el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.
    /* istanbul ignore if */
    if (
      isIE && !isIE9 &&
      el.tagName === 'TEXTAREA' &&
      key === 'placeholder' && value !== '' && !el.__ieph
    ) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };
      el.addEventListener('input', blocker);
      // $flow-disable-line
      el.__ieph = true; /* IE placeholder patched */
    }
    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + (args !== ')' ? ',' + args : args))
  }
}

/*  */



/* eslint-disable no-unused-vars */
function baseWarn (msg, range) {
  console.error(("[Vue compiler]: " + msg));
}
/* eslint-enable no-unused-vars */

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value, range, dynamic) {
  (el.props || (el.props = [])).push(rangeSetItem({ name: name, value: value, dynamic: dynamic }, range));
  el.plain = false;
}

function addAttr (el, name, value, range, dynamic) {
  var attrs = dynamic
    ? (el.dynamicAttrs || (el.dynamicAttrs = []))
    : (el.attrs || (el.attrs = []));
  attrs.push(rangeSetItem({ name: name, value: value, dynamic: dynamic }, range));
  el.plain = false;
}

// add a raw attr (use this in preTransforms)
function addRawAttr (el, name, value, range) {
  el.attrsMap[name] = value;
  el.attrsList.push(rangeSetItem({ name: name, value: value }, range));
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  isDynamicArg,
  modifiers,
  range
) {
  (el.directives || (el.directives = [])).push(rangeSetItem({
    name: name,
    rawName: rawName,
    value: value,
    arg: arg,
    isDynamicArg: isDynamicArg,
    modifiers: modifiers
  }, range));
  el.plain = false;
}

function prependModifierMarker (symbol, name, dynamic) {
  return dynamic
    ? ("_p(" + name + ",\"" + symbol + "\")")
    : symbol + name // mark the event as captured
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn,
  range,
  dynamic
) {
  modifiers = modifiers || emptyObject;
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    warn &&
    modifiers.prevent && modifiers.passive
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.',
      range
    );
  }

  // normalize click.right and click.middle since they don't actually fire
  // this is technically browser-specific, but at least for now browsers are
  // the only target envs that have right/middle clicks.
  if (modifiers.right) {
    if (dynamic) {
      name = "(" + name + ")==='click'?'contextmenu':(" + name + ")";
    } else if (name === 'click') {
      name = 'contextmenu';
      delete modifiers.right;
    }
  } else if (modifiers.middle) {
    if (dynamic) {
      name = "(" + name + ")==='click'?'mouseup':(" + name + ")";
    } else if (name === 'click') {
      name = 'mouseup';
    }
  }

  // check capture modifier
  if (modifiers.capture) {
    delete modifiers.capture;
    name = prependModifierMarker('!', name, dynamic);
  }
  if (modifiers.once) {
    delete modifiers.once;
    name = prependModifierMarker('~', name, dynamic);
  }
  /* istanbul ignore if */
  if (modifiers.passive) {
    delete modifiers.passive;
    name = prependModifierMarker('&', name, dynamic);
  }

  var events;
  if (modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }

  var newHandler = rangeSetItem({ value: value.trim(), dynamic: dynamic }, range);
  if (modifiers !== emptyObject) {
    newHandler.modifiers = modifiers;
  }

  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }

  el.plain = false;
}

function getRawBindingAttr (
  el,
  name
) {
  return el.rawAttrsMap[':' + name] ||
    el.rawAttrsMap['v-bind:' + name] ||
    el.rawAttrsMap[name]
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.
function getAndRemoveAttr (
  el,
  name,
  removeFromMap
) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  if (removeFromMap) {
    delete el.attrsMap[name];
  }
  return val
}

function getAndRemoveAttrByRegex (
  el,
  name
) {
  var list = el.attrsList;
  for (var i = 0, l = list.length; i < l; i++) {
    var attr = list[i];
    if (name.test(attr.name)) {
      list.splice(i, 1);
      return attr
    }
  }
}

function rangeSetItem (
  item,
  range
) {
  if (range) {
    if (range.start != null) {
      item.start = range.start;
    }
    if (range.end != null) {
      item.end = range.end;
    }
  }
  return item
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
      "? " + baseValueExpression + ".trim()" +
      ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: JSON.stringify(value),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var res = parseModel(value);
  if (res.key === null) {
    return (value + "=" + assignment)
  } else {
    return ("$set(" + (res.exp) + ", " + (res.key) + ", " + assignment + ")")
  }
}

/**
 * Parse a v-model expression into a base path and a final key segment.
 * Handles both dot-path and possible square brackets.
 *
 * Possible cases:
 *
 * - test
 * - test[key]
 * - test[test1[key]]
 * - test["a"][key]
 * - xxx.test[a[a].test1[key]]
 * - test.xxx.a["asa"][test1[key]]
 *
 */

var len, str, chr, index$1, expressionPos, expressionEndPos;



function parseModel (val) {
  // Fix https://github.com/vuejs/vue/pull/7730
  // allow v-model="obj.val " (trailing whitespace)
  val = val.trim();
  len = val.length;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    index$1 = val.lastIndexOf('.');
    if (index$1 > -1) {
      return {
        exp: val.slice(0, index$1),
        key: '"' + val.slice(index$1 + 1) + '"'
      }
    } else {
      return {
        exp: val,
        key: null
      }
    }
  }

  str = val;
  index$1 = expressionPos = expressionEndPos = 0;

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.slice(0, expressionPos),
    key: val.slice(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  {
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead.",
        el.rawAttrsMap['v-model']
      );
    }
  }

  if (el.component) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.',
      el.rawAttrsMap['v-model']
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
    "?_i(" + value + "," + valueBinding + ")>-1" + (
      trueValueBinding === 'true'
        ? (":(" + value + ")")
        : (":_q(" + value + "," + trueValueBinding + ")")
    )
  );
  addHandler(el, 'change',
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$el.checked){$$i<0&&(" + (genAssignmentCode(value, '$$a.concat([$$v])')) + ")}" +
      "else{$$i>-1&&(" + (genAssignmentCode(value, '$$a.slice(0,$$i).concat($$a.slice($$i+1))')) + ")}" +
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}

function genRadioModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;

  // warn if v-bind:value conflicts with v-model
  // except for inputs with v-bind:type
  {
    var value$1 = el.attrsMap['v-bind:value'] || el.attrsMap[':value'];
    var typeBinding = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
    if (value$1 && !typeBinding) {
      var binding = el.attrsMap['v-bind:value'] ? 'v-bind:value' : ':value';
      warn$1(
        binding + "=\"" + value$1 + "\" conflicts with v-model on the same element " +
        'because the latter already expands to a value binding internally',
        el.rawAttrsMap[binding]
      );
    }
  }

  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number) {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler$1 (event, handler, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

// #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp
// implementation and does not fire microtasks in between event propagation, so
// safe to exclude.
var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);

function add$1 (
  name,
  handler,
  capture,
  passive
) {
  // async edge case #6566: inner click event triggers patch, event handler
  // attached to outer element during patch, and triggered again. This
  // happens because browsers fire microtask ticks between event propagation.
  // the solution is simple: we save the timestamp when a handler is attached,
  // and the handler would only fire if the event passed to it was fired
  // AFTER it was attached.
  if (useMicrotaskFix) {
    var attachedTimestamp = currentFlushTimestamp;
    var original = handler;
    handler = original._wrapper = function (e) {
      if (
        // no bubbling, should always fire.
        // this is just a safety net in case event.timeStamp is unreliable in
        // certain weird environments...
        e.target === e.currentTarget ||
        // event is fired after handler attachment
        e.timeStamp >= attachedTimestamp ||
        // bail for environments that have buggy event.timeStamp implementations
        // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
        // #9681 QtWebEngine event.timeStamp is negative value
        e.timeStamp <= 0 ||
        // #9448 bail if event is fired in another document in a multi-page
        // electron/nw.js app, since event.timeStamp will be using a different
        // starting reference
        e.target.ownerDocument !== document
      ) {
        return original.apply(this, arguments)
      }
    };
  }
  target$1.addEventListener(
    name,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  name,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    name,
    handler._wrapper || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

var svgContainer;

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (!(key in props)) {
      elm[key] = '';
    }
  }

  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value' && elm.tagName !== 'PROGRESS') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else if (key === 'innerHTML' && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
      // IE doesn't support innerHTML for SVG elements
      svgContainer = svgContainer || document.createElement('div');
      svgContainer.innerHTML = "<svg>" + cur + "</svg>";
      var svg = svgContainer.firstChild;
      while (elm.firstChild) {
        elm.removeChild(elm.firstChild);
      }
      while (svg.firstChild) {
        elm.appendChild(svg.firstChild);
      }
    } else if (
      // skip the update if old and new VDOM state is the same.
      // `value` is handled separately because the DOM value may be temporarily
      // out of sync with VDOM state due to focus, composition and modifiers.
      // This  #4521 by skipping the unnecesarry `checked` update.
      cur !== oldProps[key]
    ) {
      // some property updates can throw
      // e.g. `value` on <progress> w/ non-finite value
      try {
        elm[key] = cur;
      } catch (e) {}
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isNotInFocusAndDirty(elm, checkVal) ||
    isDirtyWithModifiers(elm, checkVal)
  ))
}

function isNotInFocusAndDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isDirtyWithModifiers (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

var whitespaceRE = /\s+/;

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def$$1) {
  if (!def$$1) {
    return
  }
  /* istanbul ignore else */
  if (typeof def$$1 === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  // JSDOM may return undefined for transition properties
  var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
  var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
  var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

// Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
// in a locale-dependent way, using a comma instead of a dot.
// If comma is not replaced with a dot, the input will be rounded down (i.e. acting
// as a floor function) causing unexpected behaviors
function toMs (s) {
  return Number(s.slice(0, -1).replace(',', '.')) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    context = transitionNode.context;
    transitionNode = transitionNode.parent;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if (explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);
      if (!cb.cancelled) {
        addTransitionClass(el, toClass);
        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if (isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show && el.parentNode) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd);
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (!value === !oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: directive,
  show: show
};

/*  */

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var isNotTextNode = function (c) { return c.tag || isAsyncPlaceholder(c); };

var isVShowDirective = function (d) { return d.name === 'show'; };

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(isNotTextNode);
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if (mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(isVShowDirective)) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  beforeMount: function beforeMount () {
    var this$1 = this;

    var update = this._update;
    this._update = function (vnode, hydrating) {
      var restoreActiveInstance = setActiveInstance(this$1);
      // force removing pass
      this$1.__patch__(
        this$1._vnode,
        this$1.kept,
        false, // hydrating
        true // removeOnly (!important, avoids unnecessary moves)
      );
      this$1._vnode = this$1.kept;
      restoreActiveInstance();
      update.call(this$1, vnode, hydrating);
    };
  },

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (e && e.target !== el) {
            return
          }
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents);

// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else {
        console[console.info ? 'info' : 'log'](
          'Download the Vue Devtools extension for a better development experience:\n' +
          'https://github.com/vuejs/vue-devtools'
        );
      }
    }
    if (config.productionTip !== false &&
      typeof console !== 'undefined'
    ) {
      console[console.info ? 'info' : 'log'](
        "You are running Vue in development mode.\n" +
        "Make sure to turn on production mode when deploying for production.\n" +
        "See more tips at https://vuejs.org/guide/deployment.html"
      );
    }
  }, 0);
}

/*  */

var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});



function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var rawTokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index, tokenValue;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      rawTokens.push(tokenValue = text.slice(lastIndex, index));
      tokens.push(JSON.stringify(tokenValue));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    rawTokens.push({ '@binding': exp });
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    rawTokens.push(tokenValue = text.slice(lastIndex));
    tokens.push(JSON.stringify(tokenValue));
  }
  return {
    expression: tokens.join('+'),
    tokens: rawTokens
  }
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if (staticClass) {
    var res = parseText(staticClass, options.delimiters);
    if (res) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.',
        el.rawAttrsMap['class']
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData
};

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    {
      var res = parseText(staticStyle, options.delimiters);
      if (res) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.',
          el.rawAttrsMap['style']
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$1
};

/*  */

var decoder;

var he = {
  decode: function decode (html) {
    decoder = decoder || document.createElement('div');
    decoder.innerHTML = html;
    return decoder.textContent
  }
};

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/**
 * Not type-checking this file because it's mostly vendor code.
 */

// Regular Expressions for parsing tags and attributes
var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
var dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z" + (unicodeRegExp.source) + "]*";
var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
var startTagOpen = new RegExp(("^<" + qnameCapture));
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
var doctype = /^<!DOCTYPE [^>]+>/i;
// #7298: escape - to avoid being passed as HTML comment when inlined in page
var comment = /^<!\--/;
var conditionalComment = /^<!\[/;

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n',
  '&#9;': '\t',
  '&#39;': "'"
};
var encodedAttr = /&(?:lt|gt|quot|amp|#39);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#39|#10|#9);/g;

// #5992
var isIgnoreNewlineTag = makeMap('pre,textarea', true);
var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd), index, index + commentEnd + 3);
            }
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          if (shouldIgnoreFirstNewline(startTagMatch.tagName, html)) {
            advance(1);
          }
          continue
        }
      }

      var text = (void 0), rest = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest = html.slice(textEnd);
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
      }

      if (textEnd < 0) {
        text = html;
      }

      if (text) {
        advance(text.length);
      }

      if (options.chars && text) {
        options.chars(text, index - text.length, index);
      }
    } else {
      var endTagLength = 0;
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!\--([\s\S]*?)-->/g, '$1') // #7298
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1);
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest$1.length;
      html = rest$1;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if (!stack.length && options.warn) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""), { start: index + html.length });
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(dynamicArgAttribute) || html.match(attribute))) {
        attr.start = index;
        advance(attr[0].length);
        attr.end = index;
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      var value = args[3] || args[4] || args[5] || '';
      var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
        ? options.shouldDecodeNewlinesForHref
        : options.shouldDecodeNewlines;
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines)
      };
      if (options.outputSourceRange) {
        attrs[i].start = args.start + args[0].match(/^\s*/).length;
        attrs[i].end = args.end;
      }
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs, start: match.start, end: match.end });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    // Find the closest opened tag of the same type
    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if (i > pos || !tagName &&
          options.warn
        ) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag."),
            { start: stack[i].start, end: stack[i].end }
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:|^#/;
var forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
var stripParensRE = /^\(|\)$/g;
var dynamicArgRE = /^\[.*\]$/;

var argRE = /:(.*)$/;
var bindRE = /^:|^\.|^v-bind:/;
var modifierRE = /\.[^.\]]+(?=[^\]]*$)/g;

var slotRE = /^v-slot(:|$)|^#/;

var lineBreakRE = /[\r\n]/;
var whitespaceRE$1 = /\s+/g;

var invalidAttributeRE = /[\s"'<>\/=]/;

var decodeHTMLCached = cached(he.decode);

var emptySlotScopeToken = "_empty_";

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;
var maybeComponent;

function createASTElement (
  tag,
  attrs,
  parent
) {
  return {
    type: 1,
    tag: tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    rawAttrsMap: {},
    parent: parent,
    children: []
  }
}

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;

  platformIsPreTag = options.isPreTag || no;
  platformMustUseProp = options.mustUseProp || no;
  platformGetTagNamespace = options.getTagNamespace || no;
  var isReservedTag = options.isReservedTag || no;
  maybeComponent = function (el) { return !!el.component || !isReservedTag(el.tag); };

  transforms = pluckModuleFunction(options.modules, 'transformNode');
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var whitespaceOption = options.whitespace;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg, range) {
    if (!warned) {
      warned = true;
      warn$2(msg, range);
    }
  }

  function closeElement (element) {
    trimEndingWhitespace(element);
    if (!inVPre && !element.processed) {
      element = processElement(element, options);
    }
    // tree management
    if (!stack.length && element !== root) {
      // allow root elements with v-if, v-else-if and v-else
      if (root.if && (element.elseif || element.else)) {
        {
          checkRootConstraints(element);
        }
        addIfCondition(root, {
          exp: element.elseif,
          block: element
        });
      } else {
        warnOnce(
          "Component template should contain exactly one root element. " +
          "If you are using v-if on multiple elements, " +
          "use v-else-if to chain them instead.",
          { start: element.start }
        );
      }
    }
    if (currentParent && !element.forbidden) {
      if (element.elseif || element.else) {
        processIfConditions(element, currentParent);
      } else {
        if (element.slotScope) {
          // scoped slot
          // keep it in the children list so that v-else(-if) conditions can
          // find it as the prev node.
          var name = element.slotTarget || '"default"'
          ;(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        }
        currentParent.children.push(element);
        element.parent = currentParent;
      }
    }

    // final children cleanup
    // filter out scoped slots
    element.children = element.children.filter(function (c) { return !(c).slotScope; });
    // remove trailing whitespace node again
    trimEndingWhitespace(element);

    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
    // apply post-transforms
    for (var i = 0; i < postTransforms.length; i++) {
      postTransforms[i](element, options);
    }
  }

  function trimEndingWhitespace (el) {
    // remove trailing whitespace node
    if (!inPre) {
      var lastNode;
      while (
        (lastNode = el.children[el.children.length - 1]) &&
        lastNode.type === 3 &&
        lastNode.text === ' '
      ) {
        el.children.pop();
      }
    }
  }

  function checkRootConstraints (el) {
    if (el.tag === 'slot' || el.tag === 'template') {
      warnOnce(
        "Cannot use <" + (el.tag) + "> as component root element because it may " +
        'contain multiple nodes.',
        { start: el.start }
      );
    }
    if (el.attrsMap.hasOwnProperty('v-for')) {
      warnOnce(
        'Cannot use v-for on stateful component root element because ' +
        'it renders multiple elements.',
        el.rawAttrsMap['v-for']
      );
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    outputSourceRange: options.outputSourceRange,
    start: function start (tag, attrs, unary, start$1, end) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = createASTElement(tag, attrs, currentParent);
      if (ns) {
        element.ns = ns;
      }

      {
        if (options.outputSourceRange) {
          element.start = start$1;
          element.end = end;
          element.rawAttrsMap = element.attrsList.reduce(function (cumulated, attr) {
            cumulated[attr.name] = attr;
            return cumulated
          }, {});
        }
        attrs.forEach(function (attr) {
          if (invalidAttributeRE.test(attr.name)) {
            warn$2(
              "Invalid dynamic argument expression: attribute names cannot contain " +
              "spaces, quotes, <, >, / or =.",
              {
                start: attr.start + attr.name.indexOf("["),
                end: attr.start + attr.name.length
              }
            );
          }
        });
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.',
          { start: element.start }
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element;
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else if (!element.processed) {
        // structural directives
        processFor(element);
        processIf(element);
        processOnce(element);
      }

      if (!root) {
        root = element;
        {
          checkRootConstraints(root);
        }
      }

      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        closeElement(element);
      }
    },

    end: function end (tag, start, end$1) {
      var element = stack[stack.length - 1];
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      if (options.outputSourceRange) {
        element.end = end$1;
      }
      closeElement(element);
    },

    chars: function chars (text, start, end) {
      if (!currentParent) {
        {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.',
              { start: start }
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored."),
              { start: start }
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      if (inPre || text.trim()) {
        text = isTextTag(currentParent) ? text : decodeHTMLCached(text);
      } else if (!children.length) {
        // remove the whitespace-only node right after an opening tag
        text = '';
      } else if (whitespaceOption) {
        if (whitespaceOption === 'condense') {
          // in condense mode, remove the whitespace node if it contains
          // line break, otherwise condense to a single space
          text = lineBreakRE.test(text) ? '' : ' ';
        } else {
          text = ' ';
        }
      } else {
        text = preserveWhitespace ? ' ' : '';
      }
      if (text) {
        if (!inPre && whitespaceOption === 'condense') {
          // condense consecutive whitespaces into single space
          text = text.replace(whitespaceRE$1, ' ');
        }
        var res;
        var child;
        if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
          child = {
            type: 2,
            expression: res.expression,
            tokens: res.tokens,
            text: text
          };
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          child = {
            type: 3,
            text: text
          };
        }
        if (child) {
          if (options.outputSourceRange) {
            child.start = start;
            child.end = end;
          }
          children.push(child);
        }
      }
    },
    comment: function comment (text, start, end) {
      // adding anyting as a sibling to the root node is forbidden
      // comments should still be allowed, but ignored
      if (currentParent) {
        var child = {
          type: 3,
          text: text,
          isComment: true
        };
        if (options.outputSourceRange) {
          child.start = start;
          child.end = end;
        }
        currentParent.children.push(child);
      }
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var list = el.attrsList;
  var len = list.length;
  if (len) {
    var attrs = el.attrs = new Array(len);
    for (var i = 0; i < len; i++) {
      attrs[i] = {
        name: list[i].name,
        value: JSON.stringify(list[i].value)
      };
      if (list[i].start != null) {
        attrs[i].start = list[i].start;
        attrs[i].end = list[i].end;
      }
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processElement (
  element,
  options
) {
  processKey(element);

  // determine whether this is a plain element after
  // removing structural attributes
  element.plain = (
    !element.key &&
    !element.scopedSlots &&
    !element.attrsList.length
  );

  processRef(element);
  processSlotContent(element);
  processSlotOutlet(element);
  processComponent(element);
  for (var i = 0; i < transforms.length; i++) {
    element = transforms[i](element, options) || element;
  }
  processAttrs(element);
  return element
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    {
      if (el.tag === 'template') {
        warn$2(
          "<template> cannot be keyed. Place the key on real elements instead.",
          getRawBindingAttr(el, 'key')
        );
      }
      if (el.for) {
        var iterator = el.iterator2 || el.iterator1;
        var parent = el.parent;
        if (iterator && iterator === exp && parent && parent.tag === 'transition-group') {
          warn$2(
            "Do not use v-for index as key on <transition-group> children, " +
            "this is the same as not using keys.",
            getRawBindingAttr(el, 'key'),
            true /* tip */
          );
        }
      }
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var res = parseFor(exp);
    if (res) {
      extend(el, res);
    } else {
      warn$2(
        ("Invalid v-for expression: " + exp),
        el.rawAttrsMap['v-for']
      );
    }
  }
}



function parseFor (exp) {
  var inMatch = exp.match(forAliasRE);
  if (!inMatch) { return }
  var res = {};
  res.for = inMatch[2].trim();
  var alias = inMatch[1].trim().replace(stripParensRE, '');
  var iteratorMatch = alias.match(forIteratorRE);
  if (iteratorMatch) {
    res.alias = alias.replace(forIteratorRE, '').trim();
    res.iterator1 = iteratorMatch[1].trim();
    if (iteratorMatch[2]) {
      res.iterator2 = iteratorMatch[2].trim();
    }
  } else {
    res.alias = alias;
  }
  return res
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if.",
      el.rawAttrsMap[el.elseif ? 'v-else-if' : 'v-else']
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if (children[i].text !== ' ') {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored.",
          children[i]
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

// handle content being passed to a component as slot,
// e.g. <template slot="xxx">, <div slot-scope="xxx">
function processSlotContent (el) {
  var slotScope;
  if (el.tag === 'template') {
    slotScope = getAndRemoveAttr(el, 'scope');
    /* istanbul ignore if */
    if (slotScope) {
      warn$2(
        "the \"scope\" attribute for scoped slots have been deprecated and " +
        "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " +
        "can also be used on plain elements in addition to <template> to " +
        "denote scoped slots.",
        el.rawAttrsMap['scope'],
        true
      );
    }
    el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
  } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
    /* istanbul ignore if */
    if (el.attrsMap['v-for']) {
      warn$2(
        "Ambiguous combined usage of slot-scope and v-for on <" + (el.tag) + "> " +
        "(v-for takes higher priority). Use a wrapper <template> for the " +
        "scoped slot to make it clearer.",
        el.rawAttrsMap['slot-scope'],
        true
      );
    }
    el.slotScope = slotScope;
  }

  // slot="xxx"
  var slotTarget = getBindingAttr(el, 'slot');
  if (slotTarget) {
    el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
    el.slotTargetDynamic = !!(el.attrsMap[':slot'] || el.attrsMap['v-bind:slot']);
    // preserve slot as an attribute for native shadow DOM compat
    // only for non-scoped slots.
    if (el.tag !== 'template' && !el.slotScope) {
      addAttr(el, 'slot', slotTarget, getRawBindingAttr(el, 'slot'));
    }
  }

  // 2.6 v-slot syntax
  {
    if (el.tag === 'template') {
      // v-slot on <template>
      var slotBinding = getAndRemoveAttrByRegex(el, slotRE);
      if (slotBinding) {
        {
          if (el.slotTarget || el.slotScope) {
            warn$2(
              "Unexpected mixed usage of different slot syntaxes.",
              el
            );
          }
          if (el.parent && !maybeComponent(el.parent)) {
            warn$2(
              "<template v-slot> can only appear at the root level inside " +
              "the receiving component",
              el
            );
          }
        }
        var ref = getSlotName(slotBinding);
        var name = ref.name;
        var dynamic = ref.dynamic;
        el.slotTarget = name;
        el.slotTargetDynamic = dynamic;
        el.slotScope = slotBinding.value || emptySlotScopeToken; // force it into a scoped slot for perf
      }
    } else {
      // v-slot on component, denotes default slot
      var slotBinding$1 = getAndRemoveAttrByRegex(el, slotRE);
      if (slotBinding$1) {
        {
          if (!maybeComponent(el)) {
            warn$2(
              "v-slot can only be used on components or <template>.",
              slotBinding$1
            );
          }
          if (el.slotScope || el.slotTarget) {
            warn$2(
              "Unexpected mixed usage of different slot syntaxes.",
              el
            );
          }
          if (el.scopedSlots) {
            warn$2(
              "To avoid scope ambiguity, the default slot should also use " +
              "<template> syntax when there are other named slots.",
              slotBinding$1
            );
          }
        }
        // add the component's children to its default slot
        var slots = el.scopedSlots || (el.scopedSlots = {});
        var ref$1 = getSlotName(slotBinding$1);
        var name$1 = ref$1.name;
        var dynamic$1 = ref$1.dynamic;
        var slotContainer = slots[name$1] = createASTElement('template', [], el);
        slotContainer.slotTarget = name$1;
        slotContainer.slotTargetDynamic = dynamic$1;
        slotContainer.children = el.children.filter(function (c) {
          if (!c.slotScope) {
            c.parent = slotContainer;
            return true
          }
        });
        slotContainer.slotScope = slotBinding$1.value || emptySlotScopeToken;
        // remove children as they are returned from scopedSlots now
        el.children = [];
        // mark el non-plain so data gets generated
        el.plain = false;
      }
    }
  }
}

function getSlotName (binding) {
  var name = binding.name.replace(slotRE, '');
  if (!name) {
    if (binding.name[0] !== '#') {
      name = 'default';
    } else {
      warn$2(
        "v-slot shorthand syntax requires a slot name.",
        binding
      );
    }
  }
  return dynamicArgRE.test(name)
    // dynamic [name]
    ? { name: name.slice(1, -1), dynamic: true }
    // static name
    : { name: ("\"" + name + "\""), dynamic: false }
}

// handle <slot/> outlets
function processSlotOutlet (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if (el.key) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead.",
        getRawBindingAttr(el, 'key')
      );
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, syncGen, isDynamic;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name.replace(dirRE, ''));
      // support .foo shorthand syntax for the .prop modifier
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isDynamic = dynamicArgRE.test(name);
        if (isDynamic) {
          name = name.slice(1, -1);
        }
        if (
          value.trim().length === 0
        ) {
          warn$2(
            ("The value for a v-bind expression cannot be empty. Found in \"v-bind:" + name + "\"")
          );
        }
        if (modifiers) {
          if (modifiers.prop && !isDynamic) {
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel && !isDynamic) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            syncGen = genAssignmentCode(value, "$event");
            if (!isDynamic) {
              addHandler(
                el,
                ("update:" + (camelize(name))),
                syncGen,
                null,
                false,
                warn$2,
                list[i]
              );
              if (hyphenate(name) !== camelize(name)) {
                addHandler(
                  el,
                  ("update:" + (hyphenate(name))),
                  syncGen,
                  null,
                  false,
                  warn$2,
                  list[i]
                );
              }
            } else {
              // handler w/ dynamic event name
              addHandler(
                el,
                ("\"update:\"+(" + name + ")"),
                syncGen,
                null,
                false,
                warn$2,
                list[i],
                true // dynamic
              );
            }
          }
        }
        if ((modifiers && modifiers.prop) || (
          !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
        )) {
          addProp(el, name, value, list[i], isDynamic);
        } else {
          addAttr(el, name, value, list[i], isDynamic);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        isDynamic = dynamicArgRE.test(name);
        if (isDynamic) {
          name = name.slice(1, -1);
        }
        addHandler(el, name, value, modifiers, false, warn$2, list[i], isDynamic);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        isDynamic = false;
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
          if (dynamicArgRE.test(arg)) {
            arg = arg.slice(1, -1);
            isDynamic = true;
          }
        }
        addDirective(el, name, rawName, value, arg, isDynamic, modifiers, list[i]);
        if (name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      {
        var res = parseText(value, delimiters);
        if (res) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.',
            list[i]
          );
        }
      }
      addAttr(el, name, JSON.stringify(value), list[i]);
      // #6887 firefox doesn't update muted state if set via attribute
      // even immediately after element creation
      if (!el.component &&
          name === 'muted' &&
          platformMustUseProp(el.tag, el.attrsMap.type, name)) {
        addProp(el, name, 'true', list[i]);
      }
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (
      map[attrs[i].name] && !isIE && !isEdge
    ) {
      warn$2('duplicate attribute: ' + attrs[i].name, attrs[i]);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead.",
        el.rawAttrsMap['v-model']
      );
    }
    _el = _el.parent;
  }
}

/*  */

function preTransformNode (el, options) {
  if (el.tag === 'input') {
    var map = el.attrsMap;
    if (!map['v-model']) {
      return
    }

    var typeBinding;
    if (map[':type'] || map['v-bind:type']) {
      typeBinding = getBindingAttr(el, 'type');
    }
    if (!map.type && !typeBinding && map['v-bind']) {
      typeBinding = "(" + (map['v-bind']) + ").type";
    }

    if (typeBinding) {
      var ifCondition = getAndRemoveAttr(el, 'v-if', true);
      var ifConditionExtra = ifCondition ? ("&&(" + ifCondition + ")") : "";
      var hasElse = getAndRemoveAttr(el, 'v-else', true) != null;
      var elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true);
      // 1. checkbox
      var branch0 = cloneASTElement(el);
      // process for on the main node
      processFor(branch0);
      addRawAttr(branch0, 'type', 'checkbox');
      processElement(branch0, options);
      branch0.processed = true; // prevent it from double-processed
      branch0.if = "(" + typeBinding + ")==='checkbox'" + ifConditionExtra;
      addIfCondition(branch0, {
        exp: branch0.if,
        block: branch0
      });
      // 2. add radio else-if condition
      var branch1 = cloneASTElement(el);
      getAndRemoveAttr(branch1, 'v-for', true);
      addRawAttr(branch1, 'type', 'radio');
      processElement(branch1, options);
      addIfCondition(branch0, {
        exp: "(" + typeBinding + ")==='radio'" + ifConditionExtra,
        block: branch1
      });
      // 3. other
      var branch2 = cloneASTElement(el);
      getAndRemoveAttr(branch2, 'v-for', true);
      addRawAttr(branch2, ':type', typeBinding);
      processElement(branch2, options);
      addIfCondition(branch0, {
        exp: ifCondition,
        block: branch2
      });

      if (hasElse) {
        branch0.else = true;
      } else if (elseIfCondition) {
        branch0.elseif = elseIfCondition;
      }

      return branch0
    }
  }
}

function cloneASTElement (el) {
  return createASTElement(el.tag, el.attrsList.slice(), el.parent)
}

var model$1 = {
  preTransformNode: preTransformNode
};

var modules$1 = [
  klass$1,
  style$1,
  model$1
];

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"), dir);
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"), dir);
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
};

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs,start,end,rawAttrsMap' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        var block = node.ifConditions[i$1].block;
        markStatic$1(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        markStaticRoots(node.ifConditions[i$1].block, isInFor);
      }
    }
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function(?:\s+[\w$]+)?\s*\(/;
var fnInvokeRE = /\([^)]*?\);*$/;
var simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;

// KeyboardEvent.keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// KeyboardEvent.key aliases
var keyNames = {
  // #7880: IE11 and Edge use `Esc` for Escape key name.
  esc: ['Esc', 'Escape'],
  tab: 'Tab',
  enter: 'Enter',
  // #9112: IE11 uses `Spacebar` for Space key name.
  space: [' ', 'Spacebar'],
  // #7806: IE11 uses key names without `Arrow` prefix for arrow keys.
  up: ['Up', 'ArrowUp'],
  left: ['Left', 'ArrowLeft'],
  right: ['Right', 'ArrowRight'],
  down: ['Down', 'ArrowDown'],
  // #9112: IE11 uses `Del` for Delete key name.
  'delete': ['Backspace', 'Delete', 'Del']
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  isNative
) {
  var prefix = isNative ? 'nativeOn:' : 'on:';
  var staticHandlers = "";
  var dynamicHandlers = "";
  for (var name in events) {
    var handlerCode = genHandler(events[name]);
    if (events[name] && events[name].dynamic) {
      dynamicHandlers += name + "," + handlerCode + ",";
    } else {
      staticHandlers += "\"" + name + "\":" + handlerCode + ",";
    }
  }
  staticHandlers = "{" + (staticHandlers.slice(0, -1)) + "}";
  if (dynamicHandlers) {
    return prefix + "_d(" + staticHandlers + ",[" + (dynamicHandlers.slice(0, -1)) + "])"
  } else {
    return prefix + staticHandlers
  }
}

function genHandler (handler) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);
  var isFunctionInvocation = simplePathRE.test(handler.value.replace(fnInvokeRE, ''));

  if (!handler.modifiers) {
    if (isMethodPath || isFunctionExpression) {
      return handler.value
    }
    return ("function($event){" + (isFunctionInvocation ? ("return " + (handler.value)) : handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else if (key === 'exact') {
        var modifiers = (handler.modifiers);
        genModifierCode += genGuard(
          ['ctrl', 'shift', 'alt', 'meta']
            .filter(function (keyModifier) { return !modifiers[keyModifier]; })
            .map(function (keyModifier) { return ("$event." + keyModifier + "Key"); })
            .join('||')
        );
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? ("return " + (handler.value) + "($event)")
      : isFunctionExpression
        ? ("return (" + (handler.value) + ")($event)")
        : isFunctionInvocation
          ? ("return " + (handler.value))
          : handler.value;
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return (
    // make sure the key filters only apply to KeyboardEvents
    // #9441: can't use 'keyCode' in $event because Chrome autofill fires fake
    // key events that do not have keyCode property...
    "if(!$event.type.indexOf('key')&&" +
    (keys.map(genFilterCode).join('&&')) + ")return null;"
  )
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var keyCode = keyCodes[key];
  var keyName = keyNames[key];
  return (
    "_k($event.keyCode," +
    (JSON.stringify(key)) + "," +
    (JSON.stringify(keyCode)) + "," +
    "$event.key," +
    "" + (JSON.stringify(keyName)) +
    ")"
  )
}

/*  */

function on (el, dir) {
  if (dir.modifiers) {
    warn("v-on without argument does not support modifiers.");
  }
  el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  on: on,
  bind: bind$1,
  cloak: noop
};

/*  */





var CodegenState = function CodegenState (options) {
  this.options = options;
  this.warn = options.warn || baseWarn;
  this.transforms = pluckModuleFunction(options.modules, 'transformCode');
  this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
  this.directives = extend(extend({}, baseDirectives), options.directives);
  var isReservedTag = options.isReservedTag || no;
  this.maybeComponent = function (el) { return !!el.component || !isReservedTag(el.tag); };
  this.onceId = 0;
  this.staticRenderFns = [];
  this.pre = false;
};



function generate (
  ast,
  options
) {
  var state = new CodegenState(options);
  var code = ast ? genElement(ast, state) : '_c("div")';
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: state.staticRenderFns
  }
}

function genElement (el, state) {
  if (el.parent) {
    el.pre = el.pre || el.parent.pre;
  }

  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget && !state.pre) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      var data;
      if (!el.plain || (el.pre && state.maybeComponent(el))) {
        data = genData$2(el, state);
      }

      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el, state) {
  el.staticProcessed = true;
  // Some elements (templates) need to behave differently inside of a v-pre
  // node.  All pre nodes are static roots, so we can use this as a location to
  // wrap a state change and reset it upon exiting the pre node.
  var originalPreState = state.pre;
  if (el.pre) {
    state.pre = el.pre;
  }
  state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
  state.pre = originalPreState;
  return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el, state) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      state.warn(
        "v-once can only be used inside v-for that is keyed. ",
        el.rawAttrsMap['v-once']
      );
      return genElement(el, state)
    }
    return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + "," + key + ")")
  } else {
    return genStatic(el, state)
  }
}

function genIf (
  el,
  state,
  altGen,
  altEmpty
) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
}

function genIfConditions (
  conditions,
  state,
  altGen,
  altEmpty
) {
  if (!conditions.length) {
    return altEmpty || '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return altGen
      ? altGen(el, state)
      : el.once
        ? genOnce(el, state)
        : genElement(el, state)
  }
}

function genFor (
  el,
  state,
  altGen,
  altHelper
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if (state.maybeComponent(el) &&
    el.tag !== 'slot' &&
    el.tag !== 'template' &&
    !el.key
  ) {
    state.warn(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      el.rawAttrsMap['v-for'],
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return (altHelper || '_l') + "((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + ((altGen || genElement)(el, state)) +
    '})'
}

function genData$2 (el, state) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el, state);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:" + (genProps(el.attrs)) + ",";
  }
  // DOM props
  if (el.props) {
    data += "domProps:" + (genProps(el.props)) + ",";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true)) + ",";
  }
  // slot target
  // only for non-scoped slots
  if (el.slotTarget && !el.slotScope) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el, el.scopedSlots, state)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind dynamic argument wrap
  // v-bind with dynamic arguments must be applied using the same v-bind object
  // merge helper so that class/style/mustUseProp attrs are handled correctly.
  if (el.dynamicAttrs) {
    data = "_b(" + data + ",\"" + (el.tag) + "\"," + (genProps(el.dynamicAttrs)) + ")";
  }
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  // v-on data wrap
  if (el.wrapListeners) {
    data = el.wrapListeners(data);
  }
  return data
}

function genDirectives (el, state) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = state.directives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:" + (dir.isDynamicArg ? dir.arg : ("\"" + (dir.arg) + "\""))) : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el, state) {
  var ast = el.children[0];
  if (el.children.length !== 1 || ast.type !== 1) {
    state.warn(
      'Inline-template components must have exactly one child element.',
      { start: el.start }
    );
  }
  if (ast && ast.type === 1) {
    var inlineRenderFns = generate(ast, state.options);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (
  el,
  slots,
  state
) {
  // by default scoped slots are considered "stable", this allows child
  // components with only scoped slots to skip forced updates from parent.
  // but in some cases we have to bail-out of this optimization
  // for example if the slot contains dynamic names, has v-if or v-for on them...
  var needsForceUpdate = el.for || Object.keys(slots).some(function (key) {
    var slot = slots[key];
    return (
      slot.slotTargetDynamic ||
      slot.if ||
      slot.for ||
      containsSlotChild(slot) // is passing down slot from parent which may be dynamic
    )
  });

  // #9534: if a component with scoped slots is inside a conditional branch,
  // it's possible for the same component to be reused but with different
  // compiled slot content. To avoid that, we generate a unique key based on
  // the generated code of all the slot contents.
  var needsKey = !!el.if;

  // OR when it is inside another scoped slot or v-for (the reactivity may be
  // disconnected due to the intermediate scope variable)
  // #9438, #9506
  // TODO: this can be further optimized by properly analyzing in-scope bindings
  // and skip force updating ones that do not actually use scope variables.
  if (!needsForceUpdate) {
    var parent = el.parent;
    while (parent) {
      if (
        (parent.slotScope && parent.slotScope !== emptySlotScopeToken) ||
        parent.for
      ) {
        needsForceUpdate = true;
        break
      }
      if (parent.if) {
        needsKey = true;
      }
      parent = parent.parent;
    }
  }

  var generatedSlots = Object.keys(slots)
    .map(function (key) { return genScopedSlot(slots[key], state); })
    .join(',');

  return ("scopedSlots:_u([" + generatedSlots + "]" + (needsForceUpdate ? ",null,true" : "") + (!needsForceUpdate && needsKey ? (",null,false," + (hash(generatedSlots))) : "") + ")")
}

function hash(str) {
  var hash = 5381;
  var i = str.length;
  while(i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }
  return hash >>> 0
}

function containsSlotChild (el) {
  if (el.type === 1) {
    if (el.tag === 'slot') {
      return true
    }
    return el.children.some(containsSlotChild)
  }
  return false
}

function genScopedSlot (
  el,
  state
) {
  var isLegacySyntax = el.attrsMap['slot-scope'];
  if (el.if && !el.ifProcessed && !isLegacySyntax) {
    return genIf(el, state, genScopedSlot, "null")
  }
  if (el.for && !el.forProcessed) {
    return genFor(el, state, genScopedSlot)
  }
  var slotScope = el.slotScope === emptySlotScopeToken
    ? ""
    : String(el.slotScope);
  var fn = "function(" + slotScope + "){" +
    "return " + (el.tag === 'template'
      ? el.if && isLegacySyntax
        ? ("(" + (el.if) + ")?" + (genChildren(el, state) || 'undefined') + ":undefined")
        : genChildren(el, state) || 'undefined'
      : genElement(el, state)) + "}";
  // reverse proxy v-slot without scope on this.$slots
  var reverseProxy = slotScope ? "" : ",proxy:true";
  return ("{key:" + (el.slotTarget || "\"default\"") + ",fn:" + fn + reverseProxy + "}")
}

function genChildren (
  el,
  state,
  checkSkip,
  altGenElement,
  altGenNode
) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      var normalizationType = checkSkip
        ? state.maybeComponent(el$1) ? ",1" : ",0"
        : "";
      return ("" + ((altGenElement || genElement)(el$1, state)) + normalizationType)
    }
    var normalizationType$1 = checkSkip
      ? getNormalizationType(children, state.maybeComponent)
      : 0;
    var gen = altGenNode || genNode;
    return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType$1 ? ("," + normalizationType$1) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (
  children,
  maybeComponent
) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function genNode (node, state) {
  if (node.type === 1) {
    return genElement(node, state)
  } else if (node.type === 3 && node.isComment) {
    return genComment(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genComment (comment) {
  return ("_e(" + (JSON.stringify(comment.text)) + ")")
}

function genSlot (el, state) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el, state);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs || el.dynamicAttrs
    ? genProps((el.attrs || []).concat(el.dynamicAttrs || []).map(function (attr) { return ({
        // slot props are camelized
        name: camelize(attr.name),
        value: attr.value,
        dynamic: attr.dynamic
      }); }))
    : null;
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (
  componentName,
  el,
  state
) {
  var children = el.inlineTemplate ? null : genChildren(el, state, true);
  return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var staticProps = "";
  var dynamicProps = "";
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    var value = transformSpecialNewlines(prop.value);
    if (prop.dynamic) {
      dynamicProps += (prop.name) + "," + value + ",";
    } else {
      staticProps += "\"" + (prop.name) + "\":" + value + ",";
    }
  }
  staticProps = "{" + (staticProps.slice(0, -1)) + "}";
  if (dynamicProps) {
    return ("_d(" + staticProps + ",[" + (dynamicProps.slice(0, -1)) + "])")
  } else {
    return staticProps
  }
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */



// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast, warn) {
  if (ast) {
    checkNode(ast, warn);
  }
}

function checkNode (node, warn) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          var range = node.rawAttrsMap[name];
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), warn, range);
          } else if (name === 'v-slot' || name[0] === '#') {
            checkFunctionParameterExpression(value, (name + "=\"" + value + "\""), warn, range);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), warn, range);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), warn, range);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], warn);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, warn, node);
  }
}

function checkEvent (exp, text, warn, range) {
  var stripped = exp.replace(stripStringRE, '');
  var keywordMatch = stripped.match(unaryOperatorsRE);
  if (keywordMatch && stripped.charAt(keywordMatch.index - 1) !== '$') {
    warn(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim()),
      range
    );
  }
  checkExpression(exp, text, warn, range);
}

function checkFor (node, text, warn, range) {
  checkExpression(node.for || '', text, warn, range);
  checkIdentifier(node.alias, 'v-for alias', text, warn, range);
  checkIdentifier(node.iterator1, 'v-for iterator', text, warn, range);
  checkIdentifier(node.iterator2, 'v-for iterator', text, warn, range);
}

function checkIdentifier (
  ident,
  type,
  text,
  warn,
  range
) {
  if (typeof ident === 'string') {
    try {
      new Function(("var " + ident + "=_"));
    } catch (e) {
      warn(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())), range);
    }
  }
}

function checkExpression (exp, text, warn, range) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      warn(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\"\n  Raw expression: " + (text.trim()),
        range
      );
    } else {
      warn(
        "invalid expression: " + (e.message) + " in\n\n" +
        "    " + exp + "\n\n" +
        "  Raw expression: " + (text.trim()) + "\n",
        range
      );
    }
  }
}

function checkFunctionParameterExpression (exp, text, warn, range) {
  try {
    new Function(exp, '');
  } catch (e) {
    warn(
      "invalid function parameter expression: " + (e.message) + " in\n\n" +
      "    " + exp + "\n\n" +
      "  Raw expression: " + (text.trim()) + "\n",
      range
    );
  }
}

/*  */

var range = 2;

function generateCodeFrame (
  source,
  start,
  end
) {
  if ( start === void 0 ) start = 0;
  if ( end === void 0 ) end = source.length;

  var lines = source.split(/\r?\n/);
  var count = 0;
  var res = [];
  for (var i = 0; i < lines.length; i++) {
    count += lines[i].length + 1;
    if (count >= start) {
      for (var j = i - range; j <= i + range || end > count; j++) {
        if (j < 0 || j >= lines.length) { continue }
        res.push(("" + (j + 1) + (repeat$1(" ", 3 - String(j + 1).length)) + "|  " + (lines[j])));
        var lineLength = lines[j].length;
        if (j === i) {
          // push underline
          var pad = start - (count - lineLength) + 1;
          var length = end > count ? lineLength - pad : end - start;
          res.push("   |  " + repeat$1(" ", pad) + repeat$1("^", length));
        } else if (j > i) {
          if (end > count) {
            var length$1 = Math.min(end - count, lineLength);
            res.push("   |  " + repeat$1("^", length$1));
          }
          count += lineLength + 1;
        }
      }
      break
    }
  }
  return res.join('\n')
}

function repeat$1 (str, n) {
  var result = '';
  if (n > 0) {
    while (true) { // eslint-disable-line
      if (n & 1) { result += str; }
      n >>>= 1;
      if (n <= 0) { break }
      str += str;
    }
  }
  return result
}

/*  */



function createFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompileToFunctionFn (compile) {
  var cache = Object.create(null);

  return function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = extend({}, options);
    var warn$$1 = options.warn || warn;
    delete options.warn;

    /* istanbul ignore if */
    {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn$$1(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (cache[key]) {
      return cache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    {
      if (compiled.errors && compiled.errors.length) {
        if (options.outputSourceRange) {
          compiled.errors.forEach(function (e) {
            warn$$1(
              "Error compiling template:\n\n" + (e.msg) + "\n\n" +
              generateCodeFrame(template, e.start, e.end),
              vm
            );
          });
        } else {
          warn$$1(
            "Error compiling template:\n\n" + template + "\n\n" +
            compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
            vm
          );
        }
      }
      if (compiled.tips && compiled.tips.length) {
        if (options.outputSourceRange) {
          compiled.tips.forEach(function (e) { return tip(e.msg, vm); });
        } else {
          compiled.tips.forEach(function (msg) { return tip(msg, vm); });
        }
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors)
    });

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn$$1(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (cache[key] = res)
  }
}

/*  */

function createCompilerCreator (baseCompile) {
  return function createCompiler (baseOptions) {
    function compile (
      template,
      options
    ) {
      var finalOptions = Object.create(baseOptions);
      var errors = [];
      var tips = [];

      var warn = function (msg, range, tip) {
        (tip ? tips : errors).push(msg);
      };

      if (options) {
        if (options.outputSourceRange) {
          // $flow-disable-line
          var leadingSpaceLength = template.match(/^\s*/)[0].length;

          warn = function (msg, range, tip) {
            var data = { msg: msg };
            if (range) {
              if (range.start != null) {
                data.start = range.start + leadingSpaceLength;
              }
              if (range.end != null) {
                data.end = range.end + leadingSpaceLength;
              }
            }
            (tip ? tips : errors).push(data);
          };
        }
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules);
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives || null),
            options.directives
          );
        }
        // copy other options
        for (var key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key];
          }
        }
      }

      finalOptions.warn = warn;

      var compiled = baseCompile(template.trim(), finalOptions);
      {
        detectErrors(compiled.ast, warn);
      }
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled
    }

    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}

/*  */

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
var createCompiler = createCompilerCreator(function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  if (options.optimize !== false) {
    optimize(ast, options);
  }
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
});

/*  */

var ref$1 = createCompiler(baseOptions);
var compile = ref$1.compile;
var compileToFunctions = ref$1.compileToFunctions;

/*  */

// check whether current browser encodes a char inside attribute values
var div;
function getShouldDecode (href) {
  div = div || document.createElement('div');
  div.innerHTML = href ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>";
  return div.innerHTML.indexOf('&#10;') > 0
}

// #3663: IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
// #6828: chrome encodes content in a[href]
var shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue.prototype.$mount;
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if (!template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if (config.performance && mark) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        outputSourceRange: "development" !== 'production',
        shouldDecodeNewlines: shouldDecodeNewlines,
        shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if (config.performance && mark) {
        mark('compile end');
        measure(("vue " + (this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue.compile = compileToFunctions;

module.exports = Vue;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../../timers-browserify/main.js */ "./node_modules/timers-browserify/main.js").setImmediate))

/***/ }),

/***/ "./node_modules/vue/dist/vue.common.js":
/*!*********************************************!*\
  !*** ./node_modules/vue/dist/vue.common.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

if (false) {} else {
  module.exports = __webpack_require__(/*! ./vue.common.dev.js */ "./node_modules/vue/dist/vue.common.dev.js")
}


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Application__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Application */ "./src/components/Application.vue");


window.axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
window.$ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
new vue__WEBPACK_IMPORTED_MODULE_0___default.a({
  el: '#app',
  components: {
    Application: _components_Application__WEBPACK_IMPORTED_MODULE_1__["default"]
  }
});

/***/ }),

/***/ "./src/app.scss":
/*!**********************!*\
  !*** ./src/app.scss ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/components/Application.vue":
/*!****************************************!*\
  !*** ./src/components/Application.vue ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Application_vue_vue_type_template_id_b02fc960___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Application.vue?vue&type=template&id=b02fc960& */ "./src/components/Application.vue?vue&type=template&id=b02fc960&");
/* harmony import */ var _Application_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Application.vue?vue&type=script&lang=js& */ "./src/components/Application.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Application_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Application_vue_vue_type_template_id_b02fc960___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Application_vue_vue_type_template_id_b02fc960___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/Application.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/Application.vue?vue&type=script&lang=js&":
/*!*****************************************************************!*\
  !*** ./src/components/Application.vue?vue&type=script&lang=js& ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Application_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--4-0!../../node_modules/vue-loader/lib??vue-loader-options!./Application.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Application.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Application_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/Application.vue?vue&type=template&id=b02fc960&":
/*!***********************************************************************!*\
  !*** ./src/components/Application.vue?vue&type=template&id=b02fc960& ***!
  \***********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Application_vue_vue_type_template_id_b02fc960___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./Application.vue?vue&type=template&id=b02fc960& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Application.vue?vue&type=template&id=b02fc960&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Application_vue_vue_type_template_id_b02fc960___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Application_vue_vue_type_template_id_b02fc960___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 0:
/*!*****************************************!*\
  !*** multi ./src/app.js ./src/app.scss ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/farrukh/Desktop/rastamojka/src/app.js */"./src/app.js");
module.exports = __webpack_require__(/*! /Users/farrukh/Desktop/rastamojka/src/app.scss */"./src/app.scss");


/***/ })

/******/ });