#!/usr/bin/env ts-node
"use strict";

import Fastify from "fastify";

import { initialize } from "../database/seed.js";
import { isProduction } from "../env/node-env.js";

const port = Number(process.env.PORT ?? 3000);

const fastify = Fastify({
  logger: true
});

fastify.get("/", async () => {
  return { hello: "world" };
});

fastify.get("/health", async (_, reply) => {
  return reply.statusCode = 200;
});

const start = async () => {
  try {
    if (!isProduction) {
      await initialize();
    }
    await fastify.listen({ port });
    
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
