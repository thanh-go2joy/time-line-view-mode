(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[60],{

/***/ "./src/modules/hotels/index.js":
/*!*************************************!*\
  !*** ./src/modules/hotels/index.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/asyncToGenerator.js\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/router */ \"./src/router.js\");\n/* harmony import */ var _utils_const__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/const */ \"./src/utils/const.js\");\n\n\n\n\n\nvar initRouter = /*#__PURE__*/function () {\n  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee() {\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _router__WEBPACK_IMPORTED_MODULE_2__[\"default\"].addRoute({\n              name: 'hotels',\n              path: '/hotel/sadmin',\n              redirect: '/hotel/sadmin/product-type-mgt',\n              meta: {\n                requiresAuth: true\n              },\n              component: _utils_const__WEBPACK_IMPORTED_MODULE_3__[\"routerView\"]\n            });\n            _context.next = 3;\n            return __webpack_require__.e(/*! import() */ 59).then(__webpack_require__.bind(null, /*! ./product */ \"./src/modules/hotels/product/index.js\"));\n\n          case 3:\n            _context.next = 5;\n            return __webpack_require__.e(/*! import() */ 58).then(__webpack_require__.bind(null, /*! ./product-type */ \"./src/modules/hotels/product-type/index.js\"));\n\n          case 5:\n            _context.next = 7;\n            return __webpack_require__.e(/*! import() */ 54).then(__webpack_require__.bind(null, /*! ./hotel-display */ \"./src/modules/hotels/hotel-display/index.js\"));\n\n          case 7:\n            _context.next = 9;\n            return __webpack_require__.e(/*! import() */ 53).then(__webpack_require__.bind(null, /*! ./stamp */ \"./src/modules/hotels/stamp/index.js\"));\n\n          case 9:\n            _context.next = 11;\n            return __webpack_require__.e(/*! import() */ 66).then(__webpack_require__.bind(null, /*! ./room-type/list */ \"./src/modules/hotels/room-type/list/index.js\"));\n\n          case 11:\n            _context.next = 13;\n            return __webpack_require__.e(/*! import() */ 64).then(__webpack_require__.bind(null, /*! ./room-type/detail-room-type */ \"./src/modules/hotels/room-type/detail-room-type/index.js\"));\n\n          case 13:\n            _context.next = 15;\n            return __webpack_require__.e(/*! import() */ 67).then(__webpack_require__.bind(null, /*! ./room-type/setting-fs */ \"./src/modules/hotels/room-type/setting-fs/index.js\"));\n\n          case 15:\n            _context.next = 17;\n            return __webpack_require__.e(/*! import() */ 63).then(__webpack_require__.bind(null, /*! ./room-type/create-room-type */ \"./src/modules/hotels/room-type/create-room-type/index.js\"));\n\n          case 17:\n            _context.next = 19;\n            return __webpack_require__.e(/*! import() */ 65).then(__webpack_require__.bind(null, /*! ./room-type/edit-room-type */ \"./src/modules/hotels/room-type/edit-room-type/index.js\"));\n\n          case 19:\n            _context.next = 21;\n            return __webpack_require__.e(/*! import() */ 55).then(__webpack_require__.bind(null, /*! ./hotel-group */ \"./src/modules/hotels/hotel-group/index.js\"));\n\n          case 21:\n            _context.next = 23;\n            return __webpack_require__.e(/*! import() */ 56).then(__webpack_require__.bind(null, /*! ./hotel-staff */ \"./src/modules/hotels/hotel-staff/index.js\"));\n\n          case 23:\n            _context.next = 25;\n            return __webpack_require__.e(/*! import() */ 62).then(__webpack_require__.bind(null, /*! ./review/list */ \"./src/modules/hotels/review/list/index.js\"));\n\n          case 25:\n            _context.next = 27;\n            return __webpack_require__.e(/*! import() */ 61).then(__webpack_require__.bind(null, /*! ./review/detail */ \"./src/modules/hotels/review/detail/index.js\"));\n\n          case 27:\n            _context.next = 29;\n            return __webpack_require__.e(/*! import() */ 57).then(__webpack_require__.bind(null, /*! ./hotel-facility */ \"./src/modules/hotels/hotel-facility/index.js\"));\n\n          case 29:\n            _context.next = 31;\n            return __webpack_require__.e(/*! import() */ 42).then(__webpack_require__.bind(null, /*! ./notice-to-hotel */ \"./src/modules/hotels/notice-to-hotel/index.js\"));\n\n          case 31:\n            _context.next = 33;\n            return __webpack_require__.e(/*! import() */ 68).then(__webpack_require__.bind(null, /*! ./time-line-view-mode */ \"./src/modules/hotels/time-line-view-mode/index.js\"));\n\n          case 33:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n\n  return function initRouter() {\n    return _ref.apply(this, arguments);\n  };\n}();\n\ninitRouter();\n\n//# sourceURL=webpack:///./src/modules/hotels/index.js?");

/***/ }),

/***/ "./src/utils/const.js":
/*!****************************!*\
  !*** ./src/utils/const.js ***!
  \****************************/
/*! exports provided: repStatus, TARGET_TYPE, TARGET_TYPE_V2, viewOptions, statusOptions, statusOptionsV2, statusOptionsV3, statusOptionsV4, targetType, targetTypeV2, region, sendToOptions, sendToOptionsV2, contractOptions, typeOptions, typeOptionsV2, roomTypes, routerView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"repStatus\", function() { return repStatus; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TARGET_TYPE\", function() { return TARGET_TYPE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TARGET_TYPE_V2\", function() { return TARGET_TYPE_V2; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"viewOptions\", function() { return viewOptions; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"statusOptions\", function() { return statusOptions; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"statusOptionsV2\", function() { return statusOptionsV2; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"statusOptionsV3\", function() { return statusOptionsV3; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"statusOptionsV4\", function() { return statusOptionsV4; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"targetType\", function() { return targetType; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"targetTypeV2\", function() { return targetTypeV2; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"region\", function() { return region; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sendToOptions\", function() { return sendToOptions; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sendToOptionsV2\", function() { return sendToOptionsV2; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"contractOptions\", function() { return contractOptions; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"typeOptions\", function() { return typeOptions; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"typeOptionsV2\", function() { return typeOptionsV2; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"roomTypes\", function() { return roomTypes; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"routerView\", function() { return routerView; });\nvar repStatus = {\n  sussess: 1,\n  failed: 2\n};\nvar TARGET_TYPE = {\n  PROMOTION_EVENT: 1,\n  HOTEL: 2,\n  NOTICE: 3,\n  LINK_OUT_APP: 4,\n  LINK_IN_APP: 61,\n  DISTRICT: 5,\n  MILEAGE_POINT: 6,\n  COUPON: 7,\n  DIRECT_DISCOUNT: 8,\n  INVITE_FRIEND: 9,\n  PROMOTION_GROUP: 10,\n  AMENITY_PACK: 12,\n  HOTEL_GO2CHOICE: 13,\n  HOTEL_TET: 105\n};\nvar TARGET_TYPE_V2 = {\n  NOTICE: 1,\n  PROMOTION: 2,\n  SERVICE_AGREEMENT: 3,\n  HOTEL: 4,\n  FAQ: 5,\n  INVITE_FRIEND: 6,\n  OPEN_APP: 7,\n  MILEAGE_POINT: 8,\n  DIRECT_DISCOUNT: 9,\n  SIGN_UP: 10,\n  PROMOTION_GROUP: 11,\n  AMENITY_PACK: 12,\n  HOTEL_GO2CHOICE: 13,\n  HOTEL_TET: 105,\n  REFERRAL: 106\n};\nvar viewOptions = [{\n  value: 1,\n  key: 'option.window'\n}, {\n  value: 2,\n  key: 'option.balcony'\n}, {\n  value: 3,\n  key: 'option.city'\n}, {\n  value: 4,\n  key: 'option.garden'\n}, {\n  value: 5,\n  key: 'option.pool'\n}, {\n  value: 6,\n  key: 'option.noView'\n}];\nvar statusOptions = [{\n  value: 1,\n  key: 'option.hotelStatus.waiting'\n}, {\n  value: 2,\n  key: 'option.hotelStatus.displayed'\n}, {\n  value: 3,\n  key: 'option.hotelStatus.contracted'\n}, {\n  value: 4,\n  key: 'option.hotelStatus.trial'\n}];\nvar statusOptionsV2 = [{\n  value: 1,\n  key: 'option.hotelStatus.waiting'\n}, {\n  value: 2,\n  key: 'option.hotelStatus.displayed'\n}, {\n  value: 3,\n  key: 'option.hotelStatus.contracted'\n}, {\n  value: 4,\n  key: 'option.hotelStatus.trial'\n}, {\n  value: 5,\n  key: 'option.hotelStatus.terminated'\n}, {\n  value: 6,\n  key: 'option.hotelStatus.suspended'\n}];\nvar statusOptionsV3 = [{\n  value: 0,\n  key: 'option.status.allNoticeType'\n}, {\n  value: 1,\n  key: 'option.status.normal'\n}, {\n  value: 2,\n  key: 'option.status.donateCoupon'\n}, {\n  value: 3,\n  key: 'option.status.remindCoupon'\n}];\nvar statusOptionsV4 = [{\n  value: 0,\n  key: 'option.status.allStatus'\n}, {\n  value: 1,\n  key: 'option.status.draft'\n}, {\n  value: 2,\n  key: 'option.status.created'\n}, {\n  value: 3,\n  key: 'option.status.sending'\n}, {\n  value: 4,\n  key: 'option.status.sent'\n}];\nvar targetType = [// use Notification\n{\n  value: 2,\n  key: 'option.targetType.promotion'\n}, {\n  value: 105,\n  key: 'option.targetType.hotelTet'\n}, {\n  value: 13,\n  key: 'option.targetType.hotelGo2Choice'\n}, {\n  value: 4,\n  key: 'option.targetType.hotel'\n}, {\n  value: 1,\n  key: 'option.targetType.notice'\n}, {\n  value: 3,\n  key: 'option.targetType.serviceAgreement'\n}, {\n  value: 5,\n  key: 'option.targetType.faq'\n}, {\n  value: 6,\n  key: 'option.targetType.inviteFriend'\n}, {\n  value: 7,\n  key: 'option.targetType.openApp'\n}, {\n  value: 8,\n  key: 'option.targetType.mileagePoint'\n}, {\n  value: 9,\n  key: 'option.targetType.directDiscount'\n}, {\n  value: 10,\n  key: 'option.targetType.signUp'\n}, {\n  value: 11,\n  key: 'option.targetType.promotionGroup'\n}, {\n  value: 14,\n  key: 'option.targetType.amenityPack'\n}, {\n  value: 106,\n  key: 'option.targetType.referral'\n}];\nvar targetTypeV2 = [{\n  value: 1,\n  key: 'option.targetType.promotionEvent'\n}, {\n  value: 13,\n  key: 'option.targetType.hotelGo2Choice'\n}, {\n  value: 2,\n  key: 'option.targetType.hotel'\n}, {\n  value: 3,\n  key: 'option.targetType.notice'\n}, {\n  value: 4,\n  key: 'option.targetType.linkOutApp'\n}, {\n  value: 61,\n  key: 'option.targetType.linkInApp'\n}, {\n  value: 5,\n  key: 'option.targetType.district'\n}, {\n  value: 6,\n  key: 'option.targetType.mileagePoint'\n}, {\n  value: 7,\n  key: 'option.targetType.coupon'\n}, {\n  value: 8,\n  key: 'option.targetType.directDiscount'\n}, {\n  value: 9,\n  key: 'option.targetType.inviteFriend'\n}, {\n  value: 10,\n  key: 'option.targetType.promotionGroup'\n}, {\n  value: 12,\n  key: 'option.targetType.amenityPack'\n}];\nvar region = [{\n  name: 'option.region.south',\n  value: 1\n}, {\n  name: 'option.region.north',\n  value: 2\n}, {\n  name: 'option.region.north_center',\n  value: 4\n}, {\n  name: 'option.region.south_center',\n  value: 5\n}];\nvar sendToOptions = [{\n  value: 0,\n  key: 'option.status.sendTo'\n}, {\n  value: 1,\n  key: 'option.status.allUser'\n}, {\n  value: 2,\n  key: 'option.status.go2joy'\n}, {\n  value: 3,\n  key: 'option.status.allPartner'\n}, {\n  value: 6,\n  key: 'option.status.allTrailPartner'\n}, {\n  value: 7,\n  key: 'option.status.allContractPartner'\n}, {\n  value: 8,\n  key: 'option.status.allImportFromExcelFile'\n}, {\n  value: 9,\n  key: 'option.status.crmFilter'\n}, {\n  value: 10,\n  key: 'option.status.userInput'\n}];\nvar sendToOptionsV2 = [{\n  value: 1,\n  key: 'option.status.allUser'\n}, {\n  value: 2,\n  key: 'option.status.go2joy'\n}, {\n  value: 3,\n  key: 'option.status.allPartner'\n}, {\n  value: 7,\n  key: 'option.status.allContractPartner'\n}, {\n  value: 8,\n  key: 'option.status.allImportFromExcelFile'\n}, {\n  value: 9,\n  key: 'option.status.crmFilter'\n}];\nvar contractOptions = [{\n  value: 0,\n  key: 'option.contracts.notClassified'\n}, {\n  value: 1,\n  key: 'option.contracts.type1'\n}, {\n  value: 2,\n  key: 'option.contracts.type2'\n}, {\n  value: 3,\n  key: 'option.contracts.type3'\n}, {\n  value: 4,\n  key: 'option.contracts.type4Recontracted'\n}, {\n  value: 5,\n  key: 'option.contracts.typeGo2joyRoom'\n}];\nvar typeOptions = [{\n  value: 0,\n  key: 'option.hotelTypes.none'\n}, {\n  value: 1,\n  key: 'option.hotelTypes.couples'\n}, {\n  value: 2,\n  key: 'option.hotelTypes.travel'\n}, {\n  value: 3,\n  key: 'option.hotelTypes.couplesAndTravel'\n}, {\n  value: 4,\n  key: 'option.hotelTypes.quarantine'\n}];\nvar typeOptionsV2 = [{\n  value: 0,\n  key: 'option.hotelTypes.allTypes'\n}, {\n  value: 1,\n  key: 'option.hotelTypes.couples'\n}, {\n  value: 2,\n  key: 'option.hotelTypes.travel'\n}, {\n  value: 3,\n  key: 'option.hotelTypes.couplesAndTravel'\n}, {\n  value: 4,\n  key: 'option.hotelTypes.quarantine'\n}];\nvar roomTypes = [{\n  value: -1,\n  key: 'option.all_rooms'\n}, {\n  value: 1,\n  key: 'option.room_available'\n}, {\n  value: 0,\n  key: 'option.room_unavailable'\n}];\nvar routerView = {\n  render: function render(createElement) {\n    return createElement('router-view');\n  }\n};\n\n//# sourceURL=webpack:///./src/utils/const.js?");

/***/ })

}]);