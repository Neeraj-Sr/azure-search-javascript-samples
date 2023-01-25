
function getPage ( storagePath,pageNumber)
{
    const account_name = 'cs2100320024a648bca';
    const container_name = 'azureblob-skillset-2-image-projection';
    const blob_name = `${storagePath}/normalized_images_${pageNumber}.jpg`;
    console.log(blob_name);
    const url = `https://${account_name}.blob.core.windows.net/${container_name}/${blob_name}?si=ReadPolicy&spr=https&sv=2021-06-08&sr=c&sig=RiP53EG6YGFZwp2pnFU61gtSc3KHL%2BIOtyEWQJJ9a6A%3D`
    return url;
};

export default getPage;