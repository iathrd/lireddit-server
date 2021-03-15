import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import { Request, Response } from "express";
import { SessionData } from "express-session";
import { Session } from "node:inspector";

export type MyContext = {
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
  req: Request & { session: Session & Partial<SessionData> & { userId?: number } };
  res: Response;
};
