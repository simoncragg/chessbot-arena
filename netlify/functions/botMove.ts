import { builder, Handler } from "@netlify/functions";

const botMove: Handler = async (event: Event, context: Context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello World' }),
  }
}

const handler = builder(botMove);

export { handler };
