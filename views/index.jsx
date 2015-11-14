var React = require('react');


var HelloMessage = React.createClass({
    render: function() {
        return (
            <html>
            <head>
                <title>{this.props.name}</title>
                <link rel='stylesheet' href='/bower_components/bootstrap/dist/css/bootstrap.css' />
                <link rel='stylesheet' href='/bower_components/bootstrap/dist/css/bootstrap-theme.css' />
                <link rel='stylesheet' href="/bower_components/flat-ui/dist/css/flat-ui.css"/>
                <link rel='stylesheet' href='/stylesheets/style.css' />
                <link rel='stylesheet' href='/stylesheets/flexBox.css' />

            </head>
            <body>
            <div className="parentContainer">

                        {
                        this.props.data.map(function(phone) {
                            return (
                                    <div class="tile">
                                        <div className ="phone header tile-title   " >{phone.CompanyName}</div>
                                        <div className ="phone specs" >{phone.PhoneName}</div>
                                        <div className ="phone specs" >{phone.PhysicalSize}</div>
                                    </div>


                                );
                            })
                        }

            </div>
            </body>
            </html>

        );
    }
});


module.exports = HelloMessage;