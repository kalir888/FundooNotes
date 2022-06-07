"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateNote = exports.setIsDeleted = exports.setIsArchived = exports.getNote = exports.getAllNotes = exports.deleteNote = exports.createNote = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));

var NoteService = _interopRequireWildcard(require("../services/note.service.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var getAllNotes = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return NoteService.getAllNotes(req.body);

          case 3:
            data = _context.sent;
            res.status(_httpStatusCodes["default"].OK).json({
              code: _httpStatusCodes["default"].OK,
              data: data,
              message: 'All notes fetched successfully'
            });
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            next(_context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function getAllNotes(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.getAllNotes = getAllNotes;

var createNote = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            console.log('request : ', req.body);
            _context2.next = 4;
            return NoteService.createNote(req.body);

          case 4:
            data = _context2.sent;
            res.status(_httpStatusCodes["default"].CREATED).json({
              code: _httpStatusCodes["default"].CREATED,
              data: data,
              message: 'Note created succesfully'
            });
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            next(_context2.t0);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));

  return function createNote(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.createNote = createNote;

var getNote = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return NoteService.getNote(req.params._id, req.body.UserID);

          case 3:
            data = _context3.sent;
            res.status(_httpStatusCodes["default"].OK).json({
              code: _httpStatusCodes["default"].OK,
              data: data,
              message: 'Note fetched successfully'
            });
            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            next(_context3.t0);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));

  return function getNote(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getNote = getNote;

var updateNote = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var data;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return NoteService.updateNote(req.params._id, req.body);

          case 3:
            data = _context4.sent;
            res.status(_httpStatusCodes["default"].ACCEPTED).json({
              code: _httpStatusCodes["default"].ACCEPTED,
              data: data,
              message: 'Note updated successfully'
            });
            _context4.next = 10;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            next(_context4.t0);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));

  return function updateNote(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateNote = updateNote;

var deleteNote = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return NoteService.deleteNote(req.params._id, req.body.UserID);

          case 3:
            res.status(_httpStatusCodes["default"].OK).json({
              code: _httpStatusCodes["default"].OK,
              message: 'Note deleted successfully'
            });
            _context5.next = 9;
            break;

          case 6:
            _context5.prev = 6;
            _context5.t0 = _context5["catch"](0);
            next(_context5.t0);

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 6]]);
  }));

  return function deleteNote(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteNote = deleteNote;

var setIsArchived = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var data;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return NoteService.setIsArchived(req.params._id, req.body.UserID);

          case 3:
            data = _context6.sent;
            res.status(_httpStatusCodes["default"].ACCEPTED).json({
              code: _httpStatusCodes["default"].ACCEPTED,
              data: data,
              message: 'Note is Archived successfully'
            });
            _context6.next = 10;
            break;

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](0);
            next(_context6.t0);

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 7]]);
  }));

  return function setIsArchived(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();

exports.setIsArchived = setIsArchived;

var setIsDeleted = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
    var data;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return NoteService.setIsDeleted(req.params._id, req.body.UserID);

          case 3:
            data = _context7.sent;
            res.status(_httpStatusCodes["default"].ACCEPTED).json({
              code: _httpStatusCodes["default"].ACCEPTED,
              data: data,
              message: 'Note is moved to trash successfully'
            });
            _context7.next = 10;
            break;

          case 7:
            _context7.prev = 7;
            _context7.t0 = _context7["catch"](0);
            next(_context7.t0);

          case 10:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 7]]);
  }));

  return function setIsDeleted(_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();

exports.setIsDeleted = setIsDeleted;