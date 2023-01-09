const { BlobServiceClient, BlobClient, generateBlobSASQueryParameters,BlobSASSignatureValues, BlobSASPermissions ,StorageSharedKeyCredential} = require("@azure/storage-blob");

const account_name = 'cs2100320024a648bca';
const account_key = 'iNKIX8G7Ih7ZgBGDK1EX7l19C1EDnNiae48O+InnYlQSHi0sPVE8HKjPYy57sWngpKi8kPELg21f+ASt+p1qKQ==';
const container_name = 'azureblob-skillset-2-image-projection';


module.exports = async function (context, req) {

    blob_name = 'normalized_images_0.jpg';
    // Reading inputs from HTTP Request
    const id = (req.query.id || (req.body && req.body.id));
    console.log("+++++")
    console.log(id)
    console.log("+++++")
    blob_name = id+'/'+ blob_name
    console.log(blob_name)
    sas_token = get_blob_sas(account_name,account_key, container_name, blob_name)
    console.log(sas_token)
    url = 'https://'+account_name+'.blob.core.windows.net/'+container_name+'/'+blob_name+'?'+sas_token

   // context.log(url);
   // console.log(url)

    context.res = {
        // status: 200, /* Defaults to 200 */
        headers: {
            "Content-type": "application/text"
        },
        body: { document: url}
    };
    
};

const get_blob_sas = (account_name,account_key, container_name, blob_name) => {
    
    sharedKeyCredential = new StorageSharedKeyCredential(account_name, account_key);
    console.log(blob_name);
    console.log(container_name)
    location_string = container_name +'/'+blob_name
    console.log(location_string)
    // const blobSAS = generateBlobSASQueryParameters(
    // {
    //     container_name,
    //     blob_name,
    //     identifier:"ReadPolicy"
    // },
    // sharedKeyCredential
    // ).toString();

    const blobSAS = generateBlobSASQueryParameters({
        container_name, 
        blob_name,
        permissions: BlobSASPermissions.parse("r"), // Required
        startsOn: new Date(),
        expiresOn: new Date(new Date().valueOf() + 86400) // Required. Date type
      },
      sharedKeyCredential
    ).toString();

    
    console.log("*************")
    console.log(blobSAS)
    return blobSAS;
}