var React = require('react');
var ejs = require('ejs');

var ErrorMessage = React.createClass({
    render: function() {
        return <div><h2>Error has occured</h2></div>;
    }
});

module.exports = ErrorMessage;