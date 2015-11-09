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
            <h1>{this.props.name}</h1>
            <p >This is {this.props.name}</p>
            <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
                <div class="container">
                    <a class="navbar-brand" href="#">Home</a>
                    <ul class="nav navbar-nav">
                    </ul>
                </div>
            </nav>
            <div class="phoneList">
                <ul className="phnList">
                        {
                        this.props.data.map(function(phone) {
                            return <li key={phone.CompanyName}>{phone.CompanyName}</li>
                            })
                        }
                </ul>
            </div>
            </body>
            </html>

        );
    }
});


module.exports = HelloMessage;