import { PrismaClient } from "@prisma/client";
import { runSeed } from "../src/lib/seed-core";
const prisma = new PrismaClient();
runSeed(prisma)
  .then(() => console.log("Seed OK"))
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
