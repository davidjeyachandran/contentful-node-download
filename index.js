const contentful = require('contentful');
const fs = require('fs');
const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');

// Create a Contentful client
const client = contentful.createClient({
    space: SPACE_ID,
    accessToken: ACCESS_TOKEN
});
// Define the content type you want to query
const contentType = 'article';
// Connect to Contentful and fetch the content
client.getEntries({
    content_type: contentType, limit: 2
})
    .then((response) => {
        // Loop through each content item
        response.items.forEach((item) => {
            // Extract profileName and profileEmail from each content item
            const { title, body, author } = item.fields;

            // Create a new file for each response item
            const fileName = `results/${author}.txt`;
            // Render the body field to HTML
            const renderedBody = documentToHtmlString(body);

            console.log('renderedBody:', renderedBody);
            const fileContent = `Title: ${title}\nAuthor: ${author}\nBody: ${renderedBody}`;

            fs.writeFile(fileName, fileContent, (err) => {
                if (err) {
                    console.log('Error:', err);
                } else {
                    console.log(`File ${fileName} created successfully.`);
                }
            });
        });
    })
    .catch((error) => {
        console.log('Error:', error);
    });
