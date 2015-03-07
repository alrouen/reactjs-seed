var React = require('react/addons');
var Reflux = require('reflux');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var OnReadyMixin = require('./utils/OnReady').OnReadyMixin;
var OnReadyStore = require('./utils/OnReady').OnReadyStore;

var { Page1, Page2 } = require( './page' );

var AppConfig = require('AppConfig');


/**
 * Small loader
 */
var HomeLoader = <div id="loading-home" className='container'>
                    <div id="loader">
                        <span className="lead"><i className="fa fa-fw fa-spinner fa-spin"></i>&nbsp;Loading stuff, getting things ready...</span>
                    </div>
                 </div>;

var NavBar = React.createClass({

    getInitialState: function() {
        return {
            showSpinner:false
        }
    },

    render: function() {
        var spinnerClasses = React.addons.classSet({'fa fa-lg fa-spinner fa-spin':this.state.showSpinner});

        return (
            <nav id='nav' className="navbar navbar-fixed-top" role="navigation">
                <ul className="">
                    <li>
                        <a href="#" title="Search" className="navbar-link">
                            <i className="fa fa-search"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#/page1"  className="navbar-link main-ui-link">
                            Page1
                        </a>
                    </li>
                    <li>
                        <a href="#/page2" className="navbar-link main-ui-link">
                            Page2
                        </a>
                    </li>
                    <li>
                        <p className='navbar-text'><i className={spinnerClasses}/></p>
                    </li>
                </ul>
                <ul className="navbar-right">
                    <li>
                        <a href="#" title="Logout" className="navbar-link">
                            <i className='fa fa-sign-out'/>&nbsp;&nbsp;Sponge bob
                        </a>
                    </li>
                </ul>
            </nav>
        );
    }
});

/**
 *
 * HOME PAGE
 *
 */
var Home = React.createClass({

    mixins:[
        Router.Navigation,
        Router.State,
        OnReadyMixin(HomeLoader)
    ],

    getInitialState: function() {
        return {};
    },

    componentDidMount:function(){
        console.log('AppConfig', AppConfig);
        this.setReadyToRender();
    },

    componentWillReceiveProps:function(newProps){
        this.setReadyToRender();
    },

    render:function(){
        var renderContent = function() {
            return (
                <div ref="app" id="wrapper" >
                    <NavBar/>
                    <div id="side"></div>
                    <div id="content" className="container">
                        <RouteHandler />
                    </div>
                </div>
            );
        };
        return this.renderOnReady(renderContent);
    }
});


var routes = (
    <Route path="/" handler={Home}>
        <DefaultRoute handler={Page1} />
        <Route name="page1" path="/page1" addHandlerKey={true} handler={Page1}/>
        <Route name="page2" path="/page2" addHandlerKey={true} handler={Page2}/>
        <NotFoundRoute handler={Page1}/>
    </Route>
);

module.exports = routes;
