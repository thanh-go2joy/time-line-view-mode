/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "js/" + ({"404":"404"}[chunkId]||chunkId) + ".js"
/******/ 	}
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
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
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
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"chunk-vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=style&index=0&id=7ba5bd90&lang=scss&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=style&index=0&id=7ba5bd90&lang=scss& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../node_modules/@vue/cli-service/node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/@vue/cli-service/node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \".app {\\n  font-family: \\\"Muli\\\", sans-serif;\\n  color: #2c3e50;\\n}\\n@media (max-width: 768px) {\\n.el-select-dropdown {\\n    width: 88%;\\n    left: 22px;\\n}\\n.el-date-range-picker {\\n    left: 0 !important;\\n    width: 100% !important;\\n    overflow-x: scroll !important;\\n}\\n}\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/App.vue?./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/components/SaHeader.vue?vue&type=style&index=0&id=181455aa&lang=scss&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/components/SaHeader.vue?vue&type=style&index=0&id=181455aa&lang=scss&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/@vue/cli-service/node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/@vue/cli-service/node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \".custom-button[data-v-181455aa] {\\n  font-size: initial;\\n  border: none;\\n  cursor: pointer;\\n}\\n.el-popper .el-dropdown-menu__item[data-v-181455aa] {\\n  display: flex;\\n  align-items: center;\\n  justify-content: flex-start;\\n}\\n.el-popper .el-dropdown-menu__item img[data-v-181455aa] {\\n  padding-right: 10px;\\n}\\n.header-bar[data-v-181455aa] {\\n  display: flex;\\n  justify-content: space-between;\\n  align-items: center;\\n  height: 100%;\\n}\\n.header-bar .dropdown-item i[data-v-181455aa] {\\n  margin-right: 10px;\\n}\\n.header-bar .header-image[data-v-181455aa] {\\n  width: 46px;\\n  transition: width 0.5s;\\n}\\n.header-bar .header-image.is-expend[data-v-181455aa] {\\n  width: 206px;\\n}\\n.header-bar .logo-big[data-v-181455aa],\\n.header-bar .logo-small[data-v-181455aa] {\\n  height: 36px;\\n  padding-top: 4px;\\n  -o-object-fit: scale-down;\\n     object-fit: scale-down;\\n}\\n.header-bar .btn-toggle[data-v-181455aa] {\\n  flex: 1;\\n  text-align: left;\\n}\\n.header-bar .btn-toggle--container[data-v-181455aa] {\\n  border-radius: 4px;\\n  display: flex;\\n  width: 32px;\\n  height: 32px;\\n  align-items: center;\\n  justify-content: center;\\n  transition: all 0.1s ease-in;\\n}\\n.header-bar .btn-toggle--container[data-v-181455aa]:hover {\\n  background-color: rgba(129, 167, 205, 0.1);\\n}\\n.header-bar .btn-toggle--container i[data-v-181455aa] {\\n  cursor: pointer;\\n  font-size: 20px;\\n  color: #ff6400;\\n}\\n.header-bar .language-account-info[data-v-181455aa] {\\n  display: flex;\\n  justify-content: space-between;\\n  align-items: center;\\n}\\n.header-bar .language-account-info .language[data-v-181455aa] {\\n  padding-right: 12px;\\n}\\n.header-bar .language-account-info .language img[data-v-181455aa] {\\n  cursor: pointer;\\n}\\n.header-image .logo-small[data-v-181455aa] {\\n  opacity: 0;\\n  height: 0px;\\n  transition: opacity 0.5s, height 1s 0.5s;\\n}\\n.header-image .logo-small.active[data-v-181455aa] {\\n  opacity: 1;\\n  height: 36px;\\n  transition: opacity 0.5s;\\n}\\n.header-image .logo-big[data-v-181455aa] {\\n  opacity: 0;\\n  height: 0px;\\n  transition: opacity 0.5s, height 0.5s;\\n}\\n.header-image .logo-big.active[data-v-181455aa] {\\n  opacity: 1;\\n  height: 36px;\\n  transition: opacity 0.5s, height 0.5s;\\n}\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/components/SaHeader.vue?./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/components/SaSidebar.vue?vue&type=style&index=0&id=2e55322e&lang=scss&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/components/SaSidebar.vue?vue&type=style&index=0&id=2e55322e&lang=scss& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/@vue/cli-service/node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/@vue/cli-service/node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \".no-permission {\\n  display: none !important;\\n}\\n.my-side-bar .el-submenu__icon-arrow {\\n  display: none;\\n}\\n.my-side-bar.active .el-submenu__icon-arrow {\\n  display: unset;\\n}\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/components/SaSidebar.vue?./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/components/SaSidebar.vue?vue&type=style&index=1&id=2e55322e&lang=scss&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/components/SaSidebar.vue?vue&type=style&index=1&id=2e55322e&lang=scss&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/@vue/cli-service/node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/@vue/cli-service/node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \".el-menu-vertical[data-v-2e55322e]:not(.el-menu--collapse) {\\n  width: 64px;\\n  transition: width 0.5s;\\n}\\n.el-menu-vertical:not(.el-menu--collapse).active[data-v-2e55322e] {\\n  width: 226px;\\n}\\n.el-image[data-v-2e55322e] {\\n  height: 100%;\\n  width: 170px;\\n  padding-top: 10px;\\n  padding-left: 10px;\\n}\\n.el-submenu .el-menu-item[data-v-2e55322e] {\\n  min-width: auto;\\n}\\n.el-menu[data-v-2e55322e] {\\n  height: auto;\\n  min-height: 100vh;\\n}\\n.el-menu .menu-image[data-v-2e55322e] {\\n  display: inline-block;\\n  width: 20px;\\n  vertical-align: middle;\\n  margin-right: 10px;\\n  filter: invert(0.6) sepia(1) saturate(1) hue-rotate(185deg);\\n}\\n.el-menu .el-menu-item[data-v-2e55322e] {\\n  padding: 0;\\n}\\n.el-menu .el-menu-item .el-tooltip[data-v-2e55322e] {\\n  padding: 14px 20px !important;\\n}\\n.el-menu .el-menu-item a[data-v-2e55322e] {\\n  width: 100%;\\n  height: 100%;\\n  display: block;\\n  color: #263a5b;\\n}\\n.el-submenu.is-active .submenu-title[data-v-2e55322e],\\n.el-submenu.is-active .router-link-active[data-v-2e55322e],\\n.el-menu-item.is-active .submenu-title[data-v-2e55322e],\\n.el-menu-item.is-active .router-link-active[data-v-2e55322e] {\\n  color: #ff6400;\\n}\\n.el-submenu.is-active .menu-image[data-v-2e55322e],\\n.el-menu-item.is-active .menu-image[data-v-2e55322e] {\\n  filter: invert(40%) sepia(67%) saturate(3335%) hue-rotate(5deg) brightness(95%) contrast(102%) !important;\\n}\\n.submenu-title[data-v-2e55322e],\\n.router-children[data-v-2e55322e] {\\n  width: 0px;\\n  opacity: 0;\\n  transition: width 0.01s 0s, opacity 0.1s 0.2s;\\n}\\n.submenu-title.active[data-v-2e55322e],\\n.router-children.active[data-v-2e55322e] {\\n  width: 226px;\\n  opacity: 1;\\n}\\n.el-menu-item.is-active .router-children[data-v-2e55322e] {\\n  color: #ff6400;\\n}\\n.el-submenu:hover .submenu-title[data-v-2e55322e], .el-menu-item:hover .submenu-title[data-v-2e55322e] {\\n  color: #ff6400;\\n}\\n.el-submenu:hover .menu-image[data-v-2e55322e], .el-menu-item:hover .menu-image[data-v-2e55322e] {\\n  filter: invert(40%) sepia(67%) saturate(3335%) hue-rotate(5deg) brightness(95%) contrast(102%) !important;\\n}\\n.el-menu-item:hover .router-children[data-v-2e55322e] {\\n  color: #ff6400;\\n}\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/components/SaSidebar.vue?./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/components/SaTopBar.vue?vue&type=style&index=0&id=3addd89c&lang=scss&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/components/SaTopBar.vue?vue&type=style&index=0&id=3addd89c&lang=scss&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/@vue/cli-service/node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/@vue/cli-service/node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \".sa-topbar[data-v-3addd89c] {\\n  padding: 20px;\\n}\\n.sa-topbar__title[data-v-3addd89c] {\\n  font-size: 18px;\\n  color: #263a5b;\\n  margin-bottom: 5px;\\n  margin-top: 0;\\n  font-weight: 600;\\n}\\n.sa-topbar__path[data-v-3addd89c] {\\n  display: flex;\\n  align-items: center;\\n  flex-wrap: wrap;\\n}\\n@media (min-width: 640px) {\\n.sa-topbar__path[data-v-3addd89c] {\\n    margin-left: 26px;\\n}\\n}\\n.sa-topbar__path--back[data-v-3addd89c] {\\n  color: #8A98AC;\\n  font-weight: 600;\\n}\\n.sa-topbar i[data-v-3addd89c] {\\n  margin: 0 8px;\\n  font-size: 12px;\\n}\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/components/SaTopBar.vue?./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/layouts/guest.vue?vue&type=style&index=0&id=64c946c9&lang=scss&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/layouts/guest.vue?vue&type=style&index=0&id=64c946c9&lang=scss&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/@vue/cli-service/node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/@vue/cli-service/node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \".login[data-v-64c946c9] .el-dialog__header {\\n  display: none;\\n}\\n.login[data-v-64c946c9] .el-dialog__body {\\n  padding: 20px;\\n}\\n.login[data-v-64c946c9] .el-icon-close {\\n  display: none;\\n}\\n.login[data-v-64c946c9] .el-dialog {\\n  position: relative;\\n  margin: 0 auto 50px;\\n  border-radius: 2px;\\n  box-sizing: border-box;\\n  width: 90%;\\n}\\n@media (min-width: 640px) {\\n.login[data-v-64c946c9] .el-dialog {\\n    width: 30%;\\n}\\n}\\n.login[data-v-64c946c9] .el-link {\\n  color: #ff6400;\\n}\\n.login[data-v-64c946c9] .el-link:hover {\\n  color: #ff6400;\\n}\\n.login[data-v-64c946c9] .login__logo {\\n  width: 60%;\\n  -o-object-fit: scale-down;\\n     object-fit: scale-down;\\n  margin: 0 auto;\\n}\\n.login[data-v-64c946c9] .login__title {\\n  color: #ff6400;\\n  font-size: 22px;\\n}\\n.login[data-v-64c946c9] .login__form .el-input {\\n  padding: 6px 0;\\n}\\n.login[data-v-64c946c9] .login__form input:focus {\\n  border-color: red;\\n}\\n.login[data-v-64c946c9] .el-button.is-loading {\\n  padding: 12px 20px;\\n}\\n.login .login__forget[data-v-64c946c9] {\\n  padding: 10px 0;\\n  display: flex;\\n  justify-content: space-between;\\n}\\n.login .login__forget--color[data-v-64c946c9]:hover {\\n  color: #ff6400;\\n}\\n.login .login__forget .el-checkbox__input.is-checked .el-checkbox__inner[data-v-64c946c9] {\\n  background-color: #ff6400;\\n  border-color: #ff6400;\\n}\\n.login .login__forget .el-checkbox__input.is-checked + .el-checkbox__label[data-v-64c946c9] {\\n  color: #ff6400;\\n}\\n.login[data-v-64c946c9] .login__button {\\n  padding: 10px 0;\\n}\\n.login[data-v-64c946c9] .login__button button {\\n  width: 100%;\\n  background: #ff6400;\\n}\\n.login[data-v-64c946c9] .login__button button:hover {\\n  background: #ff6400;\\n}\\n.login[data-v-64c946c9] .login__button button:focus {\\n  background: #ff6400;\\n}\\n.login[data-v-64c946c9] .login__button p {\\n  padding: 12px;\\n}\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/layouts/guest.vue?./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/layouts/member.vue?vue&type=style&index=0&id=4f9598f9&lang=scss&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/layouts/member.vue?vue&type=style&index=0&id=4f9598f9&lang=scss&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/@vue/cli-service/node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/@vue/cli-service/node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \".member-layout[data-v-4f9598f9] {\\n  min-height: 100vh;\\n}\\n.member-layout .el-container[data-v-4f9598f9] {\\n  min-height: 100vh;\\n}\\n.member-layout[data-v-4f9598f9] .el-main {\\n  padding: 12px 8px 0 12px;\\n}\\n.member-layout[data-v-4f9598f9] .el-main .el-pagination {\\n  margin-top: 0.5em;\\n}\\n@media (max-width: 768px) {\\n.member-layout[data-v-4f9598f9] .el-main .el-pagination {\\n    display: flex;\\n    align-items: center;\\n    justify-content: center;\\n}\\n.member-layout[data-v-4f9598f9] .el-main .el-pagination .el-pagination__total,\\n.member-layout[data-v-4f9598f9] .el-main .el-pagination .el-pagination__jump,\\n.member-layout[data-v-4f9598f9] .el-main .el-pagination .el-pagination__sizes {\\n    display: none;\\n}\\n}\\n.member-layout__header[data-v-4f9598f9] {\\n  width: calc(100% - 193px);\\n  right: 0;\\n  top: 0;\\n  position: fixed;\\n  background: #FFFFFF;\\n  width: 100%;\\n  z-index: 101;\\n  padding: 0 30px 0 12px;\\n}\\n.member-layout__aside[data-v-4f9598f9] {\\n  z-index: 101;\\n  position: fixed;\\n  text-align: left;\\n  min-height: 100vh;\\n  width: 0 !important;\\n  transition: width 0.2s;\\n  padding-top: 57px;\\n  top: 0;\\n  bottom: 0;\\n  overflow-y: scroll;\\n  overflow-x: hidden;\\n}\\n.member-layout__aside[data-v-4f9598f9]::-webkit-scrollbar {\\n  width: 1px;\\n}\\n@media (max-width: 766px) {\\n.member-layout__aside[data-v-4f9598f9] {\\n    z-index: 2001;\\n}\\n}\\n.member-layout__aside.active[data-v-4f9598f9] {\\n  width: 228px !important;\\n}\\n.member-layout__main[data-v-4f9598f9] {\\n  margin-top: 60px;\\n  flex: 1;\\n  background-color: #f2f5fa;\\n  display: flex;\\n  flex-direction: column;\\n  transition: width 0s 5s;\\n}\\n.member-layout__topbar[data-v-4f9598f9] {\\n  background-color: #FFFFFF;\\n  margin-bottom: 12px;\\n}\\n.member-layout__content[data-v-4f9598f9] {\\n  flex: 1;\\n  display: flex;\\n  flex-direction: column;\\n}\\n.member-layout__footer[data-v-4f9598f9] {\\n  background-color: #FFFFFF;\\n  display: flex;\\n  align-items: center;\\n  justify-content: center;\\n  height: 40px;\\n  margin-top: 12px;\\n}\\n@media (min-width: 766px) {\\n.member-layout__aside[data-v-4f9598f9] {\\n    width: 6% !important;\\n}\\n.member-layout__main[data-v-4f9598f9] {\\n    margin-left: 64px;\\n    transition: all 0.5s ease;\\n    height: 100%;\\n}\\n.member-layout__main.active[data-v-4f9598f9] {\\n    margin-left: 220px;\\n}\\n.member-layout__main.active ~ .footer-section[data-v-4f9598f9] {\\n    margin-left: 200px;\\n    transition: all 0.5s ease;\\n}\\n}\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/layouts/member.vue?./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./src/assets/styles/main.scss":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??ref--9-oneOf-3-1!./node_modules/postcss-loader/src??ref--9-oneOf-3-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-3-3!./src/assets/styles/main.scss ***!
  \****************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/@vue/cli-service/node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/@vue/cli-service/node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\nexports.push([module.i, \"@import url(https://fonts.googleapis.com/css?family=Muli:400,600,700&display=swap);\"]);\n// Module\nexports.push([module.i, \"@charset \\\"UTF-8\\\";\\nhtml,\\nbody,\\ndiv,\\nspan,\\napplet,\\nobject,\\niframe,\\nh1,\\nh2,\\nh3,\\nh4,\\nh5,\\nh6,\\np,\\nblockquote,\\npre,\\na,\\nabbr,\\nacronym,\\naddress,\\nbig,\\ncite,\\ncode,\\ndel,\\ndfn,\\nem,\\nimg,\\nins,\\nkbd,\\nq,\\ns,\\nsamp,\\nsmall,\\nstrike,\\nstrong,\\nsub,\\nsup,\\ntt,\\nvar,\\nb,\\nu,\\ni,\\ncenter,\\ndl,\\ndt,\\ndd,\\nfieldset,\\nform,\\nlabel,\\nlegend,\\ntable,\\ncaption,\\ntbody,\\ntfoot,\\nthead,\\ntr,\\nth,\\ntd,\\narticle,\\naside,\\ncanvas,\\ndetails,\\nembed,\\nfigure,\\nfigcaption,\\nfooter,\\nheader,\\nhgroup,\\nmenu,\\nnav,\\noutput,\\nruby,\\nsection,\\nsummary,\\ntime,\\nmark,\\naudio,\\nvideo,\\n.el-popper {\\n  margin: 0;\\n  padding: 0;\\n  border: 0;\\n  font-size: 100%;\\n  font: inherit; /* Thay ?????i font cho global */\\n  vertical-align: baseline;\\n  text-decoration: none;\\n}\\n\\nul {\\n  list-style: none !important;\\n  padding: 0;\\n  margin: 0;\\n}\\n\\n* {\\n  box-sizing: border-box;\\n  line-height: 1.5;\\n}\\n\\nhtml {\\n  font-size: 14px;\\n  height: 100%;\\n}\\n\\nbody {\\n  font-family: Muli;\\n  position: relative;\\n  width: 100%;\\n  min-height: 100%;\\n  overflow-x: hidden;\\n}\\n\\n.el-table .cell {\\n  word-break: break-word;\\n}\\n.el-table th {\\n  font-weight: 900;\\n  color: #252222;\\n}\\n\\np.text-word-break {\\n  word-break: break-word;\\n}\\n\\ntable {\\n  width: 100%;\\n  border-collapse: collapse;\\n}\\n\\na, a:active {\\n  color: #007bff;\\n}\\n\\n.table-components {\\n  overflow-x: scroll;\\n}\\n.table-components th,\\n.table-components td {\\n  padding: 12px 8px;\\n  border-bottom: 1px solid #ebeef5;\\n  text-align: left;\\n}\\n.table-components .el-form--inline {\\n  text-align: left;\\n}\\n.table-components .el-form--inline .el-form-item {\\n  margin-right: 12px;\\n}\\n.table-components .custom-scroll-bar-x::-webkit-scrollbar {\\n  -webkit-appearance: none;\\n  width: 8px;\\n}\\n.table-components .custom-scroll-bar-x::-webkit-scrollbar-thumb {\\n  border-radius: 10px;\\n  margin: 5px 0;\\n  background-color: rgba(0, 0, 0, 0.5);\\n  box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);\\n}\\n.table-components .custom-scroll-bar-x::-webkit-scrollbar-thumb:hover {\\n  width: 12px;\\n  background: #999999;\\n}\\n.table-components::-webkit-scrollbar {\\n  -webkit-appearance: none;\\n  height: 8px;\\n}\\n.table-components::-webkit-scrollbar-thumb {\\n  border-radius: 10px;\\n  margin: 5px 0;\\n  background-color: rgba(0, 0, 0, 0.5);\\n  box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);\\n}\\n.table-components::-webkit-scrollbar-thumb:hover {\\n  width: 12px;\\n  background: #999999;\\n}\\n\\n.pagination {\\n  text-align: left;\\n  margin-top: 12px;\\n}\\n\\n.operations {\\n  padding: 12px;\\n}\\n\\n#preview {\\n  width: 200px;\\n  border: 1px solid;\\n  height: 100px;\\n  display: inline-table;\\n}\\n#preview img {\\n  max-width: 200px;\\n  display: inline;\\n  height: auto;\\n  -o-object-fit: scale-down;\\n     object-fit: scale-down;\\n}\\n\\n.float-right {\\n  float: right;\\n}\\n\\n.float-left {\\n  float: left;\\n}\\n\\n[class*=el-col-] {\\n  padding: 10px;\\n  text-align: left;\\n}\\n\\n.text-danger {\\n  color: #f56c6c;\\n}\\n\\n.bold {\\n  font-weight: bold;\\n}\\n\\n.disappear {\\n  display: none !important;\\n}\\n\\n.disabled {\\n  pointer-events: none;\\n  opacity: 0.4;\\n}\\n\\n.link-disabled,\\n.link-disabled:active,\\n.link-disabled:visited {\\n  pointer-events: none;\\n  color: #786b6a;\\n}\\n\\n.tag-custom {\\n  margin-right: 12px;\\n}\\n\\n.disable-label .el-radio__label {\\n  display: none;\\n}\\n\\n.padding-none {\\n  padding: 0px;\\n}\\n\\n.el-form-item.is-required > .el-form-item__label::after, .el-form-item.is-required .el-form-item__label-wrap > .el-form-item__label::after {\\n  content: \\\"*\\\";\\n  color: #f56c6c;\\n  margin-left: 4px;\\n}\\n\\n.el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label-wrap > .el-form-item__label:before,\\n.el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {\\n  content: \\\"\\\";\\n  color: #F56C6C;\\n  margin-right: 4px;\\n}\\n\\n@media (max-width: 425px) {\\n  .my-popover .options {\\n    left: unset;\\n    transform: unset;\\n  }\\n}\\n@media (max-width: 635px) {\\n  .custom-pagination .el-pagination__jump,\\n.custom-pagination .el-pagination__sizes {\\n    display: block !important;\\n    margin: 8px 0;\\n  }\\n  .el-range-editor {\\n    width: 80% !important;\\n  }\\n  .custom-date-range.el-date-range-picker {\\n    width: 80% !important;\\n    left: 10% !important;\\n  }\\n  .custom-date-range .el-date-range-picker .el-picker-panel__body {\\n    display: flex !important;\\n    flex-direction: column !important;\\n  }\\n  .custom-date-range .el-date-range-picker__content {\\n    float: unset !important;\\n    width: 100% !important;\\n  }\\n  .custom-date-range.el-date-range-picker .el-picker-panel__body {\\n    min-width: unset;\\n  }\\n  .el-menu {\\n    height: unset !important;\\n  }\\n}\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/assets/styles/main.scss?./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??ref--9-oneOf-3-1!./node_modules/postcss-loader/src??ref--9-oneOf-3-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-3-3");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _layouts_member_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layouts/member.vue */ \"./src/layouts/member.vue\");\n/* harmony import */ var _layouts_guest_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layouts/guest.vue */ \"./src/layouts/guest.vue\");\n/* harmony import */ var _utils_localStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/localStorage */ \"./src/utils/localStorage.js\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'SaApp',\n  components: {\n    MemberLayout: _layouts_member_vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n    GuestLayout: _layouts_guest_vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n  },\n  data: function data() {\n    return {\n      layout: ''\n    };\n  },\n  created: function created() {\n    this.setLayout();\n  },\n  methods: {\n    setLayout: function setLayout() {\n      var token = Object(_utils_localStorage__WEBPACK_IMPORTED_MODULE_2__[\"getLocalStorageWithExpiry\"])('access_token');\n      this.layout = token ? 'member-layout' : 'guest-layout';\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/App.vue?./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/components/SaHeader.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/components/SaHeader.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/asyncToGenerator.js\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _plugins_eventBus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/plugins/eventBus */ \"./src/plugins/eventBus.js\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'Headerbar',\n  props: {\n    expend: Boolean\n  },\n  computed: {\n    isExpend: {\n      get: function get() {\n        return this.expend;\n      },\n      set: function set(val) {\n        this.$emit('expended', val);\n      }\n    }\n  },\n  data: function data() {\n    return {\n      languages: [{\n        flag: 'us',\n        language: 'en',\n        title: 'English'\n      }, {\n        flag: 'vn',\n        language: 'vi',\n        title: 'Vietnamese'\n      }],\n      flag: localStorage.getItem('lang') ? localStorage.getItem('lang') : 'vi',\n      accountInfo: [{\n        direct: '/hotel/sadmin/profile',\n        title: 'breadcrumb.my_profile',\n        icon: 'el-icon-user'\n      }, {\n        direct: '/sign-in',\n        title: 'breadcrumb.logout',\n        icon: 'el-icon-switch-button'\n      }],\n      userName: ''\n    };\n  },\n  created: function created() {\n    this.userName = JSON.parse(localStorage.getItem('profile')).value.fullName;\n  },\n  mounted: function mounted() {\n    _plugins_eventBus__WEBPACK_IMPORTED_MODULE_2__[\"default\"].$on('changeProfileInfo', this.handler);\n  },\n  methods: {\n    changeLocale: function changeLocale(locale) {\n      this._i18n.locale = locale;\n      this.flag = locale;\n      localStorage.setItem('lang', locale);\n    },\n    onDirect: function onDirect(value) {\n      var _this = this;\n      return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee() {\n        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {\n          while (1) {\n            switch (_context.prev = _context.next) {\n              case 0:\n                if (!(value === '/sign-in')) {\n                  _context.next = 8;\n                  break;\n                }\n                _context.next = 3;\n                return localStorage.removeItem('access_token');\n              case 3:\n                _context.next = 5;\n                return localStorage.removeItem('profile');\n              case 5:\n                _this.$emit('logout');\n                _context.next = 9;\n                break;\n              case 8:\n                _this.$router.push(value);\n              case 9:\n              case \"end\":\n                return _context.stop();\n            }\n          }\n        }, _callee);\n      }))();\n    },\n    handler: function handler() {\n      this.userName = JSON.parse(localStorage.getItem('profile')).value.fullName;\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/components/SaHeader.vue?./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/components/SaSidebar.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/components/SaSidebar.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'SaSidebar',\n  props: {\n    isExpend: Boolean\n  },\n  computed: {\n    menus: function menus() {\n      return [{\n        title: 'activities',\n        path: '/hotel/sadmin/activities',\n        image: __webpack_require__(/*! @/assets/images/svg/collapse.svg */ \"./src/assets/images/svg/collapse.svg\"),\n        actives: ['activities_detail'],\n        permission: 'saactivity'\n      }, {\n        title: 'home',\n        path: '/hotel/sadmin/dashboard',\n        image: __webpack_require__(/*! @/assets/images/svg/dashboard.svg */ \"./src/assets/images/svg/dashboard.svg\"),\n        actives: ['categoryEdit', 'collection', 'collectionDetails', 'collectionEdit', 'categoryDetails', 'selectApplyHotel'],\n        permission: 'sahome'\n      }, {\n        title: 'hotels',\n        image: __webpack_require__(/*! @/assets/images/svg/advanced.svg */ \"./src/assets/images/svg/advanced.svg\"),\n        actives: ['hotels', 'hotel_staff_mgt', 'hotel_staff_detail', 'hotel_staff_edit', 'hotel_staff_create', 'product_type_create', 'product_type_edit', 'hotel_group_create', 'hotel_group_detail', 'hotel_group_edit', 'product_detail', 'product-mgt', 'hotel-facility-mgt', 'facility_create', 'facility_edit', 'hotel_facility_mgt', 'notice_to_hotel', 'notice_to_hotel_detail', 'notice_to_hotel_create', 'notice_edit', 'create_apply_for_hotel', 'reply_to_hotel', 'list_apply_for_hotel', 'notice_to_hotel_reply', 'send_notice_to_hotel', 'hotelDisplayCreate', 'hotelDisplayEdit', 'hotelDisplayDetails', 'detailRoomType', 'settingFs', 'room_type', 'editRoomType', 'createRoomType', 'stampCreate', 'stampDetailTotalUser', 'stampDetails', 'stampEdit'],\n        childrens: [{\n          title: 'product_type_mgt',\n          path: '/hotel/sadmin/product-type-mgt',\n          actives: ['product-type-mgt', 'product_type_create', 'product_type_edit'],\n          permission: 'saproducttype'\n        }, {\n          title: 'product_mgt',\n          path: '/hotel/sadmin/product-mgt',\n          actives: ['product-mgt', 'product_detail'],\n          permission: 'saproducttype'\n        }, {\n          title: 'hotel_group_mgt',\n          path: '/hotel/sadmin/hotel-group-mgt',\n          actives: ['hotel-group-mgt', 'hotel_group_create', 'hotel_group_detail', 'hotel_group_edit'],\n          permission: 'sahotelgroup'\n        }, {\n          title: 'hotel_staff_mgt',\n          path: '/hotel/sadmin/hotel-staff-mgt',\n          actives: ['hotel_staff_mgt', 'hotel_staff_detail', 'hotel_staff_edit', 'hotel_staff_create'],\n          permission: 'sastaff'\n        }, {\n          title: 'hotel_facility_mgt',\n          path: '/hotel/sadmin/hotel-facility-mgt',\n          actives: ['facility_create', 'facility_edit', 'hotel_facility_mgt'],\n          permission: 'safacility'\n        }, {\n          title: 'notice_to_hotel',\n          path: '/hotel/sadmin/notice-to-hotel',\n          actives: ['notice_to_hotel', 'notice_to_hotel_detail', 'notice_to_hotel_create', 'notice_edit', 'create_apply_for_hotel', 'reply_to_hotel', 'list_apply_for_hotel', 'notice_to_hotel_reply', 'send_notice_to_hotel'],\n          permission: 'safaq'\n        }, {\n          title: 'hotelDisplay',\n          path: '/hotel/sadmin/hotel-display',\n          actives: ['hotelDisplayCreate', 'hotelDisplayEdit', 'hotelDisplayDetails'],\n          permission: 'sahotel'\n        }, {\n          title: 'roomType',\n          path: '/hotel/sadmin/room-type',\n          actives: ['detailRoomType', 'settingFs', 'roomType', 'editRoomType', 'createRoomType'],\n          permission: 'saroomtype'\n        }, {\n          title: 'stamp',\n          path: '/hotel/sadmin/stamp',\n          actives: ['stampCreate', 'stampDetailTotalUser', 'stampDetails', 'stampEdit'],\n          permission: 'sastamp'\n        }, {\n          title: 'review',\n          path: '/hotel/sadmin/review',\n          permission: 'sareview',\n          actives: ['reviewDetail', 'review']\n        }]\n      }, {\n        title: 'user',\n        image: __webpack_require__(/*! @/assets/images/svg/user.svg */ \"./src/assets/images/svg/user.svg\"),\n        actives: ['userDetails', 'userEdit', 'firstBookingDetails', 'pointListMgt'],\n        childrens: [{\n          title: 'deviceMgt',\n          path: '/hotel/sadmin/device',\n          permission: 'sauser'\n        }, {\n          title: 'userMgt',\n          path: '/hotel/sadmin/users',\n          actives: ['userDetails', 'userEdit', 'pointListMgt'],\n          permission: 'sauser'\n        }, {\n          title: 'counselingMgt',\n          path: '/hotel/sadmin/counseling',\n          permission: 'sacounseling'\n        }, {\n          title: 'firstBooking',\n          path: '/hotel/sadmin/first-booking',\n          actives: ['firstBookingDetails'],\n          permission: 'sauser'\n        }]\n      }, {\n        title: 'booking',\n        image: __webpack_require__(/*! @/assets/images/svg/basic.svg */ \"./src/assets/images/svg/basic.svg\"),\n        actives: ['bookingReportHotels', 'searchByBookingNo', 'cashFlowReportDetail', 'sendMail', 'revenueReportDetails', 'sendingMailCreate', 'sendingMailDetails', 'bookingAdhoc'],\n        childrens: [{\n          title: 'bookingReport',\n          path: '/hotel/sadmin/booking-report',\n          actives: ['bookingReportHotels', 'searchByBookingNo'],\n          permission: 'sabooking'\n        }, {\n          title: 'cashFlowReport',\n          path: '/hotel/sadmin/cash-flow-report',\n          actives: ['cashFlowReportDetail', 'sendMail'],\n          permission: 'sabooking'\n        }, {\n          title: 'hotelDebt',\n          path: '/hotel/sadmin/hotel-debt',\n          actives: ['hotelDebtDetailList', 'hotelDebtEdit', 'hotelDebtDetail', 'hotelDebtDetailList', 'hotelDebtReview', 'hotelDebtCreate', 'ApplyForHotel'],\n          permission: 'sahoteldebt'\n        }, {\n          title: 'sendingMail',\n          path: '/hotel/sadmin/sending-mail',\n          actives: ['sendingMailCreate', 'sendingMailDetails'],\n          permission: 'sahoteldebt'\n        }, {\n          title: 'revenueReport',\n          path: '/hotel/sadmin/revenue-report',\n          actives: ['revenueReportDetails'],\n          permission: 'sahoteldebt'\n        }, {\n          title: 'bookingAdhoc',\n          path: '/hotel/sadmin/booking-adhoc',\n          actives: ['bookingAdhoc'],\n          permission: 'sabooking'\n        }]\n      }, {\n        title: 'marketing',\n        icon: 'el-icon-data-line',\n        actives: ['createEditLuckyWheel', 'luckyWheel', 'articleCreate', 'articleEdit', 'articleSetup', 'Pin article', 'Article with title', 'Article with image', 'Article with summary', 'Article collection', 'articleCategoryEdit', 'articleCategoryCreate', 'smsCreate', 'promotion', 'createPromotion', 'editPromotion', 'promotionDetails', 'couponCondition', 'hotelApply', 'userApply', 'applyForUser', 'applyForHotel', 'applyForHotelRoom', 'chooseWinner', 'hotelApply', 'userApply', 'groupPromotion', 'editGroupPromotion', 'createGroupPromotion', 'applyForPromotion', 'settingGroupPromotion', 'crm', 'crmDetail', 'crmCreate', 'inviteFriendCreate', 'inviteFriendEdit', 'inviteFriendDetails', 'inviteFriendDetailsList', 'inviteeList', 'noticeCreate', 'noticeEdit', 'noticeDetails', 'notificationCreate', 'notificationEdit', 'notificationDetails', 'bannerCreate', 'bannerEdit', 'bannerDetails', 'bannerSetting', 'popupCreate', 'popupEdit', 'popupDetails', 'popupSetting', 'pgpbCreate', 'pgpbEdit', 'pgpb', 'pgpbTotalOfIntroduction'],\n        childrens: [{\n          title: 'promotion',\n          path: '/hotel/sadmin/promotion',\n          actives: ['createPromotion', 'editPromotion', 'promotionDetails', 'couponCondition', 'hotelApply', 'userApply', 'applyForUser', 'applyForHotel', 'applyForHotelRoom', 'chooseWinner', 'hotelApply', 'userApply', 'groupPromotion', 'editGroupPromotion', 'createGroupPromotion', 'applyForPromotion', 'settingGroupPromotion'],\n          permission: 'sapromotion'\n        }, {\n          title: 'inviteFriend',\n          path: '/hotel/sadmin/invite-friend',\n          actives: ['inviteFriendCreate', 'inviteFriendEdit', 'inviteFriendDetails', 'inviteFriendDetailsList', 'inviteeList'],\n          permission: 'sainvitefriend'\n        }, {\n          title: 'notice',\n          path: '/hotel/sadmin/notice',\n          actives: ['noticeCreate', 'noticeEdit', 'noticeDetails'],\n          permission: 'saappnotice'\n        }, {\n          title: 'notification',\n          routeName: '/hotel/sadmin/notification',\n          path: '/hotel/sadmin/notification',\n          actives: ['notificationCreate', 'notificationEdit', 'notificationDetails'],\n          permission: 'sanotification'\n        }, {\n          title: 'banner',\n          routeName: '/hotel/sadmin/banner',\n          actives: ['bannerCreate', 'bannerEdit', 'bannerDetails', 'bannerSetting', 'banner'],\n          permission: 'sabanner'\n        }, {\n          title: 'popup',\n          routeName: '/hotel/sadmin/popup',\n          actives: ['popupCreate', 'popupEdit', 'popupDetails', 'popupSetting', 'popup'],\n          permission: 'sapopup'\n        }, {\n          title: 'sms',\n          path: '/hotel/sadmin/sms',\n          actives: ['smsCreate'],\n          permission: 'sasms'\n        }, {\n          title: 'crm',\n          path: '/hotel/sadmin/crm',\n          actives: ['crmDetail', 'crmCreate'],\n          permission: 'sacrm'\n        }, {\n          title: 'pgpb',\n          routeName: '/hotel/sadmin/pgpb',\n          actives: ['pgpbCreate', 'pgpbEdit', 'pgpb', 'pgpbTotalOfIntroduction'],\n          permission: 'sasale'\n        }, {\n          title: 'articleHome',\n          path: '/hotel/sadmin/article-home',\n          actives: ['articleSetup', 'Pin article', 'Article with title', 'Article with image', 'Article with summary', 'Article collection'],\n          permission: 'saarticle'\n        }, {\n          title: 'article',\n          path: '/hotel/sadmin/article',\n          actives: ['articleCreate', 'articleEdit'],\n          permission: 'saarticle'\n        }, {\n          title: 'articleCategory',\n          path: '/hotel/sadmin/article-category',\n          actives: ['articleCategoryEdit', 'articleCategoryCreate'],\n          permission: 'saarticle'\n        }, {\n          title: 'luckyWheel',\n          path: '/hotel/sadmin/lucky-weel',\n          actives: ['createEditLuckyWheel']\n        }]\n      }, {\n        title: 'saAccountMgt',\n        icon: 'el-icon-user',\n        actives: ['go2joyStaffDetails', 'go2joyStaffCreate', 'go2joyStaffEdit', 'SaleIncentiveHistoryDetails', 'SaleIncentiveHistoryCreate', 'DetailsOfStaff', 'AccountSaleIncentiveDetail'],\n        childrens: [{\n          title: 'SaleIncentiveHistory',\n          path: '/hotel/sadmin/sale-incentive-history',\n          actives: ['SaleIncentiveHistoryDetails', 'SaleIncentiveHistoryCreate', 'DetailsOfStaff', 'AccountSaleIncentiveDetail'],\n          permission: 'sasaleincentive'\n        }, {\n          title: 'go2joyStaffs',\n          path: '/hotel/sadmin/staffs-management',\n          actives: ['go2joyStaffDetails', 'go2joyStaffCreate', 'go2joyStaffEdit'],\n          permission: 'sasuperstaff'\n        }, {\n          title: 'go2joyConfirmGroup',\n          path: '/hotel/sadmin/confirm-group-mgt',\n          actives: ['go2joyConfirmGroup'],\n          permission: 'saconfirmgroup'\n        }, {\n          title: 'permission',\n          path: '/hotel/sadmin/permission',\n          actives: ['permissionDetails'],\n          permission: 'sapermission'\n        }]\n      }, {\n        title: 'service_agreement_mgt',\n        path: '/hotel/sadmin/service-agreement',\n        icon: 'el-icon-collection',\n        actives: ['serviceAgreementMgt', 'updateServiceAgreementMgt']\n      }, {\n        title: 'mileagePointMgt',\n        image: __webpack_require__(/*! @/assets/images/svg/dollar.svg */ \"./src/assets/images/svg/dollar.svg\"),\n        actives: ['mpUserMgt', 'pointListMgt', 'mpBoostingDetails', 'mpBoostingCreate', 'mpBoostingEdit'],\n        permission: 'samp',\n        childrens: [{\n          title: 'mpBoostingMgt',\n          path: '/hotel/sadmin/mp-boosting-mgt',\n          actives: ['mpBoostingDetails', 'mpBoostingCreate', 'mpBoostingEdit'],\n          permission: 'samp'\n        }, {\n          title: 'mpUserMgt',\n          path: '/hotel/sadmin/mp-user-mgt',\n          actives: ['mpUserMgt'],\n          permission: 'samp'\n        }]\n      }, {\n        title: 'trackingMgt',\n        image: __webpack_require__(/*! @/assets/images/svg/basic.svg */ \"./src/assets/images/svg/basic.svg\"),\n        actives: ['trackingMgt', 'bookingTrackingMgt', 'hotelStatusTrackingMgt', 'hotelIntroduceSignup', 'hotelIntroduceSignup', 'numberOfSignup', 'checkinByRegister'],\n        permission: 'satracking',\n        childrens: [{\n          title: 'bookingTrackingMgt',\n          path: '/hotel/sadmin/booking-tracking-mgt',\n          actives: ['bookingTrackingMgt'],\n          permission: 'satracking'\n        }, {\n          title: 'hotelStatusTrackingMgt',\n          path: '/hotel/sadmin/hotel-status-tracking-mgt',\n          actives: ['hotelStatusTrackingMgt'],\n          permission: 'satracking'\n        }, {\n          title: 'hotelIntroduceSignup',\n          path: '/hotel/sadmin/hotel-introduce-signup',\n          actives: ['hotelIntroduceSignup', 'numberOfSignup', 'checkinByRegister'],\n          permission: 'satracking'\n        }]\n      }, {\n        title: 'settings',\n        icon: 'el-icon-s-tools',\n        actives: ['openSecondSplashEdit', 'openSecondSplashCreate', 'hotelOnTopEdit', 'hotelOnTopCreate'],\n        childrens: [{\n          title: 'generalSetting',\n          path: '/hotel/sadmin/general-setting',\n          permission: 'sasetting'\n        }, {\n          title: 'openSecondSplash',\n          path: '/hotel/sadmin/open-second-splash',\n          actives: ['openSecondSplashEdit', 'openSecondSplashCreate'],\n          permission: 'sasplash2nd'\n        }, {\n          title: 'hotelOntop',\n          path: '/hotel/sadmin/hotel-on-top-management',\n          actives: ['hotelOnTopEdit', 'hotelOnTopCreate'],\n          permission: 'sahotelontop'\n        }]\n      }];\n    }\n  },\n  watch: {\n    isExpend: function isExpend() {\n      var submenu = Array.from(this.$el.querySelectorAll('.el-submenu')) || [];\n      submenu.forEach(function (menu) {\n        menu.classList.remove('is-opened');\n      });\n    }\n  },\n  methods: {\n    setActive: function setActive() {\n      var _this = this;\n      var actives = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];\n      if (actives && actives.length === 0) {\n        return false;\n      }\n      var result = actives.find(function (item) {\n        return item === _this.$router.currentRoute.name;\n      });\n      return !!result;\n    },\n    handleSelect: function handleSelect(key) {\n      if (key !== this.$router.currentRoute.fullPath) {\n        this.$router.push(key);\n      }\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/components/SaSidebar.vue?./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/components/SaTopBar.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/components/SaTopBar.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'SaTopBar'\n});\n\n//# sourceURL=webpack:///./src/components/SaTopBar.vue?./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/layouts/guest.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/layouts/guest.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/asyncToGenerator.js\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var md5__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! md5 */ \"./node_modules/md5/md5.js\");\n/* harmony import */ var md5__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(md5__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _utils_localStorage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/localStorage */ \"./src/utils/localStorage.js\");\n/* harmony import */ var _api_auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/api/auth */ \"./src/api/auth.js\");\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'GuestLayout',\n  data: function data() {\n    return {\n      formData: {\n        userId: '',\n        password: '',\n        remember: false\n      },\n      otpCode: '',\n      showSignIn: true,\n      isLoading: false,\n      isVerify: false\n    };\n  },\n  methods: {\n    onSignIn: function onSignIn() {\n      var _this = this;\n      return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee() {\n        var _yield$signIn, data;\n        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {\n          while (1) {\n            switch (_context.prev = _context.next) {\n              case 0:\n                _this.isLoading = true;\n                _context.prev = 1;\n                _context.next = 4;\n                return Object(_api_auth__WEBPACK_IMPORTED_MODULE_4__[\"signIn\"])({\n                  userId: _this.formData.userId,\n                  password: md5__WEBPACK_IMPORTED_MODULE_2___default()(_this.formData.password),\n                  remember: Number(_this.formData.remember)\n                });\n              case 4:\n                _yield$signIn = _context.sent;\n                data = _yield$signIn.data;\n                if (data.code === 1) {\n                  _this.setExpiry(data);\n                } else if (data.code === 17) {\n                  _this.isVerify = true;\n                }\n                _context.next = 13;\n                break;\n              case 9:\n                _context.prev = 9;\n                _context.t0 = _context[\"catch\"](1);\n                _this.isLoading = false;\n                return _context.abrupt(\"return\", false);\n              case 13:\n                _context.prev = 13;\n                _this.isLoading = false;\n                return _context.finish(13);\n              case 16:\n              case \"end\":\n                return _context.stop();\n            }\n          }\n        }, _callee, null, [[1, 9, 13, 16]]);\n      }))();\n    },\n    onVerify: function onVerify() {\n      var _this2 = this;\n      return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee2() {\n        var _yield$verifyOTP, data;\n        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee2$(_context2) {\n          while (1) {\n            switch (_context2.prev = _context2.next) {\n              case 0:\n                _this2.isLoading = true;\n                _context2.prev = 1;\n                _context2.next = 4;\n                return Object(_api_auth__WEBPACK_IMPORTED_MODULE_4__[\"verifyOTP\"])({\n                  userId: _this2.formData.userId,\n                  code: _this2.otpCode,\n                  remember: _this2.remember ? 1 : 0\n                });\n              case 4:\n                _yield$verifyOTP = _context2.sent;\n                data = _yield$verifyOTP.data;\n                if (data.code === 1) {\n                  _this2.setExpiry(data);\n                } else if (data.code === 17) {\n                  _this2.isVerify = true;\n                }\n                _context2.next = 13;\n                break;\n              case 9:\n                _context2.prev = 9;\n                _context2.t0 = _context2[\"catch\"](1);\n                _this2.isLoading = false;\n                return _context2.abrupt(\"return\", false);\n              case 13:\n                _context2.prev = 13;\n                _this2.isLoading = false;\n                return _context2.finish(13);\n              case 16:\n              case \"end\":\n                return _context2.stop();\n            }\n          }\n        }, _callee2, null, [[1, 9, 13, 16]]);\n      }))();\n    },\n    setExpiry: function setExpiry(data) {\n      var _this3 = this;\n      return _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee3() {\n        var ttl;\n        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee3$(_context3) {\n          while (1) {\n            switch (_context3.prev = _context3.next) {\n              case 0:\n                console.log('data');\n                ttl = _this3.formData.remember ? 60 * 60 * 24 * 90 * 1000 : 60 * 60 * 24 * 1000;\n                _context3.next = 4;\n                return Object(_utils_localStorage__WEBPACK_IMPORTED_MODULE_3__[\"setLocalStorageWithExpiry\"])('access_token', data.data.accessToken, ttl);\n              case 4:\n                Object(_utils_localStorage__WEBPACK_IMPORTED_MODULE_3__[\"setLocalStorageWithExpiry\"])('profile', data.data.profile, ttl);\n                localStorage.getItem('page-back') ? _this3.$router.push(localStorage.getItem('page-back')) : _this3.$router.push('/hotel/sadmin/dashboard');\n                _this3.$emit('changeLayout');\n              case 7:\n              case \"end\":\n                return _context3.stop();\n            }\n          }\n        }, _callee3);\n      }))();\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/layouts/guest.vue?./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/layouts/member.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/layouts/member.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_SaHeader_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/SaHeader.vue */ \"./src/components/SaHeader.vue\");\n/* harmony import */ var _components_SaSidebar_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/SaSidebar.vue */ \"./src/components/SaSidebar.vue\");\n/* harmony import */ var _components_SaTopBar_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/SaTopBar.vue */ \"./src/components/SaTopBar.vue\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'MemberLayout',\n  components: {\n    SaHeader: _components_SaHeader_vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n    SaSidebar: _components_SaSidebar_vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n    SaTopBar: _components_SaTopBar_vue__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\n  },\n  data: function data() {\n    return {\n      isExpend: true\n    };\n  },\n  created: function created() {\n    if (window.screen.width < 766) {\n      this.isExpend = false;\n    }\n  },\n  methods: {\n    getExpended: function getExpended() {\n      this.isExpend = !this.isExpend;\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/layouts/member.vue?./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e1aadb4-vue-loader-template\"}!./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=template&id=7ba5bd90&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e1aadb4-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=template&id=7ba5bd90& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function render() {\n  var _vm = this,\n    _c = _vm._self._c;\n  return _c(\"div\", {\n    staticClass: \"app\"\n  }, [_c(_vm.layout, {\n    tag: \"component\",\n    on: {\n      changeLayout: _vm.setLayout\n    }\n  }, [_c(\"router-view\")], 1)], 1);\n};\nvar staticRenderFns = [];\nrender._withStripped = true;\n\n\n//# sourceURL=webpack:///./src/App.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%223e1aadb4-vue-loader-template%22%7D!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e1aadb4-vue-loader-template\"}!./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/components/SaHeader.vue?vue&type=template&id=181455aa&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e1aadb4-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/components/SaHeader.vue?vue&type=template&id=181455aa&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function render() {\n  var _vm = this,\n    _c = _vm._self._c;\n  return _c(\"div\", {\n    staticClass: \"header-bar\"\n  }, [_c(\"div\", {\n    staticClass: \"header-image\",\n    class: _vm.isExpend ? \"is-expend\" : \"\"\n  }, [_c(\"img\", {\n    staticClass: \"logo-big\",\n    class: _vm.isExpend ? \"active\" : \"\",\n    attrs: {\n      src: __webpack_require__(/*! @/assets/images/logo/logo.png */ \"./src/assets/images/logo/logo.png\")\n    }\n  }), _c(\"img\", {\n    staticClass: \"logo-small\",\n    class: !_vm.isExpend ? \"active\" : \"\",\n    attrs: {\n      src: __webpack_require__(/*! @/assets/images/logo/logo-small.png */ \"./src/assets/images/logo/logo-small.png\")\n    }\n  })]), _c(\"div\", {\n    staticClass: \"btn-toggle\"\n  }, [_c(\"span\", {\n    staticClass: \"btn-toggle--container\"\n  }, [_c(\"i\", {\n    class: [_vm.isExpend ? \"el-icon-s-fold\" : \"el-icon-s-unfold\"],\n    on: {\n      click: function click($event) {\n        _vm.isExpend = _vm.isExpend;\n      }\n    }\n  })])]), _c(\"div\", [_c(\"div\", {\n    staticClass: \"language-account-info\"\n  }, [_c(\"div\", {\n    staticClass: \"language\"\n  }, [_c(\"el-dropdown\", {\n    on: {\n      command: _vm.changeLocale\n    }\n  }, [_c(\"span\", {\n    staticClass: \"el-dropdown-link\"\n  }, [_vm.flag == \"en\" ? _c(\"img\", {\n    staticClass: \"custom-button\",\n    attrs: {\n      src: __webpack_require__(/*! @/assets/images/svg/en.svg */ \"./src/assets/images/svg/en.svg\")\n    }\n  }) : _vm._e(), _vm.flag == \"vi\" ? _c(\"img\", {\n    staticClass: \"custom-button\",\n    attrs: {\n      src: __webpack_require__(/*! @/assets/images/svg/vn.svg */ \"./src/assets/images/svg/vn.svg\")\n    }\n  }) : _vm._e()]), _c(\"el-dropdown-menu\", {\n    attrs: {\n      slot: \"dropdown\",\n      \"append-to-body\": false\n    },\n    slot: \"dropdown\"\n  }, _vm._l(_vm.languages, function (entry) {\n    return _c(\"el-dropdown-item\", {\n      key: entry.title,\n      staticClass: \"dropdown-item\",\n      attrs: {\n        command: entry.language\n      }\n    }, [entry.language == \"en\" ? _c(\"img\", {\n      attrs: {\n        src: __webpack_require__(/*! @/assets/images/svg/en.svg */ \"./src/assets/images/svg/en.svg\")\n      }\n    }) : _vm._e(), entry.language == \"vi\" ? _c(\"img\", {\n      attrs: {\n        src: __webpack_require__(/*! @/assets/images/svg/vn.svg */ \"./src/assets/images/svg/vn.svg\")\n      }\n    }) : _vm._e(), _vm._v(\" \" + _vm._s(entry.title) + \" \")]);\n  }), 1)], 1)], 1), _c(\"div\", [_c(\"el-dropdown\", {\n    on: {\n      command: _vm.onDirect\n    }\n  }, [_c(\"span\", {\n    staticClass: \"el-dropdown-link\"\n  }, [_c(\"el-avatar\", {\n    staticClass: \"custom-button\",\n    attrs: {\n      size: 25,\n      src: \"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png\"\n    }\n  })], 1), _c(\"el-dropdown-menu\", {\n    attrs: {\n      slot: \"dropdown\",\n      \"append-to-body\": false\n    },\n    slot: \"dropdown\"\n  }, [_c(\"el-dropdown-item\", [_c(\"el-link\", {\n    attrs: {\n      type: \"danger\"\n    }\n  }, [_vm._v(_vm._s(_vm.userName))])], 1), _vm._l(_vm.accountInfo, function (entry) {\n    return _c(\"el-dropdown-item\", {\n      key: entry.title,\n      staticClass: \"dropdown-item\",\n      attrs: {\n        command: entry.direct\n      }\n    }, [_c(\"i\", {\n      class: entry.icon\n    }), _vm._v(\" \" + _vm._s(_vm.$t(entry.title)) + \" \")]);\n  })], 2)], 1)], 1)])])]);\n};\nvar staticRenderFns = [];\nrender._withStripped = true;\n\n\n//# sourceURL=webpack:///./src/components/SaHeader.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%223e1aadb4-vue-loader-template%22%7D!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e1aadb4-vue-loader-template\"}!./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/components/SaSidebar.vue?vue&type=template&id=2e55322e&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e1aadb4-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/components/SaSidebar.vue?vue&type=template&id=2e55322e&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function render() {\n  var _vm = this,\n    _c = _vm._self._c;\n  return _c(\"el-menu\", {\n    staticClass: \"el-menu-vertical my-side-bar\",\n    class: _vm.isExpend ? \"active\" : \"\",\n    attrs: {\n      fixed: \"\",\n      \"default-active\": _vm.$route.path,\n      \"unique-opened\": true\n    },\n    on: {\n      select: _vm.handleSelect\n    }\n  }, _vm._l(_vm.menus, function (menu) {\n    return _c(menu.childrens ? \"ElSubmenu\" : \"ElMenuItem\", {\n      key: \"top-menu-\" + menu.title,\n      tag: \"component\",\n      class: {\n        \"is-active\": _vm.setActive(menu.actives),\n        \"no-permission\": _vm.checkPermissionMenu(menu.permission)\n      },\n      attrs: {\n        index: menu.path || menu.title,\n        \"default-active\": menu.children ? _vm.$router.currentRoute.fullPath : null\n      }\n    }, [_c(\"template\", {\n      slot: menu.childrens ? \"title\" : \"default\"\n    }, [menu.icon ? _c(\"i\", {\n      class: menu.icon\n    }) : _vm._e(), menu.image ? _c(\"img\", {\n      staticClass: \"menu-image\",\n      attrs: {\n        src: menu.image\n      }\n    }) : _vm._e(), _c(\"span\", {\n      staticClass: \"submenu-title\",\n      class: _vm.isExpend ? \"active\" : \"\",\n      attrs: {\n        slot: \"title\"\n      },\n      slot: \"title\"\n    }, [_vm._v(_vm._s(_vm.$t(\"breadcrumb.\".concat(menu.title))))])]), _vm._l(menu.childrens, function (sub) {\n      return _c(\"el-menu-item\", {\n        key: \"sub-menu-\" + menu.title + \"-\" + sub.title,\n        class: {\n          \"is-active\": _vm.setActive(sub.actives),\n          \"no-permission\": _vm.checkPermissionMenu(sub.permission)\n        },\n        attrs: {\n          index: sub.path || sub.title\n        }\n      }, [_c(\"span\", {\n        staticClass: \"router-children\",\n        class: _vm.isExpend ? \"active\" : \"\"\n      }, [_vm._v(_vm._s(_vm.$t(\"breadcrumb.\".concat(sub.title))))])]);\n    })], 2);\n  }), 1);\n};\nvar staticRenderFns = [];\nrender._withStripped = true;\n\n\n//# sourceURL=webpack:///./src/components/SaSidebar.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%223e1aadb4-vue-loader-template%22%7D!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e1aadb4-vue-loader-template\"}!./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/components/SaTopBar.vue?vue&type=template&id=3addd89c&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e1aadb4-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/components/SaTopBar.vue?vue&type=template&id=3addd89c&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function render() {\n  var _vm = this,\n    _c = _vm._self._c;\n  return _vm.$route.name ? _c(\"div\", {\n    staticClass: \"sa-topbar\"\n  }, [_c(\"h3\", {\n    staticClass: \"sa-topbar__title\"\n  }, [_vm._v(\" \" + _vm._s(_vm.$t(\"breadcrumb.\".concat(_vm.$route.matched[0].name))) + \" \")]), _c(\"div\", {\n    staticClass: \"sa-topbar__path\"\n  }, [_c(\"router-link\", {\n    staticClass: \"sa-topbar__path--back\",\n    attrs: {\n      to: \"/\"\n    }\n  }, [_vm._v(\" \" + _vm._s(_vm.$t(\"breadcrumb.dashboard\")) + \" \")]), _vm._l(_vm.$route.matched, function (router) {\n    return _c(router.name === \"collection\" && _vm.$route.matched.length > 1 ? \"router-link\" : \"span\", {\n      key: router.name,\n      tag: \"component\",\n      class: {\n        \"sa-topbar__path--back\": router.name === \"collection\" && _vm.$route.matched.length > 1\n      },\n      attrs: {\n        to: router.path\n      }\n    }, [_c(\"i\", {\n      staticClass: \"el-icon-arrow-right\"\n    }), _vm._v(\" \" + _vm._s(_vm.$t(\"breadcrumb.\".concat(router.name))) + \" \")]);\n  })], 2)]) : _vm._e();\n};\nvar staticRenderFns = [];\nrender._withStripped = true;\n\n\n//# sourceURL=webpack:///./src/components/SaTopBar.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%223e1aadb4-vue-loader-template%22%7D!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e1aadb4-vue-loader-template\"}!./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/layouts/guest.vue?vue&type=template&id=64c946c9&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e1aadb4-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/layouts/guest.vue?vue&type=template&id=64c946c9&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function render() {\n  var _vm = this,\n    _c = _vm._self._c;\n  return _c(\"div\", {\n    staticClass: \"login\"\n  }, [_c(\"img\", {\n    attrs: {\n      src: \"https://sa.go2joy.vn/assets/images/authentication/authentication-bg.svg\",\n      width: \"100%\"\n    }\n  }), _c(\"el-dialog\", {\n    attrs: {\n      \"close-on-click-modal\": false,\n      visible: _vm.showSignIn\n    },\n    on: {\n      \"update:visible\": function updateVisible($event) {\n        _vm.showSignIn = $event;\n      }\n    }\n  }, [!_vm.isVerify ? _c(\"div\", [_c(\"div\", {\n    staticClass: \"login__logo\"\n  }, [_c(\"img\", {\n    attrs: {\n      src: __webpack_require__(/*! @/assets/images/logo/logo.png */ \"./src/assets/images/logo/logo.png\"),\n      width: \"70%\"\n    }\n  })]), _c(\"div\", {\n    staticClass: \"login__title\"\n  }, [_c(\"p\", [_vm._v(\"Sign In\")])]), _c(\"div\", {\n    staticClass: \"login__form\"\n  }, [_c(\"el-input\", {\n    model: {\n      value: _vm.formData.userId,\n      callback: function callback($$v) {\n        _vm.$set(_vm.formData, \"userId\", $$v);\n      },\n      expression: \"formData.userId\"\n    }\n  }), _c(\"el-input\", {\n    attrs: {\n      \"show-password\": \"\"\n    },\n    model: {\n      value: _vm.formData.password,\n      callback: function callback($$v) {\n        _vm.$set(_vm.formData, \"password\", $$v);\n      },\n      expression: \"formData.password\"\n    }\n  })], 1), _c(\"div\", {\n    staticClass: \"login__forget\"\n  }, [_c(\"el-checkbox\", {\n    staticClass: \"login__forget--color\",\n    model: {\n      value: _vm.formData.remember,\n      callback: function callback($$v) {\n        _vm.$set(_vm.formData, \"remember\", $$v);\n      },\n      expression: \"formData.remember\"\n    }\n  }, [_vm._v(\"Remember Me\")])], 1), _c(\"div\", {\n    staticClass: \"login__button\"\n  }, [_c(\"el-button\", {\n    attrs: {\n      type: \"danger\",\n      loading: _vm.isLoading\n    },\n    on: {\n      click: _vm.onSignIn\n    }\n  }, [_vm._v(\" Sign In \")])], 1)]) : _c(\"div\", [_c(\"div\", {\n    staticClass: \"login__logo\",\n    staticStyle: {\n      \"text-align\": \"center\"\n    }\n  }, [_c(\"img\", {\n    attrs: {\n      src: __webpack_require__(/*! @/assets/images/logo/logo.png */ \"./src/assets/images/logo/logo.png\"),\n      width: \"70%\"\n    }\n  })]), _c(\"div\", {\n    staticClass: \"login__title center\",\n    staticStyle: {\n      \"text-align\": \"center\"\n    }\n  }, [_c(\"p\", [_vm._v(\"Input OTP code to continue\")])]), _c(\"div\", {\n    staticClass: \"login__form\"\n  }, [_c(\"el-input\", {\n    staticClass: \"form-control\",\n    attrs: {\n      type: \"password\",\n      placeholder: \"OTP code\",\n      required: \"\"\n    },\n    model: {\n      value: _vm.otpCode,\n      callback: function callback($$v) {\n        _vm.otpCode = $$v;\n      },\n      expression: \"otpCode\"\n    }\n  })], 1), _c(\"div\", {\n    staticClass: \"login__button\"\n  }, [_c(\"el-button\", {\n    attrs: {\n      type: \"danger\",\n      loading: _vm.isLoading\n    },\n    on: {\n      click: _vm.onVerify\n    }\n  }, [_vm._v(\" Continue \")])], 1)])])], 1);\n};\nvar staticRenderFns = [];\nrender._withStripped = true;\n\n\n//# sourceURL=webpack:///./src/layouts/guest.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%223e1aadb4-vue-loader-template%22%7D!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e1aadb4-vue-loader-template\"}!./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/layouts/member.vue?vue&type=template&id=4f9598f9&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e1aadb4-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/layouts/member.vue?vue&type=template&id=4f9598f9&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function render() {\n  var _vm = this,\n    _c = _vm._self._c;\n  return _c(\"div\", {\n    staticClass: \"member-layout\"\n  }, [_c(\"el-container\", [_c(\"el-aside\", {\n    staticClass: \"member-layout__aside\",\n    class: !_vm.isExpend ? \"\" : \"active\"\n  }, [_c(\"SaSidebar\", {\n    attrs: {\n      isExpend: _vm.isExpend\n    }\n  })], 1), _c(\"el-container\", [_c(\"el-header\", {\n    staticClass: \"member-layout__header\",\n    class: !_vm.isExpend ? \"\" : \"active\"\n  }, [_c(\"SaHeader\", {\n    attrs: {\n      expend: _vm.isExpend\n    },\n    on: {\n      expended: _vm.getExpended,\n      logout: function logout($event) {\n        return _vm.$emit(\"changeLayout\");\n      }\n    }\n  })], 1), _c(\"el-main\", {\n    staticClass: \"member-layout__main\",\n    class: !_vm.isExpend ? \"\" : \"active\"\n  }, [_c(\"div\", {\n    staticClass: \"member-layout__topbar\"\n  }, [_c(\"SaTopBar\")], 1), _c(\"div\", {\n    staticClass: \"member-layout__content\"\n  }, [_vm._t(\"default\")], 2), _c(\"el-footer\", {\n    staticClass: \"member-layout__footer\"\n  }, [_vm._v(\" ?? \" + _vm._s(new Date().getFullYear()) + \" Go2Joy - All Rights Reserved. \")])], 1)], 1)], 1)], 1);\n};\nvar staticRenderFns = [];\nrender._withStripped = true;\n\n\n//# sourceURL=webpack:///./src/layouts/member.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%223e1aadb4-vue-loader-template%22%7D!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=style&index=0&id=7ba5bd90&lang=scss&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--9-oneOf-1-0!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=style&index=0&id=7ba5bd90&lang=scss& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!../node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/postcss-loader/src??ref--9-oneOf-1-2!../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=style&index=0&id=7ba5bd90&lang=scss& */ \"./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=style&index=0&id=7ba5bd90&lang=scss&\");\nif(content.__esModule) content = content.default;\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"356bfef8\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack:///./src/App.vue?./node_modules/vue-style-loader??ref--9-oneOf-1-0!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/components/SaHeader.vue?vue&type=style&index=0&id=181455aa&lang=scss&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--9-oneOf-1-0!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/components/SaHeader.vue?vue&type=style&index=0&id=181455aa&lang=scss&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../../node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!../../node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--9-oneOf-1-2!../../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./SaHeader.vue?vue&type=style&index=0&id=181455aa&lang=scss&scoped=true& */ \"./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/components/SaHeader.vue?vue&type=style&index=0&id=181455aa&lang=scss&scoped=true&\");\nif(content.__esModule) content = content.default;\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"6c7a06dc\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack:///./src/components/SaHeader.vue?./node_modules/vue-style-loader??ref--9-oneOf-1-0!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/components/SaSidebar.vue?vue&type=style&index=0&id=2e55322e&lang=scss&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--9-oneOf-1-0!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/components/SaSidebar.vue?vue&type=style&index=0&id=2e55322e&lang=scss& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../../node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!../../node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--9-oneOf-1-2!../../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./SaSidebar.vue?vue&type=style&index=0&id=2e55322e&lang=scss& */ \"./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/components/SaSidebar.vue?vue&type=style&index=0&id=2e55322e&lang=scss&\");\nif(content.__esModule) content = content.default;\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"8d5dab50\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack:///./src/components/SaSidebar.vue?./node_modules/vue-style-loader??ref--9-oneOf-1-0!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/components/SaSidebar.vue?vue&type=style&index=1&id=2e55322e&lang=scss&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--9-oneOf-1-0!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/components/SaSidebar.vue?vue&type=style&index=1&id=2e55322e&lang=scss&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../../node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!../../node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--9-oneOf-1-2!../../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./SaSidebar.vue?vue&type=style&index=1&id=2e55322e&lang=scss&scoped=true& */ \"./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/components/SaSidebar.vue?vue&type=style&index=1&id=2e55322e&lang=scss&scoped=true&\");\nif(content.__esModule) content = content.default;\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"4d99b9ee\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack:///./src/components/SaSidebar.vue?./node_modules/vue-style-loader??ref--9-oneOf-1-0!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/components/SaTopBar.vue?vue&type=style&index=0&id=3addd89c&lang=scss&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--9-oneOf-1-0!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/components/SaTopBar.vue?vue&type=style&index=0&id=3addd89c&lang=scss&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../../node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!../../node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--9-oneOf-1-2!../../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./SaTopBar.vue?vue&type=style&index=0&id=3addd89c&lang=scss&scoped=true& */ \"./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/components/SaTopBar.vue?vue&type=style&index=0&id=3addd89c&lang=scss&scoped=true&\");\nif(content.__esModule) content = content.default;\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"266e419c\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack:///./src/components/SaTopBar.vue?./node_modules/vue-style-loader??ref--9-oneOf-1-0!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/layouts/guest.vue?vue&type=style&index=0&id=64c946c9&lang=scss&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--9-oneOf-1-0!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/layouts/guest.vue?vue&type=style&index=0&id=64c946c9&lang=scss&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../../node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!../../node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--9-oneOf-1-2!../../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./guest.vue?vue&type=style&index=0&id=64c946c9&lang=scss&scoped=true& */ \"./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/layouts/guest.vue?vue&type=style&index=0&id=64c946c9&lang=scss&scoped=true&\");\nif(content.__esModule) content = content.default;\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"4a13864d\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack:///./src/layouts/guest.vue?./node_modules/vue-style-loader??ref--9-oneOf-1-0!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/layouts/member.vue?vue&type=style&index=0&id=4f9598f9&lang=scss&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--9-oneOf-1-0!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/layouts/member.vue?vue&type=style&index=0&id=4f9598f9&lang=scss&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../../node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!../../node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--9-oneOf-1-2!../../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./member.vue?vue&type=style&index=0&id=4f9598f9&lang=scss&scoped=true& */ \"./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/layouts/member.vue?vue&type=style&index=0&id=4f9598f9&lang=scss&scoped=true&\");\nif(content.__esModule) content = content.default;\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"d8c30182\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack:///./src/layouts/member.vue?./node_modules/vue-style-loader??ref--9-oneOf-1-0!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./src/App.vue":
/*!*********************!*\
  !*** ./src/App.vue ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=7ba5bd90& */ \"./src/App.vue?vue&type=template&id=7ba5bd90&\");\n/* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js& */ \"./src/App.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _App_vue_vue_type_style_index_0_id_7ba5bd90_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App.vue?vue&type=style&index=0&id=7ba5bd90&lang=scss& */ \"./src/App.vue?vue&type=style&index=0&id=7ba5bd90&lang=scss&\");\n/* harmony import */ var _node_modules_vue_cli_service_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_cli_service_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n  _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/App.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/App.vue?vue&type=script&lang=js&":
/*!**********************************************!*\
  !*** ./src/App.vue?vue&type=script&lang=js& ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/cache-loader/dist/cjs.js??ref--13-0!../node_modules/babel-loader/lib!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/App.vue?vue&type=style&index=0&id=7ba5bd90&lang=scss&":
/*!*******************************************************************!*\
  !*** ./src/App.vue?vue&type=style&index=0&id=7ba5bd90&lang=scss& ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_id_7ba5bd90_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-style-loader??ref--9-oneOf-1-0!../node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!../node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/postcss-loader/src??ref--9-oneOf-1-2!../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=style&index=0&id=7ba5bd90&lang=scss& */ \"./node_modules/vue-style-loader/index.js?!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=style&index=0&id=7ba5bd90&lang=scss&\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_id_7ba5bd90_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_id_7ba5bd90_lang_scss___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_id_7ba5bd90_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_id_7ba5bd90_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n\n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/App.vue?vue&type=template&id=7ba5bd90&":
/*!****************************************************!*\
  !*** ./src/App.vue?vue&type=template&id=7ba5bd90& ***!
  \****************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e1aadb4_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e1aadb4-vue-loader-template\"}!../node_modules/cache-loader/dist/cjs.js??ref--13-0!../node_modules/babel-loader/lib!../node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=template&id=7ba5bd90& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"3e1aadb4-vue-loader-template\\\"}!./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=template&id=7ba5bd90&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e1aadb4_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e1aadb4_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/api/apiCaller.js":
/*!******************************!*\
  !*** ./src/api/apiCaller.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils_localStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/localStorage */ \"./src/utils/localStorage.js\");\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var element_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! element-ui */ \"./node_modules/element-ui/lib/element-ui.common.js\");\n/* harmony import */ var element_ui__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(element_ui__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_2__[\"default\"].prototype.$message = element_ui__WEBPACK_IMPORTED_MODULE_3__[\"Message\"];\nvar apiCaller = axios__WEBPACK_IMPORTED_MODULE_0___default.a.create({\n  baseURL: \"https://staging-api.go2joy.vn/api/v1/web/sa\",\n  // timeout: 10000,\n  headers: {\n    Accept: 'application/json',\n    'Content-Type': 'application/json'\n  }\n});\n// req\napiCaller.interceptors.request.use(function (config) {\n  var token = Object(_utils_localStorage__WEBPACK_IMPORTED_MODULE_1__[\"getLocalStorageWithExpiry\"])('access_token');\n  if (token) {\n    config.headers.Authorization = \"Bearer \".concat(token);\n  }\n  return config;\n}, function (error) {\n  return Promise.reject(error);\n});\n// res\napiCaller.interceptors.response.use(function (response) {\n  return response;\n}, function (error) {\n  var _error$response$data;\n  if (((_error$response$data = error.response.data) === null || _error$response$data === void 0 ? void 0 : _error$response$data.code) === 3) {\n    localStorage.removeItem('access_token');\n    localStorage.removeItem('profile');\n    window.location.href = 'sign-in';\n    return false;\n  }\n  vue__WEBPACK_IMPORTED_MODULE_2__[\"default\"].prototype.$message({\n    type: 'error',\n    message: error.response.data.message.toString()\n  });\n  return error.response;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (apiCaller);\n\n//# sourceURL=webpack:///./src/api/apiCaller.js?");

/***/ }),

/***/ "./src/api/auth.js":
/*!*************************!*\
  !*** ./src/api/auth.js ***!
  \*************************/
/*! exports provided: signIn, signOut, verifyOTP */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"signIn\", function() { return signIn; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"signOut\", function() { return signOut; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"verifyOTP\", function() { return verifyOTP; });\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/asyncToGenerator.js\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _apiCaller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./apiCaller */ \"./src/api/apiCaller.js\");\n\n\n\nfunction signIn(_x) {\n  return _signIn.apply(this, arguments);\n}\nfunction _signIn() {\n  _signIn = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee(payload) {\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.next = 2;\n            return _apiCaller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].post('/sign-in', payload);\n          case 2:\n            return _context.abrupt(\"return\", _context.sent);\n          case 3:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n  return _signIn.apply(this, arguments);\n}\nfunction signOut() {\n  return _signOut.apply(this, arguments);\n}\nfunction _signOut() {\n  _signOut = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee2() {\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee2$(_context2) {\n      while (1) {\n        switch (_context2.prev = _context2.next) {\n          case 0:\n            _context2.next = 2;\n            return _apiCaller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].post('/sign-out');\n          case 2:\n            return _context2.abrupt(\"return\", _context2.sent);\n          case 3:\n          case \"end\":\n            return _context2.stop();\n        }\n      }\n    }, _callee2);\n  }));\n  return _signOut.apply(this, arguments);\n}\nfunction verifyOTP(_x2) {\n  return _verifyOTP.apply(this, arguments);\n}\nfunction _verifyOTP() {\n  _verifyOTP = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee3(payload) {\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee3$(_context3) {\n      while (1) {\n        switch (_context3.prev = _context3.next) {\n          case 0:\n            _context3.next = 2;\n            return _apiCaller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].post('/signIn/verifyOTP', payload);\n          case 2:\n            return _context3.abrupt(\"return\", _context3.sent);\n          case 3:\n          case \"end\":\n            return _context3.stop();\n        }\n      }\n    }, _callee3);\n  }));\n  return _verifyOTP.apply(this, arguments);\n}\n\n\n//# sourceURL=webpack:///./src/api/auth.js?");

/***/ }),

/***/ "./src/assets/images/logo/logo-small.png":
/*!***********************************************!*\
  !*** ./src/assets/images/logo/logo-small.png ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"img/logo-small.41891ca3.png\";\n\n//# sourceURL=webpack:///./src/assets/images/logo/logo-small.png?");

/***/ }),

/***/ "./src/assets/images/logo/logo.png":
/*!*****************************************!*\
  !*** ./src/assets/images/logo/logo.png ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"img/logo.b49047ca.png\";\n\n//# sourceURL=webpack:///./src/assets/images/logo/logo.png?");

/***/ }),

/***/ "./src/assets/images/svg/advanced.svg":
/*!********************************************!*\
  !*** ./src/assets/images/svg/advanced.svg ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"img/advanced.972c71c9.svg\";\n\n//# sourceURL=webpack:///./src/assets/images/svg/advanced.svg?");

/***/ }),

/***/ "./src/assets/images/svg/basic.svg":
/*!*****************************************!*\
  !*** ./src/assets/images/svg/basic.svg ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"img/basic.819f9611.svg\";\n\n//# sourceURL=webpack:///./src/assets/images/svg/basic.svg?");

/***/ }),

/***/ "./src/assets/images/svg/collapse.svg":
/*!********************************************!*\
  !*** ./src/assets/images/svg/collapse.svg ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"img/collapse.e7e9054d.svg\";\n\n//# sourceURL=webpack:///./src/assets/images/svg/collapse.svg?");

/***/ }),

/***/ "./src/assets/images/svg/dashboard.svg":
/*!*********************************************!*\
  !*** ./src/assets/images/svg/dashboard.svg ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"img/dashboard.76c68c28.svg\";\n\n//# sourceURL=webpack:///./src/assets/images/svg/dashboard.svg?");

/***/ }),

/***/ "./src/assets/images/svg/dollar.svg":
/*!******************************************!*\
  !*** ./src/assets/images/svg/dollar.svg ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"img/dollar.c1dc3d4a.svg\";\n\n//# sourceURL=webpack:///./src/assets/images/svg/dollar.svg?");

/***/ }),

/***/ "./src/assets/images/svg/en.svg":
/*!**************************************!*\
  !*** ./src/assets/images/svg/en.svg ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"img/en.001fcbb9.svg\";\n\n//# sourceURL=webpack:///./src/assets/images/svg/en.svg?");

/***/ }),

/***/ "./src/assets/images/svg/user.svg":
/*!****************************************!*\
  !*** ./src/assets/images/svg/user.svg ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"img/user.c26136b7.svg\";\n\n//# sourceURL=webpack:///./src/assets/images/svg/user.svg?");

/***/ }),

/***/ "./src/assets/images/svg/vn.svg":
/*!**************************************!*\
  !*** ./src/assets/images/svg/vn.svg ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"img/vn.be705dd1.svg\";\n\n//# sourceURL=webpack:///./src/assets/images/svg/vn.svg?");

/***/ }),

/***/ "./src/assets/styles/main.scss":
/*!*************************************!*\
  !*** ./src/assets/styles/main.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../../../node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??ref--9-oneOf-3-1!../../../node_modules/postcss-loader/src??ref--9-oneOf-3-2!../../../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-3-3!./main.scss */ \"./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./src/assets/styles/main.scss\");\nif(content.__esModule) content = content.default;\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"042102e1\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack:///./src/assets/styles/main.scss?");

/***/ }),

/***/ "./src/components/SaHeader.vue":
/*!*************************************!*\
  !*** ./src/components/SaHeader.vue ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _SaHeader_vue_vue_type_template_id_181455aa_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SaHeader.vue?vue&type=template&id=181455aa&scoped=true& */ \"./src/components/SaHeader.vue?vue&type=template&id=181455aa&scoped=true&\");\n/* harmony import */ var _SaHeader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SaHeader.vue?vue&type=script&lang=js& */ \"./src/components/SaHeader.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _SaHeader_vue_vue_type_style_index_0_id_181455aa_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SaHeader.vue?vue&type=style&index=0&id=181455aa&lang=scss&scoped=true& */ \"./src/components/SaHeader.vue?vue&type=style&index=0&id=181455aa&lang=scss&scoped=true&\");\n/* harmony import */ var _node_modules_vue_cli_service_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_cli_service_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n  _SaHeader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _SaHeader_vue_vue_type_template_id_181455aa_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _SaHeader_vue_vue_type_template_id_181455aa_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"181455aa\",\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/components/SaHeader.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/components/SaHeader.vue?");

/***/ }),

/***/ "./src/components/SaHeader.vue?vue&type=script&lang=js&":
/*!**************************************************************!*\
  !*** ./src/components/SaHeader.vue?vue&type=script&lang=js& ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_SaHeader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--13-0!../../node_modules/babel-loader/lib!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./SaHeader.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/components/SaHeader.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_SaHeader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/components/SaHeader.vue?");

/***/ }),

/***/ "./src/components/SaHeader.vue?vue&type=style&index=0&id=181455aa&lang=scss&scoped=true&":
/*!***********************************************************************************************!*\
  !*** ./src/components/SaHeader.vue?vue&type=style&index=0&id=181455aa&lang=scss&scoped=true& ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_SaHeader_vue_vue_type_style_index_0_id_181455aa_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--9-oneOf-1-0!../../node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!../../node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--9-oneOf-1-2!../../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./SaHeader.vue?vue&type=style&index=0&id=181455aa&lang=scss&scoped=true& */ \"./node_modules/vue-style-loader/index.js?!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/components/SaHeader.vue?vue&type=style&index=0&id=181455aa&lang=scss&scoped=true&\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_SaHeader_vue_vue_type_style_index_0_id_181455aa_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_SaHeader_vue_vue_type_style_index_0_id_181455aa_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_SaHeader_vue_vue_type_style_index_0_id_181455aa_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_SaHeader_vue_vue_type_style_index_0_id_181455aa_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n\n\n//# sourceURL=webpack:///./src/components/SaHeader.vue?");

/***/ }),

/***/ "./src/components/SaHeader.vue?vue&type=template&id=181455aa&scoped=true&":
/*!********************************************************************************!*\
  !*** ./src/components/SaHeader.vue?vue&type=template&id=181455aa&scoped=true& ***!
  \********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e1aadb4_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_SaHeader_vue_vue_type_template_id_181455aa_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e1aadb4-vue-loader-template\"}!../../node_modules/cache-loader/dist/cjs.js??ref--13-0!../../node_modules/babel-loader/lib!../../node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./SaHeader.vue?vue&type=template&id=181455aa&scoped=true& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"3e1aadb4-vue-loader-template\\\"}!./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/components/SaHeader.vue?vue&type=template&id=181455aa&scoped=true&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e1aadb4_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_SaHeader_vue_vue_type_template_id_181455aa_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e1aadb4_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_SaHeader_vue_vue_type_template_id_181455aa_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/SaHeader.vue?");

/***/ }),

/***/ "./src/components/SaSidebar.vue":
/*!**************************************!*\
  !*** ./src/components/SaSidebar.vue ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _SaSidebar_vue_vue_type_template_id_2e55322e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SaSidebar.vue?vue&type=template&id=2e55322e&scoped=true& */ \"./src/components/SaSidebar.vue?vue&type=template&id=2e55322e&scoped=true&\");\n/* harmony import */ var _SaSidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SaSidebar.vue?vue&type=script&lang=js& */ \"./src/components/SaSidebar.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _SaSidebar_vue_vue_type_style_index_0_id_2e55322e_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SaSidebar.vue?vue&type=style&index=0&id=2e55322e&lang=scss& */ \"./src/components/SaSidebar.vue?vue&type=style&index=0&id=2e55322e&lang=scss&\");\n/* harmony import */ var _SaSidebar_vue_vue_type_style_index_1_id_2e55322e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SaSidebar.vue?vue&type=style&index=1&id=2e55322e&lang=scss&scoped=true& */ \"./src/components/SaSidebar.vue?vue&type=style&index=1&id=2e55322e&lang=scss&scoped=true&\");\n/* harmony import */ var _node_modules_vue_cli_service_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_cli_service_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(\n  _SaSidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _SaSidebar_vue_vue_type_template_id_2e55322e_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _SaSidebar_vue_vue_type_template_id_2e55322e_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"2e55322e\",\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/components/SaSidebar.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/components/SaSidebar.vue?");

/***/ }),

/***/ "./src/components/SaSidebar.vue?vue&type=script&lang=js&":
/*!***************************************************************!*\
  !*** ./src/components/SaSidebar.vue?vue&type=script&lang=js& ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_SaSidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--13-0!../../node_modules/babel-loader/lib!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./SaSidebar.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/components/SaSidebar.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_SaSidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/components/SaSidebar.vue?");

/***/ }),

/***/ "./src/components/SaSidebar.vue?vue&type=style&index=0&id=2e55322e&lang=scss&":
/*!************************************************************************************!*\
  !*** ./src/components/SaSidebar.vue?vue&type=style&index=0&id=2e55322e&lang=scss& ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_SaSidebar_vue_vue_type_style_index_0_id_2e55322e_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--9-oneOf-1-0!../../node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!../../node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--9-oneOf-1-2!../../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./SaSidebar.vue?vue&type=style&index=0&id=2e55322e&lang=scss& */ \"./node_modules/vue-style-loader/index.js?!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/components/SaSidebar.vue?vue&type=style&index=0&id=2e55322e&lang=scss&\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_SaSidebar_vue_vue_type_style_index_0_id_2e55322e_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_SaSidebar_vue_vue_type_style_index_0_id_2e55322e_lang_scss___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_SaSidebar_vue_vue_type_style_index_0_id_2e55322e_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_SaSidebar_vue_vue_type_style_index_0_id_2e55322e_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n\n\n//# sourceURL=webpack:///./src/components/SaSidebar.vue?");

/***/ }),

/***/ "./src/components/SaSidebar.vue?vue&type=style&index=1&id=2e55322e&lang=scss&scoped=true&":
/*!************************************************************************************************!*\
  !*** ./src/components/SaSidebar.vue?vue&type=style&index=1&id=2e55322e&lang=scss&scoped=true& ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_SaSidebar_vue_vue_type_style_index_1_id_2e55322e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--9-oneOf-1-0!../../node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!../../node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--9-oneOf-1-2!../../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./SaSidebar.vue?vue&type=style&index=1&id=2e55322e&lang=scss&scoped=true& */ \"./node_modules/vue-style-loader/index.js?!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/components/SaSidebar.vue?vue&type=style&index=1&id=2e55322e&lang=scss&scoped=true&\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_SaSidebar_vue_vue_type_style_index_1_id_2e55322e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_SaSidebar_vue_vue_type_style_index_1_id_2e55322e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_SaSidebar_vue_vue_type_style_index_1_id_2e55322e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_SaSidebar_vue_vue_type_style_index_1_id_2e55322e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n\n\n//# sourceURL=webpack:///./src/components/SaSidebar.vue?");

/***/ }),

/***/ "./src/components/SaSidebar.vue?vue&type=template&id=2e55322e&scoped=true&":
/*!*********************************************************************************!*\
  !*** ./src/components/SaSidebar.vue?vue&type=template&id=2e55322e&scoped=true& ***!
  \*********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e1aadb4_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_SaSidebar_vue_vue_type_template_id_2e55322e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e1aadb4-vue-loader-template\"}!../../node_modules/cache-loader/dist/cjs.js??ref--13-0!../../node_modules/babel-loader/lib!../../node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./SaSidebar.vue?vue&type=template&id=2e55322e&scoped=true& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"3e1aadb4-vue-loader-template\\\"}!./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/components/SaSidebar.vue?vue&type=template&id=2e55322e&scoped=true&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e1aadb4_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_SaSidebar_vue_vue_type_template_id_2e55322e_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e1aadb4_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_SaSidebar_vue_vue_type_template_id_2e55322e_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/SaSidebar.vue?");

/***/ }),

/***/ "./src/components/SaTopBar.vue":
/*!*************************************!*\
  !*** ./src/components/SaTopBar.vue ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _SaTopBar_vue_vue_type_template_id_3addd89c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SaTopBar.vue?vue&type=template&id=3addd89c&scoped=true& */ \"./src/components/SaTopBar.vue?vue&type=template&id=3addd89c&scoped=true&\");\n/* harmony import */ var _SaTopBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SaTopBar.vue?vue&type=script&lang=js& */ \"./src/components/SaTopBar.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _SaTopBar_vue_vue_type_style_index_0_id_3addd89c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SaTopBar.vue?vue&type=style&index=0&id=3addd89c&lang=scss&scoped=true& */ \"./src/components/SaTopBar.vue?vue&type=style&index=0&id=3addd89c&lang=scss&scoped=true&\");\n/* harmony import */ var _node_modules_vue_cli_service_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_cli_service_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n  _SaTopBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _SaTopBar_vue_vue_type_template_id_3addd89c_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _SaTopBar_vue_vue_type_template_id_3addd89c_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"3addd89c\",\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/components/SaTopBar.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/components/SaTopBar.vue?");

/***/ }),

/***/ "./src/components/SaTopBar.vue?vue&type=script&lang=js&":
/*!**************************************************************!*\
  !*** ./src/components/SaTopBar.vue?vue&type=script&lang=js& ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_SaTopBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--13-0!../../node_modules/babel-loader/lib!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./SaTopBar.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/components/SaTopBar.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_SaTopBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/components/SaTopBar.vue?");

/***/ }),

/***/ "./src/components/SaTopBar.vue?vue&type=style&index=0&id=3addd89c&lang=scss&scoped=true&":
/*!***********************************************************************************************!*\
  !*** ./src/components/SaTopBar.vue?vue&type=style&index=0&id=3addd89c&lang=scss&scoped=true& ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_SaTopBar_vue_vue_type_style_index_0_id_3addd89c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--9-oneOf-1-0!../../node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!../../node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--9-oneOf-1-2!../../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./SaTopBar.vue?vue&type=style&index=0&id=3addd89c&lang=scss&scoped=true& */ \"./node_modules/vue-style-loader/index.js?!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/components/SaTopBar.vue?vue&type=style&index=0&id=3addd89c&lang=scss&scoped=true&\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_SaTopBar_vue_vue_type_style_index_0_id_3addd89c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_SaTopBar_vue_vue_type_style_index_0_id_3addd89c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_SaTopBar_vue_vue_type_style_index_0_id_3addd89c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_SaTopBar_vue_vue_type_style_index_0_id_3addd89c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n\n\n//# sourceURL=webpack:///./src/components/SaTopBar.vue?");

/***/ }),

/***/ "./src/components/SaTopBar.vue?vue&type=template&id=3addd89c&scoped=true&":
/*!********************************************************************************!*\
  !*** ./src/components/SaTopBar.vue?vue&type=template&id=3addd89c&scoped=true& ***!
  \********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e1aadb4_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_SaTopBar_vue_vue_type_template_id_3addd89c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e1aadb4-vue-loader-template\"}!../../node_modules/cache-loader/dist/cjs.js??ref--13-0!../../node_modules/babel-loader/lib!../../node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./SaTopBar.vue?vue&type=template&id=3addd89c&scoped=true& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"3e1aadb4-vue-loader-template\\\"}!./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/components/SaTopBar.vue?vue&type=template&id=3addd89c&scoped=true&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e1aadb4_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_SaTopBar_vue_vue_type_template_id_3addd89c_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e1aadb4_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_SaTopBar_vue_vue_type_template_id_3addd89c_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/SaTopBar.vue?");

/***/ }),

/***/ "./src/layouts/guest.vue":
/*!*******************************!*\
  !*** ./src/layouts/guest.vue ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _guest_vue_vue_type_template_id_64c946c9_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./guest.vue?vue&type=template&id=64c946c9&scoped=true& */ \"./src/layouts/guest.vue?vue&type=template&id=64c946c9&scoped=true&\");\n/* harmony import */ var _guest_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./guest.vue?vue&type=script&lang=js& */ \"./src/layouts/guest.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _guest_vue_vue_type_style_index_0_id_64c946c9_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./guest.vue?vue&type=style&index=0&id=64c946c9&lang=scss&scoped=true& */ \"./src/layouts/guest.vue?vue&type=style&index=0&id=64c946c9&lang=scss&scoped=true&\");\n/* harmony import */ var _node_modules_vue_cli_service_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_cli_service_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n  _guest_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _guest_vue_vue_type_template_id_64c946c9_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _guest_vue_vue_type_template_id_64c946c9_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"64c946c9\",\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/layouts/guest.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/layouts/guest.vue?");

/***/ }),

/***/ "./src/layouts/guest.vue?vue&type=script&lang=js&":
/*!********************************************************!*\
  !*** ./src/layouts/guest.vue?vue&type=script&lang=js& ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_guest_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--13-0!../../node_modules/babel-loader/lib!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./guest.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/layouts/guest.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_guest_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/layouts/guest.vue?");

/***/ }),

/***/ "./src/layouts/guest.vue?vue&type=style&index=0&id=64c946c9&lang=scss&scoped=true&":
/*!*****************************************************************************************!*\
  !*** ./src/layouts/guest.vue?vue&type=style&index=0&id=64c946c9&lang=scss&scoped=true& ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_guest_vue_vue_type_style_index_0_id_64c946c9_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--9-oneOf-1-0!../../node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!../../node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--9-oneOf-1-2!../../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./guest.vue?vue&type=style&index=0&id=64c946c9&lang=scss&scoped=true& */ \"./node_modules/vue-style-loader/index.js?!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/layouts/guest.vue?vue&type=style&index=0&id=64c946c9&lang=scss&scoped=true&\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_guest_vue_vue_type_style_index_0_id_64c946c9_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_guest_vue_vue_type_style_index_0_id_64c946c9_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_guest_vue_vue_type_style_index_0_id_64c946c9_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_guest_vue_vue_type_style_index_0_id_64c946c9_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n\n\n//# sourceURL=webpack:///./src/layouts/guest.vue?");

/***/ }),

/***/ "./src/layouts/guest.vue?vue&type=template&id=64c946c9&scoped=true&":
/*!**************************************************************************!*\
  !*** ./src/layouts/guest.vue?vue&type=template&id=64c946c9&scoped=true& ***!
  \**************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e1aadb4_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_guest_vue_vue_type_template_id_64c946c9_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e1aadb4-vue-loader-template\"}!../../node_modules/cache-loader/dist/cjs.js??ref--13-0!../../node_modules/babel-loader/lib!../../node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./guest.vue?vue&type=template&id=64c946c9&scoped=true& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"3e1aadb4-vue-loader-template\\\"}!./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/layouts/guest.vue?vue&type=template&id=64c946c9&scoped=true&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e1aadb4_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_guest_vue_vue_type_template_id_64c946c9_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e1aadb4_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_guest_vue_vue_type_template_id_64c946c9_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/layouts/guest.vue?");

/***/ }),

/***/ "./src/layouts/member.vue":
/*!********************************!*\
  !*** ./src/layouts/member.vue ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _member_vue_vue_type_template_id_4f9598f9_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./member.vue?vue&type=template&id=4f9598f9&scoped=true& */ \"./src/layouts/member.vue?vue&type=template&id=4f9598f9&scoped=true&\");\n/* harmony import */ var _member_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./member.vue?vue&type=script&lang=js& */ \"./src/layouts/member.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _member_vue_vue_type_style_index_0_id_4f9598f9_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./member.vue?vue&type=style&index=0&id=4f9598f9&lang=scss&scoped=true& */ \"./src/layouts/member.vue?vue&type=style&index=0&id=4f9598f9&lang=scss&scoped=true&\");\n/* harmony import */ var _node_modules_vue_cli_service_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_cli_service_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n  _member_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _member_vue_vue_type_template_id_4f9598f9_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _member_vue_vue_type_template_id_4f9598f9_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"4f9598f9\",\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/layouts/member.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/layouts/member.vue?");

/***/ }),

/***/ "./src/layouts/member.vue?vue&type=script&lang=js&":
/*!*********************************************************!*\
  !*** ./src/layouts/member.vue?vue&type=script&lang=js& ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_member_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--13-0!../../node_modules/babel-loader/lib!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./member.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/layouts/member.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_member_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/layouts/member.vue?");

/***/ }),

/***/ "./src/layouts/member.vue?vue&type=style&index=0&id=4f9598f9&lang=scss&scoped=true&":
/*!******************************************************************************************!*\
  !*** ./src/layouts/member.vue?vue&type=style&index=0&id=4f9598f9&lang=scss&scoped=true& ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_member_vue_vue_type_style_index_0_id_4f9598f9_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--9-oneOf-1-0!../../node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!../../node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--9-oneOf-1-2!../../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./member.vue?vue&type=style&index=0&id=4f9598f9&lang=scss&scoped=true& */ \"./node_modules/vue-style-loader/index.js?!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/layouts/member.vue?vue&type=style&index=0&id=4f9598f9&lang=scss&scoped=true&\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_member_vue_vue_type_style_index_0_id_4f9598f9_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_member_vue_vue_type_style_index_0_id_4f9598f9_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_member_vue_vue_type_style_index_0_id_4f9598f9_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_member_vue_vue_type_style_index_0_id_4f9598f9_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n\n\n//# sourceURL=webpack:///./src/layouts/member.vue?");

/***/ }),

/***/ "./src/layouts/member.vue?vue&type=template&id=4f9598f9&scoped=true&":
/*!***************************************************************************!*\
  !*** ./src/layouts/member.vue?vue&type=template&id=4f9598f9&scoped=true& ***!
  \***************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e1aadb4_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_member_vue_vue_type_template_id_4f9598f9_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"3e1aadb4-vue-loader-template\"}!../../node_modules/cache-loader/dist/cjs.js??ref--13-0!../../node_modules/babel-loader/lib!../../node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./member.vue?vue&type=template&id=4f9598f9&scoped=true& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"3e1aadb4-vue-loader-template\\\"}!./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/layouts/member.vue?vue&type=template&id=4f9598f9&scoped=true&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e1aadb4_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_member_vue_vue_type_template_id_4f9598f9_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_3e1aadb4_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_member_vue_vue_type_template_id_4f9598f9_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/layouts/member.vue?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var _App_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue */ \"./src/App.vue\");\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./router */ \"./src/router.js\");\n/* harmony import */ var _stores__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./stores */ \"./src/stores/index.js\");\n/* harmony import */ var _mixins__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mixins */ \"./src/mixins/index.js\");\n/* harmony import */ var _modules__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules */ \"./src/modules/index.js\");\n/* harmony import */ var _plugins__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./plugins */ \"./src/plugins/index.js\");\n/* harmony import */ var _assets_styles_main_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./assets/styles/main.scss */ \"./src/assets/styles/main.scss\");\n/* harmony import */ var _assets_styles_main_scss__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_assets_styles_main_scss__WEBPACK_IMPORTED_MODULE_7__);\n\n\n\n\n\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].config.productionTip = false;\nnew vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n  router: _router__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n  store: _stores__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n  i18n: _plugins__WEBPACK_IMPORTED_MODULE_6__[\"i18n\"],\n  render: function render(h) {\n    return h(_App_vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n  }\n}).$mount('#app');\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "./src/mixins/index.js":
/*!*****************************!*\
  !*** ./src/mixins/index.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ \"./node_modules/@babel/runtime/helpers/typeof.js\");\n/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n\n\nvue__WEBPACK_IMPORTED_MODULE_1__[\"default\"].mixin({\n  data: function data() {\n    return {};\n  },\n  methods: {\n    formatImage: function formatImage(path) {\n      return \"https://staging-s3.go2joy.vn/350w/\" + path;\n    },\n    getCookie: function getCookie(cname) {\n      var name = cname + '=';\n      var decodedCookie = decodeURIComponent(document.cookie);\n      var ca = decodedCookie.split(';');\n      for (var i = 0; i < ca.length; i++) {\n        var c = ca[i];\n        while (c.charAt(0) === ' ') {\n          c = c.substring(1);\n        }\n        if (c.indexOf(name) === 0) {\n          return c.substring(name.length, c.length);\n        }\n      }\n      return '';\n    },\n    defaultFormatter: function defaultFormatter(value) {\n      var empty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;\n      if (empty !== true) {\n        return value !== null ? value : 'N/A';\n      } else {\n        return value !== null && value !== '' ? value : 'N/A';\n      }\n    },\n    formatMoney: function formatMoney(value) {\n      var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {\n        format: 'it-IT',\n        currency: 'VND'\n      };\n      return value ? value.toLocaleString(option.format, {\n        style: 'decimal',\n        currency: option.currency\n      }) : '0';\n    },\n    // Ex: 16:00:00, 16:00, 16h00p00s, 16h00m00s\n    // reg need upgrade\n    formatTimeByString: function formatTimeByString(time) {\n      if (time == null) {\n        return '';\n      }\n      var reg = /[:|h]/;\n      var convertTime = String(time);\n      switch (convertTime.match(reg)[0]) {\n        case ':':\n          if (convertTime.split(reg).length === 3) {\n            return this.formatTime(convertTime);\n          }\n          return convertTime;\n        default:\n          throw this.$message({\n            type: 'error',\n            message: 'Format Not Found'\n          });\n      }\n    },\n    formatTime: function formatTime(time) {\n      if (time) {\n        var dateObj = new Date('2011-04-20T' + time + '.01');\n        var hour = dateObj.getHours();\n        var min = dateObj.getMinutes();\n        if (hour < 10) {\n          hour = '0' + hour;\n        }\n        if (min < 10) {\n          min = '0' + min;\n        }\n        return hour + ':' + min;\n      }\n    },\n    getAfterBeforeDate: function getAfterBeforeDate(date) {\n      var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;\n      var isBefore = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;\n      if (date) {\n        var dateObj = new Date(date);\n        var month = dateObj.getMonth() + 1;\n        var day = isBefore === false ? String(dateObj.getDate() - 1).padStart(2, '0') : String(dateObj.getDate() + 1).padStart(2, '0');\n        var year = dateObj.getFullYear();\n        if (day === '00') {\n          var today = new Date();\n          month = month - 1;\n          day = String(new Date(today.getFullYear(), month, 0).getDate()).padStart(2, '0');\n        }\n        if (month < 10) {\n          month = '0' + month;\n        }\n        if (time !== true) {\n          return year + '-' + month + '-' + day;\n        } else {\n          var hour = dateObj.getHours();\n          var min = dateObj.getMinutes();\n          if (hour < 10) {\n            hour = '0' + hour;\n          }\n          if (min < 10) {\n            min = '0' + min;\n          }\n          return year + '-' + month + '-' + day + ' ' + hour + ':' + min;\n        }\n      }\n    },\n    formatTimeByDate: function formatTimeByDate(time) {\n      if (time) {\n        var dateObj = new Date(time);\n        var hour = dateObj.getHours();\n        var min = dateObj.getMinutes();\n        if (hour < 10) {\n          hour = '0' + hour;\n        }\n        if (min < 10) {\n          min = '0' + min;\n        }\n        return hour + ':' + min;\n      }\n    },\n    getPassDate: function getPassDate(date) {\n      var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;\n      if (date) {\n        var dateObj = new Date(date);\n        var month = dateObj.getMonth() + 1;\n        var day = String(dateObj.getDate() - 1).padStart(2, '0');\n        var year = dateObj.getFullYear();\n        if (day === '00') {\n          var today = new Date();\n          month = month - 1;\n          day = String(new Date(today.getFullYear(), month, 0).getDate()).padStart(2, '0');\n        }\n        if (month < 10) {\n          month = '0' + month;\n        }\n        if (time !== true) {\n          return new Date(year + '-' + month + '-' + day);\n        } else {\n          var hour = dateObj.getHours();\n          var min = dateObj.getMinutes();\n          if (hour < 10) {\n            hour = '0' + hour;\n          }\n          if (min < 10) {\n            min = '0' + min;\n          }\n          return new Date(year + '-' + month + '-' + day + ' ' + hour + ':' + min);\n        }\n      }\n    },\n    formatDate: function formatDate(date) {\n      var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;\n      if (date && date !== ' ') {\n        var dateObj = new Date();\n        if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(date) !== 'object') {\n          // format date for safari\n          date = date.replace(/-/g, '/');\n          dateObj = new Date(date);\n        } else {\n          dateObj = date;\n        }\n        var month = dateObj.getMonth() + 1;\n        var day = String(dateObj.getDate()).padStart(2, '0');\n        var year = dateObj.getFullYear();\n        if (month < 10) {\n          month = '0' + month;\n        }\n        if (time !== true) {\n          return year + '-' + month + '-' + day;\n        } else {\n          var hour = dateObj.getHours();\n          var min = dateObj.getMinutes();\n          if (hour < 10) {\n            hour = '0' + hour;\n          }\n          if (min < 10) {\n            min = '0' + min;\n          }\n          return year + '-' + month + '-' + day + ' ' + hour + ':' + min;\n        }\n      } else {\n        return ' ';\n      }\n    },\n    setLocalStorageWithExpiry: function setLocalStorageWithExpiry(key, value, ttl) {\n      var now = new Date();\n\n      // `item` is an object which contains the original value\n      // as well as the time when it's supposed to expire\n      var item = {\n        value: value,\n        expiry: now.getTime() + ttl\n      };\n      localStorage.setItem(key, JSON.stringify(item));\n    },\n    getLocalStorageWithExpiry: function getLocalStorageWithExpiry(key) {\n      var itemStr = localStorage.getItem(key);\n\n      // if the item doesn't exist, return null\n      if (!itemStr) {\n        return null;\n      }\n      var item = JSON.parse(itemStr);\n      var now = new Date();\n\n      // compare the expiry time of the item with the current time\n      if (now.getTime() > item.expiry) {\n        // If the item is expired, delete the item from storage\n        // and return null\n        localStorage.removeItem(key);\n        return null;\n      }\n      return item.value;\n    },\n    // check hotel group or hotel single\n    checkIsHotelGroup: function checkIsHotelGroup() {\n      var itemStr = localStorage.getItem('profile');\n      var item = JSON.parse(itemStr);\n      var profile = item.value;\n      var roleSn = profile.roleSn;\n      var hotelGroupSn = profile.hotelGroupSn;\n      return roleSn === 4 && hotelGroupSn != null;\n    },\n    hasPermission: function hasPermission(page, action) {\n      var itemStr = localStorage.getItem('profile');\n      var item = JSON.parse(itemStr);\n      var profile = item.value;\n      var permissions = profile.permissions;\n      var hasPermission = 0;\n      if (permissions[page]) {\n        var _permissions$page$act;\n        hasPermission = (_permissions$page$act = permissions[page][action]) !== null && _permissions$page$act !== void 0 ? _permissions$page$act : 0;\n      }\n      return hasPermission;\n    },\n    checkPermissionMenu: function checkPermissionMenu(page) {\n      var itemStr = localStorage.getItem('profile');\n      var item = JSON.parse(itemStr);\n      var profile = item.value;\n      var permissions = profile.permissions;\n      var hasPermission = 1;\n      if (permissions[page]) {\n        var _permissions$page$pVi;\n        hasPermission = (_permissions$page$pVi = permissions[page].pView) !== null && _permissions$page$pVi !== void 0 ? _permissions$page$pVi : 0;\n        if (hasPermission === 1) {\n          return false;\n        } else {\n          return true;\n        }\n      }\n    },\n    hasRoleSn: function hasRoleSn() {\n      var itemStr = localStorage.getItem('profile');\n      var item = JSON.parse(itemStr);\n      var profile = item.value;\n      var hasRoleSn = profile.roleSn;\n      return hasRoleSn;\n    },\n    forceLogout: function forceLogout() {\n      localStorage.removeItem('access_token');\n      localStorage.removeItem('profile');\n      localStorage.removeItem('isPopupVisible');\n      window.location.href = 'sign-in';\n    },\n    groupBy: function groupBy(data, key) {\n      return data.reduce(function (r, a) {\n        r[a[key]] = r[a[key]] || [];\n        r[a[key]].push(a);\n        return r;\n      }, Object.create(null));\n    },\n    formatEvenPrice: function formatEvenPrice(price) {\n      var value = 0;\n      if (price > 1000) {\n        value = Math.round(price / 1000) * 1000;\n      } else {\n        value = price;\n      }\n      return value;\n    },\n    formatEvenPercent: function formatEvenPercent(value) {\n      return Math.round(value);\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/mixins/index.js?");

/***/ }),

/***/ "./src/modules/index.js":
/*!******************************!*\
  !*** ./src/modules/index.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/asyncToGenerator.js\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar initRouter = /*#__PURE__*/function () {\n  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee() {\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.next = 2;\n            return __webpack_require__.e(/*! import() */ 1).then(__webpack_require__.bind(null, /*! ./hotels */ \"./src/modules/hotels/index.js\"));\n          case 2:\n            _context.next = 4;\n            return __webpack_require__.e(/*! import() */ 3).then(__webpack_require__.bind(null, /*! ./page-not-found */ \"./src/modules/page-not-found/index.js\"));\n          case 4:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n  return function initRouter() {\n    return _ref.apply(this, arguments);\n  };\n}();\ninitRouter();\n\n//# sourceURL=webpack:///./src/modules/index.js?");

/***/ }),

/***/ "./src/plugins/element-ui.js":
/*!***********************************!*\
  !*** ./src/plugins/element-ui.js ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var element_ui_lib_theme_chalk_index_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! element-ui/lib/theme-chalk/index.css */ \"./node_modules/element-ui/lib/theme-chalk/index.css\");\n/* harmony import */ var element_ui_lib_theme_chalk_index_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(element_ui_lib_theme_chalk_index_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var element_ui_lib_locale_lang_en__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! element-ui/lib/locale/lang/en */ \"./node_modules/element-ui/lib/locale/lang/en.js\");\n/* harmony import */ var element_ui_lib_locale_lang_en__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(element_ui_lib_locale_lang_en__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var element_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! element-ui */ \"./node_modules/element-ui/lib/element-ui.common.js\");\n/* harmony import */ var element_ui__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(element_ui__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nelement_ui__WEBPACK_IMPORTED_MODULE_3___default.a.Select.computed.readonly = function () {\n  // trade-off for IE input readonly problem: https://github.com/ElemeFE/element/issues/10403\n  // https://github.com/ElemeFE/element/issues/11397\n  var isIE = !this.$isServer && !Number.isNaN(Number(document.documentMode));\n  return !(this.filterable || this.multiple || !isIE) && !this.visible;\n};\nvue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].use(element_ui__WEBPACK_IMPORTED_MODULE_3___default.a, {\n  locale: element_ui_lib_locale_lang_en__WEBPACK_IMPORTED_MODULE_2___default.a\n});\n\n//# sourceURL=webpack:///./src/plugins/element-ui.js?");

/***/ }),

/***/ "./src/plugins/eventBus.js":
/*!*********************************!*\
  !*** ./src/plugins/eventBus.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n\nvar EventBus = new vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n/* harmony default export */ __webpack_exports__[\"default\"] = (EventBus);\n\n//# sourceURL=webpack:///./src/plugins/eventBus.js?");

/***/ }),

/***/ "./src/plugins/i18n/en-file.js":
/*!*************************************!*\
  !*** ./src/plugins/i18n/en-file.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _language_en_general_breadcrumb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./language/en/general/breadcrumb */ \"./src/plugins/i18n/language/en/general/breadcrumb.js\");\n/* harmony import */ var _language_en_general_day_of_week__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./language/en/general/day-of-week */ \"./src/plugins/i18n/language/en/general/day-of-week.js\");\n/* harmony import */ var _language_en_general_placeholder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./language/en/general/placeholder */ \"./src/plugins/i18n/language/en/general/placeholder.js\");\n/* harmony import */ var _language_en_general_validation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./language/en/general/validation */ \"./src/plugins/i18n/language/en/general/validation.js\");\n/* harmony import */ var _language_en_general_option__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./language/en/general/option */ \"./src/plugins/i18n/language/en/general/option.js\");\n/* harmony import */ var _language_en_general_option_gender__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./language/en/general/option/gender */ \"./src/plugins/i18n/language/en/general/option/gender.js\");\n/* harmony import */ var _language_en_general_option_status__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./language/en/general/option/status */ \"./src/plugins/i18n/language/en/general/option/status.js\");\n/* harmony import */ var _language_en_general_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./language/en/general/button */ \"./src/plugins/i18n/language/en/general/button.js\");\n/* harmony import */ var _language_en_general_message__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./language/en/general/message */ \"./src/plugins/i18n/language/en/general/message.js\");\n/* harmony import */ var _language_en_general_payment__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./language/en/general/payment */ \"./src/plugins/i18n/language/en/general/payment.js\");\n\n\n\n\n\n\n\n\n\n\nfunction loadLocaleMessages() {\n  var files = __webpack_require__(\"./src/plugins/i18n/language/en/pages sync recursive \\\\.js$\");\n  var messages = {};\n  files.keys().forEach(function (key) {\n    var matched = key.match(/([A-Za-z0-9-_]+)\\./i);\n    if (matched && matched.length > 1) {\n      var locale = matched[1];\n      messages[locale] = files(key).default;\n    }\n  });\n  return messages;\n}\nvar page = loadLocaleMessages();\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  lang: 'en',\n  omitZeroMinute: 'true',\n  search: 'Search',\n  hours: 'Hours',\n  overnight: 'Overnight',\n  daily: 'Daily',\n  additional: 'Additional',\n  breadcrumb: _language_en_general_breadcrumb__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  daysOfWeek: _language_en_general_day_of_week__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  placeholder: _language_en_general_placeholder__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n  validation: _language_en_general_validation__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n  payment: _language_en_general_payment__WEBPACK_IMPORTED_MODULE_9__[\"default\"],\n  page: page,\n  option: _language_en_general_option__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n  gender: _language_en_general_option_gender__WEBPACK_IMPORTED_MODULE_5__[\"default\"],\n  status: _language_en_general_option_status__WEBPACK_IMPORTED_MODULE_6__[\"default\"],\n  button: _language_en_general_button__WEBPACK_IMPORTED_MODULE_7__[\"default\"],\n  message: _language_en_general_message__WEBPACK_IMPORTED_MODULE_8__[\"default\"],\n  no_data: 'No data',\n  loading: 'Loading'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/en-file.js?");

/***/ }),

/***/ "./src/plugins/i18n/i18n.js":
/*!**********************************!*\
  !*** ./src/plugins/i18n/i18n.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var vue_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-i18n */ \"./node_modules/vue-i18n/dist/vue-i18n.esm.js\");\n/* harmony import */ var _vn_file__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vn-file */ \"./src/plugins/i18n/vn-file.js\");\n/* harmony import */ var _en_file__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./en-file */ \"./src/plugins/i18n/en-file.js\");\n\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].use(vue_i18n__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\nvar messages = {\n  vi: _vn_file__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n  en: _en_file__WEBPACK_IMPORTED_MODULE_3__[\"default\"]\n};\nvar i18n = new vue_i18n__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n  locale: localStorage.getItem('lang') ? localStorage.getItem('lang') : 'vi',\n  // set locale\n  fallbackLocale: 'vi',\n  // set fallback locale\n  messages: messages // set locale messages\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (i18n);\n\n//# sourceURL=webpack:///./src/plugins/i18n/i18n.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/general/breadcrumb.js":
/*!************************************************************!*\
  !*** ./src/plugins/i18n/language/en/general/breadcrumb.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  home: 'Home display Mgt',\n  activities: 'Activities Mgt',\n  activities_detail: 'Activities detail',\n  user: 'User',\n  userMgt: 'User Mgt',\n  deviceMgt: 'Device Mgt',\n  counselingMgt: 'Q&A Mgt',\n  replyCounselings: 'Reply counselings',\n  createCounselings: 'Create counselings',\n  dashboard: 'Dashboard',\n  userDetails: 'Detail',\n  categoryEdit: 'Edit',\n  ApplyForHotel: 'Apply for hotel',\n  selectApplyHotel: 'Select apply hotel',\n  page_not_found: 'Page not found',\n  collection: 'Collection',\n  collectionDetails: 'Details',\n  collectionEdit: 'Edit',\n  collectionCreate: 'Create',\n  categoryDetails: 'Details',\n  hotels: 'Hotel',\n  product_type_mgt: 'Product type Mgt',\n  product_type_edit: 'Product type Edit',\n  product_type_create: 'Product type Create',\n  product_mgt: 'Product Mgt',\n  product_detail: 'Product Detail',\n  product_edit: 'Product  Edit',\n  hotel_group_mgt: 'Hotel group Mgt',\n  hotel_group_create: 'Hotel group create',\n  hotel_group_edit: 'Hotel group edit',\n  hotel_group_detail: 'Hotel group detail',\n  hotelDisplay: 'Hotel display Mgt',\n  hotelDisplayCreate: 'Create',\n  hotelDisplayEdit: 'Edit',\n  hotelDisplayDetails: 'Details',\n  hotel_room_type: 'Room type Mgt',\n  roomType: 'Room type Mgt',\n  detailRoomType: 'Detail room type',\n  createRoomType: 'Create room type',\n  editRoomType: 'Edit room type',\n  settingFs: 'FS setting',\n  hotel_staff_mgt: 'Hotel staff Mgt',\n  hotel_staff_edit: 'Hotel staff edit',\n  hotel_staff_create: 'Hotel staff create',\n  hotel_staff_detail: 'Hotel staff detail',\n  hotel_facility_mgt: 'Facility mgt',\n  facility_create: 'Facility create',\n  facility_edit: 'Facility edit',\n  notice_to_hotel: 'Notice to hotel',\n  notice_to_hotel_detail: 'Notice to hotel detail',\n  notice_to_hotel_create: 'Notice to hotel create',\n  notice_edit: 'Notice to hotel edit',\n  reply_to_hotel: 'Reply to hotel',\n  send_notice_to_hotel: 'Send notice to hotel',\n  notice_to_hotel_reply: 'Hotel list',\n  create_apply_for_hotel: 'Apply for hotel',\n  list_apply_for_hotel: 'List apply for hotel',\n  stamp: 'Stamp mgt',\n  stampCreate: 'Create',\n  stampEdit: 'Edit',\n  stampDetails: 'View stamp',\n  stampDetailTotalUser: 'Detail total user mgt',\n  marketing: 'Marketing',\n  notice: 'Notice',\n  noticeCreate: 'Create',\n  noticeEdit: 'Edit',\n  noticeDetails: 'Detail',\n  mileagePointMgt: 'Mileage point mgt',\n  mpBoostingMgt: 'MP boosting mgt',\n  pointListMgt: 'Point List Mgt',\n  mpUserMgt: 'MP user mgt',\n  promotion: 'Promotion',\n  chooseWinner: 'Choose winner',\n  createPromotion: 'Create promotion',\n  editPromotion: 'Edit promotion',\n  couponCondition: 'Coupon condition',\n  applyForHotelRoom: 'Apply for hotel room',\n  promotionDetails: 'Promotion Details',\n  groupPromotion: 'Group promotion',\n  groupPromotionEdit: 'Group promotion edit',\n  createGroupPromotion: 'Group promotion create',\n  settingGroupPromotion: 'Group promotion setting',\n  applyForHotel: 'Apply for hotel',\n  applyForUser: 'Apply for user',\n  hotelApply: 'Hotel apply',\n  userApply: 'User apply',\n  applyForPromotion: 'Promotion apply',\n  inviteFriend: 'Invite friend',\n  inviteFriendCreate: 'Create',\n  inviteFriendEdit: 'Edit',\n  inviteFriendDetails: 'Detail',\n  inviteFriendDetailsList: 'Inviter report',\n  inviteeList: 'Invitee report',\n  notification: 'Notification',\n  notificationCreate: 'Create',\n  notificationEdit: 'Edit',\n  notificationDetails: 'Detail',\n  banner: 'Banner',\n  bannerCreate: 'Create',\n  bannerEdit: 'Edit',\n  bannerSetting: 'Seting of display',\n  bannerDetails: 'Detail',\n  popup: 'Popup',\n  popupCreate: 'Create',\n  popupEdit: 'Edit',\n  popupSetting: 'Seting of display',\n  popupDetails: 'Detail',\n  pgpb: 'PGPB',\n  pgpbCreate: 'Create',\n  pgpbEdit: 'Edit',\n  pgpbDetails: 'Detail',\n  pgpbTotalOfIntroduction: 'User Invited List',\n  sendingMail: 'Sending Mail Mgt',\n  sendingMailCreate: 'Create',\n  sendingMailDetails: 'Detail list hotel Debt',\n  generalSetting: 'General setting',\n  settings: 'Settings',\n  keyword: 'Keyword',\n  review: 'Review Mgt',\n  reviewDetail: 'Review detail',\n  add: 'Add',\n  edit: 'Update',\n  create: 'Create',\n  detail: 'Detail',\n  view_review_hotel: 'Hotel review detail',\n  service_agreement_mgt: 'Service agreement Mgt',\n  update_service_agreement_mgt: 'Update service agreement Mgt',\n  apply_for_promotion: 'Apply for Promotion',\n  apply_for_user: 'Apply for user',\n  profile: 'Information User',\n  saprofile_update: 'Update information user',\n  my_profile: 'My Profile',\n  logout: 'Logout',\n  userEdit: 'Edit',\n  editorDemo: 'Editor Demo',\n  firstBooking: 'First Booking',\n  firstBookingDetails: 'Details',\n  bookingReport: 'Booking Report',\n  cashFlowReport: 'Cash flow report',\n  cashFlowReportDetail: 'Cash Flow Report Detail',\n  sendMail: 'Send Mail',\n  hotelDebt: 'Hotel debt',\n  hotelDebtDetailList: 'Hotel debt detail list',\n  hotelDebtDetail: 'Hotel debt detail',\n  hotelDebtEdit: 'Hotel debt Edit',\n  hotelDebtCreate: 'Hotel debt Create',\n  hotelDebtReview: 'Review hotel debt',\n  bookingReportDetails: 'Details',\n  bookingReportHotels: 'Hotels',\n  booking: 'Booking',\n  bookingAdhoc: 'Booking Adhoc',\n  bookingAdhocSearch: 'Booking Adhoc search',\n  searchByBookingNo: 'Search by booking no',\n  article: 'Article',\n  articleEdit: 'Edit',\n  articleCreate: 'Create',\n  articleHome: 'Article home',\n  articleSetup: 'Setup',\n  'Pin article': 'Pin article',\n  'Article with title': 'Article with title',\n  'Article with image': 'Article with image',\n  'Article with summary': 'Article with summary',\n  'Article collection': 'Article collection',\n  openSecondSplash: 'Open second splash',\n  hotelOntop: 'Hotel on top management',\n  openSecondSplashEdit: 'Edit',\n  articleCategory: 'Article category',\n  articleCategoryCreate: 'Create',\n  articleCategoryEdit: 'Edit',\n  openSecondSplashCreate: 'Create',\n  hotelOnTop: 'Hotel on top',\n  hotelOnTopEdit: 'Edit',\n  hotelOnTopCreate: 'Create',\n  saAccountMgt: 'SA account Mgt',\n  go2joyConfirmGroup: 'Confirm group Mgt',\n  go2joyStaffs: 'Go2joy staffs mgt',\n  go2joyStaffEdit: 'Edit',\n  go2joyStaffCreate: 'Create',\n  go2joyStaffDetails: 'Details',\n  sms: 'SMS',\n  trackingMgt: 'Tracking Mgt',\n  bookingTrackingMgt: 'Booking tracking',\n  hotelStatusTrackingMgt: 'Hotel status tracking',\n  hotelIntroduceSignup: 'Hotel introduce signup',\n  numberOfSignup: 'Num of signup',\n  checkinByRegister: 'Checkin by hotel code',\n  crm: 'CRM',\n  crmCreate: 'Create crm',\n  crmDetail: 'Detail crm',\n  crmEdit: 'Edit crm',\n  mobileList: 'Mobile list',\n  smsCreate: 'Create',\n  SaleIncentiveHistoryDetails: 'Details',\n  SaleIncentiveHistory: 'Sale incentive history',\n  SaleIncentiveHistoryCreate: 'Create',\n  DetailsOfStaff: 'Detail of staff',\n  AccountSaleIncentiveDetail: 'Account sale incentive detail',\n  revenueReport: 'Revenue Report',\n  revenueReportDetails: 'Details',\n  permission: 'Permission',\n  mpBoostingDetails: 'MP boosting details',\n  mpBoostingCreate: 'MP boosting create',\n  mpBoostingEdit: 'MP boosting Edit',\n  mpListHotelBoostingMgt: 'List hotel apply to MP',\n  luckyWheel: 'Lucky wheel',\n  createEditLuckyWheel: 'Create, edit lucky wheel'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/general/breadcrumb.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/general/button.js":
/*!********************************************************!*\
  !*** ./src/plugins/i18n/language/en/general/button.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  update: 'Update',\n  add: 'Add',\n  search: 'Search',\n  create: 'Create',\n  done: 'Done',\n  edit: 'Edit',\n  save: 'Save',\n  reply: 'Reply',\n  delete: 'Delete',\n  chooseFile: 'Choose file',\n  export: 'Export file',\n  back: 'Back',\n  cancel: 'Cancel',\n  ok: 'OK',\n  confirm: 'Confirm',\n  disable: 'Disable',\n  enable: 'Enable',\n  dsks: 'DSKS',\n  account: 'Account',\n  createRoomHotel: 'Create Room Type',\n  ungroup: 'unGroup',\n  send: 'Send',\n  download: 'Download',\n  detail: 'Detail',\n  sendMail: 'Send mail',\n  resend: 'Re send',\n  stop: 'Stop',\n  sendRequest: 'Send request',\n  continue: 'Continue',\n  settingOfDisplay: 'Setting of display',\n  checkAll: 'Check All',\n  hidden: 'Hidden',\n  show: 'Show',\n  list: 'List',\n  hide: 'Hide',\n  management: 'Management',\n  setup: 'Setup',\n  remove: 'Remove',\n  addThumbnail: 'Add Thumbnail',\n  refresh: 'Refresh',\n  copy: 'Copy',\n  chooseWinner: 'Choose winner',\n  donate: 'Donate',\n  settingDisplay: 'Setting display',\n  sent: 'Sent',\n  backTo: 'Back to first step',\n  play: 'Play',\n  hotelIntroductSignup: 'Hotel Introduce Signup',\n  hotelAmenityPack: 'Hotel Amenity Pack',\n  mobileLists: 'mobile list',\n  report: 'Report',\n  clone: 'Clone',\n  next: 'Next',\n  refund: 'Refund'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/general/button.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/general/day-of-week.js":
/*!*************************************************************!*\
  !*** ./src/plugins/i18n/language/en/general/day-of-week.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  monday: 'Monday',\n  tuesday: 'Tuesday',\n  wednesday: 'Wednesday',\n  thursday: 'Thursday',\n  friday: 'Friday',\n  saturday: 'Saturday',\n  sunday: 'Sunday'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/general/day-of-week.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/general/message.js":
/*!*********************************************************!*\
  !*** ./src/plugins/i18n/language/en/general/message.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  loading: 'Loading...',\n  updateSuccess: 'Update successful',\n  createSuccess: 'Create successful',\n  addSuccess: 'Add successful',\n  success: 'Success!',\n  warning: 'Warning',\n  exportSuccess: 'Export successful',\n  areYouSure: 'Are yot sure?',\n  deleteSuccess: 'Delete successful',\n  downloadSuccess: 'Download file successful',\n  sendSuccess: 'Send successful',\n  requestSuccess: 'Request successful',\n  messageAlert: 'Are you sure?',\n  messageWarning: 'Warning',\n  saveSuccess: 'Save successful'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/general/message.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/general/option.js":
/*!********************************************************!*\
  !*** ./src/plugins/i18n/language/en/general/option.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  yes: 'Yes',\n  no: 'No',\n  all: 'All',\n  selected: 'Selected',\n  allSelected: 'All selected',\n  public: 'Public',\n  private: 'Private',\n  hight: 'Hight',\n  weight: 'weight',\n  hotelStatus: {\n    waiting: 'Waiting',\n    displayed: 'Displayed',\n    contracted: 'Contracted',\n    trial: 'Trial',\n    terminated: 'Terminated',\n    suspended: 'Suspended',\n    hotelAvailable: 'Available',\n    hotelUnAvailable: 'Unavailable'\n  },\n  bookingNotificationBy: {\n    go2joyParterApp: 'Go2Joy\\'s Partner App',\n    sms: 'SMS',\n    email: 'Email'\n  },\n  payments: {\n    both: 'Both',\n    atHotel: 'At hotel',\n    online: 'Just pay online'\n  },\n  hotelTypes: {\n    allTypes: 'All types',\n    none: 'None',\n    couples: 'Couples',\n    travel: 'Travel',\n    couplesAndTravel: 'Couples and Travel',\n    quarantine: 'Quarantine'\n  },\n  contracts: {\n    notClassified: 'None',\n    type1: 'Type 1 - 600.000',\n    type2: 'Type 2 - 300.000',\n    type3: 'Type 3 - 100.000',\n    type4Recontracted: 'Type 4 Recontracted',\n    typeGo2joyRoom: 'Type Go2Joy Room'\n  },\n  roomType: {\n    hourly: 'Hourly',\n    additional: 'Additional',\n    overnight: 'Overnight',\n    daily: 'Daily'\n  },\n  dateOfWeek: {\n    monday: 'Monday',\n    tuesday: 'Tuesday',\n    wednesday: 'Wednesday',\n    thursday: 'Thursday',\n    friday: 'Friday',\n    saturday: 'Saturday',\n    sunday: 'Sunday'\n  },\n  // option tr??ng payment\n  paymentsHotel: {\n    both: 'Both',\n    payHotel: 'Pay at hotel',\n    payOnline: 'Just pay online',\n    momo: 'Momo',\n    credit: 'Credit card (OnePay)',\n    debit: 'Debit card (OnePay)',\n    payoo: 'Pay@Store - Payoo',\n    zalo: 'ZaloPay',\n    pos: 'Pay@Store',\n    creditCardVnpt: 'Credit card (VNPT)',\n    atmCardVnpt: 'ATM card (VNPT)',\n    shopeePay: 'Shopee pay'\n  },\n  status: {\n    disable: 'Disable',\n    deleted: 'Deleted',\n    active: 'Active',\n    expired: 'Expired',\n    temp: 'Temp',\n    draft: 'Draft',\n    wait_confirm: 'Wait confirm',\n    get: 'Get',\n    use: 'Use',\n    not_yet: 'Not yet',\n    never: 'Never',\n    missing: 'Missing',\n    no_need: 'No need',\n    waiting: 'Waiting',\n    available: 'Available',\n    suspend: 'Suspend',\n    end: 'End',\n    allStatus: 'All status',\n    created: 'Created',\n    sending: 'Sending',\n    sent: 'Sent',\n    none: 'None',\n    allUser: 'All User',\n    allNoticeType: 'All notice type',\n    sendTo: 'Send to',\n    allImportFromExcelFile: 'All Import From Excel File',\n    userInput: 'User Input',\n    lastTimeOpenApp: 'Last time open app',\n    go2joy: 'Go2Joy',\n    allPartner: 'All Partner',\n    booking: 'Booking',\n    allTrailPartner: 'All Trail Partner',\n    allContractPartner: 'All Contract Partner',\n    hotel: 'Hotel',\n    crmFilter: 'CRM Filter',\n    normal: 'Normal',\n    donateCoupon: 'Donate Coupon',\n    remindCoupon: 'Remind Coupon'\n  },\n  applyHotelType: {\n    applyAllHotel: 'Apply all hotel',\n    applyAllHotelExcept: 'Apply all hotel except',\n    onlyApply: 'Only apply'\n  },\n  applyUserType: {\n    applyAllUser: 'Apply all user',\n    applyAllUserExcept: 'Apply all user except',\n    onlyApply: 'Only apply'\n  },\n  applyPromotionType: {\n    applyAllPromo: 'Apply all promotion',\n    justApply: 'Just apply'\n  },\n  room: {\n    normal: 'Normal',\n    flash_sale: 'Flash sale'\n  },\n  typePromotion: {\n    all: 'All',\n    apply: 'Apply',\n    event: 'Event',\n    inviteFriend: 'Invite friend',\n    gift: 'Gift',\n    booking: 'Booking',\n    report_new_hotel: 'Report new hotel',\n    sign_up: 'Sign up',\n    birthday: 'Birthday',\n    payment: 'Payment',\n    voucher_code: 'Voucher code'\n  },\n  discountType: {\n    discountMoney: 'Discount money',\n    discount_percent: 'Discount %',\n    gift: 'Gift',\n    discountHours: 'Discount hours',\n    samePrice: 'Same price'\n  },\n  sendingStatus: {\n    notSendYet: 'Not send yet',\n    error: 'Error',\n    ok: 'Ok',\n    dontSend: \"Don't send\"\n  },\n  bookingStatus: {\n    all: 'All',\n    reserved: 'Reserved',\n    confirmed: 'Confirmed',\n    check_in: 'Checked-in',\n    cancel: 'Cancelled',\n    no_show: 'No show',\n    payment_fail: 'Payment Fail'\n  },\n  confirmedBy: {\n    user: 'User',\n    hotel: 'Hotel',\n    go2joy: 'Go2Joy',\n    hotel_late: 'Hotel late',\n    location: 'Location'\n  },\n  targetType: {\n    notice: 'Notice',\n    promotion: 'Promotion',\n    serviceAgreement: 'Service Agreement',\n    hotel: 'Hotel',\n    faq: 'FAQ',\n    inviteFriend: 'Invite Friend',\n    openApp: 'Open app',\n    mileagePoint: 'Mileage Point',\n    directDiscount: 'Direct Discount',\n    signUp: 'Sign up',\n    promotionGroup: 'Promotion Group',\n    amenityPack: 'Amenities pack',\n    hotelGo2Choice: 'Hotel Go2Choice',\n    district: 'District',\n    promotionEvent: 'Promotion / Event',\n    linkOutApp: 'Link (Out-App)',\n    linkInApp: 'Link (In-app)',\n    coupon: 'Coupon',\n    link: 'Link',\n    hotelTet: 'Hotel Tet',\n    referral: 'Referral program',\n    hotelArea: 'Hotel Area'\n  },\n  noticeType: {\n    function: 'Function',\n    promotion: 'Promotion',\n    term_policy: 'Term & Policy',\n    notification: 'Notification',\n    notice_of_no_show: 'Notice of No Show',\n    notice_of_Checked_in_l: 'Notice of Checked-in L'\n  },\n  applyHotelOption: {\n    all_hotel: 'All hotels',\n    all_contracted: 'All hotels contracted',\n    all_trial: 'All hotels trial',\n    just_apply: 'Just apply',\n    hotelGo2Choice: 'Hotel Go2Choice',\n    link: 'Link',\n    district: 'District',\n    coupon: 'Coupon',\n    promotionEvent: 'Promotion / Event'\n  },\n  region: {\n    all_region: 'All region',\n    south: 'South',\n    north: 'North',\n    north_center: 'North center',\n    south_center: 'South center',\n    middle: 'Middle',\n    confirm: 'Confirm',\n    view: 'View'\n  },\n  type: {\n    all_types: 'All types',\n    transfer_booking: 'Transfer Booking',\n    transfer: 'Transfer',\n    promotion: 'Promotion',\n    invite_friend: 'Invite friend',\n    product: 'Product'\n  },\n  level: {\n    level1: 'Level 1',\n    level2: 'Level 2'\n  },\n  regionConfirm: {\n    confirm: 'Confirm',\n    view: 'View'\n  },\n  all_rooms: 'All rooms',\n  room_available: 'Room available',\n  room_unavailable: 'Room unavailable',\n  window: 'Window',\n  balcony: 'Balcony',\n  city: 'City',\n  garden: 'Garden',\n  pool: 'Pool',\n  noView: 'No view'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/general/option.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/general/option/gender.js":
/*!***************************************************************!*\
  !*** ./src/plugins/i18n/language/en/general/option/gender.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  male: 'Male',\n  female: 'Female'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/general/option/gender.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/general/option/status.js":
/*!***************************************************************!*\
  !*** ./src/plugins/i18n/language/en/general/option/status.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  login: 'Login',\n  unLogin: 'Un login'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/general/option/status.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/general/payment.js":
/*!*********************************************************!*\
  !*** ./src/plugins/i18n/language/en/general/payment.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  both: 'Both',\n  payHotel: 'Pay at hotel',\n  payOnline: 'Just pay online',\n  momo: 'Momo',\n  credit: 'Credit card (OnePay)',\n  debit: 'Debit card (OnePay)',\n  payoo: 'Pay@Store - Payoo',\n  zalo: 'ZaloPay',\n  pos: 'Pay@Store',\n  creditCardVnpt: 'Credit card (VNPT)',\n  atmCardVnpt: 'ATM card (VNPT)',\n  shopeePay: 'Shopee pay'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/general/payment.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/general/placeholder.js":
/*!*************************************************************!*\
  !*** ./src/plugins/i18n/language/en/general/placeholder.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  startDate: 'Start date',\n  endDate: 'End date',\n  keyword: 'Keyword',\n  hotelName: 'Hotel name',\n  from: 'From',\n  to: 'To',\n  search: 'Search',\n  provinceSelected: 'Province selected',\n  title: 'Title',\n  memo: 'Memo',\n  cmrProvince: 'Province selected',\n  cmrDistrict: 'District selected'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/general/placeholder.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/general/validation.js":
/*!************************************************************!*\
  !*** ./src/plugins/i18n/language/en/general/validation.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  required: 'This field is required'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/general/validation.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages sync recursive \\.js$":
/*!*******************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages sync \.js$ ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./activities/activities.js\": \"./src/plugins/i18n/language/en/pages/activities/activities.js\",\n\t\"./activities/activitiesBookingTransfer.js\": \"./src/plugins/i18n/language/en/pages/activities/activitiesBookingTransfer.js\",\n\t\"./activities/activitiesDetail.js\": \"./src/plugins/i18n/language/en/pages/activities/activitiesDetail.js\",\n\t\"./activities/activitiesInviteFriend.js\": \"./src/plugins/i18n/language/en/pages/activities/activitiesInviteFriend.js\",\n\t\"./activities/activitiesProduct.js\": \"./src/plugins/i18n/language/en/pages/activities/activitiesProduct.js\",\n\t\"./activities/activitiesPromotion.js\": \"./src/plugins/i18n/language/en/pages/activities/activitiesPromotion.js\",\n\t\"./booking/bookingAdhoc.js\": \"./src/plugins/i18n/language/en/pages/booking/bookingAdhoc.js\",\n\t\"./booking/bookingReport.js\": \"./src/plugins/i18n/language/en/pages/booking/bookingReport.js\",\n\t\"./booking/cashFlowReport.js\": \"./src/plugins/i18n/language/en/pages/booking/cashFlowReport.js\",\n\t\"./booking/hotelDebt.js\": \"./src/plugins/i18n/language/en/pages/booking/hotelDebt.js\",\n\t\"./booking/revenueReport.js\": \"./src/plugins/i18n/language/en/pages/booking/revenueReport.js\",\n\t\"./booking/sendingMail.js\": \"./src/plugins/i18n/language/en/pages/booking/sendingMail.js\",\n\t\"./home-display/collection.js\": \"./src/plugins/i18n/language/en/pages/home-display/collection.js\",\n\t\"./home-display/dashboard.js\": \"./src/plugins/i18n/language/en/pages/home-display/dashboard.js\",\n\t\"./hotels/hotel-facility/facilityAdd.js\": \"./src/plugins/i18n/language/en/pages/hotels/hotel-facility/facilityAdd.js\",\n\t\"./hotels/hotel-facility/facilityList.js\": \"./src/plugins/i18n/language/en/pages/hotels/hotel-facility/facilityList.js\",\n\t\"./hotels/hotel-group/hotelGroupAdd.js\": \"./src/plugins/i18n/language/en/pages/hotels/hotel-group/hotelGroupAdd.js\",\n\t\"./hotels/hotel-group/hotelGroupDetail.js\": \"./src/plugins/i18n/language/en/pages/hotels/hotel-group/hotelGroupDetail.js\",\n\t\"./hotels/hotel-group/hotelGroupEdit.js\": \"./src/plugins/i18n/language/en/pages/hotels/hotel-group/hotelGroupEdit.js\",\n\t\"./hotels/hotel-group/hotelGroupList.js\": \"./src/plugins/i18n/language/en/pages/hotels/hotel-group/hotelGroupList.js\",\n\t\"./hotels/hotel-staff/hotelStaffEdit.js\": \"./src/plugins/i18n/language/en/pages/hotels/hotel-staff/hotelStaffEdit.js\",\n\t\"./hotels/hotel-staff/hotelStaffList.js\": \"./src/plugins/i18n/language/en/pages/hotels/hotel-staff/hotelStaffList.js\",\n\t\"./hotels/hotelDisplay.js\": \"./src/plugins/i18n/language/en/pages/hotels/hotelDisplay.js\",\n\t\"./hotels/notice-to-hotel/detail-reply.js\": \"./src/plugins/i18n/language/en/pages/hotels/notice-to-hotel/detail-reply.js\",\n\t\"./hotels/notice-to-hotel/detailNotice.js\": \"./src/plugins/i18n/language/en/pages/hotels/notice-to-hotel/detailNotice.js\",\n\t\"./hotels/notice-to-hotel/notice-hotel-list.js\": \"./src/plugins/i18n/language/en/pages/hotels/notice-to-hotel/notice-hotel-list.js\",\n\t\"./hotels/notice-to-hotel/noticeApplyHotel.js\": \"./src/plugins/i18n/language/en/pages/hotels/notice-to-hotel/noticeApplyHotel.js\",\n\t\"./hotels/notice-to-hotel/noticeList.js\": \"./src/plugins/i18n/language/en/pages/hotels/notice-to-hotel/noticeList.js\",\n\t\"./hotels/notice-to-hotel/sendNotice.js\": \"./src/plugins/i18n/language/en/pages/hotels/notice-to-hotel/sendNotice.js\",\n\t\"./hotels/product-type/productType.js\": \"./src/plugins/i18n/language/en/pages/hotels/product-type/productType.js\",\n\t\"./hotels/product-type/productTypeAdd.js\": \"./src/plugins/i18n/language/en/pages/hotels/product-type/productTypeAdd.js\",\n\t\"./hotels/product-type/productTypeEdit.js\": \"./src/plugins/i18n/language/en/pages/hotels/product-type/productTypeEdit.js\",\n\t\"./hotels/product/product.js\": \"./src/plugins/i18n/language/en/pages/hotels/product/product.js\",\n\t\"./hotels/product/productDetail.js\": \"./src/plugins/i18n/language/en/pages/hotels/product/productDetail.js\",\n\t\"./hotels/review/option/ratings.js\": \"./src/plugins/i18n/language/en/pages/hotels/review/option/ratings.js\",\n\t\"./hotels/review/option/sortBy.js\": \"./src/plugins/i18n/language/en/pages/hotels/review/option/sortBy.js\",\n\t\"./hotels/review/reviewMgt.js\": \"./src/plugins/i18n/language/en/pages/hotels/review/reviewMgt.js\",\n\t\"./hotels/room-type/calendar.js\": \"./src/plugins/i18n/language/en/pages/hotels/room-type/calendar.js\",\n\t\"./hotels/room-type/comFirmLockRoom.js\": \"./src/plugins/i18n/language/en/pages/hotels/room-type/comFirmLockRoom.js\",\n\t\"./hotels/room-type/createRoomType.js\": \"./src/plugins/i18n/language/en/pages/hotels/room-type/createRoomType.js\",\n\t\"./hotels/room-type/detailRoomType.js\": \"./src/plugins/i18n/language/en/pages/hotels/room-type/detailRoomType.js\",\n\t\"./hotels/room-type/directDiscount.js\": \"./src/plugins/i18n/language/en/pages/hotels/room-type/directDiscount.js\",\n\t\"./hotels/room-type/editRoomType.js\": \"./src/plugins/i18n/language/en/pages/hotels/room-type/editRoomType.js\",\n\t\"./hotels/room-type/exportFlashSale.js\": \"./src/plugins/i18n/language/en/pages/hotels/room-type/exportFlashSale.js\",\n\t\"./hotels/room-type/extraFee.js\": \"./src/plugins/i18n/language/en/pages/hotels/room-type/extraFee.js\",\n\t\"./hotels/room-type/settingFS.js\": \"./src/plugins/i18n/language/en/pages/hotels/room-type/settingFS.js\",\n\t\"./hotels/stamp.js\": \"./src/plugins/i18n/language/en/pages/hotels/stamp.js\",\n\t\"./marketing/article.js\": \"./src/plugins/i18n/language/en/pages/marketing/article.js\",\n\t\"./marketing/banner.js\": \"./src/plugins/i18n/language/en/pages/marketing/banner.js\",\n\t\"./marketing/crm/crm.js\": \"./src/plugins/i18n/language/en/pages/marketing/crm/crm.js\",\n\t\"./marketing/inviteFriend.js\": \"./src/plugins/i18n/language/en/pages/marketing/inviteFriend.js\",\n\t\"./marketing/lucky-wheel.js\": \"./src/plugins/i18n/language/en/pages/marketing/lucky-wheel.js\",\n\t\"./marketing/notice.js\": \"./src/plugins/i18n/language/en/pages/marketing/notice.js\",\n\t\"./marketing/notification.js\": \"./src/plugins/i18n/language/en/pages/marketing/notification.js\",\n\t\"./marketing/pgpb.js\": \"./src/plugins/i18n/language/en/pages/marketing/pgpb.js\",\n\t\"./marketing/popup.js\": \"./src/plugins/i18n/language/en/pages/marketing/popup.js\",\n\t\"./marketing/promotion/coupon-condition.js\": \"./src/plugins/i18n/language/en/pages/marketing/promotion/coupon-condition.js\",\n\t\"./marketing/promotion/create-promotion.js\": \"./src/plugins/i18n/language/en/pages/marketing/promotion/create-promotion.js\",\n\t\"./marketing/promotion/group-promotion.js\": \"./src/plugins/i18n/language/en/pages/marketing/promotion/group-promotion.js\",\n\t\"./marketing/promotion/issue-coupon-condition.js\": \"./src/plugins/i18n/language/en/pages/marketing/promotion/issue-coupon-condition.js\",\n\t\"./marketing/promotion/promotion.js\": \"./src/plugins/i18n/language/en/pages/marketing/promotion/promotion.js\",\n\t\"./marketing/sms.js\": \"./src/plugins/i18n/language/en/pages/marketing/sms.js\",\n\t\"./mileage-point/MpBoosting.js\": \"./src/plugins/i18n/language/en/pages/mileage-point/MpBoosting.js\",\n\t\"./mileage-point/mileagePoint.js\": \"./src/plugins/i18n/language/en/pages/mileage-point/mileagePoint.js\",\n\t\"./profile/profile.js\": \"./src/plugins/i18n/language/en/pages/profile/profile.js\",\n\t\"./sa-account/confirmGroup.js\": \"./src/plugins/i18n/language/en/pages/sa-account/confirmGroup.js\",\n\t\"./sa-account/permission.js\": \"./src/plugins/i18n/language/en/pages/sa-account/permission.js\",\n\t\"./sa-account/saleIncentive.js\": \"./src/plugins/i18n/language/en/pages/sa-account/saleIncentive.js\",\n\t\"./sa-account/staffs.js\": \"./src/plugins/i18n/language/en/pages/sa-account/staffs.js\",\n\t\"./service-agreement/service-agreement.js\": \"./src/plugins/i18n/language/en/pages/service-agreement/service-agreement.js\",\n\t\"./settings/settings.js\": \"./src/plugins/i18n/language/en/pages/settings/settings.js\",\n\t\"./tracking/bookingTracking.js\": \"./src/plugins/i18n/language/en/pages/tracking/bookingTracking.js\",\n\t\"./tracking/hotelIntroduceSignup.js\": \"./src/plugins/i18n/language/en/pages/tracking/hotelIntroduceSignup.js\",\n\t\"./tracking/hotelStatusTracking.js\": \"./src/plugins/i18n/language/en/pages/tracking/hotelStatusTracking.js\",\n\t\"./users/counseling/counselingMgt.js\": \"./src/plugins/i18n/language/en/pages/users/counseling/counselingMgt.js\",\n\t\"./users/counseling/createCounselingMgt.js\": \"./src/plugins/i18n/language/en/pages/users/counseling/createCounselingMgt.js\",\n\t\"./users/counseling/replyCounselingMgt.js\": \"./src/plugins/i18n/language/en/pages/users/counseling/replyCounselingMgt.js\",\n\t\"./users/deviceMgt.js\": \"./src/plugins/i18n/language/en/pages/users/deviceMgt.js\",\n\t\"./users/firstBooking.js\": \"./src/plugins/i18n/language/en/pages/users/firstBooking.js\",\n\t\"./users/userMgt.js\": \"./src/plugins/i18n/language/en/pages/users/userMgt.js\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./src/plugins/i18n/language/en/pages sync recursive \\\\.js$\";\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages_sync_\\.js$?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/activities/activities.js":
/*!*********************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/activities/activities.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  title: 'Title',\n  type: 'Type',\n  request_by: 'Request by',\n  last_confirm_staff: 'Last confirm staff',\n  status: 'Status',\n  confirm: 'Confirm',\n  delete: 'Withdraw',\n  back: 'Back',\n  reject: 'Reject',\n  waiting: 'Waiting',\n  withdrawn: 'Withdrawn',\n  confirmed: 'Confirmed',\n  rejected: 'Rejected',\n  placeholder: 'Title',\n  all: 'All',\n  all_types: 'All types',\n  transfer_booking: 'Transfer Booking',\n  transfer: 'Transfer',\n  product: 'Product',\n  promotion: 'Promotion',\n  invite_friend: 'Invite Friend',\n  header_search: 'Search',\n  operations: 'Operations',\n  confirm_message_alert: 'Are you sure ?',\n  confirm_success: 'Confirm success',\n  withdrawn_message_alert: 'Are you sure ?',\n  withdrawn_success: 'Withdrawn success'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/activities/activities.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/activities/activitiesBookingTransfer.js":
/*!************************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/activities/activitiesBookingTransfer.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  coupon: 'Coupon',\n  flase_sale: 'Flash sale',\n  redeem_stamp: 'Redeem stamp',\n  direct_discount: 'Direct discount',\n  mileage_point: 'Mileage point',\n  other_discount: 'Other discount',\n  booking_status_yes: 'Yes',\n  booking_status_no: 'No',\n  search_via: 'Search via',\n  hotel_name: 'Hotel name',\n  room_type: 'Room type',\n  payment_method: 'Payment method',\n  commission: 'Commission',\n  automatically_update_booking_amount: 'Automatically update booking amount',\n  manually_update_booking_amount: 'Manually update booking amount',\n  room_amount: 'Room amount',\n  product_amount: 'Product amount',\n  total_amount: 'Total amount',\n  go2joy_discount: 'Go2joy Discount',\n  hotel_discount: 'Hotel Discount',\n  users_pay: 'Users Pay',\n  paid_in_advance: 'Paid in advance',\n  booking_type: 'Booking Type',\n  stay_at_hotel_time: 'Stay at hotel time',\n  time_from: 'Time from',\n  time_to: 'to',\n  date_from: 'Date from',\n  date_to: 'to',\n  status: 'Status',\n  confirmed_by: 'Confirmed by',\n  checkin_time: 'Check-in time',\n  end_date_transfer: 'End date transfer',\n  remove_coupon: 'Remove coupon',\n  booking_origin: 'Booking Origin',\n  table_hotel_name: 'Hotel Name',\n  table_code: 'Code',\n  table_booking_no: 'Booking no',\n  table_user_info: 'User info',\n  table_room_type: 'Room type',\n  table_coupon: 'Coupon',\n  table_booking_type: 'Booking type',\n  table_stay_at_hotel_time: 'Stay at hotel time',\n  table_booking_status: 'Booking Status',\n  table_room_amount: 'Room amount',\n  table_product_amount: 'Product amount',\n  table_total_amount: 'Total amount',\n  table_go2j_discount: 'G2J discount',\n  table_hotel_discount: 'Hotel discount',\n  table_user_pay: 'User pay',\n  table_paid_in_advance: 'Paid in advance',\n  table_device_type: 'Device type'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/activities/activitiesBookingTransfer.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/activities/activitiesDetail.js":
/*!***************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/activities/activitiesDetail.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  title: 'Title',\n  request_by: 'Request by',\n  type: 'Type',\n  status: 'Status',\n  waiting: 'Waiting',\n  reason_to_confirm: 'Reason to confirm or withdraw',\n  normal: 'Normal',\n  flash_sale: 'Flash sale',\n  invitee_inviter: 'Invitee / Inviter',\n  daily_budget: 'Daily budget',\n  create_by: 'Create by',\n  via: 'Via',\n  manual: 'Manual',\n  facebook: 'Facebook',\n  google: 'Google',\n  link: 'Link',\n  guidelines_vn: 'Guidelines (VN)',\n  guidelines_en: 'Guidelines (EN)',\n  sms_content: 'SMS content',\n  root_page: 'Root page',\n  confirm_staff_list: 'CONFIRM STAFF LIST',\n  staff_name: 'Staff name',\n  role: 'Role',\n  enable: 'Enable',\n  confirm_permission: 'Confirm permission',\n  confirmed_cancel: 'Confirmed / Cancel',\n  level1: 'Level 1',\n  level2: 'Level 2',\n  single_confirm: 'Single confirm',\n  all_confirm: 'All confirm',\n  confirm_content: 'CONFIRM CONTENT',\n  start_end_date: 'Start/end date',\n  apply_all_hotel: 'All hotel',\n  apply_all_hotel_except: 'All hotels exclude',\n  only_apply: 'Just apply',\n  list_hotel: 'Hotel list',\n  user_list: 'User list',\n  all_usser: 'All user',\n  all_user_exclude: 'All user exclude',\n  select_user_apply: 'Select User Apply',\n  num_checkin: 'Num check-in',\n  exel_file: 'Excel File',\n  activities_level: 'Level',\n  activities_single_confirm: 'Single confirm',\n  activities_all_confirm: 'All confirm',\n  status_active: 'Active',\n  status_expired: 'Expired',\n  status_temp: 'Temp',\n  status_draft: 'Draft',\n  status_wait_confirm: 'Wait confirm',\n  confirm: 'Confirm',\n  delete: 'Withdraw',\n  back: 'Back',\n  withdrawn: 'Withdraw',\n  confirmed: 'Confirmed',\n  product_name: 'Product name'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/activities/activitiesDetail.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/activities/activitiesInviteFriend.js":
/*!*********************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/activities/activitiesInviteFriend.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  title: 'Title',\n  type_of_invitation: 'Type of invitation',\n  status: 'Status',\n  start_end_date: 'Start/end date',\n  invitee_inviter: 'Invitee/ Inviter',\n  daily_budget: 'Daily budget',\n  create_by: 'Create by',\n  via: 'Via',\n  guidelines_vn: 'Guidelines(VN)',\n  guidelines_en: 'Guidelines(EN)',\n  sms_content: 'SMS content',\n  start_date: 'Start date',\n  end_date: 'End date',\n  signup: 'Sign-up',\n  checkin: 'Check-in'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/activities/activitiesInviteFriend.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/activities/activitiesProduct.js":
/*!****************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/activities/activitiesProduct.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  hotel: 'Hotel',\n  product_name: 'Product name',\n  product_name_en: 'Product name (English)',\n  product_type_name: 'Product Type name',\n  product_type_name_en: 'Product Type name (English)',\n  price: 'Price',\n  prepare_before_1_day: 'Prepare before 1 day',\n  description: 'Description',\n  status: 'Status',\n  create_staff: 'Create staff',\n  last_update: 'Last update',\n  image: 'Image',\n  status_active: 'Active',\n  status_expired: 'Expired'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/activities/activitiesProduct.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/activities/activitiesPromotion.js":
/*!******************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/activities/activitiesPromotion.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  title: 'Title',\n  code: 'Code',\n  type: 'Type',\n  num_of_coupon: 'Num of coupon',\n  max_num_of_coupon: 'Max num of coupon',\n  applyStartEnd: 'Apply start end',\n  couponStartEnd: 'Coupon Start~End',\n  go2joy_discount: 'Go2joy discount',\n  hotel_discount: 'Hotel discount',\n  sponsor_discount: 'Sponsor discount',\n  status: 'Status',\n  discount: 'Discount',\n  last_update: 'Last update',\n  totalHotelApplied: 'Total hotel applied',\n  totalUserApplied: 'Total user applied',\n  totalCouponApplied: 'Total coupon applied',\n  total_consumed_coupon: 'Total consumed coupon',\n  total_go2joy_discount: 'Total go2joy discount',\n  total_hotel_discount: 'Total hotel discount',\n  total_sponsor_discount: 'Total sponsor discount',\n  totalDiscount: 'Total discount',\n  create_time: 'Create time',\n  max_coupon_per_hotel: 'Max coupon per hotel',\n  title_promotion_group: 'Promotion group',\n  room_apply_list: 'Room apply list',\n  content_vn: 'Content(VI)',\n  content_en: 'Content(EN)',\n  content_2: 'Content2',\n  memo: 'Memo',\n  image_of_list: 'Image of list',\n  image_of_detail: 'Detail page image',\n  normal_room: 'Normal room',\n  coupon_condition_name: 'Coupon condition:',\n  coupon_condition_condition_to_use_coupon: 'Condition to use coupon:',\n  coupon_condition_just_use_for: 'Just use for',\n  coupon_condition_max_coupon_per_day: 'Max coupon per day:',\n  coupon_condition_max_coupon_per_hotel: 'Max coupon per hotel:',\n  coupon_condition_min_booking_money: 'Min booking money:',\n  coupon_condition_payment_when_use_coupon: 'Payment when use coupon:',\n  coupon_condition_coupon_memo: 'Content of Validation VI|EN:',\n  coupon_condition_apply: 'Apply:',\n  issue_coupon_condition_name: 'Issue coupon condition',\n  issue_coupon_condition_coupon_memo: 'Content of Validation VI|EN:',\n  issue_coupon_condition_apply: 'Apply:',\n  issue_coupon_condition_content_of_validation: 'Content of validation VI|EN',\n  only_apply: 'Just apply',\n  list_hotel: 'Hotel list',\n  user_list: 'User list'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/activities/activitiesPromotion.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/booking/bookingAdhoc.js":
/*!********************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/booking/bookingAdhoc.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  booking_no: 'Booking No',\n  trading_code: 'M?? giao d???ch Go2Joy',\n  psp_transaction_id: 'PSP Transaction ID',\n  note: 'Note',\n  requiredbookingNo: 'Booking no field is required',\n  requiredbookingType: 'Booking type field is required',\n  requiredbookingNoTitle: 'Please input Booking No',\n  message_input_psp_transaction_id: 'Please input PSP Transaction ID',\n  message_input_booking_no: 'Please input booking no',\n  update_success: 'Update success',\n  message_alert: 'Are yot sure you want to refund booking no',\n  refunded: 'Refunded',\n  refund_id: 'Refund ID'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/booking/bookingAdhoc.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/booking/bookingReport.js":
/*!*********************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/booking/bookingReport.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  time_at_hotel: 'Stay at hotel time',\n  check_in_time: 'Check-in time',\n  allDevice: 'All device',\n  all: 'All',\n  app: 'App',\n  web: 'Web',\n  reserved: 'Reserved',\n  confirmed: 'Confirmed',\n  check_in: 'Checked-in',\n  cancel: 'Cancelled',\n  no_show: 'No show',\n  payment_fail: 'Payment Fail',\n  discountType: 'SP',\n  delete: 'Cancel',\n  confirm: 'Confirm',\n  refund: 'Refund',\n  transfer: 'Transfer',\n  first_booking_checked: 'Done',\n  waiting_confirm: 'Waiting confirm',\n  transferred: 'Transferred',\n  contracted: 'Contracted',\n  trial: 'Trial',\n  terminated: 'Terminated',\n  suspended: 'Suspended',\n  hotel_name: 'Hotel Name',\n  code: 'Code',\n  total_booking: 'Total booking',\n  go2joy_cancel: 'Go2Joy cancel',\n  hotel_cancel: 'Hotel cancel',\n  user_cancel: 'User cancel',\n  booking_no: 'Booking no',\n  user_info: 'User info',\n  room_type: 'Room type',\n  coupon: 'Coupon',\n  booking_type: 'Booking type',\n  stay_at_hotel_time: 'Stay at hotel time',\n  booking_status: 'Booking Status',\n  room_amount: 'Room amount',\n  product_amount: 'Product amount',\n  total_amount: 'Total amount',\n  total_promotion: 'Total amount',\n  go2j_discount: 'G2J discount',\n  go2j_promotion: 'G2J discount',\n  hotel_discount: 'Hotel discount',\n  hotel_promotion: 'Hotel discount',\n  user_pay: 'User pay',\n  paid_in_advance: 'Paid in advance',\n  device_type: 'Device type',\n  canceled_booking: 'Canceled booking',\n  flase_sale: 'Flash sale',\n  redeem_stamp: 'Redeem stamp',\n  direct_discount: 'Direct discount',\n  mileage_point: 'Mileage point',\n  other_discount: 'Other discount',\n  search_via: 'Search via',\n  payment_method: 'Payment method',\n  commission: 'Commission',\n  automatically_update_booking_amount: 'Automatically update booking amount',\n  manually_update_booking_amount: 'Manually update booking amount',\n  go2joy_discount: 'Go2joy Discount',\n  users_pay: 'Users Pay',\n  time_from: 'Time from',\n  time_to: 'to',\n  date_from: 'Date from',\n  date_to: 'to',\n  status: 'Status',\n  confirmed_by: 'Confirmed by',\n  checkin_time: 'Check-in time',\n  end_date_transfer: 'End date transfer',\n  remove_coupon: 'Remove coupon',\n  booking_origin: 'Booking Origin',\n  no_show_l: 'No show L',\n  user: 'User',\n  hotel: 'Hotel',\n  go2joy: 'Go2Joy',\n  hotel_late: 'Hotel late',\n  location: 'Location',\n  yes: 'Yes',\n  no: 'No',\n  new: 'New',\n  old: 'Old',\n  hours: 'Hours',\n  overnight: 'Overnight',\n  daily: 'Daily',\n  searchBooking: 'Search by booking no',\n  view_booking_detail: 'View booking detail',\n  extra_fee: 'Extra fee',\n  flash_sale: 'Flash sale',\n  source: 'Source',\n  samePrice: 'Same price',\n  placeholder: 'Hotel Name',\n  booking_no_placeholder: 'Booking no',\n  confirmSuccess: 'Confirm success',\n  refundSuccess: 'Refund success',\n  deleteSuccess: 'Delete success',\n  exportSuccess: 'Export Success',\n  allSource: 'All source'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/booking/bookingReport.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/booking/cashFlowReport.js":
/*!**********************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/booking/cashFlowReport.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  hotel_name: 'Hotel name',\n  total_check_in: 'Total check in',\n  product_amount: 'Product amount',\n  extra_fee: 'Extra fee',\n  total_amount: 'Total amount',\n  g2j_discount: 'G2J discount',\n  hotel_discount: 'Hotel discount',\n  user_pay: 'User pay',\n  paid_in_advance: 'Paid in advance',\n  commission: 'Commission',\n  balance: 'The balance',\n  receivable: '(+) Receivable',\n  payable: '(-) Payable',\n  current_debt: 'Current debt',\n  other_debt: 'Other debt',\n  period_debt_time: 'Period debt time',\n  pay_date: 'Pay date',\n  period_debt: 'Period debt',\n  expected_pay: 'Expected pay',\n  pay_amount: 'Pay amount',\n  createTime: 'Create time',\n  totalBooking: 'Total booking',\n  totalCheckin: 'Total check-in',\n  totalCancelRefunded: 'Total cancel refunded',\n  //\n  time_at_hotel: 'Stay at hotel time',\n  check_in_time: 'Check-in time',\n  all_inventory: 'All inventory',\n  //\n  device_type: 'Device type',\n  booking_time: 'Booking Time',\n  booking_info: 'Booking info',\n  coupon: 'Coupon',\n  room_amount: 'Room amount',\n  mileage_point: 'Mileage point',\n  other_discount: 'Other discount',\n  flash_sale: 'Flash sale',\n  redeem_stamp: 'Redeem stamp',\n  direct_discount: 'Direct discount',\n  //\n  code: 'code',\n  the_balance: 'The balance'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/booking/cashFlowReport.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/booking/hotelDebt.js":
/*!*****************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/booking/hotelDebt.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  hotel_name: 'Hotel name',\n  current_debt: 'Current debt',\n  period_debt: 'Period debt',\n  period_debt_time: 'Period debt time',\n  pay_date: 'Pay date',\n  other_debt: 'Other debt',\n  pay_amount: 'Pay amount',\n  balance: 'The balance',\n  create_time: 'Create time',\n  memo: 'Memo',\n  new_hotel_debt: 'New hotel debt',\n  new_hotel_paid: 'New hotel paid',\n  //\n  apply_all_hotel: 'All hotel',\n  apply_all_hotel_except: 'All hotels exclude',\n  only_apply: 'Just apply',\n  list_hotel: 'List hotel',\n  //\n  code: 'Code',\n  status: 'Status',\n  phone: 'Phone',\n  address: 'Address',\n  last_update: 'Last update',\n  //\n  contracted: 'Contracted',\n  terminated: 'Terminated',\n  suspended: 'Suspended',\n  operation: 'Operation'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/booking/hotelDebt.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/booking/revenueReport.js":
/*!*********************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/booking/revenueReport.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  timeAtHotel: 'Stay at hotel time',\n  checkInTime: 'Check-in time',\n  contracted: 'Contracted',\n  trial: 'Trial',\n  terminated: 'Terminated',\n  suspended: 'Suspended',\n  hotelName: 'Hotel name',\n  companyCode: 'Company code',\n  totalCheckIn: 'Total check in',\n  totalTransaction: 'Total transaction',\n  productAmount: 'Product amount',\n  extraFee: 'Extra fee',\n  totalAmount: 'Total amount',\n  go2joyDiscount: 'G2J discount',\n  hotelDiscount: 'Hotel discount',\n  userPay: 'User pay',\n  paidInAdvance: 'Paid in advance',\n  commission: 'Commission',\n  balance: 'The balance',\n  receivable: '(+) Receivable',\n  payable: '(-) Payable',\n  bookingTime: 'Booking time',\n  bookingId: 'Booking id',\n  transactionId: 'Transaction id',\n  bookingInfo: 'Booking information',\n  transactionStatus: 'Transaction status',\n  transactionTime: 'Transaction time',\n  coupon: 'Coupon',\n  roomAmount: 'Room amount',\n  mileagePoint: 'Mileage point',\n  otherDiscount: 'Other discount',\n  flashSale: 'Flash sale',\n  redeemStamp: 'Redeem stamp',\n  directDiscount: 'Direct discount',\n  allInventory: 'All Inventory',\n  all: 'All',\n  Go2Joy: 'Go2Joy',\n  Agoda: 'Agoda',\n  operations: 'Operations',\n  hours: 'Hours',\n  overnight: 'Overnight',\n  daily: 'Daily'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/booking/revenueReport.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/booking/sendingMail.js":
/*!*******************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/booking/sendingMail.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  title: 'Title',\n  createStaff: 'Create staff',\n  createTime: 'Create time',\n  result: 'Result',\n  operations: 'Operations',\n  hotelName: 'Hotel name',\n  code: 'Code',\n  theBalance: 'The balance (+) Receivable (-) Payable',\n  currentDebtOtherDebt: 'current debt / Other debt',\n  periodDebt: 'Period debt',\n  expectedPayAmount: 'Expected pay / Pay amount',\n  currentDebt: 'Current debt',\n  otherDebt: 'Other debt',\n  address: 'Address',\n  status: 'Status'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/booking/sendingMail.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/home-display/collection.js":
/*!***********************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/home-display/collection.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  choose_display_in_app_web: 'Choose display in App/Web',\n  subTitle: 'Sub title',\n  title1: 'Title 1',\n  type: 'Type',\n  display: 'Display',\n  displayApp: 'Display App',\n  displayWeb: 'Display Web',\n  displayType: 'Display type',\n  lastUpdate: 'Last Update',\n  operations: 'Operations',\n  selectApplyHotel: 'Select apply hotel',\n  requiredTitle: 'Please input Title 1',\n  requiredSlug: 'Please input Slug',\n  requiredSubTitle: 'Please input Sub Title',\n  requiredDisplayType: 'Please input Display type',\n  requiredDisplayCategory: 'Please input Display category',\n  hotelList: 'Hotel list ',\n  promotionList: 'Promotion list',\n  flashSale: 'Flash sale',\n  promotion: 'Promotion',\n  directDiscount: 'Direct discount',\n  amenityPackHotel: 'Amenity Pack',\n  loveHotel: 'Love hotel ',\n  travelHotel: 'Travel hotel',\n  hotHotel: 'Hot hotel  ',\n  newHotel: 'New hotel',\n  stamp: 'Stamp',\n  quarantine: 'Quarantine',\n  g2jCertified: 'Go2Choice',\n  isTet: 'Hotel Tet',\n  image360: 'Image 360',\n  hotelReview: 'Hotel review',\n  hotSearched: 'Hot searched',\n  hotelBooked: 'Hotel booked',\n  hotelFavorite: 'Hotel favorite',\n  hotelSuggestion: 'Go2joy suggestion',\n  promotionGroup: 'Promotion group',\n  go2joySuggestion: 'Go2joy suggestion',\n  go2jSpecial: 'Go2J Special',\n  promotionSuggestion: 'Promotion suggestion',\n  detail: 'Detail',\n  collection: 'Collection',\n  allType: 'All type',\n  summary: 'Summary',\n  circle: 'Circle',\n  lightSquare: 'LightSquare',\n  darkSquare: 'DarkSquare',\n  rectangle1: 'Rectangle1:2',\n  rectangle2: 'Rectangle2:1',\n  icon: 'Icon',\n  title: 'Title 1',\n  image: 'Image',\n  chooseProvince: 'Display area',\n  edit: 'Edit',\n  titleHotelList: 'Title',\n  displayArea: 'Display area',\n  hotelName: 'Hotel name',\n  status: 'Status',\n  phone: 'Phone',\n  province: 'Province',\n  address: 'Address',\n  createTime: 'Create time',\n  code: 'Code',\n  discount: 'Discount',\n  applyStartEnd: 'Apply Start ~ End',\n  couponStartEnd: 'Coupon Start ~ End',\n  promotionName: 'Promotion name',\n  delete: 'Delete',\n  location: 'Location',\n  bookingType: 'Booking type',\n  hotelType: 'Hotel type',\n  all: 'All',\n  apply: 'Apply',\n  event: 'Event',\n  inviteFriend: 'Invite friend',\n  gift: 'Gift',\n  booking: 'Booking',\n  reportNewHotel: 'Report new hotel',\n  signUp: 'Sign up',\n  birthday: 'Birthday',\n  payment: 'Payment',\n  voucherCode: 'Voucher code',\n  waiting: 'Waiting',\n  displayed: 'Displayed',\n  contracted: 'Contracted',\n  trial: 'Trial',\n  terminated: 'Terminated',\n  suspended: 'Suspended',\n  termPolicy: 'Term & Policy',\n  notification: 'Notification',\n  noticeOfNoShow: 'Notice of No Show',\n  noticeOfCheckedInL: 'Notice of Checked-in L',\n  hotelAvailable: 'Available',\n  hotelUnavailable: 'Unavailable',\n  extraFeeYes: 'Yes',\n  extraFeeNo: 'No',\n  keyword: 'Key word',\n  add: 'Add',\n  save: 'Save',\n  back: 'Back',\n  addSuccess: 'Add success',\n  editSuccess: 'Update success',\n  removeSuccess: 'Delete Success',\n  description: 'Description',\n  getLink: 'Get link',\n  copy: 'Copy',\n  copied: 'Copied',\n  requiredHotelList: 'Please choose Hotel list',\n  function: 'Function'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/home-display/collection.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/home-display/dashboard.js":
/*!**********************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/home-display/dashboard.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  category: 'Category',\n  title: 'Title',\n  display: 'Display',\n  lastUpdate: 'Last update',\n  operations: 'Operations',\n  article: 'Article',\n  banner: 'Banner',\n  choose_area: 'Choose area',\n  voucher_code: 'Voucher code',\n  collection: 'Collection',\n  notice: 'Notice',\n  about_us: 'About us',\n  title1: 'Title 1',\n  title2: 'Title 2',\n  title3: 'Title 3',\n  content: 'Content',\n  success: 'Create success',\n  error: 'Create fail',\n  list_hotel: 'Hotel collection list',\n  display_type: 'Display type',\n  order: 'Order',\n  setup: 'Setup',\n  management: 'Management',\n  save: 'Save',\n  back: 'Back',\n  editSuccess: 'Edit success',\n  coverPhoto: 'Cover Photo',\n  image: 'Image'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/home-display/dashboard.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/hotels/hotel-facility/facilityAdd.js":
/*!*********************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/hotels/hotel-facility/facilityAdd.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  facility_name_vn: 'Facility name (VIE)',\n  facility_name_en: 'Facility name (ENG) ',\n  image: 'Image',\n  requiredName: 'Facility name (VIE) field is required',\n  requiredNameEn: 'Facility name (ENG) field is required',\n  requiredImage: 'Image field is required'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/hotels/hotel-facility/facilityAdd.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/hotels/hotel-facility/facilityList.js":
/*!**********************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/hotels/hotel-facility/facilityList.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'Name',\n  facility_name_en: 'Facility name (ENG)',\n  createstaff: 'Create Staff',\n  lastupdate: 'Last update',\n  operations: 'Operations',\n  placeholder: 'Facility name'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/hotels/hotel-facility/facilityList.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/hotels/hotel-group/hotelGroupAdd.js":
/*!********************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/hotels/hotel-group/hotelGroupAdd.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  namegroup: 'Name Group',\n  ownerinformation: 'Owner Information',\n  ownername: 'Owner Name',\n  ownertel: 'Owner Tel',\n  owneremail: 'Owner Email',\n  companyinformation: 'Company information',\n  companyname: 'Company Name',\n  businesslisencenumber: 'Business Lisence Number',\n  companytel: 'Company Tel',\n  companyemail: 'Company Email',\n  companyaddress: 'Company Address',\n  addhoteltogroup: 'Add Hotel To Group',\n  table_hotel_name: 'Hotel name',\n  table_status: 'Status',\n  table_phone: 'Phone',\n  table_address: 'Address',\n  table_commission: 'Commission',\n  operations: 'Operations',\n  requiredNameGroup: 'Name Group field is required',\n  requiredNameOwnerInfo: 'Owner Information field is required',\n  requiredOwnerTel: 'Owner Tel field is required',\n  requiredOwnerEmail: 'Owner Email field is required'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/hotels/hotel-group/hotelGroupAdd.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/hotels/hotel-group/hotelGroupDetail.js":
/*!***********************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/hotels/hotel-group/hotelGroupDetail.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  namegroup: 'Name Group',\n  ownerinformation: 'Owner Information',\n  ownername: 'Owner Name',\n  ownertel: 'Owner Tel',\n  owneremail: 'Owner Email',\n  companyinformation: 'Company information',\n  companyname: 'Company Name',\n  businesslisencenumber: 'Business Lisence Number',\n  companytel: 'Company Tel',\n  companyemail: 'Company Email',\n  companyaddress: 'Company Address',\n  addhoteltogroup: 'Add Hotel To Group',\n  table_hotel_name: 'Hotel name',\n  table_status: 'Status',\n  table_phone: 'Phone',\n  table_address: 'Address',\n  table_commission: 'Commission',\n  operations: 'Operations',\n  totalHotel: 'Total hotel'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/hotels/hotel-group/hotelGroupDetail.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/hotels/hotel-group/hotelGroupEdit.js":
/*!*********************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/hotels/hotel-group/hotelGroupEdit.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  namegroup: 'Name Group',\n  ownerinformation: 'Owner Information',\n  ownername: 'Owner Name',\n  ownertel: 'Owner Tel',\n  owneremail: 'Owner Email',\n  companyinformation: 'Company information',\n  companyname: 'Company Name',\n  businesslisencenumber: 'Business Lisence Number',\n  companytel: 'Company Tel',\n  companyemail: 'Company Email',\n  companyaddress: 'Company Address',\n  addhoteltogroup: 'Add Hotel To Group',\n  table_hotel_name: 'Hotel name',\n  table_status: 'Status',\n  table_phone: 'Phone',\n  table_address: 'Address',\n  table_commission: 'Commission',\n  operations: 'Operations',\n  requiredNameGroup: 'Name Group field is required',\n  requiredNameOwnerInfo: 'Owner Information field is required',\n  requiredOwnerTel: 'Owner Tel field is required',\n  requiredOwnerEmail: 'Owner Email field is required'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/hotels/hotel-group/hotelGroupEdit.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/hotels/hotel-group/hotelGroupList.js":
/*!*********************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/hotels/hotel-group/hotelGroupList.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'Group Name',\n  ownerName: 'Owner Name',\n  ownerTel: 'Owner Tel',\n  ownerEmail: 'Owner Email',\n  companyName: 'Company Name',\n  bln: 'Business Lisence Number',\n  companyAddress: 'Company Address',\n  companyTel: 'Company Tel',\n  companyEmail: 'Company Email',\n  totalHotel: 'Total hotel'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/hotels/hotel-group/hotelGroupList.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/hotels/hotel-staff/hotelStaffEdit.js":
/*!*********************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/hotels/hotel-staff/hotelStaffEdit.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  hotel_name: 'Hotel Name',\n  user_id: 'User Id',\n  full_name: 'Full Name',\n  role: 'Role',\n  mobile: 'Mobile',\n  receive_sms: 'Receive SMS',\n  email: 'Email',\n  debt_reconciliation_email: 'Debt Reconciliation Email',\n  address: 'Address',\n  memo: 'Memo',\n  password: 'Password',\n  admin_ks: 'Admin KS',\n  manager: 'Qu???n L??',\n  reception: 'L??? T??n',\n  status: 'Enable',\n  hotel_employee: 'Hotel Name',\n  confirm_password: 'Confirm password',\n  requiredHotelName: 'Hotel name field is required',\n  requiredUserId: 'User Id field is required',\n  requiredFullName: 'Full name field is required',\n  requiredRole: 'Role field is required',\n  requiredEmail: 'Email name field is required',\n  requiredMobile: 'Mobile field is required',\n  requiredDebtEmail: 'debtEmail field is required',\n  validatePassConfirm: 'Confirm password not equal with password',\n  requirePass: 'Please input Password',\n  requirePassConfirm: 'Please input Password Confirm'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/hotels/hotel-staff/hotelStaffEdit.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/hotels/hotel-staff/hotelStaffList.js":
/*!*********************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/hotels/hotel-staff/hotelStaffList.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  placeholder: 'Hotel name',\n  hotel_name: 'Hotel Name',\n  user_id: 'User Id',\n  full_name: 'Full Name',\n  role: 'Role',\n  mobile: 'Mobile',\n  receive_sms: 'Receive SMS',\n  email: 'Email',\n  status: 'Enable'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/hotels/hotel-staff/hotelStaffList.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/hotels/hotelDisplay.js":
/*!*******************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/hotels/hotelDisplay.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  code: 'Code',\n  checkinCheckoutTime: 'Check-in/Check-out Time',\n  startEndOvernight: 'Start/End Overnight',\n  groupName: 'Group Name',\n  hotelName: 'Hotel Name',\n  holdingCompany: 'Holding company',\n  taxNo: 'Tax No',\n  businessLicense: 'Business license',\n  companyName: 'Company name',\n  address: 'Address',\n  legalRepresentative: 'Legal representative',\n  fullName: 'Full name',\n  position: 'Position',\n  telephone: 'Telephone',\n  email: 'Email',\n  bankInformation: 'Bank information',\n  accountNo: 'Account no',\n  bankName: 'Bank name',\n  branchName: 'Branch name',\n  beneficiary: 'Beneficiary',\n  status: 'Status',\n  contractDate: 'Contract date',\n  endContractDate: 'End contract date',\n  typeNewContract: 'Type new contract',\n  bizInCharge: 'Biz in charge',\n  saleInCharge: 'Sale in charge',\n  manageHotelsAfterContracting: '* Manage hotels after contracting',\n  contractingNewHotel: '* Contracting new hotel',\n  sms: 'SMS',\n  go2joyPartnerApp: 'Go2Joy\\'t Partner App',\n  propertyManagementSystem: 'Property Management System',\n  hotelPms: '(Hotel PMS)',\n  yesIUsing: 'Yes, I\\'m using',\n  noIjustUse: 'No, I just use',\n  hotelType: 'Hotel type',\n  new: 'New',\n  hot: 'Hot',\n  amenityPack: 'Amenity Pack',\n  go2joyCertified: 'Go2joy Certified',\n  couponBooking: 'Coupon booking',\n  bookingSetup: 'Booking setup',\n  overnightTime: 'Overnight time',\n  dailyTime: 'Daily time',\n  startHourlyTime: 'Start hourly time',\n  location: 'Location',\n  longLat: 'Long/Lat',\n  longitude: 'Longitude',\n  latitude: 'Latitude',\n  provinceDistrict: 'Province/District',\n  province: 'Province',\n  district: 'District',\n  updateHotelCode: 'Update hotel code',\n  vietnameseDescription: 'Vietnamese description',\n  englishDescription: 'English description',\n  hotelPolicyVietnamese: 'Hotel policy Vietnamese',\n  hotelPolicyEnglish: 'Hotel policy English',\n  tipsAddress: 'Tips Address',\n  commission: 'Commission ',\n  hashTag: 'Hash tag',\n  homeImage: 'Home Image',\n  image: 'Image',\n  degreesImage: '360 image',\n  hotelNameCodeGroupName: 'Hotel name / Code / Group Name',\n  totalReview: 'Total Review',\n  phone: 'Phone',\n  areaCode: 'Area code',\n  averageMark: 'Average Mark',\n  promotionHotNew: 'Promotion / Hot / New',\n  totalLike: 'Total Like',\n  overnightTimeDailyTime: 'Overnight time / Daily time',\n  bookingNotificationBy: 'Booking notification by',\n  contractEndContractDate: 'Contract Date / End contract date',\n  payment: 'Payment',\n  roomAvailable: 'Room Available',\n  totalView: 'Total view',\n  createStaff: 'Create staff',\n  staffInCharge: 'Staff in charge',\n  top: 'Top',\n  display: 'Display',\n  extraFee: 'Extra fee',\n  firstHoursPrice: 'First Hours Price',\n  plusHoursPrice: 'Plus Hours Price',\n  overnightPrice: 'Overnight Price',\n  oneDayPrice: 'One Day Price',\n  memo: 'Memo',\n  payInAdvance: 'Pay in advance',\n  giftImage: 'Gift image',\n  // validation\n  requiredHotelName: 'The hotel name field is required',\n  requiredFullname: 'The full name field is required',\n  requiredPosition: 'The position field is required',\n  requiredTelephone: 'The telephone field is required',\n  requiredEmail: 'The email field is required',\n  requiredAccountNo: 'The account no field is required',\n  requiredBankName: 'The bank name field is required',\n  requiredBranchName: 'The branch name field is required',\n  requiredBeneficiary: 'The beneficiary field is required',\n  requiredBizInCharge: 'The biz in charge field is required',\n  requiredSaleInCharge: 'The sale in charge field is required',\n  requiredContractDate: 'The contract date field is required',\n  requiredLongitude: 'The longitude field is required',\n  requiredLatitude: 'The latitude field is required',\n  requiredAddress: 'The address field is required',\n  requiredProvince: 'The province field is required',\n  requiredDistrict: 'The district field is required',\n  requiredCommission: 'The commission field is required',\n  wrongFormatImage: 'The field must be an image',\n  requiredHomeImage: 'The home image is required',\n  // message\n  doYouWantToContinue: 'Do you want to continue?',\n  contractNo: 'Contract No',\n  isExistedInSystem: 'is existed in system'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/hotels/hotelDisplay.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/hotels/notice-to-hotel/detail-reply.js":
/*!***********************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/hotels/notice-to-hotel/detail-reply.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  hotel_name: 'Hotel Name',\n  message_type: \"Message's type\",\n  allow_to_reply: 'Allow to reply',\n  create_staff: 'Create Staff',\n  create_time: 'Create Time',\n  last_update: 'Last Update',\n  topic: 'Topic',\n  brief_detail: 'Brief Detail',\n  detail: 'Detail',\n  answer1: 'Allow',\n  answer0: 'No Allow',\n  Notification: 'Notification',\n  notice_of_no_show: 'Notice of No Show',\n  notice_of_Checked_in_l: 'Notice of Checked-in L',\n  apply_for_hotel: 'Apply for Hotel',\n  function: 'Function',\n  promotion: 'Promotion',\n  term_policy: 'Term & Policy',\n  all_hotels: 'All hotels',\n  all_hotel_contracts: 'All hotel contracts',\n  all_hotel_tries: 'All hotel tries',\n  only_apply: 'Only apply',\n  hotel_list: 'Hotel list',\n  requiredType: 'Type field is required',\n  requiredHotelList: 'Hotel list field is required',\n  requiredTitle: 'Title field is required',\n  content_qa: 'Content Q&A',\n  message_reply_success: 'Reply success',\n  message_sent_success: 'Sent success',\n  message_sent_error: 'Sent error'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/hotels/notice-to-hotel/detail-reply.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/hotels/notice-to-hotel/detailNotice.js":
/*!***********************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/hotels/notice-to-hotel/detailNotice.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  hotel_name: 'Hotel Name',\n  message_type: \"Message's type\",\n  allow_to_reply: 'Allow to reply',\n  create_staff: 'Create Staff',\n  create_time: 'Create Time',\n  last_update: 'Last Update',\n  topic: 'Topic',\n  brief_detail: 'Brief Detail',\n  detail: 'Detail',\n  answer1: 'Allow',\n  answer0: 'No Allow',\n  Notification: 'Notification',\n  notice_of_no_show: 'Notice of No Show',\n  notice_of_Checked_in_l: 'Notice of Checked-in L',\n  apply_for_hotel: 'Apply for Hotel',\n  function: 'Function',\n  promotion: 'Promotion',\n  term_policy: 'Term & Policy',\n  all_hotels: 'All hotels',\n  all_hotel_contracts: 'All hotel contracts',\n  all_hotel_tries: 'All hotel tries',\n  only_apply: 'Only apply',\n  hotel_list: 'Hotel list',\n  requiredType: 'Type field is required',\n  requiredHotelList: 'Hotel list field is required',\n  requiredTitle: 'Title field is required',\n  content_qa: 'Content Q&A',\n  message_reply_success: 'Reply success',\n  message_sent_success: 'Sent success',\n  message_sent_error: 'Sent error'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/hotels/notice-to-hotel/detailNotice.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/hotels/notice-to-hotel/notice-hotel-list.js":
/*!****************************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/hotels/notice-to-hotel/notice-hotel-list.js ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  create_staff: 'Create Staff',\n  create_time: 'Create Time',\n  last_update: 'Last Update',\n  hotel_name: 'Hotel Name',\n  status: 'status',\n  phone: 'Phone',\n  address: 'Address'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/hotels/notice-to-hotel/notice-hotel-list.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/hotels/notice-to-hotel/noticeApplyHotel.js":
/*!***************************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/hotels/notice-to-hotel/noticeApplyHotel.js ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  hotel_name: 'Hotel Name',\n  code: 'Code',\n  status: 'Status',\n  phone: 'Phone',\n  address: 'Address',\n  create_time: 'Create time',\n  last_update: 'Last update',\n  operations: 'Operations',\n  placeholder: 'Keyword',\n  all: 'All'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/hotels/notice-to-hotel/noticeApplyHotel.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/hotels/notice-to-hotel/noticeList.js":
/*!*********************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/hotels/notice-to-hotel/noticeList.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  topic: 'Topic',\n  message_type: \"Message's type\",\n  apply_for_hotel: 'Apply for Hotel',\n  create_staff: 'Create Staff',\n  create_time: 'Create Time',\n  last_update: 'Last Update',\n  hotel_name: 'Hotel Name',\n  status: 'status',\n  phone: 'Phone',\n  address: 'Address',\n  placeholder: 'Keyword',\n  operations: 'Operations'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/hotels/notice-to-hotel/noticeList.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/hotels/notice-to-hotel/sendNotice.js":
/*!*********************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/hotels/notice-to-hotel/sendNotice.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  list_hotel: 'Hotel list',\n  content_qa: 'Content Q&A',\n  inform_hotel_by: 'Inform hotel by',\n  email: 'Email',\n  go2joy_partner_app: 'Go2Joy Partner App',\n  send_email: 'Send Message',\n  list: 'List',\n  send: 'Send',\n  done: 'Done',\n  reply: 'Reply',\n  hotel_name: 'Hotel Name',\n  message_type: \"Message's type\",\n  allow_to_reply: 'Allow to reply',\n  create_staff: 'Create Staff',\n  create_time: 'Create Time',\n  last_update: 'Last Update',\n  topic: 'Topic',\n  brief_detail: 'Brief Detail',\n  detail: 'Detail',\n  answer1: 'Allow',\n  answer0: 'No Allow',\n  Notification: 'Notification',\n  notice_of_no_show: 'Notice of No Show',\n  notice_of_Checked_in_l: 'Notice of Checked-in L',\n  apply_for_hotel: 'Apply for Hotel',\n  function: 'Function',\n  promotion: 'Promotion',\n  term_policy: 'Term & Policy',\n  all_hotels: 'All hotels',\n  all_hotel_contracts: 'All hotel contracts',\n  all_hotel_tries: 'All hotel tries',\n  only_apply: 'Only apply'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/hotels/notice-to-hotel/sendNotice.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/hotels/product-type/productType.js":
/*!*******************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/hotels/product-type/productType.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name_product_type: 'Product Type name',\n  image_product_type: 'Image',\n  status_product_type: 'Status',\n  last_update_product_type: 'Last Update',\n  operations: 'Operations',\n  placeholder: 'Hotel name'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/hotels/product-type/productType.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/hotels/product-type/productTypeAdd.js":
/*!**********************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/hotels/product-type/productTypeAdd.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  product_type_name: 'Product Type name',\n  product_type_nameEn: 'Product Type name (English)',\n  image: 'Image',\n  requiredName: 'Product Type name field is required',\n  requiredNameEn: 'Product Type nameEn field is required',\n  requiredImage: 'Image field is required',\n  buttonAdd: 'Add',\n  buttonBack: 'Back'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/hotels/product-type/productTypeAdd.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/hotels/product-type/productTypeEdit.js":
/*!***********************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/hotels/product-type/productTypeEdit.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  product_type_name: 'Product Type name',\n  product_type_nameEn: 'Product Type name (English)',\n  image: 'Image',\n  requiredName: 'Product Type name field is required',\n  requiredNameEn: 'Product Type nameEn field is required',\n  requiredImage: 'Image field is required',\n  buttonEdit: 'Edit',\n  buttonBack: 'Back'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/hotels/product-type/productTypeEdit.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/hotels/product/product.js":
/*!**********************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/hotels/product/product.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  product_name: 'Product name',\n  product_type_name: 'Product Type name',\n  price: 'Price',\n  prepare_before_1_day: 'Prepare before 1 day',\n  last_update: 'Last update',\n  status: 'Status',\n  placeholder: 'Hotel name'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/hotels/product/product.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/hotels/product/productDetail.js":
/*!****************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/hotels/product/productDetail.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  hotel: 'Hotel',\n  product_name: 'Product name',\n  product_name_en: 'Product name (English)',\n  product_type_name: 'Product Type name',\n  product_type_name_en: 'Product Type name (English)',\n  price: 'Price',\n  prepare_before_1_day: 'Prepare before 1 day',\n  description: 'Description',\n  status: 'Status',\n  create_staff: 'Create staff',\n  last_update: 'Last update',\n  image: 'Image'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/hotels/product/productDetail.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/hotels/review/option/ratings.js":
/*!****************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/hotels/review/option/ratings.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  from_4_to_5: 'Rating from 4 to 5',\n  from_3_to_less_than_4: 'Rating from 3 to less than 4',\n  from_2_to_less_than_3: 'Rating from 2 to less than 3',\n  from_1_to_less_than_2: 'Rating from 1 to less than 2',\n  under_1: 'Rating under 1',\n  is_zero: 'Rating is 0',\n  is_one: 'Rating is 1',\n  is_two: 'Rating is 2',\n  is_three: 'Rating is 3',\n  is_four: 'Rating is 4',\n  is_five: 'Rating is 5'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/hotels/review/option/ratings.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/hotels/review/option/sortBy.js":
/*!***************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/hotels/review/option/sortBy.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  newest_to_oldest: 'Newest to oldest',\n  oldest_to_newest: 'Oldest to newest',\n  highest_to_lowest_rating: 'Highest to lowest rating',\n  lowest_to_highest_rating: 'Lowest to highest rating',\n  most_to_least_review: 'Most to least review',\n  least_to_most_review: 'Least to most review',\n  hotel_name_a_z: 'Hotel name A-Z',\n  hotel_name_z_a: 'Hotel name Z-A',\n  username_a_z: 'Username A-Z',\n  username_z_a: 'Username Z-A'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/hotels/review/option/sortBy.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/hotels/review/reviewMgt.js":
/*!***********************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/hotels/review/reviewMgt.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  label_header: '??i???m ????nh gi?? trung b??nh / T???ng s??? kh??ch s???n c?? ????nh gi?? / T???ng s??? b??nh lu???n:',\n  hotel_name: 'T??n kh??ch s???n',\n  placeholder: 'T??n kh??ch s???n',\n  hotel_status: 'Tr???ng th??i h???p ?????ng',\n  address: '?????a ch???',\n  average_rating: '??i???m trung b??nh ( Ti???n ??ch / S???ch s??? / D???ch v??? ):',\n  number_of_review: 'T???ng s??? b??nh lu???n ( T???ng s??? tr??? l???i b??nh lu???n ):',\n  num_of_review_like: 'T???ng s??? th??ch b??nh lu???n',\n  last_review: 'B??nh lu???n cu???i',\n  review: 'B??nh lu???n',\n  reply_content: 'Kh??ch s???n tr??? l???i',\n  num_of_like: 'T???ng s??? y??u th??ch',\n  user: 'T??i kho???n',\n  staff: 'Nh??n vi??n kh??ch s???n',\n  comment_time: 'Th???i ??i???m b??nh lu???n'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/hotels/review/reviewMgt.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/hotels/room-type/calendar.js":
/*!*************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/hotels/room-type/calendar.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  fs_report: 'FS report',\n  fs_setting: 'FS setting',\n  add: 'Add',\n  flash_sale: 'Flash sale',\n  extra_fee: 'Extra fee',\n  direct_discount: 'Direct discount',\n  sold_out: 'Sold out to day',\n  hotel_name: 'Hotel name',\n  room_type: 'Room type',\n  room_price: 'Room price',\n  day: 'Day',\n  three_days: '3 Days',\n  one_week: '1 Week',\n  one_month: '1 Month',\n  two_months: '2 Months',\n  three_months: '3 Months',\n  detail: 'View detail room type',\n  create: 'Create schedule',\n  edit: 'Edit',\n  delete: 'Delete',\n  confirm: 'Confirm',\n  save: 'Save',\n  cancel: 'Reject',\n  popup: 'You have a new confirmation',\n  headerFlashSale: 'FlashSale Room is running',\n  contentFlashSale: 'So, Go2Joy will be stop this FlashSale Room and turn off \" Open today\"',\n  is_lock_room: 'Sold out to day',\n  instant_lock: 'Instant lock',\n  room_left: 'Room left',\n  room_setting: 'Room setting',\n  pick_a_day: 'Pick a day',\n  room_left_content: 'Choose the number of rooms left to sell. The system will automatically lock this room type when it is sold out.',\n  createSchedule: 'Create schedule'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/hotels/room-type/calendar.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/hotels/room-type/comFirmLockRoom.js":
/*!********************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/hotels/room-type/comFirmLockRoom.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'Confirm lock room',\n  room_name: 'Room name',\n  block_time: 'Block time'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/hotels/room-type/comFirmLockRoom.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/hotels/room-type/createRoomType.js":
/*!*******************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/hotels/room-type/createRoomType.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  hotel_name: 'Hotel name',\n  name_room: 'Room name',\n  name_short_name: 'Name',\n  short_name: 'Short Name',\n  room_type: 'Room Type',\n  num_of_room: 'Num Of Room',\n  first_hours_price: 'First Hours Price ',\n  num_of_hours: 'Num of hours',\n  max_num_hour: 'Max num hour',\n  plus_hours_price: 'Plus Hours Price',\n  price: 'Price',\n  overnight_price: 'Overnight Price',\n  one_day_price: 'One Day Price',\n  square_bed_type_view: 'Square/Bed Type/View',\n  not_select: 'Not select',\n  single: 'Single',\n  double: 'Double',\n  twin: 'Twin',\n  triple: 'Triple',\n  _2double: '2 Double',\n  limit_number: 'Limit number of bookings use coupon per day',\n  no_limit: 'No limit',\n  memo: 'Memo',\n  home_image: 'Home image',\n  image: 'Image',\n  _360image: '360 image',\n  normal: 'Normal',\n  flash_sale: 'Flash Sale',\n  normal_room: 'Normal Room',\n  facilities: 'Facilities'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/hotels/room-type/createRoomType.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/hotels/room-type/detailRoomType.js":
/*!*******************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/hotels/room-type/detailRoomType.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'View detail room type',\n  hotel_name: 'Hotel name',\n  name_short_name: 'Name/Room type',\n  num_of_room: 'Num of room',\n  first_hours_price: 'First hours price',\n  max_num_hour: 'Max num hour',\n  plus_hour_price: 'Plus hour price',\n  overnight_price: 'Overight price',\n  one_day_price: 'One day price',\n  square: 'Square',\n  bed_type: 'Bed type',\n  view: 'View',\n  memo: 'Memo',\n  facilities: 'Facilities',\n  special_offer: {\n    name: 'Special offer',\n    description: 'Description',\n    end_date: 'End date',\n    gift_image: 'Gift image'\n  },\n  flash_sale: {\n    name: 'Flash sale',\n    name_flash_sale: 'Name',\n    description: 'Description',\n    sale_start: 'Start date',\n    quantity: 'Gift image',\n    flash_sale_price: 'Flash sale price'\n  },\n  extra_fee: {\n    name: 'Extra fee',\n    booking_type: 'Booking type',\n    origin: 'Origin',\n    start_end: 'Start/End ~ Extra fee',\n    days_apply: 'Day apply extra fee',\n    special_date: 'Special date ~ Extra fee'\n  },\n  direct_discount: {\n    name: 'Direct discount',\n    booking_type: 'Booking type',\n    origin: 'Origin',\n    start_end: 'Start/End ~ Direct discount',\n    days_apply: 'Day apply Direct discount',\n    special_date: 'Special date ~ Direct discount'\n  },\n  bed_types: {\n    not_select: 'Kh??ng ch???n',\n    single: 'Single',\n    double: 'Double',\n    twin: 'Twin',\n    triple: 'Triple',\n    _2double: '2 Double'\n  },\n  lockRoomHistory: 'Lock room history',\n  roomType: 'Room type',\n  dateRange: 'Date range',\n  startDate: 'Start date',\n  endDate: 'End date',\n  bookingType: 'Booking type',\n  startTime: 'Start time',\n  endTime: 'End time',\n  allRoomTypes: 'All room types',\n  daily: 'Daily',\n  hours: 'Hours',\n  overnight: 'Overnight',\n  allBookingTypes: 'All booking types'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/hotels/room-type/detailRoomType.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/hotels/room-type/directDiscount.js":
/*!*******************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/hotels/room-type/directDiscount.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'Direct discount',\n  hotel_name: 'Hotel name',\n  name_short_name: 'Name/Short name',\n  num_of_room: 'Num of room',\n  start_end: 'Start/End~Direct discount',\n  days_apply: 'Day apply direct discount',\n  monday: 'Monday',\n  tuesday: 'Tuesday',\n  wednesday: 'Wednesday',\n  thursday: 'Thursday',\n  friday: 'Friday',\n  saturday: 'Saturday',\n  sunday: 'Sunday',\n  special_date: 'Special date~direct discount',\n  first_hours_price: 'First hours price',\n  num_of_hours: 'Num of hours',\n  price: 'Price',\n  direct_discount_price: 'Discount price',\n  plus_hours_price: 'Plus hours price',\n  overnight_price: 'Overnight price',\n  one_day_price: 'One day price',\n  booking_type: 'Booking type',\n  origin: 'Origin',\n  success: 'success',\n  createSuccess: 'Create success',\n  checkSuccess: 'Success',\n  requireDirectDiscount: 'Require direct discount',\n  start_date: 'Start date',\n  end_date: 'End date'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/hotels/room-type/directDiscount.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/hotels/room-type/editRoomType.js":
/*!*****************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/hotels/room-type/editRoomType.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  hotel_name: 'Hotel name',\n  name_room: 'Room name',\n  name_short_name: 'Name',\n  short_name: 'Short Name',\n  room_type: 'Room Type',\n  num_of_room: 'Num Of Room',\n  first_hours_price: 'First Hours Price ',\n  num_of_hours: 'Num of hours',\n  max_num_hour: 'Max num hour',\n  plus_hours_price: 'Plus Hours Price',\n  price: 'Price',\n  overnight_price: 'Overnight Price',\n  one_day_price: 'One Day Price',\n  square_bed_type_view: 'Square/Bed Type/View',\n  not_select: 'Not select',\n  single: 'Single',\n  double: 'Double',\n  twin: 'Twin',\n  triple: 'Triple',\n  _2double: '2 Double',\n  limit_number: 'Limit number of bookings use coupon per day',\n  no_limit: 'No limit',\n  memo: 'Memo',\n  home_image: 'Home image',\n  image: 'Image',\n  _360image: '360 image',\n  normal: 'Normal',\n  flash_sale: 'Flash Sale',\n  normal_room: 'Normal Room',\n  facilities: 'Facilities',\n  bonus_hours: 'Bonus hours',\n  min_booking_hours: 'Min booking hours',\n  num_of_bonus_hours: 'Num of bonus hours',\n  gift_desc: 'Description',\n  gift_from_hotel: 'Gift from hotel',\n  to_date: 'To date',\n  gift_image: 'Gift Image'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/hotels/room-type/editRoomType.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/hotels/room-type/exportFlashSale.js":
/*!********************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/hotels/room-type/exportFlashSale.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'Flash sale export',\n  export_title: 'Please select date to export Flash Sale Room.'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/hotels/room-type/exportFlashSale.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/hotels/room-type/extraFee.js":
/*!*************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/hotels/room-type/extraFee.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'Extra fee',\n  hotel_name: 'Hotel name',\n  name_short_name: 'Name/Short name',\n  num_of_room: 'Num of room',\n  start_end: 'Start/End ~ Extra fee',\n  days_apply: 'Day apply extra fee',\n  monday: 'Monday',\n  tuesday: 'Tuesday',\n  wednesday: 'Wednesday',\n  thursday: 'Thursday',\n  friday: 'Friday',\n  saturday: 'Saturday',\n  sunday: 'Sunday',\n  special_date: 'Special date ~ Extra fee',\n  first_hours_price: 'First hours price',\n  num_of_hours: 'Num of hours',\n  price: 'Price',\n  after_extra_fee: 'After extra fee (From 1% - 500%)',\n  plus_hours_price: 'Plus hours price',\n  overnight_price: 'Overnight price',\n  one_day_price: 'One day price',\n  booking_type: 'Booking type',\n  origin: 'Origin',\n  success: 'Success',\n  createSuccess: 'Create success',\n  checkSuccess: 'Success',\n  requireDirectDiscount: 'Require direct discount',\n  start_date: 'Start date',\n  end_date: 'End date'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/hotels/room-type/extraFee.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/hotels/room-type/settingFS.js":
/*!**************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/hotels/room-type/settingFS.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  notification: 'Flash Sale notification send time',\n  flash_sale_threshold: 'Flash Sale threshold',\n  template: 'Template',\n  notification_title: 'Flash Sale notification title',\n  notification_content: 'Flash Sale notification content',\n  success: 'Success'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/hotels/room-type/settingFS.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/hotels/stamp.js":
/*!************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/hotels/stamp.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  hotelName: 'Hotel\\'s Name',\n  stampsToRedeem: 'Stamps to redeem',\n  redeemValue: 'Redeem value',\n  numberOfUsers: 'Number of users',\n  totalRedemption: 'Total redemption',\n  startDate: 'Start date',\n  lastUpdate: 'Last update',\n  status: 'Status',\n  endDate: 'End date',\n  operations: 'Operations',\n  suspend: 'Suspend',\n  available: 'Available',\n  ended: 'Ended',\n  canEarnStamp: 'Can earn stamp',\n  money: 'Money',\n  percentage: 'Percentage',\n  integrateWithFlashSale: 'Integrate with Flash Sale',\n  canRedeemForBooking: 'Can redeem for booking',\n  nickName: 'Nickname',\n  mobile: 'Mobile',\n  effectiveStamps: 'Effective stamps',\n  numberOfExpiredStamps: 'Number of expired stamps',\n  startDateOfCollecting: 'Start date of collecting',\n  inputUserNicknameOrPhoneNumber: 'Input user\\'s nickname or phone number',\n  numberOfStamp: 'Number of stamp',\n  // View Stamp\n  maxRedeem: 'Redeem value',\n  numToRedeem: 'Stamps to redeem',\n  numUserJoin: 'Number of users',\n  totalRedeem: 'Total redemption',\n  numStampActive: 'Effective stamps',\n  numStampExpire: 'Number of expired stamps',\n  flashSaleEarn: 'Integrate with flash sale',\n  // validation\n  requiredHotelName: 'The hotel name field is required',\n  requiredStartDate: 'The start date field is required'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/hotels/stamp.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/marketing/article.js":
/*!*****************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/marketing/article.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  title: 'Title',\n  create_staff: 'Create staff',\n  create_time: 'Create time',\n  result: 'Result',\n  hotel_name: 'Hotel name',\n  code: 'Code',\n  the_balance: 'The balance (+)Receivable(-)Payable',\n  current_debt: 'Current debt / Other debt',\n  period_debt: 'Period debt',\n  expected_pay: 'Expected pay / Pay amount',\n  choose_hotel: '',\n  address: 'Address',\n  status: 'Status',\n  categoryName: 'Category name',\n  current_debt_detail: 'Current debt',\n  other_debt_detail: 'Other debt',\n  period_debt_detail: 'Period debt',\n  summary: 'Summary',\n  content: 'Content',\n  image: 'Image',\n  detail_article: 'Detail article',\n  delete: 'Delete',\n  edit: 'Edit',\n  save: 'Save',\n  back: 'Back',\n  refresh: 'Refresh',\n  download: 'Download',\n  display: 'Display',\n  not_send_yet: 'Not send yet',\n  error: 'Error',\n  ok: 'Ok',\n  hashtag: 'Hash tag',\n  dont_send: \"Don't send\",\n  requiredTitle: 'Please input Title',\n  requiredSlug: 'Please input Slug',\n  requiredAuthor: 'Please input Author',\n  requiredCategory: 'Please input Category',\n  requiredImage: 'Please upload Image',\n  requiredSummary: 'Please input Summary',\n  requiredContent: 'Please input Content',\n  requiredHashtag: 'Please input Hashtag',\n  requiredCategoryName: 'Please input Category name',\n  articleCategory: 'Article category',\n  category: 'Category',\n  displayType: 'Display Type',\n  postingDate: 'Posting Date',\n  author: 'Author',\n  schedulePosting: 'Schedule posting time',\n  operations: 'Operations',\n  numberOfArticle: 'Number of articles',\n  addArticle: 'Add Article',\n  lastUpdate: 'Last update',\n  views: 'Views',\n  articleTitle: 'Article title',\n  keyword: 'Keyword',\n  confirmDeleteCategory: 'Are you sure you want to delete this article category?',\n  by: 'By',\n  schema: 'Schema'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/marketing/article.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/marketing/banner.js":
/*!****************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/marketing/banner.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  choose_display_in_app_web: 'Choose display in App/Web',\n  title: 'Title',\n  image: 'Image',\n  linkedName: 'Linked Name',\n  totalClicks: 'Total clicks',\n  linkedType: 'Linked Type',\n  status: 'Status',\n  operations: 'operations',\n  type: 'Type',\n  listProvince: 'Display area',\n  lastUpdate: 'Last update',\n  imagePath: 'Image',\n  targetType: 'Linked type',\n  linkItem: 'Link item',\n  display: 'Display',\n  stopAt: 'Stop at',\n  chooseProvince: 'Choose province',\n  chooseDistrict: 'Choose district',\n  typesofdisplay: 'Types of display',\n  random: 'Random',\n  custom: 'Custom',\n  // Validation,\n  requiredTitle: 'The title field is required',\n  requiredTargetSn: 'The target sn field is required',\n  requiredTargetInfo: 'The target info field is required',\n  requiredProvinceSelected: 'The province selected field is required'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/marketing/banner.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/marketing/crm/crm.js":
/*!*****************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/marketing/crm/crm.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  title: 'Title',\n  createTime: 'Create time',\n  lastUpdate: 'Last update',\n  status: 'Status',\n  active: 'Active',\n  expired: 'Expired',\n  //\n  equal: 'Equal',\n  greater: 'Greater',\n  greaterEqual: 'Greater Equal',\n  less: 'Less',\n  lessEqual: 'Less Equal',\n  notEqual: 'Not equal',\n  //\n  male: 'Male',\n  female: 'Female',\n  //\n  empty: 'Empty',\n  notEmpty: 'Not empty',\n  //\n  install: 'Install',\n  uninstall: 'Uninstall'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/marketing/crm/crm.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/marketing/inviteFriend.js":
/*!**********************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/marketing/inviteFriend.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  title: 'Title',\n  typeOfInvitation: 'Type of Invitation',\n  dailyBudget: 'Daily budget',\n  inviteeAmount: 'Invitee amount',\n  inviterAmount: 'Inviter amount',\n  startEndDate: 'Start/end date',\n  createTime: 'Create time',\n  lastUpdate: 'Last update',\n  operations: 'Operations',\n  unlimited: 'Unlimited',\n  account: 'Account',\n  status: 'Status',\n  inviteeInviter: 'Invitee/ Inviter',\n  createBy: 'Create by',\n  via: 'Via',\n  guidelinesVn: 'Guidelines (VN)',\n  guidelinesEn: 'Guidelines (EN)',\n  SMSContent: 'SMS content',\n  startDate: 'Start date',\n  endDate: 'End date',\n  nickName: 'Nick name',\n  mobile: 'Mobile',\n  registerProvince: 'Register province',\n  loginBy: 'Login by',\n  registerTime: 'Register time',\n  openApp: 'Open app',\n  totalInvitee: 'Total invitee',\n  stayAtHotelTime: 'Stay At Hotel Time',\n  // validation\n  requiredTitle: 'The title field is required',\n  requiredStartDate: 'The start date field is required',\n  requiredEndDate: 'The end date field is required',\n  requiredGuidelinesVn: 'The guidelines (VN) field is required',\n  requiredGuidelinesEn: 'The guidelines (EN) field is required'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/marketing/inviteFriend.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/marketing/lucky-wheel.js":
/*!*********************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/marketing/lucky-wheel.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  coupon: 'Coupon',\n  content: 'Content',\n  images: 'Images',\n  listCouponOneDayOrigin: 'List coupon one date origin',\n  percentOrigin: 'Percent origin',\n  display: 'Display',\n  createTime: 'Create time',\n  lastUpdate: 'Last update'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/marketing/lucky-wheel.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/marketing/notice.js":
/*!****************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/marketing/notice.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  title: 'Title',\n  homePage: 'Home page',\n  createStaff: 'Create Staff',\n  createTime: 'Create Time',\n  lastUpdate: 'Last Update',\n  operations: 'operations',\n  onTop: 'On Top',\n  content: 'Content',\n  // Validation\n  requiredTitle: 'The title field is required',\n  requiredContent: 'The start date field is required'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/marketing/notice.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/marketing/notification.js":
/*!**********************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/marketing/notification.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  title: 'Title',\n  targetType: 'Target type',\n  createStaff: 'Create staff',\n  sendTo: 'Send to',\n  totalSend: 'Total send (Ios-Android)',\n  totalView: 'Total view (Ios-Android)',\n  conversion: 'conversion (Ios-Android)',\n  numSent: 'Num sent',\n  createTime: 'Create time',\n  sentTime: 'Sent time',\n  status: 'Status',\n  operations: 'Operations',\n  type: 'Notification type',\n  subTitle: 'Sub Title',\n  filterByLocation: 'Filter by location',\n  lastOpenApp: 'Last open app',\n  rightNow: 'Right now',\n  schedule: 'Schedule',\n  content: 'Content',\n  noticeType: 'Notice type',\n  titleIcon: 'Title Icon',\n  PleaseChooseExcelFile: 'Please choose excel(.xslx)',\n  ChooseArea: 'Choose area',\n  // Validation\n  requiredTitle: 'The title field is required',\n  requiredTargetSn: 'The target sn field is required',\n  requiredSchedule: 'The schedule date field is required'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/marketing/notification.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/marketing/pgpb.js":
/*!**************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/marketing/pgpb.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'Name',\n  mobile: 'Mobile',\n  code: 'Code',\n  gender: 'Gender',\n  email: 'Email',\n  birthday: 'Birthday',\n  address: 'Address',\n  totalOfIntroduction: 'Total of introduction',\n  hotelName: 'Hotel name',\n  saleInfomation: 'Sale infomation',\n  operations: 'operations',\n  hotelEmployee: 'Hotel employee',\n  totalPay: 'Total pay',\n  totalNotPay: 'Total not pay',\n  nickName: 'Nick name',\n  loginBy: 'Login by',\n  registerTime: 'Register time',\n  registerAddress: 'Register address',\n  mobileId: 'Mobile ID',\n  os: 'OS',\n  pay: 'Pay',\n  // Validation\n  requiredBirthday: 'The birthday field is required',\n  requiredMobile: 'The mobile field is required',\n  requiredName: 'The name field is required'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/marketing/pgpb.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/marketing/popup.js":
/*!***************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/marketing/popup.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  title: 'Title',\n  image: 'Image',\n  linkedName: 'Linked Name',\n  disableCondition: 'Disable condition',\n  maxView: 'Max view',\n  noViewLimit: 'No view limit',\n  totalOfViews: 'Total of views',\n  totalClicks: 'Total clicks',\n  linkedType: 'Linked Type',\n  status: 'Status',\n  operations: 'operations',\n  type: 'Type',\n  listProvince: 'Display area',\n  lastUpdate: 'Last update',\n  imagePath: 'Image',\n  targetType: 'Linked type',\n  linkItem: 'Link item',\n  maxViewDisplay: 'Max view / Display',\n  stopAt: 'Stop at',\n  chooseProvince: 'Choose province',\n  chooseDistrict: 'Choose district',\n  typesofdisplay: 'Types of display',\n  random: 'Random',\n  custom: 'Custom',\n  both: 'Both',\n  numOfDisplay: 'Num of display',\n  numOfCustomDisplay: 'Num of custom display',\n  perDecivePerDate: '/ per device / per date',\n  noLimit: 'No limit',\n  content: 'Content',\n  // Validation,\n  requiredTitle: 'The title field is required',\n  requiredTargetSn: 'The target sn field is required',\n  requiredTargetInfo: 'The target info field is required',\n  requiredProvinceSelected: 'The province selected field is required'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/marketing/popup.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/marketing/promotion/coupon-condition.js":
/*!************************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/marketing/promotion/coupon-condition.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  conditionCoupon: 'Condition to use coupon',\n  justUseCouponAt: 'Just use coupon at',\n  justUseFor: 'Just use for',\n  hourly: 'Hourly',\n  overnight: 'Overnight',\n  daily: 'Daily',\n  hotelMaxOneDay: 'Hotel max one day',\n  maxOneHotel: 'Max one hotel',\n  noLimit: '0: Unlimited',\n  minBookingMoney: 'Min booking money',\n  paymentWhenUseCoupon: 'Payment when use coupon',\n  couponMemo: 'Content of Validation VI|EN',\n  apply: 'Apply',\n  issueCouponCondition: 'Issue coupon condition',\n  applyForUser: 'Apply for user',\n  voucherCodeFor: 'Voucher code for',\n  contentOfValidation: 'Content of validation VI|EN',\n  applyToHotel: 'Apply to hotel',\n  applyAllHotel: 'Apply all hotel',\n  applyAllHotelExcept: 'Apply all hotel except',\n  applyToUser: 'User list',\n  applyAllUser: 'Apply all user',\n  applyAllUserExcept: 'Apply all user except',\n  signUpPeriod: 'Sign-up period',\n  numCheckIn: 'Num check-in',\n  numCheckInKs: 'Num check in ks',\n  payment: 'Payment',\n  payInAdvance: 'Pay in advance',\n  bookingType: 'Booking type',\n  bookingTime: 'Booking time',\n  //\n  name: 'Coupon',\n  both: 'Both',\n  notUse: 'Not use',\n  use: 'Use',\n  //\n  payHotel: 'Pay at hotel',\n  momo: 'Momo',\n  credit: 'Credit card (OnePay)',\n  debit: 'Debit card (OnePay)',\n  payoo: 'Pay@Store - Payoo',\n  zaloPay: 'ZaloPay',\n  creditCardVnpt: 'Credit card (VNPT)',\n  atmCardVnpt: 'ATM card (VNPT)',\n  shopeePay: 'ShopeePay',\n  creditCard: 'Credit card',\n  atmCard: 'ATM card',\n  //\n  onlyApply: 'Only apply',\n  conditionToUseCoupon: 'Condition to use coupon: ',\n  maxCouponPerDay: 'Max coupon per day:',\n  maxCouponPerHotel: 'Max coupon per hotel:',\n  //\n  commonCode: 'Common code',\n  privateCode: 'Private code'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/marketing/promotion/coupon-condition.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/marketing/promotion/create-promotion.js":
/*!************************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/marketing/promotion/create-promotion.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  title: 'Title',\n  code: 'Code',\n  numOfCoupon: 'Num of Coupon:',\n  maxNumOfCoupon: 'Max num of coupon:',\n  type: 'Type',\n  coPromotion: 'Co-Promotion',\n  display: 'Display on App',\n  callMaxDiscount: 'Call max discount',\n  discountAfterPromotion: 'Apply to fee after other discount',\n  makePLabel: 'Make P label',\n  applyDirectDiscount: 'Apply direct discount',\n  displayHotel: 'Display hotel',\n  applyStartEnd: 'Apply Start ~ End',\n  daysFromIssueDate: 'Days from issue date',\n  couponStartEnd: 'Coupon Start ~ End',\n  discount: 'Discount',\n  maxDiscount: 'Max discount',\n  go2joyHotel: 'Go2Joy / Hotel',\n  contentVi: 'Content (VI)',\n  contentEn: 'Content (EN)',\n  typeOfDisplay: 'Types of Display',\n  subContentVi: 'Sub content(VI)',\n  subContentEn: 'Sub content(En)',\n  nameOfButton: 'Name of button(VI|EN)',\n  imageList: 'Image Of List',\n  imageDetail: 'Detail page image',\n  promotionGroup: 'Promotion group',\n  //\n  titleRequired: 'The title field is required.',\n  codeRequired: 'The code field is required.',\n  contentViRequired: 'The content vi field is required.',\n  contentEnRequired: 'The content en field is required.',\n  content2Required: 'The content2 field is required.',\n  memoRequired: 'The memo field is required.',\n  subContentViRequired: 'The sub content vi field is required.',\n  subContentEnRequired: 'The sub content en field is required.',\n  nameOfButtonRequired: 'The name of the button is required.',\n  listImageRequired: 'The list image field is required',\n  detailImageRequired: 'The detail image field is required'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/marketing/promotion/create-promotion.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/marketing/promotion/group-promotion.js":
/*!***********************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/marketing/promotion/group-promotion.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  groupName: 'Group name',\n  promotionList: 'Promotion list',\n  status: 'Status',\n  lastUpdate: 'Last update',\n  displayArea: 'Display area',\n  title: 'Title'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/marketing/promotion/group-promotion.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/marketing/promotion/issue-coupon-condition.js":
/*!******************************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/marketing/promotion/issue-coupon-condition.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'Issue coupon condition',\n  couponMemo: 'Content of Validation VI|EN:',\n  apply: 'Apply:',\n  contentOfValidation: 'Content of validation VI|EN',\n  numCheckIn: 'Num check in',\n  numCheckInKs: 'Num check in ks',\n  importUserByExcel: 'Import user by excel',\n  signUpPeriod: 'Sign up period',\n  memo: 'Memo'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/marketing/promotion/issue-coupon-condition.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/marketing/promotion/promotion.js":
/*!*****************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/marketing/promotion/promotion.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  promotionGroup: 'Promotion group',\n  //\n  title: 'Title',\n  code: 'Code',\n  type: 'Type',\n  discount: 'Discount',\n  applyStartEnd: 'Apply Start~End',\n  couponStartEnd: 'Coupon Start~End',\n  status: 'Status',\n  totalHotelApplied: 'Total hotel applied',\n  totalUserApplied: 'Total user applied',\n  totalCouponApplied: 'Total coupon applied',\n  total_consumed_applied: 'Total consumed applied',\n  totalDiscount: 'Total discount',\n  //\n  all: 'All',\n  apply: 'Apply',\n  event: 'Event',\n  inviteFriend: 'Invite friend',\n  gift: 'Gift',\n  booking: 'Booking',\n  reportNewHotel: 'Report new hotel',\n  signUp: 'Sign up',\n  birthday: 'Birthday',\n  payment: 'Payment',\n  voucherCode: 'Voucher code',\n  //\n  discountMoney: 'Discount money',\n  discountPercent: 'Discount %',\n  discountHours: 'Discount hours',\n  samePrice: 'Same price',\n  //\n  banner: 'Banner',\n  detail: 'Detail',\n  //\n  deleted: 'Deleted',\n  active: 'Active',\n  expired: 'Expired',\n  draft: 'Draft',\n  wait_confirm: 'Wait confirm',\n  not_yet: 'Not yet',\n  //\n  name: 'Hotel name',\n  phone: 'Phone',\n  address: 'Address',\n  createTime: 'Create Time',\n  lastUpdate: 'Last Update',\n  //\n  waiting: 'Waiting',\n  displayed: 'Displayed',\n  contracted: 'Contracted',\n  trial: 'Trial',\n  terminated: 'Terminated',\n  suspended: 'Suspended',\n  //\n  nickName: 'Nick name',\n  gender: 'Gender',\n  mobile: 'Mobile',\n  applyTime: 'Apply Time',\n  hotelName: 'Hotel Name',\n  stayAtHotelTime: 'Stay At Hotel Time',\n  couponIssuedTime: 'Coupon Issued Time',\n  usedTime: 'Used Time',\n  //\n  applied: 'Applied',\n  hadCoupon: 'Had coupon',\n  usedCoupon: 'Used coupon',\n  //\n  go2joyDiscount: 'Go2joy discount',\n  hotelDiscount: 'Hotel discount',\n  sponsorDiscount: 'Sponsor discount',\n  totalConsumedCoupon: 'Total consumed coupon',\n  totalGo2joyDiscount: 'Total go2joy discount',\n  totalHotelDiscount: 'Total hotel discount',\n  totalSponsorDiscount: 'Total sponsor discount',\n  maxCouponPerHotel: 'Max coupon per hotel',\n  numOfCoupon: 'Num of coupon',\n  maxNumOfCoupon: 'Max num of coupon',\n  imageOfList: 'Image of list',\n  imageOfDetail: 'Detail page image',\n  roomApplyList: 'Room apply list',\n  contentVn: 'Content(VI)',\n  contentEn: 'Content(EN)',\n  content2: 'Content2',\n  memo: 'Memo',\n  normalRoom: 'Normal room',\n  //\n  applyAllHotel: 'Apply all hotel',\n  applyAllHotelExcept: 'Apply all hotel except',\n  onlyApply: 'Only apply',\n  listHotel: 'List of hotel',\n  //\n  mobileSn: 'Mobile sn',\n  appUserSn: 'App user sn',\n  os: 'OS',\n  mobileRegisterTime: 'Mobile register time',\n  email: 'Email',\n  loginBy: 'Login by',\n  effectivePoint: 'Effective point',\n  registerTime: 'Register time',\n  openApp: 'Open app',\n  //\n  winner: 'Winner',\n  waitingList: 'Waiting list',\n  userAppliedList: 'User applied list',\n  couponContent: 'days from issue date'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/marketing/promotion/promotion.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/marketing/sms.js":
/*!*************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/marketing/sms.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  sms_type: 'SMS Type',\n  sender: 'Sender',\n  content: 'Content(Vietnamese without accent)',\n  create_staff: 'Create Staff',\n  create_time: 'Create Time',\n  send_to: 'Send To',\n  num_of_sms: 'Num of SMS',\n  total_price: 'Total price(VND)',\n  send_schedule: 'Send Schedule',\n  send_time: 'Send Time',\n  email: 'Email',\n  account: 'Account',\n  sender_type: 'Sender / SMS Type',\n  area: 'Area',\n  select_hotel: 'Select hotel',\n  hotel_list: 'Hotel list',\n  number_list: 'Number list',\n  key_search: 'Key search',\n  user_list: 'User list',\n  please_choose: 'Please choose excel file',\n  create: 'Create',\n  back: 'Back',\n  send: 'Send',\n  go2joy: 'Go2Joy.vn',\n  phone: '0931.836.836',\n  random_number: 'Random number',\n  custom_care: 'Customer Care',\n  marketing: 'Marketing',\n  all: 'All hotel',\n  specific_area: 'Specific area',\n  specific_hotel: 'Specific hotel',\n  specific_number: 'Specific number',\n  specific_user: 'Specific user',\n  import_from_excel_file: 'Import from excel file',\n  all_user: 'All user',\n  excelFile: 'Excel file',\n  importFile: 'Import file',\n  hotelName: 'Hotel name'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/marketing/sms.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/mileage-point/MpBoosting.js":
/*!************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/mileage-point/MpBoosting.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  mileageName: 'Mileage name',\n  numberOfPoints: 'Number of points',\n  period: 'Period',\n  bookingType: 'Booking type',\n  applyDays: 'Apply days',\n  roomType: 'Room type',\n  minFee: 'Min fee',\n  combinePromotion: 'Combine promotion',\n  payment: 'Payment',\n  hotelName: 'Hotel name',\n  bookingNo: 'Booking No',\n  nickName: 'Nick name',\n  stayAtHotelTime: 'Stay At Hotel Time',\n  amount: 'Amount',\n  expireTime: 'Expire time',\n  CreateTime: 'Create time',\n  email: 'Email',\n  phone: 'Mobile',\n  effectivePoint: 'Effective point',\n  earnedPoint: 'Earned point',\n  usedPoint: 'Used point',\n  expiredPoint: 'Expired point',\n  earnedFirstTime: 'Earned first time',\n  type: 'Type',\n  createTime: 'Create time',\n  monday: 'Monday',\n  tuesday: 'Tuesday',\n  wednesday: 'Wednesday',\n  friday: 'Friday',\n  thursday: 'Thursday',\n  saturday: 'Saturday',\n  sunday: 'Sunday',\n  hourly: 'Hourly',\n  overnight: 'Overnight  ',\n  daily: 'Daily',\n  normal: 'Normal  ',\n  flashSale: 'Flash sale',\n  flashsaleRoom: 'Flash sale',\n  normalRoom: 'Normal',\n  yes: 'Yes',\n  no: 'No',\n  payAtHotel: 'Pay at hotel',\n  zaloCredit: 'Credit card',\n  zaloDebit: 'Debit card',\n  payAtStore: 'Pay@Store',\n  mileageDetailTitle: 'Mileage detail title',\n  hotelList: 'Hotel list',\n  allHotel: 'All hotel',\n  allHotelReject: 'All hotel reject',\n  justApply: 'Just apply',\n  specifyProvince: 'Specify province',\n  hotel_name: 'Hotel name',\n  status: 'Status',\n  address: 'Address',\n  create_time: 'Create Time',\n  last_update: 'Last Update',\n  area_code: 'Area Code',\n  ios_total_access: 'Ios Total Access',\n  android_total_access: 'Android Total Access',\n  waiting: 'Waiting',\n  displayed: 'Displayed',\n  contracted: 'Contracted',\n  trial: 'Trial',\n  terminated: 'Terminated',\n  suspended: 'Suspended',\n  'startDate/endDate': 'Start date - End date',\n  requiredName: 'Please input mileage name',\n  requiredNumPoint: 'Please input number of points',\n  requiredMinFee: 'Please input min fee'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/mileage-point/MpBoosting.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/mileage-point/mileagePoint.js":
/*!**************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/mileage-point/mileagePoint.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  nickName: 'Nick name',\n  email: 'Email',\n  mobile: 'Mobile',\n  effectivePoint: 'Effective point',\n  earnedPoint: 'Earned point',\n  usedPoint: 'Used point',\n  expiredPoint: 'Expired point',\n  earnedFirstTime: 'Earned first time',\n  userdPoint: 'userdPoint',\n  mileageName: 'Mileage name',\n  type: 'Type',\n  hotelName: 'Hotel name',\n  bookingNo: 'Booking no',\n  numberOfPoints: 'Number of points',\n  amount: 'Amount',\n  expireTime: 'Expire time',\n  createTime: 'Create time',\n  get: 'Get',\n  use: 'Use',\n  expired: 'Expired'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/mileage-point/mileagePoint.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/profile/profile.js":
/*!***************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/profile/profile.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  userID: 'User Id',\n  full_name: 'Full name',\n  mobile: 'Mobile',\n  address: 'Address',\n  email: 'Email',\n  memo: 'Memo',\n  current_password: 'Current password',\n  new_password: 'New passord',\n  confirm_new_password: 'Confirm new password'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/profile/profile.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/sa-account/confirmGroup.js":
/*!***********************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/sa-account/confirmGroup.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  staffName: 'Staff name',\n  roleName: 'Role',\n  mobile: 'Mobile',\n  enable: 'Enable',\n  region: 'Region',\n  confirmPermission: 'Confirm permission',\n  createTime: 'Create time',\n  placeholder: 'Staff',\n  operations: 'Operations',\n  level1: 'Level 1',\n  level2: 'Level 2'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/sa-account/confirmGroup.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/sa-account/permission.js":
/*!*********************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/sa-account/permission.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  roleName: 'Role name',\n  subSupperAdmin: 'Sub supper admin',\n  saleAdmin: 'Sale admin',\n  headOfMkt: 'Head of MKT',\n  accountant: 'Accountant',\n  saleFreelancer: 'Sale freelancer',\n  developer: 'Developer',\n  headOfBiz: 'Head of biz',\n  marketing: 'Marketing',\n  business: 'Business',\n  system: 'System',\n  functionName: 'Function name',\n  areaRestriction: 'Area restriction',\n  view: 'View',\n  create: 'Create',\n  modify: 'Modify',\n  delete: 'Delete',\n  export: 'Export',\n  special: 'Special'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/sa-account/permission.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/sa-account/saleIncentive.js":
/*!************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/sa-account/saleIncentive.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  incentive_date: 'Incentive date',\n  created_by: 'Created by',\n  status: 'Status',\n  created_time: 'Created time',\n  confirmed_time: 'Confirmed time',\n  detail: 'Detail',\n  staff_name: 'Staff name',\n  role: 'Role',\n  mobile: 'Mobile',\n  enable: 'Enable',\n  region: 'Region',\n  confirm_permission: 'Confirm permission',\n  create_time: 'Create time',\n  incentive: 'Incentive',\n  pit: 'PIT',\n  income: 'Income',\n  new_contract: 'New Contract',\n  stamp: 'Stamp',\n  hotel_promotion: 'Hotel promotion',\n  co_promotion: 'Co-promotion',\n  new_hotel_checkin_amount: 'New hotel checkin amount',\n  confirm: 'Confirm',\n  save: 'Save',\n  category: 'Category',\n  province: 'Province',\n  district: 'District',\n  hotel_name: 'Hotel name',\n  verified_date: 'Verified date',\n  contract_date: 'Contract date',\n  contract_per: 'Contract (%)',\n  program: 'Program',\n  start_date_promotion: 'Start date promotion',\n  end_date_promotion: 'End date promotion',\n  start_date_stamp: 'Start date stamp',\n  new_contract_type: 'New contract type',\n  stage: 'Stage',\n  number_of_checkin_bookings: 'Number of checkin bookings',\n  commission_of_checkin_amount: 'Commission of checkin amount',\n  success: 'Confirm success',\n  error: 'Confirm fail',\n  full_name: 'Full name',\n  user_id: 'User id',\n  email: 'Email',\n  history: 'History',\n  delete: 'Delete',\n  edit: 'Edit',\n  back: 'Back',\n  Address: 'Address',\n  memo: 'Memo',\n  south: 'South',\n  north: 'North',\n  middle: 'Middle',\n  action: 'Action',\n  url: 'Url',\n  group_sn: 'Group Sn',\n  param_information: 'Param Information',\n  time_access: 'Time Access',\n  address: 'Address',\n  role_region: 'Role region',\n  password: 'Password',\n  confirm_password: 'Confirm Password',\n  all_region: 'All region',\n  view: 'View',\n  all_types: 'All types',\n  transfer_booking: 'Transfer Booking',\n  transfer: 'Transfer',\n  promotion: 'Promotion',\n  invite_friend: 'Invite friend',\n  product: 'Product',\n  level1: 'Level 1',\n  level2: 'Level 2',\n  export: 'export',\n  create: 'Create',\n  update: 'Update',\n  special: 'Special',\n  view_detail: 'View Detail',\n  filter_action12: 'Hotel Mgt / Qu???n L?? Kh??ch S???n',\n  filter_action13: 'Room Type Mgt / Qu???n L?? Lo???i Ph??ng',\n  filter_action14: 'Staff Mgt / Qu??n L?? Nh??n Vi??n',\n  filter_action15: 'Facilities Mgt / Qu???n L?? Ti???n ??ch',\n  filter_action16: 'User Mgt / Qu???n L?? Ng?????i D??ng',\n  filter_action17: 'App Notice Mgt / Qu???n L?? Tin Nh???n',\n  filter_action18: 'Q&A Mgt / Qu???n L?? Q&A',\n  filter_action19: 'FAQ Mgt / Qu???n L?? FAQ',\n  filter_action20: 'Promotion Mgt / Qu???n L?? Khuy???n M??i',\n  filter_action21: 'Booking Mgt /Qu???n L?? ?????t Ph??ng',\n  filter_action22: 'Booking Report Mgt / B??o C??o ?????t Ph??ng',\n  filter_action23: 'PG Mgt / Qu???n L?? Ti???p Th???',\n  filter_action24: 'Banner Mgt /Qu???n L?? Banner',\n  filter_action25: 'Popup Mgt / Qu???n L?? Popup',\n  filter_action26: 'Service Agreement Mgt / Qu???n L?? Ch??nh S??ch',\n  filter_action27: 'Review Mgt / Qu???n L?? B??nh Lu???n',\n  filter_action28: 'Notification Mgt /Qu???n L?? Th??ng B??o',\n  filter_action29: 'Setting Mgt / Thi???t L???p',\n  filter_action30: 'Log Mgt / Qu???n L?? Log',\n  filter_action31: 'Permission Mgt / Ph??n Quy???n',\n  filter_action32: 'Profile Mgt / H??? S??',\n  filter_action34: 'SMS Mgt / Qu???n L?? SMS',\n  filter_action35: 'Super Staff Mgt/Qu???n L?? NV Go2Joy ',\n  filter_action37: 'Stamp Mgt/ Qu???n L?? Stamp',\n  filter_action38: 'CRM Management/ Ch??m S??c Kh??ch H??ng',\n  filter_action39: 'Mileage Point Mgt/ Qu???n L?? ??i???m Th?????ng',\n  filter_action40: 'Hotel Group Mgt/ Qu???n L?? Nh??m KS',\n  filter_action41: 'Home Mgt/ Qu???n L?? Home Page',\n  filter_action42: 'Mkt Tracking Mgt/ Th???ng K?? D??? Li???u',\n  filter_action43: 'Activities / Vi???c C???a T??i',\n  filter_action44: 'Invite Friend / M???i b???n',\n  filter_action45: 'Confirm Group/ Nh??m X??c Nh???n',\n  filter_action47: 'SA Hotel Product type/ Qu???n L?? Lo???i S???n Ph???m',\n  filter_action48: 'SA Hotel Debt/ Qu???n L?? N??? KS',\n  filter_action49: 'Open Second Splash Mgt / Qu???n l?? M??n h??nh ch??? 2',\n  filter_action50: 'SA Hotel On Top/ Qu???n l?? Hotel On Top',\n  filter_action51: 'SA Sale Incentive History Mgt/ Qu???n L?? L???ch S??? Hoa H???ng',\n  details: 'Details',\n  function: 'Function'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/sa-account/saleIncentive.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/sa-account/staffs.js":
/*!*****************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/sa-account/staffs.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  fullName: 'Full name',\n  userId: 'User id',\n  inputUserId: 'Input user id',\n  role: 'Role',\n  mobile: 'Mobile',\n  email: 'Email',\n  region: 'Region',\n  enable: 'Enable',\n  operations: 'Operations',\n  allRegion: 'All region',\n  south: 'South',\n  north: 'North',\n  middle: 'Middle',\n  confirm: 'Confirm',\n  view: 'View',\n  address: 'Address',\n  memo: 'Memo',\n  password: 'Password',\n  confirmPassword: 'Confirm password',\n  incorrectEmail: 'Please input correct email address',\n  requiredEmail: 'Please input Email',\n  requiredFullName: 'Please input Full name',\n  requiredUserId: 'Please input User id',\n  requiredRole: 'Please select Role',\n  requiredAddress: 'Please input Address',\n  requiredMobile: 'Please input Mobile',\n  requiredPassword: 'Please input Password',\n  requiredConfirmPassword: 'Please input Confirm password',\n  confirmMatch: 'New password and Confirm password do not match',\n  notMobile: 'The number you???ve provided is incorrect'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/sa-account/staffs.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/service-agreement/service-agreement.js":
/*!***********************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/service-agreement/service-agreement.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  update_private_policy: 'Edit Private Policy',\n  update_service_agreement: 'Edit Service Agreement',\n  update_mileage_point: 'Edit Mileage Point',\n  update_payment_policy: 'Edit Payment policy',\n  private_policy: 'Private policy',\n  service_agreement: 'Service agreement',\n  mileage_point: 'Mileage point',\n  payment_policy: 'Payment policy'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/service-agreement/service-agreement.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/settings/settings.js":
/*!*****************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/settings/settings.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  updateSetting: 'Update setting',\n  changeNewAfter: 'Change new to normal after',\n  blockBookingFrom: 'Block booking from',\n  lastVersion: 'Last version',\n  partnerLastVersion: 'GO2JOY PARTNER last version',\n  cineJoyLastVersion: 'CineJoy last version',\n  refreshCacheData: 'Refresh cache data',\n  refresh: 'Refresh',\n  days: 'Days',\n  openSecondSplash: 'Open second splash',\n  title: 'Title',\n  province: 'Province',\n  district: 'District',\n  linked_name: 'Linked Name',\n  linked_type: 'Linked Type',\n  start_date: 'Start Date',\n  end_date: 'End Date',\n  background_color: 'Background Color',\n  image: 'Image',\n  typeTop: 'Type top',\n  create_time: 'Create Time',\n  create_by: 'Create By',\n  status: 'Status',\n  address: 'Adress',\n  hotel: 'Hotel',\n  hotelName: 'Hotel name',\n  promotion_event: 'Promotion/Event',\n  notice: 'Notice',\n  direct_discount: 'Direct discount',\n  promotion_group: 'Promotion group',\n  amenity_pack: 'Amenity pack',\n  link: 'Link',\n  mileage_point: 'Mileage point',\n  all: 'All',\n  expired: 'Expired',\n  active: 'Active',\n  will_active: 'Will active',\n  pending: 'Pending',\n  operations: 'Operations',\n  location: 'Location',\n  link_item: 'Link item',\n  display_second_splash: 'Display second splash',\n  image_background: 'Image background',\n  width: 'Width',\n  height: 'Height',\n  hashtag: 'Hash tag',\n  kindOfHotelOnTop: 'Kind of Hotel on Top',\n  collection: 'Collection',\n  hotelOnTopDetails: 'Hotel on top details',\n  staffName: 'Staff name',\n  hotelOnTopByDistrict: 'By District',\n  hotelOnTopByDashtag: 'By Hashtag',\n  hotelOnTopByCollection: 'By Collection',\n  bySearching: 'By Searching',\n  topHotel: 'TOP hotel',\n  requireStartDate: 'Please input start date',\n  requireEndDate: 'Please input end date',\n  requireTitle: 'Please input title',\n  requireHashtag: 'Please select hashtag',\n  collectionList: 'Collection list',\n  requiredPromotions: 'Please input Promotions',\n  requiredNotice: 'Please input Notice',\n  requiredHotel: 'Please input Hotel',\n  requiredPromotionsGroup: 'Please input promotions group',\n  requiredDistrict: 'Please input district',\n  requireStartEndDate: 'Please input start date & end date'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/settings/settings.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/tracking/bookingTracking.js":
/*!************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/tracking/bookingTracking.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  region: 'REGIONS',\n  total: 'TOTAL',\n  start_date: 'START DATE',\n  end_date: 'END DATE',\n  total1234: 'Total (1) + (2) + (3) + (4)',\n  accumulation: 'Accumulation',\n  actual_amount: 'Actual Amount',\n  waiting: 'Waiting (1)',\n  contracted: 'Contracted (2)',\n  suspended: 'Suspended (3)',\n  terminated: 'Terminated (4)',\n  displayed: 'Displayed',\n  trial: 'Trial',\n  datefrom: 'Date From',\n  hotel_name: 'Hotel Name',\n  number_of_signup: 'Number of Sign-up',\n  checkin_by_register: 'Checkin by register',\n  daily_average: 'Daily average',\n  previous_month_average: 'Previous month average',\n  average: 'Average',\n  dateFrom: 'Date From'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/tracking/bookingTracking.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/tracking/hotelIntroduceSignup.js":
/*!*****************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/tracking/hotelIntroduceSignup.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  datefrom: 'Date From',\n  hotel_name: 'Hotel Name',\n  number_of_signup: 'Number of Sign-up',\n  checkin_by_register: 'Checkin by register',\n  nickname: 'Nick name',\n  gender: 'Gender',\n  birthday: 'Birthday',\n  email: 'Email',\n  mobile: 'Mobile',\n  register_province: 'Register province',\n  login_by: 'Login by',\n  effective_point: 'Effective point',\n  via: 'Login by',\n  register_time: 'Register time',\n  open_app: 'Open app',\n  last_open_app: 'Last open app',\n  status: 'Status',\n  hotel_invite_code: 'Hotel Invite Code',\n  booking_no: 'Booking No',\n  room_type: 'Room type',\n  coupon: 'Coupon',\n  type: 'Type',\n  booking_time: 'Booking Time',\n  stay_at_hotel_time: 'Stay At Hotel Time',\n  check_in_time: 'Check-In Time',\n  booking_status: 'Booking status',\n  total_amount: 'Total Amount',\n  user_pay: 'User Pay',\n  paid_in_advance: 'Paid in advance',\n  refund: 'Refund'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/tracking/hotelIntroduceSignup.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/tracking/hotelStatusTracking.js":
/*!****************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/tracking/hotelStatusTracking.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  region: 'REGIONS',\n  total: 'TOTAL',\n  start_date: 'START DATE',\n  end_date: 'END DATE',\n  total1234: 'Total (1) + (2) + (3) + (4)',\n  accumulation: 'Accumulation',\n  actual_amount: 'Actual Amount',\n  waiting: 'Waiting (1)',\n  contracted: 'Contracted (2)',\n  suspended: 'Suspended (3)',\n  terminated: 'Terminated (4)',\n  displayed: 'Displayed',\n  trial: 'Trial',\n  datefrom: 'Date From',\n  hotel_name: 'Hotel Name',\n  number_of_signup: 'Number of Sign-up',\n  checkin_by_register: 'Checkin by register',\n  dateFrom: 'Date From',\n  startDate: 'Start date',\n  endDate: 'End date'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/tracking/hotelStatusTracking.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/users/counseling/counselingMgt.js":
/*!******************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/users/counseling/counselingMgt.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  scope: 'Scope',\n  title: 'Title',\n  nickname: 'Nickname',\n  create_time: 'Create time',\n  last_update: 'Last update',\n  unread: 'Not answer yet'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/users/counseling/counselingMgt.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/users/counseling/createCounselingMgt.js":
/*!************************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/users/counseling/createCounselingMgt.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  title: 'Title',\n  content: 'Content',\n  sendUser: 'To user',\n  placeholderUser: 'To user',\n  placeholderScope: 'Scope',\n  scope: 'Scope',\n  requireTitle: 'Title is required',\n  requireContent: 'Content is required',\n  requireUserApp: 'User is required',\n  requireScope: 'Scope is required'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/users/counseling/createCounselingMgt.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/users/counseling/replyCounselingMgt.js":
/*!***********************************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/users/counseling/replyCounselingMgt.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  nickname: 'Nickname',\n  user_id: 'User id',\n  birthday: 'Birthday',\n  email: 'Email',\n  gender: 'Gender',\n  mobile: 'Mobile',\n  address: 'Address',\n  member_id: 'Member id',\n  login_by: 'Login by',\n  res_time: 'Register time',\n  last_open_app: 'Last open app',\n  last_update: 'Last update',\n  device_code: 'Device code',\n  status: 'Status',\n  content: 'Content Q&A'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/users/counseling/replyCounselingMgt.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/users/deviceMgt.js":
/*!***************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/users/deviceMgt.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  mobile_user_id: 'Device code',\n  app_user_nickName: 'User login',\n  first_app_user_nickName: 'First signup',\n  device_code: 'Device code',\n  push_notification: 'Notification',\n  last_open_app: 'Last open app',\n  app_version: 'Version',\n  install: 'Install',\n  register_province: 'Register province',\n  res_time: 'Register time',\n  last_update: 'Last update',\n  source: 'Source'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/users/deviceMgt.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/users/firstBooking.js":
/*!******************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/users/firstBooking.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  nickName: 'Nickname',\n  mobile: 'Mobile',\n  registerProvince: 'Register Province',\n  bookingNo: 'Booking No',\n  hotel: 'Hotel',\n  lastUpdate: 'Last update',\n  totalWillCall: 'Total will call',\n  totalCalled: 'Total called',\n  done: 'Done',\n  ok: 'OK',\n  cancel: 'Cancel',\n  phoneNumber: 'Mobile',\n  operations: 'Operations',\n  startDate: 'Start date',\n  endDate: 'End date',\n  viewBookingDetail: 'View booking detail',\n  userInfo: 'User Info',\n  roomTypeName: 'Room Type',\n  coupon: 'Coupon',\n  stayAtHotelTime: 'Stay At Hotel Time',\n  bookingStatus: 'Booking Status',\n  roomAmount: 'Room amount',\n  productAmount: 'Product amount',\n  totalAmount: 'Total Amount',\n  g2jDiscount: 'G2J discount',\n  hotelDiscount: 'Hotel discount',\n  amountFromUser: 'User Pay',\n  prepayAmount: 'Paid in advance',\n  extraFee: 'Extra fee',\n  mileagePoint: 'Mileage point',\n  otherDiscount: 'Other discount',\n  flashSale: 'Flash sale',\n  redeemStamp: 'Redeem stamp',\n  directDiscount: 'Direct discount',\n  hours: 'Hours',\n  overnight: 'Overnight',\n  daily: 'Daily',\n  confirmed: 'Confirmed',\n  checkIn: 'Checked-in',\n  noShow: 'No show',\n  noShowL: 'No show L',\n  source: 'Source',\n  samePrice: 'Same price',\n  messageWarning: 'Warning',\n  messageAlert: 'Are yot sure?'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/users/firstBooking.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/users/userMgt.js":
/*!*************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/users/userMgt.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  provinceName: 'Province',\n  districtName: 'District',\n  totalHotel: 'Total hotel',\n  totalContracted: 'Total contracted hotel',\n  lastUpdate: 'Last update',\n  name: 'Name',\n  phone: 'Phone',\n  address: 'Address',\n  totalReview: 'Total review',\n  totalFavorite: 'Total favorite',\n  averageMark: 'Average mark',\n  bookingNo: 'Booking No',\n  hotelName: 'Hotel name',\n  roomTypeName: 'Room type name',\n  couponName: 'Coupon',\n  type: 'Type',\n  createTime: 'Create time',\n  checkInDatePlan: 'Check in date plan',\n  checkInTime: 'Check in date revice',\n  usedTime: 'Used time',\n  bookingStatus: 'Booking status',\n  totalAmount: 'Total amount',\n  amountFromUser: 'Amount from user',\n  prepayAmount: 'Prepay amount',\n  refunded: 'Refunded',\n  promotionName: 'Promotion name',\n  discount: 'Discount',\n  issueTime: 'Issue time',\n  effectTime: 'Effect time',\n  used: 'Status',\n  numStampActiveRedeem: 'Num stamp active redeem',\n  numStampExpire: 'Num stamp expire',\n  totalRedeem: 'Total redeem',\n  startJoinTime: 'Start join time',\n  nickName: 'Nickname',\n  gender: 'Gender',\n  birthday: 'Birthday',\n  email: 'Email',\n  mobile: 'Mobile',\n  firstProvinceName: 'Register province',\n  viaApp: 'Login by',\n  point: 'Effective point',\n  numOpenApp: 'Open app',\n  last_op_app: 'Last open app',\n  status: 'Status',\n  keyword: 'Keyword',\n  startDate: 'Start date',\n  endDate: 'End date',\n  rangeSeparator: 'To',\n  operations: 'Operations',\n  source: 'Source',\n  unread: 'Not answer yet',\n  male: 'Male',\n  female: 'Female',\n  gender_none: 'N/A',\n  yes: 'Active',\n  no: 'None',\n  disable: 'Disable',\n  loging: 'Login',\n  logouted: 'Logout',\n  not_yet: 'Not yet',\n  statusUsed: 'Used',\n  expired: 'Expired',\n  reserved: 'Reserved',\n  check_in: 'Check-In',\n  cancel: 'Cancel',\n  no_show: 'No show',\n  hours: 'Hours',\n  overnight: 'Overnight',\n  daily: 'Daily',\n  static: 'Total accounts',\n  mobile_devices: 'Total devices',\n  mobile_devices_open: 'Total devices',\n  delete: 'Delete',\n  edit: 'Edit',\n  back: 'Back',\n  save: 'Save',\n  open: 'Open',\n  user_id: 'User id',\n  password: 'Password',\n  re_password: 'Confirm password',\n  success: 'Edit success',\n  update_error: 'Edit fail',\n  confirm_password: 'Confirm password not equal with password',\n  donate_success: 'Donate success',\n  created_success: 'Created success',\n  favorite_area: 'Favorite area',\n  favorite_hotel: 'Favorite hotel',\n  booking_history: 'Booking history',\n  coupon: 'Coupon list',\n  stamp: 'Stamp list',\n  member_id: 'Member id',\n  lastOpenApp: 'Last open app',\n  login: 'Status',\n  mobileDevice: 'Device code',\n  open_app_last: 'Open app last',\n  lastOpenAddress: 'Last open address',\n  first_signup: 'First signup',\n  os: 'OS',\n  notification: 'Notification',\n  version: 'Version',\n  registerTime: 'Register time',\n  user_login: 'User login',\n  mobile_user_id: 'Mobile user id',\n  language: 'Language',\n  install: 'Install',\n  public: 'Public',\n  private: 'Private',\n  export_success: 'Export success',\n  requireNickname: 'Please input Nickname',\n  requireEmail: 'Please input Email',\n  requireMobile: 'Please input Mobile',\n  requireBirthday: 'Please input Birthday',\n  requireAddress: 'Please input Address',\n  requirePass: 'Please input Password',\n  requirePassConfirm: 'Please input Password Confirm',\n  validatePassConfirm: 'Confirm password not equal with password',\n  editSuccess: 'Update success',\n  userId: 'User Id',\n  memberId: 'Member Id',\n  creditCard: 'Credit Card',\n  debitCard: 'debit Card',\n  deleteSuccess: 'delete successfully',\n  messageAlert: 'Are yot sure?',\n  messageWarning: 'Warning'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/users/userMgt.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/general/breadcrumb.js":
/*!************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/general/breadcrumb.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  home: 'Qu???n l?? home page',\n  activities: 'Vi???c c???a t??i',\n  activities_detail: 'Chi ti???t vi???c c???a t??i',\n  dashboard: 'B???ng ??i???u khi???n',\n  categoryEdit: 'S???a',\n  ApplyForHotel: '??p d???ng cho kh??ch s???n',\n  user: 'Ng?????i d??ng',\n  userMgt: 'Qu???n l?? ng?????i d??ng',\n  deviceMgt: 'Qu???n l?? thi???t b???',\n  counselingMgt: 'Qu???n l?? Q&A',\n  replyCounselings: 'Tr??? l???i counselings',\n  createCounselings: 'T???o counselings',\n  userDetails: 'Chi ti???t',\n  hotels: 'Kh??ch s???n',\n  selectApplyHotel: 'Ch???n Kh??ch S???n ??p D???ng',\n  collectionEdit: 'S???a',\n  collectionCreate: 'Th??m',\n  product_type_mgt: 'Qu???n l?? lo???i s???n ph???m',\n  product_type_edit: 'S???a lo???i s???n ph???m',\n  product_type_create: 'T???o lo???i s???n ph???m',\n  product_mgt: 'Qu???n l?? s???n ph???m',\n  product_detail: 'Chi ti???t s???n ph???m',\n  product_edit: 'S???a s???n ph???m',\n  hotel_group_mgt: 'Qu???n l?? nh??m KS',\n  hotel_group_create: 'T???o nh??m kh??ch s???n',\n  hotel_group_edit: 'S???a nh??m kh??ch s???n',\n  hotel_group_detail: 'Chi ti???t nh??m kh??ch s???n',\n  hotelDisplay: 'Qu???n l?? kh??ch s???n',\n  hotelDisplayCreate: 'Th??m',\n  hotelDisplayEdit: 'S???a',\n  hotelDisplayDetails: 'Chi ti???t',\n  page_not_found: 'Trang kh??ng t???n t???i',\n  categoryDetails: 'Chi ti???t',\n  collection: 'B??? s??u t???p',\n  collectionDetails: 'Chi ti???t',\n  roomType: 'Qu???n l?? lo???i ph??ng',\n  detailRoomType: 'Chi ti???t lo???i ph??ng',\n  createRoomType: 'T???o m???i lo???i ph??ng',\n  editRoomType: 'S???a lo???i ph??ng',\n  hotel_room_type: 'Qu???n l?? lo???i ph??ng',\n  settingFs: 'Thi???t l???p FS',\n  hotel_staff_mgt: 'Qu???n l?? nh??n vi??n',\n  hotel_staff_edit: 'S???a nh??n vi??n kh??ch s???n',\n  hotel_staff_create: 'T???o nh??n vi??n kh??ch s???n',\n  hotel_staff_detail: 'Chi ti???t nh??n vi??n kh??ch s???n',\n  hotel_facility_mgt: 'Qu???n l?? ti???n ??ch',\n  facility_create: 'Th??m qu???n l?? ti???n ??ch',\n  facility_edit: 'S???a qu???n l?? ti???n ??ch',\n  notice_to_hotel: 'Tin nh???n ?????n KS',\n  notice_to_hotel_detail: 'Chi ti???t tin nh???n ?????n KS',\n  notice_to_hotel_create: 'T???o tin nh???n ?????n KS',\n  notice_edit: 'S???a tin nh???n ?????n KS',\n  reply_to_hotel: 'G???i tin nh???n ?????n KS',\n  send_notice_to_hotel: 'G???i tin nh???n ?????n KS',\n  create_apply_for_hotel: 'Danh s??ch kh??ch s???n ??p d???ng',\n  list_apply_for_hotel: 'Danh s??ch kh??ch s???n ??p d???ng',\n  notice_to_hotel_reply: 'Danh s??ch kh??ch s???n',\n  stamp: 'Qu???n l?? tem',\n  stampCreate: 'Th??m',\n  stampEdit: 'S???a',\n  stampDetails: 'Xem th??ng tin tem',\n  stampDetailTotalUser: 'Qu???n l?? chi ti???t t???ng ng?????i d??ng',\n  marketing: 'Marketing',\n  notice: 'Notice',\n  noticeCreate: 'Th??m',\n  noticeEdit: 'S???a',\n  noticeDetails: 'Chi ti???t',\n  mileagePointMgt: 'Q.L?? ??i???m th?????ng',\n  mpBoostingMgt: 'Ch????ng tr??nh ??T',\n  mpUserMgt: '??T ng?????i d??ng',\n  promotion: 'Khuy???n m??i',\n  chooseWinner: 'Ch???n ng?????i th???ng',\n  createPromotion: 'Th??m khuy???n m??i',\n  editPromotion: 'S???a khuy???n m??i',\n  couponCondition: '??i???u ki???n s??? d???ng coupon',\n  applyForHotelRoom: '??p d???ng cho ph??ng kh??ch s???n',\n  promotionDetails: 'Chi ti???t khuy???n m??i',\n  groupPromotion: 'Nh??m khuy???n m??i',\n  editGroupPromotion: 'S???a nh??m khuy???n m??i',\n  createGroupPromotion: 'Th??m nh??m khuy???n m??i',\n  settingGroupPromotion: 'Thi???t l???p nh??m khuy???n m??i',\n  applyForHotel: '??p d???ng cho kh??ch s???n',\n  applyForUser: '??p d???ng cho ng?????i d??ng',\n  hotelApply: 'Kh??ch s???n ???????c ??p d???ng',\n  userApply: 'Ng?????i d??ng ???????c ??p d???ng',\n  applyForPromotion: 'Khuy???n m??i ???????c ??p d???ng',\n  inviteFriend: 'CT m???i b???n',\n  inviteFriendCreate: 'Th??m',\n  inviteFriendEdit: 'S???a',\n  inviteFriendDetails: 'Chi ti???t',\n  inviteFriendDetailsList: 'Danh s??ch ng?????i m???i',\n  inviteeList: 'Danh s??ch ng?????i ???????c m???i',\n  pointListMgt: '??i???m th?????ng ng?????i d??ng',\n  notification: 'Qu???n l?? th??ng b??o',\n  notificationCreate: 'Th??m',\n  notificationEdit: 'S???a',\n  notificationDetails: 'Chi ti???t',\n  banner: 'Banner',\n  bannerCreate: 'Th??m',\n  bannerEdit: 'S???a',\n  bannerSetting: 'C??i ?????t hi???n th???',\n  bannerDetails: 'Chi ti???t',\n  popup: 'Popup',\n  popupCreate: 'Th??m',\n  popupEdit: 'S???a',\n  popupSetting: 'C??i ?????t hi???n th???',\n  popupDetails: 'Chi ti???t',\n  pgpb: 'Qu???n l?? PGPB',\n  pgpbCreate: 'Th??m',\n  pgpbEdit: 'S???a',\n  pgpbDetails: 'Chi ti???t',\n  pgpbTotalOfIntroduction: 'Danh s??ch ng?????i d??ng',\n  sendingMail: 'L???ch s??? g???i mail',\n  sendingMailCreate: 'Th??m',\n  sendingMailDetails: 'Danh s??ch chi ti???t n??? KS',\n  generalSetting: 'C??i ?????t chung',\n  settings: 'C??i ?????t',\n  keyword: 'T??? kh??a',\n  review: 'Qu???n l?? b??nh lu???n',\n  reviewDetail: 'Chi ti???t qu???n l?? b??nh lu???n',\n  add: 'Th??m',\n  edit: 'S???a',\n  create: 'Th??m',\n  detail: 'Chi ti???t',\n  service_agreement_mgt: 'Qu???n l?? ch??nh s??ch',\n  update_service_agreement_mgt: 'C???p nh???t qu???n l?? ch??nh s??ch',\n  view_review_hotel: 'Qu???n l?? chi ti???t b??nh lu???n',\n  apply_for_promotion: 'Danh s??ch Khuy???n m??i',\n  apply_for_user: 'Danh s??ch ng?????i d??ng',\n  profile: 'Th??ng tin ng?????i d??ng',\n  saprofile_update: 'C???p nh???t th??ng tin ng?????i d??ng',\n  my_profile: 'H??? s?? c???a t??i',\n  logout: '????ng xu???t',\n  userEdit: 'S???a',\n  editorDemo: 'Editor Demo',\n  firstBooking: 'Booking l???n ?????u',\n  firstBookingDetails: 'Chi ti???t',\n  bookingReport: 'B??o c??o ?????t ph??ng',\n  cashFlowReport: 'B??o c??o d??ng ti???n',\n  cashFlowReportDetail: 'Chi ti???t b??o c??o d??ng ti???n',\n  sendMail: 'G???i th??',\n  hotelDebt: 'Qu???n l?? n??? KS',\n  hotelDebtDetailList: 'Chi ti???t danh s??ch n??? KS',\n  hotelDebtDetail: 'Chi ti???t n??? KS',\n  hotelDebtEdit: 'S???a n??? KS',\n  hotelDebtCreate: 'Th??m n??? KS',\n  hotelDebtReview: 'Review qu???n l?? n??? KS',\n  bookingReportDetails: 'Chi ti???t',\n  bookingReportHotels: 'Danh s??ch kh??ch s???n',\n  booking: '?????t ph??ng',\n  bookingAdhoc: '?????t ph??ng Adhoc',\n  bookingAdhocSearch: 'T??m ki???m ?????t ph??ng Adhoc',\n  searchByBookingNo: 'T??m ki???m b???ng m??',\n  article: 'B??i b??o',\n  articleEdit: 'S???a',\n  articleCreate: 'Th??m',\n  articleHome: 'Article home',\n  articleSetup: 'Thi???t l???p',\n  'Pin article': 'Pin article',\n  'Article with title': 'Article with title',\n  'Article with image': 'Article with image',\n  'Article with summary': 'Article with summary',\n  'Article collection': 'Article collection',\n  addThumbnail: 'Th??m Thumbnail',\n  openSecondSplash: 'TL m??n h??nh ch??? 2',\n  hotelOntop: 'Qu???n l?? hotel on TOP',\n  openSecondSplashEdit: 'S???a',\n  articleCategory: 'Nh??m b??i b??o',\n  articleCategoryCreate: 'Th??m',\n  articleCategoryEdit: 'S???a',\n  openSecondSplashCreate: 'Th??m',\n  hotelOnTop: 'Qu???n l?? hotel on TOP',\n  hotelOnTopEdit: 'S???a',\n  hotelOnTopCreate: 'Th??m',\n  go2joyStaffEdit: 'S???a',\n  go2joyStaffCreate: 'Th??m',\n  go2joyStaffDetails: 'Chi ti???t',\n  go2joyConfirmGroup: 'Qu???n l?? N.X??c nh???n',\n  saAccountMgt: 'Qu???n l?? TK SA',\n  go2joyStaffs: 'Qu???n l?? N.Vi??n G2J',\n  sms: 'SMS',\n  trackingMgt: 'Th???ng k?? d??? li???u',\n  bookingTrackingMgt: 'Theo d??i ?????t ph??ng',\n  hotelStatusTrackingMgt: 'Theo d??i tr???ng th??i KS',\n  hotelIntroduceSignup: 'Theo d??i ????ng k?? KS',\n  numberOfSignup: 'S??? l?????ng ????ng k??',\n  checkinByRegister: 'Checkin b???ng m?? KS',\n  crm: 'CRM',\n  crmDetail: 'Chi ti???t crm',\n  crmCreate: 'Th??m crm',\n  crmEdit: 'S???a crm',\n  mobileList: 'Danh s??ch thi???t b???',\n  smsCreate: 'Th??m',\n  SaleIncentiveHistoryDetails: 'Chi ti???t',\n  SaleIncentiveHistory: 'L???ch s??? t??i kho???n hoa h???ng',\n  SaleIncentiveHistoryCreate: 'Th??m',\n  DetailsOfStaff: 'Chi ti???t nh??n s???',\n  AccountSaleIncentiveDetail: 'Chi ti???t t??i kho???n hoa h???ng',\n  revenueReport: 'B??o c??o doanh thu',\n  revenueReportDetails: 'Chi ti???t',\n  permission: 'Ph??n quy???n',\n  mpBoostingDetails: 'Chi ti???t ch????ng tr??nh ??T',\n  mpBoostingCreate: 'Th??m ch????ng tr??nh ??T',\n  ngEdit: 'Ch???nh s???a ch????ng tr??nh ??T',\n  mpListHotelBoostingMgt: 'Danh s??ch kh??ch s???n ??p d???ng ??i???m th?????ng',\n  luckyWheel: 'V??ng xoay may m???n',\n  createEditLuckyWheel: 'Th??m, s???a v??ng xoay may m???n'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/general/breadcrumb.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/general/button.js":
/*!********************************************************!*\
  !*** ./src/plugins/i18n/language/vn/general/button.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  update: 'C???p nh???t',\n  add: 'Th??m',\n  search: 'T??m ki???m',\n  done: 'Ho??n th??nh',\n  create: 'T???o',\n  save: 'L??u',\n  edit: 'S???a',\n  reply: 'Tr??? l???i',\n  delete: 'X??a',\n  chooseFile: 'Ch???n t???p',\n  export: 'Xu???t file',\n  back: 'Quay l???i',\n  cancel: 'H???y',\n  ok: '?????ng ??',\n  confirm: 'X??c nh???n',\n  disable: 'V?? hi???u',\n  enable: 'K??ch ho???t',\n  dsks: 'DSKS',\n  account: 'T??i kho???n',\n  createRoomHotel: 'T???o lo???i ph??ng',\n  ungroup: 'R???i nh??m',\n  send: 'G???i ??i',\n  download: 'T???i xu???ng',\n  detail: 'Chi ti???t',\n  sendMail: 'G???i mail',\n  resend: 'G???i l???i',\n  stop: 'D???ng',\n  sendRequest: 'G???i y??u c???u',\n  continue: 'Ti???p theo',\n  settingOfDisplay: 'C??i ?????t hi???n th???',\n  checkAll: 'Ch???n t???t c???',\n  hidden: '???n',\n  show: 'Hi???n th???',\n  list: 'Danh s??ch',\n  management: 'Qu???n l??',\n  setup: 'Thi???t l???p',\n  remove: 'Xo??',\n  addThumbnail: 'Th??m thumbnail',\n  hide: '???n',\n  refresh: 'Refresh',\n  copy: 'Sao ch??p',\n  chooseWinner: 'B??nh ch???n',\n  donate: 'T???ng',\n  settingDisplay: 'C??i ?????t hi???n th???',\n  sent: 'G???i ??i',\n  backTo: 'Quay l???i b?????c 1',\n  play: 'Ch???y',\n  hotelIntroductSignup: 'MP Hoa H???ng',\n  hotelAmenityPack: 'G??i ti???n ??ch',\n  mobileLists: 'Danh s??ch',\n  report: 'B??o c??o',\n  clone: 'Sao ch??p',\n  next: 'B?????c ti???p',\n  refund: 'Ho??n ti???n'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/general/button.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/general/day-of-week.js":
/*!*************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/general/day-of-week.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  monday: 'Th??? hai',\n  tuesday: 'Th??? ba',\n  wednesday: 'Th??? t??',\n  thursday: 'Th??? n??m',\n  friday: 'Th??? s??u',\n  saturday: 'Th??? b???y',\n  sunday: 'Ch??? nh???t'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/general/day-of-week.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/general/message.js":
/*!*********************************************************!*\
  !*** ./src/plugins/i18n/language/vn/general/message.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  loading: '??ang t???i...',\n  updateSuccess: 'C???p nh???t th??nh c??ng',\n  createSuccess: 'T???o th??nh c??ng',\n  addSuccess: 'Th??m th??nh c??ng',\n  success: 'Th??nh c??ng!',\n  warning: 'C???nh b??o',\n  exportSuccess: 'Xu???t th??nh c??ng',\n  areYouSure: 'B???n c?? ch???c?',\n  deleteSuccess: 'X??a th??nh c??ng',\n  downloadSuccess: 'T???i xu???ng th??nh c??ng',\n  sendSuccess: 'G???i th??nh c??ng',\n  requestSuccess: 'Y??u c???u th??nh c??ng',\n  messageAlert: 'B???n c?? ch???c?',\n  messageWarning: 'C???nh b??o',\n  saveSuccess: 'L??u th??nh c??ng'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/general/message.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/general/option.js":
/*!********************************************************!*\
  !*** ./src/plugins/i18n/language/vn/general/option.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  yes: 'C??',\n  no: 'Kh??ng',\n  all: 'T???t c???',\n  selected: '???? ch???n',\n  allSelected: 'Ch???n t???t c???',\n  public: 'C??ng khai',\n  private: 'Ri??ng t??',\n  hight: 'Chi???u cao',\n  weight: 'Chi???u r???ng',\n  hotelStatus: {\n    waiting: 'Ch??? duy???t',\n    displayed: '???? duy???t',\n    contracted: 'H???p ?????ng',\n    trial: 'D??ng th???',\n    terminated: 'D???ng h???p ?????ng',\n    suspended: 'Treo',\n    hotelAvailable: 'C??',\n    hotelUnAvailable: 'Kh??ng'\n  },\n  bookingNotificationBy: {\n    go2joyParterApp: '???ng d???ng Go2Joy Partner',\n    sms: 'Tin nh???n',\n    email: 'Email'\n  },\n  payments: {\n    both: 'C??? hai',\n    atHotel: 'T???i kh??ch s???n',\n    online: 'Tr??? tr?????c'\n  },\n  hotelTypes: {\n    allTypes: 'T???t c??? lo???i',\n    none: '---',\n    couples: 'T??nh nh??n',\n    travel: 'Du l???ch',\n    couplesAndTravel: 'T??nh nh??n v?? Du l???ch',\n    quarantine: 'C??ch ly'\n  },\n  contracts: {\n    notClassified: 'None',\n    type1: 'Type 1 - 600.000',\n    type2: 'Type 2 - 300.000',\n    type3: 'Type 3 - 100.000',\n    type4Recontracted: 'Type 4 Recontracted',\n    typeGo2joyRoom: 'Type Go2Joy Room'\n  },\n  roomType: {\n    hourly: 'Theo gi???',\n    additional: 'Gi???  th??m',\n    overnight: 'Qua ????m',\n    daily: 'Theo ng??y'\n  },\n  dateOfWeek: {\n    monday: 'Th??? hai',\n    tuesday: 'Th??? ba',\n    wednesday: 'Th??? t??',\n    thursday: 'Th??? n??m',\n    friday: 'Th??? s??u',\n    saturday: 'Th??? b???y',\n    sunday: 'Ch??? nh???t'\n  },\n  // option tr??ng payment\n  paymentsHotel: {\n    both: 'C??? hai',\n    payHotel: 'T???i Kh??ch s???n',\n    payOnline: 'Tr??? tr?????c',\n    momo: 'Momo',\n    credit: 'Th??? t??n d???ng (OnePay)',\n    debit: 'Th??? ghi n??? (OnePay)',\n    payoo: 'Pay@Store - Payoo',\n    zalo: 'ZaloPay',\n    pos: 'Pay@Store',\n    creditCardVnpt: 'Th??? t??n d???ng (VNPT)',\n    atmCardVnpt: 'Th??? ATM (VNPT)',\n    shopeePay: 'Shopee pay'\n  },\n  status: {\n    disable: 'V?? hi???u',\n    deleted: '???? x??a',\n    active: 'Ho???t ?????ng',\n    expired: 'H???t h???n',\n    temp: 'Nhi???t ?????',\n    draft: 'L??u t???m',\n    wait_confirm: '?????i x??c nh???n',\n    get: 'Nh???n',\n    use: 'S??? d???ng',\n    not_yet: 'Ch??a ho???t ?????ng',\n    never: 'Kh??ng bao gi???',\n    missing: 'C??n thi???u',\n    no_need: 'Kh??ng c???n',\n    waiting: 'Ch??? duy???t',\n    available: 'Ho???t ?????ng',\n    suspend: 'Ho??n',\n    end: 'K???t th??c',\n    allStatus: 'T???t c??? tr???ng th??i',\n    created: '???? t???o',\n    sending: '??ang g???i',\n    sent: '???? g???i',\n    none: 'Kh??ng ??p d???ng',\n    allUser: 'T???t c??? User',\n    allNoticeType: 'T???t c??? lo???i th??ng b??o',\n    sendTo: 'G???i ?????n',\n    allImportFromExcelFile: 'Nh???p t??? excel file(.xslx)',\n    userInput: 'Nh???p th??ng tin ng?????i d??ng',\n    lastTimeOpenApp: 'L???n cu???i m??? app',\n    go2joy: 'Go2Joy',\n    allPartner: 'T???t c??? Partner',\n    booking: '?????t ph??ng',\n    allTrailPartner: 'T???t c??? Trial',\n    allContractPartner: 'T???t c??? Contract',\n    hotel: 'Kh??ch s???n',\n    crmFilter: 'B??? l???c CRM',\n    normal: 'Th??ng d???ng',\n    donateCoupon: 'T???ng coupon',\n    remindCoupon: 'Nh???c nh???'\n  },\n  applyHotelType: {\n    applyAllHotel: 'T???t c??? kh??ch s???n',\n    applyAllHotelExcept: 'T???t c??? kh??ch s???n ng???ai tr???',\n    onlyApply: 'Ch??? ??p d???ng'\n  },\n  applyUserType: {\n    applyAllUser: 'T???t c??? ng?????i d??ng',\n    applyAllUserExcept: 'T???t c??? ng?????i d??ng ng???ai tr???',\n    onlyApply: 'Ch??? ??p d???ng'\n  },\n  applyPromotionType: {\n    applyAllPromo: 'T???t c??? khuy???n m??i',\n    justApply: 'Ch??? ??p d???ng'\n  },\n  room: {\n    normal: 'Normal',\n    flash_sale: 'Flash sale'\n  },\n  typePromotion: {\n    all: 'T???t c???',\n    apply: '??p d???ng',\n    event: 'S??? ki???n',\n    inviteFriend: 'M???i b???n',\n    gift: 'Qu?? t???ng',\n    booking: '?????t ph??ng',\n    report_new_hotel: 'B??o kh??ch s???n m???i',\n    sign_up: '????ng k?? m???i',\n    birthday: 'Sinh nh???t',\n    payment: 'Thanh to??n',\n    voucher_code: 'M?? voucher'\n  },\n  discountType: {\n    discountMoney: 'Gi???m gi?? ti???n',\n    discount_percent: 'Gi???m gi?? %',\n    gift: 'Qu?? t???ng',\n    discountHours: 'Gi???m gi???',\n    samePrice: '?????ng gi??'\n  },\n  sendingStatus: {\n    notSendYet: 'Kh??ng g???i ???????c',\n    error: 'L???i',\n    ok: 'Th??nh c??ng',\n    dontSend: 'Kh??ng g???i'\n  },\n  targetType: {\n    notice: 'Th??ng b??o',\n    promotion: 'Khuy???n m??i',\n    serviceAgreement: 'Th???a thu???n d???ch v???',\n    hotel: 'Kh??ch s???n',\n    faq: 'FAQ',\n    inviteFriend: 'M???i b???n b??',\n    openApp: 'M??? ???ng d???ng',\n    mileagePoint: 'T??ch ??i???m',\n    directDiscount: 'Gi???m gi??',\n    signUp: '????ng k??',\n    promotionGroup: 'Nh??m qu???ng c??o',\n    amenityPack: 'G??i ti???n ??ch',\n    hotelGo2Choice: 'Kh??ch s???n Go2Choice',\n    linkOutApp: 'Link li??n k???t (Ngo??i App)',\n    linkInApp: 'Link li??n k???t (Trong App)',\n    district: 'Qu???n',\n    coupon: 'Coupon',\n    promotionEvent: 'Khuy???n m??i / S??? ki???n',\n    link: 'Link li??n k???t',\n    hotelTet: 'Hotel Tet',\n    referral: 'Ch????ng tr??nh gi???i thi???u',\n    hotelArea: 'Kh??ch s???n theo khu v???c'\n  },\n  bookingStatus: {\n    all: 'T???t c???',\n    reserved: '???? ?????t',\n    confirmed: 'Ch??a nh???n',\n    check_in: '???? nh???n',\n    cancel: '???? h???y',\n    no_show: 'Kh??ng nh???n ph??ng',\n    payment_fail: 'Thanh to??n th???t b???i'\n  },\n  confirmedBy: {\n    user: 'Ng?????i d??ng',\n    hotel: 'Kh??ch s???n',\n    go2joy: 'Go2Joy',\n    hotel_late: 'Kh??ch s???n tr???',\n    location: 'V??? tr??'\n  },\n  noticeType: {\n    function: 'Ch???c n??ng',\n    notice: 'Tin nh???n',\n    promotion: 'Khuy???n m??i',\n    term_policy: 'Quy ?????nh v?? ch??nh s??ch',\n    notification: 'Th??ng b??o',\n    notice_of_no_show: 'Th??ng b??o Kh??ng nh???n ph??ng',\n    notice_of_Checked_in_l: 'Th??ng b??o Nh???n ph??ng L'\n  },\n  applyHotelOption: {\n    all_hotel: 'T???t c??? kh??ch s???n',\n    all_contracted: 'T???t c??? ks h???p ?????ng',\n    all_trial: 'T???t c??? ks d??ng th??? ',\n    just_apply: 'Ch??? ??p d???ng'\n  },\n  region: {\n    all_region: 'T???t c??? khu v???c',\n    south: 'Mi???n Nam',\n    north: 'Mi???n B???c',\n    north_center: 'Trung b???c',\n    south_center: 'Trung nam',\n    middle: 'Mi???n Trung',\n    confirm: 'X??c nh???n',\n    view: 'Xem'\n  },\n  type: {\n    all_types: 'T???t c???',\n    transfer_booking: 'Chuy???n ?????i ?????t ph??ng',\n    transfer: 'Chuy???n ?????i',\n    promotion: 'Khuy???n m??i',\n    invite_friend: 'M???i b???n',\n    product: 'S???n ph???m KS'\n  },\n  level: {\n    level1: 'C???p duy???t 1',\n    level2: 'C???p duy???t 2'\n  },\n  regionConfirm: {\n    confirm: 'X??c nh???n',\n    view: 'Xem'\n  },\n  all_rooms: 'T???t c??? ph??ng',\n  room_available: 'C??n ph??ng',\n  room_unavailable: 'H???t ph??ng',\n  window: 'C???a S???',\n  balcony: 'Ban C??ng',\n  city: 'Th??nh Ph???',\n  garden: 'S??n V?????n',\n  pool: 'H??? B??i',\n  noView: 'Kh??ng C??'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/general/option.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/general/option/gender.js":
/*!***************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/general/option/gender.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  male: 'Nam',\n  female: 'N???'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/general/option/gender.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/general/option/status.js":
/*!***************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/general/option/status.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  login: '????ng nh???p',\n  unLogin: 'Ch??a ????ng nh???p'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/general/option/status.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/general/payment.js":
/*!*********************************************************!*\
  !*** ./src/plugins/i18n/language/vn/general/payment.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  both: 'C??? hai',\n  payHotel: 'T???i Kh??ch s???n',\n  payOnline: 'Tr??? tr?????c',\n  momo: 'Momo',\n  credit: 'Th??? t??n d???ng (OnePay)',\n  debit: 'Th??? ghi n??? (OnePay)',\n  payoo: 'Pay@Store - Payoo',\n  zalo: 'ZaloPay',\n  pos: 'Pay@Store',\n  creditCardVnpt: 'Th??? t??n d???ng (VNPT)',\n  atmCardVnpt: 'Th??? ATM (VNPT)',\n  shopeePay: 'Shopee pay'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/general/payment.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/general/placeholder.js":
/*!*************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/general/placeholder.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  startDate: 'Ng??y b???t ?????u',\n  endDate: 'Ng??y k???t th??c',\n  keyword: 'T??? kh??a',\n  hotelName: 'T??n kh??ch s???n',\n  from: 'T???',\n  to: 'T???i',\n  search: 'T??m ki???m',\n  provinceSelected: 'T???nh/TP ???????c ch???n',\n  title: 'Ti??u ?????',\n  memo: 'Ghi ch??',\n  cmrProvince: 'T???nh/TP ???????c ch???n',\n  cmrDistrict: 'Qu???n/Huy???n ???????c ch???n'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/general/placeholder.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages sync recursive \\.js$":
/*!*******************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages sync \.js$ ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./activities/activities.js\": \"./src/plugins/i18n/language/vn/pages/activities/activities.js\",\n\t\"./activities/activitiesBookingTransfer.js\": \"./src/plugins/i18n/language/vn/pages/activities/activitiesBookingTransfer.js\",\n\t\"./activities/activitiesDetail.js\": \"./src/plugins/i18n/language/vn/pages/activities/activitiesDetail.js\",\n\t\"./activities/activitiesInviteFriend.js\": \"./src/plugins/i18n/language/vn/pages/activities/activitiesInviteFriend.js\",\n\t\"./activities/activitiesProduct.js\": \"./src/plugins/i18n/language/vn/pages/activities/activitiesProduct.js\",\n\t\"./activities/activitiesPromotion.js\": \"./src/plugins/i18n/language/vn/pages/activities/activitiesPromotion.js\",\n\t\"./booking/bookingAdhoc.js\": \"./src/plugins/i18n/language/vn/pages/booking/bookingAdhoc.js\",\n\t\"./booking/bookingReport.js\": \"./src/plugins/i18n/language/vn/pages/booking/bookingReport.js\",\n\t\"./booking/cashFlowReport.js\": \"./src/plugins/i18n/language/vn/pages/booking/cashFlowReport.js\",\n\t\"./booking/hotelDebt.js\": \"./src/plugins/i18n/language/vn/pages/booking/hotelDebt.js\",\n\t\"./booking/revenueReport.js\": \"./src/plugins/i18n/language/vn/pages/booking/revenueReport.js\",\n\t\"./booking/sendingMail.js\": \"./src/plugins/i18n/language/vn/pages/booking/sendingMail.js\",\n\t\"./home-display/collection.js\": \"./src/plugins/i18n/language/vn/pages/home-display/collection.js\",\n\t\"./home-display/dashboard.js\": \"./src/plugins/i18n/language/vn/pages/home-display/dashboard.js\",\n\t\"./hotels/hotel-display/hotelDisplay.js\": \"./src/plugins/i18n/language/vn/pages/hotels/hotel-display/hotelDisplay.js\",\n\t\"./hotels/hotel-facility/facilityAdd.js\": \"./src/plugins/i18n/language/vn/pages/hotels/hotel-facility/facilityAdd.js\",\n\t\"./hotels/hotel-facility/facilityList.js\": \"./src/plugins/i18n/language/vn/pages/hotels/hotel-facility/facilityList.js\",\n\t\"./hotels/hotel-group/hotelGroupAdd.js\": \"./src/plugins/i18n/language/vn/pages/hotels/hotel-group/hotelGroupAdd.js\",\n\t\"./hotels/hotel-group/hotelGroupDetail.js\": \"./src/plugins/i18n/language/vn/pages/hotels/hotel-group/hotelGroupDetail.js\",\n\t\"./hotels/hotel-group/hotelGroupEdit.js\": \"./src/plugins/i18n/language/vn/pages/hotels/hotel-group/hotelGroupEdit.js\",\n\t\"./hotels/hotel-group/hotelGroupList.js\": \"./src/plugins/i18n/language/vn/pages/hotels/hotel-group/hotelGroupList.js\",\n\t\"./hotels/hotel-staff/hotelStaffEdit.js\": \"./src/plugins/i18n/language/vn/pages/hotels/hotel-staff/hotelStaffEdit.js\",\n\t\"./hotels/hotel-staff/hotelStaffList.js\": \"./src/plugins/i18n/language/vn/pages/hotels/hotel-staff/hotelStaffList.js\",\n\t\"./hotels/notice-to-hotel/detail-reply.js\": \"./src/plugins/i18n/language/vn/pages/hotels/notice-to-hotel/detail-reply.js\",\n\t\"./hotels/notice-to-hotel/noticeApplyHotel.js\": \"./src/plugins/i18n/language/vn/pages/hotels/notice-to-hotel/noticeApplyHotel.js\",\n\t\"./hotels/notice-to-hotel/noticeDetail.js\": \"./src/plugins/i18n/language/vn/pages/hotels/notice-to-hotel/noticeDetail.js\",\n\t\"./hotels/notice-to-hotel/noticeHotelList.js\": \"./src/plugins/i18n/language/vn/pages/hotels/notice-to-hotel/noticeHotelList.js\",\n\t\"./hotels/notice-to-hotel/noticeList.js\": \"./src/plugins/i18n/language/vn/pages/hotels/notice-to-hotel/noticeList.js\",\n\t\"./hotels/notice-to-hotel/sendNotice.js\": \"./src/plugins/i18n/language/vn/pages/hotels/notice-to-hotel/sendNotice.js\",\n\t\"./hotels/product-type/productType.js\": \"./src/plugins/i18n/language/vn/pages/hotels/product-type/productType.js\",\n\t\"./hotels/product-type/productTypeAdd.js\": \"./src/plugins/i18n/language/vn/pages/hotels/product-type/productTypeAdd.js\",\n\t\"./hotels/product-type/productTypeEdit.js\": \"./src/plugins/i18n/language/vn/pages/hotels/product-type/productTypeEdit.js\",\n\t\"./hotels/product/product.js\": \"./src/plugins/i18n/language/vn/pages/hotels/product/product.js\",\n\t\"./hotels/product/productDetail.js\": \"./src/plugins/i18n/language/vn/pages/hotels/product/productDetail.js\",\n\t\"./hotels/review/option/ratings.js\": \"./src/plugins/i18n/language/vn/pages/hotels/review/option/ratings.js\",\n\t\"./hotels/review/option/sortBy.js\": \"./src/plugins/i18n/language/vn/pages/hotels/review/option/sortBy.js\",\n\t\"./hotels/review/reviewMgt.js\": \"./src/plugins/i18n/language/vn/pages/hotels/review/reviewMgt.js\",\n\t\"./hotels/room-type/calendar.js\": \"./src/plugins/i18n/language/vn/pages/hotels/room-type/calendar.js\",\n\t\"./hotels/room-type/comFirmLockRoom.js\": \"./src/plugins/i18n/language/vn/pages/hotels/room-type/comFirmLockRoom.js\",\n\t\"./hotels/room-type/createRoomType.js\": \"./src/plugins/i18n/language/vn/pages/hotels/room-type/createRoomType.js\",\n\t\"./hotels/room-type/detailRoomType.js\": \"./src/plugins/i18n/language/vn/pages/hotels/room-type/detailRoomType.js\",\n\t\"./hotels/room-type/directDiscount.js\": \"./src/plugins/i18n/language/vn/pages/hotels/room-type/directDiscount.js\",\n\t\"./hotels/room-type/editRoomType.js\": \"./src/plugins/i18n/language/vn/pages/hotels/room-type/editRoomType.js\",\n\t\"./hotels/room-type/exportFlashSale.js\": \"./src/plugins/i18n/language/vn/pages/hotels/room-type/exportFlashSale.js\",\n\t\"./hotels/room-type/extraFee.js\": \"./src/plugins/i18n/language/vn/pages/hotels/room-type/extraFee.js\",\n\t\"./hotels/room-type/settingFS.js\": \"./src/plugins/i18n/language/vn/pages/hotels/room-type/settingFS.js\",\n\t\"./hotels/stamp.js\": \"./src/plugins/i18n/language/vn/pages/hotels/stamp.js\",\n\t\"./marketing/article.js\": \"./src/plugins/i18n/language/vn/pages/marketing/article.js\",\n\t\"./marketing/banner.js\": \"./src/plugins/i18n/language/vn/pages/marketing/banner.js\",\n\t\"./marketing/crm/crm.js\": \"./src/plugins/i18n/language/vn/pages/marketing/crm/crm.js\",\n\t\"./marketing/inviteFriend.js\": \"./src/plugins/i18n/language/vn/pages/marketing/inviteFriend.js\",\n\t\"./marketing/lucky-wheel.js\": \"./src/plugins/i18n/language/vn/pages/marketing/lucky-wheel.js\",\n\t\"./marketing/notice.js\": \"./src/plugins/i18n/language/vn/pages/marketing/notice.js\",\n\t\"./marketing/notification.js\": \"./src/plugins/i18n/language/vn/pages/marketing/notification.js\",\n\t\"./marketing/pgpb.js\": \"./src/plugins/i18n/language/vn/pages/marketing/pgpb.js\",\n\t\"./marketing/popup.js\": \"./src/plugins/i18n/language/vn/pages/marketing/popup.js\",\n\t\"./marketing/promotion/coupon-condition.js\": \"./src/plugins/i18n/language/vn/pages/marketing/promotion/coupon-condition.js\",\n\t\"./marketing/promotion/create-promotion.js\": \"./src/plugins/i18n/language/vn/pages/marketing/promotion/create-promotion.js\",\n\t\"./marketing/promotion/group-promotion.js\": \"./src/plugins/i18n/language/vn/pages/marketing/promotion/group-promotion.js\",\n\t\"./marketing/promotion/issue-coupon-condition.js\": \"./src/plugins/i18n/language/vn/pages/marketing/promotion/issue-coupon-condition.js\",\n\t\"./marketing/promotion/promotion.js\": \"./src/plugins/i18n/language/vn/pages/marketing/promotion/promotion.js\",\n\t\"./marketing/sms.js\": \"./src/plugins/i18n/language/vn/pages/marketing/sms.js\",\n\t\"./mileage-point/MpBoosting.js\": \"./src/plugins/i18n/language/vn/pages/mileage-point/MpBoosting.js\",\n\t\"./mileage-point/mileagePoint.js\": \"./src/plugins/i18n/language/vn/pages/mileage-point/mileagePoint.js\",\n\t\"./profile/profile.js\": \"./src/plugins/i18n/language/vn/pages/profile/profile.js\",\n\t\"./sa-account/confirmGroup.js\": \"./src/plugins/i18n/language/vn/pages/sa-account/confirmGroup.js\",\n\t\"./sa-account/permission.js\": \"./src/plugins/i18n/language/vn/pages/sa-account/permission.js\",\n\t\"./sa-account/saleIncentive.js\": \"./src/plugins/i18n/language/vn/pages/sa-account/saleIncentive.js\",\n\t\"./sa-account/staffs.js\": \"./src/plugins/i18n/language/vn/pages/sa-account/staffs.js\",\n\t\"./service-agreement/service-agreement.js\": \"./src/plugins/i18n/language/vn/pages/service-agreement/service-agreement.js\",\n\t\"./settings/settings.js\": \"./src/plugins/i18n/language/vn/pages/settings/settings.js\",\n\t\"./tracking/bookingTracking.js\": \"./src/plugins/i18n/language/vn/pages/tracking/bookingTracking.js\",\n\t\"./tracking/hotelIntroduceSignup.js\": \"./src/plugins/i18n/language/vn/pages/tracking/hotelIntroduceSignup.js\",\n\t\"./tracking/hotelStatusTracking.js\": \"./src/plugins/i18n/language/vn/pages/tracking/hotelStatusTracking.js\",\n\t\"./users/counseling/counselingMgt.js\": \"./src/plugins/i18n/language/vn/pages/users/counseling/counselingMgt.js\",\n\t\"./users/counseling/createCounselingMgt.js\": \"./src/plugins/i18n/language/vn/pages/users/counseling/createCounselingMgt.js\",\n\t\"./users/counseling/replyCounselingMgt.js\": \"./src/plugins/i18n/language/vn/pages/users/counseling/replyCounselingMgt.js\",\n\t\"./users/deviceMgt.js\": \"./src/plugins/i18n/language/vn/pages/users/deviceMgt.js\",\n\t\"./users/firstBooking.js\": \"./src/plugins/i18n/language/vn/pages/users/firstBooking.js\",\n\t\"./users/userMgt.js\": \"./src/plugins/i18n/language/vn/pages/users/userMgt.js\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./src/plugins/i18n/language/vn/pages sync recursive \\\\.js$\";\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages_sync_\\.js$?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/activities/activities.js":
/*!*********************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/activities/activities.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  title: 'Ti??u ?????',\n  type: 'Lo???i',\n  request_by: 'Y??u c???u duy???t',\n  last_confirm_staff: 'Ng?????i cu???i x??c nh???n/h???y',\n  status: 'Tr???ng th??i',\n  confirm: 'X??c nh???n',\n  delete: 'H???y b???',\n  back: 'Tr??? v???',\n  reject: 'T??? ch???i',\n  waiting: '?????i duy???t',\n  withdrawn: '???? h???y',\n  confirmed: '???? x??c nh???n',\n  rejected: '???? t??? ch???i',\n  placeholder: 'Ti??u ?????',\n  promotion: 'Khuy???n m??i',\n  invite_friend: 'M???i b???n',\n  production: 'S???n ph???m',\n  all_types: 'T???t c???',\n  transfer_booking: 'Chuy???n ?????i ?????t ph??ng',\n  transfer: 'Chuy???n ?????i',\n  product: 'S???n ph???m KS',\n  header_search: 'T??m ki???m',\n  operations: 'Thao t??c',\n  confirm_message_alert: 'B???n c?? ch???c ?',\n  confirm_success: 'X??c nh???n th??nh c??ng',\n  withdrawn_message_alert: 'B???n c?? ch???c ?',\n  withdrawn_success: 'H???y th??nh c??ng'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/activities/activities.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/activities/activitiesBookingTransfer.js":
/*!************************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/activities/activitiesBookingTransfer.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  coupon: 'Coupon',\n  flase_sale: 'Gi???m s???c',\n  redeem_stamp: 'S??? d???ng tem',\n  direct_discount: 'Gi???m tr???c ti???p',\n  mileage_point: 'Gi???m ??i???m',\n  other_discount: 'Gi???m gi?? kh??c',\n  booking_status_yes: 'C??',\n  booking_status_no: 'Kh??ng',\n  search_via: 'T??m ki???m theo',\n  hotel_name: 'T??n kh??ch s???n',\n  payment_method: 'Ph????ng th???c thanh to??n',\n  commission: 'Hoa h???ng',\n  automatically_update_booking_amount: 'C???p nh???t gi?? ti???n t??? ?????ng',\n  manually_update_booking_amount: 'C???p nh???t gi?? ti???n th??? c??ng',\n  room_amount: 'Gi?? ph??ng',\n  product_amount: 'Gi?? s???n ph???m',\n  total_amount: 'T???ng thanh to??n',\n  go2joy_discount: 'Gi???m gi?? Go2Joy',\n  hotel_discount: 'Kh??ch s???n gi???m gi??',\n  users_pay: 'Kh??ch thanh to??n',\n  paid_in_advance: '???? thanh to??n',\n  room_type: 'Lo???i ph??ng',\n  booking_type: 'Lo???i',\n  stay_at_hotel_time: 'Th???i gian ??? KS',\n  time_from: 'Th???i gian t???',\n  time_to: '?????n',\n  date_from: 'Ng??y t???',\n  date_to: '?????n',\n  status: 'Tr???ng th??i',\n  confirmed_by: 'X??c nh???n b???i',\n  checkin_time: 'Th???i gian nh???n ph??ng',\n  end_date_transfer: 'End date transfer',\n  remove_coupon: 'G??? coupon',\n  booking_origin: 'Booking nguy??n b???n',\n  table_hotel_name: 'T??n kh??ch s???n',\n  table_code: 'M??',\n  table_booking_no: 'M?? ?????t ph??ng',\n  table_user_info: 'Th??ng tin kh??ch',\n  table_room_type: 'Lo???i',\n  table_coupon: 'Phi???u qu?? t???ng',\n  table_booking_type: 'Lo???i ?????t ph??ng',\n  table_stay_at_hotel_time: 'Th???i gian ?????t',\n  table_booking_status: 'Tr???ng th??i ?????t ph??ng',\n  table_room_amount: 'Ti???n ph??ng',\n  table_product_amount: 'S??? ph??ng ?????t',\n  table_total_amount: 'T???ng thanh to??n',\n  table_go2j_discount: 'Gi???m gi?? G2J',\n  table_hotel_discount: 'Kh??ch s???n gi???m gi??',\n  table_user_pay: 'Kh??ch h??ng thanh to??n',\n  table_paid_in_advance: 'Tr??? tr?????c',\n  table_device_type: 'Thi???t b???'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/activities/activitiesBookingTransfer.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/activities/activitiesDetail.js":
/*!***************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/activities/activitiesDetail.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  title: 'Ti??u ?????',\n  request_by: 'Y??u c???u duy???t',\n  type: 'Lo???i',\n  status: 'Tr???ng th??i',\n  waiting: '?????i duy???t',\n  reason_to_confirm: 'L?? do x??c nh???n ho???c h???y',\n  invitee_inviter: 'Ng?????i ???????c m???i / Ng?????i m???i',\n  daily_budget: 'Ng??n s??ch h??ng ng??y',\n  create_by: '???????c t???o b???i',\n  via: 'Th??ng qua',\n  manual: 'Manual',\n  facebook: 'Facebook',\n  google: 'Google',\n  normal: 'Ph??ng th?????ng',\n  flash_sale: 'Gi???m s???c',\n  link: 'Link',\n  guidelines_vn: 'H?????ng d???n (VN)',\n  guidelines_en: 'H?????ng d???n (EN)',\n  sms_content: 'N???i dung SMS',\n  root_page: 'Th??ng tin ngu???n',\n  confirm_staff_list: 'DANH S??CH DUY???T',\n  staff_name: 'T??n nh??n vi??n',\n  role: 'Ph??n quy???n',\n  enable: 'Ho???t ?????ng',\n  confirm_permission: 'Quy???n x??c nh???n',\n  confirmed_cancel: '???? x??c nh???n / h???y',\n  level1: 'C???p duy???t 1',\n  level2: 'C???p duy???t 2',\n  single_confirm: 'X??c nh???n ????n',\n  all_confirm: 'X??c nh???n t???t c???',\n  confirm_content: 'N???I DUNG DUY???T',\n  start_end_date: 'Ng??y b???t ?????u/K???t th??c',\n  apply_all_hotel: 'T???t c??? kh??ch s???n',\n  apply_all_hotel_except: 'T???t c??? kh??ch s???n ng???ai tr???',\n  only_apply: 'Ch??? ??p d???ng',\n  list_hotel: 'Danh s??ch kh??ch s???n',\n  user_list: 'Danh s??ch ng?????i d??ng',\n  all_usser: 'T???t c??? ng?????i d??ng',\n  all_user_exclude: 'T???t c??? ng?????i d??ng lo???i tr???',\n  select_user_apply: 'Ch???n ng?????i d??ng ??p d???ng',\n  num_checkin: 'SL check-in',\n  exel_file: 'Excel File',\n  end_date: 'Ng??y k???t th??c',\n  status_active: 'Ho???t ?????ng',\n  status_expired: 'H???t h???n',\n  status_temp: 'Nhi???t ?????',\n  status_draft: 'L??u t???m',\n  status_wait_confirm: '?????i x??c nh???n',\n  withdrawn: '???? h???y',\n  confirmed: '???? x??c nh???n',\n  back: 'Tr??? v???'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/activities/activitiesDetail.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/activities/activitiesInviteFriend.js":
/*!*********************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/activities/activitiesInviteFriend.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  title: 'Ti??u ?????',\n  type_of_invitation: 'Lo???i ??p d???ng',\n  status: 'Tr???ng th??i',\n  start_end_date: 'Ng??y b???t ?????u/ k???t th??c',\n  invitee_inviter: 'Ng?????i ???????c m???i/ Ng?????i m???i',\n  daily_budget: 'Ng??n s??ch h???ng ng??y',\n  create_by: '???????c t???o b???i',\n  via: 'Th??ng qua',\n  guidelines_vn: 'H?????ng d???n(VN)',\n  guidelines_en: 'H?????ng d???n(EN)',\n  sms_content: 'N???i dung SMS',\n  start_date: 'Ng??y b???t ?????u',\n  signup: 'Sign-up',\n  checkin: 'Check-in'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/activities/activitiesInviteFriend.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/activities/activitiesProduct.js":
/*!****************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/activities/activitiesProduct.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  hotel: 'Kh??ch s???n',\n  product_name: 'T??n s???n ph???m',\n  product_name_en: 'T??n s???n ph???m (Ti???ng Anh)',\n  product_type_name: 'Lo???i s???n ph???m',\n  product_type_name_en: 'Lo???i s???n ph???m (Ti???ng anh)',\n  price: 'Gi??',\n  prepare_before_1_day: 'Chu???n b??? tr?????c 1 ng??y',\n  description: 'M?? t???',\n  status: 'Tr???ng th??i',\n  create_staff: 'Nh??n vi??n t???o',\n  last_update: 'C???p nh???t cu???i',\n  image: 'H??nh ???nh',\n  status_active: 'Ho???t ?????ng',\n  status_expired: 'H???t h???n'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/activities/activitiesProduct.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/activities/activitiesPromotion.js":
/*!******************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/activities/activitiesPromotion.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  title: 'Ti??u ?????',\n  code: 'M?? khuy???n m??i',\n  type: 'Lo???i',\n  num_of_coupon: 'L?????ng coupon m???t l???n',\n  max_num_of_coupon: 'Coupon t???i ??a 1 ng?????i d??ng',\n  applyStartEnd: 'Th???i gian ??p d???ng',\n  couponStartEnd: 'Th???i h???n coupon',\n  go2joy_discount: 'Gi???m gi?? Go2Joy',\n  hotel_discount: 'Gi???m gi?? c???a KS',\n  sponsor_discount: 'Gi???m gi?? c???a nh?? t??i tr???',\n  status: 'T??nh tr???ng',\n  discount: 'Gi???m gi??',\n  last_update: 'C???p nh???t cu???i',\n  totalHotelApplied: 'T???ng KS ????ng k??',\n  totalUserApplied: 'T???ng ng?????i d??ng',\n  totalCouponApplied: 'T???ng coupon ???? ph??t h??nh',\n  total_consumed_coupon: 'T???ng coupon ???? d??ng',\n  total_go2joy_discount: 'T???ng gi???m gi?? c???a Go2Joy',\n  total_hotel_discount: 'T???ng gi???m gi?? c???a kh??ch s???n',\n  total_sponsor_discount: 'T???ng gi???m gi?? c???a nh?? t??i tr???',\n  totalDiscount: 'T???ng gi???m gi??',\n  max_coupon_per_hotel: 'L?????ng coupon t???i ??a ??? KS',\n  create_time: 'Th???i gian t???o',\n  title_promotion_group: 'Nh??m khuy???n m??i',\n  room_apply_list: 'Danh s??ch ph??ng ??p d???ng',\n  content_vn: 'N???i dung (Ti???ng vi???t)',\n  content_en: 'N???i dung (Ti???ng anh)',\n  content_2: 'N???i dung 2',\n  memo: 'Ghi ch??',\n  image_of_list: 'H??nh danh s??ch',\n  image_of_detail: 'H??nh chi ti???t',\n  normal_room: 'Ph??ng th?????ng',\n  coupon_condition_name: 'Coupon condition:',\n  coupon_condition_condition_to_use_coupon: 'Condition to use coupon:',\n  coupon_condition_just_use_for: 'Just use for',\n  coupon_condition_max_coupon_per_day: 'Max coupon per day:',\n  coupon_condition_max_coupon_per_hotel: 'Max coupon per hotel:',\n  coupon_condition_min_booking_money: 'Min booking money:',\n  coupon_condition_payment_when_use_coupon: 'Payment when use coupon:',\n  coupon_condition_coupon_memo: 'Content of Validation VI|EN:',\n  coupon_condition_apply: 'Apply:',\n  issue_coupon_condition_name: '??i???u ki???n t???ng coupon',\n  issue_coupon_condition_apply: '??p d???ng:',\n  issue_coupon_condition_coupon_memo: 'Ghi ch?? coupon VI|EN',\n  issue_coupon_condition_content_of_validation: 'N???i dung x??c nh???n VI|EN',\n  list_hotel: 'Danh s??ch kh??ch s???n',\n  user_list: 'Danh s??ch ng?????i d??ng',\n  all_usser: 'T???t c??? ng?????i d??ng'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/activities/activitiesPromotion.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/booking/bookingAdhoc.js":
/*!********************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/booking/bookingAdhoc.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  booking_no: 'M?? ?????t ph??ng',\n  trading_code: 'M?? giao d???ch Go2Joy',\n  psp_transaction_id: 'PSP Transaction ID',\n  note: 'Ghi ch??',\n  requiredbookingNo: 'M?? ?????t ph??ng l?? b???t bu???c',\n  requiredbookingType: 'Lo???i ?????t ph??ng l?? b???t bu???c',\n  requiredbookingNoTitle: 'Vui l??ng nh???p m?? ?????t ph??ng',\n  message_input_psp_transaction_id: 'Vui l??ng nh???p PSP Transaction ID',\n  message_input_booking_no: 'Vui l??ng nh???p m?? ?????t ph??ng',\n  update_success: 'C???p nh???t th??nh c??ng',\n  message_alert: 'B???n c?? mu???n ho??n ti???n cho m?? ?????t ph??ng',\n  refunded: '???? ho??n tr???',\n  refund_id: 'Refund ID'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/booking/bookingAdhoc.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/booking/bookingReport.js":
/*!*********************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/booking/bookingReport.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  time_at_hotel: 'Th???i gian ??? kh??ch s???n',\n  check_in_time: 'Th???i gian nh???n ph??ng',\n  allDevice: 'T???t c??? thi???t b???',\n  all: 'T???t c???',\n  app: 'App',\n  web: 'Web',\n  reserved: '???? ?????t',\n  confirmed: 'Ch??a nh???n',\n  check_in: '???? nh???n',\n  cancel: '???? h???y',\n  no_show: 'Kh??ng nh???n ph??ng',\n  payment_fail: 'Thanh to??n th???t b???i',\n  contracted: 'H???p ?????ng',\n  trial: 'D??ng th???',\n  terminated: 'D???ng h???p ?????ng',\n  suspended: 'Treo',\n  discountType: '??G',\n  delete: 'H???y',\n  confirm: 'X??c nh???n',\n  refund: 'Ho??n tr???',\n  transfer: 'Chuy???n ?????i',\n  first_booking_checked: 'C???p nh???t',\n  waiting_confirm: 'Ch??? x??c nh???n',\n  transferred: '???? chuy???n ?????i',\n  hotel_name: 'T??n kh??ch s???n',\n  code: 'M??',\n  total_booking: 'T???ng s??? ?????t ph??ng',\n  go2joy_cancel: 'Go2Joy h???y',\n  hotel_cancel: 'Hotel h???y',\n  user_cancel: 'Kh??ch h???y',\n  booking_no: 'M?? ?????t ph??ng',\n  user_info: 'Th??ng tin kh??ch',\n  room_type: 'Lo???i',\n  coupon: 'Phi???u qu?? t???ng',\n  booking_type: 'Lo???i ?????t ph??ng',\n  stay_at_hotel_time: 'Th???i gian ?????t',\n  booking_status: 'Tr???ng th??i ?????t ph??ng',\n  room_amount: 'Ti???n ph??ng',\n  product_amount: 'Gi?? s???n ph???m',\n  total_promotion: 'T???ng tr?????c khuy???n m??i',\n  go2j_promotion: 'Khuy???n m??i G2J',\n  hotel_promotion: 'Khuy???n m??i KS',\n  total_amount: 'T???ng thanh to??n',\n  go2j_discount: 'Gi???m gi?? G2J',\n  hotel_discount: 'Kh??ch s???n gi???m gi??',\n  user_pay: 'Kh??ch h??ng thanh to??n',\n  paid_in_advance: 'Tr??? tr?????c',\n  device_type: 'Thi???t b???',\n  canceled_booking: '?????t ph??ng b??? h???y',\n  flase_sale: 'Gi???m s???c',\n  redeem_stamp: 'S??? d???ng tem',\n  direct_discount: 'Gi???m tr???c ti???p',\n  mileage_point: 'Gi???m ??i???m',\n  other_discount: 'Gi???m gi?? kh??c',\n  search_via: 'T??m ki???m theo',\n  payment_method: 'Ph????ng th???c thanh to??n',\n  commission: 'Hoa h???ng',\n  automatically_update_booking_amount: 'C???p nh???t gi?? ti???n t??? ?????ng',\n  manually_update_booking_amount: 'C???p nh???t gi?? ti???n th??? c??ng',\n  go2joy_discount: 'Gi???m gi?? Go2Joy',\n  users_pay: 'Kh??ch thanh to??n',\n  time_from: 'Th???i gian t???',\n  time_to: '?????n',\n  date_from: 'Ng??y t???',\n  date_to: '?????n',\n  status: 'Tr???ng th??i',\n  confirmed_by: 'X??c nh???n b???i',\n  checkin_time: 'Th???i gian nh???n ph??ng',\n  end_date_transfer: 'End date transfer',\n  remove_coupon: 'G??? coupon',\n  booking_origin: 'Booking nguy??n b???n',\n  checkin: '???? nh???n',\n  no_show_l: 'Kh??ng nh???n ph??ng L',\n  user: 'Ng?????i d??ng',\n  hotel: 'Kh??ch s???n',\n  go2joy: 'Go2Joy',\n  hotel_late: 'Kh??ch s???n tr???',\n  location: 'V??? tr??',\n  yes: 'C??',\n  no: 'Kh??ng',\n  new: 'M???i',\n  old: 'C??',\n  hours: 'Gi???',\n  overnight: 'Qua ????m',\n  daily: 'Theo ng??y',\n  searchBooking: 'T??m ki???m b???ng m??',\n  view_booking_detail: 'Xem chi ti???t b??o c??o ?????t ph??ng',\n  g2j_discount: 'Khuy???n m??i G2j',\n  extra_fee: 'Ph??? th???',\n  flash_sale: 'Gi???m s???c',\n  samePrice: '?????ng gi??',\n  source: 'Ngu???n',\n  placeholder: 'T??n kh??ch s???n',\n  booking_no_placeholder: 'M?? ?????t ph??ng',\n  confirmSuccess: 'X??c nh???n th??nh c??ng',\n  refundSuccess: 'Ho??n ti???n th??nh c??ng',\n  deleteSuccess: 'Xo?? th??nh c??ng',\n  exportSuccess: 'Xu???t t???p th??nh c??ng',\n  allSource: 'T???t c??? c??c ngu???n'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/booking/bookingReport.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/booking/cashFlowReport.js":
/*!**********************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/booking/cashFlowReport.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  hotel_name: 'T??n kh??ch s???n',\n  total_check_in: 'T???ng nh???n ph??ng',\n  total_transaction: 'T???ng giao d???ch',\n  product_amount: 'Gi?? s???n ph???m',\n  extra_fee: 'Ph??? thu',\n  total_amount: 'T???ng tr?????c khuy???n m??i',\n  g2j_discount: 'Khuy???n m??i G2J',\n  hotel_discount: 'KS gi???m gi??',\n  user_pay: 'Kh??ch thanh to??n',\n  paid_in_advance: '???? thanh to??n',\n  commission: 'Chi???t kh???u',\n  balance: 'T???ng ?????i so??t',\n  receivable: '(+) Ph???i thu',\n  payable: '(-) Ph???i tr???',\n  current_debt: 'N??? hi???n h??nh',\n  other_debt: 'Kho???ng n??? kh??c',\n  period_debt_time: 'Th???i gian k??? n??y',\n  pay_date: 'Ng??y tr???',\n  period_debt: 'N??? k?? n??y',\n  expected_pay: 'Ti???n tr??? d??? t??nh',\n  pay_amount: 'Ti???n tr???',\n  createTime: 'Th???i gian t???o',\n  totalBooking: 'T???ng ?????t ph??ng',\n  totalCheckin: 'T???ng nh???n ph??ng',\n  totalCancelRefunded: 'T???ng h???y ph??ng c?? ho??n ti???n',\n  //\n  time_at_hotel: 'Th???i gian ??? kh??ch s???n',\n  check_in_time: 'Th???i gian nh???n ph??ng',\n  all_inventory: 'All inventory',\n  //\n  device_type: 'Thi???t b???',\n  booking_time: 'Ng??y ?????t ph??ng',\n  booking_info: 'Th??ng tin ?????t ph??ng',\n  coupon: 'Coupon',\n  room_amount: 'Gi?? ph??ng',\n  mileage_point: 'Gi???m ??i???m',\n  other_discount: 'Gi???m gi?? kh??c',\n  flash_sale: 'Gi???m s???c',\n  redeem_stamp: 'S??? d???ng tem',\n  direct_discount: 'Gi???m tr???c ti???p',\n  //\n  code: 'M??',\n  the_balance: 'T???ng ?????i so??t'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/booking/cashFlowReport.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/booking/hotelDebt.js":
/*!*****************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/booking/hotelDebt.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  hotel_name: 'T??n kh??ch s???n',\n  current_debt: 'N??? hi???n h??nh',\n  period_debt: 'N??? k??? n??y',\n  period_debt_time: 'Th???i gian k??? n??y',\n  pay_date: 'Ng??y tr???',\n  other_debt: 'Kho???n n??? kh??c',\n  pay_amount: 'Ti???n tr???',\n  balance: 'T???ng ?????i so??t',\n  createTime: 'Th???i gian t???o',\n  memo: 'Ghi ch??',\n  new_hotel_debt: 'T???o c??ng n??? KS',\n  new_hotel_paid: 'T???o thanh to??n KS',\n  //\n  apply_all_hotel: 'T???t c??? kh??ch s???n',\n  apply_all_hotel_except: 'T???t c??? kh??ch s???n ng???ai tr???',\n  only_apply: 'Ch??? ??p d???ng',\n  list_hotel: 'Danh s??ch kh??ch s???n',\n  //\n  code: 'M??',\n  status: 'T??nh tr???ng',\n  phone: '??i???n tho???i',\n  address: '?????a ch???',\n  lastUpdate: 'C???p nh???t l???n cu???i',\n  //\n  contracted: 'H???p ?????ng',\n  terminated: 'D???ng h???p ?????ng',\n  suspended: 'Ch??? duy???t',\n  operation: 'Thao t??c'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/booking/hotelDebt.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/booking/revenueReport.js":
/*!*********************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/booking/revenueReport.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  timeAtHotel: 'Th???i gian ??? kh??ch s???n',\n  checkInTime: 'Th???i gian nh???n ph??ng',\n  contracted: 'H???p ?????ng',\n  trial: 'D??ng th???',\n  terminated: 'D???ng h???p ?????ng',\n  suspended: 'Treo',\n  hotelName: 'T??n kh??ch s???n',\n  companyCode: 'M?? c??ng ty',\n  totalCheckIn: 'T???ng nh???n ph??ng',\n  totalTransaction: 'T???ng giao d???ch',\n  extraFee: 'Ph??? thu',\n  productAmount: 'Gi?? s???n ph???m',\n  totalAmount: 'T???ng tr?????c khuy???n m??i',\n  go2joyDiscount: 'Khuy???n m??i G2J',\n  hotelDiscount: 'KS gi???m gi??',\n  userPay: 'Kh??ch thanh to??n',\n  paidInAdvance: '???? thanh to??n',\n  commission: 'Chi???t kh???u',\n  balance: 'T???ng ?????i so??t',\n  receivable: '(+) Ph???i thu',\n  payable: '(-) Ph???i tr???',\n  bookingTime: 'Ng??y ?????t ph??ng',\n  bookingId: 'M?? ?????t ph??ng',\n  transactionId: 'M?? giao d???ch',\n  bookingInfo: 'Th??ng tin ?????t ph??ng',\n  transactionStatus: 'Tr???ng th??i giao d???ch',\n  transactionTime: 'Th???i gian giao d???ch',\n  coupon: 'Coupon',\n  roomAmount: 'Gi?? ph??ng',\n  mileagePoint: 'Gi???m ??i???m',\n  otherDiscount: 'Gi???m gi?? kh??c',\n  flashSale: 'Gi???m s???c',\n  redeemStamp: 'S??? d???ng tem',\n  directDiscount: 'Gi???m tr???c ti???p',\n  allInventory: 'T???t c??? kh??ch s???n',\n  all: 'T???t c???',\n  Go2Joy: 'Go2Joy',\n  Agoda: 'Agoda',\n  operations: 'Thao t??c',\n  hours: 'Gi???',\n  overnight: 'Qua ????m',\n  daily: 'Theo ng??y'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/booking/revenueReport.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/booking/sendingMail.js":
/*!*******************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/booking/sendingMail.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  title: 'Ti??u ?????',\n  createStaff: 'Nh??n vi??n g???i',\n  createTime: 'Th???i gian t???o',\n  result: 'K???t qu???',\n  operations: 'Thao t??c',\n  hotelName: 'T??n kh??ch s???n',\n  code: 'M??',\n  theBalance: 'T???ng ?????i so??t (+) Ph???i thu (-) Ph???i tr???',\n  currentDebtOtherDebt: 'N??? hi???n h??nh / Kho???n n??? kh??c',\n  periodDebt: 'N??? k??? n??y',\n  expectedPayAmount: 'Ti???n tr??? d??? t??nh / Ti???n tr???',\n  currentDebt: 'N??? hi???n h??nh',\n  otherDebt: 'Kho???ng n??? kh??c',\n  address: '?????a ch???',\n  status: 'Tr???ng th??i'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/booking/sendingMail.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/home-display/collection.js":
/*!***********************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/home-display/collection.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  choose_display_in_app_web: 'Ch???n hi???n th??? tr??n App/Web',\n  subTitle: 'Ti??u ????? ph???',\n  title1: 'Ti???u ????? 1',\n  type: 'Lo???i',\n  display: 'Hi???n th???',\n  displayApp: 'Hi???n th??? tr??n App',\n  displayWeb: 'Hi???n th??? tr??n Web',\n  displayType: 'Lo???i hi???n th???',\n  lastUpdate: 'C???p nh???t cu???i',\n  operations: 'Thao t??c',\n  selectApplyHotel: 'Ch???n Kh??ch S???n ??p D???ng',\n  requiredTitle: 'Vui l??ng nh???p Ti??u ????? 1',\n  requiredSubTitle: 'Vui l??ng nh???p Ti??u ????? ph???',\n  requiredSlug: 'Vui l??ng nh???p Slug',\n  requiredDisplayType: 'Vui l??ng nh???p lo???i hi???n th???',\n  requiredDisplayCategory: 'Vui l??ng nh???p danh m???c hi???n th???',\n  hotelList: 'D.S.K.S',\n  promotionList: 'Danh s??ch khuy???n m??i',\n  title: 'Ti??u ????? 1',\n  detail: 'Chi ti???t',\n  summary: 'T???ng quan',\n  collection: 'B??? s??u t???p',\n  circle: 'H??nh tr??n',\n  lightSquare: 'LightSquare',\n  darkSquare: 'DarkSquare',\n  rectangle1: 'Rectangle1:2',\n  rectangle2: 'Rectangle2:1',\n  icon: 'Icon',\n  flashSale: 'Gi???m s???c',\n  promotion: 'Khuy???n m??i',\n  directDiscount: 'Gi???m gi??',\n  amenityPackHotel: 'G??i ti???n ??ch',\n  loveHotel: 'T??nh y??u',\n  travelHotel: 'Du l???ch',\n  hotHotel: 'KS hot',\n  newHotel: 'KS m???i',\n  go2jSpecial: 'Go2joy ?????c bi???t',\n  stamp: 'Tem',\n  g2jCertified: 'Go2Choice',\n  isTet: 'Hotel Tet',\n  image360: 'H??nh 360',\n  hotelReview: 'B??nh lu???n KS',\n  hotSearched: 'KS ???? t??m',\n  hotelBooked: 'KS ???? ?????t',\n  hotelFavorite: 'KS y??u th??ch',\n  hotelSuggestion: 'Go2joy g???i ?? ',\n  promotionSuggestion: 'Khuy???n m??i g???i ??',\n  image: 'H??nh ???nh',\n  promotionGroup: 'Nh??m khuy???n m??i',\n  chooseProvince: 'Khu v???c hi???n th???',\n  quarantine: 'C??ch ly',\n  go2joySuggestion: 'Go2joy g???i ??',\n  edit: 'S???a',\n  delete: 'X??a',\n  titleHotelList: 'Ti??u ?????',\n  displayArea: 'Khu v???c hi???n th???',\n  hotelName: 'T??n kh??ch s???n',\n  status: 'T??nh tr???ng',\n  phone: '??i???n th???ai',\n  province: 'T???nh th??nh',\n  address: '?????a ch???',\n  createTime: 'Th???i gian t???o',\n  code: 'M?? khuy???n m??i',\n  discount: 'Gi???m gi??',\n  applyStartEnd: 'Th???i gian ??p d???ng',\n  couponStartEnd: 'Th???i h???n coupon',\n  promotionName: 'T??n khuy???n m??i',\n  location: 'V??? tr??',\n  bookingType: 'Lo???i ?????t ph??ng',\n  hotelType: 'Lo???i kh??ch s???n',\n  all: 'T???t c???',\n  allType: 'T???t c???',\n  apply: '??p d???ng',\n  event: 'S??? ki???n',\n  inviteFriend: 'M???i b???n',\n  gift: 'Qu?? t???ng',\n  booking: '?????t ph??ng',\n  reportNewHotel: 'B??o kh??ch s???n m???i',\n  signUp: '????ng k?? m???i',\n  birthday: 'Sinh nh???t',\n  payment: 'Thanh to??n',\n  voucherCode: 'M?? voucher',\n  waiting: 'Ch??? duy???t',\n  displayed: '???? duy???t',\n  contracted: 'H???p ?????ng',\n  trial: 'D??ng th???',\n  terminated: 'D???ng h???p ?????ng',\n  suspended: 'Treo',\n  termPolicy: 'Quy ?????nh v?? ch??nh s??ch',\n  notification: 'Th??ng b??o',\n  noticeOfNoShow: 'Th??ng b??o Kh??ng nh???n ph??ng',\n  noticeOfCheckedInL: 'Th??ng b??o Nh???n ph??ng L',\n  hotelAvailable: 'C??',\n  hotelUnavailable: 'Kh??ng',\n  extraFeeYes: 'C??',\n  extraFeeNo: 'Kh??ng',\n  keyword: 'T??? kho??',\n  add: 'Th??m',\n  save: 'L??u',\n  back: 'Tr??? v???',\n  addSuccess: 'Th??m th??nh c??ng',\n  editSuccess: 'C???p nh???t th??nh c??ng',\n  removeSuccess: 'Xo?? th??nh c??ng',\n  description: 'M?? t???',\n  getLink: 'Get link',\n  copy: 'Sao ch??p',\n  copied: '???? sao ch??p',\n  requiredHotelList: 'Vui l??ng ch???n Hotel list',\n  function: 'Ch???c n??ng'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/home-display/collection.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/home-display/dashboard.js":
/*!**********************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/home-display/dashboard.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  category: 'Nh??m',\n  title: 'Ti??u ?????',\n  display: 'Hi???n th???',\n  lastUpdate: 'C???p nh???t cu???i',\n  operations: 'Thao t??c',\n  article: 'B??i b??o',\n  banner: 'Banner',\n  choose_area: 'Khu v???c',\n  voucher_code: 'M?? gi???m gi??',\n  collection: 'B??? s??u t???p',\n  notice: 'Tin nh???n',\n  about_us: 'Gi???i thi???u',\n  title1: 'Ti??u ????? 1',\n  title2: 'Ti???u ????? 2',\n  title3: 'Ti???u ????? 3',\n  content: 'N???i dung ',\n  list_hotel: 'Danh s??ch b??? s??u t???p',\n  display_type: 'Lo???i hi???n th???',\n  order: 'Th??? t???',\n  setup: 'Thi???t l???p',\n  management: 'Qu???n l??',\n  save: 'L??u',\n  back: 'Tr??? v???',\n  editSuccess: 'S???a th??nh c??ng',\n  coverPhoto: '???nh b??a',\n  image: 'H??nh ???nh'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/home-display/dashboard.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/hotel-display/hotelDisplay.js":
/*!*********************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/hotel-display/hotelDisplay.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  code: 'M??',\n  totalView_display: 'L?????t xem',\n  checkinCheckoutTime: 'Checkin/checkout',\n  startEndOvernight: 'Gi??? qua ????m',\n  payment: 'PT thanh to??n',\n  staff_in_change: 'Ng?????i ph??? tr??ch',\n  commission: 'Hoa h???ng',\n  groupName: 'T??n Nh??m',\n  hotelName: 'T??n kh??ch s???n',\n  holdingCompany: 'C??ng ty s??? h???u',\n  taxNo: 'M?? s??? thu???',\n  businessLicense: 'M?? s??? doanh nghi???p',\n  companyName: 'T??n c??ng ty',\n  address: '?????a ch???',\n  legalRepresentative: '?????i di???n ph??p lu???t',\n  fullName: 'T??n ?????y ?????',\n  position: 'Ch???c v???',\n  telephone: '??i???n tho???i',\n  email: 'Email',\n  bankInformation: 'Th??ng tin t??i kho???n',\n  accountNo: 'S??? t??i kho???n',\n  bankName: 'T??n ng??n h??ng',\n  branchName: 'Chi nh??nh',\n  beneficiary: 'Ng?????i h?????ng th???',\n  status: 'T??nh tr???ng',\n  contractDate: 'Ng??y h???p ?????ng',\n  endContractDate: 'Ng??y h???t h???p ?????ng',\n  typeNewContract: 'Ph??n lo???i h???p ?????ng m???i',\n  bizInCharge: 'NV qu???n l??',\n  saleInCharge: 'NV h???p ?????ng',\n  manageHotelsAfterContracting: '* Nh??n vi??n qu???n l?? kh??ch s???n sau khi h???p ?????ng',\n  contractingNewHotel: '* Nh??n vi??n h???p ?????ng v???i kh??ch s???n m???i',\n  sms: 'Tin nh???n',\n  go2joyPartnerApp: '???ng d???ng Go2Joy Partner',\n  propertyManagementSystem: 'Property Management System',\n  hotelPms: '(Hotel PMS)',\n  yesIUsing: 'C??, t??i s??? d???ng',\n  noIjustUse: 'Kh??ng, t??i ch??? d??ng',\n  hotelType: 'Lo???i kh??ch s???n',\n  new: 'M???i',\n  hot: 'Hot',\n  amenityPack: 'G??i ti???n ??ch',\n  go2joyCertified: 'Go2joy Certified',\n  couponBooking: 'L?????ng ?????t ph??ng (C) t???i ??a',\n  bookingSetup: 'Thi???t l???p ?????t ph??ng',\n  overnightTime: 'Gi??? qua ????m',\n  dailyTime: 'Gi??? theo ng??y',\n  startHourlyTime: 'Gi??? ?????t ph??ng theo gi???',\n  location: 'V??? tr??',\n  longLat: 'Kinh ?????/ V?? ?????',\n  longitude: 'Kinh ?????',\n  latitude: 'V?? ?????',\n  provinceDistrict: 'T???nh/Qu???n',\n  province: 'T???nh',\n  district: 'Qu???n',\n  updateHotelCode: 'C???p nh???t m?? kh??ch s???n',\n  phone: '??i???n tho???i',\n  areaCode: 'M?? v??ng',\n  vietnameseDescription: 'Mi??u t??? ti???ng vi???t',\n  englishDescription: 'Mi??u t??? ti???ng anh',\n  hotelPolicyVietnamese: 'Ch??nh s??ch kh??ch s???n ti???ng Vi???t',\n  hotelPolicyEnglish: 'Ch??nh s??ch kh??ch s???n ti???ng Anh',\n  tipsAddress: 'G???i ?? ?????a ch???',\n  hashTag: 'Hash tag',\n  homeImage: 'H??nh hi???n th???',\n  image: 'H??nh',\n  degreesImage: 'H??nh 360',\n  hotelNameCodeGroupName: 'T??n kh??ch s???n / M?? / T??n Nh??m',\n  totalReview: 'T???ng b??nh lu???n',\n  averageMark: '??i???m trung b??nh',\n  promotionHotNew: 'Khuy???n m??i / Hot / M???i',\n  totalLike: 'T???ng like',\n  overnightTimeDailyTime: 'Gi??? qua ????m / Gi??? theo ng??y',\n  bookingNotificationBy: 'Nh???n th??ng b??o ?????t ph??ng',\n  contractEndContractDate: 'Ng??y h???p ?????ng / Ng??y h???t h???p ?????ng',\n  roomAvailable: 'C?? ph??ng',\n  totalView: 'L?????t xem',\n  createStaff: 'Ng?????i t???o',\n  staffInCharge: 'Ng?????i ph??? tr??ch',\n  top: 'Top',\n  display: 'Hi???n th???',\n  extraFee: 'Ph??? thu',\n  firstHoursPrice: 'Gi?? gi??? ?????u',\n  plusHoursPrice: 'Gi?? th??m gi???',\n  overnightPrice: 'Gi?? qua ????m',\n  oneDayPrice: 'Gi?? m???t ng??y',\n  memo: 'Ghi ch??',\n  payInAdvance: 'Tr??? ti???n tr?????c',\n  giftImage: 'H??nh qu?? t???ng',\n  // validation\n  requiredHotelName: 'Vui l??ng nh???p t??n kh??ch s???n',\n  requiredFullname: 'Vui l??ng nh???p t??n ?????y ?????',\n  requiredPosition: 'Vui l??ng nh???p ch???c v???',\n  requiredTelephone: 'Vui l??ng nh???p ??i???n tho???i',\n  requiredEmail: 'Vui l??ng nh???p email',\n  requiredAccountNo: 'Vui l??ng nh???p s??? t??i kho???n',\n  requiredBankName: 'Vui l??ng nh???p t??n ng??n h??ng',\n  requiredBranchName: 'Vui l??ng nh???p chi nh??nh',\n  requiredBeneficiary: 'Vui l??ng nh???p ng?????i th??? h?????ng',\n  requiredBizInCharge: 'Vui l??ng ch???n NV qu???n l??',\n  requiredSaleInCharge: 'Vui l??ng ch???n NV h???p ?????ng',\n  requiredContractDate: 'Vui l??ng nh???p ng??y h???p ?????ng',\n  requiredLongitude: 'Vui l??ng nh???p kinh ?????',\n  requiredLatitude: 'Vui l??ng nh???p v?? ?????',\n  requiredAddress: 'Vui l??ng nh???p ?????a ch???',\n  requiredProvince: 'Vui l??ng ch???n t???nh',\n  requiredDistrict: 'Vui l??ng ch???n qu???n',\n  requiredCommission: 'Vui l??ng nh???p hoa h???ng',\n  wrongFormatImage: 'H??nh ???nh kh??ng h???p l???',\n  requiredHomeImage: 'Vui l??ng ch???n h??nh hi???n th???',\n  // message\n  doYouWantToContinue: 'B???n c?? mu???n ti???p t???c?',\n  contractNo: 'S??? h???p ?????ng',\n  isExistedInSystem: '???? t???n t???i trong h??? th???ng'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/hotel-display/hotelDisplay.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/hotel-facility/facilityAdd.js":
/*!*********************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/hotel-facility/facilityAdd.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  facility_name_vn: 'T??n ti???n ??ch (Ti???ng vi???t)',\n  facility_name_en: 'Lo???i s???n ph???m (Ti???ng anh)',\n  image: 'H??nh ???nh',\n  requiredName: 'T??n ti???n ??ch l?? tr?????ng b???t bu???c',\n  requiredNameEn: 'T??n ti???n ??ch (Ti???ng anh) l?? tr?????ng b???t bu???c',\n  requiredImage: 'H??nh ???nh l?? tr?????ng b???t bu???c'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/hotel-facility/facilityAdd.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/hotel-facility/facilityList.js":
/*!**********************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/hotel-facility/facilityList.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'T??n',\n  facility_name_en: 'T??n ti???n ??ch (Ti???ng anh)',\n  createstaff: 'Ng?????i t???o',\n  lastupdate: 'C???p nh???t cu???i',\n  operations: 'Ho???t ?????ng',\n  placeholder: 'T??n ti???n ??ch'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/hotel-facility/facilityList.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/hotel-group/hotelGroupAdd.js":
/*!********************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/hotel-group/hotelGroupAdd.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  namegroup: 'T??n Nh??m',\n  ownerinformation: 'Th??ng tin ng?????i ch???',\n  ownername: 'T??n NV',\n  ownertel: '??i???n tho???i NV',\n  owneremail: 'Email NV',\n  companyinformation: 'Th??ng tin c??ng ty',\n  companyname: 'T??n c??ng ty',\n  businesslisencenumber: 'BLN',\n  companytel: '??i???n tho???i Cty',\n  companyemail: 'Email c??ng ty',\n  companyaddress: '?????a ch??? c??ng ty',\n  addhoteltogroup: 'Th??m v??o nh??m',\n  table_hotel_name: 'T??n kh??ch s???n',\n  table_status: 'T??nh tr???ng',\n  table_phone: '??i???n tho???i',\n  table_address: '?????a ch???',\n  table_commission: 'Hoa h???ng',\n  operations: 'Ho???t ?????ng',\n  requiredNameGroup: 'T??n Nh??m l?? tr?????ng b???t bu???c',\n  requiredNameOwnerInfo: 'Th??ng tin ng?????i ch??? l?? tr?????ng b???t bu???c',\n  requiredOwnerTel: '??i???n tho???i NV l?? tr?????ng b???t bu???c',\n  requiredOwnerEmail: 'Email NV l?? tr?????ng b???t bu???c'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/hotel-group/hotelGroupAdd.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/hotel-group/hotelGroupDetail.js":
/*!***********************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/hotel-group/hotelGroupDetail.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  namegroup: 'T??n Nh??m',\n  ownerinformation: 'Th??ng tin ng?????i ch???',\n  ownername: 'T??n NV',\n  ownertel: '??i???n tho???i NV',\n  owneremail: 'Email NV',\n  companyinformation: 'Th??ng tin c??ng ty',\n  companyname: 'T??n c??ng ty',\n  businesslisencenumber: 'BLN',\n  companytel: '??i???n tho???i Cty',\n  companyemail: 'Email c??ng ty',\n  companyaddress: '?????a ch??? c??ng ty',\n  addhoteltogroup: 'Th??m v??o nh??m',\n  table_hotel_name: 'T??n kh??ch s???n',\n  table_status: 'T??nh tr???ng',\n  table_phone: '??i???n tho???i',\n  table_address: '?????a ch???',\n  table_commission: 'Hoa h???ng',\n  operations: 'Ho???t ?????ng',\n  totalHotel: 'SL kh??ch s???n'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/hotel-group/hotelGroupDetail.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/hotel-group/hotelGroupEdit.js":
/*!*********************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/hotel-group/hotelGroupEdit.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  namegroup: 'T??n Nh??m',\n  ownerinformation: 'Th??ng tin ng?????i ch???',\n  ownername: 'T??n NV',\n  ownertel: '??i???n tho???i NV',\n  owneremail: 'Email NV',\n  companyinformation: 'Th??ng tin c??ng ty',\n  companyname: 'T??n c??ng ty',\n  businesslisencenumber: 'BLN',\n  companytel: '??i???n tho???i Cty',\n  companyemail: 'Email c??ng ty',\n  companyaddress: '?????a ch??? c??ng ty',\n  addhoteltogroup: 'Th??m v??o nh??m',\n  table_hotel_name: 'T??n kh??ch s???n',\n  table_status: 'T??nh tr???ng',\n  table_phone: '??i???n tho???i',\n  table_address: '?????a ch???',\n  table_commission: 'Hoa h???ng',\n  operations: 'Ho???t ?????ng',\n  requiredNameGroup: 'T??n Nh??m l?? tr?????ng b???t bu???c',\n  requiredNameOwnerInfo: 'Th??ng tin ng?????i ch??? l?? tr?????ng b???t bu???c',\n  requiredOwnerTel: '??i???n tho???i NV l?? tr?????ng b???t bu???c',\n  requiredOwnerEmail: 'Email NV l?? tr?????ng b???t bu???c'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/hotel-group/hotelGroupEdit.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/hotel-group/hotelGroupList.js":
/*!*********************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/hotel-group/hotelGroupList.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'T??n Nh??m',\n  ownerName: 'T??n NV',\n  ownerTel: '??i???n tho???i NV',\n  ownerEmail: 'Email NV',\n  companyName: 'T??n c??ng ty',\n  bln: 'BLN',\n  companyAddress: '?????a ch??? c??ng ty',\n  companyTel: '??i???n tho???i Cty',\n  companyEmail: 'Email c??ng ty',\n  totalHotel: 'SL kh??ch s???n'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/hotel-group/hotelGroupList.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/hotel-staff/hotelStaffEdit.js":
/*!*********************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/hotel-staff/hotelStaffEdit.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  hotel_name: 'T??n kh??ch s???n',\n  user_id: 'User Id',\n  full_name: 'H??? t??n',\n  role: 'Ph??n quy???n',\n  mobile: 'Di ?????ng',\n  receive_sms: 'Nh???n tin nh???n',\n  email: 'Email',\n  debt_reconciliation_email: 'Email c??ng n???',\n  address: '?????a ch???',\n  memo: 'Ghi ch??',\n  password: 'M???t kh???u',\n  confirm_password: 'X??c nh???n m???t kh???u',\n  admin_ks: 'Admin KS',\n  manager: 'Qu???n L??',\n  reception: 'L??? T??n',\n  status: 'Ho???t ?????ng',\n  hotel_employee: 'T??n kh??ch s???n',\n  requiredHotelName: 'T??n kh??ch s???n l?? tr?????ng b???t bu???c',\n  requiredUserId: 'User Id l?? tr?????ng b???t bu???c',\n  requiredRole: 'Ph??n quy???n l?? tr?????ng b???t bu???c',\n  requiredEmail: 'Email l?? tr?????ng b???t bu???c',\n  requiredMobile: 'Di ?????ng l?? tr?????ng b???t bu???c',\n  requiredDebtEmail: 'Email c??ng n??? l?? tr?????ng b???t bu???c',\n  requiredPassword: 'M???t kh???u l?? tr?????ng b???t bu???c',\n  requiredFullName: 'H??? t??n l?? tr?????ng b???t bu???c',\n  requiredConfirmPassword: 'X??c nh???n m???t kh???u l?? tr?????ng b???t bu???c',\n  validatePassConfirm: 'X??c nh???n m???t kh???u kh??ng gi???ng nhau',\n  requirePass: 'Vui l??ng nh???p m???t kh???u',\n  requirePassConfirm: 'Vui l??ng x??c nh??n m???t kh???u'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/hotel-staff/hotelStaffEdit.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/hotel-staff/hotelStaffList.js":
/*!*********************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/hotel-staff/hotelStaffList.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  placeholder: 'T??n kh??ch s???n',\n  hotel_name: 'T??n kh??ch s???n',\n  user_id: 'User Id',\n  full_name: 'H??? t??n',\n  role: 'Ph??n quy???n',\n  mobile: 'Di ?????ng',\n  receive_sms: 'Nh???n tin nh???n',\n  email: 'Email',\n  status: 'Ho???t ?????ng'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/hotel-staff/hotelStaffList.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/notice-to-hotel/detail-reply.js":
/*!***********************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/notice-to-hotel/detail-reply.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  hotel_name: 'T??n kh??ch s???n',\n  message_type: 'Lo???i tin nh???n',\n  allow_to_reply: 'Cho ph??p tr??? l???i',\n  create_staff: 'Ng?????i t???o',\n  create_time: 'Th???i gian t???o',\n  last_update: 'C???p nh???t cu???i',\n  topic: 'Ch??? ?????',\n  brief_detail: 'T??m t???t',\n  detail: 'Chi ti???t',\n  answer1: 'Cho ph??p',\n  answer0: 'Kh??ng cho ph??p',\n  Notification: 'Th??ng b??o',\n  notice_of_no_show: 'Th??ng b??o Kh??ng nh???n ph??ng',\n  notice_of_Checked_in_l: 'Th??ng b??o Nh???n ph??ng L',\n  apply_for_hotel: '??p d???ng cho KS',\n  function: 'Ch???c n??ng',\n  promotion: 'Khuy???n m??i',\n  term_policy: 'Quy ?????nh v?? ch??nh s??ch',\n  all_hotels: 'T???t c??? kh??ch s???n',\n  all_hotel_contracts: 'T???t c??? kh??ch s???n h???p ?????ng',\n  all_hotel_tries: 'T???t c??? kh??ch s???n d??ng th???',\n  only_apply: 'Ch??? ??p d???ng',\n  hotel_list: 'Danh s??ch kh??ch s???n',\n  requiredType: 'Lo???i tin nh???n l?? tr?????ng b???t bu???c',\n  requiredHotelList: '??p d???ng cho KS l?? tr?????ng b???t bu???c',\n  requiredTitle: 'Ch??? ????? l?? tr?????ng b???t bu???c',\n  content_qa: 'N???i dung Q&A',\n  message_reply_success: 'Ph???n h???i th??nh c??ng',\n  message_sent_success: 'G???i th??nh c??ng',\n  message_sent_error: 'G???i th???t b???i'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/notice-to-hotel/detail-reply.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/notice-to-hotel/noticeApplyHotel.js":
/*!***************************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/notice-to-hotel/noticeApplyHotel.js ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  hotel_name: 'T??n kh??ch s???n',\n  code: 'M??',\n  status: 'T??nh tr???ng',\n  phone: '??i???n tho???i',\n  address: '?????a ch???',\n  create_time: 'Th???i gian t???o',\n  last_update: 'C???p nh???t l???n cu???i',\n  operations: 'Ho???t ?????ng',\n  placeholder: 'T??? kh??a',\n  all: 'T???t c???'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/notice-to-hotel/noticeApplyHotel.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/notice-to-hotel/noticeDetail.js":
/*!***********************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/notice-to-hotel/noticeDetail.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  hotel_name: 'T??n kh??ch s???n',\n  message_type: 'Lo???i tin nh???n',\n  allow_to_reply: 'Cho ph??p tr??? l???i',\n  create_staff: 'Ng?????i t???o',\n  create_time: 'Th???i gian t???o',\n  last_update: 'C???p nh???t cu???i',\n  topic: 'Ch??? ?????',\n  brief_detail: 'T??m t???t',\n  detail: 'Chi ti???t',\n  answer1: 'Cho ph??p',\n  answer0: 'Kh??ng cho ph??p',\n  Notification: 'Th??ng b??o',\n  notice_of_no_show: 'Th??ng b??o Kh??ng nh???n ph??ng',\n  notice_of_Checked_in_l: 'Th??ng b??o Nh???n ph??ng L',\n  apply_for_hotel: '??p d???ng cho KS',\n  function: 'Ch???c n??ng',\n  promotion: 'Khuy???n m??i',\n  term_policy: 'Quy ?????nh v?? ch??nh s??ch',\n  all_hotels: 'T???t c??? kh??ch s???n',\n  all_hotel_contracts: 'T???t c??? kh??ch s???n h???p ?????ng',\n  all_hotel_tries: 'T???t c??? kh??ch s???n d??ng th???',\n  only_apply: 'Ch??? ??p d???ng',\n  hotel_list: 'Danh s??ch kh??ch s???n',\n  requiredType: 'Lo???i tin nh???n l?? tr?????ng b???t bu???c',\n  requiredHotelList: '??p d???ng cho KS l?? tr?????ng b???t bu???c',\n  requiredTitle: 'Ch??? ????? l?? tr?????ng b???t bu???c',\n  content_qa: 'N???i dung Q&A',\n  message_reply_success: 'Ph???n h???i th??nh c??ng',\n  message_sent_success: 'G???i th??nh c??ng',\n  message_sent_error: 'G???i th???t b???i'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/notice-to-hotel/noticeDetail.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/notice-to-hotel/noticeHotelList.js":
/*!**************************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/notice-to-hotel/noticeHotelList.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  create_staff: 'Ng?????i t???o',\n  create_time: 'Th???i gian t???o',\n  last_update: 'C???p nh???t cu???i',\n  hotel_name: 'T??n kh??ch s???n',\n  status: 'T??nh tr???ng',\n  phone: '??i???n tho???i',\n  address: '?????a ch???'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/notice-to-hotel/noticeHotelList.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/notice-to-hotel/noticeList.js":
/*!*********************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/notice-to-hotel/noticeList.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  topic: 'Ch??? ?????',\n  message_type: 'Lo???i tin nh???n',\n  apply_for_hotel: '??p d???ng cho',\n  create_staff: 'Ng?????i t???o',\n  create_time: 'Th???i gian t???o',\n  last_update: 'C???p nh???t cu???i',\n  hotel_name: 'T??n kh??ch s???n',\n  status: 'T??nh tr???ng',\n  phone: '??i???n tho???i',\n  address: '?????a ch???',\n  placeholder: 'T??? kh??a',\n  operations: 'Ho???t ?????ng'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/notice-to-hotel/noticeList.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/notice-to-hotel/sendNotice.js":
/*!*********************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/notice-to-hotel/sendNotice.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  list_hotel: 'Danh s??ch kh??ch s???n',\n  content_qa: 'N???i dung Q&A',\n  inform_hotel_by: 'Th??ng b??o t???i kh??ch s???n b???ng ',\n  email: 'Email',\n  go2joy_partner_app: '???ng d???ng Partner',\n  send_email: 'Send Message',\n  list: 'Danh s??ch',\n  send: 'G???i',\n  reply: 'Reply',\n  done: 'Ho??n th??nh',\n  hotel_name: 'T??n kh??ch s???n',\n  message_type: 'Lo???i tin nh???n',\n  allow_to_reply: 'Cho ph??p tr??? l???i',\n  create_staff: 'Ng?????i t???o',\n  create_time: 'Th???i gian t???o',\n  last_update: 'C???p nh???t cu???i',\n  topic: 'Ch??? ?????',\n  brief_detail: 'T??m t???t',\n  detail: 'Chi ti???t',\n  answer1: 'Cho ph??p',\n  answer0: 'Kh??ng cho ph??p',\n  Notification: 'Th??ng b??o',\n  notice_of_no_show: 'Th??ng b??o Kh??ng nh???n ph??ng',\n  notice_of_Checked_in_l: 'Th??ng b??o Nh???n ph??ng L',\n  apply_for_hotel: '??p d???ng cho KS',\n  function: 'Ch???c n??ng',\n  promotion: 'Khuy???n m??i',\n  term_policy: 'Quy ?????nh v?? ch??nh s??ch',\n  all_hotels: 'T???t c??? kh??ch s???n',\n  all_hotel_contracts: 'T???t c??? kh??ch s???n h???p ?????ng',\n  all_hotel_tries: 'T???t c??? kh??ch s???n d??ng th???',\n  only_apply: 'Ch??? ??p d???ng'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/notice-to-hotel/sendNotice.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/product-type/productType.js":
/*!*******************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/product-type/productType.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name_product_type: 'Lo???i s???n ph???m',\n  image_product_type: 'H??nh ???nh',\n  status_product_type: 'Tr???ng th??i',\n  last_update_product_type: 'Ch???nh s???a l???n cu???i',\n  operations: 'Thao t??c'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/product-type/productType.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/product-type/productTypeAdd.js":
/*!**********************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/product-type/productTypeAdd.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  product_type_name: 'Lo???i s???n ph???m',\n  product_type_nameEn: 'Lo???i s???n ph???m (Ti???ng anh)',\n  image: 'H??nh ???nh',\n  requiredName: 'Lo???i s???n ph???m l?? tr?????ng b???t bu???c',\n  requiredNameEn: 'Lo???i s???n ph???m (Ti???ng anh) l?? tr?????ng b???t bu???c',\n  requiredImage: 'H??nh ???nh l?? tr?????ng b???t bu???c',\n  buttonAdd: 'Th??m',\n  buttonBack: 'Tr??? v???'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/product-type/productTypeAdd.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/product-type/productTypeEdit.js":
/*!***********************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/product-type/productTypeEdit.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  product_type_name: 'Lo???i s???n ph???m',\n  product_type_nameEn: 'Lo???i s???n ph???m (Ti???ng anh)',\n  image: 'H??nh ???nh',\n  requiredName: 'Lo???i s???n ph???m l?? tr?????ng b???t bu???c',\n  requiredNameEn: 'Lo???i s???n ph???m (Ti???ng anh) l?? tr?????ng b???t bu???c',\n  requiredImage: 'H??nh ???nh l?? tr?????ng b???t bu???c',\n  buttoEdit: 'S???a',\n  buttonBack: 'Tr??? v???'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/product-type/productTypeEdit.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/product/product.js":
/*!**********************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/product/product.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  product_name: 'T??n s???n ph???m',\n  product_type_name: 'Lo???i s???n ph???m',\n  price: 'Gi??',\n  prepare_before_1_day: 'Chu???n b??? tr?????c 1 ng??y',\n  last_update: 'C???p nh???t cu???i',\n  status: 'Tr???ng th??i',\n  placeholder: 'T??n kh??ch s???n'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/product/product.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/product/productDetail.js":
/*!****************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/product/productDetail.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  hotel: 'Kh??ch s???n',\n  product_name: 'T??n s???n ph???m',\n  product_name_en: 'T??n s???n ph???m (Ti???ng Anh)',\n  product_type_name: 'Lo???i s???n ph???m',\n  product_type_name_en: 'Lo???i s???n ph???m (Ti???ng anh)',\n  price: 'Gi??',\n  prepare_before_1_day: 'Chu???n b??? tr?????c 1 ng??y',\n  description: 'M?? t???',\n  status: 'Tr???ng th??i',\n  create_staff: 'Nh??n vi??n t???o',\n  last_update: 'C???p nh???t cu???i',\n  image: 'H??nh ???nh'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/product/productDetail.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/review/option/ratings.js":
/*!****************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/review/option/ratings.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  from_4_to_5: 'Rating from 4 to 5',\n  from_3_to_less_than_4: 'Rating from 3 to less than 4',\n  from_2_to_less_than_3: 'Rating from 2 to less than 3',\n  from_1_to_less_than_2: 'Rating from 1 to less than 2',\n  under_1: 'Rating under 1',\n  is_zero: 'Rating is 0',\n  is_one: 'Rating is 1',\n  is_two: 'Rating is 2',\n  is_three: 'Rating is 3',\n  is_four: 'Rating is 4',\n  is_five: 'Rating is 5'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/review/option/ratings.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/review/option/sortBy.js":
/*!***************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/review/option/sortBy.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  newest_to_oldest: 'Newest to oldest',\n  oldest_to_newest: 'Oldest to newest',\n  highest_to_lowest_rating: 'Highest to lowest rating',\n  lowest_to_highest_rating: 'Lowest to highest rating',\n  most_to_least_review: 'Most to least review',\n  least_to_most_review: 'Least to most review',\n  hotel_name_a_z: 'Hotel name A-Z',\n  hotel_name_z_a: 'Hotel name Z-A',\n  username_a_z: 'Username A-Z',\n  username_z_a: 'Username Z-A'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/review/option/sortBy.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/review/reviewMgt.js":
/*!***********************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/review/reviewMgt.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  label_header: 'Average rating / No. of hotels reviewed / No. of review:',\n  hotel_name: 'Hotel\\'s name',\n  placeholder: 'Hotel Name',\n  hotel_status: 'Hotel\\'s status',\n  address: 'Address',\n  average_rating: 'Average Rating ( Facilities / Cleanliness / Services ):',\n  number_of_review: 'Number of review  ( Number of hotel\\'s reply ):',\n  num_of_review_like: 'Number of review\\'s like',\n  last_review: 'Last review',\n  review: 'Review',\n  reply_content: 'Reply content',\n  num_of_like: 'Number of like',\n  user: 'User',\n  staff: 'Staff',\n  comment_time: 'Comment time'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/review/reviewMgt.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/room-type/calendar.js":
/*!*************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/room-type/calendar.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  fs_report: 'B??o c??o FS',\n  fs_setting: 'C??i ?????t FS',\n  add: 'Th??m',\n  flash_sale: 'Gi???m s???c',\n  extra_fee: 'Ph??? thu',\n  direct_discount: 'Gi???m gi??',\n  sold_out: 'M??? ph??ng h??m nay',\n  hotel_name: 'T??n kh??ch s???n',\n  room_type: 'Lo???i ph??ng',\n  room_price: 'Gi?? ph??ng',\n  day: 'Ng??y',\n  three_days: '3 Ng??y',\n  one_week: '1 Tu???n',\n  one_month: '1 Th??ng',\n  two_months: '2 Th??ng',\n  three_months: '3 Th??ng',\n  detail: 'Xem chi ti???t ph??ng',\n  create: 'T???o l???ch',\n  edit: 'S???a',\n  delete: 'X??a',\n  confirm: 'X??c nh???n',\n  save: 'L??u',\n  cancel: 'H???y',\n  popup: 'B???n c?? 1 y??u c???u x??c nh???n',\n  headerFlashSale: 'Ph??ng Gi???m S???c ??ang ch???y',\n  contentFlashSale: 'V?? th???, Go2joy s??? d???ng ch???y Ph??ng Gi???m S???c v?? Kho?? ph??ng h??m nay',\n  is_lock_room: 'H???t ph??ng h??m nay',\n  instant_lock: 'Kh??a ph??ng ngay',\n  room_left: 'S??? ph??ng c??n l???i',\n  room_setting: 'C??i ?????t ph??ng',\n  pick_a_day: 'Ch???n 1 ng??y',\n  room_left_content: 'Ch???n s??? l?????ng ph??ng c??n l???i ????? b??n. H??? th???ng s??? t??? ?????ng kh??a lo???i ph??ng n??y khi b??n h???t.',\n  createSchedule: 'T???o l???ch'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/room-type/calendar.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/room-type/comFirmLockRoom.js":
/*!********************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/room-type/comFirmLockRoom.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'X??c nh???n kh??a ph??ng',\n  room_name: 'T??n ph??ng',\n  block_time: 'Th???i gian kh??a'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/room-type/comFirmLockRoom.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/room-type/createRoomType.js":
/*!*******************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/room-type/createRoomType.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  hotel_name: 'T??n kh??ch s???n',\n  name_short_name: 'T??n',\n  name_room: 'T??n ph??ng',\n  short_name: 'T??n vi???t  t???t',\n  room_type: 'Lo???i ph??ng',\n  num_of_room: 'S??? l?????ng ph??ng',\n  first_hours_price: 'Gi?? gi??? ?????u',\n  num_of_hours: 'S??? gi???',\n  max_num_hour: 'Gi??? t???i ??a',\n  plus_hours_price: 'Gi?? th??m gi???',\n  price: 'Gi??',\n  overnight_price: 'Gi?? qua ????m',\n  one_day_price: 'Gi?? m???t ng??y',\n  square_bed_type_view: 'Di???n t??ch/Lo???i gi?????ng/G??c nh??n',\n  not_select: 'Kh??ng ch???n',\n  single: 'Gi?????ng ????n',\n  double: 'Gi?????ng ????i',\n  twin: 'Hai gi?????ng ????n',\n  triple: 'M???t ????n, m???t ????i',\n  _2double: 'Hai gi?????ng ????i',\n  limit_number: 'Gi???i h???n ?????t ph??ng s??? d???ng gi???m gi?? 1 ng??y',\n  no_limit: 'Kh??ng gi???i h???n',\n  memo: 'Ghi ch??',\n  home_image: 'H??nh hi???n th???',\n  image: 'H??nh ',\n  _360image: 'H??nh 360',\n  normal: 'Ph??ng th?????ng',\n  flash_sale: 'Gi???m ?????c bi???t',\n  normal_room: 'Ph??ng th?????ng',\n  facilities: 'Ti???n ??ch'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/room-type/createRoomType.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/room-type/detailRoomType.js":
/*!*******************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/room-type/detailRoomType.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'Xem chi ti???t ph??ng',\n  hotel_name: 'T??n kh??ch s???n',\n  name_short_name: 'T??n/T??n lo???i ph??ng',\n  num_of_room: 'S??? ph??ng',\n  first_hours_price: 'Gi?? gi??? ?????u',\n  max_num_hour: 'Gi??? t???i ??a',\n  plus_hour_price: 'Gi?? th??m gi???',\n  overnight_price: 'Gi?? qua ????m',\n  one_day_price: 'Gi?? m???t ng??y',\n  square: 'Di???n t??ch',\n  bed_type: 'Lo???i gi?????ng',\n  view: 'G??c nh??n',\n  memo: 'Memo',\n  facilities: 'Ti???n ??ch',\n  special_offer: {\n    name: 'Ch????ng tr??nh ?????c bi???t',\n    description: 'M?? t???',\n    end_date: 'Ng??y k???t th??c',\n    gift_image: 'H??nh qu?? t???ng'\n  },\n  flash_sale: {\n    name: 'Gi???m s???c',\n    name_flash_sale: 'T??n',\n    description: 'M?? t???',\n    sale_start: 'Ng??y b???t ?????u',\n    quantity: 'S??? l?????ng',\n    flash_sale_price: 'Gi?? gi???m s???c'\n  },\n  extra_fee: {\n    name: 'Ph??? thu',\n    booking_type: 'Lo???i ?????t ph??ng',\n    origin: 'G???c',\n    extra_fee: 'Ph??? thu',\n    start_end: 'B???t ?????u/K???t th??c ph??? thu',\n    days_apply: 'Ng??y ??p d???ng ph??? thu',\n    special_date: 'Ng??y ?????c bi???t kh??c'\n  },\n  direct_discount: {\n    name: 'Gi???m gi??',\n    booking_type: 'Lo???i ?????t ph??ng',\n    origin: 'G???c',\n    direct_discount: 'Gi???m gi??',\n    start_end: 'B???t ?????u/K???t th??c gi???m gi??',\n    days_apply: 'Ng??y ??p d???ng gi???m gi??',\n    special_date: 'Ng??y ?????c bi???t kh??c'\n  },\n  bed_types: {\n    not_select: 'Kh??ng ch???n',\n    single: 'Gi?????ng ????n',\n    double: 'Gi?????ng ????i',\n    twin: 'Hai gi?????ng ????i',\n    triple: 'M???t ????n, m???t ????i',\n    _2double: 'Hai gi?????ng ????i'\n  },\n  lockRoomHistory: 'L???ch s??? kh??a ph??ng',\n  roomType: 'Lo???i ph??ng',\n  dateRange: 'Kho???ng th???i gian',\n  startDate: 'Ng??y b???t ?????u',\n  endDate: 'Ng??y k???t th??c',\n  bookingType: 'Lo???i ?????t ph??ng',\n  startTime: 'Gi??? b???t ?????u',\n  endTime: 'Gi??? k???t th??c',\n  allRoomTypes: 'T???t c??? lo???i ph??ng',\n  daily: 'Theo ng??y',\n  hours: 'Theo gi???',\n  overnight: 'Qua ????m',\n  allBookingTypes: 'T???t c??? lo???i ?????t ph??ng'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/room-type/detailRoomType.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/room-type/directDiscount.js":
/*!*******************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/room-type/directDiscount.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'Gi???m gi??',\n  hotel_name: 'T??n kh??ch s???n',\n  name_short_name: 'T??n/T??n vi???t t???t',\n  num_of_room: 'S??? ph??ng',\n  start_end: 'B???t ?????u/K???t th??c gi???m gi??',\n  days_apply: 'Ng??y ??p d???ng gi???m gi??',\n  monday: 'Th??? hai',\n  tuesday: 'Th??? ba',\n  wednesday: 'Th??? t??',\n  thursday: 'Th??? n??m',\n  friday: 'Th??? s??u',\n  saturday: 'Th??? b???y',\n  sunday: 'Ch??? nh???t',\n  special_date: 'Ng??y ?????c bi???t kh??c',\n  first_hours_price: 'Gi?? gi??? ?????u',\n  num_of_hours: 'S??? gi???',\n  price: 'Gi??',\n  direct_discount_price: 'Gi?? sau gi???m',\n  plus_hours_price: 'Gi?? th??m gi???',\n  overnight_price: 'Gi?? qua ????m',\n  one_day_price: 'Gi?? m???t ng??y',\n  booking_type: 'Lo???i ?????t ph??ng',\n  origin: 'G???c',\n  success: 'Th??nh c??ng',\n  createSuccess: 'T???o th??nh c??ng',\n  checkSuccess: 'Th??nh c??ng',\n  requireDirectDiscount: 'Nh???p gi?? sau khuy???n m??i',\n  start_date: 'Ng??y b???t ?????u',\n  end_date: 'Ng??y k???t th??c'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/room-type/directDiscount.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/room-type/editRoomType.js":
/*!*****************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/room-type/editRoomType.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  hotel_name: 'T??n kh??ch s???n',\n  name_short_name: 'T??n',\n  name_room: 'T??n ph??ng',\n  short_name: 'T??n vi???t  t???t',\n  room_type: 'Lo???i ph??ng',\n  num_of_room: 'S??? l?????ng ph??ng',\n  first_hours_price: 'Gi?? gi??? ?????u',\n  num_of_hours: 'S??? gi???',\n  max_num_hour: 'Gi??? t???i ??a',\n  plus_hours_price: 'Gi?? th??m gi???',\n  price: 'Gi??',\n  overnight_price: 'Gi?? qua ????m',\n  one_day_price: 'Gi?? m???t ng??y',\n  square_bed_type_view: 'Di???n t??ch/Lo???i gi?????ng/G??c nh??n',\n  not_select: 'Kh??ng ch???n',\n  single: 'Gi?????ng ????n',\n  double: 'Gi?????ng ????i',\n  twin: 'Hai gi?????ng ????n',\n  triple: 'M???t ????n, m???t ????i',\n  _2double: 'Hai gi?????ng ????i',\n  limit_number: 'Gi???i h???n ?????t ph??ng s??? d???ng gi???m gi?? 1 ng??y',\n  no_limit: 'Kh??ng gi???i h???n',\n  memo: 'Ghi ch??',\n  home_image: 'H??nh hi???n th???',\n  image: 'H??nh ',\n  _360image: 'H??nh 360',\n  normal: 'Ph??ng th?????ng',\n  flash_sale: 'Gi???m ?????c bi???t',\n  normal_room: 'Ph??ng th?????ng',\n  facilities: 'Ti???n ??ch',\n  bonus_hours: 'T???ng th??m gi???',\n  min_booking_hours: 'Gi??? t???i thi???u',\n  num_of_bonus_hours: 'Gi??? t???ng',\n  gift_desc: 'Mi??u t???',\n  gift_from_hotel: 'Qu?? t???ng',\n  to_date: '?????n ng??y',\n  gift_image: 'H??nh qu?? t???ng'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/room-type/editRoomType.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/room-type/exportFlashSale.js":
/*!********************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/room-type/exportFlashSale.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'Xu???t b??o c??o Ph??ng Gi???m S???c',\n  export_title: 'Vui l??ng ch???n ng??y ????? xu???t Ph??ng Gi???m S???c.'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/room-type/exportFlashSale.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/room-type/extraFee.js":
/*!*************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/room-type/extraFee.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'Ph??? thu',\n  hotel_name: 'T??n kh??ch s???n',\n  name_short_name: 'T??n/T??n vi???t t???t',\n  num_of_room: 'S??? ph??ng',\n  start_end: 'B???t ?????u/K???t th??c ph??? thu',\n  days_apply: 'Ng??y ??p d???ng ph??? thu',\n  monday: 'Th??? hai',\n  tuesday: 'Th??? ba',\n  wednesday: 'Th??? t??',\n  thursday: 'Th??? n??m',\n  friday: 'Th??? s??u',\n  saturday: 'Th??? b???y',\n  sunday: 'Ch??? nh???t',\n  special_date: 'Ng??y ?????c bi???t kh??c',\n  first_hours_price: 'Gi?? gi??? ?????u',\n  num_of_hours: 'S??? gi???',\n  price: 'Gi??',\n  after_extra_fee: 'Gi?? sau ph??? thu (From 1% - 500%)',\n  plus_hours_price: 'Gi?? th??m gi???',\n  overnight_price: 'Gi?? qua ????m',\n  one_day_price: 'Gi?? m???t ng??y',\n  booking_type: 'Lo???i ?????t ph??ng',\n  origin: 'G???c',\n  success: 'Th??nh c??ng',\n  createSuccess: 'T???o th??nh c??ng',\n  checkSuccess: 'Th??nh c??ng',\n  requireDirectDiscount: 'Nh???p gi?? sau khuy???n m??i',\n  start_date: 'Ng??y b???t ?????u',\n  end_date: 'Ng??y k???t th??c'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/room-type/extraFee.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/room-type/settingFS.js":
/*!**************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/room-type/settingFS.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  notification: 'Th???i gian g???i th??ng b??o Flash Sale',\n  flash_sale_threshold: 'H???n m???c chuy???n ?????i',\n  template: 'M???u ',\n  notification_title: 'Ti??u ????? th??ng b??o Flash Sale',\n  notification_content: 'N???i dung th??ng b??o Flash Sale',\n  success: 'Th??nh c??ng'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/room-type/settingFS.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/stamp.js":
/*!************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/stamp.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  hotelName: 'T??n kh??ch s???n',\n  stampsToRedeem: 'SL ????? ?????i th?????ng',\n  redeemValue: 'Gi?? tr??? ?????i th?????ng',\n  numberOfUsers: 'S??? ng?????i tham gia',\n  totalRedemption: 'S??? l???n ?????i th?????ng',\n  startDate: 'Ng??y b???t ?????u',\n  lastUpdate: 'Ng??y c???p nh???t cu???i',\n  status: 'Tr???ng th??i',\n  endDate: 'Ng??y k???t th??c',\n  operations: 'Thao t??c',\n  suspend: 'Ho??n',\n  available: 'Ho???t ?????ng',\n  ended: 'K???t th??c',\n  canEarnStamp: '???????c nh???n tem',\n  money: 'Gi???m ti???n',\n  percentage: 'Gi???m ph???n tr??m',\n  integrateWithFlashSale: 'K???t h???p v???i ph??ng gi???m s???c',\n  canRedeemForBooking: '?????i th?????ng v???i ?????t ph??ng',\n  nickName: 'Nickname',\n  mobile: 'S??? ??i???n tho???i',\n  effectiveStamps: 'S??? tem kh??? d???ng',\n  numberOfExpiredStamps: 'S??? tem h???t h???n',\n  startDateOfCollecting: 'Ng??y b???t ?????u thu th???p tem',\n  inputUserNicknameOrPhoneNumber: 'Nh???p t??n ho???c s??t kh??ch',\n  numberOfStamp: 'S??? tem',\n  // View Stamp\n  maxRedeem: 'Gi?? tr??? ?????i th?????ng',\n  numToRedeem: 'SL ????? ?????i th?????ng',\n  numUserJoin: 'S??? ng?????i tham gia',\n  totalRedeem: 'S??? l???n ?????i th?????ng',\n  numStampActive: 'S??? tem kh??? d???ng',\n  numStampExpire: 'S??? tem h???t h???n',\n  flashSaleEarn: 'K???t h???p v???i ph??ng gi???m s???c',\n  // validation\n  requiredHotelName: 'Vui l??ng ch???n kh??ch s???n',\n  requiredStartDate: 'Vui l??ng ch???n ng??y b???t ?????u'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/stamp.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/marketing/article.js":
/*!*****************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/marketing/article.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  send_mess: 'G???i tin nh???n',\n  apply_hotel: '??p d???ng cho',\n  hotel_list: 'Danh s??ch kh??ch s???n',\n  just_apply: 'Ch??? ??p d???ng',\n  edit: 'S???a',\n  delete: 'X??a',\n  send: 'G???i ??i',\n  title: 'Ti??u ?????',\n  home_page: 'Trang ch???',\n  create_staff: 'Nh??n vi??n kh???i t???o',\n  create_time: 'Th???i gian t???o',\n  last_update: 'C???p nh???t l???n cu???i',\n  summary: 'T??m t???t',\n  content: 'N???i dung',\n  display: 'Hi???n th???',\n  image: 'H??nh ???nh',\n  detail_article: 'Chi ti???t b??i b??o',\n  categoryName: 'T??n nh??m',\n  promotion: 'Khuy???n m??i',\n  notice: 'Quy ?????nh v?? ch??nh s??ch',\n  term_policy: 'Quy ?????nh v?? ch??nh s??ch',\n  notification: 'Th??ng b??o',\n  unread: 'Ch??a ?????c',\n  waiting: 'Ch??? duy???t',\n  displayed: '???? duy???t',\n  contracted: 'H???p ?????ng',\n  trial: 'D??ng th???',\n  terminated: 'D???ng h???p ?????ng',\n  suspended: 'Treo',\n  all_hotel: 'T???t c??? kh??ch s???n',\n  all_contracted: 'T???t c??? ks h???p ?????ng',\n  all_trial: 'T???t c??? ks d??ng th??? ',\n  yes: 'C??',\n  no: 'Kh??ng',\n  hashtag: 'Hash tag',\n  function: 'Ch???c n??ng',\n  requiredTitle: 'Vui l??ng nh???p ti??u ?????',\n  requiredSlug: 'Vui l??ng nh???p Slug',\n  requiredAuthor: 'Vui l??ng nh???p t??c gi???',\n  requiredCategory: 'Vui l??ng nh???p nh??m',\n  requiredImage: 'Vui l??ng upload h??nh ???nh',\n  requiredSummary: 'Vui l??ng nh???p t??m t???t',\n  requiredContent: 'Vui l??ng nh???p n???i dung',\n  requiredHashtag: 'Vui l??ng nh???p Hashtag',\n  requiredCategoryName: 'Vui l??ng nh???p t??n nh??m',\n  articleCategory: 'Nh??m b??i vi???t',\n  category: 'Nh??m',\n  displayType: 'Lo???i hi???n th???',\n  postingDate: 'Ng??y ????ng',\n  author: 'T??c gi???',\n  operations: 'Thao t??c',\n  schedulePosting: 'L???ch ????ng b??i vi???t',\n  numberOfArticle: 'S??? l?????ng b??i b??o',\n  addArticle: 'Th??m b??o b??o',\n  lastUpdate: 'C???p nh???t cu???i',\n  views: 'L?????t xem',\n  articleTitle: 'Ti??u ????? b??i b??o',\n  keyword: 'T??? kho??',\n  confirmDeleteCategory: 'B???n c?? ch???c b???n mu???n xo?? nh??m b??i b??o n??y?',\n  by: 'B???i',\n  schema: 'Schema'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/marketing/article.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/marketing/banner.js":
/*!****************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/marketing/banner.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  choose_display_in_app_web: 'Ch???n hi???n th??? tr??n App/Web',\n  title: 'Ti??u ?????',\n  image: 'H??nh ???nh',\n  linkedName: 'T??n li??n k???t',\n  totalClicks: 'T???ng l?????t click',\n  linkedType: 'Lo???i li??n k???t',\n  status: 'Tr???ng th??i',\n  operations: 'Thao t??c',\n  type: 'Lo???i li??n k???t',\n  listProvince: 'Khu v???c hi???n th???',\n  lastUpdate: 'C???p nh???t cu???i',\n  imagePath: 'H??nh ???nh',\n  targetType: 'Lo???i li??n k???t',\n  linkItem: 'Ph???n t??? li??n k???t',\n  display: 'Hi???n th???',\n  stopAt: 'Ng??y k???t th??c',\n  chooseProvince: 'Ch???n t???nh/th??nh ph???',\n  chooseDistrict: 'Ch???n qu???n/huy???n',\n  typesofdisplay: 'Lo???i hi???n th??? ',\n  random: 'Ng???u nhi??n',\n  custom: 'T??y ch???nh',\n  // Validation\n  requiredTitle: 'Vui l??ng nh???p ti??u ?????',\n  requiredTargetSn: 'Vui l??ng ch???n ph???n t??? li??n k???t',\n  requiredTargetInfo: 'Vui l??ng nh???p link li??n k???t',\n  requiredProvinceSelected: 'Vui l??ng ch???n T???nh/th??nh ph???'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/marketing/banner.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/marketing/crm/crm.js":
/*!*****************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/marketing/crm/crm.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  title: 'Ti??u ?????',\n  createTime: 'Th???i gian t???o',\n  lastUpdate: 'C???p nh???t cu???i',\n  status: 'T??nh tr???ng',\n  active: 'Ho???t ?????ng',\n  expired: 'H???t h???n',\n  //\n  equal: 'Equal',\n  greater: 'Greater',\n  greaterEqual: 'Greater Equal',\n  less: 'Less',\n  lessEqual: 'Less Equal',\n  notEqual: 'Not equal',\n  //\n  male: 'Nam',\n  female: 'N???',\n  //\n  empty: 'R???ng',\n  notEmpty: 'Kh??ng r???ng',\n  //\n  install: 'C??i ?????t',\n  uninstall: 'G??? c??i ?????t'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/marketing/crm/crm.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/marketing/inviteFriend.js":
/*!**********************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/marketing/inviteFriend.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  title: 'Ti??u ?????',\n  typeOfInvitation: 'Lo???i ??p d???ng',\n  dailyBudget: 'Ng??n s??ch h???ng ng??y',\n  inviteeAmount: 'Qu?? ng?????i ???????c m???i',\n  inviterAmount: 'Qu?? ng?????i m???i',\n  startEndDate: 'Ng??y b???t ?????u/K???t th??c',\n  createTime: 'Th???i gian t???o',\n  lastUpdate: 'C???p nh???t cu???i',\n  operations: 'Thao t??c',\n  unlimited: 'Kh??ng gi???i h???n',\n  account: 'T??i kho???n',\n  status: 'Tr???ng th??i',\n  inviteeInviter: 'Ng?????i ???????c m???i/ Ng?????i m???i',\n  createBy: '???????c t???o b???i',\n  via: 'Th??ng qua',\n  guidelinesVn: 'H?????ng d???n (VN)',\n  guidelinesEn: 'H?????ng d???n (EN)',\n  SMSContent: 'N???i dung SMS',\n  startDate: 'Ng??y b???t ?????u',\n  endDate: 'Ng??y k???t th??c',\n  nickName: 'Nick name',\n  mobile: 'Di ?????ng',\n  registerProvince: 'N???i ????ng k??',\n  loginBy: '????ng nh???p b???i',\n  registerTime: 'Ng??y ????ng k??',\n  openApp: 'M??? app',\n  totalInvitee: 'S??? ng?????i m???i',\n  stayAtHotelTime: 'Th???i gian ??? KS',\n  // validation\n  requiredTitle: 'Vui l??ng nh???p ti??u ?????',\n  requiredStartDate: 'Vui l??ng ch???n ng??y b???t ?????u',\n  requiredEndDate: 'Vui l??ng ch???n ng??y k???t th??c',\n  requiredGuidelinesVn: 'Vui l??ng nh???p h?????ng d???n (VN)',\n  requiredGuidelinesEn: 'Vui l??ng nh???p h?????ng d???n (EN)'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/marketing/inviteFriend.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/marketing/lucky-wheel.js":
/*!*********************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/marketing/lucky-wheel.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  coupon: 'Coupon',\n  content: 'N???i dung',\n  images: 'H??nh ???nh',\n  listCouponOneDayOrigin: 'S??? coupon tr??n 1 ng??y',\n  percentOrigin: 'Ph???n tr??m hi???n th???',\n  display: 'Hi???n th???',\n  createTime: 'Ng??y t???o',\n  lastUpdate: 'C???p nh???t l???n cu???i'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/marketing/lucky-wheel.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/marketing/notice.js":
/*!****************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/marketing/notice.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  title: 'Ti??u ?????',\n  homePage: 'Trang ch???',\n  createStaff: 'Nh??n vi??n kh???i t???o',\n  createTime: 'Th???i gian t???o',\n  lastUpdate: 'C???p nh???t l???n cu???i',\n  operations: 'Thao t??c',\n  onTop: 'Tr??n ?????u',\n  content: 'N???i dung chi ti???t',\n  // Validation\n  requiredTitle: 'Vui l??ng nh???p ti??u ?????',\n  requiredContent: 'Vui l??ng nh???p n???i dung'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/marketing/notice.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/marketing/notification.js":
/*!**********************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/marketing/notification.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  title: 'Ti??u ?????',\n  targetType: '?????i t?????ng',\n  createStaff: 'NV kh???i t???o',\n  sendTo: 'G???i ?????n',\n  totalSend: 'T???ng g???i ??i (Ios-Android)',\n  totalView: 'T???ng xem (Ios-Android)',\n  conversion: 'Chuy???n ?????i (Ios-Android)',\n  numSent: 'S??? l???n ???? g???i',\n  createTime: 'Th???i gian t???o',\n  sentTime: 'Th???i gian g???i',\n  status: 'Tr???ng th??i',\n  operations: 'Thao t??c',\n  type: 'Lo???i th??ng b??o',\n  subTitle: 'N???i dung ti??u ?????',\n  filterByLocation: 'L???c theo v??? tr??',\n  lastOpenApp: 'L???n cu???i m??? app',\n  rightNow: 'Ngay b??y gi???',\n  schedule: 'L???ch g???i',\n  content: 'N???i dung',\n  noticeType: 'Lo???i th??ng b??o',\n  titleIcon: 'Icon cho ti??u ?????',\n  PleaseChooseExcelFile: 'Vui l??ng ch???n excel(.xslx)',\n  ChooseArea: 'Ch???n khu v???c',\n  // Validation\n  requiredTitle: 'Vui l??ng nh???p ti??u ?????',\n  requiredTargetSn: 'Vui l??ng ch???n d???i t?????ng',\n  requiredSchedule: 'Vui l??ng ch???n l???ch g???i'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/marketing/notification.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/marketing/pgpb.js":
/*!**************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/marketing/pgpb.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'T??n',\n  mobile: '??i???n tho???i',\n  code: 'M??',\n  gender: 'Gi???i t??nh',\n  email: 'Email',\n  birthday: 'Sinh nh???t',\n  address: '?????a ch???',\n  totalOfIntroduction: 'T???ng ng?????i gi???i thi???u',\n  hotelName: 'T??n kh??ch s???n',\n  saleInfomation: 'Th??ng tin t??m ki???m',\n  operations: 'Thao t??c',\n  hotelEmployee: 'Nh??n vi??n kh??ch s???n',\n  totalPay: 'S??? ng?????i tr??? ti???n',\n  totalNotPay: 'S??? ng?????i kh??ng tr???',\n  nickName: 'Nick name',\n  loginBy: '????ng nh???p b???i',\n  registerTime: 'Th???i gian ????ng k??',\n  registerAddress: '?????a ch??? ????ng k??',\n  mobileId: 'Mobile ID',\n  os: 'Thi???t b???',\n  pay: 'Tr??? ti???n',\n  // Validation\n  requiredBirthday: 'Vui l??ng nh???p sinh nh???t',\n  requiredMobile: 'Vui l??ng nh???p s??? ??i???n tho???i',\n  requiredName: 'Vui l??ng nh???p t??n'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/marketing/pgpb.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/marketing/popup.js":
/*!***************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/marketing/popup.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  title: 'Ti??u ?????',\n  image: 'H??nh ???nh',\n  linkedName: 'T??n li??n k???t',\n  disableCondition: '??i???u ki???n ng??ng',\n  maxView: 'S??? l???n xem',\n  noViewLimit: 'kh??ng gi???i h???n',\n  totalOfViews: 'T???ng l?????t xem',\n  totalClicks: 'T???ng l?????t click',\n  linkedType: 'Lo???i li??n k???t',\n  status: 'Tr???ng th??i',\n  operations: 'Thao t??c',\n  type: 'Lo???i li??n k???t',\n  listProvince: 'Khu v???c hi???n th???',\n  lastUpdate: 'C???p nh???t cu???i',\n  imagePath: 'H??nh ???nh',\n  targetType: 'Lo???i li??n k???t',\n  linkItem: 'Ph???n t??? li??n k???t',\n  maxViewDisplay: 'S??? l???n xem / Hi???n th???',\n  stopAt: 'Ng??y k???t th??c',\n  chooseProvince: 'Ch???n t???nh/th??nh ph???',\n  chooseDistrict: 'Ch???n qu???n/huy???n',\n  typesofdisplay: 'Lo???i hi???n th??? ',\n  random: 'Ng???u nhi??n',\n  custom: 'T??y ch???nh',\n  both: 'C??? 2',\n  numOfDisplay: 'S??? l???n hi???n th???',\n  numOfCustomDisplay: 'S??? l?????ng t??y ch???nh',\n  perDecivePerDate: '/ m???i thi???t b??? / m???i ng??y',\n  noLimit: 'Kh??ng gi???i h???n',\n  content: 'N???i dung',\n  // Validation\n  requiredTitle: 'Vui l??ng nh???p ti??u ?????',\n  requiredTargetSn: 'Vui l??ng ch???n ph???n t??? li??n k???t',\n  requiredTargetInfo: 'Vui l??ng nh???p link li??n k???t',\n  requiredProvinceSelected: 'Vui l??ng ch???n T???nh/th??nh ph???'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/marketing/popup.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/marketing/promotion/coupon-condition.js":
/*!************************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/marketing/promotion/coupon-condition.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  conditionCoupon: '??i???u ki???n s??? d???ng coupon',\n  justUseCouponAt: 'Ch??? s??? d???ng coupon v??o',\n  justUseFor: 'C?? hi???u l???c',\n  hourly: 'Theo gi???',\n  overnight: 'Qua ????m',\n  daily: 'Nhi???u ng??y',\n  hotelMaxOneDay: 'KS t???i ??a m???t ng??y',\n  maxOneHotel: 'M???t kh??ch s???n',\n  noLimit: '0: Kh??ng gi???i h???n',\n  minBookingMoney: 'Ti???n ?????t ph??ng t???i thi???u',\n  paymentWhenUseCoupon: 'Ch??? d??ng coupon khi thanh to??n',\n  couponMemo: 'Ghi ch?? VI|EN',\n  apply: '??p d???ng',\n  issueCouponCondition: '??i???u ki???n t???ng coupon',\n  applyForUser: '??p d???ng cho ng?????i d??ng',\n  voucherCodeFor: 'M?? voucher d??nh cho',\n  contentOfValidation: 'N???i dung x??c nh???n VI|EN',\n  payHotel: 'Tr??? t???i KS',\n  applyToHotel: 'Kh??ch s???n c?? hi???u l???c',\n  applyAllHotel: 'T???t c??? kh??ch s???n',\n  applyAllHotelExcept: 'T???t c??? kh??ch s???n ng???ai tr???',\n  applyTodUser: 'Ng?????i d??ng c?? hi???u l???c',\n  applyAllUser: 'T???t c??? ng?????i d??ng',\n  applyAllUserExcept: 'T???t c??? ng?????i d??ng ng???ai tr???',\n  signUpPeriod: '????ng k?? trong kho???ng',\n  numCheckIn: 'SL check-in',\n  numCheckInKs: 'SL check-in ks',\n  payment: 'PT thanh to??n',\n  payInAdvance: 'Tr??? ti???n tr?????c',\n  bookingType: 'Lo???i ?????t ph??ng',\n  bookingTime: 'Gi??? ?????t ph??ng',\n  //\n  name: 'Coupon',\n  both: 'C??? hai',\n  notUse: 'Kh??ng s??? d???ng',\n  use: 'S??? d???ng',\n  //\n  momo: 'Momo',\n  credit: 'Th??? t??n d???ng (OnePay)',\n  debit: 'Th??? ghi n??? (OnePay)',\n  payoo: 'Pay@Store - Payoo',\n  zaloPay: 'ZaloPay',\n  creditCardVnpt: 'Th??? t??n d???ng (VNPT)',\n  atmCardVnpt: 'Th??? ATM (VNPT)',\n  shopeePay: 'ShopeePay',\n  creditCard: 'Credit card',\n  atmCard: 'ATM card',\n  //\n  onlyApply: 'Ch??? ??p d???ng',\n  conditionToUseCoupon: '??i???u ki???n s??? d???ng coupon: ',\n  maxCouponPerDay: 'L?????ng coupon t???i ??a 1 ng??y:',\n  maxCouponPerHotel: 'L?????ng coupon t???i ??a ??? KS:',\n  //\n  commonCode: 'M?? ph??? bi???n',\n  privateCode: 'M?? c?? nh??n'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/marketing/promotion/coupon-condition.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/marketing/promotion/create-promotion.js":
/*!************************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/marketing/promotion/create-promotion.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  title: 'Ti??u ?????',\n  code: 'M?? khuy???n m??i',\n  numOfCoupon: 'L?????ng coupon m???t l???n:',\n  maxNumOfCoupon: 'Coupon t???i ??a 1 ng?????i d??ng',\n  type: 'Lo???i',\n  coPromotion: 'Co-Promotion',\n  display: 'Hi???n th??? App',\n  callMaxDiscount: 'T??nh gi???m gi??',\n  discountAfterPromotion: 'Gi???m gi?? sau KM kh??c',\n  makePLabel: 'T???o nh??n P',\n  applyDirectDiscount: 'Gi???m tr???c ti???p',\n  displayHotel: 'Hi???n KS',\n  applyStartEnd: 'Th???i gian ??p d???ng',\n  daysFromIssueDate: 'Ng??y k??? t??? ng??y ph??t h??nh ',\n  couponStartEnd: 'Th???i h???n coupon',\n  discount: 'Gi???m gi??',\n  maxDiscount: 'Gi???m gi?? t???i ??a',\n  go2joyHotel: 'Gi???m gi?? c???a Go2Joy / Kh??ch s???n',\n  contentVi: 'N???i dung (Ti???ng vi???t)',\n  contentEn: 'N???i dung (Ti???ng anh)',\n  content2: 'N???i dung 2',\n  memo: 'Memo',\n  typeOfDisplay: 'C??c lo???i hi???n th???',\n  subContentVi: 'N???i dung ph???(Ti???ng Vi???t)',\n  subContentEn: 'N???i dung ph???(Ti???ng Anh)',\n  nameOfButton: 'T??n n??t(VI|EN)',\n  imageList: 'H??nh danh s??ch',\n  imageDetail: 'H??nh chi ti???t',\n  promotionGroup: 'Nh??m khuy???n m??i',\n  //\n  titleRequired: 'Tr?????ng ti??u ????? l?? b???t bu???c',\n  codeRequired: 'Tr?????ng m?? khuy???n m??i l?? b???t bu???c',\n  contentViRequired: 'Tr?????ng n???i dung (Ti???ng vi???t) l?? b???t bu???c',\n  contentEnRequired: 'Tr?????ng n???i dung (Ti???ng anh) l?? b???t bu???c',\n  content2Required: 'Tr?????ng N???i dung 2 l?? b???t bu???c',\n  memoRequired: 'Tr?????ng memo l?? b???t bu???c',\n  subContentViRequired: 'Tr?????ng n???i dung ph???(Ti???ng Vi???t) l?? b???t bu???c',\n  subContentEnRequired: 'Tr?????ng n???i dung ph???(Ti???ng Anh) l?? b???t bu???c',\n  nameOfButtonRequired: 'Tr?????ng T??n n??t(VI|EN) l?? b???t bu???c',\n  listImageRequired: 'Tr?????ng h??nh danh s??ch l?? b???t bu???c',\n  detailImageRequired: 'Tr?????ng h??nh chi ti???t l?? b???t bu???c'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/marketing/promotion/create-promotion.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/marketing/promotion/group-promotion.js":
/*!***********************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/marketing/promotion/group-promotion.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  groupName: 'T??n nh??m khuy???n m??i',\n  promotionList: 'Danh s??ch khuy???n m??i',\n  status: 'T??nh tr???ng',\n  lastUpdate: 'C???t nh???t cu???i',\n  displayArea: 'Khu v???c hi???n th???',\n  title: 'Ti??u ?????'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/marketing/promotion/group-promotion.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/marketing/promotion/issue-coupon-condition.js":
/*!******************************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/marketing/promotion/issue-coupon-condition.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: '??i???u ki???n t???ng coupon',\n  apply: '??p d???ng:',\n  couponMemo: 'Ghi ch?? coupon VI|EN',\n  contentOfValidation: 'N???i dung x??c nh???n VI|EN',\n  numCheckIn: 'SL check-in',\n  numCheckInKs: 'SL check-in ks',\n  importUserByExcel: 'Nh???p ng?????i d??ng excel file',\n  signUpPeriod: '????ng k?? trong kho???n',\n  memo: 'Ghi ch??'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/marketing/promotion/issue-coupon-condition.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/marketing/promotion/promotion.js":
/*!*****************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/marketing/promotion/promotion.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  promotionGroup: 'Nh??m khuy???n m??i',\n  //\n  title: 'Ti??u ?????',\n  code: 'M?? khuy???n m??i',\n  type: 'Lo???i',\n  discount: 'Gi???m gi??',\n  applyStartEnd: 'Th???i gian ??p d???ng',\n  couponStartEnd: 'Th???i h???n coupon',\n  status: 'T??nh tr???ng',\n  totalHotelApplied: 'T???ng kh??ch s???n ????ng k??',\n  totalUserApplied: 'T???ng ng?????i d??ng',\n  totalCouponApplied: 'T???ng coupon ???? ph??t h??nh',\n  total_consumed_applied: 'T???ng coupon ???? d??ng',\n  totalDiscount: 'T???ng gi???m gi??',\n  //\n  all: 'T???t c???',\n  apply: '??p d???ng',\n  event: 'S??? ki???n',\n  inviteFriend: 'M???i b???n',\n  gift: 'Qu?? t???ng',\n  booking: '?????t ph??ng',\n  reportNewHotel: 'B??o kh??ch s???n m???i',\n  signUp: '????ng k?? m???i',\n  birthday: 'Sinh nh???t',\n  payment: 'Thanh to??n',\n  voucherCode: 'M?? voucher',\n  //\n  discountMoney: 'Gi???m gi?? ti???n',\n  discountPercent: 'Gi???m gi?? %',\n  discountHours: 'Gi???m gi???',\n  samePrice: '?????ng gi??',\n  //\n  banner: 'Banner',\n  detail: 'Detail',\n  //\n  deleted: '???? x??a',\n  active: 'Ho???t ?????ng',\n  expired: 'H???t h???n',\n  not_yet: 'Ch??a ho???t ?????ng',\n  draft: 'L??u t???m',\n  wait_confirm: '?????i x??c nh???n',\n  //\n  name: 'T??n kh??ch s???n',\n  phone: '??i???n tho???i',\n  address: '?????a ch???',\n  createTime: 'Th???i gian t???o',\n  lastUpdate: 'C???p nh???t cu???i',\n  //\n  waiting: 'Ch??? duy???t',\n  displayed: '???? duy???t',\n  contracted: 'H???p ?????ng',\n  trial: 'D??ng th???',\n  terminated: 'D???ng h???p ?????ng',\n  suspended: 'Treo',\n  //\n  nickName: 'Nick name',\n  gender: 'Gi???i t??nh',\n  mobile: 'Di ?????ng',\n  applyTime: 'Apply Time',\n  hotelName: 'T??n kh??ch s???n',\n  stayAtHotelTime: 'Th???i gian ??? KS',\n  couponIssuedTime: 'Th???i gian coupon ph??t h??nh',\n  usedTime: 'Th???i gian s??? d???ng',\n  //\n  applied: '???? ??p d???ng',\n  hadCoupon: 'C?? coupon',\n  usedCoupon: '???? d??ng coupon',\n  //\n  go2joyDiscount: 'Gi???m gi?? Go2Joy',\n  hotelDiscount: 'Gi???m gi?? c???a KS',\n  sponsorDiscount: 'Gi???m gi?? c???a nh?? t??i tr???',\n  totalConsumedCoupon: 'T???ng coupon ???? d??ng',\n  totalGo2joyDiscount: 'T???ng gi???m gi?? c???a Go2Joy',\n  totalHotelDiscount: 'T???ng gi???m gi?? c???a kh??ch s???n',\n  totalSponsorDiscount: 'T???ng gi???m gi?? c???a nh?? t??i tr???',\n  maxCouponPerHotel: 'L?????ng coupon t???i ??a ??? KS',\n  numOfCoupon: 'L?????ng coupon m???t l???n',\n  maxNumOfCoupon: 'Coupon t???i ??a 1 ng?????i d??ng',\n  imageOfList: 'H??nh danh s??ch',\n  imageOfDetail: 'H??nh chi ti???t',\n  roomApplyList: 'Danh s??ch ph??ng ??p d???ng',\n  contentVi: 'N???i dung (Ti???ng vi???t)',\n  contentEn: 'N???i dung (Ti???ng anh)',\n  content2: 'Content2',\n  memo: 'Ghi ch??',\n  normalRoom: 'Ph??ng th?????ng',\n  //\n  applyAllHotel: 'T???t c??? kh??ch s???n',\n  applyAllHotelExcept: 'T???t c??? kh??ch s???n ng???ai tr???',\n  onlyApply: 'Ch??? ??p d???ng',\n  listHotel: 'Danh s??ch kh??ch s???n',\n  //\n  mobileSn: 'SN thi???t b???',\n  appUserSn: 'SN ng?????i d??ng',\n  os: 'Thi???t b???',\n  mobileRegisterTime: 'Ng??y c??i thi???t b???',\n  email: 'Email',\n  loginBy: '????ng nh???p b???i',\n  effectivePoint: '??i???m d??ng ???????c',\n  registerTime: 'Ng??y ????ng k??',\n  openApp: 'M??? app',\n  //\n  winner: 'Ng?????i th???ng',\n  waitingList: 'Danh s??ch ??ang duy???t',\n  userAppliedList: 'Danh s??ch ng?????i d??ng ???? apply',\n  couponContent: 'ng??y k??? t??? ng??y ph??t h??nh'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/marketing/promotion/promotion.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/marketing/sms.js":
/*!*************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/marketing/sms.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  sms_type: 'Lo???i Tin Nh???n',\n  sender: 'Ng?????i g???i',\n  content: 'N???i dung(ti???ng vi???t kh??ng d???u)',\n  create_staff: 'Nh??n vi??n t???o',\n  create_time: 'Th???i gian t???o',\n  send_to: 'G???i t???i',\n  num_of_sms: 'S??? l?????ng g???i',\n  total_price: 'T???ng ti???n(VND)',\n  send_schedule: 'L???ch g???i',\n  send_time: 'Th???i gian g???i',\n  email: 'Email',\n  account: 'T??i kho???n',\n  sender_type: 'Ng?????i g???i / Lo???i tin nh???n',\n  area: 'Khu v???c',\n  select_hotel: 'Ch???n kh??ch s???n',\n  hotel_list: 'Danh s??ch kh??ch s???n',\n  number_list: 'Danh s??ch s??? ??i???n tho???i',\n  key_search: 'T??? kh??a',\n  user_list: 'D??ch s??ch ng?????i d??ng',\n  please_choose: 'Vui l??ng ch???n excel file',\n  create: 'T???o',\n  back: 'Tr??? v???',\n  send: 'G???i',\n  go2joy: 'Go2Joy.vn',\n  phone: '0931.836.836',\n  random_number: 'S??? ng???u nhi??n',\n  custom_care: 'C.S.K.H',\n  marketing: 'Qu???ng c??o',\n  all: 'T???t c??? kh??ch s???n',\n  specific_area: 'Ch???n khu v???c',\n  specific_hotel: 'Ch???n kh??ch s???n',\n  specific_number: 'Ch???n s??? ??i???n tho???i',\n  specific_user: 'Ch???n ng?????i d??ng',\n  import_from_excel_file: 'Nh???p t??? file excel',\n  all_user: 'T???t c??? ng?????i d??ng',\n  excelFile: 'T???p tin excel',\n  importFile: 'Nh???p t???p tin',\n  hotelName: 'T??n kh??ch s???n'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/marketing/sms.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/mileage-point/MpBoosting.js":
/*!************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/mileage-point/MpBoosting.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  mileageName: 'T??n',\n  numberOfPoints: '??i???m',\n  period: 'Th???i h???n',\n  bookingType: 'Lo???i ?????t ph??ng',\n  applyDays: 'Ng??y hi???u l???c',\n  roomType: 'Lo???i ph??ng',\n  minFee: 'Ph?? t???i thi???u',\n  combinePromotion: 'Khuy???n m??i',\n  payment: 'Thanh to??n',\n  hotelName: 'T??n kh??ch s???n',\n  bookingNo: 'M?? ?????t ph??ng',\n  nickName: 'Nick name',\n  stayAtHotelTime: 'Th???i gian ??? KS',\n  amount: 'Gi?? tr???',\n  expireTime: 'H???t h???n',\n  CreateTime: 'Th???i gian t???o',\n  email: 'Email',\n  phone: 'Di ?????ng',\n  effectivePoint: '??i???m d??ng ???????c',\n  earnedPoint: '??i???m ki???m ???????c',\n  usedPoint: '??i???m ???? d??ng',\n  expiredPoint: '??i???m h???t h???n',\n  earnedFirstTime: 'Th???i gian ?????u ki???m ???????c',\n  type: 'Lo???i',\n  createTime: 'Th???i gian t???o',\n  monday: 'T.Hai',\n  tuesday: 'T.Ba',\n  wednesday: 'T.T??',\n  friday: 'T.N??m',\n  thursday: 'T.S??u',\n  saturday: 'T.B???y',\n  sunday: 'C.Nh???t',\n  hourly: 'Theo gi???',\n  overnight: 'Qua ????m',\n  daily: 'Nhi???u ng??y',\n  normal: 'Ph??ng th?????ng',\n  flashSale: 'Ph??ng gi???m s???c',\n  flashsaleRoom: 'Ph??ng gi???m s???c',\n  normalRoom: 'Ph??ng th?????ng',\n  yes: 'C??',\n  no: 'Kh??ng',\n  payAtHotel: 'T???i kh??ch s???n',\n  zaloCredit: 'Th??? credit',\n  zaloDebit: 'Th??? debit',\n  payAtStore: 'Pay@Store',\n  mileageDetailTitle: 'Chi Ti???t ??i???m Th?????ng',\n  hotelList: 'D.S.K.S',\n  allHotel: 'T???t c???',\n  allHotelReject: 'T???t c??? ngo???i tr???',\n  justApply: 'Ch??? ??p d???ng',\n  specifyProvince: 'Ch??? khu v???c',\n  hotel_name: 'T??n kh??ch s???n',\n  status: 'T??nh tr???ng',\n  address: '?????a ch???',\n  create_time: 'Th???i gian t???o',\n  last_update: 'C???p nh???t cu???i',\n  area_code: 'M?? t???nh',\n  ios_total_access: 'Ios m??? app',\n  android_total_access: 'Android m??? app',\n  waiting: 'Ch??? duy???t',\n  displayed: '???? duy???t',\n  contracted: 'H???p ?????ng',\n  trial: 'D??ng th???',\n  terminated: 'D???ng h???p ?????ng',\n  suspended: 'Treo',\n  'startDate/endDate': 'Ng??y b???t ?????u - Ng??y k???t th??c',\n  requiredName: 'Vui l??ng nh???p t??n ??i???m th?????ng',\n  requiredNumPoint: 'Vui l??ng nh???p ??i???m th?????ng',\n  requiredMinFee: 'Vui l??ng nh???p khuy???n m??i'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/mileage-point/MpBoosting.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/mileage-point/mileagePoint.js":
/*!**************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/mileage-point/mileagePoint.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  nickName: 'Nick name',\n  email: 'Email',\n  mobile: 'Di ?????ng',\n  effectivePoint: '??i???m d??ng ???????c',\n  earnedPoint: '??i???m ki???m ???????c',\n  usedPoint: '??i???m ???? d??ng',\n  expiredPoint: '??i???m h???t h???n',\n  earnedFirstTime: 'Th???i gian ?????u ki???m ???????c',\n  userdPoint: '??i???m ???? d??ng',\n  mileageName: 'T??n',\n  type: 'Lo???i',\n  hotelName: 'T??n kh??ch s???n',\n  bookingNo: 'M?? ?????t ph??ng',\n  numberOfPoints: '??i???m',\n  amount: 'Gi?? tr???',\n  expireTime: 'H???t h???n',\n  createTime: 'Th???i gian t???o',\n  get: 'Nh???n',\n  use: 'S??? d???ng',\n  expired: 'H???t h???n'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/mileage-point/mileagePoint.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/profile/profile.js":
/*!***************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/profile/profile.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  userID: 'User Id',\n  full_name: 'H??? t??n',\n  mobile: 'Di ?????ng',\n  address: '?????a ch???',\n  email: 'Email',\n  memo: 'Ghi ch??',\n  current_password: 'M???t kh???u hi???n h??nh',\n  new_password: 'M???t kh???u m???i',\n  confirm_new_password: 'X??c nh???n m???t kh???u m???i'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/profile/profile.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/sa-account/confirmGroup.js":
/*!***********************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/sa-account/confirmGroup.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  staffName: 'T??n nh??n vi??n',\n  roleName: 'Ph??n quy???n',\n  mobile: 'Di ?????ng',\n  enable: 'Ho???t ?????ng',\n  region: 'Khu v???c',\n  confirmPermission: 'Quy???n x??c nh???n',\n  createTime: 'Th???i gian t???o',\n  placeholder: 'Nh??n vi??n',\n  operations: 'Thao t??c',\n  level1: 'C???p duy???t 1',\n  level2: 'C???p duy???t 2'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/sa-account/confirmGroup.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/sa-account/permission.js":
/*!*********************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/sa-account/permission.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  roleName: 'T??n quy???n',\n  subSupperAdmin: 'Sub supper admin',\n  saleAdmin: 'Sale admin',\n  headOfMkt: 'Head of MKT',\n  accountant: 'Accountant',\n  saleFreelancer: 'Sale freelancer',\n  developer: 'Developer',\n  headOfBiz: 'Head of biz',\n  marketing: 'Marketing',\n  business: 'Business',\n  system: 'System',\n  functionName: 'Nh??m ch???c n??ng',\n  areaRestriction: 'H???n ch??? khu v???c',\n  view: 'Xem',\n  create: 'T???o',\n  modify: 'S???a',\n  delete: 'X??a',\n  export: 'Xu???t file',\n  special: '?????c quy???n'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/sa-account/permission.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/sa-account/saleIncentive.js":
/*!************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/sa-account/saleIncentive.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  staff_name: 'T??n nh??n vi??n',\n  role: 'Ph??n quy???n',\n  mobile: 'Di ?????ng',\n  enable: 'Ho???t ?????ng',\n  region: 'Khu v???c',\n  confirm_permission: 'Quy???n x??c nh???n',\n  create_time: 'Th???i gian t???o',\n  incentive_date: 'Ng??y Khuy???n kh??ch',\n  created_by: 'T???o b???i',\n  status: 'Tr???ng th??i',\n  created_time: 'Ng??y t???o',\n  confirmed_time: 'Ng??y x??c nh???n',\n  detail: 'Chi ti???t',\n  incentive: 'Khuy???n kh??ch',\n  pit: 'PIT',\n  income: 'Thu nh???p',\n  new_contract: 'Li??n h??? m???i',\n  stamp: 'Tem',\n  hotel_promotion: 'Khuy???n m??i ri??ng kh??ch s???n',\n  co_promotion: 'Khuy???n m??i',\n  new_hotel_checkin_amount: 'S??? l?????ng check-in kh??ch s???n',\n  confirm: 'X??c nh???n',\n  save: 'L??u',\n  category: 'Danh m???c',\n  province: 'N??i ????ng k??',\n  district: '?????a ch???',\n  hotel_name: 'T??n kh??ch s???n',\n  verified_date: 'Ng??y x??c nh???n',\n  contract_date: 'Ng??y h???p ?????ng',\n  contract_per: 'H???p ?????ng (%)',\n  program: 'Ch????ng tr??nh',\n  start_date_promotion: 'Ng??y b???t ?????u khuy???n m??i',\n  end_date_promotion: 'Ng??y k???t th??c khuy???n m??i',\n  start_date_stamp: 'Ng??y b???t ?????u tem',\n  new_contract_type: 'Lo???i h???p ?????ng m???i',\n  stage: 'Stage',\n  number_of_checkin_bookings: 'S??? l???n checkin ?????t ph??ng',\n  commission_of_checkin_amount: 'S??? l???n booking ???? nh???n',\n  success: 'X??c nh???n th??nh c??ng',\n  error: 'X??c nh???n th???t b???i',\n  full_name: 'H??? t??n',\n  user_id: 'User id',\n  email: 'Email',\n  delete: 'X??a',\n  create: 'Create',\n  edit: 'Th??m',\n  back: 'Quay l???i',\n  Address: '?????a ch???',\n  memo: 'Ghi ch??',\n  south: 'Mi???n Nam',\n  north: 'Mi???n B???c',\n  middle: 'Mi???n Trung',\n  action: 'H??nh ?????ng',\n  url: 'Url',\n  group_sn: 'M?? s??? ph???n t???',\n  param_information: 'Th??ng tin chi ti???t',\n  time_access: 'Th???i gian truy c???p',\n  address: '?????a ch???',\n  role_region: 'Ph??n v??ng',\n  password: 'M???t kh???u',\n  confirm_password: 'X??c nh???n m???t kh???u',\n  all_region: 'T???t c??? khu v???c',\n  view: 'Xem',\n  all_types: 'T???t c???',\n  transfer_booking: 'Chuy???n ?????i ?????t ph??ng',\n  transfer: 'Chuy???n ?????i',\n  promotion: 'Khuy???n m??i',\n  invite_friend: 'M???i b???n',\n  product: 'S???n ph???m KS',\n  level1: 'C???p duy???t 1',\n  level2: 'C???p duy???t 2',\n  update: 'S???a',\n  special: '?????c quy???n',\n  view_detail: 'Xem chi ti???t',\n  filter_action12: 'Hotel Mgt / Qu???n L?? Kh??ch S???n',\n  filter_action13: 'Room Type Mgt / Qu???n L?? Lo???i Ph??ng',\n  filter_action14: 'Staff Mgt / Qu??n L?? Nh??n Vi??n',\n  filter_action15: 'Facilities Mgt / Qu???n L?? Ti???n ??ch',\n  filter_action16: 'User Mgt / Qu???n L?? Ng?????i D??ng',\n  filter_action17: 'App Notice Mgt / Qu???n L?? Tin Nh???n',\n  filter_action18: 'Q&A Mgt / Qu???n L?? Q&A',\n  filter_action19: 'FAQ Mgt / Qu???n L?? FAQ',\n  filter_action20: 'Promotion Mgt / Qu???n L?? Khuy???n M??i',\n  filter_action21: 'Booking Mgt /Qu???n L?? ?????t Ph??ng',\n  filter_action22: 'Booking Report Mgt / B??o C??o ?????t Ph??ng',\n  filter_action23: 'PG Mgt / Qu???n L?? Ti???p Th???',\n  filter_action24: 'Banner Mgt /Qu???n L?? Banner',\n  filter_action25: 'Popup Mgt / Qu???n L?? Popup',\n  filter_action26: 'Service Agreement Mgt / Qu???n L?? Ch??nh S??ch',\n  filter_action27: 'Review Mgt / Qu???n L?? B??nh Lu???n',\n  filter_action28: 'Notification Mgt /Qu???n L?? Th??ng B??o',\n  filter_action29: 'Setting Mgt / Thi???t L???p',\n  filter_action30: 'Log Mgt / Qu???n L?? Log',\n  filter_action31: 'Permission Mgt / Ph??n Quy???n',\n  filter_action32: 'Profile Mgt / H??? S??',\n  filter_action34: 'SMS Mgt / Qu???n L?? SMS',\n  filter_action35: 'Super Staff Mgt/Qu???n L?? NV Go2Joy ',\n  filter_action37: 'Stamp Mgt/ Qu???n L?? Stamp',\n  filter_action38: 'CRM Management/ Ch??m S??c Kh??ch H??ng',\n  filter_action39: 'Mileage Point Mgt/ Qu???n L?? ??i???m Th?????ng',\n  filter_action40: 'Hotel Group Mgt/ Qu???n L?? Nh??m KS',\n  filter_action41: 'Home Mgt/ Qu???n L?? Home Page',\n  filter_action42: 'Mkt Tracking Mgt/ Th???ng K?? D??? Li???u',\n  filter_action43: 'Activities / Vi???c C???a T??i',\n  filter_action44: 'Invite Friend / M???i b???n',\n  filter_action45: 'Confirm Group/ Nh??m X??c Nh???n',\n  filter_action47: 'SA Hotel Product type/ Qu???n L?? Lo???i S???n Ph???m',\n  filter_action48: 'SA Hotel Debt/ Qu???n L?? N??? KS',\n  filter_action49: 'Open Second Splash Mgt / Qu???n l?? M??n h??nh ch??? 2',\n  filter_action50: 'SA Hotel On Top/ Qu???n l?? Hotel On Top',\n  filter_action51: 'SA Sale Incentive History Mgt/ Qu???n L?? L???ch S??? Hoa H???ng',\n  details: 'Chi ti???t',\n  function: 'Nh??m ch???c n??ng'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/sa-account/saleIncentive.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/sa-account/staffs.js":
/*!*****************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/sa-account/staffs.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  fullName: 'H??? t??n',\n  userId: 'User id',\n  inputUserId: 'Nh???p user id',\n  role: 'Ph??n quy???n',\n  mobile: 'Di ?????ng',\n  email: 'Email',\n  region: 'Khu v???c',\n  enable: 'Ho???t ?????ng',\n  operations: 'Thao t??c',\n  allRegion: 'T???t c??? khu v???c',\n  south: 'Mi???n Nam',\n  north: 'Mi???n B???c',\n  middle: 'Mi???n Trung',\n  confirm: 'X??c nh???n',\n  view: 'Xem',\n  address: '?????a ch???',\n  memo: 'Ghi ch??',\n  password: 'M???t kh???u',\n  confirmPassword: 'X??c nh???n m???t kh???u',\n  incorrectEmail: 'Vui l??ng nh???p ????ng ?????a ch??? Email',\n  requiredEmail: 'Vui l??ng nh???p Email',\n  requiredFullName: 'Vui l??ng nh???p H??? t??n',\n  requiredUserId: 'Vui l??ng nh???p User id',\n  requiredRole: 'Vui l??ng ch???n Ph??n quy???n',\n  requiredAddress: 'Vui l??ng nh???p ?????a ch???',\n  requiredMobile: 'Vui l??ng nh???p s??? ??i???n tho???i',\n  requiredPassword: 'Vui l??ng nh???p m???t kh???u',\n  requiredConfirmPassword: 'Vui l??ng nh???p x??c nh???n m???t kh???u',\n  confirmMatch: 'M???t kh???u m???i v?? x??c nh???n m???t kh???u kh??ng kh???p',\n  notMobile: 'S??? b???n nh???p kh??ng ch??nh x??c'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/sa-account/staffs.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/service-agreement/service-agreement.js":
/*!***********************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/service-agreement/service-agreement.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  update_private_policy: 'Ch???nh s???a Ch??nh s??ch ho???t ?????ng',\n  update_service_agreement: 'Ch???nh s???a Th???a thu???n d???ch v???',\n  update_mileage_point: 'Ch???nh s???a t??ch ??i???m',\n  update_payment_policy: 'Ch???nh s???a ??i???u kho???n thanh to??n',\n  private_policy: 'Ch??nh s??ch b???o m???t th??ng tin',\n  service_agreement: '??i???u kho???n s??? d???ng v?? quy ch??? ho???t ?????ng',\n  mileage_point: 'T??ch ??i???m',\n  payment_policy: '??i???u kho???n thanh to??n'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/service-agreement/service-agreement.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/settings/settings.js":
/*!*****************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/settings/settings.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  updateSetting: 'C???p nh???t thi???t l???p',\n  changeNewAfter: '?????i kh??ch s???n t??? \\'M???i\\' ?????n \\'B??nh th?????ng\\' sau',\n  blockBookingFrom: 'Ch???n booking sau',\n  lastVersion: 'Phi??n b???n GO2JOY cu???i',\n  partnerLastVersion: 'Phi??n b???n GO2JOY PARTNER cu???i',\n  cineJoyLastVersion: 'Phi??n b???n CineJoy cu???i',\n  refreshCacheData: 'L??m m???i d??? li???u cache',\n  refresh: 'L??m m???i d??? li???u cache',\n  days: 'Ng??y',\n  openSecondSplash: 'TL m??n h??nh ch??? 2',\n  title: 'Ti??u ?????',\n  province: 'T???nh/TP',\n  district: 'Qu???n/Huy???n',\n  linked_name: 'T??n li??n k???t',\n  linked_type: 'Lo???i li??n k???t',\n  start_date: 'Ng??y b???t ?????u',\n  end_date: 'Ng??y k???t th??c',\n  background_color: 'M??u n???n',\n  image: 'H??nh ???nh',\n  create_time: 'Ng??y t???o',\n  create_by: 'Ng?????i t???o',\n  status: 'Tr???ng th??i',\n  hotel: 'Kh??ch s???n',\n  promotion_event: 'Khuy???n m??i/S??? ki???n',\n  notice: 'Th??ng b??o',\n  direct_discount: 'Gi???m gi??',\n  promotion_group: 'Nh??m khuy???n m??i',\n  amenity_pack: 'G??i ti???n ??ch',\n  link: 'Link li??n k???t',\n  mileage_point: 'T??ch ??i???m',\n  all: 'T???t c???',\n  expired: 'H???t h???n',\n  active: 'Ho???t ?????ng',\n  will_active: 'S??? ho???t ?????ng',\n  pending: '??ang x??? l??',\n  operations: 'Thao t??c',\n  location: 'V??? tr??',\n  link_item: 'Ph???n t??? li??n k???t',\n  display_second_splash: 'Hi???n th??? 2nd splash',\n  image_background: 'H??nh ???nh n???n',\n  width: 'Chi???u r???ng',\n  height: 'Chi???u cao',\n  hashtag: 'Hash tag',\n  kindOfHotelOnTop: 'Lo???i TOP kh??ch s???n',\n  collection: 'B??? s??u t???p',\n  hotelOnTopDetails: 'Danh s??ch TOP kh??ch s???n',\n  staffName: 'Ng?????i t???o',\n  hotelOnTopByDistrict: 'Theo Qu???n huy???n',\n  hotelOnTopByDashtag: 'Theo Hashtag',\n  hotelOnTopByCollection: 'Theo B??? s??u t???p',\n  bySearching: 'Theo T??m Ki???m',\n  typeTop: 'Lo???i TOP kh??ch s???n',\n  topHotel: 'TOP kh??ch s???n',\n  requireStartDate: 'Vui l??ng nh???p ng??y b???t ?????u',\n  requireEndDate: 'Vui l??ng nh???p ng??y k???t th??c',\n  requireTitle: 'Vui l??ng nh???p ti??u ?????',\n  requireHashtag: 'Vui l??ng ch???n hashtag',\n  hotelName: 'T??n kh??ch s???n',\n  address: '?????a ch???',\n  collectionList: 'Danh s??ch b??? si??u t???p',\n  requiredPromotions: 'Vui l??ng nh???p Khuy???n m??i',\n  requiredNotice: 'Vui l??ng nh???p Th??ng b??o',\n  requiredHotel: 'Vui l??ng nh???p Kh??ch s???n',\n  requiredPromotionsGroup: 'Vui l??ng nh???p Nh??m khuy???n m??i',\n  requiredDistrict: 'Vui l??ng nh???p Qu???n/Huy???n',\n  requireStartEndDate: 'Vui l??ng nh???p ng??y b???t ?????u & ng??y k???t th??c'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/settings/settings.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/tracking/bookingTracking.js":
/*!************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/tracking/bookingTracking.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  region: 'V??NG MI???N',\n  total: 'T???NG C???NG',\n  start_date: 'Ng??y b???t ?????u',\n  end_date: 'Ng??y k???t th??c',\n  total1234: 'T???ng c???ng(1)+(2)+(3)+(4)',\n  accumulation: 'T??ch l??y',\n  actual_amount: 'Th???c c??',\n  waiting: 'Ch??? duy???t(1)',\n  contracted: 'H???p ?????ng(2)',\n  suspended: 'Treo(3)',\n  terminated: 'D???ng h???p ?????ng (4)',\n  displayed: '???? duy???t',\n  trial: 'D??ng th???',\n  datefrom: 'T??? ng??y',\n  to: '?????n',\n  hotel_name: 'T??n kh??ch s???n',\n  number_of_signup: 'S??? l?????ng ????ng k??',\n  checkin_by_register: 'Checkin b???ng ????ng k??',\n  daily_average: 'Trung b??nh ng??y',\n  previous_month_average: 'Trung b??nh th??ng tr?????c',\n  average: 'Trung b??nh n??m',\n  dateFrom: 'T??? ng??y'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/tracking/bookingTracking.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/tracking/hotelIntroduceSignup.js":
/*!*****************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/tracking/hotelIntroduceSignup.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  datefrom: 'T??? ng??y',\n  to: '?????n',\n  hotel_name: 'T??n kh??ch s???n',\n  number_of_signup: 'S??? l?????ng ????ng k??',\n  checkin_by_register: 'Checkin b???ng ????ng k??',\n  nickname: 'Nick name',\n  gender: 'Gi???i t??nh',\n  birthday: 'Sinh nh???t',\n  email: 'Email',\n  mobile: 'Di ?????ng',\n  register_province: 'N??i ????ng k??',\n  login_by: '????ng nh???p b???i',\n  effective_point: '??i???m d??ng ???????c',\n  register_time: 'Ng??y ????ng k??',\n  open_app: 'M??? app',\n  via: '????ng nh???p b???ng',\n  last_open_app: 'M??? app l???n cu???i',\n  status: 'T??nh tr???ng',\n  hotel_invite_code: 'M?? m???i KS',\n  booking_no: 'M?? s??? ?????t ph??ng',\n  room_type: 'Lo???i ph??ng',\n  coupon: 'Coupon',\n  type: 'Lo???i',\n  booking_time: 'Ng??y ?????t ph??ng',\n  stay_at_hotel_time: 'Th???i gian ??? KS',\n  check_in_time: 'Th???i gian nh???n ph??ng',\n  booking_status: 'T??nh tr???ng ?????t ph??ng',\n  total_amount: 'T???ng tr?????c khuy???n m??i',\n  user_pay: 'Kh??ch thanh to??n',\n  paid_in_advance: '???? thanh to??n',\n  refund: 'Ho??n ti???n'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/tracking/hotelIntroduceSignup.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/tracking/hotelStatusTracking.js":
/*!****************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/tracking/hotelStatusTracking.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  region: 'V??NG MI???N',\n  total: 'T???NG C???NG',\n  start_date: 'Ng??y b???t ?????u',\n  end_date: 'Ng??y k???t th??c',\n  total1234: 'T???ng c???ng(1)+(2)+(3)+(4)',\n  accumulation: 'T??ch l??y',\n  actual_amount: 'Th???c c??',\n  waiting: 'Ch??? duy???t(1)',\n  contracted: 'H???p ?????ng(2)',\n  suspended: 'Treo(3)',\n  terminated: 'D???ng h???p ?????ng (4)',\n  displayed: '???? duy???t',\n  trial: 'D??ng th???',\n  datefrom: 'T??? ng??y',\n  to: '?????n',\n  hotel_name: 'T??n kh??ch s???n',\n  number_of_signup: 'S??? l?????ng ????ng k??',\n  checkin_by_register: 'Checkin b???ng ????ng k??',\n  dateFrom: 'T??? ng??y',\n  startDate: 'Ng??y b???t ?????u',\n  endDate: 'Ng??y k???t th??c'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/tracking/hotelStatusTracking.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/users/counseling/counselingMgt.js":
/*!******************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/users/counseling/counselingMgt.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  scope: 'Ph???m vi',\n  title: 'Ti??u ?????',\n  nickname: 'Bi???t danh',\n  create_time: 'Th???i gian t???o',\n  last_update: 'C???p nh???t l???n cu???i',\n  unread: 'Ch??a tr??? l???i'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/users/counseling/counselingMgt.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/users/counseling/createCounselingMgt.js":
/*!************************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/users/counseling/createCounselingMgt.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  title: 'Ti??u ?????',\n  content: 'N???i dung',\n  sendUser: 'G???i ng?????i d??ng',\n  placeholderUser: 'T???i ng?????i d??ng',\n  placeholderScope: 'Ph???m vi',\n  scope: 'Ph???m vi',\n  requireTitle: 'Ti??u ????? l?? b???t vu???c',\n  requireContent: 'N???i dung l?? b???t vu???c',\n  requireUserApp: 'G???i ng?????i d??ng l?? b???t vu???c',\n  requireScope: 'Ph???m vi l?? b???t vu???c'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/users/counseling/createCounselingMgt.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/users/counseling/replyCounselingMgt.js":
/*!***********************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/users/counseling/replyCounselingMgt.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  nickname: 'Bi???t danh',\n  user_id: 'User id',\n  birthday: 'Sinh nh???t',\n  email: 'Email',\n  gender: 'Gi???i t??nh',\n  mobile: '??i???n tho???i',\n  address: '?????a ch???',\n  member_id: 'M?? th??nh vi??n',\n  login_by: '????ng nh???p b???i',\n  res_time: 'Ng??y ????ng k??',\n  last_open_app: 'L???n cu???i m??? app',\n  last_update: 'L???n cu???i c???p nh???t',\n  device_code: 'M?? thi???t b???',\n  status: 'Tr???ng th??i',\n  content: 'N???i Dung Q&A'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/users/counseling/replyCounselingMgt.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/users/deviceMgt.js":
/*!***************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/users/deviceMgt.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  mobile_user_id: 'M?? thi???t b???',\n  app_user_nickName: '??ang ????ng nh???p',\n  first_app_user_nickName: '????ng k?? ?????u ti??n',\n  device_code: 'Thi???t b???',\n  push_notification: 'Th??ng b??o',\n  last_open_app: 'L???n cu???i m??? app',\n  app_version: 'Phi??n b???n',\n  install: 'C??i ?????t',\n  register_province: 'N??i ????ng k??',\n  res_time: 'Ng??y ????ng k??',\n  last_update: '????ng nh???p l???n cu???i',\n  source: 'Ngu???n'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/users/deviceMgt.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/users/firstBooking.js":
/*!******************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/users/firstBooking.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  nickName: 'T??i kho???n',\n  mobile: 'S??? ??i???n tho???i',\n  registerProvince: 'N??i ????ng k??',\n  bookingNo: 'M?? ?????t ph??ng',\n  hotel: 'Kh??ch s???n',\n  lastUpdate: 'C???p nh???t cu???i',\n  totalWillCall: 'T???ng s??? s??? g???i',\n  totalCalled: 'T???ng s??? ???? g???i',\n  done: '???? g???i',\n  ok: 'OK',\n  cancel: 'H???y',\n  phoneNumber: 'S??? ??i???n tho???i',\n  operations: 'Thao t??c',\n  keyword: 'T??? kho??',\n  startDate: 'Ng??y b???t ?????u',\n  endDate: 'Ng??y k???t th??c',\n  viewBookingDetail: 'Xem chi ti???t b??o c??o ?????t ph??ng',\n  userInfo: 'Th??ng tin kh??ch',\n  roomTypeName: 'Lo???i ph??ng',\n  coupon: 'Coupon',\n  stayAtHotelTime: 'Th???i gian ??? KS',\n  bookingStatus: 'T??nh tr???ng ?????t ph??ng',\n  roomAmount: 'Gi?? ph??ng',\n  productAmount: 'Gi?? s???n ph???m',\n  totalAmount: 'T???ng tr?????c khuy???n m??i',\n  g2jDiscount: 'Khuy???n m??i G2j',\n  hotelDiscount: 'Kh??ch s???n gi???m gi??',\n  amountFromUser: 'Kh??ch thanh to??n',\n  prepayAmount: '???? thanh to??n',\n  extraFee: 'Ph??? th???',\n  mileagePoint: 'Gi???m ??i???m',\n  otherDiscount: 'Gi???m gi?? kh??c',\n  flashSale: 'Gi???m s???c',\n  redeemStamp: 'S??? d???ng tem',\n  directDiscount: 'Gi???m tr???c ti???p',\n  hours: 'Gi???',\n  overnight: 'Qua ????m',\n  daily: 'Theo ng??y',\n  samePrice: '?????ng gi??',\n  confirmed: 'Ch??a nh???n',\n  checkIn: '???? nh???n',\n  noShow: 'kh??ng nh???n ph??ng',\n  noShowL: 'kh??ng nh???n ph??ng L',\n  source: 'Ngu???n',\n  messageWarning: 'C???nh b??o',\n  messageAlert: 'B???n c?? ch???c?'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/users/firstBooking.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/users/userMgt.js":
/*!*************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/users/userMgt.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  provinceName: 'T???nh/Th??nh ph???',\n  districtName: 'Qu???n/Huy???n',\n  totalHotel: 'SL kh??ch s???n',\n  totalContracted: 'SL h???p ?????ng kh??ch s???n',\n  lastUpdate: 'C???p nh???t cu???i',\n  name: 'T??n kh??ch s???n',\n  phone: '??i???n tho???i',\n  address: '?????a ch???',\n  totalReview: 'T???ng nh???n x??t',\n  totalFavorite: 'S??? l?????ng y??u th??ch',\n  averageMark: '??i???m trung b??nh',\n  bookingNo: 'M?? s??? ?????t',\n  hotelName: 'T??n kh??ch s???n',\n  roomTypeName: 'Lo???i ph??ng',\n  couponName: 'Coupon',\n  type: 'Lo???i',\n  createTime: 'Ng??y ?????t',\n  checkInDatePlan: 'Th???i gian ??? KS',\n  checkInTime: 'Th???i ??i???m nh???n',\n  usedTime: 'Th???i ??i???m s??? d???ng',\n  bookingStatus: 'Tr???ng th??i ?????t',\n  totalAmount: 'T???ng tr?????c khuy???n m??i',\n  amountFromUser: 'Kh??ch thanh to??n',\n  prepayAmount: '???? thanh to??n',\n  refunded: 'Ho??n ti???n',\n  promotionName: 'Coupon',\n  discount: 'Gi?? tr???',\n  issueTime: 'Th???i gian ph??t h??nh',\n  effectTime: 'Ng??y c?? hi???u l???c',\n  used: 'Tr???ng th??i',\n  statusUsed: '???? d??ng',\n  numStampActiveRedeem: 'S??? tem hi???n c?? / SL ????? ?????i th?????ng',\n  numStampExpire: 'S??? tem h???t h???n',\n  totalRedeem: 'S??? l???n ?????i th?????ng',\n  startJoinTime: 'Ng??y b???t ?????u thu th???p tem',\n  nickName: 'Nickname',\n  gender: 'Gi???i t??nh',\n  birthday: 'Sinh nh???t',\n  email: 'Email',\n  mobile: 'Di ?????ng',\n  firstProvinceName: 'N??i ????ng k??',\n  viaApp: '????ng nh???p b???i',\n  point: '??i???m d??ng ???????c',\n  resgister_time: 'Ng??y ????ng k??',\n  numOpenApp: 'M??? app',\n  last_op_app: 'M??? app l???n cu???i',\n  status: 'Tr???ng th??i',\n  operations: 'Thao t??c',\n  source: 'Ngu???n',\n  unread: 'Ch??a tr??? l???i',\n  male: 'Nam',\n  female: 'N???',\n  keyword: 'T??? kho??',\n  startDate: 'Ng??y b???t ?????u',\n  endDate: 'Ng??y k???t th??c',\n  rangeSeparator: '?????n',\n  gender_none: 'Kh??ng x??c ?????nh',\n  yes: 'Ho???t ?????ng',\n  no: 'None',\n  disable: 'V?? hi???u',\n  loging: '??ang ????ng nh???p',\n  logouted: '???? ????ng xu???t',\n  not_yet: 'V???n ch??a',\n  expired: 'H???t h???n',\n  reserved: '?????t ph??ng',\n  check_in: 'Nh???n ph??ng',\n  cancel: 'H???y b???',\n  no_show: 'Kh??ng nh???n ph??ng',\n  hours: 'Gi???',\n  overnight: 'Qua ????m',\n  daily: 'Nhi???u ng??y',\n  static: 'T???ng s??? accounts',\n  mobile_devices: 'T???ng thi???t b??? c??i ?????t',\n  mobile_devices_open: 'T???ng thi???t b??? m???',\n  delete: 'X??a',\n  edit: 'S???a',\n  back: 'Quay l???i',\n  save: 'L??u',\n  open: 'M???',\n  user_id: 'User id',\n  password: 'M???t kh???u',\n  re_password: 'X??c nh???n m???t kh???u',\n  success: 'C???p nh???t th??nh c??ng',\n  update_error: 'C???p nh???t th???t b???i',\n  confirm_password: 'X??c nh???n m???t kh???u kh??ng gi???ng nhau',\n  donate_success: 'Donate th??nh c??ng',\n  create_success: 'T???o th??nh c??ng',\n  favorite_area: 'Khu v???c ??a th??ch',\n  favorite_hotel: 'Kh??ch s???n ??a th??ch',\n  booking_history: 'L???ch s??? ?????t ph??ng',\n  coupon: 'Danh s??ch coupon',\n  stamp: 'Danh s??ch tem',\n  member_id: 'M?? th??nh vi??n',\n  lastOpenApp: 'L???n cu???i m??? app',\n  mobileDevice: 'Thi???t b??? ????ng nh???p',\n  open_app_last: 'M??? app l???n cu???i',\n  lastOpenAddress: 'L???n cu???i m??? app',\n  first_signup: 'First signup',\n  os: 'OS',\n  notification: 'Notification',\n  version: 'Version',\n  registerTime: 'Ng??y ????ng k??',\n  user_login: 'User login',\n  login: 'Tr???ng th??i',\n  mobile_user_id: 'Mobile user id',\n  language: 'Language',\n  install: 'Install',\n  public: 'C??ng khai',\n  private: 'Ri??ng t??',\n  export_success: 'Xu???t t???p th??nh c??ng',\n  requireNickname: 'Vui l??ng nh???p Nickname',\n  requireEmail: 'Vui l??ng nh???p Email',\n  requireMobile: 'Vui l??ng nh???p s??? ??i???n tho???i',\n  requireBirthday: 'Vui l??ng nh???p ng??y sinh',\n  requireAddress: 'Vui l??ng nh???p ?????a ch???',\n  editSuccess: 'C???p nh???t th??nh c??ng',\n  requirePass: 'Vui l??ng nh???p m???t kh???u',\n  requirePassConfirm: 'Vui l??ng x??c nh??n m???t kh???u',\n  validatePassConfirm: 'X??c nh???n m???t kh???u kh??ng gi???ng nhau',\n  userId: 'User Id',\n  memberId: 'M?? th??nh vi??n',\n  creditCard: 'Th??? Credit',\n  debitCard: 'Th??? debit',\n  deleteSuccess: 'Xo?? th??nh c??ng',\n  messageAlert: 'B???n c?? ch???c?',\n  messageWarning: 'C???nh b??o'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/users/userMgt.js?");

/***/ }),

/***/ "./src/plugins/i18n/vn-file.js":
/*!*************************************!*\
  !*** ./src/plugins/i18n/vn-file.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _language_vn_general_breadcrumb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./language/vn/general/breadcrumb */ \"./src/plugins/i18n/language/vn/general/breadcrumb.js\");\n/* harmony import */ var _language_vn_general_day_of_week__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./language/vn/general/day-of-week */ \"./src/plugins/i18n/language/vn/general/day-of-week.js\");\n/* harmony import */ var _language_vn_general_placeholder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./language/vn/general/placeholder */ \"./src/plugins/i18n/language/vn/general/placeholder.js\");\n/* harmony import */ var _language_en_general_validation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./language/en/general/validation */ \"./src/plugins/i18n/language/en/general/validation.js\");\n/* harmony import */ var _language_vn_general_option__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./language/vn/general/option */ \"./src/plugins/i18n/language/vn/general/option.js\");\n/* harmony import */ var _language_vn_general_option_gender__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./language/vn/general/option/gender */ \"./src/plugins/i18n/language/vn/general/option/gender.js\");\n/* harmony import */ var _language_vn_general_option_status__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./language/vn/general/option/status */ \"./src/plugins/i18n/language/vn/general/option/status.js\");\n/* harmony import */ var _language_vn_general_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./language/vn/general/button */ \"./src/plugins/i18n/language/vn/general/button.js\");\n/* harmony import */ var _language_vn_general_message__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./language/vn/general/message */ \"./src/plugins/i18n/language/vn/general/message.js\");\n/* harmony import */ var _language_vn_general_payment__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./language/vn/general/payment */ \"./src/plugins/i18n/language/vn/general/payment.js\");\n\n\n\n\n\n\n\n\n\n\nfunction loadLocaleMessages() {\n  var files = __webpack_require__(\"./src/plugins/i18n/language/vn/pages sync recursive \\\\.js$\");\n  var messages = {};\n  files.keys().forEach(function (key) {\n    var matched = key.match(/([A-Za-z0-9-_]+)\\./i);\n    if (matched && matched.length > 1) {\n      var locale = matched[1];\n      messages[locale] = files(key).default;\n    }\n  });\n  return messages;\n}\nvar page = loadLocaleMessages();\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  lang: 'vi',\n  omitZeroMinute: 'false',\n  search: 'T??m ki???m',\n  hours: 'Theo Gi???',\n  overnight: 'Qua ????m',\n  daily: 'Theo Ng??y',\n  additional: 'Gi??? th??m',\n  breadcrumb: _language_vn_general_breadcrumb__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  placeholder: _language_vn_general_placeholder__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n  validation: _language_en_general_validation__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n  payment: _language_vn_general_payment__WEBPACK_IMPORTED_MODULE_9__[\"default\"],\n  page: page,\n  option: _language_vn_general_option__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n  gender: _language_vn_general_option_gender__WEBPACK_IMPORTED_MODULE_5__[\"default\"],\n  status: _language_vn_general_option_status__WEBPACK_IMPORTED_MODULE_6__[\"default\"],\n  button: _language_vn_general_button__WEBPACK_IMPORTED_MODULE_7__[\"default\"],\n  message: _language_vn_general_message__WEBPACK_IMPORTED_MODULE_8__[\"default\"],\n  daysOfWeek: _language_vn_general_day_of_week__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  no_data: 'Kh??ng c?? d??? li???u',\n  loading: 'L???y d??? li???u'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/vn-file.js?");

/***/ }),

/***/ "./src/plugins/index.js":
/*!******************************!*\
  !*** ./src/plugins/index.js ***!
  \******************************/
/*! exports provided: i18n */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _element_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element-ui */ \"./src/plugins/element-ui.js\");\n/* harmony import */ var _plugins_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/plugins/i18n/i18n */ \"./src/plugins/i18n/i18n.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"i18n\", function() { return _plugins_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n\n\n\n\n//# sourceURL=webpack:///./src/plugins/index.js?");

/***/ }),

/***/ "./src/router.js":
/*!***********************!*\
  !*** ./src/router.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-router */ \"./node_modules/vue-router/dist/vue-router.esm.js\");\n/* harmony import */ var _plugins_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./plugins/index */ \"./src/plugins/index.js\");\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].use(vue_router__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\nvar routes = [{\n  path: '/',\n  name: 'Home',\n  beforeEnter: function beforeEnter(to, from, next) {\n    localStorage.getItem('access_token') ? next('/hotel/sadmin/dashboard') : next('/hotel/sadmin/login');\n  }\n}];\nvar router = new vue_router__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n  mode: 'history',\n  routes: routes\n});\nrouter.beforeEach(function (to, from, next) {\n  localStorage.setItem('page-back', to.fullPath);\n  if (!!to.meta.requiresAuth && !localStorage.getItem('access_token')) {\n    return {\n      path: '/hotel/sadmin/login',\n      query: {\n        redirect: to.fullPath\n      }\n    };\n  } else {\n    next();\n  }\n});\nrouter.afterEach(function (to, from) {\n  if (to.name) {\n    document.title = _plugins_index__WEBPACK_IMPORTED_MODULE_2__[\"i18n\"].t(\"breadcrumb.\".concat(to.name));\n  }\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\n\n//# sourceURL=webpack:///./src/router.js?");

/***/ }),

/***/ "./src/stores/index.js":
/*!*****************************!*\
  !*** ./src/stores/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ \"./node_modules/vuex/dist/vuex.esm.js\");\n\n\nvue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].use(vuex__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n/* harmony default export */ __webpack_exports__[\"default\"] = (new vuex__WEBPACK_IMPORTED_MODULE_1__[\"default\"].Store({\n  modules: {}\n}));\n\n//# sourceURL=webpack:///./src/stores/index.js?");

/***/ }),

/***/ "./src/utils/localStorage.js":
/*!***********************************!*\
  !*** ./src/utils/localStorage.js ***!
  \***********************************/
/*! exports provided: setLocalStorageWithExpiry, getLocalStorageWithExpiry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setLocalStorageWithExpiry\", function() { return setLocalStorageWithExpiry; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getLocalStorageWithExpiry\", function() { return getLocalStorageWithExpiry; });\nfunction setLocalStorageWithExpiry(key, value, ttl) {\n  var now = new Date();\n  var item = {\n    value: value,\n    expiry: now.getTime() + ttl\n  };\n  localStorage.setItem(key, JSON.stringify(item));\n}\nfunction getLocalStorageWithExpiry(key) {\n  var itemStr = localStorage.getItem(key);\n  // if the item doesn't exist, return null\n  if (!itemStr) {\n    return null;\n  }\n  var item = JSON.parse(itemStr);\n  var now = new Date();\n  // compare the expiry time of the item with the current time\n  if (now.getTime() > item.expiry) {\n    // If the item is expired, delete the item from storage\n    // and return null\n    localStorage.removeItem(key);\n    return null;\n  }\n  return item.value;\n}\n\n//# sourceURL=webpack:///./src/utils/localStorage.js?");

/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/main.js */\"./src/main.js\");\n\n\n//# sourceURL=webpack:///multi_./src/main.js?");

/***/ })

/******/ });