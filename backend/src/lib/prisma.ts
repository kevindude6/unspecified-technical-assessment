// Taken from prisma documentation, https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/postgresql#6-generate-prisma-orm-types
import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../../generated/prisma/client.js'

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

export { prisma }