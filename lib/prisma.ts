import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../app/generated/prisma";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  adapter: PrismaMariaDb | undefined;
};

const getAdapter = () => {
  if (globalForPrisma.adapter) return globalForPrisma.adapter;
  
  const adapter = new PrismaMariaDb({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    connectionLimit: 10,
    allowPublicKeyRetrieval: true
  });

  if (process.env.NODE_ENV !== "production") globalForPrisma.adapter = adapter;
  return adapter;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter: getAdapter() });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
