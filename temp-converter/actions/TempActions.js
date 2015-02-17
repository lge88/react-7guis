var AppDispatcher = require('../dispatcher/AppDispatcher');
var TempStoreConstants = require('../constants/TempStoreConstants.js');

module.exports = exports = {
  updateTC: function(tc) {
    AppDispatcher.dispatch({
      actionType: TempStoreConstants.UPDATE_TC,
      payload: {
        tc: tc
      }
    });
  },
  updateTF: function(tf) {
    AppDispatcher.dispatch({
      actionType: TempStoreConstants.UPDATE_TF,
      payload: {
        tf: tf
      }
    });
  }
};
