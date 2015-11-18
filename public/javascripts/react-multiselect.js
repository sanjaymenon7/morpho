/** @jsx React.DOM */
(function (root, factory) {
  if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(
      require('react/addons')
    );
  }
  else {
    // Browser globals (root is window)
    root.MultiSelect = factory(root.React);
  }
}(this, function(React) {
  var MultiSelectItem = React.createClass({displayName: "MultiSelectItem",
    getDefaultProps: function() {
      return {
        visible: true,
        selected: false,
        text: '',
        onClick: function() {}
      }
    },
    render: function() {
      return this.props.visible && React.createElement("li", {
        className: this.props.selected ? 'selected' : 'deselected', 
        onClick: this.props.onClick
      }, this.props.text)
    }
  })

  var MultiSelect = React.createClass({displayName: "MultiSelect",
    getDefaultProps: function() {
      return {
        items: [],
        placeholder: 'Enter some filter text',
        onChange: function() {},
        onItemSelected: function() {},
        onItemDeselected: function() {}
      }
    },
    getInitialState: function() {
      return {
        selections: {},
        filter: ''
      }
    },
    handleItemClick: function(item) {
      this.setSelected(item, !this.state.selections[item.id])
    },
    handleFilterChange: function(event) {
      // Keep track of every change to the filter input
      this.setState({ filter: event.target.value })
    },
    escapeRegExp: function(str) {
      return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    },
    createItem: function(item) {
      // Filter item visibility based on the filter input
      var regex = new RegExp('.*'+this.escapeRegExp(this.state.filter)+'.*', 'i')
      var text = 'text' in item ? item.text
               : 'name' in item ? item.name
               : 'selected' in item ? item.selected
               : item.id
      if( typeof this.state.selections[item.id] === 'undefined')
      this.state.selections[item.id]= item.selected? true :false
      return React.createElement(MultiSelectItem, {
        key: item.id, 
        text: text, 
        onClick: this.handleItemClick.bind(this, item), 
        visible: regex.test(text), 
        selected: this.state.selections[item.id] ? true : false}
      )
    },
    selectAll: function(event) {
      this.setSelected(this.props.items, true)
    },
    selectNone: function(event) {
      this.setSelected(this.props.items, false)
    },
    setSelected: function(items, selected) {
      // Accept an array or a single item
      if (!(items instanceof Array)) items = [items]
      
      var selections = this.state.selections
      for (var i in items) {
        selections[items[i].id] = selected
        
        if (selected)
          this.props.onItemSelected(items[i])
        else
          this.props.onItemDeselected(items[i])
      }
      this.setState({ selections: selections })
      this.props.onChange(selections)
    },
    render: function() {
      return (
        React.createElement("div", {className: "multiselect"}, 
          React.createElement("input", {onChange: this.handleFilterChange, value: this.state.filter, placeholder: this.props.placeholder}), 
          React.createElement("ul", null, this.props.items.map(this.createItem)), 
          React.createElement("button", {onClick: this.selectAll}, "Select all"), " ", 
          React.createElement("button", {onClick: this.selectNone}, "Select none")
        )
      )
    }
  })
  return MultiSelect
}))

