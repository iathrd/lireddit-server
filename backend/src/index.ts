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
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();

  const app = express();

  let RedisStore = connectRedis(session);
  let redisClient = redis.createClient();

  app.use(
    session({
      name: "qid",
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 360 * 10, //ten years
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__, //cookie only work in https
      },
      saveUninitialized: false,
      secret: "keyboard cat",
      resave: false,
    })
  );

  const aplloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolvers, PostResolvers, UserResolvers],
      validate: false,
    }),
    context: ({ req, res }) => ({ em: orm.em, req, res }),
  });

  aplloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("App start on port 4000");
  });
};

main();
