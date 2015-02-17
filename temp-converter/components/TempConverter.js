var React = require('react');
var TempStore = require('../stores/TempStore');
var TempActions = require('../actions/TempActions');

var LIGHT_BLUE = 'rgb(0, 197, 255)';

var Temp = React.createClass({
  shouldComponentUpdate: function(nextProps) {
    return parseFloat(nextProps.value) !== parseFloat(this.props.value) ||
      nextProps.isValid !== this.props.isValid;
  },
  render: function() {
    var value = this.props.value;
    var isValid = this.props.isValid;

    var containerStyle = {
      display: 'inline-block',
      fontSize: '14px',
      fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'
    };
    var inputStyle = {
      padding: '5px',
      textAlign: 'center',
      margin: '5px',
      borderRadius: '2px',
      borderStyle: 'solid',
      borderWidth: '1px',
      borderColor: LIGHT_BLUE,
      color: LIGHT_BLUE,
      fontSize: 'inherit',
      width: '70px',
      outline: 'none'
    };
    var unitStyle = {
      color: LIGHT_BLUE
    };
    if (!isValid) {
      inputStyle.borderStyle = 'solid';
      inputStyle.borderColor = 'red';
      inputStyle.color = 'red';
    };
    return (
        <div style={containerStyle}>
          <input style={inputStyle} type="text"
            value={value}
            onChange={this.props.onChange}
          />
          <span style={unitStyle}>{this.props.unit}</span>
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
    var equalSignStyle = {
      color: LIGHT_BLUE, margin: '20px',
      fontSize: '40px', fontWeight: 500
    };
    return (
        <div>
          <Temp value={this.state.tc} isValid={isTCValid} onChange={this._handleUpdateTC} unit="Celsius"/>
          <span style={equalSignStyle}>{'='}</span>
          <Temp value={this.state.tf} isValid={isTFValid} onChange={this._handleUpdateTF} unit="Fahrenheit"/>
        </div>
    );
  }
});

module.exports = exports = TempConverter;
