var Emitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TempStoreContants = require('../constants/TempStoreConstants');
var Base = require('./Base');

var TempState = {
  tc: 5
};

var TempStore = assign({}, Base, {
  getTC: function() {
    return TempState.tc;
  },
  getTF: function() {
    var tc = TempStore.getTC();
    var tf = tc * (9/5) + 32;
    return tf;
  }
});

AppDispatcher.register(function(action) {
  var tc, tf;
  switch (action.actionType) {
  case TempStoreContants.UPDATE_TC:
    tc = action.payload.tc;
    TempState.tc = tc;
    TempStore.emitChange();
    break;
  case TempStoreContants.UPDATE_TF:
    tf = action.payload.tf;
    TempState.tc = (tf - 32) * (5/9);
    TempStore.emitChange();
    break;
  default:

  }

});

module.exports = exports = TempStore;
