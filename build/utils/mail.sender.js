"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendEmail = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _logger = _interopRequireWildcard(require("../config/logger"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var sendEmail = function sendEmail(userMailID, token) {
  var host = process.env.APP_HOST;
  var port = process.env.APP_PORT;
  var api_version = process.env.API_VERSION;

  var transport = _nodemailer["default"].createTransport({
    service: "gmail",
    auth: {
      user: process.env.SENDE_ID,
      pass: process.env.PASSWORD
    }
  });

  var mailOption = {
    from: process.env.SENDE_ID,
    to: userMailID,
    subject: "Password Reset Link",
    html: "<h1>Hello,<br><br>Click on given link to reset your password!</h1><br><h1>Link:><a href=\"".concat(host, ":").concat(port, "/api/").concat(api_version, "/users/reset/").concat(token, "\">click here</a></h1>")
  };
  transport.sendMail(mailOption, function (err, info) {
    var sendEmailInfo = err ? _logger["default"].log('error', err) : _logger["default"].log('info', info);
    return sendEmailInfo;
  });
};

exports.sendEmail = sendEmail;