var React = require('react');


var HelloMessage = React.createClass({
    render: function() {
        return (
            <html>
            <head>
                <title>{this.props.name}</title>
                <link rel='stylesheet' href='/stylesheets/style.css' />
                <link rel='stylesheet' href='/stylesheets/flexBox.css' />
                <link rel='stylesheet' href='/bower_components/bootstrap/dist/css/bootstrap.css' />
                <link rel='stylesheet' href='/bower_components/bootstrap/dist/css/bootstrap-theme.css' />

            </head>
            <body>
            <div className="phoneList">

                        {
                        this.props.data.map(function(phone) {
                            return (
                                    <div>
                                        <div className ="phone header" ><b>{phone.CompanyName}</b></div>
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