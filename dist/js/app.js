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

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/@vue/cli-service/node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/@vue/cli-service/node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\nexports.push([module.i, \"@import url(https://fonts.googleapis.com/css?family=Muli:400,600,700&display=swap);\"]);\n// Module\nexports.push([module.i, \"@charset \\\"UTF-8\\\";\\nhtml,\\nbody,\\ndiv,\\nspan,\\napplet,\\nobject,\\niframe,\\nh1,\\nh2,\\nh3,\\nh4,\\nh5,\\nh6,\\np,\\nblockquote,\\npre,\\na,\\nabbr,\\nacronym,\\naddress,\\nbig,\\ncite,\\ncode,\\ndel,\\ndfn,\\nem,\\nimg,\\nins,\\nkbd,\\nq,\\ns,\\nsamp,\\nsmall,\\nstrike,\\nstrong,\\nsub,\\nsup,\\ntt,\\nvar,\\nb,\\nu,\\ni,\\ncenter,\\ndl,\\ndt,\\ndd,\\nfieldset,\\nform,\\nlabel,\\nlegend,\\ntable,\\ncaption,\\ntbody,\\ntfoot,\\nthead,\\ntr,\\nth,\\ntd,\\narticle,\\naside,\\ncanvas,\\ndetails,\\nembed,\\nfigure,\\nfigcaption,\\nfooter,\\nheader,\\nhgroup,\\nmenu,\\nnav,\\noutput,\\nruby,\\nsection,\\nsummary,\\ntime,\\nmark,\\naudio,\\nvideo,\\n.el-popper {\\n  margin: 0;\\n  padding: 0;\\n  border: 0;\\n  font-size: 100%;\\n  font: inherit; /* Thay đổi font cho global */\\n  vertical-align: baseline;\\n  text-decoration: none;\\n}\\n\\nul {\\n  list-style: none !important;\\n  padding: 0;\\n  margin: 0;\\n}\\n\\n* {\\n  box-sizing: border-box;\\n  line-height: 1.5;\\n}\\n\\nhtml {\\n  font-size: 14px;\\n  height: 100%;\\n}\\n\\nbody {\\n  font-family: Muli;\\n  position: relative;\\n  width: 100%;\\n  min-height: 100%;\\n  overflow-x: hidden;\\n}\\n\\n.el-table .cell {\\n  word-break: break-word;\\n}\\n.el-table th {\\n  font-weight: 900;\\n  color: #252222;\\n}\\n\\np.text-word-break {\\n  word-break: break-word;\\n}\\n\\ntable {\\n  width: 100%;\\n  border-collapse: collapse;\\n}\\n\\na, a:active {\\n  color: #007bff;\\n}\\n\\n.table-components {\\n  overflow-x: scroll;\\n}\\n.table-components th,\\n.table-components td {\\n  padding: 12px 8px;\\n  border-bottom: 1px solid #ebeef5;\\n  text-align: left;\\n}\\n.table-components .el-form--inline {\\n  text-align: left;\\n}\\n.table-components .el-form--inline .el-form-item {\\n  margin-right: 12px;\\n}\\n.table-components .custom-scroll-bar-x::-webkit-scrollbar {\\n  -webkit-appearance: none;\\n  width: 8px;\\n}\\n.table-components .custom-scroll-bar-x::-webkit-scrollbar-thumb {\\n  border-radius: 10px;\\n  margin: 5px 0;\\n  background-color: rgba(0, 0, 0, 0.5);\\n  box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);\\n}\\n.table-components .custom-scroll-bar-x::-webkit-scrollbar-thumb:hover {\\n  width: 12px;\\n  background: #999999;\\n}\\n.table-components::-webkit-scrollbar {\\n  -webkit-appearance: none;\\n  height: 8px;\\n}\\n.table-components::-webkit-scrollbar-thumb {\\n  border-radius: 10px;\\n  margin: 5px 0;\\n  background-color: rgba(0, 0, 0, 0.5);\\n  box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);\\n}\\n.table-components::-webkit-scrollbar-thumb:hover {\\n  width: 12px;\\n  background: #999999;\\n}\\n\\n.pagination {\\n  text-align: left;\\n  margin-top: 12px;\\n}\\n\\n.operations {\\n  padding: 12px;\\n}\\n\\n#preview {\\n  width: 200px;\\n  border: 1px solid;\\n  height: 100px;\\n  display: inline-table;\\n}\\n#preview img {\\n  max-width: 200px;\\n  display: inline;\\n  height: auto;\\n  -o-object-fit: scale-down;\\n     object-fit: scale-down;\\n}\\n\\n.float-right {\\n  float: right;\\n}\\n\\n.float-left {\\n  float: left;\\n}\\n\\n[class*=el-col-] {\\n  padding: 10px;\\n  text-align: left;\\n}\\n\\n.text-danger {\\n  color: #f56c6c;\\n}\\n\\n.bold {\\n  font-weight: bold;\\n}\\n\\n.disappear {\\n  display: none !important;\\n}\\n\\n.disabled {\\n  pointer-events: none;\\n  opacity: 0.4;\\n}\\n\\n.link-disabled,\\n.link-disabled:active,\\n.link-disabled:visited {\\n  pointer-events: none;\\n  color: #786b6a;\\n}\\n\\n.tag-custom {\\n  margin-right: 12px;\\n}\\n\\n.disable-label .el-radio__label {\\n  display: none;\\n}\\n\\n.padding-none {\\n  padding: 0px;\\n}\\n\\n.el-form-item.is-required > .el-form-item__label::after, .el-form-item.is-required .el-form-item__label-wrap > .el-form-item__label::after {\\n  content: \\\"*\\\";\\n  color: #f56c6c;\\n  margin-left: 4px;\\n}\\n\\n.el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label-wrap > .el-form-item__label:before,\\n.el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {\\n  content: \\\"\\\";\\n  color: #F56C6C;\\n  margin-right: 4px;\\n}\\n\\n@media (max-width: 425px) {\\n  .my-popover .options {\\n    left: unset;\\n    transform: unset;\\n  }\\n}\\n@media (max-width: 635px) {\\n  .custom-pagination .el-pagination__jump,\\n.custom-pagination .el-pagination__sizes {\\n    display: block !important;\\n    margin: 8px 0;\\n  }\\n  .el-range-editor {\\n    width: 80% !important;\\n  }\\n  .custom-date-range.el-date-range-picker {\\n    width: 80% !important;\\n    left: 10% !important;\\n  }\\n  .custom-date-range .el-date-range-picker .el-picker-panel__body {\\n    display: flex !important;\\n    flex-direction: column !important;\\n  }\\n  .custom-date-range .el-date-range-picker__content {\\n    float: unset !important;\\n    width: 100% !important;\\n  }\\n  .custom-date-range.el-date-range-picker .el-picker-panel__body {\\n    min-width: unset;\\n  }\\n  .el-menu {\\n    height: unset !important;\\n  }\\n}\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/assets/styles/main.scss?./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??ref--9-oneOf-3-1!./node_modules/postcss-loader/src??ref--9-oneOf-3-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-3-3");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function render() {\n  var _vm = this,\n    _c = _vm._self._c;\n  return _c(\"div\", {\n    staticClass: \"member-layout\"\n  }, [_c(\"el-container\", [_c(\"el-aside\", {\n    staticClass: \"member-layout__aside\",\n    class: !_vm.isExpend ? \"\" : \"active\"\n  }, [_c(\"SaSidebar\", {\n    attrs: {\n      isExpend: _vm.isExpend\n    }\n  })], 1), _c(\"el-container\", [_c(\"el-header\", {\n    staticClass: \"member-layout__header\",\n    class: !_vm.isExpend ? \"\" : \"active\"\n  }, [_c(\"SaHeader\", {\n    attrs: {\n      expend: _vm.isExpend\n    },\n    on: {\n      expended: _vm.getExpended,\n      logout: function logout($event) {\n        return _vm.$emit(\"changeLayout\");\n      }\n    }\n  })], 1), _c(\"el-main\", {\n    staticClass: \"member-layout__main\",\n    class: !_vm.isExpend ? \"\" : \"active\"\n  }, [_c(\"div\", {\n    staticClass: \"member-layout__topbar\"\n  }, [_c(\"SaTopBar\")], 1), _c(\"div\", {\n    staticClass: \"member-layout__content\"\n  }, [_vm._t(\"default\")], 2), _c(\"el-footer\", {\n    staticClass: \"member-layout__footer\"\n  }, [_vm._v(\" © \" + _vm._s(new Date().getFullYear()) + \" Go2Joy - All Rights Reserved. \")])], 1)], 1)], 1)], 1);\n};\nvar staticRenderFns = [];\nrender._withStripped = true;\n\n\n//# sourceURL=webpack:///./src/layouts/member.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%223e1aadb4-vue-loader-template%22%7D!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/asyncToGenerator.js\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar initRouter = /*#__PURE__*/function () {\n  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee() {\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.next = 2;\n            return __webpack_require__.e(/*! import() */ 60).then(__webpack_require__.bind(null, /*! ./hotels */ \"./src/modules/hotels/index.js\"));\n          case 2:\n            _context.next = 4;\n            return __webpack_require__.e(/*! import() */ 70).then(__webpack_require__.bind(null, /*! ./profile */ \"./src/modules/profile/index.js\"));\n          case 4:\n            _context.next = 6;\n            return __webpack_require__.e(/*! import() */ 69).then(__webpack_require__.bind(null, /*! ./page-not-found */ \"./src/modules/page-not-found/index.js\"));\n          case 6:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n  return function initRouter() {\n    return _ref.apply(this, arguments);\n  };\n}();\ninitRouter();\n\n//# sourceURL=webpack:///./src/modules/index.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  yes: 'Yes',\n  no: 'No',\n  all: 'All',\n  selected: 'Selected',\n  allSelected: 'All selected',\n  public: 'Public',\n  private: 'Private',\n  hight: 'Hight',\n  weight: 'weight',\n  hotelStatus: {\n    waiting: 'Waiting',\n    displayed: 'Displayed',\n    contracted: 'Contracted',\n    trial: 'Trial',\n    terminated: 'Terminated',\n    suspended: 'Suspended',\n    hotelAvailable: 'Available',\n    hotelUnAvailable: 'Unavailable'\n  },\n  bookingNotificationBy: {\n    go2joyParterApp: 'Go2Joy\\'s Partner App',\n    sms: 'SMS',\n    email: 'Email'\n  },\n  payments: {\n    both: 'Both',\n    atHotel: 'At hotel',\n    online: 'Just pay online'\n  },\n  hotelTypes: {\n    allTypes: 'All types',\n    none: 'None',\n    couples: 'Couples',\n    travel: 'Travel',\n    couplesAndTravel: 'Couples and Travel',\n    quarantine: 'Quarantine'\n  },\n  contracts: {\n    notClassified: 'None',\n    type1: 'Type 1 - 600.000',\n    type2: 'Type 2 - 300.000',\n    type3: 'Type 3 - 100.000',\n    type4Recontracted: 'Type 4 Recontracted',\n    typeGo2joyRoom: 'Type Go2Joy Room'\n  },\n  roomType: {\n    hourly: 'Hourly',\n    additional: 'Additional',\n    overnight: 'Overnight',\n    daily: 'Daily'\n  },\n  dateOfWeek: {\n    monday: 'Monday',\n    tuesday: 'Tuesday',\n    wednesday: 'Wednesday',\n    thursday: 'Thursday',\n    friday: 'Friday',\n    saturday: 'Saturday',\n    sunday: 'Sunday'\n  },\n  // option trùng payment\n  paymentsHotel: {\n    both: 'Both',\n    payHotel: 'Pay at hotel',\n    payOnline: 'Just pay online',\n    momo: 'Momo',\n    credit: 'Credit card (OnePay)',\n    debit: 'Debit card (OnePay)',\n    payoo: 'Pay@Store - Payoo',\n    zalo: 'ZaloPay',\n    pos: 'Pay@Store',\n    creditCardVnpt: 'Credit card (VNPT)',\n    atmCardVnpt: 'ATM card (VNPT)',\n    shopeePay: 'Shopee pay'\n  },\n  status: {\n    disable: 'Disable',\n    deleted: 'Deleted',\n    active: 'Active',\n    expired: 'Expired',\n    temp: 'Temp',\n    draft: 'Draft',\n    wait_confirm: 'Wait confirm',\n    get: 'Get',\n    use: 'Use',\n    not_yet: 'Not yet',\n    never: 'Never',\n    missing: 'Missing',\n    no_need: 'No need',\n    waiting: 'Waiting',\n    available: 'Available',\n    suspend: 'Suspend',\n    end: 'End',\n    allStatus: 'All status',\n    created: 'Created',\n    sending: 'Sending',\n    sent: 'Sent',\n    none: 'None',\n    allUser: 'All User',\n    allNoticeType: 'All notice type',\n    sendTo: 'Send to',\n    allImportFromExcelFile: 'All Import From Excel File',\n    userInput: 'User Input',\n    lastTimeOpenApp: 'Last time open app',\n    go2joy: 'Go2Joy',\n    allPartner: 'All Partner',\n    booking: 'Booking',\n    allTrailPartner: 'All Trail Partner',\n    allContractPartner: 'All Contract Partner',\n    hotel: 'Hotel',\n    crmFilter: 'CRM Filter',\n    normal: 'Normal',\n    donateCoupon: 'Donate Coupon',\n    remindCoupon: 'Remind Coupon'\n  },\n  applyHotelType: {\n    applyAllHotel: 'Apply all hotel',\n    applyAllHotelExcept: 'Apply all hotel except',\n    onlyApply: 'Only apply'\n  },\n  applyUserType: {\n    applyAllUser: 'Apply all user',\n    applyAllUserExcept: 'Apply all user except',\n    onlyApply: 'Only apply'\n  },\n  applyPromotionType: {\n    applyAllPromo: 'Apply all promotion',\n    justApply: 'Just apply'\n  },\n  room: {\n    normal: 'Normal',\n    flash_sale: 'Flash sale'\n  },\n  typePromotion: {\n    all: 'All',\n    apply: 'Apply',\n    event: 'Event',\n    inviteFriend: 'Invite friend',\n    gift: 'Gift',\n    booking: 'Booking',\n    report_new_hotel: 'Report new hotel',\n    sign_up: 'Sign up',\n    birthday: 'Birthday',\n    payment: 'Payment',\n    voucher_code: 'Voucher code'\n  },\n  discountType: {\n    discountMoney: 'Discount money',\n    discount_percent: 'Discount %',\n    gift: 'Gift',\n    discountHours: 'Discount hours',\n    samePrice: 'Same price'\n  },\n  sendingStatus: {\n    notSendYet: 'Not send yet',\n    error: 'Error',\n    ok: 'Ok',\n    dontSend: \"Don't send\"\n  },\n  bookingStatus: {\n    all: 'All',\n    reserved: 'Reserved',\n    confirmed: 'Confirmed',\n    check_in: 'Checked-in',\n    cancel: 'Cancelled',\n    no_show: 'No show',\n    payment_fail: 'Payment Fail'\n  },\n  confirmedBy: {\n    user: 'User',\n    hotel: 'Hotel',\n    go2joy: 'Go2Joy',\n    hotel_late: 'Hotel late',\n    location: 'Location'\n  },\n  targetType: {\n    notice: 'Notice',\n    promotion: 'Promotion',\n    serviceAgreement: 'Service Agreement',\n    hotel: 'Hotel',\n    faq: 'FAQ',\n    inviteFriend: 'Invite Friend',\n    openApp: 'Open app',\n    mileagePoint: 'Mileage Point',\n    directDiscount: 'Direct Discount',\n    signUp: 'Sign up',\n    promotionGroup: 'Promotion Group',\n    amenityPack: 'Amenities pack',\n    hotelGo2Choice: 'Hotel Go2Choice',\n    district: 'District',\n    promotionEvent: 'Promotion / Event',\n    linkOutApp: 'Link (Out-App)',\n    linkInApp: 'Link (In-app)',\n    coupon: 'Coupon',\n    link: 'Link',\n    hotelTet: 'Hotel Tet',\n    referral: 'Referral program',\n    hotelArea: 'Hotel Area'\n  },\n  noticeType: {\n    function: 'Function',\n    promotion: 'Promotion',\n    term_policy: 'Term & Policy',\n    notification: 'Notification',\n    notice_of_no_show: 'Notice of No Show',\n    notice_of_Checked_in_l: 'Notice of Checked-in L'\n  },\n  applyHotelOption: {\n    all_hotel: 'All hotels',\n    all_contracted: 'All hotels contracted',\n    all_trial: 'All hotels trial',\n    just_apply: 'Just apply',\n    hotelGo2Choice: 'Hotel Go2Choice',\n    link: 'Link',\n    district: 'District',\n    coupon: 'Coupon',\n    promotionEvent: 'Promotion / Event'\n  },\n  region: {\n    all_region: 'All region',\n    south: 'South',\n    north: 'North',\n    north_center: 'North center',\n    south_center: 'South center',\n    middle: 'Middle',\n    confirm: 'Confirm',\n    view: 'View'\n  },\n  type: {\n    all_types: 'All types',\n    transfer_booking: 'Transfer Booking',\n    transfer: 'Transfer',\n    promotion: 'Promotion',\n    invite_friend: 'Invite friend',\n    product: 'Product'\n  },\n  level: {\n    level1: 'Level 1',\n    level2: 'Level 2'\n  },\n  regionConfirm: {\n    confirm: 'Confirm',\n    view: 'View'\n  },\n  all_rooms: 'All rooms',\n  room_available: 'Room available',\n  room_unavailable: 'Room unavailable',\n  window: 'Window',\n  balcony: 'Balcony',\n  city: 'City',\n  garden: 'Garden',\n  pool: 'Pool',\n  noView: 'No view'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/general/option.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  booking_no: 'Booking No',\n  trading_code: 'Mã giao dịch Go2Joy',\n  psp_transaction_id: 'PSP Transaction ID',\n  note: 'Note',\n  requiredbookingNo: 'Booking no field is required',\n  requiredbookingType: 'Booking type field is required',\n  requiredbookingNoTitle: 'Please input Booking No',\n  message_input_psp_transaction_id: 'Please input PSP Transaction ID',\n  message_input_booking_no: 'Please input booking no',\n  update_success: 'Update success',\n  message_alert: 'Are yot sure you want to refund booking no',\n  refunded: 'Refunded',\n  refund_id: 'Refund ID'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/booking/bookingAdhoc.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  hotel_name: 'Hotel Name',\n  user_id: 'User Id',\n  full_name: 'Full Name',\n  role: 'Role',\n  mobile: 'Mobile',\n  receive_sms: 'Receive SMS',\n  email: 'Email',\n  debt_reconciliation_email: 'Debt Reconciliation Email',\n  address: 'Address',\n  memo: 'Memo',\n  password: 'Password',\n  admin_ks: 'Admin KS',\n  manager: 'Quản Lý',\n  reception: 'Lễ Tân',\n  status: 'Enable',\n  hotel_employee: 'Hotel Name',\n  confirm_password: 'Confirm password',\n  requiredHotelName: 'Hotel name field is required',\n  requiredUserId: 'User Id field is required',\n  requiredFullName: 'Full name field is required',\n  requiredRole: 'Role field is required',\n  requiredEmail: 'Email name field is required',\n  requiredMobile: 'Mobile field is required',\n  requiredDebtEmail: 'debtEmail field is required',\n  validatePassConfirm: 'Confirm password not equal with password',\n  requirePass: 'Please input Password',\n  requirePassConfirm: 'Please input Password Confirm'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/hotels/hotel-staff/hotelStaffEdit.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  label_header: 'Điểm đánh giá trung bình / Tổng số khách sạn có đánh giá / Tổng số bình luận:',\n  hotel_name: 'Tên khách sạn',\n  placeholder: 'Tên khách sạn',\n  hotel_status: 'Trạng thái hợp đồng',\n  address: 'Địa chỉ',\n  average_rating: 'Điểm trung bình ( Tiện ích / Sạch sẽ / Dịch vụ ):',\n  number_of_review: 'Tổng số bình luận ( Tổng số trả lời bình luận ):',\n  num_of_review_like: 'Tổng số thích bình luận',\n  last_review: 'Bình luận cuối',\n  review: 'Bình luận',\n  reply_content: 'Khách sạn trả lời',\n  num_of_like: 'Tổng số yêu thích',\n  user: 'Tài khoản',\n  staff: 'Nhân viên khách sạn',\n  comment_time: 'Thời điểm bình luận'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/hotels/review/reviewMgt.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'View detail room type',\n  hotel_name: 'Hotel name',\n  name_short_name: 'Name/Room type',\n  num_of_room: 'Num of room',\n  first_hours_price: 'First hours price',\n  max_num_hour: 'Max num hour',\n  plus_hour_price: 'Plus hour price',\n  overnight_price: 'Overight price',\n  one_day_price: 'One day price',\n  square: 'Square',\n  bed_type: 'Bed type',\n  view: 'View',\n  memo: 'Memo',\n  facilities: 'Facilities',\n  special_offer: {\n    name: 'Special offer',\n    description: 'Description',\n    end_date: 'End date',\n    gift_image: 'Gift image'\n  },\n  flash_sale: {\n    name: 'Flash sale',\n    name_flash_sale: 'Name',\n    description: 'Description',\n    sale_start: 'Start date',\n    quantity: 'Gift image',\n    flash_sale_price: 'Flash sale price'\n  },\n  extra_fee: {\n    name: 'Extra fee',\n    booking_type: 'Booking type',\n    origin: 'Origin',\n    start_end: 'Start/End ~ Extra fee',\n    days_apply: 'Day apply extra fee',\n    special_date: 'Special date ~ Extra fee'\n  },\n  direct_discount: {\n    name: 'Direct discount',\n    booking_type: 'Booking type',\n    origin: 'Origin',\n    start_end: 'Start/End ~ Direct discount',\n    days_apply: 'Day apply Direct discount',\n    special_date: 'Special date ~ Direct discount'\n  },\n  bed_types: {\n    not_select: 'Không chọn',\n    single: 'Single',\n    double: 'Double',\n    twin: 'Twin',\n    triple: 'Triple',\n    _2double: '2 Double'\n  },\n  lockRoomHistory: 'Lock room history',\n  roomType: 'Room type',\n  dateRange: 'Date range',\n  startDate: 'Start date',\n  endDate: 'End date',\n  bookingType: 'Booking type',\n  startTime: 'Start time',\n  endTime: 'End time',\n  allRoomTypes: 'All room types',\n  daily: 'Daily',\n  hours: 'Hours',\n  overnight: 'Overnight',\n  allBookingTypes: 'All booking types'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/hotels/room-type/detailRoomType.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  incentive_date: 'Incentive date',\n  created_by: 'Created by',\n  status: 'Status',\n  created_time: 'Created time',\n  confirmed_time: 'Confirmed time',\n  detail: 'Detail',\n  staff_name: 'Staff name',\n  role: 'Role',\n  mobile: 'Mobile',\n  enable: 'Enable',\n  region: 'Region',\n  confirm_permission: 'Confirm permission',\n  create_time: 'Create time',\n  incentive: 'Incentive',\n  pit: 'PIT',\n  income: 'Income',\n  new_contract: 'New Contract',\n  stamp: 'Stamp',\n  hotel_promotion: 'Hotel promotion',\n  co_promotion: 'Co-promotion',\n  new_hotel_checkin_amount: 'New hotel checkin amount',\n  confirm: 'Confirm',\n  save: 'Save',\n  category: 'Category',\n  province: 'Province',\n  district: 'District',\n  hotel_name: 'Hotel name',\n  verified_date: 'Verified date',\n  contract_date: 'Contract date',\n  contract_per: 'Contract (%)',\n  program: 'Program',\n  start_date_promotion: 'Start date promotion',\n  end_date_promotion: 'End date promotion',\n  start_date_stamp: 'Start date stamp',\n  new_contract_type: 'New contract type',\n  stage: 'Stage',\n  number_of_checkin_bookings: 'Number of checkin bookings',\n  commission_of_checkin_amount: 'Commission of checkin amount',\n  success: 'Confirm success',\n  error: 'Confirm fail',\n  full_name: 'Full name',\n  user_id: 'User id',\n  email: 'Email',\n  history: 'History',\n  delete: 'Delete',\n  edit: 'Edit',\n  back: 'Back',\n  Address: 'Address',\n  memo: 'Memo',\n  south: 'South',\n  north: 'North',\n  middle: 'Middle',\n  action: 'Action',\n  url: 'Url',\n  group_sn: 'Group Sn',\n  param_information: 'Param Information',\n  time_access: 'Time Access',\n  address: 'Address',\n  role_region: 'Role region',\n  password: 'Password',\n  confirm_password: 'Confirm Password',\n  all_region: 'All region',\n  view: 'View',\n  all_types: 'All types',\n  transfer_booking: 'Transfer Booking',\n  transfer: 'Transfer',\n  promotion: 'Promotion',\n  invite_friend: 'Invite friend',\n  product: 'Product',\n  level1: 'Level 1',\n  level2: 'Level 2',\n  export: 'export',\n  create: 'Create',\n  update: 'Update',\n  special: 'Special',\n  view_detail: 'View Detail',\n  filter_action12: 'Hotel Mgt / Quản Lý Khách Sạn',\n  filter_action13: 'Room Type Mgt / Quản Lý Loại Phòng',\n  filter_action14: 'Staff Mgt / Quán Lý Nhân Viên',\n  filter_action15: 'Facilities Mgt / Quản Lý Tiện ích',\n  filter_action16: 'User Mgt / Quản Lý Người Dùng',\n  filter_action17: 'App Notice Mgt / Quản Lý Tin Nhắn',\n  filter_action18: 'Q&A Mgt / Quản Lý Q&A',\n  filter_action19: 'FAQ Mgt / Quản Lý FAQ',\n  filter_action20: 'Promotion Mgt / Quản Lý Khuyến Mãi',\n  filter_action21: 'Booking Mgt /Quản Lý Đặt Phòng',\n  filter_action22: 'Booking Report Mgt / Báo Cáo Đặt Phòng',\n  filter_action23: 'PG Mgt / Quản Lý Tiếp Thị',\n  filter_action24: 'Banner Mgt /Quản Lý Banner',\n  filter_action25: 'Popup Mgt / Quản Lý Popup',\n  filter_action26: 'Service Agreement Mgt / Quản Lý Chính Sách',\n  filter_action27: 'Review Mgt / Quản Lý Bình Luận',\n  filter_action28: 'Notification Mgt /Quản Lý Thông Báo',\n  filter_action29: 'Setting Mgt / Thiết Lập',\n  filter_action30: 'Log Mgt / Quản Lý Log',\n  filter_action31: 'Permission Mgt / Phân Quyền',\n  filter_action32: 'Profile Mgt / Hồ Sơ',\n  filter_action34: 'SMS Mgt / Quản Lý SMS',\n  filter_action35: 'Super Staff Mgt/Quản Lý NV Go2Joy ',\n  filter_action37: 'Stamp Mgt/ Quản Lý Stamp',\n  filter_action38: 'CRM Management/ Chăm Sóc Khách Hàng',\n  filter_action39: 'Mileage Point Mgt/ Quản Lý Điểm Thưởng',\n  filter_action40: 'Hotel Group Mgt/ Quản Lý Nhóm KS',\n  filter_action41: 'Home Mgt/ Quản Lý Home Page',\n  filter_action42: 'Mkt Tracking Mgt/ Thống Kê Dữ Liệu',\n  filter_action43: 'Activities / Việc Của Tôi',\n  filter_action44: 'Invite Friend / Mời bạn',\n  filter_action45: 'Confirm Group/ Nhóm Xác Nhận',\n  filter_action47: 'SA Hotel Product type/ Quản Lý Loại Sản Phẩm',\n  filter_action48: 'SA Hotel Debt/ Quản Lý Nợ KS',\n  filter_action49: 'Open Second Splash Mgt / Quản lý Màn hình chờ 2',\n  filter_action50: 'SA Hotel On Top/ Quản lý Hotel On Top',\n  filter_action51: 'SA Sale Incentive History Mgt/ Quản Lý Lịch Sử Hoa Hồng',\n  details: 'Details',\n  function: 'Function'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/sa-account/saleIncentive.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/en/pages/sa-account/staffs.js":
/*!*****************************************************************!*\
  !*** ./src/plugins/i18n/language/en/pages/sa-account/staffs.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  fullName: 'Full name',\n  userId: 'User id',\n  inputUserId: 'Input user id',\n  role: 'Role',\n  mobile: 'Mobile',\n  email: 'Email',\n  region: 'Region',\n  enable: 'Enable',\n  operations: 'Operations',\n  allRegion: 'All region',\n  south: 'South',\n  north: 'North',\n  middle: 'Middle',\n  confirm: 'Confirm',\n  view: 'View',\n  address: 'Address',\n  memo: 'Memo',\n  password: 'Password',\n  confirmPassword: 'Confirm password',\n  incorrectEmail: 'Please input correct email address',\n  requiredEmail: 'Please input Email',\n  requiredFullName: 'Please input Full name',\n  requiredUserId: 'Please input User id',\n  requiredRole: 'Please select Role',\n  requiredAddress: 'Please input Address',\n  requiredMobile: 'Please input Mobile',\n  requiredPassword: 'Please input Password',\n  requiredConfirmPassword: 'Please input Confirm password',\n  confirmMatch: 'New password and Confirm password do not match',\n  notMobile: 'The number you’ve provided is incorrect'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/en/pages/sa-account/staffs.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  home: 'Quản lý home page',\n  activities: 'Việc của tôi',\n  activities_detail: 'Chi tiết việc của tôi',\n  dashboard: 'Bảng điều khiển',\n  categoryEdit: 'Sửa',\n  ApplyForHotel: 'Áp dụng cho khách sạn',\n  user: 'Người dùng',\n  userMgt: 'Quản lý người dùng',\n  deviceMgt: 'Quản lý thiết bị',\n  counselingMgt: 'Quản lý Q&A',\n  replyCounselings: 'Trả lời counselings',\n  createCounselings: 'Tạo counselings',\n  userDetails: 'Chi tiết',\n  hotels: 'Khách sạn',\n  selectApplyHotel: 'Chọn Khách Sạn Áp Dụng',\n  collectionEdit: 'Sửa',\n  collectionCreate: 'Thêm',\n  product_type_mgt: 'Quản lý loại sản phẩm',\n  product_type_edit: 'Sửa loại sản phẩm',\n  product_type_create: 'Tạo loại sản phẩm',\n  product_mgt: 'Quản lý sản phẩm',\n  product_detail: 'Chi tiết sản phẩm',\n  product_edit: 'Sửa sản phẩm',\n  hotel_group_mgt: 'Quản lý nhóm KS',\n  hotel_group_create: 'Tạo nhóm khách sạn',\n  hotel_group_edit: 'Sửa nhóm khách sạn',\n  hotel_group_detail: 'Chi tiết nhóm khách sạn',\n  hotelDisplay: 'Quản lý khách sạn',\n  hotelDisplayCreate: 'Thêm',\n  hotelDisplayEdit: 'Sửa',\n  hotelDisplayDetails: 'Chi tiết',\n  page_not_found: 'Trang không tồn tại',\n  categoryDetails: 'Chi tiết',\n  collection: 'Bộ sưu tập',\n  collectionDetails: 'Chi tiết',\n  roomType: 'Quản lý loại phòng',\n  detailRoomType: 'Chi tiết loại phòng',\n  createRoomType: 'Tạo mới loại phòng',\n  editRoomType: 'Sửa loại phòng',\n  hotel_room_type: 'Quản lý loại phòng',\n  settingFs: 'Thiết lập FS',\n  hotel_staff_mgt: 'Quản lý nhân viên',\n  hotel_staff_edit: 'Sửa nhân viên khách sạn',\n  hotel_staff_create: 'Tạo nhân viên khách sạn',\n  hotel_staff_detail: 'Chi tiết nhân viên khách sạn',\n  hotel_facility_mgt: 'Quản lý tiện ích',\n  facility_create: 'Thêm quản lý tiện ích',\n  facility_edit: 'Sửa quản lý tiện ích',\n  notice_to_hotel: 'Tin nhắn đến KS',\n  notice_to_hotel_detail: 'Chi tiết tin nhắn đến KS',\n  notice_to_hotel_create: 'Tạo tin nhắn đến KS',\n  notice_edit: 'Sửa tin nhắn đến KS',\n  reply_to_hotel: 'Gửi tin nhắn đến KS',\n  send_notice_to_hotel: 'Gửi tin nhắn đến KS',\n  create_apply_for_hotel: 'Danh sách khách sạn áp dụng',\n  list_apply_for_hotel: 'Danh sách khách sạn áp dụng',\n  notice_to_hotel_reply: 'Danh sách khách sạn',\n  stamp: 'Quản lý tem',\n  stampCreate: 'Thêm',\n  stampEdit: 'Sửa',\n  stampDetails: 'Xem thông tin tem',\n  stampDetailTotalUser: 'Quản lý chi tiết tổng người dùng',\n  marketing: 'Marketing',\n  notice: 'Notice',\n  noticeCreate: 'Thêm',\n  noticeEdit: 'Sửa',\n  noticeDetails: 'Chi tiết',\n  mileagePointMgt: 'Q.Lý điểm thưởng',\n  mpBoostingMgt: 'Chương trình ĐT',\n  mpUserMgt: 'ĐT người dùng',\n  promotion: 'Khuyến mãi',\n  chooseWinner: 'Chọn người thắng',\n  createPromotion: 'Thêm khuyến mãi',\n  editPromotion: 'Sửa khuyến mãi',\n  couponCondition: 'Điều kiện sử dụng coupon',\n  applyForHotelRoom: 'Áp dụng cho phòng khách sạn',\n  promotionDetails: 'Chi tiết khuyến mãi',\n  groupPromotion: 'Nhóm khuyến mãi',\n  editGroupPromotion: 'Sửa nhóm khuyến mãi',\n  createGroupPromotion: 'Thêm nhóm khuyến mãi',\n  settingGroupPromotion: 'Thiết lập nhóm khuyến mãi',\n  applyForHotel: 'Áp dụng cho khách sạn',\n  applyForUser: 'Áp dụng cho người dùng',\n  hotelApply: 'Khách sạn được áp dụng',\n  userApply: 'Người dùng được áp dụng',\n  applyForPromotion: 'Khuyến mãi được áp dụng',\n  inviteFriend: 'CT mời bạn',\n  inviteFriendCreate: 'Thêm',\n  inviteFriendEdit: 'Sửa',\n  inviteFriendDetails: 'Chi tiết',\n  inviteFriendDetailsList: 'Danh sách người mời',\n  inviteeList: 'Danh sách người được mời',\n  pointListMgt: 'Điểm thưởng người dùng',\n  notification: 'Quản lý thông báo',\n  notificationCreate: 'Thêm',\n  notificationEdit: 'Sửa',\n  notificationDetails: 'Chi tiết',\n  banner: 'Banner',\n  bannerCreate: 'Thêm',\n  bannerEdit: 'Sửa',\n  bannerSetting: 'Cài đặt hiển thị',\n  bannerDetails: 'Chi tiết',\n  popup: 'Popup',\n  popupCreate: 'Thêm',\n  popupEdit: 'Sửa',\n  popupSetting: 'Cài đặt hiển thị',\n  popupDetails: 'Chi tiết',\n  pgpb: 'Quản lý PGPB',\n  pgpbCreate: 'Thêm',\n  pgpbEdit: 'Sửa',\n  pgpbDetails: 'Chi tiết',\n  pgpbTotalOfIntroduction: 'Danh sách người dùng',\n  sendingMail: 'Lịch sử gửi mail',\n  sendingMailCreate: 'Thêm',\n  sendingMailDetails: 'Danh sách chi tiết nợ KS',\n  generalSetting: 'Cài đặt chung',\n  settings: 'Cài đặt',\n  keyword: 'Từ khóa',\n  review: 'Quản lý bình luận',\n  reviewDetail: 'Chi tiết quản lý bình luận',\n  add: 'Thêm',\n  edit: 'Sửa',\n  create: 'Thêm',\n  detail: 'Chi tiết',\n  service_agreement_mgt: 'Quản lý chính sách',\n  update_service_agreement_mgt: 'Cập nhật quản lý chính sách',\n  view_review_hotel: 'Quản lý chi tiết bình luận',\n  apply_for_promotion: 'Danh sách Khuyến mãi',\n  apply_for_user: 'Danh sách người dùng',\n  profile: 'Thông tin người dùng',\n  saprofile_update: 'Cập nhật thông tin người dùng',\n  my_profile: 'Hồ sơ của tôi',\n  logout: 'Đăng xuất',\n  userEdit: 'Sửa',\n  editorDemo: 'Editor Demo',\n  firstBooking: 'Booking lần đầu',\n  firstBookingDetails: 'Chi tiết',\n  bookingReport: 'Báo cáo đặt phòng',\n  cashFlowReport: 'Báo cáo dòng tiền',\n  cashFlowReportDetail: 'Chi tiết báo cáo dòng tiền',\n  sendMail: 'Gởi thư',\n  hotelDebt: 'Quản lý nợ KS',\n  hotelDebtDetailList: 'Chi tiết danh sách nợ KS',\n  hotelDebtDetail: 'Chi tiết nợ KS',\n  hotelDebtEdit: 'Sửa nợ KS',\n  hotelDebtCreate: 'Thêm nợ KS',\n  hotelDebtReview: 'Review quản lý nợ KS',\n  bookingReportDetails: 'Chi tiết',\n  bookingReportHotels: 'Danh sách khách sạn',\n  booking: 'Đặt phòng',\n  bookingAdhoc: 'Đặt phòng Adhoc',\n  bookingAdhocSearch: 'Tìm kiếm đặt phòng Adhoc',\n  searchByBookingNo: 'Tìm kiếm bằng mã',\n  article: 'Bài báo',\n  articleEdit: 'Sửa',\n  articleCreate: 'Thêm',\n  articleHome: 'Article home',\n  articleSetup: 'Thiết lập',\n  'Pin article': 'Pin article',\n  'Article with title': 'Article with title',\n  'Article with image': 'Article with image',\n  'Article with summary': 'Article with summary',\n  'Article collection': 'Article collection',\n  addThumbnail: 'Thêm Thumbnail',\n  openSecondSplash: 'TL màn hình chờ 2',\n  hotelOntop: 'Quản lý hotel on TOP',\n  openSecondSplashEdit: 'Sửa',\n  articleCategory: 'Nhóm bài báo',\n  articleCategoryCreate: 'Thêm',\n  articleCategoryEdit: 'Sửa',\n  openSecondSplashCreate: 'Thêm',\n  hotelOnTop: 'Quản lý hotel on TOP',\n  hotelOnTopEdit: 'Sửa',\n  hotelOnTopCreate: 'Thêm',\n  go2joyStaffEdit: 'Sửa',\n  go2joyStaffCreate: 'Thêm',\n  go2joyStaffDetails: 'Chi tiết',\n  go2joyConfirmGroup: 'Quản lý N.Xác nhận',\n  saAccountMgt: 'Quản lý TK SA',\n  go2joyStaffs: 'Quản lý N.Viên G2J',\n  sms: 'SMS',\n  trackingMgt: 'Thống kê dữ liệu',\n  bookingTrackingMgt: 'Theo dõi đặt phòng',\n  hotelStatusTrackingMgt: 'Theo dõi trạng thái KS',\n  hotelIntroduceSignup: 'Theo dõi đăng ký KS',\n  numberOfSignup: 'Số lượng đăng kí',\n  checkinByRegister: 'Checkin bằng mã KS',\n  crm: 'CRM',\n  crmDetail: 'Chi tiết crm',\n  crmCreate: 'Thêm crm',\n  crmEdit: 'Sửa crm',\n  mobileList: 'Danh sách thiết bị',\n  smsCreate: 'Thêm',\n  SaleIncentiveHistoryDetails: 'Chi tiết',\n  SaleIncentiveHistory: 'Lịch sử tài khoản hoa hồng',\n  SaleIncentiveHistoryCreate: 'Thêm',\n  DetailsOfStaff: 'Chi tiết nhân sự',\n  AccountSaleIncentiveDetail: 'Chi tiết tài khoản hoa hồng',\n  revenueReport: 'Báo cáo doanh thu',\n  revenueReportDetails: 'Chi tiết',\n  permission: 'Phân quyền',\n  mpBoostingDetails: 'Chi tiết chương trình ĐT',\n  mpBoostingCreate: 'Thêm chương trình ĐT',\n  ngEdit: 'Chỉnh sửa chương trình ĐT',\n  mpListHotelBoostingMgt: 'Danh sách khách sạn áp dụng điểm thưởng',\n  luckyWheel: 'Vòng xoay may mắn',\n  createEditLuckyWheel: 'Thêm, sửa vòng xoay may mắn'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/general/breadcrumb.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/general/button.js":
/*!********************************************************!*\
  !*** ./src/plugins/i18n/language/vn/general/button.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  update: 'Cập nhật',\n  add: 'Thêm',\n  search: 'Tìm kiếm',\n  done: 'Hoàn thành',\n  create: 'Tạo',\n  save: 'Lưu',\n  edit: 'Sửa',\n  reply: 'Trả lời',\n  delete: 'Xóa',\n  chooseFile: 'Chọn tệp',\n  export: 'Xuất file',\n  back: 'Quay lại',\n  cancel: 'Hủy',\n  ok: 'Đồng ý',\n  confirm: 'Xác nhận',\n  disable: 'Vô hiệu',\n  enable: 'Kích hoạt',\n  dsks: 'DSKS',\n  account: 'Tài khoản',\n  createRoomHotel: 'Tạo loại phòng',\n  ungroup: 'Rời nhóm',\n  send: 'Gửi đi',\n  download: 'Tải xuống',\n  detail: 'Chi tiết',\n  sendMail: 'Gửi mail',\n  resend: 'Gửi lại',\n  stop: 'Dừng',\n  sendRequest: 'Gửi yêu cầu',\n  continue: 'Tiếp theo',\n  settingOfDisplay: 'Cài đặt hiển thị',\n  checkAll: 'Chọn tất cả',\n  hidden: 'Ẩn',\n  show: 'Hiển thị',\n  list: 'Danh sách',\n  management: 'Quản lý',\n  setup: 'Thiết lập',\n  remove: 'Xoá',\n  addThumbnail: 'Thêm thumbnail',\n  hide: 'Ẩn',\n  refresh: 'Refresh',\n  copy: 'Sao chép',\n  chooseWinner: 'Bình chọn',\n  donate: 'Tặng',\n  settingDisplay: 'Cài đặt hiển thị',\n  sent: 'Gửi đi',\n  backTo: 'Quay lại bước 1',\n  play: 'Chạy',\n  hotelIntroductSignup: 'MP Hoa Hồng',\n  hotelAmenityPack: 'Gói tiện ích',\n  mobileLists: 'Danh sách',\n  report: 'Báo cáo',\n  clone: 'Sao chép',\n  next: 'Bước tiếp',\n  refund: 'Hoàn tiền'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/general/button.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/general/day-of-week.js":
/*!*************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/general/day-of-week.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  monday: 'Thứ hai',\n  tuesday: 'Thứ ba',\n  wednesday: 'Thứ tư',\n  thursday: 'Thứ năm',\n  friday: 'Thứ sáu',\n  saturday: 'Thứ bảy',\n  sunday: 'Chủ nhật'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/general/day-of-week.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/general/message.js":
/*!*********************************************************!*\
  !*** ./src/plugins/i18n/language/vn/general/message.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  loading: 'Đang tải...',\n  updateSuccess: 'Cập nhật thành công',\n  createSuccess: 'Tạo thành công',\n  addSuccess: 'Thêm thành công',\n  success: 'Thành công!',\n  warning: 'Cảnh báo',\n  exportSuccess: 'Xuất thành công',\n  areYouSure: 'Bạn có chắc?',\n  deleteSuccess: 'Xóa thành công',\n  downloadSuccess: 'Tải xuống thành công',\n  sendSuccess: 'Gửi thành công',\n  requestSuccess: 'Yêu cầu thành công',\n  messageAlert: 'Bạn có chắc?',\n  messageWarning: 'Cảnh báo',\n  saveSuccess: 'Lưu thành công'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/general/message.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/general/option.js":
/*!********************************************************!*\
  !*** ./src/plugins/i18n/language/vn/general/option.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  yes: 'Có',\n  no: 'Không',\n  all: 'Tất cả',\n  selected: 'Đã chọn',\n  allSelected: 'Chọn tất cả',\n  public: 'Công khai',\n  private: 'Riêng tư',\n  hight: 'Chiều cao',\n  weight: 'Chiều rộng',\n  hotelStatus: {\n    waiting: 'Chờ duyệt',\n    displayed: 'Đã duyệt',\n    contracted: 'Hợp đồng',\n    trial: 'Dùng thử',\n    terminated: 'Dừng hợp đồng',\n    suspended: 'Treo',\n    hotelAvailable: 'Có',\n    hotelUnAvailable: 'Không'\n  },\n  bookingNotificationBy: {\n    go2joyParterApp: 'Ứng dụng Go2Joy Partner',\n    sms: 'Tin nhắn',\n    email: 'Email'\n  },\n  payments: {\n    both: 'Cả hai',\n    atHotel: 'Tại khách sạn',\n    online: 'Trả trước'\n  },\n  hotelTypes: {\n    allTypes: 'Tất cả loại',\n    none: '---',\n    couples: 'Tình nhân',\n    travel: 'Du lịch',\n    couplesAndTravel: 'Tình nhân và Du lịch',\n    quarantine: 'Cách ly'\n  },\n  contracts: {\n    notClassified: 'None',\n    type1: 'Type 1 - 600.000',\n    type2: 'Type 2 - 300.000',\n    type3: 'Type 3 - 100.000',\n    type4Recontracted: 'Type 4 Recontracted',\n    typeGo2joyRoom: 'Type Go2Joy Room'\n  },\n  roomType: {\n    hourly: 'Theo giờ',\n    additional: 'Giờ  thêm',\n    overnight: 'Qua đêm',\n    daily: 'Theo ngày'\n  },\n  dateOfWeek: {\n    monday: 'Thứ hai',\n    tuesday: 'Thứ ba',\n    wednesday: 'Thứ tư',\n    thursday: 'Thứ năm',\n    friday: 'Thứ sáu',\n    saturday: 'Thứ bảy',\n    sunday: 'Chủ nhật'\n  },\n  // option trùng payment\n  paymentsHotel: {\n    both: 'Cả hai',\n    payHotel: 'Tại Khách sạn',\n    payOnline: 'Trả trước',\n    momo: 'Momo',\n    credit: 'Thẻ tín dụng (OnePay)',\n    debit: 'Thẻ ghi nợ (OnePay)',\n    payoo: 'Pay@Store - Payoo',\n    zalo: 'ZaloPay',\n    pos: 'Pay@Store',\n    creditCardVnpt: 'Thẻ tín dụng (VNPT)',\n    atmCardVnpt: 'Thẻ ATM (VNPT)',\n    shopeePay: 'Shopee pay'\n  },\n  status: {\n    disable: 'Vô hiệu',\n    deleted: 'Đã xóa',\n    active: 'Hoạt động',\n    expired: 'Hết hạn',\n    temp: 'Nhiệt độ',\n    draft: 'Lưu tạm',\n    wait_confirm: 'Đợi xác nhận',\n    get: 'Nhận',\n    use: 'Sử dụng',\n    not_yet: 'Chưa hoạt động',\n    never: 'Không bao giờ',\n    missing: 'Còn thiếu',\n    no_need: 'Không cần',\n    waiting: 'Chờ duyệt',\n    available: 'Hoạt động',\n    suspend: 'Hoãn',\n    end: 'Kết thúc',\n    allStatus: 'Tất cả trạng thái',\n    created: 'Đã tạo',\n    sending: 'Đang gửi',\n    sent: 'Đã gửi',\n    none: 'Không áp dụng',\n    allUser: 'Tất cả User',\n    allNoticeType: 'Tất cả loại thông báo',\n    sendTo: 'Gửi đến',\n    allImportFromExcelFile: 'Nhập từ excel file(.xslx)',\n    userInput: 'Nhập thông tin người dùng',\n    lastTimeOpenApp: 'Lần cuối mở app',\n    go2joy: 'Go2Joy',\n    allPartner: 'Tất cả Partner',\n    booking: 'Đặt phòng',\n    allTrailPartner: 'Tất cả Trial',\n    allContractPartner: 'Tất cả Contract',\n    hotel: 'Khách sạn',\n    crmFilter: 'Bộ lộc CRM',\n    normal: 'Thông dụng',\n    donateCoupon: 'Tặng coupon',\n    remindCoupon: 'Nhắc nhở'\n  },\n  applyHotelType: {\n    applyAllHotel: 'Tất cả khách sạn',\n    applyAllHotelExcept: 'Tất cả khách sạn ngọai trừ',\n    onlyApply: 'Chỉ áp dụng'\n  },\n  applyUserType: {\n    applyAllUser: 'Tất cả người dùng',\n    applyAllUserExcept: 'Tất cả người dùng ngọai trừ',\n    onlyApply: 'Chỉ áp dụng'\n  },\n  applyPromotionType: {\n    applyAllPromo: 'Tất cả khuyến mãi',\n    justApply: 'Chỉ áp dụng'\n  },\n  room: {\n    normal: 'Normal',\n    flash_sale: 'Flash sale'\n  },\n  typePromotion: {\n    all: 'Tất cả',\n    apply: 'Áp dụng',\n    event: 'Sự kiện',\n    inviteFriend: 'Mời bạn',\n    gift: 'Quà tặng',\n    booking: 'Đặt phòng',\n    report_new_hotel: 'Báo khách sạn mới',\n    sign_up: 'Đăng kí mới',\n    birthday: 'Sinh nhật',\n    payment: 'Thanh toán',\n    voucher_code: 'Mã voucher'\n  },\n  discountType: {\n    discountMoney: 'Giảm giá tiền',\n    discount_percent: 'Giảm giá %',\n    gift: 'Quà tặng',\n    discountHours: 'Giảm giờ',\n    samePrice: 'Đồng giá'\n  },\n  sendingStatus: {\n    notSendYet: 'Không gửi được',\n    error: 'Lỗi',\n    ok: 'Thành công',\n    dontSend: 'Không gửi'\n  },\n  targetType: {\n    notice: 'Thông báo',\n    promotion: 'Khuyến mãi',\n    serviceAgreement: 'Thỏa thuận dịch vụ',\n    hotel: 'Khách sạn',\n    faq: 'FAQ',\n    inviteFriend: 'Mời bạn bè',\n    openApp: 'Mở ứng dụng',\n    mileagePoint: 'Tích điểm',\n    directDiscount: 'Giảm giá',\n    signUp: 'Đăng ký',\n    promotionGroup: 'Nhóm quảng cáo',\n    amenityPack: 'Gói tiện ích',\n    hotelGo2Choice: 'Khách sạn Go2Choice',\n    linkOutApp: 'Link liên kết (Ngoài App)',\n    linkInApp: 'Link liên kết (Trong App)',\n    district: 'Quận',\n    coupon: 'Coupon',\n    promotionEvent: 'Khuyến mãi / Sự kiện',\n    link: 'Link liên kết',\n    hotelTet: 'Hotel Tet',\n    referral: 'Chương trình giới thiệu',\n    hotelArea: 'Khách sạn theo khu vực'\n  },\n  bookingStatus: {\n    all: 'Tất cả',\n    reserved: 'Đã đặt',\n    confirmed: 'Chưa nhận',\n    check_in: 'Đã nhận',\n    cancel: 'Đã hủy',\n    no_show: 'Không nhận phòng',\n    payment_fail: 'Thanh toán thất bại'\n  },\n  confirmedBy: {\n    user: 'Người dùng',\n    hotel: 'Khách sạn',\n    go2joy: 'Go2Joy',\n    hotel_late: 'Khách sạn trễ',\n    location: 'Vị trí'\n  },\n  noticeType: {\n    function: 'Chức năng',\n    notice: 'Tin nhắn',\n    promotion: 'Khuyến mãi',\n    term_policy: 'Quy định và chính sách',\n    notification: 'Thông báo',\n    notice_of_no_show: 'Thông báo Không nhận phòng',\n    notice_of_Checked_in_l: 'Thông báo Nhận phòng L'\n  },\n  applyHotelOption: {\n    all_hotel: 'Tất cả khách sạn',\n    all_contracted: 'Tất cả ks hợp đồng',\n    all_trial: 'Tất cả ks dùng thử ',\n    just_apply: 'Chỉ áp dụng'\n  },\n  region: {\n    all_region: 'Tất cả khu vực',\n    south: 'Miền Nam',\n    north: 'Miền Bắc',\n    north_center: 'Trung bắc',\n    south_center: 'Trung nam',\n    middle: 'Miền Trung',\n    confirm: 'Xác nhận',\n    view: 'Xem'\n  },\n  type: {\n    all_types: 'Tất cả',\n    transfer_booking: 'Chuyển đổi đặt phòng',\n    transfer: 'Chuyển đổi',\n    promotion: 'Khuyến mãi',\n    invite_friend: 'Mời bạn',\n    product: 'Sản phẩm KS'\n  },\n  level: {\n    level1: 'Cấp duyệt 1',\n    level2: 'Cấp duyệt 2'\n  },\n  regionConfirm: {\n    confirm: 'Xác nhận',\n    view: 'Xem'\n  },\n  all_rooms: 'Tất cả phòng',\n  room_available: 'Còn phòng',\n  room_unavailable: 'Hết phòng',\n  window: 'Cửa Sổ',\n  balcony: 'Ban Công',\n  city: 'Thành Phố',\n  garden: 'Sân Vườn',\n  pool: 'Hồ Bơi',\n  noView: 'Không Có'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/general/option.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/general/option/gender.js":
/*!***************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/general/option/gender.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  male: 'Nam',\n  female: 'Nữ'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/general/option/gender.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/general/option/status.js":
/*!***************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/general/option/status.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  login: 'Đăng nhập',\n  unLogin: 'Chưa đăng nhập'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/general/option/status.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/general/payment.js":
/*!*********************************************************!*\
  !*** ./src/plugins/i18n/language/vn/general/payment.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  both: 'Cả hai',\n  payHotel: 'Tại Khách sạn',\n  payOnline: 'Trả trước',\n  momo: 'Momo',\n  credit: 'Thẻ tín dụng (OnePay)',\n  debit: 'Thẻ ghi nợ (OnePay)',\n  payoo: 'Pay@Store - Payoo',\n  zalo: 'ZaloPay',\n  pos: 'Pay@Store',\n  creditCardVnpt: 'Thẻ tín dụng (VNPT)',\n  atmCardVnpt: 'Thẻ ATM (VNPT)',\n  shopeePay: 'Shopee pay'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/general/payment.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/general/placeholder.js":
/*!*************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/general/placeholder.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  startDate: 'Ngày bắt đầu',\n  endDate: 'Ngày kết thúc',\n  keyword: 'Từ khóa',\n  hotelName: 'Tên khách sạn',\n  from: 'Từ',\n  to: 'Tới',\n  search: 'Tìm kiếm',\n  provinceSelected: 'Tỉnh/TP được chọn',\n  title: 'Tiêu đề',\n  memo: 'Ghi chú',\n  cmrProvince: 'Tỉnh/TP được chọn',\n  cmrDistrict: 'Quận/Huyện được chọn'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/general/placeholder.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  title: 'Tiêu đề',\n  type: 'Loại',\n  request_by: 'Yêu cầu duyệt',\n  last_confirm_staff: 'Người cuối xác nhận/hủy',\n  status: 'Trạng thái',\n  confirm: 'Xác nhận',\n  delete: 'Hủy bỏ',\n  back: 'Trở về',\n  reject: 'Từ chối',\n  waiting: 'Đợi duyệt',\n  withdrawn: 'Đã hủy',\n  confirmed: 'Đã xác nhận',\n  rejected: 'Đã từ chối',\n  placeholder: 'Tiêu đề',\n  promotion: 'Khuyến mãi',\n  invite_friend: 'Mời bạn',\n  production: 'Sản phẩm',\n  all_types: 'Tất cả',\n  transfer_booking: 'Chuyển đổi đặt phòng',\n  transfer: 'Chuyển đổi',\n  product: 'Sản phẩm KS',\n  header_search: 'Tìm kiếm',\n  operations: 'Thao tác',\n  confirm_message_alert: 'Bạn có chắc ?',\n  confirm_success: 'Xác nhận thành công',\n  withdrawn_message_alert: 'Bạn có chắc ?',\n  withdrawn_success: 'Hủy thành công'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/activities/activities.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/activities/activitiesBookingTransfer.js":
/*!************************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/activities/activitiesBookingTransfer.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  coupon: 'Coupon',\n  flase_sale: 'Giảm sốc',\n  redeem_stamp: 'Sử dụng tem',\n  direct_discount: 'Giảm trực tiếp',\n  mileage_point: 'Giảm điểm',\n  other_discount: 'Giảm giá khác',\n  booking_status_yes: 'Có',\n  booking_status_no: 'Không',\n  search_via: 'Tìm kiếm theo',\n  hotel_name: 'Tên khách sạn',\n  payment_method: 'Phương thức thanh toán',\n  commission: 'Hoa hồng',\n  automatically_update_booking_amount: 'Cập nhật giá tiền tự động',\n  manually_update_booking_amount: 'Cập nhật giá tiền thủ công',\n  room_amount: 'Giá phòng',\n  product_amount: 'Giá sản phẩm',\n  total_amount: 'Tổng thanh toán',\n  go2joy_discount: 'Giảm giá Go2Joy',\n  hotel_discount: 'Khách sạn giảm giá',\n  users_pay: 'Khách thanh toán',\n  paid_in_advance: 'Đã thanh toán',\n  room_type: 'Loại phòng',\n  booking_type: 'Loại',\n  stay_at_hotel_time: 'Thời gian ở KS',\n  time_from: 'Thời gian từ',\n  time_to: 'đến',\n  date_from: 'Ngày từ',\n  date_to: 'đến',\n  status: 'Trạng thái',\n  confirmed_by: 'Xác nhận bởi',\n  checkin_time: 'Thời gian nhận phòng',\n  end_date_transfer: 'End date transfer',\n  remove_coupon: 'Gỡ coupon',\n  booking_origin: 'Booking nguyên bản',\n  table_hotel_name: 'Tên khách sạn',\n  table_code: 'Mã',\n  table_booking_no: 'Mã đặt phòng',\n  table_user_info: 'Thông tin khách',\n  table_room_type: 'Loại',\n  table_coupon: 'Phiếu quà tặng',\n  table_booking_type: 'Loại đặt phòng',\n  table_stay_at_hotel_time: 'Thời gian đặt',\n  table_booking_status: 'Trạng thái đặt phòng',\n  table_room_amount: 'Tiền phòng',\n  table_product_amount: 'Số phòng đặt',\n  table_total_amount: 'Tổng thanh toán',\n  table_go2j_discount: 'Giảm giá G2J',\n  table_hotel_discount: 'Khách sạn giảm giá',\n  table_user_pay: 'Khách hàng thanh toán',\n  table_paid_in_advance: 'Trả trước',\n  table_device_type: 'Thiết bị'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/activities/activitiesBookingTransfer.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/activities/activitiesDetail.js":
/*!***************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/activities/activitiesDetail.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  title: 'Tiêu đề',\n  request_by: 'Yêu cầu duyệt',\n  type: 'Loại',\n  status: 'Trạng thái',\n  waiting: 'Đợi duyệt',\n  reason_to_confirm: 'Lý do xác nhận hoặc hủy',\n  invitee_inviter: 'Người được mời / Người mời',\n  daily_budget: 'Ngân sách hàng ngày',\n  create_by: 'Được tạo bởi',\n  via: 'Thông qua',\n  manual: 'Manual',\n  facebook: 'Facebook',\n  google: 'Google',\n  normal: 'Phòng thường',\n  flash_sale: 'Giảm sốc',\n  link: 'Link',\n  guidelines_vn: 'Hướng dẫn (VN)',\n  guidelines_en: 'Hướng dẫn (EN)',\n  sms_content: 'Nội dung SMS',\n  root_page: 'Thông tin nguồn',\n  confirm_staff_list: 'DANH SÁCH DUYỆT',\n  staff_name: 'Tên nhân viên',\n  role: 'Phân quyền',\n  enable: 'Hoạt động',\n  confirm_permission: 'Quyền xác nhận',\n  confirmed_cancel: 'Đã xác nhận / hủy',\n  level1: 'Cấp duyệt 1',\n  level2: 'Cấp duyệt 2',\n  single_confirm: 'Xác nhận đơn',\n  all_confirm: 'Xác nhận tất cả',\n  confirm_content: 'NỘI DUNG DUYỆT',\n  start_end_date: 'Ngày bắt đầu/Kết thúc',\n  apply_all_hotel: 'Tất cả khách sạn',\n  apply_all_hotel_except: 'Tất cả khách sạn ngọai trừ',\n  only_apply: 'Chỉ áp dụng',\n  list_hotel: 'Danh sách khách sạn',\n  user_list: 'Danh sách người dùng',\n  all_usser: 'Tất cả người dùng',\n  all_user_exclude: 'Tất cả người dùng loại trừ',\n  select_user_apply: 'Chọn người dùng áp dụng',\n  num_checkin: 'SL check-in',\n  exel_file: 'Excel File',\n  end_date: 'Ngày kết thúc',\n  status_active: 'Hoạt động',\n  status_expired: 'Hết hạn',\n  status_temp: 'Nhiệt độ',\n  status_draft: 'Lưu tạm',\n  status_wait_confirm: 'Đợi xác nhận',\n  withdrawn: 'Đã hủy',\n  confirmed: 'Đã xác nhận',\n  back: 'Trở về'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/activities/activitiesDetail.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/activities/activitiesInviteFriend.js":
/*!*********************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/activities/activitiesInviteFriend.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  title: 'Tiêu đề',\n  type_of_invitation: 'Loại áp dụng',\n  status: 'Trạng thái',\n  start_end_date: 'Ngày bắt đầu/ kết thúc',\n  invitee_inviter: 'Người được mời/ Người mời',\n  daily_budget: 'Ngân sách hằng ngày',\n  create_by: 'Được tạo bởi',\n  via: 'Thông qua',\n  guidelines_vn: 'Hướng dẫn(VN)',\n  guidelines_en: 'Hướng dẫn(EN)',\n  sms_content: 'Nội dung SMS',\n  start_date: 'Ngày bắt đầu',\n  signup: 'Sign-up',\n  checkin: 'Check-in'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/activities/activitiesInviteFriend.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/activities/activitiesProduct.js":
/*!****************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/activities/activitiesProduct.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  hotel: 'Khách sạn',\n  product_name: 'Tên sản phẩm',\n  product_name_en: 'Tên sản phẩm (Tiếng Anh)',\n  product_type_name: 'Loại sản phẩm',\n  product_type_name_en: 'Loại sản phẩm (Tiếng anh)',\n  price: 'Giá',\n  prepare_before_1_day: 'Chuẩn bị trước 1 ngày',\n  description: 'Mô tả',\n  status: 'Trạng thái',\n  create_staff: 'Nhân viên tạo',\n  last_update: 'Cập nhật cuối',\n  image: 'Hình ảnh',\n  status_active: 'Hoạt động',\n  status_expired: 'Hết hạn'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/activities/activitiesProduct.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/activities/activitiesPromotion.js":
/*!******************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/activities/activitiesPromotion.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  title: 'Tiêu đề',\n  code: 'Mã khuyến mãi',\n  type: 'Loại',\n  num_of_coupon: 'Lượng coupon một lần',\n  max_num_of_coupon: 'Coupon tối đa 1 người dùng',\n  applyStartEnd: 'Thời gian áp dụng',\n  couponStartEnd: 'Thời hạn coupon',\n  go2joy_discount: 'Giảm giá Go2Joy',\n  hotel_discount: 'Giảm giá của KS',\n  sponsor_discount: 'Giảm giá của nhà tài trợ',\n  status: 'Tình trạng',\n  discount: 'Giảm giá',\n  last_update: 'Cập nhật cuối',\n  totalHotelApplied: 'Tổng KS đăng kí',\n  totalUserApplied: 'Tổng người dùng',\n  totalCouponApplied: 'Tổng coupon đã phát hành',\n  total_consumed_coupon: 'Tổng coupon đã dùng',\n  total_go2joy_discount: 'Tổng giảm giá của Go2Joy',\n  total_hotel_discount: 'Tổng giảm giá của khách sạn',\n  total_sponsor_discount: 'Tổng giảm giá của nhà tài trợ',\n  totalDiscount: 'Tổng giảm giá',\n  max_coupon_per_hotel: 'Lượng coupon tối đa ở KS',\n  create_time: 'Thời gian tạo',\n  title_promotion_group: 'Nhóm khuyến mãi',\n  room_apply_list: 'Danh sách phòng áp dụng',\n  content_vn: 'Nội dung (Tiếng việt)',\n  content_en: 'Nội dung (Tiếng anh)',\n  content_2: 'Nội dung 2',\n  memo: 'Ghi chú',\n  image_of_list: 'Hình danh sách',\n  image_of_detail: 'Hình chi tiết',\n  normal_room: 'Phòng thường',\n  coupon_condition_name: 'Coupon condition:',\n  coupon_condition_condition_to_use_coupon: 'Condition to use coupon:',\n  coupon_condition_just_use_for: 'Just use for',\n  coupon_condition_max_coupon_per_day: 'Max coupon per day:',\n  coupon_condition_max_coupon_per_hotel: 'Max coupon per hotel:',\n  coupon_condition_min_booking_money: 'Min booking money:',\n  coupon_condition_payment_when_use_coupon: 'Payment when use coupon:',\n  coupon_condition_coupon_memo: 'Content of Validation VI|EN:',\n  coupon_condition_apply: 'Apply:',\n  issue_coupon_condition_name: 'Điều kiện tặng coupon',\n  issue_coupon_condition_apply: 'Áp dụng:',\n  issue_coupon_condition_coupon_memo: 'Ghi chú coupon VI|EN',\n  issue_coupon_condition_content_of_validation: 'Nội dung xác nhận VI|EN',\n  list_hotel: 'Danh sách khách sạn',\n  user_list: 'Danh sách người dùng',\n  all_usser: 'Tất cả người dùng'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/activities/activitiesPromotion.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/booking/bookingAdhoc.js":
/*!********************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/booking/bookingAdhoc.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  booking_no: 'Mã đặt phòng',\n  trading_code: 'Mã giao dịch Go2Joy',\n  psp_transaction_id: 'PSP Transaction ID',\n  note: 'Ghi chú',\n  requiredbookingNo: 'Mã đặt phòng là bắt buộc',\n  requiredbookingType: 'Loại đặt phòng là bắt buộc',\n  requiredbookingNoTitle: 'Vui lòng nhập mã đặt phòng',\n  message_input_psp_transaction_id: 'Vui lòng nhập PSP Transaction ID',\n  message_input_booking_no: 'Vui lòng nhập mã đặt phòng',\n  update_success: 'Cập nhật thành công',\n  message_alert: 'Bạn có muốn hoàn tiền cho mã đặt phòng',\n  refunded: 'Đã hoàn trả',\n  refund_id: 'Refund ID'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/booking/bookingAdhoc.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/booking/bookingReport.js":
/*!*********************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/booking/bookingReport.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  time_at_hotel: 'Thời gian ở khách sạn',\n  check_in_time: 'Thời gian nhận phòng',\n  allDevice: 'Tất cả thiết bị',\n  all: 'Tất cả',\n  app: 'App',\n  web: 'Web',\n  reserved: 'Đã đặt',\n  confirmed: 'Chưa nhận',\n  check_in: 'Đã nhận',\n  cancel: 'Đã hủy',\n  no_show: 'Không nhận phòng',\n  payment_fail: 'Thanh toán thất bại',\n  contracted: 'Hợp đồng',\n  trial: 'Dùng thử',\n  terminated: 'Dừng hợp đồng',\n  suspended: 'Treo',\n  discountType: 'ĐG',\n  delete: 'Hủy',\n  confirm: 'Xác nhận',\n  refund: 'Hoàn trả',\n  transfer: 'Chuyển đổi',\n  first_booking_checked: 'Cập nhật',\n  waiting_confirm: 'Chờ xác nhận',\n  transferred: 'Đã chuyển đổi',\n  hotel_name: 'Tên khách sạn',\n  code: 'Mã',\n  total_booking: 'Tổng số đặt phòng',\n  go2joy_cancel: 'Go2Joy hủy',\n  hotel_cancel: 'Hotel hủy',\n  user_cancel: 'Khách hủy',\n  booking_no: 'Mã đặt phòng',\n  user_info: 'Thông tin khách',\n  room_type: 'Loại',\n  coupon: 'Phiếu quà tặng',\n  booking_type: 'Loại đặt phòng',\n  stay_at_hotel_time: 'Thời gian đặt',\n  booking_status: 'Trạng thái đặt phòng',\n  room_amount: 'Tiền phòng',\n  product_amount: 'Giá sản phẩm',\n  total_promotion: 'Tổng trước khuyến mãi',\n  go2j_promotion: 'Khuyến mãi G2J',\n  hotel_promotion: 'Khuyến mãi KS',\n  total_amount: 'Tổng thanh toán',\n  go2j_discount: 'Giảm giá G2J',\n  hotel_discount: 'Khách sạn giảm giá',\n  user_pay: 'Khách hàng thanh toán',\n  paid_in_advance: 'Trả trước',\n  device_type: 'Thiết bị',\n  canceled_booking: 'Đặt phòng bị hủy',\n  flase_sale: 'Giảm sốc',\n  redeem_stamp: 'Sử dụng tem',\n  direct_discount: 'Giảm trực tiếp',\n  mileage_point: 'Giảm điểm',\n  other_discount: 'Giảm giá khác',\n  search_via: 'Tìm kiếm theo',\n  payment_method: 'Phương thức thanh toán',\n  commission: 'Hoa hồng',\n  automatically_update_booking_amount: 'Cập nhật giá tiền tự động',\n  manually_update_booking_amount: 'Cập nhật giá tiền thủ công',\n  go2joy_discount: 'Giảm giá Go2Joy',\n  users_pay: 'Khách thanh toán',\n  time_from: 'Thời gian từ',\n  time_to: 'đến',\n  date_from: 'Ngày từ',\n  date_to: 'đến',\n  status: 'Trạng thái',\n  confirmed_by: 'Xác nhận bởi',\n  checkin_time: 'Thời gian nhận phòng',\n  end_date_transfer: 'End date transfer',\n  remove_coupon: 'Gỡ coupon',\n  booking_origin: 'Booking nguyên bản',\n  checkin: 'Đã nhận',\n  no_show_l: 'Không nhận phòng L',\n  user: 'Người dùng',\n  hotel: 'Khách sạn',\n  go2joy: 'Go2Joy',\n  hotel_late: 'Khách sạn trễ',\n  location: 'Vị trí',\n  yes: 'Có',\n  no: 'Không',\n  new: 'Mới',\n  old: 'Cũ',\n  hours: 'Giờ',\n  overnight: 'Qua đêm',\n  daily: 'Theo ngày',\n  searchBooking: 'Tìm kiếm bằng mã',\n  view_booking_detail: 'Xem chi tiết báo cáo đặt phòng',\n  g2j_discount: 'Khuyến mãi G2j',\n  extra_fee: 'Phụ thụ',\n  flash_sale: 'Giảm sốc',\n  samePrice: 'Đồng giá',\n  source: 'Nguồn',\n  placeholder: 'Tên khách sạn',\n  booking_no_placeholder: 'Mã đặt phòng',\n  confirmSuccess: 'Xác nhận thành công',\n  refundSuccess: 'Hoàn tiền thành công',\n  deleteSuccess: 'Xoá thành công',\n  exportSuccess: 'Xuất tệp thành công',\n  allSource: 'Tất cả các nguồn'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/booking/bookingReport.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/booking/cashFlowReport.js":
/*!**********************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/booking/cashFlowReport.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  hotel_name: 'Tên khách sạn',\n  total_check_in: 'Tổng nhận phòng',\n  total_transaction: 'Tổng giao dịch',\n  product_amount: 'Giá sản phẩm',\n  extra_fee: 'Phụ thu',\n  total_amount: 'Tổng trước khuyến mãi',\n  g2j_discount: 'Khuyến mãi G2J',\n  hotel_discount: 'KS giảm giá',\n  user_pay: 'Khách thanh toán',\n  paid_in_advance: 'Đã thanh toán',\n  commission: 'Chiết khấu',\n  balance: 'Tổng đối soát',\n  receivable: '(+) Phải thu',\n  payable: '(-) Phải trả',\n  current_debt: 'Nợ hiện hành',\n  other_debt: 'Khoảng nợ khác',\n  period_debt_time: 'Thời gian kỳ này',\n  pay_date: 'Ngày trả',\n  period_debt: 'Nợ kì này',\n  expected_pay: 'Tiền trả dự tính',\n  pay_amount: 'Tiền trả',\n  createTime: 'Thời gian tạo',\n  totalBooking: 'Tổng đặt phòng',\n  totalCheckin: 'Tổng nhận phòng',\n  totalCancelRefunded: 'Tổng hủy phòng có hoàn tiền',\n  //\n  time_at_hotel: 'Thời gian ở khách sạn',\n  check_in_time: 'Thời gian nhận phòng',\n  all_inventory: 'All inventory',\n  //\n  device_type: 'Thiết bị',\n  booking_time: 'Ngày đặt phòng',\n  booking_info: 'Thông tin đặt phòng',\n  coupon: 'Coupon',\n  room_amount: 'Giá phòng',\n  mileage_point: 'Giảm điểm',\n  other_discount: 'Giảm giá khác',\n  flash_sale: 'Giảm sốc',\n  redeem_stamp: 'Sử dụng tem',\n  direct_discount: 'Giảm trực tiếp',\n  //\n  code: 'Mã',\n  the_balance: 'Tổng đối soát'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/booking/cashFlowReport.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/booking/hotelDebt.js":
/*!*****************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/booking/hotelDebt.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  hotel_name: 'Tên khách sạn',\n  current_debt: 'Nợ hiện hành',\n  period_debt: 'Nợ kỳ này',\n  period_debt_time: 'Thời gian kỳ này',\n  pay_date: 'Ngày trả',\n  other_debt: 'Khoản nợ khác',\n  pay_amount: 'Tiền trả',\n  balance: 'Tổng đối soát',\n  createTime: 'Thời gian tạo',\n  memo: 'Ghi chú',\n  new_hotel_debt: 'Tạo công nợ KS',\n  new_hotel_paid: 'Tạo thanh toán KS',\n  //\n  apply_all_hotel: 'Tất cả khách sạn',\n  apply_all_hotel_except: 'Tất cả khách sạn ngọai trừ',\n  only_apply: 'Chỉ áp dụng',\n  list_hotel: 'Danh sách khách sạn',\n  //\n  code: 'Mã',\n  status: 'Tình trạng',\n  phone: 'Điện thoại',\n  address: 'Địa chỉ',\n  lastUpdate: 'Cập nhật lần cuối',\n  //\n  contracted: 'Hợp đồng',\n  terminated: 'Dừng hợp đồng',\n  suspended: 'Chờ duyệt',\n  operation: 'Thao tác'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/booking/hotelDebt.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/booking/revenueReport.js":
/*!*********************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/booking/revenueReport.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  timeAtHotel: 'Thời gian ở khách sạn',\n  checkInTime: 'Thời gian nhận phòng',\n  contracted: 'Hợp đồng',\n  trial: 'Dùng thử',\n  terminated: 'Dừng hợp đồng',\n  suspended: 'Treo',\n  hotelName: 'Tên khách sạn',\n  companyCode: 'Mã công ty',\n  totalCheckIn: 'Tổng nhận phòng',\n  totalTransaction: 'Tổng giao dịch',\n  extraFee: 'Phụ thu',\n  productAmount: 'Giá sản phẩm',\n  totalAmount: 'Tổng trước khuyến mãi',\n  go2joyDiscount: 'Khuyến mãi G2J',\n  hotelDiscount: 'KS giảm giá',\n  userPay: 'Khách thanh toán',\n  paidInAdvance: 'Đã thanh toán',\n  commission: 'Chiết khấu',\n  balance: 'Tổng đối soát',\n  receivable: '(+) Phải thu',\n  payable: '(-) Phải trả',\n  bookingTime: 'Ngày đặt phòng',\n  bookingId: 'Mã đặt phòng',\n  transactionId: 'Mã giao dịch',\n  bookingInfo: 'Thông tin đặt phòng',\n  transactionStatus: 'Trạng thái giao dịch',\n  transactionTime: 'Thời gian giao dịch',\n  coupon: 'Coupon',\n  roomAmount: 'Giá phòng',\n  mileagePoint: 'Giảm điểm',\n  otherDiscount: 'Giảm giá khác',\n  flashSale: 'Giảm sốc',\n  redeemStamp: 'Sử dụng tem',\n  directDiscount: 'Giảm trực tiếp',\n  allInventory: 'Tất cả khách sạn',\n  all: 'Tất cả',\n  Go2Joy: 'Go2Joy',\n  Agoda: 'Agoda',\n  operations: 'Thao tác',\n  hours: 'Giờ',\n  overnight: 'Qua đêm',\n  daily: 'Theo ngày'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/booking/revenueReport.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/booking/sendingMail.js":
/*!*******************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/booking/sendingMail.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  title: 'Tiêu đề',\n  createStaff: 'Nhân viên gởi',\n  createTime: 'Thời gian tạo',\n  result: 'Kết quả',\n  operations: 'Thao tác',\n  hotelName: 'Tên khách sạn',\n  code: 'Mã',\n  theBalance: 'Tổng đối soát (+) Phải thu (-) Phải trả',\n  currentDebtOtherDebt: 'Nợ hiện hành / Khoản nợ khác',\n  periodDebt: 'Nợ kỳ này',\n  expectedPayAmount: 'Tiền trả dự tính / Tiền trả',\n  currentDebt: 'Nợ hiện hành',\n  otherDebt: 'Khoảng nợ khác',\n  address: 'Địa chỉ',\n  status: 'Trạng thái'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/booking/sendingMail.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/home-display/collection.js":
/*!***********************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/home-display/collection.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  choose_display_in_app_web: 'Chọn hiển thị trên App/Web',\n  subTitle: 'Tiêu đề phụ',\n  title1: 'Tiều đề 1',\n  type: 'Loại',\n  display: 'Hiển thị',\n  displayApp: 'Hiển thị trên App',\n  displayWeb: 'Hiển thị trên Web',\n  displayType: 'Loại hiển thị',\n  lastUpdate: 'Cập nhật cuối',\n  operations: 'Thao tác',\n  selectApplyHotel: 'Chọn Khách Sạn Áp Dụng',\n  requiredTitle: 'Vui lòng nhập Tiêu đề 1',\n  requiredSubTitle: 'Vui lòng nhập Tiêu đề phụ',\n  requiredSlug: 'Vui lòng nhập Slug',\n  requiredDisplayType: 'Vui lòng nhập loại hiển thị',\n  requiredDisplayCategory: 'Vui lòng nhập danh mục hiển thị',\n  hotelList: 'D.S.K.S',\n  promotionList: 'Danh sách khuyến mãi',\n  title: 'Tiêu đề 1',\n  detail: 'Chi tiết',\n  summary: 'Tổng quan',\n  collection: 'Bộ sưu tập',\n  circle: 'Hình tròn',\n  lightSquare: 'LightSquare',\n  darkSquare: 'DarkSquare',\n  rectangle1: 'Rectangle1:2',\n  rectangle2: 'Rectangle2:1',\n  icon: 'Icon',\n  flashSale: 'Giảm sốc',\n  promotion: 'Khuyến mãi',\n  directDiscount: 'Giảm giá',\n  amenityPackHotel: 'Gói tiện ích',\n  loveHotel: 'Tình yêu',\n  travelHotel: 'Du lịch',\n  hotHotel: 'KS hot',\n  newHotel: 'KS mới',\n  go2jSpecial: 'Go2joy đặc biệt',\n  stamp: 'Tem',\n  g2jCertified: 'Go2Choice',\n  isTet: 'Hotel Tet',\n  image360: 'Hình 360',\n  hotelReview: 'Bình luận KS',\n  hotSearched: 'KS đã tìm',\n  hotelBooked: 'KS đã đặt',\n  hotelFavorite: 'KS yêu thích',\n  hotelSuggestion: 'Go2joy gợi ý ',\n  promotionSuggestion: 'Khuyến mãi gợi ý',\n  image: 'Hình ảnh',\n  promotionGroup: 'Nhóm khuyến mãi',\n  chooseProvince: 'Khu vực hiển thị',\n  quarantine: 'Cách ly',\n  go2joySuggestion: 'Go2joy gợi ý',\n  edit: 'Sửa',\n  delete: 'Xóa',\n  titleHotelList: 'Tiêu đề',\n  displayArea: 'Khu vực hiển thị',\n  hotelName: 'Tên khách sạn',\n  status: 'Tình trạng',\n  phone: 'Điện thọai',\n  province: 'Tỉnh thành',\n  address: 'Địa chỉ',\n  createTime: 'Thời gian tạo',\n  code: 'Mã khuyến mãi',\n  discount: 'Giảm giá',\n  applyStartEnd: 'Thời gian áp dụng',\n  couponStartEnd: 'Thời hạn coupon',\n  promotionName: 'Tên khuyến mãi',\n  location: 'Vị trí',\n  bookingType: 'Loại đặt phòng',\n  hotelType: 'Loại khách sạn',\n  all: 'Tất cả',\n  allType: 'Tất cả',\n  apply: 'Áp dụng',\n  event: 'Sự kiện',\n  inviteFriend: 'Mời bạn',\n  gift: 'Quà tặng',\n  booking: 'Đặt phòng',\n  reportNewHotel: 'Báo khách sạn mới',\n  signUp: 'Đăng kí mới',\n  birthday: 'Sinh nhật',\n  payment: 'Thanh toán',\n  voucherCode: 'Mã voucher',\n  waiting: 'Chờ duyệt',\n  displayed: 'Đã duyệt',\n  contracted: 'Hợp đồng',\n  trial: 'Dùng thử',\n  terminated: 'Dừng hợp đồng',\n  suspended: 'Treo',\n  termPolicy: 'Quy định và chính sách',\n  notification: 'Thông báo',\n  noticeOfNoShow: 'Thông báo Không nhận phòng',\n  noticeOfCheckedInL: 'Thông báo Nhận phòng L',\n  hotelAvailable: 'Có',\n  hotelUnavailable: 'Không',\n  extraFeeYes: 'Có',\n  extraFeeNo: 'Không',\n  keyword: 'Từ khoá',\n  add: 'Thêm',\n  save: 'Lưu',\n  back: 'Trở vế',\n  addSuccess: 'Thêm thành công',\n  editSuccess: 'Cập nhật thành công',\n  removeSuccess: 'Xoá thành công',\n  description: 'Mô tả',\n  getLink: 'Get link',\n  copy: 'Sao chép',\n  copied: 'Đã sao chép',\n  requiredHotelList: 'Vui lòng chọn Hotel list',\n  function: 'Chức năng'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/home-display/collection.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/home-display/dashboard.js":
/*!**********************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/home-display/dashboard.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  category: 'Nhóm',\n  title: 'Tiêu đề',\n  display: 'Hiển thị',\n  lastUpdate: 'Cập nhật cuối',\n  operations: 'Thao tác',\n  article: 'Bài báo',\n  banner: 'Banner',\n  choose_area: 'Khu vực',\n  voucher_code: 'Mã giảm giá',\n  collection: 'Bộ sưu tập',\n  notice: 'Tin nhắn',\n  about_us: 'Giới thiệu',\n  title1: 'Tiêu đề 1',\n  title2: 'Tiều đề 2',\n  title3: 'Tiều đề 3',\n  content: 'Nội dung ',\n  list_hotel: 'Danh sách bộ sưu tập',\n  display_type: 'Loại hiển thị',\n  order: 'Thứ tự',\n  setup: 'Thiết lập',\n  management: 'Quản lý',\n  save: 'Lưu',\n  back: 'Trở về',\n  editSuccess: 'Sửa thành công',\n  coverPhoto: 'Ảnh bìa',\n  image: 'Hình ảnh'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/home-display/dashboard.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/hotel-display/hotelDisplay.js":
/*!*********************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/hotel-display/hotelDisplay.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  code: 'Mã',\n  totalView_display: 'Lượt xem',\n  checkinCheckoutTime: 'Checkin/checkout',\n  startEndOvernight: 'Giờ qua đêm',\n  payment: 'PT thanh toán',\n  staff_in_change: 'Người phụ trách',\n  commission: 'Hoa hồng',\n  groupName: 'Tên Nhóm',\n  hotelName: 'Tên khách sạn',\n  holdingCompany: 'Công ty sở hữu',\n  taxNo: 'Mã số thuế',\n  businessLicense: 'Mã số doanh nghiệp',\n  companyName: 'Tên công ty',\n  address: 'Địa chỉ',\n  legalRepresentative: 'Đại diện pháp luật',\n  fullName: 'Tên đầy đủ',\n  position: 'Chức vụ',\n  telephone: 'Điện thoại',\n  email: 'Email',\n  bankInformation: 'Thông tin tài khoản',\n  accountNo: 'Số tài khoản',\n  bankName: 'Tên ngân hàng',\n  branchName: 'Chi nhánh',\n  beneficiary: 'Người hưởng thụ',\n  status: 'Tình trạng',\n  contractDate: 'Ngày hợp đồng',\n  endContractDate: 'Ngày hết hợp đồng',\n  typeNewContract: 'Phân loại hợp đồng mới',\n  bizInCharge: 'NV quản lý',\n  saleInCharge: 'NV hợp đồng',\n  manageHotelsAfterContracting: '* Nhân viên quản lý khách sạn sau khi hợp đồng',\n  contractingNewHotel: '* Nhân viên hợp đồng với khách sạn mới',\n  sms: 'Tin nhắn',\n  go2joyPartnerApp: 'Ứng dụng Go2Joy Partner',\n  propertyManagementSystem: 'Property Management System',\n  hotelPms: '(Hotel PMS)',\n  yesIUsing: 'Có, tôi sử dụng',\n  noIjustUse: 'Không, tôi chỉ dùng',\n  hotelType: 'Loại khách sạn',\n  new: 'Mới',\n  hot: 'Hot',\n  amenityPack: 'Gói tiện ích',\n  go2joyCertified: 'Go2joy Certified',\n  couponBooking: 'Lượng đặt phòng (C) tối đa',\n  bookingSetup: 'Thiết lập đặt phòng',\n  overnightTime: 'Giờ qua đêm',\n  dailyTime: 'Giờ theo ngày',\n  startHourlyTime: 'Giờ đặt phòng theo giờ',\n  location: 'Vị trí',\n  longLat: 'Kinh độ/ Vĩ độ',\n  longitude: 'Kinh độ',\n  latitude: 'Vĩ độ',\n  provinceDistrict: 'Tỉnh/Quận',\n  province: 'Tỉnh',\n  district: 'Quận',\n  updateHotelCode: 'Cập nhật mã khách sạn',\n  phone: 'Điện thoại',\n  areaCode: 'Mã vùng',\n  vietnameseDescription: 'Miêu tả tiếng việt',\n  englishDescription: 'Miêu tả tiếng anh',\n  hotelPolicyVietnamese: 'Chính sách khách sạn tiếng Việt',\n  hotelPolicyEnglish: 'Chính sách khách sạn tiếng Anh',\n  tipsAddress: 'Gợi ý địa chỉ',\n  hashTag: 'Hash tag',\n  homeImage: 'Hình hiển thị',\n  image: 'Hình',\n  degreesImage: 'Hình 360',\n  hotelNameCodeGroupName: 'Tên khách sạn / Mã / Tên Nhóm',\n  totalReview: 'Tổng bình luận',\n  averageMark: 'Điểm trung bình',\n  promotionHotNew: 'Khuyến mãi / Hot / Mới',\n  totalLike: 'Tổng like',\n  overnightTimeDailyTime: 'Giờ qua đêm / Giờ theo ngày',\n  bookingNotificationBy: 'Nhận thông báo đặt phòng',\n  contractEndContractDate: 'Ngày hợp đồng / Ngày hết hợp đồng',\n  roomAvailable: 'Có phòng',\n  totalView: 'Lượt xem',\n  createStaff: 'Người tạo',\n  staffInCharge: 'Người phụ trách',\n  top: 'Top',\n  display: 'Hiển thị',\n  extraFee: 'Phụ thu',\n  firstHoursPrice: 'Giá giờ đầu',\n  plusHoursPrice: 'Giá thêm giờ',\n  overnightPrice: 'Giá qua đêm',\n  oneDayPrice: 'Giá một ngày',\n  memo: 'Ghi chú',\n  payInAdvance: 'Trả tiền trước',\n  giftImage: 'Hình quà tặng',\n  // validation\n  requiredHotelName: 'Vui lòng nhập tên khách sạn',\n  requiredFullname: 'Vui lòng nhập tên đầy đủ',\n  requiredPosition: 'Vui lòng nhập chức vụ',\n  requiredTelephone: 'Vui lòng nhập điện thoại',\n  requiredEmail: 'Vui lòng nhập email',\n  requiredAccountNo: 'Vui lòng nhập số tài khoản',\n  requiredBankName: 'Vui lòng nhập tên ngân hàng',\n  requiredBranchName: 'Vui lòng nhập chi nhánh',\n  requiredBeneficiary: 'Vui lòng nhập người thụ hưởng',\n  requiredBizInCharge: 'Vui lòng chọn NV quản lý',\n  requiredSaleInCharge: 'Vui lòng chọn NV hợp đồng',\n  requiredContractDate: 'Vui lòng nhập ngày hợp đồng',\n  requiredLongitude: 'Vui lòng nhập kinh độ',\n  requiredLatitude: 'Vui lòng nhập vĩ độ',\n  requiredAddress: 'Vui lòng nhập địa chỉ',\n  requiredProvince: 'Vui lòng chọn tỉnh',\n  requiredDistrict: 'Vui lòng chọn quận',\n  requiredCommission: 'Vui lòng nhập hoa hồng',\n  wrongFormatImage: 'Hình ảnh không hợp lệ',\n  requiredHomeImage: 'Vui lòng chọn hình hiển thị',\n  // message\n  doYouWantToContinue: 'Bạn có muốn tiếp tục?',\n  contractNo: 'Số hợp đồng',\n  isExistedInSystem: 'đã tồn tại trong hệ thống'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/hotel-display/hotelDisplay.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/hotel-facility/facilityAdd.js":
/*!*********************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/hotel-facility/facilityAdd.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  facility_name_vn: 'Tên tiện ích (Tiếng việt)',\n  facility_name_en: 'Loại sản phẩm (Tiếng anh)',\n  image: 'Hình ảnh',\n  requiredName: 'Tên tiện ích là trường bắt buộc',\n  requiredNameEn: 'Tên tiện ích (Tiếng anh) là trường bắt buộc',\n  requiredImage: 'Hình ảnh là trường bắt buộc'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/hotel-facility/facilityAdd.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/hotel-facility/facilityList.js":
/*!**********************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/hotel-facility/facilityList.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'Tên',\n  facility_name_en: 'Tên tiện ích (Tiếng anh)',\n  createstaff: 'Người tạo',\n  lastupdate: 'Cập nhật cuối',\n  operations: 'Hoạt động',\n  placeholder: 'Tên tiện ích'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/hotel-facility/facilityList.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/hotel-group/hotelGroupAdd.js":
/*!********************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/hotel-group/hotelGroupAdd.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  namegroup: 'Tên Nhóm',\n  ownerinformation: 'Thông tin người chủ',\n  ownername: 'Tên NV',\n  ownertel: 'Điện thoại NV',\n  owneremail: 'Email NV',\n  companyinformation: 'Thông tin công ty',\n  companyname: 'Tên công ty',\n  businesslisencenumber: 'BLN',\n  companytel: 'Điện thoại Cty',\n  companyemail: 'Email công ty',\n  companyaddress: 'Địa chỉ công ty',\n  addhoteltogroup: 'Thêm vào nhóm',\n  table_hotel_name: 'Tên khách sạn',\n  table_status: 'Tình trạng',\n  table_phone: 'Điện thoại',\n  table_address: 'Địa chỉ',\n  table_commission: 'Hoa hồng',\n  operations: 'Hoạt động',\n  requiredNameGroup: 'Tên Nhóm là trường bắt buộc',\n  requiredNameOwnerInfo: 'Thông tin người chủ là trường bắt buộc',\n  requiredOwnerTel: 'Điện thoại NV là trường bắt buộc',\n  requiredOwnerEmail: 'Email NV là trường bắt buộc'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/hotel-group/hotelGroupAdd.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/hotel-group/hotelGroupDetail.js":
/*!***********************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/hotel-group/hotelGroupDetail.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  namegroup: 'Tên Nhóm',\n  ownerinformation: 'Thông tin người chủ',\n  ownername: 'Tên NV',\n  ownertel: 'Điện thoại NV',\n  owneremail: 'Email NV',\n  companyinformation: 'Thông tin công ty',\n  companyname: 'Tên công ty',\n  businesslisencenumber: 'BLN',\n  companytel: 'Điện thoại Cty',\n  companyemail: 'Email công ty',\n  companyaddress: 'Địa chỉ công ty',\n  addhoteltogroup: 'Thêm vào nhóm',\n  table_hotel_name: 'Tên khách sạn',\n  table_status: 'Tình trạng',\n  table_phone: 'Điện thoại',\n  table_address: 'Địa chỉ',\n  table_commission: 'Hoa hồng',\n  operations: 'Hoạt động',\n  totalHotel: 'SL khách sạn'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/hotel-group/hotelGroupDetail.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/hotel-group/hotelGroupEdit.js":
/*!*********************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/hotel-group/hotelGroupEdit.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  namegroup: 'Tên Nhóm',\n  ownerinformation: 'Thông tin người chủ',\n  ownername: 'Tên NV',\n  ownertel: 'Điện thoại NV',\n  owneremail: 'Email NV',\n  companyinformation: 'Thông tin công ty',\n  companyname: 'Tên công ty',\n  businesslisencenumber: 'BLN',\n  companytel: 'Điện thoại Cty',\n  companyemail: 'Email công ty',\n  companyaddress: 'Địa chỉ công ty',\n  addhoteltogroup: 'Thêm vào nhóm',\n  table_hotel_name: 'Tên khách sạn',\n  table_status: 'Tình trạng',\n  table_phone: 'Điện thoại',\n  table_address: 'Địa chỉ',\n  table_commission: 'Hoa hồng',\n  operations: 'Hoạt động',\n  requiredNameGroup: 'Tên Nhóm là trường bắt buộc',\n  requiredNameOwnerInfo: 'Thông tin người chủ là trường bắt buộc',\n  requiredOwnerTel: 'Điện thoại NV là trường bắt buộc',\n  requiredOwnerEmail: 'Email NV là trường bắt buộc'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/hotel-group/hotelGroupEdit.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/hotel-group/hotelGroupList.js":
/*!*********************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/hotel-group/hotelGroupList.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'Tên Nhóm',\n  ownerName: 'Tên NV',\n  ownerTel: 'Điện thoại NV',\n  ownerEmail: 'Email NV',\n  companyName: 'Tên công ty',\n  bln: 'BLN',\n  companyAddress: 'Địa chỉ công ty',\n  companyTel: 'Điện thoại Cty',\n  companyEmail: 'Email công ty',\n  totalHotel: 'SL khách sạn'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/hotel-group/hotelGroupList.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/hotel-staff/hotelStaffEdit.js":
/*!*********************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/hotel-staff/hotelStaffEdit.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  hotel_name: 'Tên khách sạn',\n  user_id: 'User Id',\n  full_name: 'Họ tên',\n  role: 'Phân quyền',\n  mobile: 'Di động',\n  receive_sms: 'Nhận tin nhắn',\n  email: 'Email',\n  debt_reconciliation_email: 'Email công nợ',\n  address: 'Địa chỉ',\n  memo: 'Ghi chú',\n  password: 'Mật khẩu',\n  confirm_password: 'Xác nhận mật khẩu',\n  admin_ks: 'Admin KS',\n  manager: 'Quản Lý',\n  reception: 'Lễ Tân',\n  status: 'Hoạt động',\n  hotel_employee: 'Tên khách sạn',\n  requiredHotelName: 'Tên khách sạn là trường bắt buộc',\n  requiredUserId: 'User Id là trường bắt buộc',\n  requiredRole: 'Phân quyền là trường bắt buộc',\n  requiredEmail: 'Email là trường bắt buộc',\n  requiredMobile: 'Di động là trường bắt buộc',\n  requiredDebtEmail: 'Email công nợ là trường bắt buộc',\n  requiredPassword: 'Mật khẩu là trường bắt buộc',\n  requiredFullName: 'Họ tên là trường bắt buộc',\n  requiredConfirmPassword: 'Xác nhận mật khẩu là trường bắt buộc',\n  validatePassConfirm: 'Xác nhận mật khẩu không giống nhau',\n  requirePass: 'Vui lòng nhập mật khẩu',\n  requirePassConfirm: 'Vui lòng xác nhân mật khẩu'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/hotel-staff/hotelStaffEdit.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/hotel-staff/hotelStaffList.js":
/*!*********************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/hotel-staff/hotelStaffList.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  placeholder: 'Tên khách sạn',\n  hotel_name: 'Tên khách sạn',\n  user_id: 'User Id',\n  full_name: 'Họ tên',\n  role: 'Phân quyền',\n  mobile: 'Di động',\n  receive_sms: 'Nhận tin nhắn',\n  email: 'Email',\n  status: 'Hoạt động'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/hotel-staff/hotelStaffList.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/notice-to-hotel/detail-reply.js":
/*!***********************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/notice-to-hotel/detail-reply.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  hotel_name: 'Tên khách sạn',\n  message_type: 'Loại tin nhắn',\n  allow_to_reply: 'Cho phép trả lời',\n  create_staff: 'Người tạo',\n  create_time: 'Thời gian tạo',\n  last_update: 'Cập nhật cuối',\n  topic: 'Chủ đề',\n  brief_detail: 'Tóm tắt',\n  detail: 'Chi tiết',\n  answer1: 'Cho phép',\n  answer0: 'Không cho phép',\n  Notification: 'Thông báo',\n  notice_of_no_show: 'Thông báo Không nhận phòng',\n  notice_of_Checked_in_l: 'Thông báo Nhận phòng L',\n  apply_for_hotel: 'Áp dụng cho KS',\n  function: 'Chức năng',\n  promotion: 'Khuyến mãi',\n  term_policy: 'Quy định và chính sách',\n  all_hotels: 'Tất cả khách sạn',\n  all_hotel_contracts: 'Tất cả khách sạn hợp đồng',\n  all_hotel_tries: 'Tất cả khách sạn dùng thử',\n  only_apply: 'Chỉ áp dụng',\n  hotel_list: 'Danh sách khách sạn',\n  requiredType: 'Loại tin nhắn là trường bắt buộc',\n  requiredHotelList: 'Áp dụng cho KS là trường bắt buộc',\n  requiredTitle: 'Chủ đề là trường bắt buộc',\n  content_qa: 'Nội dung Q&A',\n  message_reply_success: 'Phản hồi thành công',\n  message_sent_success: 'Gửi thành công',\n  message_sent_error: 'Gửi thất bại'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/notice-to-hotel/detail-reply.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/notice-to-hotel/noticeApplyHotel.js":
/*!***************************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/notice-to-hotel/noticeApplyHotel.js ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  hotel_name: 'Tên khách sạn',\n  code: 'Mã',\n  status: 'Tình trạng',\n  phone: 'Điện thoại',\n  address: 'Địa chỉ',\n  create_time: 'Thời gian tạo',\n  last_update: 'Cập nhật lần cuối',\n  operations: 'Hoạt động',\n  placeholder: 'Từ khóa',\n  all: 'Tất cả'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/notice-to-hotel/noticeApplyHotel.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/notice-to-hotel/noticeDetail.js":
/*!***********************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/notice-to-hotel/noticeDetail.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  hotel_name: 'Tên khách sạn',\n  message_type: 'Loại tin nhắn',\n  allow_to_reply: 'Cho phép trả lời',\n  create_staff: 'Người tạo',\n  create_time: 'Thời gian tạo',\n  last_update: 'Cập nhật cuối',\n  topic: 'Chủ đề',\n  brief_detail: 'Tóm tắt',\n  detail: 'Chi tiết',\n  answer1: 'Cho phép',\n  answer0: 'Không cho phép',\n  Notification: 'Thông báo',\n  notice_of_no_show: 'Thông báo Không nhận phòng',\n  notice_of_Checked_in_l: 'Thông báo Nhận phòng L',\n  apply_for_hotel: 'Áp dụng cho KS',\n  function: 'Chức năng',\n  promotion: 'Khuyến mãi',\n  term_policy: 'Quy định và chính sách',\n  all_hotels: 'Tất cả khách sạn',\n  all_hotel_contracts: 'Tất cả khách sạn hợp đồng',\n  all_hotel_tries: 'Tất cả khách sạn dùng thử',\n  only_apply: 'Chỉ áp dụng',\n  hotel_list: 'Danh sách khách sạn',\n  requiredType: 'Loại tin nhắn là trường bắt buộc',\n  requiredHotelList: 'Áp dụng cho KS là trường bắt buộc',\n  requiredTitle: 'Chủ đề là trường bắt buộc',\n  content_qa: 'Nội dung Q&A',\n  message_reply_success: 'Phản hồi thành công',\n  message_sent_success: 'Gửi thành công',\n  message_sent_error: 'Gửi thất bại'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/notice-to-hotel/noticeDetail.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/notice-to-hotel/noticeHotelList.js":
/*!**************************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/notice-to-hotel/noticeHotelList.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  create_staff: 'Người tạo',\n  create_time: 'Thời gian tạo',\n  last_update: 'Cập nhật cuối',\n  hotel_name: 'Tên khách sạn',\n  status: 'Tình trạng',\n  phone: 'Điện thoại',\n  address: 'Địa chỉ'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/notice-to-hotel/noticeHotelList.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/notice-to-hotel/noticeList.js":
/*!*********************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/notice-to-hotel/noticeList.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  topic: 'Chủ đề',\n  message_type: 'Loại tin nhắn',\n  apply_for_hotel: 'Áp dụng cho',\n  create_staff: 'Người tạo',\n  create_time: 'Thời gian tạo',\n  last_update: 'Cập nhật cuối',\n  hotel_name: 'Tên khách sạn',\n  status: 'Tình trạng',\n  phone: 'Điện thoại',\n  address: 'Địa chỉ',\n  placeholder: 'Từ khóa',\n  operations: 'Hoạt động'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/notice-to-hotel/noticeList.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/notice-to-hotel/sendNotice.js":
/*!*********************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/notice-to-hotel/sendNotice.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  list_hotel: 'Danh sách khách sạn',\n  content_qa: 'Nội dung Q&A',\n  inform_hotel_by: 'Thông báo tới khách sạn bằng ',\n  email: 'Email',\n  go2joy_partner_app: 'Ứng dụng Partner',\n  send_email: 'Send Message',\n  list: 'Danh sách',\n  send: 'Gửi',\n  reply: 'Reply',\n  done: 'Hoàn thành',\n  hotel_name: 'Tên khách sạn',\n  message_type: 'Loại tin nhắn',\n  allow_to_reply: 'Cho phép trả lời',\n  create_staff: 'Người tạo',\n  create_time: 'Thời gian tạo',\n  last_update: 'Cập nhật cuối',\n  topic: 'Chủ đề',\n  brief_detail: 'Tóm tắt',\n  detail: 'Chi tiết',\n  answer1: 'Cho phép',\n  answer0: 'Không cho phép',\n  Notification: 'Thông báo',\n  notice_of_no_show: 'Thông báo Không nhận phòng',\n  notice_of_Checked_in_l: 'Thông báo Nhận phòng L',\n  apply_for_hotel: 'Áp dụng cho KS',\n  function: 'Chức năng',\n  promotion: 'Khuyến mãi',\n  term_policy: 'Quy định và chính sách',\n  all_hotels: 'Tất cả khách sạn',\n  all_hotel_contracts: 'Tất cả khách sạn hợp đồng',\n  all_hotel_tries: 'Tất cả khách sạn dùng thử',\n  only_apply: 'Chỉ áp dụng'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/notice-to-hotel/sendNotice.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/product-type/productType.js":
/*!*******************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/product-type/productType.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name_product_type: 'Loại sản phẩm',\n  image_product_type: 'Hình ảnh',\n  status_product_type: 'Trạng thái',\n  last_update_product_type: 'Chỉnh sửa lần cuối',\n  operations: 'Thao tác'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/product-type/productType.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/product-type/productTypeAdd.js":
/*!**********************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/product-type/productTypeAdd.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  product_type_name: 'Loại sản phẩm',\n  product_type_nameEn: 'Loại sản phẩm (Tiếng anh)',\n  image: 'Hình ảnh',\n  requiredName: 'Loại sản phẩm là trường bắt buộc',\n  requiredNameEn: 'Loại sản phẩm (Tiếng anh) là trường bắt buộc',\n  requiredImage: 'Hình ảnh là trường bắt buộc',\n  buttonAdd: 'Thêm',\n  buttonBack: 'Trở về'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/product-type/productTypeAdd.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/product-type/productTypeEdit.js":
/*!***********************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/product-type/productTypeEdit.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  product_type_name: 'Loại sản phẩm',\n  product_type_nameEn: 'Loại sản phẩm (Tiếng anh)',\n  image: 'Hình ảnh',\n  requiredName: 'Loại sản phẩm là trường bắt buộc',\n  requiredNameEn: 'Loại sản phẩm (Tiếng anh) là trường bắt buộc',\n  requiredImage: 'Hình ảnh là trường bắt buộc',\n  buttoEdit: 'Sửa',\n  buttonBack: 'Trở về'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/product-type/productTypeEdit.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/product/product.js":
/*!**********************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/product/product.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  product_name: 'Tên sản phẩm',\n  product_type_name: 'Loại sản phẩm',\n  price: 'Giá',\n  prepare_before_1_day: 'Chuẩn bị trước 1 ngày',\n  last_update: 'Cập nhật cuối',\n  status: 'Trạng thái',\n  placeholder: 'Tên khách sạn'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/product/product.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/product/productDetail.js":
/*!****************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/product/productDetail.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  hotel: 'Khách sạn',\n  product_name: 'Tên sản phẩm',\n  product_name_en: 'Tên sản phẩm (Tiếng Anh)',\n  product_type_name: 'Loại sản phẩm',\n  product_type_name_en: 'Loại sản phẩm (Tiếng anh)',\n  price: 'Giá',\n  prepare_before_1_day: 'Chuẩn bị trước 1 ngày',\n  description: 'Mô tả',\n  status: 'Trạng thái',\n  create_staff: 'Nhân viên tạo',\n  last_update: 'Cập nhật cuối',\n  image: 'Hình ảnh'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/product/productDetail.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  fs_report: 'Báo cáo FS',\n  fs_setting: 'Cài đặt FS',\n  add: 'Thêm',\n  flash_sale: 'Giảm sốc',\n  extra_fee: 'Phụ thu',\n  direct_discount: 'Giảm giá',\n  sold_out: 'Mở phòng hôm nay',\n  hotel_name: 'Tên khách sạn',\n  room_type: 'Loại phòng',\n  room_price: 'Giá phòng',\n  day: 'Ngày',\n  three_days: '3 Ngày',\n  one_week: '1 Tuần',\n  one_month: '1 Tháng',\n  two_months: '2 Tháng',\n  three_months: '3 Tháng',\n  detail: 'Xem chi tiết phòng',\n  create: 'Tạo lịch',\n  edit: 'Sửa',\n  delete: 'Xóa',\n  confirm: 'Xác nhận',\n  save: 'Lưu',\n  cancel: 'Hủy',\n  popup: 'Bạn có 1 yêu cầu xác nhận',\n  headerFlashSale: 'Phòng Giảm Sốc đang chạy',\n  contentFlashSale: 'Vì thế, Go2joy sẽ dừng chạy Phòng Giảm Sốc và Khoá phòng hôm nay',\n  is_lock_room: 'Hết phòng hôm nay',\n  instant_lock: 'Khóa phòng ngay',\n  room_left: 'Số phòng còn lại',\n  room_setting: 'Cài đặt phòng',\n  pick_a_day: 'Chọn 1 ngày',\n  room_left_content: 'Chọn số lượng phòng còn lại để bán. Hệ thống sẽ tự động khóa loại phòng này khi bán hết.',\n  createSchedule: 'Tạo lịch'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/room-type/calendar.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/room-type/comFirmLockRoom.js":
/*!********************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/room-type/comFirmLockRoom.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'Xác nhận khóa phòng',\n  room_name: 'Tên phòng',\n  block_time: 'Thời gian khóa'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/room-type/comFirmLockRoom.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/room-type/createRoomType.js":
/*!*******************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/room-type/createRoomType.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  hotel_name: 'Tên khách sạn',\n  name_short_name: 'Tên',\n  name_room: 'Tên phòng',\n  short_name: 'Tên viết  tắt',\n  room_type: 'Loại phòng',\n  num_of_room: 'Số lượng phòng',\n  first_hours_price: 'Giá giờ đầu',\n  num_of_hours: 'Số giờ',\n  max_num_hour: 'Giờ tối đa',\n  plus_hours_price: 'Giá thêm giờ',\n  price: 'Giá',\n  overnight_price: 'Giá qua đêm',\n  one_day_price: 'Giá một ngày',\n  square_bed_type_view: 'Diện tích/Loại giường/Góc nhìn',\n  not_select: 'Không chọn',\n  single: 'Giường đơn',\n  double: 'Giường đôi',\n  twin: 'Hai giường đơn',\n  triple: 'Một đơn, một đôi',\n  _2double: 'Hai giường đôi',\n  limit_number: 'Giới hạn đặt phòng sử dụng giảm giá 1 ngày',\n  no_limit: 'Không giới hạn',\n  memo: 'Ghi chú',\n  home_image: 'Hình hiển thị',\n  image: 'Hình ',\n  _360image: 'Hình 360',\n  normal: 'Phòng thường',\n  flash_sale: 'Giảm đặc biệt',\n  normal_room: 'Phòng thường',\n  facilities: 'Tiện ích'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/room-type/createRoomType.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/room-type/detailRoomType.js":
/*!*******************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/room-type/detailRoomType.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'Xem chi tiết phòng',\n  hotel_name: 'Tên khách sạn',\n  name_short_name: 'Tên/Tên loại phòng',\n  num_of_room: 'Số phòng',\n  first_hours_price: 'Giá giờ đầu',\n  max_num_hour: 'Giờ tối đa',\n  plus_hour_price: 'Giá thêm giờ',\n  overnight_price: 'Giá qua đêm',\n  one_day_price: 'Giá một ngày',\n  square: 'Diện tích',\n  bed_type: 'Loại giường',\n  view: 'Góc nhìn',\n  memo: 'Memo',\n  facilities: 'Tiện ích',\n  special_offer: {\n    name: 'Chương trình đặc biệt',\n    description: 'Mô tả',\n    end_date: 'Ngày kết thúc',\n    gift_image: 'Hình quà tặng'\n  },\n  flash_sale: {\n    name: 'Giảm sốc',\n    name_flash_sale: 'Tên',\n    description: 'Mô tả',\n    sale_start: 'Ngày bắt đầu',\n    quantity: 'Số lượng',\n    flash_sale_price: 'Giá giảm sốc'\n  },\n  extra_fee: {\n    name: 'Phụ thu',\n    booking_type: 'Loại đặt phòng',\n    origin: 'Gốc',\n    extra_fee: 'Phụ thu',\n    start_end: 'Bắt đầu/Kết thúc phụ thu',\n    days_apply: 'Ngày áp dụng phụ thu',\n    special_date: 'Ngày đặc biệt khác'\n  },\n  direct_discount: {\n    name: 'Giảm giá',\n    booking_type: 'Loại đặt phòng',\n    origin: 'Gốc',\n    direct_discount: 'Giảm giá',\n    start_end: 'Bắt đầu/Kết thúc giảm giá',\n    days_apply: 'Ngày áp dụng giảm giá',\n    special_date: 'Ngày đặc biệt khác'\n  },\n  bed_types: {\n    not_select: 'Không chọn',\n    single: 'Giường đơn',\n    double: 'Giường đôi',\n    twin: 'Hai giường đôi',\n    triple: 'Một đơn, một đôi',\n    _2double: 'Hai giường đôi'\n  },\n  lockRoomHistory: 'Lịch sử khóa phòng',\n  roomType: 'Loại phòng',\n  dateRange: 'Khoảng thời gian',\n  startDate: 'Ngày bắt đầu',\n  endDate: 'Ngày kết thúc',\n  bookingType: 'Loại đặt phòng',\n  startTime: 'Giờ bắt đầu',\n  endTime: 'Giờ kết thúc',\n  allRoomTypes: 'Tất cả loại phòng',\n  daily: 'Theo ngày',\n  hours: 'Theo giờ',\n  overnight: 'Qua đêm',\n  allBookingTypes: 'Tất cả loại đặt phòng'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/room-type/detailRoomType.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/room-type/directDiscount.js":
/*!*******************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/room-type/directDiscount.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'Giảm giá',\n  hotel_name: 'Tên khách sạn',\n  name_short_name: 'Tên/Tên viết tắt',\n  num_of_room: 'Số phòng',\n  start_end: 'Bắt đầu/Kết thúc giảm giá',\n  days_apply: 'Ngày áp dụng giảm giá',\n  monday: 'Thứ hai',\n  tuesday: 'Thứ ba',\n  wednesday: 'Thứ tư',\n  thursday: 'Thứ năm',\n  friday: 'Thứ sáu',\n  saturday: 'Thứ bảy',\n  sunday: 'Chủ nhật',\n  special_date: 'Ngày đặc biệt khác',\n  first_hours_price: 'Giá giờ đầu',\n  num_of_hours: 'Số giờ',\n  price: 'Giá',\n  direct_discount_price: 'Giá sau giảm',\n  plus_hours_price: 'Giá thêm giờ',\n  overnight_price: 'Giá qua đêm',\n  one_day_price: 'Giá một ngày',\n  booking_type: 'Loại đặt phòng',\n  origin: 'Gốc',\n  success: 'Thành công',\n  createSuccess: 'Tạo thành công',\n  checkSuccess: 'Thành công',\n  requireDirectDiscount: 'Nhập giá sau khuyến mãi',\n  start_date: 'Ngày bắt đầu',\n  end_date: 'Ngày kết thúc'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/room-type/directDiscount.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/room-type/editRoomType.js":
/*!*****************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/room-type/editRoomType.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  hotel_name: 'Tên khách sạn',\n  name_short_name: 'Tên',\n  name_room: 'Tên phòng',\n  short_name: 'Tên viết  tắt',\n  room_type: 'Loại phòng',\n  num_of_room: 'Số lượng phòng',\n  first_hours_price: 'Giá giờ đầu',\n  num_of_hours: 'Số giờ',\n  max_num_hour: 'Giờ tối đa',\n  plus_hours_price: 'Giá thêm giờ',\n  price: 'Giá',\n  overnight_price: 'Giá qua đêm',\n  one_day_price: 'Giá một ngày',\n  square_bed_type_view: 'Diện tích/Loại giường/Góc nhìn',\n  not_select: 'Không chọn',\n  single: 'Giường đơn',\n  double: 'Giường đôi',\n  twin: 'Hai giường đơn',\n  triple: 'Một đơn, một đôi',\n  _2double: 'Hai giường đôi',\n  limit_number: 'Giới hạn đặt phòng sử dụng giảm giá 1 ngày',\n  no_limit: 'Không giới hạn',\n  memo: 'Ghi chú',\n  home_image: 'Hình hiển thị',\n  image: 'Hình ',\n  _360image: 'Hình 360',\n  normal: 'Phòng thường',\n  flash_sale: 'Giảm đặc biệt',\n  normal_room: 'Phòng thường',\n  facilities: 'Tiện ích',\n  bonus_hours: 'Tặng thêm giờ',\n  min_booking_hours: 'Giờ tối thiểu',\n  num_of_bonus_hours: 'Giờ tặng',\n  gift_desc: 'Miêu tả',\n  gift_from_hotel: 'Quà tặng',\n  to_date: 'Đến ngày',\n  gift_image: 'Hình quà tặng'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/room-type/editRoomType.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/room-type/exportFlashSale.js":
/*!********************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/room-type/exportFlashSale.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'Xuất báo cáo Phòng Giảm Sốc',\n  export_title: 'Vui lòng chọn ngày để xuất Phòng Giảm Sốc.'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/room-type/exportFlashSale.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/room-type/extraFee.js":
/*!*************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/room-type/extraFee.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'Phụ thu',\n  hotel_name: 'Tên khách sạn',\n  name_short_name: 'Tên/Tên viết tắt',\n  num_of_room: 'Số phòng',\n  start_end: 'Bắt đầu/Kết thúc phụ thu',\n  days_apply: 'Ngày áp dụng phụ thu',\n  monday: 'Thứ hai',\n  tuesday: 'Thứ ba',\n  wednesday: 'Thứ tư',\n  thursday: 'Thứ năm',\n  friday: 'Thứ sáu',\n  saturday: 'Thứ bảy',\n  sunday: 'Chủ nhật',\n  special_date: 'Ngày đặc biệt khác',\n  first_hours_price: 'Giá giờ đầu',\n  num_of_hours: 'Số giờ',\n  price: 'Giá',\n  after_extra_fee: 'Giá sau phụ thu (From 1% - 500%)',\n  plus_hours_price: 'Giá thêm giờ',\n  overnight_price: 'Giá qua đêm',\n  one_day_price: 'Giá một ngày',\n  booking_type: 'Loại đặt phòng',\n  origin: 'Gốc',\n  success: 'Thành công',\n  createSuccess: 'Tạo thành công',\n  checkSuccess: 'Thành công',\n  requireDirectDiscount: 'Nhập giá sau khuyến mãi',\n  start_date: 'Ngày bắt đầu',\n  end_date: 'Ngày kết thúc'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/room-type/extraFee.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/room-type/settingFS.js":
/*!**************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/room-type/settingFS.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  notification: 'Thời gian gửi thông báo Flash Sale',\n  flash_sale_threshold: 'Hạn mức chuyển đổi',\n  template: 'Mẫu ',\n  notification_title: 'Tiêu đề thông báo Flash Sale',\n  notification_content: 'Nội dung thông báo Flash Sale',\n  success: 'Thành công'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/room-type/settingFS.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/hotels/stamp.js":
/*!************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/hotels/stamp.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  hotelName: 'Tên khách sạn',\n  stampsToRedeem: 'SL đủ đổi thưởng',\n  redeemValue: 'Giá trị đổi thưởng',\n  numberOfUsers: 'Số người tham gia',\n  totalRedemption: 'Số lần đổi thưởng',\n  startDate: 'Ngày bắt đầu',\n  lastUpdate: 'Ngày cập nhật cuối',\n  status: 'Trạng thái',\n  endDate: 'Ngày kết thúc',\n  operations: 'Thao tác',\n  suspend: 'Hoãn',\n  available: 'Hoạt động',\n  ended: 'Kết thúc',\n  canEarnStamp: 'Được nhận tem',\n  money: 'Giảm tiền',\n  percentage: 'Giảm phần trăm',\n  integrateWithFlashSale: 'Kết hợp với phòng giảm sốc',\n  canRedeemForBooking: 'Đổi thưởng với đặt phòng',\n  nickName: 'Nickname',\n  mobile: 'Số điện thoại',\n  effectiveStamps: 'Số tem khả dụng',\n  numberOfExpiredStamps: 'Số tem hết hạn',\n  startDateOfCollecting: 'Ngày bắt đầu thu thập tem',\n  inputUserNicknameOrPhoneNumber: 'Nhập tên hoặc sđt khách',\n  numberOfStamp: 'Số tem',\n  // View Stamp\n  maxRedeem: 'Giá trị đổi thưởng',\n  numToRedeem: 'SL đủ đổi thưởng',\n  numUserJoin: 'Số người tham gia',\n  totalRedeem: 'Số lần đổi thưởng',\n  numStampActive: 'Số tem khả dụng',\n  numStampExpire: 'Số tem hết hạn',\n  flashSaleEarn: 'Kết hợp với phòng giảm sốc',\n  // validation\n  requiredHotelName: 'Vui lòng chọn khách sạn',\n  requiredStartDate: 'Vui lòng chọn ngày bắt đầu'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/hotels/stamp.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/marketing/article.js":
/*!*****************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/marketing/article.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  send_mess: 'Gửi tin nhắn',\n  apply_hotel: 'Áp dụng cho',\n  hotel_list: 'Danh sách khách sạn',\n  just_apply: 'Chỉ áp dụng',\n  edit: 'Sửa',\n  delete: 'Xóa',\n  send: 'Gởi đi',\n  title: 'Tiêu đề',\n  home_page: 'Trang chủ',\n  create_staff: 'Nhân viên khởi tạo',\n  create_time: 'Thời gian tạo',\n  last_update: 'Cập nhật lần cuối',\n  summary: 'Tóm tắt',\n  content: 'Nội dung',\n  display: 'Hiển thị',\n  image: 'Hình ảnh',\n  detail_article: 'Chi tiết bài báo',\n  categoryName: 'Tên nhóm',\n  promotion: 'Khuyến mãi',\n  notice: 'Quy định và chính sách',\n  term_policy: 'Quy định và chính sách',\n  notification: 'Thông báo',\n  unread: 'Chưa đọc',\n  waiting: 'Chờ duyệt',\n  displayed: 'Đã duyệt',\n  contracted: 'Hợp đồng',\n  trial: 'Dùng thử',\n  terminated: 'Dừng hợp đồng',\n  suspended: 'Treo',\n  all_hotel: 'Tất cả khách sạn',\n  all_contracted: 'Tất cả ks hợp đồng',\n  all_trial: 'Tất cả ks dùng thử ',\n  yes: 'Có',\n  no: 'Không',\n  hashtag: 'Hash tag',\n  function: 'Chức năng',\n  requiredTitle: 'Vui lòng nhập tiêu đề',\n  requiredSlug: 'Vui lòng nhập Slug',\n  requiredAuthor: 'Vui lòng nhập tác giả',\n  requiredCategory: 'Vui lòng nhập nhóm',\n  requiredImage: 'Vui lòng upload hình ảnh',\n  requiredSummary: 'Vui lòng nhập tóm tắt',\n  requiredContent: 'Vui lòng nhập nội dung',\n  requiredHashtag: 'Vui lòng nhập Hashtag',\n  requiredCategoryName: 'Vui lòng nhập tên nhóm',\n  articleCategory: 'Nhóm bài viết',\n  category: 'Nhóm',\n  displayType: 'Loại hiển thị',\n  postingDate: 'Ngày đăng',\n  author: 'Tác giả',\n  operations: 'Thao tác',\n  schedulePosting: 'Lịch đăng bài viết',\n  numberOfArticle: 'Số lượng bài báo',\n  addArticle: 'Thêm bào báo',\n  lastUpdate: 'Cập nhật cuối',\n  views: 'Lượt xem',\n  articleTitle: 'Tiêu đề bài báo',\n  keyword: 'Từ khoá',\n  confirmDeleteCategory: 'Bạn có chắc bạn muốn xoá nhóm bài báo này?',\n  by: 'Bởi',\n  schema: 'Schema'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/marketing/article.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/marketing/banner.js":
/*!****************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/marketing/banner.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  choose_display_in_app_web: 'Chọn hiển thị trên App/Web',\n  title: 'Tiêu đề',\n  image: 'Hình ảnh',\n  linkedName: 'Tên liên kết',\n  totalClicks: 'Tổng lượt click',\n  linkedType: 'Loại liên kết',\n  status: 'Trạng thái',\n  operations: 'Thao tác',\n  type: 'Loại liên kết',\n  listProvince: 'Khu vực hiển thị',\n  lastUpdate: 'Cập nhật cuối',\n  imagePath: 'Hình ảnh',\n  targetType: 'Loại liên kết',\n  linkItem: 'Phần tử liên kết',\n  display: 'Hiển thị',\n  stopAt: 'Ngày kết thúc',\n  chooseProvince: 'Chọn tỉnh/thành phố',\n  chooseDistrict: 'Chọn quận/huyện',\n  typesofdisplay: 'Loại hiển thị ',\n  random: 'Ngẫu nhiên',\n  custom: 'Tùy chỉnh',\n  // Validation\n  requiredTitle: 'Vui lòng nhập tiêu đề',\n  requiredTargetSn: 'Vui lòng chọn phần tử liên kết',\n  requiredTargetInfo: 'Vui lòng nhập link liên kết',\n  requiredProvinceSelected: 'Vui lòng chọn Tỉnh/thành phố'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/marketing/banner.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/marketing/crm/crm.js":
/*!*****************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/marketing/crm/crm.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  title: 'Tiêu đề',\n  createTime: 'Thời gian tạo',\n  lastUpdate: 'Cập nhật cuối',\n  status: 'Tình trạng',\n  active: 'Hoạt động',\n  expired: 'Hết hạn',\n  //\n  equal: 'Equal',\n  greater: 'Greater',\n  greaterEqual: 'Greater Equal',\n  less: 'Less',\n  lessEqual: 'Less Equal',\n  notEqual: 'Not equal',\n  //\n  male: 'Nam',\n  female: 'Nữ',\n  //\n  empty: 'Rỗng',\n  notEmpty: 'Không rỗng',\n  //\n  install: 'Cài đặt',\n  uninstall: 'Gỡ cài đặt'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/marketing/crm/crm.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/marketing/inviteFriend.js":
/*!**********************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/marketing/inviteFriend.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  title: 'Tiêu đề',\n  typeOfInvitation: 'Loại áp dụng',\n  dailyBudget: 'Ngân sách hằng ngày',\n  inviteeAmount: 'Quà người được mời',\n  inviterAmount: 'Quà người mời',\n  startEndDate: 'Ngày bắt đầu/Kết thúc',\n  createTime: 'Thời gian tạo',\n  lastUpdate: 'Cập nhật cuối',\n  operations: 'Thao tác',\n  unlimited: 'Không giới hạn',\n  account: 'Tài khoản',\n  status: 'Trạng thái',\n  inviteeInviter: 'Người được mời/ Người mời',\n  createBy: 'Được tạo bởi',\n  via: 'Thông qua',\n  guidelinesVn: 'Hướng dẫn (VN)',\n  guidelinesEn: 'Hướng dẫn (EN)',\n  SMSContent: 'Nội dung SMS',\n  startDate: 'Ngày bắt đầu',\n  endDate: 'Ngày kết thúc',\n  nickName: 'Nick name',\n  mobile: 'Di động',\n  registerProvince: 'Nợi đăng ký',\n  loginBy: 'Đăng nhập bởi',\n  registerTime: 'Ngày đăng ký',\n  openApp: 'Mở app',\n  totalInvitee: 'Số người mời',\n  stayAtHotelTime: 'Thời gian ở KS',\n  // validation\n  requiredTitle: 'Vui lòng nhập tiêu đề',\n  requiredStartDate: 'Vui lòng chọn ngày bắt đầu',\n  requiredEndDate: 'Vui lòng chọn ngày kết thúc',\n  requiredGuidelinesVn: 'Vui lòng nhập hướng dẫn (VN)',\n  requiredGuidelinesEn: 'Vui lòng nhập hướng dẫn (EN)'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/marketing/inviteFriend.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/marketing/lucky-wheel.js":
/*!*********************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/marketing/lucky-wheel.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  coupon: 'Coupon',\n  content: 'Nội dung',\n  images: 'Hình ảnh',\n  listCouponOneDayOrigin: 'Số coupon trên 1 ngày',\n  percentOrigin: 'Phần trăm hiển thị',\n  display: 'Hiển thị',\n  createTime: 'Ngày tạo',\n  lastUpdate: 'Cập nhật lần cuối'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/marketing/lucky-wheel.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/marketing/notice.js":
/*!****************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/marketing/notice.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  title: 'Tiêu đề',\n  homePage: 'Trang chủ',\n  createStaff: 'Nhân viên khởi tạo',\n  createTime: 'Thời gian tạo',\n  lastUpdate: 'Cập nhật lần cuối',\n  operations: 'Thao tác',\n  onTop: 'Trên đầu',\n  content: 'Nội dung chi tiết',\n  // Validation\n  requiredTitle: 'Vui lòng nhập tiêu đề',\n  requiredContent: 'Vui lòng nhập nội dung'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/marketing/notice.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/marketing/notification.js":
/*!**********************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/marketing/notification.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  title: 'Tiêu đề',\n  targetType: 'Đối tượng',\n  createStaff: 'NV khởi tạo',\n  sendTo: 'Gửi đến',\n  totalSend: 'Tổng gửi đi (Ios-Android)',\n  totalView: 'Tổng xem (Ios-Android)',\n  conversion: 'Chuyển đổi (Ios-Android)',\n  numSent: 'Số lần đã gửi',\n  createTime: 'Thời gian tạo',\n  sentTime: 'Thời gian gửi',\n  status: 'Trạng thái',\n  operations: 'Thao tác',\n  type: 'Loại thông báo',\n  subTitle: 'Nội dung tiêu đề',\n  filterByLocation: 'Lọc theo vị trí',\n  lastOpenApp: 'Lần cuối mở app',\n  rightNow: 'Ngay bây giờ',\n  schedule: 'Lịch gửi',\n  content: 'Nội dung',\n  noticeType: 'Loại thông báo',\n  titleIcon: 'Icon cho tiêu đề',\n  PleaseChooseExcelFile: 'Vui lòng chọn excel(.xslx)',\n  ChooseArea: 'Chọn khu vực',\n  // Validation\n  requiredTitle: 'Vui lòng nhập tiêu đề',\n  requiredTargetSn: 'Vui lòng chọn dối tượng',\n  requiredSchedule: 'Vui lòng chọn lịch gửi'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/marketing/notification.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/marketing/pgpb.js":
/*!**************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/marketing/pgpb.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'Tên',\n  mobile: 'Điện thoại',\n  code: 'Mã',\n  gender: 'Giới tính',\n  email: 'Email',\n  birthday: 'Sinh nhật',\n  address: 'Địa chỉ',\n  totalOfIntroduction: 'Tổng người giới thiệu',\n  hotelName: 'Tên khách sạn',\n  saleInfomation: 'Thông tin tìm kiếm',\n  operations: 'Thao tác',\n  hotelEmployee: 'Nhân viên khách sạn',\n  totalPay: 'Số người trả tiền',\n  totalNotPay: 'Số người không trả',\n  nickName: 'Nick name',\n  loginBy: 'Đăng nhập bởi',\n  registerTime: 'Thời gian đăng ký',\n  registerAddress: 'Địa chỉ đăng ký',\n  mobileId: 'Mobile ID',\n  os: 'Thiết bị',\n  pay: 'Trả tiền',\n  // Validation\n  requiredBirthday: 'Vui lòng nhập sinh nhật',\n  requiredMobile: 'Vui lòng nhập số điện thoại',\n  requiredName: 'Vui lòng nhập tên'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/marketing/pgpb.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/marketing/popup.js":
/*!***************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/marketing/popup.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  title: 'Tiêu đề',\n  image: 'Hình ảnh',\n  linkedName: 'Tên liên kết',\n  disableCondition: 'Điều kiện ngưng',\n  maxView: 'Số lần xem',\n  noViewLimit: 'không giới hạn',\n  totalOfViews: 'Tổng lượt xem',\n  totalClicks: 'Tổng lượt click',\n  linkedType: 'Loại liên kết',\n  status: 'Trạng thái',\n  operations: 'Thao tác',\n  type: 'Loại liên kết',\n  listProvince: 'Khu vực hiển thị',\n  lastUpdate: 'Cập nhật cuối',\n  imagePath: 'Hình ảnh',\n  targetType: 'Loại liên kết',\n  linkItem: 'Phần tử liên kết',\n  maxViewDisplay: 'Số lần xem / Hiển thị',\n  stopAt: 'Ngày kết thúc',\n  chooseProvince: 'Chọn tỉnh/thành phố',\n  chooseDistrict: 'Chọn quận/huyện',\n  typesofdisplay: 'Loại hiển thị ',\n  random: 'Ngẫu nhiên',\n  custom: 'Tùy chỉnh',\n  both: 'Cả 2',\n  numOfDisplay: 'Số lần hiển thị',\n  numOfCustomDisplay: 'Số lượng tùy chỉnh',\n  perDecivePerDate: '/ mỗi thiết bị / mỗi ngày',\n  noLimit: 'Không giới hạn',\n  content: 'Nội dung',\n  // Validation\n  requiredTitle: 'Vui lòng nhập tiêu đề',\n  requiredTargetSn: 'Vui lòng chọn phần tử liên kết',\n  requiredTargetInfo: 'Vui lòng nhập link liên kết',\n  requiredProvinceSelected: 'Vui lòng chọn Tỉnh/thành phố'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/marketing/popup.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/marketing/promotion/coupon-condition.js":
/*!************************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/marketing/promotion/coupon-condition.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  conditionCoupon: 'Điều kiện sử dụng coupon',\n  justUseCouponAt: 'Chỉ sử dụng coupon vào',\n  justUseFor: 'Có hiệu lực',\n  hourly: 'Theo giờ',\n  overnight: 'Qua đêm',\n  daily: 'Nhiều ngày',\n  hotelMaxOneDay: 'KS tối đa một ngày',\n  maxOneHotel: 'Một khách sạn',\n  noLimit: '0: Không giới hạn',\n  minBookingMoney: 'Tiền đặt phòng tối thiểu',\n  paymentWhenUseCoupon: 'Chỉ dùng coupon khi thanh toán',\n  couponMemo: 'Ghi chú VI|EN',\n  apply: 'Áp dụng',\n  issueCouponCondition: 'Điều kiện tặng coupon',\n  applyForUser: 'Áp dụng cho người dùng',\n  voucherCodeFor: 'Mã voucher dành cho',\n  contentOfValidation: 'Nội dung xác nhận VI|EN',\n  payHotel: 'Trả tại KS',\n  applyToHotel: 'Khách sạn có hiệu lực',\n  applyAllHotel: 'Tất cả khách sạn',\n  applyAllHotelExcept: 'Tất cả khách sạn ngọai trừ',\n  applyTodUser: 'Người dùng có hiệu lực',\n  applyAllUser: 'Tất cả người dùng',\n  applyAllUserExcept: 'Tất cả người dùng ngọai trừ',\n  signUpPeriod: 'Đăng ký trong khoảng',\n  numCheckIn: 'SL check-in',\n  numCheckInKs: 'SL check-in ks',\n  payment: 'PT thanh toán',\n  payInAdvance: 'Trả tiền trước',\n  bookingType: 'Loại đặt phòng',\n  bookingTime: 'Giờ đặt phòng',\n  //\n  name: 'Coupon',\n  both: 'Cả hai',\n  notUse: 'Không sử dụng',\n  use: 'Sử dụng',\n  //\n  momo: 'Momo',\n  credit: 'Thẻ tín dụng (OnePay)',\n  debit: 'Thẻ ghi nợ (OnePay)',\n  payoo: 'Pay@Store - Payoo',\n  zaloPay: 'ZaloPay',\n  creditCardVnpt: 'Thẻ tín dụng (VNPT)',\n  atmCardVnpt: 'Thẻ ATM (VNPT)',\n  shopeePay: 'ShopeePay',\n  creditCard: 'Credit card',\n  atmCard: 'ATM card',\n  //\n  onlyApply: 'Chỉ áp dụng',\n  conditionToUseCoupon: 'Điều kiện sử dụng coupon: ',\n  maxCouponPerDay: 'Lượng coupon tối đa 1 ngày:',\n  maxCouponPerHotel: 'Lượng coupon tối đa ở KS:',\n  //\n  commonCode: 'Mã phổ biến',\n  privateCode: 'Mã cá nhân'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/marketing/promotion/coupon-condition.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/marketing/promotion/create-promotion.js":
/*!************************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/marketing/promotion/create-promotion.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  title: 'Tiêu đề',\n  code: 'Mã khuyến mãi',\n  numOfCoupon: 'Lượng coupon một lần:',\n  maxNumOfCoupon: 'Coupon tối đa 1 người dùng',\n  type: 'Loại',\n  coPromotion: 'Co-Promotion',\n  display: 'Hiển thị App',\n  callMaxDiscount: 'Tính giảm giá',\n  discountAfterPromotion: 'Giảm giá sau KM khác',\n  makePLabel: 'Tạo nhãn P',\n  applyDirectDiscount: 'Giảm trực tiếp',\n  displayHotel: 'Hiện KS',\n  applyStartEnd: 'Thời gian áp dụng',\n  daysFromIssueDate: 'Ngày kể từ ngày phát hành ',\n  couponStartEnd: 'Thời hạn coupon',\n  discount: 'Giảm giá',\n  maxDiscount: 'Giảm giá tối đa',\n  go2joyHotel: 'Giảm giá của Go2Joy / Khách sạn',\n  contentVi: 'Nội dung (Tiếng việt)',\n  contentEn: 'Nội dung (Tiếng anh)',\n  content2: 'Nội dung 2',\n  memo: 'Memo',\n  typeOfDisplay: 'Các loại hiển thị',\n  subContentVi: 'Nội dung phụ(Tiếng Việt)',\n  subContentEn: 'Nội dung phụ(Tiếng Anh)',\n  nameOfButton: 'Tên nút(VI|EN)',\n  imageList: 'Hình danh sách',\n  imageDetail: 'Hình chi tiết',\n  promotionGroup: 'Nhóm khuyến mãi',\n  //\n  titleRequired: 'Trường tiêu đề là bắt buộc',\n  codeRequired: 'Trường mã khuyến mãi là bắt buộc',\n  contentViRequired: 'Trường nội dung (Tiếng việt) là bắt buộc',\n  contentEnRequired: 'Trường nội dung (Tiếng anh) là bắt buộc',\n  content2Required: 'Trường Nội dung 2 là bắt buộc',\n  memoRequired: 'Trường memo là bắt buộc',\n  subContentViRequired: 'Trường nội dung phụ(Tiếng Việt) là bắt buộc',\n  subContentEnRequired: 'Trường nội dung phụ(Tiếng Anh) là bắt buộc',\n  nameOfButtonRequired: 'Trường Tên nút(VI|EN) là bắt buộc',\n  listImageRequired: 'Trường hình danh sách là bắt buộc',\n  detailImageRequired: 'Trường hình chi tiết là bắt buộc'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/marketing/promotion/create-promotion.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/marketing/promotion/group-promotion.js":
/*!***********************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/marketing/promotion/group-promotion.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  groupName: 'Tên nhóm khuyến mãi',\n  promotionList: 'Danh sách khuyến mãi',\n  status: 'Tình trạng',\n  lastUpdate: 'Cật nhật cuối',\n  displayArea: 'Khu vực hiển thị',\n  title: 'Tiêu đề'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/marketing/promotion/group-promotion.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/marketing/promotion/issue-coupon-condition.js":
/*!******************************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/marketing/promotion/issue-coupon-condition.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'Điều kiện tặng coupon',\n  apply: 'Áp dụng:',\n  couponMemo: 'Ghi chú coupon VI|EN',\n  contentOfValidation: 'Nội dung xác nhận VI|EN',\n  numCheckIn: 'SL check-in',\n  numCheckInKs: 'SL check-in ks',\n  importUserByExcel: 'Nhập người dùng excel file',\n  signUpPeriod: 'Đăng ký trong khoản',\n  memo: 'Ghi chú'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/marketing/promotion/issue-coupon-condition.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/marketing/promotion/promotion.js":
/*!*****************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/marketing/promotion/promotion.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  promotionGroup: 'Nhóm khuyến mãi',\n  //\n  title: 'Tiêu đề',\n  code: 'Mã khuyến mãi',\n  type: 'Loại',\n  discount: 'Giảm giá',\n  applyStartEnd: 'Thời gian áp dụng',\n  couponStartEnd: 'Thời hạn coupon',\n  status: 'Tình trạng',\n  totalHotelApplied: 'Tổng khách sạn đăng kí',\n  totalUserApplied: 'Tổng người dùng',\n  totalCouponApplied: 'Tổng coupon đã phát hành',\n  total_consumed_applied: 'Tổng coupon đã dùng',\n  totalDiscount: 'Tổng giảm giá',\n  //\n  all: 'Tất cả',\n  apply: 'Áp dụng',\n  event: 'Sự kiện',\n  inviteFriend: 'Mời bạn',\n  gift: 'Quà tặng',\n  booking: 'Đặt phòng',\n  reportNewHotel: 'Báo khách sạn mới',\n  signUp: 'Đăng kí mới',\n  birthday: 'Sinh nhật',\n  payment: 'Thanh toán',\n  voucherCode: 'Mã voucher',\n  //\n  discountMoney: 'Giảm giá tiền',\n  discountPercent: 'Giảm giá %',\n  discountHours: 'Giảm giờ',\n  samePrice: 'Đồng giá',\n  //\n  banner: 'Banner',\n  detail: 'Detail',\n  //\n  deleted: 'Đã xóa',\n  active: 'Hoạt động',\n  expired: 'Hết hạn',\n  not_yet: 'Chưa hoạt động',\n  draft: 'Lưu tạm',\n  wait_confirm: 'Đợi xác nhận',\n  //\n  name: 'Tên khách sạn',\n  phone: 'Điện thoại',\n  address: 'Địa chỉ',\n  createTime: 'Thời gian tạo',\n  lastUpdate: 'Cập nhật cuối',\n  //\n  waiting: 'Chờ duyệt',\n  displayed: 'Đã duyệt',\n  contracted: 'Hợp đồng',\n  trial: 'Dùng thử',\n  terminated: 'Dừng hợp đồng',\n  suspended: 'Treo',\n  //\n  nickName: 'Nick name',\n  gender: 'Giới tính',\n  mobile: 'Di động',\n  applyTime: 'Apply Time',\n  hotelName: 'Tên khách sạn',\n  stayAtHotelTime: 'Thời gian ở KS',\n  couponIssuedTime: 'Thời gian coupon phát hành',\n  usedTime: 'Thời gian sử dụng',\n  //\n  applied: 'Đã áp dụng',\n  hadCoupon: 'Có coupon',\n  usedCoupon: 'Đã dùng coupon',\n  //\n  go2joyDiscount: 'Giảm giá Go2Joy',\n  hotelDiscount: 'Giảm giá của KS',\n  sponsorDiscount: 'Giảm giá của nhà tài trợ',\n  totalConsumedCoupon: 'Tổng coupon đã dùng',\n  totalGo2joyDiscount: 'Tổng giảm giá của Go2Joy',\n  totalHotelDiscount: 'Tổng giảm giá của khách sạn',\n  totalSponsorDiscount: 'Tổng giảm giá của nhà tài trợ',\n  maxCouponPerHotel: 'Lượng coupon tối đa ở KS',\n  numOfCoupon: 'Lượng coupon một lần',\n  maxNumOfCoupon: 'Coupon tối đa 1 người dùng',\n  imageOfList: 'Hình danh sách',\n  imageOfDetail: 'Hình chi tiết',\n  roomApplyList: 'Danh sách phòng áp dụng',\n  contentVi: 'Nội dung (Tiếng việt)',\n  contentEn: 'Nội dung (Tiếng anh)',\n  content2: 'Content2',\n  memo: 'Ghi chú',\n  normalRoom: 'Phòng thường',\n  //\n  applyAllHotel: 'Tất cả khách sạn',\n  applyAllHotelExcept: 'Tất cả khách sạn ngọai trừ',\n  onlyApply: 'Chỉ áp dụng',\n  listHotel: 'Danh sách khách sạn',\n  //\n  mobileSn: 'SN thiết bị',\n  appUserSn: 'SN người dùng',\n  os: 'Thiết bị',\n  mobileRegisterTime: 'Ngày cài thiết bị',\n  email: 'Email',\n  loginBy: 'Đăng nhập bởi',\n  effectivePoint: 'Điểm dùng được',\n  registerTime: 'Ngày đăng kí',\n  openApp: 'Mở app',\n  //\n  winner: 'Người thắng',\n  waitingList: 'Danh sách đang duyệt',\n  userAppliedList: 'Danh sách người dùng đã apply',\n  couponContent: 'ngày kể từ ngày phát hành'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/marketing/promotion/promotion.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/marketing/sms.js":
/*!*************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/marketing/sms.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  sms_type: 'Loại Tin Nhắn',\n  sender: 'Người gởi',\n  content: 'Nội dung(tiếng việt không dấu)',\n  create_staff: 'Nhân viên tạo',\n  create_time: 'Thời gian tạo',\n  send_to: 'Gởi tới',\n  num_of_sms: 'Số lượng gởi',\n  total_price: 'Tổng tiền(VND)',\n  send_schedule: 'Lịch gởi',\n  send_time: 'Thời gian gởi',\n  email: 'Email',\n  account: 'Tài khoản',\n  sender_type: 'Người gửi / Loại tin nhắn',\n  area: 'Khu vực',\n  select_hotel: 'Chọn khách sạn',\n  hotel_list: 'Danh sách khách sạn',\n  number_list: 'Danh sách số điện thoại',\n  key_search: 'Từ khóa',\n  user_list: 'Dách sách người dùng',\n  please_choose: 'Vui lòng chọn excel file',\n  create: 'Tạo',\n  back: 'Trở về',\n  send: 'Gửi',\n  go2joy: 'Go2Joy.vn',\n  phone: '0931.836.836',\n  random_number: 'Số ngẫu nhiên',\n  custom_care: 'C.S.K.H',\n  marketing: 'Quảng cáo',\n  all: 'Tất cả khách sạn',\n  specific_area: 'Chọn khu vực',\n  specific_hotel: 'Chọn khách sạn',\n  specific_number: 'Chọn số điện thoại',\n  specific_user: 'Chọn người dùng',\n  import_from_excel_file: 'Nhập từ file excel',\n  all_user: 'Tất cả người dùng',\n  excelFile: 'Tập tin excel',\n  importFile: 'Nhập tập tin',\n  hotelName: 'Tên khách sạn'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/marketing/sms.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/mileage-point/MpBoosting.js":
/*!************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/mileage-point/MpBoosting.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  mileageName: 'Tên',\n  numberOfPoints: 'Điểm',\n  period: 'Thời hạn',\n  bookingType: 'Loại đặt phòng',\n  applyDays: 'Ngày hiệu lực',\n  roomType: 'Loại phòng',\n  minFee: 'Phí tối thiểu',\n  combinePromotion: 'Khuyến mãi',\n  payment: 'Thanh toán',\n  hotelName: 'Tên khách sạn',\n  bookingNo: 'Mã đặt phòng',\n  nickName: 'Nick name',\n  stayAtHotelTime: 'Thời gian ở KS',\n  amount: 'Giá trị',\n  expireTime: 'Hết hạn',\n  CreateTime: 'Thời gian tạo',\n  email: 'Email',\n  phone: 'Di động',\n  effectivePoint: 'Điểm dùng được',\n  earnedPoint: 'Điểm kiếm được',\n  usedPoint: 'Điểm đã dùng',\n  expiredPoint: 'Điểm hết hạn',\n  earnedFirstTime: 'Thời gian đầu kiếm được',\n  type: 'Loại',\n  createTime: 'Thời gian tạo',\n  monday: 'T.Hai',\n  tuesday: 'T.Ba',\n  wednesday: 'T.Tư',\n  friday: 'T.Năm',\n  thursday: 'T.Sáu',\n  saturday: 'T.Bảy',\n  sunday: 'C.Nhật',\n  hourly: 'Theo giờ',\n  overnight: 'Qua đêm',\n  daily: 'Nhiều ngày',\n  normal: 'Phòng thường',\n  flashSale: 'Phòng giảm sốc',\n  flashsaleRoom: 'Phòng giảm sốc',\n  normalRoom: 'Phòng thường',\n  yes: 'Có',\n  no: 'Không',\n  payAtHotel: 'Tại khách sạn',\n  zaloCredit: 'Thẻ credit',\n  zaloDebit: 'Thẻ debit',\n  payAtStore: 'Pay@Store',\n  mileageDetailTitle: 'Chi Tiết Điểm Thưởng',\n  hotelList: 'D.S.K.S',\n  allHotel: 'Tất cả',\n  allHotelReject: 'Tất cả ngoại trừ',\n  justApply: 'Chỉ áp dụng',\n  specifyProvince: 'Chỉ khu vực',\n  hotel_name: 'Tên khách sạn',\n  status: 'Tình trạng',\n  address: 'Địa chỉ',\n  create_time: 'Thời gian tạo',\n  last_update: 'Cập nhật cuối',\n  area_code: 'Mã tỉnh',\n  ios_total_access: 'Ios mở app',\n  android_total_access: 'Android mở app',\n  waiting: 'Chờ duyệt',\n  displayed: 'Đã duyệt',\n  contracted: 'Hợp đồng',\n  trial: 'Dùng thử',\n  terminated: 'Dừng hợp đồng',\n  suspended: 'Treo',\n  'startDate/endDate': 'Ngày bắt đầu - Ngày kết thúc',\n  requiredName: 'Vui lòng nhập tên điểm thưởng',\n  requiredNumPoint: 'Vui lòng nhập điểm thưởng',\n  requiredMinFee: 'Vui lòng nhập khuyến mãi'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/mileage-point/MpBoosting.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/mileage-point/mileagePoint.js":
/*!**************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/mileage-point/mileagePoint.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  nickName: 'Nick name',\n  email: 'Email',\n  mobile: 'Di động',\n  effectivePoint: 'Điểm dùng được',\n  earnedPoint: 'Điểm kiếm được',\n  usedPoint: 'Điểm đã dùng',\n  expiredPoint: 'Điểm hết hạn',\n  earnedFirstTime: 'Thời gian đầu kiếm được',\n  userdPoint: 'Điểm đã dùng',\n  mileageName: 'Tên',\n  type: 'Loại',\n  hotelName: 'Tên khách sạn',\n  bookingNo: 'Mã đặt phòng',\n  numberOfPoints: 'Điểm',\n  amount: 'Giá trị',\n  expireTime: 'Hết hạn',\n  createTime: 'Thời gian tạo',\n  get: 'Nhận',\n  use: 'Sử dụng',\n  expired: 'Hết hạn'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/mileage-point/mileagePoint.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/profile/profile.js":
/*!***************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/profile/profile.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  userID: 'User Id',\n  full_name: 'Họ tên',\n  mobile: 'Di động',\n  address: 'Địa chỉ',\n  email: 'Email',\n  memo: 'Ghi chú',\n  current_password: 'Mật khẩu hiện hành',\n  new_password: 'Mật khẩu mới',\n  confirm_new_password: 'Xác nhận mật khẩu mới'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/profile/profile.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/sa-account/confirmGroup.js":
/*!***********************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/sa-account/confirmGroup.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  staffName: 'Tên nhân viên',\n  roleName: 'Phân quyền',\n  mobile: 'Di động',\n  enable: 'Hoạt động',\n  region: 'Khu vực',\n  confirmPermission: 'Quyền xác nhận',\n  createTime: 'Thời gian tạo',\n  placeholder: 'Nhân viên',\n  operations: 'Thao tác',\n  level1: 'Cấp duyệt 1',\n  level2: 'Cấp duyệt 2'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/sa-account/confirmGroup.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/sa-account/permission.js":
/*!*********************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/sa-account/permission.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  roleName: 'Tên quyền',\n  subSupperAdmin: 'Sub supper admin',\n  saleAdmin: 'Sale admin',\n  headOfMkt: 'Head of MKT',\n  accountant: 'Accountant',\n  saleFreelancer: 'Sale freelancer',\n  developer: 'Developer',\n  headOfBiz: 'Head of biz',\n  marketing: 'Marketing',\n  business: 'Business',\n  system: 'System',\n  functionName: 'Nhóm chức năng',\n  areaRestriction: 'Hạn chế khu vực',\n  view: 'Xem',\n  create: 'Tạo',\n  modify: 'Sửa',\n  delete: 'Xóa',\n  export: 'Xuất file',\n  special: 'Đặc quyền'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/sa-account/permission.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/sa-account/saleIncentive.js":
/*!************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/sa-account/saleIncentive.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  staff_name: 'Tên nhân viên',\n  role: 'Phân quyền',\n  mobile: 'Di động',\n  enable: 'Hoạt động',\n  region: 'Khu vực',\n  confirm_permission: 'Quyền xác nhận',\n  create_time: 'Thời gian tạo',\n  incentive_date: 'Ngày Khuyến khích',\n  created_by: 'Tạo bởi',\n  status: 'Trạng thái',\n  created_time: 'Ngày tạo',\n  confirmed_time: 'Ngày xác nhận',\n  detail: 'Chi tiết',\n  incentive: 'Khuyến khích',\n  pit: 'PIT',\n  income: 'Thu nhập',\n  new_contract: 'Liên hệ mới',\n  stamp: 'Tem',\n  hotel_promotion: 'Khuyến mãi riêng khách sạn',\n  co_promotion: 'Khuyến mãi',\n  new_hotel_checkin_amount: 'Số lượng check-in khách sạn',\n  confirm: 'Xác nhận',\n  save: 'Lưu',\n  category: 'Danh mục',\n  province: 'Nơi đăng kí',\n  district: 'Địa chỉ',\n  hotel_name: 'Tên khách sạn',\n  verified_date: 'Ngày xác nhận',\n  contract_date: 'Ngày hợp đồng',\n  contract_per: 'Hợp đồng (%)',\n  program: 'Chương trình',\n  start_date_promotion: 'Ngày bắt đầu khuyến mãi',\n  end_date_promotion: 'Ngày kết thúc khuyến mãi',\n  start_date_stamp: 'Ngày bắt đầu tem',\n  new_contract_type: 'Loại hợp đồng mới',\n  stage: 'Stage',\n  number_of_checkin_bookings: 'Số lần checkin đặt phòng',\n  commission_of_checkin_amount: 'Số lần booking đã nhận',\n  success: 'Xác nhận thành công',\n  error: 'Xác nhận thất bại',\n  full_name: 'Họ tên',\n  user_id: 'User id',\n  email: 'Email',\n  delete: 'Xóa',\n  create: 'Create',\n  edit: 'Thêm',\n  back: 'Quay lại',\n  Address: 'Địa chỉ',\n  memo: 'Ghi chú',\n  south: 'Miền Nam',\n  north: 'Miền Bắc',\n  middle: 'Miền Trung',\n  action: 'Hành động',\n  url: 'Url',\n  group_sn: 'Mã số phần tử',\n  param_information: 'Thông tin chi tiết',\n  time_access: 'Thời gian truy cập',\n  address: 'Địa chỉ',\n  role_region: 'Phân vùng',\n  password: 'Mật khẩu',\n  confirm_password: 'Xác nhận mật khẩu',\n  all_region: 'Tất cả khu vực',\n  view: 'Xem',\n  all_types: 'Tất cả',\n  transfer_booking: 'Chuyển đổi đặt phòng',\n  transfer: 'Chuyển đổi',\n  promotion: 'Khuyến mãi',\n  invite_friend: 'Mời bạn',\n  product: 'Sản phẩm KS',\n  level1: 'Cấp duyệt 1',\n  level2: 'Cấp duyệt 2',\n  update: 'Sửa',\n  special: 'Đặc quyền',\n  view_detail: 'Xem chi tiết',\n  filter_action12: 'Hotel Mgt / Quản Lý Khách Sạn',\n  filter_action13: 'Room Type Mgt / Quản Lý Loại Phòng',\n  filter_action14: 'Staff Mgt / Quán Lý Nhân Viên',\n  filter_action15: 'Facilities Mgt / Quản Lý Tiện ích',\n  filter_action16: 'User Mgt / Quản Lý Người Dùng',\n  filter_action17: 'App Notice Mgt / Quản Lý Tin Nhắn',\n  filter_action18: 'Q&A Mgt / Quản Lý Q&A',\n  filter_action19: 'FAQ Mgt / Quản Lý FAQ',\n  filter_action20: 'Promotion Mgt / Quản Lý Khuyến Mãi',\n  filter_action21: 'Booking Mgt /Quản Lý Đặt Phòng',\n  filter_action22: 'Booking Report Mgt / Báo Cáo Đặt Phòng',\n  filter_action23: 'PG Mgt / Quản Lý Tiếp Thị',\n  filter_action24: 'Banner Mgt /Quản Lý Banner',\n  filter_action25: 'Popup Mgt / Quản Lý Popup',\n  filter_action26: 'Service Agreement Mgt / Quản Lý Chính Sách',\n  filter_action27: 'Review Mgt / Quản Lý Bình Luận',\n  filter_action28: 'Notification Mgt /Quản Lý Thông Báo',\n  filter_action29: 'Setting Mgt / Thiết Lập',\n  filter_action30: 'Log Mgt / Quản Lý Log',\n  filter_action31: 'Permission Mgt / Phân Quyền',\n  filter_action32: 'Profile Mgt / Hồ Sơ',\n  filter_action34: 'SMS Mgt / Quản Lý SMS',\n  filter_action35: 'Super Staff Mgt/Quản Lý NV Go2Joy ',\n  filter_action37: 'Stamp Mgt/ Quản Lý Stamp',\n  filter_action38: 'CRM Management/ Chăm Sóc Khách Hàng',\n  filter_action39: 'Mileage Point Mgt/ Quản Lý Điểm Thưởng',\n  filter_action40: 'Hotel Group Mgt/ Quản Lý Nhóm KS',\n  filter_action41: 'Home Mgt/ Quản Lý Home Page',\n  filter_action42: 'Mkt Tracking Mgt/ Thống Kê Dữ Liệu',\n  filter_action43: 'Activities / Việc Của Tôi',\n  filter_action44: 'Invite Friend / Mời bạn',\n  filter_action45: 'Confirm Group/ Nhóm Xác Nhận',\n  filter_action47: 'SA Hotel Product type/ Quản Lý Loại Sản Phẩm',\n  filter_action48: 'SA Hotel Debt/ Quản Lý Nợ KS',\n  filter_action49: 'Open Second Splash Mgt / Quản lý Màn hình chờ 2',\n  filter_action50: 'SA Hotel On Top/ Quản lý Hotel On Top',\n  filter_action51: 'SA Sale Incentive History Mgt/ Quản Lý Lịch Sử Hoa Hồng',\n  details: 'Chi tiết',\n  function: 'Nhóm chức năng'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/sa-account/saleIncentive.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/sa-account/staffs.js":
/*!*****************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/sa-account/staffs.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  fullName: 'Họ tên',\n  userId: 'User id',\n  inputUserId: 'Nhập user id',\n  role: 'Phân quyền',\n  mobile: 'Di động',\n  email: 'Email',\n  region: 'Khu vực',\n  enable: 'Hoạt động',\n  operations: 'Thao tác',\n  allRegion: 'Tất cả khu vực',\n  south: 'Miền Nam',\n  north: 'Miền Bắc',\n  middle: 'Miền Trung',\n  confirm: 'Xác nhận',\n  view: 'Xem',\n  address: 'Địa chỉ',\n  memo: 'Ghi chú',\n  password: 'Mật khẩu',\n  confirmPassword: 'Xác nhận mật khẩu',\n  incorrectEmail: 'Vui lòng nhập đúng địa chỉ Email',\n  requiredEmail: 'Vui lòng nhập Email',\n  requiredFullName: 'Vui lòng nhập Họ tên',\n  requiredUserId: 'Vui lòng nhập User id',\n  requiredRole: 'Vui lòng chọn Phân quyền',\n  requiredAddress: 'Vui lòng nhập địa chỉ',\n  requiredMobile: 'Vui lòng nhập số điện thoại',\n  requiredPassword: 'Vui lòng nhập mật khẩu',\n  requiredConfirmPassword: 'Vui lòng nhập xác nhận mật khẩu',\n  confirmMatch: 'Mật khẩu mới và xác nhận mật khẩu không khớp',\n  notMobile: 'Số bạn nhập không chính xác'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/sa-account/staffs.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/service-agreement/service-agreement.js":
/*!***********************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/service-agreement/service-agreement.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  update_private_policy: 'Chỉnh sửa Chính sách hoạt động',\n  update_service_agreement: 'Chỉnh sửa Thỏa thuận dịch vụ',\n  update_mileage_point: 'Chỉnh sửa tích điểm',\n  update_payment_policy: 'Chỉnh sửa điều khoản thanh toán',\n  private_policy: 'Chính sách bảo mật thông tin',\n  service_agreement: 'Điều khoản sử dụng và quy chế hoạt động',\n  mileage_point: 'Tích điểm',\n  payment_policy: 'Điều khoản thanh toán'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/service-agreement/service-agreement.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/settings/settings.js":
/*!*****************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/settings/settings.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  updateSetting: 'Cập nhật thiết lập',\n  changeNewAfter: 'Đổi khách sạn từ \\'Mới\\' đến \\'Bình thường\\' sau',\n  blockBookingFrom: 'Chặn booking sau',\n  lastVersion: 'Phiên bản GO2JOY cuối',\n  partnerLastVersion: 'Phiên bản GO2JOY PARTNER cuối',\n  cineJoyLastVersion: 'Phiên bản CineJoy cuối',\n  refreshCacheData: 'Làm mới dữ liệu cache',\n  refresh: 'Làm mới dữ liệu cache',\n  days: 'Ngày',\n  openSecondSplash: 'TL màn hình chờ 2',\n  title: 'Tiêu đề',\n  province: 'Tỉnh/TP',\n  district: 'Quận/Huyện',\n  linked_name: 'Tên liên kết',\n  linked_type: 'Loại liên kết',\n  start_date: 'Ngày bắt đầu',\n  end_date: 'Ngày kết thúc',\n  background_color: 'Màu nền',\n  image: 'Hình ảnh',\n  create_time: 'Ngày tạo',\n  create_by: 'Người tạo',\n  status: 'Trạng thái',\n  hotel: 'Khách sạn',\n  promotion_event: 'Khuyến mãi/Sự kiện',\n  notice: 'Thông báo',\n  direct_discount: 'Giảm giá',\n  promotion_group: 'Nhóm khuyến mãi',\n  amenity_pack: 'Gói tiện ích',\n  link: 'Link liên kết',\n  mileage_point: 'Tích điểm',\n  all: 'Tất cả',\n  expired: 'Hết hạn',\n  active: 'Hoạt động',\n  will_active: 'Sẽ hoạt động',\n  pending: 'Đang xử lý',\n  operations: 'Thao tác',\n  location: 'Vị trí',\n  link_item: 'Phần tử liên kết',\n  display_second_splash: 'Hiển thị 2nd splash',\n  image_background: 'Hình ảnh nền',\n  width: 'Chiều rộng',\n  height: 'Chiều cao',\n  hashtag: 'Hash tag',\n  kindOfHotelOnTop: 'Loại TOP khách sạn',\n  collection: 'Bộ sưu tập',\n  hotelOnTopDetails: 'Danh sách TOP khách sạn',\n  staffName: 'Người tạo',\n  hotelOnTopByDistrict: 'Theo Quận huyện',\n  hotelOnTopByDashtag: 'Theo Hashtag',\n  hotelOnTopByCollection: 'Theo Bộ sưu tập',\n  bySearching: 'Theo Tìm Kiếm',\n  typeTop: 'Loại TOP khách sạn',\n  topHotel: 'TOP khách sạn',\n  requireStartDate: 'Vui lòng nhập ngày bắt đầu',\n  requireEndDate: 'Vui lòng nhập ngày kết thúc',\n  requireTitle: 'Vui lòng nhập tiêu đề',\n  requireHashtag: 'Vui lòng chọn hashtag',\n  hotelName: 'Tên khách sạn',\n  address: 'Địa chỉ',\n  collectionList: 'Danh sách bộ siêu tập',\n  requiredPromotions: 'Vui lòng nhập Khuyến mãi',\n  requiredNotice: 'Vui lòng nhập Thông báo',\n  requiredHotel: 'Vui lòng nhập Khách sạn',\n  requiredPromotionsGroup: 'Vui lòng nhập Nhóm khuyến mãi',\n  requiredDistrict: 'Vui lòng nhập Quận/Huyện',\n  requireStartEndDate: 'Vui lòng nhập ngày bắt đầu & ngày kết thúc'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/settings/settings.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/tracking/bookingTracking.js":
/*!************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/tracking/bookingTracking.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  region: 'VÙNG MIỀN',\n  total: 'TỔNG CỘNG',\n  start_date: 'Ngày bắt đầu',\n  end_date: 'Ngày kết thúc',\n  total1234: 'Tổng cộng(1)+(2)+(3)+(4)',\n  accumulation: 'Tích lũy',\n  actual_amount: 'Thực có',\n  waiting: 'Chờ duyệt(1)',\n  contracted: 'Hợp đồng(2)',\n  suspended: 'Treo(3)',\n  terminated: 'Dừng hợp đồng (4)',\n  displayed: 'Đã duyệt',\n  trial: 'Dùng thử',\n  datefrom: 'Từ ngày',\n  to: 'Đến',\n  hotel_name: 'Tên khách sạn',\n  number_of_signup: 'Số lượng đăng ký',\n  checkin_by_register: 'Checkin bằng đăng ký',\n  daily_average: 'Trung bình ngày',\n  previous_month_average: 'Trung bình tháng trước',\n  average: 'Trung bình năm',\n  dateFrom: 'Từ ngày'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/tracking/bookingTracking.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/tracking/hotelIntroduceSignup.js":
/*!*****************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/tracking/hotelIntroduceSignup.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  datefrom: 'Từ ngày',\n  to: 'Đến',\n  hotel_name: 'Tên khách sạn',\n  number_of_signup: 'Số lượng đăng ký',\n  checkin_by_register: 'Checkin bằng đăng ký',\n  nickname: 'Nick name',\n  gender: 'Giới tính',\n  birthday: 'Sinh nhật',\n  email: 'Email',\n  mobile: 'Di động',\n  register_province: 'Nơi đăng kí',\n  login_by: 'Đăng nhập bởi',\n  effective_point: 'Điểm dùng được',\n  register_time: 'Ngày đăng kí',\n  open_app: 'Mở app',\n  via: 'Đăng nhập bằng',\n  last_open_app: 'Mở app lần cuối',\n  status: 'Tình trạng',\n  hotel_invite_code: 'Mã mời KS',\n  booking_no: 'Mã số đặt phòng',\n  room_type: 'Loại phòng',\n  coupon: 'Coupon',\n  type: 'Loại',\n  booking_time: 'Ngày đặt phòng',\n  stay_at_hotel_time: 'Thời gian ở KS',\n  check_in_time: 'Thời gian nhận phòng',\n  booking_status: 'Tình trạng đặt phòng',\n  total_amount: 'Tổng trước khuyến mãi',\n  user_pay: 'Khách thanh toán',\n  paid_in_advance: 'Đã thanh toán',\n  refund: 'Hoàn tiền'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/tracking/hotelIntroduceSignup.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/tracking/hotelStatusTracking.js":
/*!****************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/tracking/hotelStatusTracking.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  region: 'VÙNG MIỀN',\n  total: 'TỔNG CỘNG',\n  start_date: 'Ngày bắt đầu',\n  end_date: 'Ngày kết thúc',\n  total1234: 'Tổng cộng(1)+(2)+(3)+(4)',\n  accumulation: 'Tích lũy',\n  actual_amount: 'Thực có',\n  waiting: 'Chờ duyệt(1)',\n  contracted: 'Hợp đồng(2)',\n  suspended: 'Treo(3)',\n  terminated: 'Dừng hợp đồng (4)',\n  displayed: 'Đã duyệt',\n  trial: 'Dùng thử',\n  datefrom: 'Từ ngày',\n  to: 'Đến',\n  hotel_name: 'Tên khách sạn',\n  number_of_signup: 'Số lượng đăng ký',\n  checkin_by_register: 'Checkin bằng đăng ký',\n  dateFrom: 'Từ ngày',\n  startDate: 'Ngày bắt đầu',\n  endDate: 'Ngày kết thúc'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/tracking/hotelStatusTracking.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/users/counseling/counselingMgt.js":
/*!******************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/users/counseling/counselingMgt.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  scope: 'Phạm vi',\n  title: 'Tiêu đề',\n  nickname: 'Biệt danh',\n  create_time: 'Thời gian tạo',\n  last_update: 'Cập nhật lần cuối',\n  unread: 'Chưa trả lời'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/users/counseling/counselingMgt.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/users/counseling/createCounselingMgt.js":
/*!************************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/users/counseling/createCounselingMgt.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  title: 'Tiêu đề',\n  content: 'Nội dung',\n  sendUser: 'Gửi người dùng',\n  placeholderUser: 'Tới người dùng',\n  placeholderScope: 'Phạm vi',\n  scope: 'Phạm vi',\n  requireTitle: 'Tiêu đề là bắt vuộc',\n  requireContent: 'Nội dung là bắt vuộc',\n  requireUserApp: 'Gửi người dùng là bắt vuộc',\n  requireScope: 'Phạm vi là bắt vuộc'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/users/counseling/createCounselingMgt.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/users/counseling/replyCounselingMgt.js":
/*!***********************************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/users/counseling/replyCounselingMgt.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  nickname: 'Biệt danh',\n  user_id: 'User id',\n  birthday: 'Sinh nhật',\n  email: 'Email',\n  gender: 'Giới tính',\n  mobile: 'Điện thoại',\n  address: 'Địa chỉ',\n  member_id: 'Mã thành viên',\n  login_by: 'Đăng nhập bởi',\n  res_time: 'Ngày đăng kí',\n  last_open_app: 'Lần cuối mở app',\n  last_update: 'Lần cuối cập nhật',\n  device_code: 'Mã thiết bị',\n  status: 'Trạng thái',\n  content: 'Nội Dung Q&A'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/users/counseling/replyCounselingMgt.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/users/deviceMgt.js":
/*!***************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/users/deviceMgt.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  mobile_user_id: 'Mã thiết bị',\n  app_user_nickName: 'Đang đăng nhập',\n  first_app_user_nickName: 'Đăng kí đầu tiên',\n  device_code: 'Thiết bị',\n  push_notification: 'Thông báo',\n  last_open_app: 'Lần cuối mở app',\n  app_version: 'Phiên bản',\n  install: 'Cài đặt',\n  register_province: 'Nơi đăng kí',\n  res_time: 'Ngày đăng kí',\n  last_update: 'Đăng nhập lần cuối',\n  source: 'Nguồn'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/users/deviceMgt.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/users/firstBooking.js":
/*!******************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/users/firstBooking.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  nickName: 'Tài khoản',\n  mobile: 'Số điện thoại',\n  registerProvince: 'Nơi đăng ký',\n  bookingNo: 'Mã đặt phòng',\n  hotel: 'Khách sạn',\n  lastUpdate: 'Cập nhật cuối',\n  totalWillCall: 'Tổng số sẽ gọi',\n  totalCalled: 'Tổng số đã gọi',\n  done: 'Đã gọi',\n  ok: 'OK',\n  cancel: 'Hủy',\n  phoneNumber: 'Số điện thoại',\n  operations: 'Thao tác',\n  keyword: 'Từ khoá',\n  startDate: 'Ngày bắt đầu',\n  endDate: 'Ngày kết thúc',\n  viewBookingDetail: 'Xem chi tiết báo cáo đặt phòng',\n  userInfo: 'Thông tin khách',\n  roomTypeName: 'Loại phòng',\n  coupon: 'Coupon',\n  stayAtHotelTime: 'Thời gian ở KS',\n  bookingStatus: 'Tình trạng đặt phòng',\n  roomAmount: 'Giá phòng',\n  productAmount: 'Giá sản phẩm',\n  totalAmount: 'Tổng trước khuyến mãi',\n  g2jDiscount: 'Khuyến mãi G2j',\n  hotelDiscount: 'Khách sạn giảm giá',\n  amountFromUser: 'Khách thanh toán',\n  prepayAmount: 'Đã thanh toán',\n  extraFee: 'Phụ thụ',\n  mileagePoint: 'Giảm điểm',\n  otherDiscount: 'Giảm giá khác',\n  flashSale: 'Giảm sốc',\n  redeemStamp: 'Sử dụng tem',\n  directDiscount: 'Giảm trực tiếp',\n  hours: 'Giờ',\n  overnight: 'Qua đêm',\n  daily: 'Theo ngày',\n  samePrice: 'Đồng giá',\n  confirmed: 'Chưa nhận',\n  checkIn: 'Đã nhận',\n  noShow: 'không nhận phòng',\n  noShowL: 'không nhận phòng L',\n  source: 'Nguồn',\n  messageWarning: 'Cảnh báo',\n  messageAlert: 'Bạn có chắc?'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/users/firstBooking.js?");

/***/ }),

/***/ "./src/plugins/i18n/language/vn/pages/users/userMgt.js":
/*!*************************************************************!*\
  !*** ./src/plugins/i18n/language/vn/pages/users/userMgt.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  provinceName: 'Tỉnh/Thành phố',\n  districtName: 'Quận/Huyện',\n  totalHotel: 'SL khách sạn',\n  totalContracted: 'SL hợp đồng khách sạn',\n  lastUpdate: 'Cập nhật cuối',\n  name: 'Tên khách sạn',\n  phone: 'Điện thoại',\n  address: 'Địa chỉ',\n  totalReview: 'Tổng nhận xét',\n  totalFavorite: 'Số lượng yêu thích',\n  averageMark: 'Điểm trung bình',\n  bookingNo: 'Mã số đặt',\n  hotelName: 'Tên khách sạn',\n  roomTypeName: 'Loại phòng',\n  couponName: 'Coupon',\n  type: 'Loại',\n  createTime: 'Ngày đặt',\n  checkInDatePlan: 'Thời gian ở KS',\n  checkInTime: 'Thời điểm nhận',\n  usedTime: 'Thời điểm sử dụng',\n  bookingStatus: 'Trạng thái đặt',\n  totalAmount: 'Tổng trước khuyến mãi',\n  amountFromUser: 'Khách thanh toán',\n  prepayAmount: 'Đã thanh toán',\n  refunded: 'Hoàn tiền',\n  promotionName: 'Coupon',\n  discount: 'Giá trị',\n  issueTime: 'Thời gian phát hành',\n  effectTime: 'Ngày có hiệu lực',\n  used: 'Trạng thái',\n  statusUsed: 'Đã dùng',\n  numStampActiveRedeem: 'Số tem hiện có / SL đủ đổi thưởng',\n  numStampExpire: 'Số tem hết hạn',\n  totalRedeem: 'Số lần đổi thưởng',\n  startJoinTime: 'Ngày bắt đầu thu thập tem',\n  nickName: 'Nickname',\n  gender: 'Giới tính',\n  birthday: 'Sinh nhật',\n  email: 'Email',\n  mobile: 'Di động',\n  firstProvinceName: 'Nơi đăng kí',\n  viaApp: 'Đăng nhập bởi',\n  point: 'Điểm dùng được',\n  resgister_time: 'Ngày đăng kí',\n  numOpenApp: 'Mở app',\n  last_op_app: 'Mở app lần cuối',\n  status: 'Trạng thái',\n  operations: 'Thao tác',\n  source: 'Nguồn',\n  unread: 'Chưa trả lời',\n  male: 'Nam',\n  female: 'Nữ',\n  keyword: 'Từ khoá',\n  startDate: 'Ngày bắt đầu',\n  endDate: 'Ngày kết thúc',\n  rangeSeparator: 'Đến',\n  gender_none: 'Không xác định',\n  yes: 'Hoạt động',\n  no: 'None',\n  disable: 'Vô hiệu',\n  loging: 'Đang đăng nhập',\n  logouted: 'Đã đăng xuất',\n  not_yet: 'Vẫn chưa',\n  expired: 'Hết hạn',\n  reserved: 'Đặt phòng',\n  check_in: 'Nhận phòng',\n  cancel: 'Hủy bỏ',\n  no_show: 'Không nhận phòng',\n  hours: 'Giờ',\n  overnight: 'Qua đêm',\n  daily: 'Nhiều ngày',\n  static: 'Tổng số accounts',\n  mobile_devices: 'Tổng thiết bị cài đặt',\n  mobile_devices_open: 'Tổng thiết bị mở',\n  delete: 'Xóa',\n  edit: 'Sửa',\n  back: 'Quay lại',\n  save: 'Lưu',\n  open: 'Mở',\n  user_id: 'User id',\n  password: 'Mật khẩu',\n  re_password: 'Xác nhận mật khẩu',\n  success: 'Cập nhật thành công',\n  update_error: 'Cập nhật thất bại',\n  confirm_password: 'Xác nhận mật khẩu không giống nhau',\n  donate_success: 'Donate thành công',\n  create_success: 'Tạo thành công',\n  favorite_area: 'Khu vực ưa thích',\n  favorite_hotel: 'Khách sạn ưa thích',\n  booking_history: 'Lịch sử đặt phòng',\n  coupon: 'Danh sách coupon',\n  stamp: 'Danh sách tem',\n  member_id: 'Mã thành viên',\n  lastOpenApp: 'Lần cuối mở app',\n  mobileDevice: 'Thiết bị đăng nhập',\n  open_app_last: 'Mở app lần cuối',\n  lastOpenAddress: 'Lần cuối mở app',\n  first_signup: 'First signup',\n  os: 'OS',\n  notification: 'Notification',\n  version: 'Version',\n  registerTime: 'Ngày đăng ký',\n  user_login: 'User login',\n  login: 'Trạng thái',\n  mobile_user_id: 'Mobile user id',\n  language: 'Language',\n  install: 'Install',\n  public: 'Công khai',\n  private: 'Riêng tư',\n  export_success: 'Xuất tệp thành công',\n  requireNickname: 'Vui lòng nhập Nickname',\n  requireEmail: 'Vui lòng nhập Email',\n  requireMobile: 'Vui lòng nhập số điện thoại',\n  requireBirthday: 'Vui lòng nhập ngày sinh',\n  requireAddress: 'Vui lòng nhập địa chỉ',\n  editSuccess: 'Cập nhật thành công',\n  requirePass: 'Vui lòng nhập mật khẩu',\n  requirePassConfirm: 'Vui lòng xác nhân mật khẩu',\n  validatePassConfirm: 'Xác nhận mật khẩu không giống nhau',\n  userId: 'User Id',\n  memberId: 'Mã thành viên',\n  creditCard: 'Thẻ Credit',\n  debitCard: 'Thẻ debit',\n  deleteSuccess: 'Xoá thành công',\n  messageAlert: 'Bạn có chắc?',\n  messageWarning: 'Cảnh báo'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/language/vn/pages/users/userMgt.js?");

/***/ }),

/***/ "./src/plugins/i18n/vn-file.js":
/*!*************************************!*\
  !*** ./src/plugins/i18n/vn-file.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _language_vn_general_breadcrumb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./language/vn/general/breadcrumb */ \"./src/plugins/i18n/language/vn/general/breadcrumb.js\");\n/* harmony import */ var _language_vn_general_day_of_week__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./language/vn/general/day-of-week */ \"./src/plugins/i18n/language/vn/general/day-of-week.js\");\n/* harmony import */ var _language_vn_general_placeholder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./language/vn/general/placeholder */ \"./src/plugins/i18n/language/vn/general/placeholder.js\");\n/* harmony import */ var _language_en_general_validation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./language/en/general/validation */ \"./src/plugins/i18n/language/en/general/validation.js\");\n/* harmony import */ var _language_vn_general_option__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./language/vn/general/option */ \"./src/plugins/i18n/language/vn/general/option.js\");\n/* harmony import */ var _language_vn_general_option_gender__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./language/vn/general/option/gender */ \"./src/plugins/i18n/language/vn/general/option/gender.js\");\n/* harmony import */ var _language_vn_general_option_status__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./language/vn/general/option/status */ \"./src/plugins/i18n/language/vn/general/option/status.js\");\n/* harmony import */ var _language_vn_general_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./language/vn/general/button */ \"./src/plugins/i18n/language/vn/general/button.js\");\n/* harmony import */ var _language_vn_general_message__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./language/vn/general/message */ \"./src/plugins/i18n/language/vn/general/message.js\");\n/* harmony import */ var _language_vn_general_payment__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./language/vn/general/payment */ \"./src/plugins/i18n/language/vn/general/payment.js\");\n\n\n\n\n\n\n\n\n\n\nfunction loadLocaleMessages() {\n  var files = __webpack_require__(\"./src/plugins/i18n/language/vn/pages sync recursive \\\\.js$\");\n  var messages = {};\n  files.keys().forEach(function (key) {\n    var matched = key.match(/([A-Za-z0-9-_]+)\\./i);\n    if (matched && matched.length > 1) {\n      var locale = matched[1];\n      messages[locale] = files(key).default;\n    }\n  });\n  return messages;\n}\nvar page = loadLocaleMessages();\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  lang: 'vi',\n  omitZeroMinute: 'false',\n  search: 'Tìm kiếm',\n  hours: 'Theo Giờ',\n  overnight: 'Qua đêm',\n  daily: 'Theo Ngày',\n  additional: 'Giờ thêm',\n  breadcrumb: _language_vn_general_breadcrumb__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  placeholder: _language_vn_general_placeholder__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n  validation: _language_en_general_validation__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n  payment: _language_vn_general_payment__WEBPACK_IMPORTED_MODULE_9__[\"default\"],\n  page: page,\n  option: _language_vn_general_option__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n  gender: _language_vn_general_option_gender__WEBPACK_IMPORTED_MODULE_5__[\"default\"],\n  status: _language_vn_general_option_status__WEBPACK_IMPORTED_MODULE_6__[\"default\"],\n  button: _language_vn_general_button__WEBPACK_IMPORTED_MODULE_7__[\"default\"],\n  message: _language_vn_general_message__WEBPACK_IMPORTED_MODULE_8__[\"default\"],\n  daysOfWeek: _language_vn_general_day_of_week__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  no_data: 'Không có dữ liệu',\n  loading: 'Lấy dữ liệu'\n});\n\n//# sourceURL=webpack:///./src/plugins/i18n/vn-file.js?");

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