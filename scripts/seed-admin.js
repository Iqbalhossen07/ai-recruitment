const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'admin@airecruit.com';

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  });

  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        name: 'Admin User',
        email: adminEmail,
        password: 'password123', // In a real app, this should be hashed.
        role: 'ADMIN',
      }
    });
    console.log('Admin user created successfully.');
  } else {
    console.log('Admin user already exists.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
