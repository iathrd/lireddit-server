import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constanst";
import mikroConfig from './mikro-orm.config'

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up()
};

main();
