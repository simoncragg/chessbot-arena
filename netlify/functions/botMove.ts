import type { Context } from "@netlify/functions";

const botMove = async (req: Request, context: Context) => {
  console.log("body", req.body);
  console.log("site: ", context.site);
  return new Response("Hello, world!")
}

export default botMove;

