"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userLogin = exports.resetPassword = exports.registerUser = exports.forgotPassword = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../models/user.model"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var mailSender = _interopRequireWildcard(require("../utils/mail.sender"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var registerUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(body) {
    var resData, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _user["default"].findOne({
              email: body.email
            });

          case 2:
            resData = _context.sent;

            if (!(resData == null)) {
              _context.next = 13;
              break;
            }

            _context.next = 6;
            return _bcrypt["default"].hash(body.password, 10);

          case 6:
            body.password = _context.sent;
            _context.next = 9;
            return _user["default"].create(body);

          case 9:
            data = _context.sent;
            return _context.abrupt("return", data);

          case 13:
            throw new Error("User already exist");

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function registerUser(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.registerUser = registerUser;

var userLogin = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(userData) {
    var data, passwordCheck, token;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _user["default"].findOne({
              email: userData.email
            });

          case 2:
            data = _context2.sent;

            if (!(data == null)) {
              _context2.next = 7;
              break;
            }

            throw new Error("User does not exist");

          case 7:
            _context2.next = 9;
            return _bcrypt["default"].compare(userData.password, data.password);

          case 9:
            passwordCheck = _context2.sent;

            if (!passwordCheck) {
              _context2.next = 15;
              break;
            }

            token = _jsonwebtoken["default"].sign({
              firstName: data.firstName,
              email: data.email,
              id: data._id
            }, process.env.SECRET_KEY);
            return _context2.abrupt("return", token);

          case 15:
            throw new Error("Password not match");

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function userLogin(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.userLogin = userLogin;

var forgotPassword = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(userData) {
    var data, token;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _user["default"].findOne({
              email: userData
            });

          case 2:
            data = _context3.sent;

            if (!(data == null)) {
              _context3.next = 7;
              break;
            }

            throw new Error("User does not exist");

          case 7:
            token = _jsonwebtoken["default"].sign({
              firstName: data.firstName,
              email: data.email,
              id: data._id
            }, process.env.SECRET_KEY2);
            mailSender.sendEmail(data.email, token);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function forgotPassword(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.forgotPassword = forgotPassword;

var resetPassword = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(pass, mail) {
    var hashedPass, data;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _bcrypt["default"].hash(pass, 10);

          case 2:
            hashedPass = _context4.sent;
            _context4.next = 5;
            return _user["default"].findOneAndUpdate({
              email: mail
            }, {
              password: hashedPass
            });

          case 5:
            data = _context4.sent;
            return _context4.abrupt("return", data);

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function resetPassword(_x4, _x5) {
    return _ref4.apply(this, arguments);
  };
}();

exports.resetPassword = resetPassword;