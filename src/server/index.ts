"use strict";

import Fastify from "fastify";

import { initialize } from "../database/seed.js";
import { isProduction } from "../env/node-env.js";

const fastify = Fastify({
  logger: true
});
fastify.get("/", async () => {
  return { hello: "world" };
});

const start = async () => {
  try {
    if (!isProduction) {
      await initialize();
    }
    await fastify.listen({ port: 3000 });
    
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();

