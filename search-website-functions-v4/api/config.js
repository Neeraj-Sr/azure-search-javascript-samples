const CONFIG = {
    SearchIndexName: process.env["SearchIndexName"] || "azureblob-index-2",
    SearchApiKey: process.env["SearchApiKey"] || "JdWASzhZY7mwPD7Qi8bpAIanSH0u29wFfbjRkujYBSAzSeB5dVeh",
    SearchServiceName: process.env["SearchServiceName"] || "search-svc",
    SearchFacets: process.env["SearchFacets"] || "doccategory", 
}
console.log(CONFIG);
if (!CONFIG.SearchIndexName || !CONFIG.SearchApiKey || !CONFIG.SearchServiceName) throw Error("./config.js::Cognitive Services key is missing");

module.exports = { CONFIG };
