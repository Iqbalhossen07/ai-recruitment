const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const jobs = [
    { title: "Marketing Associate", description: "We're looking for a mid-level product designer to join our team.", keywords: "Marketing, AU", isActive: true },
    { title: "Senior Graphic Designer", description: "We're looking for a mid-level product designer to join our team.", keywords: "Design, AU", isActive: true },
    { title: "Frontend Developer", description: "Join our team to build next-generation web applications.", keywords: "Frontend, React", isActive: true },
    { title: "Backend Engineer", description: "Build scalable APIs and microservices.", keywords: "Backend, Node.js", isActive: true },
    { title: "Product Manager", description: "Lead our product vision and execution.", keywords: "Product, Management", isActive: true },
    { title: "UX Researcher", description: "Help us understand our users better.", keywords: "UX, Research", isActive: true }
  ];

  for (const job of jobs) {
    await prisma.job.create({ data: job });
  }
  console.log("Seeded 6 jobs.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
