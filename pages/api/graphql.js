import { ApolloServer } from "apollo-server-micro";
import { typeDefs } from "./schemas";
import { resolvers } from "./resolvers";
import micro_cors from "micro-cors";

const cors = micro_cors({
  origin: "https://studio.apollographql.com",
  allowMethods: ["GET", "POST"],
  allowHeaders: [
    "Access-Control-Allow-Credentials",
    "true",
    "Content-Type",
    "Access-Control-Allow-Origin",
    "Access-Control-Allow-Headers",
  ],
});
const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};
const startServer = apolloServer.start();

export default cors(async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;
  await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
});
