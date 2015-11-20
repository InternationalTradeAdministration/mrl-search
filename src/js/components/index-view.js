var React   = require('react');
var History = require('react-router').History;

var Form  = require('./form');

module.exports = React.createClass({
  mixins: [ History ],
  handleSubmit: function(e) {
    e.preventDefault();
  },
  render: function() {
    return <Form expanded={ true } onSubmit={ this.handleSubmit } history={ this.history } />;
  }
});
