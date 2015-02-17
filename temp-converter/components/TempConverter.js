var React = require('react');
var TempStore = require('../stores/TempStore');
var TempActions = require('../actions/TempActions');

var Temp = React.createClass({
  shouldComponentUpdate: function(nextProps) {
    return parseFloat(nextProps.value) !== parseFloat(this.props.value) ||
      nextProps.isValid !== this.props.isValid;
  },
  render: function() {
    var value = this.props.value;
    var isValid = this.props.isValid;
    var containerStyle = {
      display: 'inline-block'
    };
    var inputStyle = {};
    if (!isValid) {
      inputStyle.borderStyle = 'solid';
      inputStyle.borderColor = 'red';
    };
    return (
        <div style={containerStyle}>
          <input style={inputStyle} type="text" value={value} onChange={this.props.onChange} />
          <span>{this.props.unit}</span>
        </div>
    );
  }
});

var TempConverter = React.createClass({
  getInitialState: function() {
    return {
      isTCValid: true,
      tc: TempStore.getTC(),
      isTFValid: true,
      tf: TempStore.getTF()
    };
  },
  componentDidMount: function() {
    TempStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    TempStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState({
      isTCValid: true,
      isTFValid: true,
      tc: TempStore.getTC(),
      tf: TempStore.getTF()
    });
  },
  _getTempValue: function(ev) {
    var tc = ev.target.value;
    if (isNaN(tc) || tc === '')
      return null;
    return parseFloat(tc);
  },

  _handleUpdateTC: function(ev) {
    var tc = this._getTempValue(ev);
    if (tc !== null) {
      this.setState({
        isTCValid: true,
        tc: ev.target.value
      });
      TempActions.updateTC(tc);
    } else {
      this.setState({
        isTCValid: false,
        tc: ev.target.value,
        isTFValid: true,
        tf: ''
      });
    }
  },
  _handleUpdateTF: function(ev) {
    var tf = this._getTempValue(ev);
    if (tf !== null) {
      this.setState({
        isTFValid: true,
        tf: ev.target.value
      });
      TempActions.updateTF(tf);
    } else {
      this.setState({
        isTCValid: true,
        tc: '',
        isTFValid: false,
        tf: ev.target.value
      });
    }
  },
  render: function() {
    var isTCValid = this.state.isTCValid;
    var isTFValid = this.state.isTFValid;
    return (
        <div>
          <Temp value={this.state.tc} isValid={isTCValid} onChange={this._handleUpdateTC} unit="Celsius"/>
          <span>{'='}</span>
          <Temp value={this.state.tf} isValid={isTFValid} onChange={this._handleUpdateTF} unit="Fahrenheit"/>
        </div>
    );
  }
});

module.exports = exports = TempConverter;
