const { builder, getStore } = require("@netlify/functions");
const pageTemplate = require("../../templates/page.js");

const handler = async (event, context) => {
  const store = getStore(context);

  // Fetch the idea at the specified path
  const path = event.path.split("colorway/")[1];
  const data = await store.get(`colorways/${path}`);

  console.log("Data from store:", data);

  // pseudo 404 if there is no content for this URL
  if (!data) {
    return {
      statusCode: 302,
      headers: {
        Location: `/not-found`,
      },
    };
  }

  // render the data into the template
  console.log(`ODB render of ${path}`);
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html",
    },
    body: pageTemplate(data[0]),
  };
};

exports.handler = builder(handler);
