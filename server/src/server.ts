import { fastify } from "fastify";
import { fastifyConnectPlugin } from "@connectrpc/connect-fastify";
import mongoose from 'mongoose';
import routes from "./route";
import dotenv from 'dotenv';

dotenv.config();

const { MONGO_URI } = process.env;

async function main() {
  await mongoose.connect(process.env.MONGO_URI as string);
  console.log('Connected to MongoDB');

  const server = fastify();
  
  await server.register(require('@fastify/cors'), {
    origin: true
  });

  await server.register(fastifyConnectPlugin, {
    routes,
  });

  server.get("/", (_, reply) => {
    reply.type("text/plain");
    reply.send("QuestSearch API");
  });

  await server.listen({ host: "localhost", port: 4000 });
  console.log("server is listening at", server.addresses());
}

void main();