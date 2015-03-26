// https://github.com/github/fetch
// require here because it's polyfill...
require( 'whatwg-fetch' );

var React   = require('react');
var Router  = require('react-router');
var Home    = require('./home');
var BasicReactSample = require( './BasicReactSample' );

/**
 * The routes of your application
 */
const routes = (
    <Router.Route path="/" handler={Home}>
        <Router.DefaultRoute handler={BasicReactSample} />
        <Router.NotFoundRoute handler={BasicReactSample}/>
    </Router.Route>
);

/**
 * Render your React application into the DOM.
 * The correct way is to always render into a div and not directly the body, as third party scripts
 * can add scripts inside the body.
 */
var HomeApp = Router.run( routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('app-container'));
});
