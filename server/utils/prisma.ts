import { PrismaClient } from "../../app/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const config = useRuntimeConfig();

const adapter = new PrismaLibSql({
	url: config.tursoDatabaseUrl,
	authToken: config.tursoAuthToken
});

export const prisma = new PrismaClient({adapter});