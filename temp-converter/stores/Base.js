var Emitter = require('events').EventEmitter;
var assign = require('object-assign');

module.exports = exports = assign({}, Emitter.prototype, {
  emitChange: function() {
    this.emit('change');
  },
  addChangeListener: function(cb) {
    this.on('change', cb);
  },
  removeChangeListener: function(cb) {
    this.removeListener('change', cb);
  }
});
