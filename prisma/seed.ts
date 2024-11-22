import prisma from "../src/lib/db";
import bcrypt from "bcrypt";

async function main() {
  const hashedPassword = await bcrypt.hash("smartfees", 10);

  const superAdmin = await prisma.user.upsert({
    where: { email: "admin@smartfees.com" },
    create: {
      name: "Super admin",
      email: "admin@smartfees.com",
      password: hashedPassword,
      emailVerified: new Date(),
    },
    update: {},
  });

  console.log(superAdmin);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
