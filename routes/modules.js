/**
 * Created by Sanjay on 14-11-2015.
 */
//For using npm modules in the browserify
var React = require('react');
var Multiselect = require('react-bootstrap-multiselect');
var CheckBoxList= require('react-checkbox-list');
var AutosizeInput = require('react-input-autosize');
var Classnames = require('classnames');
var Select = require('react-select');
var http = require('http');
var request = require('ajax-request');

var CheckBoxComponent = React.createClass({
    getInitialState: function() {
        return {list: [{value:'One',selected:true},{value:'Two'},{value:'Three'},{value:'Four',label:'Four Label'}]};
    },
    handleChange: function (event) {
        var node = $("#chkBox");
        console.log(node);
        var selectedValues = $("#chkBox").children().children('div').children('button').attr('title');

        console.log($.trim(selectedValues.replace(/ /g,'')));
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


var PerfCheckBoxComponent =React.createClass({
    handleChange: function (val) {
        console.log("Selected: " + val);
    },
    loadOptions: function loadOptions(input, callback) {
        console.log(input);
        input = input.toLowerCase();
        var data = {
            options: CONTRIBUTORS.filter(function (i) {
                return i.github.substr(0, input.length) === input;
            }),
            complete: true
        };
        setTimeout(function () {
            callback(null, data);
        }, 500);
    },
    render: function() {
        return (
            <div>
                <Select
                    name="form-field-name"
                    value="one"
                    options={this.props.options}
                    onChange={this.handleChange}
                    multi={true}
                />
            </div>
        );
    }
});

var getOptions = GetOptionsFn();
function GetOptionsFn (){
    var data='heelp';
    request('http://localhost:3000/perfColoumnData', function(err, res, body) {
        console.log("Service"+body.toString());
        data=data+body.toString();
        console.log("Data"+data);
    });
    return data.toString();
};

console.log("FUnstion=="+getOptions);

React.render(<PerfCheckBoxComponent />, document.getElementById('perfChkBox'));

