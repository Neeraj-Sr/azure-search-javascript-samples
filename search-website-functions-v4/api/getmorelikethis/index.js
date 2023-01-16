const { CONFIG } = require("../config");
const AzureSearchClient = require('./AzureSearchClient.js');


const azclient = new AzureSearchClient(CONFIG.SearchServiceName,"",CONFIG.SearchApiKey,CONFIG.SearchIndexName)


module.exports = async function (context, req) {

    // Reading inputs from HTTP Request
    const id = (req.query.id || (req.body && req.body.id));
    console.log("Received:  "+id)
    const endpoint = azclient.getMoreLikeThisUrl(id);
    console.log(endpoint)
    const response = await AzureSearchClient.request(endpoint, "GET", azclient.queryKey);
    AzureSearchClient.throwOnHttpError(response);
   
    // Returning the document with the matching id
    //const document = await client.getDocument(id)
    console.log("logging response......")
    const body = await response.json();
   // context.log(document);

    context.res = {
        // status: 200, /* Defaults to 200 */
        headers: {
            "Content-type": "application/json"
        },
        body: { document: body}
    };
    
};