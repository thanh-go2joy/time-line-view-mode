(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[59],{

/***/ "./src/modules/hotels/product/detail/index.js":
/*!****************************************************!*\
  !*** ./src/modules/hotels/product/detail/index.js ***!
  \****************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/router */ \"./src/router.js\");\n\n_router__WEBPACK_IMPORTED_MODULE_0__[\"default\"].addRoute('hotels', {\n  path: '/hotel/sadmin/product-detail/:id',\n  name: 'product_detail',\n  meta: {\n    requiresAuth: true\n  },\n  component: function component() {\n    return __webpack_require__.e(/*! import() */ 32).then(__webpack_require__.bind(null, /*! ./View.vue */ \"./src/modules/hotels/product/detail/View.vue\"));\n  }\n});\n\n//# sourceURL=webpack:///./src/modules/hotels/product/detail/index.js?");

/***/ }),

/***/ "./src/modules/hotels/product/index.js":
/*!*********************************************!*\
  !*** ./src/modules/hotels/product/index.js ***!
  \*********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./list */ \"./src/modules/hotels/product/list/index.js\");\n/* harmony import */ var _detail__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./detail */ \"./src/modules/hotels/product/detail/index.js\");\n\n\n\n//# sourceURL=webpack:///./src/modules/hotels/product/index.js?");

/***/ }),

/***/ "./src/modules/hotels/product/list/index.js":
/*!**************************************************!*\
  !*** ./src/modules/hotels/product/list/index.js ***!
  \**************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/router */ \"./src/router.js\");\n\n_router__WEBPACK_IMPORTED_MODULE_0__[\"default\"].addRoute('hotels', {\n  path: '/hotel/sadmin/product-mgt',\n  meta: {\n    active: 'product-mgt',\n    requiresAuth: true\n  },\n  name: 'product_mgt',\n  component: function component() {\n    return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(35)]).then(__webpack_require__.bind(null, /*! ./View.vue */ \"./src/modules/hotels/product/list/View.vue\"));\n  }\n});\n\n//# sourceURL=webpack:///./src/modules/hotels/product/list/index.js?");

/***/ })

}]);