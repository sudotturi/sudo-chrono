import { Gender, ROLES, Prisma, PrismaClient, MODULES } from "@prisma/client"


const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    email: 'superadmin@sudofolks.com',
    username: 'superadmin',
    passwordHash: '$2a$12$rq6BZ0NNJTcg9Ma.WuTxa.JYgtUYZUg5Ex0NcIkpzpc7n/KL1OPXu', // test
    fullName: 'Super Admin',
    gender: Gender.MALE,
    phoneNumber: '9916367638',
    roles: ROLES.SUPER_ADMIN,
    isActive: true,
    isLocked: false
  }
]

const roleModuleData: Prisma.RoleModulesCreateInput[] = [
  {
    module: MODULES.TRACKING,
    role: ROLES.ADMIN,
    order: 0
  },
  {
    module: MODULES.DASHBOARD,
    role: ROLES.ADMIN,
    order: 1
  },
  {
    module: MODULES.TEAMS,
    role: ROLES.ADMIN,
    order: 2
  },
  {
    module: MODULES.PROJECTS,
    role: ROLES.ADMIN,
    order: 3
  }, {
    module: MODULES.TRACKING,
    role: ROLES.SUPER_ADMIN,
    order: 0
  },
  {
    module: MODULES.DASHBOARD,
    role: ROLES.SUPER_ADMIN,
    order: 1
  },
  {
    module: MODULES.TEAMS,
    role: ROLES.SUPER_ADMIN,
    order: 2
  },
  {
    module: MODULES.PROJECTS,
    role: ROLES.SUPER_ADMIN,
    order: 3
  },
  {
    module: MODULES.TRACKING,
    role: ROLES.USER,
    order: 0
  },
  {
    module: MODULES.DASHBOARD,
    role: ROLES.USER,
    order: 1
  },
  {
    module: MODULES.PROJECTS,
    role: ROLES.USER,
    order: 3
  }
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const del = await prisma.user.deleteMany({ where: { email: u.email } })
    console.log("deleting seed user");
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.email}`)
  }

  for (const role of roleModuleData) {
    const del = await prisma.roleModules.deleteMany({ where: { module: role.module, role: role.role } })
    console.log("deleting role module user");
    const roleMod = await prisma.roleModules.create({
      data: role,
    })
    console.log(`Created role module data of : ${roleMod.role}-${roleMod.module}`)
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