import { PrismaClient } from '~/generated/prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

const config = useRuntimeConfig()

const adapter = new PrismaLibSql({
  url: config.tursoDatabaseUrl,
  authToken: config.tursoAuthToken,
})

const prisma = new PrismaClient({
  adapter,
})

export default prisma