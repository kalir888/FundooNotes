"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var noteSchema = new _mongoose.Schema({
  Title: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
  color: {
    type: String
  },
  isArchived: {
    type: Boolean,
    "default": false
  },
  isDeleted: {
    type: Boolean,
    "default": false
  },
  UserID: {
    type: String
  }
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)('Note', noteSchema);

exports["default"] = _default;