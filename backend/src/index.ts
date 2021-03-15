import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constanst";
import mikroConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolvers } from "./resolvers/hello";
import { PostResolvers } from "./resolvers/post";
import { UserResolvers } from "./resolvers/user";

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();

  const app = express();

  const aplloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolvers, PostResolvers, UserResolvers],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
  });

  aplloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("App start on port 4000");
  });
};

main();
