const { getStore } = require("@netlify/functions");
const { nanoid } = require("nanoid");

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  // unpack the form submission data
  const querystring = require("querystring");
  const { title, color_1, color_2, color_3, color_4, color_5 } =
    querystring.parse(event.body);
  const colors = [color_1, color_2, color_3, color_4, color_5];
  const id = nanoid();
  const store = getStore(context);

  await store.set(`colorways/${id}`, { title, colors });

  console.log(`NEW URL: /colorway/${id}`);

  return {
    statusCode: 302,
    headers: {
      Location: `/colorway/${id}`,
    },
  };
};
