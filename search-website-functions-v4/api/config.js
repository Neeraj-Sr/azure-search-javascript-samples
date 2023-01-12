const CONFIG = {
    SearchIndexName: process.env["SearchIndexName"] || "azureblob-index-2",
    SearchApiKey: process.env["SearchApiKey"] || "JdWASzhZY7mwPD7Qi8bpAIanSH0u29wFfbjRkujYBSAzSeB5dVeh",
    SearchServiceName: process.env["SearchServiceName"] || "search-svc",
    SearchFacets: process.env["SearchFacets"] || "doccategory",
    SASurlString: process.env["SASurlString"] || "si=ReadPolicy&spr=https&sv=2021-06-08&sr=c&sig=RiP53EG6YGFZwp2pnFU61gtSc3KHL%2BIOtyEWQJJ9a6A%3D"
}
console.log(CONFIG);
if (!CONFIG.SearchIndexName || !CONFIG.SearchApiKey || !CONFIG.SearchServiceName) throw Error("./config.js::Cognitive Services key is missing");

module.exports = { CONFIG };
