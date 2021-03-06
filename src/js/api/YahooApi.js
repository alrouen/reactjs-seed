var YahooConfig = require("AppConfig").Yahoo;

var Uri = require("./Uri");
var { Utils} = require("../utils/index");
var { checkStatus, parseJson } = require( './FetchTransformers' );



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
