/**
 * Created by Sanjay on 14-11-2015.
 */
//For using npm modules in the browserify
var React = require('react');
var Multiselect = require('react-bootstrap-multiselect');
var CheckBoxList= require('react-checkbox-list');

var CheckBoxComponent = React.createClass({
    getInitialState: function() {
        return {list: [{value:'One',selected:true},{value:'Two'},{value:'Three'},{value:'Four',label:'Four Label'}]};
    },
    render: function() {
        return (
            <div>
                <Multiselect onChange={this.handleChange} data={this.state.list} multiple />
            </div>
        );
    }
});

React.render(<CheckBoxComponent />, document.getElementById('chkBox'));