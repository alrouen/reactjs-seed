var YahooConfig = require("AppConfig").Yahoo;

var Uri = require("./Uri");
var { Utils} = require("../utils/index");

/**
 * Checks for the status of a response. By default, fetch only reject when the
 * request completely fails to be made, not on server responses.
 */
function checkStatusWithJsonError(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return new Promise( function( resolve, reject ) {
        response.json().then( ( json ) => reject( json ) );
    });
  }
}


/**
 * Checks for the status of a response. By default, fetch only reject when the
 * request completely fails to be made, not on server responses.
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

function parseJson( response ) {
    return response.json();
}


// Yahoo query params for Quotes :
// q= select * from yahoo.finance.quotes where symbol in ("YHOO","AAPL","GOOG","MSFT")
// env= http://datatables.org/alltables.env
// format= json


var buildYahooParams = (query, env, format) => {
    return {
        q     : query || "",
        env   : env || "http://datatables.org/alltables.env",
        format: format || "json"
    };
};

var YahooApi = {
    QuoteApi: {
        getQuotes( quotes ) {
            var flattenQuotes = "";
            if(Utils.js.isArray(quotes)) {
                flattenQuotes = quotes.map( q => `\"${q}\"` ).join(",");
            } else {
                flattenQuotes = `\"${quotes}\"`;
            }

            var query = `select * from yahoo.finance.quotes where symbol in (${flattenQuotes})`;

            // check https://github.com/github/fetch
            return fetch( new Uri( "{0}/v1/public/yql", YahooConfig.publicWebHost).query(buildYahooParams(query)) )
                   .then( checkStatus ).then( parseJson );
        }
    }
};

module.exports = YahooApi;
