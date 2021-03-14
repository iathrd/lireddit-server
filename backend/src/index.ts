import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constanst";
import mikroConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolvers } from "./resolvers/hello";

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();

  const app = express();

  const aplloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolvers],
      validate: false,
    }),
  });

  aplloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("App start on port 4000");
  });
};

main();
