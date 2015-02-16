var React = require('react');
var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var counterStoreState = {
  count: 0
};

var counterStoreConstants = {
  INCR: 0,
  RESET: 1
};

AppDispatcher.register(function(action) {
  switch (action.actionType) {
  case counterStoreConstants.INCR:
    counterStoreState.count++;
    CounterStore.emitChange();
    break;
  case counterStoreConstants.RESET:
    counterStoreState.count = 0;
    CounterStore.emitChange();
    break;
  default:

  }
});

var CounterActions = {
  incr: function() {
    AppDispatcher.dispatch({
      actionType: counterStoreConstants.INCR
    });
  },
  reset: function() {
    AppDispatcher.dispatch({
      actionType: counterStoreConstants.RESET
    });
  }
};

var CounterStore = assign({}, EventEmitter.prototype, {
  getCount: function() {
    return counterStoreState.count;
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(cb) {
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }
});


var CounterButton = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func,
    label: React.PropTypes.string.isRequired
  },
  getInitialState: function() {
    return { highlighted: false };
  },

  render: function() {
    var lightBlue = 'rgb(0, 197, 255)';
    var common = {
      // boxSizing: 'border-box',
      display: 'inline-block',
      padding: 0,
      borderRadius: 2,
      borderStyle: 'solid',
      borderWidth: '1px',
      borderColor: lightBlue,
      color: lightBlue,
      backgroundColor: 'white',
      width: '120px',
      lineHeight: '40px',
      fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
      fontSize: '20px',
      textAlign: 'center',
      margin: '10px'
    };

    var spanStyle = assign({}, common);
    var buttonStyle = assign({}, common, {
      outline: 0,
      cursor: 'pointer'
    });

    if (this.state.highlighted) {
      assign(buttonStyle, {
        borderColor: 'white',
        backgroundColor: lightBlue,
        color: 'white'
      });
    }

    var containerStyle = {
      display: 'inline-block',
      borderColor: lightBlue,
      borderStyle: 'solid',
      borderRadius: '2px',
      borderWidth: '1px'
    };

    return (
        <button
          style={buttonStyle}
          onClick={this.props.onClick}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}>
          {this.props.label}
        </button>
    );
  },

  handleMouseEnter: function() {
    this.setState({ highlighted: true });
  },

  handleMouseLeave: function() {
    this.setState({ highlighted: false });
  }

});

var Counter = React.createClass({
  getInitialState: function() {
    return { highlighted: false };
  },

  render: function() {
    var count = this.props.count;

    var lightBlue = 'rgb(0, 197, 255)';
    var common = {
      boxSizing: 'border-box',
      display: 'inline-block',
      padding: 0,
      borderRadius: 2,
      borderStyle: 'solid',
      borderWidth: '1px',
      borderColor: lightBlue,
      color: lightBlue,
      backgroundColor: 'white',
      width: '100px',
      lineHeight: '40px',
      fontFamily: '\'Helvetica Neue\', Helvetica, Arial, sans-serif',
      fontSize: '20px',
      textAlign: 'center',
      margin: '10px'
    };

    var spanStyle = assign({}, common);

    var containerStyle = {
      display: 'inline-block',
      borderColor: lightBlue,
      borderStyle: 'solid',
      borderRadius: '2px',
      borderWidth: '1px'
    };

    return (
        <div style={containerStyle}>
          <span style={spanStyle}>{count}</span>
          <CounterButton
            label={'Increment'}
            onClick={this.handleIncr}
          />
          <CounterButton
            label={'Reset'}
            onClick={this.handleReset}
          />
        </div>
    );
  },

  handleIncr: function() {
    CounterActions.incr();
  },

  handleReset: function() {
    CounterActions.reset();
  }

});

var CounterApp = React.createClass({
  componentDidMount: function() {
    CounterStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    CounterStore.removeChangeListener(this._onChange);
  },

  getInitialState: function() {
    return {
      count: CounterStore.getCount()
    };
  },

  render: function() {
    var count = this.state.count;
    return (
        <div>
          <Counter
            count={count}
            onclick={this.handleClick} />
        </div>
    );
  },

  _onChange: function() {
    var count = CounterStore.getCount();
    this.setState({ count: count });
  }
});

function render() {
  React.render(<CounterApp/>, document.getElementById('content'));
}

render();
