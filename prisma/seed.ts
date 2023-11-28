import { Prisma, PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    email: 'superadmin@sudofolks.com',
    username: 'superadmin',
    passwordHash: '$2a$12$rq6BZ0NNJTcg9Ma.WuTxa.JYgtUYZUg5Ex0NcIkpzpc7n/KL1OPXu' // test
  }
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const del = await prisma.user.delete({where: {email:u.email}})
    console.log("deleting seed user :" + del.id);
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.email}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    // await prisma.$disconnect()
  })